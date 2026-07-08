// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    // Ensure the preloader stays for at least a moment to show the animation
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Enable scroll after preloader is gone (optional, if you hid overflow)
        document.body.style.overflow = 'auto';
    }, 2000);
});

// ============================================
// MOBILE NAVIGATION
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');

    // Animate links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `fadeInUp 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navLinks.forEach(link => link.style.animation = '');
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Height of navbar
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// ACTIVE NAVIGATION ON SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
});

// ============================================
// MENU CATEGORY SWITCHING
// ============================================
const menuButtons = document.querySelectorAll('.menu-btn');
const menuCategories = document.querySelectorAll('.menu-category');

menuButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        // Update active button
        menuButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Show corresponding category
        menuCategories.forEach(cat => {
            cat.classList.remove('active');
            if (cat.id === category) {
                cat.classList.add('active');
            }
        });
    });
});

// ============================================
// RESERVATION FORM
// ============================================
const reservationForm = document.getElementById('reservationForm');
const reservationSuccess = document.getElementById('reservationSuccess');

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            guests: document.getElementById('guests').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            message: document.getElementById('message').value
        };

        // Log form data (in production, this would be sent to a server)
        console.log('Reservation submitted:', formData);

        // Show success message
        reservationForm.style.display = 'none';
        reservationSuccess.classList.add('visible');

        // Scroll to success message
        reservationSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Reset form function
function resetForm() {
    reservationForm.reset();
    reservationForm.style.display = 'block';
    reservationSuccess.classList.remove('visible');
}

// Make resetForm available globally
window.resetForm = resetForm;

// ============================================
// MODAL LOGIC
// ============================================
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
        // Trigger reflow
        modal.offsetHeight;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        closeModal(e.target.id);
    }
});

// Make functions global
window.openModal = openModal;
window.closeModal = closeModal;

// ============================================
// DEVIS FORM
// ============================================
const devisForm = document.getElementById('devisForm');
const devisSuccess = document.getElementById('devisSuccess');

if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // ... (keep existing logic or simplify for demo) ...
        devisForm.style.display = 'none';
        devisSuccess.classList.add('visible');
    });
}

function resetDevisForm() {
    devisForm.reset();
    devisForm.style.display = 'block';
    devisSuccess.classList.remove('visible');
}
window.resetDevisForm = resetDevisForm;

// ============================================
// COOKING CLASS FORM
// ============================================
const coursForm = document.getElementById('coursForm');
const coursSuccess = document.getElementById('coursSuccess');

if (coursForm) {
    coursForm.addEventListener('submit', (e) => {
        e.preventDefault();
        coursForm.style.display = 'none';
        coursSuccess.classList.add('visible');
    });
}

function resetCoursForm() {
    coursForm.reset();
    coursForm.style.display = 'block';
    coursSuccess.classList.remove('visible');
}
window.resetCoursForm = resetCoursForm;

// ============================================
// DATE PICKER MIN DATE (today)
// ============================================
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ============================================
// SCROLL ANIMATIONS (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Helper to add reveal class and observe
    const observeElements = (selector, delayStep = 0) => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('reveal');
            if (delayStep > 0) {
                el.style.transitionDelay = `${index * delayStep}s`;
            }
            observer.observe(el);
        });
    };

    observeElements('.section-header');
    observeElements('.about-text');
    observeElements('.about-image');
    observeElements('.menu-item', 0.1);
    observeElements('.gallery-item', 0.1);
    observeElements('.feature-item', 0.2);
    observeElements('.priv-item', 0.15);
    observeElements('.hours-item', 0.2);
    observeElements('.contact-item', 0.2);
});

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }

    // Privatization parallax
    const privatization = document.querySelector('.privatization');
    if (privatization) {
        const limit = privatization.offsetTop + privatization.offsetHeight;
        if (scrolled > privatization.offsetTop - window.innerHeight && scrolled < limit) {
            privatization.style.backgroundPositionY = `${(scrolled - privatization.offsetTop) * 0.5}px`;
        }
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🍽️ Restaurant Kerangal', 'font-size: 20px; font-weight: bold; color: #d4af37; background: #000; padding: 10px; border-radius: 5px;');
console.log('%cBienvenue! Site modernisé.', 'font-size: 14px; color: #7a7a7a;');
