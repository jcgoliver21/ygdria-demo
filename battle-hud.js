/* Independent illustrated components; atlas contains no gameplay data. */
(() => {
  const atlas = 'assets/ui/hud-ornament-atlas-v1.png';
  const parts = {
    title: [0,0,245,103], panel: [245,9,125,80], diamond: [489,0,101,106],
    cell: [175,989,96,73], hp: [14,968,128,462], card: [799,989,128,96],
    button: [933,1000,43,43], history: [24,1433,970,52], console: [0,974,1024,462],
  };
  let sequence = 0;
  function jewel(orb) {
    if(orb.querySelector('.hud-gem-art')) return;
    const original=orb.querySelector('.orb-icon');
    if(!original) return;
    const id=`hud-jewel-${++sequence}`;
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('hud-gem-art'); svg.setAttribute('viewBox','0 0 100 100'); svg.setAttribute('aria-hidden','true');
    svg.innerHTML=`<defs><radialGradient id="${id}-glass" cx="40%" cy="20%" r="85%"><stop stop-color="var(--orb-light)"/><stop offset=".62" stop-color="color-mix(in srgb,var(--orb) 55%,#15101f)"/><stop offset="1" stop-color="var(--orb-dark)"/></radialGradient><linearGradient id="${id}-symbol" x2=".3" y2="1"><stop stop-color="#fff7fe"/><stop offset=".35" stop-color="var(--orb-light)"/><stop offset=".66" stop-color="var(--orb-light)"/><stop offset="1" stop-color="var(--orb-light)"/></linearGradient><filter id="${id}-glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.2"/></filter></defs><g class="hud-glass-shell"><circle cx="50" cy="50" r="44" fill="url(#${id}-glass)" stroke="var(--orb)" stroke-width="4"/><circle cx="50" cy="50" r="43" fill="none" stroke="var(--orb-light)" stroke-width="1.3"/><path d="M18 46C18 22 38 12 54 16M57 87C80 82 88 65 86 49" fill="none" stroke="var(--orb-light)" stroke-width="1.8" opacity=".65"/></g><g transform="translate(14 14) scale(3)" fill="var(--orb)" stroke="var(--orb)" stroke-width="2" filter="url(#${id}-glow)" opacity=".8">${original.innerHTML}</g><g class="hud-gem-symbol" transform="translate(14 14) scale(3)" fill="url(#${id}-symbol)" stroke="var(--orb-light)" stroke-width=".5" style="color:var(--orb-light)">${original.innerHTML}</g>`;
    svg.querySelectorAll('.hud-gem-symbol [fill]:not([fill="none"])').forEach(path=>path.setAttribute('fill',`url(#${id}-symbol)`));
    svg.querySelectorAll('.hud-gem-symbol [stroke]').forEach(path=>path.setAttribute('stroke','var(--orb-light)'));
    orb.append(svg);
  }
  function paint(element, part) {
    if (element.querySelector(':scope > .hud-art')) return;
    const [x,y,width,height] = parts[part], id = `hud-ink-${++sequence}`;
    const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.classList.add('hud-art');
    svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('aria-hidden','true');
    // Luminance masking keeps the painted metalwork, removing the drafting ground.
    const clip = part === 'console' ? `<clipPath id="${id}-edge"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H1024V462H0Z M16 19V445H1008V19Z"/></clipPath>` : '';
    svg.innerHTML = `<defs>${clip}<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feColorMatrix type="luminanceToAlpha"/><feComponentTransfer><feFuncA type="linear" slope="4" intercept="-.48"/></feComponentTransfer><feComposite in="SourceGraphic" operator="in"/></filter></defs><g ${clip ? `clip-path="url(#${id}-edge)"` : ''}><g filter="url(#${id})"><image href="${atlas}" x="${-x}" y="${-y}" width="1024" height="1536"/></g></g>`;
    const filter=svg.querySelector('filter');
    filter.setAttribute('filterUnits','userSpaceOnUse');
    filter.setAttribute('width',String(width));filter.setAttribute('height',String(height));
    element.append(svg);
  }
  function decorate() {
    const frame = document.querySelector('.game-frame');
    if (!frame) return;
    frame.classList.add('hud-artwork');
    const mapping = {
      '.mission-identity':'title', '.mission-timer':'panel', '.nightmare-turn-timer':'panel',
      '.stage-objective':'panel', '.combo-record':'panel', '.battle-phase-chip':'diamond',
      '.mission-icons > button':'panel', '.vertical-hp':'hp', '.board > .cell':'cell',
      '.mini-thumb':'card', '.mini-rotate':'button', '.mini-zoom':'button',
      '.battle-info-dock':'history', '.combat-console':'console',
    };
    Object.entries(mapping).forEach(([selector,part]) => frame.querySelectorAll(selector).forEach(el => paint(el,part)));
    frame.querySelectorAll('.orb:not(.power-colorbomb):not(.obstacle-block)').forEach(jewel);
    const labels={mochilaBtn:['Mochila','Bag','Mochila'],formationQuickBtn:['Formação','Formation','Formación'],fullscreenQuickBtn:['Tela cheia','Fullscreen','Pantalla'],pauseBtn:['Menu','Menu','Menú']};
    for(const [id,words] of Object.entries(labels)) {
      const button=document.getElementById(id);
      if(button&&!button.querySelector('.hud-action-label')) {
        const label=document.createElement('span');label.className='hud-action-label';label.textContent=typeof T==='function'?T(...words):words[0];button.append(label);
      }
    }
  }
  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; decorate(); });
  }
  function start() {
    const frame = document.querySelector('.game-frame');
    if (!frame) return;
    decorate();
    new ResizeObserver(entries=>{
      const width=entries[0].contentRect.width;
      frame.style.setProperty('--hud-unit-factor',Math.max(1,Math.min(2.3,width/440)).toFixed(3));
    }).observe(frame);
    new MutationObserver(records => {
      if (records.some(record => [...record.addedNodes,...record.removedNodes].some(node => !node.classList?.contains('hud-art')))) schedule();
    }).observe(frame,{childList:true,subtree:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
