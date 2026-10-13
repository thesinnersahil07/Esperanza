/* ============================================================
   ESPERANZA 2K26 — INTERACTION ENGINE
   GSAP + ScrollTrigger + Lenis + Three.js
   ============================================================ */

(function () {
  'use strict';

  // Ensure browser scroll restoration does not distort GSAP ScrollTrigger progress on load/refresh
  if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  // ======================== CONFIG ========================
  const CONFIG = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isMobile: window.innerWidth < 769,
    isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    particleCount: window.innerWidth < 769 ? 800 : 2000,
    debug: false,
  };

  // ======================== LENIS SMOOTH SCROLL ========================
  let lenis;

  function initLenis() {
    if (CONFIG.reducedMotion) return;

    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    window.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // ======================== CONTEXTUAL INTELLIGENT CURSOR ========================
  const cursor = {
    el: document.getElementById('cursor'),
    dot: null,
    ring: null,
    text: null,
    pos: { x: 0, y: 0 },
    target: { x: 0, y: 0 },
    visible: false,

    init() {
      if (CONFIG.isTouch || !this.el) return;

      this.dot = this.el.querySelector('.cursor__dot');
      this.ring = this.el.querySelector('.cursor__ring');
      this.text = document.getElementById('cursorText');

      document.addEventListener('mousemove', (e) => {
        this.target.x = e.clientX;
        this.target.y = e.clientY;

        if (!this.visible) {
          this.visible = true;
          gsap.set(this.el, { opacity: 1 });
        }
      });

      document.addEventListener('mouseleave', () => {
        this.visible = false;
        gsap.to(this.el, { opacity: 0, duration: 0.3 });
      });

      document.addEventListener('mouseenter', () => {
        this.visible = true;
        gsap.to(this.el, { opacity: 1, duration: 0.3 });
      });

      // Contextual inspection via event delegation
      document.addEventListener('mouseover', (e) => {
        const target = e.target;
        const cursorOwner = target.closest('[data-cursor]');
        if (cursorOwner) {
          const label = cursorOwner.dataset.cursor || '';
          this.setLabel(label);
          return;
        }

        const isInteractive = target.closest('a, button, input, textarea, select, .event-card');
        if (isInteractive) {
          this.el.classList.add('is-interactive');
        }
      });

      document.addEventListener('mouseout', (e) => {
        const target = e.target;
        if (target.closest('[data-cursor]')) {
          this.clearLabel();
        }
        if (target.closest('a, button, input, textarea, select, .event-card')) {
          this.el.classList.remove('is-interactive');
        }
      });

      this.update();
    },

    setLabel(label) {
      if (!this.text) return;
      this.text.textContent = label;
      this.el.classList.add('has-label');
      if (label === 'ENTER') this.el.classList.add('is-enter');
      if (label === 'CLOSE') this.el.classList.add('is-close');
    },

    clearLabel() {
      if (!this.text) return;
      this.text.textContent = '';
      this.el.classList.remove('has-label', 'is-enter', 'is-close');
    },

    update() {
      if (CONFIG.isTouch) return;

      this.pos.x += (this.target.x - this.pos.x) * 0.18;
      this.pos.y += (this.target.y - this.pos.y) * 0.18;

      if (this.dot) gsap.set(this.dot, { x: this.target.x, y: this.target.y });
      if (this.ring) gsap.set(this.ring, { x: this.pos.x, y: this.pos.y });

      requestAnimationFrame(() => this.update());
    },
  };

  // ======================== MAGNETIC BUTTONS ========================
  function initMagneticButtons() {
    if (CONFIG.isTouch || CONFIG.reducedMotion) return;

    document.querySelectorAll('[data-magnetic]').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out',
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // ======================== THREE.JS PARTICLE SYSTEM ========================
  let particleSystem = null;

  function initParticles() {
    const canvas = document.getElementById('webglCanvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry
    const count = CONFIG.particleCount;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const speeds = new Float32Array(count);

    const palette = [
      [0.49, 0.72, 1.0],   // chrome-blue
      [0.73, 0.56, 1.0],   // chrome-purple
      [1.0, 0.43, 0.71],   // chrome-pink
      [0.36, 1.0, 0.88],   // chrome-cyan
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Spread particles in a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 12;

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi) - 5;

      // Color from palette
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color[0];
      colors[i3 + 1] = color[1];
      colors[i3 + 2] = color[2];

      sizes[i] = Math.random() * 2 + 0.5;
      speeds[i] = Math.random() * 0.5 + 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader material for particles with chromatic active-world color sync
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScrollProgress: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
        uOpacity: { value: 0.6 },
        uActiveColor: { value: new THREE.Color(0x5bffe0) },
        uColorInfluence: { value: 0.0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        uniform float uTime;
        uniform float uScrollProgress;
        uniform float uPixelRatio;
        uniform vec3 uActiveColor;
        uniform float uColorInfluence;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          // Lerp base palette color towards active festival world accent color
          vColor = mix(color, uActiveColor, clamp(uColorInfluence * 0.75, 0.0, 0.85));

          vec3 pos = position;

          // Gentle floating motion
          float offset = length(pos.xy) * 0.5;
          pos.x += sin(uTime * 0.3 + offset) * 0.15;
          pos.y += cos(uTime * 0.2 + offset * 1.3) * 0.15;
          pos.z += sin(uTime * 0.15 + offset * 0.7) * 0.1;

          // Scroll-driven depth shift
          pos.z += uScrollProgress * 3.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Distance-based opacity
          float dist = length(mvPosition.xyz);
          vOpacity = smoothstep(15.0, 2.0, dist) * 0.7;

          gl_PointSize = size * uPixelRatio * (3.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vOpacity;
        uniform float uOpacity;

        void main() {
          // Soft circle
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;

          float alpha = smoothstep(0.5, 0.1, dist) * vOpacity * uOpacity;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    particleSystem = { 
      renderer, 
      scene, 
      camera, 
      material, 
      points, 
      speeds,
      setActiveColor(hexStr, influence = 0.8, duration = 0.7) {
        if (!material) return;
        try {
          const target = new THREE.Color(hexStr);
          gsap.to(material.uniforms.uActiveColor.value, {
            r: target.r,
            g: target.g,
            b: target.b,
            duration: duration,
            ease: 'power2.out',
          });
          gsap.to(material.uniforms.uColorInfluence, {
            value: influence,
            duration: duration,
            ease: 'power2.out',
          });
        } catch (e) {}
      },
      resetColor(duration = 0.9) {
        if (!material) return;
        gsap.to(material.uniforms.uColorInfluence, {
          value: 0.0,
          duration: duration,
          ease: 'power2.out',
        });
      }
    };

    // Mouse interaction
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Scroll progress for particles
    let scrollProgress = 0;

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress = self.progress;
      },
    });

    // Animation loop
    let time = 0;

    function animate() {
      requestAnimationFrame(animate);
      time += 0.01;

      material.uniforms.uTime.value = time;
      material.uniforms.uScrollProgress.value = scrollProgress;
      material.uniforms.uMouse.value.set(mouseX, mouseY);

      // Subtle camera movement
      camera.position.x += (mouseX * 0.3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.02;

      renderer.render(scene, camera);
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      material.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
    });
  }

  // ======================== PRELOADER ========================
  function initPreloader() {
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloaderBar');
    const status = document.getElementById('preloaderStatus');
    const phoenix = preloader?.querySelector('.preloader__phoenix');
    const progress = preloader?.querySelector('.preloader__progress');
    const text = preloader?.querySelector('.preloader__text');
    const meta = preloader?.querySelector('.preloader__edition-tag');

    if (!preloader) return;

    const tl = gsap.timeline();

    // Preloader entrance
    tl.to(phoenix, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' })
      .to(progress, { opacity: 1, duration: 0.3 }, '-=0.3')
      .to(text, { opacity: 1, duration: 0.3 }, '-=0.2')
      .to(meta, { opacity: 1, duration: 0.3 }, '-=0.1');

    const messages = [
      'CONVERGING FORCES',
      'ALIGNING NEURAL MATRICES',
      'AWAKENING PHOENIX HORIZON',
      'ESPERANZA 2K26 READY',
    ];

    let progress_val = 0;
    const loadInterval = setInterval(() => {
      progress_val += Math.random() * 18 + 8;
      if (progress_val > 100) progress_val = 100;

      if (bar) bar.style.width = progress_val + '%';

      const msgIndex = Math.min(
        Math.floor((progress_val / 100) * messages.length),
        messages.length - 1
      );
      if (status) status.textContent = messages[msgIndex];

      if (progress_val >= 100) {
        clearInterval(loadInterval);
        setTimeout(revealSite, 350);
      }
    }, 160);

    function revealSite() {
      const revealTl = gsap.timeline({
        onComplete: () => {
          preloader.style.display = 'none';
          ScrollTrigger.refresh();
          handleInitialPageScroll();
        },
      });

      revealTl
        .to(phoenix, { scale: 1.6, opacity: 0, filter: 'blur(15px)', duration: 0.7, ease: 'power3.in' })
        .to(preloader, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.3')
        .add(() => initHeroAnimation(), '-=0.5');
    }
  }

  // ======================== HERO ANIMATION (THE 7-PHASE CHOREOGRAPHY) ========================
  function initHeroAnimation() {
    const video = document.getElementById('heroVideo');
    const beacon = document.getElementById('heroBeacon');
    const emblem = document.getElementById('heroEmblem');
    const preTitle = document.querySelector('.hero__pre-title');
    const chars = document.querySelectorAll('.hero__char');
    const chromaCyan = document.querySelector('.hero__title-chroma--cyan');
    const chromaPink = document.querySelector('.hero__title-chroma--pink');
    const year = document.getElementById('heroYear');
    const tagline = document.getElementById('heroTagline');
    const themeSegments = document.querySelectorAll('.hero__theme-segment, .hero__theme-bullet');
    const heroDate = document.getElementById('heroDate');
    const cta = document.getElementById('heroCta');
    const scrollIndicator = document.getElementById('scrollIndicator');
    const nav = document.getElementById('nav');
    const soundToggle = document.getElementById('soundToggle');

    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // PHASE 01: Beacon of light emerges in the void
    heroTl
      .fromTo(beacon, 
        { scale: 0.1, opacity: 0 },
        { scale: 1.5, opacity: 1, duration: 1.1, ease: 'power2.out' }
      )
      .to(beacon, {
        scale: 4,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      })

    // PHASE 02: Constructed Phoenix Core Emblem
      .fromTo(emblem,
        { scale: 0.3, opacity: 0, rotation: -20, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, rotation: 0, filter: 'blur(0px)', duration: 1.3, ease: 'power4.out' },
        '-=0.3'
      )
      .to(emblem, {
        y: -50,
        opacity: 0.15,
        scale: 0.75,
        duration: 1.1,
        ease: 'power2.inOut',
      }, '+=0.1')

    // PHASE 03: Chromatic typography emergence
      .to(preTitle, { opacity: 1, duration: 0.8 }, '-=0.8')
      .fromTo([chromaCyan, chromaPink],
        { opacity: 0, scale: 0.96 },
        { opacity: 0.7, scale: 1, duration: 0.35, ease: 'power2.out' },
        '-=0.5'
      )
      .to(chars, {
        y: 0,
        duration: 1.1,
        stagger: { amount: 0.45, from: 'center' },
        ease: 'power4.out',
      }, '-=0.4')
      .to([chromaCyan, chromaPink], {
        opacity: 0,
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.5')

    // PHASE 04: The video world reveals behind the typography
      .add(() => {
        if (video && !CONFIG.reducedMotion) {
          video.muted = true;
          video.playsInline = true;
          const heroSection = document.getElementById('hero');
          const heroRect = heroSection ? heroSection.getBoundingClientRect() : null;
          if (!heroRect || (heroRect.top < window.innerHeight && heroRect.bottom > 0)) {
            video.play().catch(() => {});
          }
        }
      }, '-=0.8')
      .to(video, { opacity: 0.65, scale: 1, duration: 2.0, ease: 'power2.out' }, '-=0.8')

    // PHASE 05: Independent "2K26" emergence
      .to(year, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=1.0')
      .to(tagline, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')

    // PHASE 06: Controlled kinetic type theme sequence
      .to(themeSegments, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
      }, '-=0.5')

    // PHASE 07: CTA & Interface controls
      .to(heroDate, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
      .to(cta, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to(scrollIndicator, { opacity: 0.8, duration: 0.6 }, '-=0.4')
      .to(nav, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5')
      .to(soundToggle, { opacity: 1, duration: 0.6 }, '-=0.4');

    // Hero 3D Receding Parallax on Scroll
    if (!CONFIG.reducedMotion) {
      gsap.to('.hero__content', {
        scale: 0.88,
        yPercent: -25,
        opacity: 0,
        filter: 'blur(6px)',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.to('.hero__video', {
        scale: 1.35,
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      gsap.to('.hero__scroll-indicator', {
        opacity: 0,
        scrollTrigger: {
          trigger: '.hero',
          start: '5% top',
          end: '15% top',
          scrub: true,
        },
      });
    }
  }

  // ======================== SCROLL REVEALS ========================
  function initScrollReveals() {
    // Section labels are handled specifically by initSectionLabels() with micro-staggers

    // Reveal text (headings)
    gsap.utils.toArray('.reveal-text').forEach((el) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Reveal blocks
    gsap.utils.toArray('.reveal-block').forEach((el, i) => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: (i % 3) * 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Counter animation for stats
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count);
      if (isNaN(target)) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            textContent: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function () {
              el.textContent = Math.round(
                gsap.getProperty(el, 'textContent')
              );
            },
          });
        },
      });
    });
  }

  // ======================== AUTHORITATIVE EVENTS & MODAL SYSTEM ========================
  let currentActiveEventSlug = null;
  let currentFilter = 'all';

  function isEventEligible(event, filter) {
    if (!filter || filter === 'all') return true;
    const targetClass = parseInt(filter, 10);
    if (isNaN(targetClass)) return true;
    return Array.isArray(event.eligibleClasses) && event.eligibleClasses.includes(targetClass);
  }

  function initEventsExplorer() {
    const track = document.getElementById('eventsTrack');
    const section = document.querySelector('.events-explorer');
    const progressEl = document.querySelector('.events-explorer__controls');
    const progressBar = document.getElementById('eventsProgressBar');
    const currentCount = document.getElementById('eventsCurrent');
    const totalCount = document.getElementById('eventsTotal');
    const activeName = document.getElementById('eventsActiveName');
    const navPrevBtn = document.getElementById('eventsNavPrev');
    const navNextBtn = document.getElementById('eventsNavNext');
    const filterBtns = document.querySelectorAll('.events-filter-btn');

    if (!track) return;

    const eventsList = (typeof EVENTS_DATA !== 'undefined' && Array.isArray(EVENTS_DATA)) ? EVENTS_DATA : [];
    if (eventsList.length === 0) return;

    if (totalCount) {
      totalCount.textContent = String(eventsList.length).padStart(2, '0');
    }

    // Initialize dynamic filter button counts directly from authoritative EVENTS_DATA
    filterBtns.forEach((btn) => {
      const filter = btn.dataset.filter;
      const countEl = btn.querySelector('.events-filter-btn__count');
      if (countEl) {
        if (filter === 'all') {
          countEl.textContent = String(eventsList.length);
        } else {
          const count = eventsList.filter((ev) => isEventEligible(ev, filter)).length;
          countEl.textContent = String(count);
        }
      }
    });

    // 1. Render all 15 Event Worlds into Track
    renderAllCards(eventsList, track);

    const cards = Array.from(track.querySelectorAll('.event-card'));

    // Dedicated Synchronizer for currently active event state
    function syncActiveEventState(index) {
      const safeIndex = Math.max(1, Math.min(eventsList.length, index || 1));
      const activeEvent = eventsList[safeIndex - 1];
      if (!activeEvent) return;

      if (currentCount) {
        currentCount.textContent = String(safeIndex).padStart(2, '0');
      }
      if (activeName) {
        activeName.textContent = activeEvent.name;
      }
      if (progressBar) {
        const pct = eventsList.length > 1 ? ((safeIndex - 1) / (eventsList.length - 1)) * 100 : 0;
        progressBar.style.setProperty('--progress', `${pct}%`);
      }

      // Synchronize .is-current class across cards
      cards.forEach((card, idx) => {
        if (idx === safeIndex - 1) {
          card.classList.add('is-current');
          card.setAttribute('aria-current', 'true');
        } else {
          card.classList.remove('is-current');
          card.removeAttribute('aria-current');
        }
      });

      // Synchronize particle color if in events section
      if (particleSystem && particleSystem.setActiveColor && section) {
        const rect = section.getBoundingClientRect();
        const isInEvents = rect.top <= window.innerHeight * 0.6 && rect.bottom >= window.innerHeight * 0.3;
        if (isInEvents) {
          particleSystem.setActiveColor(activeEvent.accentColor, 0.75, 0.5);
        }
      }
    }

    // Dedicated reset to World 01 initial state
    function resetToEvent01() {
      if (horizontalScroll) {
        horizontalScroll.progress(0);
      }
      gsap.set(track, { x: 0, opacity: 1, y: 0, scale: 1 });
      syncActiveEventState(1);
      if (progressBar) progressBar.style.setProperty('--progress', '0%');
    }

    // Expose reset globally so navigation and initial scroll handlers can reset deterministically
    window._resetEventsExplorerToStart = resetToEvent01;

    // 2. Setup Horizontal Scroll with GSAP ScrollTrigger
    let horizontalScroll = null;
    let scrollDistance = 0;
    let totalDistance = 0;

    function refreshScroll() {
      if (horizontalScroll) {
        horizontalScroll.kill();
        horizontalScroll = null;
      }

      // Step 2: Measure track width
      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      scrollDistance = Math.max(0, totalWidth - viewportWidth);
      const exitDistance = Math.min(window.innerHeight * 0.9, 800);
      totalDistance = scrollDistance + exitDistance;

      // Force track position and visual state to 0 initially
      gsap.set(track, { x: 0, opacity: 1, y: 0, scale: 1 });

      if (window.innerWidth >= 768 && !CONFIG.reducedMotion) {
        // Step 3: Create horizontal ScrollTrigger Timeline with Seamless Exit Transition
        const horizontalTl = gsap.timeline({
          scrollTrigger: {
            id: 'horizontalEventsScroll',
            trigger: section,
            start: 'top top',
            end: () => `+=${totalDistance}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // When at or before section start, strictly enforce Event 01
              if (self.scroll() <= self.start) {
                if (horizontalScroll && horizontalScroll.progress() !== 0) {
                  horizontalScroll.progress(0);
                }
                gsap.set(track, { x: 0, opacity: 1, y: 0, scale: 1 });
                syncActiveEventState(1);
                if (progressBar) progressBar.style.setProperty('--progress', '0%');
                return;
              }
              const horizontalProgress = totalDistance > 0 ? Math.min(1, (self.scroll() - self.start) / scrollDistance) : 0;
              const currentIndex = Math.min(
                Math.floor(horizontalProgress * eventsList.length) + 1,
                eventsList.length
              );
              syncActiveEventState(currentIndex);
            },
            onEnter: () => {
              progressEl?.classList.add('is-visible');
              gsap.to(track, { opacity: 1, y: 0, scale: 1, duration: 0.3 });
            },
            onLeave: () => {
              progressEl?.classList.remove('is-visible');
              if (particleSystem && particleSystem.resetColor) particleSystem.resetColor();
            },
            onEnterBack: () => {
              progressEl?.classList.add('is-visible');
              gsap.to(track, { opacity: 1, y: 0, scale: 1, duration: 0.4 });
            },
            onLeaveBack: () => {
              progressEl?.classList.remove('is-visible');
              resetToEvent01();
              if (particleSystem && particleSystem.resetColor) particleSystem.resetColor();
            },
          },
        });

        // Phase 1: Horizontal scrolling across all 15 event worlds
        horizontalTl.to(track, {
          x: -scrollDistance,
          ease: 'none',
          duration: scrollDistance,
        });

        // Phase 2: Seamless Outro Exit — as scrolling continues past World 15,
        // World 15 gently dissolves out so the page flows directly into Section 03 (Rules & Protocol)
        horizontalTl.to(track, {
          opacity: 0,
          y: -50,
          scale: 0.97,
          ease: 'power2.inOut',
          duration: exitDistance,
        });

        if (progressEl) {
          horizontalTl.to(progressEl, {
            opacity: 0,
            y: 20,
            ease: 'power2.inOut',
            duration: exitDistance * 0.6,
          }, `-=${exitDistance}`);
        }

        horizontalScroll = horizontalTl;

        // Step 4: Refresh ScrollTrigger
        ScrollTrigger.refresh();

        // Step 5 & 6 & 7: Establish deterministic start state, progress 0, sync Event 01
        resetToEvent01();

        // Step 8: Only then allow normal scrolling
      } else {
        // Mobile smooth native horizontal touch scroll
        track.style.overflowX = 'auto';
        track.style.scrollSnapType = 'x mandatory';
        progressEl?.classList.add('is-visible');
        track.scrollLeft = 0;

        track.addEventListener('scroll', () => {
          const scrollLeft = track.scrollLeft;
          const maxScroll = track.scrollWidth - track.clientWidth;
          const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
          const currentIndex = Math.min(
            Math.floor(progress * eventsList.length) + 1,
            eventsList.length
          );
          syncActiveEventState(currentIndex);
        }, { passive: true });

        resetToEvent01();
      }
    }

    refreshScroll();
    window.addEventListener('resize', () => {
      clearTimeout(window._resizeTimer);
      window._resizeTimer = setTimeout(refreshScroll, 200);
    });

    // Explicit deterministic initial state: Event 01
    resetToEvent01();

    // 3. Motif 3D Parallax and WebGL Chromatic Reaction for Each Card
    cards.forEach((card) => {
      const motif = card.querySelector('.event-motif');
      const ambient = card.querySelector('.event-card__ambient');

      card.addEventListener('mouseenter', () => {
        const accent = card.style.getPropertyValue('--event-accent') || '#00f0ff';
        if (particleSystem && particleSystem.setActiveColor) {
          particleSystem.setActiveColor(accent.trim(), 0.7, 0.4);
        }
      });

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        card.style.setProperty('--mouse-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--mouse-y', `${(y * 100).toFixed(1)}%`);

        if (motif && !CONFIG.reducedMotion) {
          const tiltX = (x - 0.5) * 20;
          const tiltY = (y - 0.5) * -20;
          gsap.to(motif, {
            rotationY: tiltX,
            rotationX: tiltY,
            x: (x - 0.5) * 25,
            y: (y - 0.5) * 25,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        if (motif && !CONFIG.reducedMotion) {
          gsap.to(motif, {
            rotationY: 0,
            rotationX: 0,
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          });
        }
        if (particleSystem && particleSystem.resetColor && !document.getElementById('eventModal')?.classList.contains('is-open')) {
          particleSystem.resetColor(0.8);
        }
      });
    });

    // 4. Click handlers for Card & Explore Button with Shared Element Origin
    track.addEventListener('click', (e) => {
      const exploreBtn = e.target.closest('.event-card__explore-btn');
      const card = e.target.closest('.event-card');

      if (exploreBtn) {
        e.preventDefault();
        const slug = exploreBtn.dataset.eventSlug;
        const eventData = eventsList.find((ev) => ev.slug === slug);
        if (eventData) openEventModal(eventData, true, exploreBtn.closest('.event-card'));
        return;
      }

      if (card && !e.target.closest('a')) {
        const slug = card.id.replace('eventCard-', '');
        const eventData = eventsList.find((ev) => ev.slug === slug);
        if (eventData) openEventModal(eventData, true, card);
      }
    });

    // 5. Category Discovery Filter Logic
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        currentFilter = filter;

        filterBtns.forEach((b) => {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        let firstMatchCard = null;

        cards.forEach((card, idx) => {
          const eventData = eventsList[idx];
          const isMatch = isEventEligible(eventData, filter);

          if (isMatch) {
            card.classList.remove('is-dimmed');
            gsap.to(card, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' });
            if (!firstMatchCard) firstMatchCard = card;
          } else {
            card.classList.add('is-dimmed');
            gsap.to(card, { opacity: 0.18, scale: 0.98, duration: 0.4, ease: 'power2.out' });
          }
        });

        // Scroll to first matching card if filtered
        if (firstMatchCard && filter !== 'all') {
          scrollToCard(firstMatchCard, track, horizontalScroll, scrollDistance);
        }
      });
    });

    // 6. Navigation Controls Prev/Next Buttons
    navPrevBtn?.addEventListener('click', () => {
      navigateHorizontal(-1, track, eventsList, horizontalScroll, scrollDistance);
    });

    navNextBtn?.addEventListener('click', () => {
      navigateHorizontal(1, track, eventsList, horizontalScroll, scrollDistance);
    });

    // 7. Keyboard Arrow Navigation (Left / Right)
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('eventModal');
      const isModalOpen = modal?.classList.contains('is-open');

      if (isModalOpen) {
        if (e.key === 'Escape') {
          closeEventModal();
        } else if (e.key === 'ArrowLeft') {
          navigateModalRelative(-1, eventsList);
        } else if (e.key === 'ArrowRight') {
          navigateModalRelative(1, eventsList);
        }
      } else {
        // On desktop, if viewing events explorer section
        const sectionRect = section.getBoundingClientRect();
        const isInEventsView = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;
        if (isInEventsView) {
          if (e.key === 'ArrowLeft') {
            navigateHorizontal(-1, track, eventsList, horizontalScroll, scrollDistance);
          } else if (e.key === 'ArrowRight') {
            navigateHorizontal(1, track, eventsList, horizontalScroll, scrollDistance);
          }
        }
      }
    });

    // 8. Modal Backdrop & Event Listeners
    initModalEvents(eventsList);

    // 9. Check Initial Deep-Link URL Hash
    checkInitialHash(eventsList);
  }

  // --- Helper: Render All 15 Event Cards into Track ---
  function renderAllCards(eventsList, track) {
    track.innerHTML = eventsList.map((event) => `
      <article class="event-card" id="eventCard-${event.slug}" data-event-index="${event.id}" data-category="${event.category}" data-eligible-classes="${(event.eligibleClasses || []).join(',')}" data-cursor="ENTER" style="--event-hue: ${event.accentHue}; --event-accent: ${event.accentColor};" tabindex="0" role="region" aria-label="Event ${event.id}: ${event.name}">
        <div class="event-card__ambient"></div>
        <div class="event-card__specular"></div>
        
        <div class="event-card__visual">
          <span class="event-card__watermark-index">${event.id}</span>
          ${event.visualMotif}
        </div>

        <div class="event-card__content">
          <div class="event-card__topline">
            <span class="event-card__number-tag">WORLD ${event.id}</span>
            <span class="event-card__format">${event.format}</span>
            <span class="event-card__eligibility-badge">${event.eligibility}</span>
          </div>

          <h3 class="event-card__title">${event.name}</h3>

          ${(event.theme || event.objective || event.topic) ? `
          <div class="event-card__theme-block">
            <span class="event-card__theme-label">${event.theme ? 'OFFICIAL THEME' : (event.objective ? 'OFFICIAL OBJECTIVE' : 'TOPIC')}</span>
            <p class="event-card__theme">"${event.theme || event.objective || event.topic}"</p>
          </div>` : `
          <div class="event-card__theme-block">
            <span class="event-card__theme-label">EVENT FORMAT</span>
            <p class="event-card__theme">"${event.format}"</p>
          </div>`}

          <div class="event-card__specs-row">
            <span class="event-card__spec-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
              ${event.participants}
            </span>
            <span class="event-card__spec-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ${event.duration}
            </span>
            <span class="event-card__spec-pill">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ${event.criteria.length} Judging Criteria
            </span>
          </div>

          <div class="event-card__cta-wrap">
            <button class="event-card__explore-btn" data-event-slug="${event.slug}" data-cursor="ENTER" aria-label="Enter World ${event.id}: ${event.name}">
              <span>ENTER WORLD</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div class="event-card__quick-contact">
              <span>Lead: <strong>${event.teacher}</strong></span>
              ${event.contact && event.contact !== 'Not provided in brochure' ? `<a href="tel:${event.contact.replace(/[^0-9]/g, '')}" class="event-card__quick-contact-tel" data-cursor="CALL" onclick="event.stopPropagation();" aria-label="Call faculty ${event.teacher}"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>${event.contact}</a>` : ''}
            </div>
          </div>
        </div>
      </article>
    `).join('');
  }

  // --- Helper: Scroll to Specific Card ---
  function scrollToCard(targetCard, track, horizontalScroll, scrollDistance) {
    if (!targetCard) return;
    const st = (horizontalScroll && horizontalScroll.scrollTrigger) || (window.ScrollTrigger && ScrollTrigger.getById('horizontalEventsScroll'));
    if (window.innerWidth >= 768 && st) {
      const cardOffsetLeft = targetCard.offsetLeft;
      const totalWidth = track ? track.scrollWidth : 0;
      const maxDist = Math.max(0, totalWidth - window.innerWidth);
      const progressRatio = maxDist > 0 ? Math.min(1, Math.max(0, cardOffsetLeft / maxDist)) : 0;
      const targetScrollY = st.start + (scrollDistance || maxDist) * progressRatio;
      if (lenis) {
        lenis.scrollTo(targetScrollY, { duration: 1 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    } else {
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  // --- Helper: Navigate Horizontal Cards ---
  function navigateHorizontal(direction, track, eventsList, horizontalScroll, scrollDistance) {
    if (currentFilter !== 'all') {
      const cards = Array.from(track.querySelectorAll('.event-card'));
      const matchingIndices = [];
      eventsList.forEach((ev, idx) => {
        if (isEventEligible(ev, currentFilter)) matchingIndices.push(idx);
      });
      if (matchingIndices.length > 0) {
        const trackLeft = track.getBoundingClientRect().left;
        let bestMatchIdx = matchingIndices[0];
        let minDiff = Infinity;
        matchingIndices.forEach((cardIdx) => {
          const cRect = cards[cardIdx].getBoundingClientRect();
          const diff = Math.abs(cRect.left - trackLeft);
          if (diff < minDiff) {
            minDiff = diff;
            bestMatchIdx = cardIdx;
          }
        });
        const currentPosInMatches = matchingIndices.indexOf(bestMatchIdx);
        const targetPosInMatches = Math.max(0, Math.min(matchingIndices.length - 1, currentPosInMatches + direction));
        const targetCard = cards[matchingIndices[targetPosInMatches]];
        scrollToCard(targetCard, track, horizontalScroll, scrollDistance);
        return;
      }
    }
    const st = (horizontalScroll && horizontalScroll.scrollTrigger) || (window.ScrollTrigger && ScrollTrigger.getById('horizontalEventsScroll'));
    if (window.innerWidth >= 768 && st) {
      const totalDist = scrollDistance || Math.max(0, (track ? track.scrollWidth : 0) - window.innerWidth);
      const step = totalDist / eventsList.length;
      const currentY = lenis ? lenis.scroll : window.scrollY;
      const currentRelative = Math.max(0, Math.min(totalDist, currentY - st.start));
      const targetScrollY = Math.min(st.start + totalDist, Math.max(st.start, st.start + currentRelative + direction * step));
      if (lenis) {
        lenis.scrollTo(targetScrollY, { duration: 0.8 });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      }
    } else {
      const cardWidth = window.innerWidth * 0.85;
      track.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
    }
  }

  // Canonical set of section anchors that must never be treated as event slugs
  const SECTION_ANCHORS = new Set([
    'hero',
    'about',
    'events',
    'eventsExplorer',
    'rules',
    'protocol',
    'register',
    'contact',
    'schedule'
  ]);

  // --- Helper: Initialize Modal Listeners ---
  function initModalEvents(eventsList) {
    const modal = document.getElementById('eventModal');
    const backdrop = document.getElementById('eventModalBackdrop');
    const modalWindow = document.getElementById('eventModalWindow');

    backdrop?.addEventListener('click', closeEventModal);

    modalWindow?.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('#modalCloseBtn');
      if (closeBtn) {
        e.preventDefault();
        closeEventModal();
        return;
      }

      const prevBtn = e.target.closest('.event-modal__btn--prev');
      if (prevBtn) {
        e.preventDefault();
        const slug = prevBtn.dataset.navSlug;
        const targetEvent = eventsList.find((ev) => ev.slug === slug);
        if (targetEvent) openEventModal(targetEvent);
        return;
      }

      const nextBtn = e.target.closest('.event-modal__btn--next');
      if (nextBtn) {
        e.preventDefault();
        const slug = nextBtn.dataset.navSlug;
        const targetEvent = eventsList.find((ev) => ev.slug === slug);
        if (targetEvent) openEventModal(targetEvent);
        return;
      }

      const shareBtn = e.target.closest('#modalShareBtn');
      if (shareBtn) {
        e.preventDefault();
        const slug = shareBtn.dataset.slug;
        const shareUrl = `${window.location.origin}${window.location.pathname}#event=${slug}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareUrl).then(() => {
            const shareText = shareBtn.querySelector('.share-text');
            shareBtn.classList.add('is-copied');
            if (shareText) shareText.textContent = 'COPIED TO CLIPBOARD!';
            setTimeout(() => {
              shareBtn.classList.remove('is-copied');
              if (shareText) shareText.textContent = 'SHARE LINK';
            }, 2500);
          }).catch(() => {});
        }
      }
    });

    window.addEventListener('hashchange', () => {
      const rawHash = window.location.hash ? window.location.hash.trim() : '';
      if (!rawHash || rawHash === '#' || SECTION_ANCHORS.has(rawHash.slice(1))) {
        const modal = document.getElementById('eventModal');
        if (modal?.classList.contains('is-open')) {
          closeEventModal(false);
        }
        handleInitialPageScroll();
        return;
      }

      let targetSlug = null;
      if (rawHash.startsWith('#event=')) {
        targetSlug = rawHash.replace('#event=', '').trim();
      } else if (rawHash.startsWith('#')) {
        targetSlug = rawHash.slice(1).trim();
      }

      if (targetSlug) {
        const targetEvent = eventsList.find(
          (ev) => ev.slug === targetSlug || String(ev.id) === targetSlug
        );
        if (targetEvent) {
          openEventModal(targetEvent, false);
        }
      }
    });
  }

  // --- Helper: Navigate Modal to Relative Event ---
  function navigateModalRelative(offset, eventsList) {
    if (!currentActiveEventSlug) return;
    const currentIndex = eventsList.findIndex((e) => e.slug === currentActiveEventSlug);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + offset + eventsList.length) % eventsList.length;
    openEventModal(eventsList[nextIndex]);
  }

  // --- Helper: Check Initial Hash ---
  function checkInitialHash(eventsList) {
    const rawHash = window.location.hash ? window.location.hash.trim() : '';
    if (!rawHash || rawHash === '#' || rawHash === '#events') {
      currentActiveEventSlug = null;
      return;
    }

    let targetSlug = null;
    if (rawHash.startsWith('#event=')) {
      targetSlug = rawHash.replace('#event=', '').trim();
    } else if (rawHash.startsWith('#')) {
      const candidate = rawHash.slice(1).trim();
      if (!SECTION_ANCHORS.has(candidate)) {
        targetSlug = candidate;
      }
    }

    if (targetSlug) {
      const targetEvent = eventsList.find(
        (ev) => ev.slug === targetSlug || String(ev.id) === targetSlug ||
                (targetSlug === 'cibernatica-legion' && ev.slug === 'cibernetica-legion') ||
                (targetSlug === 'cibernetica-legion' && ev.slug === 'cibernatica-legion')
      );
      if (targetEvent) {
        currentActiveEventSlug = targetEvent.slug;
        requestAnimationFrame(() => {
          openEventModal(targetEvent, false);
        });
        return;
      }
    }

    // Default safety: null slug, Event 01 starts visual state
    currentActiveEventSlug = null;
  }

  // --- Core Modal Open with Shared Element Transition ---
  function openEventModal(eventData, updateHash = true, sourceElement = null) {
    const modal = document.getElementById('eventModal');
    const modalWindow = document.getElementById('eventModalWindow');
    if (!modal || !modalWindow) return;

    currentActiveEventSlug = eventData.slug;

    // Render modal content
    modalWindow.innerHTML = createModalContentHtml(eventData);
    modalWindow.scrollTop = 0;

    // Stop background scrolling
    if (lenis) lenis.stop();
    document.body.style.overflow = 'hidden';

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');

    // Synchronize WebGL celestial particle atmosphere to active world hue
    if (particleSystem && particleSystem.setActiveColor) {
      particleSystem.setActiveColor(eventData.accentColor, 0.85, 0.5);
    }

    // SHARED ELEMENT EXPANSION TRANSITION
    if (!CONFIG.reducedMotion) {
      let originRect = null;
      if (sourceElement) {
        originRect = sourceElement.getBoundingClientRect();
      }

      const modalVisual = modalWindow.querySelector('.event-modal__visual-stage');
      const modalHeader = modalWindow.querySelector('.event-modal__header-content');
      const modalMetrics = modalWindow.querySelectorAll('.event-modal__metric-card');
      const modalSections = modalWindow.querySelectorAll('.event-modal__section, .event-modal__contact-card');

      const tl = gsap.timeline();

      if (originRect && originRect.width > 0) {
        const originX = originRect.left + originRect.width / 2;
        const originY = originRect.top + originRect.height / 2;
        tl.fromTo(modalWindow,
          { 
            scale: 0.8, 
            opacity: 0,
            transformOrigin: `${originX}px ${originY}px`
          },
          { scale: 1, opacity: 1, duration: 0.55, ease: 'power3.out' }
        );
      } else {
        tl.fromTo(modalWindow,
          { scale: 0.92, opacity: 0, y: 35 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        );
      }

      if (modalVisual) {
        tl.fromTo(modalVisual,
          { scale: 0.65, opacity: 0, rotation: -8 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.45'
        );
      }

      if (modalHeader) {
        tl.fromTo(modalHeader,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
          '-=0.45'
        );
      }

      tl.fromTo(modalMetrics,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power2.out' },
        '-=0.35'
      );

      tl.fromTo(modalSections,
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'power2.out' },
        '-=0.25'
      );
    }

    if (updateHash) {
      try {
        history.pushState(null, '', `#event=${eventData.slug}`);
      } catch (e) {}
    }

    modal.focus();
  }

  // --- Core Modal Close ---
  function closeEventModal(cleanHash = true) {
    const modal = document.getElementById('eventModal');
    const modalWindow = document.getElementById('eventModalWindow');
    if (!modal || !modal.classList.contains('is-open')) return;

    currentActiveEventSlug = null;

    if (!CONFIG.reducedMotion && modalWindow) {
      gsap.to(modalWindow, {
        scale: 0.92,
        opacity: 0,
        y: 25,
        duration: 0.35,
        ease: 'power2.in',
        onComplete: finishClose,
      });
    } else {
      finishClose();
    }

    function finishClose() {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lenis) lenis.start();

      if (cleanHash && window.location.hash && !SECTION_ANCHORS.has(window.location.hash.replace(/^#/, ''))) {
        try {
          history.pushState(null, '', window.location.pathname + window.location.search + '#events');
        } catch (e) {}
      }

      // Smoothly reset WebGL particle color to baseline
      if (particleSystem && particleSystem.resetColor) {
        particleSystem.resetColor(0.8);
      }
    }
  }

  // --- Modal Template Generator ---
  function createModalContentHtml(event) {
    const eventsList = (typeof EVENTS_DATA !== 'undefined' && Array.isArray(EVENTS_DATA)) ? EVENTS_DATA : [];
    const currentIndex = eventsList.findIndex((e) => e.slug === event.slug);
    const prevEvent = eventsList[(currentIndex - 1 + eventsList.length) % eventsList.length];
    const nextEvent = eventsList[(currentIndex + 1) % eventsList.length];

    const rulesListHtml = event.rules.map((rule, idx) => `
      <li class="event-modal__rule-item">
        <span class="event-modal__rule-num">${String(idx + 1).padStart(2, '0')}</span>
        <span class="event-modal__rule-text">${rule}</span>
      </li>
    `).join('');

    const specsRowsHtml = event.specialSpecs && event.specialSpecs.length ? event.specialSpecs.map((spec) => `
      <div class="event-modal__spec-row">
        <span class="event-modal__spec-key">${spec.label}</span>
        <span class="event-modal__spec-val">${spec.value}</span>
      </div>
    `).join('') : '';

    const criteriaListHtml = event.criteria.map((crit) => `
      <div class="event-modal__criteria-pill">
        <span><span class="event-modal__criteria-dot"></span>${crit}</span>
        <span style="font-size:0.55rem; color:var(--chrome-purple); letter-spacing:0.15em;">EVALUATION RUBRIC</span>
      </div>
    `).join('');

    const phoneLinkHtml = (event.contact && event.contact !== 'Not provided in brochure')
      ? `<a href="tel:${event.contact.replace(/[^0-9]/g, '')}" class="event-modal__phone-link" data-cursor="CALL" aria-label="Call faculty in-charge ${event.teacher}">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
           ${event.contact}
         </a>`
      : `<span class="event-modal__phone-link" style="opacity:0.6; cursor:default;">Contact: Not provided in brochure</span>`;

    return `
      <div class="event-modal__topbar" style="--event-accent: ${event.accentColor};">
        <div class="event-modal__nav-group">
          <button class="event-modal__btn event-modal__btn--prev" data-nav-slug="${prevEvent.slug}" data-cursor="PREV" aria-label="Previous event: ${prevEvent.name}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            PREV
          </button>
          <span class="event-modal__index-pill">EVENT ${event.id} / 15</span>
          <button class="event-modal__btn event-modal__btn--next" data-nav-slug="${nextEvent.slug}" data-cursor="NEXT" aria-label="Next event: ${nextEvent.name}">
            NEXT
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="event-modal__nav-group">
          <a href="https://forms.gle/Hg6dUBVKkBPj6jUY6" target="_blank" rel="noopener noreferrer" class="event-modal__btn event-modal__btn--register" data-cursor="ENTER" aria-label="Register on Google Forms (opens in new tab)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            REGISTER
          </a>
          <button class="event-modal__btn event-modal__btn--share" id="modalShareBtn" data-slug="${event.slug}" data-cursor="SHARE" aria-label="Share this event">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
            <span class="share-text">SHARE LINK</span>
          </button>
          <button class="event-modal__btn event-modal__btn--close" id="modalCloseBtn" data-cursor="CLOSE" aria-label="Close modal">
            ✕ CLOSE (ESC)
          </button>
        </div>
      </div>

      <div class="event-modal__body" style="--event-accent: ${event.accentColor}; --event-hue: ${event.accentHue};">
        <header class="event-modal__header">
          <div class="event-modal__header-content">
            <div class="event-modal__title-meta">
              <span class="event-card__format">${event.format}</span>
              <span class="event-card__eligibility-badge">${event.eligibility}</span>
              ${event.brochureTitle && event.brochureTitle !== event.name ? `<span class="event-card__format" style="opacity:0.7">Brochure Title: ${event.brochureTitle}</span>` : ''}
            </div>
            <h2 class="event-modal__title">${event.name}</h2>
            ${(event.theme || event.objective || event.topic) ? `
            <div class="event-modal__theme-callout">
              <span class="event-modal__theme-callout-label">${event.theme ? 'OFFICIAL BROCHURE THEME' : (event.objective ? 'OFFICIAL OBJECTIVE' : 'TOPIC')}</span>
              <p class="event-modal__theme-callout-text">"${event.theme || event.objective || event.topic}"</p>
            </div>` : ''}
          </div>
          <div class="event-modal__visual-stage">
            ${event.visualMotif}
          </div>
        </header>

        <section class="event-modal__metrics-grid" aria-label="Event Key Metrics">
          <div class="event-modal__metric-card">
            <span class="event-modal__metric-label">ELIGIBILITY</span>
            <span class="event-modal__metric-value">${event.eligibility}</span>
            <span class="event-modal__metric-sub">Division Level</span>
          </div>
          <div class="event-modal__metric-card">
            <span class="event-modal__metric-label">TEAM CAPACITY</span>
            <span class="event-modal__metric-value">${event.participants}</span>
            <span class="event-modal__metric-sub">School Delegation</span>
          </div>
          <div class="event-modal__metric-card">
            <span class="event-modal__metric-label">DURATION / TIME</span>
            <span class="event-modal__metric-value">${event.duration}</span>
            <span class="event-modal__metric-sub">Official Clock</span>
          </div>
          <div class="event-modal__metric-card">
            <span class="event-modal__metric-label">FACULTY IN-CHARGE</span>
            <span class="event-modal__metric-value" style="font-size:1.05rem;">${event.teacher}</span>
            <span class="event-modal__metric-sub">Coordinator</span>
          </div>
        </section>

        <div class="event-modal__details-grid">
          <section class="event-modal__section" aria-labelledby="modalRulesHeading">
            <h3 class="event-modal__section-title" id="modalRulesHeading">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              OFFICIAL RULES &amp; REGULATIONS
            </h3>
            <ol class="event-modal__rules-list">
              ${rulesListHtml}
            </ol>
          </section>

          <aside class="event-modal__section" aria-label="Judging Criteria and Contact">
            ${specsRowsHtml ? `
              <div style="margin-bottom: var(--space-md);">
                <h3 class="event-modal__section-title" style="margin-bottom: var(--space-sm);">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  EQUIPMENT &amp; SPECIFICATIONS
                </h3>
                <div class="event-modal__specs-table">
                  ${specsRowsHtml}
                </div>
              </div>
            ` : ''}

            <div style="margin-bottom: var(--space-md);">
              <h3 class="event-modal__section-title" style="margin-bottom: var(--space-sm);">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                JUDGEMENT CRITERIA
              </h3>
              <div class="event-modal__criteria-list">
                ${criteriaListHtml}
              </div>
            </div>

            <div class="event-modal__contact-card">
              <span class="event-modal__contact-header">FACULTY IN-CHARGE</span>
              <span class="event-modal__teacher-name">${event.teacher}</span>
              <p style="font-size:0.75rem; color:var(--white-muted); margin:0;">Official Teacher Coordinator for ${event.name}.</p>
              ${phoneLinkHtml}
            </div>
          </aside>
        </div>
      </div>
    `;
  }


  // ======================== MOBILE MENU ========================
  function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const overlay = document.getElementById('menuOverlay');
    const links = overlay.querySelectorAll('.menu-overlay__link');
    let isOpen = false;

    function openMenu() {
      isOpen = true;
      btn.classList.add('is-open');
      overlay.classList.add('is-open');

      if (lenis) lenis.stop();

      const tl = gsap.timeline();
      tl.fromTo(
        overlay,
        { opacity: 0, visibility: 'hidden' },
        { opacity: 1, visibility: 'visible', duration: 0.4 }
      ).fromTo(
        links,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.2'
      );
    }

    function closeMenu() {
      isOpen = false;
      btn.classList.remove('is-open');

      if (lenis) lenis.start();

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          overlay.classList.remove('is-open');
          overlay.style.visibility = 'hidden';
        },
      });
    }

    btn.addEventListener('click', () => {
      isOpen ? closeMenu() : openMenu();
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });
  }

  // ======================== SMOOTH SCROLL LINKS ========================
  function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || href === '#' || href.startsWith('#event=')) return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();

        // 1. Navigation to #events (Events Intro & Discovery Section)
        // MUST NEVER jump directly into horizontalEventsScroll or #eventsExplorer
        if (href === '#events') {
          if (window._resetEventsExplorerToStart) {
            window._resetEventsExplorerToStart();
          }
          if (lenis) {
            lenis.scrollTo(target, { offset: 0, duration: 1.2 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
          return;
        }

        // 2. Navigation to #eventsExplorer (Actual Horizontal Exhibition)
        if (href === '#eventsExplorer') {
          const st = window.ScrollTrigger && ScrollTrigger.getById('horizontalEventsScroll');
          if (st) {
            if (window._resetEventsExplorerToStart) {
              window._resetEventsExplorerToStart();
            }
            if (lenis) {
              lenis.scrollTo(st.start, { duration: 1.2 });
            } else {
              window.scrollTo({ top: st.start, behavior: 'smooth' });
            }
            return;
          }
        }

        // 3. Other section anchors
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.2 });
        } else {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // ======================== VIDEO LIFECYCLE MANAGEMENT ========================
  function initVideoLifecycle() {
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroVideo');
    const eventsSection = document.querySelector('.events-explorer') || document.getElementById('eventsExplorer');
    const eventsVideo = document.getElementById('eventsVideo');

    if (CONFIG.reducedMotion) {
      if (heroVideo) try { heroVideo.pause(); } catch (e) {}
      if (eventsVideo) try { eventsVideo.pause(); } catch (e) {}
      return;
    }

    function safePlay(v) {
      if (!v || !v.paused) return;
      if (CONFIG.reducedMotion) return;
      v.muted = true;
      v.playsInline = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    function safePause(v) {
      if (!v || v.paused) return;
      try {
        v.pause();
      } catch (e) {}
    }

    // Always ensure events video starts paused during initialization
    if (eventsVideo) {
      safePause(eventsVideo);
    }

    // 1. Events Section Video Lifecycle
    // Plays ONLY when the user is inside the Events Explorer section;
    // Remains strictly paused while in Events Intro (#events) or lower sections (#rules).
    if (eventsSection && eventsVideo) {
      ScrollTrigger.create({
        trigger: eventsSection,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => safePlay(eventsVideo),
        onLeave: () => safePause(eventsVideo),
        onEnterBack: () => safePlay(eventsVideo),
        onLeaveBack: () => safePause(eventsVideo),
      });

      // Synchronize initial state based on current viewport
      const rect = eventsSection.getBoundingClientRect();
      const isCurrentlyInExplorer = rect.top <= 0 && rect.bottom > 0;
      if (isCurrentlyInExplorer) {
        safePlay(eventsVideo);
      } else {
        safePause(eventsVideo);
      }
    }

    // 2. Hero Section Video Lifecycle
    if (heroSection && heroVideo) {
      if ('IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                safePlay(heroVideo);
              } else {
                safePause(heroVideo);
              }
            });
          },
          { threshold: [0, 0.2, 0.5] }
        );
        heroObserver.observe(heroSection);
      }

      ScrollTrigger.create({
        trigger: heroSection,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => safePlay(heroVideo),
        onLeave: () => safePause(heroVideo),
        onEnterBack: () => safePlay(heroVideo),
        onLeaveBack: () => safePause(heroVideo),
      });
    }
  }

  // ======================== DETERMINISTIC INITIAL PAGE POSITIONING ========================
  function handleInitialPageScroll() {
    const rawHash = window.location.hash ? window.location.hash.trim() : '';

    if (!rawHash || rawHash === '#' || rawHash === '#hero') {
      window.scrollTo(0, 0);
      if (lenis) lenis.scrollTo(0, { immediate: true });
      if (window._resetEventsExplorerToStart) {
        window._resetEventsExplorerToStart();
      }
      return;
    }

    if (rawHash === '#events') {
      // #events must strictly position the viewport at the EVENTS INTRO / DISCOVERY section
      // DO NOT scroll to horizontalEventsScroll.start or #eventsExplorer
      const eventsIntro = document.getElementById('events');
      if (eventsIntro) {
        let top = 0;
        let el = eventsIntro;
        while (el) {
          top += el.offsetTop || 0;
          el = el.offsetParent;
        }
        window.scrollTo(0, top);
        if (lenis) {
          lenis.scrollTo(top, { immediate: true });
        }
      }
      // Ensure horizontal explorer starts deterministically at progress 0, Event 01
      if (window._resetEventsExplorerToStart) {
        window._resetEventsExplorerToStart();
      }
      // Ensure events video remains paused in Events Intro
      const eventsVideo = document.getElementById('eventsVideo');
      if (eventsVideo && !eventsVideo.paused) {
        try { eventsVideo.pause(); } catch (e) {}
      }
      return;
    }

    if (rawHash === '#eventsExplorer') {
      // #eventsExplorer starts at the beginning of the horizontal exhibition
      const st = window.ScrollTrigger && ScrollTrigger.getById('horizontalEventsScroll');
      const startY = st ? st.start : (document.getElementById('eventsExplorer')?.offsetTop || 0);
      window.scrollTo(0, startY);
      if (lenis) lenis.scrollTo(startY, { immediate: true });
      if (window._resetEventsExplorerToStart) {
        window._resetEventsExplorerToStart();
      }
      return;
    }

    if (SECTION_ANCHORS.has(rawHash.replace(/^#/, ''))) {
      const target = document.querySelector(rawHash);
      if (target) {
        let top = 0;
        let el = target;
        while (el) {
          top += el.offsetTop || 0;
          el = el.offsetParent;
        }
        window.scrollTo(0, top);
        if (lenis) lenis.scrollTo(top, { immediate: true });
      }
    }
  }

  // ======================== GLOBAL SECTION TRACKER ========================
  function initSectionProgress() {
    const tracker = document.getElementById('sectionTracker');
    const fill = document.getElementById('sectionTrackerFill');
    const numEl = document.getElementById('sectionTrackerNum');
    if (!tracker || !fill || !numEl) return;

    // Sections mapping to canonical 01-05 steps
    const sections = [
      { id: 'hero', step: '01' },
      { id: 'about', step: '01' },
      { id: 'events', step: '02' },
      { id: 'eventsExplorer', step: '02' },
      { id: 'rules', step: '03' },
      { id: 'register', step: '04' },
      { id: 'contact', step: '05' },
    ];

    let currentStep = '01';

    // Global scroll tracker: reveal sidebar past hero & track fill percentage
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (self.scroll() > 180) {
          tracker.classList.add('is-visible');
        } else {
          tracker.classList.remove('is-visible');
        }
        gsap.set(fill, { scaleY: self.progress });
      },
    });

    // Section step badges
    sections.forEach(({ id, step }) => {
      const el = document.getElementById(id);
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onToggle: (self) => {
          if (self.isActive) updateStep(step);
        },
      });
    });

    function updateStep(step) {
      if (currentStep === step) return;
      currentStep = step;
      gsap.to(numEl, {
        opacity: 0,
        y: -6,
        duration: 0.15,
        ease: 'power2.in',
        onComplete: () => {
          numEl.textContent = step;
          gsap.fromTo(
            numEl,
            { y: 6, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.25, ease: 'power2.out' }
          );
        },
      });
    }
  }

  // ======================== GLOBAL SECTION LABELS ========================
  function initSectionLabels() {
    const labels = document.querySelectorAll('.section-label');
    labels.forEach((label) => {
      const num = label.querySelector('.section-label__num');
      const sep = label.querySelector('.section-label__sep');
      const text = label.querySelector('.section-label__text');

      if (num && sep && text) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: label,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(num, { opacity: 0, x: -16 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' })
          .fromTo(sep, { opacity: 0, scale: 0.4 }, { opacity: 0.4, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, '-=0.35')
          .fromTo(text, { opacity: 0, x: 16 }, { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3');
      } else {
        gsap.fromTo(
          label,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: label,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    });
  }

  // ======================== GLOBAL SCROLL VELOCITY SKEW ========================
  function initScrollVelocity() {
    if (CONFIG.reducedMotion) return;

    const skewTargets = document.querySelectorAll('.has-velocity-skew');
    if (!skewTargets.length) return;

    let proxy = { skew: 0 };
    const clampSkew = gsap.utils.clamp(-1.8, 1.8);

    ScrollTrigger.create({
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        const targetSkew = clampSkew(velocity / 600);

        gsap.to(proxy, {
          skew: targetSkew,
          duration: 0.2,
          ease: 'power1.out',
          overwrite: 'auto',
          onUpdate: () => {
            skewTargets.forEach((target) => {
              target.style.transform = `skewX(${proxy.skew}deg)`;
            });
          },
          onComplete: () => {
            gsap.to(proxy, {
              skew: 0,
              duration: 0.5,
              ease: 'power2.out',
              overwrite: 'auto',
              onUpdate: () => {
                skewTargets.forEach((target) => {
                  target.style.transform = `skewX(${proxy.skew}deg)`;
                });
              },
            });
          },
        });
      },
    });
  }

  // ======================== SECTION 03: PROTOCOL MOTION ========================
  function initProtocolAnimations() {
    const rulesSection = document.getElementById('rules');
    if (!rulesSection) return;

    // 1. Dynamic Progress Spine Line scrubbing across Section 03
    const progressLine = document.getElementById('rulesProgressLine');
    if (progressLine) {
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rulesSection,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: true,
          },
        }
      );
    }

    // 2. Editorial Split Heading Reveal (RULES & left-clip, PROTOCOL right-clip)
    const line1 = rulesSection.querySelector('.rules__heading-line--1');
    const line2 = rulesSection.querySelector('.rules__heading-line--2');

    if (line1 && line2) {
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#rulesHeading',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (CONFIG.reducedMotion) {
        headingTl.to([line1, line2], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
      } else {
        headingTl
          .fromTo(
            line1,
            {
              opacity: 0,
              y: 50,
              clipPath: 'inset(0 100% 0 0)',
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0% 0 0)',
              filter: 'blur(0px)',
              duration: 0.95,
              ease: 'power3.out',
            }
          )
          .fromTo(
            line2,
            {
              opacity: 0,
              y: 50,
              clipPath: 'inset(0 0 0 100%)',
              filter: 'blur(8px)',
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0 0%)',
              filter: 'blur(0px)',
              duration: 0.95,
              ease: 'power3.out',
            },
            '-=0.7'
          );
      }
    }

    // 3. Staggered Blocks Entrance (Timing, Conduct, Amenities)
    const blocks = rulesSection.querySelectorAll('.rules__block');
    blocks.forEach((block, index) => {
      const blockLine = block.querySelector('.rules__block-line');
      const listItems = block.querySelectorAll('.rules__list li');
      const sweeps = block.querySelectorAll('.accent-sweep');

      const blockTl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (CONFIG.reducedMotion) {
        blockTl.to(block, { opacity: 1, y: 0, duration: 0.6 });
        if (sweeps.length) sweeps.forEach((s) => s.classList.add('is-swept'));
      } else {
        // Block container uncover
        blockTl.fromTo(
          block,
          {
            opacity: 0,
            y: 55,
            clipPath: 'inset(12% 0 0 0)',
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0 0 0 0)',
            filter: 'blur(0px)',
            duration: 0.85,
            delay: index * 0.1,
            ease: 'power3.out',
          }
        );

        // Thin accent border animation
        if (blockLine) {
          blockTl.fromTo(
            blockLine,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: 'power2.out' },
            '-=0.5'
          );
        }

        // Staggered individual list items reveal
        if (listItems.length) {
          blockTl.fromTo(
            listItems,
            {
              opacity: 0,
              x: -12,
              clipPath: 'inset(0 100% 0 0)',
            },
            {
              opacity: 1,
              x: 0,
              clipPath: 'inset(0 0% 0 0)',
              duration: 0.5,
              stagger: 0.06,
              ease: 'power2.out',
            },
            '-=0.4'
          );
        }

        // Accent sweeps
        blockTl.add(() => {
          sweeps.forEach((sweep) => sweep.classList.add('is-swept'));
        }, '-=0.2');
      }
    });

    // 4. Subtle Scroll Depth / Micro-parallax across blocks (Desktop)
    if (!CONFIG.reducedMotion && !CONFIG.isMobile) {
      const b1 = document.getElementById('rulesBlockTiming');
      const b3 = document.getElementById('rulesBlockAmenities');
      if (b1) {
        gsap.to(b1, {
          y: -10,
          scrollTrigger: {
            trigger: rulesSection,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
          },
        });
      }
      if (b3) {
        gsap.to(b3, {
          y: 10,
          scrollTrigger: {
            trigger: rulesSection,
            start: 'top center',
            end: 'bottom center',
            scrub: 1.5,
          },
        });
      }
    }

    // 5. Section Exit Transition (graceful continuity into Register)
    if (!CONFIG.reducedMotion) {
      gsap.to('.rules__inner', {
        opacity: 0.88,
        scale: 0.985,
        scrollTrigger: {
          trigger: rulesSection,
          start: 'bottom 40%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }

  // ======================== SECTION 03: PROTOCOL INTERACTIONS ========================
  function initProtocolInteractions() {
    if (CONFIG.isTouch) return;

    const blocks = document.querySelectorAll('.rules__block');
    blocks.forEach((block) => {
      block.addEventListener('mousemove', (e) => {
        const rect = block.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        block.style.setProperty('--mouse-x', `${x}px`);
        block.style.setProperty('--mouse-y', `${y}px`);
      });

      block.addEventListener('mouseenter', () => {
        block.classList.add('is-hovered');
      });

      block.addEventListener('mouseleave', () => {
        block.classList.remove('is-hovered');
      });
    });
  }

  // ======================== SECTION 04: REGISTER MOTION ========================
  function initRegisterAnimations() {
    const registerSection = document.getElementById('register');
    if (!registerSection) return;

    // 1. Split Heading Reveal: JOIN / THE / FUTURE with scale
    const join = registerSection.querySelector('.register__heading-line--1');
    const the = registerSection.querySelector('.register__heading-line--2');
    const future = registerSection.querySelector('.register__heading-line--3');
    const heading = document.getElementById('registerHeading');

    if (heading && join && the && future) {
      const headTl = gsap.timeline({
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (CONFIG.reducedMotion) {
        headTl.to([join, the, future], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
      } else {
        headTl
          .fromTo(
            heading,
            { scale: 0.92, opacity: 0 },
            { scale: 1, opacity: 1, duration: 1.1, ease: 'power3.out' }
          )
          .fromTo(
            join,
            { opacity: 0, y: 90, filter: 'blur(8px)', clipPath: 'inset(100% 0 0 0)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power3.out' },
            '-=0.9'
          )
          .fromTo(
            the,
            { opacity: 0, y: 60, filter: 'blur(6px)', clipPath: 'inset(100% 0 0 0)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)', duration: 0.8, ease: 'power3.out' },
            '-=0.7'
          )
          .fromTo(
            future,
            { opacity: 0, y: 110, filter: 'blur(9px)', clipPath: 'inset(100% 0 0 0)' },
            { opacity: 1, y: 0, filter: 'blur(0px)', clipPath: 'inset(0 0 0 0)', duration: 0.9, ease: 'power3.out' },
            '-=0.7'
          );
      }
    }

    // 2. Alternating Details Cards Entrance
    const details = registerSection.querySelectorAll('.register__detail');
    if (details.length) {
      const detailsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#registerDetails',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      details.forEach((card, i) => {
        const isLeft = card.classList.contains('register__detail--left');
        const fromX = isLeft ? -35 : 35;

        if (CONFIG.reducedMotion) {
          detailsTl.to(card, { opacity: 1, x: 0, duration: 0.5 }, i * 0.1);
        } else {
          detailsTl.fromTo(
            card,
            {
              opacity: 0,
              x: fromX,
              clipPath: isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
            },
            {
              opacity: 1,
              x: 0,
              clipPath: 'inset(0 0 0 0)',
              duration: 0.65,
              ease: 'power3.out',
            },
            i === 0 ? 0 : '-=0.45'
          );
        }
      });

      // Deadline Emphasis line draw
      detailsTl.add(() => {
        const deadlineCard = registerSection.querySelector('.register__detail--deadline');
        if (deadlineCard) deadlineCard.classList.add('is-active');
      }, '-=0.2');
    }

    // 3. CTA Block Entrance
    const ctaBlock = document.getElementById('registerCtaBlock');
    if (ctaBlock) {
      gsap.fromTo(
        ctaBlock,
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaBlock,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 4. CTA Action Button Feedback (opens Google Form in new tab)
    const ctaBtn = document.getElementById('registerActionBtn');
    if (ctaBtn) {
      ctaBtn.addEventListener('click', () => {
        gsap.to(ctaBtn, {
          scale: 0.96,
          duration: 0.12,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });
      });
    }

    // 5. Phoenix Scroll Scrub Response
    const phoenix = document.getElementById('registerPhoenix');
    const visual = document.getElementById('registerVisual');
    const ambientLight = document.getElementById('registerAmbientLight');

    if (phoenix && !CONFIG.reducedMotion) {
      gsap.fromTo(
        phoenix,
        { y: 35, opacity: 0.16, scale: 0.95 },
        {
          y: -25,
          opacity: 0.35,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: registerSection,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1.5,
          },
        }
      );

      // Ambient light subtle drift
      if (ambientLight) {
        gsap.to(ambientLight, {
          y: -80,
          x: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: registerSection,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      }
    }

    // 6. Phoenix Interactive 3D Tilt (Desktop)
    if (visual && phoenix && !CONFIG.isTouch && !CONFIG.reducedMotion) {
      visual.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normX = (e.clientX - centerX) / (rect.width / 2);
        const normY = (e.clientY - centerY) / (rect.height / 2);

        // Max 5 deg tilt
        const rotX = -normY * 5;
        const rotY = normX * 6;

        gsap.to(phoenix, {
          rotateX: rotX,
          rotateY: rotY,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        });

        const halo = document.getElementById('registerPhoenixHalo');
        if (halo) {
          gsap.to(halo, {
            x: normX * 15,
            y: normY * 15,
            duration: 0.6,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });

      visual.addEventListener('mouseleave', () => {
        gsap.to(phoenix, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        const halo = document.getElementById('registerPhoenixHalo');
        if (halo) {
          gsap.to(halo, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        }
      });
    }

    // 7. Register -> Contact Smooth Transition
    if (!CONFIG.reducedMotion) {
      gsap.to('.register__inner', {
        opacity: 0.85,
        scale: 0.98,
        scrollTrigger: {
          trigger: registerSection,
          start: 'bottom 40%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }
  }

  // ======================== SECTION 05: FOOTER CLOSING SCENE ========================
  function initFooterAnimations() {
    const footer = document.getElementById('contact');
    if (!footer) return;

    // 1. Masked Reveal of GET IN / TOUCH
    const getIn = footer.querySelector('.footer__heading-line--1');
    const touch = footer.querySelector('.footer__heading-line--2');
    const footerHeading = document.getElementById('footerHeading');

    if (footerHeading && getIn && touch) {
      const headingTl = gsap.timeline({
        scrollTrigger: {
          trigger: footerHeading,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (CONFIG.reducedMotion) {
        headingTl.to([getIn, touch], { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
      } else {
        headingTl
          .fromTo(
            getIn,
            { opacity: 0, y: 70, clipPath: 'inset(100% 0 0 0)', filter: 'blur(8px)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' }
          )
          .fromTo(
            touch,
            { opacity: 0, y: 70, clipPath: 'inset(100% 0 0 0)', filter: 'blur(8px)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', filter: 'blur(0px)', duration: 0.9, ease: 'power3.out' },
            '-=0.7'
          );
      }

      // Parallax horizontal drift on scrub
      if (!CONFIG.reducedMotion && !CONFIG.isMobile) {
        gsap.fromTo(
          footerHeading,
          { x: -35 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: footer,
              start: 'top bottom',
              end: 'center center',
              scrub: 1.2,
            },
          }
        );
      }
    }

    // 2. Three Columns Independent Staggered Entrance
    const colContacts = document.getElementById('footerColContacts');
    const colGeneral = document.getElementById('footerColGeneral');
    const colEvent = document.getElementById('footerColEvent');

    if (colContacts && colGeneral && colEvent) {
      const colsTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#footerGrid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      if (CONFIG.reducedMotion) {
        colsTl.to([colContacts, colGeneral, colEvent], { opacity: 1, x: 0, y: 0, duration: 0.6, stagger: 0.1 });
      } else {
        colsTl
          .fromTo(
            colContacts,
            { opacity: 0, x: -28, clipPath: 'inset(0 100% 0 0)' },
            { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power3.out' }
          )
          .fromTo(
            colGeneral,
            { opacity: 0, y: 35, clipPath: 'inset(100% 0 0 0)' },
            { opacity: 1, y: 0, clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power3.out' },
            '-=0.45'
          )
          .fromTo(
            colEvent,
            { opacity: 0, x: 28, clipPath: 'inset(0 0 0 100%)' },
            { opacity: 1, x: 0, clipPath: 'inset(0 0 0 0)', duration: 0.7, ease: 'power3.out' },
            '-=0.45'
          );

        // Column lines animation
        colsTl.add(() => {
          footer.querySelectorAll('.footer__col-line').forEach((line) => line.classList.add('is-revealed'));
        }, '-=0.3');
      }
    }

    // 3. Final Branding Sequence & Light Sweep
    const bottomTl = gsap.timeline({
      scrollTrigger: {
        trigger: '#footerBottom',
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });

    const logo = document.getElementById('footerLogo');
    const brandText = footer.querySelector('.footer__brand-text');
    const credit = document.getElementById('footerCredit');
    const finishLine = document.getElementById('footerFinishLine');
    const sweep = footer.querySelector('.footer__logo-sweep');

    if (logo && brandText && credit) {
      bottomTl
        .fromTo(logo, { opacity: 0, scale: 0.8 }, { opacity: 0.9, scale: 1, duration: 0.6, ease: 'power2.out' })
        .add(() => {
          if (sweep && !CONFIG.reducedMotion) {
            gsap.fromTo(
              sweep,
              { x: '-150%' },
              { x: '150%', duration: 0.85, ease: 'power2.inOut' }
            );
          }
        }, '-=0.2')
        .fromTo(brandText, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo(credit, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .add(() => {
          if (finishLine) finishLine.classList.add('is-active');
        }, '-=0.1');
    }
  }

  // ======================== NAV SCROLL BEHAVIOR ========================
  function initNavScroll() {
    let lastScrollY = 0;
    const nav = document.getElementById('nav');

    ScrollTrigger.create({
      start: 'top -100',
      onUpdate: (self) => {
        const currentY = self.scroll();
        if (currentY > lastScrollY && currentY > 200) {
          gsap.to(nav, { yPercent: -100, duration: 0.4, ease: 'power2.in' });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: 'power2.out' });
        }
        lastScrollY = currentY;
      },
    });
  }

  // ======================== SOUND TOGGLE ========================
  function initSoundToggle() {
    const btn = document.getElementById('soundToggle');
    const iconOff = btn.querySelector('.sound-toggle__icon--off');
    const iconOn = btn.querySelector('.sound-toggle__icon--on');

    // Ambient audio context (optional - no audio file required)
    let audioCtx = null;
    let isSoundOn = false;

    btn.addEventListener('click', () => {
      isSoundOn = !isSoundOn;

      if (isSoundOn) {
        iconOff.style.display = 'none';
        iconOn.style.display = 'block';

        // Create subtle ambient drone
        if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // Very subtle ambient pad
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc1.type = 'sine';
        osc1.frequency.value = 110;
        osc2.type = 'sine';
        osc2.frequency.value = 165;

        gain.gain.value = 0;
        gain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 2);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);

        osc1.start();
        osc2.start();

        btn._oscillators = [osc1, osc2];
        btn._gain = gain;
      } else {
        iconOff.style.display = 'block';
        iconOn.style.display = 'none';

        if (btn._gain) {
          btn._gain.gain.linearRampToValueAtTime(
            0,
            audioCtx.currentTime + 0.5
          );
        }
        if (btn._oscillators) {
          setTimeout(() => {
            btn._oscillators.forEach((o) => o.stop());
            btn._oscillators = null;
          }, 600);
        }
      }
    });
  }

  // ======================== GSAP MATCHMEDIA (responsive) ========================
  function initResponsiveAnimations() {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1025px)', () => {
      // Desktop-only interactions

      // Parallax on about section
      gsap.to('.about__phoenix-glow', {
        y: -100,
        scrollTrigger: {
          trigger: '.about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    mm.add('(max-width: 768px)', () => {
      // Mobile-specific adjustments
      // Reduce particle opacity on mobile
      if (particleSystem) {
        particleSystem.material.uniforms.uOpacity.value = 0.3;
      }
    });
  }

  // ======================== INITIALIZE ========================
  function init() {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Init systems
    initLenis();
    cursor.init();
    initMagneticButtons();

    // Init WebGL particles (lazy)
    if (!CONFIG.reducedMotion) {
      requestAnimationFrame(() => {
        initParticles();
      });
    }

    // Init preloader
    initPreloader();

    // Init scroll-driven content & global systems
    initScrollReveals();
    initEventsExplorer();
    initVideoLifecycle();
    initMobileMenu();
    initSmoothScrollLinks();
    initProtocolAnimations();
    initProtocolInteractions();
    initRegisterAnimations();
    initFooterAnimations();
    initSectionLabels();
    initScrollVelocity();
    initSectionProgress();
    initNavScroll();
    initSoundToggle();
    initResponsiveAnimations();

    // Recalculate ScrollTrigger coordinates after horizontal explorer and lower animations exist
    ScrollTrigger.refresh();

    // Deterministic initial scroll & hash handling
    handleInitialPageScroll();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
