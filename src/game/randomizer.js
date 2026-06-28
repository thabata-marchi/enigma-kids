/* ============================================================
   Randomizer — sorteio sem repetição de variações de enigmas
   Cada banco tem 8–10 itens. O índice sorteado é sempre o mesmo
   em PT e EN porque o sorteio ocorre antes de consultar STR[lang].
   ============================================================ */

// Último índice sorteado por enigma (evita repetição consecutiva)
const _lastPick = {};

/**
 * Sorteia um índice dentro de [0, length) diferente do último sorteado
 * para a chave `key`. Armazena o resultado para a próxima chamada.
 */
function pickRandom(key, length) {
  let idx;
  do {
    idx = Math.floor(Math.random() * length);
  } while (length > 1 && idx === _lastPick[key]);
  _lastPick[key] = idx;
  return idx;
}

/**
 * Retorna um item aleatório do banco STR[lang][bankKey],
 * garantindo que não repita o índice anterior para aquele enigma.
 * O índice fica em _lastPick[bankKey] para consultas subsequentes.
 */
function drawFromBank(bankKey) {
  const bank = STR[lang][bankKey];
  const idx  = pickRandom(bankKey, bank.length);
  return bank[idx];
}
