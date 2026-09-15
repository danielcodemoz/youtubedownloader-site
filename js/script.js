/**
 * ytDownloader Marketing Site
 * Interactive features and scroll animations
 */

// Smooth scroll reveal animation
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll-reveal]');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        // Initial check on load
        this.checkElements();
        
        // Listen to scroll events with throttling
        let throttleTimer;
        window.addEventListener('scroll', () => {
            if (throttleTimer) return;
            
            throttleTimer = setTimeout(() => {
                this.checkElements();
                throttleTimer = null;
            }, 100);
        });
        
        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
            this.checkElements();
        });
    }

    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = this.windowHeight * 0.85;
            
            if (elementTop < revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
}

// Navbar scroll effect
class NavbarScroll {
    constructor() {
        this.nav = document.querySelector('.nav');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                this.nav.style.background = 'rgba(10, 10, 10, 0.95)';
                this.nav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
            } else {
                this.nav.style.background = 'rgba(10, 10, 10, 0.8)';
                this.nav.style.boxShadow = 'none';
            }
            
            this.lastScroll = currentScroll;
        });
    }
}

// Smooth scroll for anchor links
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Skip empty anchors
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.nav').offsetHeight;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Parallax effect for hero cards
class ParallaxEffect {
    constructor() {
        this.heroCards = document.querySelectorAll('.hero-card');
        this.init();
    }

    init() {
        if (!this.heroCards.length) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            this.heroCards.forEach((card, index) => {
                const speed = (index + 1) * 0.05;
                const yPos = -(scrolled * speed);
                card.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Button ripple effect
class ButtonRipple {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation to stylesheet
        if (!document.getElementById('ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Cursor glow effect on hero
class CursorGlow {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.init();
    }

    init() {
        if (!this.hero) return;
        
        // Create glow element
        const glow = document.createElement('div');
        glow.style.cssText = `
            position: absolute;
            width: 500px;
            height: 500px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(218, 68, 83, 0.15) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: opacity 0.3s ease;
            opacity: 0;
            z-index: 0;
        `;
        this.hero.appendChild(glow);
        
        this.hero.addEventListener('mousemove', (e) => {
            const rect = this.hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            glow.style.left = x + 'px';
            glow.style.top = y + 'px';
            glow.style.opacity = '1';
        });
        
        this.hero.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }
}

// Feature card tilt effect
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.feature-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
}

// Screenshot lightbox
class ScreenshotLightbox {
    constructor() {
        this.screenshots = document.querySelectorAll('.screenshot-item img');
        this.init();
    }

    init() {
        this.screenshots.forEach(img => {
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', () => {
                const lightbox = document.createElement('div');
                lightbox.style.cssText = `
                    position: fixed;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    cursor: pointer;
                    animation: fadeIn 0.2s ease;
                    padding: 2rem;
                `;
                
                const imgClone = img.cloneNode();
                imgClone.style.cssText = `
                    max-width: 90%;
                    max-height: 90%;
                    object-fit: contain;
                    border-radius: 16px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                    animation: scaleIn 0.3s ease;
                `;
                
                lightbox.appendChild(imgClone);
                document.body.appendChild(lightbox);
                document.body.style.overflow = 'hidden';
                
                lightbox.addEventListener('click', () => {
                    lightbox.style.animation = 'fadeOut 0.2s ease';
                    setTimeout(() => {
                        lightbox.remove();
                        document.body.style.overflow = '';
                    }, 200);
                });
                
                // Add animations
                if (!document.getElementById('lightbox-style')) {
                    const style = document.createElement('style');
                    style.id = 'lightbox-style';
                    style.textContent = `
                        @keyframes fadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
                        }
                        @keyframes fadeOut {
                            from { opacity: 1; }
                            to { opacity: 0; }
                        }
                        @keyframes scaleIn {
                            from { transform: scale(0.9); opacity: 0; }
                            to { transform: scale(1); opacity: 1; }
                        }
                    `;
                    document.head.appendChild(style);
                }
            });
        });
    }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ScrollReveal();
    new NavbarScroll();
    new SmoothScroll();
    new ParallaxEffect();
    new ButtonRipple();
    new CursorGlow();
    new CardTilt();
    new ScreenshotLightbox();
    
    console.log('%c ytDownloader ', 'background: #DA4453; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
    console.log('Built with ❤️ in Portugal');
});

// Preload critical images
window.addEventListener('load', () => {
    const criticalImages = [
        '/shots/dark-mode-downloads.webp',
        '/shots/light-mode-empty.webp',
        '/shots/settings-modal.webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});
