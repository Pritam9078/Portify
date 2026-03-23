/**
 * Template: Artistic Studio (Enhanced Professional Edition)
 * Style: Creative sidebar layout, vibrant color accents, distinct sections
 * Features: Full support for all portfolio builder fields including:
 * - Profile Image (drag & drop ready)
 * - Full Name, Professional Title, Tagline, Location
 * - About Me (Introduction + Career Summary)
 * - Skills (multiple with tags)
 * - Projects (title, description, link, optional image)
 * - Experience (company, role, duration, achievements)
 * - Education (school, degree, year)
 * - Certifications (name, issuer, year)
 * - Social Links (GitHub, LinkedIn, Twitter, Instagram, Dribbble, Behance)
 * - Contact (email, phone, address)
 * 
 * Enhanced with:
 * - Drag & drop image upload for profile
 * - Project image preview
 * - Responsive design for all devices
 * - Smooth animations and hover effects
 * - Professional gradient accents
 */

window.renderArtisticStudio = function(data) {
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
    const hasContactInfo = !!(contact.email || bi.email || contact.phone || bi.phone || contact.address || bi.location);
    const hasAboutSection = !!(about.introduction || about.careerSummary || bi.bio);
    
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

    // CSS - Modern, glassmorphic, professional artistic studio design
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,600;14..32,700;14..32,800&display=swap');
            
            .tmpl-art {
                --art-bg: #0B0C10;
                --art-surface: #111217;
                --art-surface-elevated: #181C24;
                --art-text-primary: #F0F3FA;
                --art-text-secondary: #A0A8B8;
                --art-accent: #E76F51;
                --art-accent-glow: #F4A261;
                --art-accent-gradient: linear-gradient(135deg, #E76F51, #F4A261);
                --art-border-subtle: rgba(255,255,255,0.08);
                --art-shadow-sm: 0 8px 20px rgba(0,0,0,0.4);
                --art-shadow-md: 0 20px 35px -12px rgba(0,0,0,0.5);
                
                font-family: 'Inter', system-ui, -apple-system, sans-serif;
                background: var(--art-bg);
                color: var(--art-text-primary);
                min-height: 100vh;
                margin: 0;
                display: flex;
            }
            
            .tmpl-art * { 
                box-sizing: border-box; 
                margin: 0; 
            }
            
            .tmpl-art a { 
                color: var(--art-accent); 
                text-decoration: none; 
                transition: all 0.2s ease; 
                font-weight: 500; 
            }
            
            .tmpl-art a:hover { 
                color: var(--art-accent-glow); 
                text-decoration: underline; 
            }

            /* Layout */
            .art-wrapper { 
                display: flex; 
                width: 100%; 
                min-height: 100vh; 
                background: var(--art-bg); 
            }
            
            @media (max-width: 880px) { 
                .art-wrapper { 
                    flex-direction: column; 
                } 
            }

            /* Sidebar - Sophisticated dark panel */
            .art-sidebar {
                width: 360px;
                flex-shrink: 0;
                background: var(--art-surface);
                padding: 2.8rem 2rem;
                display: flex;
                flex-direction: column;
                position: sticky;
                top: 0;
                height: 100vh;
                overflow-y: auto;
                border-right: 1px solid var(--art-border-subtle);
                backdrop-filter: blur(2px);
                z-index: 10;
            }
            
            @media (max-width: 880px) {
                .art-sidebar {
                    width: 100%;
                    height: auto;
                    position: relative;
                    border-right: none;
                    border-bottom: 1px solid var(--art-border-subtle);
                    padding: 2rem 1.8rem;
                }
            }
            
            /* Avatar with drag & drop support */
            .art-avatar-container {
                position: relative;
                width: 160px;
                height: 160px;
                margin: 0 auto 1.8rem;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .art-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid var(--art-accent);
                box-shadow: 0 12px 28px rgba(0,0,0,0.3);
                transition: transform 0.25s ease, box-shadow 0.3s;
                background: var(--art-surface-elevated);
            }
            
            .art-avatar:hover { 
                transform: scale(1.02); 
                box-shadow: 0 0 0 4px rgba(231,111,81,0.3); 
            }
            
            .art-avatar-placeholder {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--art-accent-gradient);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3.2rem;
                font-weight: 700;
                color: white;
                border: 3px solid var(--art-accent-glow);
                box-shadow: 0 12px 28px rgba(0,0,0,0.3);
            }
            
            .art-name {
                font-size: 2rem;
                font-weight: 800;
                letter-spacing: -0.02em;
                text-align: center;
                margin: 0 0 0.4rem;
                background: linear-gradient(to right, #fff, #e0e4f0);
                background-clip: text;
                -webkit-background-clip: text;
                color: transparent;
            }
            
            .art-role {
                font-size: 0.9rem;
                font-weight: 600;
                text-align: center;
                color: var(--art-accent);
                text-transform: uppercase;
                letter-spacing: 1.5px;
                margin-bottom: 1rem;
            }
            
            .art-tagline {
                font-size: 0.9rem;
                text-align: center;
                color: var(--art-text-secondary);
                border-top: 1px dashed var(--art-border-subtle);
                border-bottom: 1px dashed var(--art-border-subtle);
                padding: 1rem 0;
                margin: 1rem 0 1.8rem;
                font-style: normal;
                font-weight: 400;
            }
            
            /* Contact List */
            .art-contact-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
                margin-top: auto;
                padding-top: 2rem;
                border-top: 1px solid var(--art-border-subtle);
            }
            
            .art-contact-item {
                font-size: 0.85rem;
                display: flex;
                flex-direction: column;
                gap: 0.2rem;
            }
            
            .art-contact-label {
                font-size: 0.7rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                color: var(--art-accent);
                opacity: 0.8;
            }
            
            .art-contact-value {
                color: var(--art-text-primary);
                word-break: break-word;
                font-weight: 500;
            }
            
            .art-contact-value a {
                color: var(--art-text-primary);
                border-bottom: 1px dotted var(--art-accent);
                text-decoration: none;
            }
            
            .art-contact-value a:hover { 
                color: var(--art-accent); 
                border-bottom-style: solid; 
            }
            
            /* Social Links */
            .art-social {
                display: flex;
                flex-wrap: wrap;
                gap: 0.7rem;
                margin: 1.5rem 0 0.5rem;
                justify-content: center;
            }
            
            .art-social a {
                background: rgba(255,255,255,0.03);
                padding: 0.45rem 1rem;
                border-radius: 40px;
                font-size: 0.75rem;
                font-weight: 600;
                border: 1px solid var(--art-border-subtle);
                transition: all 0.2s;
                text-transform: capitalize;
            }
            
            .art-social a:hover {
                background: var(--art-accent-gradient);
                color: #0B0C10;
                border-color: transparent;
                transform: translateY(-2px);
                text-decoration: none;
            }

            /* Main Content */
            .art-main {
                flex: 1;
                padding: 3rem 4rem;
                overflow-y: auto;
                background: var(--art-bg);
            }
            
            @media (max-width: 880px) {
                .art-main { 
                    padding: 2.5rem 1.8rem; 
                }
            }
            
            /* Section Animations */
            .art-section {
                margin-bottom: 4rem;
                opacity: 0;
                animation: artFadeUp 0.6s cubic-bezier(0.2, 0.9, 0.4, 1.1) forwards;
            }
            
            @keyframes artFadeUp {
                from { 
                    opacity: 0; 
                    transform: translateY(18px); 
                }
                to { 
                    opacity: 1; 
                    transform: translateY(0); 
                }
            }
            
            .art-section:nth-child(1) { animation-delay: 0.05s; }
            .art-section:nth-child(2) { animation-delay: 0.1s; }
            .art-section:nth-child(3) { animation-delay: 0.15s; }
            .art-section:nth-child(4) { animation-delay: 0.2s; }
            .art-section:nth-child(5) { animation-delay: 0.25s; }
            .art-section:nth-child(6) { animation-delay: 0.3s; }
            
            /* Section Titles */
            .art-title {
                font-size: 1.8rem;
                font-weight: 700;
                letter-spacing: -0.3px;
                margin-bottom: 2rem;
                display: inline-flex;
                align-items: center;
                gap: 1rem;
                border-left: 4px solid var(--art-accent);
                padding-left: 1.2rem;
            }
            
            /* About Card */
            .art-bio {
                background: var(--art-surface);
                border-radius: 28px;
                padding: 2rem 2.2rem;
                border: 1px solid var(--art-border-subtle);
                line-height: 1.65;
                font-size: 1rem;
                color: var(--art-text-secondary);
            }
            
            .art-bio strong {
                color: var(--art-text-primary);
                font-weight: 600;
            }
            
            .art-bio p { 
                margin-bottom: 1rem; 
            }
            
            .art-bio p:last-child { 
                margin-bottom: 0; 
            }
            
            /* Projects Grid */
            .art-projects {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 2rem;
            }
            
            .art-card {
                background: var(--art-surface);
                border-radius: 24px;
                overflow: hidden;
                transition: all 0.35s ease;
                border: 1px solid var(--art-border-subtle);
                backdrop-filter: blur(2px);
            }
            
            .art-card:hover {
                transform: translateY(-6px);
                border-color: rgba(231,111,81,0.5);
                box-shadow: var(--art-shadow-md);
            }
            
            .art-card-image {
                width: 100%;
                height: 180px;
                overflow: hidden;
                background: var(--art-surface-elevated);
                position: relative;
            }
            
            .art-card-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }
            
            .art-card:hover .art-card-image img {
                transform: scale(1.05);
            }
            
            .art-card-image-placeholder {
                width: 100%;
                height: 100%;
                background: linear-gradient(145deg, #1e1a24, #121016);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2.5rem;
                color: var(--art-text-secondary);
            }
            
            .art-card-content {
                padding: 1.6rem;
            }
            
            .art-card-title {
                font-size: 1.35rem;
                font-weight: 700;
                margin-bottom: 0.7rem;
                color: white;
            }
            
            .art-card-desc {
                font-size: 0.85rem;
                color: var(--art-text-secondary);
                margin-bottom: 1.2rem;
                line-height: 1.5;
            }
            
            .art-card-link {
                font-size: 0.8rem;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                display: inline-flex;
                align-items: center;
                gap: 5px;
            }
            
            /* Experience & Education Timeline */
            .art-timeline {
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }
            
            .art-timeline-item {
                background: var(--art-surface);
                border-radius: 20px;
                padding: 1.5rem 2rem;
                border-left: 4px solid var(--art-accent);
                transition: 0.2s;
            }
            
            .art-timeline-item:hover {
                background: var(--art-surface-elevated);
                transform: translateX(6px);
            }
            
            .art-timeline-title {
                font-size: 1.3rem;
                font-weight: 700;
                margin-bottom: 0.3rem;
            }
            
            .art-timeline-meta {
                font-size: 0.85rem;
                color: var(--art-accent);
                font-weight: 500;
                margin-bottom: 0.8rem;
            }
            
            .art-timeline-meta span {
                color: var(--art-text-secondary);
                font-weight: 400;
                margin-left: 0.5rem;
            }
            
            .art-timeline-desc {
                font-size: 0.9rem;
                color: var(--art-text-secondary);
                line-height: 1.6;
                white-space: pre-line;
            }
            
            /* Skills Chips */
            .art-chips {
                display: flex;
                flex-wrap: wrap;
                gap: 0.8rem;
                margin-top: 0.5rem;
            }
            
            .art-chip {
                background: var(--art-surface);
                padding: 0.6rem 1.4rem;
                border-radius: 40px;
                font-size: 0.85rem;
                font-weight: 500;
                border: 1px solid var(--art-border-subtle);
                transition: all 0.2s;
                color: var(--art-text-primary);
            }
            
            .art-chip:hover {
                border-color: var(--art-accent);
                background: rgba(231,111,81,0.1);
                transform: translateY(-2px);
            }
            
            /* Certifications Grid */
            .art-cert-grid {
                display: flex;
                flex-wrap: wrap;
                gap: 1.5rem;
                margin-top: 1rem;
            }
            
            .art-cert-card {
                background: var(--art-surface);
                border-radius: 20px;
                padding: 1.4rem 1.8rem;
                flex: 1 1 240px;
                border: 1px solid var(--art-border-subtle);
                transition: all 0.2s;
            }
            
            .art-cert-card:hover {
                border-color: var(--art-accent);
                transform: translateY(-3px);
                background: var(--art-surface-elevated);
            }
            
            .art-cert-name {
                font-weight: 800;
                font-size: 1.1rem;
                margin-bottom: 0.3rem;
            }
            
            .art-cert-issuer {
                font-size: 0.8rem;
                color: var(--art-accent);
                font-weight: 500;
            }
            
            .art-cert-year {
                font-size: 0.7rem;
                color: var(--art-text-secondary);
                margin-top: 0.3rem;
            }
            
            /* Footer */
            .art-footer {
                margin-top: 4rem;
                padding-top: 1.8rem;
                border-top: 1px solid var(--art-border-subtle);
                text-align: center;
                font-size: 0.8rem;
                color: var(--art-text-secondary);
            }
            
            /* Drag & Drop Active State */
            .art-avatar-container.drag-active {
                filter: drop-shadow(0 0 0 3px var(--art-accent));
                opacity: 0.9;
            }
            
            /* Scrollbar Styling */
            .tmpl-art::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            
            .tmpl-art::-webkit-scrollbar-track {
                background: var(--art-surface);
            }
            
            .tmpl-art::-webkit-scrollbar-thumb {
                background: var(--art-border-subtle);
                border-radius: 4px;
            }
            
            .tmpl-art::-webkit-scrollbar-thumb:hover {
                background: var(--art-accent);
            }
        </style>
    `;
    
    // Build HTML dynamically
    const html = `
        <div class="tmpl-art">
            <div class="art-wrapper">
                <!-- Sidebar: Profile + Contact + Social -->
                <aside class="art-sidebar" data-portify-section="header">
                    <div class="art-avatar-container" id="portify-avatar-dropzone" title="Click or drag image to change profile photo">
                        ${bi.profileImage && bi.profileImage.trim() !== "" ?
                            `<img src="${e(bi.profileImage)}" class="art-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                            `<div class="art-avatar-placeholder">${getInitials(bi.name)}</div>`
                        }
                    </div>
                    
                    <h1 class="art-name">${e(bi.name || 'Your Name')}</h1>
                    ${bi.title ? `<p class="art-role">${e(bi.title)}</p>` : ''}
                    ${bi.tagline ? `<p class="art-tagline">${e(bi.tagline)}</p>` : ''}
                    
                    ${hasContactInfo ? `
                        <div class="art-contact-list">
                            ${(contact.email || bi.email) ? `
                                <div class="art-contact-item">
                                    <span class="art-contact-label">Email</span>
                                    <span class="art-contact-value"><a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a></span>
                                </div>
                            ` : ''}
                            ${(contact.phone || bi.phone) ? `
                                <div class="art-contact-item">
                                    <span class="art-contact-label">Phone</span>
                                    <span class="art-contact-value">${e(contact.phone || bi.phone)}</span>
                                </div>
                            ` : ''}
                            ${(contact.address || bi.location) ? `
                                <div class="art-contact-item">
                                    <span class="art-contact-label">Location</span>
                                    <span class="art-contact-value">${e(contact.address || bi.location)}</span>
                                </div>
                            ` : ''}
                        </div>
                    ` : ''}
                    
                    ${Object.entries(social).filter(([, val]) => val && val.trim() !== "").length > 0 ? `
                        <div class="art-social">
                            ${Object.entries(social).filter(([, val]) => val && val.trim() !== "").map(([platform, url]) => 
                                `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${formatSocialLabel(platform)}</a>`
                            ).join('')}
                        </div>
                    ` : ''}
                </aside>
                
                <!-- Main Content -->
                <main class="art-main">
                    ${hasAboutSection ? `
                        <section class="art-section" data-portify-section="about">
                            <h2 class="art-title">About Me</h2>
                            <div class="art-bio">
                                ${about.introduction ? `<p><strong>👋 Introduction</strong><br>${e(about.introduction).replace(/\n/g, '<br>')}</p>` : ''}
                                ${about.careerSummary ? `<p><strong>📌 Career Summary</strong><br>${e(about.careerSummary).replace(/\n/g, '<br>')}</p>` : ''}
                                ${bi.bio && !about.introduction && !about.careerSummary ? `<p>${e(bi.bio).replace(/\n/g, '<br>')}</p>` : ''}
                            </div>
                        </section>
                    ` : ''}
                    
                    ${projects.length > 0 ? `
                        <section class="art-section" data-portify-section="projects">
                            <h2 class="art-title">Featured Projects</h2>
                            <div class="art-projects">
                                ${projects.map(p => `
                                    <div class="art-card">
                                        <div class="art-card-image">
                                            ${p.image ? `<img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">` : 
                                              `<div class="art-card-image-placeholder">📁 ${e(p.title).charAt(0).toUpperCase()}</div>`}
                                        </div>
                                        <div class="art-card-content">
                                            <h3 class="art-card-title">${e(p.title)}</h3>
                                            ${p.description ? `<p class="art-card-desc">${e(p.description)}</p>` : ''}
                                            ${p.link ? `<a href="${e(p.link)}" target="_blank" rel="noopener noreferrer" class="art-card-link">Explore Project →</a>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    ${experience.length > 0 ? `
                        <section class="art-section" data-portify-section="experience">
                            <h2 class="art-title">Professional Experience</h2>
                            <div class="art-timeline">
                                ${experience.map(exp => `
                                    <div class="art-timeline-item">
                                        <h3 class="art-timeline-title">${e(exp.role || 'Position')}</h3>
                                        <div class="art-timeline-meta">
                                            ${e(exp.company || 'Company')}
                                            ${exp.duration ? `<span>${e(exp.duration)}</span>` : ''}
                                        </div>
                                        ${(exp.description || exp.keyAchievements) ? 
                                            `<p class="art-timeline-desc">${e(exp.description || exp.keyAchievements).replace(/\n/g, '<br>')}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    ${skills.length > 0 ? `
                        <section class="art-section" data-portify-section="skills">
                            <h2 class="art-title">Skills & Expertise</h2>
                            <div class="art-chips">
                                ${skills.map(s => `<span class="art-chip">${e(s.name)}</span>`).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    ${edu.length > 0 ? `
                        <section class="art-section" data-portify-section="education">
                            <h2 class="art-title">Education</h2>
                            <div class="art-timeline">
                                ${edu.map(ed => `
                                    <div class="art-timeline-item">
                                        <h3 class="art-timeline-title">${e(ed.degree || 'Degree')}</h3>
                                        <div class="art-timeline-meta">
                                            ${e(ed.school || 'Institution')}
                                            ${ed.year ? `<span>${e(ed.year)}</span>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    ${certs.length > 0 ? `
                        <section class="art-section" data-portify-section="certifications">
                            <h2 class="art-title">Certifications</h2>
                            <div class="art-cert-grid">
                                ${certs.map(c => `
                                    <div class="art-cert-card">
                                        <div class="art-cert-name">${e(c.name)}</div>
                                        ${c.issuer ? `<div class="art-cert-issuer">${e(c.issuer)}</div>` : ''}
                                        ${c.year ? `<div class="art-cert-year">${e(c.year)}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    <div class="art-footer">
                        © ${new Date().getFullYear()} ${e(bi.name || 'Portfolio')} — Crafted with Portify
                    </div>
                </main>
            </div>
        </div>
    `;
    
    // Enable drag & drop for profile image after rendering
    setTimeout(() => {
        const avatarZone = document.getElementById('portify-avatar-dropzone');
        if (avatarZone && window.portfolioRenderer?.enableDragAndDrop) {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.art-avatar, .art-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'art-avatar portify-profile-image';
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
            avatarZone.addEventListener('click', () => {
                if (window.portfolioRenderer?.triggerImageUpload) {
                    window.portfolioRenderer.triggerImageUpload((imageDataUrl) => {
                        const imgElement = avatarZone.querySelector('.art-avatar, .art-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'art-avatar portify-profile-image';
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
    window.demoArtisticStudioData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
            name: "Alex Morgan",
            title: "Senior Product Designer & Creative Lead",
            tagline: "Designing human-centric experiences that inspire action",
            location: "Brooklyn, NY",
            bio: "Design leader with 8+ years shaping digital products used by millions."
        },
        about: {
            introduction: "I'm Alex — a designer who bridges aesthetics and functionality.",
            careerSummary: "Led design at two YC startups, delivered 10+ successful product launches, and mentored junior designers globally."
        },
        skills: [
            { name: "Figma" }, 
            { name: "React" }, 
            { name: "UI/UX" }, 
            { name: "Prototyping" }, 
            { name: "Design Systems" },
            { name: "User Research" },
            { name: "Adobe Creative Suite" }
        ],
        projects: [
            { 
                title: "Nebula Dashboard", 
                description: "Analytics platform used by 500+ companies for real-time data visualization", 
                link: "https://example.com", 
                image: "" 
            },
            { 
                title: "Portify Builder", 
                description: "Portfolio tool with drag & drop functionality for creatives", 
                link: "#", 
                image: "" 
            },
            { 
                title: "EcoTrack", 
                description: "Sustainability tracking app with carbon footprint calculator", 
                link: "https://example.com", 
                image: "" 
            }
        ],
        experience: [
            { 
                company: "CreativeMinds", 
                role: "Lead Product Designer", 
                duration: "2022 – Present", 
                description: "Directed end-to-end design for core products, increased user engagement by 34%. Led a team of 5 designers and established design system." 
            },
            { 
                company: "Studio Atlas", 
                role: "UI/UX Designer", 
                duration: "2019 – 2022", 
                description: "Collaborated with cross-functional teams to ship responsive web apps. Redesigned flagship product resulting in 45% increase in user retention." 
            }
        ],
        education: [
            { school: "Rhode Island School of Design", degree: "BFA in Graphic Design", year: "2015–2019" }
        ],
        certifications: [
            { name: "Advanced UX Design", issuer: "Google", year: "2023" },
            { name: "Frontend Masters", issuer: "Meta", year: "2022" },
            { name: "Design Leadership", issuer: "IDEO", year: "2021" }
        ],
        socialLinks: {
            github: "https://github.com/alexm",
            linkedin: "https://linkedin.com/in/alexm",
            twitter: "https://twitter.com/alexm",
            dribbble: "https://dribbble.com/alexm",
            behance: "https://behance.net/alexm"
        },
        contact: {
            email: "alex@portify.com",
            phone: "+1 (555) 123-4567",
            address: "Brooklyn, NY"
        }
    };
}