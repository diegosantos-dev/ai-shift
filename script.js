// AI SHIFT — navegação, motion, header e agenda (dados em config.js)
(function () {
"use strict";

var reduce = window.matchMedia &&
window.matchMedia("(prefers-reduced-motion: reduce)").matches;
var HEADER = 84;
var SITE = window.SITE || {};
var AGENDA = (SITE.agenda && SITE.agenda.sessions) || [];
var agendaSoon = !!(SITE.agenda && SITE.agenda.comingSoon);
var navLock = false;

var BREAK_TYPES = { coffee: 1, break: 1 };

function pad(n){ return (n<10?'0':'')+n; }
function toMin(s){ var p=String(s).split(':'); return (+p[0])*60+(+p[1]); }
function fmtDur(m){ m=Math.max(0,Math.round(m)); if(m>=60){var h=Math.floor(m/60),mm=m%60;return h+'h'+(mm?pad(mm):'');} return m+' min'; }
function setTxt(id, v){ var el=document.getElementById(id); if(el) el.textContent=v==null?'':v; }
function setHtml(id, v){ var el=document.getElementById(id); if(el) el.innerHTML=v||''; }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); }
function markAtletico(s){
return esc(s).replace(/Atlético-MG/g,'<span class="atletico">Atlético-MG</span>');
}
function initials(name){
return String(name||'').trim().split(/\s+/).slice(0,2).map(function(p){ return p.charAt(0).toUpperCase(); }).join('') || '?';
}
function teamsUrl(ev){
if(ev && ev.teams) return ev.teams;
return (SITE.teams && SITE.teams.inviteUrl) || '';
}

function applySite(){
var b=SITE.brand||{}, e=SITE.event||{}, h=SITE.hero||{}, r=SITE.reasons||{}, a=SITE.agenda||{};
document.title = (b.name||'AI SHIFT')+' · '+(h.subtitle||'');
setTxt('brandMark', b.mark||'S');
setHtml('brandName', (b.name||'AI SHIFT').replace(/ /g,'&nbsp;'));
setTxt('brandBy', b.by||'');
setHtml('heroTitle', (h.title||'').replace(/ /g,'&nbsp;')+
'<span class="hero-title__line"><span id="heroType"></span><span class="hero-caret" aria-hidden="true"></span></span>');
setTxt('heroLede', h.lede||'');
setTxt('heroNote', h.note||'');
document.querySelectorAll('[data-cta]').forEach(function(el){ el.textContent=h.cta||'Quero participar'; });
if(h.ctaUrl){
document.querySelectorAll('a.btn-primary').forEach(function(a){
a.href=h.ctaUrl;
a.target='_blank';
a.rel='noopener';
});
}
var vis=document.getElementById('heroVisual');
if(vis && h.visual){ vis.src=h.visual; vis.alt='Presença de IA'; }
setTxt('dateDay', e.day); setTxt('dateMonth', e.monthShort); setTxt('dateYear', e.year);
setTxt('dateVenue', e.venue); setTxt('dateCity', (e.city||'')+(e.state?' · '+e.state:''));
setTxt('dateStart', e.startLabel); setTxt('dateStartNote', e.startNote);
setTxt('reasonsEyebrow', r.eyebrow); setHtml('reasonsTitle', r.titleHtml); setTxt('reasonsSub', r.sub);
var rlist=document.getElementById('reasonsList');
if(rlist && r.items){
rlist.innerHTML=r.items.map(function(it,i){
return '<li class="reason r-reveal" data-delay="'+(i%3)+'">'+
'<span class="reason-num">'+(i+1)+'º</span>'+
'<div class="reason-body">'+
'<h3 class="reason-title">'+esc(it.title)+'</h3>'+
'<p class="reason-tag">'+esc(it.tag)+'</p>'+
'<p class="reason-desc">'+markAtletico(it.desc)+'</p>'+
'</div></li>';
}).join('');
}
setTxt('agendaEyebrow', a.eyebrow); setTxt('agendaTitle', a.title);
setTxt('agendaMeta', e.day+' de '+e.monthName+' de '+e.year+'. '+e.venue+', '+e.city+'. A partir das '+e.startTime);
buildPillars();
var br=SITE.bridge||{};
setHtml('bridgeCopy', br.copy||'');
buildSpeakers();
buildPartners();
buildArrive();
applySoon();
}

function applySoon(){
var sp=SITE.speakers||{}, ag=SITE.agenda||{};
var spSoon=document.getElementById('speakersSoon');
var spSec=document.getElementById('palestrantes');
if(sp.comingSoon){
if(spSec) spSec.classList.add('is-soon');
if(spSoon){ spSoon.hidden=false; spSoon.classList.add('is-on'); }
setTxt('speakersSoonTitle', sp.comingSoonTitle||'Em breve');
setTxt('speakersSoonText', sp.comingSoonText||'');
}
var agSoon=document.getElementById('agendaSoon');
var agSec=document.getElementById('agenda');
if(ag.comingSoon){
if(agSec) agSec.classList.add('is-soon');
if(agSoon){ agSoon.hidden=false; agSoon.classList.add('is-on'); }
setTxt('agendaSoonTitle', ag.comingSoonTitle||'Em breve');
setTxt('agendaSoonText', ag.comingSoonText||'');
}
}

var CI_ICON='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path fill="#EA7100" d="M16 4.854c0-.472.382-.854.854-.854H19a1 1 0 0 1 1 1v12a3 3 0 0 1-3 3H3a1 1 0 1 0 0 2h14a5 5 0 0 0 5-5V5a3 3 0 0 0-3-3h-2.146A2.854 2.854 0 0 0 14 4.854v.528c-1.318.684-1.42 2.539-.175 3.36l1.012.668-.973 3.417A4.99 4.99 0 0 0 10 11a4.995 4.995 0 0 0-4.143 2.2A3.988 3.988 0 0 0 3 12a1 1 0 1 0 0 2 2 2 0 0 1 2 2 1 1 0 1 0 2 0 3 3 0 0 1 6-.02 1.001 1.001 0 0 0 1.968.273l1.994-7a1 1 0 0 0-.411-1.109l-1.556-1.026A1.951 1.951 0 0 0 16 5.412v-.558Z"/></svg>';
var PILLAR_ICONS={
client:'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><circle cx="12" cy="8" r="3.2" fill="currentColor"/><path fill="currentColor" d="M5.2 19.2c.6-3.4 3.3-5.2 6.8-5.2s6.2 1.8 6.8 5.2a1 1 0 0 1-1 1.3H6.2a1 1 0 0 1-1-1.3Z"/></svg>',
ops:'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><path fill="currentColor" d="M11 3.2h2l.4 2.3a6.8 6.8 0 0 1 1.7.7l2-1.2 1.4 1.4-1.2 2a6.8 6.8 0 0 1 .7 1.7L20.8 11v2l-2.3.4a6.8 6.8 0 0 1-.7 1.7l1.2 2-1.4 1.4-2-1.2a6.8 6.8 0 0 1-1.7.7L13 20.8h-2l-.4-2.3a6.8 6.8 0 0 1-1.7-.7l-2 1.2-1.4-1.4 1.2-2a6.8 6.8 0 0 1-.7-1.7L3.2 13v-2l2.3-.4a6.8 6.8 0 0 1 .7-1.7l-1.2-2 1.4-1.4 2 1.2a6.8 6.8 0 0 1 1.7-.7L11 3.2Zm1 5.3A3.5 3.5 0 1 0 15.5 12 3.5 3.5 0 0 0 12 8.5Z"/></svg>',
inova:'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><path fill="currentColor" d="M12 2.4 14.1 9 21 11.1 14.1 13.2 12 19.8 9.9 13.2 3 11.1 9.9 9 12 2.4Z"/></svg>',
win:'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><path fill="currentColor" d="M12 2.6 16.3 5l1.6 4.8-1.6 4.8L12 16.8 7.7 14.6 6.1 9.8 7.7 5 12 2.6Zm0 5.2a2.4 2.4 0 1 0 2.4 2.4A2.4 2.4 0 0 0 12 7.8Z"/></svg>',
team:'<svg viewBox="0 0 24 24" width="28" height="28" fill="none" aria-hidden="true"><path fill="currentColor" d="M12 3.2 14.6 8.4 20.4 9.2 16.2 13.4 17.4 19.2 12 16.4 6.6 19.2 7.8 13.4 3.6 9.2 9.4 8.4 12 3.2Z"/></svg>'
};

function speakerLayout(n){
if(n<=0) return [];
if(n===1) return [1];
if(n===2) return [2];
var rows=[], left=n;
while(left>3){
rows.push(3);
left-=3;
}
if(left) rows.push(left);
return rows;
}

function speakerCard(p){
var src=p.photo||'';
var photo=src
? '<img class="spk-photo" src="'+esc(src)+'" alt="'+esc(p.name)+'">'
: '<span class="spk-photo spk-photo--fallback" aria-hidden="true">'+esc(initials(p.name))+'</span>';
var linkedin=p.linkedin
? '<a class="spk-in" href="'+esc(p.linkedin)+'" target="_blank" rel="noopener" aria-label="LinkedIn de '+esc(p.name)+'"><img src="icons/icon-linkedin.png" alt="" width="28" height="28"></a>'
: '';
return '<article class="spk-card">'+photo+'<h3 class="spk-name">'+esc(p.name)+linkedin+'</h3><p class="spk-talk">'+esc(p.talk)+'</p></article>';
}

function bindImgFallback(root){
if(!root) return;
root.querySelectorAll('img.spk-photo, img.slot-av-img, img.live-widget-av').forEach(function(img){
img.addEventListener('error', function(){
var span=document.createElement('span');
span.className=img.className+' '+(img.classList.contains('spk-photo')?'spk-photo--fallback':'');
span.setAttribute('aria-hidden','true');
span.textContent=initials(img.getAttribute('alt')||'');
img.replaceWith(span);
});
});
}

function buildPillars(){
var p=SITE.pillars||{};
setTxt('pillarsEyebrow', p.eyebrow);
setTxt('pillarsTitle', p.title);
setTxt('pillarsSub', p.sub);
var board=document.getElementById('pillarsBoard');
if(!board || !p.items) return;
var items=p.items, n=items.length;
var top=n>=5?3:Math.min(3,n);
var html='<div class="pillars-row">';
items.slice(0, top).forEach(function(it,i){
html+='<article class="pillar-card r-reveal" data-delay="'+i+'" style="--pillar:'+esc(it.color||'#FF7A00')+';--pillar-ink:'+esc(it.ink||'#161616')+'">'+
'<span class="pillar-ic" aria-hidden="true">'+(PILLAR_ICONS[it.icon]||'')+'</span>'+
'<h3 class="pillar-name">'+esc(it.name)+'</h3>'+
(it.en?'<p class="pillar-en">'+esc(it.en)+'</p>':'')+
'<p class="pillar-blurb">'+esc(it.blurb)+'</p></article>';
});
html+='</div>';
if(n>top){
html+='<div class="pillars-row pillars-row--offset">';
items.slice(top).forEach(function(it,i){
html+='<article class="pillar-card r-reveal" data-delay="'+(i+2)+'" style="--pillar:'+esc(it.color||'#FF7A00')+';--pillar-ink:'+esc(it.ink||'#161616')+'">'+
'<span class="pillar-ic" aria-hidden="true">'+(PILLAR_ICONS[it.icon]||'')+'</span>'+
'<h3 class="pillar-name">'+esc(it.name)+'</h3>'+
(it.en?'<p class="pillar-en">'+esc(it.en)+'</p>':'')+
'<p class="pillar-blurb">'+esc(it.blurb)+'</p></article>';
});
html+='</div>';
}
board.innerHTML=html;
}

function buildPartners(){
var p=SITE.partners||{};
setTxt('partnersEyebrow', p.eyebrow);
setTxt('partnersTitle', p.title);
var row=document.getElementById('partnersRow');
if(!row || !p.items) return;
row.innerHTML=p.items.map(function(it){
return '<div class="partner-item"><img class="partner-logo" src="'+esc(it.src)+'" alt="'+esc(it.name)+'"></div>';
}).join('');
}

function buildSpeakers(){
var s=SITE.speakers||{};
var people=s.people||[];
setTxt('speakersEyebrow', s.eyebrow);
setTxt('speakersTitle', s.title);
setTxt('speakersSub', s.sub);
var board=document.getElementById('speakersBoard');
if(!board || s.comingSoon) return;
var layout=speakerLayout(people.length);
var i=0, html='';
layout.forEach(function(count){
html+='<div class="speakers-row" data-count="'+count+'">';
for(var k=0;k<count && i<people.length;k++,i++) html+=speakerCard(people[i]);
html+='</div>';
});
board.innerHTML=html;
bindImgFallback(board);
}

function fullAddress(){
var e=SITE.event||{};
return [e.venue, e.street, e.neighborhood, e.city, e.state, e.zip].filter(Boolean).join(', ');
}

function isPhone(){
return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent||'');
}

function buildArrive(){
var a=SITE.arrive||{}, e=SITE.event||{};
setTxt('arriveEyebrow', a.eyebrow);
setTxt('arriveTitle', a.title||e.venue);
setTxt('arriveSub', a.sub);
var addrEl=document.getElementById('arriveAddress');
if(addrEl){
addrEl.innerHTML=esc(e.street)+'<br>'+esc(e.neighborhood)+' · '+esc(e.city)+', '+esc(e.state)+
(e.zip?'<br>CEP '+esc(e.zip):'');
}
var copy=document.getElementById('copyAddr');
if(copy){
copy.addEventListener('click', function(){
var text=fullAddress();
var ok=function(){
copy.classList.add('is-ok');
setTxt('copyAddrLabel', 'Copiado');
setTimeout(function(){ copy.classList.remove('is-ok'); setTxt('copyAddrLabel', 'Copiar'); }, 1600);
};
if(navigator.clipboard && navigator.clipboard.writeText){
navigator.clipboard.writeText(text).then(ok).catch(function(){ window.prompt('Copie o endereço', text); });
} else {
window.prompt('Copie o endereço', text);
}
});
}
var q=encodeURIComponent(a.query||fullAddress());
var map=document.getElementById('arriveMap');
if(map) map.src='https://maps.google.com/maps?q='+q+'&hl=pt-BR&z=15&output=embed';
var bar=document.getElementById('arriveBar');
if(!bar) return;
var googleWeb='https://www.google.com/maps/search/?api=1&query='+q;
bar.innerHTML=
'<p class="arrive-bar-label">Abrir no app</p>'+
'<div class="arrive-apps">'+
'<button type="button" class="arrive-app" data-app="maps" aria-label="Google Maps"><span class="arrive-app-ic maps"></span><span>Maps</span></button>'+
'<button type="button" class="arrive-app" data-app="waze" aria-label="Waze"><span class="arrive-app-ic waze"></span><span>Waze</span></button>'+
'<button type="button" class="arrive-app" data-app="uber" aria-label="Uber"><span class="arrive-app-ic uber"></span><span>Uber</span></button>'+
'</div>'+
'<a class="arrive-web" href="'+googleWeb+'" target="_blank" rel="noopener">Abrir no Google Maps</a>';
bar.querySelectorAll('[data-app]').forEach(function(btn){
btn.addEventListener('click', function(){ openNavApp(btn.getAttribute('data-app'), q, googleWeb); });
});
}

function openNavApp(app, q, googleWeb){
var phone=isPhone();
var dest=decodeURIComponent(q);
var uberDrop='https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]='+q;
if(app==='maps'){
if(phone) window.location.href='comgooglemaps://?q='+q;
setTimeout(function(){ window.open(googleWeb, '_blank', 'noopener'); }, phone?400:0);
return;
}
if(app==='waze'){
if(phone) window.location.href='waze://?q='+q+'&navigate=yes';
setTimeout(function(){ window.open('https://waze.com/ul?q='+q+'&navigate=yes', '_blank', 'noopener'); }, phone?400:0);
return;
}
if(app==='uber'){
if(phone) window.location.href='uber://riderequest?dropoff[formatted_address]='+encodeURIComponent(dest);
setTimeout(function(){ window.open(uberDrop, '_blank', 'noopener'); }, phone?400:0);
}
}

function eventStart(){
var e=SITE.event||{};
var p=String(e.startTime||'08:15').split(':');
return new Date(+e.year||2026, (+e.month||11)-1, +e.day||12, +p[0]||8, +p[1]||15, 0, 0);
}
function eventEnd(){
var s=eventStart();
var last=AGENDA[AGENDA.length-1];
var endM=last?toMin(last.time)+(last.dur||0):20*60;
return new Date(s.getFullYear(), s.getMonth(), s.getDate(), Math.floor(endM/60), endM%60, 0, 0);
}
function clockNow(){
var now=new Date();
var t=SITE.test||{};
if(t.enabled){
var s=eventStart();
return new Date(s.getFullYear(), s.getMonth(), s.getDate(), +t.hour||0, +t.minute||0, now.getSeconds(), now.getMilliseconds());
}
return now;
}
function eventPhase(d){
if(d.getTime()<eventStart().getTime()) return 'pre';
if(d.getTime()>=eventEnd().getTime()) return 'post';
return 'day';
}

var list=document.getElementById("agendaList");
var machine=document.getElementById("agendaMachine") || document.querySelector(".agenda-machine");
var agendaSec=document.getElementById("agenda");
var liveWidget=document.getElementById("liveWidget");
var liveWidgetClosed=false;
var heroInView=true;
var slots=[], starts=[], ends=[], nowLine, nowBeam, nowTime;
var geom={ firstY:0, lastY:0 };
var prevLive=-2, prevNext=-2, rafId=null;
var reelEase=0, reelTarget=0, agendaInView=false;

function sessionPeople(ev){
if(ev && ev.people && ev.people.length) return ev.people;
if(ev && ev.speaker){
return [{ name: ev.speaker, photo: ev.photo||ev.icon||'' }];
}
return [];
}
function avatarFace(p){
var name=p.name||'';
if(p.icon==='ci'){
return '<span class="slot-av-img slot-av-img--svg" aria-hidden="true">'+CI_ICON+'</span>';
}
var src=p.photo||'';
if(src) return '<img class="slot-av-img" src="'+esc(src)+'" alt="'+esc(name)+'">';
return '<span class="slot-av-img">'+esc(initials(name))+'</span>';
}
function avatarBlock(ev){
var people=sessionPeople(ev);
if(!people.length) return '';
if(people.length===1){
return '<div class="slot-av"><div class="slot-av-stack">'+avatarFace(people[0])+'</div><span class="slot-av-name">'+esc(people[0].name||'')+'</span></div>';
}
var rows=people.map(function(p){
return '<div class="slot-av-person">'+avatarFace(p)+'<span class="slot-av-name">'+esc(p.name||'')+'</span></div>';
}).join('');
return '<div class="slot-av is-many">'+rows+'</div>';
}

function buildAgenda(){
if(!list || agendaSoon) return;
starts=[]; ends=[];
var ring='<svg class="slot-ring" viewBox="0 0 32 32" width="18" height="18" aria-hidden="true"><circle class="ring-track" cx="16" cy="16" r="12"/><circle class="ring-val" cx="16" cy="16" r="12" pathLength="100"/></svg>';
var tip='Porcentagem do que já aconteceu nesta palestra';
var html='';
AGENDA.forEach(function(ev,i){
var s=toMin(ev.time); starts.push(s); ends.push(s+ev.dur);
var brk=BREAK_TYPES[ev.type]?' brk':'';
var party=(ev.party||ev.type==='glass')?' party':'';
var hasTeams=teamsUrl(ev)?' has-teams':'';
html+='<div class="slot'+brk+party+hasTeams+'" data-i="'+i+'" data-dur="'+ev.dur+'">'+
'<div class="slot-time">'+esc(ev.time)+'</div>'+
'<div class="slot-rail"><span class="dot"></span></div>'+
'<div class="slot-card">'+
'<div class="slot-fx" aria-hidden="true"></div>'+
'<div class="slot-info">'+
'<h3 class="slot-title">'+esc(ev.title)+'</h3>'+
'<p class="slot-track">'+esc(ev.track)+'</p>'+
(ev.desc
? '<p class="slot-desc">'+markAtletico(ev.desc)+'</p>'
: '')+
'<span class="slot-pill">'+ring+
'<span class="slot-dur">'+fmtDur(ev.dur)+'</span>'+
'<span class="slot-live-tag">Ao vivo</span>'+
'<span class="slot-pct" tabindex="0" data-tip="'+tip+'" hidden></span>'+
'</span>'+
'</div>'+
avatarBlock(ev)+
'</div>'+
'</div>';
});
list.innerHTML=html;
var lineEl=document.createElement('div'); lineEl.className='agenda-line'; list.appendChild(lineEl);
nowBeam=document.createElement('div'); nowBeam.className='now-beam'; list.appendChild(nowBeam);
nowLine=document.createElement('div'); nowLine.className='now-line';
nowLine.innerHTML='<span class="now-tag"><span class="now-pulse"></span><span id="nowTime">--:--:--</span></span>';
list.appendChild(nowLine);
nowTime=document.getElementById('nowTime');
slots=[].slice.call(list.querySelectorAll('.slot'));
if(agendaSec) agendaSec.style.setProperty('--ticks', String(Math.max(1, slots.length)));
bindImgFallback(list);
list.addEventListener('click', function(e){
var card=e.target.closest('.slot-card'); if(!card) return;
var sl=card.closest('.slot'); if(!sl) return;
if(!sl.classList.contains('is-live')) return;
var ev=AGENDA[+sl.getAttribute('data-i')];
var url=teamsUrl(ev);
if(url) window.open(url, '_blank', 'noopener');
});
}

function computeGeom(){
if(!slots.length || !list) return;
var rail=slots[0].querySelector('.slot-rail');
var lr=list.getBoundingClientRect();
var rr=rail.getBoundingClientRect();
list.style.setProperty('--rail-x', ((rr.left+rr.width/2)-lr.left)+'px');
geom.firstY=slots[0].offsetTop+slots[0].offsetHeight/2;
geom.lastY=slots[slots.length-1].offsetTop+slots[slots.length-1].offsetHeight/2;
var line=list.querySelector('.agenda-line');
if(line){ line.style.top=geom.firstY+'px'; line.style.height=(geom.lastY-geom.firstY)+'px'; }
}

function beamY(mins){
var n=slots.length;
if(!n) return {y:0, out:true};
if(mins<=starts[0]) return {y:geom.firstY, out:true};
if(mins>=ends[n-1]) return {y:geom.lastY, out:true};
var i, live=-1;
for(i=0;i<n;i++) if(mins>=starts[i] && mins<ends[i]){ live=i; break; }
if(live>=0){
var sl=slots[live];
var span=ends[live]-starts[live];
var frac=span?Math.max(0,Math.min(1,(mins-starts[live])/span)):0;
return {y:sl.offsetTop+frac*sl.offsetHeight, out:false};
}
for(i=0;i<n-1;i++){
if(mins>=ends[i] && mins<starts[i+1]){
var g=starts[i+1]-ends[i], t=g?((mins-ends[i])/g):1;
return {y:slots[i].offsetTop+slots[i].offsetHeight+t*(slots[i+1].offsetTop-(slots[i].offsetTop+slots[i].offsetHeight)), out:false};
}
}
return {y:geom.lastY, out:false};
}

function placeBeam(b){
if(!nowLine) return;
nowLine.classList.toggle('out', b.out);
nowLine.style.top=b.y+'px';
if(nowBeam){
nowBeam.classList.toggle('out', b.out);
nowBeam.style.top=geom.firstY+'px';
nowBeam.style.height=Math.max(0, b.y-geom.firstY)+'px';
}
}

function findLive(mins){
var live=-1, next=-1, i, n=AGENDA.length;
for(i=0;i<n;i++){
var s=starts.length?starts[i]:toMin(AGENDA[i].time);
var e=ends.length?ends[i]:s+AGENDA[i].dur;
if(mins>=s && mins<e) live=i;
if(next===-1 && s>mins) next=i;
}
return {live:live, next:next};
}

function setRemain(sl, remainPct, durLabel, pctLabel){
sl.style.setProperty('--remain', remainPct.toFixed(2));
var durEl=sl.querySelector('.slot-dur');
if(durEl && durLabel) durEl.textContent=durLabel;
var pctEl=sl.querySelector('.slot-pct');
if(pctEl){
if(pctLabel){ pctEl.hidden=false; pctEl.textContent=pctLabel; }
else { pctEl.hidden=true; pctEl.textContent=''; }
}
}

function liveAvatarFace(p){
var name=p.name||'';
if(p.icon==='ci') return '<span class="live-widget-av live-widget-av--svg" aria-hidden="true">'+CI_ICON+'</span>';
if(p.photo) return '<img class="live-widget-av" src="'+esc(p.photo)+'" alt="'+esc(name)+'">';
return '<span class="live-widget-av" aria-hidden="true">'+esc(initials(name))+'</span>';
}

function updateLiveWidget(live){
if(!liveWidget) return;
var av=document.getElementById('liveWidgetAv');
var nameEl=document.getElementById('liveWidgetName');
if(liveWidgetClosed){
liveWidget.classList.remove('is-on','is-home','is-countdown');
document.documentElement.classList.remove('has-live-widget');
return;
}
if(live<0){
if(!liveWidget.classList.contains('is-countdown')){
liveWidget.classList.remove('is-on','is-home');
document.documentElement.classList.remove('has-live-widget');
}
return;
}
liveWidget.classList.remove('is-countdown');
var count=document.getElementById('liveWidgetCount');
if(count) count.hidden=true;
setTxt('liveWidgetKicker', 'Ao vivo agora');
liveWidget.setAttribute('aria-label', 'Sessão ao vivo');
var ev=AGENDA[live];
var url=teamsUrl(ev);
var people=sessionPeople(ev);
liveWidget.classList.add('is-on');
liveWidget.classList.toggle('is-home', heroInView);
document.documentElement.classList.add('has-live-widget');
setTxt('liveWidgetTitle', ev.title||'Sessão em andamento');
if(nameEl){
if(people.length){
nameEl.hidden=false;
nameEl.textContent=people.map(function(p){ return p.name; }).join(', ');
} else {
nameEl.hidden=true;
nameEl.textContent='';
}
}
if(av){
if(!people.length){
av.hidden=true;
av.innerHTML='';
av.classList.remove('is-many');
} else {
av.hidden=false;
av.classList.toggle('is-many', people.length>1);
var extra=people.length>4?'<span class="live-widget-av live-widget-av-more">+'+(people.length-4)+'</span>':'';
av.innerHTML=people.slice(0,4).map(liveAvatarFace).join('')+extra;
bindImgFallback(av);
}
}
var cta=document.getElementById('liveWidgetCta');
if(cta){
if(url){ cta.href=url; cta.textContent='Abrir no Teams'; cta.removeAttribute('aria-disabled'); }
else { cta.removeAttribute('href'); cta.setAttribute('aria-disabled','true'); }
}
}

function updateCountdown(d){
if(!liveWidget || liveWidgetClosed) return;
var ms=eventStart().getTime()-d.getTime();
if(ms<=0) return;
var total=Math.floor(ms/1000);
var days=Math.floor(total/86400); total%=86400;
var hours=Math.floor(total/3600); total%=3600;
var mins=Math.floor(total/60);
var secs=total%60;
var e=SITE.event||{};
var count=document.getElementById('liveWidgetCount');
var av=document.getElementById('liveWidgetAv');
var nameEl=document.getElementById('liveWidgetName');
liveWidget.classList.add('is-on','is-countdown');
liveWidget.classList.toggle('is-home', heroInView);
document.documentElement.classList.add('has-live-widget');
liveWidget.setAttribute('aria-label', 'Contagem para o evento');
setTxt('liveWidgetKicker', 'Começa em');
setTxt('cdDays', String(days));
setTxt('cdHours', pad(hours));
setTxt('cdMins', pad(mins));
setTxt('cdSecs', pad(secs));
if(count) count.hidden=false;
if(av){ av.hidden=true; av.innerHTML=''; }
if(nameEl){ nameEl.hidden=true; nameEl.textContent=''; }
setTxt('liveWidgetTitle', (e.day||12)+' de '+(e.monthName||'novembro')+' · '+ (e.startTime||'08:15'));
var cta=document.getElementById('liveWidgetCta');
var form=(SITE.hero&&SITE.hero.ctaUrl)||'';
if(cta){
cta.textContent=SITE.hero&&SITE.hero.cta||'Quero participar';
if(form){ cta.href=form; cta.removeAttribute('aria-disabled'); }
}
}

function bindLiveWidgetClose(){
var btn=document.getElementById('liveWidgetClose');
if(!btn || !liveWidget) return;
btn.addEventListener('click', function(e){
e.preventDefault();
e.stopPropagation();
if(e.stopImmediatePropagation) e.stopImmediatePropagation();
liveWidgetClosed=true;
updateLiveWidget(-1);
});
}

function updateStatuses(d,mins){
var phase=eventPhase(d);
var st, live, next;
if(phase==='pre'){
mins=-1;
st={live:-1, next:0};
updateCountdown(d);
} else if(phase==='post'){
mins=99999;
st={live:-1, next:-1};
liveWidget.classList.remove('is-countdown');
var count=document.getElementById('liveWidgetCount');
if(count) count.hidden=true;
if(prevLive!==-1) updateLiveWidget(-1);
} else {
liveWidget.classList.remove('is-countdown');
var count=document.getElementById('liveWidgetCount');
if(count) count.hidden=true;
st=findLive(mins);
}
live=st.live; next=st.next;
if(nowTime) nowTime.textContent = pad(d.getHours())+':'+pad(d.getMinutes())+':'+pad(d.getSeconds());
if(nowLine) nowLine.classList.toggle('is-off', phase!=='day');
if(nowBeam) nowBeam.classList.toggle('is-off', phase!=='day');
if(phase==='day' && live!==prevLive) updateLiveWidget(live);

if(!slots.length){ prevLive=live; prevNext=next; return; }

if(live!==prevLive || next!==prevNext){
list.classList.toggle('has-live', live>=0);
slots.forEach(function(sl,idx){
sl.classList.remove('is-live','is-next','done');
sl.style.removeProperty('--fill');
var orig=fmtDur(+sl.getAttribute('data-dur'));
if(idx===live) sl.classList.add('is-live');
else if(phase!=='pre' && mins>=ends[idx]){ sl.classList.add('done'); setRemain(sl,0,orig,''); }
else setRemain(sl,100,orig,'');
if(idx===next && idx!==live) sl.classList.add('is-next');
});
prevLive=live; prevNext=next;
computeGeom();
}
if(live>=0 && slots[live]){
var span=ends[live]-starts[live];
var pct=span?Math.max(0,Math.min(100,((mins-starts[live])/span)*100)):0;
slots[live].style.setProperty('--fill', pct.toFixed(2)+'%');
setRemain(slots[live], 100-pct, fmtDur(ends[live]-mins)+' rest.', Math.round(pct)+'%');
}
}

function jumpReelTo(i){
if(!agendaSec) return;
var n=Math.max(2, slots.length||AGENDA.length);
var range=Math.max(1, agendaSec.offsetHeight-window.innerHeight);
var y=sectionTop(agendaSec)+(Math.max(0,i)/(n-1))*range;
scrollToY(y);
}

function readReelTarget(){
if(!agendaSec || slots.length<2){ reelTarget=0; return; }
var range=agendaSec.offsetHeight-window.innerHeight;
var p=range>0 ? (window.pageYOffset-sectionTop(agendaSec))/range : 0;
p=Math.max(0, Math.min(1, p));
reelTarget=p*(slots.length-1);
}

function layoutReel(idx){
if(!machine || !slots.length) return;
var i0=Math.floor(idx), i1=Math.min(slots.length-1, i0+1), t=idx-i0;
var c0=slots[i0].offsetTop+slots[i0].offsetHeight/2;
var c1=slots[i1].offsetTop+slots[i1].offsetHeight/2;
var c=c0+(c1-c0)*t;
list.style.transform='translate3d(0,'+(machine.clientHeight/2-c)+'px,0)';
var near=Math.round(idx);
slots.forEach(function(sl,i){ sl.classList.toggle('is-center', i===near); });
}

function frame(){
var d=clockNow();
var mins=d.getHours()*60+d.getMinutes()+d.getSeconds()/60+d.getMilliseconds()/60000;
if(!agendaSoon && slots.length && agendaInView){
readReelTarget();
var gap=reelTarget-reelEase;
var follow=reduce?1:Math.min(.72, .42+Math.abs(gap)*.45);
reelEase+=gap*follow;
layoutReel(reelEase);
placeBeam(beamY(mins));
}
updateStatuses(d,mins);
rafId=requestAnimationFrame(frame);
}

function startClock(){
if(!starts.length){
AGENDA.forEach(function(ev){ var s=toMin(ev.time); starts.push(s); ends.push(s+ev.dur); });
}
if(slots.length){
computeGeom();
readReelTarget();
reelEase=reelTarget;
layoutReel(reelEase);
}
if(reduce){
function tickR(){
var d=clockNow();
var mins=d.getHours()*60+d.getMinutes()+d.getSeconds()/60;
if(!agendaSoon && slots.length && agendaInView){
readReelTarget(); reelEase=reelTarget; layoutReel(reelEase); placeBeam(beamY(mins));
}
updateStatuses(d,mins);
}
tickR(); setInterval(tickR,1000);
}else{
cancelAnimationFrame(rafId); rafId=requestAnimationFrame(frame);
}
if(agendaSec && 'IntersectionObserver' in window){
var io=new IntersectionObserver(function(entries){
entries.forEach(function(en){ agendaInView=en.isIntersecting; });
},{threshold:0.02});
io.observe(agendaSec);
} else agendaInView=true;
}

function initHeroType(){
var el=document.getElementById("heroType");
var caret=document.querySelector(".hero-caret");
if(!el) return;
var prefix="Building the ";
var fake="Now";
var real="Future";
if(reduce){
el.textContent=prefix+real;
return;
}
function typeInto(base, add, ms, done){
var i=0;
function step(){
i++;
el.textContent=base+add.slice(0,i);
if(i<add.length) setTimeout(step, ms);
else if(done) done();
}
step();
}
function eraseWord(base, word, done){
var i=word.length;
function step(){
i--;
el.textContent=base+(i>0?word.slice(0,i):'');
if(i>0) setTimeout(step, 40);
else if(done) done();
}
step();
}
setTimeout(function(){
typeInto('', prefix, 56, function(){
setTimeout(function(){
typeInto(prefix, fake, 78, function(){
setTimeout(function(){
eraseWord(prefix, fake, function(){
typeInto(prefix, real, 70, function(){
if(caret) caret.classList.add("is-idle");
});
});
}, 220);
});
}, 260);
});
}, 420);
}

function initReveals(){
var loadItems=[].slice.call(document.querySelectorAll(".reveal"));
function playLoad(){ loadItems.forEach(function(el,i){ var d=parseInt(el.getAttribute("data-delay"),10); if(isNaN(d))d=i; setTimeout(function(){el.classList.add("is-in");},120+d*110); }); }
if(reduce){ loadItems.forEach(function(el){el.classList.add("is-in");}); } else { playLoad(); }
var scrollItems=[].slice.call(document.querySelectorAll(".r-reveal"));
if(reduce || !("IntersectionObserver" in window)){ scrollItems.forEach(function(el){el.classList.add("is-in");}); return; }
var io=new IntersectionObserver(function(entries){
entries.forEach(function(en){ if(en.isIntersecting){ var d=parseInt(en.target.getAttribute("data-delay"),10)||0; setTimeout(function(){en.target.classList.add("is-in");},d*90); io.unobserve(en.target);} });
},{threshold:.2,rootMargin:"0px 0px -8% 0px"});
scrollItems.forEach(function(el){io.observe(el);});
}

function sectionTop(el){
return Math.round(el.getBoundingClientRect().top + window.pageYOffset);
}

function lockNav(ms){
navLock=true;
var bar=document.getElementById("topbar");
if(bar) bar.classList.remove("hide");
clearTimeout(lockNav._t);
lockNav._t=setTimeout(function(){ navLock=false; }, ms||800);
}

function scrollToY(y){
var vh=window.innerHeight;
var max=Math.max(0, document.documentElement.scrollHeight-vh);
var target=Math.max(0, Math.min(y, max));
var dist=Math.abs((window.pageYOffset||0)-target);
var ms=reduce?80:Math.min(2400, Math.max(700, dist*0.28));
lockNav(ms+240);
window.scrollTo({ top:target, behavior: reduce?'auto':'smooth' });
}

function scrollToEl(el){
scrollToY(sectionTop(el)-HEADER);
}

function initNav(){
var bar=document.getElementById("topbar");
var toggle=document.getElementById("navToggle");
function setMenu(open){
if(!bar) return;
bar.classList.toggle("is-open", open);
document.body.classList.toggle("nav-open", open);
if(toggle){
toggle.setAttribute("aria-expanded", open?"true":"false");
toggle.setAttribute("aria-label", open?"Fechar menu":"Abrir menu");
}
}
function closeMenu(){ setMenu(false); }
if(toggle){
toggle.addEventListener("click", function(){
setMenu(!bar.classList.contains("is-open"));
});
}
document.addEventListener("keydown", function(e){
if(e.key==="Escape") closeMenu();
});
document.querySelectorAll('a[data-scroll]').forEach(function(a){
a.addEventListener("click",function(e){
var id=a.getAttribute("href"); if(!id||id.charAt(0)!=="#")return;
var el=document.querySelector(id); if(!el)return;
e.preventDefault();
closeMenu();
document.querySelectorAll(".nav a[data-scroll]").forEach(function(n){ n.classList.toggle("active", n.getAttribute("href")===id); });
if(id==="#agenda" && !agendaSoon && slots.length){
var now=clockNow();
var st=eventPhase(now)==='day'
? findLive(now.getHours()*60+now.getMinutes())
: {live:0};
jumpReelTo(st.live>=0?st.live:0);
} else {
scrollToEl(el);
}
history.replaceState(null,"",id);
if(id!=="#inicio"){
heroInView=false;
if(liveWidget) liveWidget.classList.remove("is-home");
} else {
heroInView=true;
if(liveWidget && liveWidget.classList.contains("is-on") && !liveWidgetClosed) liveWidget.classList.add("is-home");
}
});
});
}

function introDateCard(){
var card=document.getElementById("dateCard");
if(!card || window.innerWidth<=920 || reduce){ if(card) card.classList.add("docked"); return; }
var r=card.getBoundingClientRect();
var dx=window.innerWidth/2-(r.left+r.width/2);
var dy=window.innerHeight/2-(r.top+r.height/2);
card.style.transition="none";
card.style.transform="translate("+dx+"px,"+dy+"px)";
requestAnimationFrame(function(){
requestAnimationFrame(function(){
card.style.transition="transform 1.15s cubic-bezier(.22,.72,.18,1)";
card.style.transform="translate(0,0)";
card.addEventListener("transitionend", function done(ev){
if(ev.propertyName && ev.propertyName!=="transform") return;
card.removeEventListener("transitionend", done);
card.style.transition="";
card.style.transform="";
card.classList.add("docked");
syncDateCard();
});
});
});
}

function syncDateCard(){
var card=document.getElementById("dateCard");
var hero=document.getElementById("inicio");
if(!card||!hero) return;
if(window.innerWidth<=920){ card.classList.remove("tuck"); return; }
var bottom=hero.getBoundingClientRect().bottom;
card.classList.toggle("tuck", bottom<window.innerHeight-24);
}

function initHeader(){
var bar=document.getElementById("topbar"), lastY=window.pageYOffset, ticking=false;
function onScroll(){
var y=window.pageYOffset;
bar.classList.toggle("scrolled", y>12);
if(!navLock && !(bar && bar.classList.contains("is-open"))){
if(y>lastY && y>HEADER+40) bar.classList.add("hide");
else bar.classList.remove("hide");
}
lastY=y; ticking=false;
syncDateCard();
}
window.addEventListener("scroll",function(){ if(!ticking){requestAnimationFrame(onScroll);ticking=true;} },{passive:true});

var navLinks=[].slice.call(document.querySelectorAll(".nav a[data-scroll]"));
function setActive(id){ navLinks.forEach(function(a){ a.classList.toggle("active", a.getAttribute("href")==="#"+id); }); }
var secs=navLinks.map(function(a){return document.querySelector(a.getAttribute("href"));}).filter(Boolean);
function spyNav(){
if(!secs.length) return;
var probe=window.pageYOffset + HEADER + 24;
var current=secs[0].id;
secs.forEach(function(s){ if(sectionTop(s)-8<=probe) current=s.id; });
setActive(current);
}
window.addEventListener("scroll",spyNav,{passive:true});
spyNav();

var hero=document.getElementById("inicio");
if(hero && "IntersectionObserver" in window){
var ho=new IntersectionObserver(function(entries){
entries.forEach(function(en){
heroInView=en.intersectionRatio>=0.45;
syncDateCard();
if(liveWidget && liveWidget.classList.contains("is-on") && !liveWidgetClosed){
liveWidget.classList.toggle("is-home", heroInView);
}
});
},{threshold:[0,.35,.45,1]});
ho.observe(hero);
}
syncDateCard();
}

function initParallax(){
if(reduce) return;
var stage=document.getElementById("stage"); if(!stage)return;
var layers=[].slice.call(stage.querySelectorAll("[data-parallax]")); var raf=null,tx=0,ty=0;
stage.addEventListener("mousemove",function(e){ var r=stage.getBoundingClientRect(); tx=(e.clientX-(r.left+r.width/2))/r.width; ty=(e.clientY-(r.top+r.height/2))/r.height; if(!raf)raf=requestAnimationFrame(apply); });
stage.addEventListener("mouseleave",function(){ tx=0;ty=0; if(!raf)raf=requestAnimationFrame(apply); });
function apply(){ raf=null; layers.forEach(function(el){ var amt=parseFloat(el.getAttribute("data-parallax"))||0; el.style.transform="translate("+(tx*amt*100)+"px,"+(ty*amt*100)+"px)"; }); }
}

var NOTES=['♪','♫','♩','♬'];
var CONFETTI=['#FF7A00','#FFB673','#FFDDB4','#EA7100','#ff5ea0','#fff3c4'];

function spawnPartyBit(host){
if(!host) return;
var el=document.createElement('span');
var note=Math.random()>0.42;
el.className='fx-bit '+(note?'fx-note':'fx-confetti');
if(note) el.textContent=NOTES[Math.floor(Math.random()*NOTES.length)];
else el.style.background=CONFETTI[Math.floor(Math.random()*CONFETTI.length)];
el.style.setProperty('--x', (48+Math.random()*46)+'%');
el.style.setProperty('--dx', (Math.random()*110-55)+'px');
el.style.setProperty('--dy', (-70-Math.random()*120)+'px');
el.style.setProperty('--rot', (Math.random()*280-140)+'deg');
el.style.setProperty('--t', (1.6+Math.random()*1.8)+'s');
el.style.setProperty('--s', (12+Math.random()*10)+'px');
host.appendChild(el);
el.addEventListener('animationend', function(){ if(el.parentNode) el.parentNode.removeChild(el); });
}

function initParty(){
if(reduce || agendaSoon) return;
var hosts=[].slice.call(document.querySelectorAll('.slot.party .slot-fx'));
if(!hosts.length) return;
function burst(){ hosts.forEach(function(h){ var n=1+Math.floor(Math.random()*2); while(n--) spawnPartyBit(h); }); }
burst();
setInterval(burst, 420);
}

function initTheme(){
var KEY='ai-shift-theme';
var root=document.documentElement;
var btn=document.getElementById('themeToggle');
function apply(t){
var light=t==='light';
if(light) root.setAttribute('data-theme','light');
else root.removeAttribute('data-theme');
try{ localStorage.setItem(KEY, light?'light':'dark'); }catch(e){}
if(btn) btn.setAttribute('aria-label', light?'Ativar modo escuro':'Ativar modo claro');
}
var saved='dark';
try{ saved=localStorage.getItem(KEY)||'dark'; }catch(e){}
apply(saved);
if(btn) btn.addEventListener('click', function(){
apply(root.getAttribute('data-theme')==='light'?'dark':'light');
});
}

function initMagnet(){
if(reduce || window.matchMedia("(pointer: coarse)").matches) return;
var targets=[].slice.call(document.querySelectorAll(".btn-primary, .live-widget"));
targets.forEach(function(el){
if(!el.querySelector(".btn-magnet-ring")){
var ring=document.createElement("span");
ring.className="btn-magnet-ring";
ring.setAttribute("aria-hidden","true");
el.prepend(ring);
}
});
var cur=document.getElementById("magnetCursor");
document.documentElement.classList.add("has-cursor");
if(cur) cur.classList.add("is-on");
var mx=window.innerWidth/2, my=window.innerHeight/2;
var cx=mx, cy=my, pull=0, active=null, raf=null, visible=true, scrolling=false;
var RADIUS=132, MS=560, last=0, scrollT=0, clickT=0;

function ease(t){ return 1-Math.pow(1-t, 2.4); }

function magnetable(el){
if(!el || el.hasAttribute("hidden")) return false;
if(el.classList.contains("live-widget") && (!el.classList.contains("is-on") || el.classList.contains("is-home"))) return false;
var s=window.getComputedStyle(el);
return s.display!=="none" && s.visibility!=="hidden" && s.pointerEvents!=="none";
}

function nearest(x,y){
var best=null, bestScore=Infinity;
targets.forEach(function(el){
if(!magnetable(el)) return;
var r=el.getBoundingClientRect();
if(r.width<2 || r.height<2) return;
var bx=r.left+r.width/2, by=r.top+r.height/2;
var d=Math.hypot(x-bx, y-by);
var reach=RADIUS+Math.max(r.width,r.height)*0.18;
if(d<reach && d<bestScore){
bestScore=d; best={el:el, r:r, bx:bx, by:by, d:d, reach:reach};
}
});
return best;
}

function tick(now){
raf=requestAnimationFrame(tick);
var dt=Math.min(32, now-(last||now)); last=now;
var hit=scrolling?null:nearest(mx, my);
if(hit){
active=hit.el;
pull=Math.min(1, pull+dt/MS);
} else {
pull=Math.max(0, pull-dt/MS);
if(pull<=0.001) active=null;
}
var p=ease(pull);
var tx=mx, ty=my;
targets.forEach(function(el){
var on=el===active && pull>0.02;
el.classList.toggle("is-magnet", on);
if(on){
el.style.setProperty("--pull", p.toFixed(3));
var r=el.getBoundingClientRect();
var bx=r.left+r.width/2, by=r.top+r.height/2;
var reach=hit?hit.reach:(RADIUS+Math.max(r.width,r.height)*0.18);
var prox=1-Math.min(1, Math.hypot(mx-bx, my-by)/reach);
var strength=p*prox;
tx=mx+(bx-mx)*strength;
ty=my+(by-my)*strength;
var ox=(mx-bx)*0.12*strength;
var oy=(my-by)*0.12*strength;
el.style.transform="translate("+ox+"px,"+oy+"px)";
} else {
el.style.removeProperty("--pull");
el.style.transform="";
}
});
var k=0.26+p*0.22;
cx+=(tx-cx)*k;
cy+=(ty-cy)*k;
if(cur){
cur.classList.toggle("is-on", visible);
cur.classList.toggle("is-locked", !scrolling && p>0.82);
cur.classList.toggle("is-scroll", scrolling);
cur.style.transform="translate("+cx+"px,"+cy+"px) translate(-50%,-50%)";
}
}

function markScroll(){
scrolling=true;
if(cur) cur.classList.add("is-scroll");
clearTimeout(scrollT);
scrollT=setTimeout(function(){ scrolling=false; }, 180);
}
function pulseClick(){
if(!cur) return;
cur.classList.remove("is-click");
void cur.offsetWidth;
cur.classList.add("is-click");
clearTimeout(clickT);
clickT=setTimeout(function(){ cur.classList.remove("is-click"); }, 400);
}

window.addEventListener("mousemove", function(e){
mx=e.clientX; my=e.clientY; visible=true;
}, {passive:true});
document.addEventListener("mouseleave", function(){ visible=false; });
window.addEventListener("wheel", markScroll, {passive:true});
window.addEventListener("scroll", markScroll, {passive:true});
window.addEventListener("mousedown", function(e){
pulseClick();
if(e.target.closest && e.target.closest(".live-widget-close")) return;
if(!active || pull<0.35 || scrolling) return;
if(active.contains(e.target)) return;
e.preventDefault();
active.click();
}, true);
raf=requestAnimationFrame(tick);
}

function boot(){
applySite();
initTheme();
buildAgenda();
initReveals(); initNav(); initHeader(); initParallax(); initParty(); initMagnet();
bindLiveWidgetClose();
initHeroType();
introDateCard();
startClock();
setTimeout(function(){ computeGeom(); layoutReel(reelEase); },300);
var rt; window.addEventListener("resize",function(){ clearTimeout(rt); rt=setTimeout(function(){ computeGeom(); layoutReel(reelEase); syncDateCard(); },150); },{passive:true});
window.addEventListener("load",function(){ computeGeom(); layoutReel(reelEase); syncDateCard(); });
}

if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot); else boot();
})();