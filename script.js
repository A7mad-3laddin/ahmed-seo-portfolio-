const $ = (id) => document.getElementById(id);
const d = portfolioData;
const setText = (id, value) => { if ($(id)) $(id).textContent = value || ""; };

setText("brandInitials", d.initials); setText("footerInitials", d.initials);
setText("brandName", d.name.toUpperCase()); setText("footerName", d.name.toUpperCase());
setText("availability", d.availability); setText("heroRole", d.role);
setText("heroText", d.heroText); setText("heroTitle", d.heroTitle);
setText("aboutText", d.about); setText("location", d.location);
setText("year", new Date().getFullYear());
setText("emailText", d.email); setText("phoneText", d.phone); setText("websiteText", d.website);
$("emailLink").href = `mailto:${d.email}`;
$("phoneLink").href = `https://wa.me/${(d.phone || "").replace(/\D/g,"")}`;
$("matbuildLink").href = d.website;

$("experienceList").innerHTML = d.experience.map(x => `
  <article class="timeline-item"><div><h3>${x.company}</h3><div class="job">${x.role}</div></div><span class="period">${x.period}</span>
  <ul>${x.details.map(v=>`<li>${v}</li>`).join("")}</ul></article>`).join("");

$("projectList").innerHTML = d.projects.map((p,i) => `
  <article class="project-card"><div class="project-top"><span class="project-number">PROJECT / 0${i+1}</span><span class="project-type">${p.type}</span></div>
  <h3>${p.name}</h3><p>${p.summary}</p><div class="project-highlights">${p.highlights.map(h=>`<span>${h}</span>`).join("")}</div>
  ${p.url ? `<a class="project-link" href="${p.url}" target="_blank" rel="noopener">Explore Website ↗</a>` : ""}</article>`).join("");

const matbuild = d.projects.find(p=>p.name.toLowerCase()==="matbuild");
$("caseMetrics").innerHTML = (matbuild?.metrics || []).map(m=>`<div class="metric"><strong>${m.value}</strong><span>${m.label}</span></div>`).join("");
$("evidenceGrid").innerHTML = (matbuild?.screenshots || []).map(s=>`<div class="evidence-card"><a href="${s.src}" target="_blank" rel="noopener" aria-label="Open original screenshot in full size"><img src="${s.src}" alt="${s.alt}" loading="lazy"></a><p>${s.caption} · Original image — click to view full size</p></div>`).join("");

$("skillList").innerHTML = d.skills.map(s=>`<span>${s}</span>`).join("");
$("toolList").innerHTML = d.tools.map(t=>`<span>✦ &nbsp; ${t}</span>`).join("");
$("serviceList").innerHTML = d.services.map((s,i)=>`<article class="service-card"><span class="service-index">0${i+1} / SERVICE</span><h3>${s.title}</h3><p>${s.text}</p></article>`).join("");
$("processList").innerHTML = d.process.map(p=>`<article class="process-card"><strong>${p[0]}</strong><h3>${p[1]}</h3><p>${p[2]}</p></article>`).join("");

const menu = $("nav");
$("menuToggle").addEventListener("click",()=>menu.classList.toggle("open"));
menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>menu.classList.remove("open")));
