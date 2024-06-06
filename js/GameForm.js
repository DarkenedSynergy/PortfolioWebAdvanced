document
  .getElementById("gameForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Voorkomt dat het formulier wordt verzonden
    let isValid = true;

    // Validatie Gebruikersnaam
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (name.value.trim() === "") {
      nameError.textContent = "Gebruikersnaam is verplicht.";
      isValid = false;
    } else {
      nameError.textContent = "";
    }

    // Validatie Email
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      emailError.textContent = "Ongeldig emailadres.";
      isValid = false;
    } else {
      emailError.textContent = "";
    }

    // Validatie Platforms
    const platforms = document.getElementById("platforms");
    const platformsError = document.getElementById("platformsError");
    if (platforms.selectedOptions.length === 0) {
      platformsError.textContent = "Kies ten minste één platform.";
      isValid = false;
    } else {
      platformsError.textContent = "";
    }

    // Validatie Favoriete game winkel
    const gameStore = document.getElementById("favorite-game-store");
    const gameStoreError = document.getElementById("gameStoreError");
    if (gameStore.value === "") {
      gameStoreError.textContent = "Kies een game winkel.";
      isValid = false;
    } else {
      gameStoreError.textContent = "";
    }

    // Validatie Favoriete game
    const game = document.getElementById("favorite-game");
    const gameError = document.getElementById("gameError");
    if (game.value.trim() === "") {
      gameError.textContent = "Favoriete game is verplicht.";
      isValid = false;
    } else {
      gameError.textContent = "";
    }

    if (isValid) {
      // Verzamel gegevens uit het formulier
      const formData = {
        name: name.value,
        email: email.value,
        platforms: Array.from(platforms.selectedOptions).map(
          (option) => option.value
        ),
        favoriteGameStore: gameStore.value,
        favoriteGame: game.value,
      };

      // Haal huidige opgeslagen gebruikers op uit LocalStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Voeg nieuwe gebruiker toe
      users.push(formData);

      // Sla bijgewerkte gebruikerslijst op in LocalStorage
      localStorage.setItem("users", JSON.stringify(users));

      // Geef de gegevens weer op de pagina
      displayUsers(users);
    }
  });

// Functie om gebruikersgegevens weer te geven
function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = ""; // Maak de huidige lijst leeg

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.className = "user-container";
    userDiv.innerHTML = `
        <h3>${user.name}</h3>
        <p>Email: <a href="mailto:${user.email}">${user.email}</a></p>
        <p>Platform(en): ${user.platforms.join(", ")}</p>
        <p>Favoriete game winkel: ${user.favoriteGameStore}</p>
        <p>Favoriete game: ${user.favoriteGame}</p>
      `;
    userList.appendChild(userDiv);
  });
}

// geef gegevens weer bij het laden van de pagina
document.addEventListener("DOMContentLoaded", function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  displayUsers(users);
});
// handelen van fouten bij weergeven van gegevens
document.addEventListener("DOMContentLoaded", function () {
  try {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // Voer hier verdere verwerking van gegevens uit
  } catch (error) {
    console.error("Er is een fout opgetreden bij het parsen van JSON:", error);
    // Handel de fout af, bijvoorbeeld door de gegevens opnieuw in te stellen
    localStorage.setItem("users", JSON.stringify([])); // Reset de gegevens naar een lege array
  }
});

// knop dat alle lokale gegevens verwijderd
document.addEventListener("DOMContentLoaded", function () {
  const clearAllDataButton = document.getElementById("clearAllButton");

  clearAllDataButton.addEventListener("click", function () {
    localStorage.removeItem("users");
    alert("Alle opgeslagen gegevens zijn verwijderd!");
    //Herlaad de pagina om de veranderingen door te voeren
    window.location.reload();
  });
});
