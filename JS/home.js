// HOME VIDEO HANDLING
function handleVideo() {
    var homeSection = document.querySelector('#home');
    if (!homeSection) return;
    var desktopVideo = homeSection.querySelector('.desktop-video');
    var mobileVideo = homeSection.querySelector('.mobile-video');
    if (!desktopVideo || !mobileVideo) return;

    // Check if the device width is less than or equal to 768px (adjust as needed)
    if (window.innerWidth <= 991) {
        // Hide desktop video
        desktopVideo.style.display = 'none';
        // Load mobile video if it's not already loaded
        if (mobileVideo.style.display !== 'block') {
            mobileVideo.style.display = 'block';
            mobileVideo.load(); // Load the mobile video
        }
    } else {
        // Hide mobile video
        mobileVideo.style.display = 'none';
        // Load desktop video if it's not already loaded
        if (desktopVideo.style.display !== 'block') {
            desktopVideo.style.display = 'block';
            desktopVideo.load(); // Load the desktop video
        }
    }
}

function handleVideoSimple() {
    const homeSection = document.querySelector('#home');
    const desktopVideo = homeSection.querySelector('.desktop-video');
    const mobileVideo = homeSection.querySelector('.mobile-video');

    if (window.innerWidth <= 768) {
        desktopVideo.style.display = 'none';
        mobileVideo.style.display = 'block';
    } else {
        desktopVideo.style.display = 'block';
        mobileVideo.style.display = 'none';
    }
}

window.addEventListener('resize', handleVideo);
window.addEventListener('DOMContentLoaded', handleVideo);

// =================================================================
// COUNTDOWN TIMER
function updateCountdown() {
    // Set the target date to September 14, 2025
    const targetDate = new Date('September 14, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    // Calculate time units
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the countdown display
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // Add pulse animation to seconds
    const secondsElement = document.getElementById('seconds');
    if (secondsElement && secondsElement.parentElement) {
        secondsElement.parentElement.classList.remove('pulse-animation');
        setTimeout(() => {
            secondsElement.parentElement.classList.add('pulse-animation');
        }, 50);
    }

    // If countdown is finished
    if (difference < 0) {
        const countdownTimer = document.querySelector('.countdown-timer');
        if (countdownTimer) {
            countdownTimer.innerHTML = '<div class="time-unit"><span class="time-value">EVENT</span><span class="time-label">STARTED</span></div>';
        }
    }
}

// Initialize countdown when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update countdown immediately
    updateCountdown();
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
});