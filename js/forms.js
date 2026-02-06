// Form Handling for Contact and Application Forms

// Contact Form Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            objectives: document.getElementById('objectives').value,
            source: document.getElementById('source').value
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.service || !formData.objectives) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        console.log('Contact Form Data:', formData);

        // Show success message
        alert('Thank you for your message! We\'ll get back to you within 24-48 hours.');

        // Reset form
        contactForm.reset();

        // In production, you would send this to a server:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // }).then(response => response.json()).then(data => {
        //     // Handle response
        // });
    });
}

// Application Form Handler
const applicationForm = document.getElementById('applicationForm');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            primaryGoal: document.getElementById('primaryGoal').value,
            aboutYou: document.getElementById('aboutYou').value,
            coachingTier: document.getElementById('coachingTier')?.value || 'Not specified',
            timeline: document.getElementById('timeline')?.value,
            agreement: document.getElementById('agreement')?.checked
        };

        // Basic validation
        if (!formData.fullName || !formData.email || !formData.primaryGoal || !formData.aboutYou) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        if (!validateEmail(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Agreement validation
        if (!formData.agreement) {
            alert('Please acknowledge the agreement to proceed.');
            return;
        }

        // Simulate form submission
        console.log('Application Form Data:', formData);

        // Show success message
        alert('Thank you for your application! We\'ll review it and get back to you within 24-48 hours to schedule your consultation call.');

        // Reset form
        applicationForm.reset();

        // Optionally redirect to a thank you page
        // window.location.href = '/thank-you.html';

        // In production, you would send this to a server:
        // fetch('/api/apply', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // }).then(response => response.json()).then(data => {
        //     // Handle response
        // });
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Real-time validation feedback
const emailInputs = document.querySelectorAll('input[type="email"]');
emailInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = '';
        }
    });

    input.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(239, 68, 68)') {
            if (validateEmail(this.value)) {
                this.style.borderColor = '';
            }
        }
    });
});

// Character counter for textarea
const textareas = document.querySelectorAll('textarea');
textareas.forEach(textarea => {
    const maxLength = textarea.getAttribute('maxlength');
    if (maxLength) {
        // Create counter element
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.fontSize = '0.875rem';
        counter.style.color = '#a1a1aa';
        counter.style.textAlign = 'right';
        counter.style.marginTop = '0.5rem';

        // Insert after textarea
        textarea.parentNode.appendChild(counter);

        // Update counter
        const updateCounter = () => {
            const remaining = maxLength - textarea.value.length;
            counter.textContent = `${remaining} characters remaining`;
            if (remaining < 50) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#a1a1aa';
            }
        };

        textarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});

// Form field focus effects
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 200ms ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Prevent multiple form submissions
let formSubmitting = false;
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        if (formSubmitting) {
            e.preventDefault();
            return false;
        }
        formSubmitting = true;

        // Re-enable after 3 seconds
        setTimeout(() => {
            formSubmitting = false;
        }, 3000);
    });
});

// Auto-save form data to localStorage (optional feature)
function enableAutoSave(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const storageKey = `${formId}_autosave`;

    // Load saved data
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = form.elements[key];
                if (field && field.type !== 'checkbox') {
                    field.value = data[key];
                }
            });
        } catch (e) {
            console.error('Error loading saved form data:', e);
        }
    }

    // Save data on input
    form.addEventListener('input', function() {
        const formData = {};
        Array.from(form.elements).forEach(field => {
            if (field.name && field.type !== 'checkbox' && field.type !== 'submit') {
                formData[field.name] = field.value;
            }
        });
        localStorage.setItem(storageKey, JSON.stringify(formData));
    });

    // Clear on submit
    form.addEventListener('submit', function() {
        localStorage.removeItem(storageKey);
    });
}

// Enable auto-save for application form (optional)
// enableAutoSave('applicationForm');
// enableAutoSave('contactForm');
