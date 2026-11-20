/* 배포용 저장을 위해, 화면이 바뀌기 전의 원본 문서를 가장 먼저 기억해 둡니다. (이 스크립트가 문서의 마지막 요소) */
const PRISTINE_HTML = document.documentElement.outerHTML;

(function(){
"use strict";

/* =========================================================
   0. 공통 데이터
   ========================================================= */
const ITEMS = {
  carpetbag:{ic:`👜`, name:`낡은 융단 가방`, desc:`앤의 '세상 재산 전부'가 든 가방. 손잡이를 요령 있게 들지 않으면 쏙 빠져 버려요.`},
  plum:{ic:`🌼`, name:`야생 자두 꽃가지`, desc:`언덕길에서 마차 옆을 스치던 하얀 꽃가지. 앤은 신부의 면사포를 떠올렸어요.`},
  petal:{ic:`🌸`, name:`벚꽃잎 한 장`, desc:`철길 모퉁이 산벚나무 '대리석 궁전'에서 가져온 꽃잎. (상상 장면에서만 얻을 수 있어요)`},
  namecard:{ic:`✍️`, name:`이름 카드`, desc:`내가 가로수길에 붙인 이름: '{avenue}'`}
};
const ALBUMS = {};
ALBUMS.ch1 = [
  {id:`waiting`, ic:`🚪`, name:`답답한 대합실`},
  {id:`cherry`, ic:`🌸`, name:`벚나무 위 대리석 궁전`},
  {id:`princess`, ic:`👑`, name:`기차역의 공주님`},
  {id:`flying`, ic:`🪽`, name:`하늘을 나는 마차`},
  {id:`matthewTalk`, ic:`🐴`, name:`매슈 아저씨의 이야기`},
  {id:`mirror`, ic:`🪞`, name:`노을 거울 연못`},
  {id:`castle`, ic:`🏰`, name:`일곱 탑의 초록 지붕 성`}
];
const GLOSS = {
  "크루프":`어린아이 목이 붓고 숨쉬기 힘들어지며 쉰 기침을 하는 병이에요.`,
  "토근 시럽":`옛날에 목의 가래를 토해 내게 하려고 쓰던 약이에요. 지금은 쓰지 않으니, 아플 땐 꼭 어른께 알리고 병원에 가요!`,
  "수상":`캐나다 정부를 이끄는 가장 높은 사람(총리)이에요.`,
  "보수당":`캐나다의 정당 이름이에요. 매슈와 마릴라가 지지하는 당이지요.`,
  "망각의 망토":`'잊어버림'을 망토처럼 덮어씌운다는 뜻. 지난 일을 다 잊겠다는 앤의 멋 부린 표현이에요.`,
  "플란넬":`보드랍고 따뜻한 털실 천이에요.`,
  "부인회":`교회 일을 돕는 마을 아주머니들의 모임이에요.`,
  "까치밥나무 열매 포도주":`까치밥나무(커런트)의 작은 열매로 담근 술이에요. 빛깔이 산딸기 주스처럼 새빨개요.`,
  "산딸기 주스":`산딸기로 만든 달콤한 음료(cordial). 술이 들어 있지 않아요.`,
  "천연두":`옛날에 아주 무서웠던 전염병. 지금은 예방 주사 덕분에 사라졌어요.`,
  "조각보":`여러 색 천 조각을 이어 붙여 만드는 바느질감이에요.`,
  "기하":`도형의 성질을 따지는 수학이에요. 앤이 제일 어려워한 과목이지요.`,
  "워털루":`나폴레옹이 크게 진 전투의 장소. '큰 패배'를 뜻하는 말로 쓰여요.`,
  "석판":`옛날 학생들이 공책 대신 쓰던 얇은 돌판. 석필로 글씨를 쓰고 지울 수 있었어요.`,
  "송진 껌":`가문비나무에서 흘러나와 굳은 진. 옛날 아이들은 이걸 껌처럼 씹었대요.`,
  "대수":`숫자 대신 x, y 같은 문자를 써서 푸는 수학이에요.`,
  "퀸스 아카데미":`프린스 에드워드 섬 샬럿타운에 있는 학교. 선생님이 되려는 학생들이 들어가요.`,
  "교단":`교실 앞쪽 칠판 아래, 한 단 높게 만든 자리예요.`,
  "희생양":`여럿이 함께 잘못했는데 혼자 벌을 뒤집어쓰는 사람을 말해요.`,
  "들러리":`결혼식에서 신부 곁을 지키며 도와주는 사람이에요.`,
  "자수정":`보랏빛이 도는 보석이에요.`,
  "미나리아재비":`봄과 여름에 들판에 피는 반짝이는 노란 꽃이에요.`,
  "마음의 친구":`앤이 말하는 'bosom friend'. 무엇이든 털어놓을 수 있는, 단 하나뿐인 진짜 친구를 뜻해요.`,
  "참나리":`주황 꽃잎에 까만 점이 콕콕 박힌 커다란 백합꽃이에요.`,
  "드라이어드":`그리스 신화에 나오는 나무의 요정이에요.`,
  "폐병":`폐에 생기는 병(결핵). 옛날 이야기 속 주인공들이 자주 걸리던 무서운 병이에요.`,
  "치마 본":`옷을 지을 때 천을 자르는 기준이 되는 종이 모양이에요.`,
  "주일 학교":`교회에서 일요일마다 아이들에게 성경을 가르치는 모임이에요.`,
  "과수원 비탈":`다이애나네 집의 이름(Orchard Slope). 과수원이 있는 비탈에 자리한 집이에요.`,
  "카모디":`에이번리 근처의 마을. 가게가 있어서 물건을 사러 가는 곳이에요.`,
  "인색":`자기 것을 아까워해서 남에게 잘 나누지 않는 것을 말해요.`,
  "지붕널":`지붕을 덮는 데 쓰는 얇은 나무판자예요.`,
  "윈시":`면과 양털을 섞어 짠 거칠고 질긴 천이에요. 값이 싸서 고아원 옷으로 쓰였어요.`,
  "융단 가방":`두꺼운 카펫 천으로 만든 옛날식 여행 가방이에요.`,
  "대합실":`기차역에서 기차를 기다리며 쉬는 방이에요.`,
  "고아원":`부모가 없는 아이들이 함께 사는 곳이에요.`,
  "노바스코샤":`캐나다 동쪽의 지역 이름. 앤이 지내던 고아원이 있던 곳이에요.`,
  "프린스 에드워드 섬":`캐나다 동쪽 바다에 있는 섬. 이 이야기의 무대예요.`,
  "마일":`길이를 재는 단위. 1마일은 약 1.6킬로미터예요.`,
  "야드":`길이를 재는 단위. 1야드는 약 0.9미터예요.`,
  "설화석고":`희고 매끄러운 돌. 하얗고 고운 피부를 빗댈 때 써요.`,
  "장미창":`성당 벽에 있는 둥근 꽃무늬 색유리 창이에요.`,
  "크로커스":`이른 봄에 피는 보라색·노란색 작은 꽃이에요.`,
  "굼벵이":`풍뎅이 같은 곤충의 애벌레예요.`,
  "포플러":`줄기가 곧고 높게 자라는 나무예요. 잎이 바람에 사각사각 소리를 내요.`,
  "이교도":`기독교를 믿지 않는 사람. '다이애나'는 로마 신화 속 여신 이름이라 매슈에게는 낯설게 들렸어요.`,
  "린네풀":`숲속 그늘에 자라는 작은 분홍 꽃이에요.`,
  "백작":`옛날 유럽의 높은 귀족 계급이에요.`,
  "선교사":`먼 나라에 가서 종교를 전하는 사람이에요.`,
  "산벚나무":`산이나 들에 저절로 자라는 벚나무예요.`,
  "역장":`기차역 일을 책임지는 사람이에요.`,
  "밤색 암말":`밤 껍질 같은 붉은 갈색 털을 가진 암컷 말이에요.`,
  "금잔화":`주황빛이 도는 노란 꽃이에요.`,
  "첨탑":`교회 지붕 위에 뾰족하게 솟은 탑이에요.`,
  "드라이어드":`그리스 신화에 나오는 나무와 숲의 요정이에요.`,
  "목사관":`목사님 가족이 사는 집이에요.`,
  "진통제 연고":`아픈 곳에 바르거나 먹는 약이에요. 옛날엔 먹기도 했대요.`,
  "층 케이크":`여러 겹의 빵 사이에 잼이나 크림을 바른 케이크예요.`,
  "모슬린":`얇고 부드러운 무명천이에요.`,
  "주일 학교":`일요일에 교회에서 아이들에게 성경을 가르치는 모임이에요.`,
  "행상인":`물건을 짊어지고 이 집 저 집 다니며 파는 장수예요.`,
  "부인회":`교회 아주머니들이 모여 봉사와 모금을 하는 모임이에요.`,
  "허영심":`실제보다 더 잘나 보이고 싶어 하는 마음이에요.`,
  "스누드":`옛날 스코틀랜드 아가씨들이 머리에 두르던 띠예요.`,
  "평저선":`바닥이 납작한 작은 배예요.`,
  "일레인":`아서 왕 전설에 나오는 아가씨예요. 랜슬롯을 사랑하다 죽어 배에 실려 카멜롯으로 떠내려가요.`,
  "카멜롯":`아서 왕 전설 속 왕의 성이 있는 도시예요.`,
  "테니슨":`영국의 유명한 시인이에요. 아서 왕 이야기를 시로 썼어요.`,
  "랜슬롯":`아서 왕의 기사 중 가장 용감한 기사예요.`,
  "뱃고물":`배의 뒷부분이에요.`
};
const GLOSS_RE = new RegExp(Object.keys(GLOSS).sort((a,b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "g");
const KIND = {act:`🚶 행동하기`, predict:`🔮 예측하기 · 원작의 앤은?`, talk:`💬 말 걸기`, name:`✍️ 이름 짓기`};
const WHO = {anne:`앤 셜리`, matthew:`매슈 커스버트`, station:`역장`, marilla:`마릴라 커스버트`, lynde:`레이첼 린드 부인`, diana:`다이애나 배리`, barry:`배리 부인`, gilbert:`길버트 블라이스`, phillips:`필립스 선생님`, jimmy:`지미 글로버`, doctor:`의사 선생님`, maryjoe:`메리 조`, allan:`앨런 사모님`, ruby:`루비 길리스`, jane:`제인 앤드루스`};
const CHARS = {matthew:{ic:`🐴`, name:`매슈`, full:`매슈 아저씨`, start:1}, marilla:{ic:`🧺`, name:`마릴라`, full:`마릴라 아주머니`, start:1}, lynde:{ic:`🧶`, name:`린드 부인`, full:`린드 부인`, start:0}, diana:{ic:`🎀`, name:`다이애나`, full:`다이애나`, start:1}, barry:{ic:`📚`, name:`배리 부인`, full:`배리 부인`, start:0}, gilbert:{ic:`🍎`, name:`길버트`, full:`길버트`, start:0}, allan:{ic:`🌸`, name:`앨런 사모님`, full:`앨런 사모님`, start:1}};
const DEFAULT_NAMES = {avenue:`기쁨의 하얀 길`, pond:`반짝이는 호수`, advice:`…`, snood:`스누드`, spring:`드라이어드의 샘`, vale:`제비꽃 골짜기`};
CHAPTERS.forEach(c => { if(c.items) Object.assign(ITEMS, c.items); if(c.album) ALBUMS[c.key] = c.album; });
const BADGE = {
  canon:{e:`📖 원작과 같은 길!`, l:`📖 원작의 길을 걸었습니다`},
  imag:{e:`✨ 상상의 날개를 펼쳤어요!`, l:`✨ 상상의 날개를 펼쳤습니다`},
  bal:{e:`⚖️ 지혜로운 균형을 찾았어요!`, l:`⚖️ 지혜로운 균형을 찾았습니다`}
};
const LABEL = {canon:`원작`, imag:`상상`, bal:`균형`, name:`나만의 이름`, free:`나의 생각`};
CHAPTERS[0].bgKeys = CHAPTERS[0].bgKeys || [`ch1`, `ch1_road`, `ch1_avenue`, `ch1_pond`, `ch1_home`];
let CH, NODES, IDX, CHOICE_IDS, ALBUM;
function setChapter(ci){
  CH = CHAPTERS[Math.max(0, Math.min(CHAPTERS.length - 1, ci || 0))];
  NODES = CH.nodes; IDX = {};
  NODES.forEach((n, i) => { if(n.id) IDX[n.id] = i; });
  CHOICE_IDS = NODES.filter(n => n.t === "choice" || n.t === "name").map(n => n.id);
  ALBUM = ALBUMS[CH.key] || [];
  bookBuiltFor = null;
}
let bookBuiltFor = null;
setChapter(0);
const BG_KEYS = [].concat(...CHAPTERS.map(c => c.bgKeys || []));
const SPRITE_KEYS = [`anne_happy`,`anne_sad`,`anne_surprised`,`anne_angry`,`anne_dreamy`,`matthew`,`lynde`,`marilla_strict`,`marilla_warm`,`diana`,`barry`,`gilbert`,`phillips`,`doctor`,`minnie_may`,`allan`,`anne_green_hair`];

/* =========================================================
   1. 상태 & 저장
   ========================================================= */
const SAVE_KEY = "anneVN_v2";
const fresh = () => ({ch:0, pos:0, phase:"cover", started:false, canon:50, imag:50, hearts:{matthew:1}, met:{}, items:[], flags:{}, names:{},
  picks:[], tally:{canon:0, imag:0, bal:0}, ending:null, order:null, note:null, bg:`ch1`, cam:``, hist:{}, snap:null});
const freshP = () => ({album:{}, endings:{}, reached:{}, snaps:{}});
let S = fresh();
let P = freshP();
let level = "easy", soundOn = true, musicOn = true;
let fxOn = !(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
function save(){ try{ localStorage.setItem(SAVE_KEY, JSON.stringify({S, P, level, soundOn, fxOn, musicOn})); }catch(e){} }
function load(){
  try{
    const d = JSON.parse(localStorage.getItem(SAVE_KEY) || "null"); if(!d) return;
    if(d.S) S = Object.assign(fresh(), d.S);
    if(d.P) P = Object.assign(freshP(), d.P);
    if(d.level === "easy" || d.level === "lit") level = d.level;
    if(typeof d.soundOn === "boolean") soundOn = d.soundOn;
    if(typeof d.musicOn === "boolean") musicOn = d.musicOn;
    if(typeof d.fxOn === "boolean") fxOn = d.fxOn;
    if(S.flags && S.flags.metMatthew) S.met.matthew = true;
    setChapter(S.ch);
    if(!NODES[S.pos]) S.pos = 0;
  }catch(e){}
}

/* =========================================================
   2. 사운드 (Web Audio API)
   ========================================================= */
let actx = null;
function unlockAudio(){
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return null;
  if(!actx){ try{ actx = new AC(); }catch(e){ return null; } }
  if(actx.state === "suspended") actx.resume().catch(() => {});
  return actx;
}
["pointerdown","touchstart","keydown","click"].forEach(ev => window.addEventListener(ev, unlockAudio, {passive:true, capture:true}));
function tone(f, t, d, v, type){
  const o = actx.createOscillator(), g = actx.createGain();
  o.type = type || "sine"; o.frequency.setValueAtTime(f, t);
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.008); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t + d + 0.02);
}
let lastTick = 0;
function sfx(kind){
  if(!soundOn) return;
  const ctx = unlockAudio(); if(!ctx || ctx.state !== "running") return;
  const t = ctx.currentTime;
  try{
    if(kind === "type"){ if(t - lastTick < 0.05) return; lastTick = t; tone(1100 + Math.random()*500, t, 0.035, 0.035, "square"); tone(220, t, 0.03, 0.03, "triangle"); }
    else if(kind === "select"){ tone(659, t, 0.12, 0.12, "triangle"); tone(988, t + 0.07, 0.18, 0.1, "triangle"); }
    else if(kind === "chime"){ [784, 988, 1175, 1568].forEach((f,i) => tone(f, t + i*0.08, 0.35, 0.07, "sine")); }
    else if(kind === "page"){ tone(523, t, 0.15, 0.06, "sine"); tone(784, t + 0.1, 0.25, 0.06, "sine"); }
    else if(kind === "item"){ tone(1047, t, 0.1, 0.08, "sine"); tone(1319, t + 0.08, 0.1, 0.08, "sine"); tone(1568, t + 0.16, 0.2, 0.08, "sine"); }
    else if(kind === "dream"){ [523, 659, 784, 1047, 784].forEach((f,i) => tone(f, t + i*0.11, 0.5, 0.04, "sine")); }
    else if(kind === "end"){ [392, 523, 659, 784, 1047].forEach((f,i) => tone(f, t + i*0.14, 0.7, 0.07, "triangle")); }
  }catch(e){}
}

/* =========================================================
   3. 이미지 (업로드 > 내장 > 같은 폴더 > SVG)
   ========================================================= */
const EMB = (window.EMBEDDED_IMAGES && typeof window.EMBEDDED_IMAGES === "object") ? window.EMBEDDED_IMAGES : {};
const FILES = (window.IMAGE_FILES && typeof window.IMAGE_FILES === "object") ? window.IMAGE_FILES : {};
const uploaded = {}, folderFound = {};
function imgFor(k){ return uploaded[k] || EMB[k] || FILES[k] || folderFound[k] || null; }
/* 앱(웹) 판: 그림이 별도 파일이라, 장에 들어갈 때 그 장 그림을 미리 불러오고 쉬는 동안 나머지도 받아 둔다(오프라인용) */
const preloaded = {};
function preloadKeys(keys){ keys.forEach(k => { const s = FILES[k]; if(s && !preloaded[s] && !uploaded[k] && !EMB[k]){ preloaded[s] = new Image(); preloaded[s].src = s; } }); }
function preloadChapter(){
  const ks = new Set(CH.bgKeys || []);
  CH.nodes.forEach(n => { if(n.bg) ks.add(n.bg); if(n.f) ks.add(n.f); if(n.o) ks.add(n.o); });
  preloadKeys([...ks]);
}
function warmCache(){
  if(!/^https?:$/.test(location.protocol)) return;
  const urls = Object.values(FILES).concat(CHAPTERS.map(c => c.bgm).filter(Boolean));
  if(!urls.length) return;
  let i = 0;
  const next = () => { if(i >= urls.length) return; const u = urls[i++]; fetch(u).catch(() => {}).finally(() => setTimeout(next, 150)); };
  setTimeout(next, 5000);
}
function probe(key, list){
  if(imgFor(key)) return;
  let i = 0;
  const next = () => { if(i >= list.length) return; const src = list[i++]; const im = new Image();
    im.onload = () => { if(!uploaded[key] && !EMB[key]){ folderFound[key] = src; renderScene(true); } }; im.onerror = next; im.src = src; };
  next();
}
function probeFolder(){
  BG_KEYS.forEach(k => probe(k, [k + ".png", "bg_" + k + ".png", k + ".jpg"]));
  SPRITE_KEYS.forEach(k => probe(k, [k + ".png"]));
}
function normalizeKey(name){
  let n = name.toLowerCase().replace(/\.[a-z0-9]+$/, "").trim().replace(/\s+/g, "_");
  const m = n.match(/^(?:bg_)?ch0?(\d{1,2})(_[a-z]+)?$/);
  if(m) return "ch" + parseInt(m[1], 10) + (m[2] || "");
  return n;
}
const isBgKey = k => /^ch\d+(_[a-z]+)?$/.test(k);
const loadImg = src => new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; });
function removeEdgeWhite(ctx, w, h){
  const id = ctx.getImageData(0, 0, w, h), d = id.data;
  const isBg = p => { const i = p*4; if(d[i+3] < 16) return true; const r = d[i], g = d[i+1], b = d[i+2], mn = Math.min(r,g,b), mx = Math.max(r,g,b); return mn > 226 && mx - mn < 26; };
  const corners = [0, w-1, (h-1)*w, h*w-1];
  if(corners.filter(p => d[p*4+3] > 200 && isBg(p)).length < 3) return;
  const seen = new Uint8Array(w*h), st = [];
  const push = p => { if(!seen[p] && isBg(p)){ seen[p] = 1; st.push(p); } };
  for(let x=0; x<w; x++){ push(x); push((h-1)*w + x); }
  for(let y=0; y<h; y++){ push(y*w); push(y*w + w - 1); }
  let bgR = 0, bgG = 0, bgB = 0, bgN = 0;
  while(st.length){ const p = st.pop(), q = p*4; if(d[q+3] > 200 && bgN < 200000){ bgR += d[q]; bgG += d[q+1]; bgB += d[q+2]; bgN++; } d[q+3] = 0; const x = p % w, y = (p - x) / w;
    if(x>0) push(p-1); if(x<w-1) push(p+1); if(y>0) push(p-w); if(y<h-1) push(p+w); }
  /* 팔과 몸 사이처럼 테두리와 이어지지 않은 '갇힌 배경'도 찾아서 지움.
     배경색과 거의 같은 순백색이고 일정 크기 이상인 덩어리만 지우므로, 눈 흰자처럼 작은 부분은 남음 */
  if(bgN){
    const br = bgR/bgN, bgg = bgG/bgN, bb = bgB/bgN, smallMin = Math.max(40, Math.round(w*h*0.00006));
    const strict = p => { const i = p*4; if(d[i+3] < 16) return false; const r = d[i], g = d[i+1], b = d[i+2];
      return Math.min(r,g,b) > 212 && Math.max(r,g,b) - Math.min(r,g,b) < 20 && Math.abs(r-br) < 16 && Math.abs(g-bgg) < 16 && Math.abs(b-bb) < 16; };
    const lab = new Uint8Array(w*h);
    for(let s0 = 0; s0 < w*h; s0++){
      if(seen[s0] || lab[s0] || !strict(s0)) continue;
      const comp = [s0], stack = [s0]; lab[s0] = 1;
      while(stack.length){ const p = stack.pop(), x = p % w, y = (p - x) / w;
        const nb = [x>0 ? p-1 : -1, x<w-1 ? p+1 : -1, y>0 ? p-w : -1, y<h-1 ? p+w : -1];
        for(const q of nb){ if(q >= 0 && !seen[q] && !lab[q] && strict(q)){ lab[q] = 1; stack.push(q); comp.push(q); } } }
      /* 덩어리의 평균 색이 배경 종이색과 같으면(따뜻한 기가 없으면) 배경 틈으로 보고 지움.
         이(치아)·눈 흰자처럼 살짝 노르스름하거나 회색빛인 부분은 평균 색이 달라서 남음 */
      if(comp.length < smallMin) continue;
      let sr = 0, sg = 0, sb = 0; for(const p of comp){ sr += d[p*4]; sg += d[p*4+1]; sb += d[p*4+2]; }
      const mr = sr/comp.length, mg = sg/comp.length, mb = sb/comp.length;
      const warm = (mr - mb) - (br - bb), dim = Math.min(br, bgg, bb) - Math.min(mr, mg, mb);
      if(warm > 4.6 || dim > 8) continue;
      /* 눈 흰자 보호: 배경 틈은 펜 선(진한 테두리)에 둘러싸여 있고, 눈 흰자는 대부분 피부색에 둘러싸여 있음 */
      const inC = new Set(comp), ringSeen = new Set(); let dark = 0, tot = 0;
      for(const p of comp){ const x = p % w, y = (p - x) / w;
        for(let dy=-3; dy<=3; dy++) for(let dx=-3; dx<=3; dx++){ const xx = x+dx, yy = y+dy; if(xx<0||yy<0||xx>=w||yy>=h) continue;
          const q = yy*w + xx; if(inC.has(q) || ringSeen.has(q)) continue; ringSeen.add(q); tot++;
          if((d[q*4] + d[q*4+1] + d[q*4+2]) / 3 < 90) dark++; } }
      if(tot && dark / tot >= 0.18){ for(const p of comp){ seen[p] = 1; d[p*4+3] = 0; } }
    }
  }
  for(let pass = 0; pass < 2; pass++){
    const edge = [];
    for(let y=1; y<h-1; y++) for(let x=1; x<w-1; x++){ const p = y*w + x; if(seen[p]) continue;
      if(seen[p-1] || seen[p+1] || seen[p-w] || seen[p+w]) edge.push(p); }
    for(const p of edge){ const i = p*4, mn = Math.min(d[i], d[i+1], d[i+2]);
      if(mn > 200){ d[i+3] = Math.round(d[i+3] * Math.max(0.1, (255 - mn) / 55)); if(mn > 238) seen[p] = 1; }
      else if(mn > 170 && pass === 0) d[i+3] = Math.round(d[i+3] * Math.max(0.35, (255 - mn) / 85)); }
  }
  ctx.putImageData(id, 0, 0);
}
async function processImage(src, key){
  const im = await loadImg(src), bg = isBgKey(key);
  const sc = Math.min(1, (bg ? 1600 : 1200) / im.naturalWidth, (bg ? 900 : 1000) / im.naturalHeight);
  const w = Math.max(1, Math.round(im.naturalWidth * sc)), h = Math.max(1, Math.round(im.naturalHeight * sc));
  const cv = document.createElement("canvas"); cv.width = w; cv.height = h;
  const ctx = cv.getContext("2d", {willReadFrequently: !bg});
  if(bg){ ctx.fillStyle = "#fbf6ec"; ctx.fillRect(0, 0, w, h); }
  ctx.drawImage(im, 0, 0, w, h);
  if(bg) return cv.toDataURL("image/jpeg", 0.86);
  removeEdgeWhite(ctx, w, h);
  return cv.toDataURL("image/png");
}
async function handleFiles(files){
  const list = Array.from(files || []).filter(f => /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif)$/i.test(f.name));
  if(!list.length) return;
  toast("이미지를 정리하는 중이에요… (" + list.length + "개)");
  const ok = [], fail = [];
  for(const f of list){
    const key = normalizeKey(f.name), url = URL.createObjectURL(f);
    try{ uploaded[key] = await processImage(url, key); ok.push(key); }catch(e){ fail.push(f.name); }finally{ URL.revokeObjectURL(url); }
  }
  renderScene(true);
  const known = ok.filter(k => BG_KEYS.includes(k) || SPRITE_KEYS.includes(k)), other = ok.filter(k => !known.includes(k));
  let msg = `<p><b>${ok.length}개</b>의 이미지를 불러와 화면에 바로 반영했어요.</p>`;
  if(known.length) msg += `<div class="img-list">${known.map(k => `<span>${k}</span>`).join("")}</div>`;
  if(other.length) msg += `<p style="margin-top:8px">아래 이미지는 아직 쓰이는 장면이 없지만, 배포용 파일에는 함께 저장돼요. (앞으로 만들 장에서 쓸 수 있어요)</p><div class="img-list">${other.map(k => `<span class="miss">${k}</span>`).join("")}</div>`;
  if(fail.length) msg += `<p style="margin-top:8px;color:#b9473f">읽지 못한 파일: ${esc(fail.join(", "))}</p>`;
  modal("🖼️ 이미지 불러오기 완료", msg, [{label:"확인", cls:"big alt"}]);
}

/* ---------- SVG 수채화 폴백 ---------- */
function mulberry(a){ return function(){ a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const DEFS = id => `<defs>
  <filter id="wc${id}" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="${id*7+3}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="16" xChannelSelector="R" yChannelSelector="G" result="d"/><feGaussianBlur in="d" stdDeviation="1.4"/></filter>
  <filter id="soft${id}"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="paper${id}"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="11" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.28  0 0 0 0.10 0"/></filter></defs>`;
const SVG_OPEN = `<svg viewBox="0 0 1600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">`;
function blossomCloud(rnd, cx, cy, rx, ry, n, cols){ let s = ""; for(let i=0;i<n;i++){ const a = rnd()*Math.PI*2, r = Math.sqrt(rnd()); s += `<circle cx="${(cx+Math.cos(a)*r*rx).toFixed(0)}" cy="${(cy+Math.sin(a)*r*ry).toFixed(0)}" r="${(18+rnd()*28).toFixed(0)}" fill="${cols[i%cols.length]}" opacity="${(.55+rnd()*.4).toFixed(2)}"/>`; } return s; }
function girlFig(x, y, s, noHat){
  const hair = "#c8552f";
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="118" rx="46" ry="9" fill="#5a4030" opacity=".18"/>
    <path d="M-30 20 Q0 6 30 20 L44 110 Q0 122 -44 110 Z" fill="#9a8f78"/><rect x="-4" y="6" width="8" height="12" fill="#f1cfb0"/>
    <circle cx="0" cy="-8" r="21" fill="#f6d9bd"/><path d="M-22 -10 Q-20 -34 0 -33 Q20 -34 22 -10 Q16 -24 0 -22 Q-16 -24 -22 -10Z" fill="${hair}"/>
    <path d="M-19 -4 Q-30 18 -24 42" stroke="${hair}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M19 -4 Q30 18 24 42" stroke="${hair}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <circle cx="-7" cy="-7" r="2" fill="#4b3626"/><circle cx="7" cy="-7" r="2" fill="#4b3626"/><path d="M-5 3 Q0 6 5 3" stroke="#a5523f" stroke-width="1.8" fill="none"/>
    ${noHat ? "" : `<ellipse cx="0" cy="-28" rx="32" ry="7" fill="#8a6a4c"/><path d="M-17 -30 Q0 -48 17 -30Z" fill="#8a6a4c"/>`}</g>`;
}
function svgStation(){
  const rnd = mulberry(7); let ties = "", petals = "";
  for(let i=0;i<14;i++){ const t = Math.pow(i/13, 1.6), y = 604 + t*290, xl = 1026 + 120*t, xr = 1124 + 470*t; ties += `<rect x="${xl.toFixed(0)}" y="${y.toFixed(0)}" width="${(xr-xl).toFixed(0)}" height="${(5+t*14).toFixed(0)}" fill="#8a6a50" opacity=".6"/>`; }
  for(let i=0;i<26;i++){ const px = 700+rnd()*900, py = 150+rnd()*650; petals += `<ellipse cx="${px.toFixed(0)}" cy="${py.toFixed(0)}" rx="6" ry="3.5" fill="#fff" opacity=".85" transform="rotate(${Math.round(rnd()*180)} ${px.toFixed(0)} ${py.toFixed(0)})"/>`; }
  return SVG_OPEN + DEFS(1) + `<linearGradient id="sk1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9b9dc"/><stop offset=".45" stop-color="#f6c9b4"/><stop offset=".8" stop-color="#fde3c2"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk1)"/><g filter="url(#wc1)">
    <circle cx="420" cy="250" r="60" fill="#fff4dc" opacity=".8"/>
    <path d="M0 470 Q260 380 520 440 T1060 420 T1600 400 L1600 640 L0 640Z" fill="#a9c3b0" opacity=".75"/>
    <path d="M0 540 Q300 470 640 520 T1300 500 T1600 520 L1600 700 L0 700Z" fill="#8fb293" opacity=".85"/>
    <path d="M0 620 L1600 600 L1600 900 L0 900Z" fill="#c9a88a"/>
    <rect x="120" y="360" width="330" height="200" fill="#e9d6b6"/><path d="M95 370 L285 280 L475 370Z" fill="#b5735a"/>
    <rect x="170" y="420" width="70" height="80" fill="#8fa9b8" opacity=".85"/><rect x="320" y="440" width="70" height="120" fill="#7c5a43"/>
    <rect x="0" y="560" width="900" height="70" fill="#a98d6c"/><rect x="0" y="625" width="900" height="16" fill="#7c6450" opacity=".6"/>
    ${ties}<path d="M1150 900 L1026 604" stroke="#6f5b4c" stroke-width="10"/><path d="M1594 900 L1124 604" stroke="#6f5b4c" stroke-width="10"/>
    <path d="M1230 640 Q1220 480 1250 380 M1250 470 Q1180 420 1120 380 M1245 430 Q1310 380 1360 340" stroke="#6b4d3a" stroke-width="22" fill="none" stroke-linecap="round"/>
    ${blossomCloud(rnd, 1240, 300, 210, 150, 70, ["#fffaf6","#fbe6ea"])}
    <rect x="560" y="520" width="160" height="40" fill="#b99a74"/><rect x="570" y="500" width="140" height="24" fill="#c9ab84"/></g>
    <g filter="url(#soft1)" opacity=".45"><circle cx="1240" cy="300" r="220" fill="#fff"/></g>${petals}
    <g class="svg-figure">${girlFig(640, 410, 1.15)}<g transform="translate(720,500)"><rect width="54" height="40" rx="6" fill="#9a5b3e"/><path d="M14 0 Q27 -18 40 0" stroke="#5a3a28" stroke-width="5" fill="none"/><path d="M0 14 H54" stroke="#e1b37c" stroke-width="4"/></g></g>
    <rect width="1600" height="900" filter="url(#paper1)"/></svg>`;
}
function buggy(x, y, s){
  return `<g class="svg-figure" transform="translate(${x},${y}) scale(${s})">
    <ellipse cx="60" cy="150" rx="170" ry="14" fill="#3d2a1c" opacity=".18"/>
    <path d="M-120 60 Q-110 20 -60 30 L-20 40 Q0 0 30 10 L20 60 Q-10 80 -50 80 L-70 140 M-50 80 L-30 140 M-100 70 L-110 140 M-80 72 L-88 140" stroke="#8a4b2a" stroke-width="18" fill="none" stroke-linecap="round"/>
    <ellipse cx="-70" cy="58" rx="58" ry="28" fill="#9a5530"/><path d="M-20 30 Q5 -5 30 8 L22 30Z" fill="#9a5530"/>
    <path d="M30 60 L190 60 L180 110 L40 110Z" fill="#4e3a2c"/><circle cx="150" cy="120" r="42" fill="none" stroke="#3b2a20" stroke-width="7"/>
    <path d="M150 78 V162 M108 120 H192" stroke="#3b2a20" stroke-width="3"/>
    <rect x="70" y="10" width="34" height="52" rx="10" fill="#4a5a48"/><circle cx="87" cy="0" r="14" fill="#f0d0b0"/><path d="M73 -2 Q87 -22 101 -2" fill="#9a9a96"/>
    <rect x="118" y="22" width="26" height="40" rx="8" fill="#9a8f78"/><circle cx="131" cy="12" r="11" fill="#f6d9bd"/><path d="M121 10 Q131 -6 141 10" fill="#c8552f"/></g>`;
}
function svgRoad(){
  const rnd = mulberry(15); let birches = "";
  for(let i=0;i<9;i++){ const x = (i<5 ? 40 + i*95 : 1080 + (i-5)*120) + rnd()*30; birches += `<rect x="${x.toFixed(0)}" y="${(90+rnd()*80).toFixed(0)}" width="12" height="${(360+rnd()*80).toFixed(0)}" fill="#f4f1ea"/><path d="M${x.toFixed(0)} 300 h12 M${x.toFixed(0)} 380 h12" stroke="#5a5048" stroke-width="3"/>`; }
  return SVG_OPEN + DEFS(2) + `<linearGradient id="sk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9cde6"/><stop offset=".6" stop-color="#f7dcc4"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk2)"/><g filter="url(#wc2)">
    <path d="M0 260 Q300 300 520 520 L640 900 L0 900Z" fill="#8fae86"/><path d="M1600 240 Q1300 300 1080 520 L960 900 L1600 900Z" fill="#8fae86"/>
    <path d="M520 520 Q800 470 1080 520 L1160 900 L440 900Z" fill="#c45d43"/><path d="M640 600 Q800 580 960 600" stroke="#a84a35" stroke-width="6" fill="none" opacity=".6"/>
    ${birches}
    ${blossomCloud(rnd, 230, 230, 260, 140, 55, ["#fffaf6","#fbe6ea","#ffffff"])}${blossomCloud(rnd, 1370, 220, 260, 140, 55, ["#fffaf6","#fbe6ea","#ffffff"])}
    </g>${buggy(700, 600, 1.2)}<rect width="1600" height="900" filter="url(#paper2)"/></svg>`;
}
function svgAvenue(){
  const rnd = mulberry(23); let arches = "", trunks = "";
  for(let i=0;i<7;i++){ const t = i/6, w = 1500 - t*1150, cx = 800, top = 40 + t*250, base = 900 - t*360;
    trunks += `<path d="M${(cx-w/2).toFixed(0)} ${base.toFixed(0)} Q${(cx-w/2+30).toFixed(0)} ${(top+150).toFixed(0)} ${(cx-w/4).toFixed(0)} ${(top+40).toFixed(0)} M${(cx+w/2).toFixed(0)} ${base.toFixed(0)} Q${(cx+w/2-30).toFixed(0)} ${(top+150).toFixed(0)} ${(cx+w/4).toFixed(0)} ${(top+40).toFixed(0)}" stroke="#5c4433" stroke-width="${(26-t*18).toFixed(0)}" fill="none" stroke-linecap="round" opacity="${(1-t*.4).toFixed(2)}"/>`;
    arches += blossomCloud(rnd, cx, top + 30, w/2, 90 - t*40, 40, ["#ffffff","#fdf0f2","#f9e1e8","#fff8f0"]); }
  return SVG_OPEN + DEFS(3) + `<radialGradient id="rose3" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2c4"/><stop offset=".5" stop-color="#f7a98d"/><stop offset="1" stop-color="#b9799f" stop-opacity="0"/></radialGradient>
    <rect width="1600" height="900" fill="#6d5880"/><circle cx="800" cy="470" r="230" fill="url(#rose3)"/>
    <g filter="url(#wc3)"><path d="M0 900 L700 520 L900 520 L1600 900Z" fill="#b5553f"/><path d="M0 900 L700 520 L0 560Z" fill="#6e7d5c"/><path d="M1600 900 L900 520 L1600 560Z" fill="#6e7d5c"/>
    ${trunks}${arches}</g><g filter="url(#soft3)" opacity=".35"><rect x="0" y="0" width="1600" height="260" fill="#fff"/></g>
    ${buggy(640, 640, 1)}<rect width="1600" height="900" filter="url(#paper3)"/></svg>`;
}
function svgPond(){
  const rnd = mulberry(31); let firs = "";
  for(let i=0;i<16;i++){ const x = 60 + i*42 + rnd()*20, h = 120 + rnd()*90; firs += `<path d="M${x.toFixed(0)} ${(470-h).toFixed(0)} L${(x-28).toFixed(0)} 470 L${(x+28).toFixed(0)} 470Z" fill="${i%3 ? '#3f5e4b' : '#4c6e57'}"/>`; }
  return SVG_OPEN + DEFS(4) + `<linearGradient id="sk4" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7d86b8"/><stop offset=".5" stop-color="#f2a98f"/><stop offset=".8" stop-color="#fdd9a6"/></linearGradient>
    <linearGradient id="wt4" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f4a5a"/><stop offset=".3" stop-color="#c79ac9"/><stop offset=".55" stop-color="#f5b8a8"/><stop offset=".8" stop-color="#bfe0c4"/><stop offset="1" stop-color="#e8c890"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk4)"/><g filter="url(#wc4)">
    <rect x="1100" y="430" width="500" height="40" fill="#2f4f7a"/><path d="M1000 470 Q1250 420 1600 450 L1600 500 L1000 500Z" fill="#e3b778"/>
    ${firs}<path d="M0 470 L1600 470 L1600 900 L0 900Z" fill="#6f8f5f"/>
    <path d="M0 560 Q300 500 650 560 T1300 540 T1600 520 L1600 700 Q1200 740 800 690 T0 720Z" fill="url(#wt4)"/>
    <path d="M760 540 L760 700 M1000 530 L1000 690" stroke="#5a4a3a" stroke-width="10"/><path d="M700 600 Q880 560 1060 595" stroke="#6b5442" stroke-width="18" fill="none"/>
    <path d="M1150 380 L1150 330 L1210 300 L1270 330 L1270 380Z" fill="#a8a8a8"/><rect x="1196" y="345" width="22" height="20" fill="#ffe28a"/>
    ${blossomCloud(rnd, 1300, 380, 140, 40, 22, ["#ffffff","#fbeef0"])}
    <path d="M0 900 L0 760 Q400 720 800 790 T1600 760 L1600 900Z" fill="#5c7b4e"/></g>
    ${buggy(260, 690, .8)}<rect width="1600" height="900" filter="url(#paper4)"/></svg>`;
}
function svgHome(){
  const rnd = mulberry(41); let stars = "", poplars = "";
  for(let i=0;i<40;i++) stars += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(rnd()*360).toFixed(0)}" r="${(1+rnd()*1.8).toFixed(1)}" fill="#fff" opacity="${(.4+rnd()*.5).toFixed(2)}"/>`;
  for(let i=0;i<5;i++){ const x = 470 + i*55 + (i>2 ? 520 : 0); poplars += `<ellipse cx="${x}" cy="${(400 - (i%2)*30)}" rx="24" ry="${130 + (i%2)*20}" fill="#2f4636"/>`; }
  return SVG_OPEN + DEFS(5) + `<linearGradient id="sk5" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f2b4f"/><stop offset=".55" stop-color="#5a5a86"/><stop offset=".85" stop-color="#e6a873"/></linearGradient>
    <radialGradient id="st5"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#e8f4ff"/><stop offset="1" stop-color="#e8f4ff" stop-opacity="0"/></radialGradient>
    <rect width="1600" height="900" fill="url(#sk5)"/>${stars}<circle cx="1000" cy="150" r="70" fill="url(#st5)"/><circle cx="1000" cy="150" r="9" fill="#fff"/>
    <g filter="url(#wc5)"><path d="M0 560 Q400 470 800 520 T1600 500 L1600 900 L0 900Z" fill="#33463a"/>
    <path d="M0 640 Q500 600 1000 650 T1600 640 L1600 900 L0 900Z" fill="#46604b"/>
    ${poplars}
    <rect x="720" y="400" width="300" height="170" fill="#ece6d6"/><path d="M700 410 L780 330 L860 410Z M860 410 L940 320 L1040 410Z" fill="#3f7a4e"/><path d="M700 412 H1040" stroke="#2f5a3a" stroke-width="10"/>
    <rect x="760" y="450" width="40" height="44" fill="#ffd27a"/><rect x="900" y="450" width="40" height="44" fill="#ffd27a"/><rect x="830" y="490" width="44" height="80" fill="#5a4636"/>
    ${blossomCloud(rnd, 600, 470, 120, 70, 20, ["#f4efe6","#e8dfe8"])}${blossomCloud(rnd, 1130, 470, 120, 70, 20, ["#f4efe6","#e8dfe8"])}
    <path d="M820 900 Q860 700 870 570" stroke="#a88a6a" stroke-width="40" fill="none" opacity=".6"/></g>
    <g class="svg-figure">${buggy(1180, 690, .7)}</g><rect width="1600" height="900" filter="url(#paper5)"/></svg>`;
}
function ladyFig(x, y, s, dress, hair, opt){
  opt = opt || {};
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="150" rx="${opt.wide ? 78 : 58}" ry="11" fill="#3d2a1c" opacity=".18"/>
    <path d="M-${opt.wide ? 52 : 38} 28 Q0 10 ${opt.wide ? 52 : 38} 28 L${opt.wide ? 80 : 58} 150 Q0 164 -${opt.wide ? 80 : 58} 150 Z" fill="${dress}"/>
    <rect x="-5" y="6" width="10" height="14" fill="#efcdb0"/><circle cx="0" cy="-6" r="24" fill="#f1d3b8"/>
    <path d="M-26 -8 Q-24 -38 0 -38 Q24 -38 26 -8 Q18 -26 0 -24 Q-18 -26 -26 -8Z" fill="${hair}"/>
    ${opt.bun ? `<circle cx="0" cy="-36" r="11" fill="${hair}"/>` : ""}${opt.bonnet ? `<path d="M-32 -14 Q0 -60 32 -14 Q0 -28 -32 -14Z" fill="#5b4a6e"/>` : ""}
    <circle cx="-8" cy="-5" r="2.3" fill="#4b3626"/><circle cx="8" cy="-5" r="2.3" fill="#4b3626"/><path d="M-6 8 Q0 ${opt.smile ? 13 : 6} 6 8" stroke="#9a4c3c" stroke-width="2" fill="none"/></g>`;
}
function svgKitchen(){
  const rnd = mulberry(52); let blos = blossomCloud(rnd, 1250, 250, 170, 70, 18, ["#fdf2f2","#ffffff","#e9f2dc"]);
  return SVG_OPEN + DEFS(6) + `<rect width="1600" height="900" fill="#f1e1c4"/><g filter="url(#wc6)">
    <rect width="1600" height="640" fill="#efdcbc"/><path d="M0 110 H1600" stroke="#d2b78e" stroke-width="12"/>
    <rect x="1040" y="140" width="420" height="300" fill="#f6c99c"/><rect x="1040" y="320" width="420" height="120" fill="#a6c48f"/>${blos}
    <rect x="1030" y="130" width="440" height="320" fill="none" stroke="#8c6a4b" stroke-width="20"/><path d="M1250 130 V450 M1030 290 H1470" stroke="#8c6a4b" stroke-width="10"/>
    <path d="M1460 450 L1600 900 L1150 900 L1040 450Z" fill="#ffdcaa" opacity=".22"/>
    <rect x="0" y="640" width="1600" height="260" fill="#b88c62"/><g stroke="#9c7350" stroke-width="4" opacity=".55"><path d="M0 700 H1600 M0 770 H1600 M0 840 H1600"/></g>
    <rect x="90" y="300" width="200" height="340" fill="#4a3c34"/><rect x="110" y="250" width="160" height="60" fill="#3b302a"/><rect x="150" y="120" width="40" height="130" fill="#3b302a"/>
    <g fill="#b9b2a6"><circle cx="420" cy="200" r="28"/><circle cx="500" cy="200" r="22"/><circle cx="570" cy="200" r="26"/></g><path d="M380 230 H620" stroke="#8c6a4b" stroke-width="8"/>
    <rect x="560" y="480" width="440" height="22" fill="#8b6345"/><rect x="580" y="502" width="16" height="140" fill="#755238"/><rect x="964" y="502" width="16" height="140" fill="#755238"/>
    <path d="M550 476 H1010 L990 540 H570Z" fill="#f4ede0"/><path d="M590 476 V540 M650 476 V540 M710 476 V540 M770 476 V540 M830 476 V540 M890 476 V540 M950 476 V540" stroke="#d98a7e" stroke-width="5" opacity=".5"/>
    <circle cx="700" cy="460" r="18" fill="#e9eef2"/><rect x="820" y="430" width="36" height="46" rx="8" fill="#c99a6a"/></g>
    <g class="svg-figure">${ladyFig(1140, 520, 1.25, "#7f5f99", "#6b5a52", {wide:true, bonnet:true})}${girlFig(420, 560, 1.15, true)}</g>
    <rect width="1600" height="900" filter="url(#paper6)"/></svg>`;
}
function svgRoom(){
  const rnd = mulberry(61);
  return SVG_OPEN + DEFS(7) + `<rect width="1600" height="900" fill="#e8dcc8"/><g filter="url(#wc7)">
    <path d="M0 0 L520 0 L0 420Z" fill="#cbb999"/><path d="M1600 0 L1080 0 L1600 420Z" fill="#cbb999"/>
    <rect x="600" y="150" width="400" height="330" fill="#f2bf96"/><rect x="600" y="360" width="400" height="120" fill="#9fbf8c"/>
    ${blossomCloud(rnd, 820, 330, 150, 60, 16, ["#ffffff","#fbeef0","#e6efd8"])}
    <rect x="590" y="140" width="420" height="350" fill="none" stroke="#8c6a4b" stroke-width="18"/><path d="M800 140 V490" stroke="#8c6a4b" stroke-width="10"/>
    <path d="M560 130 Q620 300 570 500" fill="#f3f1ec" opacity=".85"/><path d="M1040 130 Q980 300 1030 500" fill="#f3f1ec" opacity=".85"/>
    <path d="M1000 490 L1300 900 L760 900 L600 490Z" fill="#ffd9a6" opacity=".18"/>
    <rect x="0" y="640" width="1600" height="260" fill="#a9845f"/>
    <rect x="80" y="470" width="420" height="200" fill="#f6f3ec"/><rect x="70" y="420" width="40" height="260" fill="#7a5a40"/><rect x="480" y="470" width="30" height="210" fill="#7a5a40"/>
    <rect x="100" y="440" width="120" height="50" rx="14" fill="#fffdf8"/>
    <rect x="1080" y="470" width="110" height="20" fill="#e2b33f"/><rect x="1090" y="380" width="14" height="100" fill="#e2b33f"/><rect x="1170" y="380" width="14" height="100" fill="#e2b33f"/><rect x="1090" y="380" width="94" height="14" fill="#e2b33f"/><rect x="1090" y="490" width="12" height="150" fill="#c99a2e"/><rect x="1176" y="490" width="12" height="150" fill="#c99a2e"/>
    <rect x="1320" y="430" width="160" height="210" fill="#8c6a4b"/><ellipse cx="1400" cy="420" rx="60" ry="18" fill="#e9eef2"/></g>
    <g class="svg-figure">${girlFig(1135, 380, 1, true)}</g>
    <rect width="1600" height="900" filter="url(#paper7)"/></svg>`;
}
function svgLane(){
  const rnd = mulberry(73); let ferns = "";
  for(let i=0;i<26;i++){ const x = rnd()*1600, y = 720 + rnd()*170; ferns += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q-30 -40 -60 -50 M${x.toFixed(0)} ${y.toFixed(0)} q20 -50 50 -60" stroke="#4f7a45" stroke-width="7" fill="none" stroke-linecap="round"/>`; }
  return SVG_OPEN + DEFS(8) + `<linearGradient id="sk8" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a8fc0"/><stop offset=".45" stop-color="#f5ad85"/><stop offset=".75" stop-color="#fcd9a2"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk8)"/><g filter="url(#wc8)">
    <path d="M0 520 Q400 440 800 500 T1600 470 L1600 700 L0 700Z" fill="#7e9d6f"/>
    ${blossomCloud(rnd, 260, 430, 230, 90, 30, ["#ffffff","#fbeef0","#dfe9cf"])}${blossomCloud(rnd, 1360, 410, 230, 90, 30, ["#ffffff","#fbeef0","#dfe9cf"])}
    <path d="M200 430 V560 M330 440 V560 M1300 420 V560 M1440 430 V560" stroke="#6b4d3a" stroke-width="16"/>
    <path d="M0 640 L1600 620 L1600 900 L0 900Z" fill="#6e8f58"/><path d="M700 900 Q760 700 800 560 Q840 700 900 900Z" fill="#c4704f"/>
    <path d="M0 610 H1600" stroke="#9a7a5a" stroke-width="6"/><g stroke="#9a7a5a" stroke-width="6">${Array.from({length:16},(_,i)=>`<path d="M${i*100+20} 580 V640"/>`).join("")}</g>
    ${ferns}<path d="M1180 360 L1180 300 L1250 260 L1320 300 L1320 360Z" fill="#d9cdb8" opacity=".8"/></g>
    <g class="svg-figure">${ladyFig(760, 560, .8, "#4d4a5a", "#5a4a40", {bun:true})}${girlFig(850, 600, .78, true)}</g>
    <rect width="1600" height="900" filter="url(#paper8)"/></svg>`;
}
function svgLyndeRoom(){
  return SVG_OPEN + DEFS(9) + `<radialGradient id="lamp9" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff2c0"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient>
    <rect width="1600" height="900" fill="#e6d3b4"/><g filter="url(#wc9)">
    <rect width="1600" height="620" fill="#dcc6a2"/><g stroke="#c9ad83" stroke-width="3" opacity=".6">${Array.from({length:20},(_,i)=>`<path d="M${i*80} 0 V620"/>`).join("")}</g>
    <rect x="980" y="130" width="420" height="300" fill="#a37fae"/><rect x="980" y="310" width="420" height="120" fill="#6f8a63"/><circle cx="1290" cy="200" r="22" fill="#fff3c8"/>
    <rect x="970" y="120" width="440" height="320" fill="none" stroke="#7a5a40" stroke-width="18"/><path d="M1190 120 V440" stroke="#7a5a40" stroke-width="10"/>
    <rect x="0" y="620" width="1600" height="280" fill="#a7805c"/><ellipse cx="800" cy="760" rx="380" ry="70" fill="#8c4f45" opacity=".55"/>
    <rect x="340" y="380" width="70" height="120" rx="20" fill="#e4c27c"/><path d="M350 380 Q375 300 400 380" fill="#fbe9b8"/><circle cx="375" cy="360" r="160" fill="url(#lamp9)"/>
    <rect x="250" y="500" width="250" height="20" fill="#7a5a40"/><rect x="270" y="520" width="14" height="120" fill="#6a4a32"/><rect x="466" y="520" width="14" height="120" fill="#6a4a32"/>
    <path d="M880 400 Q930 380 980 400 L990 640 L870 640Z" fill="#7b5a3f"/></g>
    <g class="svg-figure">${ladyFig(930, 470, 1.15, "#7f5f99", "#6b5a52", {wide:true, bonnet:true, smile:true})}
      <path d="M890 560 l60 -40 M905 570 l60 -46" stroke="#c9c2b6" stroke-width="5"/><circle cx="930" cy="560" r="18" fill="#c95a5a"/>${girlFig(560, 600, 1.05, true)}</g>
    <rect width="1600" height="900" filter="url(#paper9)"/></svg>`;
}
function svgNightLane(){
  const rnd = mulberry(83); let st = "", ferns = "";
  for(let i=0;i<50;i++) st += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(rnd()*380).toFixed(0)}" r="${(1+rnd()*1.6).toFixed(1)}" fill="#fff" opacity="${(.35+rnd()*.5).toFixed(2)}"/>`;
  for(let i=0;i<30;i++){ const x = rnd()*1600, y = 740 + rnd()*160; ferns += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q-30 -40 -60 -48 M${x.toFixed(0)} ${y.toFixed(0)} q22 -48 52 -58" stroke="#2f4a35" stroke-width="7" fill="none" stroke-linecap="round"/>`; }
  return SVG_OPEN + DEFS(10) + `<linearGradient id="sk10" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16203f"/><stop offset=".6" stop-color="#3d4677"/><stop offset=".9" stop-color="#6b5c7d"/></linearGradient>
    <radialGradient id="st10"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="#eaf3ff"/><stop offset="1" stop-color="#eaf3ff" stop-opacity="0"/></radialGradient>
    <rect width="1600" height="900" fill="url(#sk10)"/>${st}<circle cx="1180" cy="190" r="60" fill="url(#st10)"/><circle cx="1180" cy="190" r="8" fill="#fff"/>
    <g filter="url(#wc10)"><path d="M700 470 Q1180 330 1600 430 L1600 620 L700 620Z" fill="#1f2b2a"/>
    <path d="M0 520 Q400 460 800 520 T1600 520 L1600 900 L0 900Z" fill="#26372d"/>
    ${Array.from({length:9},(_,i)=>`<ellipse cx="${200+i*150}" cy="${470-(i%3)*20}" rx="40" ry="${110+(i%2)*30}" fill="#1c2a24"/>`).join("")}
    <rect x="1010" y="455" width="26" height="20" fill="#ffd27a"/><circle cx="1023" cy="465" r="40" fill="#ffd27a" opacity=".25"/>
    <path d="M700 900 Q760 720 820 600 Q880 720 940 900Z" fill="#5b4a3e"/>${ferns}</g>
    <g class="svg-figure">${ladyFig(780, 620, .75, "#3f3c4c", "#4a3e36", {bun:true})}${girlFig(850, 655, .7, true)}</g>
    <rect width="1600" height="900" filter="url(#paper10)"/></svg>`;
}
function svgParlor(){
  return SVG_OPEN + DEFS(11) + `<rect width="1600" height="900" fill="#e8d7bb"/><g filter="url(#wc11)">
    <rect width="1600" height="640" fill="#d9c2a0"/><g stroke="#c6a984" stroke-width="3" opacity=".5">${Array.from({length:14},(_,i)=>`<path d="M${i*120+40} 0 q20 40 0 80 q-20 40 0 80 q20 40 0 80 q-20 40 0 80 q20 40 0 80 q-20 40 0 80"/>`).join("")}</g>
    <rect x="1040" y="140" width="360" height="320" fill="#b7cfa0"/><rect x="1040" y="330" width="360" height="130" fill="#7f9c68"/><rect x="1030" y="130" width="380" height="340" fill="none" stroke="#7a5a40" stroke-width="18"/><path d="M1220 130 V470" stroke="#7a5a40" stroke-width="10"/>
    <path d="M1010 120 Q1060 300 1020 480 L990 480 L990 120Z" fill="#c9858a"/><path d="M1430 120 Q1380 300 1420 480 L1450 480 L1450 120Z" fill="#c9858a"/>
    <rect x="0" y="640" width="1600" height="260" fill="#9c7552"/><ellipse cx="760" cy="780" rx="420" ry="70" fill="#7f4f5a" opacity=".5"/>
    <rect x="240" y="470" width="520" height="150" rx="30" fill="#8d5a5f"/><rect x="220" y="420" width="560" height="90" rx="40" fill="#a06a6f"/><rect x="230" y="600" width="20" height="60" fill="#5a3a28"/><rect x="750" y="600" width="20" height="60" fill="#5a3a28"/>
    <rect x="430" y="500" width="90" height="16" rx="3" fill="#6b4a8a" transform="rotate(-8 475 508)"/>
    <rect x="120" y="180" width="160" height="200" fill="#efe2c8" stroke="#7a5a40" stroke-width="10"/><circle cx="200" cy="270" r="50" fill="#d9a7a0" opacity=".7"/></g>
    <rect width="1600" height="900" filter="url(#paper11)"/></svg>`;
}
function svgFirPath(){
  const rnd = mulberry(91); let firs = "";
  for(let i=0;i<14;i++){ const x = 60 + i*115 + rnd()*40, h = 260 + rnd()*160, y = 560 - (i>5 && i<10 ? 60 : 0); firs += `<path d="M${x.toFixed(0)} ${(y-h).toFixed(0)} L${(x-70).toFixed(0)} ${y} L${(x+70).toFixed(0)} ${y}Z" fill="${["#3f6a4a","#355e42","#4b7652"][i%3]}"/>`; }
  return SVG_OPEN + DEFS(12) + `<linearGradient id="sk12" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd6e8"/><stop offset=".7" stop-color="#f4e6c6"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk12)"/><g filter="url(#wc12)">
    <path d="M0 600 Q500 470 900 520 T1600 500 L1600 900 L0 900Z" fill="#7da068"/>${firs}
    <path d="M0 720 Q400 690 800 730 T1600 710 L1600 780 Q1200 800 800 790 T0 790Z" fill="#8fbfd6"/>
    <rect x="620" y="700" width="330" height="26" rx="10" fill="#8a6446"/><rect x="620" y="726" width="330" height="10" fill="#6b4a32"/>
    <path d="M760 900 Q800 800 790 740 L830 740 Q860 820 900 900Z" fill="#c4704f"/><path d="M780 700 Q820 620 880 560" stroke="#c4704f" stroke-width="40" fill="none" stroke-linecap="round"/></g>
    <rect width="1600" height="900" filter="url(#paper12)"/></svg>`;
}
function svgGarden(){
  const rnd = mulberry(97); let fl = "";
  const cols = ["#e8742f","#f2a33a","#d9475a","#ffffff","#f2c6d4","#9b7fd1","#fff2a8"];
  for(let i=0;i<140;i++){ const x = rnd()*1600, y = 600 + rnd()*300; fl += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(8+rnd()*14).toFixed(0)}" fill="${cols[i%cols.length]}" opacity="${(.7+rnd()*.3).toFixed(2)}"/>`; }
  return SVG_OPEN + DEFS(13) + `<linearGradient id="sk13" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fa6d0"/><stop offset=".45" stop-color="#f7b58a"/><stop offset=".8" stop-color="#fde0a8"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk13)"/><g filter="url(#wc13)">
    ${Array.from({length:7},(_,i)=>`<path d="M${i*90} 560 L${i*90+50} ${170+(i%3)*40} L${i*90+100} 560Z" fill="#2f4d3a"/>`).join("")}
    <ellipse cx="1360" cy="380" rx="220" ry="200" fill="#6f8f5a"/><path d="M1360 380 V600" stroke="#5a4232" stroke-width="30"/>
    <rect x="0" y="560" width="1600" height="340" fill="#6e8f58"/>
    <path d="M760 900 L800 600 L840 600 L900 900Z" fill="#b8664a"/><path d="M760 900 L800 600 M900 900 L840 600" stroke="#f3eadb" stroke-width="10" stroke-dasharray="4 14"/>
    ${fl}</g>
    <rect width="1600" height="900" filter="url(#paper13)"/></svg>`;
}
function svgBridge(){
  const rnd = mulberry(101); let ferns = "";
  for(let i=0;i<24;i++){ const x = rnd()*1600, y = 760 + rnd()*140; ferns += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q-30 -40 -60 -50 M${x.toFixed(0)} ${y.toFixed(0)} q20 -50 50 -60" stroke="#3f6a40" stroke-width="7" fill="none" stroke-linecap="round"/>`; }
  return SVG_OPEN + DEFS(14) + `<linearGradient id="sk14" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b8fc4"/><stop offset=".5" stop-color="#f3a98a"/><stop offset=".8" stop-color="#fbd7a6"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk14)"/><g filter="url(#wc14)">
    ${Array.from({length:12},(_,i)=>`<path d="M${i*140} 600 L${i*140+60} ${300+(i%4)*40} L${i*140+120} 600Z" fill="#33503d"/>`).join("")}
    <rect x="0" y="560" width="1600" height="340" fill="#678a55"/>
    <path d="M0 690 Q500 650 900 700 T1600 680 L1600 790 Q1100 820 700 800 T0 800Z" fill="#9fb9d6"/>
    <path d="M300 640 Q800 600 1300 640" stroke="#7a5638" stroke-width="34" fill="none"/><path d="M300 662 Q800 622 1300 662" stroke="#5a3f2a" stroke-width="10" fill="none"/>
    <ellipse cx="1080" cy="780" rx="110" ry="34" fill="#cfe5f0"/><ellipse cx="1080" cy="780" rx="130" ry="44" fill="none" stroke="#b2614a" stroke-width="12"/>${ferns}</g>
    <rect width="1600" height="900" filter="url(#paper14)"/></svg>`;
}
function svgClass(){
  return SVG_OPEN + DEFS(15) + `<rect width="1600" height="900" fill="#e9dcc4"/><g filter="url(#wc15)">
    <rect width="1600" height="600" fill="#efe6d4"/><rect x="420" y="90" width="760" height="300" fill="#2f4a3f"/><rect x="410" y="80" width="780" height="320" fill="none" stroke="#7a5a40" stroke-width="16"/>
    <path d="M470 150 h300 M470 200 h420 M470 250 h260" stroke="#e8efe6" stroke-width="6" opacity=".6"/>
    <rect x="1260" y="120" width="260" height="300" fill="#a9c9e2"/><rect x="1260" y="300" width="260" height="120" fill="#86b08a"/><rect x="1250" y="110" width="280" height="320" fill="none" stroke="#7a5a40" stroke-width="16"/><path d="M1390 110 V430 M1250 270 H1530" stroke="#7a5a40" stroke-width="8"/>
    <rect x="0" y="600" width="1600" height="300" fill="#a7805c"/><rect x="380" y="390" width="840" height="60" fill="#8a6446"/>
    ${Array.from({length:6},(_,i)=>`<rect x="${120+i*240}" y="${640+(i%2)*40}" width="200" height="70" rx="6" fill="#7a5a40"/><rect x="${130+i*240}" y="${710+(i%2)*40}" width="14" height="80" fill="#5a3a28"/><rect x="${306+i*240}" y="${710+(i%2)*40}" width="14" height="80" fill="#5a3a28"/>`).join("")}</g>
    <rect width="1600" height="900" filter="url(#paper15)"/></svg>`;
}
function svgBirch(){
  const rnd = mulberry(107); let tr = "";
  for(let i=0;i<16;i++){ const x = (i<8 ? 40+i*70 : 1000+(i-8)*75) + rnd()*30; tr += `<rect x="${x.toFixed(0)}" y="${(60+rnd()*80).toFixed(0)}" width="${(16+rnd()*10).toFixed(0)}" height="760" fill="#f4f1ea"/><path d="M${x.toFixed(0)} ${(300+rnd()*200).toFixed(0)} h18 M${x.toFixed(0)} ${(500+rnd()*200).toFixed(0)} h14" stroke="#3a3a3a" stroke-width="5"/>`; }
  return SVG_OPEN + DEFS(16) + `<rect width="1600" height="900" fill="#dcebc3"/><g filter="url(#wc16)">
    ${blossomCloud(rnd, 300, 180, 380, 160, 40, ["#b9d68a","#cfe39b","#9fc477"])}${blossomCloud(rnd, 1300, 170, 380, 160, 40, ["#b9d68a","#cfe39b","#9fc477"])}
    ${tr}<path d="M560 900 Q760 650 780 420 Q800 650 1060 900Z" fill="#c9875e"/><path d="M0 760 Q300 700 560 900 L0 900Z M1600 760 Q1300 700 1060 900 L1600 900Z" fill="#7da068"/></g>
    <rect width="1600" height="900" filter="url(#paper16)"/></svg>`;
}
function svgSpruce(){
  const rnd = mulberry(109); let tr = "", fern = "";
  for(let i=0;i<18;i++){ const x = rnd()*1600, h = 420+rnd()*300; tr += `<path d="M${x.toFixed(0)} ${(700-h).toFixed(0)} L${(x-90).toFixed(0)} 700 L${(x+90).toFixed(0)} 700Z" fill="${["#2f5a3f","#3a6a48","#28503a"][i%3]}"/>`; }
  for(let i=0;i<40;i++){ const x = rnd()*1600, y = 700 + rnd()*200; fern += `<path d="M${x.toFixed(0)} ${y.toFixed(0)} q-40 -50 -80 -60 M${x.toFixed(0)} ${y.toFixed(0)} q30 -60 70 -70" stroke="#5d8a4a" stroke-width="9" fill="none" stroke-linecap="round"/>`; }
  return SVG_OPEN + DEFS(17) + `<rect width="1600" height="900" fill="#cfe0c0"/><g filter="url(#wc17)">${tr}<rect y="700" width="1600" height="200" fill="#6f8f4f"/>${fern}
    ${Array.from({length:7},()=>`<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(760+rnd()*120).toFixed(0)}" r="9" fill="#ffffff"/>`).join("")}</g>
    <rect width="1600" height="900" filter="url(#paper17)"/></svg>`;
}
function svgSchoolYard(){
  return SVG_OPEN + DEFS(18) + `<linearGradient id="sk18" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8b8d8"/><stop offset=".6" stop-color="#f6c99a"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk18)"/><g filter="url(#wc18)">
    ${Array.from({length:10},(_,i)=>`<path d="M${i*170} 560 L${i*170+70} ${260+(i%3)*40} L${i*170+140} 560Z" fill="#2f4d3a"/>`).join("")}
    <rect x="520" y="300" width="620" height="300" fill="#f6f2ea"/><path d="M490 310 L830 160 L1170 310Z" fill="#7d6a5a"/>
    <rect x="780" y="440" width="100" height="160" fill="#7a5a40"/><rect x="580" y="380" width="120" height="120" fill="#9fc0dc"/><rect x="960" y="380" width="120" height="120" fill="#9fc0dc"/>
    <rect y="560" width="1600" height="340" fill="#86a865"/><path d="M700 900 Q780 700 830 600 Q880 700 960 900Z" fill="#c4704f"/></g>
    <rect width="1600" height="900" filter="url(#paper18)"/></svg>`;
}
function svgTeaRoom(){
  return SVG_OPEN + DEFS(19) + `<rect width="1600" height="900" fill="#ead8bc"/><g filter="url(#wc19)">
    <rect width="1600" height="620" fill="#e6cfa8"/><rect x="1080" y="120" width="340" height="320" fill="#e9a35a"/><rect x="1080" y="300" width="340" height="140" fill="#b9682f"/><rect x="1070" y="110" width="360" height="340" fill="none" stroke="#7a5a40" stroke-width="16"/>
    <rect x="160" y="140" width="220" height="420" fill="#8a6446"/><rect x="180" y="170" width="180" height="120" fill="#c9b08a"/><rect x="180" y="310" width="180" height="120" fill="#c9b08a"/><rect x="200" y="190" width="40" height="70" fill="#c0392b"/>
    <rect x="0" y="620" width="1600" height="280" fill="#a37852"/><ellipse cx="800" cy="640" rx="330" ry="60" fill="#f4ecdc"/><rect x="520" y="640" width="560" height="140" fill="#f4ecdc"/>
    <rect x="740" y="560" width="40" height="80" rx="8" fill="#9b1f2a"/><rect x="820" y="590" width="44" height="50" rx="6" fill="#d9e4ea" opacity=".8"/><circle cx="660" cy="620" r="26" fill="#7a5038"/><circle cx="940" cy="620" r="30" fill="#c9774a"/>
    <path d="M1180 470 q-40 -80 20 -150 q60 70 20 150z" fill="#c83a2a"/><rect x="1170" y="460" width="60" height="60" rx="10" fill="#4a6fa8"/></g>
    <rect width="1600" height="900" filter="url(#paper19)"/></svg>`;
}
function svgOrchard(){
  const rnd = mulberry(113); let ap = "";
  for(let i=0;i<60;i++) ap += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(120+rnd()*360).toFixed(0)}" r="12" fill="${["#c0392b","#d9532e","#e0a020"][i%3]}"/>`;
  return SVG_OPEN + DEFS(20) + `<linearGradient id="sk20" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bcd2e6"/><stop offset=".7" stop-color="#f6dfb0"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk20)"/><g filter="url(#wc20)">
    ${blossomCloud(rnd, 300, 260, 340, 180, 36, ["#7f9a4a","#a6a83e","#c98a3a"])}${blossomCloud(rnd, 1280, 240, 360, 190, 36, ["#7f9a4a","#c96a2e","#a6a83e"])}
    <path d="M260 340 V640 M1300 330 V640" stroke="#6b4a32" stroke-width="34"/>${ap}
    <rect y="600" width="1600" height="300" fill="#8aa45a"/><ellipse cx="800" cy="760" rx="380" ry="90" fill="#9fbb6a"/>
    ${Array.from({length:12},()=>`<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(640+rnd()*240).toFixed(0)}" r="11" fill="#c0392b"/>`).join("")}</g>
    <rect width="1600" height="900" filter="url(#paper20)"/></svg>`;
}
function svgDuskDoor(){
  const rnd = mulberry(127); let st = "";
  for(let i=0;i<30;i++) st += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(rnd()*300).toFixed(0)}" r="1.5" fill="#fff" opacity=".6"/>`;
  return SVG_OPEN + DEFS(21) + `<linearGradient id="sk21" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3058"/><stop offset=".6" stop-color="#6d5a7d"/><stop offset=".9" stop-color="#c78c78"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk21)"/>${st}<circle cx="300" cy="230" r="34" fill="#f2ecd6"/><g filter="url(#wc21)">
    ${Array.from({length:9},(_,i)=>`<path d="M${i*180} 600 L${i*180+80} ${280+(i%3)*50} L${i*180+160} 600Z" fill="#1f2d2a"/>`).join("")}
    <rect x="760" y="260" width="620" height="380" fill="#8c8478"/><path d="M730 270 L1070 120 L1410 270Z" fill="#4a3d36"/>
    <rect x="1000" y="430" width="110" height="210" fill="#5a3a28"/><rect x="1010" y="440" width="90" height="190" fill="#f2c066" opacity=".55"/><rect x="840" y="340" width="110" height="100" fill="#f2c066" opacity=".7"/>
    <rect y="620" width="1600" height="280" fill="#3a4a38"/><path d="M600 900 Q760 760 1000 640 L1100 640 Q900 780 820 900Z" fill="#6b5a4a"/></g>
    <rect width="1600" height="900" filter="url(#paper21)"/></svg>`;
}
function svgWinterKitchen(){
  return SVG_OPEN + DEFS(22) + `<rect width="1600" height="900" fill="#e4d2b4"/><g filter="url(#wc22)">
    <rect width="1600" height="620" fill="#dcc6a2"/><rect x="1060" y="130" width="360" height="300" fill="#2c3a5e"/><rect x="1060" y="130" width="360" height="300" fill="#e8f0ff" opacity=".35"/>
    ${Array.from({length:14},(_,i)=>`<path d="M${1080+i*25} 150 l10 30 l-10 30" stroke="#ffffff" stroke-width="3" fill="none" opacity=".7"/>`).join("")}<rect x="1050" y="120" width="380" height="320" fill="none" stroke="#7a5a40" stroke-width="16"/><path d="M1240 120 V440 M1050 280 H1430" stroke="#7a5a40" stroke-width="8"/>
    <rect x="180" y="300" width="300" height="320" rx="10" fill="#2e2a28"/><rect x="230" y="150" width="40" height="160" fill="#3a3330"/><rect x="230" y="440" width="200" height="90" rx="10" fill="#e8702a" opacity=".8"/><circle cx="330" cy="480" r="140" fill="#ffb060" opacity=".18"/>
    <rect x="0" y="620" width="1600" height="280" fill="#a37852"/><rect x="620" y="540" width="420" height="30" fill="#8a6446"/><rect x="640" y="570" width="20" height="120" fill="#6b4a32"/><rect x="1000" y="570" width="20" height="120" fill="#6b4a32"/>
    <path d="M700 520 l20 -40 h40 l20 40z" fill="#f2c066"/><circle cx="740" cy="460" r="50" fill="#fff2c0" opacity=".35"/></g>
    <rect width="1600" height="900" filter="url(#paper22)"/></svg>`;
}
function svgSnowField(){
  const rnd = mulberry(131); let st = "", fir = "";
  for(let i=0;i<60;i++) st += `<circle cx="${(rnd()*1600).toFixed(0)}" cy="${(rnd()*420).toFixed(0)}" r="${(1+rnd()*1.8).toFixed(1)}" fill="#fff" opacity="${(.4+rnd()*.5).toFixed(2)}"/>`;
  for(let i=0;i<10;i++){ const x = rnd()*1600, h = 120+rnd()*140, y = 520+rnd()*60; fir += `<path d="M${x.toFixed(0)} ${(y-h).toFixed(0)} L${(x-50).toFixed(0)} ${y.toFixed(0)} L${(x+50).toFixed(0)} ${y.toFixed(0)}Z" fill="#1d2b33"/><path d="M${x.toFixed(0)} ${(y-h).toFixed(0)} l-20 40 h40z" fill="#eef4ff"/>`; }
  return SVG_OPEN + DEFS(23) + `<linearGradient id="sk23" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0f1834"/><stop offset=".7" stop-color="#2c3a6a"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk23)"/>${st}<circle cx="1240" cy="160" r="46" fill="#f4f1e2"/><g filter="url(#wc23)">
    <path d="M0 560 Q500 500 900 540 T1600 520 L1600 900 L0 900Z" fill="#dfe8f4"/><path d="M0 700 Q600 660 1600 720 L1600 900 L0 900Z" fill="#c9d6ea"/>${fir}
    <path d="M300 900 Q600 760 900 640" stroke="#b4c4dc" stroke-width="18" fill="none" stroke-dasharray="2 22"/></g>
    <rect width="1600" height="900" filter="url(#paper23)"/></svg>`;
}
function svgBarryKitchen(){
  return SVG_OPEN + DEFS(24) + `<rect width="1600" height="900" fill="#d9c3a0"/><g filter="url(#wc24)">
    <rect width="1600" height="620" fill="#cdb48c"/><rect x="1120" y="140" width="300" height="260" fill="#1f2a48"/><rect x="1110" y="130" width="320" height="280" fill="none" stroke="#6b4a32" stroke-width="16"/>
    <rect x="140" y="320" width="260" height="300" rx="10" fill="#2e2a28"/><rect x="190" y="420" width="160" height="80" rx="8" fill="#e8702a" opacity=".85"/><path d="M220 300 q20 -40 60 -20 l20 20z" fill="#7d8890"/><rect x="200" y="290" width="110" height="40" rx="14" fill="#8c979e"/>
    <rect x="0" y="620" width="1600" height="280" fill="#9a724e"/><rect x="620" y="470" width="560" height="120" rx="30" fill="#7a4e5a"/><rect x="600" y="430" width="600" height="70" rx="30" fill="#8e5d69"/>
    <rect x="700" y="470" width="260" height="60" rx="20" fill="#f4ecdc"/><circle cx="740" cy="480" r="26" fill="#f6d9bd"/><circle cx="420" cy="460" r="200" fill="#ffb060" opacity=".14"/></g>
    <rect width="1600" height="900" filter="url(#paper24)"/></svg>`;
}
function svgFrostLane(){
  const rnd = mulberry(137); let tr = "";
  for(let i=0;i<12;i++){ const x = i<6 ? 80+i*90 : 900+(i-6)*110; tr += `<path d="M${x} 900 Q${x+10} 600 ${x-20} 300" stroke="#6b5a4e" stroke-width="22" fill="none"/>`; }
  return SVG_OPEN + DEFS(25) + `<linearGradient id="sk25" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe0f2"/><stop offset=".7" stop-color="#fbe6d8"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk25)"/><g filter="url(#wc25)">${tr}
    ${blossomCloud(rnd, 360, 240, 380, 160, 40, ["#ffffff","#eef4ff","#f4f0f6"])}${blossomCloud(rnd, 1240, 230, 380, 160, 40, ["#ffffff","#eef4ff","#f4f0f6"])}
    <rect y="640" width="1600" height="260" fill="#eef3fa"/><path d="M640 900 Q780 720 800 600 Q820 720 960 900Z" fill="#d8e2ee"/></g>
    <rect width="1600" height="900" filter="url(#paper25)"/></svg>`;
}
function svgTeaTable(){
  const rnd = mulberry(151); let roses = "";
  for(let i=0;i<18;i++){ const x = 260+rnd()*1080, y = 610+rnd()*60; roses += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(10+rnd()*10).toFixed(0)}" fill="${["#e46f7e","#f4a3ae","#fbd2d6"][i%3]}"/><path d="M${(x-24).toFixed(0)} ${(y+10).toFixed(0)} q14 -18 30 -4" stroke="#6f9a58" stroke-width="7" fill="none"/>`; }
  return SVG_OPEN + DEFS(26) + `<rect width="1600" height="900" fill="#f4e4c8"/><g filter="url(#wc26)">
    <rect x="980" y="110" width="420" height="330" rx="10" fill="#cfe6f2"/><rect x="980" y="110" width="420" height="330" rx="10" fill="none" stroke="#a58463" stroke-width="18"/><path d="M1190 110 V440 M980 275 H1400" stroke="#a58463" stroke-width="10"/>
    ${blossomCloud(rnd, 1190, 260, 180, 120, 22, ["#b9d89a","#9cc47e","#f3c6cf"])}
    <rect x="0" y="560" width="1600" height="340" fill="#c9a77f"/><ellipse cx="800" cy="650" rx="660" ry="120" fill="#fbf6ea"/>${roses}
    <path d="M700 600 h200 l-20 -90 h-160z" fill="#f7d79a"/><path d="M700 560 h200" stroke="#c9434e" stroke-width="14"/><path d="M720 525 h160" stroke="#c9434e" stroke-width="12"/>
    <ellipse cx="420" cy="640" rx="70" ry="22" fill="#ffffff"/><ellipse cx="1180" cy="640" rx="70" ry="22" fill="#ffffff"/><path d="M1140 600 q40 -60 80 0z" fill="#9fc0d8"/></g>
    <rect width="1600" height="900" filter="url(#paper26)"/></svg>`;
}
function svgDryadSpring(){
  const rnd = mulberry(157); let firs = "";
  for(let i=0;i<9;i++){ const x = 60+i*190+rnd()*60, h = 360+rnd()*160; firs += `<path d="M${x.toFixed(0)} ${(560-h).toFixed(0)} L${(x-90).toFixed(0)} 580 L${(x+90).toFixed(0)} 580Z" fill="${i%2?"#3f6a52":"#4f7d5c"}"/>`; }
  return SVG_OPEN + DEFS(27) + `<linearGradient id="sk27" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9b9a6"/><stop offset=".55" stop-color="#fbd8a8"/><stop offset="1" stop-color="#f7e8c8"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk27)"/><g filter="url(#wc27)">${firs}
    <rect y="570" width="1600" height="330" fill="#88a96c"/><ellipse cx="820" cy="720" rx="330" ry="90" fill="#9fc8d6"/><ellipse cx="820" cy="712" rx="250" ry="56" fill="#c8e4ea"/>
    <path d="M640 700 q180 -120 360 0" stroke="#f08a8a" stroke-width="7" fill="none" opacity=".8"/><path d="M650 706 q170 -110 340 0" stroke="#f6d36a" stroke-width="7" fill="none" opacity=".8"/><path d="M660 712 q160 -100 320 0" stroke="#8fc6e6" stroke-width="7" fill="none" opacity=".8"/>
    <ellipse cx="1170" cy="760" rx="120" ry="48" fill="#b0584a"/><path d="M380 900 Q400 700 300 560" stroke="#7b9a5e" stroke-width="10" fill="none"/></g>
    <rect width="1600" height="900" filter="url(#paper27)"/></svg>`;
}
function svgAnneGarden(){
  const rnd = mulberry(163);
  return SVG_OPEN + DEFS(28) + `<linearGradient id="sk28" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a9c6e8"/><stop offset=".6" stop-color="#fbe2c6"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk28)"/><g filter="url(#wc28)">
    <rect x="180" y="200" width="520" height="380" fill="#f3efe4"/><path d="M150 210 L440 60 L730 210Z" fill="#5f9a6a"/><rect x="380" y="400" width="100" height="180" fill="#7d5a40"/><rect x="230" y="270" width="100" height="90" fill="#cfe2ee"/><rect x="540" y="270" width="100" height="90" fill="#cfe2ee"/>
    <rect y="580" width="1600" height="320" fill="#97b878"/>
    ${blossomCloud(rnd, 1000, 680, 420, 90, 46, ["#e46f7e","#f6c25a","#ffffff","#b893d6","#f4a3ae"])}${blossomCloud(rnd, 300, 760, 260, 60, 26, ["#f6c25a","#e46f7e","#ffffff"])}
    ${blossomCloud(rnd, 1300, 300, 220, 200, 30, ["#7ea862","#94bb72","#6b9654"])}</g>
    <rect width="1600" height="900" filter="url(#paper28)"/></svg>`;
}
function svgSpringLane(){
  const rnd = mulberry(171); let firs = "";
  for(let i=0;i<7;i++){ const x = 900+i*110+rnd()*40; firs += `<path d="M${x.toFixed(0)} ${(200+rnd()*80).toFixed(0)} L${(x-70).toFixed(0)} 560 L${(x+70).toFixed(0)} 560Z" fill="#4f7d5c"/>`; }
  return SVG_OPEN + DEFS(29) + `<linearGradient id="sk29" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9a6d6"/><stop offset=".5" stop-color="#f4c0b0"/><stop offset=".8" stop-color="#fde2bf"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk29)"/><g filter="url(#wc29)">
    <path d="M0 560 Q400 500 800 540 T1600 520 V900 H0Z" fill="#b5674e"/><path d="M0 640 Q500 600 1600 650 V900 H0Z" fill="#a9c08a"/>
    ${firs}<rect x="1020" y="330" width="300" height="230" fill="#f3efe4"/><path d="M1000 340 L1170 230 L1340 340Z" fill="#5f9a6a"/><rect x="1060" y="390" width="60" height="55" fill="#ffd98a"/><rect x="1220" y="390" width="60" height="55" fill="#ffd98a"/>
    ${blossomCloud(rnd, 320, 460, 220, 90, 26, ["#c9435a","#d9705e","#e2a07a"])}
    <path d="M520 900 Q700 760 1000 620" stroke="#c9b28c" stroke-width="70" fill="none"/></g>
    <rect width="1600" height="900" filter="url(#paper29)"/></svg>`;
}
function svgBackPorch(){
  const rnd = mulberry(173);
  return SVG_OPEN + DEFS(30) + `<rect width="1600" height="900" fill="#dfeadf"/><g filter="url(#wc30)">
    <rect x="200" y="80" width="760" height="620" fill="#f3efe4"/><rect x="460" y="230" width="220" height="400" fill="#7d5a40"/><circle cx="650" cy="440" r="10" fill="#e3c27a"/>
    <rect x="380" y="630" width="380" height="40" fill="#b79a7a"/><rect x="340" y="670" width="460" height="40" fill="#a68a6b"/><rect x="300" y="710" width="540" height="190" fill="#9a7d60"/>
    <rect x="1000" y="560" width="300" height="190" fill="#8a5a3a"/><path d="M1000 560 L1060 470 H1360 L1300 560Z" fill="#a46e48"/>
    <rect x="1040" y="590" width="40" height="80" fill="#2a2a2a"/><rect x="1100" y="600" width="44" height="70" fill="#5aa0c8"/><rect x="1170" y="590" width="36" height="80" fill="#c9435a"/><rect x="1225" y="610" width="40" height="60" fill="#f2c66b"/>
    ${blossomCloud(rnd, 1350, 260, 260, 200, 30, ["#a9cf8a","#94bb72","#f6f2f4"])}<rect y="750" x="840" width="760" height="150" fill="#9fbf7f"/></g>
    <rect width="1600" height="900" filter="url(#paper30)"/></svg>`;
}
function svgCandleAttic(){
  return SVG_OPEN + DEFS(31) + `<radialGradient id="cg31" cx=".62" cy=".55" r=".55"><stop offset="0" stop-color="#ffd98a" stop-opacity=".85"/><stop offset=".5" stop-color="#b9875a" stop-opacity=".35"/><stop offset="1" stop-color="#2b2238" stop-opacity="0"/></radialGradient>
    <rect width="1600" height="900" fill="#2f2840"/><g filter="url(#wc31)">
    <path d="M0 0 L520 0 L0 380Z" fill="#241e33"/><path d="M1600 0 L1080 0 L1600 380Z" fill="#241e33"/>
    <rect x="640" y="140" width="300" height="240" fill="#36406a"/><path d="M790 140 V380 M640 260 H940" stroke="#5a4636" stroke-width="12"/><circle cx="860" cy="200" r="18" fill="#f4efd6" opacity=".8"/>
    <rect x="120" y="540" width="560" height="200" rx="16" fill="#e8dcc8"/><rect x="120" y="500" width="160" height="80" rx="20" fill="#f6eee0"/><rect x="100" y="720" width="600" height="40" fill="#6b4e3a"/>
    <rect x="1080" y="480" width="200" height="300" fill="#7a5a44"/><rect x="1110" y="300" width="140" height="180" rx="8" fill="#9fb3c6" stroke="#6b4e3a" stroke-width="14"/>
    <rect x="980" y="600" width="80" height="16" fill="#e3c27a"/><rect x="1008" y="540" width="22" height="62" fill="#f6eee0"/><ellipse cx="1019" cy="526" rx="10" ry="18" fill="#ffcf5a"/>
    <rect y="760" width="1600" height="140" fill="#5a4636"/></g><rect width="1600" height="900" fill="url(#cg31)"/>
    <rect width="1600" height="900" filter="url(#paper31)"/></svg>`;
}
function svgBirchPond(){
  const rnd = mulberry(181); let birch = "";
  for(let i=0;i<7;i++){ const x = 120+i*70+rnd()*30; birch += `<path d="M${x.toFixed(0)} 640 Q${(x+12).toFixed(0)} 400 ${(x-6).toFixed(0)} 140" stroke="#f4f0e6" stroke-width="18" fill="none"/><path d="M${x.toFixed(0)} 500 h10 M${(x+4).toFixed(0)} 380 h10" stroke="#3a3a3a" stroke-width="5"/>`; }
  return SVG_OPEN + DEFS(32) + `<linearGradient id="sk32" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9fc8ea"/><stop offset=".6" stop-color="#e6f2e6"/></linearGradient>
    <rect width="1600" height="900" fill="url(#sk32)"/><g filter="url(#wc32)">
    <path d="M0 420 Q500 360 1000 400 T1600 380 V520 H0Z" fill="#6f9a58"/><rect y="500" width="1600" height="400" fill="#7fb2c6"/><path d="M0 520 Q800 560 1600 520" stroke="#cfe6ee" stroke-width="10" fill="none" opacity=".7"/>
    <path d="M0 560 L620 610 Q700 640 620 680 L0 720Z" fill="#7a9a58"/>${birch}${blossomCloud(rnd, 330, 200, 300, 120, 34, ["#a9cf8a","#bfe09a","#94bb72"])}
    <rect x="600" y="630" width="160" height="22" fill="#9a7d60"/><rect x="610" y="650" width="10" height="60" fill="#7d5a40"/><rect x="740" y="650" width="10" height="60" fill="#7d5a40"/>
    <path d="M780 700 h220 l-20 30 h-180z" fill="#7d5a40"/><path d="M800 696 h180" stroke="#2a2a2a" stroke-width="10"/></g>
    <rect width="1600" height="900" filter="url(#paper32)"/></svg>`;
}
function svgDriftFlat(){
  const rnd = mulberry(187); let rip = "";
  for(let i=0;i<14;i++){ const y = 120+i*58, x = rnd()*1400; rip += `<path d="M${x.toFixed(0)} ${y} q60 -10 120 0 t120 0" stroke="#d6eef4" stroke-width="5" fill="none" opacity=".6"/>`; }
  return SVG_OPEN + DEFS(33) + `<rect width="1600" height="900" fill="#6fa6b8"/><g filter="url(#wc33)">${rip}
    ${blossomCloud(rnd, 200, 60, 320, 120, 30, ["#5f8a4c","#7aa860","#94bb72"])}${blossomCloud(rnd, 1450, 100, 260, 160, 26, ["#5f8a4c","#7aa860"])}
    <g transform="rotate(-12 800 520)"><path d="M520 470 H1080 L1040 590 H560Z" fill="#7d5a40"/><path d="M560 480 H1040 L1010 572 H590Z" fill="#1e1e26"/>
    <path d="M640 500 H960 L940 556 H660Z" fill="#e8c95a"/><circle cx="700" cy="528" r="26" fill="#f6d9bd"/><path d="M675 515 q25 -30 50 0" fill="#c8552f"/>
    <path d="M780 528 l50 -40" stroke="#4a6fb0" stroke-width="10"/><circle cx="836" cy="484" r="16" fill="#6e7fd6"/></g></g>
    <rect width="1600" height="900" filter="url(#paper33)"/></svg>`;
}
function svgBridgePiles(){
  const rnd = mulberry(191); let piles = "";
  for(let i=0;i<5;i++){ const x = 140+i*330; piles += `<rect x="${x}" y="230" width="70" height="560" fill="#6b4e3a"/><path d="M${x+70} ${380+i*30} l40 -20" stroke="#6b4e3a" stroke-width="16"/>`; }
  return SVG_OPEN + DEFS(34) + `<rect width="1600" height="900" fill="#2f4a46"/><g filter="url(#wc34)">
    <rect y="0" width="1600" height="240" fill="#8a6a50"/><rect y="200" width="1600" height="40" fill="#5a4636"/>
    <rect y="560" width="1600" height="340" fill="#3f6f6a"/><path d="M0 600 Q800 640 1600 600" stroke="#7fb2b0" stroke-width="8" fill="none" opacity=".6"/>${piles}
    ${blossomCloud(rnd, 800, 720, 700, 80, 20, ["#2c5450","#4a7a72"])}<ellipse cx="800" cy="580" rx="520" ry="30" fill="#c8e4e0" opacity=".25"/></g>
    <rect width="1600" height="900" filter="url(#paper34)"/></svg>`;
}
const SVG_SCENES = {ch1:svgStation, ch1_road:svgRoad, ch1_avenue:svgAvenue, ch1_pond:svgPond, ch1_home:svgHome,
  ch2:svgKitchen, ch2_room:svgRoom, ch2_lane:svgLane, ch2_lynde:svgLyndeRoom, ch2_night:svgNightLane,
  ch3:svgParlor, ch3_path:svgFirPath, ch3_garden:svgGarden, ch3_bridge:svgBridge,
  ch4:svgClass, ch4_birch:svgBirch, ch4_spruce:svgSpruce, ch4_yard:svgSchoolYard,
  ch5:svgTeaRoom, ch5_orchard:svgOrchard, ch5_dusk:svgDuskDoor,
  ch6:svgWinterKitchen, ch6_snow:svgSnowField, ch6_barry:svgBarryKitchen, ch6_morning:svgFrostLane,
  ch7:svgTeaTable, ch7_spring:svgDryadSpring, ch7_garden:svgAnneGarden,
  ch8:svgSpringLane, ch8_porch:svgBackPorch, ch8_attic:svgCandleAttic,
  ch9:svgBirchPond, ch9_drift:svgDriftFlat, ch9_bridge:svgBridgePiles};
const svgCache = {};

/* =========================================================
   4. DOM
   ========================================================= */
const $ = id => document.getElementById(id);
const el = {};
["vn","shk","rig","cue","light","fxc","btnFx","coverHelp","scene","sprL","sprR","viewer","cover","coverSub","coverText","btnStart","btnContinue","chapterCard","ccTitle","ccSub","badge","endcard","endIn","hud",
 "dialog","nameTag","progress","dlgText","note","choices","kind","question","choiceList","nameBox","nameInput","nameOk","barFill","nextHint","miniBook",
 "report","stage","chapterPill","gL","gR","gFillL","gFillR","gauge","popL","popR",
 "btnBook","btnBox","btnLevel","btnSound","btnReset","fileInput","btnExport","btnHelp",
 "book","bookTitle","bookSub","bookBody","bookBanner","bookClose","bookNow","bookSize",
 "modal","mTitle","mBody","mBtns","toast","tip"].forEach(k => el[k] = $(k));

/* =========================================================
   5. 텍스트 도우미
   ========================================================= */
function esc(s){ return String(s).replace(/[&<>"]/g, m => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[m])); }
function T(o){ if(!o) return ""; if(o.b) return o.b; return (level === "lit" ? (o.l || o.e) : (o.e || o.l)) || ""; }
const JOSA = {"이라고":"라고", "아":"야", "은":"는", "이":"가", "을":"를", "으로":"로", "과":"와", "이에요":"예요"};
function josa(word, form){
  const c = String(word || "").trim().slice(-1).charCodeAt(0);
  if(!(c >= 0xAC00 && c <= 0xD7A3)) return JOSA[form] || form;
  const jong = (c - 0xAC00) % 28;
  if(form === "으로" && jong === 8) return "로";
  return jong ? form : (JOSA[form] || form);
}
function fill(t){
  return t.replace(/\{(\w+)\|([^}]+)\}/g, (m, k, f) => josa(S.names[k] || DEFAULT_NAMES[k] || "", f))
          .replace(/\{(\w+)\}/g, (m, k) => S.names[k] || DEFAULT_NAMES[k] || "…");
}
function gloss(html){ return html.replace(GLOSS_RE, m => `<span class="gl" tabindex="0" data-g="${esc(GLOSS[m])}">${m}</span>`); }

/* =========================================================
   6. 진행 엔진
   ========================================================= */
function applyEff(eff){
  if(!eff) return;
  if(eff.flag){ S.flags[eff.flag] = true; if(eff.flag === "metMatthew") S.met.matthew = true; }
  if(eff.met){ S.met[eff.met] = true; if(S.hearts[eff.met] === undefined) S.hearts[eff.met] = CHARS[eff.met] ? CHARS[eff.met].start : 0; setTimeout(() => bumpHud(eff.met), 50); }
  if(eff.name) Object.assign(S.names, eff.name);
  if(eff.heart) for(const k in eff.heart){ S.met[k] = true; S.hearts[k] = Math.max(0, Math.min(5, (S.hearts[k] || 0) + eff.heart[k])); setTimeout(() => bumpHud(k), 50); }
  if(eff.item && !S.items.includes(eff.item)){ S.items.push(eff.item); const it = ITEMS[eff.item]; setTimeout(() => { sfx("item"); toast(`🎁 추억 상자에 '${it.name}'${josa(it.name, "을")} 넣었어요`); }, 400); }
  if(eff.album && !P.album[eff.album]){ P.album[eff.album] = true; if(!/^e_/.test(eff.album)) setTimeout(() => { sfx("dream"); toast("✨ 숨은 장면을 발견했어요! (" + albumCount() + "/" + ALBUM.length + ")"); }, 300); }
}
function albumCount(){ return ALBUM.filter(a => P.album[a.id]).length; }
function decideEnding(){
  const t = S.tally, arr = ["canon","imag","bal"].sort((a,b) => t[b] - t[a]);
  return t[arr[0]] > t[arr[1]] ? arr[0] : "bal";
}
function enter(i, note){
  S.note = note || null;
  for(let guard = 0; guard < 400; guard++){
    const n = NODES[i];
    if(!n){ S.phase = "report"; break; }
    if(n.t === "goto"){ i = IDX[n.to]; continue; }
    if(n.t === "ending"){ if(!S.ending) S.ending = decideEnding(); i = IDX["E_" + S.ending]; continue; }
    if(!n.t && n.when && !n.when(S)){ i++; continue; }
    S.pos = i;
    if(n.bg && n.bg !== S.bg){ S.bg = n.bg; S.cam = ""; }
    if(n.cam !== undefined){ if(n.cam === "shake") shakeCam(); else S.cam = n.cam; }
    if(n.t === "choice"){ S.phase = "choice"; S.order = null; }
    else if(n.t === "name"){ S.phase = "name"; }
    else if(n.t === "endcard"){ S.phase = "endcard"; P.endings[CH.key + "_" + S.ending] = true; S.hist[CH.key] = {ending:S.ending, tally:Object.assign({}, S.tally)}; }
    else { S.phase = "play"; applyEff(n.eff); if(n.fx === "dream" && !(NODES[i-1] && NODES[i-1].fx === "dream")) sfx("dream"); }
    break;
  }
  save(); render(false);
}
function advance(){
  if(!el.modal.hidden || picking) return;
  if(!el.cover.classList.contains("hide")) return;
  if(typing){ finishTyping(); return; }
  if(S.phase === "play") enter(S.pos + 1);
  else if(S.phase === "endcard"){ S.phase = "report"; save(); render(false); }
}

/* =========================================================
   7. 렌더링
   ========================================================= */
let curBg = null;
function curNode(){ return NODES[S.pos] || {}; }
function renderScene(force){
  const n = curNode();
  const bg = S.phase === "cover" ? "ch1" : (S.bg || "ch1");
  if(force || curBg !== bg){
    const first = curBg === null || force;
    curBg = bg;
    const src = imgFor(bg), layer = document.createElement("div");
    layer.className = "layer" + (first ? "" : " enter");
    if(src){ const im = document.createElement("img"); im.src = src; im.alt = ""; layer.appendChild(im); }
    else { if(!svgCache[bg]) svgCache[bg] = (SVG_SCENES[bg] || svgStation)(); layer.innerHTML = svgCache[bg]; }
    if(first) el.scene.innerHTML = "";
    el.scene.appendChild(layer);
    if(!first){ requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.remove("enter")));
      const olds = Array.from(el.scene.children).filter(c => c !== layer); setTimeout(() => olds.forEach(o => o.remove()), 1000); }
    setSceneFx(bg);
  }
  el.cue.className = "cue " + (S.phase === "cover" ? "" : (S.cam || ""));
  const showSpr = S.phase !== "cover";
  const face = showSpr ? n.f : null;
  const other = showSpr ? (n.o || null) : null;
  const otherTalk = n.w && n.w !== "anne";
  const fSrc = face ? imgFor(face) : null, oSrc = other ? imgFor(other) : null;
  const wasTalkR = el.sprR.classList.contains("talk"), wasTalkL = el.sprL.classList.contains("talk");
  setSprite(el.sprL, fSrc, otherTalk && !!oSrc);
  setSprite(el.sprR, oSrc, !otherTalk);
  if(S.phase === "play"){ if(oSrc && otherTalk && !wasTalkR) hop(el.sprR); if(fSrc && !otherTalk && !wasTalkL && oSrc) hop(el.sprL); }
  el.scene.querySelectorAll(".svg-figure").forEach(g => g.style.display = (fSrc || oSrc) ? "none" : "");
  el.viewer.classList.toggle("dream", S.phase === "play" && n.fx === "dream");
}
function hop(img){ if(!fxOn) return; img.classList.remove("hop"); void img.offsetWidth; img.classList.add("hop"); }
function shakeCam(){ if(!fxOn) return; el.shk.classList.remove("shake"); void el.shk.offsetWidth; el.shk.classList.add("shake"); }
/* ---------- 장면 효과 (꽃잎·별·물빛) ---------- */
const SCENE_FX = {
  ch1:        {light:"sunset", petals:{n:12, col:["#ffffff","#ffe6ee","#fff4f6"], size:[4,8], vy:[16,30], wind:-10}},
  ch1_road:   {light:"road",   petals:{n:16, col:["#ffffff","#fff1f4","#fbfbf6"], size:[4,8], vy:[18,34], wind:-14}},
  ch1_avenue: {light:"rose",   petals:{n:30, col:["#ffffff","#fff6f8","#ffeef2"], size:[5,10], vy:[10,22], wind:-6}},
  ch1_pond:   {light:"pond",   glints:{n:28, band:[.6,.8]}, petals:{n:4, col:["#ffffff"], size:[4,6], vy:[14,22], wind:-8}},
  ch1_home:   {light:"night",  stars:{n:34, band:[0,.4]}},
  ch2:        {light:"warm",   motes:{n:22}},
  ch2_room:   {light:"dim",    motes:{n:14}},
  ch2_lane:   {light:"sunset", petals:{n:9, col:["#ffffff","#fff4f6"], size:[4,7], vy:[14,26], wind:-12}},
  ch2_lynde:  {light:"lamp",   motes:{n:16}},
  ch2_night:  {light:"night",  stars:{n:40, band:[0,.42]}},
  ch3:        {light:"warm",   motes:{n:18}},
  ch3_path:   {light:"road",   motes:{n:12}},
  ch3_garden: {light:"sunset", petals:{n:14, col:["#ffb46b","#ffd6a8","#ffffff","#f6a0b0"], size:[4,8], vy:[10,22], wind:-8}},
  ch3_bridge: {light:"pond",   glints:{n:24, band:[.62,.82]}},
  ch4:        {light:"warm",   motes:{n:20}},
  ch4_birch:  {light:"road",   petals:{n:10, col:["#f3d36b","#e8b84a","#d8e6a0"], size:[4,7], vy:[12,24], wind:-10}},
  ch4_spruce: {light:"road",   motes:{n:16}},
  ch4_yard:   {light:"sunset", petals:{n:8, col:["#e8a04a","#d9733a","#f2c66b"], size:[4,7], vy:[14,26], wind:-14}},
  ch5:        {light:"warm",   motes:{n:18}},
  ch5_orchard:{light:"sunset", petals:{n:12, col:["#d9473a","#e8862e","#f2b53a","#b8432e"], size:[5,9], vy:[12,24], wind:-12}},
  ch5_dusk:   {light:"night",  stars:{n:18, band:[0,.3]}, petals:{n:5, col:["#a8562e","#c9783a"], size:[4,7], vy:[12,20], wind:-16}},
  ch6:        {light:"lamp",   motes:{n:14}},
  ch6_snow:   {light:"night",  stars:{n:44, band:[0,.45]}, petals:{n:18, col:["#ffffff","#eef4ff"], size:[2,4], vy:[10,20], wind:-4}},
  ch6_barry:  {light:"lamp",   motes:{n:10}},
  ch6_morning:{light:"road",   glints:{n:30, band:[.1,.9]}, petals:{n:8, col:["#ffffff"], size:[2,3], vy:[6,12], wind:-3}},
  ch7:        {light:"warm",   motes:{n:20}},
  ch7_spring: {light:"sunset", glints:{n:20, band:[.72,.86]}, motes:{n:10}},
  ch7_garden: {light:"rose",   petals:{n:14, col:["#f4a3ae","#ffffff","#f6c25a"], size:[4,8], vy:[10,20], wind:-8}},
  ch8:        {light:"sunset", motes:{n:10}},
  ch8_porch:  {light:"road",   motes:{n:14}},
  ch8_attic:  {light:"lamp",   motes:{n:8}},
  ch9:        {light:"road",   glints:{n:26, band:[.58,.9]}},
  ch9_drift:  {light:"pond",   glints:{n:36, band:[.1,.95]}, petals:{n:6, col:["#d8e6a0","#ffffff"], size:[3,5], vy:[8,14], wind:-6}},
  ch9_bridge: {light:"dim",    glints:{n:20, band:[.64,.9]}}
};
let curFx = null;
function setSceneFx(bg){
  curFx = SCENE_FX[bg] || {};
  el.light.className = "light " + (curFx.light || "") + (curFx.light ? " on" : "");
  buildParticles();
}
const PT = {list:[], w:0, h:0, last:0, raf:0};
function rnd(a, b){ return a + Math.random() * (b - a); }
function buildParticles(){
  resizeFx();
  const L = [], W = PT.w, H = PT.h, c = curFx || {};
  if(c.petals) for(let i=0;i<c.petals.n;i++) L.push(newPetal(c.petals, true));
  if(c.glints) for(let i=0;i<c.glints.n;i++) L.push({k:"glint", x:rnd(0,1), y:rnd(c.glints.band[0], c.glints.band[1]), len:rnd(8,26), ph:rnd(0,6.28), sp:rnd(.6,1.6)});
  if(c.motes) for(let i=0;i<c.motes.n;i++) L.push({k:"mote", x:rnd(0,1), y:rnd(.1,.9), r:rnd(.8,2.2), vx:rnd(-.006,.006), vy:rnd(-.012,-.004), ph:rnd(0,6.28), sp:rnd(.6,1.4)});
  if(c.stars) for(let i=0;i<c.stars.n;i++) L.push({k:"star", x:rnd(0,1), y:rnd(c.stars.band[0], c.stars.band[1]), r:rnd(.6,1.8), ph:rnd(0,6.28), sp:rnd(.5,1.5)});
  PT.list = L;
}
function newPetal(cfg, anywhere){
  return {k:"petal", x:rnd(-.05, 1.1), y:anywhere ? rnd(-.1, 1) : rnd(-.15, -.03), s:rnd(cfg.size[0], cfg.size[1]), vy:rnd(cfg.vy[0], cfg.vy[1]), wind:cfg.wind,
    rot:rnd(0, 6.28), vr:rnd(-1.2, 1.2), sw:rnd(0, 6.28), col:cfg.col[Math.floor(Math.random()*cfg.col.length)], a:rnd(.55, .9)};
}
function resizeFx(){
  const r = el.viewer.getBoundingClientRect(), dpr = Math.min(1.5, window.devicePixelRatio || 1);
  PT.w = Math.max(1, r.width); PT.h = Math.max(1, r.height);
  el.fxc.width = Math.round(PT.w * dpr); el.fxc.height = Math.round(PT.h * dpr);
  el.fxc.getContext("2d").setTransform(dpr, 0, 0, dpr, 0, 0);
}
function fxLoop(t){
  PT.raf = requestAnimationFrame(fxLoop);
  const dt = Math.min(.05, (t - (PT.last || t)) / 1000); PT.last = t;
  if(!fxOn || document.hidden || el.stage.hidden) return;
  const ctx = el.fxc.getContext("2d"), W = PT.w, H = PT.h, sc = W / 1000;
  ctx.clearRect(0, 0, W, H);
  const dream = el.viewer.classList.contains("dream");
  for(const p of PT.list){
    if(p.k === "petal"){
      p.sw += dt * 1.3; p.rot += p.vr * dt;
      p.y += (p.vy * dt * sc) / H * 3.2; p.x += ((p.wind + Math.sin(p.sw) * 14) * dt * sc) / W * 3.2;
      if(p.y > 1.05 || p.x < -.1){ Object.assign(p, newPetal((curFx && curFx.petals) || {size:[4,8], vy:[16,30], wind:-10, col:["#fff"]}, false)); }
      ctx.save(); ctx.translate(p.x * W, p.y * H); ctx.rotate(p.rot); ctx.scale(1, .55 + .45 * Math.abs(Math.sin(p.sw)));
      ctx.globalAlpha = p.a; ctx.fillStyle = dream ? "#ffd9ef" : p.col;
      ctx.beginPath(); ctx.ellipse(0, 0, p.s * sc, p.s * .62 * sc, 0, 0, 6.283); ctx.fill(); ctx.restore();
    }else if(p.k === "glint"){
      p.ph += dt * p.sp; const a = Math.max(0, Math.sin(p.ph)) * .55;
      if(a > .02){ ctx.globalAlpha = a; ctx.strokeStyle = "#fffaf0"; ctx.lineWidth = 1.6 * sc;
        ctx.beginPath(); ctx.moveTo(p.x * W - p.len * sc / 2, p.y * H); ctx.lineTo(p.x * W + p.len * sc / 2, p.y * H); ctx.stroke(); }
    }else if(p.k === "mote"){
      p.ph += dt * p.sp; p.x += p.vx * dt + Math.sin(p.ph) * .0004; p.y += p.vy * dt;
      if(p.y < .02){ p.y = .95; p.x = rnd(0, 1); }
      const a = .2 + Math.max(0, Math.sin(p.ph)) * .5;
      ctx.globalAlpha = a; ctx.fillStyle = "#fff1c9"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * sc * 1.3, 0, 6.283); ctx.fill();
    }else if(p.k === "star"){
      p.ph += dt * p.sp; const a = .25 + Math.max(0, Math.sin(p.ph)) * .6;
      ctx.globalAlpha = a; ctx.fillStyle = "#ffffff"; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * sc * 1.4, 0, 6.283); ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
}
if(window.ResizeObserver) new ResizeObserver(() => resizeFx()).observe(el.viewer); else window.addEventListener("resize", resizeFx);
requestAnimationFrame(fxLoop);
function applyFxUI(){ document.body.classList.toggle("nofx", !fxOn); el.btnFx.classList.toggle("off", !fxOn); el.btnFx.title = fxOn ? "꽃잎·카메라 효과 켜짐 (누르면 끄기)" : "꽃잎·카메라 효과 꺼짐 (누르면 켜기)"; if(!fxOn){ const c = el.fxc.getContext("2d"); c.clearRect(0, 0, PT.w, PT.h); } }
el.btnFx.addEventListener("click", e => { e.stopPropagation(); fxOn = !fxOn; applyFxUI(); save(); toast(fxOn ? "✨ 꽃잎·카메라 효과를 켰어요" : "효과를 껐어요 (느린 컴퓨터에서 추천)"); });
function setSprite(img, src, dim){
  if(src){ if(img.getAttribute("src") !== src) img.src = src; img.classList.add("on"); img.classList.toggle("dim", !!dim); img.classList.toggle("talk", !dim); }
  else img.classList.remove("on", "dim", "talk");
}
function heartStr(k){ const h = Math.max(0, Math.min(5, S.hearts[k] || 0)); return "♥".repeat(h) + "♡".repeat(5 - h); }
function metList(){ return Object.keys(CHARS).filter(k => S.met[k]); }
function renderHud(){
  if(S.phase === "cover"){ el.hud.innerHTML = ""; return; }
  el.hud.innerHTML = metList().map(k => `<span id="hud_${k}">${CHARS[k].ic} ${CHARS[k].name} <b class="hearts">${heartStr(k)}</b></span>`).join("");
}
function bumpHud(k){ renderHud(); const s = $("hud_" + k); if(s){ s.classList.remove("bump"); void s.offsetWidth; s.classList.add("bump"); } }
function heartsHtml(){ return metList().map(k => `<p style="margin-top:8px;font-size:.86rem;font-weight:800">${CHARS[k].ic} ${CHARS[k].full}${josa(CHARS[k].full, "과")}의 마음 <span style="color:#d9645c;letter-spacing:1px">${heartStr(k)}</span></p>`).join(""); }
function updateGauge(delta){
  const total = S.canon + S.imag, c = Math.round(S.canon / total * 100), i = 100 - c;
  el.gFillL.style.width = c + "%"; el.gFillR.style.width = i + "%"; el.gL.textContent = c; el.gR.textContent = i;
  if(delta){ el.gauge.classList.remove("flash"); void el.gauge.offsetWidth; el.gauge.classList.add("flash"); showPop(el.popL, delta.canon); showPop(el.popR, delta.imag); }
}
function showPop(node, v){ node.classList.remove("show"); void node.offsetWidth; if(!v) return; node.textContent = "+" + v; node.classList.add("show"); }
function setPill(){
  el.chapterPill.textContent = S.phase === "cover" ? "초록 지붕 집으로 가는 길" : S.phase === "report" ? CH.num + "장 리포트" : CH.num + "장 · " + CH.title;
}
function progressBar(){
  let maxMain = IDX["E_canon"]; const pct = Math.min(100, Math.round(S.pos / maxMain * 100));
  el.barFill.style.width = (S.phase === "endcard" ? 100 : pct) + "%";
}

/* ---------- 타자기 ---------- */
let typer = null, typing = false, fullText = "", typerDone = null;
function typeText(text, done){
  clearInterval(typer); fullText = text; typing = true; typerDone = done || null;
  el.dlgText.textContent = ""; el.nextHint.classList.remove("on");
  let i = 0; const speed = level === "lit" ? 28 : 38;
  typer = setInterval(() => {
    i++; el.dlgText.textContent = text.slice(0, i);
    if(text.charAt(i-1).trim() && i % 2 === 0) sfx("type");
    if(i >= text.length) finishTyping();
  }, speed);
}
function finishTyping(){
  clearInterval(typer); typer = null; typing = false;
  el.dlgText.innerHTML = gloss(esc(fullText)); el.nextHint.classList.add("on");
  if(typerDone){ const f = typerDone; typerDone = null; f(); }
}
function setTextNow(text, after){ clearInterval(typer); typer = null; typing = false; typerDone = null; fullText = text; el.dlgText.innerHTML = gloss(esc(text)); el.nextHint.classList.add("on"); if(after) after(); }

function showNote(){
  if(!S.note){ el.note.hidden = true; return; }
  el.note.innerHTML = "📖 <b>원작에서는?</b> " + gloss(esc(fill(T(S.note))));
  el.note.hidden = false;
}

function render(instant){
  bgmUpdate();
  updateGauge(); applyLevelUI(); applySoundUI(); setPill(); renderHud();
  el.vn.classList.toggle("choosing", S.phase === "choice" || S.phase === "name");
  document.body.classList.toggle("covering", false);
  el.endcard.classList.toggle("show", S.phase === "endcard");
  if(S.phase === "report"){ el.stage.hidden = true; el.report.hidden = false; renderReport(); return; }
  el.stage.hidden = false; el.report.hidden = true;
  if(S.phase === "cover"){ renderCover(); return; }
  el.cover.classList.add("hide");
  renderScene(); progressBar(); syncBook();
  if(S.phase === "play") renderPlay(instant);
  else if(S.phase === "choice") renderChoice();
  else if(S.phase === "name") renderName();
  else if(S.phase === "endcard") renderEndcard();
}
function renderPlay(instant){
  const n = curNode();
  el.choices.hidden = true; el.dlgText.hidden = false; el.note.hidden = true;
  const inner = n.w === "anne" && n.in;
  el.nameTag.textContent = n.w === "anne" ? (inner ? "앤 셜리 (속마음)" : "앤 셜리") : WHO[n.w] || "";
  el.nameTag.className = "nametag " + (inner ? "inner" : (n.w !== "anne" ? n.w : ""));
  el.progress.textContent = CH.num + "장 · " + CH.title;
  el.miniBook.hidden = false;
  const text = fill(T(n));
  if(instant) setTextNow(text, showNote); else typeText(text, showNote);
}
function shuffle(n){ const a = Array.from({length:n}, (_,i) => i); for(let i=n-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [a[i],a[j]] = [a[j],a[i]]; } return a; }
function renderChoice(){
  const n = curNode();
  if(!Array.isArray(S.order) || S.order.length !== n.opts.length){ S.order = shuffle(n.opts.length); save(); }
  clearInterval(typer); typing = false; typerDone = null;
  el.dlgText.hidden = true; el.note.hidden = true; el.choices.hidden = false; el.nameBox.hidden = true; el.choiceList.hidden = false; el.nextHint.classList.remove("on");
  el.nameTag.textContent = "💭 선택의 순간"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 · " + n.label;
  el.kind.textContent = KIND[n.kind]; el.kind.className = "kind " + n.kind;
  el.question.textContent = T(n.q);
  el.choiceList.innerHTML = "";
  S.order.forEach((oi, pos) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "choice"; b.dataset.oi = oi;
    b.innerHTML = `<span class="num">${pos + 1}</span><span class="ct"></span>`;
    b.querySelector(".ct").textContent = T(n.opts[oi]);
    b.addEventListener("click", e => { e.stopPropagation(); pick(oi, b); });
    el.choiceList.appendChild(b);
  });
}
function refreshChoiceTexts(){
  const n = curNode();
  el.question.textContent = T(n.q);
  el.choiceList.querySelectorAll(".choice").forEach(b => b.querySelector(".ct").textContent = T(n.opts[+b.dataset.oi]));
}
let picking = false;
function pick(oi, btn){
  if(picking || S.phase !== "choice") return;
  picking = true; unlockAudio(); sfx("select");
  const n = curNode(), o = n.opts[oi];
  el.choiceList.querySelectorAll(".choice").forEach(b => b.disabled = true);
  btn.classList.add("picked");
  const delta = {canon:0, imag:0};
  if(o.type === "canon") delta.canon = 15; else if(o.type === "imag") delta.imag = 15; else { delta.canon = 5; delta.imag = 5; }
  S.canon += delta.canon; S.imag += delta.imag; S.tally[o.type]++;
  S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type:o.type, oi});
  applyEff(o.eff);
  updateGauge(delta); showBadge(o.type, T(BADGE[o.type]));
  setTimeout(() => { picking = false; enter(o.go ? IDX[o.go] : S.pos + 1, n.note); }, 700);
}
function renderName(){
  const n = curNode();
  clearInterval(typer); typing = false; typerDone = null;
  el.dlgText.hidden = true; el.note.hidden = true; el.choices.hidden = false; el.choiceList.hidden = true; el.nameBox.hidden = false; el.nextHint.classList.remove("on");
  el.nameTag.textContent = "💭 선택의 순간"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 · " + n.label;
  el.kind.textContent = KIND.name; el.kind.className = "kind name";
  el.question.textContent = T(n.q);
  el.nameInput.placeholder = n.ph || "";
  el.nameInput.maxLength = n.max || 16;
  el.nameBox.querySelector(".name-help").textContent = (n.max || 16) + "글자까지 쓸 수 있어요. 다 쓰고 Enter를 눌러도 돼요.";
  $("nameOk").textContent = n.free ? "말해 주기" : "이름 짓기";
  el.kind.textContent = n.free ? "💌 마음 전하기" : KIND.name;
  el.nameInput.value = S.names[n.key] || "";
  setTimeout(() => { try{ el.nameInput.focus({preventScroll:true}); }catch(e){} }, 50);
}
function submitName(){
  if(S.phase !== "name" || picking) return;
  const n = curNode();
  let v = el.nameInput.value.replace(/[<>{}`]/g, "").replace(/\s+/g, " ").trim().slice(0, n.max || 16);
  if(!v){ toast(n.free ? "한 글자 이상 써 주세요 💌" : "이름을 한 글자 이상 써 주세요 ✍️"); el.nameInput.focus(); return; }
  if(n.free){
    picking = true; unlockAudio(); sfx("select");
    S.names[n.key] = v; S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type:"free", val:v});
    showBadge("bal", "💌 마음이 전해졌어요!"); el.nameInput.blur();
    setTimeout(() => { picking = false; enter(S.pos + 1, n.note); }, 700);
    return;
  }
  picking = true; unlockAudio(); sfx("select");
  const norm = s => s.replace(/[\s'"‘’“”.!]/g, "");
  const match = norm(v) === norm(n.canon);
  S.names[n.key] = v;
  const delta = match ? {canon:15, imag:0} : {canon:0, imag:5};
  S.canon += delta.canon; S.imag += delta.imag;
  S.picks = S.picks.filter(p => p.id !== n.id); S.picks.push({id:n.id, type: match ? "canon" : "name", val:v});
  updateGauge(delta);
  showBadge(match ? "canon" : "name", match ? "📖 원작과 똑같은 이름!" : "✍️ 나만의 이름이 생겼어요!");
  el.nameInput.blur();
  setTimeout(() => { picking = false; enter(S.pos + 1, n.note); }, 700);
}
function showBadge(type, text){
  el.badge.className = "badge " + type; void el.badge.offsetWidth;
  el.badge.textContent = text; el.badge.classList.add("show");
  setTimeout(() => sfx("chime"), 120);
}
function renderEndcard(){
  const E = CH.endings[S.ending], col = {canon:"#c9504a", imag:"#3f78b0", bal:"#5b8a5e"}[S.ending];
  el.endIn.innerHTML = `<small>${CH.num}장 결말</small><h2>🎬 ${esc(E.title)}</h2><span class="lbl" style="background:${col}">${E.label}</span>
    <div class="slots">${["canon","imag","bal"].map(k => `<span class="${P.endings[CH.key + "_" + k] ? "got" : ""}">${P.endings[CH.key + "_" + k] ? CH.endings[k].label : "??? 결말"}</span>`).join("")}</div>`;
  el.choices.hidden = true; el.dlgText.hidden = false; el.note.hidden = true;
  el.nameTag.textContent = "🎬 결말"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장 끝";
  const found = ["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length;
  setTextNow(level === "lit" ? `${CH.num}장의 결말에 닿았습니다. 지금까지 발견한 결말은 3개 중 ${found}개입니다. 클릭하면 리포트로 넘어갑니다.` : `${CH.num}장 결말을 만났어요! 결말 3개 중 ${found}개를 찾았어요. 클릭하면 리포트를 볼 수 있어요.`);
  sfx("end");
}
function showChapterCard(){
  el.ccTitle.textContent = CH.num + "장 · " + CH.title;
  el.ccSub.textContent = CH.orig + " 「" + CH.origTitle + "」";
  el.chapterCard.classList.add("show"); sfx("page");
  setTimeout(() => el.chapterCard.classList.remove("show"), 1600);
}
function renderCover(){
  setTimeout(bgmUpdate, 0);
  el.cover.classList.remove("hide"); document.body.classList.add("covering"); el.vn.classList.remove("choosing");
  el.coverSub.textContent = CHAPTERS.map(c => c.num + "장 " + c.title).join(" · ");
  el.coverText.textContent = level === "lit"
    ? "고아 소녀 앤 셜리가 초록 지붕 집의 가족이 되기까지. 선택에 따라 장마다 결말이 달라지고, 앞 장의 선택이 다음 장에 흔적을 남깁니다. 📖 원문 책장에서는 1908년 원작을 새로 옮긴 문장 전체를 함께 읽을 수 있습니다."
    : "앤이 초록 지붕 집의 가족이 되어 가는 이야기예요. 무엇을 고르느냐에 따라 결말이 바뀌고, 앞에서 고른 것이 다음 장에 다시 나와요! 📖 원문 책장을 열면 원작 소설 문장도 함께 읽을 수 있어요.";
  el.btnContinue.hidden = !S.started || S.phase === "cover";
  const chips = $("chapChips");
  const avail = CHAPTERS.filter((c, i) => i === 0 || P.reached[c.key]);
  chips.innerHTML = avail.length > 1 ? `<span style="font-size:.78rem;font-weight:800;color:#8a6a4a">장 골라서 시작:</span>` + avail.map(c => `<button type="button" class="btn" data-ci="${CHAPTERS.indexOf(c)}">${c.num}장 · ${c.title}</button>`).join("") : "";
  chips.querySelectorAll("button").forEach(b => b.onclick = e => { e.stopPropagation(); unlockAudio(); const ci = +b.dataset.ci; startChapter(ci, ci === 0 ? null : (P.snaps[CHAPTERS[ci].key] || null)); });
  el.btnStart.textContent = el.btnContinue.hidden ? "📖 이야기 시작하기" : "📖 처음부터 시작";
  el.dlgText.hidden = false; el.choices.hidden = true; el.note.hidden = true;
  el.nameTag.textContent = "안내"; el.nameTag.className = "nametag sys";
  el.progress.textContent = CH.num + "장"; el.miniBook.hidden = true;
  el.coverHelp.textContent = level === "lit" ? "화면을 클릭하면 문장이 완성되고, 한 번 더 클릭하면 다음 장면으로 넘어갑니다. 점선 밑줄 낱말을 누르면 뜻풀이가 나옵니다." : "화면을 누르면 문장이 바로 다 나오고, 한 번 더 누르면 다음으로 넘어가요. 점선 밑줄 낱말을 누르면 뜻을 알려 줘요!";
  el.nextHint.classList.remove("on"); el.barFill.style.width = "0";
  curBg = null; renderScene(true); setPill();
}

/* ---------- 리포트 ---------- */
function renderReport(){
  const total = S.canon + S.imag, c = Math.round(S.canon / total * 100), i = 100 - c;
  const lit = level === "lit", E = S.ending ? CH.endings[S.ending] : null;
  const emoji = {canon:"📖", imag:"✨", bal:"⚖️"}[S.ending] || "🎬";
  const desc = {
    canon: lit ? "원작 속 앤이 걸었던 길을 충실히 따라 결말에 닿았습니다. 인물의 성격을 읽어 내는 눈이 밝은 독자입니다." : "원작 속 앤이 했던 선택을 거의 그대로 따라갔어요. 앤의 마음을 정말 잘 읽었어요!",
    imag: lit ? "원작 바깥으로 상상의 오솔길을 여러 번 내었습니다. 앤처럼 세상을 새로 이름 짓는 독자입니다." : "원작과 다른 상상의 길을 많이 골랐어요. 앤처럼 상상력이 반짝이는 친구예요!",
    bal: lit ? "앤의 뜨거운 마음과 주변 사람들의 마음 사이에서 균형을 찾았습니다. 타인을 헤아리는 성숙한 읽기입니다." : "앤의 마음도, 주변 사람들의 마음도 함께 생각했어요. 지혜롭고 따뜻한 선택이었어요!"
  }[S.ending] || "";
  const rows = CHOICE_IDS.map(id => {
    const n = NODES[IDX[id]], p = S.picks.find(x => x.id === id); if(!p) return "";
    if(n.t === "name" && n.free){
      return `<div class="c">${esc(n.label)}</div><div class="mine"><span class="tag bal">나의 생각</span><br>"${esc(p.val)}"</div><div class="orig"><span class="tag canon">원작</span><br>${esc(T(n.note))}</div>`;
    }
    if(n.t === "name"){
      return `<div class="c">${esc(n.label)}</div><div class="mine"><span class="tag ${p.type}">${LABEL[p.type]}</span><br>'${esc(p.val)}'</div><div class="orig"><span class="tag canon">원작</span><br>'${esc(n.canon)}'</div>`;
    }
    const mine = n.opts[p.oi], orig = n.opts.find(o => o.type === "canon");
    return `<div class="c">${esc(n.label)}</div><div class="mine"><span class="tag ${p.type}">${LABEL[p.type]}</span><br>${esc(T(mine.s))}</div><div class="orig"><span class="tag canon">원작</span><br>${esc(T(orig.s))}</div>`;
  }).join("");
  const items = S.items.map(k => `<div class="item"><span class="ic">${ITEMS[k].ic}</span><span><b>${ITEMS[k].name}</b><br>${esc(fill(ITEMS[k].desc))}</span></div>`).join("") || `<p style="font-size:.85rem;color:#8a7461">아직 모은 물건이 없어요.</p>`;
  const album = ALBUM.map(a => P.album[a.id] ? `<div><span class="ic">${a.ic}</span>${a.name}</div>` : `<div class="lock"><span class="ic">❔</span>???</div>`).join("");
  const ends = ["canon","imag","bal"].map(k => P.endings[CH.key + "_" + k] ? `<div><span class="ic">🎬</span>${CH.endings[k].title}<br><small>${CH.endings[k].label}</small></div>` : `<div class="lock"><span class="ic">❔</span>??? 결말</div>`).join("");
  el.report.innerHTML = `<div class="rp-wrap">
    <div class="rp-head"><small>CHAPTER ${CH.num} REPORT</small><h2>🎒 ${CH.num}장 리포트 · ${CH.title}</h2>
      <p style="font-size:.86rem;color:#6e5b4b;margin-top:6px">${CH.orig} 「${CH.origTitle}」</p>
      ${S.ch > 0 ? `<p style="font-size:.82rem;color:#8a7461;margin-top:6px">지금까지의 여정 · ${CHAPTERS.slice(0, S.ch + 1).map(c => S.hist[c.key] ? `${c.num}장 ${c.endings[S.hist[c.key].ending].label}` : `${c.num}장 —`).join(" → ")}</p>` : ""}</div>
    ${E ? `<div class="type-card"><div class="type-emoji">${emoji}</div><div style="flex:1">
      <h3>내가 만난 결말: ${esc(E.title)} <span class="tag ${S.ending}" style="vertical-align:middle">${E.label}</span></h3><p>${desc}</p>
      <div class="rp-gauge"><span style="width:${c}%;background:linear-gradient(90deg,#c9504a,#ec8d84)"></span><span style="width:${i}%;background:linear-gradient(90deg,#8cbbe6,#3f78b0)"></span></div>
      <div class="rp-legend"><span style="color:#b9473f">📖 원작 ${c}%</span><span style="color:#5b8a5e">원작 ${S.tally.canon} · 상상 ${S.tally.imag} · 균형 ${S.tally.bal}번 선택</span><span style="color:#3d73a8">상상 ${i}% ✨</span></div>
    </div></div>` : ""}
    <div class="card"><h4>🧭 내 선택과 원작 비교</h4><div class="cmp"><div class="h">장면</div><div class="h">내가 고른 길</div><div class="h">원작 속 앤</div>${rows}</div></div>
    <div class="grid2">
      <div class="card"><h4>🎁 추억 상자</h4><div class="items">${items}</div>
        ${heartsHtml()}</div>
      <div class="card"><h4>🎬 결말 모음 (${["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length}/3)</h4><div class="album">${ends}</div>
        <h4 style="margin-top:14px">✨ 숨은 장면 (${albumCount()}/${ALBUM.length})</h4><div class="album">${album}</div></div>
    </div>
    <div class="card"><h4>💬 생각 나누기</h4><ol class="talk-q" style="padding-left:20px">${(lit ? CH.talk.l : CH.talk.e).map(q => `<li>${q}</li>`).join("")}</ol></div>
    ${CH.midReport ? `<div class="mid-banner"><div><b>📜 1~${CH.num}장 중간 보고서가 열렸어요!</b><br><span>지금까지 다섯 장 동안 내가 걸어온 길, 지어 준 이름, 쌓은 마음을 한눈에 볼 수 있어요.</span></div><button type="button" class="big" id="rpMid">📜 중간 보고서 보기</button></div>` : ""}
    <div class="rp-btns">
      <button type="button" class="big" id="rpReplay">🔁 다른 선택으로 ${CH.num}장 다시 하기</button>
      <button type="button" class="big sky" id="rpBook">📖 원문으로 ${CH.num}장 전체 읽기</button>
      <button type="button" class="big alt" id="rpPrint">🖨️ 리포트 인쇄</button>
      ${CHAPTERS[S.ch + 1] ? `<button type="button" class="big sky" id="rpNext">➡ ${CH.num + 1}장 「${CHAPTERS[S.ch + 1].title}」으로</button>` : `<button type="button" class="big alt" disabled title="다음 장은 준비 중이에요">➡ ${CH.num + 1}장 (준비 중)</button>`}
    </div></div>`;
  $("rpReplay").onclick = () => replay();
  if($("rpMid")) $("rpMid").onclick = () => renderMidReport();
  if($("rpNext")) $("rpNext").onclick = () => nextChapter();
  $("rpBook").onclick = () => openBook(true);
  $("rpPrint").onclick = () => window.print();
  el.report.scrollTop = 0;
}

/* ---------- 중간 보고서 (1~5장) ---------- */
const NAME_LABELS = [
  {k:`avenue`, ch:1, what:`꽃이 핀 가로수길`, canon:`기쁨의 하얀 길`},
  {k:`pond`, ch:1, what:`배리 씨네 연못`, canon:`반짝이는 호수`},
  {k:`advice`, ch:2, what:`앤에게 건넨 한마디`, free:true},
  {k:`spring`, ch:3, what:`통나무 다리 아래 샘`, canon:`드라이어드의 샘`},
  {k:`together`, ch:3, what:`다이애나와 하고 싶은 일`, free:true},
  {k:`vale`, ch:4, what:`숲 그늘의 작은 골짜기`, canon:`제비꽃 골짜기`},
  {k:`prayer`, ch:6, what:`오늘을 기념하는 새 기도문`, free:true},
  {k:`newday`, ch:7, what:`실수 없는 새날의 도전`, free:true},
  {k:`snood`, ch:8, what:`검은 벨벳 리본`, canon:`스누드`},
  {k:`romance`, ch:9, what:`간직하고 싶은 낭만`, free:true}
];
const READER_TYPE = {
  canon:{emoji:`📖`, name:`원작 탐정형`, e:`원작 속 앤의 마음을 정확히 읽어 내는 독자예요. 인물이 왜 그렇게 행동하는지 꼼꼼히 따라가며 읽었어요.`, l:`인물의 성격과 동기를 정확히 읽어 내는 독자입니다. 원작의 흐름을 존중하며 앤의 선택이 지닌 의미를 따라갔습니다.`},
  imag:{emoji:`✨`, name:`상상 모험가형`, e:`앤처럼 세상을 새로 이름 짓는 독자예요. 원작 바깥으로 나만의 오솔길을 여러 번 냈어요.`, l:`앤처럼 세상에 새 이름을 붙이는 독자입니다. 원작의 빈틈에서 다른 가능성을 상상하며 이야기를 넓혀 갔습니다.`},
  bal:{emoji:`⚖️`, name:`마음 다리형`, e:`앤의 마음과 주변 사람들의 마음을 함께 생각한 독자예요. 서로를 잇는 다리 같은 선택을 많이 했어요.`, l:`앤의 열정과 타인의 입장 사이에서 균형을 찾는 독자입니다. 갈등을 풀어 가는 성숙한 길을 자주 골랐습니다.`}
};
function MID(){ P.mid = P.mid || {}; P.mid[CH.key] = P.mid[CH.key] || {name:"", a:[]}; return P.mid[CH.key]; }
function fallbackCopy(txt, done){ const ta = document.createElement("textarea"); ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); try{ document.execCommand("copy"); done(); }catch(e){ toast("복사하지 못했어요. 길게 눌러 직접 복사해 주세요."); } ta.remove(); }
function renderMidReport(){
  const lit = level === "lit", upto = CHAPTERS.slice(0, S.ch + 1);
  const sum = {canon:0, imag:0, bal:0};
  upto.forEach(c => { const h = S.hist[c.key]; if(h && h.tally) ["canon","imag","bal"].forEach(k => sum[k] += h.tally[k] || 0); });
  const top = ["canon","imag","bal"].reduce((a, b) => sum[b] > sum[a] ? b : a, "canon");
  const tie = ["canon","imag","bal"].filter(k => sum[k] === sum[top]).length > 1;
  const type = READER_TYPE[tie ? "bal" : top];
  const tot = sum.canon + sum.imag + sum.bal || 1;
  const pct = k => Math.round(sum[k] / tot * 100);
  const total = S.canon + S.imag, gc = Math.round(S.canon / total * 100);
  const timeline = upto.map(c => { const h = S.hist[c.key];
    if(!h) return `<div class="tl-row"><div class="tl-ch">${c.num}장</div><div class="tl-body"><b>${c.title}</b><br><small>아직 끝까지 읽지 않았어요</small></div></div>`;
    const E = c.endings[h.ending], t = h.tally || {canon:0, imag:0, bal:0}, n = (t.canon + t.imag + t.bal) || 1;
    return `<div class="tl-row"><div class="tl-ch">${c.num}장</div><div class="tl-body"><b>${c.title}</b> <span class="tag ${h.ending}">${E.label}</span><br>🎬 ${esc(E.title)}
      <div class="tl-bar"><span style="width:${t.canon/n*100}%;background:#d9645c"></span><span style="width:${t.bal/n*100}%;background:#8cb68a"></span><span style="width:${t.imag/n*100}%;background:#6aa5dc"></span></div></div></div>`; }).join("");
  const names = NAME_LABELS.filter(x => x.ch <= CH.num).map(x => { const v = S.names[x.k];
    return `<div class="c">${x.ch}장 · ${x.what}</div><div class="mine">${v ? `'${esc(v)}'` : `<span style="color:#a08770">—</span>`}</div><div class="orig">${x.free ? `<span style="color:#a08770">정답 없음</span>` : `'${x.canon}'`}</div>`; }).join("");
  const endCount = upto.reduce((s, c) => s + ["canon","imag","bal"].filter(k => P.endings[c.key + "_" + k]).length, 0);
  const itemIcons = S.items.map(k => ITEMS[k] ? `<span title="${esc(ITEMS[k].name)}">${ITEMS[k].ic}</span>` : "").join(" ");
  const qs = lit
    ? [`1~${CH.num}장에서 앤이 가장 크게 성장했다고 생각하는 장면을 고르고, 그 근거를 원작 문장에서 찾아 써 봅시다.`,
       `내가 고른 선택 가운데 원작과 가장 달랐던 것 하나를 골라, 그 선택이 이후 이야기에 어떤 영향을 줄 수 있었을지 써 봅시다.`,
       `다이애나와 헤어지고 길버트와 경쟁하게 된 앤. 6~10장에서 두 관계가 어떻게 변할지 근거를 들어 예측해 봅시다.`]
    : [`1~${CH.num}장에서 앤이 가장 많이 자랐다고 생각하는 장면은 어디인가요? 왜 그렇게 생각하나요?`,
       `내가 고른 선택 중에 원작과 가장 달랐던 것 하나를 골라 보세요. 왜 그 길을 골랐나요?`,
       `앞으로 앤과 다이애나는 다시 친구가 될 수 있을까요? 앤과 길버트는 어떻게 될까요? 예측해 봐요.`];
  el.report.innerHTML = `<div class="rp-wrap mid">
    <div class="rp-head"><small>MID-TERM READING REPORT</small><h2>📜 중간 보고서 · 1~${CH.num}장 나의 독서 여정</h2>
      <p style="font-size:.86rem;color:#6e5b4b;margin-top:6px">원작 2장부터 17장까지, 앤이 초록 지붕 집에 와서 첫 친구를 사귀고 잃기까지의 이야기</p></div>
    <div class="type-card"><div class="type-emoji">${type.emoji}</div><div style="flex:1">
      <h3>나의 독서 유형: ${type.name}</h3><p>${lit ? type.l : type.e}</p>
      <div class="rp-gauge"><span style="width:${pct("canon")}%;background:linear-gradient(90deg,#c9504a,#ec8d84)"></span><span style="width:${pct("bal")}%;background:linear-gradient(90deg,#9cc49a,#5b8a5e)"></span><span style="width:${pct("imag")}%;background:linear-gradient(90deg,#8cbbe6,#3f78b0)"></span></div>
      <div class="rp-legend"><span style="color:#b9473f">📖 원작 ${sum.canon}번</span><span style="color:#5b8a5e">⚖️ 균형 ${sum.bal}번</span><span style="color:#3d73a8">✨ 상상 ${sum.imag}번</span></div>
      <p style="font-size:.8rem;color:#8a7461;margin-top:6px">게이지 누적: 원작 ${gc}% · 상상 ${100 - gc}%</p>
    </div></div>
    <div class="card"><h4>🗺️ 장별 여정</h4><div class="timeline">${timeline}</div></div>
    <div class="card"><h4>✍️ 내가 지어 준 이름과 생각</h4><div class="cmp"><div class="h">장면</div><div class="h">나의 이름·생각</div><div class="h">원작</div>${names}</div></div>
    <div class="grid2">
      <div class="card"><h4>💞 쌓아 온 마음</h4>${heartsHtml()}</div>
      <div class="card"><h4>🎁 모은 추억 (${S.items.length}개)</h4><p style="font-size:1.5rem;letter-spacing:4px;line-height:1.6">${itemIcons || "—"}</p>
        <h4 style="margin-top:12px">🎬 만난 결말 ${endCount}/${upto.length * 3}</h4><p style="font-size:.84rem;color:#6e5b4b">다른 선택으로 장을 다시 하면 숨은 결말을 더 만날 수 있어요.</p></div>
    </div>
    <div class="card"><h4>📝 돌아보며 쓰기</h4>
      <div class="mid-who">이름: <input id="midName" maxlength="20" placeholder="이름을 써 주세요" value="${esc(MID().name || "")}"><span class="print-name" style="display:none">${esc(MID().name || "")}</span></div>
      ${qs.map((q, i) => `<div class="mid-q"><p><b>${i + 1}.</b> ${q}</p><textarea class="mid-ans" data-i="${i}" rows="3" placeholder="여기에 내 생각을 써 보세요.">${esc(MID().a[i] || "")}</textarea><div class="mid-print" id="midP${i}">${esc(MID().a[i] || "")}</div></div>`).join("")}
      <div class="mid-saved" id="midSaved"></div>
      <p style="font-size:.8rem;color:#8a7461;margin-top:4px">쓴 내용은 이 기기에 저절로 저장돼요. 인쇄하면 쓴 글이 함께 인쇄되고, [📋 내 글 복사]로 선생님께 보낼 수도 있어요.</p></div>
    <div class="rp-btns">
      <button type="button" class="big alt" id="midPrint">🖨️ 중간 보고서 인쇄</button>
      <button type="button" class="big" id="midCopy">📋 내 글 복사</button>
      <button type="button" class="big sky" id="midBack">⬅ ${CH.num}장 리포트로</button>
      ${CHAPTERS[S.ch + 1] ? `<button type="button" class="big sky" id="midNext">➡ ${CH.num + 1}장으로</button>` : `<button type="button" class="big alt" disabled>➡ ${CH.num + 1}장 (준비 중)</button>`}
    </div></div>`;
  $("midPrint").onclick = () => window.print();
  let saveT = null;
  const flash = () => { $("midSaved").textContent = "✔ 저장했어요"; clearTimeout(saveT); saveT = setTimeout(() => { const e = $("midSaved"); if(e) e.textContent = ""; }, 1500); };
  el.report.querySelectorAll(".mid-ans").forEach(ta => {
    const fit = () => { ta.style.height = "auto"; ta.style.height = Math.max(96, ta.scrollHeight + 4) + "px"; };
    fit();
    ta.addEventListener("click", e => e.stopPropagation());
    ta.addEventListener("input", () => { const i = +ta.dataset.i; MID().a[i] = ta.value; $("midP" + i).textContent = ta.value; fit(); save(); flash(); });
  });
  $("midName").addEventListener("input", e => { MID().name = e.target.value; el.report.querySelector(".print-name").textContent = e.target.value; save(); flash(); });
  $("midCopy").onclick = () => {
    const m = MID(), txt = `[빨강 머리 앤 · 1~${CH.num}장 중간 보고서]\n이름: ${m.name || ""}\n독서 유형: ${type.name}\n\n` + qs.map((q, i) => `${i + 1}. ${q}\n→ ${m.a[i] || "(아직 안 썼어요)"}`).join("\n\n");
    const done = () => toast("📋 내 글을 복사했어요. 카톡이나 메모에 붙여 넣으세요!");
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, () => fallbackCopy(txt, done)); else fallbackCopy(txt, done);
  };
  $("midBack").onclick = () => renderReport();
  if($("midNext")) $("midNext").onclick = () => nextChapter();
  el.report.scrollTop = 0; sfx("chime");
}

/* =========================================================
   8. 원문 책장 & 낱말 풀이
   ========================================================= */
function buildBook(){
  const B = BOOK[CH.key];
  let num = 0;
  el.bookTitle.textContent = "📖 " + B.orig + " 「" + B.title + "」";
  el.bookSub.textContent = "L. M. 몽고메리 《빨강 머리 앤》(1908) 영어 원작을 이 앱을 위해 새로 우리말로 옮겼어요. 점선 밑줄 낱말을 누르면 뜻풀이가 나와요.";
  el.bookBody.innerHTML = B.paras.map(([n, t]) => {
      if(n === "h"){ num = 0; return `<h4 style="font-family:sans-serif;font-size:.86rem;color:#8a4a2a;margin:14px 0 8px;padding:6px 10px;background:#f6ead6;border-radius:8px">${t}</h4>`; }
      num++; return `<p class="bp${(CH.key === "ch1" && n === 3) ? " poem" : ""}" data-p="${n}"><i>${num}</i>${gloss(t)}</p>`; }).join("") +
    (B.extra || []).map(([id, label, t]) => `<p class="bp extra" data-p="${id}"><b style="font-family:sans-serif;font-size:.78rem;color:#7a5a8a">${label}</b><br>${gloss(t)}</p>`).join("");
  bookBuiltFor = CH.key;
}
function anchorFor(){
  const n = curNode();
  if(n.bk) return {list:n.bk.map(String), imag:false};
  // 상상 장면 등 원문 표시가 없으면, 뒤에서 가장 가까운 원문 위치를 찾음
  for(let i = S.pos + 1; i < NODES.length; i++){ if(NODES[i].bk && !NODES[i].t){ return {list:[String(NODES[i].bk[0])], imag: n.fx === "dream" || S.phase === "choice" || S.phase === "name"}; } }
  return {list:[], imag:false};
}
function syncBook(scroll){
  if(!el.book.classList.contains("open")) return;
  if(bookBuiltFor !== CH.key) buildBook();
  const a = (S.phase === "cover" || S.phase === "report") ? {list:[], imag:false} : anchorFor();
  el.bookBody.querySelectorAll(".bp").forEach(p => p.classList.toggle("now", a.list.includes(p.dataset.p)));
  el.bookBanner.hidden = !(a.imag && curNode().fx === "dream");
  if(scroll !== false && a.list.length){ const t = el.bookBody.querySelector(`.bp[data-p="${a.list[0]}"]`); if(t) t.scrollIntoView({block:"center", behavior: scroll === "instant" ? "auto" : "smooth"}); }
}
function openBook(top){
  if(bookBuiltFor !== CH.key) buildBook();
  el.book.classList.add("open");
  if(top === true){ el.bookBody.querySelectorAll(".bp").forEach(p => p.classList.remove("now")); el.bookBanner.hidden = true; el.bookBody.scrollTop = 0; }
  else syncBook("instant");
  sfx("page");
}
function closeBook(){ el.book.classList.remove("open"); }

function showTip(target){
  const r = target.getBoundingClientRect();
  el.tip.innerHTML = `<b>${esc(target.textContent)}</b> · ${esc(target.dataset.g)}`;
  el.tip.hidden = false;
  const tw = el.tip.offsetWidth, th = el.tip.offsetHeight;
  let x = Math.min(window.innerWidth - tw - 8, Math.max(8, r.left + r.width/2 - tw/2));
  let y = r.top - th - 8; if(y < 8) y = r.bottom + 8;
  el.tip.style.left = x + "px"; el.tip.style.top = y + "px";
}
function hideTip(){ el.tip.hidden = true; }
document.addEventListener("mouseover", e => { const g = e.target.closest && e.target.closest(".gl"); if(g) showTip(g); });
document.addEventListener("mouseout", e => { const g = e.target.closest && e.target.closest(".gl"); if(g) hideTip(); });
document.addEventListener("click", e => {
  const g = e.target.closest && e.target.closest(".gl");
  if(g){ e.stopPropagation(); showTip(g); clearTimeout(window.__tipT); window.__tipT = setTimeout(hideTip, 3500); }
  else hideTip();
}, true);

/* =========================================================
   9. 툴바
   ========================================================= */
function applyLevelUI(){
  document.body.classList.toggle("lit", level === "lit");
  el.btnLevel.classList.toggle("lit", level === "lit");
  el.btnLevel.innerHTML = level === "lit" ? "📜<span class=\"tx\"> 원작 수준</span>" : "🌱<span class=\"tx\"> 초등 수준</span>";
  el.btnLevel.title = level === "lit" ? "지금: 원작 수준(문학 표현) · 누르면 초등 수준으로" : "지금: 초등 수준(쉬운 말) · 누르면 원작 수준으로";
}
function applySoundUI(){ el.btnSound.textContent = soundOn ? "🔊" : "🔇"; el.btnSound.title = soundOn ? "효과음 켜짐 (누르면 끄기)" : "효과음 꺼짐 (누르면 켜기)"; }
el.btnLevel.addEventListener("click", e => {
  e.stopPropagation();
  level = level === "easy" ? "lit" : "easy"; save(); applyLevelUI();
  if(S.phase === "play") renderPlay(true);
  else if(S.phase === "choice") refreshChoiceTexts();
  else if(S.phase === "name") el.question.textContent = T(curNode().q);
  else if(S.phase === "endcard") renderEndcard();
  else if(S.phase === "report") renderReport();
  else if(S.phase === "cover") renderCover();
  toast(level === "lit" ? "📜 원작 수준(문학 표현)으로 바꿨어요" : "🌱 초등 수준(쉬운 말)으로 바꿨어요");
});
/* ---------- 배경 음악 ---------- */
const BGM = {el:null, gain:null, cur:null, urls:{}, vol:0.32, fading:false};
function bgmWant(){ return (musicOn && S.started && !document.hidden && !document.body.classList.contains("covering") && CH.bgm) ? CH.bgm : null; }
function bgmSetVol(v, sec){
  if(BGM.gain && actx){ const g = BGM.gain.gain, t = actx.currentTime; g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(v, t + sec); }
  else if(BGM.el){ BGM.el.volume = Math.max(0, Math.min(1, v)); }
}
async function bgmSrc(f){
  if(BGM.urls[f]) return BGM.urls[f];
  if(/^https?:$/.test(location.protocol)){
    try{ const r = await fetch(f); if(!r.ok) throw 0; BGM.urls[f] = URL.createObjectURL(await r.blob()); return BGM.urls[f]; }catch(e){ return null; }
  }
  return f;
}
async function bgmUpdate(){
  const want = bgmWant();
  if(want === BGM.cur) return;
  const prev = BGM.el; BGM.cur = want;
  if(prev){ bgmSetVol(0, 0.8); setTimeout(() => { if(BGM.el === prev && BGM.cur !== prev.dataset.f) prev.pause(); }, 850); }
  if(!want) return;
  const src = await bgmSrc(want);
  if(BGM.cur !== want) return;
  if(!src){ BGM.cur = null; return; }
  if(!BGM.el){
    BGM.el = new Audio(); BGM.el.loop = true; BGM.el.preload = "auto";
    const ctx = unlockAudio();
    if(ctx){ try{ BGM.gain = ctx.createGain(); BGM.gain.gain.value = 0; ctx.createMediaElementSource(BGM.el).connect(BGM.gain); BGM.gain.connect(ctx.destination); }catch(e){ BGM.gain = null; } }
    BGM.el.addEventListener("timeupdate", () => {
      const a = BGM.el; if(!a.duration || BGM.cur !== a.dataset.f) return;
      if(a.duration - a.currentTime < 2.2 && !BGM.fading){ BGM.fading = true; bgmSetVol(0.02, 2); }
      else if(a.currentTime < 1.5 && BGM.fading){ BGM.fading = false; bgmSetVol(BGM.vol, 2.5); }
    });
  }
  const a = BGM.el;
  if(a.dataset.f !== want){ a.src = src; a.dataset.f = want; BGM.fading = false; }
  if(!BGM.gain) a.volume = 0;
  a.play().then(() => bgmSetVol(BGM.vol, 2)).catch(() => { BGM.cur = null; });
}
document.addEventListener("visibilitychange", bgmUpdate);
window.addEventListener("pointerdown", () => { if(!BGM.cur) bgmUpdate(); }, {passive:true});
function applyMusicUI(){ const b = $("btnMusic"); if(!b) return; b.classList.toggle("off", !musicOn); b.title = musicOn ? "배경 음악 켜짐 (누르면 끄기)" : "배경 음악 꺼짐 (누르면 켜기)"; }
$("btnMusic").addEventListener("click", e => { e.stopPropagation(); musicOn = !musicOn; applyMusicUI(); save(); unlockAudio(); bgmUpdate(); toast(musicOn ? (CH.bgm ? "🎵 배경 음악을 켰어요" : "🎵 배경 음악을 켰어요 (이 장은 아직 음악이 없어요)") : "배경 음악을 껐어요"); });
applyMusicUI();
el.btnSound.addEventListener("click", e => { e.stopPropagation(); soundOn = !soundOn; applySoundUI(); save(); if(soundOn){ unlockAudio(); sfx("select"); } });
el.btnBook.addEventListener("click", e => { e.stopPropagation(); el.book.classList.contains("open") ? closeBook() : openBook(); });
el.miniBook.addEventListener("click", e => { e.stopPropagation(); openBook(); });
el.bookClose.addEventListener("click", closeBook);
el.bookNow.addEventListener("click", () => syncBook());
el.bookSize.addEventListener("click", () => { el.book.classList.toggle("bigtext"); el.bookSize.textContent = el.book.classList.contains("bigtext") ? "가 글자 작게" : "가 글자 크게"; });
el.btnBox.addEventListener("click", e => {
  e.stopPropagation();
  const items = S.items.length ? S.items.map(k => `<div class="item"><span class="ic">${ITEMS[k].ic}</span><span><b>${ITEMS[k].name}</b><br>${esc(fill(ITEMS[k].desc))}</span></div>`).join("") : "<p>아직 모은 물건이 없어요. 이야기를 진행하면 하나씩 생겨요!</p>";
  modal("🎁 추억 상자", `<div class="items">${items}</div>${heartsHtml()}
    <p style="margin-top:10px;font-size:.84rem;color:#8a7461">✨ 숨은 장면 ${albumCount()}/${ALBUM.length} · 🎬 결말 ${["canon","imag","bal"].filter(k => P.endings[CH.key + "_" + k]).length}/3</p>`, [{label:"닫기", cls:"big alt"}]);
});
el.btnReset.addEventListener("click", e => {
  e.stopPropagation();
  modal("↺ 처음부터 다시 할까요?", "<p>지금까지의 진행과 게이지가 지워지고 1장 처음부터 시작해요.</p><p style='margin-top:6px;font-size:.85rem;color:#8a7461'>[모든 기록 지우기]를 누르면 모은 결말과 숨은 장면까지 지워져요. 여러 학생이 같은 컴퓨터를 쓸 때 사용하세요.</p>", [
    {label:"취소"},
    {label:"🧹 모든 기록 지우기", cls:"btn", fn:() => { P = freshP(); startNew(); }},
    {label:"처음부터 시작", cls:"big", fn:() => startNew()}
  ]);
});
const CARRY = ["canon","imag","hearts","met","items","flags","names","hist"];
function carry(){ const o = {}; CARRY.forEach(k => o[k] = JSON.parse(JSON.stringify(S[k]))); return o; }
function startChapter(ci, snap){
  setChapter(ci); preloadChapter();
  const base = fresh();
  S = Object.assign(base, snap ? JSON.parse(JSON.stringify(snap)) : {});
  S.ch = ci; S.started = true; S.pos = 0; S.phase = "play"; S.bg = (CH.nodes[0] && CH.nodes[0].bg) || CH.key;
  S.snap = carry();
  P.reached[CH.key] = true; P.snaps[CH.key] = S.snap;
  closeBook(); curBg = null; el.cover.classList.add("hide"); document.body.classList.remove("covering"); el.stage.hidden = false; el.report.hidden = true;
  showChapterCard(); enter(0);
}
function startNew(){ startChapter(0, null); }
function replay(){ startChapter(S.ch, S.snap); }
function nextChapter(){ if(CHAPTERS[S.ch + 1]) startChapter(S.ch + 1, carry()); }

el.fileInput.addEventListener("change", e => { handleFiles(e.target.files); e.target.value = ""; });
el.btnHelp.addEventListener("click", e => {
  e.stopPropagation();
  const has = k => imgFor(k) ? "" : "miss";
  modal("🖼️ 이미지 파일 이름 안내", `<p>이미지 이름만 맞추면 알맞은 장면에 자동으로 들어가요. 없는 장면은 내장 수채화 그림이 대신 나와요.</p>
    <p style="margin-top:8px"><b>배경 (16:9 권장)</b> · 앞에 <code>bg_</code>를 붙여도 돼요 (예: <code>bg_ch2.png</code>)</p>
    <div class="img-list">${BG_KEYS.map(k => `<span class="${has(k)}">${k}</span>`).join("")}</div>
    <p style="margin-top:4px;font-size:.8rem;color:#8a7461;line-height:1.7">1장: ch1 = 기차역 · ch1_road = 언덕길 · ch1_avenue = 가로수길 · ch1_pond = 연못 · ch1_home = 초록 지붕 집(밤)<br>2장: ch2 = 초록 지붕 집 부엌 · ch2_room = 앤의 방(동쪽 다락방) · ch2_lane = 노을 진 오솔길 · ch2_lynde = 린드 부인네 부엌 · ch2_night = 밤의 오솔길<br>3장: ch3 = 배리 씨네 거실 · ch3_path = 시냇물 건너 전나무 언덕 지름길 · ch3_garden = 배리 씨네 노을 정원 · ch3_bridge = 통나무 다리와 샘 · 인물 diana, barry<br>4장: ch4 = 에이번리 학교 교실 · ch4_birch = 자작나무 길(아침) · ch4_spruce = 가문비나무 숲(한낮) · ch4_yard = 학교 앞 하굣길 · 인물 gilbert, phillips<br>5장: ch5 = 초록 지붕 집 거실(다과상) · ch5_orchard = 가을 과수원 · ch5_dusk = 해 질 녘 배리 씨네 문간<br>6장: ch6 = 겨울밤 초록 지붕 집 부엌 · ch6_snow = 달빛 눈 들판 · ch6_barry = 배리 씨네 부엌(밤) · ch6_morning = 서리 내린 겨울 아침 오솔길 · 인물 doctor, minnie_may<br>7장: ch7 = 목사님 맞이 차 식탁 · ch7_spring = 해 질 녘 드라이어드의 샘 · ch7_garden = 앤의 꽃밭 · 인물 allan<br>8장: ch8 = 봄 저녁 초록 지붕 집 가는 길 · ch8_porch = 행상인이 온 뒷문 계단 · ch8_attic = 촛불 켜진 밤의 다락방 · 인물 anne_green_hair<br>9장: ch9 = 자작나무 곶이 있는 배리 씨네 연못 · ch9_drift = 평저선을 타고 떠내려가는 일레인 · ch9_bridge = 다리 밑 기둥(물속 그늘)</p>
    <p style="margin-top:8px"><b>캐릭터 (투명 PNG 권장 · 흰 배경은 자동으로 지워요)</b></p>
    <div class="img-list">${SPRITE_KEYS.map(k => `<span class="${has(k)}">${k}</span>`).join("")}</div>
    <p style="margin-top:8px;font-size:.82rem;color:#8a7461">초록색 = 지금 적용됨 · 회색 = 아직 없음</p>
    <p style="margin-top:8px">학생에게 나눠 줄 파일에 이미지를 넣으려면 <b>[🖼️ 폴더 이미지 불러오기]</b>로 선택한 뒤 <b>[💾 배포용 단일 HTML 저장]</b>을 누르세요.</p>`, [{label:"닫기", cls:"big alt"}]);
});

/* ---------- 배포용 단일 HTML ---------- */
async function collectImages(){
  const out = Object.assign({}, EMB);
  for(const k of Object.keys(FILES)){ if(uploaded[k] || out[k]) continue;
    try{ const b = await (await fetch(FILES[k])).blob(); out[k] = await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(b); }); }catch(e){} }
  for(const k of Object.keys(folderFound)){ if(uploaded[k] || out[k]) continue; try{ out[k] = await processImage(folderFound[k], k); }catch(e){} }
  return Object.assign(out, uploaded);
}
function buildHTML(images, student){
  const doc = new DOMParser().parseFromString(PRISTINE_HTML, "text/html");
  doc.getElementById("embedded-images").textContent = "window.EMBEDDED_IMAGES = " + JSON.stringify(images).replace(/</g, "\\u003c") + "; window.STUDENT_MODE = " + (student ? "true" : "false") + ";";
  return "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
}
el.btnExport.addEventListener("click", async e => {
  e.stopPropagation(); toast("배포용 파일을 준비하는 중이에요…");
  const images = await collectImages(), keys = Object.keys(images);
  const size = keys.reduce((s,k) => s + images[k].length, 0) / 1048576;
  const all = BG_KEYS.concat(SPRITE_KEYS), missed = Object.keys(folderFound).filter(k => !images[k]);
  let body = keys.length ? `<p>아래 <b>${keys.length}개</b> 이미지가 HTML 안에 들어가요. (약 ${size.toFixed(1)}MB)</p>`
    : `<p><b>아직 불러온 이미지가 없어요.</b> 지금 저장하면 내장 수채화 그림만 들어간 파일이 만들어져요.</p>`;
  body += `<div class="img-list">${all.map(k => `<span class="${images[k] ? "" : "miss"}">${k}</span>`).join("")}${keys.filter(k => !all.includes(k)).map(k => `<span>${esc(k)}</span>`).join("")}</div>`;
  if(missed.length) body += `<p style="margin-top:8px;color:#b9473f">같은 폴더에서 자동으로 찾은 ${esc(missed.join(", "))} 이미지는 브라우저 보안 때문에 넣지 못했어요. [🖼️ 폴더 이미지 불러오기]로 직접 선택해 주세요.</p>`;
  body += `<label class="chk"><input type="checkbox" id="chkStudent" checked style="margin-top:4px"><span>학생용으로 저장 (교사 도구 버튼 숨김)<br><span style="font-weight:500;font-size:.8rem;color:#8a7461">학생용 파일에서 교사 도구를 다시 보려면 주소 끝에 #teacher 를 붙여 열면 돼요.</span></span></label>`;
  modal("💾 배포용 단일 HTML 저장", body, [
    {label:"닫기"},
    {label:"📋 코드 복사", cls:"btn", keep:true, fn:() => copyCode(buildHTML(images, $("chkStudent").checked))},
    {label:"📱 앱용 index.html", cls:"btn", keep:true, fn:() => download(buildHTML(images, $("chkStudent").checked), "index.html")},
    {label:"💾 anne_visual_novel.html 다운로드", cls:"big", keep:true, fn:() => download(buildHTML(images, $("chkStudent").checked))}
  ]);
});
function download(html, name){
  try{
    const url = URL.createObjectURL(new Blob([html], {type:"text/html;charset=utf-8"}));
    const a = document.createElement("a"); a.href = url; a.download = name || "anne_visual_novel.html";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 4000);
    toast("다운로드를 시작했어요! 다운로드 폴더를 확인해 주세요.");
  }catch(err){ toast("이 화면에서는 다운로드가 막혀 있어요. [📋 코드 복사]를 이용해 주세요."); }
}
function copyCode(html){
  const fallback = () => {
    el.mBody.insertAdjacentHTML("beforeend", `<p style="margin-top:10px">아래 칸의 코드를 전체 선택(Ctrl+A)해서 복사한 뒤, 메모장에 붙여 넣고 <code>anne_visual_novel.html</code>로 저장하세요.</p><textarea readonly id="codeBox"></textarea>`);
    const t = $("codeBox"); t.value = html; t.focus(); t.select(); try{ if(document.execCommand("copy")) toast("코드를 복사했어요!"); }catch(e){}
  };
  if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(html).then(() => toast("코드를 복사했어요! 메모장에 붙여 넣고 anne_visual_novel.html로 저장하세요."), fallback);
  else fallback();
}

/* ---------- 모달 & 토스트 ---------- */
function modal(title, html, buttons){
  el.mTitle.textContent = title; el.mBody.innerHTML = html; el.mBtns.innerHTML = "";
  (buttons || [{label:"확인"}]).forEach(b => {
    const bt = document.createElement("button"); bt.type = "button"; bt.className = b.cls || "btn"; bt.textContent = b.label;
    bt.addEventListener("click", ev => { ev.stopPropagation(); if(!b.keep) closeModal(); if(b.fn) b.fn(); });
    el.mBtns.appendChild(bt);
  });
  el.modal.hidden = false;
}
function closeModal(){ el.modal.hidden = true; }
el.modal.addEventListener("click", e => { if(e.target === el.modal) closeModal(); });
let toastT = null;
function toast(msg){ el.toast.textContent = msg; el.toast.classList.add("show"); clearTimeout(toastT); toastT = setTimeout(() => el.toast.classList.remove("show"), 2800); }

/* =========================================================
   10. 입력
   ========================================================= */
el.dialog.addEventListener("click", e => {
  if(e.target.closest("button, input, .choices, .gl")) return;
  unlockAudio(); advance();
});
el.viewer.addEventListener("click", e => { if(e.target.closest(".cover")) return; unlockAudio(); advance(); });
el.nameOk.addEventListener("click", e => { e.stopPropagation(); submitName(); });
el.nameInput.addEventListener("keydown", e => { if(e.key === "Enter" && !e.isComposing){ e.preventDefault(); submitName(); } e.stopPropagation(); });
el.btnStart.addEventListener("click", e => { e.stopPropagation(); unlockAudio(); startNew(); });
el.btnContinue.addEventListener("click", e => { e.stopPropagation(); unlockAudio(); el.cover.classList.add("hide"); curBg = null; render(false); });
document.addEventListener("keydown", e => {
  if(!el.modal.hidden){ if(e.key === "Escape") closeModal(); return; }
  if(e.key === "Escape" && el.book.classList.contains("open")){ closeBook(); return; }
  const tag = e.target && e.target.tagName;
  if(tag === "INPUT" || tag === "TEXTAREA") return;
  if(tag === "BUTTON" && (e.key === "Enter" || e.key === " ")) return;
  if(S.phase === "choice" && /^[1-3]$/.test(e.key) && el.cover.classList.contains("hide")){ const b = el.choiceList.querySelectorAll(".choice")[+e.key - 1]; if(b) b.click(); return; }
  if(e.key === "Enter" || e.key === " " || e.key === "ArrowRight"){
    e.preventDefault();
    if(S.phase === "report") return;
    if(!el.cover.classList.contains("hide")){ S.started && S.phase !== "cover" ? el.btnContinue.click() : startNew(); return; }
    advance();
  }
});

/* =========================================================
   11. 시작
   ========================================================= */
if(window.STUDENT_MODE && location.hash !== "#teacher") document.body.classList.add("student");
window.addEventListener("hashchange", () => document.body.classList.toggle("student", !!window.STUDENT_MODE && location.hash !== "#teacher"));
window.__anne = {state:() => S, node:() => curNode(), persist:() => P, process:(src, key) => processImage(src, key), start:(ci, snap) => startChapter(ci, snap), mid:() => renderMidReport(), bgm:() => ({cur:BGM.cur, paused:BGM.el ? BGM.el.paused : null, t:BGM.el ? BGM.el.currentTime : 0, gain:BGM.gain ? BGM.gain.gain.value : (BGM.el ? BGM.el.volume : null)}), uploaded:() => uploaded, exportHTML:student => collectImages().then(im => buildHTML(im, student))};
/* 홈 화면 앱(웹앱): 인터넷 주소로 열었을 때만 오프라인 기능을 켭니다. 파일로 열면 그냥 지나갑니다. */
if("serviceWorker" in navigator && /^https?:$/.test(location.protocol)){
  const hadCtl = !!navigator.serviceWorker.controller; let reloaded = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => { if(hadCtl && !reloaded){ reloaded = true; location.reload(); } });
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js", {updateViaCache:"none"}).then(r => r.update()).catch(() => {}));
}
load(); preloadChapter(); probeFolder(); warmCache(); applyLevelUI(); applySoundUI(); applyFxUI(); applyMusicUI(); updateGauge();
renderCover();
})();
