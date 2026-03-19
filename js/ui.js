/**
 * Portify UI Controller
 * Manages sidebar, dropdowns, and navigation logic.
 */

document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const shareBtn = document.getElementById('share-portfolio');
    const sidebar = document.getElementById('sidebar');

    // 1. Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                // For this demo, just redirect to login
                window.location.href = 'login.html';
            }
        });
    }

    // 2. Share Portfolio Logic
    if (shareBtn) {
        shareBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = window.location.origin + '/preview.html';
            navigator.clipboard.writeText(url).then(() => {
                alert('Portfolio link copied to clipboard!');
            });
        });
    }

    // 3. Mobile Sidebar Toggle (Placeholder for hamburger menu if added)
    // In current layout, sidebar is fixed. We could add a toggle for smaller screens.
    
    // 4. Navigation Active State
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.sidebar-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath.split('/').pop()) {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        }
    });
});
