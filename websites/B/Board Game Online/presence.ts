const presence = new Presence({
    clientId: "684570342085099546"
  }),
  strings = presence.getStrings({
    browse: "presence.activity.browsing"
  }),
  getElement = (query: string): string => {
    const element = document.querySelector(query);
    if (element) {
      return element.textContent.replace(/^\s+|\s+$/g, "");
    } else return undefined;
  };

function setObject(path: string) {
  switch (path) {
    case "/": {
      return {
        details: "Browsing"
      };
    }

    case "forgot_login": {
      return {
        details: "Forgot Login"
      };
    }

    case "register": {
      return {
        details: "Registering..."
      };
    }

    case "newgame": {
      return {
        details: "Creating",
        state: "New Game"
      };
    }

    case "joingame": {
      return {
        details: "Joining",
        state: "New Game"
      };
    }

    case "shop": {
      return {
        details: "Viewing",
        state: "Shop"
      };
    }

    case "donations": {
      return {
        details: "Viewing",
        state: "Donations"
      };
    }

    case "info": {
      return {
        details: "Viewing",
        state: "Game Info"
      };
    }

    case "recruit": {
      return {
        details: "Viewing",
        state: "Recruit a Friend"
      };
    }

    case "terms": {
      return {
        details: "Viewing",
        state: "Terms of Service"
      };
    }

    case "privacy": {
      return {
        details: "Viewing",
        state: "Privacy Policy"
      };
    }

    case "contact": {
      return {
        details: "Viewing",
        state: "Contact"
      };
    }

    case "/forum": {
      return {
        details: "Viewing Page",
        state: "Forums"
      };
    }
  }
}

presence.on("UpdateData", async () => {
  const data: PresenceData = {
      largeImageKey: "boardgameonline"
    },
    host = location.host,
    path = location.pathname,
    query = location.search,
    queryString = query && query.split("page=")[1].split("&")[0],
    detailsObj = setObject(path);

  if (host === "www.boardgame-online.com") {
    if (path || queryString)
      (data.details = detailsObj.details), (data.state = detailsObj.state);

    const header = getElement(".page_wrapper.show > .page_content > h2");
    if (header !== undefined) {
      data.details = "Viewing";
      data.state = header;
    }

    const profile = getElement(
      ".page_wrapper.show > .page_content > #profile_name_title > .userName"
    );
    if (profile !== undefined) {
      data.details = "Viewing Profile";
      data.state = profile;
    }
  } else {
    const playerCount = document.querySelector(".rankingTable")
      .childElementCount;

    data.details = "Playing Game";
    data.state = document.title;

    if (playerCount) {
      data.state = document.title + ` (${playerCount - 1} Players)`;
    }
  }

  if (data.details !== undefined) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
