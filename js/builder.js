/**
 * Portify Builder — Complete Orchestrator
 * Handles: section nav, form sync, dynamic lists, template selection,
 * live preview, save/export/generate actions.
 */

// ─── 1. SIDEBAR SECTION SWITCHING ──────────────────────────────────────────
window.switchSection = (sectionId) => {
    // Sidebar nav
    document.querySelectorAll('.nav-item').forEach(item => {
        const matches = item.dataset.section === sectionId;
        item.classList.toggle('active', matches);
    });

    // Content sections — show the one matching sectionId
    document.querySelectorAll('.editor-section').forEach(sec => {
        const isTarget = sec.id === `${sectionId}-section`;
        sec.style.display = isTarget ? 'block' : 'none';
    });

    const panel = document.querySelector('.editor-panel');
    if (panel) panel.scrollTop = 0;
};

// ─── 2. CORE INIT ───────────────────────────────────────────────────────────
const initBuilder = () => {
    if (!window.storageManager) {
        console.warn('[Portify] StorageManager not ready, retrying...');
        setTimeout(initBuilder, 100);
        return;
    }
    console.log('%c[Portify] Builder Initializing...', 'color: #6366f1; font-weight: bold;');

    // Sidebar nav click bindings
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            window.switchSection(item.dataset.section);
        });
    });

    // Show initial section
    window.switchSection('basic-info');

    // ─── 3. FORM INPUT SYNC ─────────────────────────────────────────────────
    const syncInputs = () => {
        document.querySelectorAll('[data-path]').forEach(input => {
            const path = input.dataset.path;
            const value = getNestedValue(window.storageManager.data, path);
            if (value !== undefined && value !== null) {
                input.value = value;
            }
            input.oninput = (e) => {
                window.storageManager.updateData(path, e.target.value);
                updateProgress();
            };
        });
    };

    function getNestedValue(obj, path) {
        return path.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
    }

    // ─── 4. DYNAMIC LISTS ───────────────────────────────────────────────────
    const listConfig = {
        skills:           { container: 'skills-list',         btn: 'add-skill-btn',         fields: ['name'] },
        projects:         { container: 'projects-list',        btn: 'add-project-btn',        fields: ['title', 'description', 'link'] },
        experience:       { container: 'experience-list',      btn: 'add-experience-btn',     fields: ['company', 'role', 'duration', 'description'] },
        education:        { container: 'education-list',       btn: 'add-education-btn',      fields: ['school', 'degree', 'year'] },
        certifications:   { container: 'certifications-list',  btn: 'add-certification-btn',  fields: ['name', 'issuer', 'year'] }
    };

    window.renderList = (key) => {
        const config = listConfig[key];
        if (!config) return;
        const container = document.getElementById(config.container);
        if (!container) return;

        const items = window.storageManager.data[key] || [];
        container.innerHTML = items.length === 0
            ? `<p class="empty-hint">Nothing added yet. Click the button below to add.</p>`
            : items.map(item => buildListItem(key, item)).join('');
    };

    function buildListItem(key, item) {
        const esc = v => (v || '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
        const base = `<div class="remove-btn" onclick="window.removeListItem('${key}','${item.id}')">×</div>`;

        if (key === 'skills') return `
            <div class="dynamic-item">
                ${base}
                <input type="text" class="form-control" placeholder="e.g. React, Python, Figma"
                    value="${esc(item.name)}"
                    oninput="window.updateListItem('${key}','${item.id}','name',this.value)">
            </div>`;

        if (key === 'projects') return `
            <div class="dynamic-item">
                ${base}
                <input type="text" class="form-control" placeholder="Project Title"
                    value="${esc(item.title)}"
                    oninput="window.updateListItem('${key}','${item.id}','title',this.value)">
                <textarea class="form-control mt-2" rows="2" placeholder="Short description"
                    oninput="window.updateListItem('${key}','${item.id}','description',this.value)">${esc(item.description)}</textarea>
                <input type="url" class="form-control mt-2" placeholder="https://..."
                    value="${esc(item.link)}"
                    oninput="window.updateListItem('${key}','${item.id}','link',this.value)">
            </div>`;

        if (key === 'experience') return `
            <div class="dynamic-item">
                ${base}
                <div class="grid grid-2">
                    <input type="text" class="form-control" placeholder="Company"
                        value="${esc(item.company)}"
                        oninput="window.updateListItem('${key}','${item.id}','company',this.value)">
                    <input type="text" class="form-control" placeholder="Role / Title"
                        value="${esc(item.role)}"
                        oninput="window.updateListItem('${key}','${item.id}','role',this.value)">
                </div>
                <input type="text" class="form-control mt-2" placeholder="Duration (e.g. Jan 2021 – Present)"
                    value="${esc(item.duration)}"
                    oninput="window.updateListItem('${key}','${item.id}','duration',this.value)">
                <textarea class="form-control mt-2" rows="2" placeholder="Key achievements"
                    oninput="window.updateListItem('${key}','${item.id}','description',this.value)">${esc(item.description)}</textarea>
            </div>`;

        if (key === 'education') return `
            <div class="dynamic-item">
                ${base}
                <input type="text" class="form-control" placeholder="School / University"
                    value="${esc(item.school)}"
                    oninput="window.updateListItem('${key}','${item.id}','school',this.value)">
                <input type="text" class="form-control mt-2" placeholder="Degree / Field"
                    value="${esc(item.degree)}"
                    oninput="window.updateListItem('${key}','${item.id}','degree',this.value)">
                <input type="text" class="form-control mt-2" placeholder="Year (e.g. 2018–2022)"
                    value="${esc(item.year)}"
                    oninput="window.updateListItem('${key}','${item.id}','year',this.value)">
            </div>`;

        if (key === 'certifications') return `
            <div class="dynamic-item">
                ${base}
                <input type="text" class="form-control" placeholder="Certification Name"
                    value="${esc(item.name)}"
                    oninput="window.updateListItem('${key}','${item.id}','name',this.value)">
                <input type="text" class="form-control mt-2" placeholder="Issuer (e.g. Google, Coursera)"
                    value="${esc(item.issuer)}"
                    oninput="window.updateListItem('${key}','${item.id}','issuer',this.value)">
                <input type="text" class="form-control mt-2" placeholder="Year"
                    value="${esc(item.year)}"
                    oninput="window.updateListItem('${key}','${item.id}','year',this.value)">
            </div>`;

        return `<div class="dynamic-item">${base}<p>Item</p></div>`;
    }

    window.updateListItem = (key, id, field, value) => {
        const arr = window.storageManager.data[key];
        if (!arr) return;
        const item = arr.find(i => i.id === id);
        if (item) {
            item[field] = value;
            window.storageManager.notifyUpdate(); // Immediate preview update
            window.storageManager.debouncedSave(); // Debounced localStorage save
            updateProgress();
        }
    };

    window.removeListItem = (key, id) => {
        window.storageManager.data[key] = window.storageManager.data[key].filter(i => i.id !== id);
        window.storageManager.notifyUpdate();
        window.storageManager.debouncedSave();
        window.renderList(key);
        updateProgress();
    };

    Object.keys(listConfig).forEach(key => {
        const btn = document.getElementById(listConfig[key].btn);
        if (btn) {
            btn.onclick = () => {
                if (!window.storageManager.data[key]) window.storageManager.data[key] = [];
                const newItem = { id: Date.now().toString() };
                listConfig[key].fields.forEach(f => (newItem[f] = ''));
                window.storageManager.data[key].push(newItem);
                window.renderList(key);
                window.storageManager.debouncedSave();
            };
        }
    });

    // ─── 5. TEMPLATE SELECTION ──────────────────────────────────────────────
    function applyTemplateSelection(templateId) {
        document.querySelectorAll('.template-card').forEach(card => {
            const isSelected = card.dataset.template === templateId;
            card.classList.toggle('active', isSelected);
            const status = card.querySelector('.template-status');
            if (status) status.style.display = isSelected ? 'flex' : 'none';
        });
    }

    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const tpl = card.dataset.template;
            if (!tpl) return;
            window.storageManager.updateData('template', tpl);
            applyTemplateSelection(tpl);
            window.Toast?.info('Template Changed', `Switched to "${tpl}" layout.`);
        });
    });

    // Apply the saved selection on load
    applyTemplateSelection(window.storageManager.data.template || 'modern');

    // ─── 6. PROFILE IMAGE UPLOAD ────────────────────────────────────────────
    const profileInput = document.getElementById('profile-input');
    const profilePreview = document.getElementById('profile-img-preview');
    document.getElementById('profile-upload')?.addEventListener('click', () => profileInput?.click());
    profileInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const base64 = ev.target.result;
            // Directly set on the data object (bypasses path parsing for large base64)
            window.storageManager.data.basicInfo.profileImage = base64;
            window.storageManager.saveData();
            // Update the upload widget in the form
            if (profilePreview) {
                profilePreview.innerHTML = `<img src="${base64}" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;" alt="Profile">`;
            }
            // Force immediate live preview re-render (do not wait for debounce)
            if (window.previewRenderer) {
                window.previewRenderer.render(window.storageManager.data);
            }
        };
        reader.readAsDataURL(file);
    });

    // ─── 7. PROGRESS BAR ────────────────────────────────────────────────────
    const updateProgress = () => {
        const prog = window.storageManager.getCompletion();
        const fill = document.getElementById('progress-fill');
        const text = document.getElementById('progress-val');
        if (fill) fill.style.width = `${prog}%`;
        if (text) text.textContent = `${prog}%`;
    };

    // ─── 8. ACTION BUTTONS ──────────────────────────────────────────────────

    // Save Draft
    document.getElementById('save-draft-btn')?.addEventListener('click', () => {
        window.storageManager.saveData();
        window.Toast?.success('Saved!', 'Your progress has been saved.');
    });

    // Export JSON
    document.getElementById('export-json')?.addEventListener('click', () => {
        try {
            // Ensure latest data is saved before export
            window.storageManager.saveData();
            const data = window.storageManager.data;
            
            // Wrap in the requested key for consistency with some industry standards
            const exportObj = {
                portfolio_data: data,
                exported_at: new Date().toISOString(),
                version: "1.0"
            };
            
            const dataStr = JSON.stringify(exportObj, null, 2);
            const blob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const name = (data.basicInfo?.name || 'portfolio').toLowerCase().replace(/\s+/g, '-');
            a.href = url;
            a.download = `${name}-data.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            window.Toast?.success('Exported!', 'Portfolio data JSON downloaded.');
        } catch (err) {
            console.error('JSON export failed:', err);
            window.Toast?.error('Export Failed', 'Could not export JSON.');
        }
    });

    // Download HTML
    document.getElementById('download-html')?.addEventListener('click', () => {
        if (window.exportManager) {
            window.storageManager.saveData();
            window.exportManager.downloadStandaloneHTML(window.storageManager.data);
        } else {
            window.Toast?.error('Not Ready', 'Export module is not loaded.');
        }
    });

    // Generate Portfolio (Save + redirect to preview)
    document.getElementById('generate-btn')?.addEventListener('click', () => {
        window.storageManager.saveData();
        window.Toast?.success('Generating...', 'Opening your portfolio preview.');
        setTimeout(() => { window.location.href = 'preview.html'; }, 800);
    });

    // Full-preview button
    document.getElementById('full-preview-btn')?.addEventListener('click', () => {
        window.storageManager.saveData();
        window.open('preview.html', '_blank');
    });

    // ─── 9. INITIAL RENDER ───────────────────────────────────────────────────
    syncInputs();
    Object.keys(listConfig).forEach(k => window.renderList(k));
    updateProgress();

    // Force an initial preview render
    window.storageManager.notifyUpdate();

    console.log('%c[Portify] System Ready ✓', 'color: #10b981; font-weight: bold;');
};

// Safe boot
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuilder);
} else {
    initBuilder();
}
