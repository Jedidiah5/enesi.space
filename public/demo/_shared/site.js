(function(){
var root=document.documentElement;
var header=document.querySelector('header.top');
var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>12)};
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(root.classList.contains('rm')||!window.Motion)return;
var M=window.Motion,animate=M.animate,inView=M.inView,stagger=M.stagger,scroll=M.scroll;
var ease=[0.22,1,0.36,1];var R=getComputedStyle(root).getPropertyValue('--r').trim()||'12px';
function splitHeading(el){
  if(el.querySelector('.mask'))return;
  el.innerHTML=el.textContent.trim().split(/\s+/).map(function(w){return '<span class="mask"><span class="w">'+w.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</span></span>'}).join(' ');
}
document.querySelectorAll('[data-split]').forEach(splitHeading);

/* 1. one orchestrated page-load sequence */
animate(header,{opacity:[0,1]},{duration:.8,ease:ease});
var hero=document.querySelector('.hero');
var heroFades=hero.querySelectorAll('[data-fade]');
animate(hero.querySelector('.kicker'),{opacity:[0,1],x:[-12,0]},{duration:.8,delay:.1,ease:ease});
animate(hero.querySelectorAll('h1 .w'),{y:['110%','0%']},{duration:1.1,delay:stagger(.055,{start:.18}),ease:ease});
animate(hero.querySelectorAll('.sub, .cta-row, .rating'),{opacity:[0,1],y:[18,0]},{duration:.9,delay:stagger(.1,{start:.62}),ease:ease});
var visual=hero.querySelector('[data-visual]');
if(visual){
  animate(visual.querySelector('.clip'),{clipPath:['inset(12% 8% 12% 8% round '+R+')','inset(0% 0% 0% 0% round '+R+')']},{duration:1.4,delay:.25,ease:ease});
  var media=visual.querySelector('img, .orb');
  if(media)animate(media,{scale:[1.18,1]},{duration:1.8,delay:.25,ease:ease});
  animate(visual.querySelector('[data-card]'),{opacity:[0,1],y:[40,0]},{type:'spring',stiffness:120,damping:18,delay:.95});
  /* gentle parallax on the hero image as you scroll */
  if(media&&scroll)scroll(animate(media,{y:['0%','-12%']},{ease:'linear'}),{target:visual,offset:['start start','end start']});
}

/* 2. scroll reveals, each fires once */
document.querySelectorAll('section h2[data-split]').forEach(function(h){
  inView(h,function(){animate(h.querySelectorAll('.w'),{y:['110%','0%']},{duration:1,delay:stagger(.05),ease:ease})},{margin:'0px 0px -12% 0px'});
});
document.querySelectorAll('section ul, section ol').forEach(function(list){
  var items=list.querySelectorAll('[data-item]');if(!items.length)return;
  inView(list,function(){animate(items,{opacity:[0,1],y:[28,0]},{duration:.9,delay:stagger(.08),ease:ease})},{margin:'0px 0px -10% 0px'});
});
document.querySelectorAll('section [data-fade]').forEach(function(el){
  inView(el,function(){animate(el,{opacity:[0,1],y:[20,0]},{duration:.9,ease:ease})},{margin:'0px 0px -8% 0px'});
});
document.querySelectorAll('[data-reveal-img]').forEach(function(f,i){
  inView(f,function(){
    animate(f.querySelector('.clip'),{clipPath:['inset(100% 0% 0% 0% round '+R+')','inset(0% 0% 0% 0% round '+R+')']},{duration:1.2,delay:i*.12,ease:ease});
    animate(f.querySelector('img'),{scale:[1.25,1]},{duration:1.6,delay:i*.12,ease:ease});
  },{margin:'0px 0px -10% 0px'});
});
document.querySelectorAll('[data-line]').forEach(function(l){
  inView(l,function(){animate(l,{scaleX:[0,1]},{duration:1.4,ease:ease})});
});
})();