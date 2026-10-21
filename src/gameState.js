/**
 * Game State, History and Statistics Manager
 */
import { SNIPPET_DURATIONS, player } from './audioPlayer.js';
import { normalizeSongText, markTrackAsRecentlyPlayed } from './songsData.js';

const STATS_STORAGE_KEY = 'song_guesser_stats_v1';
const HISTORY_STORAGE_KEY = 'song_guesser_history_v1';

export class GameState {
  constructor() {
    this.currentTrack = null;
    this.playlist = [];
    this.currentIndex = 0;
    this.currentStep = 0; // 0 to 5 (maps to SNIPPET_DURATIONS)
    this.attempts = []; // array of { type: 'wrong' | 'skip' | 'correct', label: string, track?: object }
    this.status = 'playing'; // 'playing' | 'won' | 'lost'
    this.category = 'global-hits';
    this.stats = this.loadStats();
    this.history = this.loadHistory();

    // Callbacks
    this.onStateChange = null;
    this.onGameEnd = null;
  }

  loadStats() {
    try {
      const saved = localStorage.getItem(STATS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load stats from localStorage:', e);
    }
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
    };
  }

  saveStats() {
    try {
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(this.stats));
    } catch (e) {
      console.warn('Failed to save stats to localStorage:', e);
    }
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load history from localStorage:', e);
    }
    return [];
  }

  saveHistory() {
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(this.history));
    } catch (e) {
      console.warn('Failed to save history to localStorage:', e);
    }
  }

  clearHistory() {
    this.history = [];
    this.saveHistory();
  }

  recordHistory(status) {
    if (!this.currentTrack) return;

    markTrackAsRecentlyPlayed(this.currentTrack.id);

    const now = new Date();
    const dateStr = `${now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    const entry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      timestamp: Date.now(),
      dateStr,
      track: {
        id: this.currentTrack.id,
        title: this.currentTrack.title,
        artist: this.currentTrack.artist,
        album: this.currentTrack.album,
        cover: this.currentTrack.cover,
        previewUrl: this.currentTrack.previewUrl,
        spotifyUrl: this.currentTrack.spotifyUrl
      },
      status, // 'won' | 'lost' | 'skipped'
      stepIndex: this.currentStep,
      attemptsCount: this.attempts.length,
      duration: SNIPPET_DURATIONS[this.currentStep] || 30,
      category: this.category
    };

    this.history.unshift(entry);
    // Keep last 50 matches
    if (this.history.length > 50) {
      this.history.pop();
    }
    this.saveHistory();
  }

  recordGameResult(won, stepIndex) {
    this.stats.played += 1;
    if (won) {
      this.stats.wins += 1;
      this.stats.currentStreak += 1;
      if (this.stats.currentStreak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.currentStreak;
      }
      const attemptNum = stepIndex + 1;
      this.stats.guessDistribution[attemptNum] = (this.stats.guessDistribution[attemptNum] || 0) + 1;
    } else {
      this.stats.currentStreak = 0;
    }
    this.saveStats();
  }

  initPlaylist(tracks, category = 'global-hits') {
    this.playlist = tracks;
    this.category = category;
    this.currentIndex = 0;
    this.startRound(this.playlist[0]);
  }

  appendTracks(newTracks) {
    if (!newTracks || newTracks.length === 0) return;
    const existingIds = new Set(this.playlist.map(t => String(t.id)));
    const unique = newTracks.filter(t => !existingIds.has(String(t.id)));
    if (unique.length > 0) {
      this.playlist.push(...unique);
    }
  }

  startRound(track) {
    this.currentTrack = track;
    this.currentStep = 0;
    this.attempts = [];
    this.status = 'playing';

    player.loadTrack(this.currentTrack, SNIPPET_DURATIONS[0]);

    // Preload next track audio immediately so switching songs is instantaneous!
    if (this.playlist.length > 1) {
      const nextIndex = (this.currentIndex + 1) % this.playlist.length;
      const nextTrack = this.playlist[nextIndex];
      if (nextTrack && nextTrack.previewUrl) {
        player.preloadNextTrack(nextTrack.previewUrl, nextTrack.id);
      }
    }

    this._notify();
  }

  nextTrack() {
    if (this.playlist.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.playlist.length;
    this.startRound(this.playlist[this.currentIndex]);
  }

  skipCurrentTrackManually() {
    if (this.status === 'playing' && this.attempts.length > 0) {
      this.recordHistory('skipped');
    }
    this.nextTrack();
  }

  getCurrentDuration() {
    return SNIPPET_DURATIONS[this.currentStep] || 30;
  }

  getNextDuration() {
    if (this.currentStep < SNIPPET_DURATIONS.length - 1) {
      return SNIPPET_DURATIONS[this.currentStep + 1];
    }
    return null;
  }

  /**
   * Check if user's guess is correct
   */
  isCorrectGuess(guessItem) {
    if (!this.currentTrack) return false;

    // Check by track ID if available
    if (guessItem.id && this.currentTrack.id && String(guessItem.id) === String(this.currentTrack.id)) {
      return true;
    }

    const secretTitleNorm = normalizeSongText(this.currentTrack.title);
    const secretArtistNorm = normalizeSongText(this.currentTrack.artist);

    const guessTitleNorm = normalizeSongText(guessItem.title || guessItem.label || '');
    const guessArtistNorm = normalizeSongText(guessItem.artist || '');

    // Direct title match
    if (guessTitleNorm && secretTitleNorm === guessTitleNorm) {
      return true;
    }

    // Full match check (artist + title or title + artist)
    const combinedGuess = guessTitleNorm + guessArtistNorm;
    const combinedSecret1 = secretTitleNorm + secretArtistNorm;
    const combinedSecret2 = secretArtistNorm + secretTitleNorm;

    if (combinedGuess === combinedSecret1 || combinedGuess === combinedSecret2) {
      return true;
    }

    if (guessTitleNorm === combinedSecret1 || guessTitleNorm === combinedSecret2) {
      return true;
    }

    // If combined guess includes secret title
    if (combinedGuess.includes(secretTitleNorm) && secretTitleNorm.length > 2) {
      if (guessArtistNorm || combinedGuess.includes(secretArtistNorm) || secretTitleNorm.length >= 6) {
        return true;
      }
    }

    // Substring matching for minor variations
    if (secretTitleNorm.length > 3 && guessTitleNorm.includes(secretTitleNorm)) {
      return true;
    }

    return false;
  }

  /**
   * Submit an answer or guess
   */
  submitGuess(guessItem) {
    if (this.status !== 'playing') return;

    const isCorrect = this.isCorrectGuess(guessItem);

    if (isCorrect) {
      this.attempts.push({
        type: 'correct',
        label: `${guessItem.title || this.currentTrack.title} — ${guessItem.artist || this.currentTrack.artist}`,
        track: guessItem
      });
      this.status = 'won';
      this.recordGameResult(true, this.currentStep);
      this.recordHistory('won');
      player.playFull(); // allow listening to full song upon winning!
      this._notify();
      if (this.onGameEnd) this.onGameEnd('won', this.currentTrack, this.currentStep);
      return;
    }

    // Wrong guess
    this.attempts.push({
      type: 'wrong',
      label: `${guessItem.title || guessItem.label} — ${guessItem.artist || 'Desconhecido'}`,
      track: guessItem
    });

    this._advanceStep();
  }

  /**
   * Skip current step to reveal more audio snippet
   */
  skipStep() {
    if (this.status !== 'playing') return;

    this.attempts.push({
      type: 'skip',
      label: 'Pulou (+ tempo desbloqueado)'
    });

    this._advanceStep();
  }

  /**
   * Instantly reveal the answer (surrender). Records as a loss,
   * plays the full preview, and fires the game end event.
   */
  revealSong() {
    if (this.status !== 'playing') return;
    if (!this.currentTrack) return;

    this.status = 'lost';
    this.recordGameResult(false, this.currentStep);
    this.recordHistory('lost');
    player.playFull();
    this._notify();
    if (this.onGameEnd) this.onGameEnd('lost', this.currentTrack, this.currentStep);
  }

  _advanceStep() {
    if (this.currentStep < SNIPPET_DURATIONS.length - 1) {
      this.currentStep += 1;
      player.setMaxDuration(SNIPPET_DURATIONS[this.currentStep]);
      this._notify();
    } else {
      // Out of attempts! Loss.
      this.status = 'lost';
      this.recordGameResult(false, this.currentStep);
      this.recordHistory('lost');
      player.playFull();
      this._notify();
      if (this.onGameEnd) this.onGameEnd('lost', this.currentTrack, this.currentStep);
    }
  }

  _notify() {
    if (this.onStateChange) {
      this.onStateChange(this);
    }
  }
}

export const game = new GameState();
