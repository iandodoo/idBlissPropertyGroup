
document.documentElement.classList.add('js');
document.addEventListener('click',function(e){
  var q=e.target.closest('.faq-q');
  if(q){var item=q.parentElement,a=item.querySelector('.faq-a'),open=item.classList.contains('open');
    item.parentElement.querySelectorAll('.faq-item.open').forEach(function(o){o.classList.remove('open');o.querySelector('.faq-a').style.maxHeight=null;o.querySelector('.faq-q').setAttribute('aria-expanded','false');});
    if(!open){item.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';q.setAttribute('aria-expanded','true');}}
  var t=e.target.closest('.menu-toggle');
  if(t){var o=document.body.classList.toggle('menu-open');t.setAttribute('aria-expanded',o);}
  if(e.target.closest('.navlinks a')) document.body.classList.remove('menu-open');
  var lg=document.querySelector('.login[open]');
  if(lg && !e.target.closest('.login')) lg.removeAttribute('open');
});
function ibSubmit(f,e){e.preventDefault();f.querySelector('.form-status').textContent='Thank you. A member of our team will reach out shortly.';f.querySelector('button[type=submit]').disabled=true;return false;}

/* scroll reveal */
(function(){
  var sel='.section-head,.pillar,.role-card,.path-card,.portal-card,.benefit-card,.service-card,.trend-card,.g-item,.big-seal,.step-list li,.faq-item,.chip-row,.table-scroll,.story>*,.cta-inner,.panel-wrap,.tabs';
  var els=[].slice.call(document.querySelectorAll(sel));
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in','reveal');});return;}
  var io=new IntersectionObserver(function(entries){entries.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  els.forEach(function(e){
    var i=[].indexOf.call(e.parentNode.children,e);
    e.classList.add('reveal');e.style.setProperty('--d',(Math.min(i,5)*0.08)+'s');io.observe(e);
  });
})();

/* tabbed showcase with auto-advance */
(function(){
  var root=document.querySelector('.showcase');if(!root)return;
  var tabs=[].slice.call(root.querySelectorAll('.tab')),panels=[].slice.call(root.querySelectorAll('.panel'));
  var idx=0,timer=null,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function show(i,focus){
    idx=i;
    tabs.forEach(function(t,j){var on=j===i;t.setAttribute('aria-selected',on?'true':'false');t.tabIndex=on?0:-1;t.classList.remove('run');if(on&&timer){void t.offsetWidth;t.classList.add('run');}});
    panels.forEach(function(p,j){p.classList.toggle('on',j===i);});
    if(focus)tabs[i].focus();
  }
  function stop(){if(timer){clearInterval(timer);timer=null;}tabs.forEach(function(t){t.classList.remove('run');});}
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){stop();show(i);});
    t.addEventListener('keydown',function(e){
      if(e.key==='ArrowRight'){e.preventDefault();stop();show((idx+1)%tabs.length,true);}
      if(e.key==='ArrowLeft'){e.preventDefault();stop();show((idx-1+tabs.length)%tabs.length,true);}
    });
  });
  if(!reduce){
    timer=setInterval(function(){show((idx+1)%tabs.length);},8000);
    tabs[0].classList.add('run');
  }
})();

/* all-in-one hub */
(function(){
  var root=document.querySelector('[data-hub]');if(!root)return;
  var all=function(s){return [].slice.call(root.querySelectorAll(s));};
  var cards=all('.hcard'),nodes=all('.hnode'),lines=all('.hline'),pkts=all('.pkt');
  var idx=0,timer=null,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function set(i){
    idx=i;
    [cards,nodes,lines,pkts].forEach(function(g){g.forEach(function(e){e.classList.toggle('on',+e.dataset.i===i);});});
    cards.forEach(function(c){c.setAttribute('aria-expanded',+c.dataset.i===i?'true':'false');c.classList.remove('run');});
    if(timer){void cards[i].offsetWidth;cards[i].classList.add('run');}
  }
  function stop(){if(timer){clearInterval(timer);timer=null;}cards.forEach(function(c){c.classList.remove('run');});}
  cards.forEach(function(c){c.addEventListener('click',function(){stop();set(+c.dataset.i);});});
  nodes.forEach(function(n){
    n.addEventListener('click',function(){stop();set(+n.dataset.i);});
    n.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();stop();set(+n.dataset.i);}});
  });
  if(!reduce){timer=setInterval(function(){set((idx+1)%cards.length);},4500);}
  set(0);
})();

/* leasing journey */
document.querySelectorAll('[data-pipe]').forEach(function(root){
  var st=[].slice.call(root.querySelectorAll('.pstn')),pn=[].slice.call(root.querySelectorAll('.ppanel'));
  var fill=root.querySelector('.pipe-fill'),tok=root.querySelector('.pipe-token');
  var n=st.length,idx=0,timer=null,reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function set(i){
    idx=i;
    st.forEach(function(s,j){s.classList.toggle('on',j===i);s.classList.toggle('done',j<i);});
    pn.forEach(function(p,j){p.classList.toggle('on',j===i);});
    var pct=(i+.5)/n*100;tok.style.left=pct+'%';fill.style.width=((pct-10)/80*100)+'%';
  }
  st.forEach(function(s,j){s.addEventListener('click',function(){if(timer){clearInterval(timer);timer=null;}set(j);});});
  if(!reduce){timer=setInterval(function(){set((idx+1)%n);},4600);}
  set(0);
});

/* vacancy calculator */
document.querySelectorAll('[data-calc]').forEach(function(c){
  var r=c.querySelector('#rent'),d=c.querySelector('#days'),big=c.querySelector('.calc-big'),dv=c.querySelector('.dval'),pd=c.querySelector('.perday');
  function fmt(x){return '$'+Math.round(x).toLocaleString('en-US');}
  function upd(){var rent=Math.max(0,parseFloat(r.value)||0),days=+d.value;dv.textContent=days;big.textContent=fmt(rent/30*days);pd.textContent=fmt(rent/30);}
  r.addEventListener('input',upd);d.addEventListener('input',upd);upd();
});
