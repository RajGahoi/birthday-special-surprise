(() => {
const C = window.BDAY, $ = id => document.getElementById(id), R = Math.random;
const el = (t, c, h) => { const e = document.createElement(t); if (c) e.className = c; if (h) e.innerHTML = h; return e; };
const ph = t => "data:image/svg+xml," + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='#3a1856'/><text x='50%' y='50%' text-anchor='middle' fill='#ff8fb1' font-family='sans-serif' font-size='26'>${t}</text></svg>`);
const img = (src, alt) => { const i = el("img"); i.src = src; i.alt = alt || ""; i.loading = "lazy"; i.onerror = () => { i.onerror = null; i.src = ph(src); }; return i; };
const words = (txt, step = .05, k = {n: 0}) => txt.split(" ").map(w => `<span class="w" style="transition-delay:${(k.n++ * step).toFixed(2)}s">${w}</span>`).join(" ");
const sleep = ms => new Promise(r => setTimeout(r, ms));
const tl = $("themecss"); if (tl) tl.href = C.theme === "light" ? "style-light.css" : "style-dark.css";
document.querySelector("meta[name=theme-color]").content = C.theme === "light" ? "#fff5f9" : "#13071e";

document.title = `Happy Birthday, ${C.name}! 💖`;
$("gate-top").textContent = C.gateText; $("nick").textContent = C.nicknames.join("  ·  ");

// hero background
const hb = $("hero-bg"); hb.style.backgroundImage = `url('${C.hero.poster || C.hero.src}')`;
let vid = null;
$("hero").classList.toggle("classic", C.heroStyle !== "framed");
const heroImg = $("hero-img"); heroImg.src = C.hero.poster || C.hero.src; heroImg.style.objectPosition = C.hero.pos || "center"; heroImg.onerror = () => { heroImg.onerror = null; heroImg.src = ph("hero photo"); };
if (C.hero.type === "video") { vid = el("video"); vid.src = C.hero.src; vid.loop = vid.muted = vid.playsInline = true; vid.onerror = () => vid.remove(); vid.onloadeddata = () => $("hero").classList.add("has-video"); $("hero-vid").appendChild(vid); }

// countdown + age
const b = new Date(C.birth), met = new Date(C.metDate);
function tick() {
  const n = new Date(), today = n.getMonth() === b.getMonth() && n.getDate() === b.getDate();
  const nx = new Date(n.getFullYear(), b.getMonth(), b.getDate()); if (nx < n && !today) nx.setFullYear(n.getFullYear() + 1);
  const turning = nx.getFullYear() - b.getFullYear();
  if (today) $("cd").innerHTML = `<div style="min-width:230px"><b>Today is your day</b><small>turning ${turning}</small></div>`;
  else { let s = Math.floor((nx - n) / 1000); const d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600), m = Math.floor(s % 3600 / 60); s %= 60;
    $("cd").innerHTML = [[d,"days"],[h,"hours"],[m,"mins"],[s,"secs"]].map(x => `<div><b>${x[0]}</b><small>${x[1]}</small></div>`).join(""); }
  let y = n.getFullYear() - b.getFullYear(), mo = n.getMonth() - b.getMonth(), da = n.getDate() - b.getDate();
  if (da < 0) { da += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); mo--; } if (mo < 0) { mo += 12; y--; }
  $("age").textContent = today ? "" : `until you turn ${turning} · ${y} years, ${mo} months & ${da} days of you lighting up the world`;
}
tick(); setInterval(tick, 1000);

// ribbon, quote, letter
$("rib").textContent = ([C.name, ...C.nicknames].map(n => n + " ♡").join("   ") + "   ").repeat(8);
$("quote").innerHTML = words(C.quote, .07);
$("letter-title").textContent = C.letter.title;
const kk = {n: 0};
$("letter").innerHTML = C.letter.paragraphs.map(p => `<p>${words(p, .05, kk)}</p>`).join("") + `<p class="sign">${C.letter.signoff}</p>`;

// story
$("story-title").textContent = C.storyTitle;
$("fm-label").textContent = C.firstMsg.label; $("fm-text").textContent = C.firstMsg.text; $("fm-note").textContent = C.firstMsg.note;
C.story.forEach(s => { const a = el("div", "arch reveal"); const si = img(s.img, s.title); si.style.objectPosition = s.pos || "center"; a.append(si); const sc = el("div", "scene"); sc.append(a, el("div", "reveal", `<h3>${s.title}</h3><p>${s.text}</p>`)); $("story").append(sc); });
// bond
$("bond-title").textContent = C.bondTitle; $("bond-sub").textContent = C.bondSub; $("orbA").textContent = C.brother[0]; $("orbA").dataset.l = "Bhai"; $("orbB").dataset.l = "Behn"; $("orbB").style.backgroundImage = "url('img/p06.jpg')";
// since we met
$("met-title").textContent = C.metTitle; $("met-sub").textContent = C.metSub;
function metTick() {
  const n = new Date(); let y = n.getFullYear() - met.getFullYear(), mo = n.getMonth() - met.getMonth(), d = n.getDate() - met.getDate(), h = n.getHours() - met.getHours(), mi = n.getMinutes() - met.getMinutes(), s = n.getSeconds() - met.getSeconds();
  if (s < 0) { s += 60; mi--; } if (mi < 0) { mi += 60; h--; } if (h < 0) { h += 24; d--; } if (d < 0) { d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); mo--; } if (mo < 0) { mo += 12; y--; }
  const tot = Math.floor((n - met) / 864e5);
  $("metc").innerHTML = [[tot.toLocaleString("en-IN"),"days"],[y,"years"],[mo,"months"],[d,"days"],[h,"hours"],[mi,"mins"],[s,"secs"]].map((x, i) => `<div${i === 0 ? ' style="background:linear-gradient(135deg,rgba(255,111,160,.35),rgba(169,139,255,.35))"' : ""}><b>${x[0]}</b><small>${x[1]}</small></div>`).join("");
}
metTick(); setInterval(metTick, 1000);
// nicknames
$("nick-title").textContent = C.nickTitle; C.nicknames.forEach(n => $("nicks").append(el("span", "reveal", n)));
// heart frame
$("ht-title").textContent = C.heartTitle; $("ht-sub").textContent = C.heartSub;
C.heartPhotos.forEach((s, i) => { const m = img(s.img, ""); m.style.objectPosition = s.pos || "center"; m.loading = "eager"; if (!i) m.classList.add("on"); $("hrt").append(m); });
let hi = 0; setInterval(() => { const l = $("hrt").children; l[hi].classList.remove("on"); hi = (hi + 1) % l.length; l[hi].classList.add("on"); }, 2800);
// chat
$("chat-title").textContent = C.chatTitle; $("chat-name").textContent = C.nicknames[0] + " 💗";
async function playChat() {
  const bd = $("cbody");
  for (const m of C.chat) {
    if (m.from === "sys") { bd.append(el("div", "b sys", m.t)); bd.scrollTop = 9999; await sleep(1000); continue; }
    if (m.from === "her") { const d = el("div", "b her dots", "<span></span><span></span><span></span>"); bd.append(d); bd.scrollTop = 9999; await sleep(1100); d.remove(); } else await sleep(900);
    bd.append(el("div", "b " + m.from, m.t + (m.tm ? `<span class="tm">${m.tm}</span>` : ""))); bd.scrollTop = 9999;
  }
}
new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); playChat(); } }, {threshold: .5}).observe($("cbody"));
// reasons, open-when
$("reasons-title").textContent = C.reasonsTitle; C.reasons.forEach((r, i) => $("reasons").append(el("div", "rs reveal", `<b>${i + 1}</b><p>${r}</p>`)));
$("ow-title").textContent = C.owTitle;
C.openWhen.forEach(o => { const e = el("div", "env reveal", `<span class="ic">💌</span><h3>Open when ${o.t}</h3><div class="m">${o.m}</div>`);
  e.onclick = () => { e.classList.toggle("open"); if (e.classList.contains("open")) { const r = e.getBoundingClientRect(); burst(r.left + r.width/2, r.top + 30); } }; $("ow").append(e); });
// gallery + lightbox
$("gal-title").textContent = C.galleryTitle; $("gal-sub").textContent = C.gallerySubtitle;
let cur = 0;
const show = i => { cur = (i + C.gallery.length) % C.gallery.length; const li = $("lb-img"); li.onerror = () => { li.onerror = null; li.src = ph(C.gallery[cur]); }; li.src = C.gallery[cur]; $("lightbox").hidden = false; };
C.gallery.forEach((g, i) => { const bt = el("button", "reveal"); bt.append(img(g, "Memory " + (i + 1))); bt.onclick = () => show(i); $("gallery").append(bt); });
$("lb-close").onclick = () => $("lightbox").hidden = true; $("lb-prev").onclick = () => show(cur - 1); $("lb-next").onclick = () => show(cur + 1);
$("lightbox").onclick = e => { if (e.target.id === "lightbox") $("lightbox").hidden = true; };
addEventListener("keydown", e => { if ($("lightbox").hidden) return; if (e.key === "Escape") $("lightbox").hidden = true; if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1); });
// promises
$("pr-title").textContent = C.promTitle; C.promises.forEach(p => $("promises").append(el("li", "reveal", p)));

// scratch card
$("sc-title").textContent = C.scratchTitle; $("sc-hint").textContent = C.scratchHint; $("sc-text").textContent = C.scratchText;
const sc = $("scratch"), g = sc.getContext("2d"); let sd = false, sdone = false, sn = 0;
const gr = g.createLinearGradient(0, 0, 340, 190); gr.addColorStop(0, "#e7d3ff"); gr.addColorStop(.5, "#ffc2d8"); gr.addColorStop(1, "#f6d7a0");
g.fillStyle = gr; g.fillRect(0, 0, 340, 190); g.fillStyle = "#7a2a62"; g.font = "34px 'Great Vibes',cursive"; g.textAlign = "center"; g.fillText("scratch me ♡", 170, 105);
function scr(e) {
  if (!sd || sdone) return; const r = sc.getBoundingClientRect();
  g.globalCompositeOperation = "destination-out"; g.beginPath(); g.arc((e.clientX - r.left) * 340 / r.width, (e.clientY - r.top) * 190 / r.height, 22, 0, 6.28); g.fill();
  if (++sn % 8) return; const d = g.getImageData(0, 0, 340, 190).data; let c = 0; for (let i = 3; i < d.length; i += 16) if (!d[i]) c++;
  if (c / (d.length / 16) > .45) { sdone = true; sc.style.opacity = 0; sc.style.pointerEvents = "none"; const r2 = sc.getBoundingClientRect(); burst(r2.left + r2.width/2, r2.top + 60); }
}
sc.onpointerdown = e => { sd = true; sc.setPointerCapture(e.pointerId); scr(e); }; sc.onpointermove = scr; sc.onpointerup = () => sd = false;

// wish: lantern, candle, rain
$("wish-title").textContent = C.wishTitle; $("wish-hint").textContent = C.wishHint; $("ln-in").placeholder = C.lnPh; $("ln-btn").textContent = C.lnBtn; $("rainbtn").textContent = C.rainBtn;
$("ln-btn").onclick = () => { const v = $("ln-in").value.trim(); if (!v) { $("ln-in").focus(); return; }
  const l = el("div", "lan", v.replace(/</g, "&lt;")); l.style.left = 10 + R() * 75 + "%"; l.style.setProperty("--sx", (R() - .5) * 160 + "px"); document.body.append(l); setTimeout(() => l.remove(), 11500); $("ln-in").value = ""; $("wish-hint").textContent = C.lnDone; };
$("candle").onclick = () => { if ($("flame").classList.contains("off")) return; $("flame").classList.add("off"); const r = $("candle").getBoundingClientRect();
  burst(r.left + r.width/2, r.top + 40); setTimeout(() => burst(innerWidth * .25, innerHeight * .5), 300); setTimeout(() => burst(innerWidth * .75, innerHeight * .5), 600);
  $("wish-msg").textContent = C.wishMessage; $("wish-msg").classList.add("on"); };
$("rainbtn").onclick = () => { for (let i = 0; i < 70; i++) setTimeout(() => P.push({k:"r", e:C.rainEmoji[i % C.rainEmoji.length], x:R()*cv.width, y:-30, s:18+R()*22, vy:2+R()*3}), i * 60); };

// fairy lights
{ const N = 10, L = $("lights"), cols = ["#ffd98a","#ff8fb1","#c7b2ff"]; let d = "M0,4";
  for (let i = 0; i < N; i++) { d += ` Q${(i+.5)*100/N},12 ${(i+1)*100/N},4`; const b = el("i"); b.style.left = (i+.5)*100/N + "%"; b.style.setProperty("--c", cols[i % 3]); b.style.animationDelay = (i * .35) + "s"; L.append(b); }
  L.insertAdjacentHTML("afterbegin", `<svg viewBox="0 0 100 16" preserveAspectRatio="none"><path d="${d}"/></svg>`); }
// hanging polaroids
$("hang-title").textContent = C.hangTitle;
C.hang.forEach(h => { const p = el("div", "pl"); const i = img(h.img, h.caption); i.style.objectPosition = "center " + (h.pos || "center"); p.append(i, el("span", "", h.caption)); $("hang").append(p); });
// song vinyl
$("song-title").textContent = C.songTitle; $("song-line").textContent = C.songLine;
function syncV() { if (!audio) return; const pl = !audio.paused; $("vinyl").classList.toggle("play", pl); $("music-btn").classList.toggle("playing", pl); $("song-btn").textContent = pl ? "❚❚ Pause" : "▶ Play";
  const syn = typeof audio.setStyle === "function"; $("trk").textContent = "♪ " + (syn ? audio.name : "your song"); $("chg").style.display = syn ? "" : "none"; }
$("vinyl").append(el("div", "arm"));
$("song-btn").after(el("p", "trk", "")); $("song-btn").nextElementSibling.id = "trk";
$("trk").after(el("button", "btn ghost", "↻ Change the music")); $("trk").nextElementSibling.id = "chg";
$("chg").onclick = () => { if (!audio || !audio.setStyle) return; audio.setStyle((audio.style + 1) % audio.count); if (audio.paused) audio.play(); syncV(); };
$("song-btn").onclick = () => { if (!audio) return; audio.paused ? audio.play().catch(() => {}) : audio.pause(); };
// pick a card
$("cards-title").textContent = C.cardsTitle; $("cards-hint").textContent = C.cardsHint;
C.cards.forEach(t => { const c = el("div", "card", `<div class="f">♥</div><div class="k">${t}</div>`); c.onclick = () => { c.classList.toggle("flip"); if (c.classList.contains("flip")) { const r = c.getBoundingClientRect(); burst(r.left + r.width/2, r.top + 40); } }; $("cards").append(c); });
// jar of sweet things
$("jar-title").textContent = C.jarTitle; $("jarbtn").textContent = C.jarBtn; let ji = -1;
$("jarbtn").onclick = () => { let n; do { n = Math.floor(R() * C.compliments.length); } while (n === ji); ji = n; const o = $("jar-out"); o.style.opacity = 0; setTimeout(() => { o.textContent = C.compliments[n]; o.style.opacity = 1; }, 250); const r = $("jarbtn").getBoundingClientRect(); burst(r.left + r.width/2, r.top); };
// 20 wishes
$("w20-title").textContent = C.w20Title; C.wishes20.forEach((w, i) => $("w20").append(el("span", "reveal", `<b>${i + 1}</b>${w}`)));
// heartbeat (press & hold)
$("hb-title").textContent = C.hbTitle; $("hb-hint").textContent = C.hbHint; let hbT = null;
const hbStart = e => { e.preventDefault(); $("hbtn").classList.add("hold"); $("hb-msg").textContent = C.hbMsg; if (navigator.vibrate) navigator.vibrate([90,70,90,600]); hbT = setInterval(() => { if (navigator.vibrate) navigator.vibrate([90,70,90,600]); }, 800); };
const hbEnd = () => { $("hbtn").classList.remove("hold"); clearInterval(hbT); if (navigator.vibrate) navigator.vibrate(0); };
$("hbtn").addEventListener("pointerdown", hbStart); ["pointerup","pointerleave","pointercancel"].forEach(ev => $("hbtn").addEventListener(ev, hbEnd));
// hug
$("hug-title").textContent = C.hugTitle; $("hugbtn").textContent = C.hugBtn; $("hug-msg").textContent = C.hugMsg;
$("hugbtn").onclick = () => { $("hug").classList.add("on"); const r = $("hugbtn").getBoundingClientRect(); burst(r.left + r.width/2, r.top); };
// love meter
$("lm-title").textContent = C.meterTitle;
new IntersectionObserver((es, o) => { if (!es[0].isIntersecting) return; o.disconnect(); $("mfill").style.width = "100%"; let v = 0; const t = setInterval(() => { v += Math.ceil((1000 - v) / 25); if (v >= 999) { clearInterval(t); $("mval").textContent = C.meterEnd; } else $("mval").textContent = v + "%"; }, 70); }, {threshold: .6}).observe($("mval"));
// bouquet
$("bq-title").textContent = C.bqTitle; $("bqbtn").textContent = C.bqBtn; let bn = 0;
$("bqbtn").onclick = () => { if (bn >= 21) return; bn++; $("bq").append(el("span", "", C.flowers[bn % C.flowers.length])); const r = $("bqbtn").getBoundingClientRect(); burst(r.left + r.width/2, r.top - 20); if (bn === 21) { $("bqbtn").textContent = C.bqDone; $("bqbtn").style.pointerEvents = "none"; } };
// time capsule
$("cp-title").textContent = C.capTitle; const od = new Date(b.getFullYear() + 22, b.getMonth(), b.getDate());
$("cap").onclick = () => { if (new Date() >= od) { $("cap").textContent = "💌"; $("cp-out").textContent = C.capMsg; burst(innerWidth/2, innerHeight/2); }
  else { $("cap").classList.remove("shake"); void $("cap").offsetWidth; $("cap").classList.add("shake"); $("cp-out").textContent = `${C.capLocked} ${od.toLocaleDateString("en-IN", {day:"numeric", month:"long", year:"numeric"})} 🤍`; } };

// finale
$("finale").textContent = C.finale; $("finale-sub").textContent = C.finaleSub; $("bless").textContent = C.bless; $("ps").textContent = C.ps; $("footer").textContent = C.footer;

// reveal on scroll
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), {threshold: .15});
document.querySelectorAll(".reveal,.quote,.paper").forEach(e => io.observe(e));

// effects: petals, hearts, fireflies, confetti, rain
const cv = $("fx"), cx = cv.getContext("2d"); const fit = () => { cv.width = innerWidth; cv.height = innerHeight; }; fit(); addEventListener("resize", fit);
const petal = () => ({k:"p", x:R()*cv.width, y:-20-R()*cv.height, s:12+R()*12, vx:.5+R(), vy:.7+R()*1.1, r:R()*6, vr:(R()-.5)*.05});
const heart = () => ({k:"h", x:R()*cv.width, y:cv.height+20, s:10+R()*16, vx:(R()-.5)*.5, vy:-(.5+R()*.9), t:R()*9});
const fly = () => ({k:"f", c:["#f6b73c","#ff7fa6","#b9a3ff"][Math.floor(R()*3)], x:R()*cv.width, y:R()*cv.height, s:1.5+R()*2, vx:(R()-.5)*.4, vy:(R()-.5)*.4, t:R()*9});
let P = [...Array(14).fill().map(petal), ...Array(18).fill().map(heart), ...Array(34).fill().map(fly)], K = [];
function burst(x, y) { const c = ["#ff7fa6","#a98bff","#f6b73c","#7fd6c2","#ff4f86"]; for (let i = 0; i < 140; i++) { const a = R()*6.28, v = 3 + R()*9; K.push({x, y, vx:Math.cos(a)*v, vy:Math.sin(a)*v-4, s:4+R()*6, c:c[i%5], l:140+R()*60, r:R()*6}); } }
(function loop() {
  cx.clearRect(0, 0, cv.width, cv.height); P = P.filter(p => !p.dead);
  for (const p of P) {
    p.x += p.vx || 0; p.y += p.vy; cx.save(); cx.translate(p.x, p.y);
    if (p.k === "p") { p.r += p.vr; cx.rotate(p.r); cx.globalAlpha = .8; cx.fillStyle = "#ff9fbd"; cx.beginPath(); cx.ellipse(0, 0, p.s/2, p.s/3.3, 0, 0, 6.28); cx.fill(); if (p.y > cv.height || p.x > cv.width) Object.assign(p, petal(), {y:-20}); }
    else if (p.k === "h") { p.t += .03; p.x += Math.sin(p.t)*.5; cx.globalAlpha = .5; cx.fillStyle = "#ff6f9f"; cx.font = p.s + "px serif"; cx.fillText("♥", 0, 0); if (p.y < -30) Object.assign(p, heart()); }
    else if (p.k === "r") { p.x += Math.sin(p.y/30); cx.globalAlpha = 1; cx.font = p.s + "px serif"; cx.fillText(p.e, 0, 0); if (p.y > cv.height + 40) p.dead = true; }
    else { p.t += .02; cx.globalAlpha = .35 + .55*Math.sin(p.t); cx.fillStyle = p.c; cx.font = (p.s * 6) + "px serif"; cx.fillText("✦", 0, 0); if (p.x < 0 || p.x > cv.width) p.vx *= -1; if (p.y < 0 || p.y > cv.height) p.vy *= -1; }
    cx.restore();
  }
  K = K.filter(c => c.l-- > 0);
  for (const c of K) { c.x += c.vx; c.y += c.vy; c.vy += .18; c.vx *= .985; c.r += .15; cx.save(); cx.translate(c.x, c.y); cx.rotate(c.r); cx.fillStyle = c.c; cx.globalAlpha = Math.min(1, c.l/40); cx.fillRect(-c.s/2, -c.s/4, c.s, c.s/2); cx.restore(); }
  requestAnimationFrame(loop);
})();

// cute floating stickers
["🎀","☁️","🌸","🍓","🧸","✨","💖","🦋","🌷","🍰","⭐","🫧"].forEach((e, i) => { const s = el("span", "", e); s.style.cssText = `left:${(i * 83 + 7) % 94}%;top:${(i * 37 + 11) % 88}%;font-size:${22 + (i * 7) % 22}px;animation-delay:${-i * 1.7}s;animation-duration:${11 + (i % 5) * 2}s`; $("stickers").append(s); });
// sparkle trail + tap hearts
let last = 0;
const trail = e => { const n = Date.now(); if (n - last < 70) return; last = n; const t = e.touches ? e.touches[0] : e; const s = el("span", "sp", ["♥","✦","✧"][Math.floor(R()*3)]); s.style.left = t.clientX + "px"; s.style.top = t.clientY + "px"; document.body.append(s); setTimeout(() => s.remove(), 800); };
addEventListener("mousemove", trail); addEventListener("touchmove", trail, {passive:true});
addEventListener("click", e => { if (e.target.closest("button,input,canvas,.env")) return; for (let i = 0; i < 6; i++) { const h = el("span", "hv", "♥"); h.style.left = e.clientX + "px"; h.style.top = e.clientY + "px"; h.style.fontSize = 14 + R()*18 + "px"; h.style.setProperty("--dx", (R()-.5)*120 + "px"); document.body.append(h); setTimeout(() => h.remove(), 1400); } });

// gate: open, music (file or built-in music box), typed name
function makeSynth(startStyle = 0) {
  let ctx = null, master, bus, noise, timer = null, step = 0, next = 0, style = startStyle;
  const hz = m => 440 * Math.pow(2, (m - 69) / 12);
  const TR = [
    { name: "Dreamy Night", bpm: 68, pad: 1, arp: "pluck", drums: 0,
      ch: [[36,[60,64,67,71]],[33,[57,60,64,67]],[29,[57,60,65,69]],[31,[55,59,62,67]]],
      mel: [[79,0,0,76,0,0,74,0],[72,0,0,76,0,0,81,0],[77,0,0,81,0,79,0,0],[74,0,79,0,0,76,0,0]] },
    { name: "Music Box Lullaby", bpm: 92, pad: 0, arp: "box", drums: 0,
      ch: [[36,[72,76,79,84]],[33,[69,72,76,81]],[29,[69,72,77,81]],[31,[67,71,74,79]]],
      mel: [[84,0,79,0,76,79,0,0],[81,0,76,0,72,76,0,0],[77,0,81,0,84,81,77,0],[79,0,74,0,71,74,0,0]] },
    { name: "Lo-fi Chill", bpm: 78, pad: 0, arp: "keys", drums: 1,
      ch: [[38,[53,57,60,64]],[43,[53,59,62,67]],[36,[55,59,62,64]],[45,[55,60,64,71]]],
      mel: [[0,0,72,0,0,69,0,0],[0,0,71,0,74,0,0,0],[0,0,76,0,0,72,0,0],[0,0,69,0,72,0,71,0]] }
  ];
  const setup = () => {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = .9;
    const comp = ctx.createDynamicsCompressor(); master.connect(comp); comp.connect(ctx.destination);
    bus = ctx.createGain(); bus.connect(master);
    const cv = ctx.createConvolver(), len = ctx.sampleRate * 3, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6); }
    cv.buffer = ir; const wet = ctx.createGain(); wet.gain.value = .42; bus.connect(cv); cv.connect(wet); wet.connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate); const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  };
  const v = (type, f, t, d, vol, o = {}) => {
    const os = ctx.createOscillator(), g = ctx.createGain(); os.type = type; os.frequency.value = f; if (o.det) os.detune.value = o.det;
    let n = os; if (o.lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = o.lp; os.connect(fl); n = fl; }
    const a = o.atk || .01; g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    n.connect(g); g.connect(bus); os.start(t); os.stop(t + d + .1);
  };
  const nz = (t, d, vol, hp) => { const s = ctx.createBufferSource(); s.buffer = noise; const fl = ctx.createBiquadFilter(); fl.type = "highpass"; fl.frequency.value = hp; const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d); s.connect(fl); fl.connect(g); g.connect(bus); s.start(t); s.stop(t + d + .05); };
  const kick = t => { const os = ctx.createOscillator(), g = ctx.createGain(); os.frequency.setValueAtTime(130, t); os.frequency.exponentialRampToValueAtTime(42, t + .14); g.gain.setValueAtTime(.4, t); g.gain.exponentialRampToValueAtTime(.0001, t + .3); os.connect(g); g.connect(master); os.start(t); os.stop(t + .35); };
  const play = (t0, s) => {
    const k = TR[style], e = 60 / k.bpm / 2, bar = Math.floor(s / 8), i = s % 8, c = k.ch[bar % 4], tones = c[1];
    const t = t0 + (k.drums && i % 2 ? e * .16 : 0);
    if (i === 0) { if (k.pad) tones.forEach((m, j) => { v("sawtooth", hz(m - 12), t, e * 8, .02, { lp: 700, atk: 1.4, det: j * 3 - 4 }); v("sawtooth", hz(m - 12), t, e * 8, .02, { lp: 700, atk: 1.4, det: 4 - j * 2 }); }); v("sine", hz(c[0]), t, e * 7, .16, { atk: .02 }); }
    const m = tones[[0,1,2,3,2,1,2,1][i]];
    if (k.arp === "pluck") { v("triangle", hz(m), t, 1.7, .06, { lp: 2400 }); v("sine", hz(m + 12), t, .6, .02); }
    else if (k.arp === "box") { v("sine", hz(m), t, 1.3, .06); v("sine", hz(m + 12), t, .6, .025); }
    else if (i === 0 || i === 3 || i === 6) tones.forEach(x => v("triangle", hz(x), t, .95, .04, { lp: 1400 }));
    if (k.drums) { if (i === 0 || i === 5) kick(t); if (i === 2 || i === 6) nz(t, .16, .1, 1800); nz(t, .05, i % 2 ? .035 : .055, 7000); }
    const mm = k.mel[bar % 4][i]; if (mm) { v("sine", hz(mm), t, 2.2, .06); v("sine", hz(mm) * 2, t, 1.2, .015); }
  };
  const sched = () => { const e = 60 / TR[style].bpm / 2; while (next < ctx.currentTime + .6) { play(next, step); next += e; step++; } };
  const o = { paused: true, loop: true, onplay: null, onpause: null,
    get name() { return TR[style].name; }, get count() { return TR.length; }, get style() { return style; },
    setStyle(n) { style = n % TR.length; step = 0; if (ctx) next = ctx.currentTime + .15; },
    play() { if (!ctx) setup(); ctx.resume(); next = ctx.currentTime + .1; clearInterval(timer); timer = setInterval(sched, 120); o.paused = false; o.onplay && o.onplay(); return Promise.resolve(); },
    pause() { clearInterval(timer); timer = null; o.paused = true; o.onpause && o.onpause(); } };
  return o;
}
let audio = null, opened = false;
function useSynth() { audio = makeSynth(); audio.onplay = audio.onpause = syncV; if (opened) audio.play(); }
if (C.music) { audio = new Audio(C.music); audio.loop = true; audio.onplay = audio.onpause = syncV; audio.onerror = useSynth; } else useSynth();
// Password protection
const pwBox = $("pw-box"), pwInput = $("pw-input"), pwSubmit = $("pw-submit"), pwErr = $("pw-err"), unlockedGate = $("unlocked-gate");
function checkPassword() {
  const reqPass = (C.password || "").trim().toLowerCase();
  if (!reqPass) {
    if (pwBox) pwBox.style.display = "none";
    if (unlockedGate) unlockedGate.style.display = "block";
    return;
  }
  const entered = (pwInput ? pwInput.value : "").trim().toLowerCase();
  if (entered === reqPass) {
    if (pwBox) pwBox.style.display = "none";
    if (unlockedGate) {
      unlockedGate.style.display = "block";
      burst(innerWidth/2, innerHeight/2);
    }
  } else {
    if (pwErr) pwErr.textContent = "Oops! Incorrect secret code 🔒";
    if (pwInput) {
      pwInput.style.borderColor = "#ff4f86";
      setTimeout(() => { if (pwInput) pwInput.style.borderColor = "rgba(255,255,255,0.4)"; }, 1500);
    }
  }
}
if (pwSubmit) pwSubmit.onclick = checkPassword;
if (pwInput) pwInput.onkeydown = e => { if (e.key === "Enter") checkPassword(); };
if (!C.password) {
  if (pwBox) pwBox.style.display = "none";
  if (unlockedGate) unlockedGate.style.display = "block";
}

$("open").onclick = () => {
  opened = true; $("gate").classList.add("gone"); document.body.classList.remove("locked"); scrollTo(0, 0); burst(innerWidth/2, innerHeight/2);
  if (vid) vid.play().catch(() => {});
  const pr = audio.play(); if (pr && pr.catch) pr.catch(() => { if (audio instanceof Audio) useSynth(); });
  $("music-btn").hidden = false;
  const h = $("hero-title"); let i = 0; const w = setInterval(() => { h.textContent = C.name.slice(0, ++i); if (i >= C.name.length) clearInterval(w); }, 140);
};
$("music-btn").onclick = () => { if (!audio) return; audio.paused ? audio.play() : audio.pause(); };
syncV();
})();
