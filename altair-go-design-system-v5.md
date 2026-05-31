
<!doctype html>
<html lang="en"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Altair GO — Design System v5.0 (Vibrant Cinematic)</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
  <link href="https://fonts.googleapis.com/css2?family=Satisfy&display=swap" rel="stylesheet">
  <style>
    /* Exact Typography from unikorns.work */
    @font-face {
      font-family: 'Instrument Serif';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zsTjmbI.woff2) format('woff2');
      unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    @font-face {
      font-family: 'Instrument Serif';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url(https://fonts.gstatic.com/s/instrumentserif/v5/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjg.woff2) format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }
    @font-face {
      font-family: "Aeonik";
      src: url("https://framerusercontent.com/assets/0re3BsDsbi3AlyI4fpSQVP0eMns.woff");
      font-display: swap;
      font-style: normal;
      font-weight: 400;
    }
    @font-face {
      font-family: "Aeonik";
      src: url("https://framerusercontent.com/assets/5GwyPhhwmVoZxsIqFLr04K4Lwkk.woff");
      font-display: swap;
      font-style: normal;
      font-weight: 500;
    }
    @font-face {
      font-family: "Aeonik";
      src: url("https://framerusercontent.com/assets/JmkxEUpgMJR5RYndQzFdyEcFI.woff");
      font-display: swap;
      font-style: normal;
      font-weight: 700;
    }

    :root {
      /* New Palette from reference image */
      --color-black: #121212;
      --color-white: #FFFFFF;
      --color-teal: #6CB0BD;
      --color-sky: #9BC6DB;
      --color-lavender: #E2D4E1;
      --color-peach: #FCE4D6;
      --color-cream: #FFFDF2;
      --color-ice: #DFEDF4;

      /* OKLch Tokens */
      --bg: oklch(99.4% 0.003 95); /* Creamy white background */
      --surface: oklch(100% 0 0 / 70%);
      --fg: var(--color-black);
      --muted: oklch(50% 0.02 240);
      --border: oklch(92% 0.01 240);
      --accent: var(--color-teal);
      --accent-soft: var(--color-sky);
      
      /* Typography (Unikorns) */
      --font-display: 'Instrument Serif', serif;
      --font-body: 'Aeonik', sans-serif;
      --font-accent: 'Satisfy', cursive;

      /* Spacing & Radii */
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --radius-full: 9999px;

      /* Shadows (Refined) */
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
      --shadow-md: 0 8px 24px rgba(0,0,0,0.08);
      --shadow-lg: 0 16px 48px rgba(0,0,0,0.12);

      /* Glassmorphism (Saturated) */
      --glass-bg: oklch(100% 0 0 / 55%);
      --glass-border: oklch(100% 0 0 / 20%);
      --glass-blur: blur(20px) saturate(180%);

      /* Transitions */
      --t-hover: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      --t-reveal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="dark"] {
      --bg: var(--color-black);
      --surface: oklch(15% 0 0 / 60%);
      --fg: var(--color-white);
      --muted: oklch(70% 0.01 240);
      --border: oklch(30% 0.02 240);
      --glass-bg: oklch(20% 0.01 240 / 40%);
      --glass-border: oklch(100% 0 0 / 10%);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      line-height: 1.6;
      transition: background var(--t-reveal), color var(--t-reveal);
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
    }

    /* Layout Shell */
    .app-container {
      display: grid;
      grid-template-columns: 280px 1fr;
      min-height: 100vh;
    }

    .sidebar {
      position: sticky;
      top: 0;
      height: 100vh;
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border-right: 1px solid var(--border);
      padding: 48px 32px;
      display: flex;
      flex-direction: column;
      gap: 40px;
    }

    .main-content {
      padding: 80px 100px;
      max-width: 1400px;
    }

    /* Cinematic Typography Utilities */
    .h1 { 
      font-family: var(--font-display); 
      font-weight: 400; 
      font-size: clamp(4rem, 10vw, 8rem); 
      letter-spacing: -0.02em; 
      line-height: 0.95; 
      margin-bottom: 1rem; 
    }
    .h2 { 
      font-family: var(--font-display); 
      font-weight: 400; 
      font-size: 3.5rem; 
      letter-spacing: -0.01em; 
      line-height: 1.1;
      margin-bottom: 2rem; 
    }
    .script-text { 
      font-family: var(--font-accent); 
      color: var(--color-teal); 
      font-size: 2.5rem; 
      margin-bottom: -0.5rem;
      display: block;
    }
    
    /* Interactive Elements */
    .btn {
      padding: 16px 36px;
      border-radius: var(--radius-full);
      font-weight: 500;
      cursor: pointer;
      transition: all var(--t-hover);
      border: 1px solid transparent;
      font-family: var(--font-body);
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      gap: 12px;
      letter-spacing: 0.02em;
    }
    .btn-primary { background: var(--color-black); color: white; }
    .btn-primary:hover { 
      background: var(--color-teal);
      box-shadow: 0 12px 32px oklch(75% 0.1 210 / 0.3);
    }
    
    .btn-glass {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      color: var(--color-black);
      box-shadow: var(--shadow-sm);
    }
    [data-theme="dark"] .btn-glass { color: white; }
    .btn-glass:hover { background: oklch(100% 0 0 / 70%); box-shadow: var(--shadow-md); }

    .card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: 48px;
      box-shadow: var(--shadow-lg);
      transition: transform var(--t-hover), box-shadow var(--t-hover);
      position: relative;
      overflow: hidden;
    }
    .card:hover { transform: translateY(-8px); }

    /* Preview box */
    .preview-box {
      background: var(--color-ice);
      background-image: 
        radial-gradient(circle at top right, var(--color-peach), transparent 50%), 
        radial-gradient(circle at bottom left, var(--color-lavender), transparent 50%);
      border-radius: var(--radius-lg);
      padding: 80px;
      margin-bottom: 48px;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 32px;
      align-items: flex-start;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    [data-theme="dark"] .preview-box {
      background: oklch(25% 0.02 240);
      background-image: 
        radial-gradient(circle at top right, oklch(40% 0.1 30 / 15%), transparent 50%), 
        radial-gradient(circle at bottom left, oklch(40% 0.1 280 / 15%), transparent 50%);
    }

    /* Color Token Component */
    .token-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
      gap: 32px;
      margin-top: 40px;
    }
    .color-token {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }
    .color-swatch { height: 160px; width: 100%; }
    .color-info { padding: 24px; }
    .color-name { font-weight: 500; font-size: 1rem; margin-bottom: 4px; }
    .color-hex { font-family: monospace; font-size: 0.85rem; opacity: 0.5; }

    /* Responsive */
    @media (max-width: 1024px) {
      .app-container { grid-template-columns: 1fr; }
      .sidebar { display: none; }
      .main-content { padding: 48px 32px; }
    }
  </style>
</head>
<body>

  <div class="app-container">
    <aside class="sidebar">
      <div style="font-family: var(--font-display); font-size: 3rem; font-weight: 400; line-height: 1; letter-spacing: -2px;">
        Altair <span style="color: var(--color-teal);">GO</span>
      </div>
      <nav style="display: flex; flex-direction: column; gap: 16px; margin-top: 32px;">
        <a href="#palette" style="text-decoration: none; color: inherit; font-weight: 500; opacity: 0.7;">Palette</a>
        <a href="#typography" style="text-decoration: none; color: inherit; font-weight: 500; opacity: 0.7;">Typography</a>
        <a href="#components" style="text-decoration: none; color: inherit; font-weight: 500; opacity: 0.7;">Components</a>
        <a href="#showcase" style="text-decoration: none; color: inherit; font-weight: 500; opacity: 0.7;">Showcase</a>
      </nav>
      
      <div style="margin-top: auto;">
        <button class="btn btn-glass" onclick="toggleTheme()" style="width: 100%; justify-content: center; font-size: 0.9rem;">
          <span id="theme-icon">🌙</span> Dark Mode
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header style="margin-bottom: 120px;">
        <span class="script-text">The Art of Travel</span>
        <h1 class="h1">Vibrant Cinematic</h1>
        <p style="font-size: 1.6rem; opacity: 0.8; max-width: 700px; font-weight: 400; line-height: 1.4;">
          Altair GO Design System v5.0. Inspired by the soft, high-saturation palettes of modern travel editorials and the precision of Aeonik typography.
        </p>
      </header>

      <section id="palette" style="margin-bottom: 120px;">
        <h2 class="h2">Color System</h2>
        <p style="margin-bottom: 40px; opacity: 0.6; font-size: 1.1rem; max-width: 600px;">
          Extracted from your reference, this palette balances vibrant pastels with professional midnight and pure white.
        </p>
        
        <div class="token-grid">
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-black);"></div>
            <div class="color-info">
              <div class="color-name">Midnight</div>
              <div class="color-hex">#121212</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-white); border-bottom: 1px solid var(--border);"></div>
            <div class="color-info">
              <div class="color-name">Pure White</div>
              <div class="color-hex">#FFFFFF</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-teal);"></div>
            <div class="color-info">
              <div class="color-name">Aegean Teal</div>
              <div class="color-hex">#6CB0BD</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-sky);"></div>
            <div class="color-info">
              <div class="color-name">Sky High</div>
              <div class="color-hex">#9BC6DB</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-lavender);"></div>
            <div class="color-info">
              <div class="color-name">Orchid Haze</div>
              <div class="color-hex">#E2D4E1</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-peach);"></div>
            <div class="color-info">
              <div class="color-name">Sunset Nude</div>
              <div class="color-hex">#FCE4D6</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-cream);"></div>
            <div class="color-info">
              <div class="color-name">Clarity Cream</div>
              <div class="color-hex">#FFFDF2</div>
            </div>
          </div>
          <div class="color-token">
            <div class="color-swatch" style="background: var(--color-ice);"></div>
            <div class="color-info">
              <div class="color-name">Ice Glacier</div>
              <div class="color-hex">#DFEDF4</div>
            </div>
          </div>
        </div>
      </section>

      <section id="typography" style="margin-bottom: 120px;">
        <h2 class="h2">Typography Pairings</h2>
        <div class="preview-box">
          <div style="font-family: var(--font-display); font-size: 8rem; font-weight: 400; line-height: 0.9; letter-spacing: -0.02em;">Luxury</div>
          <div style="font-family: var(--font-body); font-size: 1.8rem; opacity: 0.8; max-width: 700px; font-weight: 400;">
            Aeonik (Body) meets Instrument Serif (Display). A high-contrast pairing that balances functional tech precision with editorial elegance.
          </div>
          <div class="script-text" style="color: var(--color-black);">The journey begins here.</div>
        </div>
      </section>

      <section id="components" style="margin-bottom: 120px;">
        <h2 class="h2">UI Elements</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 48px;">
          <div class="card">
            <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 16px;">Action Buttons</h3>
            <p style="margin-bottom: 24px; opacity: 0.6;">High-contrast buttons with vibrant hover states.</p>
            <div style="display: flex; flex-wrap: wrap; gap: 16px;">
              <button class="btn btn-primary">Book Now</button>
              <button class="btn btn-glass">Learn More</button>
            </div>
          </div>
          <div class="card" style="background: var(--color-teal); color: white; border: none;">
            <h3 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 16px;">Vibrant Surface</h3>
            <p style="margin-bottom: 24px; opacity: 0.9;">Using the primary accent as a high-impact section background.</p>
            <button class="btn btn-glass" style="background: rgba(255,255,255,0.2); color: white; border-color: rgba(255,255,255,0.3);">Explore Aegean</button>
          </div>
        </div>
      </section>

      <footer style="padding: 64px 0; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
        <div style="font-family: var(--font-display); font-size: 1.5rem;">Altair GO <span style="opacity: 0.4;">© 2024</span></div>
        <div style="display: flex; gap: 32px; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.5;">
          <span>Design Spec</span>
          <span>Documentation</span>
          <span>v5.0.0</span>
        </div>
      </footer>
    </main>
  </div>

  <script>
    function toggleTheme() {
      const body = document.body;
      const currentTheme = body.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', newTheme);
      document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
  </script>
</body></html>
