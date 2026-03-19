/**
 * Global Utilities for Portify
 * Handles Authentication, Theme, and Route Protection
 */

const AUTH_USER_KEY = 'portify_user';
const USERS_DB_KEY = 'portify_users';
const THEME_KEY = 'portify_theme';

const Utils = {
    // --- AUTHENTICATION ---
    getUsers() {
        return JSON.parse(localStorage.getItem(USERS_DB_KEY) || '[]');
    },

    saveUser(user) {
        const users = this.getUsers();
        users.push(user);
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    },

    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem(AUTH_USER_KEY, JSON.stringify({
                name: user.name,
                email: user.email,
                lastLogin: new Date().toISOString()
            }));
            return true;
        }
        return false;
    },

    logout() {
        localStorage.removeItem(AUTH_USER_KEY);
        window.location.href = 'login.html';
    },

    getCurrentUser() {
        const user = localStorage.getItem(AUTH_USER_KEY);
        return user ? JSON.parse(user) : null;
    },

    requireAuth() {
        if (!this.getCurrentUser()) {
            window.location.href = 'login.html';
        }
    },

    // --- THEME MANAGEMENT ---
    initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const theme = savedTheme || systemTheme;
        this.setTheme(theme);
    },

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        this.updateThemeUI(theme);
        
        // Sync with storageManager if it exists (for portfolio preview)
        if (window.storageManager) {
            window.storageManager.updateData('theme', theme);
        }
    },

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },

    updateThemeUI(theme) {
        const icons = document.querySelectorAll('#theme-toggle-icon, #theme-icon');
        icons.forEach(icon => {
            if (icon) {
                icon.setAttribute('icon', theme === 'dark' ? 'solar:moon-bold-duotone' : 'solar:sun-bold-duotone');
            }
        });

        // Update active class on theme option buttons if they exist (in builder)
        const themeOpts = document.querySelectorAll('.theme-opt');
        themeOpts.forEach(opt => {
            if (opt.dataset.theme === theme) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    },

    // --- GENERIC UTILS ---
    formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
};

// Auto-init theme if not on landing
if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/') {
    document.addEventListener('DOMContentLoaded', () => Utils.initTheme());
}

window.Utils = Utils;
