/*             Feel free to use this skeleton I have provided or delete everything and do your own thing!             */

//If you would like to, you can create a variable to store the API_URL here.
//This is optional. if you do not want to, skip this and move on.

/////////////////////////////
/*This looks like a good place to declare any state or global variables you might need*/
const API =
  "https://fsa-puppy-bowl.herokuapp.com/api/2605-ftb-et-web-ft-corynne";
let players = [];
let playerId = "";
let selectedPlayer = null;
//
////////////////////////////

/**
 * Fetches all players from the API.
 * This function should not be doing any rendering
 * Instead, this function should be keeping our state up to date
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(API + "/players");
    const result = await response.json();
    players = result.data;
    console.log(players);
    return players;
    render();
  } catch (e) {
    console.error(e);
  }
};
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
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2605-ftb-et-web-ft-corynne/players/${id}`,
    );
    const result = await response.json();
    selectedPlayer = result.data;
    console.log(fetchSinglePlayer());
    render();
  } catch (e) {
    console.error(e);
  }
};
/* function listPlayers() {
  const $ul = document.createElement("ul");
  $ul.replaceChildren.add("players");

  const $players = players.map();
} */
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

const addNewPlayer = async (newPlayer) => {
  //TODO
};

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

const removePlayer = async (playerId) => {
  //TODO
};

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

const render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
  <h1>Puppy Bowl Team Manager</h1>
  <main>
    <section>
     <h2>Meet the Athletes!</h2>
     <Athletes></Athletes>
    </section>
    <section id= "selected">
    <h2>Athlete Specs</h2>
    <SelectedAthlete></SelectedAthlete>
    </section>
  </main>`;
  $app.querySelector("Athletes").replaceWith(async(fetchAllPlayers())); //change to relevant function when/if it exits
  $app.querySelector("SelectedAthlete").replaceWith(fetchSinglePlayer()); //change to relevant function when/if it exits
};
/**
 * Initializes the app by calling render
 * HOWEVER....
 */
const init = async () => {
  await fetchAllPlayers();
  await fetchSinglePlayer();
  //Before we render, what do we always need?

  render();
};

init();
