const apiKey = "68d4af3c83984d208d41322047d8116b";
const apiUrl = "https://api.rawg.io/api/games";

// zoekfunctie
async function Search() {
  const input = document.getElementById("search-input").value;
  if (input) {
    const games = await findGames(input);
    displayGames(games);
  }
}

// toevoegen functionaliteit aan de zoekknop
document.getElementById("search-button").addEventListener("click", Search);

// zorgt ervoor dat je met enter ook kan zoeken
document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      Search();
    }
  });

// Async & Await: zoek games op basis van de zoekterm
async function findGames(input) {
  try {
    // Fetch om data op te halen
    const response = await fetch(
      `${apiUrl}?key=${apiKey}&search=${input}&page_size=10`
    );
    const data = await response.json();

    // Iteration over een array: Gebruik van map om door de game data te itereren
    return data.results.map((game) => {
      // Destructuring: haal alle eigenschappen uit het game-object
      const { id, name, background_image, released, rating } = game;

      const rawgUrl = `https://rawg.io/games/${id}`;

      return { name, background_image, released, rating, rawgUrl };
    });
  } catch (error) {
    console.error("Fout bij het ophalen van gegevens:", error);
  }
}

// Callback function: gebruikt games om de games weer te geven op de pagina
function displayGames(games) {
  const gamesContainer = document.getElementById("games-container");
  gamesContainer.innerHTML = "";

  // Iteration over een array: voor elke gevonden game, splits de eigenschappen
  games.forEach((game) => {
    // Destructuring: haal alle eigenschappen uit het game-object
    const { name, background_image, released, rating, rawgUrl } = game;

    const gameCard = document.createElement("div");
    gameCard.className = "game-card";

    // Spread operator: voeg de gesplitste eigenschappen toe aan de kaart
    gameCard.innerHTML = `
            <img src="${background_image}" alt="${name}">
            <h2>${name}</h2>
            <p>Released: ${released}</p>
            <p>Rating: ${rating}</p>
            <a href="${rawgUrl}" target="_blank">View on RAWG</a>
        `;

    gamesContainer.appendChild(gameCard);
  });
}
