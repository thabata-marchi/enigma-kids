# Segurança — Enigma Kids

## Estado atual (sem IA no runtime)

O jogo **não faz chamadas de rede** em tempo de execução além de:
- Google Fonts CDN (fonte tipográfica)

Não há: fetch, XHR, WebSocket, LocalStorage com dados de usuário, cookies ou tracking.

### Risco XSS (atual)
`renderModal(innerHtml)` usa `innerHTML` para montar o conteúdo dos modais.
As strings injetadas são **todas internas** (vindas do objeto `STR` ou de templates JS hardcoded),
nunca de input do usuário. O risco é baixo, mas deve ser monitorado se isso mudar.

**Regra**: nunca passar para `renderModal` uma string que contenha input digitado pelo usuário.

---

## Se IA / LLM for adicionada no futuro

### Prompt Injection
Prompt injection ocorre quando conteúdo externo (input do usuário, dados de terceiros)
é interpolado num prompt e altera o comportamento do modelo.

**Mitigações obrigatórias se IA for integrada:**
1. **Nunca interpolar input do usuário diretamente num prompt de sistema**
2. Separar claramente `system prompt` (instruções) de `user content` (dados)
3. Validar e sanitizar qualquer texto vindo do usuário antes de enviar à API
4. Usar `role: "user"` para dados e `role: "system"` para instruções — nunca misturar
5. Tratar respostas da IA como dados não confiáveis antes de renderizar no DOM

### Chave de API
- Nunca expor chaves de API no código frontend (cliente)
- Chamadas à API de IA devem passar por um backend/proxy que autentique o usuário primeiro
- Usar variáveis de ambiente no servidor, nunca no bundle JS entregue ao browser

### Conteúdo gerado por IA para crianças
- Todo conteúdo gerado deve passar por filtro de conteúdo antes de ser exibido
- Configurar `safety_settings` ou equivalente na API utilizada
- Logar prompts e respostas para auditoria (LGPD — sem dados pessoais nos logs)

---

## LGPD
O jogo atual **não coleta dados pessoais**. Nenhum dado é enviado a servidores.
Se analytics ou IA forem adicionados, avaliar necessidade de consentimento parental
dado o público-alvo (crianças).
