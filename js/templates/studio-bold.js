/**
 * Template: Executive Elite (Studio Bold) - Enhanced Professional Edition
 * Style: High contrast, large bold typography, minimal but impactful, executive-level presence
 * Features: Full support for all portfolio builder fields including:
 * - Profile Image (drag & drop ready with bold hover effects)
 * - Full Name, Professional Title, Tagline, Location
 * - About Me (Introduction + Career Summary with executive summary style)
 * - Skills (multiple with bold card-style presentation)
 * - Projects (title, description, link, optional image with editorial layout)
 * - Experience (company, role, duration, key achievements with impact statements)
 * - Education (school, degree, year)
 * - Certifications (name, issuer, year with badge styling)
 * - Social Links (GitHub, LinkedIn, Twitter, Instagram, Dribbble, Behance)
 * - Contact (email, phone, address with professional presentation)
 * 
 * Enhanced with:
 * - Playfair Display serif font for bold headings
 * - Golden amber accent color for executive branding
 * - Grayscale filter on avatar with hover color reveal
 * - Impactful section titles with underline highlights
 * - Sticky project metadata for editorial feel
 * - Bold typography hierarchy
 * - Professional spacing and rhythm
 * - Drag & drop image upload for profile
 * - Project image support with editorial layout
 * - Responsive design for all devices
 */

window.renderExecutiveElite = function(data) {
    // Data sanitization & fallbacks
    const bi = data.basicInfo || {};
    const about = data.about || {};
    const skills = (data.skills || []).filter(s => s && s.name && s.name.trim() !== "");
    const projects = (data.projects || []).filter(p => p && p.title && p.title.trim() !== "");
    const experience = (data.experience || []).filter(e => e && (e.role || e.company));
    const edu = (data.education || []).filter(e => e && (e.degree || e.school));
    const certs = (data.certifications || []).filter(c => c && c.name && c.name.trim() !== "");
    const social = data.socialLinks || {};
    const contact = data.contact || {};

    // Escape helper to prevent XSS
    const e = window.portfolioRenderer?.escapeHtml || ((str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    });

    // Helper: get initials for avatar placeholder
    const getInitials = (name) => {
        if (!name) return '●';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // Check if sections have content
    const hasAboutSection = !!(about.introduction || about.careerSummary || bi.bio);
    const hasContactInfo = !!(contact.email || bi.email || contact.phone || contact.address || bi.location);
    
    // Helper to format social platform display name (uppercase for bold look)
    const formatSocialLabel = (key) => {
        const labels = { 
            github: 'GITHUB', 
            linkedin: 'LINKEDIN', 
            twitter: 'TWITTER', 
            instagram: 'INSTAGRAM', 
            dribbble: 'DRIBBBLE', 
            behance: 'BEHANCE' 
        };
        return labels[key.toLowerCase()] || key.toUpperCase();
    };

    // CSS - Bold, high contrast, executive style
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&family=Work+Sans:wght@300;400;500;600;700;800&display=swap');
            
            .tmpl-ee {
                --ee-bg: #fafaf9;
                --ee-text: #1c1917;
                --ee-text-light: #44403c;
                --ee-muted: #78716c;
                --ee-accent: #f59e0b;
                --ee-accent-dark: #d97706;
                --ee-accent-glow: rgba(245, 158, 11, 0.15);
                --ee-border: #e7e5e4;
                --ee-surface: #ffffff;
                --ee-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
                --ee-shadow-lg: 0 10px 30px -12px rgba(0, 0, 0, 0.1);
                
                font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--ee-bg);
                color: var(--ee-text);
                min-height: 100vh;
                margin: 0;
                line-height: 1.5;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            .tmpl-ee * { 
                box-sizing: border-box; 
            }
            
            .tmpl-ee a { 
                color: var(--ee-text); 
                text-decoration: none; 
                border-bottom: 2px solid var(--ee-accent);
                transition: all 0.2s ease;
                font-weight: 500;
            }
            
            .tmpl-ee a:hover { 
                background: var(--ee-accent); 
                color: white; 
                border-bottom-color: transparent;
                padding: 0 0.1rem;
            }

            /* Typography */
            .ee-heading-font { 
                font-family: 'Playfair Display', Georgia, serif; 
                font-weight: 800; 
                letter-spacing: -0.02em; 
            }
            
            /* Layout */
            .ee-container { 
                max-width: 1200px; 
                margin: 0 auto; 
                padding: 4rem 3rem; 
            }
            
            @media (max-width: 768px) {
                .ee-container { 
                    padding: 2rem 1.5rem; 
                }
            }
            
            /* Hero Section - Bold Executive Presence */
            .ee-hero { 
                margin-bottom: 6rem; 
                position: relative; 
                border-bottom: 2px solid var(--ee-border);
                padding-bottom: 3rem;
            }
            
            /* Avatar with drag & drop support - Bold hover effect */
            .ee-avatar-container {
                margin-bottom: 2rem;
                display: inline-block;
                cursor: pointer;
                position: relative;
            }
            
            .ee-avatar {
                width: 120px;
                height: 120px;
                object-fit: cover;
                filter: grayscale(100%);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: var(--ee-shadow);
            }
            
            .ee-avatar:hover {
                filter: grayscale(0%);
                box-shadow: 12px 12px 0 var(--ee-accent);
                transform: translate(-6px, -6px);
            }
            
            .ee-avatar-placeholder {
                width: 120px;
                height: 120px;
                background: linear-gradient(135deg, var(--ee-accent), var(--ee-accent-dark));
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: 800;
                color: white;
                font-family: 'Playfair Display', serif;
                transition: all 0.3s ease;
            }
            
            .ee-avatar-placeholder:hover {
                transform: translate(-4px, -4px);
                box-shadow: 8px 8px 0 var(--ee-accent-dark);
            }
            
            .ee-name { 
                font-size: clamp(3rem, 8vw, 5.5rem); 
                line-height: 1.05; 
                margin: 0 0 1rem; 
                text-transform: uppercase;
                letter-spacing: -0.03em;
                color: var(--ee-text);
            }
            
            .ee-location {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--ee-muted);
                font-size: 0.9rem;
                font-weight: 500;
                margin-bottom: 1rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .ee-role { 
                font-size: 1.25rem; 
                color: var(--ee-accent); 
                font-weight: 600; 
                margin: 0 0 1rem; 
                text-transform: uppercase; 
                letter-spacing: 3px;
            }
            
            .ee-tagline { 
                font-size: 1.2rem; 
                color: var(--ee-text-light); 
                max-width: 700px; 
                line-height: 1.6; 
                border-left: 4px solid var(--ee-accent); 
                padding-left: 1.5rem; 
                margin-top: 1.5rem;
                font-weight: 400;
            }

            /* Social Links - Bold Uppercase */
            .ee-social { 
                display: flex; 
                gap: 1.5rem; 
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            
            .ee-social a { 
                border: none; 
                font-weight: 700; 
                font-size: 0.8rem; 
                text-transform: uppercase; 
                letter-spacing: 1.5px;
                padding: 0.5rem 0;
                border-bottom: 2px solid transparent;
            }
            
            .ee-social a:hover { 
                background: none; 
                color: var(--ee-accent);
                border-bottom-color: var(--ee-accent);
                padding: 0.5rem 0;
            }

            /* Sections - Bold Spacing */
            .ee-section { 
                margin-bottom: 6rem; 
            }
            
            .ee-section-title { 
                font-size: 2.5rem; 
                margin: 0 0 3rem; 
                position: relative; 
                display: inline-block;
                text-transform: uppercase;
                letter-spacing: -0.01em;
            }
            
            .ee-section-title::after { 
                content: ''; 
                position: absolute; 
                bottom: 8px; 
                left: 0; 
                width: 100%; 
                height: 16px; 
                background: var(--ee-accent); 
                opacity: 0.25; 
                z-index: -1;
            }
            
            @media (max-width: 768px) {
                .ee-section-title { 
                    font-size: 2rem; 
                }
                .ee-section-title::after {
                    height: 12px;
                    bottom: 4px;
                }
            }

            /* About Section - Executive Summary */
            .ee-bio { 
                font-size: 1.2rem; 
                line-height: 1.8; 
                color: var(--ee-text-light); 
                max-width: 850px; 
            }
            
            .ee-bio p { 
                margin-bottom: 1.5rem; 
            }
            
            .ee-bio strong {
                color: var(--ee-text);
                font-weight: 700;
            }

            /* Projects - Editorial Layout with Sticky Meta */
            .ee-projects { 
                display: flex; 
                flex-direction: column; 
                gap: 4rem; 
            }
            
            .ee-project { 
                display: grid; 
                grid-template-columns: 1fr 2fr; 
                gap: 3rem; 
                align-items: start; 
                border-top: 1px solid var(--ee-border); 
                padding-top: 3rem;
            }
            
            @media (max-width: 768px) { 
                .ee-project { 
                    grid-template-columns: 1fr; 
                    gap: 1.5rem;
                    padding-top: 2rem;
                } 
            }
            
            .ee-project-meta { 
                position: sticky; 
                top: 2rem;
            }
            
            .ee-project-image {
                width: 100%;
                margin-bottom: 1.5rem;
                overflow: hidden;
                background: var(--ee-border);
            }
            
            .ee-project-image img {
                width: 100%;
                height: auto;
                display: block;
                transition: transform 0.5s ease;
            }
            
            .ee-project-image:hover img {
                transform: scale(1.02);
            }
            
            .ee-project-image-placeholder {
                width: 100%;
                aspect-ratio: 16/9;
                background: linear-gradient(135deg, var(--ee-border), #f5f5f4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--ee-muted);
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .ee-project-title { 
                font-size: 1.75rem; 
                margin: 0 0 1rem; 
                line-height: 1.3;
            }
            
            .ee-project-link { 
                border: none; 
                color: var(--ee-accent); 
                font-weight: 700; 
                text-transform: uppercase; 
                letter-spacing: 1.5px; 
                font-size: 0.75rem;
                display: inline-block;
                margin-top: 0.5rem;
            }
            
            .ee-project-link:hover { 
                color: var(--ee-accent-dark); 
                background: none;
                border-bottom: 2px solid var(--ee-accent);
            }
            
            .ee-project-desc { 
                font-size: 1rem; 
                line-height: 1.7; 
                color: var(--ee-muted); 
                margin: 0;
            }

            /* Experience & Education - Executive Timeline */
            .ee-list { 
                display: flex; 
                flex-direction: column; 
                gap: 0; 
            }
            
            .ee-item { 
                display: grid; 
                grid-template-columns: 1fr 3fr; 
                gap: 2rem; 
                padding: 2rem 0; 
                border-bottom: 1px solid var(--ee-border);
                transition: background 0.2s ease;
            }
            
            .ee-item:hover {
                background: rgba(245, 158, 11, 0.02);
            }
            
            @media (max-width: 768px) { 
                .ee-item { 
                    grid-template-columns: 1fr; 
                    gap: 0.5rem; 
                    padding: 1.5rem 0; 
                } 
            }
            
            .ee-item:first-child { 
                border-top: 1px solid var(--ee-border); 
            }
            
            .ee-item-meta { 
                font-weight: 700; 
                color: var(--ee-accent); 
                text-transform: uppercase; 
                letter-spacing: 1.5px; 
                font-size: 0.8rem;
            }
            
            .ee-item-title { 
                font-size: 1.35rem; 
                margin: 0 0 0.5rem; 
                line-height: 1.4;
            }
            
            .ee-item-subtitle { 
                font-size: 1rem; 
                color: var(--ee-muted); 
                margin: 0 0 1rem; 
                font-weight: 500;
            }
            
            .ee-item-desc { 
                font-size: 0.95rem; 
                line-height: 1.7; 
                color: var(--ee-text-light); 
                margin: 0;
                white-space: pre-line;
            }

            /* Skills & Certifications - Bold Grid */
            .ee-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); 
                gap: 1.5rem; 
            }
            
            .ee-grid-item { 
                border: 1px solid var(--ee-border); 
                padding: 1.5rem; 
                background: var(--ee-surface);
                transition: all 0.3s ease;
                text-align: center;
            }
            
            .ee-grid-item:hover { 
                border-color: var(--ee-accent); 
                transform: translateY(-4px);
                box-shadow: var(--ee-shadow-lg);
            }
            
            .ee-skill-name { 
                font-size: 1rem; 
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .ee-cert-details {
                font-size: 0.8rem;
                color: var(--ee-muted);
                margin-top: 0.5rem;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .ee-grid-item.text-left {
                text-align: left;
            }

            /* Contact Section - Professional Grid */
            .ee-contact-grid { 
                display: grid; 
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); 
                gap: 2rem; 
                background: var(--ee-surface); 
                padding: 2.5rem; 
                border: 1px solid var(--ee-border);
                box-shadow: var(--ee-shadow);
            }
            
            @media (max-width: 768px) {
                .ee-contact-grid {
                    padding: 1.5rem;
                    gap: 1.5rem;
                }
            }
            
            .ee-contact-block { 
                display: flex; 
                flex-direction: column; 
                gap: 0.5rem; 
            }
            
            .ee-contact-label { 
                font-size: 0.7rem; 
                text-transform: uppercase; 
                letter-spacing: 2px; 
                color: var(--ee-accent); 
                font-weight: 700;
            }
            
            .ee-contact-val { 
                font-size: 1.1rem; 
                font-weight: 500; 
                color: var(--ee-text);
                word-break: break-word;
            }
            
            .ee-contact-val a { 
                border: none;
                color: var(--ee-text);
            }
            
            .ee-contact-val a:hover { 
                background: none; 
                color: var(--ee-accent);
                border-bottom: 2px solid var(--ee-accent);
            }

            /* Footer */
            .ee-footer { 
                text-align: center; 
                padding: 4rem 0 2rem; 
                font-size: 0.75rem; 
                color: var(--ee-muted); 
                text-transform: uppercase; 
                letter-spacing: 2px;
                border-top: 1px solid var(--ee-border);
                margin-top: 2rem;
            }
            
            /* Scrollbar */
            .tmpl-ee::-webkit-scrollbar {
                width: 8px;
            }
            
            .tmpl-ee::-webkit-scrollbar-track {
                background: var(--ee-border);
            }
            
            .tmpl-ee::-webkit-scrollbar-thumb {
                background: var(--ee-accent);
                border-radius: 4px;
            }
            
            /* Animations */
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .ee-section {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            .ee-section:nth-child(1) { animation-delay: 0.05s; }
            .ee-section:nth-child(2) { animation-delay: 0.1s; }
            .ee-section:nth-child(3) { animation-delay: 0.15s; }
            .ee-section:nth-child(4) { animation-delay: 0.2s; }
            .ee-section:nth-child(5) { animation-delay: 0.25s; }
            .ee-section:nth-child(6) { animation-delay: 0.3s; }
        </style>
    `;

    // Build HTML dynamically
    const html = `
        <div class="tmpl-ee">
            <div class="ee-container">
                <header class="ee-hero" data-portify-section="header">
                    <!-- Profile Image with drag & drop support -->
                    <div class="ee-avatar-container" id="ee-avatar-dropzone" title="Click or drag image to change profile photo">
                        ${bi.profileImage && bi.profileImage.trim() !== "" ?
                            `<img src="${e(bi.profileImage)}" class="ee-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                            `<div class="ee-avatar-placeholder">${getInitials(bi.name)}</div>`
                        }
                    </div>
                    
                    <h1 class="ee-name ee-heading-font">${e(bi.name || 'EXECUTIVE')}</h1>
                    ${bi.title ? `<div class="ee-role">${e(bi.title)}</div>` : ''}
                    ${bi.location ? `<div class="ee-location">📍 ${e(bi.location)}</div>` : ''}
                    ${bi.tagline ? `<div class="ee-tagline">${e(bi.tagline)}</div>` : ''}
                    
                    ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").length > 0 ? `
                        <div class="ee-social">
                            ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").map(([platform, url]) => 
                                `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${formatSocialLabel(platform)}</a>`
                            ).join('')}
                        </div>
                    ` : ''}
                </header>

                <main>
                    <!-- About Section - Executive Profile -->
                    ${hasAboutSection ? `
                        <section class="ee-section" data-portify-section="about">
                            <h2 class="ee-section-title ee-heading-font">Profile</h2>
                            <div class="ee-bio">
                                ${about.introduction ? `<p><strong>Introduction</strong><br>${e(about.introduction).replace(/\n/g, '<br>')}</p>` : ''}
                                ${about.careerSummary ? `<p><strong>Executive Summary</strong><br>${e(about.careerSummary).replace(/\n/g, '<br>')}</p>` : ''}
                                ${bi.bio && !about.introduction && !about.careerSummary ? `<p>${e(bi.bio).replace(/\n/g, '<br>')}</p>` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Projects Section - Featured Works -->
                    ${projects.length > 0 ? `
                        <section class="ee-section" data-portify-section="projects">
                            <h2 class="ee-section-title ee-heading-font">Selected Works</h2>
                            <div class="ee-projects">
                                ${projects.map(p => `
                                    <div class="ee-project">
                                        <div class="ee-project-meta">
                                            ${p.image ? `
                                                <div class="ee-project-image">
                                                    <img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">
                                                </div>
                                            ` : ''}
                                            <h3 class="ee-project-title ee-heading-font">${e(p.title)}</h3>
                                            ${p.link ? `<a class="ee-project-link" href="${e(p.link)}" target="_blank" rel="noopener noreferrer">VIEW PROJECT →</a>` : ''}
                                        </div>
                                        <div class="ee-project-desc">
                                            ${p.description ? e(p.description).replace(/\n/g, '<br>') : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Experience Section - Career Timeline -->
                    ${experience.length > 0 ? `
                        <section class="ee-section" data-portify-section="experience">
                            <h2 class="ee-section-title ee-heading-font">Experience</h2>
                            <div class="ee-list">
                                ${experience.map(exp => `
                                    <div class="ee-item">
                                        <div class="ee-item-meta">${e(exp.duration || 'PRESENT')}</div>
                                        <div>
                                            <h3 class="ee-item-title ee-heading-font">${e(exp.role || 'Role')}</h3>
                                            <div class="ee-item-subtitle">${e(exp.company || 'Company')}</div>
                                            ${(exp.description || exp.keyAchievements) ? 
                                                `<p class="ee-item-desc">${e(exp.description || exp.keyAchievements).replace(/\n/g, '<br>')}</p>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education Section -->
                    ${edu.length > 0 ? `
                        <section class="ee-section" data-portify-section="education">
                            <h2 class="ee-section-title ee-heading-font">Education</h2>
                            <div class="ee-list">
                                ${edu.map(ed => `
                                    <div class="ee-item">
                                        <div class="ee-item-meta">${e(ed.year || '')}</div>
                                        <div>
                                            <h3 class="ee-item-title ee-heading-font">${e(ed.degree || 'Degree')}</h3>
                                            <div class="ee-item-subtitle">${e(ed.school || 'Institution')}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills Section - Capabilities Grid -->
                    ${skills.length > 0 ? `
                        <section class="ee-section" data-portify-section="skills">
                            <h2 class="ee-section-title ee-heading-font">Capabilities</h2>
                            <div class="ee-grid">
                                ${skills.map(s => `
                                    <div class="ee-grid-item">
                                        <div class="ee-skill-name">${e(s.name)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Certifications Section -->
                    ${certs.length > 0 ? `
                        <section class="ee-section" data-portify-section="certifications">
                            <h2 class="ee-section-title ee-heading-font">Certifications</h2>
                            <div class="ee-grid">
                                ${certs.map(c => `
                                    <div class="ee-grid-item text-left">
                                        <div class="ee-skill-name">${e(c.name)}</div>
                                        <div class="ee-cert-details">
                                            ${c.issuer ? e(c.issuer) : ''}
                                            ${c.year ? ` • ${e(c.year)}` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Contact Section - Executive Contact -->
                    ${hasContactInfo ? `
                        <section class="ee-section" data-portify-section="contact">
                            <h2 class="ee-section-title ee-heading-font">Connect</h2>
                            <div class="ee-contact-grid">
                                ${(contact.email || bi.email) ? `
                                    <div class="ee-contact-block">
                                        <span class="ee-contact-label">Email</span>
                                        <span class="ee-contact-val"><a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a></span>
                                    </div>
                                ` : ''}
                                ${contact.phone ? `
                                    <div class="ee-contact-block">
                                        <span class="ee-contact-label">Phone</span>
                                        <span class="ee-contact-val">${e(contact.phone)}</span>
                                    </div>
                                ` : ''}
                                ${(contact.address || bi.location) ? `
                                    <div class="ee-contact-block">
                                        <span class="ee-contact-label">Location</span>
                                        <span class="ee-contact-val">${e(contact.address || bi.location)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </main>

                <footer class="ee-footer">
                    © ${new Date().getFullYear()} ${e(bi.name || 'EXECUTIVE')}. Built with precision.
                </footer>
            </div>
        </div>
    `;

    // Enable drag & drop for profile image after rendering
    setTimeout(() => {
        const avatarZone = document.getElementById('ee-avatar-dropzone');
        if (avatarZone && window.portfolioRenderer?.enableDragAndDrop) {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.ee-avatar, .ee-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'ee-avatar portify-profile-image';
                    newImg.alt = 'Profile';
                    avatarZone.innerHTML = '';
                    avatarZone.appendChild(newImg);
                    if (window.portfolioRenderer?.updateBasicInfo) {
                        window.portfolioRenderer.updateBasicInfo({ profileImage: imageDataUrl });
                    }
                }
            });
        }
        
        // Add click handler for manual upload
        if (avatarZone && !avatarZone.hasClickHandler) {
            avatarZone.hasClickHandler = true;
            avatarZone.style.cursor = 'pointer';
            avatarZone.addEventListener('click', () => {
                if (window.portfolioRenderer?.triggerImageUpload) {
                    window.portfolioRenderer.triggerImageUpload((imageDataUrl) => {
                        const imgElement = avatarZone.querySelector('.ee-avatar, .ee-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'ee-avatar portify-profile-image';
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
    window.demoExecutiveData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
            name: "Alexander Sterling",
            title: "Chief Executive Officer",
            tagline: "Transforming businesses through strategic leadership and innovative vision.",
            location: "London, UK",
            bio: "Award-winning executive with 20+ years of experience in scaling global enterprises."
        },
        about: {
            introduction: "I am an executive leader dedicated to driving organizational transformation and sustainable growth. My approach combines strategic vision with operational excellence.",
            careerSummary: "Over two decades of leadership experience across technology, finance, and consulting sectors. Successfully led 3 companies through IPO, scaled operations across 12 countries, and consistently delivered 30%+ year-over-year growth. Recognized as a thought leader in digital transformation and organizational strategy."
        },
        skills: [
            { name: "Strategic Leadership" },
            { name: "Mergers & Acquisitions" },
            { name: "Digital Transformation" },
            { name: "Board Governance" },
            { name: "Global Operations" },
            { name: "Crisis Management" }
        ],
        projects: [
            {
                title: "Global Expansion Initiative",
                description: "Led successful market entry into 8 new countries, establishing regional headquarters and securing strategic partnerships. Resulted in 150% revenue growth over 3 years.",
                link: "https://example.com/global-expansion",
                image: ""
            },
            {
                title: "Digital Transformation Program",
                description: "Spearheaded enterprise-wide digital transformation, implementing AI-driven solutions and modernizing legacy systems. Achieved 40% operational efficiency gains.",
                link: "https://example.com/digital-transformation",
                image: ""
            }
        ],
        experience: [
            {
                company: "Sterling Global Holdings",
                role: "Chief Executive Officer",
                duration: "2018 – Present",
                description: "Lead strategic direction for a multinational portfolio of 15 companies. Drive M&A activity, oversee C-suite recruitment, and guide organizational culture transformation. Delivered 3.2x shareholder value increase."
            },
            {
                company: "Innovate Capital Partners",
                role: "Managing Director",
                duration: "2012 – 2018",
                description: "Directed investment strategy for a $500M venture fund. Led due diligence on 50+ investment opportunities, served on 12 portfolio company boards, and achieved 28% IRR across investments."
            },
            {
                company: "McKinsey & Company",
                role: "Senior Partner",
                duration: "2005 – 2012",
                description: "Advised Fortune 500 CEOs on growth strategy and operational excellence. Led engagements across North America, Europe, and Asia-Pacific regions."
            }
        ],
        education: [
            { school: "Harvard Business School", degree: "MBA", year: "2003–2005" },
            { school: "Stanford University", degree: "B.S. Economics", year: "1998–2002" }
        ],
        certifications: [
            { name: "Certified Corporate Director", issuer: "NACD", year: "2020" },
            { name: "Executive Leadership Program", issuer: "Stanford GSB", year: "2015" }
        ],
        socialLinks: {
            linkedin: "https://linkedin.com/in/alexandersterling",
            twitter: "https://twitter.com/asterling",
            github: "https://github.com/asterling"
        },
        contact: {
            email: "a.sterling@globalexec.com",
            phone: "+44 20 7946 0138",
            address: "London, United Kingdom"
        }
    };
}
