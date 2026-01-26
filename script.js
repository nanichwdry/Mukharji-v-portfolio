// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // If using Formspree, let the form submit naturally
        if (contactForm.action && contactForm.action.includes('formspree')) {
            return; // Let Formspree handle it
        }
        
        // Otherwise show alert (for demo)
        e.preventDefault();
        alert('⚡ Message sent! I will get back to you soon. ⚡');
        contactForm.reset();
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Upload Functionality (Disabled)
function setupImageUpload() {
    // Upload functionality disabled - images are static
    return;
    
    // Hero Image Upload
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        heroImage.style.cursor = 'pointer';
        heroImage.title = 'Click to upload your headshot';
        heroImage.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        showCropOptions(event.target.result, heroImage, 'heroImage');
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
        
        // Load saved image
        const savedHeroImage = localStorage.getItem('heroImage');
        const savedHeroFit = localStorage.getItem('heroImageFit');
        if (savedHeroImage) {
            heroImage.src = savedHeroImage;
            heroImage.style.objectFit = savedHeroFit || 'cover';
        }
    }

    // About Image Upload
    const aboutImage = document.getElementById('aboutImage');
    if (aboutImage) {
        aboutImage.style.cursor = 'pointer';
        aboutImage.title = 'Click to upload image';
        aboutImage.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        showCropOptions(event.target.result, aboutImage, 'aboutImage');
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        });
        
        // Load saved image
        const savedAboutImage = localStorage.getItem('aboutImage');
        const savedAboutFit = localStorage.getItem('aboutImageFit');
        if (savedAboutImage) {
            aboutImage.src = savedAboutImage;
            aboutImage.style.objectFit = savedAboutFit || 'cover';
        }
    }
}

// Show crop options modal
function showCropOptions(imageSrc, imgElement, storageKey) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    const content = document.createElement('div');
    content.style.cssText = 'background:rgba(26,31,58,0.95);padding:2rem;border-radius:15px;border:2px solid rgba(102,126,234,0.5);max-width:500px;text-align:center;';
    content.innerHTML = `
        <h3 style="color:#667eea;margin-bottom:1.5rem;font-size:1.5rem;">📸 Choose Display Style</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div class="crop-option" data-fit="cover" style="cursor:pointer;padding:1rem;border:2px solid rgba(102,126,234,0.3);border-radius:10px;transition:all 0.3s;">
                <img src="${imageSrc}" style="width:100%;height:150px;object-fit:cover;border-radius:8px;margin-bottom:0.5rem;">
                <p style="color:#fff;font-weight:600;">✂️ Crop to Fill</p>
            </div>
            <div class="crop-option" data-fit="contain" style="cursor:pointer;padding:1rem;border:2px solid rgba(102,126,234,0.3);border-radius:10px;transition:all 0.3s;">
                <img src="${imageSrc}" style="width:100%;height:150px;object-fit:contain;border-radius:8px;margin-bottom:0.5rem;background:rgba(0,0,0,0.3);">
                <p style="color:#fff;font-weight:600;">🖼️ Fit Entire Image</p>
            </div>
        </div>
        <button id="cancelCrop" style="padding:0.8rem 2rem;background:transparent;color:#667eea;border:2px solid #667eea;border-radius:10px;cursor:pointer;font-weight:600;">Cancel</button>
    `;
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // Hover effects
    content.querySelectorAll('.crop-option').forEach(option => {
        option.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(102,126,234,0.8)';
            this.style.transform = 'scale(1.05)';
        });
        option.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(102,126,234,0.3)';
            this.style.transform = 'scale(1)';
        });
        option.addEventListener('click', function() {
            const fit = this.dataset.fit;
            imgElement.src = imageSrc;
            imgElement.style.objectFit = fit;
            localStorage.setItem(storageKey, imageSrc);
            localStorage.setItem(storageKey + 'Fit', fit);
            modal.remove();
        });
    });
    
    document.getElementById('cancelCrop').addEventListener('click', () => modal.remove());
}

// Particle Effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(102, 126, 234, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupImageUpload();
    createParticles();
    
    // Add hover effect to cards
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add cursor trail effect
let cursorTrail = [];
document.addEventListener('mousemove', (e) => {
    if (window.innerWidth > 768) {
        const trail = document.createElement('div');
        trail.style.position = 'fixed';
        trail.style.width = '5px';
        trail.style.height = '5px';
        trail.style.borderRadius = '50%';
        trail.style.background = 'rgba(102, 126, 234, 0.5)';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 0.5s ease';
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.style.opacity = '0';
            trail.style.transform = 'scale(2)';
        }, 10);
        
        setTimeout(() => {
            trail.remove();
        }, 500);
    }
});
