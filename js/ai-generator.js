// ============================================================
//  Portify — AI Generator  (js/ai-generator.js)
//  Calls your Express backend /api/generate endpoint
// ============================================================

const AIGenerator = {
    modal: null,
    loading: null,
    promptInput: null,
    generateBtn: null,
    cancelBtn: null,
    triggerBtn: null,

    init() {
        this.modal = document.getElementById('ai-modal-overlay');
        this.loading = document.getElementById('ai-loading');
        this.promptInput = document.getElementById('ai-prompt');
        this.generateBtn = document.getElementById('ai-generate-confirm');
        this.cancelBtn = document.getElementById('ai-cancel');
        this.triggerBtn = document.getElementById('ai-assistant-btn');

        if (!this.triggerBtn) {
            console.warn('[Portify AI] Trigger button not found.');
            return;
        }

        this.bindEvents();
        console.log('%c[Portify AI] Generator Initialized ✨', 'color: #a855f7; font-weight: bold;');
    },

    bindEvents() {
        this.triggerBtn.onclick = () => this.openModal();
        this.cancelBtn.onclick = () => this.closeModal();
        this.generateBtn.onclick = () => this.handleGenerate();

        // Close on overlay click
        this.modal.onclick = (e) => {
            if (e.target === this.modal) this.closeModal();
        };
    },

    openModal() {
        this.modal.style.display = 'flex';
        this.promptInput.focus();
    },

    closeModal() {
        this.modal.style.display = 'none';
        this.loading.style.display = 'none';
        this.promptInput.value = '';
    },

    async handleGenerate() {
        const userPrompt = this.promptInput.value.trim();
        if (!userPrompt) {
            window.Toast?.error('Empty Prompt', 'Please describe yourself first.');
            return;
        }

        const formData = this.collectFormData();
        formData.userPrompt = userPrompt; // Add the custom prompt

        this.loading.style.display = 'flex';

        try {
            const data = await this.generate(formData);
            if (data) {
                this.injectData(data);
                window.Toast?.success('Magic Done!', 'Your portfolio data has been generated.');
                this.closeModal();
            }
        } catch (err) {
            console.error('[Portify AI] Generation failed:', err);
            window.Toast?.error('Generation Failed', err.message || 'Check backend connection.');
            this.loading.style.display = 'none';
        }
    },

    // ── Main generate function (Provided by user) ──────────────
    async generate(formData) {
        const SERVER_URL = 'http://localhost:5001';
        console.log('[Portify AI] Sending data to AI...');

        let response;
        try {
            response = await fetch(`${SERVER_URL}/api/generate`, {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(formData),
            });
        } catch (networkErr) {
            throw new Error(
                'Cannot reach the Portify server. Make sure you ran: node server.js'
            );
        }

        const result = await response.json().catch(() => ({
            error: `HTTP ${response.status} — non-JSON response`,
        }));

        if (!response.ok || !result.success) {
            const msg = result?.error || result?.details || `Server error ${response.status}`;
            throw new Error(msg);
        }

        console.log('[Portify AI] ✅ Portfolio generated successfully!');
        return result.data;
    },

    // ── Helper: collect all form fields (Provided by user) ──────
    collectFormData() {
        const get = (id) => (document.getElementById(id)?.value || '').trim();

        return {
            name:       get('name')       || get('fullName'),
            title:      get('title')      || get('jobTitle')  || get('profession'),
            bio:        get('bio')        || get('about')     || get('summary'),
            skills:     get('skills'),
            experience: get('experience') || get('workExperience'),
            education:  get('education'),
            projects:   get('projects'),
            contact:    get('contact')    || get('contactInfo'),
            template:   get('template')   || 'modern',
            userPrompt: '', // Placeholder, filled in handleGenerate
        };
    },

    injectData(aiData) {
        if (!window.storageManager) return;

        console.log('[Portify AI] Injecting data:', aiData);

        // Map AI generated data to internal storage schema
        // The user's AI returns a slightly different structure than my previous one, so we must map it.
        
        const data = window.storageManager.data;

        if (aiData.name) data.basicInfo.name = aiData.name;
        if (aiData.title) data.basicInfo.title = aiData.title;
        if (aiData.tagline) data.basicInfo.tagline = aiData.tagline;
        if (aiData.bio) {
            data.basicInfo.bio = aiData.bio;
            data.about.description = aiData.bio;
        }

        if (aiData.skills && Array.isArray(aiData.skills)) {
            // Flatten skills if they come in categories
            let unifiedSkills = [];
            aiData.skills.forEach(cat => {
                if (cat.items && Array.isArray(cat.items)) {
                    cat.items.forEach(skill => unifiedSkills.push({ id: Date.now() + Math.random(), name: skill }));
                } else if (typeof cat === 'string') {
                    unifiedSkills.push({ id: Date.now() + Math.random(), name: cat });
                }
            });
            data.skills = unifiedSkills;
        }

        if (aiData.experience && Array.isArray(aiData.experience)) {
            data.experience = aiData.experience.map(exp => ({
                id: Date.now() + Math.random(),
                company: exp.company,
                role: exp.role,
                duration: exp.duration,
                description: Array.isArray(exp.highlights) ? exp.highlights.join('\n') : exp.highlights
            }));
        }

        if (aiData.education && Array.isArray(aiData.education)) {
            data.education = aiData.education.map(edu => ({
                id: Date.now() + Math.random(),
                school: edu.institution,
                degree: edu.degree,
                year: edu.year
            }));
        }

        if (aiData.projects && Array.isArray(aiData.projects)) {
            data.projects = aiData.projects.map(proj => ({
                id: Date.now() + Math.random(),
                title: proj.name,
                description: proj.description,
                link: proj.url || ''
            }));
        }

        if (aiData.contact) {
            if (aiData.contact.email) data.basicInfo.email = aiData.contact.email;
        }

        window.storageManager.saveData();
        this.refreshUI();
    },

    refreshUI() {
        // Sync inputs
        document.querySelectorAll('[data-path]').forEach(input => {
            const path = input.dataset.path;
            const value = this.getNestedValue(window.storageManager.data, path);
            input.value = value || '';
        });

        // Re-render lists
        if (window.renderList) {
            ['skills', 'projects', 'experience', 'education'].forEach(k => window.renderList(k));
        }

        if (typeof updateProgress === 'function') updateProgress();
        window.storageManager.notifyUpdate();
    },

    getNestedValue(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AIGenerator.init();
});
