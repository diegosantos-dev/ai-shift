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
"https://events.teams.microsoft.com/event/b05de292-4ed9-4855-bef4-61c9d3e53f37@05e665c9-c502-4a19-98a5-a913a6f52be8?source=copyLinkLegacyShareLinkDialog",
},

brand: {
mark: "S",
name: "AI SHIFT",
by: "by Customer Intelligence",
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
lede: "O Time de Customer Intelligence te convida para um dia de conversa franca: como a IA está transformando a forma como construímos produtos digitais.",
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
copy: 'Um encontro com o time de Customer Intelligence para falarmos sobre como estamos construindo o Presente e o Futuro com <span class="bridge-accent">Inteligência Artificial, Dados e Engenharia de Software</span>.',
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
dur: 20,
title: "Abertura",
track: "Palco principal",
type: "flag",
people: [
{ name: "Raquel Bellini", photo: "photos/raquel-bellini.png" },
],
},
{
    time: "09:25",
    dur: 20,
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
},
{
time: "11:10",
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
time: "11:40",
dur: 15,
title: "Descompressão",
track: "Quiz",
type: "break",
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
dur: 55,
title: "Construindo o presente e o futuro",
track: "Momento CI",
type: "flag",
people: [{ name: "Líderes Customer Intelligence", icon: "ci" }],
desc: "Como a área está contrubindo para a transformação da experiência do cliente hoje, enquanto desenha os próximos passos.",
},
{
time: "14:50",
dur: 40,
title: "Plataformas de IA no Inter: da infra ao produto",
track: "Palestra",
type: "layers",
desc: "Como o Inter está construindo sua plataforma de IA: da infraestrutura que suporta os modelos até as ferramentas que chegam ao cliente e otimizam o trabalho interno dos times de engenharia.",
},
{
time: "15:30",
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
time: "16:00",
dur: 30,
title: "Palestra a confirmar",
track: "Palestra",
type: "mic",
},
{
time: "16:30",
dur: 15,
title: "Descompressão",
track: "Quiz",
type: "break",
},
{
time: "16:45",
dur: 30,
title:
"Agentes de voz: o que muda quando a latência é requisito funcional",
track: "Palestra",
type: "mic",
people: [
{
name: "Guilherme Radomysler",
photo: "photos/guilherme-radomysler.png",
},
],
desc: "Uma conversa por voz dá ao sistema frações de um segundo para responder. Essa restrição define a arquitetura por baixo: cascata de modelos pequenos, detecção do fim de uma fala e otimização de ferramentas. As decisões de engenharia, os erros pelo caminho e o que ainda está sendo construído.",
},
{
time: "17:15",
dur: 30,
title:
"Como enxergamos o futuro do setor financeiro e do Inter diante da escala da IA",
track: "Painel",
type: "users",
desc: "Uma conversa sobre como a inteligência artificial está redesenhando o setor financeiro e qual o papel do Inter nesse cenário.",
},
{
time: "17:45",
dur: 15,
title: "O futuro começa agora",
track: "Palestra",
type: "flag",
people: [
{ name: "Guilherme Ximenes", photo: "photos/guilherme-ximenes.png" },
],
desc: "Uma visão do CTO e CIO sobre a transformação e o futuro da tecnologia, do mercado e do Inter, e qual o nosso papel diante dessa transformação.",
},
{
time: "18:00",
dur: 10,
title: "Descompressão",
track: "Quiz",
type: "break",
},
{
time: "18:10",
dur: 20,
title: "Encerramento",
track: "Palco principal",
type: "flag",
people: [{ name: "Iago Moura", photo: "photos/iago-moura.png" }],
},
{
time: "18:30",
dur: 90,
title: "Happy hour",
track: "Ninguém é de ferro",
type: "glass",
party: true,
desc: "Copo na mão e o networking que só rola quando o crachá já foi pro bolso.",
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
name: "Raquel Bellini",
talk: "Host",
photo: "photos/raquel-bellini.png",
linkedin: "https://www.linkedin.com/in/raquelbellini/",
},
{
name: "Tiago Machado",
talk: "Director of Digital Products, Inter",
photo: "photos/tiago-machado.png",
linkedin: "https://www.linkedin.com/in/tialmachado/",
},
{
name: "Etienne Cartolano",
talk: "CEO, ACT Nexus",
photo: "photos/etienne-cartolano.png",
linkedin: "https://www.linkedin.com/in/cartolano/",
},
{
name: "Iago Moura",
talk: "Head of Product Engineering, Inter",
photo: "photos/iago-moura.png",
linkedin: "https://www.linkedin.com/in/iagormoura/",
},
{
name: "Carlos Pedrosa",
talk: "Director of IT, Inter",
photo: "photos/carlos-pedrosa.png",
linkedin: "https://www.linkedin.com/in/carlos-pedrosa-77b88831/",
},
{
name: "Newton Marques",
talk: "Superintendente de Prevenção à Fraude",
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
name: "Diego Nogueira",
talk: "Engineer and Tech Advisor",
photo: "photos/diego-nogueira.png",
linkedin: "https://www.linkedin.com/in/diegolopesnogueira",
},
{
name: "Guilherme Radomysler",
talk: "Deployment Lead, ElevenLabs",
photo: "photos/guilherme-radomysler.png",
linkedin: "https://www.linkedin.com/in/guilherme-radomysler/",
},
{
name: "Guilherme Ximenes",
talk: "CIO, Inter&Co",
photo: "photos/guilherme-ximenes.png",
linkedin: "https://www.linkedin.com/in/guilhermeximenes/",
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
};