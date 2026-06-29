/* ============================================================
   AI Draw Puzzle — Enigma de desenho livre com TensorFlow.js
   Modelo treinado no Google Teachable Machine (Image Project).
   ============================================================

   COMO USAR:
   ----------
   1. Acesse https://teachablemachine.withgoogle.com/
   2. Crie um "Image Project" → "Standard image model"
   3. Crie classes com os mesmos nomes de AI_SHAPE_CLASSES abaixo
      (ex: "circle", "triangle", "square", "star", "hexagon")
   4. Desenhe ~50 exemplos por classe usando o canvas do site
   5. Clique em "Train Model" e depois "Export Model"
   6. Escolha "Tensorflow.js" → "Download" (não "Upload")
   7. Extraia o zip: você terá model.json, metadata.json e um ou
      mais arquivos .bin
   8. Coloque TODOS esses arquivos na pasta /model/ ao lado do index.html

   ADICIONAR NOVAS FORMAS:
   -----------------------
   - Adicione a nova classe no Teachable Machine, retreine e re-exporte
   - Adicione o nome (em inglês, minúsculo) em AI_SHAPE_CLASSES abaixo
   - Adicione entradas em SHAPE_LABELS e SHAPE_EXAMPLE_SVG abaixo
   - Adicione o mapeamento em _SHAPE_NAME_TO_CLASS em room3.js
   ============================================================ */

/* Caminho do modelo exportado do Teachable Machine (relativo ao index.html) */
const AI_MODEL_PATH = './model/model.json';

/* Classes que o modelo conhece — devem bater EXATAMENTE com os nomes
   definidos no Teachable Machine (case-sensitive). */
const AI_SHAPE_CLASSES = ['circle', 'triangle', 'square', 'star', 'hexagon'];

/* Labels amigáveis por idioma */
const SHAPE_LABELS = {
  pt: { circle: 'CÍRCULO', triangle: 'TRIÂNGULO', square: 'QUADRADO', star: 'ESTRELA', hexagon: 'HEXÁGONO' },
  en: { circle: 'CIRCLE',  triangle: 'TRIANGLE',  square: 'SQUARE',   star: 'STAR',    hexagon: 'HEXAGON'  }
};

/*
   Pontos guia para o modo "ligar os pontos" de cada forma.
   Coordenadas em porcentagem do canvas (220×200).
   A última linha fecha automaticamente de volta ao ponto 0.
*/
const SHAPE_DOT_POINTS = {
  circle:   [{x:50,y:5},{x:82,y:15},{x:96,y:45},{x:88,y:77},{x:62,y:93},{x:38,y:93},{x:12,y:77},{x:4,y:45},{x:18,y:15}],
  triangle: [{x:50,y:6},{x:93,y:91},{x:7,y:91}],
  square:   [{x:10,y:10},{x:90,y:10},{x:90,y:90},{x:10,y:90}],
  star:     [{x:50,y:5},{x:61,y:35},{x:93,y:35},{x:68,y:57},{x:79,y:90},{x:50,y:70},{x:21,y:90},{x:32,y:57},{x:7,y:35},{x:39,y:35}],
  hexagon:  [{x:50,y:5},{x:90,y:27},{x:90,y:73},{x:50,y:95},{x:10,y:73},{x:10,y:27}]
};

/* Estado do modo liga-pontos sobreposto ao canvas de desenho livre */
let _dotMode = false;
let _dotExpected = 0;

/*
   SVG inline de exemplo para cada forma.
   A criança vê antes de desenhar. Estilo lousa: traço branco sobre fundo escuro.
   Todos têm viewBox="0 0 100 100" e stroke-width proporcional.
*/
const SHAPE_EXAMPLE_SVG = {
  circle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="38" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round"/>
  </svg>`,

  triangle: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,8 94,88 6,88" fill="none" stroke="#fff" stroke-width="8"
      stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`,

  square: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect x="12" y="12" width="76" height="76" fill="none" stroke="#fff" stroke-width="8"
      stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`,

  star: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
      fill="none" stroke="#fff" stroke-width="7"
      stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`,

  hexagon: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 93,27 93,73 50,95 7,73 7,27"
      fill="none" stroke="#fff" stroke-width="8"
      stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`
};

/* ─── Cache do modelo ────────────────────────────────────── */
let _aiModel      = null;
let _aiModelFailed = false;

/* Guarda o callback de sucesso atual para ser chamado pelos handlers */
let _currentOnSuccess = null;
/* Guarda a forma esperada atual para submitDrawing acessar sem parâmetro via onclick */
let _currentExpectedShape = null;

async function loadAIModel() {
  if (_aiModel) return _aiModel;
  if (_aiModelFailed) return null;
  try {
    const metadataPath = AI_MODEL_PATH.replace('model.json', 'metadata.json');
    _aiModel = await tmImage.load(AI_MODEL_PATH, metadataPath);
    return _aiModel;
  } catch (err) {
    console.warn('[AI Puzzle] Modelo não encontrado ou falhou ao carregar:', err);
    _aiModelFailed = true;
    return null;
  }
}

async function classifyDrawing(canvas) {
  if (!_aiModel) return null;
  try {
    const predictions = await _aiModel.predict(canvas);
    let best = predictions[0];
    for (const p of predictions) {
      if (p.probability > best.probability) best = p;
    }
    return best.className;
  } catch (err) {
    console.warn('[AI Puzzle] Erro na classificação:', err);
    return null;
  }
}

/* ============================================================
   openDrawShapePuzzle(expectedShape, onSuccess)
   ============================================================ */
async function openDrawShapePuzzle(expectedShape, onSuccess) {
  modalOpenLock = true;
  currentTriggerId = 'console-star';

  /* Guarda em variáveis de módulo — evita serializar funções em onclick */
  _currentExpectedShape = expectedShape;
  _currentOnSuccess     = onSuccess;

  /* Tela de carregamento */
  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text">
      ${lang === 'pt' ? '🤖 PREPARANDO A IA...' : '🤖 LOADING AI...'}
    </div>`);

  const model = await loadAIModel();

  if (!model) {
    console.info('[AI Puzzle] Usando fallback (liga-pontos).');
    openStarPuzzleFallback(onSuccess);
    return;
  }

  _renderDrawCanvas(expectedShape);
}

/* ─── Renderiza o modal de desenho ──────────────────────────
   Layout:
     [mascot]
     Instrução + label da forma
     [exemplo SVG]  |  [canvas de desenho]
     feedback
     [LIMPAR]  [PRONTO!]
   ─────────────────────────────────────────────────────────── */
function _renderDrawCanvas(expectedShape) {
  _dotMode     = false;
  _dotExpected = 0;
  const labels = SHAPE_LABELS[lang] || SHAPE_LABELS.en;
  const label  = labels[expectedShape] || expectedShape.toUpperCase();
  const svg    = SHAPE_EXAMPLE_SVG[expectedShape] || '';

  const instruction = lang === 'pt'
    ? `DESENHE UM(A) <strong>${label}</strong> NO QUADRO:`
    : `DRAW A <strong>${label}</strong> IN THE BOX:`;
  const exampleCaption = lang === 'pt' ? 'EXEMPLO' : 'EXAMPLE';
  const clearLbl   = lang === 'pt' ? 'LIMPAR'       : 'CLEAR';
  const doneLbl    = lang === 'pt' ? 'PRONTO!'      : 'DONE!';
  const dotsLbl    = lang === 'pt' ? '🔵 LIGAR PONTOS' : '🔵 CONNECT DOTS';
  const freeLbl    = lang === 'pt' ? '✏️ DESENHO LIVRE' : '✏️ FREE DRAW';

  const hasDots = !!SHAPE_DOT_POINTS[expectedShape];

  renderModal(`
    <div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text" style="margin-bottom:8px;">${instruction}</div>

    <div style="display:flex; align-items:center; justify-content:center; gap:12px; flex-wrap:wrap;">

      <!-- Exemplo da forma -->
      <div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
        <div style="
          width:90px; height:90px;
          background:#2B2421;
          border-radius:10px;
          padding:8px;
          box-sizing:border-box;
          display:flex; align-items:center; justify-content:center;">
          ${svg}
        </div>
        <span style="font-size:0.65rem; opacity:0.6; letter-spacing:.05em;">${exampleCaption}</span>
      </div>

      <!-- Canvas + overlay de pontos -->
      <div style="position:relative; display:inline-block;">
        <canvas id="draw-canvas" width="220" height="200"
          style="background:#fff; border:3px solid #2B2421; border-radius:12px;
                 touch-action:none; cursor:crosshair; display:block;"></canvas>
        <div id="dot-overlay"
          style="position:absolute; top:0; left:0; width:220px; height:200px;
                 border-radius:12px; pointer-events:none; display:none;"></div>
      </div>
    </div>

    <div id="ai-feedback"
      style="min-height:22px; font-size:0.8rem; color:var(--red-dark,#b82e22);
             text-align:center; margin-top:6px;"></div>

    <div class="choices" style="margin-top:4px;">
      <button class="brick choice-btn" style="background:var(--yellow);"
        onclick="clearDrawCanvas()">${clearLbl}</button>
      ${hasDots ? `<button class="brick choice-btn" id="dots-toggle-btn"
        style="background:#4a90d9; font-size:0.75rem;"
        onclick="toggleDotMode()">${dotsLbl}</button>` : ''}
      <button class="brick choice-btn" id="ai-done-btn"
        onclick="submitDrawing()">${doneLbl}</button>
    </div>`);

  _attachDrawListeners();
}

/* Anexa eventos de mouse e touch ao canvas de desenho */
function _attachDrawListeners() {
  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth   = 3;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  let drawing = false;

  function pos(e) {
    const r   = canvas.getBoundingClientRect();
    const src = e.touches ? e.touches[0] : e;
    return {
      x: (src.clientX - r.left) * (canvas.width  / r.width),
      y: (src.clientY - r.top)  * (canvas.height / r.height)
    };
  }
  function start(e) { e.preventDefault(); drawing = true; const {x,y} = pos(e); ctx.beginPath(); ctx.moveTo(x,y); }
  function move(e)  { e.preventDefault(); if (!drawing) return; const {x,y} = pos(e); ctx.lineTo(x,y); ctx.stroke(); }
  function end(e)   { e.preventDefault(); drawing = false; }

  canvas.addEventListener('mousedown',  start, { passive: false });
  canvas.addEventListener('mousemove',  move,  { passive: false });
  canvas.addEventListener('mouseup',    end,   { passive: false });
  canvas.addEventListener('mouseleave', end,   { passive: false });
  canvas.addEventListener('touchstart', start, { passive: false });
  canvas.addEventListener('touchmove',  move,  { passive: false });
  canvas.addEventListener('touchend',   end,   { passive: false });
}

/* Limpa o canvas sem fechar o modal */
function clearDrawCanvas() {
  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (_dotMode) _redrawDotLines(ctx);
  const fb = document.getElementById('ai-feedback');
  if (fb) fb.textContent = '';
  if (_dotMode) {
    _dotExpected = 0;
    _renderDotOverlay();
  }
}

/* ─── Modo liga-pontos sobreposto ─────────────────────────── */

function toggleDotMode() {
  _dotMode = !_dotMode;
  _dotExpected = 0;

  const canvas  = document.getElementById('draw-canvas');
  const overlay = document.getElementById('dot-overlay');
  const btn     = document.getElementById('dots-toggle-btn');
  if (!canvas || !overlay) return;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (_dotMode) {
    overlay.style.display = 'block';
    overlay.style.pointerEvents = 'auto';
    canvas.style.cursor = 'default';
    if (btn) {
      btn.textContent = lang === 'pt' ? '✏️ DESENHO LIVRE' : '✏️ FREE DRAW';
      btn.style.background = '#888';
    }
    _renderDotOverlay();
  } else {
    overlay.style.display = 'none';
    overlay.style.pointerEvents = 'none';
    canvas.style.cursor = 'crosshair';
    if (btn) {
      btn.textContent = lang === 'pt' ? '🔵 LIGAR PONTOS' : '🔵 CONNECT DOTS';
      btn.style.background = '#4a90d9';
    }
    _attachDrawListeners();
  }
}

function _renderDotOverlay() {
  const overlay = document.getElementById('dot-overlay');
  const canvas  = document.getElementById('draw-canvas');
  if (!overlay || !canvas) return;

  const pts = SHAPE_DOT_POINTS[_currentExpectedShape];
  if (!pts) return;

  const W = canvas.width;
  const H = canvas.height;
  const DOT_R = 14;

  overlay.innerHTML = pts.map((p, i) => {
    const x = p.x / 100 * W;
    const y = p.y / 100 * H;
    const done = i < _dotExpected;
    const next = i === _dotExpected;
    const bg   = done ? '#4CAF50' : next ? '#4a90d9' : '#ccc';
    const color = done || next ? '#fff' : '#555';
    const scale = next ? 'scale(1.2)' : 'scale(1)';
    return `<div onclick="_clickDot(${i})"
      style="position:absolute;
             left:${x - DOT_R}px; top:${y - DOT_R}px;
             width:${DOT_R*2}px; height:${DOT_R*2}px;
             border-radius:50%;
             background:${bg};
             color:${color};
             font-size:0.7rem;
             font-weight:bold;
             display:flex; align-items:center; justify-content:center;
             cursor:${done ? 'default' : 'pointer'};
             transform:${scale};
             transition:transform 0.15s, background 0.15s;
             box-shadow:0 2px 6px rgba(0,0,0,0.3);
             user-select:none;
             border: 2px solid rgba(255,255,255,0.7);">${i + 1}</div>`;
  }).join('');
}

function _clickDot(i) {
  if (!_dotMode) return;
  if (i !== _dotExpected) {
    /* shake visual no dot errado */
    const dots = document.getElementById('dot-overlay').children;
    if (dots[i]) {
      dots[i].style.transform = 'scale(1.1) translateX(4px)';
      setTimeout(() => { if (dots[i]) dots[i].style.transform = 'scale(1)'; }, 200);
    }
    return;
  }

  const canvas = document.getElementById('draw-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const pts  = SHAPE_DOT_POINTS[_currentExpectedShape];

  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth   = 3;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';

  if (_dotExpected === 0) {
    ctx.beginPath();
    ctx.moveTo(pts[0].x / 100 * canvas.width, pts[0].y / 100 * canvas.height);
  } else {
    const prev = pts[_dotExpected - 1];
    const curr = pts[_dotExpected];
    ctx.beginPath();
    ctx.moveTo(prev.x / 100 * canvas.width, prev.y / 100 * canvas.height);
    ctx.lineTo(curr.x / 100 * canvas.width, curr.y / 100 * canvas.height);
    ctx.stroke();
  }

  _dotExpected++;

  if (_dotExpected === pts.length) {
    /* Fecha o polígono de volta ao ponto 0 */
    const last  = pts[pts.length - 1];
    const first = pts[0];
    ctx.beginPath();
    ctx.moveTo(last.x  / 100 * canvas.width, last.y  / 100 * canvas.height);
    ctx.lineTo(first.x / 100 * canvas.width, first.y / 100 * canvas.height);
    ctx.stroke();

    /* Esconde overlay e submete */
    const overlay = document.getElementById('dot-overlay');
    if (overlay) overlay.style.display = 'none';
    setTimeout(() => submitDrawing(), 400);
    return;
  }

  _renderDotOverlay();
}

/* Redesenha as linhas já conectadas sobre o canvas (usado pelo LIMPAR no modo dot) */
function _redrawDotLines(ctx) {
  const pts = SHAPE_DOT_POINTS[_currentExpectedShape];
  if (!pts || _dotExpected === 0) return;
  const canvas = ctx.canvas;
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth   = 3;
  ctx.lineCap     = 'round';
  ctx.lineJoin    = 'round';
  ctx.beginPath();
  ctx.moveTo(pts[0].x / 100 * canvas.width, pts[0].y / 100 * canvas.height);
  for (let i = 1; i < _dotExpected; i++) {
    ctx.lineTo(pts[i].x / 100 * canvas.width, pts[i].y / 100 * canvas.height);
  }
  ctx.stroke();
}

/* ─── Submissão e classificação ─────────────────────────── */

/* Chamado pelo onclick do botão PRONTO! — sem parâmetros.
   Usa _currentExpectedShape e _currentOnSuccess (variáveis de módulo). */
async function submitDrawing() {
  const canvas       = document.getElementById('draw-canvas');
  const doneBtn      = document.getElementById('ai-done-btn');
  const fb           = document.getElementById('ai-feedback');
  const expectedShape = _currentExpectedShape;
  const onSuccess    = _currentOnSuccess;
  const labels       = SHAPE_LABELS[lang] || SHAPE_LABELS.en;

  if (!canvas || !expectedShape) return;

  if (doneBtn) doneBtn.disabled = true;

  /* Garante que a criança desenhou algo antes de classificar */
  const pixels    = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
  const hasPixels = pixels.some((_, i) => i % 4 === 3 && pixels[i] > 0);
  if (!hasPixels) {
    if (fb) fb.textContent = lang === 'pt' ? '✏️ DESENHE ALGO PRIMEIRO!' : '✏️ DRAW SOMETHING FIRST!';
    if (doneBtn) doneBtn.disabled = false;
    return;
  }

  if (fb) fb.textContent = lang === 'pt' ? '🤔 ANALISANDO...' : '🤔 ANALYZING...';

  const predicted = await classifyDrawing(canvas);

  if (predicted === null) {
    openStarPuzzleFallback(onSuccess);
    return;
  }

  if (predicted === expectedShape) {
    /* ✅ Acerto */
    const label = labels[expectedShape] || expectedShape.toUpperCase();
    const msg   = lang === 'pt'
      ? `INCRÍVEL! A IA RECONHECEU SUA ${label}! 🎉`
      : `AMAZING! THE AI RECOGNIZED YOUR ${label}! 🎉`;
    const next  = lang === 'pt'
      ? 'ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.'
      : 'PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.';
    renderModal(`
      <div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div>
      <div class="modal-text">${msg}<br><br>${next}</div>
      <div class="choices">
        <button class="brick choice-btn" onclick="_aiPuzzleSuccess()">${t('continueBtn')}</button>
      </div>`);
  } else {
    /* ❌ Erro gentil — canvas permanece para redesenhar */
    const wrongLabel = labels[predicted]      || predicted.toUpperCase();
    const rightLabel = labels[expectedShape]  || expectedShape.toUpperCase();
    if (fb) {
      fb.textContent = lang === 'pt'
        ? `QUASE! A IA VIU UM(A) ${wrongLabel}... TENTE DESENHAR UM(A) ${rightLabel} MAIS DEVAGAR! 😊`
        : `ALMOST! THE AI SAW A ${wrongLabel}... TRY DRAWING A ${rightLabel} MORE SLOWLY! 😊`;
    }
    if (doneBtn) doneBtn.disabled = false;
  }
}

/* Chamado pelo botão CONTINUAR na tela de acerto */
function _aiPuzzleSuccess() {
  if (_currentOnSuccess) _currentOnSuccess();
  closeModal();
}

/* ============================================================
   FALLBACK — liga-pontos numerado (quando modelo não carrega)
   ============================================================ */
function openStarPuzzleFallback(onSuccess) {
  currentTriggerId  = 'console-star';
  _currentOnSuccess = onSuccess;

  const item = drawFromBank('star_bank');
  currentStarPoints        = item.points;
  window._starDoneMsg      = item.done;

  let html = `
    <div class="modal-mascot"><img src="${ASSETS.GEAR}" style="width:60px;"></div>
    <div class="modal-text">${t('star_title')}</div>
    <div style="position:relative; width:260px; height:240px; margin:0 auto;">
      <canvas id="star-canvas" width="260" height="240"
        style="position:absolute;top:0;left:0;"></canvas>`;
  currentStarPoints.forEach((p, i) => {
    html += `<div class="dot" id="star-dot-${i}"
      style="left:${p.x}%; top:${p.y}%; width:26px; height:26px; font-size:0.75rem;"
      onclick="clickStarDotFB(${i})">${i + 1}</div>`;
  });
  html += `</div>`;
  renderModal(html);
  window._starExpected = 0;
  drawStarCanvasFB();
}

function drawStarCanvasFB(done) {
  const canvas = document.getElementById('star-canvas');
  if (!canvas) return;
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
    if (done) {
      const p0 = currentStarPoints[0];
      ctx.lineTo(p0.x / 100 * canvas.width, p0.y / 100 * canvas.height);
    }
    ctx.stroke();
  }
}

function clickStarDotFB(i) {
  if (i === window._starExpected) {
    document.getElementById('star-dot-' + i).classList.add('done');
    window._starExpected++;
    const done = window._starExpected === currentStarPoints.length;
    drawStarCanvasFB(done);
    if (done) {
      setTimeout(() => {
        renderModal(`
          <div class="modal-mascot"><img src="${ASSETS.LUMI}" style="width:80px;"></div>
          <div class="modal-text">${window._starDoneMsg}</div>
          <div class="choices">
            <button class="brick choice-btn" onclick="_aiPuzzleSuccess()">${t('continueBtn')}</button>
          </div>`);
      }, 500);
    }
  } else {
    document.getElementById('star-dot-' + i).classList.add('shake');
    setTimeout(() => document.getElementById('star-dot-' + i).classList.remove('shake'), 350);
  }
}
