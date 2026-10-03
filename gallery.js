// Project modal + lightbox
const Gallery = (() => {
  const $ = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  let cur = null, idx = 0, imgs = [], lbOpen = false, lastFocus = null;
  function imgTag(src, alt, cls=""){ const i=new Image(); i.src=src; i.alt=alt; i.loading="lazy"; i.className=cls;
    i.onerror=()=>{ const d=document.createElement("div"); d.className="ph "+cls; d.textContent="PROJECT IMAGE"; i.replaceWith(d); }; return i; }
  function show(){
    const stage=$("#mStage"); stage.innerHTML="";
    if(!imgs.length){ stage.innerHTML='<div class="ph">PROJECT IMAGE</div>'; $("#mCount").textContent=""; $("#mThumbs").innerHTML=""; return; }
    const im=imgTag(imgs[idx], cur.title+" screenshot "+(idx+1)); im.onclick=openLb; stage.appendChild(im);
    $("#mCount").textContent=(idx+1)+" / "+imgs.length;
    const t=$("#mThumbs"); t.innerHTML="";
    imgs.forEach((s,i)=>{ const b=document.createElement("button"); b.setAttribute("aria-label","Image "+(i+1)); b.className=i===idx?"on":"";
      b.appendChild(imgTag(s,"")); b.onclick=()=>{idx=i;show();}; t.appendChild(b); });
    if(lbOpen) $("#lbImg").src=imgs[idx];
  }
  const step = d => { if(imgs.length){ idx=(idx+d+imgs.length)%imgs.length; show(); } };
  function open(id){
    cur=projects.find(p=>p.id===id); if(!cur) return; lastFocus=document.activeElement;
    imgs=[cur.coverImage,...cur.images]; idx=0;
    $("#mTitle").textContent=cur.title; $("#mCat").textContent=cur.categories.join(" · ");
    $("#mDesc").textContent=cur.description;
    $("#mTech").innerHTML=cur.technologies.map(t=>`<span class="tag">${esc(t)}</span>`).join("");
    $("#mFeat").innerHTML=cur.features.map(f=>`<li>${esc(f)}</li>`).join("")||"<li>Details to be added</li>";
    const l=$("#mLinks"); l.innerHTML="";
    [["GitHub",cur.github],["Live Demo",cur.liveDemo]].forEach(([n,u])=>{
      const a=document.createElement(u?"a":"span"); a.className="btn "+(u?"btn-p":"btn-g disabled"); a.textContent=u?n:n+" (to be added)";
      if(u){a.href=u;a.target="_blank";a.rel="noopener";} l.appendChild(a); });
    $("#modal").classList.add("open"); document.body.style.overflow="hidden"; show(); $("#mClose").focus();
  }
  function close(){ $("#modal").classList.remove("open"); document.body.style.overflow=""; lastFocus&&lastFocus.focus(); }
  function openLb(){ if(!imgs.length) return; lbOpen=true; $("#lbImg").src=imgs[idx]; $("#lightbox").classList.add("open"); }
  function closeLb(){ lbOpen=false; $("#lightbox").classList.remove("open"); }
  document.addEventListener("DOMContentLoaded",()=>{
    $("#mClose").onclick=close; $("#mPrev").onclick=()=>step(-1); $("#mNext").onclick=()=>step(1);
    $("#modal").addEventListener("click",e=>{ if(e.target.id==="modal") close(); });
    $("#lightbox").addEventListener("click",e=>{ if(e.target.id!=="lbPrev"&&e.target.id!=="lbNext") closeLb(); });
    $("#lbPrev").onclick=()=>step(-1); $("#lbNext").onclick=()=>step(1);
  });
  document.addEventListener("keydown",e=>{
    if(!$("#modal").classList.contains("open")) return;
    if(e.key==="Escape") lbOpen?closeLb():close();
    if(e.key==="ArrowLeft") step(-1);
    if(e.key==="ArrowRight") step(1);
  });
  return { open, imgTag, esc };
})();
