/**
 * Portify — Main JavaScript
 * Handles: auth flow, localStorage, form logic, preview rendering,
 *          dark/light theme, mobile nav, scroll animations,
 *          UX/CX: validation, onboarding, FAQ, feedback, confetti
 */

/* ============================================================
   CONSTANTS
   ============================================================ */
const STORAGE_KEY = 'portify_portfolio';
const USER_KEY = 'portify_user';
const ONBOARDING_KEY = 'portify_onboarded';

/* ============================================================
   THEME MANAGEMENT
   ============================================================ */
function getTheme() {
    return localStorage.getItem('portify_theme') || 'light';
}
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portify_theme', theme);
    const icon = theme === 'dark' ? '☀️' : '🌙';
    const btn1 = document.getElementById('globalThemeToggle');
    const btn2 = document.getElementById('themeToggle');
    if (btn1) btn1.textContent = icon;
    if (btn2) btn2.textContent = icon;
}
function toggleTheme() {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
}

/* ============================================================
   AUTH HELPERS
   ============================================================ */
function getUser() {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) || null; }
    catch { return null; }
}
function saveUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}
function logout() {
    localStorage.removeItem(USER_KEY);
    window.location.href = 'login.html';
}
function requireAuth() {
    if (!getUser()) window.location.href = 'login.html';
}

/* ============================================================
   PORTFOLIO DATA HELPERS
   ============================================================ */
function getPortfolio() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
}
function savePortfolio(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/* ============================================================
   SCROLL ANIMATION (Intersection Observer)
   ============================================================ */
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

/* ============================================================
   MOBILE SIDEBAR TOGGLE (Dashboard)
   ============================================================ */
function initMobileSidebar() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (!toggle || !sidebar) return;

    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('visible');
    });
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('visible');
        });
    }
}

/* ============================================================
   LANDING PAGE
   ============================================================ */
function initLanding() {
    initScrollAnimations();
    initFAQ();
}

/* ============================================================
   LOGIN PAGE
   ============================================================ */
function initLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    // Password toggle
    initPasswordToggle('password', 'togglePassword');

    // Real-time validation on blur
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');
    if (emailInput) emailInput.addEventListener('blur', () => validateEmailField(emailInput));
    if (passInput) passInput.addEventListener('blur', () => validateRequiredField(passInput, 'Password is required'));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput?.value.trim() || '';
        const password = passInput?.value || '';
        const errEl = document.getElementById('loginError');

        // Validate all fields before submit
        let valid = true;
        if (!validateEmailField(emailInput)) valid = false;
        if (!validateRequiredField(passInput, 'Password is required')) valid = false;
        if (!valid) return;

        const btn = form.querySelector('[type="submit"]');
        setButtonLoading(btn, true, 'Logging in…');

        // Simulate auth — accept any credentials
        setTimeout(() => {
            const user = { name: email.split('@')[0], email };
            saveUser(user);
            showSuccess(errEl, '✅ Login successful! Redirecting…');
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        }, 900);
    });
}

/* ============================================================
   SIGNUP PAGE
   ============================================================ */
function initSignup() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    initPasswordToggle('password', 'togglePassword');
    initPasswordStrength('password', 'passwordStrength');

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passInput = document.getElementById('password');

    if (nameInput) nameInput.addEventListener('blur', () => validateRequiredField(nameInput, 'Full name is required'));
    if (emailInput) emailInput.addEventListener('blur', () => validateEmailField(emailInput));
    if (passInput) passInput.addEventListener('blur', () => validatePasswordField(passInput));

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        if (!validateRequiredField(nameInput, 'Full name is required')) valid = false;
        if (!validateEmailField(emailInput)) valid = false;
        if (!validatePasswordField(passInput)) valid = false;
        if (!valid) return;

        const btn = form.querySelector('[type="submit"]');
        const errEl = document.getElementById('signupError');
        setButtonLoading(btn, true, 'Creating account…');

        setTimeout(() => {
            const user = { name: nameInput.value.trim(), email: emailInput.value.trim() };
            saveUser(user);
            // Mark as new user for onboarding banner
            localStorage.removeItem(ONBOARDING_KEY);
            showSuccess(errEl, '🎉 Account created! Redirecting…');
            setTimeout(() => window.location.href = 'dashboard.html', 800);
        }, 900);
    });
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
function initDashboard() {
    requireAuth();
    const user = getUser();
    const portfolio = getPortfolio();

    // Populate user info
    const nameEl = document.getElementById('userName');
    const greetEl = document.getElementById('greetName');
    const avatarEl = document.getElementById('sidebarAvatar');
    const emailEl = document.getElementById('sidebarEmail');

    if (nameEl) nameEl.textContent = user.name;
    if (greetEl) greetEl.textContent = user.name.split(' ')[0];
    if (avatarEl) avatarEl.textContent = user.name.charAt(0).toUpperCase();
    if (emailEl) emailEl.textContent = user.email;

    // Portfolio status
    const hasPortfolio = portfolio && portfolio.fullName;
    const statusEl = document.getElementById('portfolioStatus');
    if (statusEl) {
        statusEl.textContent = hasPortfolio ? '✅ Portfolio Created' : '⚠️ No portfolio yet';
        statusEl.style.color = hasPortfolio ? 'var(--success)' : 'var(--warning)';
    }

    // Onboarding banner (shown once per user)
    initOnboarding(user);

    // Empty state or completion score
    initCompletionScore(portfolio);

    // Feedback button
    initFeedbackModal();

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);

    initMobileSidebar();
    initScrollAnimations();
}

/* ============================================================
   PORTFOLIO FORM PAGE
   ============================================================ */
function initForm() {
    requireAuth();

    const form = document.getElementById('portfolioForm');
    if (!form) return;

    // Load existing data
    const data = getPortfolio();
    populateForm(data);

    // Form progress steps
    initFormProgress();

    // Character counter on bio
    initCharCounter('bio', 300);

    // Project counter
    let projectCount = 0;
    const projectsContainer = document.getElementById('projectsContainer');
    const addProjectBtn = document.getElementById('addProject');

    if (!data.projects || data.projects.length === 0) {
        addProjectEntry();
    } else {
        data.projects.forEach(p => addProjectEntry(p));
    }

    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', () => addProjectEntry());
    }

    // Theme selection
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.addEventListener('click', () => {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            document.getElementById('selectedTheme').value = opt.dataset.theme;
        });
    });

    // Pre-select saved theme
    if (data.theme) {
        const savedOpt = document.querySelector(`.theme-option[data-theme="${data.theme}"]`);
        if (savedOpt) {
            document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
            savedOpt.classList.add('selected');
            document.getElementById('selectedTheme').value = data.theme;
        }
    }

    // Save & Preview
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('fullName');
        if (!validateRequiredField(nameInput, 'Full name is required')) {
            nameInput?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        const btn = form.querySelector('[type="submit"]');
        setButtonLoading(btn, true, 'Saving…');
        const portfolio = collectFormData();
        savePortfolio(portfolio);
        setTimeout(() => {
            setButtonLoading(btn, false, 'Save & Preview →');
            showSuccessModal(
                '🎉',
                'Portfolio Saved!',
                'Your portfolio looks amazing. Ready to share it with the world?',
                [
                    { label: 'Preview Now →', href: 'preview.html', primary: true },
                    { label: 'Keep Editing', href: null, primary: false }
                ]
            );
        }, 900);
    });

    // Save draft
    const saveDraftBtn = document.getElementById('saveDraft');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => {
            const portfolio = collectFormData();
            savePortfolio(portfolio);
            showToast('Draft saved! 💾');
        });
    }

    // Form nav highlight
    initFormNav();

    /* ── Inner helpers ── */
    function addProjectEntry(proj = {}) {
        projectCount++;
        const entry = document.createElement('div');
        entry.className = 'project-entry';
        entry.innerHTML = `
      <div class="project-entry-header">
        <h4>Project ${projectCount}</h4>
        <button type="button" class="remove-project" onclick="this.closest('.project-entry').remove()">✕ Remove</button>
      </div>
      <div class="form-group">
        <label for="projTitle${projectCount}">Project Title *</label>
        <input id="projTitle${projectCount}" type="text" class="form-control proj-title"
               placeholder="e.g. My Awesome App" value="${escHtml(proj.title || '')}"
               aria-required="true">
      </div>
      <div class="form-group">
        <label for="projDesc${projectCount}">Description</label>
        <textarea id="projDesc${projectCount}" class="form-control proj-desc"
                  placeholder="Brief description of what this project does…">${escHtml(proj.description || '')}</textarea>
      </div>
      <div class="form-group">
        <label for="projLink${projectCount}">Project Link</label>
        <input id="projLink${projectCount}" type="url" class="form-control proj-link"
               placeholder="https://github.com/yourname/project" value="${escHtml(proj.link || '')}">
        <span class="field-hint">GitHub, live demo, or any public URL</span>
      </div>
    `;
        if (projectsContainer) projectsContainer.appendChild(entry);
    }

    function collectFormData() {
        const projects = [];
        document.querySelectorAll('.project-entry').forEach(entry => {
            const title = entry.querySelector('.proj-title')?.value.trim();
            if (title) {
                projects.push({
                    title,
                    description: entry.querySelector('.proj-desc')?.value.trim() || '',
                    link: entry.querySelector('.proj-link')?.value.trim() || ''
                });
            }
        });

        return {
            fullName: val('fullName'),
            headline: val('headline'),
            bio: val('bio'),
            location: val('location'),
            email: val('email'),
            website: val('website'),
            skills: val('skills'),
            education: val('education'),
            experience: val('experience'),
            github: val('github'),
            linkedin: val('linkedin'),
            twitter: val('twitter'),
            theme: document.getElementById('selectedTheme')?.value || 'light',
            projects
        };
    }

    function populateForm(data) {
        const fields = ['fullName', 'bio', 'skills', 'education', 'experience', 'github', 'linkedin', 'twitter'];
        fields.forEach(f => {
            const el = document.getElementById(f);
            if (el && data[f]) el.value = data[f];
        });
    }
}

function initFormNav() {
    const navItems = document.querySelectorAll('.form-nav-item');
    const sections = document.querySelectorAll('.form-section-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active', item.dataset.section === id);
                });
                // Sync progress steps
                updateFormProgress(id);
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const target = document.getElementById(item.dataset.section);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ============================================================
   PORTFOLIO PREVIEW PAGE
   ============================================================ */
function initPreview() {
    const data = getPortfolio();

    // Apply saved theme
    if (data.theme) setTheme(data.theme);

    // Theme toggle button
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

    // Back button
    const backBtn = document.getElementById('backToForm');
    if (backBtn) backBtn.addEventListener('click', () => window.location.href = 'form.html');

    if (!data || !data.fullName) {
        document.getElementById('portfolioContent').innerHTML = `
      <div class="flex-center" style="min-height:60vh;flex-direction:column;gap:16px;">
        <div style="font-size:3rem">📋</div>
        <h2>No portfolio data found</h2>
        <p>Fill out the form to generate your portfolio.</p>
        <a href="form.html" class="btn btn-primary">Create Portfolio</a>
      </div>`;
        return;
    }

    // Encouragement banner (shown once per session)
    const encBanner = document.getElementById('encouragementBanner');
    if (encBanner) encBanner.style.display = 'flex';

    // Confetti on first preview
    if (!sessionStorage.getItem('portify_confetti_shown')) {
        sessionStorage.setItem('portify_confetti_shown', '1');
        setTimeout(() => launchConfetti(), 600);
    }

    renderPortfolio(data);
    initScrollAnimations();
}

function renderPortfolio(data) {
    const initials = data.fullName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
    setEl('portfolioAvatar', initials);
    setEl('portfolioName', data.fullName);
    setEl('portfolioBio', data.bio || 'Welcome to my portfolio!');

    renderSocialLinks(data);

    // Skills
    const skillsEl = document.getElementById('portfolioSkills');
    if (skillsEl && data.skills) {
        const skills = data.skills.split(',').map(s => s.trim()).filter(Boolean);
        skillsEl.innerHTML = skills.map(s => `<span class="skill-tag">${escHtml(s)}</span>`).join('');
    }

    // Projects
    const projEl = document.getElementById('portfolioProjects');
    if (projEl && data.projects && data.projects.length > 0) {
        projEl.innerHTML = `<div class="projects-grid">${data.projects.map(p => `
      <div class="project-card animate-in">
        <h4>${escHtml(p.title)}</h4>
        <p>${escHtml(p.description || 'No description provided.')}</p>
        ${p.link ? `<a href="${escHtml(p.link)}" target="_blank" rel="noopener" class="project-link">View Project →</a>` : ''}
      </div>`).join('')}</div>`;
    } else if (projEl) {
        projEl.innerHTML = '<p>No projects added yet.</p>';
    }

    renderTimeline('portfolioEducation', data.education);
    renderTimeline('portfolioExperience', data.experience);
}

function renderSocialLinks(data) {
    const container = document.getElementById('portfolioSocial');
    if (!container) return;
    const links = [];
    if (data.github) links.push(`<a href="${escHtml(data.github)}"   target="_blank" rel="noopener" title="GitHub"  >🐙</a>`);
    if (data.linkedin) links.push(`<a href="${escHtml(data.linkedin)}" target="_blank" rel="noopener" title="LinkedIn">💼</a>`);
    if (data.twitter) links.push(`<a href="${escHtml(data.twitter)}"  target="_blank" rel="noopener" title="Twitter" >🐦</a>`);
    container.innerHTML = links.join('');
}

function renderTimeline(elId, text) {
    const el = document.getElementById(elId);
    if (!el) return;
    if (!text || !text.trim()) { el.innerHTML = '<p>Not provided.</p>'; return; }
    const items = text.split('\n').filter(l => l.trim());
    el.innerHTML = `<div class="timeline">${items.map(item => `
    <div class="timeline-item animate-in">
      <p>${escHtml(item)}</p>
    </div>`).join('')}</div>`;
}

/* ============================================================
   UX: FORM VALIDATION HELPERS
   ============================================================ */
function validateEmailField(input) {
    if (!input) return false;
    const val = input.value.trim();
    const group = input.closest('.form-group');
    if (!val) {
        return setFieldState(group, input, 'error', 'Email address is required');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        return setFieldState(group, input, 'error', 'Please enter a valid email address');
    }
    return setFieldState(group, input, 'success', '');
}

function validateRequiredField(input, msg) {
    if (!input) return false;
    const group = input.closest('.form-group');
    if (!input.value.trim()) {
        return setFieldState(group, input, 'error', msg);
    }
    return setFieldState(group, input, 'success', '');
}

function validatePasswordField(input) {
    if (!input) return false;
    const group = input.closest('.form-group');
    if (!input.value) {
        return setFieldState(group, input, 'error', 'Password is required');
    }
    if (input.value.length < 6) {
        return setFieldState(group, input, 'error', 'Password must be at least 6 characters');
    }
    return setFieldState(group, input, 'success', '');
}

function setFieldState(group, input, state, msg) {
    if (!group) return state === 'success';
    group.classList.remove('has-error', 'has-success');
    let errEl = group.querySelector('.field-error-msg');
    if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'field-error-msg';
        errEl.setAttribute('role', 'alert');
        input.parentNode.insertBefore(errEl, input.nextSibling);
    }
    if (state === 'error') {
        group.classList.add('has-error');
        errEl.textContent = msg;
        input.setAttribute('aria-invalid', 'true');
        return false;
    } else {
        group.classList.add('has-success');
        errEl.textContent = '';
        input.setAttribute('aria-invalid', 'false');
        return true;
    }
}

/* ============================================================
   UX: BUTTON LOADING STATE
   ============================================================ */
function setButtonLoading(btn, loading, loadingText) {
    if (!btn) return;
    if (loading) {
        btn._originalText = btn.textContent;
        btn.textContent = loadingText || 'Loading…';
        btn.classList.add('btn-loading');
        btn.disabled = true;
    } else {
        btn.textContent = btn._originalText || loadingText || 'Submit';
        btn.classList.remove('btn-loading');
        btn.disabled = false;
    }
}

/* ============================================================
   UX: PASSWORD STRENGTH METER
   ============================================================ */
function initPasswordStrength(inputId, containerId) {
    const input = document.getElementById(inputId);
    const container = document.getElementById(containerId);
    if (!input || !container) return;

    input.addEventListener('input', () => {
        const pw = input.value;
        const score = getPasswordScore(pw);
        const fill = container.querySelector('.strength-fill');
        const label = container.querySelector('.strength-label');
        if (!fill || !label) return;

        const levels = [
            { pct: '0%', color: 'var(--border)', text: '' },
            { pct: '25%', color: '#ef4444', text: '🔴 Weak' },
            { pct: '50%', color: '#f59e0b', text: '🟡 Fair' },
            { pct: '75%', color: '#3b82f6', text: '🔵 Good' },
            { pct: '100%', color: '#10b981', text: '🟢 Strong' }
        ];
        const lvl = levels[score];
        fill.style.width = lvl.pct;
        fill.style.background = lvl.color;
        label.textContent = lvl.text;
    });
}

function getPasswordScore(pw) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 6) score++;
    if (pw.length >= 10) score++;
    if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
    if (/[0-9]/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
    return Math.min(score, 4);
}

/* ============================================================
   UX: SUCCESS MODAL
   ============================================================ */
function showSuccessModal(icon, title, message, actions) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', title);

    const actionsHtml = (actions || []).map(a => {
        if (a.href) {
            return `<a href="${a.href}" class="btn ${a.primary ? 'btn-primary' : 'btn-outline'}">${a.label}</a>`;
        }
        return `<button class="btn btn-outline modal-close-btn">${a.label}</button>`;
    }).join('');

    overlay.innerHTML = `
    <div class="modal-box">
      <span class="modal-icon">${icon}</span>
      <h2>${title}</h2>
      <p>${message}</p>
      <div class="modal-actions">${actionsHtml}</div>
    </div>`;

    document.body.appendChild(overlay);

    // Close on overlay click or close button
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) overlay.remove();
    });
    overlay.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => overlay.remove());
    });

    // Trap focus inside modal
    const firstBtn = overlay.querySelector('a, button');
    if (firstBtn) firstBtn.focus();
}

/* ============================================================
   UX: ONBOARDING BANNER
   ============================================================ */
function initOnboarding(user) {
    if (localStorage.getItem(ONBOARDING_KEY)) return; // already dismissed

    const container = document.getElementById('onboardingContainer');
    if (!container) return;

    const firstName = user?.name?.split(' ')[0] || 'there';
    container.innerHTML = `
    <div class="onboarding-banner" id="onboardingBanner" role="banner" aria-label="Welcome message">
      <div class="onboarding-banner-icon">🎉</div>
      <div class="onboarding-banner-text">
        <h3>Welcome to Portify, ${firstName}! You're all set.</h3>
        <p>Your account is ready. Start by creating your portfolio — it only takes 5 minutes. You've got this! 💪</p>
      </div>
      <button class="onboarding-dismiss" id="dismissOnboarding" aria-label="Dismiss welcome message">✕</button>
    </div>`;

    document.getElementById('dismissOnboarding')?.addEventListener('click', () => {
        localStorage.setItem(ONBOARDING_KEY, '1');
        container.innerHTML = '';
    });
}

/* ============================================================
   UX: COMPLETION SCORE (Dashboard)
   ============================================================ */
function initCompletionScore(portfolio) {
    const container = document.getElementById('completionContainer');
    if (!container) return;

    const checks = [
        { key: 'fullName', label: 'Full name added' },
        { key: 'bio', label: 'Bio written' },
        { key: 'skills', label: 'Skills listed' },
        { key: 'education', label: 'Education added' },
        { key: 'experience', label: 'Experience added' },
        { key: 'github', label: 'GitHub linked' },
        { key: 'projects', label: 'Projects added', isArray: true }
    ];

    const done = checks.filter(c => c.isArray ? (portfolio[c.key]?.length > 0) : !!portfolio[c.key]);
    const pct = Math.round((done.length / checks.length) * 100);
    const msg = pct === 100 ? '🏆 Portfolio complete!' : pct >= 60 ? '🚀 Looking great!' : '✏️ Keep going!';

    container.innerHTML = `
    <div class="completion-card animate-in">
      <h3>📊 Profile Completion — ${msg}</h3>
      <div class="completion-bar-wrap">
        <div class="completion-bar-fill" style="width:${pct}%"></div>
      </div>
      <div class="completion-label">${pct}% complete</div>
      <div class="completion-checklist">
        ${checks.map(c => {
        const isDone = c.isArray ? (portfolio[c.key]?.length > 0) : !!portfolio[c.key];
        return `<div class="completion-item ${isDone ? 'done' : ''}">
              <div class="ci-dot"></div>
              ${isDone ? '✓' : '○'} ${c.label}
            </div>`;
    }).join('')}
      </div>
    </div>`;
}

/* ============================================================
   UX: FEEDBACK MODAL (Dashboard)
   ============================================================ */
function initFeedbackModal() {
    const fab = document.getElementById('feedbackFab');
    if (!fab) return;

    fab.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay feedback-modal';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Share feedback');

        overlay.innerHTML = `
        <div class="modal-box">
          <span class="modal-icon">💬</span>
          <h2>Share Your Feedback</h2>
          <p>How's your experience with Portify so far?</p>
          <div class="feedback-stars">
            ${[1, 2, 3, 4, 5].map(n => `<span class="feedback-star" data-star="${n}" role="button" tabindex="0" aria-label="${n} star">⭐</span>`).join('')}
          </div>
          <div class="form-group">
            <label for="feedbackText">Tell us more (optional)</label>
            <textarea id="feedbackText" class="form-control" rows="3"
              placeholder="What do you love? What could be better?"></textarea>
          </div>
          <div class="modal-actions" style="margin-top:20px;">
            <button class="btn btn-primary" id="submitFeedback">Send Feedback 🚀</button>
            <button class="btn btn-outline modal-close-btn">Maybe Later</button>
          </div>
        </div>`;

        document.body.appendChild(overlay);

        // Star rating
        let selectedStar = 0;
        overlay.querySelectorAll('.feedback-star').forEach(star => {
            star.addEventListener('click', () => {
                selectedStar = parseInt(star.dataset.star);
                overlay.querySelectorAll('.feedback-star').forEach((s, i) => {
                    s.classList.toggle('active', i < selectedStar);
                });
            });
            star.addEventListener('keydown', e => {
                if (e.key === 'Enter' || e.key === ' ') star.click();
            });
        });

        // Submit
        overlay.querySelector('#submitFeedback')?.addEventListener('click', () => {
            overlay.remove();
            showToast('Thank you for your feedback! 🙏');
        });

        // Close
        overlay.querySelectorAll('.modal-close-btn').forEach(btn => btn.addEventListener('click', () => overlay.remove()));
        overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

        overlay.querySelector('.feedback-star')?.focus();
    });
}

/* ============================================================
   UX: FAQ ACCORDION
   ============================================================ */
function initFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const btn = item.querySelector('.faq-question');
        if (!btn) return;
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all others
            document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
        // Keyboard support
        btn.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
        });
    });
}

/* ============================================================
   UX: FORM PROGRESS STEPS
   ============================================================ */
const FORM_STEP_MAP = {
    'sec-basic': 0,
    'sec-skills': 1,
    'sec-projects': 1,
    'sec-education': 2,
    'sec-experience': 2,
    'sec-social': 3,
    'sec-theme': 3
};

function initFormProgress() {
    // Steps are rendered in HTML; just sync on scroll
}

function updateFormProgress(sectionId) {
    const stepIndex = FORM_STEP_MAP[sectionId] ?? 0;
    document.querySelectorAll('.form-step-wrap').forEach((wrap, i) => {
        const step = wrap.querySelector('.form-step');
        if (!step) return;
        step.classList.remove('active', 'done');
        if (i < stepIndex) step.classList.add('done');
        else if (i === stepIndex) step.classList.add('active');
    });
    document.querySelectorAll('.step-connector').forEach((conn, i) => {
        conn.classList.toggle('done', i < stepIndex);
    });
}

/* ============================================================
   UX: CHARACTER COUNTER
   ============================================================ */
function initCharCounter(inputId, maxChars) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.textContent = `0 / ${maxChars}`;
    input.parentNode.appendChild(counter);

    input.addEventListener('input', () => {
        const len = input.value.length;
        counter.textContent = `${len} / ${maxChars}`;
        counter.classList.remove('warn', 'over');
        if (len > maxChars) counter.classList.add('over');
        else if (len > maxChars * .8) counter.classList.add('warn');
    });
}

/* ============================================================
   UX: CONFETTI ANIMATION
   ============================================================ */
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#6366f1', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    const pieces = Array.from({ length: 120 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        r: Math.random() * 6 + 4,
        d: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngle: 0,
        tiltSpeed: Math.random() * 0.1 + 0.05
    }));

    let frame;
    let elapsed = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            p.tiltAngle += p.tiltSpeed;
            p.y += p.d + 1;
            p.x += Math.sin(p.tiltAngle) * 2;
            p.tilt = Math.sin(p.tiltAngle) * 12;
            ctx.beginPath();
            ctx.lineWidth = p.r;
            ctx.strokeStyle = p.color;
            ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
            ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
            ctx.stroke();
        });
        elapsed++;
        if (elapsed < 180) {
            frame = requestAnimationFrame(draw);
        } else {
            cancelAnimationFrame(frame);
            canvas.remove();
        }
    }
    draw();
}

/* ============================================================
   UTILITY HELPERS
   ============================================================ */
function val(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
}
function setEl(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
function escHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
function showError(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.color = 'var(--danger)';
    el.style.display = 'block';
}
function showSuccess(el, msg) {
    if (!el) return;
    el.textContent = msg;
    el.style.color = 'var(--success)';
    el.style.display = 'block';
}

function showToast(msg) {
    let toast = document.getElementById('portifyToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'portifyToast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.style.cssText = `
      position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(80px);
      z-index:9999;background:var(--primary);color:#fff;
      padding:14px 28px;border-radius:50px;
      font-family:var(--font);font-size:.9rem;font-weight:600;
      box-shadow:0 8px 32px rgba(99,102,241,.4);
      opacity:0;transition:all .35s cubic-bezier(.4,0,.2,1);
      white-space:nowrap;
    `;
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    requestAnimationFrame(() => {
        toast.style.transform = 'translateX(-50%) translateY(0)';
        toast.style.opacity = '1';
    });
    setTimeout(() => {
        toast.style.transform = 'translateX(-50%) translateY(80px)';
        toast.style.opacity = '0';
    }, 3000);
}

function initPasswordToggle(inputId, btnId) {
    const input = document.getElementById(inputId);
    const btn = document.getElementById(btnId);
    if (!input || !btn) return;
    btn.addEventListener('click', () => {
        const isText = input.type === 'text';
        input.type = isText ? 'password' : 'text';
        btn.textContent = isText ? '👁️' : '🙈';
        btn.setAttribute('aria-label', isText ? 'Show password' : 'Hide password');
    });
}

/* ============================================================
   ROUTER — Auto-detect page and init
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme on every page
    setTheme(getTheme());

    const page = window.location.pathname.split('/').pop() || 'index.html';

    if (page === 'index.html' || page === '') initLanding();
    else if (page === 'login.html') initLogin();
    else if (page === 'signup.html') initSignup();
    else if (page === 'dashboard.html') initDashboard();
    else if (page === 'form.html') initForm();
    else if (page === 'preview.html') initPreview();

    // Global theme toggle (navbar)
    const globalThemeBtn = document.getElementById('globalThemeToggle');
    if (globalThemeBtn) globalThemeBtn.addEventListener('click', toggleTheme);
});

