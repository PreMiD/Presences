const presence = new Presence({
    clientId: "630428033966276612"
  }),
  strings = presence.getStrings({
    pause: "presence.playback.paused"
  }),
  presenceData: PresenceData = {
    largeImageKey: "logo"
  };

let timestamp: number;

presence.on("UpdateData", async () => {
  const pause = (await strings).pause;
  if (
    ["streaming.pramborsfm.com", "live.pramborsfm.com"].includes(
      document.location.hostname
    )
  ) {
    presenceData.buttons = [
      {
        label: "Listen to Prambors",
        url: "https://live.pramborsfm.com"
      }
    ];
    if (!timestamp) timestamp = Date.now();
    switch (document.location.hostname) {
      case "streaming.pramborsfm.com": {
        const status = document.querySelector("#playerBtn")?.className;
        if (status === "stopped") {
          timestamp = null;
          delete presenceData.startTimestamp;
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = pause;
        } else if (status === "playing") {
          presenceData.smallImageKey = "live";
          presenceData.smallImageText = "Listening";
          presenceData.startTimestamp = timestamp;
        }
        presenceData.state = document
          .querySelectorAll("span[data-radium=true]")
          .item(3).textContent;
        presenceData.details = document
          .querySelectorAll("span[data-radium=true]")
          .item(2).textContent;
        break;
      }
      case "live.pramborsfm.com": {
        const buttonAction = [
          ...[...document.querySelectorAll("button")].pop().classList
        ]
          .pop()
          .split("--")
          .pop();
        if (buttonAction === "play") {
          timestamp = null;
          delete presenceData.startTimestamp;
          presenceData.smallImageKey = "pause";
          presenceData.smallImageText = pause;
        } else if (buttonAction === "pause") {
          presenceData.smallImageKey = "live";
          presenceData.smallImageText = "Listening";
          presenceData.startTimestamp = timestamp;
        }
        presenceData.state = document.querySelector(
          ".td-player-vertical__track-info__artist-name"
        ).textContent;
        presenceData.details = document.querySelector(
          ".td-player-vertical__track-info__cue-title"
        ).textContent;
        break;
      }
    }
  }
  presence.setActivity(presenceData);
});
