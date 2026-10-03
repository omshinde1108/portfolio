(() => {
const C = portfolioConfig, $ = (s,r=document)=>r.querySelector(s), $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = Gallery.esc, ok = v => v && !/^\[.*\]$/.test(v);
const html = (el, h) => { el.innerHTML = h; };
const tags = a => a.map(t=>`<span class="tag">${esc(t)}</span>`).join("");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// Theme
const root = document.documentElement;
try { root.dataset.theme = localStorage.getItem("theme") || "dark"; } catch(e){}
$("#theme").onclick = () => { root.dataset.theme = root.dataset.theme==="dark"?"light":"dark"; try{localStorage.setItem("theme",root.dataset.theme);}catch(e){} };

// Nav
const links = [["home","Home"],["about","About"],["skills","Skills"],["projects","Projects"],["experience","Experience"],["education","Education"],["contact","Contact"]];
html($("#menu"), links.map(([id,n])=>`<li><a href="#${id}" data-nav="${id}">${n}</a></li>`).join(""));
$("#logo").textContent = C.shortName; document.title = `${C.name} | AI & Data Science Student | Developer`;
const burger = $("#burger"), menu = $("#menu");
burger.onclick = () => { const o = menu.classList.toggle("open"); burger.setAttribute("aria-expanded", o); };
$$("#menu a").forEach(a => a.addEventListener("click", () => { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }));
addEventListener("scroll", () => { $("#nav").classList.toggle("solid", scrollY>30); $("#top").classList.toggle("show", scrollY>500); }, {passive:true});
const navObs = new IntersectionObserver(es => es.forEach(e => { if(e.isIntersecting){ $$("[data-nav]").forEach(a=>a.classList.toggle("active", a.dataset.nav===e.target.id)); }}), {rootMargin:"-45% 0px -50% 0px"});
links.forEach(([id])=>navObs.observe($("#"+id)));
$("#top").onclick = () => scrollTo({top:0, behavior: reduce?"auto":"smooth"});

// Hero
$("#hLabel").textContent = C.hero.label;
html($("#hTitle"), C.hero.lines.map((l,i)=>`<span class="line" style="--d:${i*.15}s">${esc(l)}</span>`).join(""));
$("#hText").textContent = C.hero.text;
html($("#stats"), C.stats.map(s=>`<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join(""));
$("#termText").textContent = `> whoami\n${C.name}\n\n> education\nB.E. AI & Data Science (2023–2027)\n\n> focus\n${C.focusAreas.join(", ")}\n\n> status\nOpen to Opportunities_`;
let ri = 0; const rot = $("#rotator");
const tick = () => { rot.textContent = C.rotatingTitles[ri++ % C.rotatingTitles.length]; };
tick(); if(!reduce) setInterval(tick, 2400);

// Links
const ghRepos = C.github.replace(/\/$/,"") + "?tab=repositories";
$$("[data-link]").forEach(a => { const k=a.dataset.link, u = k==="githubRepos"?(ok(C.github)?ghRepos:""):C[k];
  if(ok(u)) a.href=u; else a.style.display="none"; });

// Resume (shows note if file missing)
let resumeOk = false;
fetch(C.resume, {method:"HEAD"}).then(r=>{ resumeOk = r.ok; }).catch(()=>{}).finally(()=>{});
$$("[data-resume]").forEach(a => { a.href = C.resume;
  a.addEventListener("click", async e => { try { const r = await fetch(C.resume,{method:"HEAD"}); if(!r.ok) throw 0; } catch(_) { if(location.protocol!=="file:"){ e.preventDefault(); $("#resNote").hidden=false; $("#resume").scrollIntoView({behavior:"smooth"}); } } }); });
$("#navResume").href = "#resume";

// About
$("#aboutText").textContent = C.about; html($("#highlights"), tags(C.highlights));
html($("#profile"), C.profile.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join(""));
const ph = $("#photo"); const pi = new Image(); pi.src=C.profileImage; pi.alt=C.name+" profile photo"; pi.loading="lazy";
pi.onload=()=>ph.appendChild(pi); ph.innerHTML = `<div class="ph">ADD PHOTO<br><small>${esc(C.profileImage)}</small></div>`; pi.onload=()=>{ph.innerHTML="";ph.appendChild(pi);};

// Education / Skills
html($("#eduList"), C.education.map(e=>`<article class="card tl"><span class="badge">${esc(e.status)}</span><h3>${esc(e.degree)}</h3><p class="muted">${esc(e.institution)}</p><p class="period">${esc(e.duration)}</p><h4>Relevant Areas</h4><div class="tags">${tags(e.areas)}</div></article>`).join(""));
html($("#skillGrid"), C.skills.map(s=>`<article class="card skill"><div class="ico">${esc(s.icon)}</div><h3>${esc(s.category)}</h3><p class="muted">${esc(s.desc)}</p><div class="tags">${tags(s.items)}</div></article>`).join(""));
html($("#focus"), tags(C.focusAreas)); html($("#techs"), tags(C.technologies));

// Projects
let active = "All"; const grid = $("#pGrid");
html($("#filters"), projectFilters.map(f=>`<button class="chip${f==="All"?" on":""}" data-f="${esc(f)}">${esc(f)}</button>`).join(""));
function renderProjects(){
  const list = projects.filter(p => active==="All" || p.categories.includes(active));
  $("#count").textContent = `Showing ${list.length} project${list.length===1?"":"s"}`;
  grid.innerHTML = "";
  list.forEach((p,i) => {
    const c = document.createElement("article"); c.className="card pcard pop"; c.style.animationDelay = (i*60)+"ms";
    const img = document.createElement("div"); img.className="cover"; img.appendChild(Gallery.imgTag(p.coverImage, p.title+" cover"));
    c.appendChild(img);
    const b = document.createElement("div"); b.className="pbody";
    b.innerHTML = `<p class="eyebrow">${esc(p.categories.join(" · "))}</p><h3>${esc(p.title)}</h3><p class="muted">${esc(p.shortDescription)}</p><div class="tags">${tags(p.technologies.slice(0,4))}</div>`;
    const btn = document.createElement("button"); btn.className="btn btn-g sm"; btn.textContent="View Project"; btn.onclick = () => Gallery.open(p.id);
    b.appendChild(btn); c.appendChild(b); grid.appendChild(c);
  });
}
$("#filters").addEventListener("click", e => { const b=e.target.closest(".chip"); if(!b) return; active=b.dataset.f; $$(".chip").forEach(x=>x.classList.toggle("on",x===b)); renderProjects(); });
renderProjects();

// Experience / certs / achievements / github
html($("#expList"), C.experience.some(e=>ok(e.period))||C.experience.some(e=>ok(e.company)) ? C.experience.map(e=>`<article class="card tl"><span class="badge">INTERNSHIP</span><h3>${esc(e.role)}</h3><p class="muted">${esc(e.company)} · ${esc(e.location)}</p><p class="period">${esc(e.period)}</p><ul class="feat">${e.points.map(p=>`<li>${esc(p)}</li>`).join("")}</ul></article>`).join("") : `<p class="muted">${esc(C.experienceFallback)}</p>`);
html($("#certList"), C.certifications.length ? C.certifications.map(c=>`<article class="card"><h3>${esc(c.name||"Certification Name")}</h3><p class="muted">${esc(c.org||"Issuing Organization")} · ${esc(c.date||"Date")}</p><p class="muted">Credential ID: ${esc(c.id||"Details to be added")}</p>${ok(c.link)?`<a class="btn btn-g sm" href="${esc(c.link)}" target="_blank" rel="noopener">View Certificate</a>`:""}</article>`).join("") : `<article class="card"><h3>Certification Name</h3><p class="muted">Issuing Organization · Date</p><p class="muted">Credential ID: Details to be added</p></article>`);
html($("#achList"), C.achievements.length ? `<ul class="feat">${C.achievements.map(a=>`<li>${esc(a)}</li>`).join("")}</ul>` : `<p class="muted">Achievements will be added.</p>`);
$("#ghText").textContent = C.githubIntro;
html($("#ghStats"), C.githubStats.map(s=>`<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>`).join(""));

// Contact
html($("#cInfo"), `<h3>${esc(C.name)}</h3><p class="muted">${esc(C.location)}</p>
 <p><a href="mailto:${esc(C.email)}">${esc(C.email)}</a> <button class="btn btn-g sm" id="copy">Copy Email</button></p>
 <p><a href="tel:${esc(C.phone.replace(/\s/g,""))}">${esc(C.phone)}</a></p>`);
$("#copy").onclick = async () => { try { await navigator.clipboard.writeText(C.email); } catch(e){ const t=document.createElement("textarea"); t.value=C.email; document.body.appendChild(t); t.select(); document.execCommand("copy"); t.remove(); } toast("Email copied!"); };
function toast(m){ const t=$("#toast"); t.textContent=m; t.classList.add("show"); setTimeout(()=>t.classList.remove("show"),2000); }
$("#form").addEventListener("submit", e => { e.preventDefault(); const f=e.target, d=Object.fromEntries(new FormData(f));
  if(!d.name.trim()||!d.subject.trim()||!d.message.trim()||!/^\S+@\S+\.\S+$/.test(d.email)){ $("#fErr").textContent="Please fill in name, a valid email, subject and message."; return; }
  $("#fErr").textContent="";
  const body = `Name: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone}\nMessage:\n${d.message}`;
  location.href = `mailto:${C.email}?subject=${encodeURIComponent("Portfolio Contact — "+d.subject)}&body=${encodeURIComponent(body)}`; });

// Footer + socials
$("#fName").textContent = C.name; $("#fTag").textContent = C.footerTagline;
html($("#fLinks"), links.filter(l=>l[0]!=="education").map(([id,n])=>`<li><a href="#${id}">${n}</a></li>`).join(""));
const soc = {GitHub:C.github, LinkedIn:C.linkedin, Instagram:C.social.instagram, Behance:C.social.behance, LeetCode:C.social.leetcode, Kaggle:C.social.kaggle};
html($("#fSocial"), Object.entries(soc).filter(([,u])=>ok(u)).map(([n,u])=>`<a class="tag" href="${esc(u)}" target="_blank" rel="noopener">${n}</a>`).join(""));

// Reveal
const io = new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target);} }), {threshold:.08});
$$(".reveal").forEach(el=>io.observe(el));

// Neural network canvas
const cv = $("#net"), g = cv.getContext("2d"); let W,H,pts=[];
function size(){ W=cv.width=cv.offsetWidth; H=cv.height=cv.offsetHeight; pts=Array.from({length:Math.min(60,W/22|0)},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3})); }
function draw(){ g.clearRect(0,0,W,H); const col = getComputedStyle(root).getPropertyValue("--accent").trim()||"#22d3ee"; g.fillStyle=col; g.strokeStyle=col;
  pts.forEach((p,i)=>{ if(!reduce){p.x+=p.vx;p.y+=p.vy; if(p.x<0||p.x>W)p.vx*=-1; if(p.y<0||p.y>H)p.vy*=-1;}
   g.globalAlpha=.6; g.beginPath(); g.arc(p.x,p.y,1.6,0,7); g.fill();
   for(let j=i+1;j<pts.length;j++){ const q=pts[j], d=Math.hypot(p.x-q.x,p.y-q.y); if(d<120){ g.globalAlpha=.18*(1-d/120); g.beginPath(); g.moveTo(p.x,p.y); g.lineTo(q.x,q.y); g.stroke(); } } });
  if(!reduce && !document.hidden) requestAnimationFrame(draw); }
size(); draw(); addEventListener("resize", ()=>{ size(); if(reduce) draw(); });
document.addEventListener("visibilitychange", ()=>{ if(!document.hidden && !reduce) draw(); });
})();
