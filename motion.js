/* ===== motion ===== */
(function(){
  var L=document.querySelector('.mo-loader'),root=document.documentElement,t0=Date.now(),goQ=[];
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){ if(L) L.remove(); return; }
  root.classList.add('mo');
  function whenGo(f){ root.classList.contains('mo-go') ? f() : goQ.push(f); }

  var bar=document.createElement('div'); bar.className='mo-progress'; document.body.appendChild(bar);
  addEventListener('scroll',function(){bar.style.transform='scaleX('+(root.scrollTop/((root.scrollHeight-root.clientHeight)||1))+')';},{passive:true});
  var a=document.createElement('div'); a.className='mo-aurora'; a.innerHTML='<i></i><i></i><i></i>'; document.body.prepend(a);

  function split(el){
    var n=0;
    (function walk(node){
      [].slice.call(node.childNodes).forEach(function(c){
        if(c.nodeType===3){
          var f=document.createDocumentFragment();
          c.textContent.split(/(\s+)/).forEach(function(t){
            if(!t) return;
            if(/^\s+$/.test(t)){ f.appendChild(document.createTextNode(' ')); return; }
            var w=document.createElement('span'); w.className='mo-w';
            var s=document.createElement('span'); s.textContent=t; s.style.setProperty('--i',n++);
            w.appendChild(s); f.appendChild(w);
          });
          node.replaceChild(f,c);
        } else if(c.nodeType===1) walk(c);
      });
    })(el);
    el.classList.add('mo-split');
  }
  var h1=document.querySelector('.hero-left .ab-headline'); if(h1) split(h1);
  function replay(){ if(!h1) return; h1.classList.remove('mo-split'); void h1.offsetWidth; h1.classList.add('mo-split'); }

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});

  var sel='.intro,.links,.hero-photo-wrap,.hero-block .ab-headline-box,.subline,.review-cta,.page-title,.work-nav,.wk-headline,.proj-text,.reviews-title,.review-card,.hero .wrap>*,.tabs-outer,#contact .wrap>*';
  var seen=new Map();
  document.querySelectorAll(sel).forEach(function(el){
    if(el.tagName==='BR') return;
    var p=el.parentElement,n=seen.get(p)||0; seen.set(p,n+1);
    el.style.setProperty('--d',Math.min(n,5)*.09+'s');
    el.classList.add('mo-r'); io.observe(el);
  });
  [['.hero-photo-wrap','.45s'],['.hero-left .intro','.8s'],['.hero-left .links','.95s']].forEach(function(x){
    var e=document.querySelector(x[0]); if(e) e.style.setProperty('--d',x[1]);
  });

  // numbers, centered under the hero
  function count(b){
    var n=+b.dataset.n,t0=performance.now();
    (function f(t){var p=Math.min((t-t0)/1800,1),e=1-Math.pow(1-p,4);
      b.textContent=(b.dataset.p||'')+Math.round(n*e).toLocaleString('en-US')+(b.dataset.s||'');
      if(p<1) requestAnimationFrame(f);})(t0);
  }
  var dv=document.querySelector('#page-about .divider');
  if(dv){
    function row(html){
      var s=document.createElement('div'); s.className='mo-stats'; s.innerHTML=html;
      [].forEach.call(s.children,function(d,i){ d.style.setProperty('--k',i); });
      dv.before(s); io.observe(s);
      var cio=new IntersectionObserver(function(es){es.forEach(function(e){
        if(!e.isIntersecting) return; cio.disconnect();
        whenGo(function(){ setTimeout(function(){ s.querySelectorAll('b').forEach(count); },300); });
      });},{threshold:.4});
      cio.observe(s);
    }
    row('<div><b data-n="200" data-s="+">0</b><span>Personal And Professional Brands Worked With</span></div><div><b data-n="18" data-s="M+">0</b><span>Views Gained For Clients</span></div><div><b data-n="90" data-p="<">0</b><span>Days To See Results</span></div>');
  }

  // replay entrances whenever a page is shown again
  var mu=new MutationObserver(function(ms){ ms.forEach(function(m){
    var p=m.target; if(!p.classList.contains('active')) return;
    p.querySelectorAll('.mo-r.in,.mo-stats.in').forEach(function(e){ e.classList.remove('in'); io.observe(e); });
    if(p.id==='page-about') replay();
  });});
  document.querySelectorAll('.page').forEach(function(p){ mu.observe(p,{attributes:true,attributeFilter:['class']}); });

  // pricing card spotlight
  if(matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('pointermove',function(e){
      var c=e.target.closest&&e.target.closest('.card'); if(!c) return;
      var r=c.getBoundingClientRect();
      c.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%'); c.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%');
    });
  }

  // soft ripples behind the photo
  var w=document.querySelector('.hero-photo-wrap');
  if(w) w.insertAdjacentHTML('afterbegin','<i class="mo-rip"></i><i class="mo-rip"></i>');

  // intro: shining line, name, then the page
  function go(){
    if(L) L.classList.add('out');
    root.classList.add('mo-go');
    goQ.splice(0).forEach(function(f){f();});
    setTimeout(function(){ if(L) L.remove(); },1000);
    setTimeout(function(){
      document.querySelectorAll('.mo-r:not(.in)').forEach(function(e){
        var r=e.getBoundingClientRect(); if(r.width&&r.top<innerHeight&&r.bottom>0) e.classList.add('in');
      });
    },3500);
  }
  function ready(){
    if(document.hidden){
      document.addEventListener('visibilitychange',function f(){
        if(document.hidden) return; document.removeEventListener('visibilitychange',f);
        if(L){ var n=L.cloneNode(true); L.replaceWith(n); L=n; } t0=Date.now(); ready();
      }); return;
    }
    setTimeout(go,Math.max(0,3000-(Date.now()-t0)));
  }
  if(document.readyState==='complete') ready(); else addEventListener('load',ready);
})();
