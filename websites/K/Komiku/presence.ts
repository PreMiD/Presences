const presence = new Presence({
  clientId: "868085258371870820"
});

const browsingStamp = Math.floor(Date.now() / 1000);

// Presence On
presence.on("UpdateData", async () => {
  const buttons = await presence.getSetting("buttons"),
  time = await presence.getSetting("timestamps"),
    presenceData: PresenceData = {
      details: "Page not Supported", // If the page cannot be recognized
      largeImageKey: "logo",
    };

  if (document.location.href == "https://komiku.id/") {
    presenceData.details = "Viewing Homepage";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/baca-manga/")) {
    presenceData.details = "Viewing Manga List";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/baca-manhua/")) {
    presenceData.details = "Viewing Manhua List";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/baca-manhwa/")) {
    presenceData.details = "Viewing Manhwa List";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/daftar-komik/")) {
    presenceData.details = "Viewing Comic List";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.endsWith("/pustaka/")) {
    presenceData.details = "Viewing New Release";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/other/")) {
    if (document.location.pathname.startsWith("/other/hot/")) {
      presenceData.details = "Browsing Featured";
      presenceData.startTimestamp = browsingStamp
    } else if (document.location.pathname.endsWith("/rekomendasi/")) {
      presenceData.details = "Browsing Recommendation";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.endsWith("/berwarna/")) {
      presenceData.details = "Browsing Coloured Comic";
      presenceData.startTimestamp = browsingStamp;
    }
  } else if (document.location.pathname.startsWith("/bookmark/history.html")) {
    presenceData.details = "Viewing History";
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/manga/")) {
    const name = document.querySelector("header#Judul h1").textContent.replace(/\t|\n/g, "")
    const type = document.querySelector("section#Informasi b").textContent
    presenceData.details = "Viewing " + type;
    presenceData.state = name;
    presenceData.startTimestamp = browsingStamp;
    // View Manga Buttons
    if (buttons) {
      presenceData.buttons = [
        {
          label: "View " + type,
          url: document.location.href
        }
      ];
    }
  } else if (document.location.pathname.startsWith("/ch/")) {
    const title = document.querySelector("header#Judul h1").textContent.replace(/\t|\n/g, "").replace(/Chapter \d+/, "")
    const chapter = document.location.pathname.match(/chapter-\d+/)[0].replace("c", "C").replace("-", " ")
    presenceData.details = title;
    presenceData.state = chapter;
    presenceData.startTimestamp = browsingStamp;
    // View Manga & Chapter Buttons
    if (buttons) {
      presenceData.buttons = [
        {
          label: "View Manga",
          url: document.location.href.replace("ch", "manga").replace(/-chapter-\d+/, "").replace(/#\d+/, "")
        },
        {
          label: chapter,
          url: document.location.href.replace(/#\d+/, "")
        }
      ];
    }
  } else if (document.location.pathname.startsWith("/cari/")) {
    const search = document.querySelector("div.ntah h1").textContent.replace("Hasil Pencarian", "").replace(/\t|\n/g, "")
    const result = document.querySelectorAll("div.bge").length
    presenceData.details = "Searching" + search;
    presenceData.state = "Result: " + result;
    presenceData.startTimestamp = browsingStamp;
  } else if (document.location.pathname.startsWith("/genre/")) {
    const genre = document.querySelector("div.ntah h1").textContent.replace("Genre", "").replace(/\t|\n/g, "")
    presenceData.details = "Viewing Genre" + genre;
    presenceData.startTimestamp = browsingStamp
  }

  // Show Timestamps
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  presence.setActivity(presenceData);
});