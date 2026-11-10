// Curated playlists and iTunes API music service with dynamic caching, multi-artist diversity, and smart relevance search

export const PLAYLIST_CATEGORIES = [
  {
    id: 'global-hits',
    name: 'Top Hits Globais',
    desc: 'Os maiores sucessos mundiais das paradas',
    icon: '🌍',
    gradient: 'linear-gradient(135deg, #450af5, #8e8ee5)',
    artists: [
      'The Weeknd', 'Dua Lipa', 'Harry Styles', 'Billie Eilish',
      'Taylor Swift', 'Ed Sheeran', 'Bruno Mars', 'Coldplay',
      'Post Malone', 'Adele', 'Imagine Dragons', 'Rihanna',
      'Justin Bieber', 'Maroon 5', 'Shawn Mendes', 'Sam Smith',
      'Charlie Puth', 'Sia', 'OneRepublic', 'Lewis Capaldi',
      'Olivia Rodrigo', 'Miley Cyrus', 'Benson Boone', 'Teddy Swims'
    ]
  },
  {
    id: 'rap-hiphop',
    name: 'Só Rap',
    desc: 'O melhor do Rap Nacional e Hip-Hop Mundial',
    icon: '🎤',
    gradient: 'linear-gradient(135deg, #f59e0b, #b45309)',
    artists: [
      'Eminem', 'Tupac', 'Kendrick Lamar', 'Drake', 'Travis Scott',
      '50 Cent', 'Snoop Dogg', 'Kanye West', 'Jay-Z', 'Dr. Dre',
      'Matuê', 'Racionais MCs', 'Djonga', 'BK', 'YoungBoy Never Broke Again',
      'J. Cole', 'Lil Wayne', 'The Notorious BIG', 'Sabotage', 'Young Thug',
      'Lil Durk', 'Quando Rondo', 'Gunna', 'Lil Tjay', 'King Von', 'Future',
      'BigXthaPlug', 'YNW Melly', 'Lil Baby', 'Central Cee', 'Costa Gold',
      'Lil Uzi Vert', '21 Savage', 'Offset', 'Polo G', 'Juice WRLD', 'XXXTentacion',
      'Playboi Carti', 'Lil Peep', 'Trippie Redd', 'Chief Keef', 'Quavo', 'JayDaYoungan',
      'Raffa Moreira', 'Wiz Khalifa', 'Migos', 'Pop Smoke'
    ]
  },
  {
    id: 'brasil-hits',
    name: 'Hits Brasil',
    desc: 'O melhor do Pop, Funk, Sertanejo e MPB',
    icon: '🇧🇷',
    gradient: 'linear-gradient(135deg, #057a3e, #f5c518)',
    artists: [
      'Péricles', 'Charlie Brown Jr', 'NX Zero', 'Chitãozinho & Xororó',
      'Trio Parada Dura', 'Alok', 'Leandro & Leonardo', 'Edson & Hudson',
      'Zezé di Camargo & Luciano', 'Bruno & Marrone', 'Natiruts', 'Skank',
      'Jorge e Mateus', 'Henrique e Juliano', 'Marília Mendonça',
      'Thiaguinho', 'Ferrugem', 'Ivete Sangalo', 'Tim Maia',
      'Luan Santana', 'Belo', 'Milionário & José Rico', 'Legião Urbana',
      'Pablo', 'Roberto Carlos'
    ]
  },
  {
    id: 'rock-classics',
    name: 'Rock Clássico & 2000s',
    desc: 'Guitarras marcantes e hinos inesquecíveis',
    icon: '🎸',
    gradient: 'linear-gradient(135deg, #b01010, #ff5722)',
    artists: [
      'Linkin Park', 'Nirvana', 'Red Hot Chili Peppers',
      'Bon Jovi', 'AC/DC', 'Guns N Roses', 'Green Day',
      'Foo Fighters', 'System of a Down', 'Metallica',
      'Iron Maiden', 'Ozzy Osbourne', 'Pearl Jam',
      'The Beatles', 'The Rolling Stones', 'Aerosmith', 'Kiss',
      'Creed', 'Scorpions', 'Audioslave', 'Alice in Chains',
      'Staind'
    ]
  },
  {
    id: 'nostalgia-80-90',
    name: 'Flashback 80s & 90s',
    desc: 'As músicas que marcaram gerações de ouro',
    icon: '📼',
    gradient: 'linear-gradient(135deg, #9c27b0, #e91e63)',
    artists: [
      'Michael Jackson', 'Madonna', 'a-ha', 'Whitney Houston',
      'ABBA', 'Cyndi Lauper', 'George Michael', 'Backstreet Boys',
      'Britney Spears', 'Tears for Fears', 'Wham!', 'Spice Girls',
      'Prince', 'Elton John', 'Phil Collins', 'Roxette',
      'Bonnie Tyler', 'Modern Talking', 'Alphaville', 'Simple Minds'
    ]
  },
  {
    id: 'pop-divas',
    name: 'Pop Divas',
    desc: 'Vozes poderosas e hits inconfundíveis',
    icon: '👑',
    gradient: 'linear-gradient(135deg, #ff007f, #7928ca)',
    artists: [
      'Beyoncé', 'Lady Gaga', 'Ariana Grande', 'Katy Perry',
      'Shakira', 'Rihanna', 'Miley Cyrus', 'Kylie Minogue',
      'Selena Gomez', 'Doja Cat', 'Olivia Rodrigo', 'SZA',
      'Dua Lipa', 'Taylor Swift', 'Britney Spears', 'Christina Aguilera'
    ]
  },
  {
    id: 'sertanejo',
    name: 'Sertanejo',
    desc: 'Os maiores clássicos e sucessos do sertanejo',
    icon: '🤠',
    gradient: 'linear-gradient(135deg, #ea580c, #f59e0b)',
    artists: [
      'Marília Mendonça', 'Jorge & Mateus', 'Henrique & Juliano',
      'Gusttavo Lima', 'Zé Neto & Cristiano', 'Maiara & Maraisa',
      'Luan Santana', 'Matheus & Kauan', 'Ana Castela', 'Simone Mendes',
      'Chitãozinho & Xororó', 'Bruno & Marrone', 'Leandro & Leonardo',
      'Trio Parada Dura', 'Victor & Leo', 'Hugo & Guilherme'
    ]
  },
  {
    id: 'funk-brasil',
    name: 'Funk Brasil',
    desc: 'Os maiores sucessos do funk e das pistas',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #e11d48, #fb7185)',
    artists: [
      'MC Kevin o Chris', 'MC Ryan SP', 'MC Hariel', 'Anitta',
      'Pedro Sampaio', 'Ludmilla', 'Dennis DJ', 'MC Livinho',
      'MC Don Juan', 'MC Cabelinho', 'Gloria Groove', 'MC Daniel',
      'MC Poze do Rodo', 'DJ Gabriel do Borel'
    ]
  }
];

// In-memory cache of dynamically fetched fresh tracks
export const CATEGORY_CACHE = {};

// Track IDs played in recent sessions to avoid repetition
const RECENT_PLAYED_KEY = 'song_guesser_recent_played_ids';
const RECENT_ARTISTS_KEY = 'song_guesser_recent_artists';

export function getRecentlyPlayedIds() {
  try {
    const data = sessionStorage.getItem(RECENT_PLAYED_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function markTrackAsRecentlyPlayed(trackId) {
  try {
    const recent = getRecentlyPlayedIds();
    recent.push(String(trackId));
    if (recent.length > 50) recent.shift();
    sessionStorage.setItem(RECENT_PLAYED_KEY, JSON.stringify(recent));
  } catch { }
}

export function getRecentlyPlayedArtists() {
  try {
    const data = sessionStorage.getItem(RECENT_ARTISTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function markArtistAsRecentlyPlayed(artistName) {
  if (!artistName) return;
  try {
    const recent = getRecentlyPlayedArtists();
    const norm = normalizeSongText(artistName);
    if (!recent.includes(norm)) {
      recent.push(norm);
      if (recent.length > 30) recent.shift();
      sessionStorage.setItem(RECENT_ARTISTS_KEY, JSON.stringify(recent));
    }
  } catch { }
}

/**
 * Robust Fisher-Yates shuffle for unbiased true randomization
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Normalizes song strings for accurate fuzzy matching
 */
export function normalizeSongText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\(.*?\)/g, '') // remove parenthesized details
    .replace(/\[.*?\]/g, '') // remove brackets
    .replace(/feat\..*$/i, '')
    .replace(/ft\..*$/i, '')
    .replace(/[^a-z0-9]/g, '') // keep alphanumeric only
    .trim();
}

/**
 * Cleans user search input for iTunes and fuzzy matching (removes hyphens, quotes, brackets)
 */
export function cleanSearchQuery(query) {
  if (!query) return '';
  return query
    .replace(/[-–—/\\_|"()[\]]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Searches iTunes API for autocomplete suggestions (returns up to limit raw items)
 */
export async function searchTracksApi(query, limit = 25) {
  const cleaned = cleanSearchQuery(query);
  if (!cleaned || cleaned.length < 2) return [];

  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleaned)}&entity=song&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network error');
    const data = await res.json();
    return (data.results || [])
      .filter(item => item.trackName && item.artistName)
      .map(item => ({
        id: item.trackId,
        title: item.trackName,
        artist: item.artistName,
        album: item.collectionName,
        cover: item.artworkUrl100?.replace('100x100bb', '300x300bb') || item.artworkUrl60,
        previewUrl: item.previewUrl,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.trackName)}`
      }));
  } catch (err) {
    console.error('Error in searchTracksApi:', err);
    return [];
  }
}

/**
 * Smart Search with Relevance Ranking:
 * Ensures that when a user types "Song Artist" or "Artist Song" or pastes "Artist - Song",
 * the exact target song appears at the very top of the suggestions!
 */
export async function searchTracksWithRelevance(query, currentTrack = null, extraLibrary = [], limit = 10) {
  const rawQuery = (query || '').trim();
  const cleaned = cleanSearchQuery(rawQuery);
  if (!cleaned || cleaned.length < 2) return [];

  const queryNorm = normalizeSongText(cleaned);
  const queryTokens = cleaned.toLowerCase().split(/\s+/).filter(t => t.length > 1);

  // 1. Gather local candidates (current secret song, playlist tracks, cached category tracks)
  const localCandidates = [];
  if (currentTrack && currentTrack.title) {
    localCandidates.push({ ...currentTrack, isSecret: true });
  }
  if (Array.isArray(extraLibrary)) {
    localCandidates.push(...extraLibrary);
  }
  Object.values(CATEGORY_CACHE).forEach(trackList => {
    if (Array.isArray(trackList)) {
      localCandidates.push(...trackList);
    }
  });

  // 2. Fetch remote results from iTunes API (up to 30 items for high recall)
  const apiResults = await searchTracksApi(cleaned, 30);

  // If query had multiple words and iTunes returned few results, try first 2 words
  let fallbackApiResults = [];
  if (apiResults.length < 5 && queryTokens.length > 2) {
    const shortened = queryTokens.slice(0, 2).join(' ');
    fallbackApiResults = await searchTracksApi(shortened, 15);
  }

  // 3. Merge candidates with deduplication
  const mergedMap = new Map();
  const getDedupeKey = (item) => `${normalizeSongText(item.title)}|||${normalizeSongText(item.artist)}`;

  // Local candidates first
  localCandidates.forEach(item => {
    if (!item || !item.title) return;
    const key = getDedupeKey(item);
    if (!mergedMap.has(key)) {
      mergedMap.set(key, { ...item, itunesRank: 999 });
    }
  });

  // Then API results
  [...apiResults, ...fallbackApiResults].forEach((item, idx) => {
    if (!item || !item.title) return;
    const key = getDedupeKey(item);
    if (!mergedMap.has(key)) {
      mergedMap.set(key, { ...item, itunesRank: idx });
    } else {
      const existing = mergedMap.get(key);
      existing.itunesRank = Math.min(existing.itunesRank, idx);
      if (!existing.cover && item.cover) existing.cover = item.cover;
      if (!existing.previewUrl && item.previewUrl) existing.previewUrl = item.previewUrl;
    }
  });

  // 4. Calculate relevance scores
  const scored = [];
  for (const item of mergedMap.values()) {
    const titleNorm = normalizeSongText(item.title);
    const artistNorm = normalizeSongText(item.artist);
    const titleLower = item.title.toLowerCase();
    const artistLower = item.artist.toLowerCase();

    let score = 0;

    // Secret song bonus if it matches any part of query
    if (item.isSecret) {
      score += 500;
    }

    // Custom playlist track bonus: prioritize songs from the user's custom playlist
    if (item.isCustomPlaylistTrack) {
      score += 750;
    }

    // Exact title match
    if (titleNorm === queryNorm) {
      score += 2000;
    }

    // Combined exact match: "bohemianrhapsodyqueen" or "queenbohemianrhapsody"
    const combined1 = titleNorm + artistNorm;
    const combined2 = artistNorm + titleNorm;
    if (combined1 === queryNorm || combined2 === queryNorm) {
      score += 2500;
    }

    // Substring matches
    if (titleNorm.includes(queryNorm)) {
      score += 1200;
    } else if (combined1.includes(queryNorm) || combined2.includes(queryNorm)) {
      score += 1000;
    }

    // Token matching: user typed multiple words
    let matchedInTitle = 0;
    let matchedInArtist = 0;

    queryTokens.forEach(token => {
      const inTitle = titleLower.includes(token);
      const inArtist = artistLower.includes(token);
      if (inTitle) matchedInTitle++;
      if (inArtist) matchedInArtist++;
      if (inTitle || inArtist) score += 250;
    });

    // If query has words matching BOTH title and artist, huge boost!
    // e.g. "queen bohemian" -> matches artist Queen and title Bohemian!
    if (matchedInTitle > 0 && matchedInArtist > 0) {
      score += 1200;
    }

    // If all tokens matched
    if (matchedInTitle + matchedInArtist >= queryTokens.length) {
      score += 800;
    }

    // Penalize unwanted karaoke/instrumental/tribute covers unless user explicitly asked for them
    const isSpecialVersion = /karaoke|tribute|instrumental|in the style of|backing track/i.test(item.title);
    const queryAskedSpecial = /karaoke|tribute|instrumental/i.test(cleaned);
    if (isSpecialVersion && !queryAskedSpecial) {
      score -= 1500;
    }

    // Add iTunes popularity ranking tiebreaker (0 to 150 pts)
    if (item.itunesRank < 30) {
      score += (30 - item.itunesRank) * 5;
    }

    // Keep candidate if score is positive and relevant
    if (score > 100) {
      scored.push({ item, score });
    }
  }

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map(s => s.item);
}

/**
 * Self-healing helper: fetches a fresh preview URL for a track if its audio URL fails
 */
export async function refreshTrackPreview(track) {
  if (!track || !track.title) return null;
  try {
    const query = `${track.artist} ${track.title}`;
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanSearchQuery(query))}&entity=song&limit=5`;
    const res = await fetch(url);
    const data = await res.json();
    const match = (data.results || []).find(item => item.previewUrl);
    if (match) {
      return {
        ...track,
        previewUrl: match.previewUrl,
        cover: match.artworkUrl100?.replace('100x100bb', '600x600bb') || track.cover
      };
    }
  } catch (e) {
    console.warn('Error refreshing track preview:', e);
  }
  return null;
}

/**
 * Fetches fresh, verified tracks with working preview URLs for a given category.
 * Highly diversified: Picks 10-12 DIFFERENT artists and at most 1 song per artist
 * so that artists DO NOT REPEAT!
 */
async function fetchFreshCategoryTracks(categoryId) {
  const cat = PLAYLIST_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) return [];

  const recentArtists = new Set(getRecentlyPlayedArtists());
  const recentTracks = new Set(getRecentlyPlayedIds());

  // Prioritize artists that have NOT been recently played
  const unplayedArtists = cat.artists.filter(a => !recentArtists.has(normalizeSongText(a)));
  const artistPool = unplayedArtists.length >= 8 ? unplayedArtists : cat.artists;

  // Pick 12 distinct artists from pool
  const selectedArtists = shuffleArray(artistPool).slice(0, 12);

  // Fetch top 3-4 songs for each artist in parallel
  const promises = selectedArtists.map(async artist => {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&limit=4`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return (data.results || []).filter(item => item.previewUrl && item.trackName);
    } catch {
      return [];
    }
  });

  const results = await Promise.all(promises);
  const seenTracks = new Set();
  const seenArtists = new Set();
  const tracks = [];

  // For each artist's results, pick 1 top unplayed song to guarantee maximum artist variety!
  results.forEach(artistSongs => {
    for (const item of artistSongs) {
      const trackNorm = normalizeSongText(item.trackName);
      const artistNorm = normalizeSongText(item.artistName);

      // Check if we already picked a song for this artist or song title
      if (!seenArtists.has(artistNorm) && !seenTracks.has(trackNorm) && !recentTracks.has(String(item.trackId)) && item.previewUrl) {
        seenArtists.add(artistNorm);
        seenTracks.add(trackNorm);
        markArtistAsRecentlyPlayed(item.artistName);

        tracks.push({
          id: item.trackId,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          cover: item.artworkUrl100?.replace('100x100bb', '600x600bb') || item.artworkUrl100,
          previewUrl: item.previewUrl,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.trackName)}`
        });
        break; // Only 1 song per artist!
      }
    }
  });

  // If pool was tight and we got fewer than 6, allow a second pass without recent check
  if (tracks.length < 6) {
    results.flat().forEach(item => {
      const trackNorm = normalizeSongText(item.trackName);
      const artistNorm = normalizeSongText(item.artistName);
      if (!seenTracks.has(trackNorm) && item.previewUrl) {
        seenTracks.add(trackNorm);
        tracks.push({
          id: item.trackId,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          cover: item.artworkUrl100?.replace('100x100bb', '600x600bb') || item.artworkUrl100,
          previewUrl: item.previewUrl,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.trackName)}`
        });
      }
    });
  }

  return shuffleArray(tracks);
}

/**
 * Fast Custom Artist query
 */
async function fetchCustomArtistTracks(artistName) {
  try {
    const cleaned = cleanSearchQuery(artistName);
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleaned)}&entity=song&limit=30`;
    const res = await fetch(url);
    const data = await res.json();
    const seen = new Set();
    const list = [];

    (data.results || []).forEach(item => {
      const norm = normalizeSongText(item.trackName);
      if (item.previewUrl && item.trackName && !seen.has(norm)) {
        seen.add(norm);
        list.push({
          id: item.trackId,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName,
          cover: item.artworkUrl100?.replace('100x100bb', '600x600bb') || item.artworkUrl100,
          previewUrl: item.previewUrl,
          spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent(item.artistName + ' ' + item.trackName)}`
        });
      }
    });

    return list;
  } catch (e) {
    console.warn('Failed custom artist query:', e);
    return [];
  }
}

/**
 * Main playlist loader with dynamic artist rotation and variety guarantee
 */
export async function fetchPlaylistTracks(categoryId, customArtist = null) {
  if (customArtist) {
    const customTracks = await fetchCustomArtistTracks(customArtist);
    return customTracks.length > 0 ? shuffleArray(customTracks) : [];
  }

  // Always fetch a fresh diverse pool of 10-12 different artists for each game
  const freshTracks = await fetchFreshCategoryTracks(categoryId);
  if (freshTracks.length >= 5) {
    // Also save to cache for search autocomplete lookups
    CATEGORY_CACHE[categoryId] = [
      ...(CATEGORY_CACHE[categoryId] || []).slice(0, 30),
      ...freshTracks
    ];
    return freshTracks;
  }

  // Fallback to cached tracks if network had an issue
  if (CATEGORY_CACHE[categoryId] && CATEGORY_CACHE[categoryId].length >= 3) {
    return shuffleArray(CATEGORY_CACHE[categoryId]);
  }

  return [];
}

/* ==========================================================================
   Custom Playlist Link & External Services Integration
   ========================================================================== */

/**
 * Parses and identifies streaming playlist links (Spotify, Deezer, Apple Music)
 * or raw IDs.
 */
export function parsePlaylistUrl(url) {
  if (!url || typeof url !== 'string') return null;
  const clean = url.trim();

  // Spotify Playlist:
  // e.g. https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=...
  // https://open.spotify.com/intl-pt/playlist/37i9dQZF1DXcBWIGoYBM5M
  // spotify:playlist:37i9dQZF1DXcBWIGoYBM5M
  const spotifyMatch = clean.match(/(?:spotify\.com\/(?:[a-zA-Z0-9_-]+\/)?(playlist|album)\/|spotify:(playlist|album):)([a-zA-Z0-9]{15,30})/i);
  if (spotifyMatch) {
    return {
      service: 'spotify',
      type: spotifyMatch[1] || spotifyMatch[2],
      id: spotifyMatch[3]
    };
  }

  // Raw Spotify ID (usually 22 alphanumeric characters)
  if (/^[a-zA-Z0-9]{22}$/.test(clean)) {
    return {
      service: 'spotify',
      type: 'playlist',
      id: clean
    };
  }

  // Deezer Playlist or Album:
  // e.g. https://www.deezer.com/playlist/3155776842
  // https://www.deezer.com/br/playlist/3155776842
  const deezerMatch = clean.match(/deezer\.com\/(?:[a-zA-Z0-9_-]+\/)?(playlist|album)\/(\d+)/i);
  if (deezerMatch) {
    return {
      service: 'deezer',
      type: deezerMatch[1],
      id: deezerMatch[2]
    };
  }

  // Apple Music Playlist
  const appleMatch = clean.match(/music\.apple\.com\/(?:[a-zA-Z0-9_-]+\/)?playlist\/([^/]+)\/(pl\.[a-zA-Z0-9]+)/i);
  if (appleMatch) {
    return {
      service: 'applemusic',
      type: 'playlist',
      id: appleMatch[2],
      slug: appleMatch[1]
    };
  }

  return null;
}

/**
 * Fetches lightweight Spotify embed HTML through a resilient CORS proxy cascade.
 */
export async function fetchSpotifyEmbedHtml(playlistId, type = 'playlist') {
  const embedUrl = `https://open.spotify.com/embed/${type}/${playlistId}`;

  const proxyList = [
    url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
    url => `https://corsproxy.io/?url=${encodeURIComponent(url)}`,
    url => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
  ];

  let lastError = null;
  let html = null;

  for (const getProxyUrl of proxyList) {
    try {
      const proxyUrl = getProxyUrl(embedUrl);
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 9000);

      const res = await fetch(proxyUrl, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 500) {
          html = text;
          break;
        }
      }
    } catch (err) {
      lastError = err;
    }
  }

  if (!html) {
    throw new Error(
      'Não foi possível conectar aos servidores da playlist. ' +
      'Verifique se a sua conexão está ativa e tente novamente.'
    );
  }

  return html;
}

/**
 * Parses track items and metadata from Spotify embed HTML.
 */
export function extractSpotifyTracksFromEmbed(html) {
  let json = null;

  // 1. Try __NEXT_DATA__
  const match = html.match(/<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/i);
  if (match) {
    try {
      json = JSON.parse(match[1]);
    } catch (e) {
      console.warn('Error parsing __NEXT_DATA__:', e);
    }
  }

  // 2. Fallback to searching any script containing tracks/items
  if (!json) {
    const scriptMatches = html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi);
    for (const sm of scriptMatches) {
      const content = sm[1];
      if (content.includes('"tracks"') && (content.includes('"items"') || content.includes('trackList'))) {
        try {
          const parsed = JSON.parse(content);
          if (parsed && typeof parsed === 'object') {
            json = parsed;
            break;
          }
        } catch {}
      }
    }
  }

  let playlistTitle = 'Playlist do Spotify';
  const rawTracks = [];

  if (json) {
    // Navigate JSON tree
    let entity = json.props?.pageProps?.state?.data?.entity || json.props?.pageProps?.entity;

    if (!entity) {
      // Find recursively
      const findEntity = (obj, depth = 0) => {
        if (!obj || depth > 8) return null;
        if (obj.tracks && (Array.isArray(obj.tracks.items) || Array.isArray(obj.tracks))) return obj;
        if (Array.isArray(obj.items) && obj.items.length > 0 && (obj.items[0].track || obj.items[0].name)) return obj;
        for (const k of Object.keys(obj)) {
          if (typeof obj[k] === 'object' && obj[k] !== null) {
            const found = findEntity(obj[k], depth + 1);
            if (found) return found;
          }
        }
        return null;
      };
      entity = findEntity(json);
    }

    if (entity) {
      if (entity.name || entity.title) {
        playlistTitle = entity.name || entity.title;
      }
      const rawList = entity.tracks?.items || entity.tracks || entity.items || [];
      for (const item of rawList) {
        const t = item.track || item;
        if (!t) continue;
        const title = t.name || t.title;
        if (!title) continue;

        let artist = '';
        if (Array.isArray(t.artists)) {
          artist = t.artists.map(a => a.name).filter(Boolean).join(', ');
        } else if (typeof t.artists === 'string') {
          artist = t.artists;
        } else if (t.artist) {
          artist = typeof t.artist === 'string' ? t.artist : (t.artist.name || '');
        }

        const cover = t.album?.images?.[0]?.url || entity.images?.[0]?.url || t.cover || '';
        const previewUrl = t.audioPreview?.url || t.preview_url || null;

        rawTracks.push({
          id: t.id ? `sp-${t.id}` : null,
          title: title.trim(),
          artist: (artist || 'Vários Artistas').trim(),
          album: t.album?.name || '',
          cover,
          previewUrl,
          spotifyUrl: t.id ? `https://open.spotify.com/track/${t.id}` : null
        });
      }
    }
  }

  // Fallback if JSON extraction was incomplete: parse title and HTML markup
  if (rawTracks.length === 0) {
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      playlistTitle = titleMatch[1].replace(/\|.*$/i, '').replace(/- Spotify.*$/i, '').trim();
    }
    const trackRowRegex = /class="[^"]*track-title[^"]*"[^>]*>([^<]+)<\/[^>]+>[\s\S]*?class="[^"]*artist[^"]*"[^>]*>([^<]+)<\//gi;
    let m;
    while ((m = trackRowRegex.exec(html)) !== null) {
      rawTracks.push({
        title: m[1].trim(),
        artist: m[2].trim(),
        cover: '',
        previewUrl: null
      });
    }
  }

  return { title: playlistTitle, tracks: rawTracks };
}

/**
 * Primary Spotify reader using Jina Reader API (high reliability, full CORS, rich track extraction).
 */
export async function fetchSpotifyPlaylistViaJina(playlistId, type = 'playlist') {
  const targetUrl = `https://open.spotify.com/${type}/${playlistId}`;
  const jinaUrl = `https://r.jina.ai/${targetUrl}`;

  const res = await fetch(jinaUrl, {
    headers: {
      'Accept': 'text/plain',
      'X-No-Cache': 'true'
    },
    signal: AbortSignal.timeout(28000)
  });

  if (!res.ok) {
    throw new Error(`Falha ao ler playlist do Spotify (Status ${res.status}).`);
  }

  const text = await res.text();
  let playlistTitle = 'Playlist do Spotify';
  const titleMatch = text.match(/Title:\s*([^|\n]+)/i);
  if (titleMatch) {
    playlistTitle = titleMatch[1].trim();
  }

  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const tracks = [];
  const seenTracks = new Set();

  for (let i = 0; i < lines.length; i++) {
    const trackMatch = lines[i].match(/\[([^\]]+)\]\(https:\/\/open\.spotify\.com\/track\/([a-zA-Z0-9]+)\)/);
    if (trackMatch) {
      const songTitle = trackMatch[1].replace(/E$/, '').trim();
      const spotifyId = trackMatch[2];
      let artist = 'Vários Artistas';
      let album = '';
      let cover = '';

      for (let j = Math.max(0, i - 4); j < i; j++) {
        const imgMatch = lines[j].match(/!\[.*?\]\((https:\/\/i\.scdn\.co\/image\/[a-zA-Z0-9]+)\)/);
        if (imgMatch) {
          cover = imgMatch[1];
        }
      }

      for (let j = i + 1; j <= Math.min(lines.length - 1, i + 3); j++) {
        const artistMatch = lines[j].match(/\[([^\]]+)\]\(https:\/\/open\.spotify\.com\/artist\/[a-zA-Z0-9]+\)/);
        if (artistMatch && artist === 'Vários Artistas') {
          artist = artistMatch[1].trim();
        }
        const albumMatch = lines[j].match(/\[([^\]]+)\]\(https:\/\/open\.spotify\.com\/album\/[a-zA-Z0-9]+\)/);
        if (albumMatch && !album) {
          album = albumMatch[1].trim();
        }
      }

      const dedupeKey = `${songTitle.toLowerCase()}|||${artist.toLowerCase()}`;
      if (!seenTracks.has(dedupeKey)) {
        seenTracks.add(dedupeKey);
        tracks.push({
          id: `sp-${spotifyId}`,
          title: songTitle,
          artist,
          album,
          cover,
          previewUrl: null,
          spotifyUrl: `https://open.spotify.com/track/${spotifyId}`
        });
      }
    }
  }

  return { title: playlistTitle, tracks };
}

/**
 * Fetches Spotify playlist tracks by ID with multi-strategy fallbacks.
 */
export async function fetchSpotifyPlaylistTracks(playlistId, type = 'playlist') {
  // 1. Primary method: Jina Reader (works directly in browser, full CORS, rich track extraction)
  try {
    const jinaResult = await fetchSpotifyPlaylistViaJina(playlistId, type);
    if (jinaResult && jinaResult.tracks && jinaResult.tracks.length > 0) {
      return jinaResult;
    }
  } catch (err) {
    console.warn('Jina fetch failed, attempting fallback proxies...', err);
  }

  // 2. Fallback method: Direct embed scraping via CORS proxies
  try {
    const html = await fetchSpotifyEmbedHtml(playlistId, type);
    const extracted = extractSpotifyTracksFromEmbed(html);
    if (extracted && extracted.tracks && extracted.tracks.length > 0) {
      return extracted;
    }
  } catch (err) {
    console.warn('Embed scraping fallback failed:', err);
  }

  throw new Error(
    'Nenhuma música foi encontrada nesta playlist.\n\n' +
    '⚠️ ATENÇÃO: A sua playlist no Spotify precisa ser PÚBLICA para funcionar! ' +
    'Playlists privadas ou secretas não podem ser acessadas externamente.'
  );
}

/**
 * Fetches Deezer playlist tracks via zero-CORS JSONP.
 */
export function fetchDeezerPlaylistJSONP(id, type = 'playlist') {
  return new Promise((resolve, reject) => {
    const callbackName = 'dzr_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const script = document.createElement('script');

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error('Tempo limite excedido ao buscar playlist do Deezer.'));
    }, 12000);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = (data) => {
      cleanup();
      if (!data) {
        reject(new Error('Nenhum dado retornado do Deezer.'));
        return;
      }
      if (data.error) {
        reject(new Error(
          (data.error.message || 'Erro ao carregar do Deezer.') +
          ' Verifique se a playlist está configurada como Pública.'
        ));
        return;
      }
      resolve(data);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error('Falha de conexão com a API do Deezer.'));
    };

    const endpoint = type === 'album' ? `album/${id}` : `playlist/${id}`;
    script.src = `https://api.deezer.com/${endpoint}?output=jsonp&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

/**
 * Parses user-provided plaintext tracklist ("Artist - Title" or "Title by Artist").
 */
export function parseTracksFromText(rawText) {
  if (!rawText || !rawText.trim()) return [];
  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 2);
  const tracks = [];

  for (const line of lines) {
    const cleaned = line.replace(/^\d+[\.\-\s)]+/, '').trim();
    let artist = '';
    let title = '';

    if (/[-–—]/.test(cleaned)) {
      const parts = cleaned.split(/[-–—]/);
      artist = parts[0].trim();
      title = parts.slice(1).join(' - ').trim();
    } else if (/\bby\b/i.test(cleaned)) {
      const parts = cleaned.split(/\bby\b/i);
      title = parts[0].trim();
      artist = parts.slice(1).join(' ').trim();
    } else {
      title = cleaned;
      artist = '';
    }

    if (title) {
      tracks.push({
        title,
        artist,
        cover: '',
        previewUrl: null
      });
    }
  }

  return tracks;
}

/**
 * Resolves working 30-second audio previews for track objects
 * using the iTunes Search API in efficient batches.
 */
export async function resolveTracksAudioPreviews(rawTracks, onProgress = null) {
  const readyTracks = [];
  const seenKeys = new Set();
  const total = rawTracks.length;

  const batchSize = 4;
  for (let i = 0; i < rawTracks.length; i += batchSize) {
    const batch = rawTracks.slice(i, i + batchSize);
    const resolvedBatch = await Promise.all(batch.map(async (raw) => {
      // If already has working preview (e.g. from Deezer or Spotify audioPreview)
      if (raw.previewUrl) {
        return {
          id: raw.id || `custom-${Math.random().toString(36).slice(2, 9)}`,
          title: raw.title,
          artist: raw.artist || 'Artista Desconhecido',
          album: raw.album || '',
          cover: raw.cover || 'https://via.placeholder.com/300',
          previewUrl: raw.previewUrl,
          spotifyUrl: raw.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent(raw.artist + ' ' + raw.title)}`,
          isCustomPlaylistTrack: true
        };
      }

      // Query iTunes for audio preview and high-res cover
      try {
        const query = `${raw.artist} ${raw.title}`.trim();
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(cleanSearchQuery(query))}&entity=song&limit=4`;
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.json();
        const results = (data.results || []).filter(item => item.previewUrl && item.trackName);

        if (results.length > 0) {
          const targetTitleNorm = normalizeSongText(raw.title);
          const targetArtistNorm = normalizeSongText(raw.artist);

          let bestMatch = results[0];
          for (const item of results) {
            const itemTitleNorm = normalizeSongText(item.trackName);
            const itemArtistNorm = normalizeSongText(item.artistName);
            if (itemTitleNorm === targetTitleNorm || itemTitleNorm.includes(targetTitleNorm) || targetTitleNorm.includes(itemTitleNorm)) {
              bestMatch = item;
              break;
            }
          }

          return {
            id: bestMatch.trackId || `custom-${Math.random().toString(36).slice(2, 9)}`,
            title: raw.title || bestMatch.trackName,
            artist: raw.artist || bestMatch.artistName,
            album: bestMatch.collectionName || raw.album || '',
            cover: bestMatch.artworkUrl100?.replace('100x100bb', '600x600bb') || raw.cover || bestMatch.artworkUrl100,
            previewUrl: bestMatch.previewUrl,
            spotifyUrl: raw.spotifyUrl || `https://open.spotify.com/search/${encodeURIComponent((raw.artist || bestMatch.artistName) + ' ' + (raw.title || bestMatch.trackName))}`,
            isCustomPlaylistTrack: true
          };
        }
      } catch (err) {
        console.warn('Error resolving preview for track:', raw.title, err);
      }
      return null;
    }));

    resolvedBatch.forEach(t => {
      if (t && t.previewUrl) {
        const key = `${normalizeSongText(t.title)}|||${normalizeSongText(t.artist)}`;
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          readyTracks.push(t);
        }
      }
    });

    if (onProgress) {
      onProgress({
        processed: Math.min(i + batchSize, total),
        total,
        readyCount: readyTracks.length
      });
    }

    // Stop after getting 25 verified working tracks for fast loading
    if (readyTracks.length >= 25) {
      break;
    }
  }

  return readyTracks;
}

/**
 * High-level orchestrator that accepts a playlist link or text list,
 * validates permissions, fetches tracks, resolves audio, and returns
 * a playable playlist with only songs from that source.
 */
export async function fetchTracksFromPlaylist(input, onProgress = null) {
  const cleanInput = (input || '').trim();
  if (!cleanInput) {
    throw new Error('Por favor, informe o link ou as músicas da playlist.');
  }

  const parsedLink = parsePlaylistUrl(cleanInput);
  let playlistTitle = 'Playlist Personalizada';
  let rawTracks = [];

  if (parsedLink) {
    if (parsedLink.service === 'spotify') {
      if (onProgress) onProgress({ status: 'fetching_spotify', message: 'Conectando ao Spotify e lendo faixas...' });
      const spotifyData = await fetchSpotifyPlaylistTracks(parsedLink.id, parsedLink.type);
      playlistTitle = spotifyData.title;
      rawTracks = spotifyData.tracks;
    } else if (parsedLink.service === 'deezer') {
      if (onProgress) onProgress({ status: 'fetching_deezer', message: 'Conectando ao Deezer e lendo faixas...' });
      const deezerData = await fetchDeezerPlaylistJSONP(parsedLink.id, parsedLink.type);
      playlistTitle = deezerData.title || 'Playlist do Deezer';
      const items = deezerData.tracks?.data || [];
      rawTracks = items.map(t => ({
        id: `dz-${t.id}`,
        title: t.title,
        artist: t.artist?.name || 'Artista Desconhecido',
        album: t.album?.title || '',
        cover: t.album?.cover_big || t.album?.cover_medium || '',
        previewUrl: t.preview || null,
        spotifyUrl: `https://open.spotify.com/search/${encodeURIComponent((t.artist?.name || '') + ' ' + t.title)}`
      }));
    } else {
      throw new Error('Serviço de streaming ainda não suportado diretamente. Você pode colar a lista das músicas na aba ao lado!');
    }
  } else {
    // Treat as raw text list (one song per line)
    if (onProgress) onProgress({ status: 'parsing_text', message: 'Processando lista de músicas informada...' });
    rawTracks = parseTracksFromText(cleanInput);
    playlistTitle = 'Minha Seleção';
  }

  if (!rawTracks || rawTracks.length === 0) {
    throw new Error(
      'Nenhuma música foi encontrada.\n\n' +
      '⚠️ ATENÇÃO DE PERMISSÃO: Certifique-se de que a playlist está configurada como PÚBLICA no Spotify. ' +
      'Playlists privadas ou secretas são bloqueadas.'
    );
  }

  if (onProgress) {
    onProgress({
      status: 'resolving_audio',
      message: `Encontradas ${rawTracks.length} músicas. Verificando áudios disponíveis...`,
      processed: 0,
      total: rawTracks.length,
      readyCount: 0
    });
  }

  // Resolve 30s audio previews
  const readyTracks = await resolveTracksAudioPreviews(rawTracks, (prog) => {
    if (onProgress) {
      onProgress({
        status: 'resolving_audio',
        message: `Preparando músicas: ${prog.readyCount} prontas (de ${prog.processed}/${prog.total} verificadas)...`,
        processed: prog.processed,
        total: prog.total,
        readyCount: prog.readyCount
      });
    }
  });

  if (readyTracks.length === 0) {
    throw new Error(
      'Não foi possível encontrar o áudio de prévia das músicas desta playlist. ' +
      'Verifique se a playlist é pública ou tente outra playlist.'
    );
  }

  return {
    title: playlistTitle,
    tracks: shuffleArray(readyTracks),
    count: readyTracks.length
  };
}
