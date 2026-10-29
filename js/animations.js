/* ============================================================
   ANIMATIONS.JS — Maroua JDI Portfolio
   ============================================================ */

/* ── 1. FALLING & RISING PROGRAMMING LANGUAGE WORDS ── */
(function createCodeBg(){
  const old = document.getElementById('code-bg');
  if (old) old.remove();

  const canvas = document.createElement('canvas');
  canvas.id = 'code-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:0;pointer-events:none;';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');

  const words = [
    '<?php','namespace','function','return','echo','class','extends','implements','use','new','null','true','false',
    'const','let','var','async','await','import','export','useState','useEffect','props','render','map','filter',
    '<div>','</div>','<span>','display:flex','grid','@media','transition','transform','opacity',
    'SELECT','FROM','WHERE','JOIN','INSERT','UPDATE','DELETE','INDEX',
    'composer','artisan','Route','Controller','Middleware','npm','git','push','merge','commit',
    'if','else','for','while','switch','try','catch','typeof','JSON','console',
    'Python','JavaScript','PHP','React','Laravel','SQL','CSS','HTML','Node','TypeScript',
    'def','print','import','class','self','return','lambda','list','dict','tuple',
    '.map()','async/await','=>','Promise','fetch','axios','useState()',':root{}','border-radius',
  ];

  const colors = [
    'rgba(233,185,73,',
    'rgba(201,132,58,',
    'rgba(138,90,43,',
    'rgba(242,167,184,',
    'rgba(245,215,140,',
  ];

  let particles = [];
  const COUNT = 90;

  function randomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  function spawnParticle(forceX) {
    const isFalling = Math.random() > 0.5;
    const fontSize = 9 + Math.random() * 8;
    const opacity = 0.04 + Math.random() * 0.11;
    const speed = 0.3 + Math.random() * 0.8;
    return {
      x: forceX !== undefined ? forceX : Math.random() * canvas.width,
      y: isFalling ? -30 - Math.random() * 200 : canvas.height + 30 + Math.random() * 200,
      vy: isFalling ? speed : -speed,
      word: randomWord(),
      color: randomColor(),
      opacity: opacity,
      fontSize: fontSize,
      isFalling: isFalling,
      swayAmp: 0.2 + Math.random() * 0.6,
      swayFreq: 0.008 + Math.random() * 0.012,
      swayOffset: Math.random() * Math.PI * 2,
      life: 0,
      maxLife: Math.floor(700 + Math.random() * 600),
      changeInterval: Math.floor(60 + Math.random() * 80),
    };
  }

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    for (let i = 0; i < COUNT; i++) {
      const p = spawnParticle();
      // scatter initial positions across full screen
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }
  }
  init();
  window.addEventListener('resize', init);

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(15,12,8,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, idx) => {
      p.life++;
      p.y += p.vy;

      // gentle horizontal sway
      p.x += Math.sin(p.life * p.swayFreq + p.swayOffset) * p.swayAmp;

      // fade in/out
      let alpha = p.opacity;
      const fadeFrames = 40;
      if (p.life < fadeFrames) alpha *= p.life / fadeFrames;
      if (p.life > p.maxLife - fadeFrames) alpha *= (p.maxLife - p.life) / fadeFrames;

      // occasionally change word mid-flight
      if (p.life % p.changeInterval === 0) {
        p.word = randomWord();
      }

      ctx.font = `${p.fontSize}px "Space Mono", monospace`;
      ctx.fillStyle = p.color + Math.min(alpha, 0.3) + ')';
      ctx.fillText(p.word, p.x, p.y);

      // respawn when out of bounds or life exceeded
      const oob = p.isFalling
        ? p.y > canvas.height + 60
        : p.y < -60;

      if (oob || p.life >= p.maxLife) {
        particles[idx] = spawnParticle();
      }
    });
  }

  function loop() { requestAnimationFrame(loop); draw(); }
  loop();
})();


/* ── 2. NAVBAR PROGRESS BAR ── */
(function(){
  const old = document.getElementById('read-progress');
  if(old) old.remove();
  const bar = document.createElement('div');
  bar.id = 'read-progress';
  bar.style.cssText = 'position:fixed;top:0;left:0;height:2px;width:0%;background:linear-gradient(90deg,#c9843a,#e9b949,#8a5a2b);z-index:9999;box-shadow:0 0 10px rgba(233,185,73,.8);transition:width .08s linear;';
  document.body.appendChild(bar);
  window.addEventListener('scroll',()=>{
    const h = document.documentElement;
    bar.style.width = Math.min((h.scrollTop/(h.scrollHeight-h.clientHeight))*100,100)+'%';
  });
})();


/* ── 3. CURSOR TRAIL ── */
(function(){
  if('ontouchstart' in window) return;
  const N=14, dots=[];
  for(let i=0;i<N;i++){
    const d=document.createElement('div');
    const sz=Math.max(2,7-i*.4);
    d.style.cssText=`position:fixed;border-radius:50%;pointer-events:none;z-index:9998;width:${sz}px;height:${sz}px;background:rgba(233,185,73,${Math.max(.05,.75-i*.055)});mix-blend-mode:screen;`;
    document.body.appendChild(d);
    dots.push({el:d,x:innerWidth/2,y:innerHeight/2});
  }
  let mx=innerWidth/2,my=innerHeight/2;
  window.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;});
  window.addEventListener('mousedown',()=>{dots.forEach(d=>d.el.style.background='rgba(138,90,43,.8)');setTimeout(()=>dots.forEach(d=>d.el.style.background=''),300);});
  (function anim(){
    dots[0].x=mx;dots[0].y=my;
    for(let i=1;i<N;i++){dots[i].x+=(dots[i-1].x-dots[i].x)*.38;dots[i].y+=(dots[i-1].y-dots[i].y)*.38;}
    dots.forEach(d=>{d.el.style.left=d.x-parseFloat(d.el.style.width)/2+'px';d.el.style.top=d.y-parseFloat(d.el.style.height)/2+'px';});
    requestAnimationFrame(anim);
  })();
})();


/* ── 4. COUNTER ANIMATION ── */
(function(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting)return;
      const el=e.target;
      const num=parseInt(el.textContent.replace(/[^0-9]/g,''));
      const sfx=el.textContent.replace(/[0-9]/g,'');
      if(!isNaN(num)&&num>0){
        let t0=null;
        (function step(ts){
          if(!t0)t0=ts;
          const p=Math.min((ts-t0)/1800,1);
          const e2=1-Math.pow(1-p,4);
          el.textContent=Math.floor(e2*num)+sfx;
          if(p<1)requestAnimationFrame(step);
        })(performance.now());
      }
      obs.unobserve(el);
    });
  },{threshold:.6});
  document.querySelectorAll('.stat-box .num').forEach(el=>obs.observe(el));
})();


/* ── 5. GLITCH EFFECT ── */
(function(){
  const name=document.querySelector('.hero-name');
  if(!name)return;
  name.dataset.text=name.textContent;
  const s=document.createElement('style');
  s.textContent=`
    .hero-name{position:relative;display:inline-block}
    .hero-name::before,.hero-name::after{content:attr(data-text);position:absolute;left:0;top:0;width:100%;overflow:hidden;}
    .hero-name::before{color:#e9b949;clip-path:polygon(0 20%,100% 20%,100% 40%,0 40%);animation:gh1 5s infinite;}
    .hero-name::after{color:#f2cf7a;clip-path:polygon(0 65%,100% 65%,100% 80%,0 80%);animation:gh2 5s infinite;}
    @keyframes gh1{0%,88%,100%{transform:translateX(0);opacity:0}89%{transform:translateX(-5px) skewX(-2deg);opacity:.8}91%{transform:translateX(5px);opacity:.5}93%{transform:translateX(-2px);opacity:.9}95%{transform:translateX(0);opacity:0}}
    @keyframes gh2{0%,88%,100%{transform:translateX(0);opacity:0}90%{transform:translateX(5px) skewX(2deg);opacity:.7}92%{transform:translateX(-5px);opacity:.4}94%{transform:translateX(2px);opacity:.8}96%{transform:translateX(0);opacity:0}}
  `;
  document.head.appendChild(s);
})();


/* ── 6. GRADIENT ANIMATED TEXT ── */
(function(){
  const s=document.createElement('style');
  s.textContent=`
    .sec-title span,.hero-name span{
      background:linear-gradient(90deg,#c9843a 0%,#e9b949 30%,#8a5a2b 60%,#e9b949 80%,#c9843a 100%);
      background-size:250% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
      animation:gradShift 5s linear infinite;
    }
    @keyframes gradShift{0%{background-position:0% center}100%{background-position:250% center}}
  `;
  document.head.appendChild(s);
})();


/* ── 7. FLOATING CODE TAGS ── */
(function(){
  const tags=['<html>','</div>','<?php','const x =','git push','npm run dev','SELECT *','useState()','@media','display:flex','async/await','import React','return null','class {}',':root{}','composer','artisan serve','git merge','border:0','filter()'];
  const wrap=document.createElement('div');
  wrap.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden;';
  document.body.appendChild(wrap);
  const s=document.createElement('style');
  s.textContent='@keyframes floatUp{0%{transform:translateY(0) rotate(-3deg);opacity:0}8%{opacity:1}90%{opacity:.06}100%{transform:translateY(-110vh) rotate(4deg);opacity:0}}';
  document.head.appendChild(s);
  function spawn(){
    const el=document.createElement('span');
    el.textContent=tags[Math.floor(Math.random()*tags.length)];
    const dur=14+Math.random()*18, sz=.5+Math.random()*.4, left=Math.random()*95;
    el.style.cssText=`position:absolute;left:${left}vw;bottom:-3rem;font-family:"Space Mono",monospace;font-size:${sz}rem;color:rgba(233,185,73,.1);white-space:nowrap;animation:floatUp ${dur}s linear forwards;`;
    wrap.appendChild(el);
    setTimeout(()=>el.remove(),dur*1000);
  }
  for(let i=0;i<8;i++) setTimeout(spawn,i*400);
  setInterval(spawn,1400);
})();


/* ── 8. ENHANCED SCROLL REVEAL ── */
// (function(){
//   const s=document.createElement('style');
//   s.textContent=`
//     .anim-reveal{opacity:0;transform:translateY(32px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1);}
//     .anim-reveal.from-left{transform:translateX(-40px)}
//     .anim-reveal.from-right{transform:translateX(40px)}
//     .anim-reveal.anim-vis{opacity:1!important;transform:translate(0)!important}
//   `;
//   document.head.appendChild(s);
//   const sel=['.sec-head','.contact-info','.contact-form-box','.c-item','.admin-login-box','.admin-header','.stats-grid','.tab-bar','.badges-wrap'];
//   document.querySelectorAll(sel.join(',')).forEach((el,i)=>{
//     el.classList.add('anim-reveal');
//     if(i%3===1) el.classList.add('from-left');
//     if(i%3===2) el.classList.add('from-right');
//   });
//   const obs=new IntersectionObserver(entries=>{
//     entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('anim-vis');obs.unobserve(e.target);}});
//   },{threshold:.1,rootMargin:'0px 0px -40px 0px'});
//   document.querySelectorAll('.anim-reveal').forEach(el=>obs.observe(el));
// })();
