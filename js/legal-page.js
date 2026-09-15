/**
 * Legal Page Accessibility Features
 * Text sizing, high contrast, and PDF export
 */

class LegalPageAccessibility {
    constructor() {
        this.textSizeLevel = 0; // 0 = normal, 1 = large, 2 = larger
        this.highContrastEnabled = false;
        this.init();
    }
    
    init() {
        // Load saved preferences
        this.loadPreferences();
        
        // Set up controls
        this.setupTextSizeControls();
        this.setupHighContrastToggle();
        this.setupPdfExport();
        this.setupKeyboardNavigation();
    }
    
    loadPreferences() {
        const savedTextSize = localStorage.getItem('ytd-text-size');
        const savedContrast = localStorage.getItem('ytd-high-contrast');
        
        if (savedTextSize) {
            this.textSizeLevel = parseInt(savedTextSize, 10);
            this.applyTextSize();
        }
        
        if (savedContrast === 'true') {
            this.highContrastEnabled = true;
            this.applyHighContrast();
        }
    }
    
    setupTextSizeControls() {
        const increaseBtn = document.getElementById('increaseText');
        const decreaseBtn = document.getElementById('decreaseText');
        
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                if (this.textSizeLevel < 2) {
                    this.textSizeLevel++;
                    this.applyTextSize();
                    this.savePreferences();
                    this.announceToScreenReader(
                        this.textSizeLevel === 1 ? 'Text size increased to large' : 'Text size increased to larger'
                    );
                }
            });
        }
        
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (this.textSizeLevel > 0) {
                    this.textSizeLevel--;
                    this.applyTextSize();
                    this.savePreferences();
                    this.announceToScreenReader(
                        this.textSizeLevel === 0 ? 'Text size reset to normal' : 'Text size decreased to large'
                    );
                }
            });
        }
    }
    
    applyTextSize() {
        document.body.removeAttribute('data-text-size');
        
        if (this.textSizeLevel === 1) {
            document.body.setAttribute('data-text-size', 'large');
        } else if (this.textSizeLevel === 2) {
            document.body.setAttribute('data-text-size', 'larger');
        }
    }
    
    setupHighContrastToggle() {
        const contrastBtn = document.getElementById('highContrast');
        
        if (contrastBtn) {
            contrastBtn.addEventListener('click', () => {
                this.highContrastEnabled = !this.highContrastEnabled;
                this.applyHighContrast();
                this.savePreferences();
                this.announceToScreenReader(
                    this.highContrastEnabled ? 'High contrast enabled' : 'High contrast disabled'
                );
                
                if (this.highContrastEnabled) {
                    contrastBtn.classList.add('active');
                } else {
                    contrastBtn.classList.remove('active');
                }
            });
        }
    }
    
    applyHighContrast() {
        if (this.highContrastEnabled) {
            document.body.setAttribute('data-contrast', 'high');
            const contrastBtn = document.getElementById('highContrast');
            if (contrastBtn) contrastBtn.classList.add('active');
        } else {
            document.body.removeAttribute('data-contrast');
            const contrastBtn = document.getElementById('highContrast');
            if (contrastBtn) contrastBtn.classList.remove('active');
        }
    }
    
    savePreferences() {
        localStorage.setItem('ytd-text-size', this.textSizeLevel.toString());
        localStorage.setItem('ytd-high-contrast', this.highContrastEnabled.toString());
    }
    
    setupPdfExport() {
        const exportBtn = document.getElementById('exportPdf');
        
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToPdf();
            });
        }
    }
    
    exportToPdf() {
        // Store original title
        const originalTitle = document.title;
        
        // Update title for PDF
        const lang = document.documentElement.getAttribute('lang');
        const isPt = lang && lang.startsWith('pt');
        document.title = isPt 
            ? 'Uso Responsável - ytDownloader' 
            : 'Responsible Use - ytDownloader';
        
        // Announce to screen reader
        this.announceToScreenReader(
            isPt 
                ? 'A preparar exportação PDF. Por favor aguarde.' 
                : 'Preparing PDF export. Please wait.'
        );
        
        // Trigger print dialog
        window.print();
        
        // Restore original title after a delay
        setTimeout(() => {
            document.title = originalTitle;
        }, 1000);
    }
    
    setupKeyboardNavigation() {
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Plus: Increase text size
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '=')) {
                e.preventDefault();
                const increaseBtn = document.getElementById('increaseText');
                if (increaseBtn) increaseBtn.click();
            }
            
            // Ctrl/Cmd + Minus: Decrease text size
            if ((e.ctrlKey || e.metaKey) && e.key === '-') {
                e.preventDefault();
                const decreaseBtn = document.getElementById('decreaseText');
                if (decreaseBtn) decreaseBtn.click();
            }
            
            // Ctrl/Cmd + Shift + C: Toggle high contrast
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                const contrastBtn = document.getElementById('highContrast');
                if (contrastBtn) contrastBtn.click();
            }
            
            // Ctrl/Cmd + P: Export PDF
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                // Let browser's native print dialog handle it
                // Just announce to screen reader
                const lang = document.documentElement.getAttribute('lang');
                const isPt = lang && lang.startsWith('pt');
                this.announceToScreenReader(
                    isPt 
                        ? 'Caixa de diálogo de impressão aberta' 
                        : 'Print dialog opened'
                );
            }
        });
        
        // Improve focus management
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', (e) => {
                e.preventDefault();
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    mainContent.focus();
                    mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    }
    
    announceToScreenReader(message) {
        // Create a live region for screen reader announcements
        let announcer = document.getElementById('a11y-announcer');
        
        if (!announcer) {
            announcer = document.createElement('div');
            announcer.id = 'a11y-announcer';
            announcer.setAttribute('role', 'status');
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.style.cssText = `
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            `;
            document.body.appendChild(announcer);
        }
        
        // Clear and set new message
        announcer.textContent = '';
        setTimeout(() => {
            announcer.textContent = message;
        }, 100);
    }
}

// Smooth scroll for internal links
class LegalPageNavigation {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href === '#') return;
                
                e.preventDefault();
                
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('.nav')?.offsetHeight || 70;
                    const targetPosition = target.offsetTop - navHeight - 20;
                    
                    // Respect prefers-reduced-motion
                    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                    
                    // Move focus to target for accessibility
                    target.setAttribute('tabindex', '-1');
                    target.focus();
                }
            });
        });
    }
}

// Print event handling
class PrintHandler {
    constructor() {
        this.init();
    }
    
    init() {
        // Detect when print is triggered
        window.addEventListener('beforeprint', () => {
            this.beforePrint();
        });
        
        window.addEventListener('afterprint', () => {
            this.afterPrint();
        });
    }
    
    beforePrint() {
        // Ensure all sections are expanded and visible
        document.querySelectorAll('.legal-section').forEach(section => {
            section.style.pageBreakInside = 'avoid';
        });
        
        // Add print timestamp
        const timestamp = new Date().toLocaleDateString('pt-PT', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const lang = document.documentElement.getAttribute('lang');
        const isPt = lang && lang.startsWith('pt');
        
        let printInfo = document.getElementById('print-info');
        if (!printInfo) {
            printInfo = document.createElement('div');
            printInfo.id = 'print-info';
            printInfo.style.cssText = `
                display: none;
                font-size: 0.8rem;
                color: #666;
                text-align: center;
                margin-top: 2rem;
                padding-top: 1rem;
                border-top: 1px solid #ccc;
            `;
            printInfo.textContent = isPt
                ? `Documento exportado em ${timestamp}`
                : `Document exported on ${timestamp}`;
            
            const article = document.querySelector('.legal-article');
            if (article) {
                article.appendChild(printInfo);
            }
        }
        
        printInfo.style.display = 'block';
    }
    
    afterPrint() {
        const printInfo = document.getElementById('print-info');
        if (printInfo) {
            printInfo.style.display = 'none';
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LegalPageAccessibility();
    new LegalPageNavigation();
    new PrintHandler();
    
    // Log for developers
    const lang = document.documentElement.getAttribute('lang');
    const isPt = lang && lang.startsWith('pt');
    
    console.log('%c ytDownloader Legal Page ', 'background: #DA4453; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;');
    console.log(isPt ? 'Atalhos de teclado:' : 'Keyboard shortcuts:');
    console.log('• Ctrl/Cmd + Plus: ' + (isPt ? 'Aumentar texto' : 'Increase text size'));
    console.log('• Ctrl/Cmd + Minus: ' + (isPt ? 'Diminuir texto' : 'Decrease text size'));
    console.log('• Ctrl/Cmd + Shift + C: ' + (isPt ? 'Alto contraste' : 'High contrast'));
    console.log('• Ctrl/Cmd + P: ' + (isPt ? 'Exportar PDF' : 'Export PDF'));
});
