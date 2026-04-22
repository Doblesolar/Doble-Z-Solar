/**
 * DOBLE Z SOLAR - JavaScript Principal
 * Versión: 2.0 | Abril 2026
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. NAVBAR: Efecto sombra al hacer scroll
    ========================================== */
    const header = document.querySelector('.site-header');
    if (header) {
        const onScroll = () => {
            header.classList.toggle('scrolled', window.scrollY > 30);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /* ==========================================
       2. LAZY LOADING de imágenes (fallback)
          - Los navegadores modernos usan loading="lazy"
          - Este bloque cubre navegadores más antiguos
    ========================================== */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        const imgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imgObserver.unobserve(img);
                }
            });
        }, { rootMargin: '200px' });

        lazyImages.forEach(img => imgObserver.observe(img));
    }

    /* ==========================================
       3. SMOOTH SCROLL para enlaces internos
    ========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==========================================
       4. ANIMACIONES de entrada (fade-in)
          al hacer scroll (Intersection Observer)
    ========================================== */
    const animatedElements = document.querySelectorAll(
        '.galeria-item, .beneficio-item, .ahorro-card, .tabla-comparativa'
    );

    if ('IntersectionObserver' in window && animatedElements.length) {
        // Añadir clase base para la animación CSS
        animatedElements.forEach(el => el.classList.add('fade-in-hidden'));

        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animatedElements.forEach(el => fadeObserver.observe(el));
    }

    /* ==========================================
       5. TRACKING de clics en WhatsApp
          (compatible con Google Analytics 4 y GTM)
    ========================================== */
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            if (typeof gtag === 'function') {
                gtag('event', 'whatsapp_click', {
                    event_category: 'CTA',
                    event_label: link.dataset.cta || 'whatsapp_general',
                });
            }
        });
    });

    /* ==========================================
       6. AÑO DINÁMICO en el footer
    ========================================== */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});

/* ==========================================
   7. ESTILOS de animación inyectados por JS
      (para no bloquear CSS crítico)
========================================== */
(function injectAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
})();
