/**
 * Authentication Logic for Portify
 */

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const errorMsg = document.getElementById('auth-error');

    // 1. SIGN UP Logic
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const confirmPass = document.getElementById('confirm-password').value;

            // Simple Validation
            if (password !== confirmPass) {
                showError('Passwords do not match.');
                return;
            }

            const users = window.Utils.getUsers();
            if (users.find(u => u.email === email)) {
                showError('This email is already registered.');
                return;
            }

            // Save User
            window.Utils.saveUser({ name, email, password });
            
            // Auto Login
            window.Utils.login(email, password);
            window.location.href = 'dashboard.html';
        });
    }

    // 2. LOGIN Logic
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            if (window.Utils.login(email, password)) {
                window.location.href = 'dashboard.html';
            } else {
                showError('Invalid email or password.');
            }
        });
    }

    function showError(msg) {
        if (errorMsg) {
            errorMsg.querySelector('span').textContent = msg;
            errorMsg.style.display = 'flex';
        }
    }

    // Initialize Theme for Auth Pages
    window.Utils.initTheme();
});

// Helper for UI
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const type = input.type === 'password' ? 'text' : 'password';
    input.type = type;
}
