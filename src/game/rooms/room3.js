/* ============================================================
   Sala 3 — A Torre do Dragão
   Enigmas: multiplicação (3×4=12), anagrama (BOOK), estrela (liga-pontos), empatia
   ============================================================ */

let state3 = { math: false, anagram: false, star: false, dragon: false, keyFound: false, doorReached: false };

function checkInteractionsRoom3() {
  if (modalOpenLock) return;
  if (suppressedId && !near(suppressedId, 100)) suppressedId = null;

  if (!state3.math    && suppressedId !== 'console-math'    && near('console-math'))            { openMath3Modal();   return; }
  if (!state3.anagram && suppressedId !== 'console-anagram' && near('console-anagram'))         { openAnagramModal(); return; }
  if (!state3.star    && suppressedId !== 'console-star'    && near('console-star'))            { openStarPuzzle();   return; }
  if (state3.math && state3.anagram && state3.star && !state3.dragon && suppressedId !== 'dragon' && near('dragon', 90)) { openDragonEvent(); return; }
  if (state3.keyFound && !state3.doorReached && near('door3', 80)) {
    state3.doorReached = true;
    setInstruction(t('doorReached3'));
    setTimeout(goToSuccess, 1400);
  }
}

/* --- Enigma de matemática (sorteado do banco) --- */
function openMath3Modal() {
  modalOpenLock = true;
  currentTriggerId = 'console-math';
  const item = drawFromBank('math3_bank');
  window._math3Answer = item.answer;
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text">${item.title}</div>
    <div class="choices">${item.choices.map(c => `<button class="brick choice-btn" onclick="answerMath3(${c}, this)">${c}</button>`).join('')}</div>`);
}

function answerMath3(value, btn) {
  if (value === window._math3Answer) {
    btn.classList.add('right-flash');
    setTimeout(() => {
      renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${t('math3_right')}</div><div class="choices"><button class="brick choice-btn" onclick="closeModal()">${t('continueBtn')}</button></div>`);
      state3.math = true;
      document.getElementById('console-math').classList.add('glow-soft');
    }, 450);
  } else {
    btn.classList.add('wrong-flash');
    document.getElementById('modal-card').querySelector('.modal-text').innerHTML +=
      `<br><span style="color:var(--red-dark, #b82e22)">${t('math3_wrong')}</span>`;
    setTimeout(() => btn.classList.remove('wrong-flash'), 450);
  }
}

/* --- Enigma de anagrama (sorteado do banco) --- */
let anagramLetters = [];
let anagramSelected = null;
let _anagramAnswer = '';

function openAnagramModal() {
  modalOpenLock = true;
  currentTriggerId = 'console-anagram';
  const item = drawFromBank('anagram_bank');
  _anagramAnswer = item.answer;
  anagramLetters = item.scrambled.slice();
  anagramSelected = null;
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.BOOK}" style="width:60px;"></div>
    <div class="modal-text">${t('anagram_title')}<br><small style="opacity:0.7">${item.hint}</small></div>
    <div id="anagram-row" style="display:flex; justify-content:center; gap:10px; margin-bottom:10px;"></div>`);
  renderAnagramRow();
}

function renderAnagramRow() {
  const row = document.getElementById('anagram-row');
  row.innerHTML = anagramLetters.map((letter, i) => `
    <div class="brick choice-btn anagram-letter" data-i="${i}" onclick="clickLetter(${i})"
      style="width:54px; height:54px; display:flex; align-items:center; justify-content:center; font-size:1.6rem; ${anagramSelected === i ? 'background:var(--yellow);' : ''}">${letter}</div>
  `).join('');
}

function clickLetter(i) {
  if (anagramSelected === null) {
    anagramSelected = i;
  } else if (anagramSelected === i) {
    anagramSelected = null;
  } else {
    const tmp = anagramLetters[anagramSelected];
    anagramLetters[anagramSelected] = anagramLetters[i];
    anagramLetters[i] = tmp;
    anagramSelected = null;
  }
  renderAnagramRow();
  if (anagramLetters.join('') === _anagramAnswer) {
    setTimeout(() => {
      renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${t('anagram_right')}</div><div class="choices"><button class="brick choice-btn" onclick="closeModal()">${t('continueBtn')}</button></div>`);
      state3.anagram = true;
      document.getElementById('console-anagram').classList.add('glow-soft');
    }, 350);
  }
}

/* --- Enigma liga-pontos Sala 3 (forma sorteada do banco) --- */
let currentStarPoints = [];

function openStarPuzzle() {
  modalOpenLock = true;
  currentTriggerId = 'console-star';
  const item = drawFromBank('star_bank');
  currentStarPoints = item.points;
  window._starDoneMsg = item.done;
  let html = `<div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text">${t('star_title')}</div>
    <div style="position:relative; width:260px; height:240px; margin:0 auto;">
      <canvas id="star-canvas" width="260" height="240" style="position:absolute;top:0;left:0;"></canvas>`;
  currentStarPoints.forEach((p, i) => {
    html += `<div class="dot" id="star-dot-${i}" style="left:${p.x}%; top:${p.y}%; width:26px; height:26px; font-size:0.75rem;" onclick="clickStarDot(${i})">${i + 1}</div>`;
  });
  html += `</div>`;
  renderModal(html);
  window._starExpected = 0;
  drawStarCanvas();
}

function drawStarCanvas(done) {
  const canvas = document.getElementById('star-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#2B2421'; ctx.lineWidth = 4; ctx.lineCap = 'round';
  const n = window._starExpected;
  if (n > 0) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const p = currentStarPoints[i];
      const x = p.x / 100 * canvas.width, y = p.y / 100 * canvas.height;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    if (done) { const p0 = currentStarPoints[0]; ctx.lineTo(p0.x / 100 * canvas.width, p0.y / 100 * canvas.height); }
    ctx.stroke();
  }
}

function clickStarDot(i) {
  if (i === window._starExpected) {
    document.getElementById('star-dot-' + i).classList.add('done');
    window._starExpected++;
    const done = window._starExpected === currentStarPoints.length;
    drawStarCanvas(done);
    if (done) {
      setTimeout(() => {
        renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${window._starDoneMsg}</div><div class="choices"><button class="brick choice-btn" onclick="closeModal()">${t('continueBtn')}</button></div>`);
        state3.star = true;
        document.getElementById('console-star').classList.add('glow-soft');
      }, 500);
    }
  } else {
    document.getElementById('star-dot-' + i).classList.add('shake');
    setTimeout(() => document.getElementById('star-dot-' + i).classList.remove('shake'), 350);
  }
}

/* --- Diálogo com o dragão (empatia) --- */
function openDragonEvent() {
  modalOpenLock = true;
  currentTriggerId = 'dragon';
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.DRAGON}" style="width:80px;"></div>
    <div class="modal-text">${t('dragon_intro')}<br><br>${t('dragon_text')}</div>
    <div class="choices">
      <button class="brick choice-btn" style="background:var(--green);" onclick="dragonChoice(true)">${t('dragon_choice1')}</button>
      <button class="brick choice-btn" style="background:var(--red);"   onclick="dragonChoice(false)">${t('dragon_choice2')}</button>
    </div>`);
}

function dragonChoice(correct) {
  if (correct) {
    state3.dragon = true;
    renderModal(`<div class="modal-mascot"><img src="${ASSETS.DRAGON}" style="width:80px;"></div><div class="modal-text">${t('dragon_right')}</div><div class="choices"><button class="brick choice-btn" onclick="finishRoom3()">${t('continueBtn')}</button></div>`);
  } else {
    renderModal(`<div class="modal-mascot"><img src="${ASSETS.DRAGON}" style="width:80px;"></div><div class="modal-text">${t('dragon_wrong')}</div><div class="choices"><button class="brick choice-btn" onclick="openDragonEvent()">${t('continueBtn')}</button></div>`);
  }
}

function finishRoom3() {
  closeModal();
  state3.keyFound = true;
  document.getElementById('door3').style.backgroundImage = `url(${ASSETS.DOOR3_OPEN})`;
  setInstruction(t('r3_keyFound'));
}
