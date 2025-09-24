/* Core interactivity: year injection, mobile nav toggles, slider, and form validation */

document.addEventListener('DOMContentLoaded', function () {
  // inject current year in footers
  const y = new Date().getFullYear();
  document.getElementById('year')?.textContent = y;
  document.getElementById('year-2')?.textContent = y;
  document.getElementById('year-3')?.textContent = y;

  // mobile nav toggles (supports multiple pages with separate toggles)
  function wireNav(toggleId, navId) {
    const btn = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    if (!btn || !nav) return;
    btn.addEventListener('click', () => {
      const visible = nav.style.display === 'block';
      nav.style.display = visible ? 'none' : 'block';
    });
  }
  wireNav('nav-toggle', 'main-nav');
  wireNav('nav-toggle-2', 'main-nav-2');
  wireNav('nav-toggle-3', 'main-nav-3');

  // slider (simple)
  const slides = Array.from(document.querySelectorAll('.slide'));
  let idx = 0;
  function showSlide(n) {
    slides.forEach((s, i) => s.classList.toggle('active', i === n));
  }
  if (slides.length) {
    showSlide(0);
    const prev = document.querySelector('.slider-controls .prev');
    const next = document.querySelector('.slider-controls .next');
    prev?.addEventListener('click', () => { idx = (idx - 1 + slides.length) % slides.length; showSlide(idx); });
    next?.addEventListener('click', () => { idx = (idx + 1) % slides.length; showSlide(idx); });
    // auto rotate
    setInterval(() => { idx = (idx + 1) % slides.length; showSlide(idx); }, 6000);
  }

  // form validation
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const feedback = document.getElementById('form-feedback');

      function fail(msg) {
        feedback.textContent = msg;
        feedback.style.color = 'var(--red)';
      }
      function ok(msg) {
        feedback.textContent = msg;
        feedback.style.color = 'var(--blue)';
      }

      // basic checks
      if (!name.value.trim()) return fail('Please provide your name.');
      if (!email.value.trim()) return fail('Please provide your email address.');
      if (!/^\S+@\S+\.\S+$/.test(email.value)) return fail('Please provide a valid email address.');
      if (!message.value.trim() || message.value.trim().length < 10) return fail('Message must be at least 10 characters.');

      // simulated submit (replace with fetch to backend endpoint if available)
      ok('Sending message…');
      setTimeout(() => {
        ok('Message sent. We will get back to you shortly.');
        form.reset();
      }, 900);
    });
  }
});
