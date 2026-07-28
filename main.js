document.addEventListener('DOMContentLoaded', () => {
  // nav scroll shadow
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 8);
    });
  }

  // active nav link, driven by <body data-page="...">
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll('.links a[data-page]').forEach(a => {
      if (a.dataset.page === page) a.classList.add('active');
    });
  }

  // reveal-on-scroll
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  }

  // contact form (contact.html only) — front-end only until a form
  // backend is connected, see README.md
  const form = document.getElementById('consultForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      this.style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    });
  }
});
