/**
 * Toast Notification System for Portify
 * Provides smooth, professional UI feedback.
 */

const Toast = {
    init() {
        if (document.getElementById('toast-container')) return;
        
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            z-index: 9999;
            pointer-events: none;
        `;
        document.body.appendChild(container);

        // Add standard styles
        const style = document.createElement('style');
        style.textContent = `
            .toast {
                background: var(--bg-card);
                color: var(--text-main);
                padding: 1rem 1.5rem;
                padding-right: 3rem;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                border: 1px solid var(--border-color);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                min-width: 300px;
                max-width: 450px;
                transform: translateX(120%);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                pointer-events: all;
                position: relative;
                overflow: hidden;
            }
            .toast.show {
                transform: translateX(0);
            }
            .toast::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                height: 3px;
                width: 100%;
                background: var(--primary);
                transform-origin: left;
                animation: toast-progress var(--duration) linear forwards;
            }
            @keyframes toast-progress {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }
            .toast-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            .toast-content {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;
            }
            .toast-title {
                font-weight: 700;
                font-size: 0.875rem;
            }
            .toast-message {
                font-size: 0.8125rem;
                color: var(--text-muted);
            }
            .toast-close {
                position: absolute;
                top: 0.75rem;
                right: 0.75rem;
                cursor: pointer;
                opacity: 0.5;
                transition: opacity 0.2s;
            }
            .toast-close:hover { opacity: 1; }
            
            .toast-success::after { background: #10b981; }
            .toast-error::after { background: #ef4444; }
            .toast-warning::after { background: #f59e0b; }
            .toast-info::after { background: #3b82f6; }
        `;
        document.head.appendChild(style);
    },

    show(options) {
        this.init();
        const { title, message, type = 'success', duration = 3000 } = options;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.style.setProperty('--duration', `${duration}ms`);
        
        const iconMap = {
            success: 'solar:check-circle-bold-duotone',
            error: 'solar:danger-circle-bold-duotone',
            warning: 'solar:help-outline-bold-duotone',
            info: 'solar:info-circle-bold-duotone'
        };

        toast.innerHTML = `
            <iconify-icon icon="${iconMap[type]}" class="toast-icon" style="color: var(--${type}-color, inherit)"></iconify-icon>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <iconify-icon icon="solar:close-circle-linear" class="toast-close"></iconify-icon>
        `;

        document.getElementById('toast-container').appendChild(toast);
        
        // Animate in
        requestAnimationFrame(() => toast.classList.add('show'));

        const close = () => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 400);
        };

        toast.querySelector('.toast-close').onclick = close;
        setTimeout(close, duration);
    },

    success(title, message) { this.show({ title, message, type: 'success' }); },
    error(title, message) { this.show({ title, message, type: 'error' }); },
    warning(title, message) { this.show({ title, message, type: 'warning' }); },
    info(title, message) { this.show({ title, message, type: 'info' }); }
};

window.Toast = Toast;
