/**
 * Template: Code Pro (Enhanced Professional Edition)
 * Style: Developer/terminal-inspired, dark theme, monospace fonts
 * Features: Full support for all portfolio builder fields including:
 * - Profile Image (drag & drop ready)
 * - Complete About section (Introduction + Career Summary)
 * - Skills with tags
 * - Projects with images, descriptions, and links
 * - Experience with achievements
 * - Education with degrees and years
 * - Certifications with issuer and year
 * - Social Links (GitHub, LinkedIn, Twitter, Instagram, Dribbble, Behance)
 * - Complete Contact info (email, phone, address/location)
 * 
 * Enhanced with: 
 * - Drag & drop image support for profile
 * - Project image preview
 * - Terminal-style ASCII animations
 * - Responsive design for all devices
 * - Improved visual hierarchy with code-inspired aesthetics
 */

window.renderCodePro = function(data) {
    // Data extraction with fallbacks
    const bi = data.basicInfo || {};
    const about = data.about || {};
    const skills = (data.skills || []).filter(s => s && s.name && s.name.trim());
    const projects = (data.projects || []).filter(p => p && p.title && p.title.trim());
    const experience = (data.experience || []).filter(e => e && (e.role || e.company));
    const edu = (data.education || []).filter(e => e && (e.degree || e.school));
    const certs = (data.certifications || []).filter(c => c && c.name && c.name.trim());
    const social = data.socialLinks || {};
    const contact = data.contact || {};

    // Escape helper for XSS prevention
    const e = window.portfolioRenderer?.escapeHtml || ((str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    });

    // Helper to get initials for avatar placeholder
    const getInitials = (name) => {
        if (!name) return 'dev';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // Helper to format social platform name
    const formatSocialLabel = (key) => {
        const labels = {
            github: 'GitHub', linkedin: 'LinkedIn', twitter: 'Twitter/X',
            instagram: 'Instagram', dribbble: 'Dribbble', behance: 'Behance'
        };
        return labels[key.toLowerCase()] || key;
    };

    // Check if sections have content
    const hasAbout = !!(about.introduction || about.careerSummary || bi.bio);
    const hasContact = !!(contact.email || bi.email || contact.phone || contact.address || bi.location);

    // CSS - Enhanced with better animations, responsiveness, and code aesthetics
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&display=swap');
            
            .tmpl-cp {
                --cp-bg: #0a0c10;
                --cp-surface: #0f1117;
                --cp-surface-light: #1a1d24;
                --cp-border: #2d313a;
                --cp-text: #e6edf3;
                --cp-text-muted: #8b949e;
                --cp-keyword: #ff7b72;
                --cp-function: #d2a8ff;
                --cp-string: #7ee787;
                --cp-number: #79c0ff;
                --cp-comment: #8b949e;
                --cp-operator: #ffa657;
                --cp-error: #f85149;
                --cp-success: #3fb950;
                --cp-gradient: linear-gradient(135deg, #ff7b72, #d2a8ff);
                
                font-family: 'Fira Code', 'Courier New', monospace;
                background: var(--cp-bg);
                color: var(--cp-text);
                min-height: 100vh;
                line-height: 1.6;
                margin: 0;
            }
            
            .tmpl-cp * {
                box-sizing: border-box;
            }
            
            .tmpl-cp a {
                color: var(--cp-number);
                text-decoration: none;
                transition: all 0.2s ease;
                border-bottom: 1px dashed transparent;
            }
            
            .tmpl-cp a:hover {
                color: var(--cp-string);
                border-bottom-color: var(--cp-string);
            }
            
            /* Typography */
            .tmpl-cp h1, .tmpl-cp h2, .tmpl-cp h3 {
                font-weight: 600;
                letter-spacing: -0.02em;
            }
            
            /* Terminal Header */
            .cp-hero {
                padding: 3rem 2rem 2rem;
                border-bottom: 1px solid var(--cp-border);
                background: var(--cp-surface);
            }
            
            .cp-terminal-header {
                max-width: 1000px;
                margin: 0 auto;
                background: var(--cp-surface-light);
                border: 1px solid var(--cp-border);
                border-radius: 12px 12px 0 0;
                padding: 0.75rem 1.25rem;
                display: flex;
                gap: 0.75rem;
                align-items: center;
            }
            
            .cp-dot {
                width: 14px;
                height: 14px;
                border-radius: 50%;
                transition: all 0.2s;
            }
            
            .cp-dot.red { background: #ff5f56; }
            .cp-dot.yellow { background: #ffbd2e; }
            .cp-dot.green { background: #27c93f; }
            
            .cp-terminal-body {
                max-width: 1000px;
                margin: 0 auto;
                background: var(--cp-bg);
                border: 1px solid var(--cp-border);
                border-top: none;
                border-radius: 0 0 12px 12px;
                padding: 2rem 2rem 2.5rem;
            }
            
            /* Terminal Lines */
            .cp-line {
                display: flex;
                gap: 1rem;
                margin-bottom: 0.5rem;
                flex-wrap: wrap;
                align-items: baseline;
            }
            
            .cp-prompt {
                color: var(--cp-success);
                font-weight: 500;
                user-select: none;
            }
            
            .cp-prompt::before {
                content: '$';
                margin-right: 0.5rem;
                color: var(--cp-success);
            }
            
            .cp-cmd {
                color: var(--cp-string);
                font-weight: 500;
            }
            
            .cp-output {
                color: var(--cp-text-muted);
                margin-left: 2rem;
                margin-bottom: 1.5rem;
                padding-left: 0.5rem;
                border-left: 2px solid var(--cp-border);
                font-size: 0.9rem;
                line-height: 1.7;
            }
            
            /* Avatar styling with drag & drop support */
            .cp-avatar-container {
                margin-bottom: 1.5rem;
                display: inline-block;
                cursor: pointer;
                position: relative;
            }
            
            .cp-avatar {
                width: 100px;
                height: 100px;
                border-radius: 12px;
                border: 2px solid var(--cp-border);
                object-fit: cover;
                transition: all 0.3s ease;
                background: var(--cp-surface-light);
            }
            
            .cp-avatar:hover {
                border-color: var(--cp-operator);
                transform: scale(1.02);
                box-shadow: 0 0 20px rgba(121, 192, 255, 0.2);
            }
            
            .cp-avatar-placeholder {
                width: 100px;
                height: 100px;
                border-radius: 12px;
                background: var(--cp-gradient);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: 700;
                color: var(--cp-bg);
                border: 2px solid var(--cp-border);
            }
            
            /* Main Content */
            .cp-main {
                max-width: 1000px;
                margin: 0 auto;
                padding: 3rem 2rem;
                display: flex;
                flex-direction: column;
                gap: 3rem;
            }
            
            /* Section Titles - Code Style */
            .cp-section-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--cp-function);
                margin: 0 0 1.25rem 0;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid var(--cp-border);
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                font-family: monospace;
            }
            
            .cp-section-title::before {
                content: '▸';
                color: var(--cp-keyword);
                font-size: 1.1rem;
            }
            
            .cp-section-title::after {
                content: '()';
                color: var(--cp-text-muted);
                font-size: 0.9rem;
            }
            
            /* About Section - Code Comments */
            .cp-about-block {
                background: var(--cp-surface);
                border-radius: 12px;
                padding: 1.5rem;
                border-left: 3px solid var(--cp-string);
                margin-left: 1rem;
            }
            
            .cp-comment-block {
                color: var(--cp-comment);
                font-family: monospace;
                line-height: 1.8;
            }
            
            .cp-comment-block strong {
                color: var(--cp-function);
                font-weight: 500;
            }
            
            /* Skills - Array Style */
            .cp-skills-container {
                margin-left: 1.5rem;
            }
            
            .cp-skills-bracket {
                color: var(--cp-text-muted);
                font-family: monospace;
            }
            
            .cp-skills {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
                margin: 0.75rem 0;
                padding-left: 1rem;
            }
            
            .cp-skill {
                background: var(--cp-surface);
                border: 1px solid var(--cp-border);
                border-radius: 20px;
                padding: 0.4rem 1rem;
                font-size: 0.85rem;
                color: var(--cp-string);
                font-family: monospace;
                transition: all 0.2s;
            }
            
            .cp-skill:hover {
                border-color: var(--cp-operator);
                transform: translateY(-2px);
            }
            
            .cp-skill::before {
                content: '"';
                color: var(--cp-keyword);
            }
            
            .cp-skill::after {
                content: '"';
                color: var(--cp-keyword);
            }
            
            /* Projects Grid */
            .cp-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1.5rem;
                margin-left: 1rem;
            }
            
            .cp-card {
                background: var(--cp-surface);
                border: 1px solid var(--cp-border);
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .cp-card:hover {
                border-color: var(--cp-operator);
                transform: translateY(-4px);
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
            }
            
            .cp-card-image {
                width: 100%;
                height: 160px;
                overflow: hidden;
                background: var(--cp-surface-light);
            }
            
            .cp-card-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }
            
            .cp-card:hover .cp-card-image img {
                transform: scale(1.05);
            }
            
            .cp-card-image-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                background: var(--cp-surface-light);
                color: var(--cp-text-muted);
            }
            
            .cp-card-content {
                padding: 1.25rem;
            }
            
            .cp-card-title {
                font-size: 1rem;
                font-weight: 600;
                color: var(--cp-function);
                margin: 0 0 0.5rem;
                font-family: monospace;
            }
            
            .cp-card-title::before {
                content: '📦 ';
                color: var(--cp-text-muted);
            }
            
            .cp-card-desc {
                font-size: 0.85rem;
                color: var(--cp-comment);
                margin: 0 0 1rem;
                line-height: 1.5;
            }
            
            .cp-link {
                font-size: 0.8rem;
                display: inline-flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .cp-link::after {
                content: ' →';
                transition: transform 0.2s;
            }
            
            .cp-link:hover::after {
                transform: translateX(3px);
            }
            
            /* Timeline/Log Style for Experience, Education, Certifications */
            .cp-log {
                margin-left: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
                border-left: 2px solid var(--cp-border);
                padding-left: 1.75rem;
                position: relative;
            }
            
            .cp-log-item {
                position: relative;
            }
            
            .cp-log-item::before {
                content: '>';
                position: absolute;
                left: -2.25rem;
                top: 0;
                color: var(--cp-operator);
                font-weight: 700;
                background: var(--cp-bg);
                padding-right: 0.5rem;
            }
            
            .cp-log-title {
                font-size: 1rem;
                font-weight: 600;
                color: var(--cp-string);
                margin: 0 0 0.25rem;
                font-family: monospace;
            }
            
            .cp-log-meta {
                font-size: 0.8rem;
                color: var(--cp-number);
                margin: 0 0 0.5rem;
                font-family: monospace;
            }
            
            .cp-log-desc {
                font-size: 0.85rem;
                color: var(--cp-text-muted);
                margin: 0;
                line-height: 1.6;
                white-space: pre-line;
            }
            
            /* Contact Section */
            .cp-contact-list {
                margin-left: 1.5rem;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                background: var(--cp-surface);
                padding: 1.25rem;
                border-radius: 12px;
                border: 1px solid var(--cp-border);
            }
            
            .cp-contact-item {
                font-family: monospace;
                font-size: 0.85rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
            }
            
            .cp-contact-keyword {
                color: var(--cp-keyword);
            }
            
            .cp-contact-value {
                color: var(--cp-string);
                word-break: break-all;
            }
            
            /* Closing Bracket */
            .cp-end-bracket {
                color: var(--cp-text-muted);
                font-size: 1rem;
                margin-top: -0.5rem;
                margin-bottom: 0.5rem;
                font-family: monospace;
            }
            
            .cp-end-bracket::before {
                content: '}';
                color: var(--cp-text-muted);
            }
            
            /* Footer */
            .cp-footer {
                text-align: center;
                padding: 2rem;
                border-top: 1px solid var(--cp-border);
                font-size: 0.8rem;
                color: var(--cp-comment);
                font-family: monospace;
                background: var(--cp-surface);
            }
            
            /* Typing animation */
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
            
            .cp-cursor {
                display: inline-block;
                width: 10px;
                height: 1.2em;
                background: var(--cp-string);
                vertical-align: middle;
                margin-left: 2px;
                animation: blink 1s infinite;
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .cp-terminal-body, .cp-main {
                    padding: 1.5rem;
                }
                .cp-hero {
                    padding: 2rem 1rem;
                }
                .cp-grid {
                    grid-template-columns: 1fr;
                }
                .cp-output {
                    margin-left: 1rem;
                }
                .cp-log {
                    margin-left: 0.75rem;
                    padding-left: 1rem;
                }
            }
            
            /* Scrollbar styling */
            .tmpl-cp::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            .tmpl-cp::-webkit-scrollbar-track {
                background: var(--cp-surface);
            }
            
            .tmpl-cp::-webkit-scrollbar-thumb {
                background: var(--cp-border);
                border-radius: 4px;
            }
            
            .tmpl-cp::-webkit-scrollbar-thumb:hover {
                background: var(--cp-operator);
            }
        </style>
    `;

    // Build HTML
    const html = `
        <div class="tmpl-cp">
            <header class="cp-hero" data-portify-section="header">
                <div class="cp-terminal-header">
                    <div class="cp-dot red"></div>
                    <div class="cp-dot yellow"></div>
                    <div class="cp-dot green"></div>
                    <span style="margin-left: 0.5rem; font-size: 0.75rem; color: var(--cp-text-muted);">developer@portfolio:~/about</span>
                </div>
                <div class="cp-terminal-body">
                    <!-- Profile Image with drag & drop support -->
                    <div class="cp-avatar-container" id="cp-avatar-dropzone" title="Click or drag image to change profile photo">
                        ${bi.profileImage && bi.profileImage.trim() ?
                            `<img src="${e(bi.profileImage)}" class="cp-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                            `<div class="cp-avatar-placeholder">${getInitials(bi.name)}</div>`
                        }
                    </div>
                    
                    <!-- whoami command -->
                    <div class="cp-line">
                        <span class="cp-prompt"></span>
                        <span class="cp-cmd">whoami</span>
                    </div>
                    <div class="cp-output">
                        <span style="color: var(--cp-keyword);">const</span> developer = {<br>
                        &nbsp;&nbsp;name: <span style="color: var(--cp-string);">"${e(bi.name || 'Anonymous Developer')}"</span>,<br>
                        ${bi.title ? `&nbsp;&nbsp;title: <span style="color: var(--cp-string);">"${e(bi.title)}"</span>,<br>` : ''}
                        ${bi.tagline ? `&nbsp;&nbsp;tagline: <span style="color: var(--cp-string);">"${e(bi.tagline)}"</span>,<br>` : ''}
                        ${bi.location ? `&nbsp;&nbsp;location: <span style="color: var(--cp-string);">"${e(bi.location)}"</span><br>` : ''}
                        };
                    </div>

                    <!-- Social Links as JSON -->
                    ${Object.entries(social).filter(([, v]) => v && v.trim()).length > 0 ? `
                        <div class="cp-line">
                            <span class="cp-prompt"></span>
                            <span class="cp-cmd">cat social.json</span>
                        </div>
                        <div class="cp-output">
                            {<br>
                            ${Object.entries(social).filter(([, v]) => v && v.trim()).map(([platform, url]) => 
                                `&nbsp;&nbsp;"${e(formatSocialLabel(platform))}": <a href="${e(url)}" target="_blank" rel="noopener noreferrer">"${e(url)}"</a>`
                            ).join(',<br>')}<br>
                            }
                        </div>
                    ` : ''}
                    
                    <!-- Contact Info Quick Display -->
                    ${hasContact ? `
                        <div class="cp-line">
                            <span class="cp-prompt"></span>
                            <span class="cp-cmd">cat contact</span>
                        </div>
                        <div class="cp-output">
                            ${(contact.email || bi.email) ? `📧 <a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a><br>` : ''}
                            ${contact.phone ? `📞 ${e(contact.phone)}<br>` : ''}
                            ${(contact.address || bi.location) ? `📍 ${e(contact.address || bi.location)}` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="cp-line">
                        <span class="cp-prompt"></span>
                        <span class="cp-cmd">ls -la</span>
                    </div>
                    <div class="cp-output">
                        drwxr-xr-x  portfolio   portfolio   ${new Date().getFullYear()}  ./<br>
                        drwxr-xr-x  portfolio   portfolio   ${new Date().getFullYear()}  ../<br>
                        <span class="cp-cursor"></span>
                    </div>
                </div>
            </header>

            <main class="cp-main">
                <!-- About Section -->
                ${hasAbout ? `
                    <section data-portify-section="about">
                        <h2 class="cp-section-title">about</h2>
                        <div class="cp-about-block">
                            <div class="cp-comment-block">
                                ${about.introduction ? `
                                    <strong>// Introduction</strong><br>
                                    ${e(about.introduction).split('\n').map(l => ` * ${l}`).join('<br>')}<br><br>
                                ` : ''}
                                ${about.careerSummary ? `
                                    <strong>// Career Summary</strong><br>
                                    ${e(about.careerSummary).split('\n').map(l => ` * ${l}`).join('<br>')}
                                ` : ''}
                                ${bi.bio && !about.introduction && !about.careerSummary ? `
                                    ${e(bi.bio).split('\n').map(l => ` * ${l}`).join('<br>')}
                                ` : ''}
                            </div>
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Skills Section -->
                ${skills.length > 0 ? `
                    <section data-portify-section="skills">
                        <h2 class="cp-section-title">skills</h2>
                        <div class="cp-skills-container">
                            <div class="cp-skills-bracket">const skills = [</div>
                            <div class="cp-skills">
                                ${skills.map(s => `<span class="cp-skill">${e(s.name)}</span>`).join('')}
                            </div>
                            <div class="cp-skills-bracket">];</div>
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Projects Section -->
                ${projects.length > 0 ? `
                    <section data-portify-section="projects">
                        <h2 class="cp-section-title">projects</h2>
                        <div class="cp-grid">
                            ${projects.map(p => `
                                <div class="cp-card">
                                    ${p.image ? `
                                        <div class="cp-card-image">
                                            <img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">
                                        </div>
                                    ` : `
                                        <div class="cp-card-image-placeholder">
                                            📁 ${e(p.title).charAt(0).toUpperCase()}
                                        </div>
                                    `}
                                    <div class="cp-card-content">
                                        <h3 class="cp-card-title">${e(p.title)}</h3>
                                        ${p.description ? `<p class="cp-card-desc">// ${e(p.description)}</p>` : ''}
                                        ${p.link ? `<a class="cp-link" href="${e(p.link)}" target="_blank" rel="noopener noreferrer">view repository</a>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Experience Section -->
                ${experience.length > 0 ? `
                    <section data-portify-section="experience">
                        <h2 class="cp-section-title">experience</h2>
                        <div class="cp-log">
                            ${experience.map(exp => `
                                <div class="cp-log-item">
                                    <h3 class="cp-log-title">${e(exp.role || 'Role')} @ ${e(exp.company || 'Company')}</h3>
                                    <div class="cp-log-meta">⏱️ ${e(exp.duration || 'Duration not specified')}</div>
                                    ${(exp.description || exp.keyAchievements) ? `<p class="cp-log-desc">${e(exp.description || exp.keyAchievements)}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Education Section -->
                ${edu.length > 0 ? `
                    <section data-portify-section="education">
                        <h2 class="cp-section-title">education</h2>
                        <div class="cp-log">
                            ${edu.map(ed => `
                                <div class="cp-log-item">
                                    <h3 class="cp-log-title">${e(ed.degree || 'Degree')}</h3>
                                    <div class="cp-log-meta">🏛️ ${e(ed.school || 'Institution')} ${ed.year ? `• ${e(ed.year)}` : ''}</div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Certifications Section -->
                ${certs.length > 0 ? `
                    <section data-portify-section="certifications">
                        <h2 class="cp-section-title">certifications</h2>
                        <div class="cp-log">
                            ${certs.map(c => `
                                <div class="cp-log-item">
                                    <h3 class="cp-log-title">${e(c.name)}</h3>
                                    <div class="cp-log-meta">🎓 ${e(c.issuer || 'Issuer')} ${c.year ? `• ${e(c.year)}` : ''}</div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}

                <!-- Contact Section (Detailed) -->
                ${hasContact ? `
                    <section data-portify-section="contact">
                        <h2 class="cp-section-title">contact</h2>
                        <div class="cp-contact-list">
                            ${(contact.email || bi.email) ? `
                                <div class="cp-contact-item">
                                    <span class="cp-contact-keyword">email</span>
                                    <span class="cp-contact-value">:</span>
                                    <a href="mailto:${e(contact.email || bi.email)}" class="cp-contact-value">${e(contact.email || bi.email)}</a>
                                </div>
                            ` : ''}
                            ${contact.phone ? `
                                <div class="cp-contact-item">
                                    <span class="cp-contact-keyword">phone</span>
                                    <span class="cp-contact-value">:</span>
                                    <span class="cp-contact-value">${e(contact.phone)}</span>
                                </div>
                            ` : ''}
                            ${(contact.address || bi.location) ? `
                                <div class="cp-contact-item">
                                    <span class="cp-contact-keyword">location</span>
                                    <span class="cp-contact-value">:</span>
                                    <span class="cp-contact-value">${e(contact.address || bi.location)}</span>
                                </div>
                            ` : ''}
                        </div>
                    </section>
                    <div class="cp-end-bracket"></div>
                ` : ''}
            </main>

            <footer class="cp-footer">
                <span style="color: var(--cp-success);">➜</span> portfolio compiled successfully<br>
                <span style="color: var(--cp-comment);">// &copy; ${new Date().getFullYear()} ${e(bi.name || 'Developer')} | Built with Portify</span>
            </footer>
        </div>
    `;

    // Enable drag & drop for profile image after rendering
    setTimeout(() => {
        const avatarZone = document.getElementById('cp-avatar-dropzone');
        if (avatarZone && typeof window.portfolioRenderer?.enableDragAndDrop === 'function') {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.cp-avatar, .cp-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'cp-avatar portify-profile-image';
                    newImg.alt = 'Profile';
                    avatarZone.innerHTML = '';
                    avatarZone.appendChild(newImg);
                    // Update data model if available
                    if (window.portfolioRenderer?.updateBasicInfo) {
                        window.portfolioRenderer.updateBasicInfo({ profileImage: imageDataUrl });
                    }
                }
            });
        }
        
        // Add click handler for manual upload if needed
        if (avatarZone && !avatarZone.hasClickHandler) {
            avatarZone.hasClickHandler = true;
            avatarZone.style.cursor = 'pointer';
            avatarZone.addEventListener('click', () => {
                if (window.portfolioRenderer?.triggerImageUpload) {
                    window.portfolioRenderer.triggerImageUpload((imageDataUrl) => {
                        const imgElement = avatarZone.querySelector('.cp-avatar, .cp-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'cp-avatar portify-profile-image';
                            newImg.alt = 'Profile';
                            avatarZone.innerHTML = '';
                            avatarZone.appendChild(newImg);
                        }
                    });
                }
            });
        }
    }, 50);

    return css + html;
};

// For standalone testing/demo
if (typeof window !== 'undefined' && !window.portfolioRenderer) {
    window.portfolioRenderer = {
        escapeHtml: (str) => {
            if (!str) return '';
            return String(str)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
    };
    
    // Demo data for testing
    window.demoCodeProData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1531427187439-70fd982e947a?w=150&h=150&fit=crop",
            name: "Sarah Chen",
            title: "Senior Full Stack Developer",
            tagline: "Building scalable solutions with elegant code",
            location: "San Francisco, CA",
            bio: "Passionate developer with 8+ years of experience in web technologies."
        },
        about: {
            introduction: "I'm a software engineer who loves creating meaningful digital experiences. My journey started with open source contributions and evolved into leading development teams.",
            careerSummary: "Led development at 2 startups, architected microservices handling 1M+ requests/day, mentored 10+ junior developers, and contributed to major open source projects."
        },
        skills: [
            { name: "React" }, { name: "TypeScript" }, { name: "Node.js" },
            { name: "Python" }, { name: "GraphQL" }, { name: "Docker" },
            { name: "AWS" }, { name: "TailwindCSS" }
        ],
        projects: [
            { title: "Portify Builder", description: "Dynamic portfolio builder with drag & drop", link: "https://github.com/portify", image: "" },
            { title: "DevMetrics", description: "Analytics dashboard for developer productivity", link: "https://github.com/devmetrics", image: "" },
            { title: "CloudNative Toolkit", description: "CLI tools for cloud deployment automation", link: "https://github.com/cloudnative", image: "" }
        ],
        experience: [
            { company: "TechFlow Solutions", role: "Lead Full Stack Developer", duration: "2022 – Present", description: "Architected and led development of microservices platform serving 500k+ users. Implemented CI/CD pipelines reducing deployment time by 70%." },
            { company: "Innovate Labs", role: "Software Engineer", duration: "2019 – 2022", description: "Built responsive web applications using React and Node.js. Collaborated with product team to deliver 15+ features on schedule." },
            { company: "Open Source Collective", role: "Contributor", duration: "2018 – 2019", description: "Contributed to React and Next.js documentation, fixed bugs, and added features to popular libraries." }
        ],
        education: [
            { school: "Stanford University", degree: "M.S. in Computer Science", year: "2017–2019" },
            { school: "UC Berkeley", degree: "B.S. in Electrical Engineering & Computer Science", year: "2013–2017" }
        ],
        certifications: [
            { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
            { name: "Kubernetes Administrator", issuer: "CNCF", year: "2022" },
            { name: "GraphQL Developer", issuer: "Apollo", year: "2021" }
        ],
        socialLinks: {
            github: "https://github.com/sarahchen",
            linkedin: "https://linkedin.com/in/sarahchen",
            twitter: "https://twitter.com/sarahchen",
            dribbble: "https://dribbble.com/sarahchen"
        },
        contact: {
            email: "sarah.chen@example.com",
            phone: "+1 (555) 123-4567",
            address: "San Francisco, CA"
        }
    };
    
    // Auto-render if root element exists
    if (document.getElementById('portify-root')) {
        const root = document.getElementById('portify-root');
        const demoHtml = window.renderCodePro(window.demoCodeProData);
        root.innerHTML = demoHtml;
    }
}
