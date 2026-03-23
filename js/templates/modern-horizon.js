/**
 * Template: Modern Horizon (Enhanced Professional Edition)
 * Style: Dark gradient, glassmorphism, purple/indigo accents with modern aesthetics
 * Features: Full support for all portfolio builder fields including:
 * - Profile Image (drag & drop ready with glass morphism effect)
 * - Full Name, Professional Title, Tagline, Location
 * - About Me (Introduction + Career Summary with rich formatting)
 * - Skills (multiple with pill-shaped tags)
 * - Projects (title, description, link, optional image with hover effects)
 * - Experience (company, role, duration, key achievements)
 * - Education (school, degree, year)
 * - Certifications (name, issuer, year with icon)
 * - Social Links (GitHub, LinkedIn, Twitter, Instagram, Dribbble, Behance)
 * - Contact (email, phone, address)
 * 
 * Enhanced with:
 * - Glass morphism cards with backdrop blur
 * - Animated gradient backgrounds
 * - Drag & drop image upload for profile
 * - Project image support with lazy loading
 * - Responsive timeline layouts
 * - Smooth scroll animations
 * - Modern purple/indigo color scheme with neon accents
 */

window.renderModernHorizon = function(data) {
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
        if (!name) return '✨';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // Check if sections have content
    const hasAboutSection = !!(about.introduction || about.careerSummary || bi.bio);
    const hasContactInfo = !!(contact.email || bi.email || contact.phone || contact.address || bi.location);
    
    // Helper to format social platform display name
    const formatSocialLabel = (key) => {
        const labels = { 
            github: 'GitHub', 
            linkedin: 'LinkedIn', 
            twitter: 'Twitter/X', 
            instagram: 'Instagram', 
            dribbble: 'Dribbble', 
            behance: 'Behance' 
        };
        return labels[key.toLowerCase()] || key;
    };

    // CSS - Modern glass morphism with purple/indigo gradient accents
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
            
            .tmpl-mh {
                --mh-accent: #8b5cf6;
                --mh-accent-light: #a78bfa;
                --mh-accent-glow: rgba(139, 92, 246, 0.4);
                --mh-accent2: #ec4899;
                --mh-accent2-glow: rgba(236, 72, 153, 0.3);
                --mh-bg: #030712;
                --mh-surface: rgba(255, 255, 255, 0.05);
                --mh-surface-hover: rgba(255, 255, 255, 0.08);
                --mh-border: rgba(255, 255, 255, 0.1);
                --mh-text: #f1f5f9;
                --mh-text-muted: #94a3b8;
                --mh-gradient-1: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
                --mh-gradient-2: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                
                font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--mh-bg);
                color: var(--mh-text);
                min-height: 100vh;
                line-height: 1.6;
                margin: 0;
            }
            
            .tmpl-mh * { 
                box-sizing: border-box; 
            }
            
            .tmpl-mh a { 
                color: var(--mh-accent-light); 
                text-decoration: none; 
                transition: all 0.3s ease; 
            }
            
            .tmpl-mh a:hover { 
                color: var(--mh-accent2); 
                text-decoration: underline; 
            }

            /* Hero Section with Animated Background */
            .mh-hero {
                position: relative;
                padding: 6rem 2rem 4rem;
                text-align: center;
                overflow: hidden;
                border-bottom: 1px solid var(--mh-border);
            }
            
            .mh-hero-bg {
                position: absolute;
                inset: 0;
                z-index: 0;
                background: 
                    radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 60%);
                animation: gradientShift 10s ease-in-out infinite;
            }
            
            @keyframes gradientShift {
                0%, 100% {
                    opacity: 0.6;
                    transform: scale(1);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.05);
                }
            }
            
            .mh-hero-inner {
                position: relative;
                z-index: 1;
                max-width: 800px;
                margin: 0 auto;
                background: var(--mh-surface);
                backdrop-filter: blur(20px);
                -webkit-backdrop-filter: blur(20px);
                border: 1px solid var(--mh-border);
                border-radius: 32px;
                padding: 3rem 2rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            
            .mh-hero-inner:hover {
                transform: translateY(-4px);
                box-shadow: 0 30px 60px -12px rgba(139, 92, 246, 0.2);
            }
            
            /* Avatar with drag & drop support */
            .mh-avatar-container {
                width: 120px;
                height: 120px;
                margin: 0 auto 1.5rem;
                cursor: pointer;
                position: relative;
                transition: all 0.3s ease;
            }
            
            .mh-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid var(--mh-border);
                box-shadow: 0 0 30px var(--mh-accent-glow);
                transition: all 0.3s ease;
                background: var(--mh-surface);
            }
            
            .mh-avatar:hover {
                transform: scale(1.05);
                border-color: var(--mh-accent);
                box-shadow: 0 0 40px var(--mh-accent-glow);
            }
            
            .mh-avatar-placeholder {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--mh-gradient-1);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                font-weight: 700;
                color: white;
                border: 3px solid var(--mh-border);
                box-shadow: 0 0 30px var(--mh-accent-glow);
            }
            
            .mh-name {
                font-size: clamp(2rem, 5vw, 3.5rem);
                font-weight: 800;
                letter-spacing: -0.02em;
                background: var(--mh-gradient-1);
                -webkit-background-clip: text;
                background-clip: text;
                -webkit-text-fill-color: transparent;
                margin: 0 0 0.5rem 0;
            }
            
            .mh-title {
                font-size: 1.25rem;
                font-weight: 600;
                color: var(--mh-accent2);
                margin: 0 0 1rem;
            }
            
            .mh-tagline {
                font-size: 1rem;
                color: var(--mh-text-muted);
                margin: 0 0 1.5rem;
                max-width: 600px;
                margin-inline: auto;
                font-weight: 400;
            }
            
            .mh-location {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 99px;
                font-size: 0.85rem;
                color: var(--mh-text-muted);
                margin-bottom: 1.5rem;
            }
            
            .mh-social-links {
                display: flex;
                justify-content: center;
                gap: 0.75rem;
                flex-wrap: wrap;
                margin-top: 1rem;
            }
            
            .mh-social-links a {
                padding: 0.5rem 1.2rem;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid var(--mh-border);
                border-radius: 99px;
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--mh-text);
                transition: all 0.3s ease;
            }
            
            .mh-social-links a:hover {
                background: var(--mh-gradient-1);
                border-color: transparent;
                color: white;
                text-decoration: none;
                transform: translateY(-2px);
            }

            /* Main Body */
            .mh-body {
                max-width: 1200px;
                margin: 0 auto;
                padding: 4rem 2rem;
                display: flex;
                flex-direction: column;
                gap: 4rem;
            }
            
            /* Section Titles */
            .mh-section-title {
                font-size: 0.85rem;
                font-weight: 800;
                text-transform: uppercase;
                letter-spacing: 0.2em;
                color: var(--mh-accent);
                margin: 0 0 2rem 0;
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .mh-section-title::after {
                content: '';
                flex: 1;
                height: 1px;
                background: linear-gradient(90deg, var(--mh-border), transparent);
            }
            
            /* Glass Card Base */
            .mh-glass-card {
                background: var(--mh-surface);
                border: 1px solid var(--mh-border);
                border-radius: 24px;
                padding: 2rem;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            
            .mh-glass-card:hover {
                border-color: var(--mh-accent);
                transform: translateY(-2px);
                background: var(--mh-surface-hover);
            }

            /* About Section */
            .mh-about-text {
                color: var(--mh-text-muted);
                font-size: 1.1rem;
                line-height: 1.8;
            }
            
            .mh-about-text p {
                margin-bottom: 1rem;
            }
            
            .mh-about-text p:last-child {
                margin-bottom: 0;
            }
            
            .mh-about-text strong {
                color: var(--mh-text);
                font-weight: 600;
            }

            /* Skills Section */
            .mh-skills {
                display: flex;
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            
            .mh-skill-pill {
                padding: 0.6rem 1.3rem;
                background: linear-gradient(145deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
                border: 1px solid var(--mh-border);
                border-radius: 99px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                color: var(--mh-text);
            }
            
            .mh-skill-pill:hover {
                border-color: var(--mh-accent);
                transform: translateY(-2px);
                background: rgba(139, 92, 246, 0.1);
            }

            /* Projects Grid */
            .mh-projects-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.5rem;
            }
            
            .mh-project {
                background: var(--mh-surface);
                border: 1px solid var(--mh-border);
                border-radius: 20px;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .mh-project:hover {
                border-color: var(--mh-accent);
                transform: translateY(-6px);
                box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.4);
            }
            
            .mh-project-image {
                width: 100%;
                height: 200px;
                overflow: hidden;
                background: linear-gradient(135deg, var(--mh-accent), var(--mh-accent2));
            }
            
            .mh-project-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .mh-project:hover .mh-project-image img {
                transform: scale(1.05);
            }
            
            .mh-project-image-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                background: rgba(255, 255, 255, 0.03);
            }
            
            .mh-project-content {
                padding: 1.5rem;
            }
            
            .mh-project h3 {
                margin: 0 0 0.75rem;
                font-size: 1.25rem;
                font-weight: 700;
                color: var(--mh-text);
            }
            
            .mh-project p {
                font-size: 0.9rem;
                color: var(--mh-text-muted);
                margin: 0 0 1rem;
                line-height: 1.6;
            }
            
            .mh-project-link {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.85rem;
                font-weight: 600;
                color: var(--mh-accent-light);
            }
            
            .mh-project-link:hover {
                gap: 0.75rem;
            }

            /* Timeline for Experience & Education */
            .mh-timeline {
                display: flex;
                flex-direction: column;
                gap: 2rem;
                border-left: 2px solid var(--mh-border);
                margin-left: 1rem;
                padding-left: 2rem;
            }
            
            .mh-timeline-item {
                position: relative;
                transition: transform 0.3s ease;
            }
            
            .mh-timeline-item:hover {
                transform: translateX(6px);
            }
            
            .mh-timeline-item::before {
                content: '';
                position: absolute;
                left: -2.5rem;
                top: 0.5rem;
                width: 12px;
                height: 12px;
                background: var(--mh-gradient-1);
                border-radius: 50%;
                box-shadow: 0 0 10px var(--mh-accent-glow);
            }
            
            .mh-timeline-title {
                font-size: 1.15rem;
                font-weight: 700;
                margin: 0 0 0.25rem;
                color: var(--mh-text);
            }
            
            .mh-timeline-meta {
                font-size: 0.85rem;
                color: var(--mh-accent2);
                font-weight: 600;
                margin: 0 0 0.75rem;
            }
            
            .mh-timeline-desc {
                font-size: 0.95rem;
                color: var(--mh-text-muted);
                margin: 0;
                line-height: 1.7;
                white-space: pre-line;
            }

            /* Certifications Grid */
            .mh-cert-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1rem;
            }
            
            .mh-cert-card {
                background: var(--mh-surface);
                border: 1px solid var(--mh-border);
                border-radius: 16px;
                padding: 1.25rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                transition: all 0.3s ease;
            }
            
            .mh-cert-card:hover {
                border-color: var(--mh-accent);
                transform: translateY(-3px);
                background: var(--mh-surface-hover);
            }
            
            .mh-cert-icon {
                font-size: 2rem;
            }
            
            .mh-cert-info {
                flex: 1;
            }
            
            .mh-cert-name {
                font-weight: 700;
                font-size: 1rem;
                margin-bottom: 0.25rem;
                color: var(--mh-text);
            }
            
            .mh-cert-details {
                font-size: 0.8rem;
                color: var(--mh-text-muted);
            }

            /* Contact Section */
            .mh-contact-grid {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2.5rem;
                flex-wrap: wrap;
                text-align: center;
            }
            
            .mh-contact-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                padding: 1rem;
                transition: all 0.3s ease;
            }
            
            .mh-contact-item:hover {
                transform: translateY(-4px);
            }
            
            .mh-contact-icon {
                font-size: 1.5rem;
            }
            
            .mh-contact-item strong {
                color: var(--mh-accent-light);
                font-size: 0.75rem;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-weight: 700;
            }
            
            .mh-contact-item a,
            .mh-contact-item span {
                color: var(--mh-text);
                font-size: 0.9rem;
            }
            
            .mh-contact-item a:hover {
                color: var(--mh-accent-light);
            }

            /* Footer */
            .mh-footer {
                text-align: center;
                padding: 3rem 2rem;
                border-top: 1px solid var(--mh-border);
                color: var(--mh-text-muted);
                font-size: 0.85rem;
            }
            
            /* Scrollbar Styling */
            .tmpl-mh::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            .tmpl-mh::-webkit-scrollbar-track {
                background: var(--mh-bg);
            }
            
            .tmpl-mh::-webkit-scrollbar-thumb {
                background: var(--mh-accent);
                border-radius: 4px;
            }
            
            .tmpl-mh::-webkit-scrollbar-thumb:hover {
                background: var(--mh-accent2);
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .mh-body {
                    padding: 2rem 1.5rem;
                    gap: 2.5rem;
                }
                
                .mh-hero {
                    padding: 3rem 1rem 2rem;
                }
                
                .mh-hero-inner {
                    padding: 2rem 1.5rem;
                }
                
                .mh-timeline {
                    margin-left: 0.5rem;
                    padding-left: 1.5rem;
                }
                
                .mh-contact-grid {
                    gap: 1.5rem;
                }
            }
        </style>
    `;

    // Build HTML dynamically
    const html = `
        <div class="tmpl-mh">
            <header class="mh-hero" data-portify-section="header">
                <div class="mh-hero-bg"></div>
                <div class="mh-hero-inner">
                    <!-- Profile Image with drag & drop support -->
                    <div class="mh-avatar-container" id="mh-avatar-dropzone" title="Click or drag image to change profile photo">
                        ${bi.profileImage && bi.profileImage.trim() !== "" ?
                            `<img src="${e(bi.profileImage)}" class="mh-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                            `<div class="mh-avatar-placeholder">${getInitials(bi.name)}</div>`
                        }
                    </div>
                    
                    <h1 class="mh-name">${e(bi.name || 'Your Name')}</h1>
                    ${bi.title ? `<p class="mh-title">${e(bi.title)}</p>` : ''}
                    ${bi.tagline ? `<p class="mh-tagline">${e(bi.tagline)}</p>` : ''}
                    ${bi.location ? `
                        <div class="mh-location">
                            <span>📍</span> ${e(bi.location)}
                        </div>
                    ` : ''}
                    
                    ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").length > 0 ? `
                        <div class="mh-social-links">
                            ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").map(([platform, url]) => 
                                `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${formatSocialLabel(platform)}</a>`
                            ).join('')}
                        </div>
                    ` : ''}
                </div>
            </header>

            <main class="mh-body">
                <!-- About Section -->
                ${hasAboutSection ? `
                    <section data-portify-section="about">
                        <h2 class="mh-section-title">About Me</h2>
                        <div class="mh-glass-card">
                            <div class="mh-about-text">
                                ${about.introduction ? `<p><strong>👋 Introduction</strong><br>${e(about.introduction).replace(/\n/g, '<br>')}</p>` : ''}
                                ${about.careerSummary ? `<p><strong>📌 Career Summary</strong><br>${e(about.careerSummary).replace(/\n/g, '<br>')}</p>` : ''}
                                ${bi.bio && !about.introduction && !about.careerSummary ? `<p>${e(bi.bio).replace(/\n/g, '<br>')}</p>` : ''}
                            </div>
                        </div>
                    </section>
                ` : ''}

                <!-- Skills Section -->
                ${skills.length > 0 ? `
                    <section data-portify-section="skills">
                        <h2 class="mh-section-title">Skills & Technologies</h2>
                        <div class="mh-skills">
                            ${skills.map(s => `<span class="mh-skill-pill">${e(s.name)}</span>`).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Projects Section -->
                ${projects.length > 0 ? `
                    <section data-portify-section="projects">
                        <h2 class="mh-section-title">Featured Projects</h2>
                        <div class="mh-projects-grid">
                            ${projects.map(p => `
                                <div class="mh-project">
                                    ${p.image ? `
                                        <div class="mh-project-image">
                                            <img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">
                                        </div>
                                    ` : `
                                        <div class="mh-project-image-placeholder">
                                            🚀
                                        </div>
                                    `}
                                    <div class="mh-project-content">
                                        <h3>${e(p.title)}</h3>
                                        ${p.description ? `<p>${e(p.description)}</p>` : ''}
                                        ${p.link ? `<a href="${e(p.link)}" target="_blank" rel="noopener noreferrer" class="mh-project-link">View Project →</a>` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Experience Section -->
                ${experience.length > 0 ? `
                    <section data-portify-section="experience">
                        <h2 class="mh-section-title">Work Experience</h2>
                        <div class="mh-timeline">
                            ${experience.map(exp => `
                                <div class="mh-timeline-item">
                                    <h3 class="mh-timeline-title">${e(exp.role || 'Role')}</h3>
                                    <div class="mh-timeline-meta">
                                        ${e(exp.company || 'Company')}
                                        ${exp.duration ? ` • ${e(exp.duration)}` : ''}
                                    </div>
                                    ${(exp.description || exp.keyAchievements) ? 
                                        `<p class="mh-timeline-desc">${e(exp.description || exp.keyAchievements).replace(/\n/g, '<br>')}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Education Section -->
                ${edu.length > 0 ? `
                    <section data-portify-section="education">
                        <h2 class="mh-section-title">Education</h2>
                        <div class="mh-timeline">
                            ${edu.map(ed => `
                                <div class="mh-timeline-item">
                                    <h3 class="mh-timeline-title">${e(ed.degree || 'Degree')}</h3>
                                    <div class="mh-timeline-meta">
                                        ${e(ed.school || 'Institution')}
                                        ${ed.year ? ` • ${e(ed.year)}` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Certifications Section -->
                ${certs.length > 0 ? `
                    <section data-portify-section="certifications">
                        <h2 class="mh-section-title">Certifications</h2>
                        <div class="mh-cert-grid">
                            ${certs.map(c => `
                                <div class="mh-cert-card">
                                    <div class="mh-cert-icon">🎓</div>
                                    <div class="mh-cert-info">
                                        <div class="mh-cert-name">${e(c.name)}</div>
                                        <div class="mh-cert-details">
                                            ${c.issuer ? e(c.issuer) : ''}
                                            ${c.year ? ` • ${e(c.year)}` : ''}
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </section>
                ` : ''}

                <!-- Contact Section -->
                ${hasContactInfo ? `
                    <section data-portify-section="contact">
                        <h2 class="mh-section-title">Get In Touch</h2>
                        <div class="mh-glass-card">
                            <div class="mh-contact-grid">
                                ${(contact.email || bi.email) ? `
                                    <div class="mh-contact-item">
                                        <div class="mh-contact-icon">📧</div>
                                        <strong>Email</strong>
                                        <a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a>
                                    </div>
                                ` : ''}
                                ${contact.phone ? `
                                    <div class="mh-contact-item">
                                        <div class="mh-contact-icon">📞</div>
                                        <strong>Phone</strong>
                                        <span>${e(contact.phone)}</span>
                                    </div>
                                ` : ''}
                                ${(contact.address || bi.location) ? `
                                    <div class="mh-contact-item">
                                        <div class="mh-contact-icon">📍</div>
                                        <strong>Location</strong>
                                        <span>${e(contact.address || bi.location)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </section>
                ` : ''}
            </main>

            <footer class="mh-footer">
                <p>© ${new Date().getFullYear()} ${e(bi.name || 'Portfolio')} — Built with Modern Horizon ✨</p>
            </footer>
        </div>
    `;

    // Enable drag & drop for profile image after rendering
    setTimeout(() => {
        const avatarZone = document.getElementById('mh-avatar-dropzone');
        if (avatarZone && window.portfolioRenderer?.enableDragAndDrop) {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.mh-avatar, .mh-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'mh-avatar portify-profile-image';
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
                        const imgElement = avatarZone.querySelector('.mh-avatar, .mh-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'mh-avatar portify-profile-image';
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
    window.demoModernHorizonData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
            name: "Sophia Chen",
            title: "Full Stack Developer & Tech Lead",
            tagline: "Building beautiful, scalable applications with modern technologies",
            location: "San Francisco, CA",
            bio: "Passionate developer with 7+ years of experience in full-stack development and cloud architecture."
        },
        about: {
            introduction: "I'm Sophia — a full-stack developer who loves creating elegant solutions to complex problems. My journey started with open source and evolved into leading development teams at startups.",
            careerSummary: "Led development of 3 successful SaaS products, scaled infrastructure to handle 2M+ users, mentored junior developers, and contributed to major open source projects."
        },
        skills: [
            { name: "React" }, { name: "TypeScript" }, { name: "Node.js" },
            { name: "Python" }, { name: "GraphQL" }, { name: "PostgreSQL" },
            { name: "AWS" }, { name: "Docker" }, { name: "TailwindCSS" }
        ],
        projects: [
            { 
                title: "Portify Builder", 
                description: "Dynamic portfolio builder with drag & drop functionality and real-time preview", 
                link: "https://github.com/portify", 
                image: "" 
            },
            { 
                title: "Cloud Metrics Dashboard", 
                description: "Real-time cloud infrastructure monitoring with beautiful visualizations", 
                link: "https://github.com/cloudmetrics", 
                image: "" 
            },
            { 
                title: "DevOps Pipeline Toolkit", 
                description: "Automated CI/CD pipeline tools for modern development workflows", 
                link: "https://github.com/devops-toolkit", 
                image: "" 
            }
        ],
        experience: [
            { 
                company: "TechFlow Innovations", 
                role: "Senior Full Stack Developer", 
                duration: "2022 – Present", 
                description: "Lead the development of microservices architecture serving 500k+ daily users. Implemented performance optimizations reducing load times by 45%." 
            },
            { 
                company: "Digital Forge", 
                role: "Software Engineer", 
                duration: "2019 – 2022", 
                description: "Built and maintained 10+ customer-facing web applications. Collaborated with design team to implement responsive UI components." 
            }
        ],
        education: [
            { school: "Stanford University", degree: "M.S. in Computer Science", year: "2017–2019" },
            { school: "UC Berkeley", degree: "B.S. in Electrical Engineering", year: "2013–2017" }
        ],
        certifications: [
            { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023" },
            { name: "Kubernetes Administrator", issuer: "CNCF", year: "2022" },
            { name: "GraphQL Developer", issuer: "Apollo", year: "2021" }
        ],
        socialLinks: {
            github: "https://github.com/sophiachen",
            linkedin: "https://linkedin.com/in/sophiachen",
            twitter: "https://twitter.com/sophiachen",
            dribbble: "https://dribbble.com/sophiachen"
        }
    };
}
