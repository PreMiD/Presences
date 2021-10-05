const presence = new Presence({
    clientId: "689724677274337290"
  }),
  timeElapsed = Math.floor(Date.now() / 1000);
let songName, albumName, artistName;

presence.on("UpdateData", async () => {
  songName = document.querySelector<HTMLElement>(
    "span#cardTitle.card-title.playerText.truncate"
  );
  albumName = document.querySelector<HTMLElement>(
    "p#cardAlbum.playerText.truncate"
  );
  artistName = document.querySelector<HTMLElement>(
    "p#cardArtist.playerText.truncate"
  );
  if (albumName.innerText === "Press the Play button to start the radio") {
    const presenceData: PresenceData = {
      details: "Not tuned in.",
      largeImageKey: "clouds",
      smallImageKey: "pause"
    };
    presence.setActivity(presenceData);
  } else {
    const presenceData: PresenceData = {
      details: songName.innerText,
      state: `${artistName.innerText} - ${albumName.innerText}`,
      largeImageKey: "clouds",
      smallImageKey: "live",
      startTimestamp: timeElapsed
    };
    presence.setActivity(presenceData);
  }
});
