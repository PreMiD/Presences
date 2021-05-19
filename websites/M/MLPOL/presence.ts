const browsingStamp = Math.floor(Date.now() / 1000),
  presence = new Presence({
    clientId: "781944209770151997"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  },
  page = document.location.pathname;
  if (page == "/") {
    presenceData.details = "Homepage";
  }

  //Boards
  if (page == "/mlpol") {
    presenceData.details = "/mlpol/ - My Little Politics";
  }
  if (page == "/qa") {
    presenceData.details = "/qa/ - Questions and Answers";
  }
  if (page == "/go") {
    presenceData.details = "/go/ - Golden Oaks";
  }
  if (page == "/1ntr") {
    presenceData.details = "/1ntr/ - Internet & Imageboards";
  }
  if (page == "/vx") {
    presenceData.details = "/vx/ - Videogames and Paranormal";
  }
  if (page == "/cyb") {
    presenceData.details = "/cyb/ - Cyberpunk Fiction and Fact";
  }
  if (page == "/sp") {
    presenceData.details = "/sp/ - Football";
  }
  if (page == "/ub") {
    presenceData.details = "/ub/ - Überhengst";
  }
  if (page == "/a") {
    presenceData.details = "/a/ - Anime and Manga";
  }

  //Starts With
  if (page.startsWith("/mlpol/")) {
    presenceData.details = "/mlpol/ - My Little Politics";
  }
  if (page.startsWith("/qa/")) {
    presenceData.details = "/qa/ - Questions and Answers";
  }
  if (page.startsWith("/go/")) {
    presenceData.details = "/go/ - Golden Oaks";
  }
  if (page.startsWith("/1ntr/")) {
    presenceData.details = "/1ntr/ - Internet & Imageboards";
  }
  if (page.startsWith("/vx/")) {
    presenceData.details = "/vx/ - Videogames and Paranormal";
  }
  if (page.startsWith("/cyb/")) {
    presenceData.details = "/cyb/ - Cyberpunk Fiction and Fact";
  }
  if (page.startsWith("/sp/")) {
    presenceData.details = "/sp/ - Football";
  }
  if (page.startsWith("/ub/")) {
    presenceData.details = "/ub/ - Überhengst";
  }
  if (page.startsWith("/a/")) {
    presenceData.details = "/a/ - Anime and Manga";
  }

  presence.setActivity(presenceData);
});
