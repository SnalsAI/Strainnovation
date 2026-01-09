/**
 * Strainnovation S.r.l. - GSAP Animations
 * Advanced Scroll-Triggered Animations
 */

(function() {
    'use strict';

    // Wait for GSAP to load
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded. Skipping advanced animations.');
        // Fallback to simple AOS-like observer
        initFallbackAnimations();
        return;
    }

    // Register ScrollTrigger plugin
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ================================
    // HERO SECTION ANIMATIONS
    // ================================
    function initHeroAnimations() {
        const heroTimeline = gsap.timeline({
            defaults: { ease: 'power3.out' }
        });

        heroTimeline
            .from('.hero-title-line', {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2
            })
            .from('.hero-subtitle', {
                y: 50,
                opacity: 0,
                duration: 0.8
            }, '-=0.4')
            .from('.hero-cta .btn', {
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.2
            }, '-=0.4')
            .from('.scroll-indicator', {
                y: 30,
                opacity: 0,
                duration: 0.6
            }, '-=0.3');
    }

    // ================================
    // MISSION SECTION ANIMATIONS
    // ================================
    function initMissionAnimations() {
        gsap.utils.toArray('.bento-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power2.out'
            });

            // Animate icon on hover
            const icon = card.querySelector('.card-icon svg');
            if (icon) {
                card.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.2,
                        rotation: 360,
                        duration: 0.6,
                        ease: 'back.out(1.7)'
                    });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.4,
                        ease: 'power2.inOut'
                    });
                });
            }
        });

        // Animate stats
        gsap.from('.stat-item', {
            scrollTrigger: {
                trigger: '.stats',
                start: 'top 80%'
            },
            scale: 0.5,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'back.out(1.7)'
        });

        // Animate progress bars
        gsap.utils.toArray('.progress-fill').forEach(fill => {
            const progress = fill.style.getPropertyValue('--progress') || '0%';

            gsap.to(fill, {
                scrollTrigger: {
                    trigger: fill,
                    start: 'top 80%'
                },
                width: progress,
                duration: 1.5,
                ease: 'power2.out'
            });
        });
    }

    // ================================
    // TECHNOLOGIES SECTION ANIMATIONS
    // ================================
    function initTechnologiesAnimations() {
        gsap.utils.toArray('.tech-row').forEach((row, index) => {
            const isReverse = row.classList.contains('tech-row-reverse');
            const visual = row.querySelector('.tech-visual');
            const content = row.querySelector('.tech-content');

            // Visual animation
            gsap.from(visual, {
                scrollTrigger: {
                    trigger: row,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                },
                x: isReverse ? 100 : -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Content animation
            gsap.from(content, {
                scrollTrigger: {
                    trigger: row,
                    start: 'top 70%',
                    end: 'bottom 30%',
                    toggleActions: 'play none none reverse'
                },
                x: isReverse ? -100 : 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Features stagger animation
            const features = content.querySelectorAll('.tech-features li');
            gsap.from(features, {
                scrollTrigger: {
                    trigger: content,
                    start: 'top 70%'
                },
                x: -30,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out'
            });

            // Specs animation
            const specs = content.querySelectorAll('.spec-item');
            gsap.from(specs, {
                scrollTrigger: {
                    trigger: content,
                    start: 'top 60%'
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'back.out(1.7)'
            });

            // Parallax effect for visual
            gsap.to(visual, {
                scrollTrigger: {
                    trigger: row,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -50,
                ease: 'none'
            });
        });
    }

    // ================================
    // SERVICES SECTION ANIMATIONS
    // ================================
    function initServicesAnimations() {
        gsap.utils.toArray('.service-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                scale: 0.8,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'back.out(1.7)'
            });

            // Icon animation
            const icon = card.querySelector('.service-icon');
            if (icon) {
                gsap.from(icon, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 75%'
                    },
                    rotation: -180,
                    scale: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    }

    // ================================
    // TEAM SECTION ANIMATIONS
    // ================================
    function initTeamAnimations() {
        gsap.utils.toArray('.team-card').forEach((card, index) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.15,
                ease: 'power2.out'
            });

            // Avatar animation
            const avatar = card.querySelector('.team-avatar');
            if (avatar) {
                gsap.from(avatar, {
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%'
                    },
                    scale: 0,
                    rotation: 360,
                    duration: 0.8,
                    ease: 'back.out(1.7)'
                });
            }
        });
    }

    // ================================
    // CONTACT SECTION ANIMATIONS
    // ================================
    function initContactAnimations() {
        const formContainer = document.querySelector('.contact-form-container');
        const contactInfo = document.querySelector('.contact-info');

        if (formContainer) {
            gsap.from(formContainer, {
                scrollTrigger: {
                    trigger: formContainer,
                    start: 'top 75%'
                },
                x: -100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate form groups
            gsap.from('.form-group', {
                scrollTrigger: {
                    trigger: formContainer,
                    start: 'top 70%'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }

        if (contactInfo) {
            gsap.from(contactInfo, {
                scrollTrigger: {
                    trigger: contactInfo,
                    start: 'top 75%'
                },
                x: 100,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate info cards
            gsap.from('.info-card', {
                scrollTrigger: {
                    trigger: contactInfo,
                    start: 'top 70%'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out'
            });
        }
    }

    // ================================
    // SECTION TITLES ANIMATION
    // ================================
    function initSectionTitles() {
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power2.out'
            });
        });
    }

    // ================================
    // PARALLAX EFFECTS
    // ================================
    function initParallax() {
        // Parallax for tech visuals
        gsap.utils.toArray('.tech-placeholder').forEach(placeholder => {
            gsap.to(placeholder, {
                scrollTrigger: {
                    trigger: placeholder,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1
                },
                y: -80,
                ease: 'none'
            });
        });
    }

    // ================================
    // FOOTER ANIMATION
    // ================================
    function initFooterAnimation() {
        gsap.from('.footer-content', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });

        gsap.from('.footer-col', {
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 75%'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power2.out'
        });
    }

    // ================================
    // FALLBACK ANIMATIONS (No GSAP)
    // ================================
    function initFallbackAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all elements with data-aos attribute
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // ================================
    // INITIALIZE ALL ANIMATIONS
    // ================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAnimations);
        } else {
            initAnimations();
        }
    }

    function initAnimations() {
        console.log('Initializing GSAP animations...');

        initHeroAnimations();
        initMissionAnimations();
        initTechnologiesAnimations();
        initServicesAnimations();
        initTeamAnimations();
        initContactAnimations();
        initSectionTitles();
        initParallax();
        initFooterAnimation();

        console.log('✓ GSAP animations initialized');
    }

    // Start initialization
    init();

})();
