window.addEventListener('scroll',()=>{
  const nb=document.getElementById('navbar');
  if(nb) nb.classList.toggle('scrolled',window.scrollY>50);
});
function toggleMenu(){document.getElementById('nav-links')?.classList.toggle('open')}

// ── SECRET ADMIN ACCESS ── tape "admin" n'importe ou sur le site pour y acceder
(function(){
  const CODE='admin';
  let buf='';
  window.addEventListener('keydown',function(e){
    if(e.target && (e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')) return;
    if(e.key.length===1){
      buf=(buf+e.key.toLowerCase()).slice(-CODE.length);
      if(buf===CODE){
        buf='';
        const inPages=location.pathname.includes('/pages/');
        location.href=(inPages?'':'pages/')+'admin.html';
      }
    }
  });
})();
// track visitor
try{
  const v=JSON.parse(localStorage.getItem('site_visits')||'[]');
  v.unshift({time:new Date().toISOString(),page:location.pathname,lang:navigator.language,screen:screen.width+'x'+screen.height,isNew:!localStorage.getItem('rv')});
  if(v.length>100)v.pop();
  localStorage.setItem('site_visits',JSON.stringify(v));
  localStorage.setItem('rv','1');
}catch(e){}
