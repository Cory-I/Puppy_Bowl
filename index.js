/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
const API =
  "https://fsa-puppy-bowl.herokuapp.com/api/2605-ftb-et-web-ft-corynne";
let players = [];
let selectedPlayer = null;
////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */

async function fetchAllPlayers() {
  try {
    const response = await fetch(`${API}/players`);
    const result = await response.json();
    players = result.data.players;
  } catch (err) {
    console.error(err);
  }
}
/**
 * Fetches a single player from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 * @param {number} playerId
 */
/**
 * Note: In order to call fetchSinglePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to fetch, we cannot call fetchSinglePlayer()
 */
async function fetchSinglePlayer(id) {
  try {
    const response = await fetch(`${API}/players/${id}`);
    const result = await response.json();
    selectedPlayer = result.data.player;
    render();
  } catch (err) {
    console.error(err);
  }
}
/**
 * Adds a new player to the roster via the API.
 * Once a player is added to the database, the new player
 * should appear in the all players page without having to refresh
 * @param {Object} newPlayer the player to add
 */
/* Note: we need data from our user to be able to add a new player
 * What does that sound like we need?
 */
/**
 * Note#2: addNewPlayer() expects you to pass in a
 * new player object when you call it. How can we
 * create a new player object and then pass it to addNewPlayer()?
 */
async function addNewPlayer(newPlayer) {
  try {
    await fetch(`${API}/players`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlayer),
    });

    await fetchAllPlayers();
    render();
  } catch (err) {
    console.error(err);
  }
}
/**
 * Removes a player from the roster via the API.
 * Once the player is removed from the database,
 * the player should also be removed from our view without refreshing
 * @param {number} playerId the ID of the player to remove
 */
/**
 * Note: In order to call removePlayer() a player's id is required.
 * Unless we know the id of the player we are trying to remove, we cannot call removePlayer()
 */
async function removePlayer(id) {
  try {
    await fetch(`${API}/players/${id}`, {
      method: "DELETE",
    });

    players = players.filter((p) => p.id !== id);
    selectedPlayer = null;

    render();
  } catch (err) {
    console.error(err);
  }
}
/**
 * Updates html to display a list of all players or a single player page.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player in the all player list is displayed with the following information:
 * - name
 * - image (with alt text of the player's name)
 *
 * Additionally, for each player we should be able to:
 * - See details of a single player. The page should show
 *    specific details about the player clicked such as: name, id, breed, status, image, and team or unassigned if no team
 * - Remove from roster. When a button is clicked, should remove the player
 *    from the database and our current view without having to refresh
 *
 */
const playerForm = document.querySelector("#addPuppy");

playerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(playerForm);

  const newPlayer = {
    name: formData.get("name"),
    breed: formData.get("breed"),
    imageUrl: formData.get("imageUrl"),
  };

  await addNewPlayer(newPlayer);
});

function playerListItem(player) {
  const $li = document.createElement("li");

  if (player.id === selectedPlayer?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">
      <img id="profile" src="${player.imageUrl}" alt="Puppy named ${player.name}">
      <p>${player.name}</p>
    </a>
  `;

  $li.addEventListener("click", () => fetchSinglePlayer(player.id));

  return $li;
}

function playerList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("players");
  $ul.replaceChildren(...players.map(playerListItem));
  return $ul;
}

function SelectedPlayer() {
  if (!selectedPlayer) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a player to learn more.";
    return $p;
  }

  const $section = document.createElement("section");

  $section.innerHTML = `
    <h3>${selectedPlayer.name} — ID #${selectedPlayer.id}</h3>
    <p>Breed: ${selectedPlayer.breed}</p>
    <p>Status: ${selectedPlayer.status}</p>
    <img src="${selectedPlayer.imageUrl}" alt="Puppy named ${selectedPlayer.name}">
    <button id="remove-player">Remove Player</button>
  `;

  return $section;
}

const render = () => {
  const $app = document.querySelector("#app");

  $app.innerHTML = `
    <h1>Puppy Bowl Team Manager</h1>
    <main>
      <section id="list">
        <h2>Meet the Athletes!</h2>
        <ul></ul>
      </section>

      <section id="selected">
        <div id="selected-athlete"></div>
      </section>
    </main>
  `;

  $app.querySelector("ul").replaceWith(playerList());

  if (selectedPlayer) {
    const newSection = SelectedPlayer();
    const container = $app.querySelector("#selected-athlete");
    container.replaceWith(newSection);

    const removeBtn = newSection.querySelector("#remove-player");
    removeBtn.addEventListener("click", () => removePlayer(selectedPlayer.id));
  }
};
/**
 * Initializes the app by calling render
 * HOWEVER....
 */
async function init() {
  //Before we render, what do we always need?
  await fetchAllPlayers();
  render();
}

init();
