const iframe = new iFrame(),
  menuIDs = [
    // Login/Guest
    "guestOrAccountContainer",
    "guestContainer",
    "accountContainer",
    "autoLoginContainer",

    // Lobby
    "newbonklobby",
    "mapeditorcontainer",

    // MainMenu
    "classic_mid",
    "friendsContainer",
    "skinmanager",
    "skineditorcontainer",
    "quickPlayWindow",
    "roomListContainer",

    // Game Canvas
    "sm_connectingContainer",
    "gamerenderer"
  ],
  selector = menuIDs
    .map(
      (id) =>
        "#" +
        id +
        '[style*="visibility: inherit"]' +
        "," +
        ("#" + id + '[style*="display: block"]')
    )
    .join(",");

let lastGameMode: string = null;

// Add event listeners to buttons to set game mode
document
  .querySelector("#quickPlayWindow_ClassicButton")
  .addEventListener("click", () => (lastGameMode = "Classic"));
document
  .querySelector("#quickPlayWindow_ArrowsButton")
  .addEventListener("click", () => (lastGameMode = "Arrows"));
document
  .querySelector("#quickPlayWindow_GrappleButton")
  .addEventListener("click", () => (lastGameMode = "Grapple"));

document.querySelector("#roomlistjoinbutton").addEventListener("click", () => {
  const selectedMode = document.querySelector("tr.SELECTED > td:nth-child(3)");
  if (selectedMode) lastGameMode = selectedMode.textContent;
});

iframe.on("UpdateData", async () => {
  const element = document.querySelector(selector),
    lobbyGameMode = document.querySelector("#newbonklobby_modetext")
      ?.textContent,
    state =
      document.querySelector("#pretty_top_name").textContent +
      " - " +
      document.querySelector("#pretty_top_level").textContent,
    playerCount = document.querySelectorAll(".newbonklobby_playerentry").length;

  if (element?.id === "newbonklobby") lastGameMode = lobbyGameMode;

  iframe.send({ lastGameMode, id: element?.id, state, playerCount });
});
