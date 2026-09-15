import {extraQuestions} from './question-expansion';
export type Question={id:string;subject:string;topic:string;difficulty:string;text:string;options:string[];answer:number;explanation:string};
const q=(id:string,subject:string,topic:string,text:string,options:string[],answer:number,explanation:string,difficulty='Média'):Question=>({id,subject,topic,text,options,answer,explanation,difficulty});
export const questions:Question[]=[
...Array.from({length:20},(_,i)=>{const a=i+2,b=i+3,c=a*b;return q('math-'+i,'Matemática','Equações',`Qual é o valor de x em ${a}x + ${b} = ${c+b}?`,[String(b),String(b+1),String(b-1),String(b+2)].sort((x,y)=>Number(x)-Number(y)),1,`Subtraia ${b} dos dois lados: ${a}x = ${c}. Dividindo por ${a}, x = ${b}.`,'Fácil')}),
q('s1','Ciências','Reações químicas','Qual situação apresenta formação de uma nova substância?',['Gelo derretendo','Água evaporando','Ferro enferrujando','Vidro quebrando'],2,'A ferrugem surge quando o ferro reage com oxigênio na presença de água. As demais situações são transformações físicas.','Fácil'),
q('s2','Ciências','Reações químicas','Em um sistema fechado, a massa total após uma reação química é:',['Menor','Maior','Igual à massa inicial','Sempre zero'],2,'Os átomos são reorganizados. Em um sistema fechado, a massa total se conserva.'),
q('s3','Ciências','Balanceamento','Quais coeficientes balanceiam H₂ + O₂ → H₂O?',['1, 1, 1','2, 1, 2','1, 2, 1','2, 2, 1'],1,'2H₂ + O₂ → 2H₂O possui quatro átomos de H e dois de O em cada lado.'),
q('s4','Ciências','Tabela periódica','O número atômico de um elemento indica seu número de:',['Nêutrons','Prótons','Camadas eletrônicas','Prótons e nêutrons'],1,'O número atômico Z identifica a quantidade de prótons no núcleo.','Fácil'),
q('s5','Ciências','Tabela periódica','Os elementos de uma mesma família ocupam:',['Uma coluna','Uma linha','Uma diagonal','Toda a tabela'],0,'As famílias, também chamadas grupos, são as colunas da tabela periódica.','Fácil'),
q('s6','Ciências','Ligações químicas','Uma ligação iônica envolve principalmente:',['Compartilhamento de prótons','Transferência de elétrons','Divisão de núcleos','Criação de átomos'],1,'A transferência de elétrons forma íons de cargas opostas, que se atraem.'),
q('s7','Ciências','Ligações químicas','Na ligação covalente, os átomos:',['Compartilham elétrons','Trocam prótons','Perdem seus núcleos','Sempre viram metais'],0,'Pares de elétrons são compartilhados entre átomos.'),
q('s8','Ciências','Balanceamento','Na equação N₂ + 3H₂ → 2NH₃, quantos átomos de hidrogênio há em cada lado?',['2','3','6','9'],2,'3H₂ tem seis átomos de H, assim como 2NH₃.'),
q('s9','Ciências','Reações químicas','Uma reação que libera calor é chamada:',['Endotérmica','Exotérmica','Isotônica','Inerte'],1,'Reações exotérmicas transferem energia na forma de calor para o ambiente.'),
q('s10','Ciências','Tabela periódica','Os períodos da tabela periódica correspondem às:',['Colunas','Linhas','Massas','Cargas'],1,'Os períodos são as linhas horizontais.','Fácil'),
q('p1','Português','Gramática','Em “Os alunos estudaram ontem”, qual é o núcleo do sujeito?',['Os','Alunos','Estudaram','Ontem'],1,'O sujeito é “Os alunos”, e seu núcleo, a palavra central, é “alunos”.','Fácil'),
q('p2','Português','Gramática','Qual palavra é um advérbio em “Ela respondeu rapidamente”?',['Ela','Respondeu','Rapidamente','Nenhuma'],2,'“Rapidamente” modifica o verbo e indica modo.','Fácil'),
q('p3','Português','Interpretação','Uma informação implícita é aquela que:',['Está escrita literalmente','Pode ser inferida pelo contexto','Sempre contradiz o texto','Não se relaciona ao texto'],1,'Inferir é chegar a uma conclusão com base nas pistas do texto, sem inventar informações.'),
q('p4','Português','Gramática','Qual frase apresenta concordância verbal adequada?',['Os alunos estuda','As meninas chegou','Nós estudamos','Eles vai'],2,'O verbo “estudamos” concorda com o sujeito “nós”.','Fácil'),
q('p5','Português','Interpretação','Em uma notícia, a finalidade predominante é:',['Informar sobre um acontecimento','Criar versos','Ensinar uma receita','Narrar só eventos imaginários'],0,'A notícia busca informar o leitor sobre fatos de interesse.','Fácil'),
q('h1','História','Guerra Fria','Quais países lideraram os dois principais blocos da Guerra Fria?',['Brasil e Argentina','Estados Unidos e União Soviética','França e Itália','China e Japão'],1,'Estados Unidos e União Soviética lideraram blocos com disputas políticas, econômicas e ideológicas.','Fácil'),
q('h2','História','Guerra Fria','A corrida espacial foi:',['Uma disputa tecnológica entre potências','Uma competição esportiva','Uma guerra na Lua','Um acordo colonial'],0,'A exploração espacial serviu também para demonstrar capacidade científica e tecnológica.'),
q('h3','História','Primeira Guerra','A Primeira Guerra Mundial começou em:',['1789','1914','1939','1945'],1,'O conflito começou em 1914 e terminou em 1918.','Fácil'),
q('h4','História','Primeira Guerra','Qual acordo impôs condições à Alemanha após a Primeira Guerra?',['Tratado de Versalhes','Tratado de Tordesilhas','Pacto de Varsóvia','Acordo de Paris de 2015'],0,'O Tratado de Versalhes, assinado em 1919, estabeleceu condições para a Alemanha.'),
q('h5','História','Guerra Fria','A queda do Muro de Berlim ocorreu em:',['1918','1945','1961','1989'],3,'O Muro de Berlim foi aberto em novembro de 1989.','Fácil')
,...extraQuestions
];
export const defaultSubjects=['Ciências','Matemática','Português','História','Geografia','Inglês','Biologia','Física','Química'];
export function publicQuestion(x:Question){const {answer,explanation,...rest}=x;return rest}
export function gradeAnswers(items:{id:string;answer:number}[]){if(!Array.isArray(items)||items.length<1||items.length>40||new Set(items.map(x=>x.id)).size!==items.length)throw Error('Lista de respostas inválida.');return items.map(item=>{const question=questions.find(q=>q.id===item.id);if(!question||!Number.isInteger(item.answer)||item.answer< -1||item.answer>=question.options.length)throw Error('Resposta inválida.');return {...question,selected:item.answer,correct:item.answer===question.answer}})}

export function shuffled<T>(items:T[]):T[]{const result=[...items];for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result}
