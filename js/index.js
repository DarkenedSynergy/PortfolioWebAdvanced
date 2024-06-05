const link = document.querySelector("a");
const HIGHLIGHT_COLOR = "green";
// Voeg een eventlistener toe aan de link en maak de tekst van de link vetgedrukt, verander de kleur naar groen wanneer op deze link geklikt wordt.
link.addEventListener("click", function () {
  link.style.color = HIGHLIGHT_COLOR;
  link.style.fontWeight = "bold";
  link.style.textDecoration = "underline";
});
// Voeg een functie toe aan een knop die de achtergrondkleur van de pagina verandert.
function changeBackgroundColor() {
  var colorPicker = document.getElementById("colorPicker");
  var container = document.getElementsByClassName("container")[0];
  var body = document.body;
  body.style.backgroundColor = colorPicker.value;
  container.style.backgroundColor = colorPicker.value;
}
// Voeg een functie toe die een welkomstbericht toont in de console.
function displayWelcomeMessage() {
  const user = "Gebruiker";
  const welcomeMessage = `Welkom op mijn portfolio, ${user}!`;
  console.log(welcomeMessage);
}
displayWelcomeMessage();
