// ========================================
// MULTI-STEP APPLICATION FORM
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    const formSteps = document.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const currentStepDisplay = document.getElementById('currentStep');
    const progressPercentDisplay = document.getElementById('progressPercent');

    let currentStep = 1;
    const totalSteps = 7;

    // Progress percentages for each step
    const progressMap = {
        1: 14,
        2: 29,
        3: 43,
        4: 57,
        5: 71,
        6: 86,
        7: 100
    };

    // Initialize
    updateProgress();

    // Continue buttons
    const continueButtons = document.querySelectorAll('.btn-continue');
    continueButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.getAttribute('data-next'));
            if (validateCurrentStep()) {
                goToStep(nextStep);
            }
        });
    });

    // Back buttons
    const backButtons = document.querySelectorAll('.btn-back');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (validateCurrentStep()) {
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            // Get all form data
            const formData = new FormData(form);
            const data = {};

            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }

            // Add metadata
            data.submittedAt = firebase.firestore.FieldValue.serverTimestamp();
            data.status = 'new';

            try {
                await db.collection('applications').add(data);
                window.location.href = 'apply-success.html';
            } catch (error) {
                console.error('Error submitting application:', error);
                alert('Something went wrong. Please try again or contact us at hello@blueprxnt.com');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        }
    });

    // Checkbox limit for priorities (max 3)
    const priorityCheckboxes = document.querySelectorAll('input[name="priorities"]');
    priorityCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkedCount = document.querySelectorAll('input[name="priorities"]:checked').length;
            if (checkedCount > 3) {
                this.checked = false;
                alert('Please select up to 3 priorities only.');
            }
        });
    });

    // Function to go to a specific step
    function goToStep(stepNumber) {
        // Remove active class from current step
        formSteps.forEach(step => step.classList.remove('active'));

        // Add active class to new step
        const newStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (newStep) {
            newStep.classList.add('active');
            currentStep = stepNumber;
            updateProgress();
            scrollToTop();
        }
    }

    // Function to update progress bar
    function updateProgress() {
        const percent = progressMap[currentStep];
        progressFill.style.width = `${percent}%`;
        currentStepDisplay.textContent = currentStep;
        progressPercentDisplay.textContent = percent;
    }

    // Function to validate current step
    function validateCurrentStep() {
        const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
        const requiredInputs = currentStepElement.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            // Remove previous error states
            input.classList.remove('error');

            // Check if input is filled
            if (input.type === 'radio') {
                const radioGroup = currentStepElement.querySelectorAll(`[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    isValid = false;
                    // Mark the first radio in the group
                    radioGroup[0].closest('.radio-group').style.borderColor = '#ef4444';
                }
            } else if (input.type === 'checkbox') {
                // For checkboxes, check if at least one is checked (if required)
                const checkboxGroup = currentStepElement.querySelectorAll(`[name="${input.name}"]`);
                const isChecked = Array.from(checkboxGroup).some(cb => cb.checked);
                if (!isChecked && input.hasAttribute('required')) {
                    isValid = false;
                }
            } else {
                // Text inputs, textareas, etc.
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                }
            }
        });

        if (!isValid) {
            // Scroll to first error
            const firstError = currentStepElement.querySelector('.error, .radio-group[style*="border-color"]');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        return isValid;
    }

    // Remove error state on input
    const allInputs = document.querySelectorAll('.form-input, .form-textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
        });
    });

    // Reset radio group border on selection
    const allRadios = document.querySelectorAll('input[type="radio"]');
    allRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const radioGroup = this.closest('.radio-group');
            if (radioGroup) {
                radioGroup.style.borderColor = '';
            }
        });
    });

    // Function to scroll to top smoothly
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.classList.add('error');
            }
        });
    }

    // Phone formatting (optional enhancement)
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }
});
