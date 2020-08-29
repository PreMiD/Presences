var presence = new Presence({
  clientId: "748780200006778892"
});

const selectors = {
  CHARACTER_CREATOR: 'pony-town-app main > character',
  GAME_ELEMENT: '#app-game',
  SERVER_NAME: 'play-box .btn-success > div > span',
  CHARACTER_NAME: '.character-select > input',
  IN_GAME_SERVER_NAME: '#app-game span[title="Current server"]',
  IN_GAME_CHARACTER_NAME: '.character-select-list > .selected .character-name'
}

enum PlayingState {
  UNKNOWN,
  CHARACTER_CREATOR,
  IN_GAME
}

let lastSeenCharacterName = "New Character";
let lastSeenServerName = "Unknown Server";
let lastSeenState = PlayingState.UNKNOWN;
let lastStateTime = Date.now();

// On presence update request
presence.on("UpdateData", async () => {

  // Check if the user is in-game
  const gameElement = document.querySelector(selectors.GAME_ELEMENT)
  if (gameElement && gameElement instanceof HTMLElement && !gameElement.hidden) {

    // Update the last seen state
    if (lastSeenState != PlayingState.IN_GAME) {
      lastSeenState = PlayingState.IN_GAME;
      lastStateTime = Date.now();
    }

    // Try to find what server they're on
    const serverSpan = document.querySelector(selectors.IN_GAME_SERVER_NAME);
    if(serverSpan) {
      lastSeenServerName = serverSpan.textContent;
    }

    // Try to find what character they're playing
    const charSpan = document.querySelector(selectors.IN_GAME_CHARACTER_NAME);
    if (charSpan) {
      lastSeenCharacterName = charSpan.textContent;
    }

    // Update presence
    presence.setActivity({
      largeImageKey: "main-icon",
      details: `Playing as ${lastSeenCharacterName}`,
      state: lastSeenServerName,
      startTimestamp: lastStateTime
    });

  }
  // Check if the user is editing a character
  else if (document.querySelector(selectors.CHARACTER_CREATOR)) {

    // Update the last seen state
    if (lastSeenState != PlayingState.CHARACTER_CREATOR) {
      lastSeenState = PlayingState.CHARACTER_CREATOR;
      lastStateTime = Date.now();
    }

    // Try to find what server is selected
    const serverSpan = document.querySelector(selectors.SERVER_NAME);
    if(serverSpan) {
      lastSeenServerName = serverSpan.textContent;
    }

    // Try to find what character they're editing
    const charSelector = document.querySelector(selectors.CHARACTER_NAME);
    if (charSelector && charSelector instanceof HTMLInputElement) {
      lastSeenCharacterName = charSelector.value || "New Character";
    }

    // Update presence
    presence.setActivity({
      largeImageKey: "main-icon",
      details: `Editing ${lastSeenCharacterName}`,
      startTimestamp: lastStateTime
    });

  }
  // Otherwise
  else {

    // Update the last seen state
    if (lastSeenState != PlayingState.UNKNOWN) {
      lastSeenState = PlayingState.UNKNOWN;
      lastStateTime = Date.now();
    }

    // Try to find what server is selected
    const serverSpan = document.querySelector(selectors.SERVER_NAME);
    if(serverSpan) {
      lastSeenServerName = serverSpan.textContent;
    }

    // Try to find what character is selected
    const charSelector = document.querySelector(selectors.CHARACTER_NAME);
    if (charSelector && charSelector instanceof HTMLInputElement) {
      lastSeenCharacterName = charSelector.value;
    }

    // Update presence
    presence.setTrayTitle();
    presence.setActivity();
  }

});
