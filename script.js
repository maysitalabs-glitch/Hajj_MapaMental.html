(function(){
  const bg = document.getElementById('bg');
  const overlay = document.getElementById('overlay');
  const flash = document.getElementById('flash');
  const room = document.getElementById('room');
  const roomTitle = document.getElementById('roomTitle');
  const roomTheme = document.getElementById('roomTheme');
  const closeBtn = document.getElementById('closeBtn');
  const volverBtn = document.getElementById('volverBtn');

  const rooms = {
    izquierda: {
      title: "¿Qué pasó?",
      themeHtml: "<p>Sucesos.</p><ul><li>La peregrinacion a La Meca, un evento que se realiza cada año donde 1.3 millones de musulmanes participaron entre el 14 y 19 de Junio de 2024</li><li>Durante esos dias se registraron temperaturas extremas que superaron los 51 grados C </li><li>Aproximadamente 1,300 peregrinos murieron y mas de 2700 resultaron afectados por el golpe de calor y el cansancio</li><li>Se volvio tragico debido a la combinacion de calor extremo multitudes masivas y la falta de conciencia de las personas que fueron sin permiso al evento</li><li>La influencia socio politica se pudo reflejar en la presion internacional sobre arabia Saudita para reforzar la seguridad, asi como en reformas de control de multitudes en futuras peregrinacines</ul>"
    },
    central: {
      title: "¿Por qué se convirtió en desastre?",
      themeHtml: "<p>Se convirtio en desastre por...</p><ol><li>Sobrecupo de peregrinos y muchos de ellos no contaban con los servicios basicos como agua, sombra, acceso a la atencion medica y el transporte con clima. Tales que venian con un permiso en especial que debieron comprar antes de asistir al evento</li><li>La afalta de planificacion y control: El gobierno trató de encargarse de tal asunto pero fue casi imposible controlar a las miles de personas. Los hospitales se saturaron y las altas emperaturas superaron la capacidad de los sistemas de prevencion<li>Varios sistemas resultaron afectados: Los hospitales que al ser saturados no se contó con el personal necesario, el transporte que al haber sobrecupo de personas resultó mas dificil mover y evacuar a los peregrinos, </li></ol>"
    },
    derecha: {
      title: "¿Cuales fueron los riesgos?",
      themeHtml: "<p>Riesgos principales.</p><p>La exposicion a las altas/extremas temperaturas sin proteccion alguna, multitudes que dificultaron la evacuacion y la atencion de emergencia a quienes lo necesitaban, la falta de hidratacion y el descanso que aumentó el riesgo de golpes de calor. El acceso limitado (a quienes no contaban con su permiso) a los servicios medicos y de emergencia</p>"
    }
  };

  function enterAnimation(hotspotEl, roomKey){
    const rect = hotspotEl.getBoundingClientRect();
    const stageRect = document.getElementById('stage').getBoundingClientRect();
    const cx = rect.left + rect.width/2 - stageRect.left;
    const cy = rect.top + rect.height/2 - stageRect.top;

    overlay.classList.add('active');

    flash.classList.remove('play');
    void flash.offsetWidth;
    flash.classList.add('play');

    const stageW = stageRect.width;
    const stageH = stageRect.height;
    const scale = 2.2;
    const targetX = stageW/2 - cx;
    const targetY = stageH*0.35 - cy;

    bg.style.transition = 'transform 0.9s cubic-bezier(.2,.9,.25,1), filter .9s';
    bg.style.transformOrigin = 'center center';
    bg.style.transform = `translate(${targetX}px, ${targetY}px) scale(${scale})`;
    bg.style.filter = 'blur(2px)';

    setTimeout(() => { showRoom(roomKey); }, 880);
  }

  function showRoom(roomKey){
    const data = rooms[roomKey] || {title:"Habitación", themeHtml:"Contenido vacío"};
    roomTitle.textContent = data.title;
    roomTheme.innerHTML = data.themeHtml;
    room.classList.add('active');
    room.querySelector('.room-card').setAttribute('aria-hidden', 'false');
    overlay.classList.add('active');
  }

  function closeRoom(){
    bg.style.transition = 'transform 0.5s ease, filter .5s';
    bg.style.transform = 'none';
    bg.style.filter = 'none';
    overlay.classList.remove('active');
    room.classList.remove('active');
    room.querySelector('.room-card').setAttribute('aria-hidden', 'true');
  }

  // ✅ Eventos unificados: desktop, móvil y accesibilidad
  document.querySelectorAll('.hotspot').forEach(hs => {
    function activate() {
      enterAnimation(hs, hs.dataset.room);
    }

    // Desktop
    hs.addEventListener('click', activate);

    // Mobile / Tablet
    hs.addEventListener('touchstart', (e) => {
      e.preventDefault(); // evita doble disparo (touch+click)
      activate();
    });

    // Accesibilidad teclado
    hs.setAttribute('tabindex','0');
    hs.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    });
  });

  closeBtn.addEventListener('click', closeRoom);
  volverBtn.addEventListener('click', closeRoom);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeRoom(); });
})();


