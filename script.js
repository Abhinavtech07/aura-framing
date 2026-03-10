// --- 1. Touch-Optimized Dark/Light Mode Toggle ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggleBtn.querySelector('i');

// Check for saved theme in local storage
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- 2. Haptic Feedback (Vibration) ---
const hapticBtns = document.querySelectorAll('.haptic-btn');

hapticBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Triggers a subtle 50ms vibration on Android/supported devices
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }
    });
});

// --- 3. Scroll-Triggered Animations ---
const scrollElements = document.querySelectorAll('.animate-on-scroll');

const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
};

const displayScrollElement = (element) => {
    element.classList.add('visible');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.25)) {
            displayScrollElement(el);
        }
    });
};

// --- 4. Floating Action Button (FAB) Logic ---
const fab = document.getElementById('fab');

window.addEventListener('scroll', () => {
    handleScrollAnimation(); // Trigger animations
    
    // Show/Hide FAB based on scroll position
    if (window.scrollY > 200) {
        fab.style.display = 'block';
    } else {
        fab.style.display = 'none';
    }
});

// Scroll to top when FAB is clicked
fab.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});