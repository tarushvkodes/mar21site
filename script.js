// Main JavaScript for March 21, 2025 website
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations and interactions
    initCursorGlow();
    initScrollAnimations();
    initNavbarScroll();
    
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
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.opacity = '1';
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
    
    document.addEventListener('mouseout', () => {
        cursor.style.opacity = '0';
    });
    
    // Add extra glow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .highlight-card, .tech-item, .culture-item');
    
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
    // Select all elements with the 'reveal' class
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                element.classList.remove('active');
            }
        });
    };
    
    // Initial check for elements in view on page load
    revealOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', revealOnScroll);
}

// Navbar transformation on scroll
function initNavbarScroll() {
    const body = document.body;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            body.classList.add('scrolled');
        } else {
            body.classList.remove('scrolled');
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
            window.scrollTo({
                top: targetElement.offsetTop - 100,
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