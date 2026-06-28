# Code Standards — Enigma Kids

## General principles
- **Clean code**: expressive names, no cryptic abbreviations
- **SOLID adapted for JS/DOM**: single responsibility per function, functions open for extension
- **No over-engineering**: the game is a single HTML file; do not add unnecessary layers while that holds
- **No obvious comments**: comment only the *why*, never the *what*

## Code organization (current file)

```
index.html
├── <style>          — design tokens (CSS variables) and visual components
├── <body>           — HTML structure for rooms and UI
└── <script>
    ├── ASSETS       — base64 images (pure data, no logic)
    ├── STR          — i18n strings (pure data, no logic)
    ├── t(key)       — language resolution
    ├── State        — per-room state variables (state1, state2, state3)
    ├── Engine       — loop(), updateCamera(), getObstacles()
    ├── Interactions — checkInteractionsRoom*(), open*Modal(), answer*()
    ├── UI           — renderModal(), showHint(), setInstruction()
    └── Input        — keyboard, touch joystick
```

## Naming
| Context | Convention |
|---|---|
| Functions | camelCase (`openMathModal`, `answerEmoji`) |
| Global constants | UPPER_SNAKE_CASE (`WORLD_W`, `ASSETS`) |
| State variables | camelCase with descriptive prefix (`state1`, `joyVec`) |
| HTML IDs | kebab-case (`modal-overlay`, `joy-stick`) |
| CSS classes | kebab-case (`.modal-card`, `.hud-round-btn`) |

## CSS
- Use CSS variables (`--blue`, `--red`, `--yellow`) for all colors — never literal values
- Positional layout via `position:absolute` (2D game world)
- `z-index` by layer: world (0) → objects (10) → HUD (30) → joystick (40) → modal (50) → screens (60)

## Functions
- One function = one responsibility
- Room interaction functions: `checkInteractionsRoom{N}` for detection, `open*` functions for UI
- Answer functions: `answer*(value, btn)` — receive the value and element for visual feedback
- Do not mix state logic with rendering logic

## Game state
- Per-room state in separate objects: `state1`, `state2`, `state3`
- Never mutate the state of a room other than the active one
- Room transition via `enterRoom{N}()` — responsible for reset and setup

## Code smells to avoid
- `innerHTML` with unsanitized user data (use only with controlled internal strings)
- Functions longer than ~40 lines without justification
- Repeated DOM selection inside a loop — cache references
- Magic numbers without a name — prefer named constants
