/**
 * Template: Pure Minimal (Enhanced Professional Edition)
 * Style: Clean, typography-focused, plenty of whitespace, black and white / neutral palette
 * Features: Full support for all portfolio builder fields including:
 * - Profile Image (drag & drop ready with subtle hover effects)
 * - Full Name, Professional Title, Tagline, Location
 * - About Me (Introduction + Career Summary with rich formatting)
 * - Skills (multiple with clean pill-shaped tags)
 * - Projects (title, description, link, optional image with minimal design)
 * - Experience (company, role, duration, key achievements)
 * - Education (school, degree, year)
 * - Certifications (name, issuer, year)
 * - Social Links (GitHub, LinkedIn, Twitter, Instagram, Dribbble, Behance)
 * - Contact (email, phone, address)
 * 
 * Enhanced with:
 * - Elegant typography using Inter font
 * - Subtle hover animations
 * - Drag & drop image upload for profile
 * - Project image support with clean presentation
 * - Responsive grid layouts
 * - Accessibility-focused design
 * - Smooth transitions and interactions
 * - Professional whitespace and hierarchy
 */

window.renderPureMinimal = function(data) {
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
    
    // Helper to format social platform display name
    const formatSocialLabel = (key) => {
        const labels = { 
            github: 'GitHub', 
            linkedin: 'LinkedIn', 
            twitter: 'Twitter', 
            instagram: 'Instagram', 
            dribbble: 'Dribbble', 
            behance: 'Behance' 
        };
        return labels[key.toLowerCase()] || key;
    };

    // CSS - Clean, minimal, typography-focused design
    const css = `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            
            .tmpl-pm {
                --pm-bg: #ffffff;
                --pm-text: #111111;
                --pm-text-light: #333333;
                --pm-muted: #6b6b6b;
                --pm-light: #f8f8f8;
                --pm-border: #e8e8e8;
                --pm-accent: #000000;
                --pm-accent-subtle: #2c2c2c;
                --pm-shadow: 0 2px 4px rgba(0, 0, 0, 0.02), 0 1px 2px rgba(0, 0, 0, 0.03);
                --pm-shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.05);
                
                font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
                background: var(--pm-bg);
                color: var(--pm-text);
                min-height: 100vh;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                font-weight: 400;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            .tmpl-pm * { 
                box-sizing: border-box; 
            }
            
            .tmpl-pm a { 
                color: var(--pm-accent); 
                text-decoration: none; 
                transition: all 0.2s ease;
                border-bottom: 1px solid transparent;
            }
            
            .tmpl-pm a:hover { 
                opacity: 0.7; 
                border-bottom-color: currentColor;
            }

            /* Container */
            .pm-container { 
                max-width: 780px; 
                margin: 0 auto; 
                padding: 4rem 2rem; 
            }
            
            @media (max-width: 640px) {
                .pm-container { 
                    padding: 2rem 1.5rem; 
                }
            }
            
            /* Hero Section */
            .pm-hero { 
                margin-bottom: 5rem; 
                display: flex; 
                flex-direction: column; 
                align-items: flex-start; 
                gap: 1.5rem; 
            }
            
            /* Avatar with drag & drop support */
            .pm-avatar-container {
                width: 96px;
                height: 96px;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .pm-avatar {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                transition: all 0.3s ease;
                box-shadow: var(--pm-shadow);
            }
            
            .pm-avatar:hover {
                transform: scale(1.02);
                box-shadow: var(--pm-shadow-hover);
            }
            
            .pm-avatar-placeholder {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: var(--pm-light);
                border: 1px solid var(--pm-border);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2rem;
                font-weight: 500;
                color: var(--pm-muted);
                transition: all 0.3s ease;
            }
            
            .pm-avatar-placeholder:hover {
                background: var(--pm-border);
                transform: scale(1.02);
            }
            
            .pm-name { 
                font-size: 3.5rem; 
                font-weight: 700; 
                letter-spacing: -0.03em; 
                margin: 0; 
                line-height: 1.1;
                color: var(--pm-text);
            }
            
            @media (max-width: 640px) {
                .pm-name { 
                    font-size: 2.5rem; 
                }
            }
            
            .pm-role { 
                font-size: 1.25rem; 
                font-weight: 400; 
                color: var(--pm-muted); 
                margin: 0; 
                line-height: 1.4;
            }
            
            .pm-location {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.9rem;
                color: var(--pm-muted);
                margin: 0;
            }
            
            .pm-tagline { 
                font-size: 1.1rem; 
                color: var(--pm-text-light); 
                margin: 0; 
                max-width: 600px; 
                line-height: 1.6;
                font-weight: 400;
            }
            
            .pm-social { 
                display: flex; 
                gap: 1.5rem; 
                margin-top: 0.5rem;
                flex-wrap: wrap;
            }
            
            .pm-social a { 
                color: var(--pm-muted); 
                font-size: 0.9rem; 
                font-weight: 500; 
                text-transform: lowercase;
                border-bottom: none;
            }
            
            .pm-social a:hover { 
                color: var(--pm-accent); 
                opacity: 1;
                border-bottom: none;
            }

            /* Section Common */
            .pm-section { 
                margin-bottom: 4rem; 
            }
            
            .pm-section-title { 
                font-size: 0.75rem; 
                text-transform: uppercase; 
                letter-spacing: 0.12em; 
                color: var(--pm-muted); 
                margin: 0 0 2rem; 
                font-weight: 600;
                border-bottom: 1px solid var(--pm-border); 
                padding-bottom: 1rem;
            }

            /* About Section */
            .pm-about {
                font-size: 1.1rem;
                line-height: 1.8;
                color: var(--pm-text-light);
            }
            
            .pm-about p {
                margin-bottom: 1.25rem;
            }
            
            .pm-about p:last-child {
                margin-bottom: 0;
            }
            
            .pm-about strong {
                color: var(--pm-text);
                font-weight: 600;
            }

            /* Skills Section */
            .pm-skills { 
                display: flex; 
                flex-wrap: wrap; 
                gap: 0.75rem; 
            }
            
            .pm-skill { 
                font-size: 0.9rem; 
                color: var(--pm-text); 
                padding: 0.4rem 1rem; 
                background: var(--pm-light); 
                border-radius: 2rem;
                transition: all 0.2s ease;
                border: 1px solid transparent;
            }
            
            .pm-skill:hover {
                background: var(--pm-border);
                transform: translateY(-1px);
            }

            /* Projects Section */
            .pm-projects { 
                display: flex; 
                flex-direction: column; 
                gap: 2.5rem; 
            }
            
            .pm-project {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                transition: all 0.2s ease;
            }
            
            .pm-project-image {
                width: 100%;
                max-height: 240px;
                overflow: hidden;
                border-radius: 12px;
                background: var(--pm-light);
                margin-bottom: 0.5rem;
            }
            
            .pm-project-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.4s ease;
            }
            
            .pm-project-image:hover img {
                transform: scale(1.02);
            }
            
            .pm-project-image-placeholder {
                width: 100%;
                height: 180px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--pm-light);
                color: var(--pm-muted);
                font-size: 0.9rem;
                border-radius: 12px;
            }
            
            .pm-project-header { 
                display: flex; 
                justify-content: space-between; 
                align-items: baseline; 
                flex-wrap: wrap;
                gap: 0.75rem;
            }
            
            .pm-project-title { 
                font-size: 1.35rem; 
                font-weight: 600; 
                margin: 0; 
                letter-spacing: -0.01em;
            }
            
            .pm-project-link { 
                font-size: 0.85rem; 
                font-weight: 500; 
                color: var(--pm-muted);
                border-bottom: none;
            }
            
            .pm-project-link:hover {
                color: var(--pm-accent);
                opacity: 1;
            }
            
            .pm-project-desc { 
                font-size: 1rem; 
                color: var(--pm-muted); 
                line-height: 1.7; 
                margin: 0; 
            }

            /* List Items (Experience, Education, Certifications) */
            .pm-list { 
                display: flex; 
                flex-direction: column; 
                gap: 2rem; 
            }
            
            .pm-item { 
                display: grid; 
                grid-template-columns: 1fr 3fr; 
                gap: 2rem; 
            }
            
            @media (max-width: 640px) {
                .pm-item { 
                    grid-template-columns: 1fr; 
                    gap: 0.5rem; 
                }
            }
            
            .pm-item-meta { 
                color: var(--pm-muted); 
                font-size: 0.85rem; 
                font-weight: 500; 
                line-height: 1.5;
            }
            
            .pm-item-content { 
                display: flex; 
                flex-direction: column; 
                gap: 0.25rem; 
            }
            
            .pm-item-title { 
                font-size: 1.1rem; 
                font-weight: 600; 
                margin: 0; 
                line-height: 1.4;
            }
            
            .pm-item-subtitle { 
                font-size: 0.95rem; 
                color: var(--pm-text); 
                font-weight: 500; 
                margin: 0; 
                line-height: 1.5;
            }
            
            .pm-item-desc { 
                font-size: 0.95rem; 
                color: var(--pm-muted); 
                line-height: 1.7; 
                margin: 0.5rem 0 0; 
                white-space: pre-line;
            }

            /* Certifications Grid */
            .pm-cert-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 1rem;
            }
            
            .pm-cert-card {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: var(--pm-light);
                border-radius: 12px;
                transition: all 0.2s ease;
            }
            
            .pm-cert-card:hover {
                background: var(--pm-border);
                transform: translateY(-2px);
            }
            
            .pm-cert-icon {
                font-size: 1.5rem;
            }
            
            .pm-cert-info {
                flex: 1;
            }
            
            .pm-cert-name {
                font-weight: 600;
                font-size: 0.95rem;
                margin-bottom: 0.25rem;
                color: var(--pm-text);
            }
            
            .pm-cert-details {
                font-size: 0.8rem;
                color: var(--pm-muted);
            }

            /* Contact Section */
            .pm-contact-grid { 
                display: flex; 
                flex-direction: column; 
                gap: 1rem; 
                font-size: 1rem; 
            }
            
            .pm-contact-item {
                display: flex;
                align-items: baseline;
                gap: 1rem;
                flex-wrap: wrap;
                padding: 0.5rem 0;
                border-bottom: 1px solid var(--pm-border);
            }
            
            .pm-contact-label {
                width: 80px;
                font-weight: 500;
                color: var(--pm-muted);
                font-size: 0.85rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }
            
            .pm-contact-value {
                flex: 1;
                color: var(--pm-text);
            }
            
            .pm-contact-value a {
                color: var(--pm-text);
                border-bottom: none;
            }
            
            .pm-contact-value a:hover {
                color: var(--pm-muted);
                opacity: 1;
            }
            
            @media (max-width: 640px) {
                .pm-contact-item {
                    flex-direction: column;
                    gap: 0.25rem;
                }
                .pm-contact-label {
                    width: auto;
                }
            }

            /* Footer */
            .pm-footer { 
                margin-top: 5rem; 
                padding-top: 2rem; 
                border-top: 1px solid var(--pm-border); 
                text-align: center; 
                font-size: 0.8rem; 
                color: var(--pm-muted); 
            }
            
            /* Scrollbar */
            .tmpl-pm::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            .tmpl-pm::-webkit-scrollbar-track {
                background: var(--pm-light);
            }
            
            .tmpl-pm::-webkit-scrollbar-thumb {
                background: var(--pm-border);
                border-radius: 3px;
            }
            
            .tmpl-pm::-webkit-scrollbar-thumb:hover {
                background: var(--pm-muted);
            }
            
            /* Utility Classes */
            .pm-hidden {
                display: none;
            }
        </style>
    `;

    // Build HTML dynamically
    const html = `
        <div class="tmpl-pm">
            <div class="pm-container">
                <header class="pm-hero" data-portify-section="header">
                    <!-- Profile Image with drag & drop support -->
                    <div class="pm-avatar-container" id="pm-avatar-dropzone" title="Click or drag image to change profile photo">
                        ${bi.profileImage && bi.profileImage.trim() !== "" ?
                            `<img src="${e(bi.profileImage)}" class="pm-avatar portify-profile-image" alt="${e(bi.name || 'Profile')}">` :
                            `<div class="pm-avatar-placeholder">${getInitials(bi.name)}</div>`
                        }
                    </div>
                    
                    <div>
                        <h1 class="pm-name">${e(bi.name || 'Your Name')}</h1>
                        ${bi.title ? `<p class="pm-role">${e(bi.title)}</p>` : ''}
                        ${bi.location ? `<p class="pm-location">📍 ${e(bi.location)}</p>` : ''}
                    </div>
                    
                    ${bi.tagline ? `<p class="pm-tagline">${e(bi.tagline)}</p>` : ''}
                    
                    ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").length > 0 ? `
                        <div class="pm-social">
                            ${Object.entries(social).filter(([, v]) => v && v.trim() !== "").map(([platform, url]) => 
                                `<a href="${e(url)}" target="_blank" rel="noopener noreferrer">${formatSocialLabel(platform)}</a>`
                            ).join('')}
                        </div>
                    ` : ''}
                </header>

                <main>
                    <!-- About Section -->
                    ${hasAboutSection ? `
                        <section class="pm-section" data-portify-section="about">
                            <h2 class="pm-section-title">About</h2>
                            <div class="pm-about">
                                ${about.introduction ? `<p><strong>Introduction</strong><br>${e(about.introduction).replace(/\n/g, '<br>')}</p>` : ''}
                                ${about.careerSummary ? `<p><strong>Career Summary</strong><br>${e(about.careerSummary).replace(/\n/g, '<br>')}</p>` : ''}
                                ${bi.bio && !about.introduction && !about.careerSummary ? `<p>${e(bi.bio).replace(/\n/g, '<br>')}</p>` : ''}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Projects Section -->
                    ${projects.length > 0 ? `
                        <section class="pm-section" data-portify-section="projects">
                            <h2 class="pm-section-title">Selected Work</h2>
                            <div class="pm-projects">
                                ${projects.map(p => `
                                    <div class="pm-project">
                                        ${p.image ? `
                                            <div class="pm-project-image">
                                                <img src="${e(p.image)}" alt="${e(p.title)}" loading="lazy">
                                            </div>
                                        ` : ''}
                                        <div class="pm-project-header">
                                            <h3 class="pm-project-title">${e(p.title)}</h3>
                                            ${p.link ? `<a class="pm-project-link" href="${e(p.link)}" target="_blank" rel="noopener noreferrer">View Project →</a>` : ''}
                                        </div>
                                        ${p.description ? `<p class="pm-project-desc">${e(p.description)}</p>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Experience Section -->
                    ${experience.length > 0 ? `
                        <section class="pm-section" data-portify-section="experience">
                            <h2 class="pm-section-title">Experience</h2>
                            <div class="pm-list">
                                ${experience.map(exp => `
                                    <div class="pm-item">
                                        <div class="pm-item-meta">${e(exp.duration || 'Present')}</div>
                                        <div class="pm-item-content">
                                            <h3 class="pm-item-title">${e(exp.role || 'Role')}</h3>
                                            <p class="pm-item-subtitle">${e(exp.company || 'Company')}</p>
                                            ${(exp.description || exp.keyAchievements) ? 
                                                `<p class="pm-item-desc">${e(exp.description || exp.keyAchievements).replace(/\n/g, '<br>')}</p>` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Skills Section -->
                    ${skills.length > 0 ? `
                        <section class="pm-section" data-portify-section="skills">
                            <h2 class="pm-section-title">Expertise</h2>
                            <div class="pm-skills">
                                ${skills.map(s => `<span class="pm-skill">${e(s.name)}</span>`).join('')}
                            </div>
                        </section>
                    ` : ''}

                    <!-- Education Section -->
                    ${edu.length > 0 ? `
                        <section class="pm-section" data-portify-section="education">
                            <h2 class="pm-section-title">Education</h2>
                            <div class="pm-list">
                                ${edu.map(ed => `
                                    <div class="pm-item">
                                        <div class="pm-item-meta">${e(ed.year || '')}</div>
                                        <div class="pm-item-content">
                                            <h3 class="pm-item-title">${e(ed.degree || 'Degree')}</h3>
                                            <p class="pm-item-subtitle">${e(ed.school || 'Institution')}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                    ` : ''}
                    
                    <!-- Certifications Section -->
                    ${certs.length > 0 ? `
                        <section class="pm-section" data-portify-section="certifications">
                            <h2 class="pm-section-title">Certifications</h2>
                            <div class="pm-cert-grid">
                                ${certs.map(c => `
                                    <div class="pm-cert-card">
                                        <div class="pm-cert-icon">📜</div>
                                        <div class="pm-cert-info">
                                            <div class="pm-cert-name">${e(c.name)}</div>
                                            <div class="pm-cert-details">
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
                        <section class="pm-section" data-portify-section="contact">
                            <h2 class="pm-section-title">Contact</h2>
                            <div class="pm-contact-grid">
                                ${(contact.email || bi.email) ? `
                                    <div class="pm-contact-item">
                                        <span class="pm-contact-label">Email</span>
                                        <span class="pm-contact-value">
                                            <a href="mailto:${e(contact.email || bi.email)}">${e(contact.email || bi.email)}</a>
                                        </span>
                                    </div>
                                ` : ''}
                                ${contact.phone ? `
                                    <div class="pm-contact-item">
                                        <span class="pm-contact-label">Phone</span>
                                        <span class="pm-contact-value">${e(contact.phone)}</span>
                                    </div>
                                ` : ''}
                                ${(contact.address || bi.location) ? `
                                    <div class="pm-contact-item">
                                        <span class="pm-contact-label">Location</span>
                                        <span class="pm-contact-value">${e(contact.address || bi.location)}</span>
                                    </div>
                                ` : ''}
                            </div>
                        </section>
                    ` : ''}
                </main>

                <footer class="pm-footer">
                    © ${new Date().getFullYear()} ${e(bi.name || 'Your Name')}. All rights reserved.
                </footer>
            </div>
        </div>
    `;

    // Enable drag & drop for profile image after rendering
    setTimeout(() => {
        const avatarZone = document.getElementById('pm-avatar-dropzone');
        if (avatarZone && window.portfolioRenderer?.enableDragAndDrop) {
            window.portfolioRenderer.enableDragAndDrop(avatarZone, (imageDataUrl) => {
                const imgElement = avatarZone.querySelector('.pm-avatar, .pm-avatar-placeholder');
                if (imgElement) {
                    const newImg = document.createElement('img');
                    newImg.src = imageDataUrl;
                    newImg.className = 'pm-avatar portify-profile-image';
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
                        const imgElement = avatarZone.querySelector('.pm-avatar, .pm-avatar-placeholder');
                        if (imgElement) {
                            const newImg = document.createElement('img');
                            newImg.src = imageDataUrl;
                            newImg.className = 'pm-avatar portify-profile-image';
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
    window.demoPureMinimalData = {
        basicInfo: {
            profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
            name: "James Wilson",
            title: "Product Designer & Creative Director",
            tagline: "Designing meaningful digital experiences with a focus on simplicity and usability.",
            location: "New York, NY",
            bio: "Designer and creative leader with over a decade of experience in product design."
        },
        about: {
            introduction: "I'm James — a product designer who believes in the power of simple, human-centered design. My approach combines aesthetics with functionality to create products that people love to use.",
            careerSummary: "Over the past 10 years, I've led design teams at startups and Fortune 500 companies, shipped products used by millions, and mentored emerging designers. My work focuses on creating intuitive interfaces that solve real problems."
        },
        skills: [
            { name: "Product Design" }, 
            { name: "UI/UX" }, 
            { name: "Figma" }, 
            { name: "Design Systems" },
            { name: "User Research" },
            { name: "Prototyping" },
            { name: "Visual Design" }
        ],
        projects: [
            { 
                title: "Flow Dashboard", 
                description: "A comprehensive analytics dashboard that helps teams visualize data in real-time. Features customizable widgets and intuitive navigation.", 
                link: "https://example.com/flow", 
                image: "" 
            },
            { 
                title: "Nexus Design System", 
                description: "A scalable design system used by 50+ product teams to maintain consistency across applications.", 
                link: "https://example.com/nexus", 
                image: "" 
            },
            { 
                title: "Portify", 
                description: "Portfolio builder platform that helps creatives showcase their work beautifully.", 
                link: "https://portify.app", 
                image: "" 
            }
        ],
        experience: [
            { 
                company: "Creative Studio", 
                role: "Lead Product Designer", 
                duration: "2021 – Present", 
                description: "Lead design for flagship products, established design system, mentored junior designers, and collaborated with product managers to define product strategy." 
            },
            { 
                company: "Design Agency", 
                role: "Senior Product Designer", 
                duration: "2017 – 2021", 
                description: "Designed and shipped 15+ digital products for clients ranging from startups to enterprise companies. Conducted user research and usability testing." 
            },
            { 
                company: "Tech Startup", 
                role: "UI/UX Designer", 
                duration: "2014 – 2017", 
                description: "Designed mobile and web applications, created interactive prototypes, and collaborated with developers to ensure design fidelity." 
            }
        ],
        education: [
            { school: "Rhode Island School of Design", degree: "BFA in Graphic Design", year: "2010–2014" }
        ],
        certifications: [
            { name: "Advanced Product Design", issuer: "IDEO U", year: "2023" },
            { name: "UX Research Methods", issuer: "Nielsen Norman Group", year: "2022" }
        ],
        socialLinks: {
            github: "https://github.com/jameswilson",
            linkedin: "https://linkedin.com/in/jameswilson",
            twitter: "https://twitter.com/jameswilson",
            dribbble: "https://dribbble.com/jameswilson"
        },
        contact: {
            email: "james@wilson.design",
            phone: "+1 (555) 123-4567",
            address: "New York, NY"
        }
    };
}
