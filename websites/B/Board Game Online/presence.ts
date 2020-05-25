var presence = new Presence({
  clientId: "684570342085099546"
});
var strings = presence.getStrings({
  browse: "presence.activity.browsing"
});

const getElement = (query: string): string => {
  const element = document.querySelector(query);
  if (element) {
    return element.textContent.replace(/^\s+|\s+$/g, "");
  } else return undefined;
};

const paths = {
  "/": {
    details: "Browsing"
  },
  "/forum": {
    details: "Viewing Page",
    state: "Forums"
  }
};

const queries = {
  forgot_login: {
    details: "Forgot Login"
  },
  register: {
    details: "Registering..."
  },
  newgame: {
    details: "Creating",
    state: "New Game"
  },
  joingame: {
    details: "Joining",
    state: "New Game"
  },
  shop: {
    details: "Viewing",
    state: "Shop"
  },
  donations: {
    details: "Viewing",
    state: "Donations"
  },
  info: {
    details: "Viewing",
    state: "Game Info"
  },
  recruit: {
    details: "Viewing",
    state: "Recruit a Friend"
  },
  terms: {
    details: "Viewing",
    state: "Terms of Service"
  },
  privacy: {
    details: "Viewing",
    state: "Privacy Policy"
  },
  contact: {
    details: "Viewing",
    state: "Contact"
  }
};

presence.on("UpdateData", async () => {
  let data: PresenceData = {
    largeImageKey: "boardgameonline"
  };

  const host = location.host;
  const path = location.pathname;
  const query = location.search;
  const queryString = query && query.split("page=")[1].split("&")[0];

  if (host === "www.boardgame-online.com") {
    if (path in paths) data = { ...data, ...paths[path] };
    if (queryString && queryString in queries)
      data = { ...data, ...queries[queryString] };

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
