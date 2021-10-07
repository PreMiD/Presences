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
    buttons: [
      {
        label: "Listen",
        url: "https://live.pramborsfm.com"
      }
    ]
  },
    buttonAction = [
      ...document.querySelector("button[class*='td-player']").classList
    ]
      .pop()
      .split("--")
      .pop();
  if (buttonAction === "play") {
    startTimestamp = undefined;
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = (await strings).pause;
  } else if (buttonAction === "pause") {
    if (!startTimestamp) startTimestamp = Math.floor(Date.now() / 1000);
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = (await strings).play;
    presenceData.startTimestamp = startTimestamp;
    presenceData.state = "Listening";
  }
  presence.setActivity(presenceData);
});
