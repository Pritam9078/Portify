/**
 * Portify Templates Registry - PRODUCTION GRADE
 * Embeds high-fidelity HTML and CSS for premium output.
 */

window.templatesRegistry = {
    modern: {
        html: `
<div class="portfolio-modern">
    <header class="modern-hero">
        <div class="badge">Available for projects</div>
        <h1 id="hero-name"></h1>
        <p class="hero-role" id="hero-title"></p>
        <p class="hero-tagline" id="hero-tagline"></p>
        <div id="hero-social" class="social-links"></div>
    </header>

    <section id="about-section" class="section">
        <h2 class="section-title">About Me</h2>
        <div class="glass-container"><p id="about-bio"></p></div>
    </section>

    <section id="projects-section" class="section">
        <h2 class="section-title">Featured Projects</h2>
        <div id="projects-grid" class="projects-grid"></div>
    </section>

    <div class="split-section">
        <section id="skills-section" class="section">
            <h2 class="section-title">Skills</h2>
            <div id="skills-grid" class="skills-grid"></div>
        </section>
        <section id="experience-section" class="section">
            <h2 class="section-title">Experience</h2>
            <div id="experience-list" class="experience-list"></div>
        </section>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
.portfolio-modern { --p-main: #8b5cf6; --p-sec: #ec4899; --p-bg: #030712; --p-surface: rgba(255, 255, 255, 0.03); --p-text: #f8fafc; --p-muted: #94a3b8; font-family: 'Plus Jakarta Sans', sans-serif; background: var(--p-bg); color: var(--p-text); padding: 4rem 2rem; min-height: 100vh; }
.modern-hero { text-align: center; padding: 6rem 0; }
#hero-name { font-size: 4rem; font-weight: 800; margin: 1rem 0; letter-spacing: -0.02em; }
.hero-role { font-size: 1.5rem; font-weight: 600; color: var(--p-main); }
.social-links { display: flex; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
.social-icon { font-size: 1.5rem; color: var(--p-muted); transition: color 0.3s; }
.social-icon:hover { color: var(--p-main); }
.section { margin-bottom: 8rem; max-width: 1000px; margin-inline: auto; }
.section-title { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.2em; color: var(--p-main); margin-bottom: 2rem; }
.glass-container { background: var(--p-surface); border: 1px solid rgba(255,255,255,0.08); padding: 2.5rem; border-radius: 24px; backdrop-filter: blur(12px); font-size: 1.25rem; line-height: 1.6; }
.projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
.project-card { background: var(--p-surface); border: 1px solid rgba(255,255,255,0.08); padding: 2rem; border-radius: 20px; transition: transform 0.3s; }
.project-card:hover { transform: translateY(-10px); }
.project-title { font-size: 1.5rem; margin-bottom: 1rem; }
.tag { font-size: 0.75rem; padding: 4px 12px; background: rgba(139, 92, 246, 0.1); color: var(--p-main); border-radius: 99px; margin-right: 0.5rem; }
.skills-grid { display: flex; flex-wrap: wrap; gap: 1rem; }
.skill-badge { padding: 0.75rem 1.5rem; background: var(--p-surface); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); }
.experience-item { margin-bottom: 2.5rem; padding-left: 1.5rem; border-left: 2px solid var(--p-main); }
.exp-role { font-size: 1.25rem; font-weight: 700; }
.exp-company { color: var(--p-main); margin: 0.25rem 0; }
.theme-light .portfolio-modern { --p-bg: #f8fafc; --p-text: #0f172a; --p-surface: #ffffff; --p-muted: #64748b; }
.theme-light .glass-container { border-color: #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.03); }
`
    },
    developer: {
        html: `
<div class="portfolio-developer">
    <div class="dev-container">
        <header class="dev-hero">
            <div class="code-line"><span class="c-blue">const</span> <span class="c-yellow">developer</span> = {</div>
            <div class="code-indent">
                <div class="code-line">name: <span class="c-green">"<span id="hero-name"></span>"</span>,</div>
                <div class="code-line">title: <span class="c-green">"<span id="hero-title"></span>"</span>,</div>
                <div class="code-line">social: [<span id="hero-social"></span>]</div>
            </div>
            <div class="code-line">};</div>
        </header>

        <section id="about-section" class="section">
            <div class="section-header">// 01_ABOUT.md</div>
            <p id="about-bio" class="bio-text"></p>
        </section>

        <section id="projects-section" class="section">
            <div class="section-header">// 02_PROJECTS.sh</div>
            <div id="projects-grid" class="projects-list"></div>
        </section>

        <section id="skills-section" class="section">
            <div class="section-header">// 03_STACK.yml</div>
            <div id="skills-grid" class="skills-wrap"></div>
        </section>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
.portfolio-developer { background: #0d1117; color: #c9d1d9; font-family: 'JetBrains Mono', monospace; padding: 4rem 2rem; min-height: 100vh; }
.dev-container { max-width: 850px; margin: 0 auto; }
.dev-hero { background: #161b22; padding: 3rem; border-radius: 12px; border: 1px solid #30363d; margin-bottom: 4rem; }
.code-line { line-height: 1.8; font-size: 1.1rem; }
.code-indent { padding-left: 2rem; }
.c-blue { color: #58a6ff; } .c-yellow { color: #d2a8ff; } .c-green { color: #7ee787; }
.section { margin-bottom: 5rem; }
.section-header { color: #8b949e; font-size: 0.9rem; margin-bottom: 1.5rem; font-weight: 700; border-bottom: 1px solid #30363d; padding-bottom: 0.5rem; }
.bio-text { line-height: 1.7; font-size: 1.05rem; color: #8b949e; }
.project-card { border: 1px solid #30363d; border-radius: 8px; padding: 2rem; margin-bottom: 1.5rem; background: #161b22; }
.project-title { color: #58a6ff; font-size: 1.25rem; margin-bottom: 0.75rem; }
.skill-badge { color: #7ee787; margin-right: 1.5rem; font-size: 1rem; }
.skill-badge::before { content: '- '; }
.social-icon { color: #58a6ff; text-decoration: none; margin: 0 0.5rem; }
.theme-light .portfolio-developer { background: #f6f8fa; color: #24292f; }
.theme-light .dev-hero { background: white; border-color: #d0d7de; }
.theme-light .section-header { border-color: #d0d7de; }
.theme-light .project-card { background: white; border-color: #d0d7de; }
`
    },
    minimal: {
        html: `
<div class="portfolio-minimal">
    <div class="min-container">
        <header class="min-header">
            <h1 id="hero-name"></h1>
            <p id="hero-title" class="min-subtitle"></p>
            <div id="hero-social" class="min-social"></div>
        </header>

        <section id="about-section" class="min-section">
            <p id="about-bio"></p>
        </section>

        <section id="projects-section" class="min-section">
            <h2 class="min-label">Selected Works</h2>
            <div id="projects-grid" class="min-projects"></div>
        </section>

        <section id="skills-section" class="min-section">
            <h2 class="min-label">Expertise</h2>
            <div id="skills-grid" class="min-skills"></div>
        </section>
        
        <footer class="min-footer">
            <p>&copy; <span id="footer-year"></span> — Built with Portify</p>
        </footer>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500&display=swap');
.portfolio-minimal { background: #fff; color: #111; font-family: 'Inter', sans-serif; min-height: 100vh; padding: 6rem 2rem; }
.min-container { max-width: 650px; margin: 0 auto; }
.min-header { margin-bottom: 6rem; }
#hero-name { font-family: 'Crimson Pro', serif; font-size: 3rem; font-weight: 600; margin-bottom: 0.5rem; }
.min-subtitle { font-size: 1.1rem; color: #666; font-style: italic; font-family: 'Crimson Pro', serif; }
.min-section { margin-bottom: 5rem; }
.min-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.15em; color: #999; margin-bottom: 2rem; }
#about-bio { font-size: 1.25rem; line-height: 1.6; color: #333; }
.project-card { margin-bottom: 4rem; }
.project-title { font-family: 'Crimson Pro', serif; font-size: 1.75rem; font-weight: 600; margin-bottom: 0.5rem; }
.project-desc { color: #666; line-height: 1.5; margin-bottom: 1rem; }
.project-link { text-decoration: none; color: #111; font-weight: 600; border-bottom: 1px solid #111; padding-bottom: 2px; }
.skill-badge { margin-right: 1.5rem; font-weight: 500; font-size: 0.95rem; }
.social-icon { color: #111; font-size: 1.25rem; margin-right: 1.25rem; transition: opacity 0.2s; }
.social-icon:hover { opacity: 0.6; }
.theme-dark .portfolio-minimal { background: #000; color: #fff; }
.theme-dark #about-bio { color: #ccc; }
.theme-dark .min-subtitle, .theme-dark .project-desc { color: #888; }
.theme-dark .project-link, .theme-dark .social-icon { color: #fff; border-color: #fff; }
`
    },
    creative: {
        html: `
<div class="portfolio-creative">
    <div class="c-sidebar">
        <div class="c-sticky">
            <h1 id="hero-name"></h1>
            <p id="hero-title"></p>
            <div id="hero-social" class="c-social"></div>
        </div>
    </div>
    <div class="c-content">
        <section class="c-section">
            <div class="c-num">01</div>
            <h2 class="c-title">Story</h2>
            <p id="about-bio" class="c-bio"></p>
        </section>
        <section class="c-section">
            <div class="c-num">02</div>
            <h2 class="c-title">Gallery</h2>
            <div id="projects-grid" class="c-grid"></div>
        </section>
        <section class="c-section">
            <div class="c-num">03</div>
            <h2 class="c-title">Focus</h2>
            <div id="skills-grid" class="c-skills"></div>
        </section>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
.portfolio-creative { background: #111; color: #fff; display: flex; font-family: 'Space Grotesk', sans-serif; min-height: 100vh; }
.c-sidebar { width: 35%; padding: 4rem; border-right: 1px solid rgba(255,255,255,0.05); }
.c-sticky { position: sticky; top: 4rem; }
.c-content { width: 65%; padding: 4rem 6rem; }
#hero-name { font-size: 5rem; font-weight: 800; line-height: 0.9; margin-bottom: 2rem; color: #f0f; }
#hero-title { font-size: 1.5rem; letter-spacing: 2px; text-transform: uppercase; }
.c-section { margin-bottom: 10rem; }
.c-num { font-size: 8rem; font-weight: 800; color: rgba(255,255,255,0.03); position: absolute; top: -4rem; left: -2rem; z-index: 0; }
.c-title { font-size: 2.5rem; margin-bottom: 3rem; color: #0ff; position: relative; z-index: 1; }
.c-bio { font-size: 1.75rem; font-weight: 300; line-height: 1.4; color: #eee; }
.project-card { border-bottom: 1px solid rgba(255,255,255,0.1); padding: 4rem 0; }
.project-title { font-size: 3rem; margin-bottom: 1rem; }
.skill-badge { font-size: 1.5rem; margin-right: 2rem; color: #f0f; }
.theme-light .portfolio-creative { background: #f0f0f0; color: #111; }
.theme-light #hero-name { color: #d0d; }
.theme-light .c-title { color: #088; }
.theme-light .c-bio { color: #333; }
.theme-light .c-num { color: rgba(0,0,0,0.03); }
`
    },
    corporate: {
        html: `
<div class="portfolio-corporate">
    <div class="corp-inner">
        <header class="corp-header">
            <h1 id="hero-name"></h1>
            <p id="hero-title"></p>
            <div id="hero-social" class="corp-contact-bar"></div>
        </header>

        <main class="corp-main">
            <div class="corp-left">
                <section class="corp-section">
                    <h2 class="corp-label">Professional Summary</h2>
                    <p id="about-bio"></p>
                </section>
                <section class="corp-section">
                    <h2 class="corp-label">Experience</h2>
                    <div id="experience-list"></div>
                </section>
            </div>
            <div class="corp-right">
                <section class="corp-section">
                    <h2 class="corp-label">Education</h2>
                    <div id="education-list"></div>
                </section>
                <section class="corp-section">
                    <h2 class="corp-label">Core Competencies</h2>
                    <div id="skills-grid" class="corp-skills"></div>
                </section>
                <section class="corp-section">
                    <h2 class="corp-label">Key Projects</h2>
                    <div id="projects-grid"></div>
                </section>
            </div>
        </main>
    </div>
</div>`,
        css: `
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
.portfolio-corporate { background: #f3f4f6; color: #1f2937; font-family: 'Roboto', sans-serif; padding: 4rem; min-height: 100vh; }
.corp-inner { max-width: 1000px; margin: 0 auto; background: #fff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); padding: 5rem; border-radius: 4px; }
.corp-header { border-bottom: 2px solid #1f2937; padding-bottom: 3rem; margin-bottom: 3rem; }
#hero-name { font-size: 2.5rem; font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; }
#hero-title { font-size: 1.25rem; color: #4b5563; font-weight: 500; }
.corp-main { display: grid; grid-template-columns: 1.5fr 1fr; gap: 4rem; }
.corp-label { font-size: 0.9rem; text-transform: uppercase; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 0.5rem; margin-bottom: 1.5rem; }
.experience-item, .education-item { margin-bottom: 2rem; }
.exp-role, .edu-degree { font-weight: 700; font-size: 1.1rem; }
.exp-company, .edu-school { color: #4b5563; margin: 0.2rem 0; font-weight: 500; }
.skill-badge { display: block; margin-bottom: 0.5rem; font-weight: 500; }
.theme-dark .portfolio-corporate { background: #111827; }
.theme-dark .corp-inner { background: #1f2937; color: #f9fafb; border: 1px solid #374151; }
.theme-dark .corp-label { border-color: #374151; }
.theme-dark #hero-title, .theme-dark .exp-company, .theme-dark .edu-school { color: #9ca3af; }
`
    }
};
