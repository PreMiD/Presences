var presence = new Presence({
  clientId: "613786642800705569"
});

const timeElapsed = Math.floor(Date.now() / 1000);
let songName, presenceState;

presence.on("UpdateData", async () => {
  songName = document.querySelector(
    "html > body > div#information.objectSettings.touchableOff > font#programInformationText.objectSettings.touchableOff"
  );
  presenceState = document.querySelector(
    "html > body > font#dateTextField.objectSettings.touchableOff"
  );
  if (songName.innerText.length < 1) {
    const presenceData: presenceData = {
      details: "Not tuned in.",
      largeImageKey: "jsrl",
      smallImageKey: "pause"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: presenceData = {
      details: songName.firstChild.textContent,
      state: presenceState.innerText,
      largeImageKey: "jsrl",
      smallImageKey: "live",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  }
});
