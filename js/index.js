const link = document.querySelector("a");

// Voeg een eventlistener toe aan de link en maak de tekst van de link vetgedrukt, verander de kleur naar groen wanneer op deze link geklikt wordt.
link.addEventListener("click", function () {
  link.style.color = "red";
  link.style.fontWeight = "bold";
});
