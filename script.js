// page switching
(function(){
  const links = document.querySelectorAll('.navlink');
  function showPage(id){
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === 'page-' + id));
    links.forEach(l => l.classList.toggle('current', l.dataset.page === id));
    window.scrollTo({top:0, behavior:'smooth'});
  }
  links.forEach(l => l.addEventListener('click', function(e){
    e.preventDefault();
    showPage(l.dataset.page);
  }));
})();

// work page slider (auto-play + arrows + swipe, pauses while hovered / touched)
document.querySelectorAll(".slider").forEach(function (slider) {
  var imgs = slider.querySelectorAll("img, .rt-slide");
  var dotsWrap = slider.parentElement.querySelector(".dots");
  var dots = dotsWrap ? dotsWrap.querySelectorAll("span") : [];
  var current = 0;
  var paused = false;

  function show(index) {
    current = (index + imgs.length) % imgs.length;
    imgs.forEach(function (img, i) { img.classList.toggle("active", i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle("active", i === current); });
  }

  // arrows
  function arrow(dir, label, path) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "slide-arrow " + dir;
    b.setAttribute("aria-label", label);
    b.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="' + path + '"/></svg>';
    return b;
  }
  var prev = arrow("prev", "Previous slide", "15 5 8 12 15 19");
  var next = arrow("next", "Next slide", "9 5 16 12 9 19");
  slider.appendChild(prev);
  slider.appendChild(next);
  prev.addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
  next.addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });

  // clickable dots
  dots.forEach(function (dot, i) {
    dot.style.cursor = "pointer";
    dot.addEventListener("click", function () { show(i); });
  });

  // pause while mouse is over it, or while a finger is on it
  slider.addEventListener("mouseenter", function () { paused = true; });
  slider.addEventListener("mouseleave", function () { paused = false; });
  var startX = null;
  slider.addEventListener("touchstart", function (e) {
    paused = true;
    startX = e.touches[0].clientX;
  }, { passive: true });
  function endTouch(e) {
    paused = false;
    if (startX !== null && e.changedTouches && e.changedTouches.length) {
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) show(dx < 0 ? current + 1 : current - 1);
    }
    startX = null;
  }
  slider.addEventListener("touchend", endTouch);
  slider.addEventListener("touchcancel", function () { paused = false; startX = null; });

  show(0);

  setInterval(function () {
    if (!paused) show(current + 1);
  }, 1200);
});


// pricing tabs/cards
const WA_NUMBER = '923170974113';
const check = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

const categories = [
{id:'content', label:'Content Design', msgLabel:'Content Design', layout:'grid',
 packages:[
  {tier:'Carousel', price:'$55', features:['Up to 10–12 slides','Fully custom design','Strong visual storytelling','Optimized for LinkedIn','Matched with your brand identity','3 revision rounds','PDF + JPG/PNG','3 days delivery']},
  {tier:'Cheatsheet / Infographic', price:'$35', features:['Up to 10 key points','Clear & easy-to-scan layout','Custom branded design','Premium icons & graphics','Optimized for LinkedIn','3 revision rounds','PNG + JPG','3 days delivery']},
  {tier:'Single Image / Poster', price:'$20', features:['1 custom social media design','Attention-grabbing visual layout','Optimized for LinkedIn','Consistent with your branding','Clear messaging & hierarchy','3 revision rounds','PNG + JPG','2 days delivery']}
 ]},
{id:'li-opt', label:'LinkedIn Profile Optimization', layout:'single', singleMsg:true,
 packages:[
  {tier:'Complete LinkedIn Profile Optimization', price:'$199', priceNote:'One Time', waPrice:'$199 one-time', features:['SEO-Based Headline','SEO-Optimized About Section','Professional Profile Photo Optimization','Custom LinkedIn Banner Design','2–3 Featured Section Designs','Experience Section Optimization','Skills & Keywords Optimization','Custom LinkedIn URL Guidance','Profile SEO & Keyword Strategy','CTA & Profile Positioning','2 Revision Rounds','3–4 Days Delivery']}
 ]},
{id:'li-growth', label:'LinkedIn Growth Plan', msgLabel:'LinkedIn Growth Plan', layout:'grid', featuredTier:'Platinum',
 packages:[
  {tier:'Silver', price:'$400', priceNote:'/ month', waPrice:'$400/month', features:['12 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','LinkedIn Content Strategy','Content Planning','Content Ideas + Copywriting','Target Audience Research','Basic Connection Building','Targeted Networking','20–25 Meaningful Comments / day','Engagement 5 Days / week','LinkedIn-Optimized Content','Custom Design No Templates','Consistent Brand Identity','Monthly Performance Review']},
  {tier:'Gold', price:'$600', priceNote:'/ month', waPrice:'$600/month', features:['16 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','Complete Content Strategy','Monthly Content Calendar','Content Ideas + Copywriting','Audience & Competitor Research','Targeted Connection Building','Personalized Networking Strategy','30–35 Meaningful Comments / day','Engagement 5 Days / week','Profile Positioning','DM & Conversation Guidance','Monthly Analytics & Optimization','LinkedIn-Optimized Content','Custom Design No Templates','Consistent Brand Identity']},
  {tier:'Platinum', price:'$950', priceNote:'/ month', waPrice:'$950/month', features:['20 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','Complete LinkedIn Growth Strategy','Full Content Calendar & Planning','Content Ideas + Copywriting','Audience & Competitor Research','Advanced Targeted Connection Building','Personalized Networking','40–50 Meaningful Comments / day','Engagement 5 Days / week','Profile Positioning & Optimization','Personal Branding Strategy','DM & Conversation Support','Lead & Relationship Building Strategy','Monthly Analytics & Performance Review','Strategy Adjustments Based on Performance','Priority Support','End-to-End LinkedIn Management']}
 ]},
{id:'social-growth', label:'All Social Media Growth', msgLabel:'All Social Media Growth Plan', layout:'grid', featuredTier:'Gold', badgeTier:'Gold',
 packages:[
  {tier:'Silver', price:'$500', priceNote:'/ month', waPrice:'$500/month', features:['Facebook + Instagram + LinkedIn','12 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','Monthly Content Calendar','Content Ideas + Copywriting','Basic Audience Research','Platform-Optimized Content','Basic Community Engagement','15–20 Meaningful Comments / day','Engagement 5 Days / week','Basic Connection & Audience Growth','Custom Designs No Templates','Consistent Brand Identity','Monthly Performance Review']},
  {tier:'Gold', price:'$750', priceNote:'/ month', waPrice:'$750/month', features:['Facebook + Instagram + LinkedIn','16 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','Complete Content Strategy','Monthly Content Calendar','Content Ideas + Copywriting','Audience + Competitor Research','Targeted Audience Growth','LinkedIn Connection Building','Instagram & Facebook Community Engagement','25–35 Meaningful Comments / day','Engagement 5 Days / week','Profile/Page Optimization','DM & Conversation Guidance','Monthly Analytics & Optimization','Platform-Specific Content Strategy','Custom Designs No Templates','Posts shared In Groups','Consistent Brand Identity']},
  {tier:'Platinum', price:'$1200', priceNote:'/ month', waPrice:'$1200/month', features:['Facebook + Instagram + LinkedIn','20 Custom Designs / month','Carousels, Cheat Sheets & Single Visuals','Complete Social Media Growth Strategy','Full Content Calendar & Planning','Content Ideas + Copywriting','Audience & Competitor Research','Advanced Audience Growth Strategy','Targeted LinkedIn Connection Building','Facebook & Instagram Community Management','40–50 Meaningful Comments / day','Engagement 5 Days / week','Profile & Page Optimization','Personal Branding Strategy','DM & Conversation Support','Lead & Relationship Building','Posts shared In Groups','Monthly Analytics & Reporting','Strategy Adjustments Based on Performance','Priority Support','End-to-End Social Media Management']}
 ]},
{id:'meta-ads', label:'Meta Ads', msgLabel:'Meta Ads', layout:'grid', featuredTier:'Platinum',
 packages:[
  {tier:'Silver', price:'$250', features:['Facebook + Instagram Ads','1 Ad Campaign','Up to 2 Ad Sets','Up to 3 Ad Creatives','Audience Research','Basic Targeting Setup','Custom Ad Copy','Campaign Setup & Management','Pixel / Conversion Tracking Guidance','Meta Ads Manager Optimization','Weekly Performance Check','Basic Performance Report','Ad Spend Not Included']},
  {tier:'Gold', price:'$450', features:['Facebook + Instagram Ads','Up to 4 Active Campaigns','Multiple Ad Sets','Up to 10 Ad Creatives','Advanced Audience Research','Cold + Warm + Retargeting Audiences','Custom & Lookalike Audience Strategy','Funnel-Based Campaign Structure','Multiple Creative & Copy Testing','A/B Testing','Pixel + Conversion API Guidance','Lead Form / Website Conversion Strategy','Daily Monitoring','Continuous Campaign Optimization','Budget Allocation & Scaling','Retargeting Optimization','Detailed Monthly Reporting','Strategy Calls / Recommendations','Priority Support','Ad Spend Not Included']},
  {tier:'Platinum', sub:'FULL META ADS MANAGEMENT', price:'$700', features:['Facebook + Instagram Ads','Up to 10 Active Campaigns','Multiple Ad Sets','Up to 10 Ad Creatives','Advanced Audience Research','Cold + Warm + Retargeting Audiences','Custom & Lookalike Audience Strategy','Funnel-Based Campaign Structure','Multiple Creative & Copy Testing','A/B Testing','Pixel + Conversion API Guidance','Lead Form / Website Conversion Strategy','Daily Monitoring','Continuous Campaign Optimization','Budget Allocation & Scaling','Retargeting Optimization','Detailed Monthly Reporting','Strategy Calls / Recommendations','Priority Support','Ad Spend Not Included']}
 ]}
];

let active = categories[0].id;
const tabsEl = document.getElementById('tabs');
const cardsEl = document.getElementById('cards');

function renderTabs(){
  tabsEl.innerHTML = categories.map(c =>
    `<button class="tab ${c.id===active?'active':''}" role="tab" aria-selected="${c.id===active}" data-id="${c.id}">${c.label}</button>`
  ).join('');
  tabsEl.querySelectorAll('.tab').forEach(btn=>{
    btn.addEventListener('click', ()=>{ active = btn.dataset.id; renderTabs(); renderCards(); });
  });
}

function waMessage(cat, pkg){
  const priceText = pkg.waPrice || pkg.price;
  if (cat.singleMsg){
    return `Hello, I am interested in the ${pkg.tier} package (${priceText}). I would like to discuss the details.`;
  }
  return `Hello, I am interested in the ${pkg.tier} ${cat.msgLabel} package (${priceText}). I would like to discuss the details.`;
}

function cardHTML(cat, pkg){
  const featured = cat.featuredTier === pkg.tier;
  const showBadge = cat.badgeTier === pkg.tier;
  return `<div class="card ${featured?'featured':''}">
    ${showBadge ? '<span class="badge">Most Popular</span>' : ''}
    <div class="tier">${pkg.tier}</div>
    <div class="tier-sub">${pkg.sub ? pkg.sub : cat.label}</div>
    <ul class="feats">${pkg.features.map(f=>`<li class="feat">${check}<span>${f}</span></li>`).join('')}</ul>
    <div class="price-row">
      <div class="price">${pkg.price}${pkg.priceNote?`<small>${pkg.priceNote}</small>`:''}</div>
      <button class="cta" data-cat="${cat.id}" data-tier="${pkg.tier}">Get Started</button>
    </div>
  </div>`;
}

function renderCards(){
  const cat = categories.find(c=>c.id===active);
  cardsEl.className = 'grid' + (cat.layout==='single' ? ' single' : '');
  cardsEl.style.opacity = 0;
  cardsEl.innerHTML = cat.packages.map(p=>cardHTML(cat,p)).join('');
  requestAnimationFrame(()=>{ cardsEl.style.transition='opacity .25s ease'; cardsEl.style.opacity = 1; });
  cardsEl.querySelectorAll('.cta').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const cat = categories.find(c=>c.id===btn.dataset.cat);
      const pkg = cat.packages.find(p=>p.tier===btn.dataset.tier);
      const msg = waMessage(cat, pkg);
      const label = cat.layout==='single' ? pkg.tier : `${pkg.tier} ${cat.label}`;
      const sel = document.getElementById('selectedPkg');
      sel.style.display = 'inline-block';
      sel.textContent = 'Selected package: ' + label;
      document.getElementById('waBtn').href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
      document.getElementById('contact').scrollIntoView({behavior:'smooth'});
    });
  });
}

renderTabs();
renderCards();



/* Title Case: first letter of every word capital, rest small */
(function(){
  var re=/[\p{L}][\p{L}'\u2019]*/gu;
  var keep={linkedin:'LinkedIn',whatsapp:'WhatsApp',facebook:'Facebook',instagram:'Instagram'};
  function tc(t){return t.replace(re,function(w){
    var k=keep[w.toLowerCase()]; if(k) return k;
    if(w.length>1 && w===w.toUpperCase()) return w; /* keep acronyms: SEO, PDF, JPG, CTA, DM */
    return w[0].toUpperCase()+w.slice(1).toLowerCase();});}
  function walk(n){
    if(n.nodeType===3){var v=tc(n.nodeValue);if(v!==n.nodeValue)n.nodeValue=v;return;}
    if(n.nodeType!==1||/^(SCRIPT|STYLE)$/.test(n.tagName)||(n.classList&&n.classList.contains('rt-text')))return;
    for(var c=n.firstChild;c;c=c.nextSibling)walk(c);
  }
  var obs=new MutationObserver(function(){obs.disconnect();walk(document.body);obs.observe(document.body,{childList:true,subtree:true,characterData:true});});
  walk(document.body);
  obs.observe(document.body,{childList:true,subtree:true,characterData:true});
  document.title=tc(document.title);
})();

// "What Clients Say" button -> Work page, Client Reviews section
document.querySelectorAll('[data-goto-reviews]').forEach(function(btn){
  btn.addEventListener('click', function(e){
    e.preventDefault();
    document.querySelectorAll('.page').forEach(function(p){ p.classList.toggle('active', p.id === 'page-work'); });
    document.querySelectorAll('.navlink').forEach(function(l){ l.classList.toggle('current', l.dataset.page === 'work'); });
    setTimeout(function(){
      var t = document.getElementById('reviews-section');
      if (t) t.scrollIntoView({behavior:'smooth', block:'start'});
    }, 80);
  });
});


