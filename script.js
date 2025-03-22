// Main JavaScript for March 21, 2025 website
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    initCursorGlow();
    initScrollAnimations();
    initNavbarTransform();
    
    // Add a small delay before starting initial animations
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }, 300);
});

// Custom cursor glow effect
function initCursorGlow() {
    const cursor = document.querySelector('.cursor-glow');
    let timeout;

    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
            cursor.style.opacity = '0';
        }, 2000);
    });

    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });

    // Add extra glow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .highlight-card, .tech-item, .culture-item, .article-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.mixBlendMode = 'overlay';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.mixBlendMode = 'normal';
        });
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    let scrollTimeout;
    
    function checkReveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    // Initial check
    checkReveal();
    
    // Throttled scroll handler
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                checkReveal();
                scrollTimeout = null;
            }, 100);
        }
    });
}

// Navbar transformation on scroll
function initNavbarTransform() {
    const navbar = document.querySelector('.nav-container');
    const navBackground = document.querySelector('.nav-background');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar(scrollPos) {
        if (scrollPos > 100) {
            navbar.classList.add('scrolled');
            // Calculate background opacity based on scroll position
            const opacity = Math.min((scrollPos - 100) / 100, 0.95);
            navBackground.style.opacity = opacity;
        } else {
            navbar.classList.remove('scrolled');
            navBackground.style.opacity = 0;
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollPos > lastScroll && scrollPos > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = scrollPos;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateNavbar(scrollPos);
            });
            ticking = true;
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.nav-container').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Dynamic date display
const currentYear = new Date().getFullYear();
document.querySelectorAll('.current-year').forEach(element => {
    element.textContent = currentYear;
});