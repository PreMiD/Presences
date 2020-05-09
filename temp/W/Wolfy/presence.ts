var presence = new Presence({
    clientId: "644235680012042261"
  }),
  path,
  prev,
  elapsed,
  prevState,
  cp: any,
  currTime: any,
  strings = presence.getStrings({
    play: "presence.playback.playing",
    browsing: "presence.activity.browsing"
  });

function getTime(list: string[]): number {
  var ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(audioTime: any, audioDuration: string): Array<number> {
  var splitAudioDuration = audioDuration.split(":").reverse();

  var parsedAudioTime = getTime(audioTime);
  var parsedAudioDuration = getTime(splitAudioDuration);

  var startTime = Date.now();
  var endTime =
    Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
  return [Math.floor(startTime / 1000), endTime];
}

presence.on("UpdateData", async () => {
  const data: presenceData = {
    largeImageKey: "wf"
  };

  path = document.location.pathname;

  if (window.location.href !== prev && !path.includes("/game/")) {
    delete data.startTimestamp;
    delete data.endTimestamp;
    prev = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  data.details = (await strings).browsing;
  data.smallImageKey = "search";
  data.smallImageText = (await strings).browsing;
  data.startTimestamp = elapsed;

  if (
    path.includes("/articles/") &&
    path.split("/")[2] != null &&
    path.split("/")[2].length > 1
  ) {
    data.state = document.querySelector("body h1").textContent;
  } else if (
    path.includes("/game/") &&
    path.split("/")[2] != null &&
    path.split("/")[2].length > 1
  ) {
    data.state = document
      .querySelector("#chat p.phase")
      .textContent.toUpperCase();

    if (data.state !== prevState) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      prevState = data.state;
      cp = Date.now();
      currTime = document.querySelector("#chat p.time").textContent;
    }

    var timestamps = getTimestamps(cp, currTime);

    data.details = "En jeu";

    data.smallImageKey = "live";
    data.smallImageText = (await strings).play;
    if (currTime && currTime.includes(":")) {
      data.startTimestamp = timestamps[0];
      data.endTimestamp = timestamps[1];
    } else {
      data.startTimestamp = cp;
    }
  } else {
    switch (path) {
      case "/settings":
        data.state = "Paramètres";
        break;
      case "/shop":
        data.state = "Boutique";
        break;
      case "/articles":
        data.state = "Actualités";
        data.smallImageKey = "reading";
        data.smallImageText = "En train de lire";
        break;
      case "/play":
      case "/":
      default:
        data.state = "Page d'accueil";
    }
  }
  presence.setActivity(data);
});
