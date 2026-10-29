const canvas=document.getElementById('particles');
if(canvas){
  const ctx=canvas.getContext('2d');
  let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
  const pts=Array.from({length:70},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.4,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,a:Math.random()*.4+.1}));
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(233,185,73,${p.a})`;ctx.fill();
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
    });
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(201,132,58,${.12*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke()}
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize',()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight});
}
