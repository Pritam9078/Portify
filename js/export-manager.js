/**
 * Portify Export Manager
 * Generates standalone HTML files using the embedded TemplateEngine.
 */

window.exportManager = {
    /**
     * Generates a standalone HTML string for a portfolio
     * @param {Object} data - Full portfolio data
     * @returns {string} - Complete HTML document
     */
    generateStandaloneHTML(data) {
        const templateId = data.template || 'modern-horizon';

        // Use the professional standardized renderer
        // This already includes global CSS and template-specific CSS
        const portfolioContent = window.renderPortfolio(data, templateId);

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.escapeHtml(data.basicInfo?.name || 'My Portfolio')} | Portify</title>
    
    <!-- Professional Fonts via Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;700;800&family=Playfair+Display:wght@700;900&display=swap" rel="stylesheet">
    
    <!-- Global Icon Support -->
    <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>

    <style>
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
            margin: 0; 
            padding: 0; 
            min-height: 100vh;
            background: #000; /* Fallback for dark themes */
            color: #fff;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>
<body>
    ${portfolioContent}
</body>
</html>`;
    },

    /**
     * Triggers a download of the HTML portfolio
     * @param {Object} data - Portfolio data from storageManager
     */
    async downloadStandaloneHTML(data) {
        try {
            const html = this.generateStandaloneHTML(data);
            
            // Generate a unique filename with timestamp to prevent browser confusion
            const timestamp = Math.floor(Date.now() / 1000);
            const rawName = data.basicInfo.name || 'portfolio';
            const safeName = rawName.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
            const fileName = `portify-${safeName}-${timestamp}.html`;
            
            // Explicitly set the MIME type with charset
            const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = fileName;
            
            document.body.appendChild(a);
            a.click();
            
            // Cleanup with a slight delay to ensure the browser registers the click
            setTimeout(() => {
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            }, 100);
            
            window.Toast?.success('Export Successful', `Downloaded as: ${fileName}`);
        } catch (error) {
            console.error('Export failed:', error);
            window.Toast?.error('Export Failed', 'An unexpected error occurred during generation.');
        }
    },

    /**
     * Escapes HTML special characters
     * @param {string} str - String to escape
     * @returns {string} - Escaped string
     */
    escapeHtml(str) {
        if (!str) return '';
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
};
