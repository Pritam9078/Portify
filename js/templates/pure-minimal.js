/**
 * Template: Pure Minimal
 * Style: White editorial, serif typography, clean grid layout
 * Sections: All 9
 */
window.templatesRegistry = window.templatesRegistry || {};
window.templatesRegistry['pure-minimal'] = {
    name: 'Pure Minimal',
    description: 'Clean editorial design with serif typography',
    category: 'light',
    html: `
<div class="tmpl-pm">
  <div class="pm-wrap">

    <!-- HEADER -------------------------------------------------->
    <header class="pm-header">
      <div class="pm-avatar-col">
        <img id="profile-img" src="" alt="Profile" class="pm-avatar hidden">
      </div>
      <div class="pm-hero-col">
        <h1 id="hero-name"></h1>
        <p  id="hero-title"   class="pm-role"></p>
        <p  id="hero-tagline" class="pm-tagline"></p>
        <nav id="hero-social" class="pm-social"></nav>
      </div>
    </header>

    <div class="pm-rule"></div>

    <!-- ABOUT --------------------------------------------------->
    <div class="pm-row" id="about-section">
      <aside class="pm-aside"><h2 class="pm-label">About</h2></aside>
      <div class="pm-col"><p id="about-bio" class="pm-bio"></p></div>
    </div>

    <!-- SKILLS -------------------------------------------------->
    <div class="pm-row" id="skills-section">
      <aside class="pm-aside"><h2 class="pm-label">Expertise</h2></aside>
      <div class="pm-col" id="skills-grid"></div>
    </div>

    <!-- EXPERIENCE -------------------------------------------->
    <div class="pm-row" id="experience-section">
      <aside class="pm-aside"><h2 class="pm-label">Experience</h2></aside>
      <div class="pm-col" id="experience-list"></div>
    </div>

    <!-- PROJECTS ---------------------------------------------->
    <div class="pm-row" id="projects-section">
      <aside class="pm-aside"><h2 class="pm-label">Work</h2></aside>
      <div class="pm-col" id="projects-grid"></div>
    </div>

    <!-- EDUCATION --------------------------------------------->
    <div class="pm-row" id="education-section">
      <aside class="pm-aside"><h2 class="pm-label">Education</h2></aside>
      <div class="pm-col" id="education-list"></div>
    </div>

    <!-- CERTIFICATIONS ---------------------------------------->
    <div class="pm-row" id="certifications-section">
      <aside class="pm-aside"><h2 class="pm-label">Certifications</h2></aside>
      <div class="pm-col" id="certifications-list"></div>
    </div>

    <!-- CONTACT ----------------------------------------------->
    <div class="pm-row" id="contact-section">
      <aside class="pm-aside"><h2 class="pm-label">Contact</h2></aside>
      <div class="pm-col pm-contact">
        <div id="contact-email-wrap" class="pm-contact-row hidden">
          <span class="pm-contact-key">Email</span>
          <a id="contact-email" href="#"></a>
        </div>
        <div id="contact-phone-wrap" class="pm-contact-row hidden">
          <span class="pm-contact-key">Phone</span>
          <span id="contact-phone"></span>
        </div>
        <div id="contact-address-wrap" class="pm-contact-row hidden">
          <span class="pm-contact-key">Location</span>
          <span id="contact-address"></span>
        </div>
      </div>
    </div>

    <footer class="pm-footer">
      <small>© <span id="footer-year"></span> · Made with Portify</small>
    </footer>
  </div>
</div>`,

    css: `
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.tmpl-pm{
  background:#fafafa;color:#111;
  font-family:'Inter',sans-serif;min-height:100vh;padding:5rem 2rem;
}
.pm-wrap{max-width:780px;margin:0 auto;}

/* HEADER */
.pm-header{display:flex;align-items:flex-start;gap:2rem;margin-bottom:3rem;}
.pm-avatar-col{flex-shrink:0;}
.pm-avatar{width:90px;height:90px;border-radius:50%;object-fit:cover;border:2px solid #e5e5e5;}
h1#hero-name{
  font-family:'Libre Baskerville',serif;font-size:clamp(1.9rem,5vw,3rem);
  font-weight:700;letter-spacing:-.025em;line-height:1.1;margin-bottom:.3rem;
}
.pm-role{font-style:italic;font-family:'Libre Baskerville',serif;font-size:1rem;color:#555;margin-bottom:.25rem;}
.pm-tagline{font-size:.85rem;color:#888;margin-bottom:.9rem;}
.pm-social{display:flex;flex-wrap:wrap;gap:.6rem;}
.social-icon{
  font-size:.78rem;color:#444;text-decoration:none;
  border-bottom:1px solid #ccc;padding-bottom:1px;transition:color .2s,border-color .2s;
}
.social-icon:hover{color:#000;border-color:#000;}
.pm-rule{border:none;border-top:1px solid #e0e0e0;margin-bottom:3.5rem;}

/* GRID ROWS */
.pm-row{display:grid;grid-template-columns:160px 1fr;gap:2rem;margin-bottom:4rem;align-items:start;}
.pm-aside{padding-top:.1rem;}
.pm-label{
  font-size:.62rem;text-transform:uppercase;letter-spacing:.18em;
  color:#aaa;font-weight:500;font-family:'Inter',sans-serif;
}

/* ABOUT */
.pm-bio{font-size:1rem;line-height:1.8;color:#333;}

/* SKILLS */
#skills-grid.pm-col{display:flex;flex-wrap:wrap;gap:.4rem;}
.skill-badge{
  font-size:.82rem;color:#333;padding:3px 12px;
  border:1px solid #d8d8d8;border-radius:4px;
}

/* EXPERIENCE */
.experience-item{padding-bottom:1.75rem;margin-bottom:1.75rem;border-bottom:1px solid #f0f0f0;}
.experience-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.exp-header{display:flex;justify-content:space-between;flex-wrap:wrap;gap:.25rem;margin-bottom:.15rem;}
.exp-role{font-weight:600;font-size:.95rem;}
.exp-duration{font-size:.76rem;color:#999;}
.exp-company{font-size:.83rem;color:#666;margin-bottom:.35rem;}
.exp-desc{font-size:.88rem;color:#555;line-height:1.65;}

/* PROJECTS */
.project-card{padding-bottom:2rem;margin-bottom:2rem;border-bottom:1px solid #f0f0f0;}
.project-card:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0;}
.project-title{font-family:'Libre Baskerville',serif;font-size:1.2rem;font-weight:700;margin-bottom:.3rem;}
.project-desc{font-size:.88rem;color:#555;line-height:1.65;margin-bottom:.55rem;}
.project-tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:.55rem;}
.tag{font-size:.68rem;color:#666;border:1px solid #ddd;padding:2px 8px;border-radius:3px;}
.project-link{font-size:.82rem;color:#111;font-weight:600;border-bottom:1px solid #111;text-decoration:none;padding-bottom:1px;}
.project-link:hover{opacity:.6;}

/* EDUCATION */
.education-item{margin-bottom:1.4rem;}
.edu-degree{font-weight:600;font-size:.95rem;}
.edu-school{font-size:.83rem;color:#666;margin:.15rem 0;}
.edu-year{font-size:.76rem;color:#999;}

/* CERTS */
.cert-item{display:flex;align-items:flex-start;gap:.65rem;margin-bottom:1rem;}
.cert-icon{font-size:.9rem;margin-top:2px;flex-shrink:0;}
.cert-name{font-size:.88rem;font-weight:600;}
.cert-issuer{font-size:.76rem;color:#777;}

/* CONTACT */
.pm-contact{display:flex;flex-direction:column;gap:.7rem;}
.pm-contact-row{display:flex;align-items:baseline;gap:1.25rem;}
.pm-contact-key{font-size:.65rem;text-transform:uppercase;letter-spacing:.12em;color:#aaa;width:58px;flex-shrink:0;}
.pm-contact-row a,.pm-contact-row span{font-size:.88rem;color:#333;text-decoration:none;}
.pm-contact-row a:hover{text-decoration:underline;}

/* FOOTER */
.pm-footer{border-top:1px solid #eee;padding-top:2rem;margin-top:1rem;text-align:center;color:#bbb;}

/* DARK */
.theme-dark .tmpl-pm{background:#0a0a0a;color:#eee;}
.theme-dark .pm-rule,.theme-dark .experience-item,.theme-dark .project-card{border-color:#222;}
.theme-dark .pm-bio{color:#aaa;}
.theme-dark .pm-role,.theme-dark .exp-company,.theme-dark .edu-school,.theme-dark .project-desc,.theme-dark .exp-desc{color:#888;}
.theme-dark h1#hero-name,.theme-dark .exp-role,.theme-dark .edu-degree,.theme-dark .cert-name,.theme-dark .project-title{color:#eee;}
.theme-dark .skill-badge,.theme-dark .tag{border-color:#333;color:#ccc;}
.theme-dark .project-link,.theme-dark .social-icon{color:#eee;border-color:#666;}
.theme-dark .pm-contact-row a,.theme-dark .pm-contact-row span{color:#aaa;}
.theme-dark .pm-footer{border-color:#222;}
`
};
