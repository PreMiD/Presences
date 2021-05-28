const presence = new Presence({
    clientId: "761889098490183691"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let songName: HTMLElement,
  songArtist: HTMLElement,
  songNameS: string,
  songArtistS: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  songName = document.querySelector(
    "header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Title-Text"
  );
  if (!songName) {
    songNameS = document.getElementById("marquee1").innerHTML;
    songNameS = songNameS.replace("<span>", "");
    songNameS = songNameS.replace("</span>", "");
    if (songNameS === "") songNameS = "None";
  } else if (songNameS !== null) songNameS = songName.innerText;

  songArtist = document.querySelector(
    "header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Artist-Text"
  );
  if (!songArtist) {
    songArtistS = document.getElementById("marquee2").innerHTML;
    songArtistS = songArtistS.replace(/&amp;/g, "&");
    songArtistS = songArtistS.replace('<span class="artist">', "");
    songArtistS = songArtistS.replace("</span>", "");
    if (songNameS === "") songArtistS = "None";
  }

  if ((songNameS === "None" && songArtistS === "None") || songArtistS === "") {
    presenceData.smallImageKey = "paused";
    presenceData.smallImageText = "PauseChamp";

    presenceData.details = (await strings).pause;
  } else {
    presenceData.smallImageKey = "play";
    presenceData.smallImageText = "Playing...";

    presenceData.details = songNameS;
    presenceData.state = songArtistS;
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
