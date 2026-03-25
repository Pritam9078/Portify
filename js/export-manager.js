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
     * Generates and downloads a professional PDF version of the portfolio
     * @param {string} elementId - ID of the container to capture
     * @param {string} name - Name for the filename
     */
    async downloadPDF(elementId, name = 'portfolio') {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error('Capture element not found:', elementId);
            return;
        }

        window.Toast?.info('Preparing PDF', 'Generating high-quality capture...');

        try {
            // Wait for fonts to be ready
            await document.fonts.ready;

            // Temporarily prepare element for clean capture (A4 standard)
            const originalStyles = {
                width: element.style.width,
                maxWidth: element.style.maxWidth,
                margin: element.style.margin,
                boxShadow: element.style.boxShadow
            };

            // Fix width to standard A4 pixels at 96dpi (794px) for consistency
            element.style.width = '794px';
            element.style.maxWidth = '794px';
            element.style.margin = '0 auto';
            element.style.boxShadow = 'none';

            const canvas = await html2canvas(element, {
                scale: 2, // High DPI for sharp text
                useCORS: true,
                allowTaint: false,
                logging: false,
                backgroundColor: '#ffffff',
                windowWidth: 794
            });

            // Restore original styles
            Object.assign(element.style, originalStyles);

            const imgData = canvas.toDataURL('image/jpeg', 0.95);
            const { jsPDF } = window.jspdf;
            
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
                compress: true
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            const imgWidthPx = canvas.width;
            const imgHeightPx = canvas.height;
            
            const ratio = pdfWidth / imgWidthPx;
            const imgHeightMm = imgHeightPx * ratio;

            let heightLeft = imgHeightMm;
            let position = 0;

            // Add first page
            pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightMm);
            heightLeft -= pdfHeight;

            // Add additional pages if content is long
            while (heightLeft > 0) {
                position = heightLeft - imgHeightMm;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeightMm);
                heightLeft -= pdfHeight;
            }

            const timestamp = Math.floor(Date.now() / 1000);
            const safeName = name.toLowerCase().trim().replace(/[^a-z0-9]/g, '-');
            pdf.save(`portify-${safeName}-${timestamp}.pdf`);

            window.Toast?.success('PDF Ready', 'Your professional portfolio has been saved.');
        } catch (error) {
            console.error('PDF generation failed:', error);
            window.Toast?.error('PDF Error', 'Failed to generate PDF. Try printing manually.');
            
            // Cleanup on error
            const element = document.getElementById(elementId);
            if (element) {
                element.style.width = '';
                element.style.maxWidth = '';
            }
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
