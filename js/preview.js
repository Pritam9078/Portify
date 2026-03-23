/**
 * Live Preview Module for Portify
 * Renders a simplified "mini" version of the portfolio in the right panel.
 */

document.addEventListener('DOMContentLoaded', () => {
    const previewContainer = document.getElementById('live-preview-container');

    // Listen for data changes
    window.addEventListener('portify-data-saved', (e) => {
        const data = e.detail;
        renderPreview(data);
    });

    function renderPreview(data) {
        if (!previewContainer) return;

        const { basicInfo, about, skills, projects, template } = data;

        const html = `
            <div class="mini-portfolio template-${template}">
                <!-- Header -->
                <header style="padding: 1rem; border-bottom: 1px solid var(--border); text-align: center;">
                    ${basicInfo.profileImage ? `<img src="${basicInfo.profileImage}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover;">` : ''}
                    <h3 style="margin: 0.5rem 0 0.1rem; font-size: 0.875rem;">${basicInfo.name || 'Your Name'}</h3>
                    <p style="font-size: 0.65rem; color: var(--text-muted);">${basicInfo.title || 'Professional Title'}</p>
                </header>

                <!-- Profile Section -->
                <section style="padding: 1rem; font-size: 0.65rem;">
                    <p style="font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--primary);">About</p>
                    <p style="color: var(--text-muted);">${about.introduction || 'Add your introduction in the About section...'}</p>
                </section>

                <!-- Skills Section -->
                ${skills.length > 0 ? `
                <section style="padding: 1rem; font-size: 0.65rem; background: var(--background);">
                    <p style="font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--primary);">Skills</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 4px;">
                        ${skills.map(s => `<span style="background: var(--surface); border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px;">${s.name}</span>`).join('')}
                    </div>
                </section>
                ` : ''}

                <!-- Projects Section -->
                ${projects.length > 0 ? `
                <section style="padding: 1rem; font-size: 0.65rem;">
                    <p style="font-weight: 700; text-transform: uppercase; margin-bottom: 0.5rem; color: var(--primary);">Projects</p>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${projects.map(p => `
                            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 6px;">
                                <p style="font-weight: 600; margin-bottom: 2px;">${p.title || 'Project Title'}</p>
                                <p style="font-size: 0.55rem; color: var(--text-muted);">${p.description ? p.description.substring(0, 40) + '...' : ''}</p>
                            </div>
                        `).join('')}
                    </div>
                </section>
                ` : ''}
            </div>
        `;

        previewContainer.innerHTML = html;
        applyPreviewStyles();
    }

    function applyPreviewStyles() {
        // Add some basic styles for the mini-portfolio if needed
        const styleId = 'mini-preview-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                .mini-portfolio {
                    font-family: 'Inter', sans-serif;
                    background: var(--surface);
                    height: 100%;
                    overflow-y: auto;
                    color: var(--text-main);
                }
                .template-creative { border-top: 4px solid var(--secondary); }
                .template-modern { border-top: 4px solid var(--primary); }
                .template-developer { border-top: 4px solid var(--accent); }
            `;
            document.head.appendChild(style);
        }
    }

    // Initial render
    renderPreview(window.storageManager.data);
});
