const symbols = ['🌷', '🍚', '🪻', '✨','🦈', '💜'];

function spawnAmbientPetals() {
  const layer = document.getElementById('petalLayer');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 10}s;
      font-size: ${13 + Math.random() * 10}px;
    `;
    layer.appendChild(p);
  }
}

function burstPetals() {
  for (let i = 0; i < 14; i++) {
    const p = document.createElement('div');
    p.className = 'burst-petal';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    const angle = Math.random() * 2 * Math.PI;
    const dist = 80 + Math.random() * 120;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    p.style.cssText = `
      left: 50%;
      top: 50%;
      --fly: translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg);
      animation-delay: ${Math.random() * 0.3}s;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 2000);
  }
}

let opened = false;

function openLetter() {
  if (opened) return;
  opened = true;

  burstPetals();

  const envWrap = document.getElementById('envWrap');
  envWrap.classList.add('opened');

  setTimeout(() => {
    const fullLetter = document.getElementById('fullLetter');
    fullLetter.classList.add('show');
    requestAnimationFrame(() => {
      requestAnimationFrame(() => fullLetter.classList.add('visible'));
    });
    setTimeout(() => {
      fullLetter.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 400);
  }, 900);
}

document.addEventListener('DOMContentLoaded', () => {
  spawnAmbientPetals();

  const heart = document.getElementById('heartSeal');
  heart.addEventListener('click', openLetter);
  heart.addEventListener('touchend', (e) => {
    e.preventDefault();
    openLetter();
  });
});