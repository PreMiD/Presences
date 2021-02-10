const presence = new Presence({
    clientId: "735229766701154357"
  }),
  strings = presence.getStrings({
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
  }),
  getElement = (query: string): string | undefined => {
    return document.querySelector(query)?.textContent;
  };

let elapsed = Math.floor(Date.now() / 1000),
  prevUrl = document.location.href;

const statics = {
  "/pages/global/pagegone.jsf/": {
    details: "404",
    state: "Not Found"
  },
  "/page/login/": {
    details: "Logging In..."
  },
  "/page/register/": {
    details: "Registering..."
  },
  "/page/about/": {
    details: "Viewing Page...",
    state: "About"
  },
  "/page/guide/": {
    details: "Viewing Page...",
    state: "User Guide"
  },
  "/page/privacy/": {
    details: "Viewing Page...",
    state: "Privacy Policy"
  },
  "/page/developer/": {
    details: "Viewing Page...",
    state: "Developer Resources"
  },
  "/Top/": {
    details: "Viewing Page...",
    state: "Top Hardware"
  },
  "/Software/": {
    details: "Viewing Page...",
    state: "PC Software"
  }
};

presence.on("UpdateData", async () => {
  const host = location.host,
    path = location.pathname.replace(/\/?$/, "/"),
    showSearch = await presence.getSetting("search"),
    showTimestamps = await presence.getSetting("timestamp");

  let data: PresenceData = {
    details: undefined,
    state: undefined,
    largeImageKey: "userbenchmark",
    smallImageKey: undefined,
    smallImageText: undefined,
    startTimestamp: elapsed,
    endTimestamp: undefined
  };

  if (document.location.href !== prevUrl) {
    prevUrl = document.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  for (const [k, v] of Object.entries(statics)) {
    if (path.match(k)) {
      data = { ...data, ...v };
    }
  }

  if (path === "/") {
    data.details = "Browsing...";
    data.state = "Home";
  }

  if (path.includes("/Compare/")) {
    data.details = `Comparing ${getElement(".fastinslowout.active")}s...`;

    const parseComparison = (text: string, date: string): string => {
        return date ? text : "Unspecified";
      },
      comp1 = getElement("#select2-chosen-1"),
      comp2 = getElement("#select2-chosen-2"),
      compDate1 = getElement(".cmp-cpt-l"),
      compDate2 = getElement(".cmp-cpt-r");

    data.state = `${parseComparison(comp1, compDate1)} vs ${parseComparison(
      comp2,
      compDate2
    )}`;
  }

  if (path.includes("/EFps/")) {
    data.details = "Comparing PC with EFps...";

    const games = [
        "Counter Strike: Global Offensive",
        "Grand Theft Auto 5",
        "Overwatch",
        "PlayerUnknown's Battlegrounds",
        "Fortnite"
      ],
      activeBtn = document.querySelector(
        ".btn-group-justified > .btn.btn-default.active"
      ),
      btnId = Array.from(activeBtn.parentNode.children).indexOf(activeBtn);

    data.state = games[btnId];
  }

  if (path.includes("/User/")) {
    data.details = "Viewing Profile...";
    data.state = `${getElement(".lightblacktext > span")} (${getElement(
      "li.active > a"
    )
      .split(" ")
      .shift()})`;
  }

  if (path.includes("/UserRun/")) {
    data.details = "Viewing Performance Report...";

    const id = path.split("/").slice(-2)[0];
    data.state = `${id} - ${getElement(".pg-head-toption-post")}`;
  }

  if (path.includes("/PCGame/")) {
    data.details = "Viewing PC Game...";
    data.state = getElement(".stealthlink");
  }

  if (showSearch && path.includes("/Search/")) {
    data.details = "Searching...";

    const searchBox: HTMLInputElement = document.querySelector(
      ".top-menu-search-input"
    );
    data.state = searchBox.value;
  }

  if (path.includes("/Faq/")) {
    data.details = "Viewing FAQ...";
    data.state = getElement(".stealthlink");
  }

  if (host === "www.userbenchmark.com") {
    if (path.includes("/PCBuilder/")) {
      data.details = "Building PC...";

      const compCount = document.querySelector(
        ".container-fluid table > tbody:nth-child(2)"
      )?.childElementCount;
      data.state = `${compCount} Components`;
    }

    if (path.includes("/System/")) {
      data.details = "Viewing Motherboard...";
      data.state = `${getElement(".pg-head-toption > a")} ${getElement(
        ".stealthlink"
      )}`;
    }
  } else {
    const product = getElement(".pg-head-title .stealthlink");
    if (product) {
      data.details = `Viewing ${getElement(".fastinslowout.active")}...`;
      data.state = `${getElement(".pg-head-toption > a")} ${product}`;
    }
  }

  if (data.details) {
    if (data.details.match("(Browsing|Viewing)")) {
      data.smallImageKey = "reading";
      data.smallImageText = (await strings).browse;
    }
    if (data.details.match("(Searching)")) {
      data.smallImageKey = "search";
      data.smallImageText = (await strings).search;
    }
    if (!showTimestamps) {
      delete data.startTimestamp;
      delete data.endTimestamp;
    }

    if (path === "/" && !host.startsWith("www")) {
      const hardware = host.split(".").shift();
      data.smallImageKey = hardware;
      data.smallImageText = hardware.toUpperCase();
    }

    presence.setActivity(data);
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
