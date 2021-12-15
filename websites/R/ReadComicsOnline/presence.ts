const presence = new Presence({
    clientId: "868465354014359672"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  setCookie = (name: string, value: string, days: number) => {
    let expires: string;
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    } else expires = "";

    document.cookie = `${name}=${value}${expires}; path=/`;
  },
  getCookie = (name: string) => {
    const nameEQ = `${name}=`,
      ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);

      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "rco_logo",
      startTimestamp: browsingStamp
    },
    { pathname } = location,
    input = document.querySelector<HTMLInputElement>("input#keyword"),
    buttons: boolean = await presence.getSetting("buttons"),
    cookies: boolean = await presence.getSetting("cookies");

  if (cookies && input && input.value)
    setCookie("PMD_searchQuery", input.value, 1);

  switch (pathname) {
    case "/":
      presenceData.details = "Looking for something to read";
      break;
    case "/ComicList":
      presenceData.details = "Browsing Comic List";
      presenceData.state = "Sorted By Alphabet";
      break;
    case "/ComicList/MostPopular":
      presenceData.details = "Browsing Comic List";
      presenceData.state = "Sorted By Popularity";
      break;
    case "/ComicList/LatestUpdate":
      presenceData.details = "Browsing Comic List";
      presenceData.state = "Sorted By Latest Update";
      break;
    case "/Profile":
      presenceData.details = "Changing Profile Settings";
      break;
    case "/BookmarkList":
      presenceData.details = "Viewing Bookmarks";
      break;
    case "/Message/ReportError":
      presenceData.details = "Reporting Error";
      break;
    case "/Search/Comic": {
      if (cookies) {
        const searchQuery = getCookie("PMD_searchQuery");
        presenceData.details = `Searching for ${searchQuery}`;
      } else presenceData.details = "Searching";
      break;
    }
    case "/AdvanceSearch": {
      const comicName =
          document.querySelector<HTMLInputElement>("input#comicName"),
        include =
          document.querySelectorAll<HTMLAnchorElement>("label > a.include"),
        exclude =
          document.querySelectorAll<HTMLAnchorElement>("label > a.exclude"),
        status = document.querySelector<HTMLSelectElement>("select#status");

      presenceData.details = "Advanced Search";

      if (cookies) {
        if (comicName && comicName.value) {
          setCookie(
            "PMD_searchQuery",
            `Looking for title: ${comicName.value}`,
            1
          );
        } else if (include.length > 0) {
          const searchQuery = `Searching for Genre: ${include[0].innerText} ${
            include.length > 1 ? `and ${include.length - 1} more` : ""
          }`;
          setCookie("PMD_searchQuery", searchQuery, 1);
        } else if (exclude.length > 0) {
          const searchQuery = `Searching for all Genres except: ${
            exclude[0].innerText
          } ${exclude.length > 1 ? `and ${exclude.length - 1} more` : ""}`;
          setCookie("PMD_searchQuery", searchQuery, 1);
        } else if (status) {
          setCookie(
            "PMD_searchQuery",
            `Looking for: ${status.selectedOptions[0].innerText} comics`,
            1
          );
        } else {
          [presenceData.details, presenceData.state] =
            getCookie("PMD_searchQuery").split(":");
        }
      }
      break;
    }
    default:
      if (pathname.startsWith("/Genre")) {
        const barTitle = document.querySelector<HTMLDivElement>(".barTitle");
        if (barTitle)
          presenceData.details = `Looking for ${barTitle.innerText}`;
        if (pathname.includes("MostPopular"))
          presenceData.state = "Sorted By Popularity";
        else if (pathname.includes("LatestUpdate"))
          presenceData.state = "Sorted By Latest Update";
        else presenceData.state = "Sorted by Alphabet";
      } else if (pathname.startsWith("/Comic")) {
        const reading = !!document.querySelector("div#divImage");
        if (reading) {
          const title =
              document.querySelector<HTMLAnchorElement>("#navsubbar > p > a"),
            episode =
              document.querySelector<HTMLSelectElement>(
                "select#selectEpisode"
              ) ||
              document.querySelector<HTMLSelectElement>("select.selectEpisode"),
            page =
              document.querySelector<HTMLSelectElement>("select#selectPage");
          if (title) {
            presenceData.details = title.innerText.substring(
              6,
              title.innerText.indexOf("information")
            );
            presenceData.smallImageKey = "reading";
            if (episode)
              presenceData.state = episode.selectedOptions[0].innerText.trim();
            if (page)
              presenceData.state += `, Page: ${page.selectedOptions[0].innerText.trim()}`;
            if (buttons) {
              presenceData.buttons = [
                {
                  label: "Read Comic",
                  url: location.href
                },
                {
                  label: "Check Description",
                  url: title.href
                }
              ];
            }
          }
        } else {
          const title = document.querySelector<HTMLAnchorElement>("a.bigChar");
          if (title) presenceData.details = title.innerText;
          presenceData.state = "Looking for issue to read";
          if (buttons) {
            presenceData.buttons = [
              {
                label: "Check Description",
                url: location.href
              }
            ];
          }
        }
      } else if (pathname.startsWith("/Special"))
        presenceData.details = document.title;
      else {
        const barTitle = document.querySelector<HTMLDivElement>(".barTitle");
        if (barTitle) presenceData.details = barTitle.innerText;
      }
      break;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
