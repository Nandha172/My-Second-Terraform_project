// DOM Elements
const header = document.getElementById('header');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const navLinksItems = document.querySelectorAll('.nav-links li');
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const skillTags = document.querySelectorAll('.skill-tag');

// Mobile Navigation Toggle
burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('nav-active');
    
    // Animate Links
    navLinksItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a nav link
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            navLinksItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Scroll Effect for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Show/Hide Scroll to Top Button
    if (window.scrollY > 500) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});

// Scroll to Top Functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Skills Animation
skillTags.forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'translateY(-5px)';
    });
    
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
        showFormStatus('error', 'Please fill in all fields');
        return;
    }
    
    // Email validation
    if (!isValidEmail(email)) {
        showFormStatus('error', 'Please enter a valid email address');
        return;
    }
    
    // Simulate form submission (in a real-world scenario, this would be an AJAX call to a server)
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Show success message
        showFormStatus('success', 'Your message has been sent successfully! I will get back to you soon.');
    }, 1000);
});

// Helper function to show form status messages
function showFormStatus(type, message) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;
    
    // Hide status message after 5 seconds
    setTimeout(() => {
        formStatus.className = 'form-status';
    }, 5000);
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Typewriter effect for hero section
const heroH1 = document.querySelector('#hero h1');
const heroH2 = document.querySelector('#hero h2');
const originalH1Text = heroH1.textContent;
const originalH2Text = heroH2.textContent;

// Wait for page to load before starting animation
window.addEventListener('load', () => {
    // Reset text content to empty
    heroH1.textContent = '';
    heroH2.textContent = '';
    
    // Type the H1 text
    let i = 0;
    function typeH1() {
        if (i < originalH1Text.length) {
            heroH1.textContent += originalH1Text.charAt(i);
            i++;
            setTimeout(typeH1, 100);
        } else {
            // When H1 is done, start typing H2
            let j = 0;
            function typeH2() {
                if (j < originalH2Text.length) {
                    heroH2.textContent += originalH2Text.charAt(j);
                    j++;
                    setTimeout(typeH2, 100);
                }
            }
            setTimeout(typeH2, 300);
        }
    }
    
    setTimeout(typeH1, 500);
});

// Animate project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2 });

// Set initial styles and observe project cards
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.7s ease';
    observer.observe(card);
});

// Dark/Light mode toggle (to be expanded upon)
function createDarkModeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.classList.add('theme-toggle');
    toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.top = '100px';
    toggleBtn.style.right = '30px';
    toggleBtn.style.zIndex = '999';
    toggleBtn.style.background = '#1abc9c';
    toggleBtn.style.color = 'white';
    toggleBtn.style.border = 'none';
    toggleBtn.style.borderRadius = '50%';
    toggleBtn.style.width = '40px';
    toggleBtn.style.height = '40px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.boxShadow = '0 3px 10px rgba(0,0,0,0.2)';
    
    document.body.appendChild(toggleBtn);
    
    // This is a placeholder for actual implementation
    toggleBtn.addEventListener('click', () => {
        // Alert message for now - would be replaced with actual theme toggle functionality
        alert('Dark/Light mode toggle will be implemented in a future update!');
    });
}

// Uncomment to add a theme toggle button
// createDarkModeToggle();

// Add smooth scrolling to all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Project filter functionality can be added here in the future
// This would allow filtering projects by technology or category

// Add loading animation when page loads
window.addEventListener('load', () => {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = '#2d3e50';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    
    // Create loading spinner
    const spinner = document.createElement('div');
    spinner.style.border = '5px solid rgba(255, 255, 255, 0.3)';
    spinner.style.borderTop = '5px solid #1abc9c';
    spinner.style.borderRadius = '50%';
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.animation = 'spin 1s linear infinite';
    
    // Add keyframes for spinner animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    loadingOverlay.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
    
    // Remove loading overlay after a short delay
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        loadingOverlay.style.visibility = 'hidden';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 1000);
});