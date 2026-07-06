/* ============================================================
   THE ARCHIVUM · 史阅 — gallery.js
   Full roster of 121 figures, filterable by continent & role.
   ============================================================ */
(function(){
  "use strict";
  const state = { region:'all', cat:'all' };

  const ALL = Object.entries(PERSON).map(([key,p])=>{
    const loc = findPersonLocation(key);
    const region = loc ? regionOfCiv(loc.civ.key) : null;
    return { key, p, loc, region };
  });

  function renderFilters(){
    const regionChips = [{key:'all', label:t('filter.all')}].concat(REGION_LIST.map(r=>({key:r.key, label:r.nameZh})));
    $('#galRegionFilters').innerHTML = regionChips.map(c=>`
      <button class="sb-filter ${state.region===c.key?'active':''}" data-gal-region="${c.key}">
        <span>${esc(c.label)}</span>
      </button>`).join('');

    const catKeys = Object.keys(CATS);
    const catChips = [{key:'all', label:t('filter.all')}].concat(catKeys.map(k=>({key:k, label:CATS[k][APP.lang]})));
    $('#galCatFilters').innerHTML = catChips.map(c=>`
      <button class="sb-filter ${state.cat===c.key?'active':''}" data-gal-cat="${c.key}">
        <span>${esc(c.label)}</span>
      </button>`).join('');
  }

  function renderGrid(){
    const list = ALL.filter(item=>{
      if(state.region!=='all' && (!item.region || item.region.key!==state.region)) return false;
      if(state.cat!=='all' && item.p.cat!==state.cat) return false;
      return true;
    });
    $('#galCount').textContent = list.length + ' ' + t('gallery.count');
    $('#galGrid').innerHTML = list.map(item=>{
      const color = item.p.color || '#c9a35f';
      return `
      <button class="gal-card" data-person="${item.key}" style="--civ:${color}">
        <div class="gal-seal">${sealSVG(item.p.name[0], color, 60)}</div>
        <div class="gal-name">${esc(item.p.name)}</div>
        <div class="gal-en">${esc(item.p.en)}</div>
        <div class="gal-meta">${item.loc?esc(item.loc.civ.nameZh):''}</div>
        <div class="gal-stars">${starRow(item.p.stars, color)}</div>
      </button>`;
    }).join('');
  }

  function renderAll(){ renderFilters(); renderGrid(); }

  document.addEventListener('click', (e)=>{
    const rBtn = e.target.closest('[data-gal-region]');
    if(rBtn){ state.region = rBtn.dataset.galRegion; renderAll(); return; }
    const cBtn = e.target.closest('[data-gal-cat]');
    if(cBtn){ state.cat = cBtn.dataset.galCat; renderAll(); return; }
  });

  window.onLangChange = renderAll;
  document.addEventListener('DOMContentLoaded', renderAll);
})();
