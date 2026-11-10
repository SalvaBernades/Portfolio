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
    'slingshot-arcana': {
      title: 'Slingshot Arcana: Duelos Mágicos en Realidad Virtual',
      category: 'VR Multiplayer · Game & Systems Design',
      engine: 'Unity / 6DoF VR (Meta Quest 2/3, Valve Index, HTC Vive)',
      genre: 'Competitive VR Spellcaster',
      role: 'Salvador Bernades (Game Designer & Programmer) · Equipo de 5',
      timeline: 'Milestone 1 (GDD Técnico & Prototipado)',
      modalImage: 'assets/images/projects/GDD-Proyecto-VR-image12.png',
      summary: 'Slingshot Arcana es un juego multijugador competitivo de duelos mágicos en tiempo real para Realidad Virtual. La innovación central radica en el sistema de casteo: el jugador sostiene un libro mágico en una mano y proyectiles arcanos en la otra, emulando la tensión física de un tirachinas con los mandos 6DoF para graduar potencia, velocidad y parábola en combate.',
      pillars: [
        '<strong>Casteo Físico Inmersivo:</strong> La tensión y orientación gestual del tirachinas sustituyen al apuntado automático o casteo por botones, logrando una sensación cinestésica gratificante y alta expresión de habilidad.',
        '<strong>Matriz Elemental Táctica:</strong> 4 hechizos diferenciados: Fuego (20 daño directo + 10 DoT de quemadura por 4s, 10s cooldown), Electricidad (10 daño, veloz e inmoviliza al rival, 15s cooldown), Hielo (10 daño y silencia el casteo rival durante 2s, 15s cooldown) y Vacío (teletransporte táctico a la zona de impacto, 8s cooldown).',
        '<strong>Arena Dinámica con Dummies:</strong> Maniquíes reactivos que emergen del suelo durante el combate; impactarlos permite reconfigurar muros de cobertura, restaurar maná o cambiar de munición pasando página del libro.'
      ],
      mechanics: [
        'Sistema de cambio de proyectil interactivo pasando página en el libro arcano o cogiéndolo del cinturón háptico.',
        'Gestión de recurso de maná y cooldowns calculados para evitar el spam y forzar la alternancia de hechizos.',
        'Diseño de accesibilidad y confort VR: espacio guardián delimitado de 2x2m y locomoción suave con opción de teletransporte corto para mitigar el motion sickness.'
      ],
      levelDesignNotes: 'La arena de combate fue concebida como un espacio simétrico con pilares y coberturas modulares que equilibran la línea de visión entre ambos duelistas y fomentan el uso de rebotes de hechizos indirectos.',
      docLink: 'assets/docs/GDD-Slingshot-Arcana-VR.docx',
      docName: 'GDD Proyecto VR.docx'
    },
    'robs-george': {
      title: 'Robs George: Level Design & Puzzles 3D',
      category: 'Level Design & Puzzle Architecture',
      engine: 'Unreal Engine (Blueprints & 3D Environment)',
      genre: '3D Stealth / Puzzle Adventure',
      role: 'Salvador Bernades (Puzzle & Level Designer, Assets 3D & Doc)',
      timeline: 'Final Delivery · Trabajo en Equipo',
      modalImage: 'assets/images/projects/Final-Delivery-Level-Design-image2.png',
      summary: 'Nivel 3D completo de infiltración residencial donde el jugador encarna a un ladrón que entra por el balcón con el objetivo de robar y capturar al escurridizo gato George. El foco del proyecto fue estructurar un ritmo (pacing) variado que transformase la exploración de habitaciones en una experiencia tensa pero cómica.',
      pillars: [
        '<strong>Modulación del Ritmo (Pacing en Crescendo):</strong> Comienzo pausado y calculador en el balcón, exploración reflexiva con deducción en el salón y resolución final caótica en el dormitorio.',
        '<strong>Diversidad Mecánica sin Fricción:</strong> Cada habitación introduce una mecánica diferente (QTE de habilidad -> Reconocimiento de patrones visuales -> Persecución física espacial) evitando la monotonía de saquear cajones.',
        '<strong>Affordance y Señalización Visual:</strong> Cuadros con gatos numerados colocados de forma estratégica para sugerir la combinación de la caja fuerte sin necesidad de textos explicativos.'
      ],
      mechanics: [
        'Puzzle 1 (Balcón - Lockpick): Minijuego con aguja oscilante en barra horizontal. Acertar 3 veces en la zona verde abre la puerta sigilosamente sumando puntuación; fallar hace que el ladrón derribe la puerta a patadas perdiendo sigilo.',
        'Puzzle 2 (Salón - Caja Fuerte): Caja oculta tras una pintura con 4 botones de colores. El jugador deduce la secuencia correcta según las pistas ambientales (Negro -> Blanco -> Gris -> Naranja) para desbloquear la llave del pasillo.',
        'Puzzle 3 (Dormitorio Principal - Catch the Cat): El gato George corre a gran velocidad escondiéndose bajo la cama, armarios y sábanas. El jugador debe calcular su trayectoria y atraparlo con una bolsa para concluir el nivel.'
      ],
      levelDesignNotes: 'Diseño arquitectónico en planta en L. Se integraron coleccionables opcionales en la cocina y salón para premiar la exploración con riesgo antes de afrontar el dormitorio principal. Greyboxing probado para garantizar fluidez sin atascos en puertas.',
      docLink: 'assets/docs/Level-Design-Robs-George.docx',
      docName: 'Final Delivery Level Design.docx'
    },
    'eco-city-rescue': {
      title: 'Eco-City Rescue! Serious Game & Concienciación',
      category: 'Game Design Document · Serious Games',
      engine: 'Multiplataforma (PC / Smartphone / WebGL)',
      genre: 'Educational / Time-Management Sim',
      role: 'Salvador Bernades (Lead Game & Systems Designer)',
      timeline: 'GDD Completo (Empathy, Ideation & Prototyping)',
      modalImage: 'assets/images/projects/Eco-City-Rescue-image7.png',
      summary: 'Game Design Document (GDD) detallado para un videojuego formativo dirigido a jóvenes (13 a 20 años). El juego aborda la emergencia ecológica transformando hábitos cotidianos desapercibidos (desperdicio energético, clasificación incorrecta de residuos) en micro-desafíos dinámicos con feedback visual inmediato.',
      pillars: [
        '<strong>Aprender Haciendo (Learn by Doing):</strong> Sustitución de cuestionarios teóricos por mecánicas cinéticas de arrastre y clasificación rápida bajo presión temporal.',
        '<strong>Causa y Efecto Inmediato:</strong> La barra de salud del hogar y del entorno se degrada visiblemente en tiempo real si el jugador descuida las luces encendidas o mezcla residuos peligrosos.',
        '<strong>Diseño de Bajo Requisito Técnico:</strong> Especificaciones pensadas para ejecutarse con fluidez en ordenadores de aulas escolares y smartphones sin necesidad de tarjetas gráficas dedicadas.'
      ],
      mechanics: [
        'Minijuego de clasificación de residuos: Diferenciación de basura orgánica, plásticos, pilas/baterías y componentes electrónicos que caen a distintas velocidades hacia los contenedores correctos.',
        'Minijuego de eficiencia doméstica: Navegación contrarreloj por las estancias apagando luces y aparatos en reposo tras la salida de familiares para conservar el medidor de energía.',
        'Objetivos de aprendizaje integrados: Sensibilización sobre el ciclo de vida de los materiales y comparativa entre fuentes de energía renovable y no renovable.'
      ],
      levelDesignNotes: 'Estructuración progresiva de niveles en 3 actos: el ámbito individual (tu propia habitación), el ámbito familiar (la casa) y el ámbito social (el parque y la escuela), incrementando la escala del impacto.',
      docLink: 'assets/docs/Eco-City-Rescue-GDD.docx',
      docName: 'Eco City Rescue.docx'
    },
    'evo-workout': {
      title: 'EvoWorkout: Gamificación Fitness & Progresión',
      category: 'Game Systems & UX Design',
      engine: 'Mobile App / Gamification System',
      genre: 'Fitness RPG / Virtual Creature Evolution',
      role: 'Salvador Bernades (Game Systems & UX Designer)',
      timeline: 'Challenge 2 · Definición y Arquitectura de Sistemas',
      modalImage: 'assets/images/projects/EvoWorkout-cover.png',
      summary: 'Propuesta de diseño de sistemas y gamificación enfocada a resolver el problema de deserción en los gimnasios (falta de motivación a corto plazo y aislamiento). El progreso físico real se materializa en la evolución estética, anatómica y de atributos de una criatura virtual que actúa como avatar emocional.',
      pillars: [
        '<strong>Avatar Emocional Evolutivo:</strong> Cada serie, repetición y día de asistencia alimenta el crecimiento y las ramas evolutivas de la criatura (fuerza, resistencia, agilidad), haciendo tangible el esfuerzo.',
        '<strong>Validación Social Positiva:</strong> Verificación de técnica mediante vídeos cortos entre usuarios con recompensas mutuas, creando comunidad y eliminando la intimidación del principiante.',
        '<strong>Gratificación Inmediata vs Resultados Lentos:</strong> Sustitución del desánimo por la lentitud de los cambios físicos corporales por micro-recompensas visuales y cosméticas tras cada entrenamiento.'
      ],
      mechanics: [
        'Árbol de metamorfosis de criaturas: Rutas evolutivas sinérgicas según la tipología de entrenamiento (calistenia, levantamiento pesado, cardio, hipertrofia).',
        'Sistema "Streak Keeper" y retos cooperativos semanales para romper la monotonía y consolidar hábitos saludables.',
        'Diseño de UI de mínima fricción: Registro rápido de cargas y repeticiones a una mano con háptica optimizada para el descanso entre series.'
      ],
      levelDesignNotes: 'Arquitectura de flujo UX con bucles de retorno diarios y semanales, evitando la saturación competitiva tóxica y primando el progreso personal sobre marcadores punitivos.',
      docLink: 'assets/docs/EvoWorkout-Game-Design.docx',
      docName: 'EvoWorkout.docx'
    },
    'abilities-system': {
      title: 'RPG Abilities & Progression Systems Architecture',
      category: 'Systems Architecture & Combat Balancing',
      engine: 'Documentación Técnica de Diseño / Multi-engine',
      genre: 'Action RPG / System Mechanics Framework',
      role: 'Salvador Bernades (Systems & Combat Designer)',
      timeline: 'Investigación Técnica y Guía de Arquitectura',
      modalImage: 'assets/images/projects/ABILITIES-SYSTEM-image4.png',
      summary: 'Estudio y framework técnico de diseño sobre los principales paradigmas de sistemas de habilidades en RPGs: sistemas basados en clases fijas, árboles de habilidades ramificados (Skill Trees), asignación directa de puntos de atributo, aprendizaje por experiencia directa (Learn by Doing) y sistemas de combos y sinergias.',
      pillars: [
        '<strong>Identidad y Expresión de Build:</strong> Brindar opciones transparentes para que el jugador cree arquetipos viables tanto especializados como híbridos sin toparse con muros artificiales.',
        '<strong>Economía de Combate Balanceada:</strong> Ecuación de coste/beneficio donde el daño y la utilidad se equilibran rigurosamente con el coste de maná/stamina, tiempo de casteo y cooldown.',
        '<strong>Sinergias Dinámicas y Combos:</strong> Recompensar la alternancia estratégica de habilidades (estados alterados, cancelaciones de animación y ventanas de vulnerabilidad).'
      ],
      mechanics: [
        'Modelado comparativo de 5 arquitecturas: Class-Based (World of Warcraft), Skill Trees (Skyrim), Stat Allocation (Dragon Age), Learn by Doing (Dark Souls) y Combo-Based Systems.',
        'Diseño de matrices de tiempo de reutilización (cooldowns) y rendimientos decrecientes para evitar habilidades dominantes.',
        'Estructura de perks pasivos y modificadores condicionales que alteran la respuesta del Core Loop en combate.'
      ],
      levelDesignNotes: 'Diseño de sistemas preparado para integrarse con el ritmo de progresión de niveles y curvas de dificultad de jefes y encuentros multitudinarios.',
      docLink: 'assets/docs/Abilities-System-Architecture.docx',
      docName: 'ABILITIES SYSTEM.docx'
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
          <div><strong>Motor / Entorno:</strong> ${data.engine}</div>
          <div><strong>Género:</strong> ${data.genre}</div>
          <div><strong>Rol:</strong> ${data.role}</div>
          <div><strong>Hito / Tipo:</strong> ${data.timeline}</div>
        </div>
      </div>

      ${data.modalImage ? `
        <div class="modal-image-wrapper">
          <img src="${data.modalImage}" alt="${data.title}" class="modal-banner-img">
        </div>
      ` : ''}

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
          Estrategia de Level Design / Pacing / Arquitectura
        </h3>
        <p>${data.levelDesignNotes}</p>
      </div>

      <div class="modal-actions">
        <a href="${data.docLink}" download="${data.docName}" class="btn btn-primary" title="Descargar documento de diseño completo">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Descargar Documento GDD (.docx)</span>
        </a>
        <a href="#contacto" class="btn btn-secondary" onclick="closeModal()">
          <span>Contactar sobre este Proyecto</span>
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
