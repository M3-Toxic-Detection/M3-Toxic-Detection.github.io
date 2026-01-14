/**
 * M³-Agent Project Website JavaScript
 * Simplified version for academic style
 */

document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScroll();
});

/**
 * Mobile hamburger menu
 */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Copy BibTeX to clipboard
 */
function copyBibtex() {
    const bibtexContent = document.getElementById('bibtexContent');
    const copyBtn = document.getElementById('copyBtn');

    if (bibtexContent && copyBtn) {
        const text = bibtexContent.textContent;

        navigator.clipboard.writeText(text).then(() => {
            // Success feedback
            const originalText = copyBtn.querySelector('.copy-text').textContent;
            copyBtn.classList.add('copied');
            copyBtn.querySelector('.copy-text').textContent = 'Copied!';

            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.querySelector('.copy-text').textContent = originalText;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy:', err);
            // Fallback for older browsers
            fallbackCopy(text);
        });
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();

    try {
        document.execCommand('copy');
        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) {
            copyBtn.classList.add('copied');
            copyBtn.querySelector('.copy-text').textContent = 'Copied!';
            setTimeout(() => {
                copyBtn.classList.remove('copied');
                copyBtn.querySelector('.copy-text').textContent = 'Copy';
            }, 2000);
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
    }

    document.body.removeChild(textArea);
}
