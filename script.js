const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw6Rkk0s1gQPOfjUV5vUoc7RB_5q59ylUSrj3-zsv3x9nreqEOPifO457vYVmHyygcmig/exec";
const weddingDate = new Date('2026-07-15T16:00:00+05:00');
function tick(){
  const now = new Date();
  let diff = weddingDate - now;
  if(diff < 0) diff = 0;
  const d = Math.floor(diff / (1000*60*60*24));
  const h = Math.floor((diff / (1000*60*60)) % 24);
  const m = Math.floor((diff / (1000*60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  days.textContent = d;
  hours.textContent = String(h).padStart(2,'0');
  minutes.textContent = String(m).padStart(2,'0');
  seconds.textContent = String(s).padStart(2,'0');
}
tick();
setInterval(tick,1000);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) entry.target.classList.add('show');
  });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const guestForm = document.getElementById('guestForm');
const formStatus = document.getElementById('formStatus');

if (guestForm) {
  guestForm.addEventListener('submit', function(e){
    e.preventDefault();

    const data = new FormData(guestForm);
    const name = data.get('name');
    const presence = data.get('presence');

    formStatus.textContent = 'Отправляем...';

    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        attendance: presence
      })
    });

    formStatus.textContent = `${name}, спасибо! Ответ записан.`;
    guestForm.reset();
  });
}
