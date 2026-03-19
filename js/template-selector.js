/**
 * Template Selector Module for Portify
 * Handles template selection UI and Portfolio Theme (Light/Dark) toggling.
 */

document.addEventListener('DOMContentLoaded', () => {
    const templateCards = document.querySelectorAll('.template-card');
    const themeToggle = document.getElementById('portfolio-theme-toggle');

    // 1. Template Selection
    function updateTemplateUI(selected) {
        templateCards.forEach(card => {
            if (card.dataset.template === selected) {
                card.classList.add('active');
                card.querySelector('.template-status').style.display = 'flex';
            } else {
                card.classList.remove('active');
                card.querySelector('.template-status').style.display = 'none';
            }
        });
    }

    templateCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // If clicking the overlay or button, still select the template
            const template = card.dataset.template;
            if (!window.storageManager) return;
            
            const currentSelected = window.storageManager.data.template;
            
            if (currentSelected !== template) {
                window.storageManager.updateData('template', template);
                updateTemplateUI(template);
                window.Toast?.info('Template Changed', `Switched to the ${template.charAt(0).toUpperCase() + template.slice(1)} layout.`);
            }
        });
    });

    // 2. Theme Toggling (Light/Dark Mode for Portfolio)
    const themeButtons = document.querySelectorAll('.theme-opt');
    
    function updateThemeUI(selected) {
        themeButtons.forEach(btn => {
            if (btn.dataset.theme === selected) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    themeButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const theme = btn.dataset.theme;
            if (!window.storageManager) return;
            
            window.storageManager.updateData('theme', theme);
            updateThemeUI(theme);
            window.Toast?.info('Theme Updated', `Your portfolio is now in ${theme} mode.`);
        });
    });

    // Initialize UI after a small delay to ensure storageManager is ready
    setTimeout(() => {
        if (window.storageManager) {
            const currentData = window.storageManager.data;
            updateTemplateUI(currentData.template || 'modern');
            updateThemeUI(currentData.theme || 'light');
        }
    }, 100);
});
