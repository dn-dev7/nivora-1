import type {Question} from './questions';
const curated:[string,string,string,string[],number,string][]=[
 [
  "Matemática",
  "Conceitos",
  "A média de 4, 6 e 8 é:",
  [
   "4",
   "6",
   "8",
   "18"
  ],
  1,
  "Some os valores e divida pela quantidade: (4 + 6 + 8) ÷ 3 = 6."
 ],
 [
  "Matemática",
  "Conceitos",
  "Ao lançar um dado comum, a chance de sair um número par é:",
  [
   "1/3",
   "1/2",
   "1",
   "1/6"
  ],
  1,
  "Dos seis resultados possíveis, três são pares: 2, 4 e 6."
 ],
 [
  "Matemática",
  "Conceitos",
  "A soma dos ângulos internos de um triângulo é:",
  [
   "270°",
   "360°",
   "90°",
   "180°"
  ],
  3,
  "Todo triângulo plano tem soma dos ângulos internos igual a 180°."
 ],
 [
  "Matemática",
  "Conceitos",
  "A raiz quadrada principal de 81 é:",
  [
   "27",
   "8",
   "9",
   "18"
  ],
  2,
  "9 × 9 = 81; a raiz principal é não negativa."
 ],
 [
  "Matemática",
  "Conceitos",
  "O número 0,25 corresponde à fração:",
  [
   "1/2",
   "1/4",
   "2/5",
   "3/4"
  ],
  1,
  "0,25 = 25/100 = 1/4."
 ],
 [
  "Matemática",
  "Conceitos",
  "Qual número é primo?",
  [
   "15",
   "17",
   "21",
   "9"
  ],
  1,
  "17 tem exatamente dois divisores positivos: 1 e 17."
 ],
 [
  "Matemática",
  "Conceitos",
  "Na sequência 3, 6, 9, 12, o próximo termo é:",
  [
   "15",
   "18",
   "13",
   "14"
  ],
  0,
  "Cada termo aumenta 3 unidades: 12 + 3 = 15."
 ],
 [
  "Matemática",
  "Conceitos",
  "A mediana de 2, 4, 7, 9 e 10 é:",
  [
   "9",
   "4",
   "6",
   "7"
  ],
  3,
  "Com os dados ordenados, a mediana é o valor central: 7."
 ],
 [
  "Português",
  "Língua e texto",
  "Em “A menina leu o livro”, o sujeito é:",
  [
   "A menina",
   "leu",
   "o livro",
   "leu o livro"
  ],
  0,
  "O sujeito indica quem realizou a ação: a menina."
 ],
 [
  "Português",
  "Língua e texto",
  "Qual palavra é um verbo?",
  [
   "Correr",
   "Azul",
   "Ontem",
   "Casa"
  ],
  0,
  "Correr expressa uma ação e pode ser conjugado."
 ],
 [
  "Português",
  "Língua e texto",
  "Qual palavra é proparoxítona?",
  [
   "Lâmpada",
   "Papel",
   "Café",
   "Mesa"
  ],
  0,
  "Em lâmpada, a sílaba tônica é a antepenúltima: lâm."
 ],
 [
  "Português",
  "Língua e texto",
  "Em “Estudou, mas não revisou”, “mas” indica:",
  [
   "Finalidade",
   "Adição",
   "Oposição",
   "Causa"
  ],
  2,
  "Mas estabelece oposição entre as duas ideias."
 ],
 [
  "Português",
  "Língua e texto",
  "Qual frase usa “por que” adequadamente?",
  [
   "Por que você faltou?",
   "Eu faltei por que estava doente.",
   "Esse é o por que.",
   "Não sei o por que da falta."
  ],
  0,
  "Em uma pergunta direta sobre o motivo, usa-se por que separado e sem acento."
 ],
 [
  "Português",
  "Língua e texto",
  "Em “O vento cantava”, há:",
  [
   "Uma instrução literal",
   "Uma comparação com como",
   "Um dado numérico",
   "Personificação"
  ],
  3,
  "Uma ação humana, cantar, foi atribuída ao vento."
 ],
 [
  "Português",
  "Língua e texto",
  "Um resumo deve:",
  [
   "Repetir todo o texto",
   "Eliminar o assunto central",
   "Preservar as ideias principais",
   "Inventar um novo final"
  ],
  2,
  "Resumir é apresentar as ideias essenciais com menos palavras."
 ],
 [
  "Português",
  "Língua e texto",
  "Qual frase apresenta opinião?",
  [
   "A prova será na terça.",
   "A biblioteca abre às oito.",
   "O livro tem cem páginas.",
   "Este é o melhor livro da coleção."
  ],
  3,
  "Melhor expressa uma avaliação de quem fala, não um fato verificável por si só."
 ],
 [
  "História",
  "História do Brasil",
  "A Independência do Brasil foi proclamada em:",
  [
   "1500",
   "1822",
   "1888",
   "1889"
  ],
  1,
  "A data da proclamação da Independência é 7 de setembro de 1822."
 ],
 [
  "História",
  "História do Brasil",
  "A Lei Áurea, de 1888, determinou:",
  [
   "A criação da República",
   "A Independência",
   "A criação de Brasília",
   "A abolição da escravidão no Brasil"
  ],
  3,
  "A Lei Áurea aboliu legalmente a escravidão no Brasil."
 ],
 [
  "História",
  "História do Brasil",
  "A República foi proclamada no Brasil em:",
  [
   "1889",
   "1930",
   "1822",
   "1888"
  ],
  0,
  "A proclamação da República ocorreu em 15 de novembro de 1889."
 ],
 [
  "História",
  "História do Brasil",
  "Um documento produzido na época estudada pode ser:",
  [
   "Uma previsão do futuro",
   "Uma fonte histórica",
   "Uma garantia de neutralidade",
   "Uma prova de que não houve conflitos"
  ],
  1,
  "Documentos da época são fontes históricas e precisam ser analisados em seu contexto."
 ],
 [
  "História",
  "História do Brasil",
  "A Revolução Industrial começou na:",
  [
   "Inglaterra",
   "Argentina",
   "Índia",
   "Austrália"
  ],
  0,
  "A primeira fase da Revolução Industrial começou na Inglaterra, no século XVIII."
 ],
 [
  "História",
  "História do Brasil",
  "A Revolução Francesa começou em:",
  [
   "1789",
   "1914",
   "1945",
   "1500"
  ],
  0,
  "1789 marca o início da Revolução Francesa."
 ],
 [
  "História",
  "História do Brasil",
  "A Segunda Guerra Mundial terminou em:",
  [
   "1945",
   "1989",
   "1918",
   "1939"
  ],
  0,
  "O conflito terminou em 1945."
 ],
 [
  "História",
  "História do Brasil",
  "A Constituição brasileira atualmente conhecida como Constituição Cidadã foi promulgada em:",
  [
   "1988",
   "1824",
   "1889",
   "1964"
  ],
  0,
  "A Constituição de 1988 ampliou direitos e ficou conhecida como Constituição Cidadã."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "Na fotossíntese, plantas utilizam principalmente:",
  [
   "Luz, água e gás carbônico",
   "Som, areia e oxigênio",
   "Somente oxigênio",
   "Somente sais minerais"
  ],
  0,
  "A energia da luz permite produzir matéria orgânica a partir de água e gás carbônico."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "Qual é um produtor em uma cadeia alimentar?",
  [
   "Leão",
   "Fungo decompositor",
   "Gafanhoto",
   "Capim"
  ],
  3,
  "O capim produz sua matéria orgânica por fotossíntese."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "A passagem do líquido para o gás é chamada:",
  [
   "Solidificação",
   "Condensação",
   "Fusão",
   "Vaporização"
  ],
  3,
  "Vaporização é a transformação do estado líquido para o gasoso."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "A rotação da Terra está relacionada principalmente:",
  [
   "À composição dos oceanos",
   "Ao dia e à noite",
   "À formação das montanhas",
   "Ao número de continentes"
  ],
  1,
  "Ao girar em torno do próprio eixo, a Terra alterna as regiões iluminadas pelo Sol."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "Uma fonte renovável de energia é:",
  [
   "Petróleo",
   "Carvão mineral",
   "Energia solar",
   "Gás natural"
  ],
  2,
  "A energia solar é continuamente disponibilizada pelo Sol."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "O ciclo da água inclui:",
  [
   "Somente combustão",
   "Somente fusão de rochas",
   "A criação de novos átomos",
   "Evaporação, condensação e precipitação"
  ],
  3,
  "A água circula entre atmosfera, superfície e subsolo por vários processos."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "Qual material geralmente conduz bem eletricidade?",
  [
   "Vidro",
   "Plástico",
   "Cobre",
   "Borracha"
  ],
  2,
  "O cobre é um metal condutor usado em fios elétricos."
 ],
 [
  "Ciências",
  "Natureza e ambiente",
  "O saneamento básico contribui para:",
  [
   "Aumentar a poluição dos rios",
   "Reduzir doenças de transmissão hídrica",
   "Eliminar a necessidade de água",
   "Substituir a alimentação"
  ],
  1,
  "Água tratada e coleta de esgoto reduzem o contato com agentes causadores de doenças."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "Latitude mede a distância angular em relação:",
  [
   "À linha do Equador",
   "Ao meridiano de Greenwich",
   "Ao nível do mar",
   "Ao núcleo terrestre"
  ],
  0,
  "A latitude varia ao norte e ao sul da linha do Equador."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "Longitude é medida em relação:",
  [
   "Ao meridiano de Greenwich",
   "Ao polo Norte",
   "Ao oceano Pacífico",
   "Ao Trópico de Capricórnio"
  ],
  0,
  "A longitude indica a posição a leste ou a oeste de Greenwich."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "A legenda de um mapa explica:",
  [
   "Somente o norte",
   "O clima de todos os países",
   "Seus símbolos e cores",
   "A idade do leitor"
  ],
  2,
  "A legenda permite interpretar as convenções usadas no mapa."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "Em uma escala 1:100.000, 1 cm no mapa representa:",
  [
   "100 km",
   "10 m",
   "100 m",
   "1 km"
  ],
  3,
  "100.000 cm correspondem a 1.000 m, ou 1 km."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "Clima corresponde:",
  [
   "A padrões atmosféricos de longos períodos",
   "A uma única chuva",
   "Ao tempo de amanhã",
   "À altitude de um prédio"
  ],
  0,
  "Clima é caracterizado por padrões e variações atmosféricas observados ao longo de muitos anos."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "Urbanização é:",
  [
   "A extinção de todas as áreas rurais",
   "A formação de oceanos",
   "A redução obrigatória das cidades",
   "O crescimento da participação da população urbana"
  ],
  3,
  "Urbanização envolve o aumento da proporção da população que vive em cidades."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "O Brasil está localizado principalmente no hemisfério:",
  [
   "Oriental",
   "Ártico",
   "Norte",
   "Sul"
  ],
  3,
  "A maior parte do território brasileiro fica ao sul da linha do Equador."
 ],
 [
  "Geografia",
  "Espaço geográfico",
  "O movimento de placas tectônicas pode provocar:",
  [
   "A criação instantânea de água",
   "Terremotos",
   "A mudança das fases da Lua",
   "A rotação do Sol"
  ],
  1,
  "A liberação de energia nas áreas de contato ou falhas pode causar terremotos."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Complete: She ___ a student.",
  [
   "am",
   "is",
   "are",
   "be"
  ],
  1,
  "Com she, o verbo to be no presente é is."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "O plural de child é:",
  [
   "childes",
   "children",
   "childrens",
   "childs"
  ],
  1,
  "Children é o plural irregular de child."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Qual é o passado de go?",
  [
   "went",
   "going",
   "goed",
   "gone"
  ],
  0,
  "Went é o passado simples de go; gone é o particípio."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "A expressão “How are you?” pergunta:",
  [
   "Qual é seu nome",
   "Como você está",
   "Onde você mora",
   "Quantos anos tem"
  ],
  1,
  "How are you? é uma pergunta sobre como a pessoa está."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Complete: I have ___ apple.",
  [
   "a",
   "an",
   "the a",
   "are"
  ],
  1,
  "Usa-se an antes de um som de vogal, como o início de apple."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Qual palavra significa “livro”?",
  [
   "Book",
   "Chair",
   "Door",
   "Table"
  ],
  0,
  "Book significa livro."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Complete: They ___ studying now.",
  [
   "are",
   "be",
   "is",
   "am"
  ],
  0,
  "Com they, usa-se are no presente contínuo: are studying."
 ],
 [
  "Inglês",
  "Vocabulário e gramática",
  "Qual expressão indica frequência?",
  [
   "Here",
   "Always",
   "Yesterday",
   "Tomorrow"
  ],
  1,
  "Always significa sempre e é um advérbio de frequência."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "A unidade básica estrutural e funcional dos seres vivos é:",
  [
   "A célula",
   "O planeta",
   "O mineral",
   "O elétron"
  ],
  0,
  "A célula é a unidade básica dos organismos vivos."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "Nas células eucarióticas, o núcleo contém principalmente:",
  [
   "Areia",
   "Luz armazenada",
   "Som",
   "Material genético"
  ],
  3,
  "O núcleo abriga a maior parte do DNA da célula eucariótica."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "A mitocôndria está associada principalmente:",
  [
   "Ao transporte de sangue",
   "À formação de rochas",
   "À respiração celular",
   "À digestão no estômago"
  ],
  2,
  "Na mitocôndria ocorrem etapas da respiração celular ligadas à produção de ATP."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "A membrana plasmática:",
  [
   "Impede toda entrada de água",
   "Controla a passagem de substâncias",
   "É exclusiva de plantas",
   "Substitui o DNA"
  ],
  1,
  "A membrana delimita a célula e apresenta permeabilidade seletiva."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "A mitose geralmente produz:",
  [
   "Duas células com o mesmo número de cromossomos da célula inicial",
   "Quatro gametas",
   "Somente uma célula",
   "Células sem DNA"
  ],
  0,
  "Na mitose, o material genético duplicado é distribuído entre duas células-filhas."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "Em uma cadeia alimentar, decompositores:",
  [
   "Produzem luz solar",
   "Eliminam todos os consumidores",
   "Criam energia do nada",
   "Reciclam nutrientes da matéria orgânica"
  ],
  3,
  "Fungos e bactérias decompositores participam da reciclagem de nutrientes."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "DNA é uma molécula ligada:",
  [
   "À previsão do tempo",
   "À produção de som",
   "À informação genética",
   "À composição de rochas"
  ],
  2,
  "O DNA armazena informações utilizadas no funcionamento e na reprodução celular."
 ],
 [
  "Biologia",
  "Células e ecologia",
  "Um conjunto de indivíduos da mesma espécie em uma área forma:",
  [
   "Um mineral",
   "Uma população",
   "Um bioma inteiro",
   "Uma organela"
  ],
  1,
  "População é o conjunto de indivíduos da mesma espécie que vive em uma área."
 ],
 [
  "Física",
  "Movimento e energia",
  "Um objeto percorre 100 m em 20 s. Sua velocidade média é:",
  [
   "2 m/s",
   "5 m/s",
   "20 m/s",
   "100 m/s"
  ],
  1,
  "Velocidade média = distância ÷ tempo = 100 ÷ 20 = 5 m/s."
 ],
 [
  "Física",
  "Movimento e energia",
  "A unidade de força no Sistema Internacional é:",
  [
   "Joule",
   "Watt",
   "Metro",
   "Newton"
  ],
  3,
  "A unidade de força é o newton, símbolo N."
 ],
 [
  "Física",
  "Movimento e energia",
  "A energia cinética está associada:",
  [
   "Somente à temperatura do Sol",
   "À ausência de massa",
   "Ao movimento",
   "Somente à altura"
  ],
  2,
  "Um corpo em movimento possui energia cinética."
 ],
 [
  "Física",
  "Movimento e energia",
  "Pela segunda lei de Newton, F é igual a:",
  [
   "m + a",
   "m × a",
   "m ÷ a",
   "a ÷ m"
  ],
  1,
  "A força resultante é o produto da massa pela aceleração."
 ],
 [
  "Física",
  "Movimento e energia",
  "Um corpo de 2 kg sob aceleração de 3 m/s² recebe força resultante de:",
  [
   "1 N",
   "5 N",
   "6 N",
   "9 N"
  ],
  2,
  "F = m × a = 2 × 3 = 6 N."
 ],
 [
  "Física",
  "Movimento e energia",
  "O som não se propaga:",
  [
   "Na água",
   "No ar",
   "Em sólidos",
   "No vácuo"
  ],
  3,
  "O som é uma onda mecânica e precisa de um meio material."
 ],
 [
  "Física",
  "Movimento e energia",
  "A unidade de energia no Sistema Internacional é:",
  [
   "Segundo",
   "Kelvin",
   "Joule",
   "Ampere"
  ],
  2,
  "A unidade de energia é o joule, símbolo J."
 ],
 [
  "Física",
  "Movimento e energia",
  "A corrente elétrica é medida em:",
  [
   "Watt",
   "Ampere",
   "Volt",
   "Ohm"
  ],
  1,
  "A unidade de corrente elétrica é o ampere, símbolo A."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Uma substância formada por apenas um elemento químico é:",
  [
   "Simples",
   "Composta",
   "Sempre uma mistura",
   "Sempre líquida"
  ],
  0,
  "Substâncias simples contêm átomos de um único elemento químico."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Na fórmula H₂O, existem:",
  [
   "Um átomo de H e dois de O",
   "Dois de cada elemento",
   "Três átomos de O",
   "Dois átomos de H e um de O"
  ],
  3,
  "O índice 2 se aplica ao H; sem índice, o O aparece uma vez."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Um átomo eletricamente neutro possui:",
  [
   "Mais elétrons que prótons",
   "Nenhum nêutron obrigatoriamente",
   "Igual número de prótons e elétrons",
   "Somente prótons"
  ],
  2,
  "Cargas positivas e negativas se equilibram quando prótons e elétrons têm a mesma quantidade."
 ],
 [
  "Química",
  "Matéria e átomos",
  "O pH menor que 7 indica, em solução aquosa a 25 °C:",
  [
   "Ausência de água",
   "Caráter ácido",
   "Caráter básico",
   "Neutralidade"
  ],
  1,
  "Nessas condições, soluções ácidas apresentam pH abaixo de 7."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Isótopos de um elemento têm:",
  [
   "Mesmo número de prótons e diferentes números de nêutrons",
   "Mesmo número de nêutrons obrigatoriamente",
   "Diferentes números de prótons",
   "Nenhum elétron"
  ],
  0,
  "O elemento é definido pelo número de prótons; isótopos diferem no número de nêutrons."
 ],
 [
  "Química",
  "Matéria e átomos",
  "A destilação simples pode separar:",
  [
   "Dois sólidos por tamanho",
   "Somente gases idênticos",
   "Prótons de nêutrons",
   "Um sólido dissolvido de um líquido, recuperando o líquido"
  ],
  3,
  "O líquido é vaporizado e condensado, enquanto o sólido não volátil permanece no recipiente."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Uma mistura homogênea apresenta:",
  [
   "Três fases obrigatórias",
   "Somente elementos puros",
   "Uma fase visível",
   "Sempre dois líquidos"
  ],
  2,
  "Uma mistura homogênea apresenta uma única fase."
 ],
 [
  "Química",
  "Matéria e átomos",
  "Oxidação envolve:",
  [
   "Eliminação de todos os átomos",
   "Perda de elétrons",
   "Ganho de elétrons",
   "Criação de prótons"
  ],
  1,
  "Oxidação é a perda de elétrons; redução é o ganho de elétrons."
 ]
];
export const extraQuestions:Question[]=curated.map(([subject,topic,text,options,answer,explanation],i)=>({id:'nivo-v2-'+i,subject,topic,text,options,answer,explanation,difficulty:'Média'}));
for(let i=1;i<=12;i++){
 const numeric=(id:string,topic:string,text:string,value:number,explanation:string)=>{const options=[value,value+1,value+2,value-1].map(String),shift=i%4;extraQuestions.push({id,subject:'Matemática',topic,text,options:[...options.slice(shift),...options.slice(0,shift)],answer:(4-shift)%4,explanation,difficulty:'Fácil'})};
 const base=i*20,rate=(i%4+1)*5;
 numeric('percent-v2-'+i,'Porcentagem',`Quanto é ${rate}% de ${base}?`,base*rate/100,`Divida ${rate} por 100 e multiplique por ${base}: ${base*rate/100}.`);
 numeric('fraction-v2-'+i,'Frações',`Quanto é 1/4 de ${i*8}?`,i*2,`Um quarto significa dividir por 4: ${i*8} ÷ 4 = ${i*2}.`);
 numeric('area-v2-'+i,'Geometria',`Um retângulo mede ${i+2} cm por ${i+4} cm. Qual é sua área em cm²?`,(i+2)*(i+4),`Área = base × altura = ${i+2} × ${i+4} = ${(i+2)*(i+4)} cm².`);
 numeric('power-v2-'+i,'Potências',`Qual é o resultado de ${i+1}²?`,(i+1)**2,`${i+1}² = ${i+1} × ${i+1} = ${(i+1)**2}.`);
}
