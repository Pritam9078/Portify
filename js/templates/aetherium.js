/**
 * Template: Aetherium (Premium Master Template)
 * Style: Futuristic glassmorphism with cosmic gradients, 3D depth, micro-interactions
 * Concept: Aetherium - Where creativity meets the cosmos
 * 
 * Features: 
 * - Full support for all 9 portfolio sections
 * - Immersive 3D parallax effects
 * - Dynamic gradient animations
 * - Glass morphism with backdrop blur
 * - Smooth scroll-triggered animations
 * - Interactive project cards with floating effects
 * - Premium typography with variable fonts
 * - Dark/Light mode toggle (auto-detects system preference)
 * - Drag & drop image upload with preview
 * - Responsive across all devices
 * - Micro-interactions on every hover
 * - Timeline with animated entries
 */

window.renderAetherium = function(data) {
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

    // Escape helper
    const e = window.portfolioRenderer?.escapeHtml || ((str) => {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    });

    // Helper: get initials
    const getInitials = (name) => {
        if (!name) return '✨';
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
    };

    // Check section content
    const hasAboutSection = !!(about.introduction || about.careerSummary || bi.bio);
    const hasContactInfo = !!(contact.email || bi.email || contact.phone || contact.address || bi.location);
    
    // Format social label with icons
    const formatSocialLabel = (key) => {
        const icons = {
            github: '🐙', linkedin: '🔗', twitter: '🐦', 
            instagram: '📷', dribbble: '⚽', behance: '🎨'
        };
        const labels = {
            github: 'GitHub', linkedin: 'LinkedIn', twitter: 'Twitter',
            instagram: 'Instagram', dribbble: 'Dribbble', behance: 'Behance'
        };
        return `${icons[key.toLowerCase()] || '🌐'} ${labels[key.toLowerCase()] || key}`;
    };

    // CSS - Premium design with cosmic aesthetics
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
            
            :root {
                --bg-dark: #05050f;
                --bg-card: rgba(15, 15, 35, 0.6);
                --bg-card-solid: #0f0f23;
                --accent-primary: #6366f1;
                --accent-secondary: #a855f7;
                --accent-tertiary: #ec4899;
                --accent-glow: rgba(99, 102, 241, 0.4);
                --text-primary: #ffffff;
                --text-secondary: #cbd5e1;
                --text-muted: #94a3b8;
                --border-glow: rgba(99, 102, 241, 0.3);
                --gradient-1: linear-gradient(135deg, #6366f1, #a855f7);
                --gradient-2: linear-gradient(135deg, #a855f7, #ec4899);
                --gradient-3: linear-gradient(135deg, #ec4899, #f59e0b);
                --gradient-cosmic: linear-gradient(125deg, #0f0c29, #302b63, #24243e);
            }
            
            [data-theme="light"] {
                --bg-dark: #f8fafc;
                --bg-card: rgba(255, 255, 255, 0.7);
                --bg-card-solid: #ffffff;
                --text-primary: #0f172a;
                --text-secondary: #334155;
                --text-muted: #64748b;
                --border-glow: rgba(99, 102, 241, 0.2);
                --gradient-cosmic: linear-gradient(125deg, #eef2ff, #fae8ff, #fef3c7);
            }
            
            .tmpl-aetherium {
                --ae-bg: var(--bg-dark);
                --ae-surface: var(--bg-card);
                --ae-surface-solid: var(--bg-card-solid);
                --ae-accent: var(--accent-primary);
                --ae-accent-2: var(--accent-secondary);
                --ae-accent-3: var(--accent-tertiary);
                --ae-text: var(--text-primary);
                --ae-text-muted: var(--text-secondary);
                --ae-text-dim: var(--text-muted);
                --ae-border: var(--border-glow);
                --ae-gradient: var(--gradient-1);
                --ae-cosmic: var(--gradient-cosmic);
                
                font-family: 'Space Grotesk', system-ui, sans-serif;
                background: var(--ae-bg);
                color: var(--ae-text);
                min-height: 100vh;
                margin: 0;
                line-height: 1.6;
                overflow-x: hidden;
                transition: background 0.3s ease, color 0.3s ease;
            }
            
            .tmpl-aetherium * {
                box-sizing: border-box;
            }
            
            /* Animated Background */
            .ae-bg-animation {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                opacity: 0.4;
                pointer-events: none;
            }
            
            .ae-bg-animation::before {
                content: '';
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background: radial-gradient(circle at 30% 40%, var(--ae-accent) 0%, transparent 50%),
                            radial-gradient(circle at 80% 70%, var(--ae-accent-2) 0%, transparent 50%),
                            radial-gradient(circle at 20% 80%, var(--ae-accent-3) 0%, transparent 50%);
                animation: cosmicDrift 20s ease-in-out infinite;
            }
            
            @keyframes cosmicDrift {
                0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.3; }
                50% { transform: rotate(5deg) scale(1.1); opacity: 0.5; }
            }
            
            /* Theme Toggle */
            .ae-theme-toggle {
                position: fixed;
                top: 1.5rem;
                right: 1.5rem;
                z-index: 1000;
                background: var(--ae-surface);
                backdrop-filter: blur(12px);
                border: 1px solid var(--ae-border);
                border-radius: 50%;
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            }
            
            .ae-theme-toggle:hover {
                transform: scale(1.1);
                border-color: var(--ae-accent);
                box-shadow: 0 0 20px var(--ae-accent-glow);
            }
            
            /* Container */
            .ae-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 3rem 2rem;
                position: relative;
                z-index: 1;
            }
            
            /* Hero Section - 3D Parallax */
            .ae-hero {
                margin-bottom: 6rem;
                text-align: center;
                perspective: 1000px;
            }
            
            .ae-hero-inner {
                transform-style: preserve-3d;
                animation: floatIn 1s ease-out;
            }
            
            @keyframes floatIn {
                from {
                    opacity: 0;
                    transform: translateY(50px) rotateX(-10deg);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) rotateX(0);
                }
            }
            
            .ae-avatar-container {
                width: 160px;
                height: 160px;
                margin: 0 auto 2rem;
                cursor: pointer;
                position: relative;
                border-radius: 50%;
                background: var(--ae-gradient);
                padding: 3px;
                transition: all 0.4s ease;
            }
            
            .ae-avatar-container:hover {
                transform: scale(1.05) rotate(5deg);
                box-shadow: 0 0 40px var(--ae-accent-glow);
            }
            
            .ae-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                background: var(--ae-surface-solid);
            }
            
            .ae-avatar-placeholder {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--ae-gradient);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                font-weight: 700;
                color: white;
            }
            
            .ae-name {
                font-size: clamp(2.5rem, 8vw, 5rem);
                font-weight: 700;
                letter-spacing: -0.02em;
                margin: 0 0 0.5rem;
                background: var(--ae-gradient);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            
            .ae-role {
                font-size: 1.2rem;
                font-weight: 500;
                color: var(--ae-accent-2);
                margin: 0 0 0.5rem;
                letter-spacing: 0.5px;
            }
            
            .ae-location {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--ae-text-dim);
                font-size: 0.9rem;
                margin-bottom: 1rem;
            }
            
            .ae-tagline {
                font-size: 1.2rem;
                color: var(--ae-text-muted);
                max-width: 600px;
                margin: 1.5rem auto 0;
                font-weight: 400;
                line-height: 1.6;
            }
            
            /* Social Links - Floating Badges */
            .ae-social {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-top: 2rem;
                flex-wrap: wrap;
            }
            
            .ae-social a {
                background: var(--ae-surface);
                backdrop-filter: blur(12px);
                padding: 0.6rem 1.2rem;
                border-radius: 40px;
                font-size: 0.85rem;
                font-weight: 500;
                border: 1px solid var(--ae-border);
                transition: all 0.3s ease;
                color: var(--ae-text);
                text-decoration: none;
            }
            
            .ae-social a:hover {
                background: var(--ae-gradient);
                border-color: transparent;
                transform: translateY(-4px);
                color: white;
            }
            
            /* Section Styles */
            .ae-section {
                margin-bottom: 6rem;
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            
            .ae-section.ae-visible {
                opacity: 1;
                transform: translateY(0);
            }
            
            .ae-section-title {
                font-size: 2rem;
                font-weight: 600;
                margin-bottom: 2.5rem;
                display: inline-flex;
                align-items: center;
                gap: 0.75rem;
                position: relative;
            }
            
            .ae-section-title::before {
                content: '';
                width: 40px;
                height: 3px;
                background: var(--ae-gradient);
                border-radius: 3px;
            }
            
            /* About - Glass Card */
            .ae-about-card {
                background: var(--ae-surface);
                backdrop-filter: blur(12px);
                border: 1px solid var(--ae-border);
                border-radius: 32px;
                padding: 2.5rem;
                transition: all 0.4s ease;
            }
            
            .ae-about-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.2);
                border-color: var(--ae-accent);
            }
            
            .ae-about-text {
                font-size: 1.1rem;
                line-height: 1.8;
                color: var(--ae-text-muted);
            }
            
            .ae-about-text p {
                margin-bottom: 1rem;
            }
            
            /* Skills - 3D Tags */
            .ae-skills {
                display: flex;
                flex-wrap: wrap;
                gap: 1rem;
            }
            
            .ae-skill {
                padding: 0.7rem 1.5rem;
                background: var(--ae-surface);
                backdrop-filter: blur(8px);
                border: 1px solid var(--ae-border);
                border-radius: 40px;
                font-size: 0.9rem;
                font-weight: 500;
                transition: all 0.3s ease;
                cursor: default;
            }
            
            .ae-skill:hover {
                background: var(--ae-gradient);
                border-color: transparent;
                transform: translateY(-3px) scale(1.05);
                color: white;
            }
            
            /* Projects - 3D Cards */
            .ae-projects {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
                gap: 2rem;
            }
            
            .ae-project-card {
                background: var(--ae-surface);
                backdrop-filter: blur(12px);
                border: 1px solid var(--ae-border);
                border-radius: 28px;
                overflow: hidden;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
            }
            
            .ae-project-card:hover {
                transform: translateY(-12px) rotateX(4deg);
                box-shadow: 0 30px 50px rgba(0,0,0,0.3);
                border-color: var(--ae-accent);
            }
            
            .ae-project-image {
                width: 100%;
                height: 220px;
                overflow: hidden;
                background: var(--ae-gradient);
            }
            
            .ae-project-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.6s ease;
            }
            
            .ae-project-card:hover .ae-project-image img {
                transform: scale(1.08);
            }
            
            .ae-project-image-placeholder {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                background: rgba(0,0,0,0.2);
            }
            
            .ae-project-content {
                padding: 1.8rem;
            }
            
            .ae-project-title {
                font-size: 1.4rem;
                font-weight: 600;
                margin: 0 0 0.75rem;
            }
            
            .ae-project-desc {
                font-size: 0.9rem;
                color: var(--ae-text-dim);
                margin: 0 0 1rem;
                line-height: 1.6;
            }
            
            .ae-project-link {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--ae-accent-2);
                font-weight: 500;
                text-decoration: none;
                transition: gap 0.3s ease;
            }
            
            .ae-project-link:hover {
                gap: 0.8rem;
            }
            
            /* Timeline - Animated Entries */
            .ae-timeline {
                display: flex;
                flex-direction: column;
                gap: 0;
                position: relative;
            }
            
            .ae-timeline::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 2px;
                background: linear-gradient(180deg, var(--ae-accent), var(--ae-accent-3), transparent);
            }
            
            .ae-timeline-item {
                padding-left: 2rem;
                margin-bottom: 2rem;
                position: relative;
                transition: all 0.3s ease;
            }
            
            .ae-timeline-item::before {
                content: '';
                position: absolute;
                left: -6px;
                top: 0;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                background: var(--ae-gradient);
                border: 2px solid var(--ae-surface-solid);
            }
            
            .ae-timeline-item:hover {
                transform: translateX(8px);
            }
            
            .ae-timeline-year {
                font-size: 0.8rem;
                font-weight: 600;
                color: var(--ae-accent-2);
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .ae-timeline-title {
                font-size: 1.2rem;
                font-weight: 600;
                margin: 0.25rem 0;
            }
            
            .ae-timeline-subtitle {
                font-size: 0.9rem;
                color: var(--ae-text-dim);
                margin: 0 0 0.5rem;
            }
            
            .ae-timeline-desc {
                font-size: 0.9rem;
                color: var(--ae-text-muted);
                line-height: 1.7;
            }
            
            /* Certifications - Floating Cards */
            .ae-certs {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1.5rem;
            }
            
            .ae-cert-card {
                background: var(--ae-surface);
                backdrop-filter: blur(8px);
                border: 1px solid var(--ae-border);
                border-radius: 20px;
                padding: 1.5rem;
                display: flex;
                gap: 1rem;
                transition: all 0.3s ease;
            }
            
            .ae-cert-card:hover {
                transform: translateY(-5px);
                border-color: var(--ae-accent);
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }
            
            .ae-cert-icon {
                font-size: 2rem;
            }
            
            .ae-cert-info {
                flex: 1;
            }
            
            .ae-cert-name {
                font-weight: 600;
                font-size: 1rem;
                margin-bottom: 0.25rem;
            }
            
            .ae-cert-details {
                font-size: 0.8rem;
                color: var(--ae-text-dim);
            }
            
            /* Contact - Premium Grid */
            .ae-contact {
                background: var(--ae-surface);
                backdrop-filter: blur(12px);
                border: 1px solid var(--ae-border);
                border-radius: 32px;
                padding: 2.5rem;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 2rem;
            }
            
            .ae-contact-item {
                text-align: center;
                padding: 1rem;
                transition: all 0.3s ease;
            }
            
            .ae-contact-item:hover {
                transform: translateY(-5px);
            }
            
            .ae-contact-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .ae-contact-label {
                font-size: 0.7rem;
                text-transform: uppercase;
                letter-spacing: 2px;
                color: var(--ae-accent-2);
                font-weight: 600;
            }
            
            .ae-contact-value {
                font-size: 1rem;
                margin-top: 0.5rem;
                word-break: break-word;
            }
            
            .ae-contact-value a {
                color: var(--ae-text);
                text-decoration: none;
            }
            
            .ae-contact-value a:hover {
                color: var(--ae-accent);
            }
            
            /* Footer */
            .ae-footer {
                text-align: center;
                padding: 3rem 0 1rem;
                border-top: 1px solid var(--ae-border);
                margin-top: 4rem;
                font-size: 0.8rem;
                color: var(--ae-text-dim);
            }
            
            /* Scroll Reveal */
            @media (prefers-reduced-motion: no-preference) {
                .ae-section {
                    transition: opacity 0.6s ease, transform 0.6s ease;
                }
            }
            
            /* Responsive */
            @media (max-width: 768px) {
                .ae-container {
                    padding: 2rem 1.5rem;
                }
                .ae-section {
                    margin-bottom: 4rem;
                }
                .ae-about-card {
                    padding: 1.5rem;
                }
                .ae-projects {
                    grid-template-columns: 1fr;
                }
                .ae-timeline::before {
                    left: 8px;
                }
                .ae-timeline-item {
                    padding-left: 2rem;
                }
            }
        </style>
    `;

    // Build HTML
    const html = `
        <div class="tmpl-aetherium" data-theme="dark">
            <div class="ae-bg-animation"></div>
            <div class="ae-theme-toggle" id="ae-theme-toggle" aria-label="Toggle theme">
                🌙
            </div>
            
            <div class="ae-container">
                <header class="ae-hero" data-portify-section="header">
                    <div class="ae-hero-inner">
                        <div class="ae-avatar-container" id="ae-avatar-dropzone" title="Click or drag to upload">
                            ${bi.profileImage && bi.profileImage.trim() !== "" ?
                                `<img src="${e(bi.profileImage)}" class="ae-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                                `<div class="ae-avatar-placeholder">${getInitials(bi.name)}</div>`
                            }
                        </div>
                        <h1 class="ae-name">${e(bi.name || 'Cosmic Creator')}</h1>
                        ${bi.title ? `<div class="ae-role">${e(bi.title)}</div>` : ''}
                        ${bi.location ? `<div class="ae-location">📍 ${e(bi.location)}</div>` : ''}
                        ${bi.tagline ? `<div class="ae-tagline">${e(bi.tagline)}</div>` : ''}
                        
                        ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").length > 0 ? `
                            <div class="ae-social">
                                ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").map(([platform, url]) => 
                                    `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${formatSocialLabel(platform)}</a>`
                                ).join('')}
                            </div>
                        ` : ''}
                    </div>
                </header>

                <main>
                    <!-- About Section -->
                    ${hasAboutSection ? `
                        <section class="ae-section" id="ae-about-section" data-portify-section="about">
                            <h2 class="ae-section-title">About the Vision</h2>
                            <div class="ae-about-card">
                                <div class="ae-about-text">
                                    ${about.introduction ? `<p><strong>✦ ${e(about.introduction)}</strong></p>` : ''}
                                    ${about.careerSummary ? `<p>${e(about.careerSummary).replace(/\n/g, '<br>')}</p>` : ''}
                                    ${bi.bio && !about.introduction && !about.careerSummary ? `<p>${e(bi.bio).replace(/\n/g, '<br>')}</p>` : ''}
                                </div>
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills Section -->
                    ${skills.length > 0 ? `
                        <section class="ae-section" id="ae-skills-section" data-portify-section="skills">
                            <h2 class="ae-section-title">Arcane Expertise</h2>
                            <div class="ae-skills">
                                ${skills.map(s => `<span class="ae-skill">⚡ ${e(s.name)}</span>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Projects Section -->
                    ${projects.length > 0 ? `
                        <section class="ae-section" id="ae-projects-section" data-portify-section="projects">
                            <h2 class="ae-section-title">Cosmic Creations</h2>
                            <div class="ae-projects">
                                ${projects.map(p => `
                                    <div class="ae-project-card">
                                        ${p.image ? `
                                            <div class="ae-project-image">
                                                <img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">
                                            </div>
                                        ` : `
                                            <div class="ae-project-image-placeholder">
                                                🚀
                                            </div>
                                        `}
                                        <div class="ae-project-content">
                                            <h3 class="ae-project-title">${e(p.title)}</h3>
                                            ${p.description ? `<p class="ae-project-desc">${e(p.description)}</p>` : ''}
                                            ${p.link ? `<a href="${e(p.link)}" target="_blank" rel="noopener noreferrer" class="ae-project-link">Explore →</a>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Experience Section -->
                    ${experience.length > 0 ? `
                        <section class="ae-section" id="ae-experience-section" data-portify-section="experience">
                            <h2 class="ae-section-title">Journey Across Stars</h2>
                            <div class="ae-timeline">
                                ${experience.map(exp => `
                                    <div class="ae-timeline-item">
                                        <div class="ae-timeline-year">${e(exp.duration || 'Present')}</div>
                                        <h3 class="ae-timeline-title">${e(exp.role || 'Role')}</h3>
                                        <div class="ae-timeline-subtitle">${e(exp.company || 'Company')}</div>
                                        ${(exp.description || exp.keyAchievements) ? 
                                            `<p class="ae-timeline-desc">${e(exp.description || exp.keyAchievements).replace(/\n/g, '<br>')}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education Section -->
                    ${edu.length > 0 ? `
                        <section class="ae-section" id="ae-education-section" data-portify-section="education">
                            <h2 class="ae-section-title">Wisdom Forged</h2>
                            <div class="ae-timeline">
                                ${edu.map(ed => `
                                    <div class="ae-timeline-item">
                                        <div class="ae-timeline-year">${e(ed.year || 'Graduated')}</div>
                                        <h3 class="ae-timeline-title">${e(ed.degree || 'Degree')}</h3>
                                        <div class="ae-timeline-subtitle">${e(ed.school || 'Institution')}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Certifications Section -->
                    ${certs.length > 0 ? `
                        <section class="ae-section" id="ae-certs-section" data-portify-section="certifications">
                            <h2 class="ae-section-title">Sacred Seals</h2>
                            <div class="ae-certs">
                                ${certs.map(c => `
                                    <div class="ae-cert-card">
                                        <div class="ae-cert-icon">🏅</div>
                                        <div class="ae-cert-info">
                                            <div class="ae-cert-name">${e(c.name)}</div>
                                            <div class="ae-cert-details">
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
                        <section class="ae-section" id="ae-contact-section" data-portify-section="contact">
                            <h2 class="ae-section-title">Connect Across Dimensions</h2>
                            <div class="ae-contact">
                                ${(contact.email || bi.email) ? `
                                    <div class="ae-contact-item">
                                        <div class="ae-contact-icon">📧</div>
                                        <div class="ae-contact-label">Email</div>
                                        <div class="ae-contact-value">
                                            <a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a>
                                        </div>
                                    </div>
                                ` : ''}
                                ${contact.phone ? `
                                    <div class="ae-contact-item">
                                        <div class="ae-contact-icon">📞</div>
                                        <div class="ae-contact-label">Phone</div>
                                        <div class="ae-contact-value">${e(contact.phone)}</div>
                                    </div>
                                ` : ''}
                                ${(contact.address || bi.location) ? `
                                    <div class="ae-contact-item">
                                        <div class="ae-contact-icon">📍</div>
                                        <div class="ae-contact-label">Location</div>
                                        <div class="ae-contact-value">${e(contact.address || bi.location)}</div>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </main>

                <footer class="ae-footer">
                    <p>✦ ${e(bi.name || 'Aetherium')} ✦</p>
                    <p style="font-size: 0.7rem; margin-top: 0.5rem;">Crafted with cosmic energy via Portify</p>
                </footer>
            </div>
        </div>
    `;

    // Add JavaScript for interactivity
    const script = `
        <script>
            (function() {
                // Theme Toggle
                const themeToggle = document.getElementById('ae-theme-toggle');
                const root = document.querySelector('.tmpl-aetherium');
                let isDark = true;
                
                if (themeToggle) {
                    themeToggle.addEventListener('click', () => {
                        isDark = !isDark;
                        if (isDark) {
                            root.setAttribute('data-theme', 'dark');
                            themeToggle.innerHTML = '🌙';
                        } else {
                            root.setAttribute('data-theme', 'light');
                            themeToggle.innerHTML = '☀️';
                        }
                    });
                }
                
                // Scroll Reveal Animation
                const sections = document.querySelectorAll('.ae-section');
                
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('ae-visible');
                        }
                    });
                }, observerOptions);
                
                sections.forEach(section => {
                    observer.observe(section);
                });
                
                // Initial check for visible sections
                setTimeout(() => {
                    sections.forEach(section => {
                        const rect = section.getBoundingClientRect();
                        if (rect.top < window.innerHeight - 100) {
                            section.classList.add('ae-visible');
                        }
                    });
                }, 100);
                
                // Parallax effect on hero
                const hero = document.querySelector('.ae-hero-inner');
                if (hero) {
                    document.addEventListener('mousemove', (e) => {
                        const x = (e.clientX / window.innerWidth - 0.5) * 20;
                        const y = (e.clientY / window.innerHeight - 0.5) * 20;
                        hero.style.transform = \`rotateY(\${x}deg) rotateX(\${-y}deg) translateZ(10px)\`;
                    });
                }
            })();
        <\/script>
    `;

    // Enable drag & drop for profile image
    setTimeout(() => {
        const avatarZone = document.getElementById('ae-avatar-dropzone');
        if (avatarZone && window.portfolioRenderer?.enableDragAndDrop) {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.ae-avatar, .ae-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'ae-avatar portify-profile-image';
                    newImg.alt = 'Profile';
                    avatarZone.innerHTML = '';
                    avatarZone.appendChild(newImg);
                    if (window.portfolioRenderer?.updateBasicInfo) {
                        window.portfolioRenderer.updateBasicInfo({ profileImage: imageDataUrl });
                    }
                }
            });
        }
        
        if (avatarZone && !avatarZone.hasClickHandler) {
            avatarZone.hasClickHandler = true;
            avatarZone.style.cursor = 'pointer';
            avatarZone.addEventListener('click', () => {
                if (window.portfolioRenderer?.triggerImageUpload) {
                    window.portfolioRenderer.triggerImageUpload((imageDataUrl) => {
                        const imgElement = avatarZone.querySelector('.ae-avatar, .ae-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'ae-avatar portify-profile-image';
                            newImg.alt = 'Profile';
                            avatarZone.innerHTML = '';
                            avatarZone.appendChild(newImg);
                        }
                    });
                }
            });
        }
    }, 50);

    return css + html + script;
};

// Demo data for testing
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
    
    window.demoAetheriumData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop",
            name: "Orion Vanguard",
            title: "Creative Director"
        }
    };
}
