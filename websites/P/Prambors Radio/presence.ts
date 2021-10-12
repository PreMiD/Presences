const presence = new Presence({
    clientId: "630428033966276612"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let startTimestamp: number;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp,
    buttons: [
      {
        label: "Listen",
        url: "https://live.pramborsfm.com"
      }
    ]
  },
    buttonAction = document
      .querySelector("button[class*='td-player']")
      .classList
      .toString()
      .split("--")
      .pop();
  if (buttonAction === "play" || buttonAction === "loading") {
    startTimestamp &&= null;
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = (await strings).pause;
  } else if (buttonAction === "pause") {
    startTimestamp ??= Math.floor(Date.now() / 1000);
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = (await strings).play;
    presenceData.state = "Listening";
  }
  presence.setActivity(presenceData);
});
