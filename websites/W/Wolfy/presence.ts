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
  for (let index = list.length - 1; index >= 0; index--)
    ret += (parseInt(list[index]) * 60) ** index;

  return ret;
}

function getTimestamps(audioTime: number, audioDuration: string): number[] {
  return [
    Date.now(),
    audioTime + getTime(audioDuration.split(":").reverse()) * 1000
  ];
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "wf"
  };

  path = document.location.pathname;

  if (window.location.href !== prev && !path.includes("/game/")) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
    prev = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  presenceData.details = (await strings).browsing;
  presenceData.smallImageKey = "search";
  presenceData.smallImageText = (await strings).browsing;
  presenceData.startTimestamp = elapsed;

  if (
    path.includes("/articles/") &&
    path.split("/")[2] !== null &&
    path.split("/")[2].length > 1
  )
    presenceData.state = document.querySelector("body h1").textContent;
  else if (
    path.includes("/game/") &&
    path.split("/")[2] !== null &&
    path.split("/")[2].length > 1
  ) {
    presenceData.state = document
      .querySelector("#chat div.nameState")
      .textContent.toUpperCase();

    if (presenceData.state !== prevState) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
      prevState = presenceData.state;
      cp = Date.now();
      currTime = document.querySelector(
        "#chat div.timeState.timer"
      ).textContent;
    }

    const [startTimestamp, endTimestamp] = getTimestamps(cp, currTime);

    presenceData.details = "En jeu";

    presenceData.smallImageKey = "live";
    presenceData.smallImageText = (await strings).play;
    if (currTime && currTime.includes(":")) {
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
    } else presenceData.startTimestamp = cp;
  } else {
    switch (path) {
      case "/settings":
        presenceData.state = "Paramètres";
        break;
      case "/shop":
        presenceData.state = "Boutique";
        break;
      case "/articles":
        presenceData.state = "Actualités";
        presenceData.smallImageKey = "reading";
        presenceData.smallImageText = "En train de lire";
        break;
      case "/play":
      case "/":
      default:
        presenceData.state = "Page d'accueil";
    }
  }
  presence.setActivity(presenceData);
});
