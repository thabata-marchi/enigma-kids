# Tech Stack — Enigma Kids

## Runtime
- **Platform**: Browser (HTML5)
- **Delivery format**: Single self-contained HTML file (`index.html`)
- **No build step**: no bundler, transpiler, or server required

## Frontend
| Layer | Technology |
|---|---|
| Structure | Semantic HTML5 |
| Styles | Inline CSS3 (`<style>`) with CSS Custom Properties (variables) |
| Logic | Inline ES6+ JavaScript (`<script>`) — no frameworks |
| Font | Google Fonts — Baloo 2 (via CDN) |
| Canvas | HTML5 Canvas API (connect-the-dots puzzles + free-draw AI puzzle) |
| Touch | Touch Events API (virtual joystick) |

## AI / Machine Learning
| Layer | Technology |
|---|---|
| Inference runtime | [TensorFlow.js](https://www.tensorflow.org/js) (WebGL backend, runs in-browser) |
| Model wrapper | [`@teachablemachine/image`](https://teachablemachine.withgoogle.com/) v2.4 |
| Model architecture | MobileNet-based image classifier (grayscale, 96×96 input) |
| Training tool | Google Teachable Machine — Image Project |
| Classes | `circle`, `triangle`, `square`, `star`, `hexagon` |
| Model files | `model/model.json`, `model/weights.bin`, `model/metadata.json` |
| Fallback | Connect-the-dots mode (no model required) |

TensorFlow.js and the Teachable Machine library are loaded via CDN in `index.html`.
The model files are versioned in the repo (~1.7 MB total) so the game works offline.

## Assets
- Images embedded as **base64 data URIs** inside the `ASSETS` JS object
- No server dependency for loading images
- Source image files live in `imagens/` (PNG)

## Internationalization (i18n)
- `STR` object with `pt` and `en` keys
- `t(key)` function resolves the active language
- Language selected at game start, not persisted

## No generative AI at runtime
The game uses a **locally-trained classification model**, not a generative AI or LLM.
All non-AI content (questions, answers, dialogues) is static and hardcoded in `STR`.
There is no API call, no prompt, and no generated text at runtime.

If a generative AI feature is added in the future, refer to `rules/security.md`.
