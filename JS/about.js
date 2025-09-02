// AI Week Timeline JavaScript
document.addEventListener('DOMContentLoaded', function () {
    // Initialize timeline animations
    initializeTimeline();

    // Initialize button interactions
    initializeButtons();

    // Initialize scroll animations
    initializeScrollAnimations();
});

// Timeline Animation Functions
function initializeTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    // Create intersection observer for timeline items
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    // Observe all timeline items
    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Button Interaction Functions
function initializeButtons() {
    const joinButtons = document.querySelectorAll('.join-btn');

    joinButtons.forEach(button => {
        // Add click event listener
        button.addEventListener('click', function (e) {
            e.preventDefault();

            const eventType = this.getAttribute('data-event');
            handleJoinEvent(eventType);

            // Add ripple effect
            createRippleEffect(e, this);

            // Add button animation
            animateButton(this);
        });

        // Add hover effects
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(-2px)';
        });
    });
}

// Handle join event actions
function handleJoinEvent(eventType) {
    const eventActions = {
        'workshops': () => {
            console.log('Joining Workshops Day...');
            window.open('https://sprw.io/stt-QB6cR', '_blank');
            showNotification('Redirecting to Workshops registration...', 'info');
        },
        'hackathon': () => {
            console.log('Joining Hackathon...');
            window.open('https://sprw.io/stt-IAsI7', '_blank');
            showNotification('Redirecting to Hackathon registration...', 'info');
        },
        'congress': () => {
            console.log('Joining Congress Day...');
            window.open('https://sprw.io/stt-oVDVy','_blank');
            showNotification('Redirecting to Congress registration...', 'info');
        },
        'visits': () => {
            console.log('Joining Field Visits...');
            // Add your registration logic here
            showNotification('Redirecting to Field Visits registration...', 'info');
        }
    };

    if (eventActions[eventType]) {
        eventActions[eventType]();
    }
}

// Create ripple effect on button click
function createRippleEffect(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';

    button.appendChild(ripple);

    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS animation for ripple effect
const rippleCSS = `
@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

// Inject ripple CSS
const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Animate button on click
function animateButton(button) {
    button.style.transform = 'scale(0.95) translateY(0)';

    setTimeout(() => {
        button.style.transform = 'scale(1) translateY(-2px)';
    }, 150);
}

// Scroll Animations - FIXED VERSION
function initializeScrollAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    let animatedStats = new Set(); 

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animatedStats.has(entry.target)) {
                animateCounter(entry.target);
                animatedStats.add(entry.target); 
            }
        });
    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Animate counter numbers - FIXED VERSION
function animateCounter(element) {
    const target = element.textContent.trim();
    let numericValue, suffix;

    // Handle different number formats
    if (target.includes('hrs')) {
        numericValue = parseInt(target.replace('hrs', ''));
        suffix = 'hrs';
    } else if (target.includes('+')) {
        numericValue = parseInt(target.replace('+', ''));
        suffix = '+';
    } else {
        numericValue = parseInt(target.replace(/\D/g, ''));
        suffix = target.replace(/\d/g, '');
    }

    // Prevent animation if already running
    if (element.dataset.animating === 'true') {
        return;
    }

    element.dataset.animating = 'true';
    let current = 0;
    const increment = numericValue / 60; 
    const duration = 2000; 
    const stepTime = duration / 60;

    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
            element.dataset.animating = 'false';
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(90deg, #33CDE2, #146889);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-family: "Montserrat", sans-serif;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(51, 205, 226, 0.3);
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Smooth scrolling for navigation (if needed)
function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Enhanced timeline marker animations
function enhanceTimelineMarkers() {
    const markers = document.querySelectorAll('.marker-dot');

    markers.forEach((marker, index) => {
        // Add sequential glow effect
        setTimeout(() => {
            marker.style.animation = `pulse 2s infinite ${index * 0.5}s`;
        }, index * 200);
    });
}

// Initialize enhanced animations when page loads
window.addEventListener('load', function () {
    setTimeout(() => {
        enhanceTimelineMarkers();
    }, 1000);
});

// Add parallax effect to timeline items
function addParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach((item, index) => {
            const rate = scrolled * -0.1;
            item.style.transform = `translateY(${rate}px)`;
        });
    });
}

addParallaxEffect();

// Day card hover enhancements
document.querySelectorAll('.day-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Handle responsive timeline adjustments
function handleResponsiveTimeline() {
    function checkScreenSize() {
        const isMobile = window.innerWidth <= 768;
        const timelineItems = document.querySelectorAll('.timeline-item');

        timelineItems.forEach(item => {
            if (isMobile) {
                item.classList.add('mobile-layout');
            } else {
                item.classList.remove('mobile-layout');
            }
        });
    }

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
}

// Initialize responsive handling
handleResponsiveTimeline();