const presence = new Presence({
  clientId: "648283786676666409"
});

const browsingStamp = Math.floor(Date.now() / 1000);
let song, dj, listeners;
const updateStats = (): void => {
  (song = {
    name: document.querySelector("#song-name").textContent,
    artist: document
      .querySelector("#song-artist")
      .textContent.replace(/;/g, ", ")
  }),
    (dj = document.querySelector("#dj-name").textContent),
    (listeners = document.querySelector("#listeners").textContent);
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
    startTimestamp: browsingStamp
  });
});
