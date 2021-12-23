const presence = new Presence({
  clientId: "808664560936026122"
});
async function getStrings() {
  return presence.getStrings(
    {
      buttonJoinGame: "kahoot.buttonJoinGame",
      viewHome: "general.viewHome"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    buttons = await presence.getSetting("buttons"),
    newLang = await presence.getSetting("lang").catch(() => "en"),
    round = document.querySelector("#round").textContent;

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.querySelector("#containerGamePlayers").textContent && !round) {
    presenceData.details = round;
    if (buttons) {
      presenceData.buttons = [
        {
          label: (await strings).buttonJoinGame.replace(": {0}", ""),
          url: document.location.href
        }
      ];
    }
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else presenceData.details = (await strings).viewHome;
  presence.setActivity(presenceData);
});
