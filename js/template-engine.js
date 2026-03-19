/**
 * Template Engine for Portify — Full 9-Section Renderer
 * Renders: Basic Info, About, Skills, Projects, Experience,
 *          Education, Certifications, Social Links, Contact
 */

const TemplateEngine = {
    render(data, templateDef) {
        if (!templateDef) return '<div style="padding:2rem;color:#ef4444;">Template not found</div>';

        const parser = new DOMParser();
        const doc = parser.parseFromString(templateDef.html, 'text/html');

        this.mapBasicFields(doc, data);
        this.renderProfileImage(doc, data);
        this.renderSocialLinks(doc, data.socialLinks || {});
        this.renderList(doc, '#projects-grid',        data.projects,        this.getProjectItemHtml);
        this.renderList(doc, '#experience-list',      data.experience,      this.getExperienceItemHtml);
        this.renderList(doc, '#skills-grid',          data.skills,          this.getSkillItemHtml);
        this.renderList(doc, '#education-list',       data.education,       this.getEducationItemHtml);
        this.renderList(doc, '#certifications-list',  data.certifications,  this.getCertItemHtml);
        this.renderContact(doc, data.contact || {}, data.basicInfo || {});
        this.setFooterYear(doc);
        this.autoHideSections(doc, data);

        return `
            <style>
                ${templateDef.css}
                body{margin:0;padding:0;}
                img{max-width:100%;height:auto;}
                .hidden{display:none!important;}
                a{transition:opacity 0.2s;}
            </style>
            <div class="template-render-root">
                ${doc.body.innerHTML}
            </div>`;
    },

    mapBasicFields(doc, data) {
        const bi = data.basicInfo || {};
        const ab = data.about || {};
        const mapping = {
            '#hero-name':    bi.name    || 'Your Name',
            '#hero-title':   bi.title   || 'Professional Title',
            '#hero-tagline': bi.tagline || '',
            '#about-bio':    ab.introduction || ab.careerSummary || bi.bio || ''
        };
        for (const [sel, val] of Object.entries(mapping)) {
            const el = doc.querySelector(sel);
            if (el) el.textContent = val;
        }
    },

    renderProfileImage(doc, data) {
        const src = data.basicInfo?.profileImage;
        const img = doc.querySelector('#profile-img');
        if (img) {
            if (src) {
                img.src = src;
                img.classList.remove('hidden');
            } else {
                img.classList.add('hidden');
            }
        } else if (src) {
            // Inject before #hero-name if no slot exists
            const anchor = doc.querySelector('#hero-name') || doc.querySelector('h1');
            if (anchor) {
                const injected = doc.createElement('img');
                injected.src = src;
                injected.alt = data.basicInfo?.name || 'Profile';
                injected.id = 'injected-profile-img';
                injected.style.cssText = 'width:96px;height:96px;border-radius:50%;object-fit:cover;display:block;margin:0 auto 1.25rem;border:3px solid rgba(255,255,255,0.2);box-shadow:0 8px 30px rgba(0,0,0,0.3);';
                anchor.parentNode.insertBefore(injected, anchor);
            }
        }
    },

    renderList(doc, containerSelector, items, itemGenerator) {
        const container = doc.querySelector(containerSelector);
        if (!container) return;
        const filtered = (items || []).filter(item => {
            if (!item) return false;
            // Keep item if at least one non-id field has a value
            return Object.entries(item).some(([k, v]) => k !== 'id' && v);
        });
        if (!filtered.length) {
            // Hide the closest section wrapper
            const section = container.closest('section') || container.closest('[id$="-section"]');
            section?.classList.add('hidden');
            return;
        }
        container.innerHTML = filtered.map(item => itemGenerator(item)).join('');
    },

    getProjectItemHtml(item) {
        const tags = (item.tags || []);
        return `
        <div class="project-card">
            <div class="project-content">
                <h3 class="project-title">${item.title || ''}</h3>
                <p class="project-desc">${item.description || ''}</p>
                ${tags.length ? `<div class="project-tags">${tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>` : ''}
                ${item.link ? `<a href="${item.link}" target="_blank" class="project-link">View Project →</a>` : ''}
            </div>
        </div>`;
    },

    getExperienceItemHtml(item) {
        return `
        <div class="experience-item">
            <div class="exp-header">
                <span class="exp-role">${item.role || ''}</span>
                <span class="exp-duration">${item.duration || ''}</span>
            </div>
            <div class="exp-company">${item.company || ''}</div>
            ${item.description ? `<p class="exp-desc">${item.description}</p>` : ''}
        </div>`;
    },

    getSkillItemHtml(item) {
        return `<span class="skill-badge">${item.name || ''}</span>`;
    },

    getEducationItemHtml(item) {
        return `
        <div class="education-item">
            <div class="edu-degree">${item.degree || ''}</div>
            <div class="edu-school">${item.school || ''}</div>
            ${item.year ? `<div class="edu-year">${item.year}</div>` : ''}
        </div>`;
    },

    getCertItemHtml(item) {
        return `
        <div class="cert-item">
            <span class="cert-icon">🎓</span>
            <div>
                <div class="cert-name">${item.name || ''}</div>
                ${item.issuer || item.year ? `<div class="cert-issuer">${[item.issuer, item.year].filter(Boolean).join(' · ')}</div>` : ''}
            </div>
        </div>`;
    },

    renderSocialLinks(doc, social) {
        const container = doc.querySelector('#hero-social');
        if (!container) return;
        const labels = { github:'GitHub', linkedin:'LinkedIn', twitter:'Twitter/X', website:'Website', instagram:'Instagram', behance:'Behance', dribbble:'Dribbble' };
        const links = Object.entries(social)
            .filter(([, url]) => url)
            .map(([platform, url]) =>
                `<a href="${url}" target="_blank" class="social-icon">${labels[platform] || platform}</a>`
            );
        container.innerHTML = links.join('');
    },

    renderContact(doc, contact, basicInfo) {
        const email = contact.email || basicInfo.email || '';
        const phone = contact.phone || basicInfo.phone || '';
        const address = contact.address || '';

        const set = (wrapId, elId, value, isLink) => {
            const wrap = doc.querySelector(`#${wrapId}`);
            if (!wrap) return;
            const el = doc.querySelector(`#${elId}`);
            if (value && el) {
                wrap.classList.remove('hidden');
                if (isLink) {
                    el.href = `mailto:${value}`;
                    el.textContent = value;
                } else {
                    el.textContent = value;
                }
                // Reveal parent sidebar-contact block if present
                const parent = doc.querySelector('#sidebar-contact-block');
                if (parent) parent.classList.remove('hidden');
            }
        };

        set('contact-email-wrap', 'contact-email', email, true);
        set('contact-phone-wrap', 'contact-phone', phone, false);
        set('contact-address-wrap', 'contact-address', address, false);

        // If no contact at all, hide the whole section
        if (!email && !phone && !address) {
            const section = doc.querySelector('#contact-section');
            section?.classList.add('hidden');
        }
    },

    setFooterYear(doc) {
        const el = doc.querySelector('#footer-year');
        if (el) el.textContent = new Date().getFullYear();
    },

    autoHideSections(doc, data) {
        const hasAbout = data.about?.introduction || data.about?.careerSummary || data.basicInfo?.bio;
        if (!hasAbout) doc.querySelector('#about-section')?.classList.add('hidden');
    }
};

window.TemplateEngine = TemplateEngine;
