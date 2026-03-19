export function initScrollReveal() {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve to animate only once
        observer.unobserve(entry.target);
      }
    });
  }, options);

  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade, .reveal-scale');
  elements.forEach((el) => {
    observer.observe(el);
  });
}
