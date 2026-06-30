/* ============================================================
   Engine — loop de jogo, câmera, colisão, joystick, input
   ============================================================ */

const WORLD_W = 900, WORLD_H = 900;
const player = { x: 450, y: 450, w: 48, h: 48, speed: 3.2, dir: 'down' };
const keys = {};
let joyVec = { x: 0, y: 0 };
let currentWorldId = 'world-room1';

window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
window.addEventListener('keyup',   e => { keys[e.key.toLowerCase()] = false; });

let _obstacleCache = null;

function invalidateObstacleCache() { _obstacleCache = null; }

/* Executa o callback após fade-out do viewport e retoma com fade-in */
function transitionRoom(callback) {
  const vp = document.getElementById('world-viewport');
  vp.classList.add('room-fade');
  setTimeout(() => {
    callback();
    requestAnimationFrame(() => vp.classList.remove('room-fade'));
  }, 350);
}

function getObstacles() {
  if (_obstacleCache) return _obstacleCache;
  const els = document.querySelectorAll(`#${currentWorldId} .wall, #${currentWorldId} .collider`);
  _obstacleCache = Array.from(els).map(el => {
    const left = parseInt(el.style.left), top = parseInt(el.style.top);
    const w = el.offsetWidth, h = el.offsetHeight;
    return { left, top, right: left + w, bottom: top + h, el };
  });
  return _obstacleCache;
}

function rectsOverlap(a, b) {
  return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
}

function near(elId, range = 70) {
  const el = document.getElementById(elId);
  if (!el) return false;
  const left = parseInt(el.style.left), top = parseInt(el.style.top);
  const cx = left + el.offsetWidth / 2, cy = top + el.offsetHeight / 2;
  const pcx = player.x + player.w / 2, pcy = player.y + player.h / 2;
  return Math.hypot(cx - pcx, cy - pcy) < range;
}

function updateCamera() {
  const viewport = document.getElementById('world-viewport');
  const world = document.getElementById(currentWorldId);
  const vw = viewport.clientWidth, vh = viewport.clientHeight;
  let camX = player.x + player.w / 2 - vw / 2;
  let camY = player.y + player.h / 2 - vh / 2;
  camX = Math.max(0, Math.min(WORLD_W - vw, camX));
  camY = Math.max(0, Math.min(WORLD_H - vh, camY));
  world.style.transform = `translate(${-camX}px, ${-camY}px)`;
}

function loop() {
  let dx = 0, dy = 0;
  if (keys['arrowup']    || keys['w']) dy -= 1;
  if (keys['arrowdown']  || keys['s']) dy += 1;
  if (keys['arrowleft']  || keys['a']) dx -= 1;
  if (keys['arrowright'] || keys['d']) dx += 1;
  dx += joyVec.x;
  dy += joyVec.y;

  const moving = (dx !== 0 || dy !== 0) && !modalOpenLock;
  if (moving) {
    const len = Math.hypot(dx, dy) || 1;
    const nx = player.x + (dx / len) * player.speed;
    const ny = player.y + (dy / len) * player.speed;
    const playerBox = (x, y) => ({ left: x, top: y, right: x + player.w, bottom: y + player.h });
    const obstacles = getObstacles();
    if (!obstacles.some(o => rectsOverlap(playerBox(nx, player.y), o)))
      player.x = Math.max(20, Math.min(WORLD_W - 20 - player.w, nx));
    if (!obstacles.some(o => rectsOverlap(playerBox(player.x, ny), o)))
      player.y = Math.max(20, Math.min(WORLD_H - 20 - player.h, ny));

    document.getElementById('player').classList.add('walk');
    _startInstructionAutoHide();
    if (Math.abs(dx) > Math.abs(dy)) player.dir = dx > 0 ? 'right' : 'left';
    else player.dir = dy > 0 ? 'down' : 'up';
  } else {
    document.getElementById('player').classList.remove('walk');
  }

  const pEl = document.getElementById('player');
  pEl.style.left = player.x + 'px';
  pEl.style.top  = player.y + 'px';

  const dirAsset = {
    down:  ASSETS.PLAYER_DOWN,
    up:    ASSETS.PLAYER_UP,
    left:  ASSETS.PLAYER_LEFT,
    right: ASSETS.PLAYER_RIGHT
  }[player.dir];
  const imgEl = document.getElementById('player-img');
  if (imgEl.dataset.dir !== player.dir) { imgEl.src = dirAsset; imgEl.dataset.dir = player.dir; }

  updateCamera();
  if      (currentWorldId === 'world-room1') checkInteractionsRoom1();
  else if (currentWorldId === 'world-room2') checkInteractionsRoom2();
  else                                       checkInteractionsRoom3();
  requestAnimationFrame(loop);
}

/* --- Joystick virtual --- */
const zone  = document.getElementById('joystick-zone');
const stick = document.getElementById('joy-stick');
let dragging = false, originX = 0, originY = 0;

function setStick(dx, dy) {
  const max = 38;
  const len = Math.hypot(dx, dy);
  const clamped = len > max ? max / len : 1;
  stick.style.left = (38 + dx * clamped) + 'px';
  stick.style.top  = (38 + dy * clamped) + 'px';
  joyVec.x = (dx * clamped) / max;
  joyVec.y = (dy * clamped) / max;
}

function resetStick() {
  stick.style.left = '38px';
  stick.style.top  = '38px';
  joyVec.x = 0;
  joyVec.y = 0;
}

zone.addEventListener('pointerdown', e => {
  dragging = true;
  const rect = zone.getBoundingClientRect();
  originX = rect.left + rect.width  / 2;
  originY = rect.top  + rect.height / 2;
  setStick(e.clientX - originX, e.clientY - originY);
});
window.addEventListener('pointermove', e => { if (dragging) setStick(e.clientX - originX, e.clientY - originY); });
window.addEventListener('pointerup',   () => { dragging = false; resetStick(); });
