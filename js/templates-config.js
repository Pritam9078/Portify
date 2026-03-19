/**
 * Portify Templates Registry — FULLY BUILT
 * All 4 templates render all 9 sections:
 * Basic Info, About, Skills, Projects, Experience,
 * Education, Certifications, Social Links, Contact
 */

window.templatesRegistry = {

    /* ═══════════════════════════════════════════════════════════
       1. MODERN — Dark gradient, glassmorphism, purple accents
    ═══════════════════════════════════════════════════════════ */
    modern: {
        html: `
<div class="portfolio-modern">

  <!-- HERO -->
  <header class="modern-hero">
    <div class="hero-inner">
      <img id="profile-img" src="" alt="Profile" class="hero-avatar hidden">
      <div class="hero-badge">✦ Open to opportunities</div>
      <h1 id="hero-name"></h1>
      <p class="hero-role" id="hero-title"></p>
      <p class="hero-tagline" id="hero-tagline"></p>
      <div id="hero-social" class="social-links"></div>
    </div>
    <div class="hero-glow"></div>
  </header>

  <div class="modern-body">

    <!-- ABOUT -->
    <section id="about-section" class="m-section">
      <div class="m-label">About Me</div>
      <div class="glass-card">
        <p id="about-bio"></p>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills-section" class="m-section">
      <div class="m-label">Skills &amp; Technologies</div>
      <div id="skills-grid" class="skills-grid"></div>
    </section>

    <!-- PROJECTS -->
    <section id="projects-section" class="m-section">
      <div class="m-label">Featured Projects</div>
      <div id="projects-grid" class="projects-grid"></div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience-section" class="m-section">
      <div class="m-label">Work Experience</div>
      <div id="experience-list" class="experience-list"></div>
    </section>

    <!-- EDUCATION -->
    <section id="education-section" class="m-section">
      <div class="m-label">Education</div>
      <div id="education-list" class="education-list"></div>
    </section>

    <!-- CERTIFICATIONS -->
    <section id="certifications-section" class="m-section">
      <div class="m-label">Certifications</div>
      <div id="certifications-list" class="certs-list"></div>
    </section>

    <!-- CONTACT -->
    <section id="contact-section" class="m-section">
      <div class="m-label">Get In Touch</div>
      <div class="glass-card contact-grid">
        <div id="contact-email-wrap" class="contact-item hidden">
          <span class="contact-icon">📧</span>
          <a id="contact-email" href="#"></a>
        </div>
        <div id="contact-phone-wrap" class="contact-item hidden">
          <span class="contact-icon">📞</span>
          <span id="contact-phone"></span>
        </div>
        <div id="contact-address-wrap" class="contact-item hidden">
          <span class="contact-icon">📍</span>
          <span id="contact-address"></span>
        </div>
      </div>
    </section>

  </div>

  <footer class="modern-footer">
    <p>Built with <a href="#" style="color:var(--p-main)">Portify</a></p>
  </footer>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.portfolio-modern{
  --p-main:#8b5cf6;--p-sec:#ec4899;--p-bg:#030712;
  --p-surface:rgba(255,255,255,0.04);--p-border:rgba(255,255,255,0.08);
  --p-text:#f1f5f9;--p-muted:#94a3b8;
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--p-bg);color:var(--p-text);min-height:100vh;
}
/* HERO */
.modern-hero{
  position:relative;text-align:center;
  padding:7rem 2rem 5rem;overflow:hidden;
  background:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(139,92,246,0.25) 0%,transparent 70%);
  border-bottom:1px solid var(--p-border);
}
.hero-inner{position:relative;z-index:2;max-width:700px;margin:0 auto;}
.hero-glow{
  position:absolute;inset:0;z-index:1;
  background:radial-gradient(circle at 50% 80%,rgba(236,72,153,0.08) 0%,transparent 60%);
  pointer-events:none;
}
.hero-avatar{
  width:120px;height:120px;border-radius:50%;object-fit:cover;
  border:3px solid var(--p-main);box-shadow:0 0 40px rgba(139,92,246,0.4);
  margin:0 auto 1.5rem;display:block;
}
.hero-badge{
  display:inline-flex;align-items:center;gap:0.5rem;
  background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);
  color:var(--p-main);font-size:0.8rem;font-weight:600;letter-spacing:0.05em;
  padding:0.35rem 1rem;border-radius:99px;margin-bottom:1.5rem;
}
#hero-name{font-size:clamp(2.5rem,6vw,4.5rem);font-weight:800;letter-spacing:-0.03em;
  background:linear-gradient(135deg,#fff 0%,var(--p-main) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin:0.5rem 0;}
.hero-role{font-size:1.25rem;font-weight:600;color:var(--p-main);margin:0.5rem 0;}
.hero-tagline{font-size:1rem;color:var(--p-muted);margin:0.75rem 0 1.5rem;}
.social-links{display:flex;justify-content:center;flex-wrap:wrap;gap:1rem;}
.social-icon{
  display:inline-flex;align-items:center;gap:0.4rem;
  padding:0.5rem 1rem;background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:8px;color:var(--p-muted);text-decoration:none;font-size:0.85rem;
  transition:all 0.2s;
}
.social-icon:hover{border-color:var(--p-main);color:var(--p-main);}
/* BODY */
.modern-body{max-width:960px;margin:0 auto;padding:4rem 2rem;}
.m-section{margin-bottom:5rem;}
.m-label{
  font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;
  color:var(--p-main);margin-bottom:1.75rem;
  display:flex;align-items:center;gap:0.75rem;
}
.m-label::after{content:'';flex:1;height:1px;background:var(--p-border);}
.glass-card{
  background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:20px;padding:2rem 2.5rem;backdrop-filter:blur(12px);
}
#about-bio{font-size:1.1rem;line-height:1.8;color:var(--p-muted);}
/* SKILLS */
.skills-grid{display:flex;flex-wrap:wrap;gap:0.75rem;}
.skill-badge{
  padding:0.5rem 1.25rem;background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:10px;font-size:0.9rem;color:var(--p-text);
  transition:border-color 0.2s;
}
.skill-badge:hover{border-color:var(--p-main);}
/* PROJECTS */
.projects-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;}
.project-card{
  background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:20px;padding:1.75rem;transition:transform 0.3s,border-color 0.3s;
}
.project-card:hover{transform:translateY(-6px);border-color:rgba(139,92,246,0.4);}
.project-title{font-size:1.15rem;font-weight:700;margin-bottom:0.75rem;}
.project-desc{font-size:0.9rem;color:var(--p-muted);line-height:1.6;margin-bottom:1rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:1rem;}
.tag{font-size:0.72rem;padding:3px 10px;background:rgba(139,92,246,0.15);color:var(--p-main);border-radius:99px;}
.project-link{font-size:0.85rem;color:var(--p-main);text-decoration:none;font-weight:600;}
.project-link:hover{text-decoration:underline;}
/* EXPERIENCE */
.experience-list{display:flex;flex-direction:column;gap:0;}
.experience-item{
  padding:1.75rem 0 1.75rem 2rem;border-left:2px solid var(--p-border);
  position:relative;
}
.experience-item::before{
  content:'';position:absolute;left:-5px;top:2rem;
  width:9px;height:9px;border-radius:50%;background:var(--p-main);
  border:2px solid var(--p-bg);
}
.exp-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.35rem;}
.exp-role{font-size:1.05rem;font-weight:700;}
.exp-duration{font-size:0.8rem;color:var(--p-muted);white-space:nowrap;}
.exp-company{font-size:0.9rem;color:var(--p-main);font-weight:600;margin-bottom:0.5rem;}
.exp-desc{font-size:0.9rem;color:var(--p-muted);line-height:1.6;}
/* EDUCATION */
.education-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;}
.education-item{
  background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:16px;padding:1.5rem;
}
.edu-degree{font-size:1rem;font-weight:700;margin-bottom:0.3rem;}
.edu-school{font-size:0.9rem;color:var(--p-main);margin-bottom:0.3rem;}
.edu-year{font-size:0.8rem;color:var(--p-muted);}
/* CERTIFICATIONS */
.certs-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;}
.cert-item{
  background:var(--p-surface);border:1px solid var(--p-border);
  border-radius:16px;padding:1.25rem 1.5rem;
  display:flex;align-items:center;gap:1rem;
}
.cert-icon{font-size:1.5rem;flex-shrink:0;}
.cert-name{font-size:0.95rem;font-weight:700;}
.cert-issuer{font-size:0.8rem;color:var(--p-muted);}
/* CONTACT */
.contact-grid{display:flex;flex-direction:column;gap:1rem;}
.contact-item{display:flex;align-items:center;gap:1rem;}
.contact-icon{font-size:1.25rem;flex-shrink:0;}
.contact-item a,.contact-item span{font-size:0.95rem;color:var(--p-muted);text-decoration:none;}
.contact-item a:hover{color:var(--p-main);}
/* FOOTER */
.modern-footer{text-align:center;padding:3rem 2rem;border-top:1px solid var(--p-border);color:var(--p-muted);font-size:0.85rem;}
/* LIGHT THEME */
.theme-light .portfolio-modern{--p-bg:#f8fafc;--p-text:#0f172a;--p-surface:#fff;--p-border:#e2e8f0;--p-muted:#64748b;}
.theme-light .hero-avatar{box-shadow:0 0 40px rgba(139,92,246,0.2);}
.theme-light #hero-name{background:linear-gradient(135deg,#0f172a 0%,var(--p-main) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
`
    },

    /* ═══════════════════════════════════════════════════════════
       2. DEVELOPER — GitHub-style dark, monospace, code aesthetic
    ═══════════════════════════════════════════════════════════ */
    developer: {
        html: `
<div class="portfolio-developer">
  <div class="dev-container">

    <!-- HERO: Code Block -->
    <header class="dev-hero">
      <div class="dev-file-bar">
        <span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
        <span class="dev-filename">portfolio.js</span>
      </div>
      <div class="dev-code-body">
        <img id="profile-img" src="" alt="Profile" class="dev-avatar hidden">
        <div class="code-line"><span class="c-key">const</span> <span class="c-var">developer</span> = {</div>
        <div class="code-indent">
          <div class="code-line c-comment">// Basic Info</div>
          <div class="code-line"><span class="c-prop">name</span>: <span class="c-str">"<span id="hero-name"></span>"</span>,</div>
          <div class="code-line"><span class="c-prop">role</span>: <span class="c-str">"<span id="hero-title"></span>"</span>,</div>
          <div class="code-line"><span class="c-prop">tagline</span>: <span class="c-str">"<span id="hero-tagline"></span>"</span>,</div>
          <div class="code-line"><span class="c-prop">social</span>: [<span id="hero-social"></span>],</div>
        </div>
        <div class="code-line">};</div>
      </div>
    </header>

    <!-- ABOUT -->
    <section id="about-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 01. About Me */</span></div>
      <p id="about-bio" class="dev-bio"></p>
    </section>

    <!-- SKILLS -->
    <section id="skills-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 02. Tech Stack */</span></div>
      <div id="skills-grid" class="dev-skills"></div>
    </section>

    <!-- PROJECTS -->
    <section id="projects-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 03. Projects */</span></div>
      <div id="projects-grid" class="dev-projects"></div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 04. Experience */</span></div>
      <div id="experience-list" class="dev-exp-list"></div>
    </section>

    <!-- EDUCATION -->
    <section id="education-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 05. Education */</span></div>
      <div id="education-list" class="dev-edu-list"></div>
    </section>

    <!-- CERTIFICATIONS -->
    <section id="certifications-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 06. Certifications */</span></div>
      <div id="certifications-list" class="dev-certs"></div>
    </section>

    <!-- CONTACT -->
    <section id="contact-section" class="dev-section">
      <div class="dev-heading"><span class="c-comment">/** 07. Contact */</span></div>
      <div class="dev-contact-block">
        <div id="contact-email-wrap" class="dev-contact-row hidden">
          <span class="c-prop">email</span>: <span class="c-str">"<a id="contact-email" href="#"></a>"</span>
        </div>
        <div id="contact-phone-wrap" class="dev-contact-row hidden">
          <span class="c-prop">phone</span>: <span class="c-str">"<span id="contact-phone"></span>"</span>
        </div>
        <div id="contact-address-wrap" class="dev-contact-row hidden">
          <span class="c-prop">address</span>: <span class="c-str">"<span id="contact-address"></span>"</span>
        </div>
      </div>
    </section>

    <footer class="dev-footer">
      <span class="c-comment">// end of file — powered by Portify</span>
    </footer>
  </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.portfolio-developer{
  background:#0d1117;color:#c9d1d9;
  font-family:'JetBrains Mono',monospace;
  min-height:100vh;padding:3rem 2rem;
}
.dev-container{max-width:860px;margin:0 auto;}
/* HERO */
.dev-hero{
  background:#161b22;border:1px solid #30363d;border-radius:12px;
  margin-bottom:4rem;overflow:hidden;
}
.dev-file-bar{
  background:#1c2128;border-bottom:1px solid #30363d;padding:0.6rem 1rem;
  display:flex;align-items:center;gap:0.5rem;
}
.dot{width:12px;height:12px;border-radius:50%;display:inline-block;}
.dot.red{background:#ff5f57;}.dot.yellow{background:#FEBC2E;}.dot.green{background:#28c840;}
.dev-filename{margin-left:0.75rem;font-size:0.8rem;color:#8b949e;}
.dev-code-body{padding:2rem;}
.dev-avatar{
  width:80px;height:80px;border-radius:8px;object-fit:cover;
  border:2px solid #30363d;float:right;margin-left:1.5rem;margin-bottom:0.5rem;
}
.code-line{font-size:1rem;line-height:2;color:#c9d1d9;}
.code-indent{padding-left:2rem;}
.c-comment{color:#8b949e;font-style:italic;}
.c-key{color:#ff7b72;}
.c-var{color:#d2a8ff;}
.c-prop{color:#79c0ff;}
.c-str{color:#a5d6ff;}
.c-num{color:#f2cc60;}
/* SECTIONS */
.dev-section{margin-bottom:4rem;}
.dev-heading{font-size:0.85rem;font-weight:700;color:#8b949e;margin-bottom:1.25rem;padding-bottom:0.5rem;border-bottom:1px solid #21262d;}
.dev-bio{font-size:0.95rem;color:#8b949e;line-height:1.8;}
/* SKILLS */
.dev-skills{display:flex;flex-wrap:wrap;gap:0.5rem;}
.skill-badge{
  font-size:0.85rem;color:#7ee787;border:1px solid #238636;
  background:rgba(35,134,54,0.1);padding:0.35rem 0.9rem;border-radius:6px;
}
/* PROJECTS */
.dev-projects{display:flex;flex-direction:column;gap:1.25rem;}
.project-card{
  background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1.5rem;
  transition:border-color 0.2s;
}
.project-card:hover{border-color:#58a6ff;}
.project-title{color:#58a6ff;font-size:1.05rem;font-weight:700;margin-bottom:0.5rem;}
.project-desc{color:#8b949e;font-size:0.9rem;line-height:1.7;margin-bottom:0.75rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.75rem;}
.tag{font-size:0.72rem;padding:2px 8px;background:rgba(56,139,253,0.1);color:#58a6ff;border-radius:99px;border:1px solid rgba(56,139,253,0.2);}
.project-link{font-size:0.85rem;color:#58a6ff;text-decoration:none;}
.project-link:hover{text-decoration:underline;}
/* EXPERIENCE */
.dev-exp-list{display:flex;flex-direction:column;gap:0;}
.experience-item{border-left:2px solid #21262d;padding:0 0 2rem 1.5rem;position:relative;}
.experience-item::before{content:'>';position:absolute;left:-0.7rem;top:0.35rem;color:#7ee787;font-weight:700;}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.25rem;}
.exp-role{color:#c9d1d9;font-weight:700;font-size:0.95rem;}
.exp-duration{color:#8b949e;font-size:0.8rem;}
.exp-company{color:#58a6ff;font-size:0.85rem;margin-bottom:0.4rem;}
.exp-desc{color:#8b949e;font-size:0.85rem;line-height:1.7;}
/* EDUCATION */
.dev-edu-list{display:flex;flex-direction:column;gap:1rem;}
.education-item{
  background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1rem 1.25rem;
  display:grid;grid-template-columns:1fr auto;align-items:center;gap:0.5rem;
}
.edu-degree{font-size:0.95rem;font-weight:700;color:#c9d1d9;}
.edu-school{font-size:0.85rem;color:#8b949e;grid-column:1;}
.edu-year{font-size:0.8rem;color:#f2cc60;text-align:right;grid-row:1/3;}
/* CERTIFICATIONS */
.dev-certs{display:flex;flex-direction:column;gap:0.75rem;}
.cert-item{
  background:#161b22;border:1px solid #30363d;border-radius:6px;
  padding:0.75rem 1rem;display:flex;align-items:center;gap:0.75rem;
}
.cert-icon{font-size:1rem;flex-shrink:0;}
.cert-name{font-size:0.9rem;font-weight:700;color:#c9d1d9;}
.cert-issuer{font-size:0.78rem;color:#8b949e;}
/* CONTACT */
.dev-contact-block{
  background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1.5rem;
  display:flex;flex-direction:column;gap:0.5rem;
}
.dev-contact-row{font-size:0.9rem;line-height:1.8;}
.dev-contact-row a{color:#a5d6ff;text-decoration:none;}
/* SOCIAL */
.social-icon{color:#a5d6ff;text-decoration:none;font-size:0.85rem;}
.social-icon:not(:last-child)::after{content:', ';}
/* FOOTER */
.dev-footer{text-align:center;padding:3rem 0 1rem;font-size:0.8rem;color:#8b949e;}
/* LIGHT */
.theme-light .portfolio-developer{background:#f6f8fa;color:#24292f;}
.theme-light .dev-hero{background:#fff;border-color:#d0d7de;}
.theme-light .dev-file-bar{background:#f6f8fa;border-color:#d0d7de;}
.theme-light .code-line,.theme-light .dev-bio,.theme-light .exp-role,.theme-light .edu-degree,.theme-light .cert-name{color:#24292f;}
.theme-light .project-card,.theme-light .education-item,.theme-light .cert-item,.theme-light .dev-contact-block{background:#fff;border-color:#d0d7de;}
.theme-light .dev-heading{border-color:#d0d7de;}
`
    },

    /* ═══════════════════════════════════════════════════════════
       3. MINIMAL — Clean serif typography, white/black, editorial
    ═══════════════════════════════════════════════════════════ */
    minimal: {
        html: `
<div class="portfolio-minimal">
  <div class="min-wrap">

    <!-- HEADER -->
    <header class="min-header">
      <div class="min-avatar-wrap">
        <img id="profile-img" src="" alt="Profile" class="min-avatar hidden">
      </div>
      <div class="min-hero-text">
        <h1 id="hero-name"></h1>
        <p id="hero-title" class="min-title"></p>
        <p id="hero-tagline" class="min-tagline"></p>
        <nav id="hero-social" class="min-social"></nav>
      </div>
    </header>

    <hr class="min-divider">

    <!-- ABOUT -->
    <section id="about-section" class="min-section">
      <h2 class="min-label">About</h2>
      <div class="min-main">
        <p id="about-bio" class="min-body"></p>
      </div>
    </section>

    <!-- SKILLS -->
    <section id="skills-section" class="min-section">
      <h2 class="min-label">Expertise</h2>
      <div class="min-main" id="skills-grid"></div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience-section" class="min-section">
      <h2 class="min-label">Experience</h2>
      <div class="min-main" id="experience-list"></div>
    </section>

    <!-- PROJECTS -->
    <section id="projects-section" class="min-section">
      <h2 class="min-label">Selected Work</h2>
      <div class="min-main" id="projects-grid"></div>
    </section>

    <!-- EDUCATION -->
    <section id="education-section" class="min-section">
      <h2 class="min-label">Education</h2>
      <div class="min-main" id="education-list"></div>
    </section>

    <!-- CERTIFICATIONS -->
    <section id="certifications-section" class="min-section">
      <h2 class="min-label">Certifications</h2>
      <div class="min-main" id="certifications-list"></div>
    </section>

    <!-- CONTACT -->
    <section id="contact-section" class="min-section">
      <h2 class="min-label">Contact</h2>
      <div class="min-main min-contact">
        <div id="contact-email-wrap" class="min-contact-row hidden">
          <span class="min-contact-label">Email</span>
          <a id="contact-email" href="#"></a>
        </div>
        <div id="contact-phone-wrap" class="min-contact-row hidden">
          <span class="min-contact-label">Phone</span>
          <span id="contact-phone"></span>
        </div>
        <div id="contact-address-wrap" class="min-contact-row hidden">
          <span class="min-contact-label">Location</span>
          <span id="contact-address"></span>
        </div>
      </div>
    </section>

    <footer class="min-footer">
      <small>© <span id="footer-year"></span> — Made with Portify</small>
    </footer>
  </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.portfolio-minimal{
  background:#fafafa;color:#111;
  font-family:'Inter',sans-serif;min-height:100vh;padding:5rem 2rem;
}
.min-wrap{max-width:720px;margin:0 auto;}
/* HEADER */
.min-header{display:flex;align-items:flex-start;gap:2rem;margin-bottom:3rem;}
.min-avatar{
  width:96px;height:96px;border-radius:50%;object-fit:cover;
  border:2px solid #e5e5e5;flex-shrink:0;
}
.min-hero-text{flex:1;}
h1#hero-name{
  font-family:'Libre Baskerville',serif;font-size:clamp(2rem,5vw,3rem);
  font-weight:700;letter-spacing:-0.02em;margin-bottom:0.35rem;line-height:1.1;
}
.min-title{font-size:1.05rem;color:#555;font-style:italic;font-family:'Libre Baskerville',serif;margin-bottom:0.3rem;}
.min-tagline{font-size:0.9rem;color:#888;margin-bottom:1rem;}
.min-social{display:flex;flex-wrap:wrap;gap:0.75rem;}
.social-icon{
  font-size:0.8rem;color:#333;text-decoration:none;
  border-bottom:1px solid #ccc;padding-bottom:1px;transition:border-color 0.2s;
}
.social-icon:hover{border-color:#333;}
.min-divider{border:none;border-top:1px solid #e5e5e5;margin-bottom:4rem;}
/* SECTIONS */
.min-section{
  display:grid;grid-template-columns:160px 1fr;gap:2rem;
  margin-bottom:4rem;
}
.min-label{
  font-size:0.65rem;text-transform:uppercase;letter-spacing:0.18em;
  color:#999;padding-top:0.25rem;font-family:'Inter',sans-serif;font-weight:500;
}
.min-body{font-size:1.05rem;line-height:1.75;color:#333;}
/* SKILLS */
#skills-grid.min-main{display:flex;flex-wrap:wrap;gap:0.5rem;align-content:flex-start;}
.skill-badge{
  font-size:0.85rem;color:#333;padding:4px 14px;
  border:1px solid #ddd;border-radius:4px;
}
/* EXPERIENCE */
.experience-list,.dev-edu-list{display:flex;flex-direction:column;gap:0;}
.experience-item{padding-bottom:2rem;border-bottom:1px solid #f0f0f0;margin-bottom:2rem;}
.experience-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.15rem;}
.exp-role{font-weight:600;font-size:0.95rem;color:#111;}
.exp-duration{font-size:0.8rem;color:#999;}
.exp-company{font-size:0.85rem;color:#666;margin-bottom:0.4rem;}
.exp-desc{font-size:0.9rem;color:#555;line-height:1.65;}
/* PROJECTS */
.min-projects,.project-card+.project-card{margin-top:0;}
.project-card{padding-bottom:2rem;border-bottom:1px solid #f0f0f0;margin-bottom:2rem;}
.project-card:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.project-title{font-family:'Libre Baskerville',serif;font-size:1.25rem;font-weight:700;margin-bottom:0.35rem;}
.project-desc{font-size:0.9rem;color:#555;line-height:1.65;margin-bottom:0.6rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.6rem;}
.tag{font-size:0.7rem;color:#666;border:1px solid #ddd;padding:2px 8px;border-radius:3px;}
.project-link{font-size:0.85rem;color:#111;font-weight:600;border-bottom:1px solid #111;text-decoration:none;padding-bottom:1px;}
/* EDUCATION */
.education-item{margin-bottom:1.5rem;}
.edu-degree{font-weight:600;font-size:0.95rem;}
.edu-school{font-size:0.85rem;color:#666;margin:0.15rem 0;}
.edu-year{font-size:0.8rem;color:#999;}
/* CERTS */
.certs-list{display:flex;flex-direction:column;gap:1rem;}
.cert-item{display:flex;align-items:flex-start;gap:0.75rem;}
.cert-icon{font-size:1rem;margin-top:2px;flex-shrink:0;}
.cert-name{font-size:0.9rem;font-weight:600;}
.cert-issuer{font-size:0.8rem;color:#777;}
/* CONTACT */
.min-contact{display:flex;flex-direction:column;gap:0.75rem;}
.min-contact-row{display:flex;gap:1.5rem;align-items:baseline;}
.min-contact-label{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.12em;color:#999;width:60px;flex-shrink:0;}
.min-contact-row a,.min-contact-row span{font-size:0.9rem;color:#333;text-decoration:none;}
.min-contact-row a:hover{text-decoration:underline;}
/* FOOTER */
.min-footer{text-align:center;padding-top:4rem;color:#bbb;}
/* DARK */
.theme-dark .portfolio-minimal{background:#0a0a0a;color:#f0f0f0;}
.theme-dark .min-body,.theme-dark .exp-desc,.theme-dark .project-desc{color:#aaa;}
.theme-dark .min-title,.theme-dark .exp-company,.theme-dark .edu-school{color:#888;}
.theme-dark .exp-role,.theme-dark .edu-degree,.theme-dark .cert-name,.theme-dark .project-title{color:#f0f0f0;}
.theme-dark .skill-badge,.theme-dark .tag{border-color:#333;color:#ccc;}
.theme-dark .project-link,.theme-dark .social-icon{color:#f0f0f0;border-color:#555;}
.theme-dark .min-divider,.theme-dark .experience-item,.theme-dark .project-card{border-color:#222;}
.theme-dark .min-contact-row a,.theme-dark .min-contact-row span{color:#aaa;}
`
    },

    /* ═══════════════════════════════════════════════════════════
       4. CREATIVE — Bold, colorful, sidebar layout, design-forward
    ═══════════════════════════════════════════════════════════ */
    creative: {
        html: `
<div class="portfolio-creative">

  <!-- SIDEBAR -->
  <aside class="c-sidebar">
    <div class="c-sticky">
      <div class="c-avatar-wrap">
        <img id="profile-img" src="" alt="Profile" class="c-avatar hidden">
      </div>
      <h1 id="hero-name" class="c-name"></h1>
      <p id="hero-title" class="c-role"></p>
      <p id="hero-tagline" class="c-tagline"></p>
      <div id="hero-social" class="c-social"></div>

      <div class="c-sidebar-contact hidden" id="sidebar-contact-block">
        <div id="contact-email-wrap" class="c-contact-item hidden">
          <span class="c-contact-icon">📧</span>
          <a id="contact-email" href="#"></a>
        </div>
        <div id="contact-phone-wrap" class="c-contact-item hidden">
          <span class="c-contact-icon">📞</span>
          <span id="contact-phone"></span>
        </div>
        <div id="contact-address-wrap" class="c-contact-item hidden">
          <span class="c-contact-icon">📍</span>
          <span id="contact-address"></span>
        </div>
      </div>

      <div class="c-skills-sidebar" id="skills-section">
        <div class="c-side-label">Skills</div>
        <div id="skills-grid" class="c-skills"></div>
      </div>

      <div class="c-edu-sidebar" id="education-section">
        <div class="c-side-label">Education</div>
        <div id="education-list" class="c-edu-list"></div>
      </div>

      <div class="c-cert-sidebar" id="certifications-section">
        <div class="c-side-label">Certifications</div>
        <div id="certifications-list" class="c-cert-list"></div>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="c-main">

    <!-- ABOUT -->
    <section id="about-section" class="c-section">
      <div class="c-section-head">
        <span class="c-num">01</span>
        <h2 class="c-title">About Me</h2>
      </div>
      <p id="about-bio" class="c-bio"></p>
    </section>

    <!-- PROJECTS -->
    <section id="projects-section" class="c-section">
      <div class="c-section-head">
        <span class="c-num">02</span>
        <h2 class="c-title">Featured Work</h2>
      </div>
      <div id="projects-grid" class="c-projects"></div>
    </section>

    <!-- EXPERIENCE -->
    <section id="experience-section" class="c-section">
      <div class="c-section-head">
        <span class="c-num">03</span>
        <h2 class="c-title">Experience</h2>
      </div>
      <div id="experience-list" class="c-exp-list"></div>
    </section>

    <footer class="c-footer">
      Built with Portify ✦
    </footer>
  </main>

</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
.portfolio-creative{
  --c-accent:#f0f;--c-accent2:#0ff;--c-bg:#111;--c-surface:#1a1a1a;
  --c-text:#f0f0f0;--c-muted:#888;--c-border:rgba(255,255,255,0.08);
  display:flex;min-height:100vh;font-family:'Space Grotesk',sans-serif;
  background:var(--c-bg);color:var(--c-text);
}
/* SIDEBAR */
.c-sidebar{
  width:300px;min-width:260px;background:var(--c-surface);
  border-right:1px solid var(--c-border);padding:3rem 2rem;flex-shrink:0;
}
.c-sticky{position:sticky;top:2rem;}
.c-avatar{
  width:80px;height:80px;border-radius:50%;object-fit:cover;
  border:2px solid var(--c-accent);box-shadow:0 0 20px rgba(255,0,255,0.3);
  margin-bottom:1.25rem;display:block;
}
h1.c-name{
  font-size:1.75rem;font-weight:700;line-height:1.1;
  background:linear-gradient(135deg,#fff,var(--c-accent));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin-bottom:0.4rem;
}
.c-role{font-size:0.85rem;color:var(--c-accent2);font-weight:600;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:0.4rem;}
.c-tagline{font-size:0.8rem;color:var(--c-muted);margin-bottom:1.25rem;line-height:1.5;}
.c-social{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.75rem;}
.social-icon{
  font-size:0.72rem;padding:4px 10px;border:1px solid var(--c-border);
  border-radius:6px;color:var(--c-muted);text-decoration:none;transition:all 0.2s;
}
.social-icon:hover{border-color:var(--c-accent);color:var(--c-accent);}
/* Sidebar blocks */
.c-side-label{
  font-size:0.6rem;text-transform:uppercase;letter-spacing:0.18em;
  color:var(--c-muted);margin-bottom:0.75rem;margin-top:1.75rem;
  border-top:1px solid var(--c-border);padding-top:1.25rem;
}
.c-skills{display:flex;flex-wrap:wrap;gap:0.4rem;}
.skill-badge{
  font-size:0.75rem;padding:3px 10px;border:1px solid var(--c-border);
  border-radius:5px;color:var(--c-text);transition:border-color 0.2s;
}
.skill-badge:hover{border-color:var(--c-accent);}
.c-edu-list{display:flex;flex-direction:column;gap:0.75rem;}
.education-item{font-size:0.82rem;}
.edu-degree{font-weight:600;color:var(--c-text);}
.edu-school{color:var(--c-muted);font-size:0.78rem;}
.edu-year{color:var(--c-accent2);font-size:0.75rem;}
.c-cert-list{display:flex;flex-direction:column;gap:0.6rem;}
.cert-item{display:flex;align-items:center;gap:0.5rem;}
.cert-icon{font-size:0.85rem;flex-shrink:0;}
.cert-name{font-size:0.8rem;font-weight:600;}
.cert-issuer{font-size:0.72rem;color:var(--c-muted);}
/* Sidebar contact */
.c-sidebar-contact{margin-top:1rem;}
.c-side-label+.c-sidebar-contact{margin-top:0;}
.c-contact-item{display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;}
.c-contact-icon{font-size:0.9rem;flex-shrink:0;}
.c-contact-item a,.c-contact-item span{font-size:0.78rem;color:var(--c-muted);text-decoration:none;}
.c-contact-item a:hover{color:var(--c-accent);}
/* MAIN */
.c-main{flex:1;padding:4rem 4rem 4rem 5rem;max-width:760px;}
/* SECTION */
.c-section{margin-bottom:6rem;position:relative;}
.c-section-head{display:flex;align-items:baseline;gap:1.25rem;margin-bottom:2rem;}
.c-num{font-size:5rem;font-weight:700;color:rgba(255,255,255,0.04);line-height:1;margin-left:-2rem;}
.c-title{font-size:2rem;font-weight:700;color:var(--c-accent2);}
.c-bio{font-size:1.1rem;font-weight:300;line-height:1.8;color:var(--c-text);}
/* PROJECTS */
.c-projects{display:flex;flex-direction:column;gap:2rem;}
.project-card{
  border:1px solid var(--c-border);border-radius:12px;padding:2rem;
  background:var(--c-surface);transition:border-color 0.3s,transform 0.3s;
  position:relative;overflow:hidden;
}
.project-card::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,0,255,0.04),rgba(0,255,255,0.04));
  opacity:0;transition:opacity 0.3s;
}
.project-card:hover{border-color:rgba(255,0,255,0.4);transform:translateX(6px);}
.project-card:hover::before{opacity:1;}
.project-title{font-size:1.35rem;font-weight:700;margin-bottom:0.6rem;color:var(--c-text);}
.project-desc{font-size:0.9rem;color:var(--c-muted);line-height:1.7;margin-bottom:0.75rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.75rem;}
.tag{font-size:0.7rem;padding:2px 10px;background:rgba(255,0,255,0.1);color:var(--c-accent);border-radius:99px;}
.project-link{font-size:0.85rem;color:var(--c-accent2);text-decoration:none;font-weight:600;}
.project-link:hover{text-decoration:underline;}
/* EXPERIENCE */
.c-exp-list{display:flex;flex-direction:column;gap:2.5rem;}
.experience-item{position:relative;padding-left:1.5rem;}
.experience-item::before{
  content:'';position:absolute;left:0;top:0.5rem;
  width:6px;height:6px;border-radius:50%;background:var(--c-accent);
  box-shadow:0 0 10px var(--c-accent);
}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.25rem;margin-bottom:0.25rem;}
.exp-role{font-size:1rem;font-weight:700;color:var(--c-text);}
.exp-duration{font-size:0.8rem;color:var(--c-muted);}
.exp-company{font-size:0.85rem;color:var(--c-accent2);margin-bottom:0.4rem;font-weight:600;}
.exp-desc{font-size:0.88rem;color:var(--c-muted);line-height:1.7;}
/* FOOTER */
.c-footer{margin-top:6rem;padding-top:2rem;border-top:1px solid var(--c-border);font-size:0.8rem;color:var(--c-muted);text-align:center;}
/* LIGHT */
.theme-light .portfolio-creative{--c-bg:#f5f5f5;--c-surface:#fff;--c-text:#111;--c-muted:#666;--c-border:rgba(0,0,0,0.1);--c-accent:#9333ea;--c-accent2:#0891b2;}
.theme-light h1.c-name{background:linear-gradient(135deg,#111,var(--c-accent));-webkit-background-clip:text;background-clip:text;}
.theme-light .c-num{color:rgba(0,0,0,0.04);}
.theme-light .project-card::before{background:linear-gradient(135deg,rgba(147,51,234,0.04),rgba(8,145,178,0.04));}
.theme-light .c-avatar{box-shadow:0 0 20px rgba(147,51,234,0.2);}
`
    }
};
