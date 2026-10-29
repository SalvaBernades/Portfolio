/**
 * PORTFOLIO DE DISEÑO DE VIDEOJUEGOS - JS PRINCIPAL
 * Optimizado, modular y sin librerías pesadas.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================================
  // 1. AÑO DINÁMICO DEL FOOTER
  // ============================================================
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ============================================================
  // 2. EFECTOS DE SONIDO DE INTERFAZ (WEB AUDIO API - GAME FEEL)
  // Totalmente sintético, sin archivos de audio externos.
  // ============================================================
  let audioCtx = null;
  let soundEnabled = false;
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundOffIcon = document.querySelector('.sound-off-icon');
  const soundOnIcon = document.querySelector('.sound-on-icon');

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playUiBeep(freq = 620, type = 'sine', duration = 0.06) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.3, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Navegadores que bloqueen audio
    }
  }

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      soundEnabled = !soundEnabled;
      
      if (soundEnabled) {
        soundOffIcon.style.display = 'none';
        soundOnIcon.style.display = 'block';
        soundToggleBtn.title = 'Sonido UI: Activado';
        playUiBeep(880, 'triangle', 0.08);
      } else {
        soundOffIcon.style.display = 'block';
        soundOnIcon.style.display = 'none';
        soundToggleBtn.title = 'Sonido UI: Silenciado';
      }
    });

    // Agregar sonido sutil a botones interactivos
    document.querySelectorAll('.btn, .filter-btn, .nav-link, .modal-close').forEach(el => {
      el.addEventListener('click', () => {
        playUiBeep(720, 'sine', 0.04);
      });
    });
  }

  // ============================================================
  // 3. MENÚ DE NAVEGACIÓN MÓVIL
  // ============================================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('open');
      });
    });
  }

  // ============================================================
  // 4. FILTRO DE PROYECTOS
  // ============================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ============================================================
  // 5. BASE DE DATOS DE PROYECTOS Y MODAL DE DISEÑO (FICHA GDD)
  // ============================================================
  const projectsData = {
    'chrono-shift': {
      title: 'Chrono-Shift: Puzzle Platformer',
      category: 'Game Design & Level Design',
      engine: 'Unity (C#)',
      genre: '2.5D Puzzle Platformer',
      role: 'Lead Game Designer / Level Architect',
      timeline: '4 meses (Prototipo jugable)',
      summary: 'Un juego de plataformas donde el tiempo no avanza si el jugador permanece inmóvil. El reto de diseño radicaba en crear acertijos cinéticos donde el timing y la inercia física fueran transferibles a través de anomalías temporales.',
      pillars: [
        '<strong>Inercia Preservada:</strong> La velocidad acumulada por el jugador se mantiene congelada y se libera estratégicamente al reanudar el flujo.',
        '<strong>Claridad Visual (Affordance):</strong> Todos los objetos manipulables por el tiempo emiten un tono cian fosforescente inconfundible.',
        '<strong>Cero Frustración Injusta:</strong> Rebobinado instantáneo de los últimos 5 segundos sin pantallas de "Game Over".'
      ],
      mechanics: [
        'Sistema de "Time Anchor": El jugador planta un ancla y regresa a esa posición guardando su vector de velocidad.',
        'Proyectiles estáticos: Los disparos enemigos sirven de plataformas temporales si se congelan a tiempo.',
        'Curva de dificultad modular con niveles opcionales de alta exigencia de timing.'
      ],
      levelDesignNotes: 'Cada nivel fue diseñado primero en cuadrículas de whitebox (bloques grises) garantizando que la mecánica funcionara sin necesidad de arte final. Se aplicaron "líneas de visión guiadas" (Sightlines) para anticipar los objetivos.',
      demoLink: '#',
      gddLink: '#'
    },
    'aethelgard': {
      title: 'Echoes of Aethelgard',
      category: 'Combat & Systems Design',
      engine: 'Unreal Engine 5 (Blueprints / C++)',
      genre: 'Souls-lite Action RPG',
      role: 'Combat & Systems Designer',
      timeline: '6 meses',
      summary: 'Diseño integral del sistema de combate cuerpo a cuerpo centrado en la lectura de animaciones enemigas, gestión estricta de resistencia (Stamina) y ventanas de contraataque (Parry).',
      pillars: [
        '<strong>Legibilidad del Golpe:</strong> Telegrafiado evidente en los ataques enemigos (anticipación de 12 a 24 frames antes del impacto).',
        '<strong>Decisión de Riesgo/Recompensa:</strong> Parries exitosos restauran el 30% del medidor de energía y desequilibran al enemigo.',
        '<strong>Game Feel de Impacto:</strong> Implementación de Hit-stop de 4 frames, vibración de cámara y retroceso acústico en golpes críticos.'
      ],
      mechanics: [
        'Matriz de vulnerabilidad: 3 tipos de daño elemental acoplados a debilidades físicas de cada arquetipo de enemigo.',
        'Sistema de IA por capas de agresividad (Token System) para evitar que múltiples enemigos ataquen al mismo milisegundo de forma injusta.',
        'Árbol de talentos sinérgico con builds orientadas a agilidad o fuerza bruta.'
      ],
      levelDesignNotes: 'Estructuración de arenas de combate circulares con obstáculos destructibles que permiten romper líneas de visión enemigas y respirar.',
      demoLink: '#',
      gddLink: '#'
    },
    'neon-syndicate': {
      title: 'Neon Syndicate: Infiltración Táctica',
      category: 'UI/UX & AI Systems',
      engine: 'Prototipo en Figma + Motor Propietario',
      genre: 'Cyberpunk Stealth Tactics',
      role: 'UI/UX Lead & AI Behavior Designer',
      timeline: '3 meses',
      summary: 'Concepción del HUD no intrusivo y mapa de estados de inteligencia artificial enemiga para un juego de sigilo táctico con cámara isométrica.',
      pillars: [
        '<strong>Minimizar la Carga Cognitiva:</strong> El jugador debe entender el estado de sospecha de los guardias a simple vista mediante códigos de color semafóricos en el HUD.',
        '<strong>Espacialización del Audio:</strong> Anillos visuales concéntricos que muestran el radio de ruido generado por las pisadas del jugador.',
        '<strong>Menús Táctiles Inmersivos:</strong> El inventario de ciberware se integra como una proyección holográfica diegética dentro del mundo.'
      ],
      mechanics: [
        'Máquina de estados finita (FSM) de la IA: Rutina -> Alerta Sospechosa -> Búsqueda en Grupo -> Combate.',
        'Hackeo de cámaras de seguridad con mini-puzzle de conexiones en tiempo bala.',
        'Inventario con balance estricto de consumo de memoria neuronal (RAM) como recurso limitante.'
      ],
      levelDesignNotes: 'Rutas triples clásicas de sigilo: conducto de ventilación (lento y seguro), pasillo principal (arriesgado con patrullas) y terminal de hackeo (requiere recursos).',
      demoLink: '#',
      gddLink: '#'
    },
    'tiny-horizons': {
      title: 'Tiny Horizons: Colonización Flotante',
      category: 'Game Design & Economy',
      engine: 'Godot Engine 4',
      genre: 'Cozy Builder / Economy Sim',
      role: 'Economy & Balance Designer',
      timeline: '2 meses (Game Jam & Expansión)',
      summary: 'Juego de gestión relajante donde el jugador expande un archipiélago de islas flotantes hexagonales equilibrando producción de alimentos, felicidad y energía eólica.',
      pillars: [
        '<strong>Sensación Zen sin Bloqueos:</strong> No hay condiciones de "Game Over", sino incentivos continuos para optimizar la armonía de la colonia.',
        '<strong>Economía en Bucle Cerrado:</strong> Cada recurso producido alimenta directamente la construcción de la siguiente isla temática.',
        '<strong>Interactividad Háptica:</strong> Colocar piezas produce una suave animación de rebote y partículas de hojas que hacen adictivo el acto de expandir.'
      ],
      mechanics: [
        'Modelo matemático de balance económico creado y simulado en Google Sheets antes de la implementación.',
        'Generación procedural de biomas respetando reglas de adyacencia (las granjas rinden el doble junto al agua).',
        'Sistema de misiones dinámicas generadas a partir de los déficits de la colonia.'
      ],
      levelDesignNotes: 'Diseño del algoritmo de crecimiento de terreno para garantizar que nunca se generen islas aisladas o inaccesibles para el transporte de recursos.',
      demoLink: '#',
      gddLink: '#'
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  function openProjectModal(projectId) {
    const data = projectsData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="modal-project-category">${data.category}</span>
        <h2 class="modal-project-title">${data.title}</h2>
        <div class="modal-project-meta">
          <div><strong>Motor:</strong> ${data.engine}</div>
          <div><strong>Género:</strong> ${data.genre}</div>
          <div><strong>Rol:</strong> ${data.role}</div>
          <div><strong>Duración:</strong> ${data.timeline}</div>
        </div>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Visión &amp; Resumen de Diseño
        </h3>
        <p>${data.summary}</p>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Pilares de Diseño (Core Pillars)
        </h3>
        <ul>
          ${data.pillars.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="6 2 18 2 18 6 6 6 6 2"/><rect x="3" y="6" width="18" height="16" rx="2"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
          Mecánicas &amp; Sistemas Clave
        </h3>
        <ul>
          ${data.mechanics.map(m => `<li>${m}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-section">
        <h3 class="modal-section-title">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
          Estrategia de Level Design / Pacing
        </h3>
        <p>${data.levelDesignNotes}</p>
      </div>

      <div class="modal-actions">
        <a href="${data.demoLink}" class="btn btn-primary" onclick="alert('Enlace de ejemplo: aquí puedes vincular tu build jugable en Itch.io o Steam.')">
          <span>Jugar Prototipo</span>
        </a>
        <a href="${data.gddLink}" class="btn btn-secondary" onclick="alert('Enlace de ejemplo: aquí puedes enlazar el documento PDF o Notion con tu GDD completo.')">
          <span>Ver GDD Completo</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Asignar clicks a tarjetas de proyectos
  projectCards.forEach(card => {
    const projectId = card.getAttribute('data-project');
    const openBtn = card.querySelector('.open-modal-btn');
    
    if (openBtn) {
      openBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openProjectModal(projectId);
      });
    }

    card.addEventListener('click', () => {
      openProjectModal(projectId);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // ============================================================
  // 6. FONDO INTERACTIVO LIGERO (CANVAS DE PARTÍCULAS SUTILES)
  // Rendimiento garantizado a 60 FPS, cero lag.
  // ============================================================
  const canvas = document.getElementById('ambient-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 100 };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    }

    function createParticles() {
      particles = [];
      // Cantidad moderada para garantizar ligereza ("no sobrecargado")
      const count = Math.min(Math.floor((width * height) / 24000), 45);
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 1,
          alpha: Math.random() * 0.4 + 0.15
        });
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    function renderParticles() {
      if (document.hidden) {
        requestAnimationFrame(renderParticles);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Dibujar partículas y conexiones sutiles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Reacción suave al ratón
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 1.5;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
        ctx.fill();

        // Conectar puntos cercanos
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderParticles);
    }

    renderParticles();
  }

  // ============================================================
  // 7. FORMULARIO DE CONTACTO (SIMULACIÓN DE ENVÍO PROFESIONAL)
  // ============================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Enviando mensaje...</span>';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      // Simulación de envío fluido (puedes conectar Formspree o EmailJS aquí)
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        formStatus.className = 'form-status success';
        formStatus.textContent = '¡Mensaje recibido con éxito! Te responderé lo antes posible.';
        contactForm.reset();

        setTimeout(() => {
          formStatus.textContent = '';
        }, 6000);
      }, 1000);
    });
  }

});
