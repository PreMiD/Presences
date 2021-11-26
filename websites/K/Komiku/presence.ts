const presence = new Presence({
    clientId: "868085258371870820"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

// Presence On
presence.on("UpdateData", async () => {
  const buttons = await presence.getSetting("buttons"),
    time = await presence.getSetting("timestamps"),
    presenceData: PresenceData = {
      details: "Page not Supported", // If the page cannot be recognized
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    };

  if (document.location.href === "https://komiku.id/")
    presenceData.details = "Viewing Homepage";
  else if (document.location.pathname.endsWith("/baca-manga/"))
    presenceData.details = "Viewing Manga List";
  else if (document.location.pathname.endsWith("/baca-manhua/"))
    presenceData.details = "Viewing Manhua List";
  else if (document.location.pathname.endsWith("/baca-manhwa/"))
    presenceData.details = "Viewing Manhwa List";
  else if (document.location.pathname.endsWith("/daftar-komik/"))
    presenceData.details = "Viewing Comic List";
  else if (document.location.pathname.endsWith("/pustaka/"))
    presenceData.details = "Viewing New Release";
  else if (document.location.pathname.startsWith("/other/")) {
    if (document.location.pathname.startsWith("/other/hot/"))
      presenceData.details = "Browsing Featured";
    else if (document.location.pathname.endsWith("/rekomendasi/"))
      presenceData.details = "Browsing Recommendation";
    else if (document.location.pathname.endsWith("/berwarna/"))
      presenceData.details = "Browsing Coloured Comic";
  } else if (document.location.pathname.startsWith("/bookmark/history.html"))
    presenceData.details = "Viewing History";
  else if (document.location.pathname.startsWith("/manga/")) {
    const name = document
        .querySelector("header#Judul h1")
        .textContent.replace(/\t|\n/g, ""),
      type = document.querySelector("section#Informasi b").textContent;
    presenceData.details = `Viewing ${type}`;
    presenceData.state = name;
    // View Manga Buttons
    if (buttons) {
      presenceData.buttons = [
        {
          label: `View ${type}`,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.startsWith("/ch/")) {
    const title = document
        .querySelector("header#Judul h1")
        .textContent.replace(/\t|\n/g, "")
        .replace(/Chapter \d+/, ""),
      chapter = document.location.pathname
        .match(/chapter-\d+/)[0]
        .replace("c", "C")
        .replace("-", " ");
    presenceData.details = title;
    presenceData.state = chapter;
    // View Manga & Chapter Buttons
    if (buttons) {
      presenceData.buttons = [
        {
          label: "View Manga",
          url: document.location.href
            .replace("ch", "manga")
            .replace(/-chapter-\d+/, "")
            .replace(/#\d+/, "")
        },
        {
          label: chapter,
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  } else if (document.location.pathname.startsWith("/cari/")) {
    const search = document
      .querySelector("div.ntah h1")
      .textContent.replace("Hasil Pencarian", "")
      .replace(/\t|\n/g, "");
    presenceData.details = "Searching:";
    presenceData.state = search;
  } else if (document.location.pathname.startsWith("/genre/")) {
    const genre = document
      .querySelector("div.ntah h1")
      .textContent.replace("Genre", "")
      .replace(/\t|\n/g, "");
    presenceData.details = `Viewing Genre${genre}`;
  }

  // Show Timestamps
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  presence.setActivity(presenceData);
});
