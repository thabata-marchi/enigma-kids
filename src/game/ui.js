/* ============================================================
   UI — barra de instrução, modal, HUD
   ============================================================ */

let lastInstructionMsg = '';
let _instrAutoHideTimer = null;

function setInstruction(msg) {
  lastInstructionMsg = msg;
  document.getElementById('instruction-text').textContent = msg;
  document.getElementById('instruction-bar').classList.remove('hidden');
  /* Cancela timer anterior se houver */
  if (_instrAutoHideTimer) { clearTimeout(_instrAutoHideTimer); _instrAutoHideTimer = null; }
}

/* Chamado pelo engine quando o jogador começa a se mover */
function _startInstructionAutoHide() {
  if (_instrAutoHideTimer) return;
  _instrAutoHideTimer = setTimeout(() => {
    hideInstruction();
    _instrAutoHideTimer = null;
  }, 3000);
}

function hideInstruction() {
  document.getElementById('instruction-bar').classList.add('hidden');
}

function rereadMessage() {
  document.getElementById('instruction-text').textContent = lastInstructionMsg;
  document.getElementById('instruction-bar').classList.remove('hidden');
}

/* --- Modal --- */
let modalOpenLock = false;
let suppressedId = null;
let currentTriggerId = null;

function renderModal(innerHtml) {
  document.getElementById('modal-card').innerHTML =
    `<div class="close-x" onclick="closeModalX()">✕</div>` + innerHtml;
  document.getElementById('modal-overlay').classList.add('active');
}

function closeModalX() {
  if (currentTriggerId) suppressedId = currentTriggerId;
  document.getElementById('modal-overlay').classList.remove('active');
  modalOpenLock = false;
}

function closeModal() {
  document.getElementById('modal-overlay').classList.remove('active');
  modalOpenLock = false;
}
