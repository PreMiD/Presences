const presence = new Presence({
    clientId: "630428033966276612"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

let startTimestamp: number;

presence.on("UpdateData", async () => {
  const { play, pause } = await strings,
    buttonAction = [
      ...document.querySelector("button[class*='td-player']").classList
    ]
      .pop()
      .split("--")
      .pop();
  if (buttonAction === "play") {
    startTimestamp = undefined;
    presenceData.smallImageKey = "pause";
    presenceData.smallImageText = pause;
    delete presenceData.startTimestamp;
    delete presenceData.state;
  } else if (buttonAction === "pause") {
    if (!startTimestamp) startTimestamp = Date.now();
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = play;
    presenceData.startTimestamp = startTimestamp;
    presenceData.state = "Listening";
  }
  presenceData.buttons = [
    {
      label: "Listen",
      url: "https://live.pramborsfm.com"
    }
  ];
  presence.setActivity(presenceData);
});
