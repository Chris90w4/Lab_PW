document.addEventListener("DOMContentLoaded", () => {

const h = new Date().getHours()
const g = document.getElementById("greeting-msg")

if (h >= 6 && h < 12) {
g.textContent = "Buna dimineata! Bine ai venit pe pagina mea."
}
else if (h >= 12 && h < 18) {
g.textContent = "Buna ziua! Bine ai venit pe pagina mea."
}
else {
g.textContent = "Buna seara! Bine ai venit pe pagina mea."
}

const triggers = document.querySelectorAll(".trigger")

triggers.forEach(trigger => {
trigger.addEventListener("click", () => {

const targetId = trigger.getAttribute("data-target")
const targetContent = document.getElementById(targetId)

trigger.classList.toggle("active")
targetContent.classList.toggle("show")

})
})

const form = document.getElementById("contact-form")
const feedback = document.getElementById("form-feedback")

form.addEventListener("submit", function(event) {

event.preventDefault()

const n = document.getElementById("nume").value.trim()
const e = document.getElementById("email").value.trim()
const m = document.getElementById("mesaj").value.trim()

console.log("Date formular:", { nume: n, email: e, mesaj: m })

if (n.length < 2) {
feedback.textContent = "Nume prea scurt!"
feedback.style.color = "red"
return
}

if (!e.includes("@")) {
feedback.textContent = "Email invalid!"
feedback.style.color = "red"
return
}

if (m.length < 10) {
feedback.textContent = "Mesaj prea scurt!"
feedback.style.color = "red"
return
}

feedback.textContent = `Multumim, ${n}! Mesajul a fost trimis.`
feedback.style.color = "green"

form.reset()

})

})