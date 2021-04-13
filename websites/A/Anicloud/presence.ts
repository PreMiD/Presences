const presence = new Presence({
  clientId: `830517484472762408`
}),
{ pathname } = window.location,

startTimestamp = Math.floor(Date.now() / 1000);

/**
* Get Timestamps
* @param {Number} videoTime Current video time seconds
* @param {Number} videoDuration Video duration seconds
*/
function getTimestamps(
videoTime: number,
videoDuration: number
): Array<number> {
const startTime = Math.floor(Date.now() / 1000),
  endTime = Math.floor(startTime - videoTime + videoDuration);
return [startTime, endTime];
}

let ep,
current: number,
duration: number,
paused: boolean,
played: boolean;

presence.on(
"iFrameData",
(data: {
  current: number;
  duration: number;
  paused: boolean;
  played: boolean;
}) => {
  current = data.current;
  duration = data.duration;
  paused = data.paused;
  played = data.played;
}
);

presence.on("UpdateData", async () => {
const strings = await presence.getStrings({
  playing: "presence.playback.playing",
  paused: "presence.playback.paused",
  browsing: "presence.activity.browsing"
});

const presenceData: PresenceData = {
  largeImageKey: "anicloud1"
};
if (pathname.startsWith("/anime/")) {
  const title = document.querySelector("h1").textContent,
  ep = document.querySelector("#wrapper > div.seriesContentBox > div.container.marginBottom > ul > li.currentActiveLink > a > span").textContent.match(/Episode\W\d/),
  actvie = document.querySelector("h2").textContent;
    presenceData.details = title;
    presenceData.state = ep + " | " + actvie;
    presenceData.buttons = [
      {
        label: "Current Anime",
        url: document.location.href
      },
    ]; 
 
  const video: HTMLVideoElement = document.querySelector(`video`);
  if (video != null) {
    played = video.currentTime != 0;
    duration = video.duration;
    current = video.currentTime;
    paused = video.paused;
  
  }
  
  document.querySelector;
  if (played) {
    if (!paused) {
      const timestamps = getTimestamps(current, duration);
      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];
    }
    presenceData.smallImageKey = paused ? "pause" : "play";
    presenceData.smallImageText = paused
      ? (await strings).paused
      : (await strings).playing;
    }

} else if (pathname == `/`) {
  presenceData.details = "Home";
  presenceData.startTimestamp = startTimestamp;

}

else if (pathname.startsWith('/animes')) {
  const sotiert = document.querySelector("#wrapper > div.container.marginBottom > div.seriesListNavigation > strong").textContent;
presenceData.details = "Alle Animes";
presenceData.state = "Sortiert nach: " + sotiert;

}

else if (pathname.startsWith('/search')) {
  presenceData.details = "Erweiterte Suche";

}

else if (pathname.startsWith('/beliebte-animes')) {
  const text = document.querySelector("title").textContent.split("|")[0];
  presenceData.details = text;

}

else if (pathname.startsWith('/animekalender')) {
  const date = document.querySelector(".col-md-4").textContent;
  presenceData.details = "Animekalender";
  presenceData.state = "- " + date;

}

else if (pathname.startsWith('/random')) {
  presenceData.details = "Der Anime - ";
  presenceData.state = "Zufallsgenerator";

}

else if (pathname.startsWith('/zufall')) {
  presenceData.details = "Der Anime - ";
  presenceData.state = "Zufallsgenerator";

}

else if (pathname.startsWith('/animewuensche')) {
  const date = document.querySelector("title").textContent.split("|")[0];
  presenceData.details = date;

}

else if (pathname.startsWith('/katalog')) {
  const katalog = document.querySelector("h1").textContent;
  presenceData.details = "Anime Katalog";
  presenceData.state = "- " + katalog;

}

else if (pathname.startsWith('/genre')) {
  const genre = document.querySelector("h1").textContent;
  presenceData.details = "Genre";
  presenceData.state = "- " + genre;

}

else if (pathname.startsWith('/neu')) {
  const neu = document.querySelector("h1").textContent;
  presenceData.details = neu;

}

else if (pathname.startsWith('/login')) {
  presenceData.details = "Login bei AniCloud";

}

else if (pathname.startsWith('/registrierung')) {
  presenceData.details = "Registrierung bei AniCloud";

}

else if (pathname.startsWith('/user/')) {
  const user = document.querySelector("h1").textContent,
  rank = document.querySelector("#userDetails > div > div > div:nth-child(3) > div").textContent;
  presenceData.details = rank;
  presenceData.state = "- " + user;
  presenceData.smallImageKey = "user";
  presenceData.smallImageText = rank;

}

else if (pathname.endsWith('/anleitung')) {
  presenceData.details = "So funktioniert's";
  presenceData.state = "- Die Anleitung";
}

else if (pathname.endsWith('/account')) {
  presenceData.details = "Mein Account";
}

else if (pathname.endsWith('/settings')) {
  presenceData.details = "Account";
  presenceData.state = "- Einstellungen";
}

else if (pathname.endsWith('/change-email')) {
  presenceData.details = "Account";
  presenceData.state = "- E-Mail anpassen";
}

else if (pathname.endsWith('/profile-picture')) {
  presenceData.details = "Account";
  presenceData.state = "- Profilbild ändern";
}

else if (pathname.endsWith('/profile-background')) {
  presenceData.details = "Account";
  presenceData.state = "- Profil Hintergrund ändern";
}

else if (pathname.includes('/frage')) {
  presenceData.details = "Fragen & Antworten";
  presenceData.startTimestamp = startTimestamp;
}

else if (pathname.startsWith('/support')) {
  presenceData.details = "Hilfe & Support";
  presenceData.startTimestamp = startTimestamp;
}

else if (pathname.endsWith('/nachrichten')) {
  presenceData.details = "Account";
  presenceData.state = "- Nachrichten";
}

else if (pathname.endsWith('/watchlist')) {
  const name = document.querySelector(".name").textContent;
  presenceData.details = "Profile | " + name;
  presenceData.state = "- Watchlist";
}

else if (pathname.endsWith('/subscribed')) {
  presenceData.details = "Account";
  presenceData.state = "- Abonnierte Serien";
}

else if (pathname.endsWith('/notifications')) {
  presenceData.details = "Account";
  presenceData.state = "- Benachrichtigungen";
}

else if (pathname.startsWith('/dmca')) {
  presenceData.details = "Digital Millennium - ";
  presenceData.state = "Copyright Act of 1998";
}

presence.setActivity(presenceData, true);
});