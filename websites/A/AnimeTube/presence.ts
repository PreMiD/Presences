const presence = new Presence({
    clientId: "833689728774832168"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

let videoData: {
  duration: number;
  paused: boolean;
  currentTime: number;
};

presence.on("iFrameData", (data: typeof videoData) => {
  videoData = data;
});

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "animetube"
  };

  if (document.location.pathname === "/") {
    data.details = "| Startseite";
    data.state = "Starrt auf die neuen Sachen";
  } else if (document.location.pathname.startsWith("/anime/list")) {
    data.details = "| Suche";
    data.state = "Sucht nach einem neuen Lieblingsanime";
  } else if (
    document.location.pathname.startsWith("/anime") &&
    !document.location.pathname.includes("/watch")
  ) {
    const titleSplit = document.title.split("›").map((s) => s.trim());

    data.details = "| Übersicht";
    data.state = titleSplit[2];
  } else if (document.location.pathname === "/static/calendar") {
    data.details = "| Kalendar";
    data.state = "Schaut sich die neuen Releases an";
  } else if (document.URL.includes("/user/me?page=delete")) {
    data.details = "| Account Löschen";
    data.state = "Eine Straftat begehen";
  } else if (document.location.pathname.includes("/user/me")) {
    data.details = "| Einstellungen";
    data.state = "Macht irgendwas kaputt";
  } else if (document.location.pathname.includes("/user/")) {
    const titleSplit = document.title.split("Profil von "),
      userName = titleSplit[1];

    data.details = "| Benutzerinfo";
    data.state = `Profil von ${userName}`;
  } else if (document.location.pathname === "/easteregg") {
    data.details = "| Easteregg?";
    data.state = "Jup, Easeregg!";
  } else if (document.location.pathname.startsWith("/static/")) {
    data.details = "| Hilfe & Infos";
    data.state = "Ließt intensiv durch die Infoseiten";
  } else if (
    document.location.pathname.includes("/anime") &&
    document.location.pathname.includes("/watch")
  ) {
    const titleSplit = document.title.split("›").map((s) => s.trim()),
      animeName = titleSplit[2],
      episode = titleSplit[3];

    data.details = `| schaut ${animeName}`;
    data.state = episode;

    if (videoData) {
      const timestamps = presence.getTimestamps(
        videoData.currentTime,
        videoData.duration
      );

      data.smallImageKey = videoData.paused ? "pause" : "play";
      data.smallImageText = videoData.paused ? "Pausiert" : "Spielt";

      data.endTimestamp = timestamps[1];

      if (videoData.paused) delete data.endTimestamp;
    }
  } else if (document.location.pathname === "/login") {
    data.details = "| Login";
    data.state = "Willkommen zurück!";
  } else if (document.location.pathname === "/register") {
    data.details = "| Registrieren";
    data.state = "Ein neuer User!";
  } else {
    data.details = "| Error";
    data.state = "Wie bist du hier gelandet?";
  }

  presence.setActivity(data);
});
