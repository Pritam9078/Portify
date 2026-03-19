/**
 * Template: Studio Bold
 * Style: Bold typography, high contrast B&W with accent color pop, Syne font
 * Sections: All 9
 */
window.templatesRegistry = window.templatesRegistry || {};
window.templatesRegistry['studio-bold'] = {
    name: 'Studio Bold',
    description: 'High-contrast bold typography with accent pops',
    category: 'light',
    html: `
<div class="tmpl-sb">

  <!-- HERO -------------------------------------------------->
  <header class="sb-hero">
    <div class="sb-hero-left">
      <img id="profile-img" src="" alt="Profile" class="sb-avatar hidden">
      <div class="sb-tag">Portfolio</div>
      <h1 id="hero-name" class="sb-name"></h1>
    </div>
    <div class="sb-hero-right">
      <p  id="hero-title"   class="sb-role"></p>
      <p  id="hero-tagline" class="sb-tagline"></p>
      <nav id="hero-social" class="sb-social"></nav>
    </div>
  </header>

  <!-- ABOUT ------------------------------------------------->
  <section id="about-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">01</span>
      <h2 class="sb-sh">About</h2>
    </div>
    <div class="sb-content">
      <p id="about-bio" class="sb-bio"></p>
    </div>
  </section>

  <!-- SKILLS ------------------------------------------------>
  <section id="skills-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">02</span>
      <h2 class="sb-sh">Skills</h2>
    </div>
    <div class="sb-content" id="skills-grid"></div>
  </section>

  <!-- PROJECTS ---------------------------------------------->
  <section id="projects-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">03</span>
      <h2 class="sb-sh">Projects</h2>
    </div>
    <div class="sb-content" id="projects-grid"></div>
  </section>

  <!-- EXPERIENCE -------------------------------------------->
  <section id="experience-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">04</span>
      <h2 class="sb-sh">Experience</h2>
    </div>
    <div class="sb-content" id="experience-list"></div>
  </section>

  <!-- EDUCATION --------------------------------------------->
  <section id="education-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">05</span>
      <h2 class="sb-sh">Education</h2>
    </div>
    <div class="sb-content" id="education-list"></div>
  </section>

  <!-- CERTIFICATIONS ---------------------------------------->
  <section id="certifications-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">06</span>
      <h2 class="sb-sh">Certifications</h2>
    </div>
    <div class="sb-content" id="certifications-list"></div>
  </section>

  <!-- CONTACT ----------------------------------------------->
  <section id="contact-section" class="sb-section">
    <div class="sb-section-head">
      <span class="sb-index">07</span>
      <h2 class="sb-sh">Contact</h2>
    </div>
    <div class="sb-content sb-contact">
      <div id="contact-email-wrap" class="sb-contact-row hidden">
        <span class="sb-ck">Email</span>
        <a id="contact-email" href="#"></a>
      </div>
      <div id="contact-phone-wrap" class="sb-contact-row hidden">
        <span class="sb-ck">Phone</span>
        <span id="contact-phone"></span>
      </div>
      <div id="contact-address-wrap" class="sb-contact-row hidden">
        <span class="sb-ck">Location</span>
        <span id="contact-address"></span>
      </div>
    </div>
  </section>

  <footer class="sb-footer">
    <span>© <span id="footer-year"></span> — Powered by <strong>Portify</strong></span>
  </footer>

</div>`,

    css: `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Inter:wght@300;400;500&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tmpl-sb{
  --sb-acc:#f59e0b;--sb-bg:#fafafa;--sb-text:#0a0a0a;
  --sb-border:#0a0a0a;--sb-muted:#555;--sb-surf:#fff;
  font-family:'Inter',sans-serif;background:var(--sb-bg);color:var(--sb-text);min-height:100vh;
}

/* HERO */
.sb-hero{
  display:grid;grid-template-columns:1fr 1fr;
  border-bottom:2px solid var(--sb-border);
  min-height:340px;
}
.sb-hero-left{
  border-right:2px solid var(--sb-border);padding:3rem;
  display:flex;flex-direction:column;justify-content:flex-end;
  background:var(--sb-text);
}
.sb-avatar{
  width:80px;height:80px;border-radius:0;object-fit:cover;
  margin-bottom:1.5rem;
  filter:grayscale(100%) contrast(1.2);
  border:3px solid var(--sb-acc);
}
.sb-tag{
  display:inline-block;background:var(--sb-acc);color:#000;
  font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;
  letter-spacing:.2em;text-transform:uppercase;padding:.25rem .8rem;
  margin-bottom:1rem;width:fit-content;
}
h1.sb-name{
  font-family:'Syne',sans-serif;font-size:clamp(2.5rem,5vw,4rem);
  font-weight:800;line-height:.95;color:#fff;letter-spacing:-.02em;
}
.sb-hero-right{padding:3rem;display:flex;flex-direction:column;justify-content:center;gap:1rem;}
.sb-role{
  font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;
  color:var(--sb-text);line-height:1.2;
}
.sb-tagline{font-size:.9rem;color:var(--sb-muted);line-height:1.6;}
.sb-social{display:flex;flex-wrap:wrap;gap:.5rem;}
.social-icon{
  font-size:.78rem;padding:.4rem .9rem;border:2px solid var(--sb-border);
  text-decoration:none;color:var(--sb-text);font-weight:500;
  transition:background .15s,color .15s;background:transparent;
}
.social-icon:hover{background:var(--sb-text);color:#fff;}

/* SECTIONS */
.sb-section{border-bottom:2px solid var(--sb-border);}
.sb-section-head{
  display:grid;grid-template-columns:80px 1fr;
  border-bottom:1px solid var(--sb-border);
}
.sb-index{
  padding:1.25rem 1.5rem;font-family:'Syne',sans-serif;font-size:.78rem;
  font-weight:700;color:var(--sb-acc);border-right:1px solid var(--sb-border);
}
.sb-sh{
  padding:1.25rem 2rem;font-family:'Syne',sans-serif;font-size:1rem;
  font-weight:700;text-transform:uppercase;letter-spacing:.12em;
}
.sb-content{padding:2.5rem 2rem 2.5rem calc(80px + 2rem);}
.sb-bio{font-size:1.05rem;line-height:1.8;color:#333;max-width:600px;}

/* SKILLS */
#skills-grid.sb-content{display:flex;flex-wrap:wrap;gap:.5rem;}
.skill-badge{
  font-size:.82rem;padding:.35rem .95rem;
  border:2px solid var(--sb-border);background:transparent;
  font-weight:500;transition:background .15s,color .15s;
}
.skill-badge:hover{background:var(--sb-acc);border-color:var(--sb-acc);}

/* PROJECTS */
#projects-grid.sb-content{display:flex;flex-direction:column;gap:0;padding-left:0;}
.project-card{
  padding:2rem 2rem 2rem calc(80px + 2rem);
  border-bottom:1px solid #e5e5e5;transition:background .2s;
}
.project-card:last-child{border-bottom:none;}
.project-card:hover{background:#f5f5f5;}
.project-title{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:.4rem;}
.project-desc{font-size:.88rem;color:var(--sb-muted);line-height:1.65;margin-bottom:.6rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.6rem;}
.tag{font-size:.68rem;padding:2px 8px;border:1px solid #ccc;font-weight:500;}
.project-link{font-size:.82rem;color:var(--sb-text);font-weight:700;text-decoration:underline;text-underline-offset:3px;}

/* EXPERIENCE */
.experience-item{
  padding-bottom:2rem;margin-bottom:2rem;
  border-bottom:1px solid #e5e5e5;
}
.experience-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.25rem;margin-bottom:.2rem;}
.exp-role{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;}
.exp-duration{font-size:.76rem;color:var(--sb-muted);}
.exp-company{font-size:.85rem;color:var(--sb-acc);font-weight:700;margin-bottom:.35rem;}
.exp-desc{font-size:.88rem;color:var(--sb-muted);line-height:1.65;}

/* EDUCATION */
.education-item{margin-bottom:1.5rem;}
.edu-degree{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:700;}
.edu-school{font-size:.85rem;color:var(--sb-muted);margin:.15rem 0;}
.edu-year{font-size:.78rem;color:var(--sb-acc);font-weight:700;}

/* CERTS */
.cert-item{display:flex;align-items:flex-start;gap:.65rem;margin-bottom:1rem;}
.cert-icon{font-size:.9rem;margin-top:2px;flex-shrink:0;}
.cert-name{font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;}
.cert-issuer{font-size:.76rem;color:var(--sb-muted);}

/* CONTACT */
.sb-contact{display:flex;flex-direction:column;gap:.85rem;}
.sb-contact-row{display:flex;align-items:baseline;gap:1.5rem;}
.sb-ck{font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.12em;width:65px;flex-shrink:0;color:#999;}
.sb-contact-row a,.sb-contact-row span{font-size:.9rem;color:var(--sb-text);text-decoration:none;}
.sb-contact-row a:hover{text-decoration:underline;}

/* FOOTER */
.sb-footer{
  padding:2rem;display:flex;justify-content:center;
  font-family:'Syne',sans-serif;font-size:.8rem;letter-spacing:.06em;
}

/* DARK */
.theme-dark .tmpl-sb{--sb-bg:#0a0a0a;--sb-text:#f0f0f0;--sb-border:#333;--sb-muted:#888;--sb-surf:#111;}
.theme-dark .sb-hero-left{background:#111;}
.theme-dark h1.sb-name{color:#f0f0f0;}
.theme-dark .project-card:hover{background:#111;}
.theme-dark .experience-item,.theme-dark .project-card{border-color:#222;}
.theme-dark .skill-badge:hover{background:var(--sb-acc);color:#000;border-color:var(--sb-acc);}
.theme-dark .sb-bio,.theme-dark .project-desc,.theme-dark .exp-desc{color:#aaa;}
.theme-dark .sb-contact-row a,.theme-dark .sb-contact-row span{color:#ccc;}
`
};
