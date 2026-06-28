# Stack Tecnológica — Enigma Kids

## Runtime
- **Plataforma**: Browser (HTML5)
- **Formato de entrega**: Arquivo HTML único autocontido (`index.html`)
- **Sem build step**: nenhum bundler, transpilador ou servidor necessário

## Frontend
| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 semântico |
| Estilos | CSS3 inline (`<style>`) com CSS Custom Properties (variáveis) |
| Lógica | JavaScript ES6+ inline (`<script>`) — sem frameworks |
| Fonte | Google Fonts — Baloo 2 (via CDN) |
| Canvas | HTML5 Canvas API (puzzles de pontos e estrela) |
| Toque | Touch Events API (joystick virtual) |

## Assets
- Imagens embutidas como **base64 data URIs** no objeto `ASSETS` em JS
- Sem dependência de servidor para carregar imagens
- Arquivos fonte das imagens em `imagens/` (PNG)

## Internacionalização (i18n)
- Objeto `STR` com chaves `pt` e `en`
- Função `t(key)` resolve o idioma ativo
- Idioma selecionado no início do jogo, sem persistência

## Sem IA / LLM no runtime
O jogo **não usa IA generativa** em tempo de execução.
Todo conteúdo (perguntas, respostas, diálogos) é estático e hardcoded.
Portanto, **não há risco de prompt injection** no produto atual.

Se IA for adicionada no futuro (ex: geração de puzzles, feedback adaptativo),
consulte `rules/security.md` para as diretrizes aplicáveis.
