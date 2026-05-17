document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-xmark');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('active');
            observer.unobserve(entry.target); // Optional: only animate once
        });
    }, revealOptions);

    revealElements.forEach(el => revealOnScroll.observe(el));

    // Modal Logic
    const modal = document.getElementById('demo-modal');
    const openBtns = document.querySelectorAll('.open-demo-btn');
    const closeBtn = document.getElementById('close-modal');
    const demoForm = document.getElementById('demoForm'); // Updated to use the correct ID
    const successMessage = document.getElementById('success-message');
    const closeSuccessBtn = document.getElementById('close-success');

    const openModal = (e) => {
        if (e) e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore background scrolling
        // Reset form state after animation finishes
        setTimeout(() => {
            demoForm.style.display = 'flex';
            successMessage.style.display = 'none';
            demoForm.reset();
        }, 400);
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeModal);

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Form Submission Logic communicating with Express Backend
    if (demoForm) {
        demoForm.addEventListener('submit', async (e) => {
            // Prevent default form submit
            e.preventDefault();
            
            // Collect all form values using provided IDs
            const formData = {
                fullName: document.getElementById('fullName').value,
                companyName: document.getElementById('companyName').value,
                businessType: document.getElementById('businessType').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            console.log('Sending Form Data:', formData);

            // Change UI to loading state
            const submitBtn = demoForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
                submitBtn.disabled = true;
            }

            try {
                // Send fetch POST request to backend API using relative path (works everywhere)
                const response = await fetch('/api/submit-demo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Show success message
                    demoForm.style.display = 'none';
                    if (successMessage) successMessage.style.display = 'block';
                    console.log('Success:', data.message);
                } else {
                    // Show error message
                    alert('Error: ' + data.message);
                    console.error('Server Error:', data.message);
                }
            } catch (error) {
                // Handle network or other fetch errors
                alert('An error occurred while submitting the request.');
                console.error('Fetch Error:', error);
            } finally {
                // Restore button state
                if (submitBtn) {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }
        });
    }

    // Update Call Duration Timer
    const durationEl = document.querySelector('.call-duration');
    if (durationEl) {
        let seconds = 42;
        setInterval(() => {
            seconds++;
            const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
            const secs = (seconds % 60).toString().padStart(2, '0');
            durationEl.textContent = `${mins}:${secs}`;
        }, 1000);
    }
});
