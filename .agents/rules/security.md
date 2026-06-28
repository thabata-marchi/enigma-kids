# Security — Enigma Kids

## Current state (no AI at runtime)

The game **makes no network calls** at runtime beyond:
- Google Fonts CDN (typeface)

There is no: fetch, XHR, WebSocket, localStorage with user data, cookies, or tracking.

### XSS risk (current)
`renderModal(innerHtml)` uses `innerHTML` to build modal content.
The injected strings are **all internal** (from the `STR` object or hardcoded JS templates),
never from user input. Risk is low, but must be monitored if this changes.

**Rule**: never pass a string containing user-typed input to `renderModal`.

---

## If AI / LLM is added in the future

### Prompt Injection
Prompt injection occurs when external content (user input, third-party data)
is interpolated into a prompt and alters the model's behavior.

**Required mitigations if AI is integrated:**
1. **Never interpolate user input directly into a system prompt**
2. Clearly separate `system prompt` (instructions) from `user content` (data)
3. Validate and sanitize any user-provided text before sending it to the API
4. Use `role: "user"` for data and `role: "system"` for instructions — never mix them
5. Treat AI responses as untrusted data before rendering to the DOM

### API Key
- Never expose API keys in frontend (client-side) code
- AI API calls must go through a backend/proxy that authenticates the user first
- Use server-side environment variables, never in the JS bundle delivered to the browser

### AI-generated content for children
- All generated content must pass through a content filter before being displayed
- Configure `safety_settings` or equivalent in the API being used
- Log prompts and responses for auditing (LGPD — no personal data in logs)

---

## LGPD
The current game **does not collect personal data**. No data is sent to any server.
If analytics or AI are added, assess the need for parental consent
given the target audience (children).
