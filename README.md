# Enigma Kids — Sala dos Enigmas

Jogo educativo 2D para crianças, executado inteiramente no browser.
Sem instalação, sem servidor, sem dependências — basta abrir o arquivo HTML.

## Como jogar

1. Abra `index.html` em qualquer browser moderno
2. Escolha o idioma (Português ou English)
3. Use as **setas do teclado** (desktop) ou o **joystick na tela** (celular/tablet)
4. Aproxime-se dos objetos para interagir e resolver os enigmas

## O que a criança aprende

| Sala | Tema | Habilidades |
|---|---|---|
| 1 — A Árvore Mágica | Formas geométricas | Identificar retângulo, subtração simples (8−3) |
| 2 — O Laboratório do Inventor | Tecnologia e segurança | Hexágono, inglês básico (CAT), nunca compartilhar dados pessoais com estranhos |
| 3 — A Torre do Dragão | Raciocínio e empatia | Multiplicação (3×4), anagrama (BOOK em inglês), trabalho em equipe |

## Stack

- HTML5 + CSS3 + JavaScript ES6+ (sem framework, sem build step)
- HTML5 Canvas API para puzzles de desenho
- Touch Events API para joystick mobile
- Imagens embutidas em base64 (funciona offline)
- Google Fonts — Baloo 2

Detalhes completos em [.agents/rules/stack.md](.agents/rules/stack.md).

## Estrutura do projeto

```
Enigma Kids/
├── index.html  — entregável principal (jogo completo)
├── imagens/                        — arquivos fonte das sprites (PNG)
├── assets/                         — exports separados para uso futuro
├── src/                            — separação futura do código
└── .agents/rules/                  — regras, padrões e decisões de arquitetura
```

## Segurança

O jogo **não usa IA generativa** e **não faz chamadas de rede** (exceto Google Fonts).
Nenhum dado do usuário é coletado ou enviado.

Se IA for integrada no futuro, consulte [.agents/rules/security.md](.agents/rules/security.md)
para diretrizes sobre prompt injection, chaves de API e LGPD.

## Personagens

- **Protagonista**: personagem jogável controlado pela criança
- **LUMI**: mascote que aparece com dicas quando a criança pede ajuda
- **Sombra Misteriosa**: personagem da Sala 2 que ensina sobre segurança online
- **Dragão Bibliotecário**: guardião da Sala 3

## Decisões de design

**Arquivo único**: facilita distribuição em contexto educacional — professor envia o arquivo, criança abre no browser.

**Sem persistência**: sem login, sem cookies, sem localStorage. Cada sessão começa do zero, sem dados pessoais.

**Bilingue**: PT-BR e EN-US selecionáveis na tela inicial, com todo conteúdo duplicado no objeto `STR`.
