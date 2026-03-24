/**
 * Portify Dashboard Main Controller
 * Handles data binding, stats calculation, and completion tracking.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auth & User Info
    const currentUser = window.Utils.getCurrentUser();
    const data = window.storageManager.data;

    if (currentUser) {
        const greetName = document.getElementById('greet-name');
        const userDisplayName = document.getElementById('user-display-name');
        const userAvatar = document.getElementById('user-avatar');
        const navAvatar = document.getElementById('nav-user-avatar');

        const firstName = currentUser.name.split(' ')[0];
        if (greetName) greetName.textContent = firstName;
        if (userDisplayName) userDisplayName.textContent = currentUser.name;
        
        const initials = currentUser.name.substring(0, 2).toUpperCase();
        if (userAvatar) userAvatar.textContent = initials;
        if (navAvatar) navAvatar.textContent = initials;
    }

    // Initialize Theme
    window.Utils.initTheme();

    // 2. Update Stats
    const statProjects = document.getElementById('stat-projects');
    const statSkills = document.getElementById('stat-skills');
    const statExperience = document.getElementById('stat-experience');

    if (statProjects) statProjects.textContent = data.projects.length || 0;
    if (statSkills) statSkills.textContent = data.skills.length || 0;
    if (statExperience) statExperience.textContent = data.experience.length || 0;

    // 3. Update Completion Widget
    updateCompletionWidget();

    function updateCompletionWidget() {
        const percent = window.storageManager.getCompletion();
        const percentEl = document.getElementById('completion-percent');
        const fillEl = document.getElementById('completion-fill');

        if (percentEl) percentEl.textContent = `${percent}%`;
        if (fillEl) fillEl.style.width = `${percent}%`;

        // Update Dots
        const dots = {
            basic: data.basicInfo.name && data.basicInfo.title,
            about: data.about.description || data.about.introduction,
            projects: data.projects.length > 0,
            skills: data.skills.length > 0,
            social: Object.values(data.socialLinks).some(v => v)
        };

        Object.keys(dots).forEach(key => {
            const dot = document.getElementById(`dot-${key}`);
            if (dot && dots[key]) {
                dot.classList.add('done');
            }
        });
    }

    // 4. Update Recent Projects List
    const projectsList = document.getElementById('recent-projects-list');
    if (projectsList && data.projects.length > 0) {
        projectsList.innerHTML = '';
        data.projects.slice(0, 3).forEach(project => {
            const div = document.createElement('div');
            div.className = 'activity-item d-flex align-center gap-1 py-1';
            div.style.borderBottom = '1px solid var(--border-color)';
            div.innerHTML = `
                <div style="width: 40px; height: 40px; background-color: var(--bg-main); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center;">
                    <iconify-icon icon="solar:folder-linear" style="font-size: 20px; color: var(--primary);"></iconify-icon>
                </div>
                <div style="flex: 1;">
                    <p class="font-bold mb-0-25" style="font-size: 0.875rem;">${project.title || 'Untitled Project'}</p>
                    <p class="text-xs text-muted">${project.description ? project.description.substring(0, 60) + '...' : 'No description'}</p>
                </div>
                <iconify-icon icon="solar:alt-arrow-right-linear" style="color: var(--text-muted);"></iconify-icon>
            `;
            projectsList.appendChild(div);
        });
    }

    // 5. Actions
    const shareBtn = document.getElementById('share-portfolio');
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = `${window.location.origin}/preview.html`;
            navigator.clipboard.writeText(url);
            alert('Portfolio link copied to clipboard!');
        });
    }

    // Export Actions
    document.getElementById('export-json')?.addEventListener('click', (e) => {
        e.preventDefault();
        const dataStr = JSON.stringify(window.storageManager.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portify-backup-${Date.now()}.json`;
        a.click();
    });

    document.getElementById('download-html')?.addEventListener('click', async (e) => {
        e.preventDefault();
        await window.exportManager.downloadStandaloneHTML(window.storageManager.data);
    });

    // Sidebar Export Action
    document.getElementById('export-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        const dataStr = JSON.stringify(window.storageManager.data, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `portify-backup-${Date.now()}.json`;
        a.click();
    });

    // 6. Update Current Template Info
    const templateName = document.getElementById('active-template-name');
    if (templateName) {
        const nameMap = {
            modern: 'Modern Minimalist',
            creative: 'Creative Showcase',
            developer: 'Developer Hub'
        };
        templateName.textContent = nameMap[data.template] || 'Modern Minimalist';
    }
});
