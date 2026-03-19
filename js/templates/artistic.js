/**
 * Template: Artistic
 * Style: Creative sidebar, bold magenta/teal accents, Space Grotesk
 * Sections: All 9
 */
window.templatesRegistry = window.templatesRegistry || {};
window.templatesRegistry['artistic'] = {
    name: 'Artistic',
    description: 'Bold creative sidebar with vivid color pops',
    category: 'dark',
    html: `
<div class="tmpl-art">

  <!-- SIDEBAR ------------------------------------------------->
  <aside class="art-sidebar">
    <div class="art-sticky">
      <div class="art-avatar-wrap">
        <img id="profile-img" src="" alt="Profile" class="art-avatar hidden">
      </div>
      <h1 id="hero-name" class="art-name"></h1>
      <p  id="hero-title"   class="art-role"></p>
      <p  id="hero-tagline" class="art-tagline"></p>
      <nav id="hero-social" class="art-social"></nav>

      <!-- Sidebar: Skills -->
      <section id="skills-section" class="art-sidebar-block">
        <div class="art-slabel">Skills</div>
        <div id="skills-grid" class="art-skills"></div>
      </section>

      <!-- Sidebar: Education -->
      <section id="education-section" class="art-sidebar-block">
        <div class="art-slabel">Education</div>
        <div id="education-list" class="art-edu"></div>
      </section>

      <!-- Sidebar: Certifications -->
      <section id="certifications-section" class="art-sidebar-block">
        <div class="art-slabel">Certifications</div>
        <div id="certifications-list" class="art-certs"></div>
      </section>

      <!-- Sidebar: Contact -->
      <section id="contact-section" class="art-sidebar-block">
        <div class="art-slabel">Contact</div>
        <div class="art-contact-list">
          <div id="contact-email-wrap" class="art-contact-row hidden">
            <span class="art-ci">📧</span><a id="contact-email" href="#"></a>
          </div>
          <div id="contact-phone-wrap" class="art-contact-row hidden">
            <span class="art-ci">📞</span><span id="contact-phone"></span>
          </div>
          <div id="contact-address-wrap" class="art-contact-row hidden">
            <span class="art-ci">📍</span><span id="contact-address"></span>
          </div>
        </div>
      </section>

    </div>
  </aside>

  <!-- MAIN --------------------------------------------------->
  <main class="art-main">

    <section id="about-section" class="art-section">
      <div class="art-num">01</div>
      <h2 class="art-title">About Me</h2>
      <p id="about-bio" class="art-bio"></p>
    </section>

    <section id="projects-section" class="art-section">
      <div class="art-num">02</div>
      <h2 class="art-title">Featured Work</h2>
      <div id="projects-grid" class="art-projects"></div>
    </section>

    <section id="experience-section" class="art-section">
      <div class="art-num">03</div>
      <h2 class="art-title">Experience</h2>
      <div id="experience-list" class="art-exp"></div>
    </section>

    <footer class="art-footer">
      <span>Made with Portify · <span id="footer-year"></span></span>
    </footer>
  </main>

</div>`,

    css: `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tmpl-art{
  --a-mg:#f0f;--a-cy:#0ff;--a-bg:#111;--a-surf:#1a1a1a;
  --a-text:#f0f0f0;--a-muted:#888;--a-border:rgba(255,255,255,0.09);
  display:flex;min-height:100vh;font-family:'Space Grotesk',sans-serif;
  background:var(--a-bg);color:var(--a-text);
}

/* SIDEBAR */
.art-sidebar{
  width:295px;min-width:240px;background:var(--a-surf);
  border-right:1px solid var(--a-border);padding:3rem 1.75rem;flex-shrink:0;
}
.art-sticky{position:sticky;top:2rem;}
.art-avatar{
  width:84px;height:84px;border-radius:50%;object-fit:cover;
  border:2px solid var(--a-mg);box-shadow:0 0 25px rgba(255,0,255,.3);
  display:block;margin-bottom:1.25rem;
}

h1.art-name{
  font-size:1.65rem;font-weight:700;line-height:1.1;margin-bottom:.35rem;
  background:linear-gradient(135deg,#fff,var(--a-mg));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
}
.art-role{font-size:.82rem;color:var(--a-cy);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.35rem;}
.art-tagline{font-size:.78rem;color:var(--a-muted);line-height:1.55;margin-bottom:1.1rem;}
.art-social{display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:0;}
.social-icon{
  font-size:.7rem;padding:3px 9px;border:1px solid var(--a-border);
  border-radius:5px;color:var(--a-muted);text-decoration:none;transition:all .2s;
}
.social-icon:hover{border-color:var(--a-mg);color:var(--a-mg);}

/* SIDEBAR BLOCKS */
.art-sidebar-block{margin-top:1.6rem;padding-top:1.4rem;border-top:1px solid var(--a-border);}
.art-slabel{
  font-size:.58rem;text-transform:uppercase;letter-spacing:.18em;
  color:var(--a-muted);margin-bottom:.75rem;
}
.art-skills{display:flex;flex-wrap:wrap;gap:.35rem;}
.skill-badge{
  font-size:.73rem;padding:2px 9px;border:1px solid var(--a-border);
  border-radius:5px;color:var(--a-text);transition:border-color .2s;
}
.skill-badge:hover{border-color:var(--a-mg);}
.art-edu{display:flex;flex-direction:column;gap:.65rem;}
.education-item{font-size:.8rem;}
.edu-degree{font-weight:600;color:var(--a-text);}
.edu-school{color:var(--a-muted);font-size:.76rem;}
.edu-year{color:var(--a-cy);font-size:.73rem;}
.art-certs{display:flex;flex-direction:column;gap:.55rem;}
.cert-item{display:flex;align-items:center;gap:.5rem;}
.cert-icon{font-size:.85rem;flex-shrink:0;}
.cert-name{font-size:.78rem;font-weight:600;}
.cert-issuer{font-size:.7rem;color:var(--a-muted);}
.art-contact-list{display:flex;flex-direction:column;gap:.5rem;}
.art-contact-row{display:flex;align-items:center;gap:.5rem;}
.art-ci{font-size:.85rem;flex-shrink:0;}
.art-contact-row a,.art-contact-row span{font-size:.76rem;color:var(--a-muted);text-decoration:none;}
.art-contact-row a:hover{color:var(--a-mg);}

/* MAIN */
.art-main{flex:1;padding:4rem 4rem 4rem 5rem;max-width:740px;overflow:hidden;}
.art-section{margin-bottom:6rem;position:relative;}
.art-num{
  font-size:6rem;font-weight:700;color:rgba(255,255,255,.035);
  line-height:1;margin-left:-3rem;margin-bottom:-1rem;
  font-variant-numeric:tabular-nums;
}
.art-title{font-size:2rem;font-weight:700;color:var(--a-cy);margin-bottom:1.75rem;}
.art-bio{font-size:1.05rem;font-weight:300;line-height:1.85;color:var(--a-text);}

/* PROJECTS */
.art-projects{display:flex;flex-direction:column;gap:1.75rem;}
.project-card{
  border:1px solid var(--a-border);border-radius:14px;padding:1.75rem;
  background:var(--a-surf);transition:border-color .3s,transform .3s;position:relative;
}
.project-card:hover{border-color:rgba(255,0,255,.4);transform:translateX(6px);}
.project-title{font-size:1.25rem;font-weight:700;margin-bottom:.5rem;}
.project-desc{font-size:.88rem;color:var(--a-muted);line-height:1.7;margin-bottom:.65rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.65rem;}
.tag{font-size:.68rem;padding:2px 9px;background:rgba(255,0,255,.1);color:var(--a-mg);border-radius:99px;}
.project-link{font-size:.82rem;color:var(--a-cy);text-decoration:none;font-weight:600;}
.project-link:hover{text-decoration:underline;}

/* EXPERIENCE */
.art-exp{display:flex;flex-direction:column;gap:2.25rem;}
.experience-item{position:relative;padding-left:1.5rem;}
.experience-item::before{
  content:'';position:absolute;left:0;top:.55rem;
  width:6px;height:6px;border-radius:50%;background:var(--a-mg);
  box-shadow:0 0 10px var(--a-mg);
}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.25rem;margin-bottom:.2rem;}
.exp-role{font-size:.98rem;font-weight:700;}
.exp-duration{font-size:.76rem;color:var(--a-muted);}
.exp-company{font-size:.84rem;color:var(--a-cy);margin-bottom:.35rem;font-weight:600;}
.exp-desc{font-size:.86rem;color:var(--a-muted);line-height:1.7;}

/* FOOTER */
.art-footer{margin-top:5rem;padding-top:1.75rem;border-top:1px solid var(--a-border);font-size:.78rem;color:var(--a-muted);text-align:center;}

/* LIGHT */
.theme-light .tmpl-art{--a-bg:#f4f4f4;--a-surf:#fff;--a-text:#111;--a-muted:#666;--a-border:rgba(0,0,0,.1);--a-mg:#9333ea;--a-cy:#0891b2;}
.theme-light h1.art-name{background:linear-gradient(135deg,#111,var(--a-mg));-webkit-background-clip:text;background-clip:text;}
.theme-light .art-num{color:rgba(0,0,0,.04);}
`
};
