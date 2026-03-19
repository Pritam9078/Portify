/**
 * Portify Portfolio Renderer
 * Populates templates with user data.
 */

window.portfolioRenderer = {
    render(container, data) {
        if (!container || !data) return;

        // 1. Basic Info
        this.safeSetText(container, '#hero-name', data.basicInfo.name);
        this.safeSetText(container, '#hero-title', data.basicInfo.title);
        this.safeSetText(container, '#about-bio', data.about.description || data.about.introduction);
        this.safeSetText(container, '#footer-name', data.basicInfo.name);
        
        const yearEl = container.querySelector('#footer-year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // 2. Social Links
        this.renderSocialLinks(container, data.socialLinks);

        // 3. Skills
        this.renderSkills(container, data.skills);

        // 4. Projects
        this.renderProjects(container, data.projects);

        // 5. Experience
        this.renderTimeline(container, '#experience-list', data.experience);

        // 6. Education
        this.renderTimeline(container, '#education-list', data.education);
    },

    safeSetText(container, selector, text) {
        const el = container.querySelector(selector);
        if (el && text) el.textContent = text;
    },

    renderSocialLinks(container, links) {
        const socialContainer = container.querySelector('#hero-social');
        if (!socialContainer) return;

        socialContainer.innerHTML = '';
        Object.entries(links).forEach(([platform, url]) => {
            if (!url) return;
            const a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.className = 'social-link';
            
            // Icon mapping (Simplified for now)
            const icon = platform === 'github' ? 'codicon:github-inverted' : 
                         platform === 'linkedin' ? 'fe:linkedin' : 
                         platform === 'twitter' ? 'fe:twitter' : 'fe:link';
            
            a.innerHTML = `<iconify-icon icon="${icon}"></iconify-icon>`;
            socialContainer.appendChild(a);
        });
    },

    renderSkills(container, skills) {
        const grid = container.querySelector('#skills-grid') || container.querySelector('#skills-list');
        if (!grid) return;

        grid.innerHTML = '';
        skills.forEach(skill => {
            if (!skill.name) return;
            const span = document.createElement('span');
            span.className = 'skill-badge';
            span.textContent = skill.name;
            grid.appendChild(span);
        });
    },

    renderProjects(container, projects) {
        const grid = container.querySelector('#projects-grid');
        if (!grid) return;

        grid.innerHTML = '';
        projects.forEach(project => {
            if (!project.title) return;
            const div = document.createElement('div');
            div.className = 'project-card';
            div.innerHTML = `
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description || ''}</p>
                ${project.link ? `<a href="${project.link}" class="project-link" target="_blank">View Project &rarr;</a>` : ''}
            `;
            grid.appendChild(div);
        });
    },

    renderTimeline(container, selector, items) {
        const list = container.querySelector(selector);
        if (!list) return;

        list.innerHTML = '';
        items.forEach(item => {
            if (!item.role && !item.degree) return;
            const div = document.createElement('div');
            div.className = 'timeline-item';
            div.innerHTML = `
                <h4>${item.role || item.degree}</h4>
                <p class="timeline-meta">${item.company || item.school} | ${item.duration}</p>
                ${item.description ? `<p class="timeline-desc">${item.description}</p>` : ''}
            `;
            list.appendChild(div);
        });
    }
};
