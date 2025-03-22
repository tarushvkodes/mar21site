// Main JavaScript for March 21, 2025 website
document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initScrollAnimations();
    initSmoothScroll();
    
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
    const navContainer = document.querySelector('.nav-container');
    const revealElements = document.querySelectorAll('.reveal');
    
    const handleScroll = () => {
        const scrollY = window.scrollY;
        
        // Update navigation appearance with a threshold
        if (scrollY > 20) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
        
        // Reveal elements on scroll
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    // Initial check and scroll event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.nav-container').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Dynamic date display
const currentYear = new Date().getFullYear();
document.querySelectorAll('.current-year').forEach(element => {
    element.textContent = currentYear;
});