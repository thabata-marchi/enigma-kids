/* ============================================================
   Sala 1 — A Árvore Mágica
   Enigmas: geometria (retângulo) + subtração (8−3=5)
   ============================================================ */

let state1 = { rectFound: false, mathSolved: false, keyFound: false, doorReached: false };

function checkInteractionsRoom1() {
  if (modalOpenLock) return;
  if (suppressedId && !near(suppressedId, 90)) suppressedId = null;

  if (!state1.mathSolved && suppressedId !== 'obj-rect' && near('obj-rect')) {
    document.getElementById('obj-rect').classList.add('glow');
    openMathModal();
    return;
  }
  if (state1.mathSolved && !state1.keyFound && near('obj-circle')) {
    state1.keyFound = true;
    document.getElementById('obj-circle').classList.add('glow');
    setInstruction(t('keyFound'));
    return;
  }
  if (state1.keyFound && !state1.doorReached && near('door1', 80)) {
    state1.doorReached = true;
    setInstruction(t('doorReached1'));
    setTimeout(enterRoom2, 1200);
  }
}

function openMathModal() {
  modalOpenLock = true;
  currentTriggerId = 'obj-rect';
  const item = drawFromBank('math1_bank');
  // Guarda a resposta correta para que answerMath possa verificá-la
  // sem depender de STR[lang] a cada clique (o idioma pode mudar)
  window._math1Answer = item.answer;
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.LUMI}" alt="LUMI" style="width:80px;"></div>
    <div class="modal-text">${t('foundRect')}<br><br>${item.q}</div>
    <div class="choices">${item.choices.map(c => `<button class="brick choice-btn" onclick="answerMath(${c}, this)">${c}</button>`).join('')}</div>`);
}

function answerMath(value, btn) {
  if (value === window._math1Answer) {
    btn.classList.add('right-flash');
    setTimeout(() => {
      document.getElementById('modal-overlay').classList.remove('active');
      modalOpenLock = false;
      state1.mathSolved = true;
      document.getElementById('label-circle').textContent = t('five');
      setInstruction(t('mathRight'));
    }, 450);
  } else {
    btn.classList.add('wrong-flash');
    setTimeout(() => btn.classList.remove('wrong-flash'), 450);
  }
}

function enterRoom2() {
  suppressedId = null;
  document.getElementById('world-room1').classList.remove('active');
  document.getElementById('world-room2').classList.add('active');
  document.getElementById('world-room2').appendChild(document.getElementById('player'));
  currentWorldId = 'world-room2';
  player.x = 60;
  player.y = 450;
  document.getElementById('room-label').textContent = t('room2Label');
  setInstruction(t('r2_intro'));
  document.getElementById('label-dots').textContent    = t('label_dots');
  document.getElementById('label-emoji').textContent   = t('label_emoji');
  document.getElementById('label-stranger').textContent = t('label_stranger');
}
