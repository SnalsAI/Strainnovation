/**
 * Strainnovation S.r.l. - Main JavaScript
 * Language Switching, Theme Toggle, Form Handling & Interactions
 */

(function() {
    'use strict';

    // ================================
    // CUSTOM CURSOR
    // ================================
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (cursor && cursorFollower) {
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        function animateCursor() {
            // Cursor position
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            // Follower with delay
            followerX += (cursorX - followerX) * 0.1;
            followerY += (cursorY - followerY) * 0.1;
            cursorFollower.style.left = followerX + 'px';
            cursorFollower.style.top = followerY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .team-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
            });
        });
    }

    // ================================
    // LANGUAGE SWITCHER
    // ================================
    const langSwitch = document.getElementById('langSwitch');
    let currentLang = localStorage.getItem('language') || 'en';

    function switchLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('language', lang);

        // Update all elements with data-en and data-it attributes
        document.querySelectorAll('[data-en][data-it]').forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                // Handle different element types
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            }
        });

        // Update active state on language toggle
        document.querySelectorAll('.lang-option').forEach(option => {
            option.classList.toggle('active', option.getAttribute('data-lang') === lang);
        });

        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }

    if (langSwitch) {
        langSwitch.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'it' : 'en';
            switchLanguage(newLang);
        });
    }

    // Initialize language on load
    switchLanguage(currentLang);

    // ================================
    // THEME TOGGLE
    // ================================
    const themeToggle = document.getElementById('themeToggle');
    let currentTheme = localStorage.getItem('theme') || 'dark';

    function setTheme(theme) {
        currentTheme = theme;
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }

    // Initialize theme on load
    setTheme(currentTheme);

    // ================================
    // MOBILE MENU TOGGLE
    // ================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ================================
    // HEADER SCROLL EFFECT
    // ================================
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // ================================
    // ACTIVE SECTION HIGHLIGHTING
    // ================================
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightActiveSection() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);

    // ================================
    // SMOOTH SCROLL
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // NUMBER COUNTER ANIMATION
    // ================================
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    }

    // Observe elements with data-count attribute
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('[data-count]').forEach(counter => {
        counterObserver.observe(counter);
    });

    // ================================
    // PROGRESS BAR ANIMATION
    // ================================
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.progress-fill');
                if (fill && !fill.classList.contains('animated')) {
                    fill.classList.add('animated');
                    fill.style.width = fill.style.getPropertyValue('--progress') || '0%';
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.progress-bar').forEach(bar => {
        progressObserver.observe(bar);
    });

    // ================================
    // CONTACT FORM HANDLING
    // ================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const formData = new FormData(contactForm);

            // Validation
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const privacy = formData.get('privacy');

            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }

            if (!privacy) {
                showNotification('Please accept the privacy policy', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual backend call)
            try {
                // In production, replace with:
                // const response = await fetch('/api/contact', {
                //     method: 'POST',
                //     body: formData
                // });

                await new Promise(resolve => setTimeout(resolve, 2000));

                // Success
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                contactForm.reset();
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        });

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.required && !input.value) {
                    input.style.borderColor = 'var(--accent-orange)';
                } else {
                    input.style.borderColor = '';
                }
            });
        });
    }

    // ================================
    // NOTIFICATION SYSTEM
    // ================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification toast ${type}`;
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? 'var(--primary-green)' : 'var(--accent-orange)'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius-md);
                box-shadow: var(--shadow-lg);
                z-index: 10000;
                max-width: 400px;
                font-family: var(--font-body);
            ">
                ${message}
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('hide');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // ================================
    // MAGNETIC HOVER EFFECT
    // ================================
    document.querySelectorAll('.service-card, .team-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            card.style.transform = `
                translateY(-10px)
                rotateX(${deltaY * 5}deg)
                rotateY(${deltaX * 5}deg)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // ================================
    // RIPPLE EFFECT ON BUTTONS
    // ================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple-effect';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ================================
    // LAZY LOADING FOR IMAGES
    // ================================
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

    // ================================
    // TEAM CAROUSEL SMOOTH SCROLL
    // ================================
    const teamCarousel = document.getElementById('teamCarousel');
    if (teamCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;

        teamCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            teamCarousel.style.cursor = 'grabbing';
            startX = e.pageX - teamCarousel.offsetLeft;
            scrollLeft = teamCarousel.scrollLeft;
        });

        teamCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            teamCarousel.style.cursor = 'grab';
        });

        teamCarousel.addEventListener('mouseup', () => {
            isDown = false;
            teamCarousel.style.cursor = 'grab';
        });

        teamCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - teamCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            teamCarousel.scrollLeft = scrollLeft - walk;
        });
    }

    // ================================
    // PERFORMANCE OPTIMIZATION
    // ================================
    // Debounce function for resize events
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

    // Optimized resize handler
    const handleResize = debounce(() => {
        // Add any resize logic here
        console.log('Window resized');
    }, 250);

    window.addEventListener('resize', handleResize);

    // ================================
    // CONSOLE EASTER EGG
    // ================================
    console.log(
        '%c🚀 Strainnovation S.r.l. - Advanced Materials for Space & Sustainability',
        'font-size: 16px; font-weight: bold; color: #1E88E5;'
    );
    console.log(
        '%cInterested in joining our team? Contact us at info@strain.it',
        'font-size: 12px; color: #00C853;'
    );

    // ================================
    // INITIALIZATION COMPLETE
    // ================================
    console.log('✓ Main JavaScript initialized');

})();
