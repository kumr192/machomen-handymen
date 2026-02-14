/* ========================================
   Machomen Handymen — Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // --- Header scroll effect ---
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Scroll-in animation (Intersection Observer) ---
  const animatedCards = document.querySelectorAll(
    '.service-card, .project-card, .testimonial-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Stagger the animation slightly per card
            const delay = Array.from(animatedCards).indexOf(entry.target) % 4;
            entry.target.style.transitionDelay = `${delay * 0.08}s`;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedCards.forEach(card => observer.observe(card));
  } else {
    // Fallback: just show everything
    animatedCards.forEach(card => card.classList.add('visible'));
  }

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    console.log('Form submitted:', data);

    // Show success message
    const wrapper = contactForm.closest('.contact-form-wrapper');
    wrapper.innerHTML = `
      <div class="form-success">
        <div class="success-icon">&#9989;</div>
        <h3>Message Sent!</h3>
        <p>Thanks for reaching out. Christopher will get back to you shortly.</p>
      </div>
    `;
  });

  // --- Smooth scroll for anchor links (fallback for older browsers) ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
