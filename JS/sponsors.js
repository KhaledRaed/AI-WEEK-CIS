// Sponsors Section JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeSponsorsSection();
    initializeSponsorsAnimations();
    initializePartnershipButton();
    handleSponsorsResponsive();
});

// Main initialization function
function initializeSponsorsSection() {
    console.log('Sponsors section initialized');
    
    enhanceScrollingBehavior();
    addSponsorLogoEffects();
    initializeTierBadges();
}

// Enhance scrolling behavior with dynamic speed control
function enhanceScrollingBehavior() {
    const tracks = document.querySelectorAll('.sponsors-track');
    
    tracks.forEach((track, index) => {
        const baseSpeed = 30 + (index * 5);
        track.style.animationDuration = `${baseSpeed}s`;
        
        track.addEventListener('mouseenter', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', () => {
            track.style.animationPlayState = 'running';
        });
        
        track.addEventListener('touchstart', () => {
            track.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('touchend', () => {
            setTimeout(() => {
                track.style.animationPlayState = 'running';
            }, 2000);
        });
    });
}

// Add enhanced effects to sponsor logos
function addSponsorLogoEffects() {
    const sponsorLogos = document.querySelectorAll('.sponsor-logo');
    
    sponsorLogos.forEach((logo, index) => {
        logo.style.animationDelay = `${index * 0.1}s`;
        
        logo.addEventListener('mouseenter', function() {
            const track = this.closest('.sponsors-track');
            if (track) {
                track.style.animationPlayState = 'paused';
            }
            
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3), 0 0 30px rgba(51, 205, 226, 0.4)';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        logo.addEventListener('mouseleave', function() {
            const track = this.closest('.sponsors-track');
            if (track) {
                setTimeout(() => {
                    track.style.animationPlayState = 'running';
                }, 500);
            }
            
            this.style.boxShadow = '';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
        
        logo.addEventListener('click', function() {
            this.classList.add('logo-clicked');
            setTimeout(() => {
                this.classList.remove('logo-clicked');
            }, 1000);
        });
    });
}

// Initialize tier badge animations
function initializeTierBadges() {
    const tierBadges = document.querySelectorAll('.tier-badge');
    
    tierBadges.forEach((badge, index) => {
        // Add sequential reveal animation
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(30px)';
        badge.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 200);
        
        // Add click ripple effect
        badge.addEventListener('click', function(e) {
            createRippleEffect(e, this);
        });
    });
}

function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    // Style the ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Initialize intersection observer for scroll animations
function initializeSponsorsAnimations() {
    const sponsorTiers = document.querySelectorAll('.sponsor-tier');
    const ctaSection = document.querySelector('.partnership-cta');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                    
                    if (entry.target.classList.contains('sponsor-tier')) {
                        animateTierEntry(entry.target);
                    }
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    sponsorTiers.forEach(tier => {
        observer.observe(tier);
    });
    
    // Observe CTA section
    if (ctaSection) {
        observer.observe(ctaSection);
    }
}

// Animate tier entry with logo cascade effect
function animateTierEntry(tierElement) {
    const logos = tierElement.querySelectorAll('.sponsor-logo');
    const track = tierElement.querySelector('.sponsors-track');
    
    // Initially hide all logos
    logos.forEach(logo => {
        logo.style.opacity = '0';
        logo.style.transform = 'translateY(50px) scale(0.8)';
    });
    
    // Animate logos in sequence
    logos.forEach((logo, index) => {
        setTimeout(() => {
            logo.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            logo.style.opacity = '1';
            logo.style.transform = 'translateY(0) scale(1)';
            
            // Add a subtle bounce effect
            setTimeout(() => {
                logo.style.transform = 'translateY(-5px) scale(1.05)';
                setTimeout(() => {
                    logo.style.transform = 'translateY(0) scale(1)';
                }, 200);
            }, 300);
        }, index * 100);
    });
    
    // Start the scrolling animation after logos are visible
    setTimeout(() => {
        if (track) {
            track.style.animationPlayState = 'running';
        }
    }, logos.length * 100 + 500);
}


// Add hover sound effect (optional)
partnershipBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-3px) scale(1.02)';
});

partnershipBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
});

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        'info': '💼',
        'success': '✅',
        'warning': '⚠️',
        'error': '❌'
    };
    return icons[type] || '💼';
}

// Handle responsive behavior
function handleSponsorsResponsive() {
    function adjustForScreenSize() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 1024;
        const tracks = document.querySelectorAll('.sponsors-track');
        
        tracks.forEach((track, index) => {
            if (isMobile) {
                const mobileSpeed = 40 + (index * 8);
                track.style.animationDuration = `${mobileSpeed}s`;
            } else if (isTablet) {
                const tabletSpeed = 35 + (index * 6);
                track.style.animationDuration = `${tabletSpeed}s`;
            } else {
                const desktopSpeed = 25 + (index * 5);
                track.style.animationDuration = `${desktopSpeed}s`;
            }
        });
        
        tracks.forEach(track => {
            if (isMobile) {
                track.style.gap = '20px';
            } else if (isTablet) {
                track.style.gap = '40px';
            } else {
                track.style.gap = '60px';
            }
        });
    }
    
    adjustForScreenSize();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(adjustForScreenSize, 250);
    });
}

// Performance: Pause animations when not visible
function optimizePerformance() {
    const sponsorsSection = document.querySelector('.sponsors-section');
    
    if (!sponsorsSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const tracks = entry.target.querySelectorAll('.sponsors-track');
            
            if (entry.isIntersecting) {
                tracks.forEach(track => {
                    track.style.animationPlayState = 'running';
                });
            } else {
                tracks.forEach(track => {
                    track.style.animationPlayState = 'paused';
                });
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(sponsorsSection);
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', function() {
    optimizePerformance();
});

// Add custom CSS animations
const sponsorAnimationCSS = `
@keyframes bounce {
    0%, 20%, 60%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    80% { transform: translateY(-5px); }
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

@keyframes logo-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.logo-clicked {
    animation: logo-pulse 0.6s ease;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-icon {
    font-size: 1.2rem;
}

.notification-message {
    font-size: 0.95rem;
    line-height: 1.4;
}

.animate-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* Accessibility improvements */
@media (prefers-reduced-motion: reduce) {
    .sponsors-track {
        animation-duration: 100s !important;
    }
    
    .sponsor-logo:hover {
        transform: none !important;
    }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
    .sponsor-logo {
        border: 2px solid white !important;
    }
    
    .tier-badge {
        border-width: 3px !important;
    }
}
`;

// Inject sponsor animation CSS
const sponsorStyle = document.createElement('style');
sponsorStyle.textContent = sponsorAnimationCSS;
document.head.appendChild(sponsorStyle);

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    const partnershipBtn = document.querySelector('.partnership-btn');
    
    if (e.key === 'Enter' && document.activeElement === partnershipBtn) {
        e.preventDefault();
        partnershipBtn.click();
    }
});

// Touch gesture support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    if (e.target.closest('.sponsors-track')) {
        touchStartX = e.changedTouches[0].screenX;
    }
});

document.addEventListener('touchend', function(e) {
    if (e.target.closest('.sponsors-track')) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    }
});

function handleSwipeGesture() {
    const track = document.querySelector('.sponsors-track');
    if (!track) return;
    
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > 50) {
        if (swipeDistance > 0) {
            track.style.animationDuration = '60s';
        } else {
            track.style.animationDuration = '15s';
        }
        
        setTimeout(() => {
            track.style.animationDuration = '';
        }, 3000);
    }
}
