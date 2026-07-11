/* ============================================================
   THE ARCHIVUM · 史阅 — common.js
   Shared across every page: nav, i18n, seal graphics, drawers, search.
   Load order on every page: data.js -> common.js -> (page script)
   ============================================================ */
const $  = (sel,root)=> (root||document).querySelector(sel);
const $$ = (sel,root)=> Array.from((root||document).querySelectorAll(sel));
const esc = (s)=> (s==null?'':String(s)).replace(/[&<>"]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const CIVS    = CHRONICLE_DATA.civs;
const PERSON  = CHRONICLE_DATA.persons;
const CATS    = CHRONICLE_DATA.catLabels;
const REGIONS = CHRONICLE_DATA.regions;
const REGION_LIST = ['asia','europe','americas','africa'].map(k=>REGIONS[k]).filter(Boolean);

const APP = { lang: (localStorage.getItem('archivum_lang') || 'zh') };

/* ------------------------------------------------------------
   i18n — interface chrome only (archival content stays as authored)
   ------------------------------------------------------------ */
const I18N = {
  zh: {
    'nav.home':'首页','nav.asia':'亚洲','nav.europe':'欧洲','nav.americas':'美洲','nav.africa':'非洲',
    'nav.gallery':'人物画廊','nav.about':'关于','nav.contact':'联系我们','nav.search':'检索',
    'hero.eyebrow':'A LEDGER OF EMPIRES · 帝国的账簿',
    'hero.desc':'从尼罗河到长安城，从马六甲海峡到安第斯雨林，这是一部收录 163 位真实与传说人物的编年史档案，按大陆、文明与身份重新编目。',
    'hero.cta':'开始查阅 →','hero.scroll':'浏览四大洲卷宗',
    'archive.eyebrow':'FOUR CONTINENTS','archive.title':'卷宗总览',
    'archive.note':'每一卷收录一个大陆区域的完整时代脉络与代表人物，点击展开。',
    'more.eyebrow':'MORE FROM THE ARCHIVUM','more.title':'更多内容',
    'rail.eyebrow':'SELECTED ENTRIES','rail.title':'跨文明重要时代',
    'footer.note':'内容为历史重述与部分文学改编，用于个人作品展示',
    'stat.civ':'大洲卷宗','stat.era':'历史时代','stat.fig':'收录人物','stat.span':'年代跨度',
    'enter':'展开卷宗','back':'返回首页',
    'sb.switch':'文明分区','sb.filter':'按身份筛选','sb.index':'时代索引','filter.all':'全部',
    'era.open':'展开时代 →','era.figures':'收录人物','more':'其他',
    'ed.desc':'时代概述','ed.figures':'人物名录',
    'pd.bio':'生平简述','pd.events':'大事记年','pd.quote':'留言',
    'search.hint':'按名称搜索 4 大区域 · 68 个时代 · 163 位人物',
    'search.empty':'未找到匹配的记录','search.eras':'时代','search.figures':'人物',
    'search.placeholder':'搜索时代、人物、朝代……',
    'gallery.eyebrow':'THE FULL ROSTER','gallery.title':'人物画廊',
    'gallery.note':'全部 163 位人物一览，可按大洲与身份筛选。',
    'gallery.filter.region':'按大洲','gallery.filter.cat':'按身份','gallery.count':'位人物',
    'about.eyebrow':'ABOUT THIS ARCHIVE','about.title':'关于史阅',
    'contact.eyebrow':'GET IN TOUCH','contact.title':'联系我们',
  },
  en: {
    'nav.home':'Home','nav.asia':'Asia','nav.europe':'Europe','nav.americas':'Americas','nav.africa':'Africa',
    'nav.gallery':'Gallery','nav.about':'About','nav.contact':'Contact','nav.search':'Search',
    'hero.eyebrow':'A LEDGER OF EMPIRES',
    'hero.desc':'From the Nile to Chang\'an, from the Strait of Malacca to the Andean jungle, an archive of 163 historical and legendary figures, catalogued by continent, civilization and role.',
    'hero.cta':'Enter the Archive →','hero.scroll':'Browse the four volumes',
    'archive.eyebrow':'FOUR CONTINENTS','archive.title':'The Archive',
    'archive.note':'Each volume holds one continent\'s full timeline and its defining figures. Click to open.',
    'more.eyebrow':'MORE FROM THE ARCHIVUM','more.title':'More',
    'rail.eyebrow':'SELECTED ENTRIES','rail.title':'Cross-Civilization Highlights',
    'footer.note':'Content is historical retelling with some literary adaptation, for personal portfolio use',
    'stat.civ':'Volumes','stat.era':'Eras','stat.fig':'Figures','stat.span':'Time Span',
    'enter':'Enter volume','back':'Back to Home',
    'sb.switch':'Civilizations','sb.filter':'Filter by Role','sb.index':'Era Index','filter.all':'All',
    'era.open':'Open era →','era.figures':'Figures','more':'more',
    'ed.desc':'Overview','ed.figures':'Figures of this Era',
    'pd.bio':'Biography','pd.events':'Timeline','pd.quote':'Recorded Words',
    'search.hint':'Search across 4 regions · 68 eras · 163 figures',
    'search.empty':'No matching records','search.eras':'Eras','search.figures':'Figures',
    'search.placeholder':'Search eras, figures, dynasties…',
    'gallery.eyebrow':'THE FULL ROSTER','gallery.title':'Figure Gallery',
    'gallery.note':'All 163 figures at a glance - filter by continent or role.',
    'gallery.filter.region':'By continent','gallery.filter.cat':'By role','gallery.count':'figures',
    'about.eyebrow':'ABOUT THIS ARCHIVE','about.title':'About The Archivum',
    'contact.eyebrow':'GET IN TOUCH','contact.title':'Contact',
  }
};
const t = (k)=> (I18N[APP.lang] && I18N[APP.lang][k]) || k;

function applyStaticI18N(){
  $$('[data-i18n]').forEach(el=>{ el.textContent = t(el.dataset.i18n); });
  const si = $('#searchInput');
  if(si) si.placeholder = t('search.placeholder');
  $$('.tbtn[data-nav-key]').forEach(el=>{
    const label = el.querySelector('.full');
    if(label) label.textContent = t('nav.'+el.dataset.navKey);
  });
}

/* ------------------------------------------------------------
   Seal motif — used for civ icons, era numerals, portraits
   ------------------------------------------------------------ */
function sealSVG(glyph, color, size, opts){
  opts = opts || {};
  const s = size || 56;
  const c = s/2;
  const rOuter = c - 2, rInner = c - 9;
  const ticks = [];
  const tickCount = opts.ticks || 24;
  for(let i=0;i<tickCount;i++){
    const a = (i/tickCount) * Math.PI*2;
    const x1 = c + Math.cos(a)*(rOuter-1), y1 = c + Math.sin(a)*(rOuter-1);
    const x2 = c + Math.cos(a)*(rOuter-4), y2 = c + Math.sin(a)*(rOuter-4);
    ticks.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="1" opacity="0.55"/>`);
  }
  return `<svg width="${s}" height="${s}" viewBox="0 0 ${s} ${s}" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${c}" cy="${c}" r="${rOuter}" stroke="${color}" stroke-width="1" opacity="0.6"/>
    <circle cx="${c}" cy="${c}" r="${rInner}" stroke="${color}" stroke-width="1" stroke-dasharray="2 3" opacity="0.75"/>
    ${ticks.join('')}
    <text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" font-family="Fraunces, Noto Serif SC, serif" font-size="${s*0.34}" fill="${color}" font-weight="600">${esc(glyph)}</text>
  </svg>`;
}

function heroAstrolabeSVG(){
  const rings = [240,195,150];
  let inner = '';
  rings.forEach((r,i)=>{ inner += `<circle cx="240" cy="240" r="${r}" stroke="#c9a35f" stroke-width="1" opacity="${0.35-i*0.08}"/>`; });
  let ticks = '';
  for(let i=0;i<48;i++){
    const a = (i/48)*Math.PI*2;
    const len = i%4===0 ? 14:6;
    const x1 = 240+Math.cos(a)*236, y1=240+Math.sin(a)*236;
    const x2 = 240+Math.cos(a)*(236-len), y2=240+Math.sin(a)*(236-len);
    ticks += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#c9a35f" stroke-width="1" opacity="0.4"/>`;
  }
  let spokes='';
  for(let i=0;i<12;i++){
    const a=(i/12)*Math.PI*2;
    const x=240+Math.cos(a)*150, y=240+Math.sin(a)*150;
    spokes += `<line x1="240" y1="240" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#c9a35f" stroke-width="0.6" opacity="0.18"/>`;
  }
  return `<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
    ${spokes}${inner}${ticks}
    <circle cx="240" cy="240" r="4" fill="#eccb84"/>
    <text x="240" y="245" text-anchor="middle" font-family="Fraunces, serif" font-size="30" fill="#c9a35f" opacity="0.5" font-weight="600">史</text>
  </svg>`;
}

function starRow(stars, color){
  const full = '★'.repeat(stars), empty = '☆'.repeat(5-stars);
  return `<span style="color:${color}">${full}<span style="opacity:.3">${empty}</span></span>`;
}

/* ------------------------------------------------------------
   Helper: locate which civ/era a person belongs to (first match)
   ------------------------------------------------------------ */
function findPersonLocation(key){
  for(const civ of Object.values(CIVS)){
    for(const era of civ.eras){
      if(era.figures.some(f=>f.key===key)) return { civ, era };
    }
  }
  return null;
}
function regionOfCiv(civKey){
  return REGION_LIST.find(r=>r.civs.includes(civKey));
}

/* ------------------------------------------------------------
   DRAWER / SCRIM plumbing
   ------------------------------------------------------------ */
function openDrawer(id){
  $('#'+id).classList.add('active');
  $('#scrim').classList.add('active');
  document.body.classList.add('lock');
}
function closeDrawers(){
  $$('.drawer').forEach(d=>d.classList.remove('active'));
  $('#scrim').classList.remove('active');
  document.body.classList.remove('lock');
}

/* ------------------------------------------------------------
   ERA DRAWER
   ------------------------------------------------------------ */
function openEraDrawer(civKey, eraKey){
  const civ = CIVS[civKey];
  if(!civ) return;
  const era = civ.eras.find(e=>e.era_key===eraKey);
  if(!era) return;
  const figs = era.figures.map(f=>{
    const p = PERSON[f.key];
    if(!p) return '';
    return `
    <div class="ed-fig-card" data-person="${f.key}">
      <div class="seal" style="color:${civ.color}">${sealSVG(p.name[0], civ.color, 48)}</div>
      <div>
        <div class="ed-fig-name">${esc(p.name)}</div>
        <div class="ed-fig-en">${esc(p.en)}</div>
        <div class="ed-fig-desc">${esc(f.desc)}</div>
        <div class="ed-fig-stars">${starRow(p.stars, civ.color)}</div>
      </div>
    </div>`;
  }).join('');

  const drawer = $('#eraDrawer');
  drawer.style.setProperty('--civ', civ.color);
  drawer.style.setProperty('--civ-soft', civ.colorSoft);
  $('#eraDrawerContent').innerHTML = `
    <div class="ed-hero">
      <div class="ed-eyebrow">${esc(civ.nameEn)} · ${esc(civ.sub)}</div>
      <h2 class="ed-title">${esc(era.name)}</h2>
      <div class="ed-date">${esc(era.date)}</div>
    </div>
    <div class="ed-body">
      <p class="ed-desc">${esc(era.text)}</p>
      <div class="ed-section-label">${t('ed.figures')} · ${era.figures.length}</div>
      <div class="ed-figures">${figs}</div>
    </div>`;
  openDrawer('eraDrawer');
}

/* ------------------------------------------------------------
   PERSON DRAWER
   ------------------------------------------------------------ */
function openPersonDrawer(key){
  const p = PERSON[key];
  if(!p) return;
  const color = p.color || '#c9a35f';
  const events = (p.events||[]).map(ev=>`
    <div class="pd-event">
      <div class="pd-event-year" style="color:${color}">${esc(ev.y)}</div>
      <div class="pd-event-desc">${esc(ev.e)}</div>
    </div>`).join('');

  $('#personDrawer').style.setProperty('--civ', color);
  $('#personDrawerContent').innerHTML = `
    <div class="pd-hero">
      <div class="pd-seal-wrap" style="color:${color}">${sealSVG(p.name[0], color, 84, {ticks:30})}</div>
      <div class="pd-heading">
        <div class="pd-eyebrow">${esc(CATS[p.cat] ? CATS[p.cat][APP.lang] : '')}</div>
        <h2 class="pd-name" style="color:${color}">${esc(p.name)}</h2>
        <div class="pd-en">${esc(p.en)}</div>
        <div class="pd-era">${esc(p.era)}</div>
        <div class="pd-stars">${starRow(p.stars, color)}</div>
        <div class="pd-badge" style="color:${color}">${esc(p.badge)}</div>
      </div>
    </div>
    <div class="pd-body">
      <div class="pd-section-label">${t('pd.bio')}</div>
      <p class="pd-bio">${esc(p.bio)}</p>
      <div class="pd-section-label">${t('pd.events')}</div>
      <div class="pd-events">${events}</div>
      <div class="pd-section-label">${t('pd.quote')}</div>
      <div class="pd-quote" style="color:${color}">
        <div class="pd-quote-text">「${esc(p.quote)}」</div>
        <div class="pd-quote-attr">— ${esc(p.attr)}</div>
      </div>
    </div>`;
  openDrawer('personDrawer');
}

/* ------------------------------------------------------------
   SEARCH (site-wide index, works the same on every page)
   ------------------------------------------------------------ */
function buildSearchIndex(){
  const eras = [];
  const figs = [];
  Object.values(CIVS).forEach(civ=>{
    civ.eras.forEach(era=>{
      eras.push({ civKey:civ.key, eraKey:era.era_key, name:era.name, date:era.date, civ });
    });
  });
  Object.entries(PERSON).forEach(([key,p])=>{
    const loc = findPersonLocation(key);
    figs.push({ key, name:p.name, en:p.en, era:p.era, loc });
  });
  return { eras, figs };
}
const SEARCH_INDEX = buildSearchIndex();

function pageForCiv(civKey){
  const r = regionOfCiv(civKey);
  return r ? (r.key+'.html') : 'index.html';
}

function runSearch(query){
  const q = query.trim().toLowerCase();
  const box = $('#searchResults');
  if(!box) return;
  if(!q){ box.innerHTML = ''; return; }
  const eraHits = SEARCH_INDEX.eras.filter(e=> e.name.toLowerCase().includes(q) || e.date.toLowerCase().includes(q)).slice(0,8);
  const figHits = SEARCH_INDEX.figs.filter(f=> f.name.toLowerCase().includes(q) || (f.en||'').toLowerCase().includes(q)).slice(0,10);

  if(!eraHits.length && !figHits.length){
    box.innerHTML = `<div class="search-empty">${t('search.empty')}</div>`;
    return;
  }
  let html = '';
  if(figHits.length){
    html += `<div class="sr-group-label">${t('search.figures')}</div>`;
    html += figHits.map(f=>`
      <button class="sr-item" data-search-person="${f.key}" data-goto="${f.loc?pageForCiv(f.loc.civ.key):''}">
        <span class="sr-item-name">${esc(f.name)} <span style="opacity:.5">${esc(f.en||'')}</span></span>
        <span class="sr-item-meta">${f.loc?esc(f.loc.civ.nameZh):''}</span>
      </button>`).join('');
  }
  if(eraHits.length){
    html += `<div class="sr-group-label">${t('search.eras')}</div>`;
    html += eraHits.map(e=>`
      <button class="sr-item" data-search-era="${e.civKey}|${e.eraKey}" data-goto="${pageForCiv(e.civKey)}">
        <span class="sr-item-name">${esc(e.name)}</span>
        <span class="sr-item-meta">${esc(e.civ.nameZh)} · ${esc(e.date)}</span>
      </button>`).join('');
  }
  box.innerHTML = html;
}

function openSearch(){
  $('#searchOverlay').classList.add('active');
  document.body.classList.add('lock');
  setTimeout(()=> $('#searchInput') && $('#searchInput').focus(), 60);
}
function closeSearch(){
  $('#searchOverlay').classList.remove('active');
  if(!$$('.drawer.active').length) document.body.classList.remove('lock');
  const si = $('#searchInput'); if(si) si.value = '';
  const sr = $('#searchResults'); if(sr) sr.innerHTML = '';
}

/* Current page file name, used to mark active nav + decide same-page vs cross-page open */
function currentPage(){
  const p = location.pathname.split('/').pop();
  return p === '' ? 'index.html' : p;
}
function markActiveNav(){
  const cur = currentPage();
  $$('.topnav [data-page]').forEach(el=>{
    el.classList.toggle('active-nav', el.dataset.page === cur);
  });
}

/* ------------------------------------------------------------
   GLOBAL EVENT WIRING (present on every page)
   ------------------------------------------------------------ */
function wireCommon(){
  $('#brandSeal') && ($('#brandSeal').innerHTML = sealSVG('史', '#c9a35f', 30, {ticks:16}));
  applyStaticI18N();
  markActiveNav();
  $('#langToggle').textContent = APP.lang==='zh' ? 'EN' : '中';

  document.addEventListener('click', (e)=>{
    if(e.target.id==='searchToggle' || e.target.closest('#searchToggle')){ openSearch(); return; }
    if(e.target.id==='searchClose'){ closeSearch(); return; }
    if(e.target.id==='eraDrawerClose' || e.target.id==='personDrawerClose' || e.target.id==='scrim'){ closeDrawers(); return; }

    const personEl = e.target.closest('[data-person]');
    if(personEl){ openPersonDrawer(personEl.dataset.person); return; }

    const searchPersonEl = e.target.closest('[data-search-person]');
    if(searchPersonEl){
      const goto = searchPersonEl.dataset.goto;
      if(goto && goto !== currentPage()){
        location.href = goto + '#p=' + searchPersonEl.dataset.searchPerson;
        return;
      }
      closeSearch();
      openPersonDrawer(searchPersonEl.dataset.searchPerson);
      return;
    }
    const searchEraEl = e.target.closest('[data-search-era]');
    if(searchEraEl){
      const [civKey, eraKey] = searchEraEl.dataset.searchEra.split('|');
      const goto = searchEraEl.dataset.goto;
      if(goto && goto !== currentPage()){
        location.href = goto + '#e=' + civKey + ':' + eraKey;
        return;
      }
      closeSearch();
      openEraDrawer(civKey, eraKey);
      return;
    }
  });

  const si = $('#searchInput');
  if(si) si.addEventListener('input', (e)=> runSearch(e.target.value));

  $('#langToggle').addEventListener('click', ()=>{
    APP.lang = APP.lang==='zh' ? 'en' : 'zh';
    localStorage.setItem('archivum_lang', APP.lang);
    $('#langToggle').textContent = APP.lang==='zh' ? 'EN' : '中';
    applyStaticI18N();
    if(typeof onLangChange === 'function') onLangChange();
  });

  document.addEventListener('keydown', (e)=>{
    if(e.key !== 'Escape') return;
    if($('#searchOverlay') && $('#searchOverlay').classList.contains('active')){ closeSearch(); return; }
    if($$('.drawer.active').length){ closeDrawers(); return; }
  });

  // deep-link: #p=key opens a person drawer, #e=civ:era opens an era drawer
  const hash = location.hash;
  const pm = hash.match(/^#p=([\w-]+)/);
  const em = hash.match(/^#e=([\w-]+):([\w-]+)/);
  if(pm) setTimeout(()=>openPersonDrawer(pm[1]), 80);
  if(em) setTimeout(()=>openEraDrawer(em[1], em[2]), 80);
}

document.addEventListener('DOMContentLoaded', wireCommon);
