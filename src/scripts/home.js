import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
window.gsap=gsap; window.ScrollTrigger=ScrollTrigger;


  (function () {
    const nav = document.getElementById('siteNav');
    if (!nav) return;
    let ticking = false;
    function update() {
      const y = window.scrollY || 0;
      nav.classList.toggle('visible', y > 600);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();


/* ===== next inline block ===== */


gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth < 768;
const containerEl = document.getElementById('cinematicContainer');
const counterEl = document.getElementById('counterVal');

// === Initial states ===
gsap.set('.hero-h1-eyebrow', { autoAlpha: 0, y: 20 });
gsap.set('.text-track', { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 });
gsap.set('.text-days', { autoAlpha: 0, y: 60, scale: 0.85, filter: 'blur(20px)', rotationX: -20 });
if (!isMobile) {
  gsap.set('#mainCard', { y: window.innerHeight + 200, autoAlpha: 1 });
  gsap.set(['#cardLeftText', '#cardRightText', '#mockupWrapper', '#badge1', '#badge2'], { autoAlpha: 0 });
  gsap.set('.phone-widget', { autoAlpha: 0 });
  gsap.set('#ctaWrapper', { autoAlpha: 0, scale: 0.8, filter: 'blur(30px)' });
}

// === Intro: hero text reveal ===
const introTl = gsap.timeline({ delay: 0.3 });
introTl
  .to('.hero-h1-eyebrow', { duration: 0.7, autoAlpha: 1, y: 0, ease: 'power3.out' })
  .to('.text-track', { duration: 1.4, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' }, '-=0.3')
  .to('.text-days', { duration: 1.6, autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', rotationX: 0, ease: 'expo.out' }, '-=0.9');

// === Scroll-driven cinematic timeline (alleen desktop; mobiel toont statisch) ===
if (!isMobile) {
const scrollTl = gsap.timeline({
  scrollTrigger: {
    trigger: '#cinematicContainer',
    start: 'top top',
    end: '+=2400',
    pin: true,
    scrub: 1,
    anticipatePin: 1,
  }
});

scrollTl
  .to('#heroTextWrapper', { scale: 1.15, filter: 'blur(20px)', opacity: 0.2, ease: 'power2.inOut', duration: 1.2 }, 0)
  .to('#mainCard', { y: 0, ease: 'power3.inOut', duration: 1.2 }, 0)
  .to('#mainCard', { width: '100%', height: '100%', borderRadius: '0px', ease: 'power3.inOut', duration: 0.9 })
  .fromTo('#mockupWrapper',
    { y: 200, z: -300, rotationX: 40, rotationY: -20, autoAlpha: 0, scale: 0.7 },
    { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 1.5 }, '-=0.5'
  )
  .fromTo('.phone-widget',
    { y: 30, autoAlpha: 0, scale: 0.95 },
    { y: 0, autoAlpha: 1, scale: 1, stagger: 0.06, ease: 'back.out(1.2)', duration: 0.8 }, '-=0.9'
  )
  .to('.progress-ring', { strokeDashoffset: 250, duration: 1.2, ease: 'power3.inOut' }, '-=0.8')
  .to('#counterVal', { textContent: 47, snap: { textContent: 1 }, duration: 1.0, ease: 'expo.out' }, '-=1.2')
  .fromTo(['#badge1', '#badge2'],
    { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -8 },
    { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: 'back.out(1.5)', duration: 0.8, stagger: 0.12 }, '-=1.0'
  )
  .fromTo('#cardLeftText', { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: 'power4.out', duration: 0.8 }, '-=0.7')
  .fromTo('#cardRightText', { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: 'expo.out', duration: 0.8 }, '<')
  .to({}, { duration: 1.2 })
  .set('#heroTextWrapper', { autoAlpha: 0 })
  .set('#ctaWrapper', { autoAlpha: 1 })
  .to({}, { duration: 0.6 })
  .to(['#mockupWrapper', '#badge1', '#badge2', '#cardLeftText', '#cardRightText'], {
    scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: 'power3.in', duration: 0.7, stagger: 0.04,
  })
  .to('#mainCard', {
    width: isMobile ? '92vw' : '85vw',
    height: isMobile ? '92vh' : '85vh',
    borderRadius: isMobile ? '32px' : '40px',
    ease: 'expo.inOut', duration: 1.0
  }, 'pullback')
  .to('#ctaWrapper', { scale: 1, filter: 'blur(0px)', ease: 'expo.inOut', duration: 1.0 }, 'pullback')
  .to('#mainCard', { y: -window.innerHeight - 300, ease: 'power3.in', duration: 0.9 });
} else {
  // Mobiel: geen zware cinematic pin, maar simpele, betrouwbare fade-up reveals.
  if (counterEl) counterEl.textContent = '47';
  gsap.set('.progress-ring', { strokeDashoffset: 250 });

  const mReveal = (sel, extra) => gsap.from(sel, Object.assign({
    scrollTrigger: { trigger: sel, start: 'top 88%' },
    opacity: 0, y: 34, duration: 0.7, ease: 'power3.out',
  }, extra || {}));

  // Telefoon dramatisch in beeld laten komen bij het scrollen (wow-factor, zonder pinning)
  gsap.from('#mockupWrapper', {
    scrollTrigger: { trigger: '#mockupWrapper', start: 'top 92%' },
    opacity: 0, y: 90, scale: 0.7, rotationX: 30, rotationY: -14,
    transformPerspective: 1000, transformOrigin: 'center 70%',
    duration: 1.2, ease: 'expo.out',
  });
  gsap.from('.phone-widget', {
    scrollTrigger: { trigger: '#mockupWrapper', start: 'top 78%' },
    opacity: 0, y: 22, scale: 0.96, stagger: 0.08, duration: 0.6, ease: 'back.out(1.4)',
  });
  mReveal('#cardLeftText');
  mReveal('#cardRightText');
  mReveal('#ctaWrapper');
}

// === Mouse interaction (mesh bg + card sheen + iPhone parallax) ===
const mainCardEl = document.getElementById('mainCard');
const iphoneEl = document.getElementById('iphoneFrame');
let rafId;

window.addEventListener('mousemove', (e) => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    // Global mesh background tracking
    const mxPct = (e.clientX / window.innerWidth) * 100;
    const myPct = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mx', mxPct + '%');
    document.documentElement.style.setProperty('--my', myPct + '%');

    // Hero card sheen + iPhone parallax (only while hero on screen)
    if (window.scrollY > window.innerHeight * 2) return;
    if (mainCardEl && iphoneEl) {
      const rect = mainCardEl.getBoundingClientRect();
      mainCardEl.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      mainCardEl.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
      const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
      const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
      gsap.to(iphoneEl, {
        rotationY: xVal * 10,
        rotationX: -yVal * 10,
        ease: 'power3.out', duration: 1.0,
      });
    }
  });
});

// === Section 2 reveal on scroll ===
gsap.set('.section-definition .definition-eyebrow, .section-definition .definition-prose', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-definition',
  start: 'top 75%',
  onEnter: () => {
    gsap.to('.section-definition .definition-eyebrow', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' });
    gsap.to('.section-definition .definition-prose', { autoAlpha: 1, y: 0, duration: 1.1, delay: 0.15, ease: 'power3.out' });
  }
});

// === Section 3 reveal on scroll ===
gsap.set('.section-pillars .pillars-eyebrow, .section-pillars .pillars-h2, .section-pillars .pillars-sub', { autoAlpha: 0, y: 30 });
gsap.set('.section-pillars .pillar-card', { autoAlpha: 0, y: 50 });
ScrollTrigger.create({
  trigger: '.section-pillars',
  start: 'top 70%',
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.section-pillars .pillars-eyebrow', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.section-pillars .pillars-h2', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to('.section-pillars .pillars-sub', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
      .to('.section-pillars .pillar-card', { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }, '-=0.4');
  }
});

// === Section 4 — ChatGPT demo with niche carousel ===
const niches = ['laserkliniek', 'huidkliniek', 'skin clinic'];
const TYPE_SPEED = 65;
const ERASE_SPEED = 32;
const PAUSE_AFTER_TYPE = 750;
const PAUSE_AFTER_ERASE = 220;

gsap.set('.story-eyebrow, .story-h2', { autoAlpha: 0, y: 20 });
gsap.set('.chatgpt-window', { autoAlpha: 0, y: 30 });
gsap.set('.ai-avatar', { autoAlpha: 0 });
gsap.set('#aiThinking', { autoAlpha: 0 });
gsap.set('#aiMap, .ai-text, .ai-divider, .ai-section-header, .ai-closing', { autoAlpha: 0, y: 8 });
gsap.set('.ai-item', { autoAlpha: 0, y: 10 });
gsap.set('.punch-line', { autoAlpha: 0, y: 30 });
gsap.set('.story-wrap', { autoAlpha: 0, y: 30 });

function _wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function runStorySequence() {
  // Headline + window fade-in
  gsap.to('.story-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' });
  await _wait(350);
  gsap.to('.story-h2', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  await _wait(450);
  gsap.to('.chatgpt-window', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' });
  await _wait(700);

  // Carousel typewriter — 3 niches, last one stays
  const target = document.getElementById('userPrompt');
  for (let n = 0; n < niches.length; n++) {
    const text = niches[n];
    for (let i = 0; i < text.length; i++) {
      target.textContent = text.slice(0, i + 1);
      await _wait(TYPE_SPEED);
    }
    if (n < niches.length - 1) {
      await _wait(PAUSE_AFTER_TYPE);
      while (target.textContent.length > 0) {
        target.textContent = target.textContent.slice(0, -1);
        await _wait(ERASE_SPEED);
      }
      await _wait(PAUSE_AFTER_ERASE);
    }
  }
  await _wait(400);
  const c = document.getElementById('promptCursor');
  if (c) c.style.display = 'none';
  await _wait(280);

  // AI avatar + thinking
  gsap.to('.ai-avatar', { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
  gsap.to('#aiThinking', { autoAlpha: 1, duration: 0.3 });
  await _wait(1500);
  gsap.to('#aiThinking', { autoAlpha: 0, duration: 0.3, height: 0, marginTop: 0, marginBottom: 0 });
  await _wait(280);

  // Map + intro + divider + header + items + closing
  gsap.to('#aiMap', { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' });
  await _wait(500);
  gsap.to('.ai-text', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  await _wait(400);
  gsap.to('.ai-divider', { autoAlpha: 1, y: 0, duration: 0.3 });
  await _wait(150);
  gsap.to('.ai-section-header', { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' });
  await _wait(280);
  gsap.to('.ai-item', { autoAlpha: 1, y: 0, stagger: 0.14, duration: 0.45, ease: 'power3.out' });
  await _wait(0.14 * 5 * 1000 + 350);
  gsap.to('.ai-closing', { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power3.out' });
  await _wait(700);

  // Punch landing — 2 setups + final
  gsap.to('.punch-line:not(.final)', { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.6, ease: 'power3.out' });
  await _wait(1700);
  gsap.to('.punch-line.final', { autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out' });
  await _wait(1100);
  gsap.to('.story-wrap', { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' });
}

let storyPlayed = false;
ScrollTrigger.create({
  trigger: '.chatgpt-window',
  start: 'top 75%',
  onEnter: () => {
    if (storyPlayed) return; storyPlayed = true;
    runStorySequence();
  }
});

// === Section 5 reveal on scroll ===
gsap.set('.ai-rec-eyebrow, .ai-rec-h2, .ai-rec-sub, .ai-rec-card, .ai-rec-skipped, .ai-rec-pullquote, .ai-rec-cta-wrap', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-ai-recommend',
  start: 'top 72%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.ai-rec-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.ai-rec-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.ai-rec-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.ai-rec-card',    { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.4')
      .to('.ai-rec-skipped', { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out' }, '-=0.55')
      .to('.ai-rec-pullquote', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.ai-rec-cta-wrap',  { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.45');
  }
});

// === Section 9 (About) reveal on scroll ===
gsap.set('.about-photo-wrap, .about-eyebrow, .about-h2, .about-bio, .about-meta, .about-ctas', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-about',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.about-photo-wrap', { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' })
      .to('.about-eyebrow',    { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.5')
      .to('.about-h2',         { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.4')
      .to('.about-bio',        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.about-meta',       { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },  '-=0.4')
      .to('.about-ctas',       { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },  '-=0.45');
  }
});

// === Section 10 (FAQ) reveal on scroll ===
gsap.set('.faq-eyebrow, .faq-h2, .faq-sub, .faq-item', { autoAlpha: 0, y: 24 });
ScrollTrigger.create({
  trigger: '.section-faq',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.faq-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.faq-h2',      { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.35')
      .to('.faq-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.faq-item',    { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out' }, '-=0.4');
  }
});

// === Section 11 (Final CTA) reveal on scroll ===
gsap.set('.final-eyebrow, .final-h2, .final-sub, .final-card, .final-trust', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-final',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.final-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.final-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.final-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.final-card',    { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out' }, '-=0.4')
      .to('.final-trust',   { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' },  '-=0.3');
  }
});

// === Section 8 (Proof) reveal on scroll ===
gsap.set('.proof-eyebrow, .proof-h2, .proof-sub, .proof-card', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-proof',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.proof-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.proof-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.proof-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.proof-card',    { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.14, ease: 'power3.out' }, '-=0.4');
  }
});

// === Section 8.5 (Blog) reveal on scroll ===
gsap.set('.blog-eyebrow, .blog-h2, .blog-sub, .blog-card, .blog-all', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-blog',
  start: 'top 75%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.blog-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.blog-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.blog-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.blog-card',    { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }, '-=0.4')
      .to('.blog-all',     { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' }, '-=0.3');
  }
});

// === Section "Daarnaast" (extras) reveal on scroll ===
gsap.set('.extras-eyebrow, .extras-h2, .extras-sub, .extra-card', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-extras',
  start: 'top 72%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.extras-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.extras-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.extras-sub',     { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.extra-card',     { autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.14, ease: 'power3.out' }, '-=0.4');
  }
});

// === Section 6.5 (Acquisition Scaling toevoeging) reveal on scroll ===
gsap.set('.scale-eyebrow, .scale-h2, .scale-intro, .scale-step, .scale-flow-arrow, .scale-pull, .scale-cta-wrap', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-scale',
  start: 'top 72%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.scale-eyebrow',     { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.scale-h2',          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.scale-intro',       { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.scale-step',        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.18, ease: 'power3.out' }, '-=0.4')
      .to('.scale-flow-arrow',  { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.7')
      .to('.scale-pull',        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.scale-cta-wrap',    { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  }
});

// === Section 6 (Revenue Rescue) reveal on scroll ===
gsap.set('.rr-eyebrow, .rr-h2, .rr-intro, .rr-lead, .rr-side, .rr-arrow, .rr-stats, .rr-cta-wrap', { autoAlpha: 0, y: 30 });
ScrollTrigger.create({
  trigger: '.section-rr',
  start: 'top 72%',
  once: true,
  onEnter: () => {
    const tl = gsap.timeline();
    tl.to('.rr-eyebrow', { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' })
      .to('.rr-h2',      { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
      .to('.rr-intro',   { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },  '-=0.55')
      .to('.rr-lead',    { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out' }, '-=0.5')
      .to('.rr-side--leak', { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.35')
      .to('.rr-arrow',      { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power3.out' }, '-=0.4')
      .to('.rr-side--fix',  { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.45')
      .to('.rr-stats',      { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.rr-cta-wrap',   { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');
  }
});


/* ===== next inline block ===== */


console.log('[LLModals] loading inline...');
(function () {
  'use strict';

  const CSS = `
  .llm-backdrop { position: fixed; inset: 0; z-index: 9998; background: rgba(8,8,7,0.78); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); display: none; align-items: flex-start; justify-content: center; overflow-y: auto; padding: 32px 16px; animation: llmFade 220ms ease-out; }
  .llm-backdrop.open { display: flex; }
  @keyframes llmFade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes llmRise { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
  .llm-modal { position: relative; width: 100%; max-width: 640px; background: #0a0a09; border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; color: #FAFAF8; font-family: 'Plus Jakarta Sans', system-ui, sans-serif; line-height: 1.6; overflow: hidden; animation: llmRise 280ms cubic-bezier(0.2,0.8,0.2,1); }
  .llm-modal-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(20,20,19,0.6); position: sticky; top: 0; z-index: 5; }
  .llm-modal-logo { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 15px; }
  .llm-modal-logo span { color: #4ADE80; }
  .llm-modal-counter { font-size: 12px; color: #A0A09A; font-variant-numeric: tabular-nums; }
  .llm-modal-close { background: transparent; border: none; cursor: pointer; width: 32px; height: 32px; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: #A0A09A; transition: background 200ms, color 200ms; margin-left: 12px; }
  .llm-modal-close:hover { background: rgba(255,255,255,0.06); color: #FAFAF8; }
  .llm-modal-close svg { width: 18px; height: 18px; }
  .llm-progress { height: 3px; background: rgba(255,255,255,0.06); position: relative; }
  .llm-progress-fill { height: 100%; background: #4ADE80; width: 0%; transition: width 400ms cubic-bezier(0.2,0.8,0.2,1); }
  .llm-modal-body { padding: 32px 28px 36px; }
  .llm-modal-body * { box-sizing: border-box; }
  .llm-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-family: 'Outfit', sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #4ADE80; margin-bottom: 14px; }
  .llm-eyebrow::before { content: ''; width: 20px; height: 1px; background: rgba(74,222,128,0.4); }
  .llm-title { font-family: 'Outfit', sans-serif; font-weight: 800; line-height: 1.15; letter-spacing: -0.02em; font-size: clamp(22px, 4vw, 30px); margin-bottom: 12px; }
  .llm-title .accent { color: #4ADE80; }
  .llm-help { color: #A0A09A; font-size: 14px; margin-bottom: 22px; }
  .llm-screen { display: none; }
  .llm-screen.active { display: block; animation: llmRise 280ms ease-out; }
  .llm-features { list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 10px; }
  .llm-features li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 14px; }
  .llm-features li::before { content: ''; position: absolute; left: 0; top: 10px; width: 12px; height: 1px; background: #4ADE80; }
  .llm-options { display: grid; gap: 8px; margin-bottom: 22px; }
  .llm-option { display: block; padding: 16px 18px; min-height: 52px; background: #141413; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #FAFAF8; font-family: inherit; font-size: 15px; line-height: 1.4; cursor: pointer; text-align: left; transition: border-color 180ms, background 180ms; }
  .llm-option:hover { border-color: #1A7A54; background: rgba(26,122,84,0.08); }
  .llm-option.selected { border-color: #4ADE80; background: rgba(74,222,128,0.08); box-shadow: 0 0 0 1px #4ADE80; }
  .llm-input { display: block; width: 100%; padding: 16px 18px; min-height: 52px; background: #141413; border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #FAFAF8; font-family: inherit; font-size: 16px; margin-bottom: 18px; }
  .llm-input:focus { outline: none; border-color: #4ADE80; }
  .llm-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: #1A7A54; color: #fff; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px; padding: 14px 24px; min-height: 52px; border: none; border-radius: 10px; width: 100%; cursor: pointer; transition: background 200ms, transform 200ms; }
  .llm-btn-primary:hover:not(:disabled) { background: #1f9067; transform: translateY(-1px); }
  .llm-btn-primary:disabled { background: rgba(255,255,255,0.06); color: rgba(255,255,255,0.3); cursor: not-allowed; transform: none; }
  .llm-result { padding: 24px; background: #141413; border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; margin-bottom: 4px; }
  .llm-result h2 { font-family: 'Outfit', sans-serif; font-weight: 800; font-size: clamp(22px, 3.5vw, 30px); line-height: 1.15; letter-spacing: -0.02em; margin-bottom: 16px; }
  .llm-result h2 .accent { color: #4ADE80; }
  .llm-result p { color: #A0A09A; font-size: 15px; margin-bottom: 14px; }
  .llm-result p.lead { color: #FAFAF8; font-size: 16px; }
  .llm-result p strong { color: #FAFAF8; }
  .llm-result ul { list-style: none; padding: 0; margin: 0 0 16px; }
  .llm-result ul li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 15px; margin-bottom: 10px; }
  .llm-result ul li::before { content: ''; position: absolute; left: 0; top: 11px; width: 12px; height: 1px; background: #4ADE80; }
  .llm-callout { padding: 16px; background: rgba(74,222,128,0.06); border: 1px solid rgba(74,222,128,0.2); border-radius: 10px; margin: 16px 0; font-size: 15px; color: #FAFAF8; }
  .llm-callout strong { color: #4ADE80; font-size: 20px; font-family: 'Outfit', sans-serif; }
  .llm-cta { display: inline-flex; align-items: center; justify-content: center; background: #1A7A54; color: #fff; font-family: 'Outfit', sans-serif; font-weight: 700; font-size: 16px; padding: 14px 24px; min-height: 52px; border-radius: 10px; text-decoration: none; margin-top: 12px; transition: background 200ms, transform 200ms; border: none; cursor: pointer; }
  .llm-cta:hover { background: #1f9067; transform: translateY(-1px); }
  .llm-result-sub { color: #A0A09A; font-size: 13px; margin-top: 12px; font-style: italic; }
  .llm-error { color: #ff6b6b; font-size: 13px; margin-top: 6px; min-height: 18px; }
  .llm-note { color: #A0A09A; font-size: 13px; margin-top: 10px; font-style: italic; }
  .llm-checklist-bullets { list-style: none; padding: 0; margin: 0 0 24px; display: grid; gap: 10px; }
  .llm-checklist-bullets li { padding-left: 22px; position: relative; color: #A0A09A; font-size: 14px; }
  .llm-checklist-bullets li::before { content: ''; position: absolute; left: 0; top: 10px; width: 12px; height: 1px; background: #4ADE80; }
  .llm-consent { display: flex; gap: 10px; align-items: flex-start; margin: 4px 0 16px; cursor: pointer; }
  .llm-consent input { margin-top: 3px; width: 16px; height: 16px; flex-shrink: 0; accent-color: #1A7A54; cursor: pointer; }
  .llm-consent span { color: #A0A09A; font-size: 13px; line-height: 1.5; }
  body.llm-no-scroll { overflow: hidden; }
  @media (max-width: 480px) { .llm-backdrop { padding: 0; } .llm-modal { border-radius: 0; min-height: 100vh; max-width: 100%; } .llm-modal-body { padding: 24px 20px 32px; } .llm-title { font-size: 22px; } }
  `;

  function track(eventName, payload) { try { if (window.dataLayer) window.dataLayer.push({ event: eventName, ...payload }); console.log('[track]', eventName, payload || {}); } catch (e) {} }

  let backdropEl = null, modalBodyEl = null, modalCounterEl = null, modalProgressEl = null;

  function injectCSS() { if (document.getElementById('llm-styles')) return; const style = document.createElement('style'); style.id = 'llm-styles'; style.textContent = CSS; document.head.appendChild(style); }

  function buildShell() {
    if (backdropEl) return;
    backdropEl = document.createElement('div');
    backdropEl.className = 'llm-backdrop';
    backdropEl.setAttribute('role', 'dialog');
    backdropEl.setAttribute('aria-modal', 'true');
    backdropEl.innerHTML = '<div class="llm-modal" role="document"><header class="llm-modal-head"><span class="llm-modal-logo">Local<span>Levers</span></span><span class="llm-modal-counter" data-counter></span><button class="llm-modal-close" aria-label="Sluiten" data-close><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg></button></header><div class="llm-progress"><div class="llm-progress-fill" data-progress></div></div><div class="llm-modal-body" data-body></div></div>';
    document.body.appendChild(backdropEl);
    modalBodyEl = backdropEl.querySelector('[data-body]');
    modalCounterEl = backdropEl.querySelector('[data-counter]');
    modalProgressEl = backdropEl.querySelector('[data-progress]');
    backdropEl.addEventListener('click', (e) => { if (e.target === backdropEl) closeModal(); });
    backdropEl.querySelector('[data-close]').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && backdropEl.classList.contains('open')) closeModal(); });
  }

  function openModal() { buildShell(); backdropEl.classList.add('open'); document.body.classList.add('llm-no-scroll'); }
  function closeModal() { if (!backdropEl) return; backdropEl.classList.remove('open'); document.body.classList.remove('llm-no-scroll'); modalBodyEl.innerHTML = ''; modalCounterEl.textContent = ''; modalProgressEl.style.width = '0%'; }
  function setCounter(text, pct) { modalCounterEl.textContent = text || ''; modalProgressEl.style.width = (pct || 0) + '%'; }

  function quizMarkup() {
    return '<section class="llm-screen active" data-screen="intro"><div class="llm-eyebrow">Mini-diagnose</div><h2 class="llm-title">Waar sta jij nu?</h2><p class="llm-help">7 korte vragen. Daarna maken we een gratis vindbaarheids-rapport voor jouw bedrijf.</p><ul class="llm-features"><li>7 vragen, ongeveer 2 minuten</li><li>Gratis rapport in je inbox</li><li>Geen verkooppraat, geen automatische call-boekingen</li></ul><button class="llm-btn-primary" data-start>Start de check</button></section>'
      + '<section class="llm-screen" data-screen="q1"><div class="llm-eyebrow">Vraag 1 van 7</div><h2 class="llm-title">Wat voor bedrijf heb je?</h2><div class="llm-options" data-q="q1"><button class="llm-option" data-value="laser" data-points="20">Laserkliniek (ontharing, huidverjonging)</button><button class="llm-option" data-value="skin" data-points="20">Huidkliniek of skin clinic (microneedling, HIFU, peels)</button><button class="llm-option" data-value="salon" data-points="20">Huidtherapie of behandel-salon</button><button class="llm-option" data-value="other" data-points="5">Ander lokaal bedrijf met klanten die langskomen</button><button class="llm-option" data-value="online" data-points="0" data-disqualify="true">Online-only of geen vaste locatie</button></div></section>'
      + '<section class="llm-screen" data-screen="q2"><div class="llm-eyebrow">Vraag 2 van 7</div><h2 class="llm-title">Wat is je bedrijfsnaam en plaats?</h2><p class="llm-help">Zo maken we het rapport specifiek voor jouw bedrijf.</p><input type="text" class="llm-input" data-text="bedrijf" placeholder="Bedrijfsnaam" autocomplete="organization" style="margin-bottom:12px;"><input type="text" class="llm-input" data-text="plaats" placeholder="Plaats" autocomplete="address-level2"><button class="llm-btn-primary" data-next="q2" disabled>Volgende</button></section>'
      + '<section class="llm-screen" data-screen="q3"><div class="llm-eyebrow">Vraag 3 van 7</div><h2 class="llm-title">Welke behandeling zou je het liefst meer doen?</h2><input type="text" class="llm-input" data-text="winstdienst" placeholder="bijv. laserontharing of microneedling"><button class="llm-btn-primary" data-next="q3" disabled>Volgende</button></section>'
      + '<section class="llm-screen" data-screen="q4"><div class="llm-eyebrow">Vraag 4 van 7</div><h2 class="llm-title">Wat is je gemiddelde klantbedrag (AOV)?</h2><div class="llm-options" data-q="q4"><button class="llm-option" data-value="lt100" data-disqualify="true">Minder dan &euro;100</button><button class="llm-option" data-value="100-200">&euro;100 tot &euro;200</button><button class="llm-option" data-value="200-500">&euro;200 tot &euro;500</button><button class="llm-option" data-value="500-2000">&euro;500 tot &euro;2.000</button><button class="llm-option" data-value="gt2000">Meer dan &euro;2.000</button></div></section>'
      + '<section class="llm-screen" data-screen="q5"><div class="llm-eyebrow">Vraag 5 van 7</div><h2 class="llm-title">Wanneer wil je hier stappen in zetten?</h2><div class="llm-options" data-q="q5"><button class="llm-option" data-value="nu" data-points="20">Nu, dit speelt en ik wil vooruit</button><button class="llm-option" data-value="3mnd" data-points="15">Binnen 3 maanden</button><button class="llm-option" data-value="halfjaar" data-points="10">Binnen een half jaar</button><button class="llm-option" data-value="ditjaar" data-points="5">Dit jaar, maar geen haast</button><button class="llm-option" data-value="orienteren" data-points="0">Ik ori&euml;nteer me alleen even</button></div></section>'
      + '<section class="llm-screen" data-screen="q6"><div class="llm-eyebrow">Vraag 6 van 7</div><h2 class="llm-title">Wat is je grootste frustratie op dit moment?</h2><div class="llm-options" data-q="q6"><button class="llm-option" data-value="zichtbaarheid">Ik sta niet hoog genoeg in Google</button><button class="llm-option" data-value="miscalls">Ik mis te veel telefoontjes of berichten</button><button class="llm-option" data-value="weinig-klanten">Ik krijg te weinig nieuwe klanten</button><button class="llm-option" data-value="concurrent">Mijn concurrent doet het beter en ik weet niet waarom</button><button class="llm-option" data-value="te-druk">Ik heb het te druk om er iets aan te doen</button><button class="llm-option" data-value="geen">Geen grote frustratie, ik kijk gewoon wat er mogelijk is</button><button class="llm-option" data-value="anders" data-frustratie-anders>Anders, namelijk...</button></div><div data-frustratie-wrap style="display:none;"><input type="text" class="llm-input" data-frustratie-input placeholder="Vertel kort wat je frustratie is"><button class="llm-btn-primary" data-next="q6" disabled>Volgende</button></div></section>'
      + '<section class="llm-screen" data-screen="q7"><div class="llm-eyebrow">Bijna klaar</div><h2 class="llm-title">Waar mag ik het rapport naartoe sturen?</h2><form data-contact-form novalidate><input type="text" class="llm-input" data-voornaam placeholder="Je voornaam" autocomplete="given-name" required style="margin-bottom:12px;"><input type="email" class="llm-input" data-email-input placeholder="jouw@email.nl" autocomplete="email" required><label class="llm-consent"><input type="checkbox" data-consent><span>Ja, ik ontvang graag het gratis rapport en af en toe praktische tips over online vindbaarheid van Local Levers. Ik kan me op elk moment weer uitschrijven.</span></label><button type="submit" class="llm-btn-primary" data-submit disabled>Stuur me het rapport</button><div class="llm-error" data-email-error></div></form></section>'
      + '<section class="llm-screen" data-screen="result-qualified"><div class="llm-eyebrow">Je resultaat</div><div class="llm-result"><h2>Top <span data-q-voornaam></span>, we maken je gratis vindbaarheids-rapport voor <span data-q-bedrijf></span> in <span data-q-plaats></span> en sturen het deze week.</h2><p class="lead">We scannen je vindbaarheid op <strong data-q-winstdienst></strong> in <strong data-q-plaats2></strong>.</p></div></section>'
      + '<section class="llm-screen" data-screen="result-unqualified"><div class="llm-eyebrow">Je resultaat</div><div class="llm-result"><h2>We zijn waarschijnlijk niet de juiste fit</h2><p class="lead">Local Levers is gebouwd voor laser- en huidklinieken en behandel-bedrijven. Voor andere bedrijfstypes zijn er bureaus die beter passen.</p><p>Je krijgt geen verkoopgesprek aangeboden. Wel kun je de gratis GBP-checklist nemen, die werkt voor elk lokaal bedrijf met een Google-profiel.</p><button class="llm-cta" data-open-checklist data-result-cta="unqualified">Download de gratis checklist</button></div></section>';
  }

  function initQuiz() {
    const state = { answers: {}, category: null, revealed: false, bedrijf: '', plaats: '', winstdienst: '', voornaam: '', email: '', consent: false };
    const QS = ['q1','q2','q3','q4','q5','q6','q7'];
    const STEPS = QS.length;
    function show(name) {
      modalBodyEl.querySelectorAll('.llm-screen').forEach(s => s.classList.remove('active'));
      const el = modalBodyEl.querySelector('[data-screen="' + name + '"]');
      if (el) el.classList.add('active');
      if (QS.includes(name)) { const idx = QS.indexOf(name) + 1; setCounter(idx + ' / ' + STEPS, (idx/STEPS)*100); }
      else if (name && name.indexOf('result') === 0) setCounter('klaar', 100);
      else setCounter('', 0);
      modalBodyEl.scrollTop = 0; if (backdropEl) backdropEl.scrollTop = 0;
    }
    function next(n) { if (n < STEPS) show('q' + (n+1)); else reveal(); }
    function priorityScore() { return Object.values(state.answers).reduce((s, a) => s + ((a && a.points) || 0), 0); }

    function getZoekterm() {
      const w = state.winstdienst || '';
      const p = state.plaats || '';
      if (!w) return p;
      return p ? (w + ' ' + p) : w;
    }

    function selectOption(group, btn) {
      const q = group.dataset.q;
      group.querySelectorAll('.llm-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const value = btn.dataset.value;
      state.answers[q] = { value: value, label: btn.textContent.trim(), points: parseInt(btn.dataset.points, 10) || 0, disqualify: btn.dataset.disqualify === 'true' };
      track('quiz_question_' + q.slice(1) + '_answered', { value: value });
      if (btn.dataset.disqualify === 'true') { state.category = 'UNQUALIFIED'; setTimeout(reveal, 320); return; }
      if (q === 'q6') {
        const wrap = modalBodyEl.querySelector('[data-frustratie-wrap]');
        if (value === 'anders') {
          if (wrap) { wrap.style.display = 'block'; const inp = wrap.querySelector('[data-frustratie-input]'); if (inp) inp.focus(); }
          return;
        }
        if (wrap) wrap.style.display = 'none';
      }
      setTimeout(() => next(parseInt(q.slice(1), 10)), 320);
    }

    function wireGroup(group) {
      group.querySelectorAll('.llm-option').forEach(btn => { btn.addEventListener('click', () => selectOption(group, btn)); });
    }

    modalBodyEl.querySelector('[data-start]').addEventListener('click', () => { track('quiz_started', {}); show('q1'); });

    modalBodyEl.querySelectorAll('.llm-options').forEach(wireGroup);

    // Q2: bedrijfsnaam + plaats
    const q2bedrijf = modalBodyEl.querySelector('[data-text="bedrijf"]');
    const q2plaats = modalBodyEl.querySelector('[data-text="plaats"]');
    const q2btn = modalBodyEl.querySelector('[data-next="q2"]');
    const validateQ2 = () => { q2btn.disabled = !((q2bedrijf.value || '').trim() && (q2plaats.value || '').trim()); };
    q2bedrijf.addEventListener('input', validateQ2);
    q2plaats.addEventListener('input', validateQ2);
    q2btn.addEventListener('click', () => {
      if (!(q2bedrijf.value || '').trim() || !(q2plaats.value || '').trim()) return;
      state.bedrijf = q2bedrijf.value.trim();
      state.plaats = q2plaats.value.trim();
      state.answers.q2 = { bedrijf: state.bedrijf, plaats: state.plaats };
      track('quiz_question_2_answered', { bedrijf: state.bedrijf, plaats: state.plaats });
      next(2);
    });
    validateQ2();

    // Q3: winstdienst (vrij tekstveld)
    const q3input = modalBodyEl.querySelector('[data-text="winstdienst"]');
    const q3btn = modalBodyEl.querySelector('[data-next="q3"]');
    const validateQ3 = () => { q3btn.disabled = !(q3input.value || '').trim(); };
    q3input.addEventListener('input', validateQ3);
    q3btn.addEventListener('click', () => {
      const v = (q3input.value || '').trim(); if (!v) return;
      state.winstdienst = v;
      state.answers.q3 = { value: v, label: v };
      track('quiz_question_3_answered', { winstdienst: v, zoekterm: getZoekterm() });
      next(3);
    });
    validateQ3();

    // Q6: frustratie "Anders" tekstveld
    const frInput = modalBodyEl.querySelector('[data-frustratie-input]');
    const frBtn = modalBodyEl.querySelector('[data-next="q6"]');
    if (frInput && frBtn) {
      frInput.addEventListener('input', () => { frBtn.disabled = !(frInput.value || '').trim(); });
      frBtn.addEventListener('click', () => {
        const t = (frInput.value || '').trim(); if (!t) return;
        state.answers.q6 = { value: 'anders', label: 'Anders', text: t, points: 0, disqualify: false };
        track('quiz_question_6_answered', { value: 'anders' });
        next(6);
      });
    }

    function renderQualified() {
      const set = (sel, val) => { const el = modalBodyEl.querySelector(sel); if (el) el.textContent = val; };
      set('[data-q-voornaam]', state.voornaam);
      set('[data-q-bedrijf]', state.bedrijf);
      set('[data-q-plaats]', state.plaats);
      set('[data-q-plaats2]', state.plaats);
      set('[data-q-winstdienst]', (state.answers.q3 && state.answers.q3.label) || '');
    }

    function reveal() {
      state.revealed = true;
      if (state.category !== 'UNQUALIFIED') state.category = 'QUALIFIED';
      if (state.category === 'QUALIFIED') { renderQualified(); show('result-qualified'); }
      else show('result-unqualified');
      track('quiz_result_shown', { category: state.category });
      modalBodyEl.querySelectorAll('[data-result-cta]').forEach(el => {
        el.addEventListener('click', (e) => {
          track('quiz_result_cta_click', { category: state.category, target: el.dataset.resultCta });
          if (el.hasAttribute('data-open-checklist')) { e.preventDefault(); closeModal(); setTimeout(openChecklist, 200); }
        }, { once: true });
      });
    }

    // Q6: contact + consent
    const form = modalBodyEl.querySelector('[data-contact-form]');
    const voornaam = modalBodyEl.querySelector('[data-voornaam]');
    const emailInput = modalBodyEl.querySelector('[data-email-input]');
    const consent = modalBodyEl.querySelector('[data-consent]');
    const submitBtn = modalBodyEl.querySelector('[data-submit]');
    const emailError = modalBodyEl.querySelector('[data-email-error]');
    const emailValid = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((emailInput.value || '').trim());
    const validateContact = () => { submitBtn.disabled = !((voornaam.value || '').trim() && emailValid() && consent.checked); };
    voornaam.addEventListener('input', validateContact);
    emailInput.addEventListener('input', validateContact);
    consent.addEventListener('change', validateContact);
    validateContact();
    form.addEventListener('submit', (e) => {
      e.preventDefault(); emailError.textContent = '';
      if (!(voornaam.value || '').trim()) { emailError.textContent = 'Vul je voornaam in.'; voornaam.focus(); return; }
      if (!emailValid()) { emailError.textContent = 'Vul een geldig e-mailadres in.'; emailInput.focus(); return; }
      if (!consent.checked) { emailError.textContent = 'Vink de toestemming aan.'; return; }
      state.voornaam = voornaam.value.trim();
      state.email = emailInput.value.trim();
      state.consent = true;
      const payload = {
        voornaam: state.voornaam, email: state.email,
        type: state.answers.q1 && state.answers.q1.value,
        bedrijf: state.bedrijf, plaats: state.plaats,
        winstdienst: state.answers.q3 && state.answers.q3.label,
        zoekterm: getZoekterm(),
        aov: state.answers.q4 && state.answers.q4.value,
        timing: state.answers.q5 && state.answers.q5.value,
        prioriteit: priorityScore(),
        frustratie: state.answers.q6 && (state.answers.q6.text || state.answers.q6.label),
        consent: true, source: 'modal'
      };
      try { track('quiz_email_submitted', { category: 'QUALIFIED', zoekterm: payload.zoekterm, timing: payload.timing, prioriteit: payload.prioriteit }); } catch (err) {}
      reveal();
    });
  }

  function openQuiz() { track('quiz_modal_opened', {}); openModal(); modalBodyEl.innerHTML = quizMarkup(); setCounter('', 0); initQuiz(); }

  function checklistMarkup() {
    return '<section class="llm-screen active" data-screen="checklist-form"><div class="llm-eyebrow">Voor klinieken</div><h2 class="llm-title">GBP-checklist 2026: weet binnen <span class="accent">10 minuten</span> waar je staat</h2><p class="llm-help">13 punten die in 2026 bepalen of je Google-profiel werkt of niet, inclusief 4 nieuwe punten voor AI-zichtbaarheid. We zullen je nooit spammen. Pinky promise.</p><ul class="llm-checklist-bullets"><li>13-punts checklist als PDF, drukklaar.</li><li>4 nieuwe punten voor ChatGPT, Gemini en Perplexity.</li><li>Prioritering: welke 3 punten als eerste, welke 10 daarna.</li><li>5 emails met inzichten specifiek voor klinieken.</li></ul><form data-cl-form novalidate><input type="text" class="llm-input" data-cl-name placeholder="Wat is je voornaam?" autocomplete="given-name" required style="margin-bottom:12px;"><input type="email" class="llm-input" data-cl-input placeholder="Wat is jouw beste email?" autocomplete="email" required><label class="llm-consent"><input type="checkbox" data-cl-consent><span>Ja, stuur mij de checklist en af en toe praktische tips over online vindbaarheid van Local Levers. Ik kan me op elk moment weer uitschrijven.</span></label><button type="submit" class="llm-btn-primary" data-cl-submit disabled>Stuur me de checklist</button><div class="llm-error" data-cl-error></div><p class="llm-note">PDF plus 5 emails verspreid over 2 weken. Uitschrijven met &eacute;&eacute;n klik.</p></form></section>'
      + '<section class="llm-screen" data-screen="checklist-thanks"><div class="llm-eyebrow">Check je inbox</div><h2 class="llm-title">De PDF is onderweg.</h2><p class="llm-help" style="font-size:15px;color:#FAFAF8;margin-bottom:20px;">Kijk ook even in spam mocht hij niet binnen 5 minuten binnen zijn.</p><div class="llm-result" style="border-left:3px solid #4ADE80;margin-bottom:14px;"><h2 style="font-size:20px;">Wil je nu ook weten waar je staat?</h2><p>De checklist is een DIY-tool. Vraag je gratis vindbaarheids-rapport aan en we maken een vindbaarheids-rapport op maat voor jouw bedrijf.</p><button class="llm-cta" data-open-quiz-after-checklist>Vraag je gratis vindbaarheids-rapport aan</button><p class="llm-result-sub">Gratis en vrijblijvend. Geen verplichting.</p></div></section>';
  }

  function initChecklist() {
    const form = modalBodyEl.querySelector('[data-cl-form]');
    const nameInput = modalBodyEl.querySelector('[data-cl-name]');
    const input = modalBodyEl.querySelector('[data-cl-input]');
    const consent = modalBodyEl.querySelector('[data-cl-consent]');
    const submitBtn = modalBodyEl.querySelector('[data-cl-submit]');
    const err = modalBodyEl.querySelector('[data-cl-error]');
    const emailOk = () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((input.value || '').trim());
    const validate = () => { submitBtn.disabled = !((!nameInput || (nameInput.value || '').trim()) && emailOk() && consent.checked); };
    if (nameInput) nameInput.addEventListener('input', validate);
    input.addEventListener('input', validate);
    consent.addEventListener('change', validate);
    validate();
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); err.textContent = '';
      const name = nameInput ? (nameInput.value || '').trim() : '';
      if (nameInput && !name) { err.textContent = 'Vul je voornaam in.'; nameInput.focus(); return; }
      const email = (input.value || '').trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { err.textContent = 'Vul een geldig e-mailadres in.'; input.focus(); return; }
      if (!consent.checked) { err.textContent = 'Vink de toestemming aan.'; return; }
      try { track('checklist_optin', { name, email, source: 'modal' }); } catch (e2) {}
      try { localStorage.setItem('ll_checklist_optin', '1'); } catch (e3) {}
      modalBodyEl.querySelectorAll('.llm-screen').forEach(s => s.classList.remove('active'));
      modalBodyEl.querySelector('[data-screen="checklist-thanks"]').classList.add('active');
      const upsell = modalBodyEl.querySelector('[data-open-quiz-after-checklist]');
      if (upsell) {
        upsell.addEventListener('click', () => {
          track('checklist_to_quiz_cta_click', { name, email });
          modalBodyEl.innerHTML = quizMarkup(); setCounter('', 0); initQuiz();
        }, { once: true });
      }
    });
  }

  function openChecklist() { track('checklist_modal_opened', {}); openModal(); modalBodyEl.innerHTML = checklistMarkup(); setCounter('', 0); initChecklist(); }

  function bindTriggers() {
    const path = location.pathname;
    const onCheck = /\/check\/?$/.test(path) || path.indexOf('/check/index.html') >= 0;
    const onChecklist = /\/checklist(\/(bedankt\/?)?)?$/.test(path) || path.indexOf('/checklist/index.html') >= 0 || path.indexOf('/checklist/bedankt/index.html') >= 0;

    const isQuiz = (el) => {
      if (!el) return false;
      if (el.hasAttribute && el.hasAttribute('data-open-quiz')) return true;
      const h = el.getAttribute && el.getAttribute('href');
      return h === '/check/' || h === '/check' || h === 'check/' || h === '../check/';
    };
    const isChecklist = (el) => {
      if (!el) return false;
      if (el.hasAttribute && el.hasAttribute('data-open-checklist')) return true;
      const h = el.getAttribute && el.getAttribute('href');
      return h === '/checklist/' || h === '/checklist' || h === 'checklist/' || h === '../checklist/';
    };

    document.addEventListener('click', (e) => {
      let el = e.target;
      while (el && el !== document.body) {
        if (isQuiz(el) && !onCheck) { e.preventDefault(); openQuiz(); return; }
        if (isChecklist(el) && !onChecklist) { e.preventDefault(); openChecklist(); return; }
        el = el.parentElement;
      }
    }, true);
  }

  function shouldExit() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return false;
    try { if (localStorage.getItem('ll_checklist_optin') === '1') return false; } catch (_) {}
    try { if (sessionStorage.getItem('ll_exit_shown') === '1') return false; } catch (_) {}
    if (backdropEl && backdropEl.classList.contains('open')) return false;
    return true;
  }
  function fireExit() {
    if (!shouldExit()) return;
    try { sessionStorage.setItem('ll_exit_shown', '1'); } catch (_) {}
    track('exit_intent_checklist_shown', {});
    openChecklist();
  }
  function setupExit() {
    if (window.matchMedia && window.matchMedia('(max-width: 768px)').matches) return;
    let armed = false; setTimeout(() => { armed = true; }, 5000);
    document.addEventListener('mouseout', (e) => {
      if (!armed) return; if (e.relatedTarget) return; if ((e.clientY || 0) > 50) return;
      fireExit();
    });
    document.addEventListener('visibilitychange', () => {
      if (!armed) return; if (document.visibilityState !== 'hidden') return;
      if ((window.scrollY || 0) < 200) return;
      fireExit();
    });
  }

  function init() { injectCSS(); bindTriggers(); setupExit(); console.log('[LLModals] ready'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.LLModals = {
    openQuiz, openChecklist, closeModal,
    testExitIntent: function () { try { localStorage.removeItem('ll_checklist_optin'); } catch (_) {} try { sessionStorage.removeItem('ll_exit_shown'); } catch (_) {} openChecklist(); },
    clearFlags: function () { try { localStorage.removeItem('ll_checklist_optin'); } catch (_) {} try { sessionStorage.removeItem('ll_exit_shown'); } catch (_) {} console.log('LL flags cleared.'); }
  };
})();
