# 🎵 Song Guesser — Alessio Edition

> O jogo de adivinhar músicas inspirado no Heardle com design autêntico do Spotify, reprodução real de áudio via iTunes API e interface 100% responsiva para desktop e celular.

![Song Guesser Preview](public/preview.png)

## 🌟 Funcionalidades

- 🎧 **Trechos Progressivos de Áudio:** Ouça 1s, 3s, 5s, 10s, 16s e até 30s para adivinhar a música antes das tentativas acabarem.
- 🎨 **Design Autêntico Spotify:** Interface moderna com tema escuro, disco de vinil animado, visualizador equalizer, cards com bordas suaves e microinterações táteis.
- 📱 **Totalmente Responsivo:** Barra de navegação por toque fluida, layout otimizado para celulares de qualquer largura (iPhone, Galaxy, telas estreitas).
- 🌍 **Múltiplos Gêneros & Playlists Dinâmicas:**
  - 🌍 **Top Hits Globais** (The Weeknd, Dua Lipa, Billie Eilish...)
  - 🎤 **Só Rap** (Eminem, Matuê, Racionais MCs, Kendrick Lamar...)
  - 🇧🇷 **Hits Brasil** (MPB, Pop, Pagode, Sertanejo...)
  - 🎸 **Rock Clássico & 2000s** (Linkin Park, AC/DC, Nirvana, Queen...)
  - 📼 **Flashback 80s & 90s** (Michael Jackson, Madonna, a-ha, ABBA...)
  - 👑 **Pop Divas** (Beyoncé, Lady Gaga, Ariana Grande, Taylor Swift...)
  - 🤠 **Sertanejo** (Marília Mendonça, Jorge & Mateus, Henrique & Juliano...)
  - 🔥 **Funk Brasil** (MC Kevin o Chris, Ryan SP, Anitta, Pedro Sampaio...)
  - 🔍 **Outro Artista:** Digite qualquer cantor(a) ou banda para gerar um jogo personalizado em tempo real!
- 🔍 **Autocompletar Inteligente com iTunes API:** Busca rápida com classificação por relevância e remoção de versões karaokê indesejadas.
- 📊 **Estatísticas & Histórico:** Registro persistente de partidas jogadas, taxa de vitória, sequência atual e melhor sequência, além de histórico completo com links para abrir as faixas no Spotify.
- 🎊 **Efeitos de Vitória:** Chuva de confetes com `canvas-confetti` ao acertar a resposta.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3 Vanilla** (Variáveis CSS, Flexbox, Grid, Animações suaves)
- **JavaScript Moderno (ESModules)**
- **Vite** (Build e desenvolvimento ultrarrápido)
- **iTunes Search API** (Prévias de áudio oficiais de 30 segundos em alta qualidade)
- **Canvas Confetti** (Animação comemorativa)

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada)

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/GuilhermeAlessio/song-guesser.git
   cd song-guesser
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**
   Abra [http://localhost:5173/](http://localhost:5173/) para jogar.

5. **Para gerar a versão de produção:**
   ```bash
   npm run build
   ```

---

## 👤 Autor

Desenvolvido por **Guilherme Alessio**.
- GitHub: [@GuilhermeAlessio](https://github.com/GuilhermeAlessio)
