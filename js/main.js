/* ═══════════════════════════════════════════
   BEE STARS — Shared JS
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Nav scroll behaviour ──
  const nav = document.getElementById('nav');
  const updateNav = () => nav.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ── Active nav link ──
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });

  // ── Scroll reveal ──
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('up'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => io.observe(el));

  // ── Animated counters ──
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      if (isNaN(target)) return;
      let n = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = n + (el.dataset.suffix || '');
        if (n >= target) clearInterval(timer);
      }, 35);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  // ── FAQ accordion ──
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Video modal ──
  const modal   = document.getElementById('videoModal');
  const modalVid = document.getElementById('modalVideo');
  document.querySelectorAll('[data-video]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!modal || !modalVid) return;
      modalVid.src = btn.dataset.video;
      modal.classList.add('open');
      modalVid.play();
    });
  });
  const closeModal = () => {
    if (!modal || !modalVid) return;
    modal.classList.remove('open');
    modalVid.pause();
    modalVid.src = '';
  };
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // ── Gallery horizontal drag scroll ──
  document.querySelectorAll('.h-scroll').forEach(el => {
    let isDown = false, startX, scrollL;
    el.addEventListener('mousedown', e => { isDown = true; el.classList.add('dragging'); startX = e.pageX - el.offsetLeft; scrollL = el.scrollLeft; });
    el.addEventListener('mouseleave', () => { isDown = false; el.classList.remove('dragging'); });
    el.addEventListener('mouseup', () => { isDown = false; el.classList.remove('dragging'); });
    el.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); const x = e.pageX - el.offsetLeft; el.scrollLeft = scrollL - (x - startX) * 1.5; });
  });

});
