/**
 * Portify Templates Manifest
 * ─────────────────────────────────────────────────────────────────
 * Each template lives in its own dedicated file:
 *   js/templates/modern-horizon.js  — Modern Horizon
 *   js/templates/code-pro.js        — Code Pro
 *   js/templates/pure-minimal.js    — Pure Minimal
 *   js/templates/artistic.js        — Artistic
 *   js/templates/studio-bold.js     — Studio Bold
 *
 * Each file self-registers into window.templatesRegistry[id].
 * This manifest provides a quick lookup for UI metadata only.
 * ─────────────────────────────────────────────────────────────────
 */

window.templatesRegistry = window.templatesRegistry || {};

window.PORTIFY_TEMPLATES_MANIFEST = [
    {
        id: 'modern-horizon',
        name: 'Modern Horizon',
        description: 'Dark glassmorphism with gradient accents',
        preview_colors: ['#8b5cf6', '#ec4899', '#030712'],
        category: 'dark',
        tags: ['dark', 'gradient', 'glassmorphism', 'professional']
    },
    {
        id: 'code-pro',
        name: 'Code Pro',
        description: 'GitHub-style terminal with monospace fonts',
        preview_colors: ['#7ee787', '#58a6ff', '#0d1117'],
        category: 'dark',
        tags: ['dark', 'developer', 'terminal', 'monospace']
    },
    {
        id: 'pure-minimal',
        name: 'Pure Minimal',
        description: 'Clean editorial design with serif typography',
        preview_colors: ['#111', '#555', '#fafafa'],
        category: 'light',
        tags: ['light', 'minimal', 'serif', 'editorial']
    },
    {
        id: 'artistic',
        name: 'Artistic',
        description: 'Bold creative sidebar with vivid color pops',
        preview_colors: ['#f0f', '#0ff', '#111'],
        category: 'dark',
        tags: ['dark', 'creative', 'sidebar', 'bold']
    },
    {
        id: 'studio-bold',
        name: 'Studio Bold',
        description: 'High-contrast bold typography with accent pops',
        preview_colors: ['#f59e0b', '#0a0a0a', '#fafafa'],
        category: 'light',
        tags: ['light', 'bold', 'high-contrast', 'studio']
    },
    {
        id: 'aetherium',
        name: 'Aetherium',
        description: 'Futuristic glassmorphism with cosmic gradients',
        preview_colors: ['#6366f1', '#a855f7', '#05050f'],
        category: 'dark',
        tags: ['premium', 'futuristic', 'glassmorphism', '3d']
    }
];
