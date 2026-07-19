document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Mobile navigation
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  // Product filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Testimonial slider
  const testimonials = document.querySelectorAll('.testimonial');
  const sliderDots = document.getElementById('sliderDots');
  let currentSlide = 0;
  let slideInterval;

  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    sliderDots.appendChild(dot);
  });

  const dots = sliderDots.querySelectorAll('.dot');

  function goToSlide(index) {
    testimonials[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = index;
    testimonials[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
    resetInterval();
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % testimonials.length);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  resetInterval();

  // Contact form
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    formSuccess.classList.add('show');
    contactForm.reset();

    setTimeout(() => {
      formSuccess.classList.remove('show');
    }, 5000);
  });

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.product-card, .feature-card, .section-header').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
});
