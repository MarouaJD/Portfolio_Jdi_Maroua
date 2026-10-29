// Typing animation
const texts = [
  "Développeuse Full Stack",
  "HTML / CSS / React / Bootstrap/ JavaScript",
  "PHP / Laravel / MySQL / mongoDB",
  "Git & Github ",
  "Stagiaire OFPPT – ISTA NTIC"
];
let ti = 0, ci = 0, deleting = false;
const el = document.getElementById('typing');

function type() {
  if (!el) return;
  const current = texts[ti];
  if (!deleting) {
    el.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    el.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; ti = (ti + 1) % texts.length; }
  }
  setTimeout(type, deleting ? 50 : 90);
}
setTimeout(type, 1500);
