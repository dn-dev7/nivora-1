# NIVOSTUDY — briefing de produto e implementação

Crie e evolua o NIVOSTUDY como uma plataforma de performance pessoal aplicada ao estudo. Use a lógica de atividades e evolução social do Strava e o acabamento de aplicativos modernos de fitness como referências conceituais. Não copie marcas, telas, componentes, textos nem identidade visual de outros produtos.

O diferencial é conectar estudo ativo, preparação para provas e progresso social em um único ciclo:

**Estudar → praticar → entender → revisar → acompanhar → compartilhar.**

## 1. Princípios do produto

- Construa o aplicativo de estudos, não uma landing page anunciando suas funcionalidades.
- Priorize mobile com navegação inferior; no desktop, use sidebar e composições próprias para telas grandes.
- Mantenha cinco áreas: Hoje, Estudar, Comunidade, Progresso e Perfil.
- Reúna as ferramentas de estudo em Estudar. Provas, caderno de erros e flashcards são áreas vinculadas a esse fluxo, sem duplicação de sistemas.
- Dados de uma atividade devem atualizar todas as métricas por meio de um registro canônico. Nunca mantenha totais conflitantes em diferentes telas.
- Não invente histórico, usuários, acertos, sequências ou métricas. Sem atividades, exiba zeros, “ainda sem dados” e estados vazios úteis.
- Descanso faz parte da rotina. Metas devem ser ajustáveis, sem punição emocional, incentivo a estudar por horas excessivas ou notificações que pressionem o aluno.
- O Score não mede inteligência; preparação estimada não garante nota; XP não equivale a conhecimento.
- Recursos ainda não implementados não devem aparecer como botões funcionais ou resultados simulados.

## 2. Identidade visual original

Use grafite profundo, superfícies discretamente esverdeadas, verde elétrico como acento e branco suave no modo escuro. O modo claro deve possuir tokens próprios e contraste equivalente.

Defina tokens de fundo, superfície, texto, borda, sucesso, erro, alerta, domínio e gráficos. Como referência inicial: fundo #10120F, superfície #191C17, borda #30362B, texto #F2F4ED, texto secundário #A2AA9A e acento #C4F568. Não espalhe cores de destaque por todos os componentes.

Use títulos fortes, números grandes com boa legibilidade, espaço consistente, bordas sutis e cantos de 10 a 18 pixels. Evite gradientes excessivos, ícones escolares infantis, emojis, ilustrações genéricas e painéis compostos por dezenas de cartões pequenos.

O elemento marcante da Home será um painel de Score integrado a um gráfico semanal amplo. As demais informações devem seguir uma hierarquia clara: próxima ação, preparação para prova e matérias.

Use controles acessíveis, rótulos visíveis, foco de teclado, áreas de toque confortáveis e feedback curto. Respeite redução de movimento e ampliação de texto. Não dependa apenas de cor para comunicar acerto ou dificuldade.

## 3. Fluxo inicial e conta

A primeira utilização deve permitir escolher nome de exibição, nome de usuário, matérias e meta de dias por semana. Não solicite escola, turma, localização, notas ou nome completo como requisito.

Utilize autenticação real compatível com o ambiente de publicação. No protótipo hospedado em Sites, utilize identidade autenticada do ChatGPT. Não simule login nem armazene senhas no navegador. Para lançamento público independente, planeje uma integração de autenticação apropriada antes de anunciar cadastro público.

Persista perfil, sessões, respostas, provas, flashcards e atividades em armazenamento de servidor. Navegador deve guardar apenas preferências locais, como tema. Recarregar não pode apagar uma sessão ativa nem suas respostas já salvas.

## 4. Hoje

Mostre saudação, NivoStudy Score, foco de hoje, sequência, gráfico semanal, próxima prova e preparação estimada. O botão principal deve iniciar ou continuar a sessão ativa.

Apresente uma recomendação acionável, construída a partir de assuntos com baixa evidência ou menor aproveitamento. Mostre revisões pendentes, meta semanal e matérias em uma composição organizada. Se não houver prova ou histórico, ofereça uma ação simples em vez de recomendações fictícias.

## 5. Sessão de foco

Escolha matéria, assunto, objetivo e duração, incluindo modo livre. Durante o foco, mostre cronômetro grande, objetivo, pausa, continuar e finalizar.

Calcule o tempo com timestamps de servidor e tempo acumulado, sem depender de contar intervalos do navegador. Pausas devem interromper o tempo acumulado. Evite várias sessões ativas simultâneas e garanta que uma conclusão repetida não duplique a atividade.

Ao finalizar, peça um registro curto do aprendizado. Mostre tempo, matéria, assunto, XP e ação opcional de compartilhamento. O cronômetro sozinho não gera XP. Não alegue que o aplicativo consegue verificar atenção ou aprendizado a partir desse registro pessoal.

## 6. Questões, quizzes e simulados

Utilize um banco inicial de questões originais com matéria, assunto, dificuldade, alternativas, resposta correta e explicação. Faça correção no servidor; não envie o gabarito antes da conclusão.

Treino de questões: permita resolver uma questão ou pequenos conjuntos. Quiz: ofereça 5, 10 e 20 questões quando o banco comportar. Simulado: adicione limite de tempo e apresente gabarito ao concluir.

Filtros devem informar quando não há questões suficientes. Nunca repita questões para fingir que existe um banco maior. Não atribua dificuldade adaptativa a regras fixas ou conteúdo que não possui essa capacidade.

Salve respostas para retomada. A conclusão deve validar usuário, identidade do treino, conjunto de questões, alternativas e prazo. Questões sem resposta contam como erro. Não aceite do cliente percentuais, nota, XP ou status de acerto como verdade.

Resultados: acertos, percentual, tempo do treino, XP, explicações e assuntos para revisar. Compare simulados da mesma matéria quando houver histórico suficiente. Questões abertas e correção semântica ficam para uma etapa posterior com integração real.

## 7. Caderno de erros

Cada resposta incorreta deve entrar automaticamente com enunciado, alternativa escolhida, gabarito, explicação, matéria, assunto, data e número de tentativas.

Agrupe tentativas da mesma questão. Quando o aluno acertar novamente, retire-a dos erros pendentes mantendo o histórico. Permita entender a explicação, praticar o assunto e transformar a explicação em flashcard.

Não crie um segundo banco de questões isolado. A etapa seguinte deverá agendar reapresentação e gerar questões semelhantes com critérios transparentes.

## 8. Flashcards

Permita criação manual de pergunta e resposta, vinculadas a uma matéria. A revisão deve mostrar a pergunta, revelar a resposta e pedir: Não lembrei, Difícil, Bom ou Fácil.

Uma regra inicial explícita pode reagendar “não lembrei” em 10 minutos e os demais estados em intervalos crescentes de dias. Guarde intervalo e próxima revisão no servidor. Evite conceder XP repetido ao revisar o mesmo vencimento.

Exiba a data da próxima revisão, a fila disponível e um estado de conclusão. Um algoritmo avançado de repetição espaçada poderá substituir a regra inicial sem perder o histórico.

## 9. Tenho uma prova

Cadastre nome, matéria, data e conteúdos. Relacione os conteúdos aos assuntos cadastrados. Use a prática recente para destacar assuntos fortes, fracos e sem evidência.

O plano deve priorizar conteúdos com menos prática e menor aproveitamento. A primeira versão deve oferecer a próxima sessão e treino recomendado. Depois evolua para uma agenda diária com tarefas distribuídas até a data da prova e ajustadas à disponibilidade do usuário.

Chame o indicador de “Preparação estimada” na interface em português; Exam Ready pode ser o nome conceitual do sistema. Apresente a composição ou explicação acessível. Sem evidência, não atribua domínio só porque o cronômetro ficou ligado.

Regra inicial: calcular a média dos conteúdos usando acertos recentes, um fator de volume de prática que exige ao menos cinco tentativas e redução gradual por tempo sem treino. Mostre volume e acertos separadamente. Explique que a estimativa não prevê a nota real.

## 10. NivoStudy Score

Utilize uma fórmula transparente de rotina recente, na escala 0–100. Regra inicial:

- Constância: 30%, em relação à meta pessoal de dias.
- Foco: 15%, com contribuição limitada por sessão.
- Revisões: 20%, considerando revisões concluídas.
- Questões: 20%, considerando estudo ativo.
- Metas: 15%, em relação à semana atual.

Use janela recente de sete dias para rotina e semana de segunda a domingo para metas. Limite os componentes a 100 e apresente os critérios. Valores devem ser recalculados a partir das atividades, sem incrementos arbitrários. Uniformize o fuso horário escolhido para dias, sequência e resumos.

## 11. XP, níveis, progresso e recordes

Conceda XP por ações reais: respostas, revisões e conclusões com registro de aprendizado. Limite recompensas por repetição. Um modelo inicial permite até 10 XP para as três primeiras sessões concluídas do dia, 8 para acerto novo, 3 para erro novo e 5 por revisão de cartão vencido. Repetir a mesma questão no mesmo dia continua contando como prática, mas não gera novo XP.

Nível geral e por matéria devem derivar do XP. Mostre tempo de foco, respostas, acertos, histórico e estados de domínio. Evite confundir uma amostra pequena com domínio: com menos de cinco tentativas, mostre “Em avaliação”.

Radar: Não iniciado, Em avaliação, Dificuldade, Precisa revisar, Bom e Dominado. Mostre critério e volume de evidência.

Recordes devem refletir histórico real: maior sequência, maior sessão, melhor semana, mais questões em um dia, melhor simulado e revisões semanais. Dê feedback curto quando surgir um novo recorde ou nível. Não estimule maratonas como objetivo de saúde ou sucesso.

## 12. Comunidade e privacidade

O feed contém exclusivamente atividades de estudo: foco, quizzes, simulados, revisões, desafios e conquistas. Não crie um feed genérico de fotos.

Permita seguir pelo nome de usuário. “Amigos” significa relação mútua. Aplaudir e comentar devem respeitar a mesma autorização de leitura da atividade.

Toda atividade começa como Somente eu. O usuário escolhe Amigos ou Pública ao compartilhar. Não publique automaticamente o texto pessoal de aprendizado, notas ou detalhes privados da prova. Não coloque identificadores internos ou dados de contato no feed.

Valide visibilidade no servidor em cada leitura e escrita, inclusive comentários. Para lançamento com vários usuários, acrescente bloqueio, denúncia, exclusão de comentários e moderação antes de ampliar acesso.

Clubes, metas coletivas e rankings ficam para a etapa seguinte. Rankings devem ser opcionais e baseados em constância, desafios ou evolução, nunca só em horas nem em características pessoais do estudante.

## 13. Desafios e resumo semanal

A primeira versão oferece desafios pessoais derivados das atividades: dias estudados, questões, revisões e simulados. Mostre progresso automático e conclusão.

Gere o resumo semanal com dados reais: foco, questões, acertos, sequência, diferença da semana anterior e matéria em destaque quando houver evidência. Permita compartilhar um texto útil imediatamente. Exportação de cards como imagem é uma entrega separada; não anuncie exportação de imagem se só houver texto.

## 14. IA e materiais próprios — próxima etapa

A IA deve trabalhar nos bastidores, sem transformar Hoje em um chatbot. Integre geração de questões, explicações, flashcards, resumos e sugestões somente quando existir um serviço real configurado.

Upload de foto, texto e arquivo exige tipos permitidos, limites, armazenamento autorizado, tratamento de falhas e privacidade. Use materiais próprios ou autorizados; não reproduza obras protegidas integralmente. Mostre que conteúdo gerado pode precisar de revisão.

Dificuldade adaptativa e recomendações avançadas precisam usar histórico suficiente. Não chame uma recomendação simples por percentual de “IA”. Não simule respostas de IA nem invente análises.

## 15. Arquitetura e validação

Mantenha perfil, sessões, treinos, respostas, atividades, provas, cartões e relações sociais com IDs duráveis. Estatísticas derivam das atividades e suas respostas. Escreva operações compostas de modo atômico e idempotente.

Use autenticação e autorização de servidor, consultas parametrizadas, validação de entradas e separação entre preferências e dados pessoais. Não registre segredos no código ou no Git. Preserve identidade do repositório e do projeto.

Verifique os fluxos principais: conta e perfil; iniciar/pausar/retomar/concluir; responder e retomar treino; corrigir e registrar erros; revisar cartão; recalcular Score e preparação; compartilhar sem vazar registros privados.

Inclua estados de carregamento, vazio, erro e sucesso. Falhas de salvamento devem preservar o que foi digitado e oferecer tentativa de recuperação. Documente limitações do banco, do serviço de autenticação e da etapa atual.

## 16. Ordem de entrega

**Etapa 1 — base funcional:** identidade, perfil, matérias, foco, questões, quiz, simulado, caderno de erros, flashcards, métricas, Score, XP, níveis, provas com priorização, feed, seguidores, desafios pessoais e resumo textual.

**Etapa 2 — lançamento social:** autenticação pública apropriada, moderação, clubes, metas coletivas, cards exportáveis, rankings opcionais e planos de prova com agenda diária.

**Etapa 3 — inteligência e materiais:** upload, geração por IA, revisão adaptativa, correção de questões abertas e análises mais avançadas.

Não tente concentrar todos os recursos na Home. Conclua uma etapa coerente, verifique o funcionamento e diga com precisão o que foi implementado. O NivoStudy deve tornar o conhecimento visível e o próximo passo simples.
