interface LangStrings {
  play: string;
  pause: string;
}

const presence = new Presence({
    clientId: "812656134120931330"
  }),
  getStrings = async () =>
    presence.getStrings(
      {
        play: "general.playing",
        pause: "general.paused"
      },
      await presence.getSetting("lang")
    ),
  browsingStamp = Math.floor(Date.now() / 1000);

let oldLang: string = null,
  strings: Promise<LangStrings> = getStrings();

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "radiooooo_logo",
      details: "Idling",
      startTimestamp: browsingStamp
    },
    audio = document.querySelector("audio");

  if (audio) {
    const timestamps = presence.getTimestampsfromMedia(audio),
      paused = audio.paused,
      title = document.querySelector("div.info > div.title").textContent,
      artist = document.querySelector("div.field.artist > span:nth-child(2)")
        .textContent,
      place = document.querySelector("div.head > div.place").textContent,
      year = document.querySelector("div.head > div.year").textContent,
      songDetails = await presence.getSetting("song_1"),
      songState = await presence.getSetting("song_2"),
      newLang = await presence.getSetting("lang");

    if (!oldLang) {
      oldLang = newLang;
    } else if (oldLang !== newLang) {
      oldLang = newLang;
      strings = getStrings();
    }

    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).pause
      : (await strings).play;

    presenceData.details = songDetails
      .replace("%title%", title)
      .replace("%artist%", artist)
      .replace("%place%", place)
      .replace("%year%", year);
    presenceData.state = songState
      .replace("%title%", title)
      .replace("%artist%", artist)
      .replace("%place%", place)
      .replace("%year%", year);

    presenceData.startTimestamp = timestamps[0];
    presenceData.endTimestamp = timestamps[1];

    if (paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  }

  presence.setActivity(presenceData);
});
