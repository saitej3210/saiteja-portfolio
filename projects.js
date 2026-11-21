/* Edit your projects here.
   s=slug (cover + screenshot file name)  n=name  c=category (web|ai|business|creative)  d=short text
   u=live link  t=tags  h=colour hue
   problem / role / built[] = shown in the case-study popup — edit freely. */
(() => {
const P = [
 {s:"portfolio", n:"Saiteja Portfolio", c:"creative", h:275, u:"https://saitej3210.github.io/saiteja-portfolio/", t:["Canvas","JavaScript","Scroll animation"],
  d:"This site — a scroll-controlled cinematic portfolio with a 240-frame character animation.",
  problem:"A résumé PDF doesn't show how someone builds. I wanted a portfolio that feels like a product launch.",
  role:"Solo — concept, design and development",
  built:["240-frame character animation scrubbed by scroll on a single canvas","Dark / light themes, project filters and case-study popups","Pure HTML, CSS and JavaScript — no build step"]},
 {s:"novaryx", n:"NOVARYX Studio", c:"business", h:215, u:"https://saitej3210.github.io/novaryx-studio/", t:["Studio","Web design"],
  d:"My creative digital studio — websites and immersive experiences for brands.",
  problem:"Small brands need a website that stands out, and I wanted one home for that work.",
  role:"Founder — branding, design and development",
  built:["Studio site presenting services and selected work","Immersive, visual-first web experiences for brands"]},
 {s:"noir-cafe", n:"NOIR CAFÉ", c:"creative", h:30, u:"https://saitej3210.github.io/noir-cafe/", t:["React","Vite","Three.js"],
  d:"A five-room luxury café with a scroll-driven 3D camera journey.",
  problem:"Café sites are usually flat brochures. I wanted visitors to walk through the space before they ever visit.",
  role:"Solo — design, 3D and front-end development",
  built:["Five rooms explored through a scroll-driven 3D camera path","React + Vite app with Three.js scenes","Atmospheric luxury look: dark palette, soft lighting"]},
 {s:"good-pizzas", n:"GOOD PIZZAS", c:"business", h:12, u:"https://good-pizzas-production.up.railway.app/", t:["Node","SQLite","Three.js"],
  d:"Restaurant website with cinematic intro, menu, 3D interior, table booking and admin dashboard.",
  problem:"A restaurant needs more than a menu page: bookings, content updates and a memorable first impression.",
  role:"Solo — full-stack development",
  built:["Cinematic intro and a 3D restaurant interior","Menu, table booking and an admin dashboard","Node backend with SQLite, deployed on Railway"]},
 {s:"aurelia", n:"AURELIA", c:"creative", h:335, u:"https://saitej3210.github.io/aurelia", t:["Web","UI design"],
  d:"A refined live website — elegant, visual-first brand experience.",
  problem:"Showing how far typography, spacing and imagery alone can carry a premium brand feel.",
  role:"Solo — UI design and development",
  built:["Elegant, visual-first layout","Responsive across phone, tablet and desktop"]},
 {s:"proctored-exam", n:"Proctored Exam System", c:"web", h:200, u:"https://proctored-exam-system-9ndc.onrender.com/", t:["Python","Flask","SQL","Render"],
  d:"Flask-based platform for running proctored online assessments.",
  problem:"Online tests need a controlled, trackable environment for conducting assessments.",
  role:"Solo — backend and front-end development",
  built:["Flask application for conducting online assessments","SQL-backed data storage","Deployed live on Render"]},
 {s:"speakdeck-ai", n:"SpeakDeck AI", c:"ai", h:255, u:"https://speakdeck-ai-frontend.onrender.com/", t:["AI","Python","Render"],
  d:"An AI-powered presentation project, deployed live.",
  problem:"Building a presentation is slow. This project explores letting AI do the first draft.",
  role:"Solo — AI integration and development",
  built:["AI-assisted presentation workflow","Python backend with a separate front-end","Deployed live on Render"]},
 {s:"our-little-universe", n:"Our Little Universe", c:"creative", h:290, u:"https://saitej3210.github.io/our-little-universe/", t:["Interactive","Creative web"],
  d:"A personal, story-style interactive website — a little universe made of moments.",
  problem:"A memory should feel like a place you can wander, not a photo album you scroll past.",
  role:"Solo — storytelling, design and development",
  built:["Story-style interactive experience","Moments arranged as a small universe to explore"]},
 {s:"corafree", n:"CoraFree Site", c:"business", h:170, u:"https://saitej3210.github.io/corafree-site/", t:["Web","Responsive"],
  d:"A live business website built and published for the CoraFree brand.",
  problem:"A new brand needed a clean, trustworthy online presence, fast.",
  role:"Design and development",
  built:["Brand-aligned, responsive business website","Published live and ready to share"]},
 {s:"ikkat-sarees", n:"Ikkat Sarees", c:"business", h:350, u:"https://saitej3210.github.io/ikkatsarees/", t:["Storefront","Web"],
  d:"Online storefront celebrating traditional Pochampally Ikkat sarees.",
  problem:"Handloom sellers need a storefront that shows the craft, not just a price list.",
  role:"Design and development",
  built:["Storefront celebrating Pochampally Ikkat weaves","Pattern-inspired visual identity"]}
];
const CAT = {web:"WEB APP", ai:"AI / TOOLS", business:"BUSINESS", creative:"CREATIVE / 3D"};
const SHOTS = window.SHOTS || [];
const has = p => SHOTS.includes(p.s);
const pad = n => String(n).padStart(2,"0");

const g = document.getElementById("pgrid");
g.innerHTML = P.map((p,i)=>`<article class="pcard rv" data-category="${p.c}" data-i="${i}" style="--h:${p.h}">
<div class="cover"><img src="${has(p)?`assets/shots/${p.s}.jpg`:`assets/covers/${p.s}.svg`}" alt="${p.n} preview" loading="lazy">${has(p)?`<img class="alt" src="assets/shots/${p.s}-2.jpg" alt="" loading="lazy">`:""}<b>${pad(i+1)}</b><i class="peek">Case study ↗</i></div>
<div class="pbody"><small>${CAT[p.c]}</small><h3>${p.n}</h3><p>${p.d}</p>
<ul class="tags">${p.t.map(t=>`<li>${t}</li>`).join("")}</ul>
<div class="pactions"><a class="btn red sm" href="${p.u}" target="_blank" rel="noopener noreferrer">Live project ↗</a><button class="btn ghost sm open-case" type="button" data-i="${i}">Case study</button></div></div></article>`).join("");

/* ---------- case-study modal ---------- */
const m = document.getElementById("pmodal");
const $ = id => document.getElementById(id);
let cur = 0;
function fill(i){
  cur = i; const p = P[i];
  $("pm-cat").textContent = CAT[p.c] + " · " + pad(i+1) + " / " + pad(P.length);
  $("pm-title").textContent = p.n; $("pm-sum").textContent = p.d;
  $("pm-problem").textContent = p.problem; $("pm-role").textContent = p.role;
  $("pm-built").innerHTML = p.built.map(b=>`<li>${b}</li>`).join("");
  $("pm-tags").innerHTML = p.t.map(t=>`<li>${t}</li>`).join("");
  $("pm-live").href = p.u;
  m.style.setProperty("--h", p.h);
  const imgs = has(p) ? [`assets/shots/${p.s}.jpg`,`assets/shots/${p.s}-2.jpg`,`assets/shots/${p.s}-m.jpg`] : [`assets/covers/${p.s}.svg`];
  $("pm-media").innerHTML = `<div class="pm-main"><img id="pm-big" src="${imgs[0]}" alt="${p.n} screenshot"></div>` +
    (imgs.length>1 ? `<div class="pm-thumbs">${imgs.map((s,k)=>`<button type="button" class="${k?"":"on"}" data-src="${s}" aria-label="Screenshot ${k+1}"><img src="${s}" alt=""></button>`).join("")}</div>` : "");
}
function openCase(i){ fill(i); if(!m.open) m.showModal(); document.body.style.overflow="hidden"; }
g.addEventListener("click", e => {
  if (e.target.closest("a")) return;
  const c = e.target.closest(".pcard"); if (c) openCase(+c.dataset.i);
});
m.addEventListener("click", e => {
  if (e.target === m) m.close();                       // click on backdrop
  const t = e.target.closest(".pm-thumbs button");
  if (t) { $("pm-big").src = t.dataset.src; m.querySelectorAll(".pm-thumbs button").forEach(b=>b.classList.toggle("on", b===t)); }
});
$("pm-close").addEventListener("click", () => m.close());
$("pm-next").addEventListener("click", () => fill((cur+1) % P.length));
m.addEventListener("close", () => { document.body.style.overflow = ""; });
window.__PROJECTS = P;
})();
