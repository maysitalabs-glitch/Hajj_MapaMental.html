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
      title: "¿?",
      themeHtml: "<p>Qué pasp.</p><ul><li>Punto 1</li><li>Punto 2</li></ul>"
    },
    central: {
      title: "¿xvgsdfsd?",
      themeHtml: "<p>Efsdfs/p><ol><li>A</li><li>B</li></ol>"
    },
    derecha: {
      title: "riesgos?",
      themeHtml: "<p>riesgos principales.</p><p>falta de atención médica...</p>"
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

  document.querySelectorAll('.hotspot').forEach(hs => {
    hs.addEventListener('click', () => enterAnimation(hs, hs.dataset.room));
    hs.setAttribute('tabindex','0');
    hs.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        hs.click();
      }
    });
  });

  closeBtn.addEventListener('click', closeRoom);
  volverBtn.addEventListener('click', closeRoom);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeRoom(); });
})();
