/* ============================================================
   UI — barra de instrução, modal, HUD
   ============================================================ */

let lastInstructionMsg = '';

function setInstruction(msg) {
  lastInstructionMsg = msg;
  document.getElementById('instruction-text').textContent = msg;
  document.getElementById('instruction-bar').classList.remove('hidden');
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
