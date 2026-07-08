// ============================================
// MOBILE NAVIGATION
// ============================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (scrollY > 100) {
            navbar.style.background = 'rgba(13, 13, 13, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
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

if (reservationForm && reservationSuccess) {
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
        reservationForm.classList.add('hidden');
        reservationSuccess.classList.add('visible');

        // Scroll to success message
        reservationSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

// Reset form function
function resetForm() {
    if (reservationForm) {
        reservationForm.reset();
        reservationForm.classList.remove('hidden');
        reservationSuccess.classList.remove('visible');
    }
}

// Make resetForm available globally
window.resetForm = resetForm;

// ============================================
// DATE PICKER MIN DATE (today)
// ============================================
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate privatization items
    const privItems = document.querySelectorAll('.priv-item');
    privItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal');
        observer.observe(header);
    });

    // Animate about content
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) {
        aboutText.classList.add('reveal-left');
        observer.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('reveal-right');
        observer.observe(aboutImage);
    }

    // Animate classes content
    const classesText = document.querySelector('.classes-text');
    const classesImage = document.querySelector('.classes-image');
    if (classesText) {
        classesText.classList.add('reveal-left');
        observer.observe(classesText);
    }
    if (classesImage) {
        classesImage.classList.add('reveal-right');
        observer.observe(classesImage);
    }

    // Animate contact info
    const contactInfo = document.querySelector('.contact-info');
    const contactMap = document.querySelector('.contact-map');
    if (contactInfo) {
        contactInfo.classList.add('reveal-left');
        observer.observe(contactInfo);
    }
    if (contactMap) {
        contactMap.classList.add('reveal-right');
        observer.observe(contactMap);
    }

    // Animate hours items
    const hoursItems = document.querySelectorAll('.hours-item');
    hoursItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
});

// ============================================
// HERO PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ============================================
// GALLERY HOVER EFFECT
// ============================================
const galleryItemsForHover = document.querySelectorAll('.gallery-item');

galleryItemsForHover.forEach(item => {
    item.addEventListener('mouseenter', () => {
        galleryItemsForHover.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.6';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        galleryItemsForHover.forEach(otherItem => {
            otherItem.style.opacity = '1';
        });
    });
});

// ============================================
// FORM VALIDATION STYLING
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#4CAF50';
        } else if (input.hasAttribute('required')) {
            input.style.borderColor = '#e74c3c';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// ============================================
// PAGE LOADED NOTIFICATION
// ============================================
window.addEventListener('load', () => {
    console.log('✓ Page loaded successfully');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🍽️ Restaurant Kerangal', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cBienvenue! Ce site a été créé avec HTML, CSS et JavaScript', 'font-size: 14px; color: #7a7a7a;');

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

    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    if (scrollY > 100) {
        navbar.style.background = 'rgba(13, 13, 13, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(13, 13, 13, 0.95)';
        navbar.style.boxShadow = 'none';
    }
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
    reservationForm.classList.add('hidden');
    reservationSuccess.classList.add('visible');

    // Scroll to success message
    reservationSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

// Reset form function
function resetForm() {
    reservationForm.reset();
    reservationForm.classList.remove('hidden');
    reservationSuccess.classList.remove('visible');
}

// Make resetForm available globally
window.resetForm = resetForm;

// ============================================
// DATE PICKER MIN DATE (today)
// ============================================
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Animate menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Animate gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        item.classList.add('reveal-scale');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate feature items
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Animate privatization items
    const privItems = document.querySelectorAll('.priv-item');
    privItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(item);
    });

    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.classList.add('reveal');
        observer.observe(header);
    });

    // Animate about content
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    if (aboutText) {
        aboutText.classList.add('reveal-left');
        observer.observe(aboutText);
    }
    if (aboutImage) {
        aboutImage.classList.add('reveal-right');
        observer.observe(aboutImage);
    }

    // Animate classes content
    const classesText = document.querySelector('.classes-text');
    const classesImage = document.querySelector('.classes-image');
    if (classesText) {
        classesText.classList.add('reveal-left');
        observer.observe(classesText);
    }
    if (classesImage) {
        classesImage.classList.add('reveal-right');
        observer.observe(classesImage);
    }

    // Animate contact info
    const contactInfo = document.querySelector('.contact-info');
    const contactMap = document.querySelector('.contact-map');
    if (contactInfo) {
        contactInfo.classList.add('reveal-left');
        observer.observe(contactInfo);
    }
    if (contactMap) {
        contactMap.classList.add('reveal-right');
        observer.observe(contactMap);
    }

    // Animate hours items
    const hoursItems = document.querySelectorAll('.hours-item');
    hoursItems.forEach((item, index) => {
        item.classList.add('reveal');
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });
});

// ============================================
// HERO PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;

    if (hero) {
        hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
});

// ============================================
// GALLERY HOVER EFFECT
// ============================================
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        galleryItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.style.opacity = '0.6';
            }
        });
    });

    item.addEventListener('mouseleave', () => {
        galleryItems.forEach(otherItem => {
            otherItem.style.opacity = '1';
        });
    });
});

// ============================================
// FORM VALIDATION STYLING
// ============================================
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            input.style.borderColor = '#4CAF50';
        } else if (input.hasAttribute('required')) {
            input.style.borderColor = '#e74c3c';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// ============================================
// PAGE LOADED NOTIFICATION
// ============================================
window.addEventListener('load', () => {
    console.log('✓ Page loaded successfully');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🍽️ Restaurant Kerangal', 'font-size: 20px; font-weight: bold; color: #d4af37;');
console.log('%cBienvenue! Ce site a été créé avec HTML, CSS et JavaScript', 'font-size: 14px; color: #7a7a7a;');
