const presence = new Presence({
    clientId: "671199009674756146"
  }),
  strings = presence.getStrings({
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string => {
    const element = document.querySelector(query);
    if (element) {
      return element.textContent.replace(/^\s+|\s+$/g, "");
    } else return undefined;
  };

let oldUrl: string, elapsed: number;

function setObject(path: string) {
  switch (path) {
    case "/": {
      return {
        details: "Browsing"
      };
    }

    case "/about/": {
      return {
        details: "Viewing",
        state: "About"
      };
    }

    case "/faq/": {
      return {
        details: "Viewing",
        state: "Frequently Asked Questions"
      };
    }

    case "/terms/": {
      return {
        details: "Viewing",
        state: "Terms of Service"
      };
    }

    case "/tos/": {
      return {
        details: "Viewing",
        state: "Terms of Service"
      };
    }

    case "/privacy/": {
      return {
        details: "Viewing",
        state: "Privacy"
      };
    }

    case "/guidelines/": {
      return {
        details: "Viewing",
        state: "Guidelines"
      };
    }

    case "/contact/": {
      return {
        details: "Viewing",
        state: "Contact"
      };
    }
  }
}

presence.on("UpdateData", async () => {
  const host = location.host,
    path = location.pathname.replace(/\/?$/, "/"),
    detailsObj = setObject(path),
    data: PresenceData = {
      details: detailsObj.details,
      state: detailsObj.state,
      largeImageKey: "byte",
      smallImageKey: undefined,
      smallImageText: undefined,
      startTimestamp: undefined,
      endTimestamp: undefined
    };

  if (oldUrl !== path) {
    oldUrl = path;
    elapsed = Math.floor(Date.now() / 1000);
  }

  if (elapsed) {
    data.startTimestamp = elapsed;
  }

  if (host === "community.byte.co") {
    data.details = "Browsing Community";
    data.largeImageKey = "bytecom";

    if (
      path.match("/categories/") ||
      path.match("/latest/") ||
      path.match("/top/") ||
      path.match("/unread/")
    )
      data.state = getElement(".active");

    if (path.match("/new/")) {
      data.state = "Newest";
    }

    if (path.match("/badges/")) {
      data.details = "Viewing Badges";
      data.state = getElement(".show-badge-details .badge-link");
    }

    if (path.match("/tags/")) {
      data.state = "Tags";
    }

    if (path.match("/tag/")) {
      data.details = "Viewing Tag";
      data.state = getElement(".discourse-tag");
    }

    if (path.match("/cakeday/")) {
      data.details = "Viewing Cakedays";
      data.state = `${getElement(".nav-pills .active")} (${getElement(
        ".anniversaries .nav-pills .active"
      )})`;
    }

    if (path.match("/c/")) {
      data.details = "Viewing Category";
      data.state = getElement(".selected-name .category-name");

      const tag = getElement(".active");
      if (tag) {
        data.details += `'s ${tag}`;
      }
    }

    if (path.match("/t/")) {
      data.details = "Viewing Thread";
      data.state = getElement(".fancy-title");
    }

    if (path.match("/u/")) {
      data.details = "Viewing Users";

      if (document.querySelector(".details")) {
        data.details = "Viewing User";
        data.state = `${getElement(".username")} (${getElement(".full-name")})`;

        const tag = getElement(".active");
        if (tag) {
          data.details += `'s ${tag}`;
        }
      }
    }

    if (path.match("/g/")) {
      data.details = "Viewing Group";
      data.state = `${getElement(".group-info-name")} (${getElement(
        ".group-info-full-name"
      )})`;

      const tag = getElement(".active");
      if (tag) {
        data.details += `'s ${tag}`;
      }
    }

    if (path.match("/search/")) {
      data.details = "Searching";
      data.smallImageKey = "search";
      data.smallImageText = (await strings).search;

      const search = document.querySelector("input");

      data.state = search.value !== "" ? search.value : undefined;
    }
  }

  if (host === "help.byte.co") {
    data.details = "Browsing Help";
    data.largeImageKey = "bytehelp";

    if (path.match("/sections/")) {
      data.details = "Viewing Section";
      data.state = getElement("h1");
    }

    if (path.match("/articles/")) {
      data.details = "Viewing Article";
      data.state = getElement(".article-title");
    }

    if (path.match("/requests/new/")) {
      data.details = "Creating";
      data.state = "New Request";
    }
  }

  if (data.details !== undefined) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }

    presence.setActivity(data);
  } else {
    presence.setTrayTitle();
    presence.setActivity();
  }
});
