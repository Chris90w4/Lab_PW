document.addEventListener("DOMContentLoaded",()=>{

const h=new Date().getHours()
const g=document.getElementById("greeting-msg")
if(h>=6&&h<12)g.textContent="Buna dimineata! Bine ai venit pe pagina mea."
else if(h>=12&&h<18)g.textContent="Buna ziua! Bine ai venit pe pagina mea."
else g.textContent="Buna seara! Bine ai venit pe pagina mea."

const triggers=document.querySelectorAll(".trigger[data-target]")
triggers.forEach(t=>{
t.addEventListener("click",()=>{
const id=t.getAttribute("data-target")
const sec=document.getElementById(id)
t.classList.toggle("active")
sec.classList.toggle("show")
})
})

const form=document.getElementById("contact-form")
const feedback=document.getElementById("form-feedback")
form.addEventListener("submit",e=>{
e.preventDefault()
const n=document.getElementById("nume").value.trim()
const em=document.getElementById("email").value.trim()
const m=document.getElementById("mesaj").value.trim()

if(n.length<2){feedback.textContent="Nume prea scurt!";feedback.style.color="red";return}
if(!em.includes("@")){feedback.textContent="Email invalid!";feedback.style.color="red";return}
if(m.length<10){feedback.textContent="Mesaj prea scurt!";feedback.style.color="red";return}

feedback.textContent=`Multumim, ${n}! Mesajul a fost trimis.`
feedback.style.color="green"
form.reset()
})

const themeToggle=document.getElementById("theme-toggle")
const setThemeLabel=()=>{themeToggle.textContent=document.body.classList.contains("dark-mode")?"☀ Light Mode":"🌙 Dark Mode"}
setThemeLabel()
const toggleTheme=()=>{document.body.classList.toggle("dark-mode");setThemeLabel()}
themeToggle.addEventListener("click",toggleTheme)
themeToggle.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();toggleTheme()}})

const titles=document.querySelectorAll("main h2.section-title")
titles.forEach(h2=>{
h2.addEventListener("click",()=>{
const content=h2.closest(".panel").querySelector(".section-content")
content.classList.toggle("hidden")
const caret=h2.querySelector(".caret")
caret.textContent=content.classList.contains("hidden")?"▶":"▼"
})
})

const backToTop=document.getElementById("back-to-top")
const updateBackToTop=()=>{if(window.scrollY>300)backToTop.classList.remove("hidden");else backToTop.classList.add("hidden")}
window.addEventListener("scroll",updateBackToTop)
updateBackToTop()
backToTop.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})})

})