/**
 * Portify Template Loader
 * Loads template HTML and CSS dynamically.
 */

window.templateLoader = {
    async loadTemplate(templateName) {
        const config = window.templatesRegistry[templateName];
        if (!config) return '<div class="error">Template not found</div>';

        // 1. Load CSS
        this.injectStyles(templateName, config.css);

        // 2. Return HTML
        return config.html;
    },

    injectStyles(templateName, css) {
        let styleTag = document.getElementById('template-style');
        if (!styleTag) {
            styleTag = document.createElement('style');
            styleTag.id = 'template-style';
            document.head.appendChild(styleTag);
        }
        styleTag.textContent = css;
    }
};
