/**
 * Portify Preview Renderer — Complete Rewrite
 * Renders ALL 9 portfolio sections in real-time as the user fills the form.
 * Every storageManager update triggers an immediate re-render.
 */

class PreviewRenderer {
    constructor() {
        this.container = document.getElementById('live-preview-container');
        this.bound = false;
        this.tryInit();
    }

    tryInit() {
        if (!this.container) {
            setTimeout(() => this.tryInit(), 150);
            return;
        }
        this.bindEvents();
        if (window.storageManager) {
            this.render(window.storageManager.data);
        } else {
            const wait = setInterval(() => {
                if (window.storageManager) {
                    clearInterval(wait);
                    this.render(window.storageManager.data);
                }
            }, 100);
        }
    }

    bindEvents() {
        if (this.bound) return;
        this.bound = true;
        window.addEventListener('portify-data-updated', (e) => {
            this.render(e.detail?.fullData || window.storageManager?.data);
        });
    }

    render(data) {
        if (!this.container) return;
        const d = data || {};
        const bi = d.basicInfo || {};
        const name = bi.name || '';
        const intro = (d.about || {}).introduction || (d.about || {}).careerSummary || '';

        // Empty state
        if (!name && !intro) {
            this.container.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:2rem;text-align:center;color:#94a3b8;">
                    <div style="font-size:3rem;margin-bottom:1rem;">✍️</div>
                    <h3 style="margin:0 0 0.5rem;color:#64748b;font-size:1rem;font-weight:600;">Start typing to see your preview</h3>
                    <p style="margin:0;font-size:0.85rem;">Fill in your name on the Basic Info tab</p>
                </div>`;
            return;
        }

        // Use the dynamic renderPortfolio function for live preview
        const template = d.template || 'modern-horizon';
        
        if (window.renderPortfolio) {
            try {
                const html = window.renderPortfolio(d, template);
                this.container.innerHTML = `<div style="height:100%;overflow-y:auto;width:100%;">${html}</div>`;
                return;
            } catch(err) {
                console.warn('[Preview] renderPortfolio failed, using fallback:', err.message);
            }
        }

        // Full-fidelity fallback — renders ALL sections
        this.renderAllSections(d);
    }

    renderAllSections(d) {
        const bi = d.basicInfo || {};
        const about = d.about || {};
        const skills = (d.skills || []).filter(s => s.name);
        const projects = (d.projects || []).filter(p => p.title);
        const experience = (d.experience || []).filter(e => e.company || e.role);
        const education = (d.education || []).filter(e => e.school || e.degree);
        const certs = (d.certifications || []).filter(c => c.name);
        const social = d.socialLinks || {};
        const contact = d.contact || {};

        const e = s => (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const section = (label, content, color = '#6366f1') =>
            content ? `<div style="padding:0.75rem 1rem 0.25rem;">
                <p style="font-size:0.65rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:${color};margin:0 0 0.5rem;">${label}</p>
                ${content}
            </div><hr style="margin:0;border:none;border-top:1px solid #f1f5f9;">` : '';

        const badge = text => `<span style="display:inline-block;background:#f1f5f9;border:1px solid #e2e8f0;padding:2px 8px;border-radius:4px;font-size:0.7rem;margin:2px;">${e(text)}</span>`;

        this.container.innerHTML = `
        <div style="font-family:'Inter',sans-serif;background:#fff;height:100%;overflow-y:auto;color:#0f172a;font-size:13px;">

            <!-- HERO -->
            <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 100%);padding:1.5rem 1rem;text-align:center;color:white;">
                ${bi.profileImage ? `<img src="${bi.profileImage}" style="width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,0.4);margin-bottom:0.6rem;display:block;margin-left:auto;margin-right:auto;">` : ''}
                <h2 style="margin:0;font-size:1.05rem;font-weight:700;letter-spacing:-0.01em;">${e(bi.name) || 'Your Name'}</h2>
                ${bi.title ? `<p style="margin:0.2rem 0 0;font-size:0.75rem;opacity:0.8;">${e(bi.title)}</p>` : ''}
                ${bi.tagline ? `<p style="margin:0.35rem 0 0;font-size:0.7rem;opacity:0.6;font-style:italic;">${e(bi.tagline)}</p>` : ''}
            </div>

            ${section('About Me',
                (about.introduction || about.careerSummary)
                    ? `<p style="margin:0;line-height:1.6;color:#475569;font-size:0.78rem;">${e(about.introduction || about.careerSummary)}</p>`
                    : ''
            )}

            ${section('Skills',
                skills.length
                    ? `<div style="display:flex;flex-wrap:wrap;gap:3px;">${skills.map(s => badge(s.name)).join('')}</div>`
                    : ''
            )}

            ${section('Projects',
                projects.length
                    ? projects.map(p => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.5rem 0.6rem;margin-bottom:0.4rem;">
                            <p style="font-weight:600;font-size:0.78rem;margin:0 0 0.15rem;color:#1e293b;">${e(p.title)}</p>
                            ${p.description ? `<p style="font-size:0.7rem;color:#64748b;margin:0 0 0.2rem;line-height:1.5;">${e(p.description.substring(0,80))}${p.description.length > 80 ? '…' : ''}</p>` : ''}
                            ${p.link ? `<a href="${e(p.link)}" style="font-size:0.68rem;color:#6366f1;text-decoration:none;" target="_blank">↗ ${e(p.link.replace(/^https?:\/\//,'').substring(0,30))}</a>` : ''}
                        </div>`).join('')
                    : ''
            )}

            ${section('Experience',
                experience.length
                    ? experience.map(ex => `
                        <div style="border-left:2px solid #6366f1;padding-left:0.6rem;margin-bottom:0.6rem;">
                            <p style="font-weight:600;font-size:0.78rem;margin:0;color:#1e293b;">${e(ex.role || '')}</p>
                            <p style="font-size:0.7rem;color:#6366f1;margin:0.1rem 0;">${e(ex.company || '')}</p>
                            ${ex.duration ? `<p style="font-size:0.65rem;color:#94a3b8;margin:0.1rem 0;">${e(ex.duration)}</p>` : ''}
                            ${ex.description ? `<p style="font-size:0.7rem;color:#64748b;margin:0.2rem 0 0;line-height:1.5;">${e(ex.description.substring(0,80))}${ex.description.length > 80 ? '…' : ''}</p>` : ''}
                        </div>`).join('')
                    : ''
            )}

            ${section('Education',
                education.length
                    ? education.map(ed => `
                        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:0.4rem 0.6rem;margin-bottom:0.4rem;">
                            <p style="font-weight:600;font-size:0.78rem;margin:0;color:#1e293b;">${e(ed.degree || '')}</p>
                            <p style="font-size:0.7rem;color:#64748b;margin:0.1rem 0 0;">${e(ed.school || '')}${ed.year ? ' · ' + e(ed.year) : ''}</p>
                        </div>`).join('')
                    : ''
            )}

            ${section('Certifications',
                certs.length
                    ? certs.map(c => `
                        <div style="display:flex;align-items:center;gap:0.4rem;margin-bottom:0.35rem;">
                            <span style="color:#6366f1;font-size:0.8rem;">🎓</span>
                            <div>
                                <p style="font-weight:600;font-size:0.75rem;margin:0;color:#1e293b;">${e(c.name)}</p>
                                ${c.issuer ? `<p style="font-size:0.68rem;color:#64748b;margin:0;">${e(c.issuer)}${c.year ? ' · ' + e(c.year) : ''}</p>` : ''}
                            </div>
                        </div>`).join('')
                    : ''
            )}

            ${section('Social Links',
                Object.entries(social).some(([,v]) => v)
                    ? `<div style="display:flex;flex-wrap:wrap;gap:4px;">
                        ${Object.entries(social).filter(([,v]) => v).map(([k,v]) =>
                            `<a href="${e(v)}" target="_blank" style="font-size:0.68rem;color:#6366f1;text-decoration:none;background:#eef2ff;padding:2px 7px;border-radius:4px;border:1px solid #e0e7ff;">${k}</a>`
                        ).join('')}
                    </div>`
                    : ''
            )}

            ${section('Contact',
                (contact.email || contact.phone || contact.address)
                    ? `<div style="display:flex;flex-direction:column;gap:0.25rem;">
                        ${contact.email ? `<p style="margin:0;font-size:0.75rem;color:#475569;">📧 ${e(contact.email)}</p>` : ''}
                        ${contact.phone ? `<p style="margin:0;font-size:0.75rem;color:#475569;">📞 ${e(contact.phone)}</p>` : ''}
                        ${contact.address ? `<p style="margin:0;font-size:0.75rem;color:#475569;">📍 ${e(contact.address)}</p>` : ''}
                    </div>`
                    : ''
            )}

            <div style="height:2rem;"></div>
        </div>`;
    }
}

// Boot
const initPreview = () => {
    if (window.previewRenderer) return;
    window.previewRenderer = new PreviewRenderer();
    console.log('%c[Portify] Preview Engine: READY ✓', 'color: #10b981; font-weight: bold;');
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPreview);
} else {
    initPreview();
}
