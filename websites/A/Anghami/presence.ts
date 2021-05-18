const presence = new Presence({
    clientId: "760586876854992926"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(
  audioTime: string,
  audioDuration: string
): Array<number> {
  const aT = getTime(audioTime.split(":").reverse()),
    aD = getTime(audioDuration.split(":").reverse()),
    endTime = Math.floor(Date.now() / 1000) - aT + aD;

  return [Math.floor(Date.now() / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "anlg"
    },
    playback: boolean = document.querySelector("anghami-player") != null;

  if (playback) {
    const selectors: NodeListOf<Node> =
        document.querySelectorAll(".duration-text"),
      current: string =
        (selectors[0] && selectors[0].textContent.trim()) || "0:0",
      length: string =
        (selectors[1] && selectors[1].textContent.trim()) || "0:0",
      timestamps = getTimestamps(current, length),
      playing: boolean =
        document.querySelector("anghami-player anghami-icon.icon.pause") !=
        null;
    let selector: Node = document.querySelector(
      "anghami-player .action-title .trim"
    );
    data.details = (selector && selector.textContent) || null;
    selector = document.querySelector("anghami-player .action-artist .trim");
    data.state = (selector && selector.textContent) || null;

    data.smallImageKey = playing ? "play" : "pause";
    data.smallImageText = playing
      ? (await strings).play
      : (await strings).pause;
    data.startTimestamp = timestamps[0];
    data.endTimestamp = timestamps[1];

    if (!playing) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    presence.setActivity(data, playback);
  } else {
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    presence.setActivity(data);
  }
});
