(function(){
  'use strict';

  const VERSION='1.0.0';
  const REALMS=Object.freeze([
    'raio','sombras','gelo','vento','humanos','chuvas',
    'fogo','agua','natureza','terra','luz','areia'
  ]);
  const ZONES=Object.freeze({
    raio:{x:.18,y:.115,rx:.145,ry:.105},
    sombras:{x:.50,y:.125,rx:.155,ry:.115},
    gelo:{x:.82,y:.12,rx:.145,ry:.11},
    vento:{x:.16,y:.315,rx:.145,ry:.13},
    humanos:{x:.50,y:.345,rx:.17,ry:.14},
    chuvas:{x:.84,y:.335,rx:.145,ry:.145},
    fogo:{x:.15,y:.54,rx:.15,ry:.135},
    agua:{x:.50,y:.61,rx:.13,ry:.30},
    natureza:{x:.84,y:.59,rx:.15,ry:.15},
    terra:{x:.15,y:.775,rx:.15,ry:.15},
    luz:{x:.50,y:.845,rx:.17,ry:.13},
    areia:{x:.84,y:.80,rx:.15,ry:.15}
  });

  let seed=0x59474452;
  const random=()=>{
    seed=(Math.imul(seed,1664525)+1013904223)>>>0;
    return seed/4294967296;
  };
  const makeParticles=(count)=>{
    const result=[];
    for(let i=0;i<count;i++){
      result.push({
        u:random(),v:random(),size:.5+random()*1.7,
        speed:.35+random()*.85,phase:random()*Math.PI*2,
        life:random(),drift:(random()-.5)*.18
      });
    }
    return result;
  };

  const particles={
    shadow:makeParticles(10), snow:makeParticles(24), clouds:makeParticles(8),
    petals:makeParticles(18), rain:makeParticles(34), embers:makeParticles(24),
    ripples:makeParticles(12), leaves:makeParticles(20), dust:makeParticles(14),
    light:makeParticles(24), sand:makeParticles(18), ocean:makeParticles(18)
  };
  const bolts=[];
  for(let b=0;b<3;b++){
    const points=[];
    for(let p=0;p<9;p++) points.push({x:0,y:0});
    bolts.push(points);
  }

  let art=null;
  let canvas=null;
  let ctx=null;
  let resizeObserver=null;
  let raf=0;
  let lastTime=0;
  let cssWidth=0;
  let cssHeight=0;
  let quality=1;
  let nextBolt=0;
  let boltUntil=0;
  let reducedMotion=false;
  let paints={};

  const reducedQuery=window.matchMedia('(prefers-reduced-motion: reduce)');
  const mobileQuery=window.matchMedia('(max-width: 600px)');

  function zonePoint(zone,p){
    return {
      x:(zone.x-zone.rx+zone.rx*2*p.u)*cssWidth,
      y:(zone.y-zone.ry+zone.ry*2*p.v)*cssHeight
    };
  }

  function activeCount(group){
    return Math.max(1,Math.floor(group.length*quality));
  }

  function wrap(value){
    if(value>1) return value-1;
    if(value<0) return value+1;
    return value;
  }

  function resize(){
    if(!canvas||!art) return;
    const rect=art.getBoundingClientRect();
    cssWidth=Math.max(1,rect.width);
    cssHeight=Math.max(1,rect.height);
    quality=mobileQuery.matches?.72:1;
    const dpr=Math.min(window.devicePixelRatio||1,mobileQuery.matches?1.5:2);
    const width=Math.max(1,Math.round(cssWidth*dpr));
    const height=Math.max(1,Math.round(cssHeight*dpr));
    if(canvas.width!==width||canvas.height!==height){
      canvas.width=width;
      canvas.height=height;
      canvas.style.width=cssWidth+'px';
      canvas.style.height=cssHeight+'px';
    }
    ctx.setTransform(dpr,0,0,dpr,0,0);
    paints={
      storm:ctx.createRadialGradient(.18*cssWidth,.12*cssHeight,0,.18*cssWidth,.12*cssHeight,.16*cssWidth),
      fire:ctx.createRadialGradient(.15*cssWidth,.55*cssHeight,0,.15*cssWidth,.55*cssHeight,.19*cssWidth),
      light:ctx.createRadialGradient(.50*cssWidth,.85*cssHeight,0,.50*cssWidth,.85*cssHeight,.22*cssWidth)
    };
    paints.storm.addColorStop(0,'rgba(183,107,255,.28)');
    paints.storm.addColorStop(1,'rgba(105,43,214,0)');
    paints.fire.addColorStop(0,'rgba(255,91,16,.21)');
    paints.fire.addColorStop(1,'rgba(255,52,0,0)');
    paints.light.addColorStop(0,'rgba(255,232,142,.25)');
    paints.light.addColorStop(1,'rgba(255,215,80,0)');
    if(reducedMotion) drawReduced();
  }

  function triggerLightning(now){
    const z=ZONES.raio;
    for(let b=0;b<bolts.length;b++){
      const line=bolts[b];
      const baseX=z.x-z.rx*.7+random()*z.rx*1.4;
      for(let p=0;p<line.length;p++){
        const t=p/(line.length-1);
        line[p].x=(baseX+(random()-.5)*z.rx*.42+Math.sin(t*8+b)*.008)*cssWidth;
        line[p].y=(z.y-z.ry*.92+t*z.ry*1.65)*cssHeight;
      }
    }
    boltUntil=now+190+random()*120;
    nextBolt=now+1450+random()*1900;
  }

  function drawLightning(now){
    if(now>=nextBolt) triggerLightning(now);
    if(now>boltUntil) return;
    const strength=Math.max(0,(boltUntil-now)/310);
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.globalAlpha=.35+strength*.55;
    ctx.fillStyle=paints.storm;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    for(let b=0;b<bolts.length;b++){
      const line=bolts[b];
      ctx.beginPath();
      ctx.moveTo(line[0].x,line[0].y);
      for(let p=1;p<line.length;p++) ctx.lineTo(line[p].x,line[p].y);
      ctx.lineCap='round';
      ctx.lineJoin='round';
      ctx.strokeStyle=b===0?'rgba(248,238,255,.98)':'rgba(174,105,255,.82)';
      ctx.lineWidth=(b===0?1.55:.8)+strength*1.2;
      ctx.shadowBlur=8+strength*12;
      ctx.shadowColor='#a24fff';
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawShadows(dt,time){
    const z=ZONES.sombras;
    const group=particles.shadow;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.u=wrap(p.u+dt*p.speed*.018);
      const q=zonePoint(z,p);
      const sway=Math.sin(time*.00045+p.phase)*z.rx*cssWidth*.16;
      ctx.globalAlpha=.055+p.size*.025;
      ctx.fillStyle=i%2?'#6c3a94':'#372552';
      ctx.beginPath();
      ctx.ellipse(q.x+sway,q.y,p.size*8,p.size*3.5,p.phase,0,Math.PI*2);
      ctx.fill();
      if(i<5){
        ctx.globalAlpha=.35;
        ctx.fillStyle='#ff9b37';
        ctx.fillRect(q.x,q.y,1,1.8);
      }
    }
    ctx.restore();
  }

  function drawSnow(dt,time){
    const z=ZONES.gelo;
    const group=particles.snow;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.fillStyle='#e8f7ff';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.v=wrap(p.v+dt*p.speed*.11);
      const q=zonePoint(z,p);
      const sway=Math.sin(time*.001+p.phase)*5*p.size;
      ctx.globalAlpha=.25+p.size*.18;
      ctx.beginPath();
      ctx.arc(q.x+sway,q.y,.45+p.size*.65,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWind(dt,time){
    const z=ZONES.vento;
    const group=particles.clouds;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.fillStyle='#f5fbff';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.u=wrap(p.u+dt*p.speed*.035);
      const q=zonePoint(z,p);
      const bob=Math.sin(time*.0007+p.phase)*3;
      ctx.globalAlpha=.09+p.size*.025;
      ctx.beginPath();
      ctx.ellipse(q.x,q.y+bob,8*p.size,3.4*p.size,0,0,Math.PI*2);
      ctx.ellipse(q.x-5*p.size,q.y+bob+1,5*p.size,2.7*p.size,0,0,Math.PI*2);
      ctx.ellipse(q.x+5*p.size,q.y+bob+1,5.5*p.size,2.5*p.size,0,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawHumans(dt,time){
    const z=ZONES.humanos;
    const group=particles.petals;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.v=wrap(p.v+dt*p.speed*.055);
      p.u=wrap(p.u+dt*p.drift*.018);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.26+p.size*.13;
      ctx.fillStyle=i%4===0?'#ffd98e':'#ff9fcd';
      ctx.beginPath();
      ctx.ellipse(q.x,q.y,1.55*p.size,.62*p.size,Math.sin(time*.0012+p.phase),0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRain(dt){
    const z=ZONES.chuvas;
    const group=particles.rain;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.strokeStyle='#b4d9ff';
    ctx.lineCap='round';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.v=wrap(p.v+dt*p.speed*.38);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.14+p.size*.12;
      ctx.lineWidth=.45+p.size*.18;
      ctx.beginPath();
      ctx.moveTo(q.x-1.5,q.y-4*p.size);
      ctx.lineTo(q.x+1.5,q.y+5*p.size);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawFire(dt,time){
    const z=ZONES.fogo;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.globalAlpha=.65+.2*Math.sin(time*.0024);
    ctx.fillStyle=paints.fire;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    ctx.strokeStyle='#ff7a19';
    ctx.shadowColor='#ff3d00';
    ctx.shadowBlur=7;
    ctx.lineWidth=1.2;
    for(let band=0;band<4;band++){
      ctx.beginPath();
      for(let i=0;i<8;i++){
        const t=i/7;
        const x=(z.x-z.rx*.78+t*z.rx*1.5)*cssWidth;
        const y=(z.y-z.ry*.65+band*z.ry*.36+Math.sin(t*8+time*.0018+band)*z.ry*.10)*cssHeight;
        if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      ctx.globalAlpha=.25+band*.04;
      ctx.stroke();
    }
    const group=particles.embers;
    ctx.fillStyle='#ffd07a';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.v=wrap(p.v-dt*p.speed*.09);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.25+p.size*.17;
      ctx.fillRect(q.x,q.y,.7+p.size*.55,.7+p.size*.55);
    }
    ctx.restore();
  }

  function drawWater(dt,time){
    const z=ZONES.agua;
    const group=particles.ripples;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.strokeStyle='#91e8ff';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.life+=dt*p.speed*.22;
      if(p.life>1){ p.life=0; p.u=random(); p.v=random(); }
      const q=zonePoint(z,p);
      const radius=1+p.life*10*p.size;
      ctx.globalAlpha=(1-p.life)*.32;
      ctx.lineWidth=.65;
      ctx.beginPath();
      ctx.ellipse(q.x,q.y,radius,radius*.32,0,0,Math.PI*2);
      ctx.stroke();
    }
    ctx.globalAlpha=.16;
    ctx.lineWidth=.8;
    for(let i=0;i<5;i++){
      const y=(z.y-z.ry*.72+i*z.ry*.34)*cssHeight;
      ctx.beginPath();
      ctx.moveTo((z.x-z.rx*.45)*cssWidth,y);
      ctx.quadraticCurveTo(z.x*cssWidth,y+Math.sin(time*.001+i)*5,(z.x+z.rx*.45)*cssWidth,y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawNature(dt,time){
    const z=ZONES.natureza;
    const group=particles.leaves;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.u=wrap(p.u+dt*p.drift*.025);
      p.v=wrap(p.v+dt*p.speed*.018);
      const q=zonePoint(z,p);
      const pulse=.45+.4*Math.sin(time*.0015+p.phase);
      ctx.globalAlpha=i%4===0?pulse:.2;
      ctx.fillStyle=i%4===0?'#8dffc5':(i%2?'#b8e34f':'#53bb67');
      ctx.beginPath();
      ctx.ellipse(q.x,q.y,1.45*p.size,.6*p.size,p.phase+time*.0004,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawEarth(dt,time){
    const z=ZONES.terra;
    const group=particles.dust;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.u=wrap(p.u+dt*p.speed*.012);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.08+p.size*.08;
      ctx.fillStyle=i%5===0?'#fff0ba':'#ba9c7a';
      const glint=i%5===0?1.2+.8*Math.sin(time*.002+p.phase):p.size*1.5;
      ctx.fillRect(q.x-glint*.5,q.y-glint*.5,glint,glint);
    }
    ctx.restore();
  }

  function drawLight(dt,time){
    const z=ZONES.luz;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.globalAlpha=.72+.18*Math.sin(time*.0017);
    ctx.fillStyle=paints.light;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    ctx.strokeStyle='#ffe9a2';
    ctx.lineWidth=.7;
    for(let r=0;r<7;r++){
      const angle=-Math.PI*.78+r*Math.PI*.09;
      const cx=z.x*cssWidth;
      const cy=(z.y+z.ry*.34)*cssHeight;
      ctx.globalAlpha=.08+.05*Math.sin(time*.001+r);
      ctx.beginPath();
      ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(angle)*z.rx*cssWidth*1.25,cy+Math.sin(angle)*z.ry*cssHeight*1.5);
      ctx.stroke();
    }
    const group=particles.light;
    ctx.fillStyle='#fff3b3';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.v=wrap(p.v-dt*p.speed*.065);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.25+p.size*.18;
      ctx.beginPath();
      ctx.arc(q.x,q.y,.45+p.size*.55,0,Math.PI*2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawSand(dt,time){
    const z=ZONES.areia;
    const group=particles.sand;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.strokeStyle='#ffd88a';
    ctx.lineCap='round';
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.u=wrap(p.u+dt*p.speed*.10);
      const q=zonePoint(z,p);
      ctx.globalAlpha=.10+p.size*.07;
      ctx.lineWidth=.45+p.size*.2;
      ctx.beginPath();
      ctx.moveTo(q.x-5*p.size,q.y);
      ctx.quadraticCurveTo(q.x,q.y+Math.sin(time*.002+p.phase)*2,q.x+6*p.size,q.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawOcean(dt,time){
    const group=particles.ocean;
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.strokeStyle='#a3e8ff';
    ctx.lineWidth=.55;
    for(let i=0,n=activeCount(group);i<n;i++){
      const p=group[i];
      p.life=wrap(p.life+dt*p.speed*.035);
      const left=i%2===0;
      const x=(left ? .02+.11*p.u : .98-.11*p.u)*cssWidth;
      const y=(.08+.84*p.v)*cssHeight;
      ctx.globalAlpha=.08+.09*Math.sin(time*.001+p.phase);
      ctx.beginPath();
      ctx.arc(x,y,2+p.size*3,Math.PI*.15,Math.PI*.85);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawReduced(){
    if(!ctx||!cssWidth||!cssHeight) return;
    ctx.clearRect(0,0,cssWidth,cssHeight);
    ctx.save();
    ctx.globalCompositeOperation='screen';
    ctx.globalAlpha=.32;
    ctx.fillStyle=paints.storm;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    ctx.globalAlpha=.28;
    ctx.fillStyle=paints.fire;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    ctx.globalAlpha=.34;
    ctx.fillStyle=paints.light;
    ctx.fillRect(0,0,cssWidth,cssHeight);
    ctx.strokeStyle='rgba(180,220,255,.32)';
    ctx.lineWidth=.65;
    const z=ZONES.chuvas;
    for(let i=0;i<12;i++){
      const x=(z.x-z.rx+i*z.rx*2/11)*cssWidth;
      const y=(z.y-z.ry+(i%4)*z.ry*.35)*cssHeight;
      ctx.beginPath();
      ctx.moveTo(x,y);
      ctx.lineTo(x+2,y+8);
      ctx.stroke();
    }
    ctx.restore();
  }

  function draw(now,dt){
    ctx.clearRect(0,0,cssWidth,cssHeight);
    drawOcean(dt,now);
    drawShadows(dt,now);
    drawSnow(dt,now);
    drawWind(dt,now);
    drawHumans(dt,now);
    drawRain(dt);
    drawFire(dt,now);
    drawWater(dt,now);
    drawNature(dt,now);
    drawEarth(dt,now);
    drawLight(dt,now);
    drawSand(dt,now);
    drawLightning(now);
  }

  function mapIsVisible(){
    const screen=document.getElementById('mapScreen');
    return Boolean(canvas&&canvas.isConnected&&document.visibilityState==='visible'&&screen&&screen.classList.contains('show'));
  }

  function frame(now){
    raf=0;
    if(!mapIsVisible()||reducedMotion) return;
    const dt=lastTime?Math.min(.05,(now-lastTime)/1000):.016;
    lastTime=now;
    draw(now,dt);
    raf=requestAnimationFrame(frame);
  }

  function sync(){
    reducedMotion=reducedQuery.matches;
    if(reducedMotion){
      if(raf) cancelAnimationFrame(raf);
      raf=0;
      lastTime=0;
      if(mapIsVisible()) drawReduced();
      return;
    }
    if(mapIsVisible()){
      if(!raf) raf=requestAnimationFrame(frame);
    }else{
      if(raf) cancelAnimationFrame(raf);
      raf=0;
      lastTime=0;
    }
  }

  function unmount(){
    if(raf) cancelAnimationFrame(raf);
    raf=0;
    lastTime=0;
    if(resizeObserver) resizeObserver.disconnect();
    resizeObserver=null;
    if(canvas&&canvas.isConnected) canvas.remove();
    if(art) delete art.dataset.ygdriaFxMounted;
    art=null;
    canvas=null;
    ctx=null;
  }

  function mount(nextArt){
    if(!nextArt||nextArt===art) return sync();
    unmount();
    art=nextArt;
    canvas=document.createElement('canvas');
    canvas.className='ygdria-map-fx';
    canvas.setAttribute('aria-hidden','true');
    canvas.dataset.effects=REALMS.join(',');
    canvas.dataset.version=VERSION;
    art.dataset.ygdriaFxMounted='12';
    art.appendChild(canvas);
    ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
    if(!ctx){ unmount(); return; }
    resizeObserver=new ResizeObserver(resize);
    resizeObserver.observe(art);
    resize();
    nextBolt=0;
    sync();
  }

  function discover(){
    const next=document.querySelector('#mapCanvas .map-art');
    if(next) mount(next);
    else if(art) unmount();
    sync();
  }

  const observer=new MutationObserver(discover);
  observer.observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',sync);
  reducedQuery.addEventListener?.('change',sync);
  mobileQuery.addEventListener?.('change',()=>{ resize(); sync(); });
  window.addEventListener('pagehide',unmount,{once:true});

  window.__YGDRIA_MAP_FX={
    version:VERSION,
    realms:REALMS,
    get mounted(){ return Boolean(canvas&&canvas.isConnected); },
    get active(){ return Boolean(raf); },
    get reducedMotion(){ return reducedMotion; },
    get canvasSize(){ return canvas?{width:canvas.width,height:canvas.height,cssWidth,cssHeight}:null; },
    get particleCount(){
      let count=0;
      for(const key in particles) count+=activeCount(particles[key]);
      return count;
    },
    forceLightning(){
      if(!ctx) return false;
      nextBolt=0;
      if(!raf&&!reducedMotion&&mapIsVisible()) raf=requestAnimationFrame(frame);
      return true;
    }
  };

  discover();
})();
