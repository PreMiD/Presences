const presence = new Presence({
  clientId: "648283786676666409",
});

let ready = false,
  browsingStamp = Math.floor(Date.now() / 1000),
  song,
  dj,
  listeners,
  updateStats = () => {
    ready - true;
    (song = {
      name: document.querySelector("#song-name").innerText,
      artist: document
        .querySelector("#song-artist")
        .innerText.replace(/;/g, ", "),
    }),
      (dj = document.querySelector("#dj-name").innerText),
      (listeners = document.querySelector("#listeners").innerText);
  };

setInterval(updateStats, 1000);
updateStats();

presence.on("UpdateData", () => {
  presence.setActivity({
    state: `${dj} (${listeners})`,
    details: `${song.name} - ${song.artist}`,
    largeImageKey: "logo",
    smallImageKey: "play",
    smallImageText: "Listening to Tune",
    startTimestamp: browsingStamp,
  });
});
