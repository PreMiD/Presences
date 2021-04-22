const presence = new Presence({
    clientId: "833689728774832168"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
    
  });

let videoData: {
  duration: number,
  paused: boolean,
  currentTime: number
};

presence.on("iFrameData", (data: typeof videoData) => {
    if (data !== null)
    videoData = data;
})

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "animetube",
  };

  if (document.location.pathname === "/") {
     data.details = "| Startseite";
     data.state = "Starrt auf die Startseite";
  } else if (document.location.pathname.startsWith("/anime/list")) {
    data.details = "| Suche";
    data.state = "Sucht nach einem neuen Lieblingsanime";
  } else if (document.location.pathname.startsWith('/anime') && !document.location.pathname.includes('/watch') ) {
    const titleSplit = document.title.split('›').map((s) => s.trim());

    data.details = "| Übersicht";
    data.state = titleSplit[2];
  } else if (document.location.pathname === "/static/calendar") {
    data.details = "| Kalendar";
    data.state = "Campt die Releases";
  } else if (document.URL.includes("/user/me?page=delete")) {
    data.details = "| Account Löschen";
    data.state = "Eine Straftat begehen";
  } else if (document.URL.includes("/user/me?page=password")) {
    data.details = "| Passwort ändern";
    data.state = "Hier könnte ihr Passwort stehen";
  } else if (document.location.pathname.includes("/user/me")) {
    data.details = "| Einstellungen";
    data.state = "Macht irgendwas kaputt";
  } else if (document.location.pathname.includes("/user/")) {
    const titleSplit = document.title.split('Profil von '),
    userName = titleSplit[1];

    data.details = "| Benutzerinfo";
    data.state = `Stalkt ${userName}`;
  } else if (document.location.pathname === "/easteregg") {
    data.details = "| Ist das ein Easteregg?";
    data.state = "Ja, ja das ist es, was jetzt?";
  } else if (document.location.pathname.startsWith("/static/")) {
    data.details = "| Hilfe & Infos";
    data.state = "Ach, das liest du doch eh nicht!";
  } else if (document.location.pathname.includes('/anime') && document.location.pathname.includes('/watch')) {
    const titleSplit = document.title.split('›').map((s) => s.trim()),
    animeName = titleSplit[2],
    episode = titleSplit[3];
  
    data.details = `| schaut ${animeName}`;
    data.state = episode;

    if (videoData){
      const timestamps = presence.getTimestamps(videoData.currentTime, videoData.duration);

      data.smallImageKey = videoData.paused ? "pause" : "play";
      data.smallImageText = videoData.paused ? "Pausiert" : "Spielt";

      data.endTimestamp = timestamps[1];

      if (videoData.paused)
        delete data.endTimestamp;
    }
  } else if (document.location.pathname === "/login") {
    data.details = "| Login";
    data.state = "Wo warst du Senpai?";
  } else if (document.location.pathname === "/password/reset") {
    data.details = "| Passwort zurücksetzen";
    data.state = "Du bist so vergesslich, onee-chan! >->";
  } else if (document.location.pathname === "/register") {
    data.details = "| Registrieren";
    data.state = "Wer bist du denn? owo";
  } else {
    data.details = "| Error 404";
    data.state = "Was hast du diesmal kaputt gemacht?";
  }

  presence.setActivity(data);
});