const presence = new Presence({
    clientId: "882003722270572574"
  }),
  browseTimestamp = Math.floor(Date.now() / 1000);

let npTitle: string,
  npArtist: string,
  npOnAir: string,
  npListeners: number;

function fetchStats(): void {
  fetch("https://staff.weareharmony.net/api/nowplaying")
    .then(result => result.json())
    .then(result => {
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
    largeImageKey: "logobg",
    smallImageKey: "nobg_white"
  };

  if(
    document.location.hostname === "weareharmony.net" &&
    document.location.hash.startsWith("#/")
  ) {
    presenceData.startTimestamp = browseTimestamp;
    presenceData.smallImageText = `Listeners: ${npListeners} | Live DJ: ${npOnAir}`;

    if(document.location.hash === "#/Home") {
      presenceData.details = `🎶 ➜ ${npTitle}`;
      presenceData.state = `🎤 ➜ ${npArtist}`;
    }else if(document.location.hash.startsWith("#/User")) {
      const username = document.querySelector("body > div.page-container > div > div.p-container > p").textContent;
      presenceData.details = `📰 ➜ Viewing user: ${username}`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    }else if(document.location.hash.startsWith("#/Song")) {
      const songName = document.querySelector(".sp-title").textContent,
        songArtist = document.querySelector(".sp-artist").textContent;
      presenceData.details = `📰 ➜ Viewing song: ${songName}`;
      presenceData.state = `🎤 ➜ ${songArtist}`;
    }else if(document.location.hash.startsWith("#/Library")) {
      const libOwner = (document.querySelector(".mlib") || document.querySelector(".olib")).textContent;
      presenceData.details = `📰 ➜ Viewing page: ${libOwner}`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    }else if(document.location.hash.startsWith("#/Special.Blank")) {
      const usernameTop = document.querySelector("#navbar > ul.dropdown.ubox > div > h1").textContent;
      presenceData.details = `📰 ➜ ${usernameTop} got FUNKY TOWNED!`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    }else {
      const [ location ] = document.location.hash.slice(2).split("?");
      presenceData.details = `📰 ➜ Viewing page: ${location}`;
      presenceData.state = `💿 ➜ ${npOnAir}`;
    }
  }

  if(presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
