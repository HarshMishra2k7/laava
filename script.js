// ================================================================
// LOVE WEBSITE JAVASCRIPT ❤️
// No libraries needed — everything here is plain JavaScript.
// ================================================================

const loader = document.getElementById("loader");
const main = document.getElementById("mainContent");
const loadingText = document.getElementById("loadingText");

const loadingMessages = [
  "Choosing the prettiest memories...",
  "Adding a little extra love...",
  "Warming up the hearts...",
  "Almost ready, bby...",
  "Your surprise is ready ❤️"
];

let msgIndex = 0;
const messageTimer = setInterval(() => {
  msgIndex++;
  if (msgIndex < loadingMessages.length) loadingText.textContent = loadingMessages[msgIndex];
}, 650);

// Give the photo + animation time to make the entrance feel cinematic.
setTimeout(() => {
  clearInterval(messageTimer);
  loader.style.transition = "opacity .9s ease, transform 1s ease";
  loader.style.opacity = "0";
  loader.style.transform = "scale(1.05)";
  setTimeout(() => {
    loader.classList.add("hidden");
    main.classList.remove("hidden");
    startEffects();
    typeLetter();
    observeSections();
  }, 850);
}, 3900);

// HERO button
document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".letter-section").scrollIntoView({behavior:"smooth"});
  confettiBurst(window.innerWidth/2, window.innerHeight*.65, 35);
});

// Typewriter love letter
const letter = `Bby, mujhe nahi pata ki ek website kabhi tumhe ye samjha payegi ki tum mere liye kitni special ho... par phir bhi maine dil se ye chhoti si koshish ki hai. ❤️

Tum un logon mein se ho jo ek normal se din ko bhi aisi yaad bana dete ho jise main hamesha sambhal kar rakhna chahta hoon. Tumhari smile, tumhare cute se expressions, tumhara mere paas hona — pata nahi kaise, par tumhari har chhoti si cheez meri duniya ko thoda aur khoobsurat bana deti hai.

Aaj tumhare birthday par bas ek baat tumhe dil se batani hai: main genuinely bahut grateful hoon ki tum meri life mein ho. Tumhara hona mere liye sach mein bahut special hai. 🫶

Hamesha aise hi smile karti rehna, apni beautiful si personality ko kabhi mat badalna, aur kabhi ye mat bhoolna ki koi hai jo tumse in saare words se bhi zyada pyaar karta hai. ❤️`

function typeLetter(){
  const el = document.getElementById("typedLetter");
  let i = 0;
  function type(){
    if(i < letter.length){
      el.textContent += letter[i++];
      setTimeout(type, letter[i-1] === "\n" ? 260 : 22);
    }
  }
  type();
}

// Scroll reveal
function observeSections(){
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add("visible");
        if(entry.target.classList.contains("meter-section")) animateMeter();
      }
    });
  }, {threshold:.16});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

// Love meter
let meterDone = false;
function animateMeter(){
  if(meterDone) return;
  meterDone = true;
  const fill = document.getElementById("meterFill");
  const number = document.getElementById("loveNumber");
  const text = document.getElementById("meterText");
  let n = 0;
  const timer = setInterval(() => {
    n += Math.ceil(Math.random()*8);
    if(n >= 100){ n=100; clearInterval(timer); }
    number.textContent = n + "%";
    fill.style.width = n + "%";
  }, 50);
  setTimeout(() => {
    number.textContent = "∞%";
    text.textContent = "Okay... 100% was clearly not enough. 😭❤️";
  }, 1150);
}

// Floating hearts + sparkles
function startEffects(){
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.textContent = ["♥","♡","❤","💗"][Math.floor(Math.random()*4)];
    h.style.left = Math.random()*100 + "vw";
    h.style.bottom = "-30px";
    h.style.fontSize = (12 + Math.random()*22) + "px";
    h.style.animationDuration = (5 + Math.random()*6) + "s";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),12000);
  }, 700);

  setInterval(() => {
    const star = document.createElement("div");
    star.className = "shooting-star";
    star.style.left = (Math.random()*90 + 5) + "vw";
    star.style.top = (Math.random()*45 + 5) + "vh";
    document.body.appendChild(star);
    setTimeout(()=>star.remove(),1800);
  }, 1800);

  setInterval(() => {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random()*100 + "vw";
    s.style.top = Math.random()*100 + "vh";
    document.body.appendChild(s);
    setTimeout(()=>s.remove(),1600);
  }, 500);
}

// Click anywhere = tiny heart
document.addEventListener("click", (e) => {
  if(e.target.closest("button, a")) return;
  makeHeart(e.clientX, e.clientY);
});

function makeHeart(x,y){
  const h = document.createElement("div");
  h.className = "burst-heart";
  h.textContent = ["❤","💗","♡","✨"][Math.floor(Math.random()*4)];
  h.style.left = x + "px";
  h.style.top = y + "px";
  h.style.setProperty("--x", (Math.random()*100-50)+"px");
  h.style.setProperty("--y", (-60-Math.random()*100)+"px");
  document.body.appendChild(h);
  setTimeout(()=>h.remove(),1000);
}

// Big heart interaction
let heartCount = 0;
const bigHeart = document.getElementById("bigHeart");
const heartCountEl = document.getElementById("heartCount");

bigHeart.addEventListener("click", (e) => {
  heartCount++;
  heartCountEl.textContent = heartCount;
  for(let i=0;i<10;i++) makeHeart(e.clientX + (Math.random()*80-40), e.clientY + (Math.random()*60-30));

  if(heartCount === 10){
    document.getElementById("finalSection").scrollIntoView({behavior:"smooth"});
    setTimeout(()=>confettiBurst(window.innerWidth/2, window.innerHeight*.45, 100),700);
  }
  if(heartCount === 20){
    bigHeart.textContent = "💖";
    confettiBurst(window.innerWidth/2, window.innerHeight*.45, 180);
  }
});

// Photo click: fullscreen-style emphasis
document.querySelectorAll(".photo-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("selected");
    confettiBurst(card.getBoundingClientRect().left + card.offsetWidth/2,
                  card.getBoundingClientRect().top + card.offsetHeight/2, 18);
  });
});

// Confetti made only with JS
function confettiBurst(x,y,count){
  const chars = ["♥","❤","♡","✦","✧","•"];
  for(let i=0;i<count;i++){
    const p = document.createElement("div");
    p.className = "burst-heart";
    p.textContent = chars[Math.floor(Math.random()*chars.length)];
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.fontSize = (10+Math.random()*18)+"px";
    p.style.setProperty("--x",(Math.random()*500-250)+"px");
    p.style.setProperty("--y",(Math.random()*500-250)+"px");
    p.style.animationDuration = (.8+Math.random()*.9)+"s";
    document.body.appendChild(p);
    setTimeout(()=>p.remove(),1800);
  }
}

// Replay
document.getElementById("replayBtn").addEventListener("click", () => {
  window.scrollTo({top:0,behavior:"smooth"});
  setTimeout(() => location.reload(), 700);
});

// Tiny romantic cursor trail on desktop.
let lastTrail = 0;
document.addEventListener("pointermove", (e) => {
  const now = Date.now();
  if (now - lastTrail < 90) return;
  lastTrail = now;
  const t = document.createElement("div");
  t.className = "cursor-trail";
  t.textContent = "♡";
  t.style.left = e.clientX + "px";
  t.style.top = e.clientY + "px";
  document.body.appendChild(t);
  setTimeout(()=>t.remove(),700);
});
