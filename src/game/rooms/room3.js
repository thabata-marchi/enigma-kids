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
  // A dica vem sempre do banco EN — a palavra é inglesa independente do idioma do jogo
  const hintEN = drawFromBankLang('anagram_bank', 'en').hint;
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.BOOK}" style="width:60px;"></div>
    <div class="modal-text">${t('anagram_title')}<br><small style="opacity:0.7">${hintEN}</small></div>
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

/* --- Enigma 3: desenho livre com IA (fallback: liga-pontos) --- */

/*
   currentStarPoints é mantido aqui pois openStarPuzzleFallback()
   em ai-puzzle.js precisa escrevê-lo antes de ser usado por
   drawStarCanvasFB() / clickStarDotFB().
*/
let currentStarPoints = [];

function openStarPuzzle() {
  /* Escolhe a forma esperada aleatoriamente do banco star_bank.
     Pega apenas o campo `name` traduzido para a chave de classe IA. */
  const shapeKey = _pickAIShape();
  const onSuccess = () => {
    state3.star = true;
    document.getElementById('console-star').classList.add('glow-soft');
  };
  openDrawShapePuzzle(shapeKey, onSuccess, 'console-star');
}

/*
   Mapeia nomes do star_bank (PT/EN) para as classes do modelo IA.
   Se quiser adicionar formas, acrescente entradas aqui e retreine
   o modelo no Teachable Machine com a nova classe.
*/
const _SHAPE_NAME_TO_CLASS = {
  // PT
  'ESTRELA DE 5 PONTAS': 'star', 'TRIÂNGULO': 'triangle', 'PENTÁGONO': 'pentagon',
  'LOSANGO': 'diamond', 'SETA': 'arrow', 'HEXÁGONO': 'hexagon',
  'CRUZ': 'cross', 'CASA': 'house',
  // EN
  '5-POINTED STAR': 'star', 'TRIANGLE': 'triangle', 'PENTAGON': 'pentagon',
  'DIAMOND': 'diamond', 'ARROW': 'arrow', 'HEXAGON': 'hexagon',
  'CROSS': 'cross', 'HOUSE': 'house'
};

/* Subconjunto de formas habilitadas para sorteio. Limitado a círculo e
   quadrado porque são as mais distintas e fáceis de reconhecer com o
   modelo atual. Reintroduzir outras formas após retreinar o modelo. */
const _AI_ENABLED = ['circle', 'square'];

function _pickAIShape() {
  const idx = Math.floor(Math.random() * _AI_ENABLED.length);
  return _AI_ENABLED[idx];
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
