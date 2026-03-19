/**
 * Template Engine for Portify
 * Transforms User Data + Template Definition into a live portfolio.
 */

const TemplateEngine = {
    /**
     * Renders a full portfolio
     * @param {Object} data - The user portfolio data
     * @param {Object} templateDef - { html, css } from templatesRegistry
     * @returns {string} - The final HTML with injected data and styles
     */
    render(data, templateDef) {
        if (!templateDef) return '<div style="padding: 2rem; color: #ef4444;">Template not found</div>';
        
        let html = templateDef.html;
        const css = templateDef.css;

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // 2. Map Basic Info
        this.mapBasicFields(doc, data);

        // 3. Map Lists
        this.renderList(doc, '#projects-grid', data.projects, this.getProjectItemHtml);
        this.renderList(doc, '#experience-list', data.experience, this.getExperienceItemHtml);
        this.renderList(doc, '#skills-grid', data.skills, this.getSkillItemHtml);
        this.renderList(doc, '#education-list', data.education, this.getEducationItemHtml);

        // 4. Map Social Links
        this.renderSocialLinks(doc, data.socialLinks);

        // 5. Handle Section Visibility
        this.autoHideSections(doc, data);

        // 6. Combine with Styles (Return as complete string)
        return `
            <style>
                ${css}
                /* Global resets for preview */
                body { margin: 0; padding: 0; }
                img { max-width: 100%; height: auto; }
                .hidden { display: none !important; }
            </style>
            <div class="template-render-root">
                ${doc.body.innerHTML}
            </div>
        `;
    },

    mapBasicFields(doc, data) {
        const mapping = {
            '#hero-name': data.basicInfo.name || 'Your Name',
            '#hero-title': data.basicInfo.title || 'Professional Title',
            '#hero-tagline': data.basicInfo.tagline || '',
            '#about-bio': data.about.introduction || data.about.careerSummary || data.basicInfo.bio || '',
            '#contact-email': data.contact.email || data.basicInfo.email || ''
        };

        for (const [selector, value] of Object.entries(mapping)) {
            const el = doc.querySelector(selector);
            if (el) el.textContent = value;
        }

        // ── Profile Image ────────────────────────────────────────────────────
        if (data.basicInfo && data.basicInfo.profileImage) {
            let profileImg = doc.querySelector('#profile-img');
            if (profileImg) {
                // Template has a dedicated slot
                profileImg.src = data.basicInfo.profileImage;
                profileImg.classList.remove('hidden');
            } else {
                // Dynamically inject avatar before the name heading
                const anchor = doc.querySelector('#hero-name') ||
                               doc.querySelector('header h1') ||
                               doc.querySelector('h1');
                if (anchor) {
                    const img = doc.createElement('img');
                    img.src = data.basicInfo.profileImage;
                    img.alt = data.basicInfo.name || 'Profile Photo';
                    img.id = 'injected-profile-img';
                    img.style.cssText = [
                        'width:100px', 'height:100px', 'border-radius:50%',
                        'object-fit:cover', 'display:block',
                        'margin:0 auto 1.25rem',
                        'border:3px solid rgba(255,255,255,0.2)',
                        'box-shadow:0 8px 24px rgba(0,0,0,0.3)'
                    ].join(';');
                    anchor.parentNode.insertBefore(img, anchor);
                }
            }
        }
    },

    renderList(doc, containerSelector, items, itemGenerator) {
        const container = doc.querySelector(containerSelector);
        if (!container) return;
        
        if (!items || items.length === 0) {
            container.closest('section')?.classList.add('hidden');
            return;
        }

        container.innerHTML = items.map(item => itemGenerator(item)).join('');
    },

    getProjectItemHtml(item) {
        return `
            <div class="project-card">
                ${item.image ? `<img src="${item.image}" alt="${item.title}" class="project-img">` : ''}
                <div class="project-content">
                    <h3 class="project-title">${item.title}</h3>
                    <p class="project-desc">${item.description}</p>
                    <div class="project-tags">
                        ${(item.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    ${item.link ? `<a href="${item.link}" target="_blank" class="project-link">View Project →</a>` : ''}
                </div>
            </div>
        `;
    },

    getExperienceItemHtml(item) {
        return `
            <div class="experience-item">
                <div class="exp-header">
                    <h3 class="exp-role">${item.role}</h3>
                    <span class="exp-duration">${item.duration}</span>
                </div>
                <div class="exp-company">${item.company}</div>
                <p class="exp-desc">${item.description}</p>
            </div>
        `;
    },

    getSkillItemHtml(item) {
        return `<span class="skill-badge">${item.name}</span>`;
    },

    getEducationItemHtml(item) {
        return `
            <div class="education-item">
                <h3 class="edu-degree">${item.degree}</h3>
                <div class="edu-school">${item.school}</div>
                <div class="edu-year">${item.year}</div>
            </div>
        `;
    },

    renderSocialLinks(doc, social) {
        const container = doc.querySelector('#hero-social');
        if (!container) return;

        const links = Object.entries(social)
            .filter(([_, url]) => url)
            .map(([platform, url]) => {
                const icons = {
                    github: 'solar:github-bold',
                    linkedin: 'solar:link-2-bold',
                    twitter: 'solar:letter-bold',
                    website: 'solar:globus-bold',
                    instagram: 'solar:camera-bold',
                    behance: 'solar:pen-new-square-bold',
                    dribbble: 'solar:basketball-bold'
                };
                return `<a href="${url}" target="_blank" class="social-icon">
                    <iconify-icon icon="${icons[platform] || 'solar:link-bold'}"></iconify-icon>
                </a>`;
            });

        container.innerHTML = links.join('');
    },

    autoHideSections(doc, data) {
        // Only hide About if none of the about fields are filled
        const hasAbout = data.about?.introduction || data.about?.description || data.about?.careerSummary || data.basicInfo?.bio;
        if (!hasAbout) {
            doc.querySelector('#about-section')?.classList.add('hidden');
        }
    }
};

window.TemplateEngine = TemplateEngine;
