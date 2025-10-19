// Enhanced JavaScript - Unique Solutions Website
// Features: Dark Theme, Advanced Animations, Performance Optimized

(function() {
    'use strict';
    
    // ==========================================
    // DARK THEME FUNCTIONALITY
    // ==========================================
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add ripple effect
        createRipple(themeToggle);
    });
    
    function updateThemeIcon(theme) {
        // Add rotation animation
        themeIcon.style.transform = 'rotate(360deg) scale(0)';
        
        setTimeout(() => {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
            } else {
                themeIcon.className = 'fas fa-moon';
            }
            themeIcon.style.transform = 'rotate(0deg) scale(1)';
        }, 150);
    }
    
    // Ripple effect for buttons
    function createRipple(element) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.width = ripple.style.height = '100px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }
    
    // ==========================================
    // ENHANCED LOADER WITH PROGRESS
    // ==========================================
    window.addEventListener('load', function() {
        const loader = document.getElementById('loader');
        const progressBar = document.querySelector('.progress-bar-fill');
        
        // Simulate progress
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                // Fade out loader
                setTimeout(() => {
                    loader.classList.add('fade-out');
                    setTimeout(() => {
                        loader.style.display = 'none';
                        document.body.style.overflow = 'visible';
                    }, 800);
                }, 300);
            }
            progressBar.style.width = progress + '%';
        }, 150);
    });
    
    // Initialize AOS with enhanced settings
    AOS.init({
        duration: 1000,
        once: false, // Allow animations to repeat
        offset: 50,
        easing: 'ease-out-cubic',
        mirror: true, // Animate on scroll up too
        anchorPlacement: 'top-bottom',
    });

    // Cached DOM elements
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('backToTop');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const heroBackground = document.querySelector('.hero-background');

    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Optimized scroll handler with requestAnimationFrame
    let ticking = false;
    let lastScrollY = 0;

    function updateOnScroll() {
        const currentScroll = window.pageYOffset;
        
        // Header scroll effect
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button
        if (currentScroll > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
        
        // Scroll indicator
        if (scrollIndicator) {
            if (currentScroll > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        }
        
        // Parallax effect on hero background
        if (heroBackground && currentScroll < window.innerHeight) {
            const parallaxSpeed = currentScroll * 0.5;
            heroBackground.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    }
    
    // ==========================================
    // ENHANCED SMOOTH SCROLL
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });
    
    // ==========================================
    // SCROLL EVENT HANDLER
    // ==========================================
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, { passive: true });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });

    // Active navigation link highlighting (optimized)
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Back to top button
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Contact form submission with Web3Forms
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formSuccess = document.getElementById('formSuccess');
            const formError = document.getElementById('formError');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Disable submit button and show loading state
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Hide previous messages
            if (formSuccess) formSuccess.style.display = 'none';
            if (formError) formError.style.display = 'none';
            
            try {
                // Get form data
                const formData = new FormData(contactForm);
                
                // Submit to Web3Forms
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });
                
                const data = await response.json();
                
                console.log('Web3Forms Response:', data); // Debug log
                
                if (data.success) {
                    // Show success message
                    if (formSuccess) {
                        formSuccess.textContent = 'Thank you! Your message has been sent successfully.';
                        formSuccess.style.display = 'block';
                        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        if (formSuccess) formSuccess.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error(data.message || 'Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                
                // Show error message with details
                if (formError) {
                    formError.textContent = error.message || 'Oops! Something went wrong. Please try again.';
                    formError.style.display = 'block';
                    formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide error message after 5 seconds
                    setTimeout(() => {
                        if (formError) formError.style.display = 'none';
                    }, 5000);
                }
            } finally {
                // Re-enable submit button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        });
    }

    // Enhanced form validation
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '' && this.hasAttribute('required')) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('is-invalid') && this.value.trim() !== '') {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });
    });

    // Email validation
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(this.value) && this.value.trim() !== '') {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            }
        });
    }

    // Phone validation
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^\d\s\-\+\(\)]/g, '');
        });
    }

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Prevent navbar from staying open on resize
    let windowWidth = window.innerWidth;
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth !== windowWidth) {
            windowWidth = window.innerWidth;
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) bsCollapse.hide();
            }
        }
    }, 250));

    // Lazy loading for images (native + intersection observer fallback)
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src; // Trigger loading
        });
    } else {
        // Fallback to Intersection Observer
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Optimize client cards animation (using intersection observer)
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.client-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        cardObserver.observe(card);
    });

    // Prefetch next section images on hover (performance optimization)
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img[loading="lazy"]');
            if (img && !img.complete) {
                img.loading = 'eager';
            }
        }, { once: true, passive: true });
    });

    // ===== CLIENTS SLIDER (INFINITE CONTINUOUS) =====
    const clientsSlider = document.getElementById('clientsSlider');
    const clientPrevBtn = document.getElementById('clientPrev');
    const clientNextBtn = document.getElementById('clientNext');
    let clientCurrentIndex = 0;
    let clientAutoplayInterval;
    let clientTouchStartX = 0;
    let clientTouchEndX = 0;
    let clientIsTransitioning = false;

    function getClientsPerView() {
        if (window.innerWidth <= 576) return 1;
        if (window.innerWidth <= 768) return 2;
        return 4;
    }

    function cloneClientsForInfinite() {
        if (!clientsSlider) return;
        
        // Remove existing clones
        const existingClones = clientsSlider.querySelectorAll('.client-slide.clone');
        existingClones.forEach(clone => clone.remove());
        
        const clientSlides = Array.from(clientsSlider.querySelectorAll('.client-slide:not(.clone)'));
        const clientsPerView = getClientsPerView();
        
        // Clone ALL slides twice for seamless infinite scrolling
        // Add clones at the end
        clientSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            clientsSlider.appendChild(clone);
        });
        
        // Add clones at the beginning
        clientSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            clientsSlider.insertBefore(clone, clientsSlider.firstChild);
        });
        
        // Start at the first real slide (after the prepended clones)
        clientCurrentIndex = clientSlides.length;
        updateClientsSlider(false);
    }

    function updateClientsSlider(animate = true) {
        if (!clientsSlider) return;
        const allSlides = clientsSlider.querySelectorAll('.client-slide');
        
        if (allSlides.length === 0) return;
        
        const slideWidth = allSlides[0]?.offsetWidth || 0;
        const gap = 30;
        const offset = -(clientCurrentIndex * (slideWidth + gap));
        
        clientsSlider.style.transition = animate ? 'transform 0.6s cubic-bezier(0.45, 0, 0.55, 1)' : 'none';
        clientsSlider.style.transform = `translateX(${offset}px)`;
    }

    function nextClients() {
        if (!clientsSlider || clientIsTransitioning) return;
        
        const originalSlides = clientsSlider.querySelectorAll('.client-slide:not(.clone)');
        const totalSlides = originalSlides.length;
        
        clientIsTransitioning = true;
        clientCurrentIndex++;
        updateClientsSlider(true);
        
        // Check if we need to reset to the real first slide
        setTimeout(() => {
            // If we're past the last original slide, jump back to the first
            if (clientCurrentIndex >= totalSlides * 2) {
                clientCurrentIndex = totalSlides;
                updateClientsSlider(false);
            }
            
            clientIsTransitioning = false;
        }, 600);
    }

    function prevClients() {
        if (!clientsSlider || clientIsTransitioning) return;
        
        const originalSlides = clientsSlider.querySelectorAll('.client-slide:not(.clone)');
        const totalSlides = originalSlides.length;
        
        clientIsTransitioning = true;
        clientCurrentIndex--;
        updateClientsSlider(true);
        
        // Check if we need to reset to the real last slide
        setTimeout(() => {
            // If we're before the first original slide, jump to the last
            if (clientCurrentIndex < totalSlides) {
                clientCurrentIndex = totalSlides * 2 - 1;
                updateClientsSlider(false);
            }
            
            clientIsTransitioning = false;
        }, 600);
    }

    function startClientAutoplay() {
        stopClientAutoplay();
        clientAutoplayInterval = setInterval(nextClients, 3000);
    }

    function stopClientAutoplay() {
        if (clientAutoplayInterval) {
            clearInterval(clientAutoplayInterval);
        }
    }

    // Touch/Swipe handlers for clients slider
    function handleClientTouchStart(e) {
        clientTouchStartX = e.touches ? e.touches[0].clientX : e.clientX;
        clientsSlider.classList.add('dragging');
        stopClientAutoplay();
    }

    function handleClientTouchMove(e) {
        clientTouchEndX = e.touches ? e.touches[0].clientX : e.clientX;
    }

    function handleClientTouchEnd() {
        clientsSlider.classList.remove('dragging');
        
        if (!clientTouchStartX || !clientTouchEndX) return;
        
        const swipeThreshold = 50;
        const difference = clientTouchStartX - clientTouchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swiped left - next
                nextClients();
            } else {
                // Swiped right - previous
                prevClients();
            }
        }
        
        startClientAutoplay();
        clientTouchStartX = 0;
        clientTouchEndX = 0;
    }

    if (clientNextBtn) clientNextBtn.addEventListener('click', () => { nextClients(); startClientAutoplay(); });
    if (clientPrevBtn) clientPrevBtn.addEventListener('click', () => { prevClients(); startClientAutoplay(); });
    
    // Add touch event listeners for clients
    if (clientsSlider) {
        clientsSlider.addEventListener('touchstart', handleClientTouchStart, { passive: true });
        clientsSlider.addEventListener('touchmove', handleClientTouchMove, { passive: true });
        clientsSlider.addEventListener('touchend', handleClientTouchEnd, { passive: true });
        
        // Mouse drag support for desktop
        clientsSlider.addEventListener('mousedown', handleClientTouchStart);
        clientsSlider.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) handleClientTouchMove(e);
        });
        clientsSlider.addEventListener('mouseup', handleClientTouchEnd);
        clientsSlider.addEventListener('mouseleave', handleClientTouchEnd);
    }

    // ===== PARTNERS SLIDER (INFINITE CONTINUOUS) =====
    const partnersSlider = document.getElementById('partnersSlider');
    const partnerPrevBtn = document.getElementById('partnerPrev');
    const partnerNextBtn = document.getElementById('partnerNext');
    let partnerCurrentIndex = 0;
    let partnerAutoplayInterval;
    let partnerTouchStartX = 0;
    let partnerTouchEndX = 0;
    let partnerIsTransitioning = false;

    function getPartnersPerView() {
        if (window.innerWidth <= 576) return 2;
        if (window.innerWidth <= 768) return 3;
        return 5;
    }

    function clonePartnersForInfinite() {
        if (!partnersSlider) return;
        
        // Remove existing clones
        const existingClones = partnersSlider.querySelectorAll('.partner-slide.clone');
        existingClones.forEach(clone => clone.remove());
        
        const partnerSlides = Array.from(partnersSlider.querySelectorAll('.partner-slide:not(.clone)'));
        const partnersPerView = getPartnersPerView();
        
        // Clone ALL slides twice for seamless infinite scrolling
        // Add clones at the end
        partnerSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            partnersSlider.appendChild(clone);
        });
        
        // Add clones at the beginning
        partnerSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.classList.add('clone');
            partnersSlider.insertBefore(clone, partnersSlider.firstChild);
        });
        
        // Start at the first real slide (after the prepended clones)
        partnerCurrentIndex = partnerSlides.length;
        updatePartnersSlider(false);
    }

    function updatePartnersSlider(animate = true) {
        if (!partnersSlider) return;
        const allSlides = partnersSlider.querySelectorAll('.partner-slide');
        
        if (allSlides.length === 0) return;
        
        const slideWidth = allSlides[0]?.offsetWidth || 0;
        const gap = 35;
        const offset = -(partnerCurrentIndex * (slideWidth + gap));
        
        partnersSlider.style.transition = animate ? 'transform 0.6s cubic-bezier(0.45, 0, 0.55, 1)' : 'none';
        partnersSlider.style.transform = `translateX(${offset}px)`;
    }

    function nextPartners() {
        if (!partnersSlider || partnerIsTransitioning) return;
        
        const originalSlides = partnersSlider.querySelectorAll('.partner-slide:not(.clone)');
        const totalSlides = originalSlides.length;
        
        partnerIsTransitioning = true;
        partnerCurrentIndex++;
        updatePartnersSlider(true);
        
        // Check if we need to reset to the real first slide
        setTimeout(() => {
            // If we're past the last original slide, jump back to the first
            if (partnerCurrentIndex >= totalSlides * 2) {
                partnerCurrentIndex = totalSlides;
                updatePartnersSlider(false);
            }
            
            partnerIsTransitioning = false;
        }, 600);
    }

    function prevPartners() {
        if (!partnersSlider || partnerIsTransitioning) return;
        
        const originalSlides = partnersSlider.querySelectorAll('.partner-slide:not(.clone)');
        const totalSlides = originalSlides.length;
        
        partnerIsTransitioning = true;
        partnerCurrentIndex--;
        updatePartnersSlider(true);
        
        // Check if we need to reset to the real last slide
        setTimeout(() => {
            // If we're before the first original slide, jump to the last
            if (partnerCurrentIndex < totalSlides) {
                partnerCurrentIndex = totalSlides * 2 - 1;
                updatePartnersSlider(false);
            }
            
            partnerIsTransitioning = false;
        }, 600);
    }

    function startPartnerAutoplay() {
        stopPartnerAutoplay();
        partnerAutoplayInterval = setInterval(nextPartners, 3000);
    }


    function stopPartnerAutoplay() {
        if (partnerAutoplayInterval) {
            clearInterval(partnerAutoplayInterval);
        }
    }

    // Touch/Swipe handlers for partners slider
    function handlePartnerTouchStart(e) {
        partnerTouchStartX = e.touches ? e.touches[0].clientX : e.clientX;
        partnersSlider.classList.add('dragging');
        stopPartnerAutoplay();
    }

    function handlePartnerTouchMove(e) {
        partnerTouchEndX = e.touches ? e.touches[0].clientX : e.clientX;
    }

    function handlePartnerTouchEnd() {
        partnersSlider.classList.remove('dragging');
        
        if (!partnerTouchStartX || !partnerTouchEndX) return;
        
        const swipeThreshold = 50;
        const difference = partnerTouchStartX - partnerTouchEndX;
        
        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swiped left - next
                nextPartners();
            } else {
                // Swiped right - previous
                prevPartners();
            }
        }
        
        startPartnerAutoplay();
        partnerTouchStartX = 0;
        partnerTouchEndX = 0;
    }

    if (partnerNextBtn) partnerNextBtn.addEventListener('click', () => { nextPartners(); startPartnerAutoplay(); });
    if (partnerPrevBtn) partnerPrevBtn.addEventListener('click', () => { prevPartners(); startPartnerAutoplay(); });
    
    // Add touch event listeners for partners
    if (partnersSlider) {
        partnersSlider.addEventListener('touchstart', handlePartnerTouchStart, { passive: true });
        partnersSlider.addEventListener('touchmove', handlePartnerTouchMove, { passive: true });
        partnersSlider.addEventListener('touchend', handlePartnerTouchEnd, { passive: true });
        
        // Mouse drag support for desktop
        partnersSlider.addEventListener('mousedown', handlePartnerTouchStart);
        partnersSlider.addEventListener('mousemove', (e) => {
            if (e.buttons === 1) handlePartnerTouchMove(e);
        });
        partnersSlider.addEventListener('mouseup', handlePartnerTouchEnd);
        partnersSlider.addEventListener('mouseleave', handlePartnerTouchEnd);
    }

    // Handle window resize for both sliders
    window.addEventListener('resize', debounce(() => {
        cloneClientsForInfinite();
        clonePartnersForInfinite();
    }, 250));

    // Initialize sliders on load
    window.addEventListener('load', () => {
        cloneClientsForInfinite();
        clonePartnersForInfinite();
        startClientAutoplay();
        startPartnerAutoplay();
    });

    // Pause autoplay when user hovers
    if (clientsSlider) {
        clientsSlider.addEventListener('mouseenter', stopClientAutoplay);
        clientsSlider.addEventListener('mouseleave', startClientAutoplay);
    }
    if (partnersSlider) {
        partnersSlider.addEventListener('mouseenter', stopPartnerAutoplay);
        partnersSlider.addEventListener('mouseleave', startPartnerAutoplay);
    }

    // Console message (development)
    if (console && console.log) {
        console.log('%cUnique Solutions', 'color: #1960a2; font-size: 24px; font-weight: bold;');
        console.log('%cOptimized Website - Performance Ready', 'color: #0d3b66; font-size: 14px;');
    }

    // Performance monitoring
    if (window.performance && performance.timing) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                const perfData = performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page load time: ${pageLoadTime}ms`);
                
                // First Contentful Paint
                if (performance.getEntriesByType) {
                    const paintEntries = performance.getEntriesByType('paint');
                    paintEntries.forEach(entry => {
                        console.log(`⚡ ${entry.name}: ${entry.startTime.toFixed(2)}ms`);
                    });
                }
            }, 0);
        });
    }
    
    // ==========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ==========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all service cards and sections
    document.querySelectorAll('.service-card, .client-item, .partner-item, .about-content').forEach(el => {
        animateOnScroll.observe(el);
    });
    
    // ==========================================
    // PERFORMANCE: Lazy load images
    // ==========================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ==========================================
    // ENHANCED BUTTON CLICK EFFECTS
    // ==========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // ========================================
    // MOBILE OPTIMIZATIONS
    // ========================================
    
    // Detect mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isSmallScreen = window.innerWidth <= 768;
    
    if (isMobile || isSmallScreen) {
        // Reduce particle count on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            if (index > 2) {
                particle.style.display = 'none';
            }
        });
        
        // Disable parallax on mobile for better performance
        window.removeEventListener('scroll', () => {});
        
        // Faster animations on mobile
        document.documentElement.style.setProperty('--transition-fast', 'all 0.15s ease');
        document.documentElement.style.setProperty('--transition-normal', 'all 0.2s ease');
        
        // Prevent zoom on double tap for better UX
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, {passive: false});
        
        console.log('📱 Mobile optimizations applied');
    }
    
    // Optimize for touch devices
    if ('ontouchstart' in window) {
        // Add touch-friendly classes
        document.body.classList.add('touch-device');
        
        // Improve tap responsiveness
        document.querySelectorAll('a, button, .btn').forEach(element => {
            element.style.cursor = 'pointer';
            element.style.webkitTapHighlightColor = 'rgba(0,0,0,0.1)';
        });
    }
    
    // Viewport height fix for mobile browsers (address bar)
    function setVH() {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);
    
    // Lazy load images on mobile for better performance
    if (isMobile && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Prevent rubber-band scrolling on iOS
    let startY = 0;
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
    }, {passive: true});
    
    document.addEventListener('touchmove', function(e) {
        const y = e.touches[0].pageY;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const isAtTop = scrollTop === 0;
        const isAtBottom = (window.innerHeight + scrollTop) >= document.body.scrollHeight;
        
        if ((isAtTop && y > startY) || (isAtBottom && y < startY)) {
            e.preventDefault();
        }
    }, {passive: false});
    
    console.log('✨ Enhanced animations, dark theme, and mobile optimizations loaded!');

})();
