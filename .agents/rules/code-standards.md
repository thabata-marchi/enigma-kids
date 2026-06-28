# Padrões de Código — Enigma Kids

## Princípios gerais
- **Código limpo**: nomes expressivos, sem abreviações crípticas
- **SOLID adaptado para JS/DOM**: responsabilidade única por função, funções abertas para extensão
- **Sem over-engineering**: o jogo é um HTML único; não adicionar camadas desnecessárias enquanto isso for adequado
- **Sem comentários óbvios**: comentar apenas o *porquê*, nunca o *o quê*

## Organização do código (arquivo atual)

```
index.html
├── <style>          — tokens de design (variáveis CSS) e componentes visuais
├── <body>           — estrutura HTML das salas e UI
└── <script>
    ├── ASSETS       — imagens base64 (dados puros, sem lógica)
    ├── STR          — strings i18n (dados puros, sem lógica)
    ├── t(key)       — resolução de idioma
    ├── Estado       — variáveis de estado por sala (state1, state2, state3)
    ├── Motor        — loop(), updateCamera(), getObstacles()
    ├── Interações   — checkInteractionsRoom*(), open*Modal(), answer*()
    ├── UI           — renderModal(), showHint(), setInstruction()
    └── Input        — teclado, joystick touch
```

## Nomenclatura
| Contexto | Convenção |
|---|---|
| Funções | camelCase (`openMathModal`, `answerEmoji`) |
| Constantes globais | UPPER_SNAKE_CASE (`WORLD_W`, `ASSETS`) |
| Variáveis de estado | camelCase com prefixo descritivo (`state1`, `joyVec`) |
| IDs HTML | kebab-case (`modal-overlay`, `joy-stick`) |
| Classes CSS | kebab-case (`.modal-card`, `.hud-round-btn`) |

## CSS
- Usar variáveis CSS (`--blue`, `--red`, `--yellow`) para todas as cores — nunca valores literais
- Layout posicional via `position:absolute` (mundo de jogo 2D)
- `z-index` por camadas: mundo (0) → objetos (10) → HUD (30) → joystick (40) → modal (50) → telas (60)

## Funções
- Uma função = uma responsabilidade
- Funções de interação com sala: `checkInteractionsRoom{N}` para detecção, funções `open*` para UI
- Funções de resposta: `answer*(value, btn)` — recebem o valor e o elemento para feedback visual
- Não misturar lógica de estado com lógica de renderização

## Estado de jogo
- Estado por sala em objetos separados: `state1`, `state2`, `state3`
- Nunca mutar estado de outra sala que não a ativa
- Transição de sala via `enterRoom{N}()` — função responsável por reset e setup

## Code Smells a evitar
- `innerHTML` com dados do usuário sem sanitização (usar apenas com strings internas controladas)
- Funções com mais de ~40 linhas sem justificativa
- Seleção de DOM repetida em loop — cachear referências
- Magic numbers sem nome — preferir constante nomeada
