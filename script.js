/**
 * PIXBOOTH.PK - Main JavaScript File
 * Contains common functionality for all pages
 */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('PixBooth.pk - Page loaded successfully');
    
    // Initialize mobile menu toggle
    initMobileMenu();
    
    // Set current year in footer
    setCurrentYear();
    
    // Set active nav link based on current page
    setActiveNav();
    
    // Initialize appointment modal if on booths page
    if (document.querySelector('.book-booth-btn')) {
        initAppointmentModal();
    }
});

/**
 * Initialize mobile menu toggle functionality
 */
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '✕' 
            : '☰';
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (hamburger) {
                hamburger.innerHTML = '☰';
            }
        });
    });
}

/**
 * Set current year in footer copyright
 */
function setCurrentYear() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

/**
 * Set active navigation link based on current page
 */
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        
        // Check if this link matches current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '') ||
            (currentPage && linkPage && currentPage.includes(linkPage.replace('.html', '')))) {
            link.classList.add('active');
        }
    });
}

/**
 * Initialize appointment booking modal
 * Only runs on booths page
 */
function initAppointmentModal() {
    const modalOverlay = document.getElementById('appointmentModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const appointmentForm = document.getElementById('appointmentForm');
    
    if (!modalOverlay) return;
    
    // Open modal when clicking any "Book Booth" button
    document.querySelectorAll('.book-booth-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get booth name from data attribute or text
            const boothName = this.getAttribute('data-booth') || 
                            this.closest('.booth-card').querySelector('h3').textContent;
            
            // Set booth name in form
            const boothNameField = document.getElementById('boothName');
            if (boothNameField) {
                boothNameField.value = boothName;
            }
            
            // Show modal
            modalOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal when clicking X button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Handle form submission
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.name || !data.email || !data.phone || !data.eventDate) {
                alert('Please fill in all required fields');
                return;
            }
            
            // In real application, you would send data to server here
            // For demo, we'll just show success message
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Success message
                alert(`Thank you ${data.name}! Your appointment request for ${data.boothName} has been received. We will contact you at ${data.phone} within 24 hours.`);
                
                // Reset form
                appointmentForm.reset();
                
                // Close modal
                modalOverlay.style.display = 'none';
                document.body.style.overflow = 'auto';
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Log data to console (for debugging)
                console.log('Appointment request:', data);
                
            }, 1500);
        });
    }
}

/**
 * Utility function to format date for input field
 */
function getTomorrowDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
}

// Set minimum date for event date input
document.addEventListener('DOMContentLoaded', function() {
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        eventDateInput.min = getTomorrowDate();
    }
});