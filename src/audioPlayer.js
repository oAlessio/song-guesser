/**
 * Audio Player for progressive snippet playback
 * Handles precise cutting of audio snippets (1s, 3s, 5s, etc.)
 * With in-memory Blob caching, background prefetching, and zero-stall instant playback
 */

export const SNIPPET_DURATIONS = [1, 3, 5, 10, 16, 30];

class SnippetAudioPlayer {
  constructor() {
    this.audio = new Audio();
    this.audio.preload = 'auto';
    // Removed crossOrigin = 'anonymous' to prevent Apple CDN stream stalling and CORS range headers errors!
    this.currentTrack = null;
    this.maxDuration = 1; // current unlocked snippet length in seconds
    this.isPlaying = false;
    this.isReady = false; // true when audio has enough data to play smoothly
    this.pendingPlay = false; // queues play request if clicked while loading
    this.volume = 0.8;
    this.isMuted = false;
    this.animFrameId = null;

    // Blob cache: stores in-memory Blob URLs for instant, stall-free playback
    this._blobCache = new Map();

    // Callbacks
    this.onProgress = null;   // (currentTime, maxDuration, progressPercent)
    this.onStateChange = null; // (isPlaying)
    this.onError = null;       // (error)
    this.onReadyChange = null; // (isReady) — for UI loading indicators

    this._setupAudioListeners();
  }

  _setupAudioListeners() {
    this.audio.volume = this.volume;

    // Ready as soon as audio data can begin playing (fires in < 200ms!)
    this.audio.addEventListener('canplay', () => {
      this._setReady(true);
      if (this.pendingPlay) {
        this.pendingPlay = false;
        this.play();
      }
    });

    this.audio.addEventListener('loadeddata', () => {
      this._setReady(true);
    });

    this.audio.addEventListener('playing', () => {
      this._setReady(true);
      this.isPlaying = true;
      if (this.onStateChange) this.onStateChange(true);
    });

    this.audio.addEventListener('ended', () => {
      this._stopPlayback();
    });

    this.audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e, this.audio.error);
      this._stopPlayback();
      this._setReady(false);
      if (this.onError) this.onError(this.audio.error || e);
    });

    this.audio.addEventListener('pause', () => {
      if (this.isPlaying && this.audio.currentTime >= this.maxDuration - 0.05) {
        this._stopPlayback();
      }
    });
  }

  _setReady(ready) {
    this.isReady = ready;
    if (this.onReadyChange) this.onReadyChange(ready);
  }

  /**
   * Fetches the preview audio as a Blob into local RAM for 100% stutter-free playback
   */
  async _fetchBlobUrl(url) {
    if (!url) return null;
    if (this._blobCache.has(url)) {
      return this._blobCache.get(url);
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      this._blobCache.set(url, blobUrl);

      // Keep cache size bounded to last 15 songs to conserve memory
      if (this._blobCache.size > 15) {
        const firstKey = this._blobCache.keys().next().value;
        const oldBlob = this._blobCache.get(firstKey);
        try { URL.revokeObjectURL(oldBlob); } catch {}
        this._blobCache.delete(firstKey);
      }

      return blobUrl;
    } catch (e) {
      // Fallback: network error or CORS issue, use direct URL
      return url;
    }
  }

  /**
   * Pre-fetches upcoming track audio in the background
   */
  preloadNextTrack(previewUrl, trackId) {
    if (!previewUrl) return;
    this._fetchBlobUrl(previewUrl);
  }

  /**
   * Loads a track into the player.
   */
  async loadTrack(track, maxDuration = 1) {
    this.stop();
    this.currentTrack = track;
    this.maxDuration = maxDuration;
    this.pendingPlay = false;

    if (!track || !track.previewUrl) {
      this._setReady(false);
      return;
    }

    const previewUrl = track.previewUrl;

    // Check if we already have the Blob cached in memory for instant playback!
    if (this._blobCache.has(previewUrl)) {
      const blobUrl = this._blobCache.get(previewUrl);
      this.audio.src = blobUrl;
      this.audio.load();
      this._setReady(true);
      return;
    }

    // Set src immediately to stream initial audio without blocking
    this._setReady(false);
    this.audio.src = previewUrl;
    this.audio.load();

    // Concurrently download full blob for seamless looping and offline replay
    this._fetchBlobUrl(previewUrl).then(blobUrl => {
      // If user hasn't switched to another track and isn't actively playing
      if (this.currentTrack && this.currentTrack.previewUrl === previewUrl) {
        if (!this.isPlaying && this.audio.currentTime === 0) {
          this.audio.src = blobUrl;
          this.audio.load();
        }
        this._setReady(true);
      }
    });
  }

  setMaxDuration(duration) {
    this.maxDuration = duration;
    this._notifyProgress(this.audio.currentTime || 0);
  }

  play() {
    if (!this.currentTrack || !this.currentTrack.previewUrl) {
      console.warn('Cannot play: no track or previewUrl');
      return;
    }

    // If reached or exceeded current snippet max duration, restart from 0
    if (this.audio.currentTime > 0 && this.audio.currentTime >= this.maxDuration - 0.05) {
      try {
        this.audio.currentTime = 0;
      } catch (e) {}
    }

    // If audio is still buffering initial metadata, mark pendingPlay
    if (this.audio.readyState < 2) {
      this.pendingPlay = true;
    }

    const playPromise = this.audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          this.isPlaying = true;
          this.pendingPlay = false;
          if (this.onStateChange) this.onStateChange(true);
          this._startProgressLoop();
        })
        .catch(err => {
          // Playback might be waiting for user interaction or still buffering
          if (err.name !== 'AbortError') {
            console.warn('Playback error:', err);
          }
          if (this.isPlaying) {
            this._stopPlayback();
          }
        });
    }
  }

  pause() {
    this.pendingPlay = false;
    this.audio.pause();
    this._stopPlayback();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  replay() {
    this.pendingPlay = false;
    try {
      this.audio.currentTime = 0;
    } catch (e) {}
    this.play();
  }

  stop() {
    this.pendingPlay = false;
    this.audio.pause();
    try {
      this.audio.currentTime = 0;
    } catch (e) {}
    this._stopPlayback();
    this._notifyProgress(0);
  }

  playFull() {
    this.maxDuration = 30;
    this.replay();
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    if (!this.isMuted) {
      this.audio.volume = this.volume;
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    this.audio.muted = this.isMuted;
    return this.isMuted;
  }

  _startProgressLoop() {
    cancelAnimationFrame(this.animFrameId);

    const checkTime = () => {
      if (!this.isPlaying) return;

      const current = this.audio.currentTime;

      if (current >= this.maxDuration) {
        // Snippet time limit reached! Stop neatly and reset to 0
        this.audio.pause();
        try {
          this.audio.currentTime = 0;
        } catch (e) {}
        this._stopPlayback();
        this._notifyProgress(0);
        return;
      }

      this._notifyProgress(current);
      this.animFrameId = requestAnimationFrame(checkTime);
    };

    this.animFrameId = requestAnimationFrame(checkTime);
  }

  _stopPlayback() {
    this.isPlaying = false;
    cancelAnimationFrame(this.animFrameId);
    if (this.onStateChange) this.onStateChange(false);
  }

  _notifyProgress(current) {
    const safeCurrent = Math.min(current, this.maxDuration);
    const progressPercent = this.maxDuration > 0 ? (safeCurrent / this.maxDuration) * 100 : 0;
    if (this.onProgress) {
      this.onProgress(safeCurrent, this.maxDuration, progressPercent);
    }
  }
}

export const player = new SnippetAudioPlayer();
