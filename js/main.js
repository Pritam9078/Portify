document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Initialization
    if (window.Utils) {
        window.Utils.initTheme();
    }

    // 2. Preloader Logic
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    preloader.style.display = 'none';
                    document.body.classList.remove('loading');
                    // Trigger initial reveals after preloader is gone
                    initScrollAnimations();
                }, 800);
            }, 2000);
        });
    }

    // 3. Scroll Animations (Intersection Observer)
    function initScrollAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // We can unobserve after it reveals
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealCallback, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 72; // height of sticky navbar
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Navbar Scrolled State
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.style.boxShadow = 'var(--shadow-md)';
                navbar.style.background = 'var(--glass-bg)';
            } else {
                navbar.style.boxShadow = 'none';
                navbar.style.background = 'var(--glass-bg)';
            }
        });
    }
});
