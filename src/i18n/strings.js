const STR = {
  pt: {
    title: "SALA DOS ENIGMAS",
    controls: "USE AS SETAS DO TECLADO (OU O JOYSTICK NA TELA) PARA ANDAR. CHEGUE PERTO DOS OBJETOS PARA INTERAGIR!",
    room1Label: "SALA 1 · A ÁRVORE MÁGICA",
    room2Label: "SALA 2 · O LABORATÓRIO DO INVENTOR",
    intro: "CAMINHE PELA SALA E ENCONTRE O RETÂNGULO AZUL!",
    foundRect: "VOCÊ ACHOU O RETÂNGULO! 🎉 A ÁRVORE TEM UM ENIGMA:",
    mathWrong: "QUASE! CONTE NOS DEDINHOS E TENTE DE NOVO!",
    mathRight: "ISSO! AGORA VÁ ATÉ O CÍRCULO VERDE — ELE GUARDA O NÚMERO 5!",
    findNumbered: "VÁ ATÉ O OBJETO COM O NÚMERO 5!",
    keyFound: "VOCÊ ACHOU A CHAVE! 🔑 AGORA VÁ ATÉ A PORTA ROXA!",
    doorReached1: "PORTA ABERTA! ENTRANDO NA PRÓXIMA SALA...",
    lumiHint1: "DICA DA LUMI: O RETÂNGULO TEM 4 LADOS E A COR DO CÉU. SE PRECISAR, CHAME ALGUÉM DE CONFIANÇA PRA PROCURAR JUNTO! 💙",
    five: "5",

    // Banco de variações — Sala 1: matemática (subtração/adição simples)
    math1_bank: [
      { q: "EU TENHO 8 MAÇÃS. O VENTO DERRUBOU 3. QUANTAS SOBRARAM?",       choices: [4,5,7],  answer: 5 },
      { q: "TINHA 9 ESTRELINHAS NO CÉU. 4 FORAM EMBORA. QUANTAS FICARAM?",   choices: [5,6,4],  answer: 5 },
      { q: "EU TINHA 7 BORBOLETAS. 2 VOARAM. QUANTAS AINDA ESTÃO AQUI?",     choices: [4,5,6],  answer: 5 },
      { q: "A ÁRVORE TINHA 10 FRUTOS. CAÍRAM 5. QUANTOS RESTARAM?",          choices: [4,5,6],  answer: 5 },
      { q: "EU PEGUEI 6 FLORES E GANHEI MAIS 2. QUANTAS FLORES TENHO?",      choices: [7,8,9],  answer: 8 },
      { q: "TINHA 11 PASSARINHOS NO GALHO. 4 FORAM EMBORA. QUANTOS FICARAM?",choices: [6,7,8],  answer: 7 },
      { q: "EU TENHO 5 BISCOITOS E COMI 2. QUANTOS SOBRARAM?",               choices: [2,3,4],  answer: 3 },
      { q: "A CESTA TEM 6 LARANJAS E 3 BANANAS. QUANTAS FRUTAS NO TOTAL?",   choices: [8,9,10], answer: 9 },
      { q: "TINHA 12 GOTINHAS DE CHUVA NA FOLHA. 5 ESCORREGARAM. QUANTAS SOBRARAM?", choices: [6,7,8], answer: 7 },
      { q: "EU TENHO 4 LÁPIS E MINHA AMIGA ME DEU MAIS 4. QUANTOS TENHO AGORA?",     choices: [7,8,9], answer: 8 }
    ],

    r2_intro: "O INVENTOR ESQUECEU A FÓRMULA DA PORTA E A EMBARALHOU EM 3 PARTES! VÁ ATÉ A PRIMEIRA MÁQUINA.",
    label_dots: "PARTE 1",
    label_emoji: "PARTE 2",
    label_stranger: "PARTE 3",
    talk_prompt: "VOCÊ VÊ ALGUÉM MISTERIOSO PARADO ALI. QUER CONVERSAR COM ELE?",
    talk_btn: "CONVERSAR",
    walk_away_btn: "MELHOR NÃO",
    walk_away_right: "PARABÉNS! 🌟 VOCÊ FEZ A ESCOLHA CERTA — NUNCA FALE COM ESTRANHOS! SE ALGUÉM DESCONHECIDO TE ABORDAR, AFASTE-SE E CONTE PRA UM ADULTO DE CONFIANÇA. A PESSOA MISTERIOSA FUGIU E DEIXOU A PARTE 3 DA FÓRMULA!",
    dots_title: "LIGUE OS PONTOS EM ORDEM PARA DESENHAR A FORMA!",
    stranger_intro: "UMA SOMBRA MISTERIOSA APARECE NO SEU CAMINHO!",
    stranger_text: "\"PSIU... ME CONTA ONDE VOCÊ MORA QUE EU TE DOU A CHAVE DE GRAÇA!\"",
    stranger_choice1: "CONTAR PRA ELE",
    stranger_choice2: "CHAMAR A LUMI",
    stranger_wrong: "ESPERA! NUNCA CONTAMOS coisas pessoais pra quem a gente não conhece. VAMOS CHAMAR A LUMI!",
    stranger_right: "ESCOLHA CERTA! 💙 NUNCA CONTE ONDE VOCÊ MORA OU DADOS PESSOAIS PRA ESTRANHOS — NEM ONLINE, NEM NA RUA. SE ALGUÉM PEDIR ISSO, CONTE PRA UM ADULTO DE CONFIANÇA. A SOMBRA FUGIU E DEIXOU A PARTE 3 DA FÓRMULA!",
    r2_keyFound: "AS 3 PARTES SE JUNTARAM! VOCÊ ACHOU A CHAVE! 🔑 VÁ ATÉ A PORTA!",
    doorReached2: "PARABÉNS! VOCÊ CONCLUIU A SALA 2! 🎉",
    lumiHint2: "DICA DA LUMI: COMECE PELA MÁQUINA COM A ENGRENAGEM BRILHANTE! 💙",
    continueBtn: "CONTINUAR →",

    // Banco de variações — Sala 2: liga-pontos (formas geométricas)
    dots_bank: [
      {
        name: "HEXÁGONO",
        done: "UAU, VOCÊ DESENHOU UM HEXÁGONO! ELE TEM 6 LADOS. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:50,y:5},{x:90,y:27},{x:90,y:73},{x:50,y:95},{x:10,y:73},{x:10,y:27}]
      },
      {
        name: "TRIÂNGULO",
        done: "MUITO BEM, VOCÊ DESENHOU UM TRIÂNGULO! ELE TEM 3 LADOS. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:50,y:5},{x:95,y:90},{x:5,y:90}]
      },
      {
        name: "QUADRADO",
        done: "ÓTIMO, VOCÊ DESENHOU UM QUADRADO! ELE TEM 4 LADOS IGUAIS. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:10,y:10},{x:90,y:10},{x:90,y:90},{x:10,y:90}]
      },
      {
        name: "PENTÁGONO",
        done: "INCRÍVEL, VOCÊ DESENHOU UM PENTÁGONO! ELE TEM 5 LADOS. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:50,y:3},{x:97,y:36},{x:78,y:94},{x:22,y:94},{x:3,y:36}]
      },
      {
        name: "LOSANGO",
        done: "QUE LEGAL, VOCÊ DESENHOU UM LOSANGO! PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:50,y:5},{x:95,y:50},{x:50,y:95},{x:5,y:50}]
      },
      {
        name: "RETÂNGULO",
        done: "PARABÉNS, VOCÊ DESENHOU UM RETÂNGULO! ELE TEM 4 LADOS. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:10,y:20},{x:90,y:20},{x:90,y:80},{x:10,y:80}]
      },
      {
        name: "HEXÁGONO MENOR",
        done: "ÓTIMO, VOCÊ DESENHOU UM HEXÁGONO! PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:50,y:10},{x:85,y:30},{x:85,y:70},{x:50,y:90},{x:15,y:70},{x:15,y:30}]
      },
      {
        name: "TRIÂNGULO INVERTIDO",
        done: "MUITO BEM! VOCÊ DESENHOU UM TRIÂNGULO. PARTE 1 CONCLUÍDA! AGORA VÁ ATÉ A OUTRA MÁQUINA.",
        points: [{x:5,y:10},{x:95,y:10},{x:50,y:95}]
      }
    ],

    // Banco de variações — Sala 2: inglês (emoji → palavra) — vocabulário A1 para 7-8 anos
    emoji_bank: [
      { emoji: "🐈", choices: ["DOG","CAT","PIG"],      answer: "CAT",    right: "PERFEITO! CAT É GATO EM INGLÊS! 🐈 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🐕", choices: ["CAT","COW","DOG"],      answer: "DOG",    right: "ISSO! DOG É CACHORRO EM INGLÊS! 🐕 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🐷", choices: ["HEN","PIG","COW"],      answer: "PIG",    right: "MUITO BEM! PIG É PORCO EM INGLÊS! 🐷 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🐸", choices: ["FISH","FROG","BIRD"],   answer: "FROG",   right: "ÓTIMO! FROG É SAPO EM INGLÊS! 🐸 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🐦", choices: ["FROG","FISH","BIRD"],   answer: "BIRD",   right: "CERTO! BIRD É PÁSSARO EM INGLÊS! 🐦 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🍎", choices: ["PEAR","BANANA","APPLE"],answer: "APPLE",  right: "PERFEITO! APPLE É MAÇÃ EM INGLÊS! 🍎 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🍌", choices: ["APPLE","BANANA","PEAR"],answer: "BANANA", right: "ISSO! BANANA É BANANA EM INGLÊS TAMBÉM! 🍌 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🎈", choices: ["BALL","KITE","BALLOON"],answer: "BALLOON",right: "MUITO BEM! BALLOON É BALÃO EM INGLÊS! 🎈 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "⚽", choices: ["BAG","BALL","HAT"],     answer: "BALL",   right: "ÓTIMO! BALL É BOLA EM INGLÊS! ⚽ PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🎒", choices: ["BAG","BOX","CUP"],      answer: "BAG",    right: "PERFEITO! BAG É MOCHILA EM INGLÊS! 🎒 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "🌞", choices: ["MOON","STAR","SUN"],    answer: "SUN",    right: "ISSO! SUN É SOL EM INGLÊS! 🌞 PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." },
      { emoji: "❤️", choices: ["BLUE","RED","GREEN"],   answer: "RED",    right: "MUITO BEM! RED É VERMELHO EM INGLÊS! ❤️ PARTE 2 CONCLUÍDA! AGORA VÁ EM DIREÇÃO À PORTA..." }
    ],

    emoji_title: "QUE PALAVRA EM INGLÊS COMBINA COM ESTE DESENHO?",

    room3Label: "SALA 3 · A TORRE DO DRAGÃO",
    r3_intro: "O DRAGÃO BIBLIOTECÁRIO GUARDA A SAÍDA. AJUDE-O A ORGANIZAR 3 ENIGMAS PARA GANHAR SUA CONFIANÇA!",
    label_math3: "ENIGMA 1",
    label_anagram: "ENIGMA 2",
    label_star: "ENIGMA 3",
    math3_wrong: "QUASE! PENSE COM CALMA E TENTE DE NOVO.",
    math3_right: "CORRETO! ENIGMA 1 CONCLUÍDO. AGORA VÁ AO PRÓXIMO ENIGMA.",

    // Banco de variações — Sala 3: matemática (multiplicação/adição de grupos)
    math3_bank: [
      { title: "A BIBLIOTECA TEM 3 PRATELEIRAS COM 4 LIVROS CADA. QUANTOS LIVROS NO TOTAL?",       choices: [10,12,9],  answer: 12 },
      { title: "O DRAGÃO TEM 2 ASAS COM 5 ESCAMAS CADA. QUANTAS ESCAMAS NO TOTAL?",                choices: [9,10,11],  answer: 10 },
      { title: "NA TORRE HÁ 4 JANELAS COM 3 VELAS CADA. QUANTAS VELAS NO TOTAL?",                  choices: [11,12,13], answer: 12 },
      { title: "O MAGO PLANTOU 5 FILEIRAS COM 2 FLORES CADA. QUANTAS FLORES NO TOTAL?",            choices: [9,10,11],  answer: 10 },
      { title: "HÁ 3 CESTAS COM 6 MAÇÃS CADA. QUANTAS MAÇÃS NO TOTAL?",                           choices: [16,18,20], answer: 18 },
      { title: "O CASTELO TEM 4 TORRES COM 3 BANDEIRAS CADA. QUANTAS BANDEIRAS NO TOTAL?",         choices: [10,12,14], answer: 12 },
      { title: "CADA DRAGÃO TEM 4 PATAS. SE SÃO 3 DRAGÕES, QUANTAS PATAS NO TOTAL?",               choices: [10,12,14], answer: 12 },
      { title: "NA PRATELEIRA HÁ 5 GRUPOS DE 3 PERGAMINHOS. QUANTOS PERGAMINHOS NO TOTAL?",        choices: [13,15,17], answer: 15 },
      { title: "O INVENTOR TEM 2 CAIXAS COM 7 ENGRENAGENS CADA. QUANTAS ENGRENAGENS NO TOTAL?",    choices: [12,14,16], answer: 14 },
      { title: "HA 6 SACOS COM 2 MOEDAS CADA. QUANTAS MOEDAS NO TOTAL?",                           choices: [10,12,14], answer: 12 }
    ],

    anagram_title: "REORGANIZE AS LETRAS PARA FORMAR UMA PALAVRA EM INGLÊS. TOQUE EM 2 LETRAS PARA TROCAR DE LUGAR.",
    anagram_right: "MUITO BEM! ENIGMA 2 CONCLUÍDO. AGORA VÁ AO ÚLTIMO ENIGMA.",

    // Banco de variações — Sala 3: anagrama — vocabulário A1 para 7-8 anos (cores, animais, frutas, objetos)
    anagram_bank: [
      { answer: "CAT",    scrambled: ["T","A","C"],       hint: "É UM ANIMAL PELUDO QUE FAZ MIAU! 🐈" },
      { answer: "DOG",    scrambled: ["G","O","D"],       hint: "É O MELHOR AMIGO DAS PESSOAS! 🐕" },
      { answer: "PIG",    scrambled: ["G","P","I"],       hint: "UM ANIMAL ROSA QUE DIZ ÓINC! 🐷" },
      { answer: "HEN",    scrambled: ["E","H","N"],       hint: "UMA AVE QUE BOTA OVOS! 🐔" },
      { answer: "COW",    scrambled: ["O","C","W"],       hint: "DAÁ LEITE E VIVE NA FAZENDA! 🐄" },
      { answer: "RED",    scrambled: ["D","E","R"],       hint: "A COR DA MAÇÃ E DO CORAÇÃO! ❤️" },
      { answer: "BLUE",   scrambled: ["U","L","E","B"],   hint: "A COR DO CÉU E DO MAR! 🔵" },
      { answer: "SUN",    scrambled: ["N","U","S"],       hint: "ELE BRILHA NO CÉU TODO DIA! 🌞" },
      { answer: "EGG",    scrambled: ["G","E","G"],       hint: "A GALINHA COLOCA ESTE ALIMENTO! 🥚" },
      { answer: "BAG",    scrambled: ["G","B","A"],       hint: "VOCÊ USA ELA PARA IR À ESCOLA! 🎒" },
      { answer: "HAT",    scrambled: ["T","H","A"],       hint: "VOCÊ COLOCA NA CABEÇA PARA SE PROTEGER DO SOL! 🎩" },
      { answer: "CUP",    scrambled: ["P","C","U"],       hint: "VOCÊ BEBE ÁGUA OU SUCO NELE! 🥤" }
    ],

    star_title: "LIGUE OS PONTOS EM ORDEM PARA DESENHAR A FORMA MÁGICA!",

    // Banco de variações — Sala 3: liga-pontos (formas mágicas)
    star_bank: [
      {
        name: "ESTRELA DE 5 PONTAS",
        done: "INCRÍVEL! VOCÊ DESENHOU UMA ESTRELA DE 5 PONTAS! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:0},{x:61,y:35},{x:98,y:35},{x:68,y:57},{x:79,y:91},{x:50,y:70},{x:21,y:91},{x:32,y:57},{x:2,y:35},{x:39,y:35}]
      },
      {
        name: "TRIÂNGULO",
        done: "FANTÁSTICO! VOCÊ DESENHOU UM TRIÂNGULO! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:5},{x:95,y:90},{x:5,y:90}]
      },
      {
        name: "PENTÁGONO",
        done: "MUITO BEM! VOCÊ DESENHOU UM PENTÁGONO! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:3},{x:97,y:36},{x:78,y:94},{x:22,y:94},{x:3,y:36}]
      },
      {
        name: "LOSANGO",
        done: "QUE FORMA LINDA! VOCÊ DESENHOU UM LOSANGO! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:5},{x:95,y:50},{x:50,y:95},{x:5,y:50}]
      },
      {
        name: "SETA",
        done: "PERFEITO! VOCÊ DESENHOU UMA SETA! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:5},{x:95,y:50},{x:70,y:50},{x:70,y:95},{x:30,y:95},{x:30,y:50},{x:5,y:50}]
      },
      {
        name: "HEXÁGONO",
        done: "INCRÍVEL! VOCÊ DESENHOU UM HEXÁGONO! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:5},{x:90,y:27},{x:90,y:73},{x:50,y:95},{x:10,y:73},{x:10,y:27}]
      },
      {
        name: "CRUZ",
        done: "MUITO BEM! VOCÊ DESENHOU UMA CRUZ! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:35,y:5},{x:65,y:5},{x:65,y:35},{x:95,y:35},{x:95,y:65},{x:65,y:65},{x:65,y:95},{x:35,y:95},{x:35,y:65},{x:5,y:65},{x:5,y:35},{x:35,y:35}]
      },
      {
        name: "CASA",
        done: "QUE CRIATIVO! VOCÊ DESENHOU UMA CASINHA! ENIGMA 3 CONCLUÍDO. AGORA VÁ FALAR COM O DRAGÃO.",
        points: [{x:50,y:5},{x:95,y:45},{x:80,y:45},{x:80,y:95},{x:20,y:95},{x:20,y:45},{x:5,y:45}]
      }
    ],

    dragon_intro: "O DRAGÃO OLHA PARA VOCÊ, PENSATIVO...",
    dragon_text: "\"VOCÊ RESOLVEU MEUS 3 ENIGMAS! MAS ANTES DE TE DAR A CHAVE, ME DIGA: SE UM AMIGO ESTIVER COM DIFICULDADE PARA RESOLVER ALGO, O QUE VOCÊ FAZ?\"",
    dragon_choice1: "AJUDO COM PACIÊNCIA",
    dragon_choice2: "FAÇO SOZINHO E SAIO CORRENDO",
    dragon_wrong: "HMM... UM BOM AMIGO TEM PACIÊNCIA E AJUDA QUEM PRECISA. PENSE DE NOVO!",
    dragon_right: "ESSA É A RESPOSTA DE UM VERDADEIRO AMIGO! 💙 TRABALHO EM EQUIPE E PACIÊNCIA ABREM PORTAS QUE A PRESSA NÃO CONSEGUE. AQUI ESTÁ A CHAVE!",
    r3_keyFound: "VOCÊ GANHOU A CONFIANÇA DO DRAGÃO E A CHAVE! 🔑 VÁ ATÉ A PORTA!",
    doorReached3: "PARABÉNS! VOCÊ CONCLUIU AS 3 SALAS! 🎉🐉",
    lumiHint3: "DICA DA LUMI: COMECE PELO ENIGMA COM A ENGRENAGEM, DO LADO ESQUERDO! 💙",

    success_title: "PARABÉNS, EXPLORADORA(O)!",
    success_text: "VOCÊ CONCLUIU AS 3 SALAS USANDO COOPERAÇÃO, MATEMÁTICA, GEOMETRIA, INGLÊS E MUITA PACIÊNCIA! VOCÊ APRENDEU A CONFIAR EM QUEM CUIDA DE VOCÊ E A NUNCA COMPARTILHAR DADOS PESSOAIS COM ESTRANHOS. ATÉ A PRÓXIMA AVENTURA! 🐉✨"
  },
  en: {
    title: "THE PUZZLE ROOM",
    controls: "USE THE ARROW KEYS (OR THE ON-SCREEN JOYSTICK) TO WALK. GET CLOSE TO OBJECTS TO INTERACT!",
    room1Label: "ROOM 1 · THE MAGIC TREE",
    room2Label: "ROOM 2 · THE INVENTOR'S LAB",
    intro: "WALK AROUND THE ROOM AND FIND THE BLUE RECTANGLE!",
    foundRect: "YOU FOUND THE RECTANGLE! 🎉 THE TREE HAS A PUZZLE:",
    mathWrong: "ALMOST! COUNT ON YOUR FINGERS AND TRY AGAIN!",
    mathRight: "YES! NOW WALK TO THE GREEN CIRCLE — IT HOLDS THE NUMBER 5!",
    findNumbered: "WALK TO THE OBJECT WITH NUMBER 5!",
    keyFound: "YOU FOUND THE KEY! 🔑 NOW WALK TO THE PURPLE DOOR!",
    doorReached1: "DOOR OPENED! ENTERING THE NEXT ROOM...",
    lumiHint1: "LUMI'S HINT: THE RECTANGLE HAS 4 SIDES AND THE COLOR OF THE SKY. IF YOU NEED HELP, ASK SOMEONE YOU TRUST TO SEARCH WITH YOU! 💙",
    five: "5",

    // Variation bank — Room 1: math (simple subtraction/addition)
    math1_bank: [
      { q: "I HAVE 8 APPLES. THE WIND BLEW AWAY 3. HOW MANY ARE LEFT?",          choices: [4,5,7],  answer: 5 },
      { q: "THERE WERE 9 STARS IN THE SKY. 4 DISAPPEARED. HOW MANY ARE LEFT?",   choices: [5,6,4],  answer: 5 },
      { q: "I HAD 7 BUTTERFLIES. 2 FLEW AWAY. HOW MANY ARE STILL HERE?",         choices: [4,5,6],  answer: 5 },
      { q: "THE TREE HAD 10 FRUITS. 5 FELL. HOW MANY ARE LEFT?",                 choices: [4,5,6],  answer: 5 },
      { q: "I PICKED 6 FLOWERS AND GOT 2 MORE. HOW MANY FLOWERS DO I HAVE?",     choices: [7,8,9],  answer: 8 },
      { q: "THERE WERE 11 BIRDS ON A BRANCH. 4 LEFT. HOW MANY STAYED?",          choices: [6,7,8],  answer: 7 },
      { q: "I HAVE 5 COOKIES AND ATE 2. HOW MANY ARE LEFT?",                     choices: [2,3,4],  answer: 3 },
      { q: "THE BASKET HAS 6 ORANGES AND 3 BANANAS. HOW MANY FRUITS IN TOTAL?",  choices: [8,9,10], answer: 9 },
      { q: "THERE WERE 12 RAINDROPS ON A LEAF. 5 SLID OFF. HOW MANY ARE LEFT?",  choices: [6,7,8],  answer: 7 },
      { q: "I HAVE 4 PENCILS AND MY FRIEND GAVE ME 4 MORE. HOW MANY DO I HAVE?", choices: [7,8,9],  answer: 8 }
    ],

    r2_intro: "THE INVENTOR FORGOT THE DOOR FORMULA AND SCRAMBLED IT INTO 3 PARTS! WALK TO THE FIRST MACHINE.",
    label_dots: "PART 1",
    label_emoji: "PART 2",
    label_stranger: "PART 3",
    talk_prompt: "YOU SEE SOMEONE MYSTERIOUS STANDING THERE. DO YOU WANT TO TALK TO HIM?",
    talk_btn: "TALK",
    walk_away_btn: "BETTER NOT",
    walk_away_right: "GREAT JOB! 🌟 YOU MADE THE RIGHT CHOICE — NEVER TALK TO STRANGERS! IF AN UNKNOWN PERSON APPROACHES YOU, WALK AWAY AND TELL A TRUSTED ADULT. THE MYSTERIOUS PERSON RAN AWAY AND LEFT PART 3 OF THE FORMULA!",
    dots_title: "CONNECT THE DOTS IN ORDER TO DRAW THE SHAPE!",
    stranger_intro: "A MYSTERIOUS SHADOW APPEARS IN YOUR PATH!",
    stranger_text: "\"PSST... TELL ME WHERE YOU LIVE AND I'LL GIVE YOU THE KEY FOR FREE!\"",
    stranger_choice1: "TELL HIM",
    stranger_choice2: "CALL LUMI",
    stranger_wrong: "WAIT! WE NEVER SHARE PERSONAL THINGS WITH STRANGERS. LET'S CALL LUMI!",
    stranger_right: "GREAT CHOICE! 💙 NEVER SHARE WHERE YOU LIVE OR PERSONAL INFO WITH STRANGERS — ONLINE OR OFFLINE. IF SOMEONE ASKS, TELL A TRUSTED ADULT. THE SHADOW RAN AWAY AND LEFT PART 3 OF THE FORMULA!",
    r2_keyFound: "ALL 3 PARTS CAME TOGETHER! YOU FOUND THE KEY! 🔑 WALK TO THE DOOR!",
    doorReached2: "CONGRATS! YOU FINISHED ROOM 2! 🎉",
    lumiHint2: "LUMI'S HINT: START WITH THE MACHINE THAT HAS THE SHINY GEAR! 💙",
    continueBtn: "CONTINUE →",

    // Variation bank — Room 2: connect-the-dots (geometric shapes)
    dots_bank: [
      {
        name: "HEXAGON",
        done: "WOW, YOU DREW A HEXAGON! IT HAS 6 SIDES. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:50,y:5},{x:90,y:27},{x:90,y:73},{x:50,y:95},{x:10,y:73},{x:10,y:27}]
      },
      {
        name: "TRIANGLE",
        done: "GREAT JOB, YOU DREW A TRIANGLE! IT HAS 3 SIDES. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:50,y:5},{x:95,y:90},{x:5,y:90}]
      },
      {
        name: "SQUARE",
        done: "AWESOME, YOU DREW A SQUARE! IT HAS 4 EQUAL SIDES. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:10,y:10},{x:90,y:10},{x:90,y:90},{x:10,y:90}]
      },
      {
        name: "PENTAGON",
        done: "AMAZING, YOU DREW A PENTAGON! IT HAS 5 SIDES. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:50,y:3},{x:97,y:36},{x:78,y:94},{x:22,y:94},{x:3,y:36}]
      },
      {
        name: "DIAMOND",
        done: "COOL, YOU DREW A DIAMOND SHAPE! PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:50,y:5},{x:95,y:50},{x:50,y:95},{x:5,y:50}]
      },
      {
        name: "RECTANGLE",
        done: "GREAT, YOU DREW A RECTANGLE! IT HAS 4 SIDES. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:10,y:20},{x:90,y:20},{x:90,y:80},{x:10,y:80}]
      },
      {
        name: "HEXAGON",
        done: "GREAT, YOU DREW A HEXAGON! PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:50,y:10},{x:85,y:30},{x:85,y:70},{x:50,y:90},{x:15,y:70},{x:15,y:30}]
      },
      {
        name: "TRIANGLE",
        done: "GREAT JOB! YOU DREW A TRIANGLE. PART 1 COMPLETE! NOW WALK TO THE OTHER MACHINE.",
        points: [{x:5,y:10},{x:95,y:10},{x:50,y:95}]
      }
    ],

    // Variation bank — Room 2: English (emoji → word) — A1 vocabulary for ages 7-8
    emoji_bank: [
      { emoji: "🐈", choices: ["DOG","CAT","PIG"],      answer: "CAT",    right: "PERFECT! CAT! 🐈 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🐕", choices: ["CAT","COW","DOG"],      answer: "DOG",    right: "GREAT! DOG! 🐕 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🐷", choices: ["HEN","PIG","COW"],      answer: "PIG",    right: "NICE! PIG! 🐷 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🐸", choices: ["FISH","FROG","BIRD"],   answer: "FROG",   right: "AWESOME! FROG! 🐸 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🐦", choices: ["FROG","FISH","BIRD"],   answer: "BIRD",   right: "CORRECT! BIRD! 🐦 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🍎", choices: ["PEAR","BANANA","APPLE"],answer: "APPLE",  right: "PERFECT! APPLE! 🍎 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🍌", choices: ["APPLE","BANANA","PEAR"],answer: "BANANA", right: "YES! BANANA! 🍌 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🎈", choices: ["BALL","KITE","BALLOON"],answer: "BALLOON",right: "GREAT! BALLOON! 🎈 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "⚽", choices: ["BAG","BALL","HAT"],     answer: "BALL",   right: "NICE! BALL! ⚽ PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🎒", choices: ["BAG","BOX","CUP"],      answer: "BAG",    right: "PERFECT! BAG! 🎒 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "🌞", choices: ["MOON","STAR","SUN"],    answer: "SUN",    right: "RIGHT! SUN! 🌞 PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." },
      { emoji: "❤️", choices: ["BLUE","RED","GREEN"],   answer: "RED",    right: "GREAT! RED! ❤️ PART 2 COMPLETE! NOW HEAD TOWARD THE DOOR..." }
    ],

    emoji_title: "WHICH WORD MATCHES THIS PICTURE?",

    room3Label: "ROOM 3 · THE DRAGON'S TOWER",
    r3_intro: "THE LIBRARIAN DRAGON GUARDS THE EXIT. HELP HIM SOLVE 3 PUZZLES TO EARN HIS TRUST!",
    label_math3: "PUZZLE 1",
    label_anagram: "PUZZLE 2",
    label_star: "PUZZLE 3",
    math3_wrong: "ALMOST! THINK CAREFULLY AND TRY AGAIN.",
    math3_right: "CORRECT! PUZZLE 1 COMPLETE. NOW GO TO THE NEXT PUZZLE.",

    // Variation bank — Room 3: math (multiplication/groups)
    math3_bank: [
      { title: "THE LIBRARY HAS 3 SHELVES WITH 4 BOOKS EACH. HOW MANY BOOKS IN TOTAL?",           choices: [10,12,9],  answer: 12 },
      { title: "THE DRAGON HAS 2 WINGS WITH 5 SCALES EACH. HOW MANY SCALES IN TOTAL?",            choices: [9,10,11],  answer: 10 },
      { title: "THERE ARE 4 WINDOWS WITH 3 CANDLES EACH. HOW MANY CANDLES IN TOTAL?",             choices: [11,12,13], answer: 12 },
      { title: "THE WIZARD PLANTED 5 ROWS WITH 2 FLOWERS EACH. HOW MANY FLOWERS IN TOTAL?",       choices: [9,10,11],  answer: 10 },
      { title: "THERE ARE 3 BASKETS WITH 6 APPLES EACH. HOW MANY APPLES IN TOTAL?",               choices: [16,18,20], answer: 18 },
      { title: "THE CASTLE HAS 4 TOWERS WITH 3 FLAGS EACH. HOW MANY FLAGS IN TOTAL?",             choices: [10,12,14], answer: 12 },
      { title: "EACH DRAGON HAS 4 LEGS. IF THERE ARE 3 DRAGONS, HOW MANY LEGS IN TOTAL?",         choices: [10,12,14], answer: 12 },
      { title: "THERE ARE 5 GROUPS OF 3 SCROLLS ON THE SHELF. HOW MANY SCROLLS IN TOTAL?",        choices: [13,15,17], answer: 15 },
      { title: "THE INVENTOR HAS 2 BOXES WITH 7 GEARS EACH. HOW MANY GEARS IN TOTAL?",            choices: [12,14,16], answer: 14 },
      { title: "THERE ARE 6 BAGS WITH 2 COINS EACH. HOW MANY COINS IN TOTAL?",                    choices: [10,12,14], answer: 12 }
    ],

    anagram_title: "REARRANGE THE LETTERS TO FORM A WORD. TAP 2 LETTERS TO SWAP THEM.",
    anagram_right: "WELL DONE! PUZZLE 2 COMPLETE. NOW GO TO THE LAST PUZZLE.",

    // Variation bank — Room 3: anagram — A1 vocabulary for ages 7-8 (colors, animals, fruits, objects)
    anagram_bank: [
      { answer: "CAT",    scrambled: ["T","A","C"],       hint: "A FLUFFY ANIMAL THAT SAYS MEOW! 🐈" },
      { answer: "DOG",    scrambled: ["G","O","D"],       hint: "PEOPLE'S BEST FRIEND! 🐕" },
      { answer: "PIG",    scrambled: ["G","P","I"],       hint: "A PINK ANIMAL THAT SAYS OINK! 🐷" },
      { answer: "HEN",    scrambled: ["E","H","N"],       hint: "A BIRD THAT LAYS EGGS! 🐔" },
      { answer: "COW",    scrambled: ["O","C","W"],       hint: "IT GIVES MILK AND LIVES ON A FARM! 🐄" },
      { answer: "RED",    scrambled: ["D","E","R"],       hint: "THE COLOR OF AN APPLE AND A HEART! ❤️" },
      { answer: "BLUE",   scrambled: ["U","L","E","B"],   hint: "THE COLOR OF THE SKY AND THE SEA! 🔵" },
      { answer: "SUN",    scrambled: ["N","U","S"],       hint: "IT SHINES IN THE SKY EVERY DAY! 🌞" },
      { answer: "EGG",    scrambled: ["G","E","G"],       hint: "A HEN LAYS THIS EVERY DAY! 🥚" },
      { answer: "BAG",    scrambled: ["G","B","A"],       hint: "YOU CARRY IT TO SCHOOL! 🎒" },
      { answer: "HAT",    scrambled: ["T","H","A"],       hint: "YOU WEAR IT ON YOUR HEAD! 🎩" },
      { answer: "CUP",    scrambled: ["P","C","U"],       hint: "YOU DRINK WATER OR JUICE FROM IT! 🥤" }
    ],

    star_title: "CONNECT THE DOTS IN ORDER TO DRAW THE MAGIC SHAPE!",

    // Variation bank — Room 3: connect-the-dots (magic shapes)
    star_bank: [
      {
        name: "5-POINTED STAR",
        done: "AMAZING! YOU DREW A 5-POINTED STAR! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:0},{x:61,y:35},{x:98,y:35},{x:68,y:57},{x:79,y:91},{x:50,y:70},{x:21,y:91},{x:32,y:57},{x:2,y:35},{x:39,y:35}]
      },
      {
        name: "TRIANGLE",
        done: "FANTASTIC! YOU DREW A TRIANGLE! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:5},{x:95,y:90},{x:5,y:90}]
      },
      {
        name: "PENTAGON",
        done: "GREAT JOB! YOU DREW A PENTAGON! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:3},{x:97,y:36},{x:78,y:94},{x:22,y:94},{x:3,y:36}]
      },
      {
        name: "DIAMOND",
        done: "BEAUTIFUL SHAPE! YOU DREW A DIAMOND! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:5},{x:95,y:50},{x:50,y:95},{x:5,y:50}]
      },
      {
        name: "ARROW",
        done: "PERFECT! YOU DREW AN ARROW! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:5},{x:95,y:50},{x:70,y:50},{x:70,y:95},{x:30,y:95},{x:30,y:50},{x:5,y:50}]
      },
      {
        name: "HEXAGON",
        done: "AMAZING! YOU DREW A HEXAGON! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:5},{x:90,y:27},{x:90,y:73},{x:50,y:95},{x:10,y:73},{x:10,y:27}]
      },
      {
        name: "CROSS",
        done: "WELL DONE! YOU DREW A CROSS SHAPE! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:35,y:5},{x:65,y:5},{x:65,y:35},{x:95,y:35},{x:95,y:65},{x:65,y:65},{x:65,y:95},{x:35,y:95},{x:35,y:65},{x:5,y:65},{x:5,y:35},{x:35,y:35}]
      },
      {
        name: "HOUSE",
        done: "HOW CREATIVE! YOU DREW A LITTLE HOUSE! PUZZLE 3 COMPLETE. NOW GO TALK TO THE DRAGON.",
        points: [{x:50,y:5},{x:95,y:45},{x:80,y:45},{x:80,y:95},{x:20,y:95},{x:20,y:45},{x:5,y:45}]
      }
    ],

    dragon_intro: "THE DRAGON LOOKS AT YOU, THOUGHTFULLY...",
    dragon_text: "\"YOU SOLVED MY 3 PUZZLES! BUT BEFORE I GIVE YOU THE KEY, TELL ME: IF A FRIEND IS HAVING TROUBLE SOLVING SOMETHING, WHAT DO YOU DO?\"",
    dragon_choice1: "HELP PATIENTLY",
    dragon_choice2: "DO IT MYSELF AND RUN OFF",
    dragon_wrong: "HMM... A GOOD FRIEND IS PATIENT AND HELPS THOSE IN NEED. THINK AGAIN!",
    dragon_right: "THAT'S THE ANSWER OF A TRUE FRIEND! 💙 TEAMWORK AND PATIENCE OPEN DOORS THAT RUSHING NEVER CAN. HERE IS THE KEY!",
    r3_keyFound: "YOU EARNED THE DRAGON'S TRUST AND THE KEY! 🔑 WALK TO THE DOOR!",
    doorReached3: "CONGRATULATIONS! YOU FINISHED ALL 3 ROOMS! 🎉🐉",
    lumiHint3: "LUMI'S HINT: START WITH THE PUZZLE THAT HAS THE GEAR, ON THE LEFT SIDE! 💙",

    success_title: "CONGRATULATIONS, EXPLORER!",
    success_text: "YOU COMPLETED ALL 3 ROOMS USING TEAMWORK, MATH, GEOMETRY, ENGLISH AND LOTS OF PATIENCE! YOU LEARNED TO TRUST THE PEOPLE WHO CARE FOR YOU AND TO NEVER SHARE PERSONAL INFO WITH STRANGERS. SEE YOU ON THE NEXT ADVENTURE! 🐉✨"
  }
};
