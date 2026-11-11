/* ============================================================
AI SHIFT - configuração do site
Edite só este arquivo para data, textos, motivos e programação.
============================================================ */
window.SITE = {
/* --- Modo teste ---
true = usa hour/minute abaixo (o relógio do site finge esse horário)
false = usa a hora real do computador
Só hora e minuto. Os segundos continuam andando sozinhos. */
test: {
enabled: false,
hour: 11,
minute: 20,
},

teams: {
inviteUrl:
"https://inter-co.zoom.us/j/91665509349",
},

brand: {
mark: "logos/customer-engineering.png",
name: "AI SHIFT",
by: "by Customer Engineering",
},

event: {
day: 12,
month: 11,
monthShort: "NOV",
monthName: "novembro",
year: 2026,
weekday: "quinta-feira",
venue: "Arena MRV",
street: "Rua Cristina Maria de Assis, 202",
neighborhood: "Califórnia",
city: "Belo Horizonte",
state: "MG",
zip: "30855-440",
startTime: "08:15",
startLabel: "A partir das 8h15",
startNote: "Café e network",
},

hero: {
title: "AI SHIFT",
subtitle: "Building the Future",
lede: "O Time de Customer Engineering te convida para um dia de conversa franca: como a IA está transformando a forma como construímos produtos digitais.",
cta: "Quero participar",
ctaUrl: "https://forms.cloud.microsoft/r/h3adE53xv3",
note: "Presencial na Arena MRV e com transmissão online.",
visual: "ai-orb.svg",
},

pillars: {
eyebrow: "O jeito Inter de fazer",
title: "Nossos Pilares",
sub: "Os cinco princípios que guiam como construímos produtos, tecnologia e times no Inter.",
items: [
{
name: "Foco no Cliente",
en: "Client Centricity",
color: "#5EC8F5",
ink: "#0B3B5C",
blurb:
"Colocamos o cliente no centro de cada decisão, criando experiências simples e relevantes.",
icon: "client",
},
{
name: "Excelência Operacional",
en: "Operational Excellence",
color: "#6FE3B8",
ink: "#0C4A38",
blurb:
"Buscamos eficiência, qualidade e disciplina em tudo o que fazemos.",
icon: "ops",
},
{
name: "Movidos pela Inovação",
en: "Driven by Innovation",
color: "#FF8EC8",
ink: "#6B1048",
blurb: "Desafiamos o status quo e usamos tecnologia para criar o novo.",
icon: "inova",
},
{
name: "Mentalidade Vencedora",
en: "Winning Mentality",
color: "#F4E34A",
ink: "#3F3800",
blurb:
"Acreditamos no impossível, agimos com ambição e entregamos resultados.",
icon: "win",
},
{
name: "Um só Time",
en: "Enterprise Thinking",
color: "#FF9A4A",
ink: "#5A2A00",
blurb:
"Crescemos juntos, com colaboração, confiança e propósito compartilhado.",
icon: "team",
},
],
},

bridge: {
copy: 'Um encontro com o time de Customer Engineering para falarmos sobre como estamos construindo o Presente e o Futuro com <span class="bridge-accent">Inteligência Artificial, Dados e Engenharia de Software</span>.',
},

reasons: {
eyebrow: "Por que participar?",
titleHtml: "Motivos para<br>estar lá",
sub: "Quatro frentes guiam o dia: de squads agênticos e IA em produção até a conversa de corredor com quem lidera a transformação no mercado financeiro.",
items: [
{
title: "IA Aplicada ao Mercado Financeiro",
tag: "Agentic AI, squads agênticos e casos reais de produção",
desc: "Da transformação de produtos digitais à operação de agentes em escala no mercado financeiro.",
},
{
title: "Engenharia de Software do Futuro",
tag: "Desenvolvimento agêntico e Harness Engineering",
desc: "Como times passam a construir software com agentes de IA com velocidade, qualidade e autonomia.",
},
{
title: "IA em Produção, de Verdade",
tag: "Governança, infraestrutura, segurança e custos",
desc: "O que muda quando agentes de IA operam em escala: da plataforma que sustenta os modelos aos agentes de voz em tempo real, passando pelas decisões que viabilizam ou travam a adoção.",
},
{
title: "Visão de Liderança e Futuro",
tag: "Inter, ACT Digital e Salesforce",
desc: "Painéis sobre o futuro do setor financeiro com IA, visão estratégica de quem lidera a transformação e o networking que só acontece ao vivo, com tour na Arena MRV - Estádio do Atlético-MG e happy hour.",
},
],
},

agenda: {
eyebrow: "Agenda",
title: "Programação do dia",
comingSoon: false,
comingSoonTitle: "Em breve",
comingSoonText:
"Em breve vamos trazer a programação completa do dia. Fique ligado.",
sessions: [
{
time: "08:15",
dur: 60,
title: "Café e network",
track: "Recepção",
type: "coffee",
desc: "Chegada na Arena MRV, café e um tempo pra se achar antes da abertura.",
},
{
time: "09:15",
dur: 10,
title: "Abertura",
track: "Palco principal",
type: "flag",
people: [
{ name: "Raquel Bellini", photo: "photos/raquel-bellini.png" },
],
},
{
time: "09:25",
dur: 10,
title: "Boas vindas",
track: "Palco principal",
type: "flag",
people: [
{ name: "Iago Moura", photo: "photos/iago-moura.png" },
],
},
{
time: "09:35",
dur: 45,
title:
"Como a Inteligência Artificial está transformando o trabalho e a criação de produtos digitais",
track: "Palestra",
type: "mic",
people: [{ name: "Tiago Machado", photo: "photos/tiago-machado.png" }],
desc: "Do jeito que a gente trabalha ao jeito que a gente cria, uma conversa sobre como a inteligência artificial está redesenhando a rotina dos times e a formade criar produtos digitais.",
},
{
time: "10:20",
dur: 30,
title: "Framework para agentificação de squads",
track: "Palestra",
type: "code",
people: [
{ name: "Etienne Cartolano", photo: "photos/etienne-cartolano.png" },
],
desc: "Como estruturar squads de desenvolvimento para operar com agentes de IA: papéis, fluxos e ferramentas para transformar um time tradicional em um time agêntico.",
},
{
time: "10:50",
dur: 20,
title: "Formação de squads agênticos",
track: "Painel",
type: "users",
people: [
{ name: "Etienne Cartolano", photo: "photos/etienne-cartolano.png" },
{ name: "Tiago Machado", photo: "photos/tiago-machado.png" },
{ name: "Iago Moura", photo: "photos/iago-moura.png" },
],
desc: "Um bate-papo sobre como times se organizam quando agentes de IA entram na equação, o que isso exige de pessoas, processos e na forma de entregar.",
},
{
time: "11:10",
dur: 15,
title: "Descompressão",
track: "Quiz",
type: "break",
},
{
time: "11:25",
dur: 30,
title: "IA em produção: governança, segurança, infra e custos",
track: "Painel",
type: "layers",
people: [
{ name: "Carlos Pedrosa", photo: "photos/carlos-pedrosa.png" },
{ name: "Newton Marques", photo: "photos/newton-marques.png" },
{ name: "Orlandino Neves", photo: "photos/orlandino-neves.png" },
{ name: "Iago Moura", photo: "photos/iago-moura.png" },
],
desc: "O que muda na infraestrutura e nos processos de governança quando agentes de IA operam em produção? Controle, rastreabilidade, segurança e as decisões de infra que viabilizam ou travam a adoção de IA em escala.",
},
{
time: "11:55",
dur: 120,
title: "Almoço e tour Arena MRV - Estádio do Atlético-MG",
track: "Intervalo",
type: "coffee",
desc: "Mesa, tour na Arena MRV - Estádio do Atlético-MG e conversa sem slide.",
},
{
time: "13:55",
dur: 45,
title: "Construindo o presente e o futuro",
track: "Momento CE",
type: "flag",
people: [{ name: "Líderes Customer Engineering", icon: "ci" }],
desc: "Como a área está contrubindo para a transformação da experiência do cliente hoje, enquanto desenha os próximos passos.",
},
{
time: "14:40",
dur: 30,
title: "Não leia o código",
track: "Palestra",
type: "code",
people: [
{ name: "Diego Nogueira", photo: "photos/diego-nogueira.png" },
],
desc: "Desenvolvimento agêntico de software.",
},
{
time: "15:10",
dur: 30,
title: "SAASpocalipse e a Arquitetura aberta da Salesforce",
track: "Palestra",
type: "mic",
people: [
{ name: "Rogers Tumasonis", photo: "photos/rogers-tumasonis.png" },
],
desc: "Como conectar dados, modelos e agentes sem migrar o que já existe",
},
{
time: "15:40",
dur: 15,
title: "Descompressão",
track: "Quiz",
type: "break",
},
{
time: "15:55",
dur: 30,
title:
"Agentes de voz: o que muda quando a latência é requisito funcional",
track: "Palestra",
type: "mic",
people: [
{
name: "José Paulo Petry",
photo: "photos/jose-paulo-petry.JPG",
},
],
desc: "Uma conversa por voz dá ao sistema frações de um segundo para responder. Essa restrição define a arquitetura por baixo: cascata de modelos pequenos, detecção do fim de uma fala e otimização de ferramentas. As decisões de engenharia, os erros pelo caminho e o que ainda está sendo construído.",
},
{
time: "16:25",
dur: 30,
title:
"Como enxergamos o futuro do setor financeiro e do Inter diante da escala da IA",
track: "Palestra",
type: "mic",
people: [
{ 
name: "Eduardo Cotta", 
photo: "photos/eduardo-cotta.png" 
},
],
desc: "Uma conversa sobre como a inteligência artificial está redesenhando o setor financeiro e qual o papel do Inter nesse cenário.",
},
{
time: "16:55",
dur: 10,
title: "Descompressão",
track: "Quiz",
type: "break",
},
{
time: "17:05",
dur: 10,
title: "Encerramento",
track: "Palco principal",
type: "flag",
people: [{ name: "Iago Moura", photo: "photos/iago-moura.png" }],
},
{
time: "17:15",
dur: 105,
title: "Happy hour",
track: "Ninguém é de ferro",
type: "glass",
party: true,
desc: "IA transforma o futuro, pessoas transformam a jornada. Vamos celebrar! 🎉",
},
],
},

speakers: {
eyebrow: "Palestrantes",
title: "Quem sobe ao palco",
sub: "Quem conduz o dia, da abertura ao happy hour.",
comingSoon: false,
comingSoonTitle: "Em breve",
comingSoonText: "Em breve vamos trazer quem sobe ao palco. Fique ligado.",
people: [
{
name: "Carlos Pedrosa",
talk: "Director of IT Services, Inter",
photo: "photos/carlos-pedrosa.png",
linkedin: "https://www.linkedin.com/in/carlos-pedrosa-77b88831/",
},
{
name: "Diego Nogueira",
talk: "Engineer and Tech Advisor",
photo: "photos/diego-nogueira.png",
linkedin: "https://www.linkedin.com/in/diegolopesnogueira",
},
{
name: "Eduardo Cotta",
talk: "Director of Operations, Inter",
photo: "photos/eduardo-cotta.png",
linkedin: "https://www.linkedin.com/in/eduardo-cotta-b6b3821b/",
},
{
name: "Etienne Cartolano",
talk: "CEO, ACT Nexus",
photo: "photos/etienne-cartolano.png",
linkedin: "https://www.linkedin.com/in/cartolano/",
},
{
name: "José Paulo Petry",
talk: "Forward Deployed Engineer, ElevenLabs",
photo: "photos/jose-paulo-petry.JPG",
linkedin: "https://www.linkedin.com/in/petrybr/",
},
{
name: "Iago Moura",
talk: "Superintendent of Engineering, Inter",
photo: "photos/iago-moura.png",
linkedin: "https://www.linkedin.com/in/iagormoura/",
},
{
name: "Newton Marques",
talk: "Superintendent of Fraud Prevention, Inter",
photo: "photos/newton-marques.png",
linkedin: "https://www.linkedin.com/in/newton-marques-junior/",
},
{
name: "Orlandino Neves",
talk: "Executive Tech Manager of Cyber Security, Inter",
photo: "photos/orlandino-neves.png",
linkedin: "https://www.linkedin.com/in/orlandino-neves/",
},
{
name: "Raquel Bellini",
talk: "Specialist of Strategic Communication, Inter",
photo: "photos/raquel-bellini.png",
linkedin: "https://www.linkedin.com/in/raquelbellini/",
},
{
name: "Rogers Tumasonis",
talk: "Enterprise Architect, Salesforce Brazil",
photo: "photos/rogers-tumasonis.png",
linkedin: "https://www.linkedin.com/in/tumasonis/",
},
{
name: "Tiago Machado",
talk: "Director of Product Engineering, Inter",
photo: "photos/tiago-machado.png",
linkedin: "https://www.linkedin.com/in/tialmachado/",
},
],
},

partners: {
eyebrow: "Quem faz acontecer",
title: "Realizado por",
items: [
{ name: "Inter", src: "logos/inter.svg" },
{ name: "Salesforce", src: "logos/salesforce.png" },
{ name: "ACT Digital", src: "logos/act.jpg" },
],
},

arrive: {
eyebrow: "Como chegar",
title: "Arena MRV",
sub: "Presencial na Arena MRV e com transmissão online.",
query:
"Arena MRV, Rua Cristina Maria de Assis, 202, Califórnia, Belo Horizonte, MG",
},

contact: {
kicker: "Dúvidas?",
lead: "Fale com a Luara",
email: "luara.silva@inter.co",
slack: "Luara Rebeca Alves Silva",
slackUrl: "https://inter.enterprise.slack.com/tema/U072RCESLSD",
},
};


