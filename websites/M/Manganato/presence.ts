const presence = new Presence({
    clientId: "901078409101340702"
  }),
  elapsed = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
  const { pathname, origin } = window.location,
    data: PresenceData = {
      startTimestamp: elapsed,
      largeImageKey: "logo"
    };

  if (
    document.querySelector("#search-story") &&
    (document.querySelector("#search-story") as HTMLInputElement).value !== ""
  ) {
    data.details = "Searching:";
    data.state = (
      document.querySelector("#search-story") as HTMLInputElement
    ).value;
    data.smallImageKey = "search";
  } else {
    if (/^\/$/.test(pathname)) data.details = "Viewing Home Page";
    else if (/^\/genre-all\/?$/.test(pathname)) {
      // Counting manga
      const manga = document.querySelector(".group-qty a").textContent;
      data.details = "Viewing Manga List";
      data.state = `📋 ${manga.charAt(0).toUpperCase()}${manga
        .slice(1)
        .toLowerCase()} manga`;
    } else if (/^\/(manga+)-[a-z0-9]+\/?$/i.test(pathname)) {
      data.details = "Viewing Manga";
      data.state = document.querySelector(".story-info-right h1").textContent;
      data.smallImageKey = "view";
      data.buttons = [
        {
          label: "Visit Comic Page",
          url: document.location.href
        }
      ];
    } else if (
      /^\/(manga+)-[a-z0-9]+\/(chapter+)-[a-z0-9]+?$/i.test(pathname)
    ) {
      const comicLink = (
          document.querySelector(
            ".panel-breadcrumb a:nth-child(3)"
          ) as HTMLAnchorElement
        ).href,
        chapter = document.querySelector(
          ".panel-breadcrumb a:nth-child(5)"
        ).textContent;

      let progress =
        (document.documentElement.scrollTop /
          (document.querySelector(".container-chapter-reader").scrollHeight -
            window.innerHeight)) *
        100;
      progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);

      data.details = document.querySelector(
        ".panel-breadcrumb a:nth-child(3)"
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
      data.details = "Browsing Manganato";
      data.state = document.title;
    }
  }

  if (data.details) presence.setActivity(data);
});
