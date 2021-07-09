const presence = new Presence({
    clientId: "760589758845550632"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    browsing: "presence.activity.browsing"
  });
let path,
  prev: string,
  elapsed: number,
  prevState: string,
  cp: number,
  currTime: string;

function getTime(list: string[]): number {
  let ret = 0;
  for (let index = list.length - 1; index >= 0; index--) {
    ret += parseInt(list[index]) * 60 ** index;
  }
  return ret;
}

function getTimestamps(
  audioTime: number,
  audioDuration: string
): Array<number> {
  const splitAudioDuration = audioDuration.split(":").reverse(),
    parsedAudioDuration = getTime(splitAudioDuration),
    startTime = Date.now(),
    endTime = audioTime + parsedAudioDuration * 1000;
  return [startTime, endTime];
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
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
      .querySelector("#chat div.nameState")
      .textContent.toUpperCase();

    if (data.state !== prevState) {
      delete data.startTimestamp;
      delete data.endTimestamp;
      prevState = data.state;
      cp = Date.now();
      currTime = document.querySelector(
        "#chat div.timeState.timer"
      ).textContent;
    }

    const timestamps = getTimestamps(cp, currTime);

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
