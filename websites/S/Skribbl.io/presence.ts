interface LangStrings {
  buttonJoinGame: string;
}

const presence = new Presence({
    clientId: "808664560936026122"
  }),
  getStrings = async (): Promise<LangStrings> => {
    return presence.getStrings(
      {
        buttonJoinGame: "kahoot.buttonJoinGame"
      },
      await presence.getSetting("lang")
    );
  };

let elapsed = Math.floor(Date.now() / 1000),
  strings: Promise<LangStrings> = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    inGame =
      document.querySelector("#containerGamePlayers").textContent === ""
        ? false
        : true,
    inLobby = document.querySelector("#round").textContent ? false : true,
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang");

  if (!oldLang) {
    oldLang = newLang;
  } else if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (inGame && !inLobby) {
    const round = document.querySelector("#round").textContent;
    presenceData.details = round;
    if (buttons) {
      presenceData.buttons = [
        {
          label: (await strings).buttonJoinGame.replace(": {0}", ""),
          url: document.location.href
        }
      ];
    }

    if (elapsed == null) {
      elapsed = Math.floor(Date.now() / 1000);
    }
    presenceData.startTimestamp = elapsed;
  } else {
    presenceData.details = "Viewing the Homepage";
    elapsed = null;
  }
  presence.setActivity(presenceData);
});
