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
