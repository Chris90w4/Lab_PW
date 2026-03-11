document.addEventListener("DOMContentLoaded", () => {
  const eduList = document.querySelectorAll("#education ol li");
  const eduArray = Array.from(eduList).map(li => li.textContent.trim());
  console.log("Educatie:", eduArray);

  const filter1 = eduArray.filter(e => e.includes("UNITBV"));
  console.log("Filtru UNITBV:", filter1);

  const filter2 = eduArray.filter(e => e.toLowerCase().includes("lice"));
  console.log("Filtru Liceu:", filter2);

  const firstWords = eduArray.map(e => e.split(" ")[0]);
  console.log("Primele cuvinte:", firstWords);

  const totalAni = eduArray
    .map(e => {
      const matches = e.match(/\d{4}/g);
      if (matches && matches.length >= 2) return parseInt(matches[1]) - parseInt(matches[0]);
      return 0;
    })
    .reduce((sum, y) => sum + y, 0);

  console.log(`Total ani de studiu: ${totalAni}`);
});