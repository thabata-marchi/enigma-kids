# Arquitetura — Enigma Kids

## Visão geral

Enigma Kids é um jogo educativo 2D para crianças executado inteiramente no browser,
sem backend, sem build step e sem dependências instaláveis.

## Estrutura de pastas

```
Enigma Kids/
├── index.html  — jogo completo autocontido (entregável principal)
├── assets/
│   └── images/                    — exports futuros de imagens separadas
├── imagens/                       — arquivos fonte PNG das sprites
│   ├── personagem.png
│   ├── dragao.png
│   ├── portas.png
│   ├── chao.png
│   └── livro-magico.png
├── src/                           — separação futura do código (não em uso ainda)
│   ├── game/                      — lógica de jogo (motor, estado, interações)
│   ├── i18n/                      — strings de localização (pt/en)
│   └── styles/                    — folhas de estilo separadas
├── .agents/
│   └── rules/                     — regras e padrões do projeto para agentes e devs
│       ├── architecture.md        — este arquivo
│       ├── stack.md               — tecnologias utilizadas
│       ├── code-standards.md      — convenções de código
│       └── security.md            — diretrizes de segurança
└── README.md
```

> **Nota**: `src/` existe para uma eventual refatoração em arquivos separados.
> Hoje o jogo vive em um único HTML — não mover código sem intenção de manutenção real.

## Camadas do sistema

### 1. Apresentação (CSS + HTML)
- Tokens de design em variáveis CSS (`:root`)
- Layout posicional absoluto para o mundo 2D
- Sistema de z-index por camada (mundo → HUD → modal → telas)

### 2. Dados (JS puro)
- `ASSETS`: imagens em base64 — carregadas uma vez, sem rede
- `STR`: strings i18n em PT e EN — todo texto do jogo

### 3. Motor de jogo (JS puro)
- Loop principal via `requestAnimationFrame` (`loop()`)
- Movimento do personagem com detecção de colisão AABB
- Câmera que segue o personagem (`updateCamera()`)
- Input: teclado (arrow keys / WASD) + joystick touch

### 4. Estado de jogo
- Objetos de estado por sala: `state1`, `state2`, `state3`
- Progressão linear: Sala 1 → Sala 2 → Sala 3 → Tela de vitória
- Sem persistência (sem localStorage, sem backend) — sessão única

### 5. Puzzles (por sala)
| Sala | Puzzles |
|---|---|
| 1 — A Árvore Mágica | Identificar retângulo, operação matemática (8-3), encontrar objeto numerado |
| 2 — Laboratório do Inventor | Liga-pontos (hexágono), palavra em inglês (emoji→CAT), segurança online (estranhos) |
| 3 — Torre do Dragão | Multiplicação (3×4=12), anagrama (BOOK), liga-pontos (estrela), dilema de empatia |

## Fluxo de tela

```
Tela Início → [escolha PT/EN] → Sala 1 → Sala 2 → Sala 3 → Tela Vitória
```

## Decisões de design

**Por que um único HTML?**
Permite compartilhar o jogo como um arquivo sem servidor, CDN ou instalação.
Ideal para contexto educacional onde professores distribuem o arquivo.

**Por que imagens em base64?**
Evita requisições adicionais e permite o arquivo funcionar offline.
Trade-off: arquivo maior (~920KB), mas sem dependências externas de assets.

**Por que sem framework JS?**
O jogo é pequeno e de escopo fechado. Adicionar React/Vue introduziria complexidade
e build step sem benefício real para o tamanho atual.
