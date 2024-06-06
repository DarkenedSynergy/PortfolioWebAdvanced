let isLoading = false; // controleert op laden van gegevens

// Functie om gegevens op te halen en toe te voegen aan de galerij
function getCats() {
  if (isLoading) return; // kan maar één keer tegelijk worden aangeroepen

  isLoading = true; // gegevens worden geladen

  // Fetch om gegevens op te halen
  fetch(`https://api.thecatapi.com/v1/images/search?limit=10`)
    .then((response) => response.json())
    .then((data) => {
      // Loop door de gegevens en voeg afbeeldingen toe aan de galerij
      data.forEach((catData) => {
        const gallery = document.getElementById("gallery");

        // Maak een img element aan met de url van de kattenafbeelding
        const imgElement = document.createElement("img");
        imgElement.src = catData.url;
        imgElement.alt = "Kattenafbeelding";

        // Voeg een event listener toe aan de afbeelding met een arrow function
        imgElement.addEventListener("click", () => {
          alert("Er werd op een kat geklikt!");
        });

        // Toevoegen aan de galerij
        gallery.appendChild(imgElement);
      });

      isLoading = false; // laden van gegevens is voltooid
    })
    .catch((error) =>
      console.error("Fout bij het ophalen van gegevens:", error)
    );
}

// Voeg event listener toe aan de knop voor het laden van meer foto's
document.getElementById("loadButton").addEventListener("click", getCats);

// vult de galerij bij het laden van de pagina
getCats();
