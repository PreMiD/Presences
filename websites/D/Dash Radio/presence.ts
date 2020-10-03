const presence = new Presence({
  clientId: "761889098490183691"
});

let songName: HTMLElement,
  songArtist: HTMLElement,
  songNameS: string,
  songArtistS: string;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  }, page = window.location.pathname;

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  if (page.includes("home")) {
      songName = document.querySelector(
        "header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Title-Text"
      );
      if(songName == null) {
        songNameS = "None";
      } else if(songName != null) {
        songNameS = songName.innerText;
      }


    songArtist = document.querySelector(
      "header.MuiAppBar-root > div.music-dataview-container > span.App-Player-Song-Artist-Text"
    );
    if(songArtist == null) {
      songArtistS = "None";
    } else if(songArtist != null) {
      songArtistS = songArtist.innerText;
    }

    presenceData.smallImageKey = "logo";
    presenceData.smallImageText = "Presence by apprehends#0001";

    presenceData.details = songNameS;
    presenceData.state = songArtistS;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});