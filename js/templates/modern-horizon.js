/**
 * Template: Modern Horizon
 * Style: Dark gradient, glassmorphism, purple/indigo accents
 * Sections: All 9
 */
window.templatesRegistry = window.templatesRegistry || {};
window.templatesRegistry['modern-horizon'] = {
    name: 'Modern Horizon',
    description: 'Dark glassmorphism with gradient accents',
    category: 'dark',
    html: `
<div class="tmpl-mh">

  <!-- HERO -------------------------------------------------------->
  <header class="mh-hero">
    <div class="mh-hero-bg"></div>
    <div class="mh-hero-inner">
      <img id="profile-img" src="" alt="Profile" class="mh-avatar hidden">
      <span class="mh-badge">✦ Open to opportunities</span>
      <h1 id="hero-name" class="mh-name"></h1>
      <p  id="hero-title" class="mh-role"></p>
      <p  id="hero-tagline" class="mh-tagline"></p>
      <nav id="hero-social" class="mh-social"></nav>
    </div>
  </header>

  <div class="mh-body">

    <!-- ABOUT ----------------------------------------------------->
    <section id="about-section" class="mh-section">
      <div class="mh-label">About Me</div>
      <div class="mh-glass"><p id="about-bio"></p></div>
    </section>

    <!-- SKILLS ---------------------------------------------------->
    <section id="skills-section" class="mh-section">
      <div class="mh-label">Skills &amp; Tech</div>
      <div id="skills-grid" class="mh-skills"></div>
    </section>

    <!-- PROJECTS -------------------------------------------------->
    <section id="projects-section" class="mh-section">
      <div class="mh-label">Featured Projects</div>
      <div id="projects-grid" class="mh-projects"></div>
    </section>

    <!-- EXPERIENCE ---------------------------------------------->
    <section id="experience-section" class="mh-section">
      <div class="mh-label">Work Experience</div>
      <div id="experience-list" class="mh-timeline"></div>
    </section>

    <!-- EDUCATION ----------------------------------------------->
    <section id="education-section" class="mh-section">
      <div class="mh-label">Education</div>
      <div id="education-list" class="mh-edu-grid"></div>
    </section>

    <!-- CERTIFICATIONS ------------------------------------------>
    <section id="certifications-section" class="mh-section">
      <div class="mh-label">Certifications</div>
      <div id="certifications-list" class="mh-cert-grid"></div>
    </section>

    <!-- CONTACT ------------------------------------------------->
    <section id="contact-section" class="mh-section">
      <div class="mh-label">Get In Touch</div>
      <div class="mh-glass mh-contact">
        <div id="contact-email-wrap" class="mh-contact-row hidden">
          <span>📧</span><a id="contact-email" href="#"></a>
        </div>
        <div id="contact-phone-wrap" class="mh-contact-row hidden">
          <span>📞</span><span id="contact-phone"></span>
        </div>
        <div id="contact-address-wrap" class="mh-contact-row hidden">
          <span>📍</span><span id="contact-address"></span>
        </div>
      </div>
    </section>

  </div><!-- /mh-body -->

  <footer class="mh-footer">Built with <span style="color:var(--mh-accent)">Portify</span> · <span id="footer-year"></span></footer>
</div>`,

    css: `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tmpl-mh{
  --mh-accent:#8b5cf6;--mh-accent2:#ec4899;
  --mh-bg:#030712;--mh-surface:rgba(255,255,255,0.04);
  --mh-border:rgba(255,255,255,0.08);--mh-text:#f1f5f9;--mh-muted:#94a3b8;
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--mh-bg);color:var(--mh-text);min-height:100vh;
}

/* HERO */
.mh-hero{
  position:relative;overflow:hidden;text-align:center;
  padding:8rem 2rem 5rem;
  border-bottom:1px solid var(--mh-border);
}
.mh-hero-bg{
  position:absolute;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 80% 60% at 50% -10%,rgba(139,92,246,.28) 0%,transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 100%,rgba(236,72,153,.12) 0%,transparent 60%);
}
.mh-hero-inner{position:relative;z-index:1;max-width:720px;margin:0 auto;}
.mh-avatar{
  width:120px;height:120px;border-radius:50%;object-fit:cover;
  border:3px solid var(--mh-accent);box-shadow:0 0 40px rgba(139,92,246,.4);
  margin:0 auto 1.5rem;display:block;
}
.mh-badge{
  display:inline-block;background:rgba(139,92,246,.15);
  border:1px solid rgba(139,92,246,.3);color:var(--mh-accent);
  font-size:.78rem;font-weight:600;letter-spacing:.06em;
  padding:.3rem 1rem;border-radius:99px;margin-bottom:1.25rem;
}
.mh-name{
  font-size:clamp(2.4rem,6vw,4.5rem);font-weight:800;letter-spacing:-.03em;
  background:linear-gradient(135deg,#fff 0%,var(--mh-accent) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  margin:.4rem 0;line-height:1.05;
}
.mh-role{font-size:1.2rem;font-weight:600;color:var(--mh-accent);margin:.4rem 0;}
.mh-tagline{font-size:.95rem;color:var(--mh-muted);margin:.6rem 0 1.75rem;}
.mh-social{display:flex;justify-content:center;flex-wrap:wrap;gap:.75rem;}
.social-icon{
  padding:.45rem 1rem;background:var(--mh-surface);border:1px solid var(--mh-border);
  border-radius:8px;color:var(--mh-muted);text-decoration:none;font-size:.82rem;
  transition:border-color .2s,color .2s;
}
.social-icon:hover{border-color:var(--mh-accent);color:var(--mh-accent);}

/* BODY */
.mh-body{max-width:1000px;margin:0 auto;padding:4rem 2rem;}
.mh-section{margin-bottom:5rem;}
.mh-label{
  font-size:.68rem;font-weight:700;text-transform:uppercase;
  letter-spacing:.22em;color:var(--mh-accent);margin-bottom:1.75rem;
  display:flex;align-items:center;gap:.75rem;
}
.mh-label::after{content:'';flex:1;height:1px;background:var(--mh-border);}
.mh-glass{
  background:var(--mh-surface);border:1px solid var(--mh-border);
  border-radius:20px;padding:2rem 2.5rem;backdrop-filter:blur(10px);
}
#about-bio{font-size:1.05rem;line-height:1.85;color:var(--mh-muted);}

/* SKILLS */
.mh-skills{display:flex;flex-wrap:wrap;gap:.75rem;}
.skill-badge{
  padding:.5rem 1.25rem;background:var(--mh-surface);border:1px solid var(--mh-border);
  border-radius:10px;font-size:.88rem;color:var(--mh-text);transition:border-color .2s;
}
.skill-badge:hover{border-color:var(--mh-accent);}

/* PROJECTS */
.mh-projects{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.5rem;}
.project-card{
  background:var(--mh-surface);border:1px solid var(--mh-border);
  border-radius:20px;padding:1.75rem;transition:transform .3s,border-color .3s;
}
.project-card:hover{transform:translateY(-6px);border-color:rgba(139,92,246,.5);}
.project-title{font-size:1.1rem;font-weight:700;margin-bottom:.6rem;}
.project-desc{font-size:.88rem;color:var(--mh-muted);line-height:1.65;margin-bottom:1rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:.75rem;}
.tag{font-size:.7rem;padding:2px 10px;background:rgba(139,92,246,.15);color:var(--mh-accent);border-radius:99px;}
.project-link{font-size:.82rem;color:var(--mh-accent);text-decoration:none;font-weight:600;}
.project-link:hover{text-decoration:underline;}

/* EXPERIENCE */
.mh-timeline{display:flex;flex-direction:column;}
.experience-item{
  padding:1.75rem 0 1.75rem 2.25rem;border-left:2px solid var(--mh-border);
  position:relative;
}
.experience-item::before{
  content:'';position:absolute;left:-5px;top:2.25rem;
  width:9px;height:9px;border-radius:50%;background:var(--mh-accent);
  border:2px solid var(--mh-bg);
}
.exp-header{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:.4rem;margin-bottom:.2rem;}
.exp-role{font-size:1rem;font-weight:700;}
.exp-duration{font-size:.78rem;color:var(--mh-muted);}
.exp-company{font-size:.88rem;color:var(--mh-accent);font-weight:600;margin-bottom:.4rem;}
.exp-desc{font-size:.88rem;color:var(--mh-muted);line-height:1.65;}

/* EDUCATION */
.mh-edu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.25rem;}
.education-item{background:var(--mh-surface);border:1px solid var(--mh-border);border-radius:16px;padding:1.4rem;}
.edu-degree{font-size:.98rem;font-weight:700;margin-bottom:.25rem;}
.edu-school{font-size:.85rem;color:var(--mh-accent);margin-bottom:.25rem;}
.edu-year{font-size:.78rem;color:var(--mh-muted);}

/* CERTIFICATIONS */
.mh-cert-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;}
.cert-item{
  background:var(--mh-surface);border:1px solid var(--mh-border);
  border-radius:16px;padding:1.2rem 1.5rem;
  display:flex;align-items:center;gap:.9rem;
}
.cert-icon{font-size:1.4rem;flex-shrink:0;}
.cert-name{font-size:.92rem;font-weight:700;}
.cert-issuer{font-size:.78rem;color:var(--mh-muted);}

/* CONTACT */
.mh-contact{display:flex;flex-direction:column;gap:1rem;}
.mh-contact-row{display:flex;align-items:center;gap:.9rem;font-size:.92rem;color:var(--mh-muted);}
.mh-contact-row a{color:var(--mh-muted);text-decoration:none;}
.mh-contact-row a:hover{color:var(--mh-accent);}

/* FOOTER */
.mh-footer{text-align:center;padding:3rem 2rem;border-top:1px solid var(--mh-border);color:var(--mh-muted);font-size:.82rem;}

/* LIGHT THEME */
.theme-light .tmpl-mh{--mh-bg:#f8fafc;--mh-text:#0f172a;--mh-surface:#ffffff;--mh-border:#e2e8f0;--mh-muted:#64748b;}
.theme-light .mh-name{background:linear-gradient(135deg,#1e1b4b,var(--mh-accent));-webkit-background-clip:text;background-clip:text;}
`
};
