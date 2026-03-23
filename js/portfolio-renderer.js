/**
 * Portify Portfolio Renderer
 * Populates templates with user data dynamically.
 */

window.renderPortfolio = function(data, template) {
    if (!data) return '<div style="padding:2rem;color:#ef4444;">No data provided</div>';
    
    const tpl = template || data.template || 'modern-horizon';

    let html = '';
    // Route to specific template rendering functions
    if (tpl === 'modern-horizon' && window.renderModernHorizon) html = window.renderModernHorizon(data);
    else if (tpl === 'code-pro' && window.renderCodePro) html = window.renderCodePro(data);
    else if (tpl === 'pure-minimal' && window.renderPureMinimal) html = window.renderPureMinimal(data);
    else if (tpl === 'artistic' && window.renderArtisticStudio) html = window.renderArtisticStudio(data);
    else if (tpl === 'studio-bold' && window.renderExecutiveElite) html = window.renderExecutiveElite(data);
    else if (tpl === 'aetherium' && window.renderAetherium) html = window.renderAetherium(data);
    else if (window.renderModernHorizon) html = window.renderModernHorizon(data); // Fallback
    else return '<div style="padding:2rem;color:#ef4444;">Template renderer not found</div>';

    const globalCss = window.portfolioRenderer.getGlobalCss ? window.portfolioRenderer.getGlobalCss() : '';
    return globalCss + `<div class="preview-container">${html}</div>`;
};

// Utilities for template renderers
window.portfolioRenderer = {
    renderPortfolio: window.renderPortfolio,
    
    // Helper to safely escape HTML to prevent XSS and broken layouts
    escapeHtml: function(unsafe) {
        if (!unsafe) return '';
        return (unsafe + '').replace(/[&<"']/g, function(m) {
            switch (m) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#039;';
            }
        });
    },

    // Helper to format dates
    formatDate: function(dateStr) {
        if (!dateStr) return '';
        return this.escapeHtml(dateStr);
    },

    // Global CSS prepended to every template
    getGlobalCss: function() {
        return `
        <style>
            /* Portify Global Image Normalization */
            .portify-profile-image {
                width: 100%;
                max-width: 250px; /* Fixed max width for large screens */
                aspect-ratio: 1 / 1;
                object-fit: cover;
                overflow: hidden;
                display: block;
            }
            @media (max-width: 1024px) {
                .portify-profile-image { max-width: 200px; }
            }
            @media (max-width: 768px) {
                .portify-profile-image { max-width: 160px; }
            }
            @media (max-width: 480px) {
                .portify-profile-image { max-width: 130px; }
            }
            
            /* Preview Container Limit */
            .preview-container {
                max-width: 1200px;
                margin: 0 auto;
                background: white; /* Base fallback */
            }

            /* ─── PROFESSIONAL PRINT / PDF CV OPTIMIZATION ─── */
            @media print {
                /* General Print Reset */
                @page {
                    margin: 15mm;
                    size: A4;
                }

                body {
                    background: white !important;
                    color: #1a1a1a !important;
                    font-family: 'Inter', -apple-system, sans-serif !important;
                }

                .preview-container {
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    background: white !important;
                }

                /* Layout Reordering via Flexbox */
                .tmpl-mh .ae-container,
                .tmpl-cp .ae-container,
                .tmpl-pm .pm-container,
                .tmpl-art .art-wrapper,
                .tmpl-ee .ee-container,
                .tmpl-aetherium .ae-container {
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 1.5rem !important;
                }

                /* Universal Section Ordering */
                [data-portify-section="header"] { order: 1 !important; border-bottom: 2px solid #333 !important; padding-bottom: 1rem !important; margin-bottom: 1rem !important; }
                [data-portify-section="about"] { order: 2 !important; }
                [data-portify-section="experience"] { order: 3 !important; }
                [data-portify-section="skills"] { order: 4 !important; }
                [data-portify-section="education"] { order: 5 !important; }
                [data-portify-section="projects"] { order: 6 !important; }
                [data-portify-section="certifications"] { order: 7 !important; }
                [data-portify-section="contact"] { order: 8 !important; border-top: 1px solid #eee !important; padding-top: 1rem !important; }

                /* Hide Interactive/Useless Elements */
                .ae-bg-animation, .ae-theme-toggle, .preview-controls, .no-print, 
                .cp-terminal-header, .mh-hero-bg, .art-sidebar::before {
                    display: none !important;
                }

                /* Block Normalization */
                section, .ae-section, .art-section, .ee-section, .pm-section, .mh-section {
                    display: block !important;
                    width: 100% !important;
                    margin-bottom: 1.5rem !important;
                    page-break-inside: avoid;
                    break-inside: avoid;
                }

                /* Template-Specific Stripping (Making them look like a Resume) */
                .art-sidebar, .art-main, .ae-hero, .ae-about-card, .ae-project-card, 
                .ee-hero, .pm-hero, .mh-hero-inner, .cp-terminal-body {
                    width: 100% !important;
                    max-width: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                    background: none !important;
                    border: none !important;
                    box-shadow: none !important;
                    backdrop-filter: none !important;
                }

                /* Typography Standardization */
                h1 { font-size: 24pt !important; margin-bottom: 5pt !important; text-align: left !important; }
                h2 { font-size: 16pt !important; border-bottom: 1px solid #ccc !important; padding-bottom: 3pt !important; margin-top: 15pt !important; margin-bottom: 10pt !important; color: #333 !important; text-transform: uppercase !important; letter-spacing: 1px !important; }
                h3 { font-size: 13pt !important; margin-bottom: 3pt !important; color: #000 !important; }
                p, li, div, span { font-size: 10pt !important; line-height: 1.4 !important; color: #444 !important; }

                /* List & Item Formatting */
                .art-timeline, .ae-timeline, .ee-list, .mh-list { 
                    display: block !important; 
                }
                .art-timeline-item, .ae-timeline-item, .ee-timeline-item, .mh-timeline-item {
                    border-left: 2px solid #ccc !important;
                    padding-left: 1rem !important;
                    margin-bottom: 1rem !important;
                }

                /* Skills / Tags Formatting */
                .ae-skills, .art-chips, .pm-skills, .mh-skills-grid, .ee-grid {
                    display: flex !important;
                    flex-wrap: wrap !important;
                    gap: 0.5rem !important;
                }
                .ae-skill, .art-chip, .pm-skill, .mh-skill-pill, .ee-skill-tag {
                    background: #f0f0f0 !important;
                    color: #333 !important;
                    padding: 3pt 8pt !important;
                    border-radius: 3pt !important;
                    border: 1px solid #ddd !important;
                    font-size: 9pt !important;
                }

                /* Image Optimization */
                .portify-profile-image {
                    max-width: 120px !important;
                    float: right !important;
                    margin-left: 1rem !important;
                    border: 1px solid #ccc !important;
                }

                /* Force Text Colors (Ignore template gradients) */
                .ae-name, .mh-name, .ee-heading-font, .art-name, .cp-name {
                    -webkit-text-fill-color: black !important;
                    background: none !important;
                    color: black !important;
                }

                /* Link preservation */
                a { color: #0044cc !important; text-decoration: none !important; }
                a[href^="http"]::after { content: " | " attr(href); font-size: 8pt; color: #666; }
            }
        </style>
        `;
    }
};
