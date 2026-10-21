import confetti from 'canvas-confetti';
import { 
  PLAYLIST_CATEGORIES, 
  fetchPlaylistTracks, 
  searchTracksWithRelevance,
  refreshTrackPreview
} from './songsData.js';
import { player, SNIPPET_DURATIONS } from './audioPlayer.js';
import { game } from './gameState.js';

// DOM Elements
const categoryPillsContainer = document.getElementById('categoryPills');
const currentCategoryTitle = document.getElementById('currentCategoryTitle');
const roundCounterText = document.getElementById('roundCounterText');
const btnSkipSong = document.getElementById('btnSkipSong');

// Player DOM
const vinylDisc = document.getElementById('vinylDisc');
const equalizer = document.getElementById('equalizer');
const mysteryCover = document.getElementById('mysteryCover');
const snippetStatusBadge = document.getElementById('snippetStatusBadge');
const currentTimeDisplay = document.getElementById('currentTimeDisplay');
const maxTimeDisplay = document.getElementById('maxTimeDisplay');
const timelineSegments = document.getElementById('timelineSegments');

const btnMainPlay = document.getElementById('btnMainPlay');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');
const btnReplay = document.getElementById('btnReplay');
const replaySecondsLabel = document.getElementById('replaySecondsLabel');
const btnSkipStep = document.getElementById('btnSkipStep');
const nextSecondsLabel = document.getElementById('nextSecondsLabel');

// Guess and Autocomplete DOM
const songSearchInput = document.getElementById('songSearchInput');
const btnClearSearch = document.getElementById('btnClearSearch');
const autocompleteDropdown = document.getElementById('autocompleteDropdown');
const btnSubmitGuess = document.getElementById('btnSubmitGuess');

// Attempts DOM
const attemptsRemainingCount = document.getElementById('attemptsRemainingCount');
const attemptsList = document.getElementById('attemptsList');

// Bottom Player DOM
const miniAlbumArt = document.getElementById('miniAlbumArt');
const miniSongTitle = document.getElementById('miniSongTitle');
const miniArtist = document.getElementById('miniArtist');
const footerPlayBtn = document.getElementById('footerPlayBtn');
const footerPlayIcon = document.getElementById('footerPlayIcon');
const miniProgressFill = document.getElementById('miniProgressFill');

// Volume DOM
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');

// Modals DOM
const historyBtn = document.getElementById('historyBtn');
const historyModal = document.getElementById('historyModal');
const btnCloseHistory = document.getElementById('btnCloseHistory');
const btnClearHistory = document.getElementById('btnClearHistory');
const historyList = document.getElementById('historyList');
const historyCountSub = document.getElementById('historyCountSub');

const statsBtn = document.getElementById('statsBtn');
const statsModal = document.getElementById('statsModal');
const btnCloseStats = document.getElementById('btnCloseStats');
const statPlayed = document.getElementById('statPlayed');
const statWinRate = document.getElementById('statWinRate');
const statCurrentStreak = document.getElementById('statCurrentStreak');
const statMaxStreak = document.getElementById('statMaxStreak');
const distribBars = document.getElementById('distribBars');

const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const btnCloseHelp = document.getElementById('btnCloseHelp');
const btnGotItHelp = document.getElementById('btnGotItHelp');

const customArtistModal = document.getElementById('customArtistModal');
const btnCloseCustomArtist = document.getElementById('btnCloseCustomArtist');
const customArtistInput = document.getElementById('customArtistInput');
const btnStartCustomGame = document.getElementById('btnStartCustomGame');

const resultModal = document.getElementById('resultModal');
const resultBadge = document.getElementById('resultBadge');
const resultTitle = document.getElementById('resultTitle');
const resultSubtitle = document.getElementById('resultSubtitle');
const revealAlbumCover = document.getElementById('revealAlbumCover');
const revealSongTitle = document.getElementById('revealSongTitle');
const revealArtist = document.getElementById('revealArtist');
const revealAlbum = document.getElementById('revealAlbum');
const btnPlayFullReveal = document.getElementById('btnPlayFullReveal');
const btnOpenSpotify = document.getElementById('btnOpenSpotify');
const btnNextSong = document.getElementById('btnNextSong');
const btnRevealSong = document.getElementById('btnRevealSong');

// Local State
let selectedSuggestion = null;
let searchDebounceTimer = null;
let activeDropdownIndex = -1;

/* ==========================================================================
   Initialization
   ========================================================================== */

async function initApp() {
  renderCategoryPills();
  renderTimelineSegments();
  renderAttempts();
  setupAudioCallbacks();
  setupEventListeners();

  // Load initial default playlist
  await loadCategory('global-hits');
}

/**
 * Render Category selection buttons
 */
function renderCategoryPills() {
  categoryPillsContainer.innerHTML = '';

  PLAYLIST_CATEGORIES.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = `cat-pill ${cat.id === game.category ? 'active' : ''}`;
    pill.dataset.catId = cat.id;
    pill.innerHTML = `<span>${cat.icon}</span> <span>${cat.name}</span>`;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      loadCategory(cat.id);
    });
    categoryPillsContainer.appendChild(pill);
  });

  // Custom Artist pill
  const customPill = document.createElement('button');
  customPill.className = 'cat-pill custom-btn';
  customPill.dataset.catId = 'custom';
  customPill.innerHTML = `<span>🔍</span> <span>Outro Artista</span>`;
  customPill.addEventListener('click', () => {
    customPill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    openModal(customArtistModal);
    customArtistInput.focus();
  });
  categoryPillsContainer.appendChild(customPill);
}

/**
 * Load tracks for category and start round
 */
async function loadCategory(catId, customArtist = null) {
  const catObj = PLAYLIST_CATEGORIES.find(c => c.id === catId);
  currentCategoryTitle.textContent = customArtist 
    ? `Artista: ${customArtist}` 
    : (catObj ? catObj.name : 'Músicas');

  roundCounterText.textContent = 'Carregando músicas...';

  try {
    const tracks = await fetchPlaylistTracks(catId, customArtist);
    if (tracks && tracks.length > 0) {
      game.initPlaylist(tracks, catId);
      updateRoundCounter();
    } else {
      roundCounterText.textContent = 'Nenhuma música encontrada.';
    }
  } catch (err) {
    console.error('Failed to load playlist:', err);
    roundCounterText.textContent = 'Erro ao carregar.';
  }
}

function updateRoundCounter() {
  roundCounterText.textContent = `Música ${game.currentIndex + 1} de ${game.playlist.length}`;
}

/* ==========================================================================
   Timeline Segments Rendering & Updates
   ========================================================================== */

function renderTimelineSegments() {
  timelineSegments.innerHTML = '';
  const total = 30; // total seconds (30s)

  // Segment intervals: 0-1 (1s), 1-3 (2s), 3-5 (2s), 5-10 (5s), 10-16 (6s), 16-30 (14s)
  const segmentLengths = [1, 2, 2, 5, 6, 14];
  const stepCumulative = [1, 3, 5, 10, 16, 30];

  segmentLengths.forEach((len, idx) => {
    const seg = document.createElement('div');
    const widthPercent = (len / total) * 100;
    seg.className = `time-segment ${idx <= game.currentStep ? 'unlocked' : ''} ${idx === game.currentStep ? 'active-snippet' : ''}`;
    seg.style.flex = `${len}`;
    seg.id = `segment-${idx}`;

    const fill = document.createElement('div');
    fill.className = 'segment-fill';
    fill.id = `segment-fill-${idx}`;

    const label = document.createElement('span');
    label.className = 'segment-label';
    label.textContent = `${stepCumulative[idx]}s`;

    seg.appendChild(fill);
    seg.appendChild(label);
    timelineSegments.appendChild(seg);
  });
}

function updateTimelineSegmentsUI() {
  const currentDuration = game.getCurrentDuration();
  currentTimeDisplay.textContent = '0.0s';
  maxTimeDisplay.textContent = `${currentDuration}s (de 30s)`;

  // Update segments unlocked / active state
  for (let i = 0; i < SNIPPET_DURATIONS.length; i++) {
    const seg = document.getElementById(`segment-${i}`);
    const fill = document.getElementById(`segment-fill-${i}`);
    if (seg) {
      if (i <= game.currentStep) {
        seg.classList.add('unlocked');
      } else {
        seg.classList.remove('unlocked');
      }

      if (i === game.currentStep) {
        seg.classList.add('active-snippet');
      } else {
        seg.classList.remove('active-snippet');
      }
    }
    if (fill) {
      fill.style.width = '0%';
    }
  }

  // Update labels
  snippetStatusBadge.innerHTML = `🎧 Trecho atual: <strong>${currentDuration} segundo${currentDuration > 1 ? 's' : ''}</strong>`;
  replaySecondsLabel.textContent = `${currentDuration}s`;

  const nextDuration = game.getNextDuration();
  if (nextDuration) {
    const diff = nextDuration - currentDuration;
    btnSkipStep.classList.remove('hidden');
    nextSecondsLabel.textContent = `${diff}s`;
  } else {
    btnSkipStep.classList.add('hidden');
  }
}

/**
 * Updates fill of segments during playback
 */
function updateProgress(currentTime, maxDuration) {
  currentTimeDisplay.textContent = `${currentTime.toFixed(1)}s`;

  const total = 30;
  const stepThresholds = [0, 1, 3, 5, 10, 16, 30];

  for (let i = 0; i < SNIPPET_DURATIONS.length; i++) {
    const fill = document.getElementById(`segment-fill-${i}`);
    if (!fill) continue;

    const segStart = stepThresholds[i];
    const segEnd = stepThresholds[i + 1];
    const segLen = segEnd - segStart;

    if (currentTime >= segEnd) {
      fill.style.width = '100%';
    } else if (currentTime > segStart) {
      const progressInSeg = ((currentTime - segStart) / segLen) * 100;
      fill.style.width = `${Math.min(100, Math.max(0, progressInSeg))}%`;
    } else {
      fill.style.width = '0%';
    }
  }

  // Mini progress bar in bottom player
  const overallPercent = maxDuration > 0 ? (currentTime / maxDuration) * 100 : 0;
  miniProgressFill.style.width = `${overallPercent}%`;
}

/* ==========================================================================
   Attempts Board
   ========================================================================== */

function renderAttempts() {
  attemptsList.innerHTML = '';
  const maxAttempts = 6;
  const remaining = maxAttempts - game.attempts.length;
  attemptsRemainingCount.textContent = remaining;

  for (let i = 0; i < maxAttempts; i++) {
    const attempt = game.attempts[i];
    const row = document.createElement('div');

    if (!attempt) {
      row.className = 'attempt-row empty';
      row.innerHTML = `
        <span class="attempt-index">${i + 1}</span>
        <span class="attempt-status-icon">○</span>
        <span class="attempt-text">Tentativa vazia</span>
      `;
    } else if (attempt.type === 'correct') {
      row.className = 'attempt-row correct';
      row.innerHTML = `
        <span class="attempt-index">${i + 1}</span>
        <span class="attempt-status-icon">✓</span>
        <span class="attempt-text">${attempt.label}</span>
      `;
    } else if (attempt.type === 'skip') {
      row.className = 'attempt-row skip';
      row.innerHTML = `
        <span class="attempt-index">${i + 1}</span>
        <span class="attempt-status-icon">⏭</span>
        <span class="attempt-text">${attempt.label}</span>
      `;
    } else {
      row.className = 'attempt-row wrong';
      row.innerHTML = `
        <span class="attempt-index">${i + 1}</span>
        <span class="attempt-status-icon">✕</span>
        <span class="attempt-text">${attempt.label}</span>
      `;
    }

    attemptsList.appendChild(row);
  }
}

/* ==========================================================================
   Audio Callbacks & UI Sync
   ========================================================================== */

function setupAudioCallbacks() {
  player.onProgress = (currentTime, maxDuration) => {
    updateProgress(currentTime, maxDuration);
  };

  player.onStateChange = (isPlaying) => {
    if (isPlaying) {
      playIcon.classList.add('hidden');
      pauseIcon.classList.remove('hidden');
      footerPlayIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      vinylDisc.classList.add('playing');
      equalizer.classList.add('active');
    } else {
      playIcon.classList.remove('hidden');
      pauseIcon.classList.add('hidden');
      footerPlayIcon.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"/>';
      vinylDisc.classList.remove('playing');
      equalizer.classList.remove('active');
    }
  };

  player.onError = async (err) => {
    console.warn('Audio playback error, auto-healing...', err);
    const badge = document.getElementById('snippetStatusBadge');
    if (badge) {
      badge.innerHTML = '⚠️ <em>Atualizando áudio da música...</em>';
    }
    const healed = await refreshTrackPreview(game.currentTrack);
    if (healed && healed.previewUrl) {
      game.currentTrack.previewUrl = healed.previewUrl;
      player.loadTrack(game.currentTrack, game.getCurrentDuration());
      updateTimelineSegmentsUI();
      player.play();
    } else {
      setTimeout(() => {
        game.nextTrack();
        updateRoundCounter();
      }, 700);
    }
  };

  // Game state listeners
  game.onStateChange = () => {
    updateTimelineSegmentsUI();
    renderAttempts();
  };

  game.onGameEnd = (result, track, stepIndex) => {
    showResultModal(result, track, stepIndex);
  };

  // Loading state: show spinner on play button and vinyl disc while audio buffers
  player.onReadyChange = (isReady) => {
    const badge = document.getElementById('snippetStatusBadge');
    const dur = game.getCurrentDuration();
    if (isReady) {
      btnMainPlay.classList.remove('loading');
      vinylDisc.classList.remove('loading');
      if (badge && !player.isPlaying) {
        badge.innerHTML = `🎧 Trecho atual: <strong>${dur} segundo${dur > 1 ? 's' : ''}</strong>`;
      }
    } else {
      btnMainPlay.classList.add('loading');
      vinylDisc.classList.add('loading');
      if (badge) {
        badge.innerHTML = '<span class="loading-pulse-badge">⏳ Carregando áudio da música...</span>';
      }
    }
  };
}

/* ==========================================================================
   Search Autocomplete
   ========================================================================== */

function setupAutocomplete() {
  songSearchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim();

    if (val.length > 0) {
      btnClearSearch.classList.remove('hidden');
    } else {
      btnClearSearch.classList.add('hidden');
      autocompleteDropdown.classList.add('hidden');
      return;
    }

    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(async () => {
      // Relevance-ranked search: prioritizes exact song + artist matches and secret song
      const results = await searchTracksWithRelevance(
        val,
        game.currentTrack,
        game.playlist,
        10
      );

      renderSuggestions(results);
    }, 150);
  });

  songSearchInput.addEventListener('keydown', (e) => {
    const items = autocompleteDropdown.querySelectorAll('.suggestion-item');
    if (!items.length || autocompleteDropdown.classList.contains('hidden')) {
      if (e.key === 'Enter') {
        e.preventDefault();
        submitCurrentInput();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeDropdownIndex = (activeDropdownIndex + 1) % items.length;
      updateSuggestionSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeDropdownIndex = (activeDropdownIndex - 1 + items.length) % items.length;
      updateSuggestionSelection(items);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeDropdownIndex >= 0 && items[activeDropdownIndex]) {
        items[activeDropdownIndex].click();
      } else {
        submitCurrentInput();
      }
    } else if (e.key === 'Escape') {
      autocompleteDropdown.classList.add('hidden');
    }
  });

  btnClearSearch.addEventListener('click', () => {
    songSearchInput.value = '';
    selectedSuggestion = null;
    btnClearSearch.classList.add('hidden');
    autocompleteDropdown.classList.add('hidden');
    songSearchInput.focus();
  });

  document.addEventListener('click', (e) => {
    if (!songSearchInput.contains(e.target) && !autocompleteDropdown.contains(e.target)) {
      autocompleteDropdown.classList.add('hidden');
    }
  });
}

function updateSuggestionSelection(items) {
  items.forEach((item, idx) => {
    if (idx === activeDropdownIndex) {
      item.classList.add('selected');
      item.scrollIntoView({ block: 'nearest' });
    } else {
      item.classList.remove('selected');
    }
  });
}

function renderSuggestions(list) {
  if (list.length === 0) {
    autocompleteDropdown.innerHTML = '<div style="padding: 10px; color: #727272; font-size: 0.85rem; text-align: center;">Nenhuma música encontrada</div>';
    autocompleteDropdown.classList.remove('hidden');
    return;
  }

  autocompleteDropdown.innerHTML = '';
  activeDropdownIndex = -1;

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.innerHTML = `
      <img src="${item.cover || 'https://via.placeholder.com/40'}" alt="" class="suggestion-art" />
      <div class="suggestion-text">
        <span class="suggestion-title">${item.title}</span>
        <span class="suggestion-artist">${item.artist}</span>
      </div>
    `;

    div.addEventListener('click', () => {
      selectedSuggestion = item;
      songSearchInput.value = `${item.title} — ${item.artist}`;
      autocompleteDropdown.classList.add('hidden');
    });

    autocompleteDropdown.appendChild(div);
  });

  autocompleteDropdown.classList.remove('hidden');
}

function submitCurrentInput() {
  const text = songSearchInput.value.trim();
  if (!text) return;

  const guessItem = selectedSuggestion || {
    title: text,
    label: text,
    artist: ''
  };

  game.submitGuess(guessItem);
  songSearchInput.value = '';
  selectedSuggestion = null;
  btnClearSearch.classList.add('hidden');
  autocompleteDropdown.classList.add('hidden');
}

/* ==========================================================================
   Result Modal & Celebration
   ========================================================================== */

function showResultModal(status, track, stepIndex) {
  openModal(resultModal);

  revealAlbumCover.src = track.cover;
  revealSongTitle.textContent = track.title;
  revealArtist.textContent = track.artist;
  revealAlbum.textContent = track.album || '';
  btnOpenSpotify.href = track.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(track.artist + ' ' + track.title)}`;

  // Update bottom player bar with real cover & details
  miniAlbumArt.innerHTML = `<img src="${track.cover}" alt="Capa" />`;
  miniSongTitle.textContent = track.title;
  miniArtist.textContent = track.artist;

  if (status === 'won') {
    resultBadge.textContent = '🎉 Mandou Bem!';
    resultBadge.className = 'result-badge';
    resultTitle.textContent = 'Você Acertou!';
    
    const sec = SNIPPET_DURATIONS[stepIndex];
    resultSubtitle.textContent = `Sensacional! Você identificou a música em ${sec} segundo${sec > 1 ? 's' : ''}!`;

    // Confetti explosion!
    launchCelebrationConfetti();
  } else {
    resultBadge.textContent = '✕ Fim de Jogo';
    resultBadge.className = 'result-badge defeat';
    resultTitle.textContent = 'Não foi dessa vez!';
    resultSubtitle.textContent = 'Você usou todas as 6 tentativas. A música secreta era:';
  }
}

function launchCelebrationConfetti() {
  try {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#1ed760', '#ffffff', '#1db954', '#2ebd59', '#ffd700']
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#1ed760', '#1db954', '#ffffff']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#1ed760', '#1db954', '#ffffff']
      });
    }, 250);
  } catch (e) {
    console.warn('Confetti failed to trigger:', e);
  }
}

/* ==========================================================================
   Modals & Stats Logic
   ========================================================================== */

function openModal(modal) {
  modal.classList.remove('hidden');
}

function closeModal(modal) {
  modal.classList.add('hidden');
}

function updateStatsModal() {
  const stats = game.stats;
  statPlayed.textContent = stats.played;
  
  const winRate = stats.played > 0 ? Math.round((stats.wins / stats.played) * 100) : 0;
  statWinRate.textContent = `${winRate}%`;
  statCurrentStreak.textContent = stats.currentStreak;
  statMaxStreak.textContent = stats.maxStreak;

  // Render Distribution histogram
  distribBars.innerHTML = '';
  const maxWins = Math.max(1, ...Object.values(stats.guessDistribution));

  SNIPPET_DURATIONS.forEach((dur, idx) => {
    const stepNum = idx + 1;
    const count = stats.guessDistribution[stepNum] || 0;
    const widthPct = Math.max(7, (count / maxWins) * 100);

    const row = document.createElement('div');
    row.className = 'distrib-row';
    row.innerHTML = `
      <span class="distrib-step-label">${dur}s</span>
      <div class="distrib-bar-track">
        <div class="distrib-bar-fill" style="width: ${count > 0 ? widthPct : 7}%">
          ${count}
        </div>
      </div>
    `;
    distribBars.appendChild(row);
  });
}

/**
 * Render Match History Modal
 */
function renderHistoryModal() {
  const history = game.history;
  historyCountSub.textContent = history.length > 0
    ? `${history.length} música${history.length > 1 ? 's' : ''} jogada${history.length > 1 ? 's' : ''}`
    : 'Nenhuma música jogada ainda';

  if (!history || history.length === 0) {
    historyList.innerHTML = `
      <div class="history-empty">
        <p>Você ainda não jogou nenhuma música.</p>
        <p style="font-size: 0.8rem; margin-top: 6px; color: var(--text-subtle);">
          Suas tentativas e acertos aparecerão aqui automaticamente!
        </p>
      </div>
    `;
    return;
  }

  historyList.innerHTML = '';
  history.forEach(item => {
    const row = document.createElement('div');
    row.className = 'history-item';

    let badgeClass = 'lost';
    let badgeText = `✕ Não acertou (6 tentativas)`;

    if (item.status === 'won') {
      badgeClass = 'won';
      badgeText = `✓ Acertou na ${item.attemptsCount}ª tentativa (${item.duration}s)`;
    } else if (item.status === 'skipped') {
      badgeClass = 'skipped';
      badgeText = `↷ Pulou a música`;
    }

    row.innerHTML = `
      <img src="${item.track.cover || 'https://via.placeholder.com/52'}" alt="" class="history-cover" />
      <div class="history-details">
        <span class="history-title">${item.track.title}</span>
        <span class="history-artist">${item.track.artist}</span>
        <span class="history-date">${item.dateStr}</span>
      </div>
      <div class="history-badge-col">
        <span class="history-badge ${badgeClass}">${badgeText}</span>
        ${item.track.spotifyUrl ? `
          <a href="${item.track.spotifyUrl}" target="_blank" rel="noopener noreferrer" class="history-spotify-link">
            <span>Spotify</span> ↗
          </a>
        ` : ''}
      </div>
    `;

    historyList.appendChild(row);
  });
}

/* ==========================================================================
   Event Listeners
   ========================================================================== */

function setupEventListeners() {
  // Playback buttons
  btnMainPlay.addEventListener('click', () => player.togglePlay());
  footerPlayBtn.addEventListener('click', () => player.togglePlay());
  btnReplay.addEventListener('click', () => player.replay());

  // Skip Step button
  btnSkipStep.addEventListener('click', () => {
    game.skipStep();
  });

  // Skip Song button (next track)
  btnSkipSong.addEventListener('click', () => {
    game.skipCurrentTrackManually();
    updateRoundCounter();
  });

  // Submit guess button
  btnSubmitGuess.addEventListener('click', () => submitCurrentInput());

  // Play Full Reveal button in Modal
  btnPlayFullReveal.addEventListener('click', () => {
    player.playFull();
  });

  // Reveal / Surrender button — two-click confirmation pattern
  let revealPendingConfirm = false;
  let revealResetTimer = null;

  btnRevealSong.addEventListener('click', () => {
    if (game.status !== 'playing') return;

    if (!revealPendingConfirm) {
      // First click: change button text to confirm state
      revealPendingConfirm = true;
      btnRevealSong.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span>Confirmar Desistência?</span>
      `;
      btnRevealSong.style.borderColor = 'rgba(233, 20, 41, 0.7)';
      btnRevealSong.style.background = 'rgba(233, 20, 41, 0.2)';

      // Auto-reset after 3 seconds if not confirmed
      revealResetTimer = setTimeout(() => {
        revealPendingConfirm = false;
        btnRevealSong.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
          <span>Revelar Resposta (Desistir)</span>
        `;
        btnRevealSong.style.borderColor = '';
        btnRevealSong.style.background = '';
      }, 3000);
    } else {
      // Second click: actually reveal!
      clearTimeout(revealResetTimer);
      revealPendingConfirm = false;
      game.revealSong();

      // Reset button text for next round
      btnRevealSong.innerHTML = `
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        <span>Revelar Resposta (Desistir)</span>
      `;
      btnRevealSong.style.borderColor = '';
      btnRevealSong.style.background = '';
    }
  });

  // Next Song button in modal
  btnNextSong.addEventListener('click', () => {
    closeModal(resultModal);
    game.nextTrack();
    updateRoundCounter();
    // Reset mini-player to mystery mode
    miniAlbumArt.innerHTML = '<span>🎵</span>';
    miniSongTitle.textContent = 'Música Misteriosa';
    miniArtist.textContent = 'Song Guesser';
  });

  // Volume slider & Mute
  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    player.setVolume(val);
  });

  muteBtn.addEventListener('click', () => {
    const isMuted = player.toggleMute();
    muteBtn.style.opacity = isMuted ? '0.4' : '1';
  });

  // History Modal
  historyBtn.addEventListener('click', () => {
    renderHistoryModal();
    openModal(historyModal);
  });
  btnCloseHistory.addEventListener('click', () => closeModal(historyModal));
  btnClearHistory.addEventListener('click', () => {
    if (confirm('Deseja realmente limpar todo o histórico de partidas?')) {
      game.clearHistory();
      renderHistoryModal();
    }
  });

  // Stats Modal
  statsBtn.addEventListener('click', () => {
    updateStatsModal();
    openModal(statsModal);
  });
  btnCloseStats.addEventListener('click', () => closeModal(statsModal));

  // Help Modal
  helpBtn.addEventListener('click', () => openModal(helpModal));
  btnCloseHelp.addEventListener('click', () => closeModal(helpModal));
  btnGotItHelp.addEventListener('click', () => closeModal(helpModal));

  // Custom Artist Modal
  btnCloseCustomArtist.addEventListener('click', () => closeModal(customArtistModal));
  btnStartCustomGame.addEventListener('click', () => {
    const artist = customArtistInput.value.trim();
    if (artist) {
      closeModal(customArtistModal);
      loadCategory('custom', artist);
      customArtistInput.value = '';
    }
  });

  document.querySelectorAll('.artist-tag-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const artist = btn.dataset.artist;
      closeModal(customArtistModal);
      loadCategory('custom', artist);
    });
  });

  // Close modals on clicking outside backdrop
  [statsModal, helpModal, customArtistModal, historyModal, resultModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modal);
    });
  });

  // Spacebar shortcut to play/pause
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && document.activeElement !== songSearchInput && document.activeElement !== customArtistInput) {
      e.preventDefault();
      player.togglePlay();
    }
  });

  setupAutocomplete();
}

// Start app
initApp();
