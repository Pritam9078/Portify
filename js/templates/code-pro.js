/**
 * Template: Code Pro
 * Style: GitHub-dark terminal, monospace, developer aesthetic
 * Sections: All 9
 */
window.templatesRegistry = window.templatesRegistry || {};
window.templatesRegistry['code-pro'] = {
    name: 'Code Pro',
    description: 'GitHub-style terminal with monospace fonts',
    category: 'dark',
    html: `
<div class="tmpl-cp">
  <div class="cp-wrap">

    <!-- TERMINAL HERO ------------------------------------------->
    <header class="cp-hero">
      <div class="cp-titlebar">
        <span class="cp-dot r"></span>
        <span class="cp-dot y"></span>
        <span class="cp-dot g"></span>
        <span class="cp-filename">~/portfolio/index.js</span>
      </div>
      <div class="cp-body">
        <img id="profile-img" src="" alt="Profile" class="cp-avatar hidden">
        <div class="cp-line"><span class="cp-k">const</span> <span class="cp-v">dev</span> = {</div>
        <div class="cp-indent">
          <div class="cp-line cp-c">// ── Basic Info ───────────────────────────</div>
          <div class="cp-line"><span class="cp-p">name</span>:    <span class="cp-s">"<span id="hero-name"></span>"</span>,</div>
          <div class="cp-line"><span class="cp-p">role</span>:    <span class="cp-s">"<span id="hero-title"></span>"</span>,</div>
          <div class="cp-line"><span class="cp-p">tagline</span>:<span class="cp-s">"<span id="hero-tagline"></span>"</span>,</div>
          <div class="cp-line"><span class="cp-p">links</span>:  [<span id="hero-social"></span>],</div>
        </div>
        <div class="cp-line">};</div>
      </div>
    </header>

    <!-- ABOUT --------------------------------------------------->
    <section id="about-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">/**</span></div>
      <div class="cp-sh"><span class="cp-c"> * 01 · About</span></div>
      <div class="cp-sh"><span class="cp-c"> */</span></div>
      <p id="about-bio" class="cp-bio"></p>
    </section>

    <!-- SKILLS -------------------------------------------------->
    <section id="skills-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 02 · Tech Stack ────────────────────────</span></div>
      <div id="skills-grid" class="cp-skills"></div>
    </section>

    <!-- PROJECTS ---------------------------------------------->
    <section id="projects-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 03 · Projects ──────────────────────────</span></div>
      <div id="projects-grid" class="cp-projects"></div>
    </section>

    <!-- EXPERIENCE -------------------------------------------->
    <section id="experience-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 04 · Experience ────────────────────────</span></div>
      <div id="experience-list" class="cp-exp"></div>
    </section>

    <!-- EDUCATION --------------------------------------------->
    <section id="education-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 05 · Education ─────────────────────────</span></div>
      <div id="education-list" class="cp-edu"></div>
    </section>

    <!-- CERTIFICATIONS ---------------------------------------->
    <section id="certifications-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 06 · Certifications ───────────────────</span></div>
      <div id="certifications-list" class="cp-certs"></div>
    </section>

    <!-- CONTACT ----------------------------------------------->
    <section id="contact-section" class="cp-section">
      <div class="cp-sh"><span class="cp-c">// 07 · Contact ───────────────────────────</span></div>
      <div class="cp-contact-block">
        <div id="contact-email-wrap" class="cp-contact-row hidden">
          <span class="cp-p">email</span>:<span class="cp-s">"<a id="contact-email" href="#"></a>"</span>,
        </div>
        <div id="contact-phone-wrap" class="cp-contact-row hidden">
          <span class="cp-p">phone</span>:<span class="cp-s">"<span id="contact-phone"></span>"</span>,
        </div>
        <div id="contact-address-wrap" class="cp-contact-row hidden">
          <span class="cp-p">location</span>:<span class="cp-s">"<span id="contact-address"></span>"</span>,
        </div>
      </div>
    </section>

    <footer class="cp-footer">
      <span class="cp-c">// ─── EOF · powered by Portify · <span id="footer-year"></span> ───</span>
    </footer>
  </div>
</div>`,

    css: `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tmpl-cp{
  background:#0d1117;color:#c9d1d9;
  font-family:'JetBrains Mono',monospace;min-height:100vh;padding:3rem 1.5rem;
}
.cp-wrap{max-width:880px;margin:0 auto;}

/* HERO */
.cp-hero{background:#161b22;border:1px solid #30363d;border-radius:12px;margin-bottom:3rem;overflow:hidden;}
.cp-titlebar{background:#1c2128;border-bottom:1px solid #30363d;padding:.55rem 1rem;display:flex;align-items:center;gap:.5rem;}
.cp-dot{width:12px;height:12px;border-radius:50%;display:inline-block;flex-shrink:0;}
.cp-dot.r{background:#ff5f57;}.cp-dot.y{background:#febc2e;}.cp-dot.g{background:#28c840;}
.cp-filename{margin-left:.75rem;font-size:.78rem;color:#8b949e;}
.cp-body{padding:1.75rem 2rem;position:relative;}
.cp-avatar{
  width:72px;height:72px;border-radius:8px;object-fit:cover;
  border:2px solid #30363d;float:right;margin:0 0 .75rem 1.25rem;
}
.cp-line{font-size:.95rem;line-height:2;color:#c9d1d9;}
.cp-indent{padding-left:2rem;}
.cp-c{color:#8b949e;font-style:italic;}
.cp-k{color:#ff7b72;}.cp-v{color:#d2a8ff;}.cp-p{color:#79c0ff;}.cp-s{color:#a5d6ff;}.cp-n{color:#f2cc60;}

/* SECTIONS */
.cp-section{margin-bottom:3.5rem;}
.cp-sh{font-size:.82rem;margin-bottom:1rem;line-height:1.6;}
.cp-bio{font-size:.93rem;color:#8b949e;line-height:1.85;}

/* SKILLS */
.cp-skills{display:flex;flex-wrap:wrap;gap:.5rem 1rem;}
.skill-badge{
  font-size:.84rem;color:#7ee787;border:1px solid #238636;
  background:rgba(35,134,54,.1);padding:.3rem .9rem;border-radius:6px;
}

/* PROJECTS */
.cp-projects{display:flex;flex-direction:column;gap:1.25rem;}
.project-card{
  background:#161b22;border:1px solid #30363d;border-radius:8px;padding:1.5rem;
  transition:border-color .2s;
}
.project-card:hover{border-color:#58a6ff;}
.project-title{color:#58a6ff;font-size:1rem;font-weight:700;margin-bottom:.45rem;}
.project-desc{color:#8b949e;font-size:.86rem;line-height:1.7;margin-bottom:.6rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.6rem;}
.tag{font-size:.7rem;padding:2px 9px;background:rgba(56,139,253,.1);color:#58a6ff;border-radius:99px;border:1px solid rgba(56,139,253,.25);}
.project-link{font-size:.82rem;color:#58a6ff;text-decoration:none;}
.project-link:hover{text-decoration:underline;}

/* EXPERIENCE */
.cp-exp{display:flex;flex-direction:column;gap:0;}
.experience-item{border-left:2px solid #21262d;padding:0 0 2rem 1.5rem;position:relative;}
.experience-item::before{content:'>';position:absolute;left:-.7rem;top:.3rem;color:#7ee787;font-weight:700;font-size:.9rem;}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.2rem;margin-bottom:.2rem;}
.exp-role{color:#c9d1d9;font-weight:700;font-size:.92rem;}
.exp-duration{color:#8b949e;font-size:.76rem;}
.exp-company{color:#58a6ff;font-size:.82rem;margin-bottom:.35rem;}
.exp-desc{color:#8b949e;font-size:.83rem;line-height:1.7;}

/* EDUCATION */
.cp-edu{display:flex;flex-direction:column;gap:.85rem;}
.education-item{
  background:#161b22;border:1px solid #30363d;border-radius:7px;
  padding:.9rem 1.2rem;display:grid;grid-template-columns:1fr auto;align-items:center;
}
.edu-degree{font-size:.92rem;font-weight:700;color:#c9d1d9;}
.edu-school{font-size:.82rem;color:#8b949e;grid-column:1;}
.edu-year{font-size:.78rem;color:#f2cc60;grid-row:1/3;text-align:right;}

/* CERTS */
.cp-certs{display:flex;flex-direction:column;gap:.75rem;}
.cert-item{
  background:#161b22;border:1px solid #30363d;border-radius:7px;
  padding:.75rem 1.1rem;display:flex;align-items:center;gap:.75rem;
}
.cert-icon{font-size:.95rem;flex-shrink:0;}
.cert-name{font-size:.88rem;font-weight:700;color:#c9d1d9;}
.cert-issuer{font-size:.76rem;color:#8b949e;}

/* CONTACT */
.cp-contact-block{
  background:#161b22;border:1px solid #30363d;border-radius:8px;
  padding:1.4rem 1.75rem;display:flex;flex-direction:column;gap:.35rem;
}
.cp-contact-row{font-size:.88rem;line-height:2;}
.cp-contact-row a{color:#a5d6ff;text-decoration:none;}
.cp-contact-row a:hover{text-decoration:underline;}

/* SOCIAL */
.social-icon{color:#a5d6ff;text-decoration:none;font-size:.85rem;}
.social-icon:not(:last-child)::after{content:', ';}

/* FOOTER */
.cp-footer{margin-top:3rem;padding:2rem 0 .5rem;text-align:center;font-size:.78rem;}

/* LIGHT */
.theme-light .tmpl-cp{background:#f6f8fa;color:#24292f;}
.theme-light .cp-hero{background:#fff;border-color:#d0d7de;}
.theme-light .cp-titlebar{background:#f6f8fa;border-color:#d0d7de;}
.theme-light .project-card,.theme-light .education-item,.theme-light .cert-item,.theme-light .cp-contact-block{background:#fff;border-color:#d0d7de;}
.theme-light .cp-line,.theme-light .exp-role,.theme-light .edu-degree,.theme-light .cert-name{color:#24292f;}
`
};
