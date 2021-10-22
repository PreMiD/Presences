const presence = new Presence({
  clientId: "900717839713959967"
}),
  elapsed = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
  const { pathname, origin } = window.location,
    data: PresenceData = {
      startTimestamp: elapsed,
      largeImageKey: "logo"
    };

  let state, details, smallImageKey, buttons: [ButtonData, ButtonData?];
  if (document.querySelector(".search-main-menu").classList.contains("active")) {
    details = "Searching:";
    state = (document.querySelector(".manga-search-field") as HTMLInputElement).value;
    smallImageKey = "search";
  } else {

    if (/^\/$/.test(pathname)) details = "Viewing Home Page";
    else if (/^\/home1\/?$/.test(pathname)) {
      // Counting comics
      let comics = document.querySelectorAll(".page-listing-item .row .col-4").length;
      details = "Viewing Comic List";
      state = "📋 " + comics.toString() + " comics found";
    }
    else if (/^\/all-series\/novels+\/?$/.test(pathname)) {
      // Counting novels
      let comics = document.querySelectorAll(".page-listing-item .row .col-6").length;
      details = "Viewing Novel List";
      state = "📋 " + comics.toString() + " novels found";
    }
    else if (/^\/all-series\/comics\/manhwas\/?$/.test(pathname)) {
      // Counting manhwa
      let comics = document.querySelectorAll(".page-listing-item .row .col-6").length;
      details = "Viewing Manhwa List";
      state = "📋 " + comics.toString() + " manhwa found";
    }
    else if (/^\/all-series\/comics\/manhuas\/?$/.test(pathname)) {
      // Counting manhua
      let comics = document.querySelectorAll(".page-listing-item .row .col-4").length;
      details = "Viewing Manhua List";
      state = "📋 " + comics.toString() + " manhua found";
    }
    else if (/^\/series\/[0-9a-z-]+\/?$/i.test(pathname)) {
      details = "Viewing Comic";
      state = document.querySelector(".post-title h1").textContent;
      smallImageKey = "view";
      const viewComicButton: ButtonData = {
        label: "Visit Comic Page",
        url: origin + pathname
      };
      buttons = [viewComicButton];
    } else if (/^\/series\/[0-9a-z-]+\/+(chapter|ch)-[0-9]+\/?$/i.test(pathname)) {
      const comicLink = (document.querySelector("ol.breadcrumb li:nth-child(3) a") as HTMLAnchorElement).href,
      chapter = document.querySelector("ol.breadcrumb li:nth-child(4)").textContent;

      let progress =
        (document.documentElement.scrollTop /
          (document.querySelector(".read-container").scrollHeight -
            window.innerHeight)) *
        100;
      progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);


      details = document.querySelector("ol.breadcrumb li:nth-child(3)").textContent;
      state = `📖 ${chapter} 🔸 ${progress}%`;
      smallImageKey = "read";
      const viewComicButton: ButtonData = {
        label: "Visit Comic Page",
        url: origin + comicLink
      },
        visitChapterButton: ButtonData = {
          label: "Visit Chapter",
          url: origin + pathname
        };
      buttons = [viewComicButton, visitChapterButton];
    } else {
      details = "Browsing Reaper Scans";
      state = document.title;

    }
  }

  data.details = details;
  data.state = state;
  data.buttons = buttons;
  data.smallImageKey = smallImageKey;

  if (data.details) presence.setActivity(data);
});
