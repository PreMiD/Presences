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
  let comics: number;

  if (
    document.querySelector(".search-main-menu").classList.contains("active")
  ) {
    data.details = "Searching:";
    data.state = (
      document.querySelector(".manga-search-field") as HTMLInputElement
    ).value;
    data.smallImageKey = "search";
  } else {
    if (/^\/$/.test(pathname)) data.details = "Viewing Home Page";
    else if (/^\/home1\/?$/.test(pathname)) {
      // Counting comics
      comics = document.querySelectorAll(
        ".page-listing-item .row .col-4"
      ).length;
      data.details = "Viewing Comic List";
      data.state = `📋 ${comics.toString()} comics found`;
    } else if (/^\/all-series\/novels+\/?$/.test(pathname)) {
      // Counting novels
      comics = document.querySelectorAll(
        ".page-listing-item .row .col-6"
      ).length;
      data.details = "Viewing Novel List";
      data.state = `📋 ${comics.toString()} novels found`;
    } else if (/^\/all-series\/comics\/manhwas\/?$/.test(pathname)) {
      // Counting manhwa
      comics = document.querySelectorAll(
        ".page-listing-item .row .col-6"
      ).length;
      data.details = "Viewing Manhwa List";
      data.state = `📋 ${comics.toString()} manhwa found`;
    } else if (/^\/all-series\/comics\/manhuas\/?$/.test(pathname)) {
      // Counting manhua
      comics = document.querySelectorAll(
        ".page-listing-item .row .col-4"
      ).length;
      data.details = "Viewing Manhua List";
      data.state = `📋 ${comics.toString()} manhua found`;
    } else if (/^\/series\/[0-9a-z-]+\/?$/i.test(pathname)) {
      data.details = "Viewing Comic";
      data.state = document.querySelector(".post-title h1").textContent;
      data.smallImageKey = "view";
      data.buttons = [
        {
          label: "Visit Comic Page",
          url: origin + pathname
        }
      ];
    } else if (
      /^\/series\/[0-9a-z-]+\/+(chapter|ch)-[0-9]+\/?$/i.test(pathname)
    ) {
      const comicLink = (
          document.querySelector(
            "ol.breadcrumb li:nth-child(3) a"
          ) as HTMLAnchorElement
        ).href,
        chapter = document.querySelector(
          "ol.breadcrumb li:nth-child(4)"
        ).textContent;

      let progress =
        (document.documentElement.scrollTop /
          (document.querySelector(".read-container").scrollHeight -
            window.innerHeight)) *
        100;
      progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);

      data.details = document.querySelector(
        "ol.breadcrumb li:nth-child(3)"
      ).textContent;
      data.state = `📖 ${chapter} 🔸 ${progress}%`;
      data.smallImageKey = "read";
      data.buttons = [
        {
          label: "Visit Comic Page",
          url: origin + comicLink
        },
        {
          label: "Visit Chapter",
          url: origin + pathname
        }
      ];
    } else {
      data.details = "Browsing Reaper Scans";
      data.state = document.title;
    }
  }
  if (data.details) presence.setActivity(data);
});
