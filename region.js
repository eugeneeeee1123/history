/* ============================================================
   THE ARCHIVUM · 史阅 — region.js
   Renders one continent page. Expects a global REGION_KEY
   ('asia' | 'europe' | 'americas') defined before this script.
   ============================================================ */
(function(){
  "use strict";
  const region = REGIONS[REGION_KEY];
  if(!region){
    document.addEventListener('DOMContentLoaded', ()=>{
      $('#civHero').innerHTML = `<div class="region-unavailable">该区域的档案资料尚未收录。</div>`;
    });
    return;
  }
  const subCivs = region.civs.map(k=>CIVS[k]);
  const state = { civKey: subCivs[0].key, filter: 'all' };

  // honour a deep-link era hash so the right tab is active on load
  const em = location.hash.match(/^#e=([\w-]+):([\w-]+)/);
  if(em && region.civs.includes(em[1])) state.civKey = em[1];

  function activeCiv(){ return CIVS[state.civKey]; }

  function regionStats(){
    const eras = subCivs.reduce((n,c)=>n+c.eras.length,0);
    const figs = subCivs.reduce((n,c)=>n+c.eras.reduce((m,e)=>m+e.figures.length,0),0);
    return {eras, figs};
  }

  function renderHero(){
    const {eras, figs} = regionStats();
    const hero = $('#civHero');
    hero.style.setProperty('--civ', region.color);
    hero.style.setProperty('--civ-soft', region.colorSoft);
    hero.className = `civ-hero region-hero region-${region.key}-hero`;
    hero.innerHTML = `
      <a class="back-link" href="index.html">← ${t('back')}</a>
      <div class="civ-hero-eyebrow">${esc(region.sub)}</div>
      <h2 class="civ-hero-title">${esc(region.nameEn)}</h2>
      <div class="civ-hero-sub">${esc(region.nameZh)}</div>
      <p class="civ-hero-desc">${esc(region.tagline)}</p>
      <div class="region-hero-mark" aria-hidden="true">${esc(region.glyph)}</div>`;
  }

  function catCounts(civ){
    const counts = {};
    civ.eras.forEach(e=> e.figures.forEach(f=>{
      const p = PERSON[f.key];
      if(!p) return;
      counts[p.cat] = (counts[p.cat]||0)+1;
    }));
    return counts;
  }

  function renderSidebar(){
    const civ = activeCiv();
    let switcherHTML = '';
    if(subCivs.length > 1){
      switcherHTML = `
        <div class="sb-label">${t('sb.switch')}</div>
        <div class="sb-switch">
          ${subCivs.map(c=>`
            <button class="sb-switch-item ${c.key===civ.key?'active':''}" data-subciv="${c.key}" style="--civ:${c.color}">
              <span class="sb-switch-glyph">${c.glyph}</span>${esc(c.nameZh)}
            </button>`).join('')}
        </div>`;
    }

    const counts = catCounts(civ);
    const catKeys = Object.keys(CATS).filter(k=> counts[k]);
    const totalFigs = Object.values(counts).reduce((a,b)=>a+b,0);
    const filters = [`<button class="sb-filter ${state.filter==='all'?'active':''}" data-filter="all" style="--civ:${civ.color}"><span>${t('filter.all')}</span><span class="sb-filter-count">${totalFigs}</span></button>`]
      .concat(catKeys.map(k=>`
        <button class="sb-filter ${state.filter===k?'active':''}" data-filter="${k}" style="--civ:${civ.color}">
          <span>${esc(CATS[k][APP.lang])}</span><span class="sb-filter-count">${counts[k]}</span>
        </button>`)).join('');

    const index = civ.eras.map(e=>`
      <button class="sb-index-item" data-scroll-era="${e.era_key}" style="--civ:${civ.color}">
        ${esc(e.name.split('(')[0].split('—')[0].trim())}
      </button>`).join('');

    $('#civSidebar').innerHTML = `
      ${switcherHTML}
      <div class="region-control-block"><div class="sb-label">${t('sb.filter')}</div><div class="sb-filters">${filters}</div></div>
      <div class="region-control-block region-index-block"><div class="sb-label">${t('sb.index')}</div><div class="sb-index">${index}</div></div>`;
  }

  function figureMatchesFilter(key){
    if(state.filter==='all') return true;
    const p = PERSON[key];
    return p && p.cat === state.filter;
  }

  function eraLayout(index){
    const layouts = {
      asia:['atlas-feature','atlas-tower','atlas-wide','atlas-standard','atlas-standard'],
      europe:['europe-manifesto','europe-column','europe-slab','europe-column','europe-wide'],
      americas:['americas-lead','americas-rise','americas-river','americas-rise','americas-wide'],
      africa:['africa-monument','africa-sun','africa-sun','africa-horizon','africa-wide']
    };
    const pattern = layouts[region.key] || layouts.asia;
    return pattern[index % pattern.length];
  }

  function renderEraFolio(civ, era, index){
    const visibleFigs = era.figures.filter(f=> figureMatchesFilter(f.key));
    if(state.filter!=='all' && visibleFigs.length===0) return '';
    const shown = visibleFigs.slice(0,6);
    const extra = visibleFigs.length - shown.length;
    const pills = shown.map(f=>`
      <button class="roster-pill" data-person="${f.key}" style="--civ:${civ.color}">
        <span class="dot"></span>${esc(f.name.split(' ')[0])}
      </button>`).join('');
    const moreTag = extra>0 ? `<span class="folio-more">+${extra} ${t('more')}</span>` : '';
    return `
      <article class="era-folio ${eraLayout(index)} ${era.hero?'hero-era':''}" data-era="${era.era_key}" style="--civ:${civ.color}">
        <div class="folio-body">
          <div class="folio-date ${era.blood?'blood-flag':''}">${esc(era.date)}</div>
          <h3 class="folio-name">${esc(era.name)}</h3>
          <p class="folio-text">${esc(era.text)}</p>
          <div class="folio-roster">${pills}${moreTag}</div>
        </div>
        <div class="folio-open">${t('era.open')}</div>
      </article>`;
  }

  function renderMain(){
    const civ = activeCiv();
    $('#civMain').innerHTML = `<div class="era-archive region-${region.key}-archive">${civ.eras.map((e,i)=>renderEraFolio(civ,e,i)).join('')}</div>`;
  }

  function renderAll(){
    renderHero();
    renderSidebar();
    renderMain();
  }

  document.addEventListener('click', (e)=>{
    const subCivBtn = e.target.closest('[data-subciv]');
    if(subCivBtn){ state.civKey = subCivBtn.dataset.subciv; state.filter='all'; renderSidebar(); renderMain(); window.scrollTo({top:0,behavior:'smooth'}); return; }

    const filterBtn = e.target.closest('[data-filter]');
    if(filterBtn){ state.filter = filterBtn.dataset.filter; renderSidebar(); renderMain(); return; }

    const scrollEraBtn = e.target.closest('[data-scroll-era]');
    if(scrollEraBtn){
      const target = $(`.era-folio[data-era="${scrollEraBtn.dataset.scrollEra}"]`);
      if(target) target.scrollIntoView({behavior:'smooth', block:'center'});
      return;
    }
    const folio = e.target.closest('.era-folio');
    if(folio && !e.target.closest('.roster-pill')){
      openEraDrawer(state.civKey, folio.dataset.era);
      return;
    }
  });

  window.onLangChange = renderAll;
  document.addEventListener('DOMContentLoaded', renderAll);
})();
