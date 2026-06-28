# Architecture — Enigma Kids

## Overview

Enigma Kids is a 2D educational game for children that runs entirely in the browser,
with no backend, no build step, and no installable dependencies.

## Folder structure

```
Enigma Kids/
├── index.html              — complete self-contained game (primary deliverable)
├── model/                  — TensorFlow.js model (Teachable Machine export)
│   ├── model.json          — model architecture + weights index
│   ├── weights.bin         — trained weights (~1.7 MB)
│   ├── metadata.json       — class names and Teachable Machine metadata
│   └── README.md           — retraining and export instructions
├── imagens/                — PNG sprite source files
│   ├── personagem.png
│   ├── dragao.png
│   ├── portas.png
│   ├── chao.png
│   └── livro-magico.png
├── src/
│   ├── game/
│   │   ├── ai-puzzle.js    — TensorFlow.js integration, draw canvas, fallback logic
│   │   ├── engine.js       — game loop, camera, AABB collision
│   │   ├── main.js         — entry point, language selection
│   │   ├── ui.js           — renderModal(), showHint(), setInstruction()
│   │   ├── randomizer.js   — puzzle bank randomization
│   │   ├── assets.js       — base64 image registry (ASSETS object)
│   │   └── rooms/
│   │       ├── room1.js    — Room 1: math + shape identification
│   │       ├── room2.js    — Room 2: connect-dots + English vocab + online safety
│   │       └── room3.js    — Room 3: multiplication + anagram + AI draw puzzle
│   ├── i18n/strings.js     — all PT/EN game text (STR object)
│   └── styles/main.css     — design tokens and visual components
├── assets/                 — future exports of separate image files
└── .agents/rules/          — project rules and standards for agents and devs
    ├── architecture.md     — this file
    ├── stack.md            — technologies used
    ├── code-standards.md   — coding conventions
    └── security.md         — security guidelines
```

## System layers

### 1. Presentation (CSS + HTML)
- Design tokens as CSS variables (`:root`)
- Absolute positional layout for the 2D world
- z-index system by layer (world → HUD → modal → screens)

### 2. Data (plain JS)
- `ASSETS`: base64 images — loaded once, no network calls
- `STR`: i18n strings in PT and EN — all in-game text

### 3. Game engine (plain JS)
- Main loop via `requestAnimationFrame` (`loop()`)
- Character movement with AABB collision detection
- Camera that follows the character (`updateCamera()`)
- Input: keyboard (arrow keys / WASD) + touch joystick

### 4. Game state
- Per-room state objects: `state1`, `state2`, `state3`
- Linear progression: Room 1 → Room 2 → Room 3 → Victory screen
- No persistence (no localStorage, no backend) — single session

### 5. AI layer (`ai-puzzle.js`)
- Loads the TensorFlow.js model from `model/model.json` on first use (lazy)
- `loadAIModel()` — async, cached; sets `_aiModelFailed` on error
- `classifyDrawing(canvas)` — returns the predicted class name or `null`
- `openDrawShapePuzzle(expectedShape, onSuccess)` — entry point for Room 3 puzzle
- `submitDrawing()` — reads the canvas, calls `classifyDrawing`, shows result
- On load failure or `null` prediction: falls back to `openStarPuzzleFallback()` (connect-the-dots)
- Connect-dots hint mode (`toggleDotMode`) overlays numbered dots on the same canvas

### 6. Puzzles (per room)
| Room | Puzzles |
|---|---|
| 1 — The Magic Tree | Identify rectangle, math operation (simple subtraction), find numbered object |
| 2 — The Inventor's Lab | Connect-the-dots (geometric shape), English A1 vocabulary (emoji→word), online safety (strangers) |
| 3 — The Dragon's Tower | Multiplication (groups), English A1 anagram, AI draw puzzle (TensorFlow.js), empathy dilemma |

## Screen flow

```
Start Screen → [choose PT/EN] → Room 1 → Room 2 → Room 3 → Victory Screen
```

## Design decisions

**Why a single HTML file?**
Allows sharing the game as a file with no server, CDN, or installation.
Ideal for educational settings where teachers distribute the file directly.

**Why base64 images?**
Avoids extra network requests and lets the file work offline.
Trade-off: larger file size (~920 KB), but zero external asset dependencies.

**Why no JS framework?**
The game is small and closed in scope. Adding React/Vue would introduce complexity
and a build step with no real benefit at the current size.

**Why version the model files in the repo?**
The model is ~1.7 MB total and required for the AI puzzle to work offline.
If the model grows significantly, move it to external hosting and update
`AI_MODEL_PATH` in `ai-puzzle.js`.

**Why a fallback for the AI puzzle?**
The model may fail to load in offline or restrictive environments.
The fallback (numbered connect-the-dots) keeps the game fully playable
without requiring the AI layer to be present.
