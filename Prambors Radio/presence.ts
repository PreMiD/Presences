const presence = new Presence({
  clientId: "630428033966276612"
});
const strings = presence.getStrings({
  play: "presence.playback.playing",
  pause: "presence.playback.paused"
});
let presenceData: presenceData = {
  largeImageKey: "logo"
};
let timestamp: number;

presence.on("UpdateData", async () => {
  const pause = (await strings).pause,
    play = (await strings).play;
  if (document.location.hostname.startsWith("streaming")) {
    if (!timestamp) timestamp = Date.now();
    const status = document.querySelector("#playerBtn")
      ? document.querySelector("#playerBtn").className
      : null;
    if (status === "stopped") {
      timestamp = null;
      delete presenceData.startTimestamp;
      presenceData.smallImageKey = "pause";
      presenceData.smallImageText = pause;
    } else if (status === "playing") {
      presenceData.smallImageKey = "live";
      presenceData.smallImageText = "Streaming";
      presenceData.startTimestamp = timestamp;
    } else {
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = play;
    }
    presenceData.state = document
      .querySelectorAll("span[data-radium=true]")
      .item(3).textContent;
    presenceData.details = document
      .querySelectorAll("span[data-radium=true]")
      .item(2).textContent;
  } else {
    presenceData = null;
  }
  presenceData ? presence.setActivity(presenceData) : presence.setActivity();
});
