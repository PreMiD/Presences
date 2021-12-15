const presence = new Presence({
    clientId: "908721185863397426"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1e3);

presence.on("UpdateData", () => {
  const { pathname, origin } = window.location,
    data: PresenceData = {
      startTimestamp: browsingTimestamp,
      largeImageKey: "logo"
    };
  if (document.querySelector(".navbar-form input") === document.activeElement) {
    data.details = "Searching:";
    data.state = (
      document.querySelector(".navbar-form input") as HTMLInputElement
    ).value;
    data.smallImageKey = "search";
  } else {
    if (pathname.includes("emperors-domination"))
      data.largeImageKey = "emperor";
    if (/^\/$/.test(pathname)) data.details = "Viewing Home Page";
    else if (/^\/novels\/?$/.test(pathname)) {
      // Counting comics
      const novels = document.querySelectorAll(".novel-item").length;
      data.details = "Viewing Novels List";
      data.state = `📋 ${novels.toString()} novels found`;
    } else if (/^\/novel\/[0-9a-z-]+\/?$/i.test(pathname)) {
      data.details = "Viewing Novel";
      data.state = document.querySelector(".novel-body h2").textContent;
      data.smallImageKey = "eye";
      data.buttons = [
        {
          label: "Visit Novel Page",
          url: origin + pathname
        }
      ];
    } else if (
      /^\/novel\/([^;]*)+\/+[a-zA-Z]+-chapter-[0-9]+\/?/i.test(pathname)
    ) {
      const novelLink = (
          document.querySelector(".caption a") as HTMLAnchorElement
        ).href,
        chapter = document.querySelector(
          "#chapter-outer .caption h4"
        ).textContent;

      let progress =
        (document.documentElement.scrollTop /
          (document.querySelector("#chapter-outer").scrollHeight -
            window.innerHeight)) *
        100;
      progress = Math.ceil(progress) > 100 ? 100 : Math.ceil(progress);

      data.details = document.querySelector(".caption a h4").textContent;
      data.state = `📖 ${chapter} 🔸 ${progress}%`;
      data.smallImageKey = "read";
      data.buttons = [
        {
          label: "Visit Novel Page",
          url: origin + novelLink
        },
        {
          label: "Visit Chapter",
          url: origin + pathname
        }
      ];
    } else {
      data.details = "Browsing Wuxiaworld";
      data.state = document.title;
    }
  }
  if (data.details) presence.setActivity(data);
});
