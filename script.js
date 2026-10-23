/* ============================================================
   SRIKANTH & DIVYA — TELUGU ROYAL WEDDING INVITATION
   JavaScript Logic:
   1. Realistic South Indian Flower Petals Engine (Jasmine, Marigold, Rose)
   2. Traditional South Indian Wedding Audio Player (assets/traditional_wedding.mp3)
   3. Silky Smooth Scroll Reveal & Dock Nav Tracking
   4. Live Muhurtham Countdown
   5. RSVP & Live Blessings Guestbook Wall
   6. Native Share & Copy Toast
   ============================================================ */

(function () {
  'use strict';

  // ---- DOM ELEMENTS ----
  const mainEl        = document.getElementById('main');
  const bottomDock    = document.getElementById('bottom-dock');
  const audioCtrl     = document.getElementById('audio-control');
  const btnAudio      = document.getElementById('btn-audio');
  const weddingAudio  = document.getElementById('wedding-audio');
  const canvas        = document.getElementById('ambient-canvas');

  // ============================================================
  // 1. REALISTIC FLOWER PETALS ENGINE (JASMINE, MARIGOLD, ROSE)
  // ============================================================
  let ctx, width, height;
  let petals = [];
  let scrollSpeed = 0;
  let lastScrollY = window.scrollY;

  // Track scroll velocity for realistic flutter reaction
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    scrollSpeed = Math.min(Math.abs(currentScrollY - lastScrollY) * 0.15, 6);
    lastScrollY = currentScrollY;
  }, { passive: true });

  function initPetalCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // 40 exquisite South Indian wedding petals
    const count = window.innerWidth < 500 ? 32 : 48;
    petals = [];
    for (let i = 0; i < count; i++) {
      petals.push(createPetal(true));
    }

    requestAnimationFrame(renderPetals);
  }

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  /*
    Petal Types:
    0: Rose Petal (గులాబీ రేకు - Rich Sindhoor & Velvet Rose)
    1: Marigold Petal (బంతిపూవు రేకు - Auspicious Saffron & Golden Yellow)
    2: Jasmine Petal (మల్లెపూవు - Sacred Ivory Silk with Gold Tip)
    3: Golden Akshata (అక్షింతలు - Auspicious Turmeric Grains)
  */
  function createPetal(randomY) {
    const rand = Math.random();
    let type = 0;
    if (rand < 0.40) type = 0;       // 40% Rose
    else if (rand < 0.70) type = 1;  // 30% Marigold
    else if (rand < 0.90) type = 2;  // 20% Jasmine
    else type = 3;                   // 10% Gold Akshata

    return {
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -25,
      type: type,
      size: type === 3 ? 2 + Math.random() * 2 : 7 + Math.random() * 9,
      speedY: 0.6 + Math.random() * 0.9,
      swaySpeed: 0.015 + Math.random() * 0.025,
      swayAngle: Math.random() * Math.PI * 2,
      swayRadius: 1 + Math.random() * 2.5,
      flipAngle: Math.random() * Math.PI * 2,
      flipSpeed: 0.02 + Math.random() * 0.035,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.45 + Math.random() * 0.45
    };
  }

  function drawPetal(ctx, p) {
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    // 3D perspective flip (scaling horizontally as it tumbles through the air)
    const scaleX = Math.cos(p.flipAngle);
    ctx.scale(scaleX, 1);
    ctx.globalAlpha = p.opacity;

    const s = p.size;

    if (p.type === 0) {
      // ---- ROSE PETAL (గులాబీ) ----
      const grad = ctx.createRadialGradient(0, -s * 0.3, s * 0.1, 0, 0, s * 1.3);
      grad.addColorStop(0, '#D93856');   // Vibrant rose crimson
      grad.addColorStop(0.6, '#961B30'); // Deep sindhoor velvet
      grad.addColorStop(1, '#5C0D1C');   // Deep shadow edge

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Curved heart-shaped natural petal
      ctx.moveTo(0, s * 0.8);
      ctx.bezierCurveTo(-s * 0.9, s * 0.3, -s * 0.9, -s * 0.7, 0, -s * 0.9);
      ctx.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.9, s * 0.3, 0, s * 0.8);
      ctx.fill();

    } else if (p.type === 1) {
      // ---- MARIGOLD PETAL (బంతిపూవు) ----
      const grad = ctx.createLinearGradient(0, -s, 0, s);
      grad.addColorStop(0, '#FFA800'); // Saffron gold
      grad.addColorStop(0.7, '#E67300'); // Rich marigold
      grad.addColorStop(1, '#BF5000'); // Deep amber

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Fluted elongated curved petal
      ctx.moveTo(0, s);
      ctx.bezierCurveTo(-s * 0.5, s * 0.4, -s * 0.6, -s * 0.6, 0, -s);
      ctx.bezierCurveTo(s * 0.6, -s * 0.6, s * 0.5, s * 0.4, 0, s);
      ctx.fill();

    } else if (p.type === 2) {
      // ---- JASMINE PETAL (మల్లెపూవు) ----
      const grad = ctx.createRadialGradient(0, -s * 0.2, s * 0.1, 0, 0, s);
      grad.addColorStop(0, '#FFFFFF');
      grad.addColorStop(0.75, '#FAF6EE');
      grad.addColorStop(1, '#E8DCB8'); // Soft auspicious cream-gold base

      ctx.fillStyle = grad;
      ctx.beginPath();
      // Delicate oval jasmine petal
      ctx.moveTo(0, s * 0.9);
      ctx.bezierCurveTo(-s * 0.5, s * 0.2, -s * 0.5, -s * 0.6, 0, -s * 0.9);
      ctx.bezierCurveTo(s * 0.5, -s * 0.6, s * 0.5, s * 0.2, 0, s * 0.9);
      ctx.fill();

    } else {
      // ---- GOLDEN AKSHATA (అక్షింతలు) ----
      ctx.fillStyle = '#E5B942';
      ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
      ctx.shadowBlur = 4;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.8, s * 1.8, p.rotation, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  function renderPetals() {
    ctx.clearRect(0, 0, width, height);

    // Dynamic scroll influence: smoothly decay scrollSpeed
    scrollSpeed *= 0.94;

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];

      // Update positions
      p.y += p.speedY + scrollSpeed;
      p.swayAngle += p.swaySpeed;
      p.x += Math.sin(p.swayAngle) * p.swayRadius;
      p.flipAngle += p.flipSpeed;
      p.rotation += p.rotationSpeed;

      // Draw the petal
      drawPetal(ctx, p);

      // Reset when falling off screen
      if (p.y > height + 30) {
        petals[i] = createPetal(false);
      }
    }

    requestAnimationFrame(renderPetals);
  }

  initPetalCanvas();

  // Burst of petals on screen tap/click
  document.addEventListener('click', (e) => {
    // Avoid triggering on buttons or form fields
    if (e.target.closest('button, a, input, select, textarea, label')) return;
    spawnPetalBurst(e.clientX, e.clientY);
  });

  function spawnPetalBurst(clickX, clickY) {
    const burstCount = 6;
    for (let i = 0; i < burstCount; i++) {
      const p = createPetal(false);
      p.x = clickX + (Math.random() - 0.5) * 40;
      p.y = clickY + (Math.random() - 0.5) * 30;
      p.speedY = 1.2 + Math.random() * 1.5;
      p.size = 9 + Math.random() * 8;
      petals.push(p);
      // Remove excess petals
      if (petals.length > 60) petals.shift();
    }
  }

  // ============================================================
  // 2. WEDDING AUDIO PLAYER (SITA KALYANA VAIBHOGAME)
  // ============================================================
  let isPlaying = false;

  if (weddingAudio && btnAudio) {
    function toggleWeddingMusic() {
      if (!weddingAudio) return;

      if (weddingAudio.paused) {
        weddingAudio.volume = 0.85;
        const playPromise = weddingAudio.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            isPlaying = true;
            if (audioCtrl) audioCtrl.classList.add('is-playing');
          }).catch((err) => {
            console.log('Audio playback waiting for interaction:', err);
          });
        }
      } else {
        weddingAudio.pause();
        isPlaying = false;
        if (audioCtrl) audioCtrl.classList.remove('is-playing');
      }
    }

    btnAudio.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWeddingMusic();
    });

    const tryAutoPlayOnFirstTouch = () => {
      if (weddingAudio && weddingAudio.paused && !isPlaying) {
        weddingAudio.volume = 0.85;
        weddingAudio.play().then(() => {
          isPlaying = true;
          if (audioCtrl) audioCtrl.classList.add('is-playing');
        }).catch(() => {});
      }
      document.removeEventListener('click', tryAutoPlayOnFirstTouch);
      document.removeEventListener('touchstart', tryAutoPlayOnFirstTouch);
    };
    document.addEventListener('click', tryAutoPlayOnFirstTouch, { once: true });
    document.addEventListener('touchstart', tryAutoPlayOnFirstTouch, { once: true });
  }

  // ============================================================
  // 3. SILKY SMOOTH SCROLL REVEAL & DOCK TRACKING
  // ============================================================
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-up');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));

    // Nav Dock active tracking
    initDockTracking();
  }

  function initDockTracking() {
    const trackedSections = [
      { id: 'hero',     index: 0 },
      { id: 'couple',   index: 1 },
      { id: 'events',   index: 2 },
      { id: 'venue',    index: 3 },
      { id: 'rsvp',     index: 4 }
    ];

    const dockItems = document.querySelectorAll('.dock-item');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let activeIndex = 0;

      for (let i = 0; i < trackedSections.length; i++) {
        const secEl = document.getElementById(trackedSections[i].id);
        if (secEl && secEl.offsetTop <= scrollPos) {
          activeIndex = trackedSections[i].index;
        }
      }

      dockItems.forEach((item, idx) => {
        item.classList.toggle('active', idx === activeIndex);
      });
    }, { passive: true });

    // Smooth click scrolling for dock items
    dockItems.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  // ============================================================
  // 4. LIVE MUHURTHAM COUNTDOWN TIMER
  // ============================================================
  // Sacred Muhurtham: 15 November 2026, 07:15 AM IST
  const TARGET_MUHURTHAM = new Date('2026-11-15T07:15:00+05:30');

  function updateCountdown() {
    const now = new Date();
    let diff = TARGET_MUHURTHAM - now;
    if (diff <= 0) diff = 0;

    const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs  = Math.floor((diff % (1000 * 60)) / 1000);

    setElText('cd-d', padZero(days));
    setElText('cd-h', padZero(hours));
    setElText('cd-m', padZero(mins));
    setElText('cd-s', padZero(secs));
  }

  function padZero(n) {
    return String(n).padStart(2, '0');
  }

  function setElText(id, val) {
    const el = document.getElementById(id);
    if (el && el.textContent !== val) {
      el.textContent = val;
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  // ============================================================
  // 5. RSVP & LIVE BLESSINGS WALL
  // ============================================================
  window.handleRSVP = function (e) {
    e.preventDefault();
    const nameVal     = document.getElementById('rsvp-name').value.trim();
    const countVal    = document.getElementById('rsvp-count').value;
    const blessingVal = document.getElementById('rsvp-blessing').value.trim();
    const btnSubmit   = document.getElementById('btn-submit-rsvp');

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = 'నమోదు అవుతోంది… (Sending…)';

    setTimeout(() => {
      document.getElementById('rsvp-form').style.display = 'none';
      document.getElementById('rsvp-success').style.display = 'block';

      // If user wrote a blessing, add it to the Live Blessings Stream
      if (blessingVal) {
        const stream = document.getElementById('blessings-stream');
        if (stream) {
          const card = document.createElement('div');
          card.className = 'wall-blessing-item';
          card.style.animation = 'fadeIn 0.6s ease';
          card.innerHTML = `
            <p class="blessing-quote">"${escapeHtml(blessingVal)}"</p>
            <span class="blessing-author">— ${escapeHtml(nameVal)} (హాజరవుతున్నారు: ${countVal} మంది)</span>
          `;
          stream.prepend(card);
        }
      }

      showToast('మీ ఆశీర్వాదం నమోదయింది! 🌸');
    }, 1000);
  };

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ============================================================
  // 6. SHARE INVITATION & TOAST
  // ============================================================
  window.shareInvite = function () {
    const shareData = {
      title: '💍 Srikanth & Divya — కల్యాణ ఆహ్వాన పత్రిక',
      text: 'శ్రీకాంత్ మరియు దివ్యల వివాహ మహోత్సవ శుభలేఖ. You are cordially invited to celebrate our sacred Telugu wedding on 15 Nov 2026! 🌸\nశుభమస్తు — అవిఘ్నమస్తు\n',
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(() => copyToClipboard());
    } else {
      copyToClipboard();
    }
  };

  function copyToClipboard() {
    const text = '💍 Srikanth & Divya — Telugu Wedding Invitation\n15th November 2026, Hyderabad\n' + window.location.href;
    navigator.clipboard.writeText(text).then(
      () => showToast('శుభలేఖ లింక్ కాపీ చేయబడింది! 📋'),
      () => showToast('Link copied to clipboard!')
    );
  }

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

})();
