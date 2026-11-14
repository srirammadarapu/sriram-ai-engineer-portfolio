// Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // Cursor Glow Effect
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Simple AOS Implementation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

    // Nav Scroll Effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(10, 10, 11, 0.9)';
            nav.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            nav.style.background = 'transparent';
            nav.style.borderBottom = '1px solid transparent';
        }
    });

    // Architecture Viewer Tab Switching
    document.querySelectorAll('.architecture-viewer').forEach(viewer => {
        const mainImg = viewer.querySelector('.arch-img');
        const tabs = viewer.querySelectorAll('.tab-btn');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const newSrc = tab.getAttribute('data-img');
                if (newSrc) {
                    // Update Active Tab
                    tabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Fade out, change src, fade in
                    mainImg.style.opacity = '0';
                    setTimeout(() => {
                        mainImg.src = newSrc;
                        mainImg.style.opacity = '1';
                    }, 300);
                }
            });
        });
    });

    // Modal Handling
    const modal = document.getElementById('arch-modal');
    const modalImg = document.getElementById('modal-img');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.modal-close');

    if (modal) {
        document.querySelectorAll('.expand-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const viewer = btn.closest('.architecture-viewer, .gallery-item');
                const img = viewer.querySelector('img');
                const title = viewer.querySelector('h3, h4')?.innerText || 'Architecture View';
                
                if (img) {
                    modalImg.src = img.src;
                    modalCaption.innerText = title;
                    modal.classList.add('active');
                }
            });
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Sending...';
            btn.disabled = true;

            // Simulate sending
            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#10b981';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
});
