/* ── NAVBAR SCROLL ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${(i % 5) * 0.07}s`;
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));

/* ── TESTIMONIAL CAROUSEL ── */
(function () {
  const track     = document.getElementById('testiTrack');
  const prevBtn   = document.getElementById('testiPrev');
  const nextBtn   = document.getElementById('testiNext');
  const dotsWrap  = document.getElementById('testiDots');

  if (!track) return;

  const cards      = Array.from(track.querySelectorAll('.testi-card'));
  const total      = cards.length;
  let current      = 0;
  let autoTimer    = null;
  const GAP        = 24; // px — must match CSS gap

  /* Build dots */
  cards.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'testi-dot';
    d.setAttribute('aria-label', `Go to testimonial ${i + 1}`);
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });
  const dots = Array.from(dotsWrap.querySelectorAll('.testi-dot'));

  function cardWidth() {
    return cards[0].offsetWidth + GAP;
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * cardWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 5000);
  }
  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  nextBtn.addEventListener('click', () => { next(); startAuto(); });
  prevBtn.addEventListener('click', () => { prev(); startAuto(); });

  /* Pause on hover */
  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);

  /* Touch / swipe support */
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; stopAuto(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    startAuto();
  });

  /* Re-calc on resize */
  window.addEventListener('resize', () => goTo(current));

  goTo(0);
  startAuto();
})();
