/* ============================================================
   THE ARCHIVUM · 史阅 — home.js
   ============================================================ */
(function(){
  "use strict";

  function totalEras(){ return REGION_LIST.reduce((n,r)=>n+r.civs.reduce((m,ck)=>m+CIVS[ck].eras.length,0),0); }

  function renderStats(){
    const items = [
      { num: REGION_LIST.length, label: t('stat.civ') },
      { num: totalEras(), label: t('stat.era') },
      { num: Object.keys(PERSON).length, label: t('stat.fig') },
      { num: '3100 BC – 1949 AD', label: t('stat.span') },
    ];
    $('#statsStrip').innerHTML = items.map(i=>`
      <div class="stat-cell"><div class="stat-num">${i.num}</div><div class="stat-label">${esc(i.label)}</div></div>`).join('');
  }

  function renderRegionGrid(){
    $('#civGrid').innerHTML = REGION_LIST.map(r=>{
      const eras = r.civs.reduce((n,ck)=>n+CIVS[ck].eras.length,0);
      const figs = r.civs.reduce((n,ck)=>n+CIVS[ck].eras.reduce((m,e)=>m+e.figures.length,0),0);
      return `
      <a class="civ-card big" href="${r.key}.html" style="--civ:${r.color};--civ-soft:${r.colorSoft}">
        <div class="civ-card-tex"></div>
        <div class="civ-card-glyph">${r.glyph}</div>
        <div class="civ-card-index">VOL. ${r.roman} — ${esc(r.sub)}</div>
        <h3 class="civ-card-title">${esc(r.nameEn)}<br>${esc(r.nameZh)}</h3>
        <div class="civ-card-desc">${esc(r.tagline)}</div>
        <div class="civ-card-foot">
          <span>${eras} ${t('stat.era')} · ${figs} ${t('stat.fig')}</span>
          <span class="go">${t('enter')} →</span>
        </div>
      </a>`;
    }).join('');
  }

  function renderUtilityRow(){
    const items = [
      { href:'gallery.html', glyph:'☰', title: t('nav.gallery'), desc: {zh:`全部 ${Object.keys(PERSON).length} 位人物一览，按大洲与身份筛选。`, en:`All ${Object.keys(PERSON).length} figures - filter by continent or role.`}[APP.lang] },
      { href:'about.html',   glyph:'ⓘ', title: t('nav.about'),   desc: {zh:'这份档案是如何编纂的，以及它的取材与局限。', en:'How this archive was compiled, its sources and limits.'}[APP.lang] },
      { href:'contact.html', glyph:'✉', title: t('nav.contact'), desc: {zh:'指正史实、提出建议，或只是打个招呼。', en:'Report an error, suggest an entry, or just say hello.'}[APP.lang] },
    ];
    $('#utilityGrid').innerHTML = items.map(i=>`
      <a class="util-card" href="${i.href}">
        <div class="util-glyph">${i.glyph}</div>
        <div class="util-title">${esc(i.title)}</div>
        <div class="util-desc">${esc(i.desc)}</div>
        <div class="util-go">→</div>
      </a>`).join('');
  }

  const SPOTLIGHT = [
    ['china','shang'], ['europe','roman-empire'], ['arabia','ancient-egypt'],
    ['malaysia','malacca-sultanate'], ['americas','maya-classic-period'], ['china','qin'],
    ['americas','europe-era-6'], ['malaysia','zheng-he-s-voyages']
  ];
  function renderRail(){
    $('#homeRail').innerHTML = SPOTLIGHT.map(([civKey, eraKey])=>{
      const civ = CIVS[civKey];
      const era = civ.eras.find(e=>e.era_key===eraKey);
      if(!era) return '';
      const region = regionOfCiv(civKey);
      return `
      <a class="rail-item" href="${region.key}.html#e=${civKey}:${eraKey}" style="--civ:${civ.color}">
        <div class="rail-date">${esc(era.date)}</div>
        <div class="rail-name">${esc(era.name.split('(')[0].split('—')[0].trim())}</div>
        <div class="rail-civ">${civ.glyph} ${esc(civ.nameEn)}</div>
      </a>`;
    }).join('');
  }

  function renderAll(){
    renderStats();
    renderRegionGrid();
    renderUtilityRow();
    renderRail();
  }

  $('#heroAstrolabe') && ($('#heroAstrolabe').innerHTML = heroAstrolabeSVG());
  window.onLangChange = renderAll;
  document.addEventListener('DOMContentLoaded', renderAll);
})();
