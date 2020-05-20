var presence = new Presence({
    clientId: "640289470855380992"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
  });

function getTime(list: string[]): number {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(audioTime: any, audioDuration: any): Array<number> {
  audioTime = getTime(audioTime.split(":").reverse());
  audioDuration = getTime(audioDuration.split(":").reverse());

  var endTime = Math.floor(Date.now() / 1000) - audioTime + audioDuration;

  return [Math.floor(Date.now() / 1000), endTime];
}

presence.on("UpdateData", async () => {
  var data: PresenceData = {
    largeImageKey: "anlg"
  };

  var playback: boolean = document.querySelector("anghami-player") != null;

  if (playback) {
    var selectors: NodeListOf<Node> = document.querySelectorAll(
      ".duration-text"
    );
    var current: string =
      (selectors[0] && selectors[0].textContent.trim()) || "0:0";
    var length: string =
      (selectors[1] && selectors[1].textContent.trim()) || "0:0";
    var timestamps = getTimestamps(current, length);

    var playing: boolean =
      document.querySelector("anghami-player anghami-icon.icon.pause") != null;
    var selector: Node = document.querySelector(
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
