document.addEventListener("DOMContentLoaded", () => {
    const h = new Date().getHours();
    const g = document.getElementById('greeting-msg');
    
    if (h < 12) g.textContent = "Buna dimineata! Bine ai venit pe pagina mea.";
    else if (h < 18) g.textContent = "Buna ziua! Bine ai venit pe pagina mea.";
    else g.textContent = "Buna seara! Bine ai venit pe pagina mea.";

    const triggers = document.querySelectorAll('.trigger');
    
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetId = trigger.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            trigger.classList.toggle('active');
            targetContent.classList.toggle('show');
        });
    });
});

function submitForm() {
    const n = document.getElementById("nume").value;
    const e = document.getElementById("email").value;
    const m = document.getElementById("mesaj").value;
    const f = document.getElementById("form-feedback");

    if (n.length < 2 || !e.includes('@') || m.length < 10) {
        f.textContent = "Eroare: Te rugam sa completezi toate campurile corect.";
        f.style.color = "#ff4655";
    } else {
        f.textContent = "Mesajul a fost trimis cu succes.";
        f.style.color = "#00ff00";
    }
}