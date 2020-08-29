const presence = new Presence({
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

const lastState = {
  state: PlayingState.UNKNOWN,
  characterName: "New Character",
  serverName: "Unknown Server",
  time: Date.now()
}

// On presence update request
presence.on("UpdateData", async () => {

  // Check if the user is in-game
  const gameElement = document.querySelector(selectors.GAME_ELEMENT)
  if (gameElement && gameElement instanceof HTMLElement && !gameElement.hidden) {

    // Update the last seen state
    if (lastState.state != PlayingState.IN_GAME) {
      lastState.state = PlayingState.IN_GAME;
      lastState.time = Date.now();
    }

    // Try to find what server they're on
    const serverSpan = document.querySelector(selectors.IN_GAME_SERVER_NAME);
    if(serverSpan) {
      lastState.serverName = serverSpan.textContent;
    }

    // Try to find what character they're playing
    const charSpan = document.querySelector(selectors.IN_GAME_CHARACTER_NAME);
    if (charSpan) {
      lastState.characterName = charSpan.textContent;
    }

    // Update presence
    presence.setActivity({
      largeImageKey: "main-icon",
      details: `Playing as ${lastState.characterName}`,
      state: lastState.serverName,
      startTimestamp: lastState.time
    });

  }
  // Check if the user is editing a character
  else if (document.querySelector(selectors.CHARACTER_CREATOR)) {

    // Update the last seen state
    if (lastState.state != PlayingState.CHARACTER_CREATOR) {
      lastState.state = PlayingState.CHARACTER_CREATOR;
      lastState.time = Date.now();
    }

    // Try to find what server is selected
    const serverSpan = document.querySelector(selectors.SERVER_NAME);
    if(serverSpan) {
      lastState.serverName = serverSpan.textContent;
    }

    // Try to find what character they're editing
    const charSelector = document.querySelector(selectors.CHARACTER_NAME);
    if (charSelector && charSelector instanceof HTMLInputElement) {
      lastState.characterName = charSelector.value || "New Character";
    }

    // Update presence
    presence.setActivity({
      largeImageKey: "main-icon",
      details: `Editing ${lastState.characterName}`,
      startTimestamp: lastState.time
    });

  }
  // Otherwise
  else {

    // Update the last seen state
    if (lastState.state != PlayingState.UNKNOWN) {
      lastState.state = PlayingState.UNKNOWN;
      lastState.time = Date.now();
    }

    // Try to find what server is selected
    const serverSpan = document.querySelector(selectors.SERVER_NAME);
    if(serverSpan) {
      lastState.serverName = serverSpan.textContent;
    }

    // Try to find what character is selected
    const charSelector = document.querySelector(selectors.CHARACTER_NAME);
    if (charSelector && charSelector instanceof HTMLInputElement) {
      lastState.characterName = charSelector.value;
    }

    // Update presence
    presence.setTrayTitle();
    presence.setActivity();
  }

});
