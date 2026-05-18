
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Altair GO — Modern SaaS Design System</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Poppins:wght@300;400;600&family=Satisfy&display=swap" rel="stylesheet">
  <style>
    :root {
      /* Base Colours (Altair GO Palette) */
      --midnight: #1C2B48;
      --cerulean: #8EB1D1;
      --baby-blue: #A7C7E7;
      --platinum: #E8ECEF;
      --blue-grey: #C4D8E5;
      --white: #F8FAFC;

      /* OKLch Tokens */
      --bg: oklch(98.5% 0.005 240);
      --surface: oklch(100% 0 0 / 80%);
      --fg: oklch(25% 0.06 255);
      --muted: oklch(50% 0.04 250);
      --border: oklch(90% 0.02 245);
      --accent: oklch(73% 0.07 235);
      --accent-soft: oklch(80% 0.07 240);
      
      /* Typography */
      --font-display: 'DM Serif Display', serif;
      --font-body: 'Poppins', sans-serif;
      --font-accent: 'Satisfy', cursive;

      /* Spacing & Radii */
      --radius-sm: 8px;
      --radius-md: 16px;
      --radius-lg: 24px;
      --radius-full: 9999px;

      /* Shadows */
      --shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.06);
      --shadow-md: 0 4px 12px oklch(0% 0 0 / 0.09);
      --shadow-lg: 0 8px 24px oklch(0% 0 0 / 0.11);

      /* Glassmorphism */
      --glass-bg: oklch(100% 0 0 / 55%);
      --glass-border: oklch(100% 0 0 / 20%);
      --glass-blur: blur(20px) saturate(180%);

      /* Transitions */
      --t-hover: 150ms cubic-bezier(0.4, 0, 0.2, 1);
      --t-reveal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
      --t-modal: 350ms cubic-bezier(0.4, 0, 0.2, 1);
    }

    [data-theme="dark"] {
      --bg: oklch(18% 0.04 255);
      --surface: oklch(25% 0.05 255 / 70%);
      --fg: oklch(94% 0.01 245);
      --muted: oklch(70% 0.03 245);
      --border: oklch(35% 0.04 255);
      --glass-bg: oklch(30% 0.05 255 / 45%);
      --glass-border: oklch(100% 0 0 / 10%);
      --shadow-sm: 0 1px 3px oklch(0% 0 0 / 0.2);
      --shadow-md: 0 4px 12px oklch(0% 0 0 / 0.3);
      --shadow-lg: 0 8px 24px oklch(0% 0 0 / 0.4);
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    
    body {
      background: var(--bg);
      color: var(--fg);
      font-family: var(--font-body);
      line-height: 1.6;
      transition: background var(--t-reveal), color var(--t-reveal);
      min-height: 100vh;
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
      padding: 40px 24px;
      display: flex;
      flex-direction: column;
      gap: 32px;
    }

    .main-content {
      padding: 64px 80px;
      max-width: 1200px;
    }

    /* Typography Utilities */
    .h1 { font-family: var(--font-display); font-weight: 400; font-size: 4rem; letter-spacing: -0.01em; line-height: 1.1; margin-bottom: 0.5rem; }
    .h2 { font-family: var(--font-display); font-weight: 400; font-size: 2.25rem; letter-spacing: -0.02em; margin-bottom: 1.5rem; }
    .script-text { font-family: var(--font-accent); color: var(--cerulean); font-size: 2rem; }
    
    /* Token Cards */
    .color-card {
      border-radius: var(--radius-md);
      overflow: hidden;
      border: 1px solid var(--border);
      background: var(--surface);
      box-shadow: var(--shadow-sm);
    }
    .color-swatch { height: 120px; width: 100%; }
    .color-info { padding: 16px; }
    .color-name { font-weight: 600; font-size: 0.9rem; }
    .color-hex { font-family: monospace; font-size: 0.8rem; opacity: 0.6; }

    /* Interactive Elements */
    .btn {
      padding: 12px 28px;
      border-radius: var(--radius-full);
      font-weight: 600;
      cursor: pointer;
      transition: all var(--t-hover);
      border: 1px solid transparent;
      font-family: var(--font-body);
      font-size: 0.95rem;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .btn-primary { background: var(--midnight); color: white; }
    .btn-primary:hover { 
      box-shadow: 0 6px 20px oklch(73% 0.07 235 / 0.35);
    }
    
    .btn-glass {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      color: var(--midnight);
      box-shadow: var(--shadow-sm);
    }
    [data-theme="dark"] .btn-glass { color: white; }
    .btn-glass:hover { background: oklch(100% 0 0 / 65%); box-shadow: var(--shadow-md); }

    .input-field {
      padding: 14px 20px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border);
      background: var(--surface);
      font-family: var(--font-body);
      width: 100%;
      max-width: 320px;
      outline: none;
      transition: border-color var(--t-hover);
    }
    .input-field:focus { border-color: var(--accent); }

    .card {
      background: var(--glass-bg);
      backdrop-filter: var(--glass-blur);
      -webkit-backdrop-filter: var(--glass-blur);
      border: 1px solid var(--glass-border);
      border-radius: var(--radius-lg);
      padding: 32px;
      box-shadow: var(--shadow-lg);
      transition: transform var(--t-hover), box-shadow var(--t-hover);
    }
    .card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px oklch(0% 0 0 / 0.15); }

    /* Preview box adjustments */
    .preview-box {
      background: var(--blue-grey);
      background-image: radial-gradient(circle at top right, var(--baby-blue), transparent), radial-gradient(circle at bottom left, var(--platinum), transparent);
      border-radius: var(--radius-lg);
      padding: 48px;
      margin-bottom: 32px;
      border: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 24px;
      align-items: flex-start;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }

    [data-theme="dark"] .preview-box {
      background: var(--midnight);
      background-image: radial-gradient(circle at top right, oklch(40% 0.1 240 / 20%), transparent);
    }

    /* Responsive */
    @media (max-width: 1024px) {
      .app-container { grid-template-columns: 1fr; }
      .sidebar { display: none; }
      .main-content { padding: 40px 24px; }
    }
  </style>
</head>
<body>

  <div class="app-container">
    <aside class="sidebar">
      <div style="font-family: var(--font-display); font-size: 2.5rem; letter-spacing: -1px; line-height: 1;">
        Altair <span style="color: var(--cerulean);">GO</span>
      </div>
      <nav style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
        <a href="#foundations" style="text-decoration: none; color: inherit; font-weight: 600; opacity: 0.7;">Foundations</a>
        <a href="#typography" style="text-decoration: none; color: inherit; font-weight: 600; opacity: 0.7;">Typography</a>
        <a href="#components" style="text-decoration: none; color: inherit; font-weight: 600; opacity: 0.7;">Components</a>
        <a href="#platform-preview" style="text-decoration: none; color: inherit; font-weight: 600; opacity: 0.7;">Preview</a>
      </nav>
      
      <div style="margin-top: auto;">
        <button class="btn btn-glass" onclick="toggleTheme()" style="width: 100%; justify-content: center;">
          <span id="theme-icon">🌙</span> Dark Mode
        </button>
      </div>
    </aside>

    <main class="main-content">
      <header style="margin-bottom: 80px;">
        <p class="script-text">Premium SaaS Experience</p>
        <h1 class="h1">Design System 2.1</h1>
        <p style="font-size: 1.25rem; opacity: 0.6; max-width: 600px;">
          A comprehensive visual language for Altair GO. Refined with DM Serif Display, luxury cerulean tones, and custom motion.
        </p>
      </header>

      <section id="foundations" style="margin-bottom: 80px;">
        <h2 class="h2">Foundations</h2>
        
        <div style="margin-bottom: 48px;">
          <h3 style="margin-bottom: 12px; font-size: 1rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 0.1em;">Tailwind Config Tokens</h3>
          <div class="card" style="padding: 24px; font-family: monospace; font-size: 0.85rem; background: var(--midnight); color: #8EB1D1; overflow-x: auto; box-shadow: none;">
            <pre>
theme: {
  extend: {
    colors: {
      midnight: '#1C2B48',
      cerulean: '#8EB1D1',
      'baby-blue': '#A7C7E7',
      platinum: '#E8ECEF',
      'blue-grey': '#C4D8E5'
    },
    fontFamily: {
      display: ['DM Serif Display', 'serif'],
      body: ['Poppins', 'sans-serif'],
      accent: ['Satisfy', 'cursive']
    },
    borderRadius: {
      'xl': '16px',
      '2xl': '24px'
    },
    transitionTimingFunction: {
      'luxury': 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
}</pre>
          </div>
        </div>

        <h3 style="margin-bottom: 24px;">Color Palette</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px; margin-bottom: 48px;">
          <div class="color-card">
            <div class="color-swatch" style="background: var(--midnight);"></div>
            <div class="color-info">
              <div class="color-name">Midnight Blue</div>
              <div class="color-hex">#1C2B48</div>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--cerulean);"></div>
            <div class="color-info">
              <div class="color-name">Cool Cerulean</div>
              <div class="color-hex">#8EB1D1</div>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--baby-blue);"></div>
            <div class="color-info">
              <div class="color-name">Baby Blue Eyes</div>
              <div class="color-hex">#A7C7E7</div>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--blue-grey);"></div>
            <div class="color-info">
              <div class="color-name">Light Blue Grey</div>
              <div class="color-hex">#C4D8E5</div>
            </div>
          </div>
          <div class="color-card">
            <div class="color-swatch" style="background: var(--white);"></div>
            <div class="color-info">
              <div class="color-name">Clean White</div>
              <div class="color-hex">#F8FAFC</div>
            </div>
          </div>
        </div>

        <h3 style="margin-bottom: 24px;">Spacing Scale</h3>
        <div style="display: flex; align-items: flex-end; gap: 12px; margin-bottom: 64px;">
          <div style="width: 4px; height: 4px; background: var(--cerulean); border-radius: 1px;" title="4px"></div>
          <div style="width: 8px; height: 8px; background: var(--cerulean); border-radius: 2px;" title="8px"></div>
          <div style="width: 16px; height: 16px; background: var(--cerulean); border-radius: 4px;" title="16px"></div>
          <div style="width: 24px; height: 24px; background: var(--cerulean); border-radius: 6px;" title="24px"></div>
          <div style="width: 32px; height: 32px; background: var(--cerulean); border-radius: 8px;" title="32px"></div>
          <div style="width: 48px; height: 48px; background: var(--cerulean); border-radius: 10px;" title="48px"></div>
          <div style="width: 64px; height: 64px; background: var(--cerulean); border-radius: 12px;" title="64px"></div>
        </div>
      </section>

      <section id="typography" style="margin-bottom: 80px;">
        <h2 class="h2">Typography</h2>
        <div class="preview-box">
          <div style="font-family: var(--font-display); font-size: 5rem; font-weight: 400; line-height: 1;">Altair Display</div>
          <div style="font-family: var(--font-body); font-size: 1.5rem; opacity: 0.8;">Poppins — Clear, readable interface text.</div>
          <div class="script-text">Signature Touch — Brush script accents.</div>
        </div>
      </section>

      <section id="components" style="margin-bottom: 80px;">
        <h2 class="h2">Components</h2>
        
        <div style="margin-bottom: 48px;">
          <h3 style="margin-bottom: 16px; font-size: 1.2rem;">Navbar (Glass)</h3>
          <div class="preview-box" style="padding: 0; background: none; border: none; box-shadow: none;">
            <nav class="card" style="width: 100%; display: flex; align-items: center; justify-content: space-between; padding: 16px 32px; border-radius: var(--radius-md);">
              <div style="font-weight: 400; font-family: var(--font-display); font-size: 1.5rem;">ALTAIR</div>
              <div style="display: flex; gap: 24px; font-size: 0.9rem; font-weight: 600;">
                <span>Features</span>
                <span>Pricing</span>
                <span style="color: var(--cerulean);">Enterprise</span>
              </div>
              <button class="btn btn-primary" style="padding: 8px 20px; font-size: 0.85rem;">Login</button>
            </nav>
          </div>
        </div>

        <div style="margin-bottom: 48px;">
          <h3 style="margin-bottom: 16px; font-size: 1.2rem;">Interactions</h3>
          <div class="preview-box">
            <div style="display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 320px;">
              <label style="font-size: 0.75rem; font-weight: 600; opacity: 0.5; letter-spacing: 0.05em;">EMAIL ADDRESS</label>
              <input type="email" class="input-field" placeholder="name@altairgo.com">
            </div>
            <div style="display: flex; gap: 16px;">
              <button class="btn btn-primary">Get Started</button>
              <button class="btn btn-glass">Learn More</button>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 48px;">
          <h3 style="margin-bottom: 16px; font-size: 1.2rem;">Footer</h3>
          <div class="preview-box" style="padding: 0; background: none; border: none; box-shadow: none;">
            <footer class="card" style="width: 100%; border-radius: var(--radius-md); padding: 40px; display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px;">
              <div>
                <div style="font-weight: 400; font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 16px;">ALTAIR</div>
                <p style="font-size: 0.85rem; opacity: 0.6; max-width: 240px;">Next-generation workspace for modern startups. Built with focus and speed.</p>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
                <span style="font-weight: 600; opacity: 0.4;">PRODUCT</span>
                <span>Dashboard</span>
                <span>Automation</span>
                <span>Security</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 12px; font-size: 0.85rem;">
                <span style="font-weight: 600; opacity: 0.4;">COMPANY</span>
                <span>About</span>
                <span>Blog</span>
                <span>Careers</span>
              </div>
            </footer>
          </div>
        </div>
      </section>

      <section id="platform-preview" style="margin-bottom: 80px;">
        <h2 class="h2">Platform Context</h2>
        <div style="display: flex; gap: 48px; align-items: flex-start;">
          <div style="flex: 1;">
            <h3 style="margin-bottom: 16px; font-size: 0.9rem; opacity: 0.5;">DESKTOP VIEWPORT</h3>
            <div class="card" style="height: 400px; padding: 0; overflow: hidden; position: relative;">
               <div style="padding: 24px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
                    <div style="width: 120px; height: 12px; background: var(--border); border-radius: 4px;"></div>
                    <div style="width: 80px; height: 32px; background: var(--midnight); border-radius: 16px;"></div>
                  </div>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                    <div style="height: 200px; background: var(--blue-grey); border-radius: 12px;"></div>
                    <div style="height: 200px; background: var(--blue-grey); border-radius: 12px;"></div>
                    <div style="height: 200px; background: var(--blue-grey); border-radius: 12px;"></div>
                  </div>
               </div>
            </div>
          </div>
          <div style="width: 320px;">
            <h3 style="margin-bottom: 16px; font-size: 0.9rem; opacity: 0.5;">ANDROID APP</h3>
            <div style="width: 320px; height: 600px; border: 12px solid #1a1a1a; border-radius: 40px; background: var(--bg); position: relative; overflow: hidden; box-shadow: var(--shadow-lg);">
              <div style="padding: 48px 20px 20px;">
                <div style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 24px;">Altair</div>
                <div class="card" style="padding: 20px; margin-bottom: 16px;">
                  <div style="width: 32px; height: 32px; background: var(--cerulean); border-radius: 8px; margin-bottom: 12px;"></div>
                  <div style="width: 80%; height: 10px; background: var(--fg); opacity: 0.2; border-radius: 4px; margin-bottom: 8px;"></div>
                </div>
                <div class="card" style="padding: 20px;">
                   <div style="width: 32px; height: 32px; background: var(--baby-blue); border-radius: 8px; margin-bottom: 12px;"></div>
                   <div style="width: 80%; height: 10px; background: var(--fg); opacity: 0.2; border-radius: 4px; margin-bottom: 8px;"></div>
                </div>
              </div>
              <div style="position: absolute; bottom: 0; width: 100%; height: 64px; background: var(--surface); border-top: 1px solid var(--border); display: flex; justify-content: space-around; align-items: center;">
                <div style="width: 24px; height: 24px; background: var(--cerulean); border-radius: 6px;"></div>
                <div style="width: 24px; height: 24px; background: var(--border); border-radius: 6px;"></div>
                <div style="width: 24px; height: 24px; background: var(--border); border-radius: 6px;"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer style="padding-top: 48px; border-top: 1px solid var(--border); opacity: 0.4; font-size: 0.8rem; display: flex; justify-content: space-between; margin-bottom: 64px;">
        <span>ALTAIR GO DESIGN SYSTEM V2.1</span>
        <span>© 2026 ALTAIR GO LABS</span>
      </footer>
    </main>
  </div>

  <script>
    function toggleTheme() {
      const body = document.body;
      const theme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', theme);
      document.getElementById('theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  </script>
</body>
</html>
