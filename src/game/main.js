/* ============================================================
   Main — inicialização, i18n helper, assets, dica da Lumi, tela de sucesso
   ============================================================ */

let lang = 'pt';

function t(k) { return STR[lang][k]; }

function startGame(l) {
  lang = l;
  document.getElementById('t-title').textContent    = t('title');
  document.getElementById('t-controls').textContent = t('controls');
  document.getElementById('room-label').textContent  = t('room1Label');
  setInstruction(t('intro'));
  document.getElementById('screen-start').classList.add('hidden');
  applyAssets();
  requestAnimationFrame(loop);
}

function showHint() {
  if      (currentWorldId === 'world-room1' && !state1.mathSolved) setInstruction(t('lumiHint1'));
  else if (currentWorldId === 'world-room2' && !state2.dots)       setInstruction(t('lumiHint2'));
  else if (currentWorldId === 'world-room3' && !state3.math)       setInstruction(t('lumiHint3'));
}

function goToSuccess() {
  document.getElementById('t-success-title').textContent = t('success_title');
  document.getElementById('t-success-text').textContent  = t('success_text');
  document.getElementById('screen-success').classList.add('active');
}

function applyAssets() {
  document.getElementById('world-room1').style.backgroundImage = `url(${ASSETS.TILE_GRASS})`;
  document.getElementById('world-room2').style.backgroundImage = `url(${ASSETS.TILE_LAB_FLOOR})`;
  document.getElementById('world-room3').style.backgroundImage = `url(${ASSETS.TILE_TOWER_FLOOR})`;
  document.querySelectorAll('#world-room1 .wall').forEach(w => w.style.backgroundImage = `url(${ASSETS.TILE_WOOD})`);
  document.querySelectorAll('#world-room2 .wall').forEach(w => w.style.backgroundImage = `url(${ASSETS.TILE_LAB_WALL})`);
  document.querySelectorAll('#world-room3 .wall').forEach(w => w.style.backgroundImage = `url(${ASSETS.TILE_TOWER_WALL})`);
  document.getElementById('door1').style.backgroundImage = `url(${ASSETS.DOOR})`;
  document.getElementById('door2').style.backgroundImage = `url(${ASSETS.DOOR})`;
  document.getElementById('door3').style.backgroundImage = `url(${ASSETS.DOOR3_LOCKED})`;
  document.getElementById('console-dots-img').src    = ASSETS.GEAR;
  document.getElementById('console-emoji-img').src   = ASSETS.GEAR;
  document.getElementById('stranger-img').src        = ASSETS.SHADOW;
  document.getElementById('console-math-img').src    = ASSETS.GEAR;
  document.getElementById('console-anagram-img').src = ASSETS.BOOK;
  document.getElementById('console-star-img').src    = ASSETS.GEAR;
  document.getElementById('dragon-img').src          = ASSETS.DRAGON;
  document.getElementById('player-img').src          = ASSETS.PLAYER_DOWN;
  document.getElementById('player-img').dataset.dir  = 'down';
  document.getElementById('lumi-hud-img').src        = ASSETS.LUMI;
  const startImg = document.getElementById('start-character-img');
  if (startImg) startImg.src = ASSETS.PLAYER_DOWN;
}

/* Aplica os assets ao carregar a página para evitar imagens quebradas na tela inicial */
applyAssets();
