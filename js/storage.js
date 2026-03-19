/**
 * Storage Module for Portify
 * Consolidated source of truth for portfolio data and state management.
 */

const STORAGE_KEY = 'portify_portfolio_data';

const DEFAULT_DATA = {
    basicInfo: {
        name: '',
        title: '',
        bio: '',
        location: '',
        tagline: '',
        availability: 'Available for work',
        profileImage: '',
        email: '',
        phone: ''
    },
    about: {
        introduction: '',
        careerSummary: '',
        description: ''
    },
    skills: [], // { id, name, category, level }
    projects: [], // { id, title, description, link, image, tags[] }
    experience: [], // { id, company, role, duration, description }
    education: [], // { id, school, degree, year }
    certifications: [], // { id, name, issuer, year }
    socialLinks: {
        github: '',
        linkedin: '',
        twitter: '',
        website: '',
        instagram: '',
        dribbble: '',
        behance: ''
    },
    contact: {
        email: '',
        phone: '',
        address: ''
    },
    template: 'modern',
    theme: 'light',
    lastSaved: null
};

class StorageManager {
    constructor() {
        this.data = this.loadData();
        this.saveTimeout = null;
    }

    loadData() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                return this.deepMerge(JSON.parse(JSON.stringify(DEFAULT_DATA)), parsed);
            } catch (e) {
                console.error('Failed to parse saved data', e);
                return JSON.parse(JSON.stringify(DEFAULT_DATA));
            }
        }
        return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    saveData() {
        this.data.lastSaved = new Date().toISOString();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        this.notifyUpdate();
    }

    updateData(path, value) {
        const parts = path.split('.');
        let current = this.data;
        
        for (let i = 0; i < parts.length - 1; i++) {
            if (!current[parts[i]]) current[parts[i]] = {};
            current = current[parts[i]];
        }
        
        current[parts[parts.length - 1]] = value;
        this.debouncedSave();
    }

    debouncedSave() {
        if (this.saveTimeout) clearTimeout(this.saveTimeout);
        this.notifyUpdate();
        
        this.saveTimeout = setTimeout(() => {
            this.saveData();
            console.log('Portfolio data auto-saved.');
        }, 800);
    }

    notifyUpdate() {
        window.dispatchEvent(new CustomEvent('portify-data-updated', { 
            detail: { fullData: this.data } 
        }));
    }

    deepMerge(target, source) {
        if (!source || typeof source !== 'object') return target;
        
        for (const key in source) {
            if (source[key] instanceof Object && key in target && !(source[key] instanceof Array)) {
                target[key] = this.deepMerge(target[key], source[key]);
            } else {
                target[key] = source[key];
            }
        }
        return target;
    }

    getCompletion() {
        let total = 8; // Major sections
        let filled = 0;
        
        if (this.data.basicInfo.name && this.data.basicInfo.title) filled++;
        if (this.data.about.introduction || this.data.about.description) filled++;
        if (this.data.skills.length > 0) filled++;
        if (this.data.projects.length > 0) filled++;
        if (this.data.experience.length > 0) filled++;
        if (this.data.education.length > 0) filled++;
        if (Object.values(this.data.socialLinks).some(v => v)) filled++;
        if (this.data.contact.email || this.data.contact.phone) filled++;

        return Math.min(100, Math.round((filled / total) * 100));
    }
}

window.storageManager = new StorageManager();
