/* ============================================================
   Sala 2 — O Laboratório do Inventor
   Enigmas: liga-pontos (hexágono), inglês (CAT), segurança online
   ============================================================ */

let state2 = { dots: false, emoji: false, stranger: false, keyFound: false, doorReached: false };

// currentDotPoints é preenchido no momento do sorteio, usado por drawDotsCanvas/clickDot
let currentDotPoints = [];

function checkInteractionsRoom2() {
  if (modalOpenLock) return;
  if (suppressedId && !near(suppressedId, 100)) suppressedId = null;

  if (!state2.dots    && suppressedId !== 'console-dots'  && near('console-dots'))             { openDotsPuzzle();    return; }
  if (state2.dots && !state2.emoji  && suppressedId !== 'console-emoji' && near('console-emoji')) { openEmojiPuzzle();   return; }
  if (state2.dots && state2.emoji && !state2.stranger && suppressedId !== 'stranger' && near('stranger', 130)) { openStrangerEvent(); return; }
  if (state2.keyFound && !state2.doorReached && near('door2', 80)) {
    state2.doorReached = true;
    setInstruction(t('doorReached2'));
    setTimeout(enterRoom3, 1200);
  }
}

/* --- Puzzle liga-pontos (forma sorteada do banco) --- */
function openDotsPuzzle() {
  modalOpenLock = true;
  currentTriggerId = 'console-dots';
  const item = drawFromBank('dots_bank');
  currentDotPoints = item.points;
  window._dotsDoneMsg = item.done;
  let html = `<div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text">${t('dots_title')}</div>
    <div style="position:relative; width:260px; height:240px; margin:0 auto;">
      <canvas id="dots-canvas" width="260" height="240" style="position:absolute;top:0;left:0;"></canvas>`;
  currentDotPoints.forEach((p, i) => {
    html += `<div class="dot" id="dot-${i}" style="left:${p.x}%; top:${p.y}%;" onclick="clickDot(${i})">${i + 1}</div>`;
  });
  html += `</div>`;
  renderModal(html);
  window._dotsExpected = 0;
  drawDotsCanvas();
}

function drawDotsCanvas(done) {
  const canvas = document.getElementById('dots-canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = '#2B2421'; ctx.lineWidth = 5; ctx.lineCap = 'round';
  const n = window._dotsExpected;
  if (n > 0) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const p = currentDotPoints[i];
      const x = p.x / 100 * canvas.width, y = p.y / 100 * canvas.height;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    if (done) { const p0 = currentDotPoints[0]; ctx.lineTo(p0.x / 100 * canvas.width, p0.y / 100 * canvas.height); }
    ctx.stroke();
  }
}

function clickDot(i) {
  if (i === window._dotsExpected) {
    document.getElementById('dot-' + i).classList.add('done');
    window._dotsExpected++;
    const done = window._dotsExpected === currentDotPoints.length;
    drawDotsCanvas(done);
    if (done) {
      setTimeout(() => {
        renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${window._dotsDoneMsg}</div><div class="choices"><button class="brick choice-btn" onclick="closeModal()">${t('continueBtn')}</button></div>`);
        state2.dots = true;
        document.getElementById('console-dots').classList.add('glow-soft');
      }, 500);
    }
  } else {
    document.getElementById('dot-' + i).classList.add('shake');
    setTimeout(() => document.getElementById('dot-' + i).classList.remove('shake'), 350);
  }
}

/* --- Puzzle inglês (emoji → palavra sorteada do banco) --- */
function openEmojiPuzzle() {
  modalOpenLock = true;
  currentTriggerId = 'console-emoji';
  const item = drawFromBank('emoji_bank');
  // Guarda resposta e mensagem de acerto para o callback answerEmoji
  window._emojiAnswer  = item.answer;
  window._emojiRightMsg = item.right;
  renderModal(`
    <div class="modal-mascot">${item.emoji}</div>
    <div class="modal-text">${t('emoji_title')}</div>
    <div class="choices">${item.choices.map(c => `<button class="brick choice-btn" onclick="answerEmoji('${c}', this)">${c}</button>`).join('')}</div>`);
}

function answerEmoji(value, btn) {
  if (value === window._emojiAnswer) {
    btn.classList.add('right-flash');
    setTimeout(() => {
      renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${window._emojiRightMsg}</div><div class="choices"><button class="brick choice-btn" onclick="closeModal()">${t('continueBtn')}</button></div>`);
      state2.emoji = true;
      document.getElementById('console-emoji').classList.add('glow-soft');
    }, 450);
  } else {
    btn.classList.add('wrong-flash');
    setTimeout(() => btn.classList.remove('wrong-flash'), 450);
  }
}

/* --- Evento do estranho (segurança online) --- */
function openStrangerEvent() {
  modalOpenLock = true;
  currentTriggerId = 'stranger';
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.SHADOW}" style="width:110px;"></div>
    <div class="modal-text">${t('talk_prompt')}</div>
    <div class="choices">
      <button class="brick choice-btn" style="background:var(--green);" onclick="openStrangerDialogue()">${t('talk_btn')}</button>
      <button class="brick choice-btn" style="background:var(--green);" onclick="walkAwayStranger()">${t('walk_away_btn')}</button>
    </div>`);
}

function walkAwayStranger() {
  state2.stranger = true;
  document.getElementById('stranger').style.display = 'none';
  spawnGear3();
  renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${t('walk_away_right')}</div><div class="choices"><button class="brick choice-btn" onclick="finishRoom2()">${t('continueBtn')}</button></div>`);
}

function openStrangerDialogue() {
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.SHADOW}" style="width:110px;"></div>
    <div class="modal-text">${t('stranger_intro')}<br><br>${t('stranger_text')}</div>
    <div class="choices">
      <button class="brick choice-btn" style="background:var(--red);"   onclick="strangerChoice(false)">${t('stranger_choice1')}</button>
      <button class="brick choice-btn" style="background:var(--green);" onclick="strangerChoice(true)">${t('stranger_choice2')}</button>
    </div>`);
}

function strangerChoice(correct) {
  if (correct) {
    state2.stranger = true;
    document.getElementById('stranger').style.display = 'none';
    spawnGear3();
    renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${t('stranger_right')}</div><div class="choices"><button class="brick choice-btn" onclick="finishRoom2()">${t('continueBtn')}</button></div>`);
  } else {
    renderModal(`<div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div><div class="modal-text">${t('stranger_wrong')}</div><div class="choices"><button class="brick choice-btn" onclick="openStrangerDialogue()">${t('continueBtn')}</button></div>`);
  }
}

function spawnGear3() {
  const room = document.getElementById('world-room2');
  const strangerEl = document.getElementById('stranger');
  const left = parseInt(strangerEl.style.left), top = parseInt(strangerEl.style.top);
  const gear = document.createElement('img');
  gear.src = ASSETS.GEAR;
  gear.className = 'key-float';
  gear.style.cssText = `position:absolute; left:${left + 20}px; top:${top - 20}px; width:50px;`;
  room.appendChild(gear);
}

function finishRoom2() {
  closeModal();
  state2.keyFound = true;
  setInstruction(t('r2_keyFound'));
}

/* --- Transição para Sala 3 --- */
function enterRoom3() {
  suppressedId = null;
  document.getElementById('world-room2').classList.remove('active');
  document.getElementById('world-room3').classList.add('active');
  document.getElementById('world-room3').appendChild(document.getElementById('player'));
  currentWorldId = 'world-room3';
  player.x = 60;
  player.y = 450;
  document.getElementById('room-label').textContent = t('room3Label');
  setInstruction(t('r3_intro'));
  document.getElementById('label-math3').textContent   = t('label_math3');
  document.getElementById('label-anagram').textContent = t('label_anagram');
  document.getElementById('label-star').textContent    = t('label_star');
}
