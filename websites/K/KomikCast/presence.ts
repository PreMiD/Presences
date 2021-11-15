const presence = new Presence({
    clientId: "909694033251688449"
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

  if (document.location.href === "https://komikcast.com/")
    presenceData.details = "Viewing Homepage";
  else if (document.location.pathname.endsWith("/daftar-komik/"))
    presenceData.details = "Viewing Komikcast Manga List";
  else if (document.location.pathname.endsWith("/pasang-iklan/"))
    presenceData.details = "Contact Komikcast";
  else if (document.location.pathname.endsWith("/project-list/"))
    presenceData.details = "Viewing Komikcast Project List";
  else if (document.location.pathname.endsWith("/bookmark/"))
    presenceData.details = "Viewing Bookmark";
  else if (document.location.pathname.endsWith("/download-aplikasi-komikcast/"))
    presenceData.details = "Download APK Komikcast";
  else if (document.location.pathname.startsWith("/komik/")) {
    const name = document
        .querySelector(".komik_info-content-body-title")
        .textContent.replace(/\t|\n/g, ""), type = document.querySelector(".komik_info-content-info-type b").textContent.replace("Type:", "Comics");
    presenceData.details = `Viewing ${type}`;
    presenceData.state = name;
    if (buttons) {
        presenceData.buttons = [
              {
                label: `View ${type}`,
                url: document.location.href
              }
          ];
      }
  }
  else if (document.location.pathname.startsWith("/chapter/")) {
    const title = document
        .querySelector("div.chapter_headpost h1")
        .textContent.replace(/\t|\n/g, "")
        .replace(/Chapter \d+/, ""), chapter = document.location.pathname
        .match(/chapter-\d+/)[0]
        .replace("c", "C")
        .replace("-", " ");
    presenceData.details = title;
    presenceData.state = chapter;
    if (buttons) {
        presenceData.buttons = [
            {
                label: "View Comic",
                url: document.location.href
                    .replace("chapter", "komik")
                    .replace(/-chapter-\d+/, "")
                    .replace(/#\d+/, "")
            },
            {
                label: chapter,
                url: document.location.href.replace(/#\d+/, "")
              }
          ];
      }
  }
  else if (document.location.href.includes("?s=")) {
    const search = document
        .querySelector("div.list-update-search-header h1")
        .textContent.replace("SEARCH", "")
        .replace(/\t|\n/g, "");
    presenceData.smallImageKey = "search";
    presenceData.details = "Doing:";
    presenceData.state = search;
  }
  if (!time) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }
  presence.setActivity(presenceData);
  });
