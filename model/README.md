# Pasta do Modelo de IA

Coloque aqui os arquivos exportados do Google Teachable Machine.

## Arquivos esperados

```
model/
  model.json       ← arquivo principal do modelo
  metadata.json    ← nomes das classes e metadados
  weights.bin      ← pesos (pode ter outro nome, ex: group1-shard1of1.bin)
```

## Como treinar e exportar

1. Acesse https://teachablemachine.withgoogle.com/
2. Clique em **"Get Started"** → **"Image Project"** → **"Standard image model"**
3. Renomeie as classes para (exatamente assim, em inglês minúsculo):
   - `circle`
   - `triangle`
   - `square`
   - `star`
   - `hexagon`
4. Para cada classe: clique **"Draw"** e desenhe ~50 exemplos variados
   (tamanhos diferentes, ângulos, traços mais grossos e finos)
5. Clique **"Train Model"** e aguarde
6. Clique **"Export Model"** → aba **"Tensorflow.js"** → **"Download"**
7. Extraia o `.zip` e copie os arquivos para esta pasta

## Adicionar novas formas

1. Adicione a nova classe no Teachable Machine, retreine e re-exporte
2. Adicione o nome da classe (string exata) em `AI_SHAPE_CLASSES`
   em `src/game/ai-puzzle.js`
3. Adicione os labels PT/EN no objeto `shapeLabel` dentro de
   `openDrawShapePuzzle()` no mesmo arquivo
4. Adicione o mapeamento em `_SHAPE_NAME_TO_CLASS` em `room3.js`

## Funcionamento sem o modelo

Se a pasta estiver vazia ou os arquivos ausentes, o enigma cai
automaticamente para o modo liga-pontos numerado — o jogo nunca trava.
