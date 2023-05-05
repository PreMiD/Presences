const presence = new Presence({
  clientId: "882003722270572574",
});
const browsingTimestamp = Math.floor(Date.now() / 1000);

let npTitle: string, npArtist: string, npOnAir: string, npListeners: number;

function fetchStats(): void {
  fetch("https://staff.weareharmony.net/api/nowplaying")
    .then((result) => result.json())
    .then((result) => {
      npTitle = result.song.title;
      npArtist = result.song.artist;
      npOnAir = result.onAir.name;
      npListeners = result.listeners;
    });
}

fetchStats();
setInterval(fetchStats, 10000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://i.imgur.com/lI0bLxr.png",
    smallImageKey: "live",
  };

  if (document.location.hash.startsWith("app/")) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.smallImageText = `Listeners: ${npListeners} | Live DJ: ${npOnAir}`;
    if (document.location.hash === "app/home") {
      presenceData.details = `🎶 ➜ ${npTitle}`;
      presenceData.state = `🎤 ➜ ${npArtist}`;
    } else if (document.location.hash.startsWith("app/profile")) {
      presenceData.details = `📰 ➜ Viewing user: ${
        document.querySelector(
          "body > div.pageContainer > div.pageContent > div.metadata  > h1"
        ).textContent
      }`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    } else if (document.location.hash.startsWith("app/track")) {
      presenceData.details = `📰 ➜ Viewing song: ${
        document.querySelector("#song-title").textContent
      }`;
      presenceData.state = `🎤 ➜ ${
        document.querySelector("#song-artist").textContent
      }`;
    } else {
      presenceData.details = `📰 ➜ Viewing page: ${
        document.location.hash.slice(2).split("?")[0]
      }`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    }
  }
  presence.setActivity(presenceData);
});
