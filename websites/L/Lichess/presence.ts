const presence = new Presence({
    clientId: "632924426131996702"
  }),
  pages: {
    [name: string]: string;
  } = {
    "/": "Home",
    "/learn": "Learn to Play Chess",
    "/practice": "Practice",
    "/training/coordinate": "Coordinate",
    "/study": "Study",
    "/coach": "Coaches",
    "/tv": "Lichess TV",
    "/games": "Current Games",
    "/streamer": "Streamers",
    "/broadcast": "Broadcasts",
    "/video": "Video Library",
    "/player": "Players",
    "/team/all": "Teams",
    "/forum": "Forums",
    "/analysis": "Analysis Board",
    "/editor": "Board Editor",
    "/paste": "Import Game",
    "/games/search": "Advanced Search"
  };

presence.on("UpdateData", async () => {
  const page = document.location.pathname,
    game = document.querySelector(
      "#main-wrap > main > aside > div > section > div.game__meta__infos > div > div > div"
    ) as HTMLElement,
    status = document.querySelector(
      "#main-wrap > main > aside > div > section.status"
    ) as HTMLElement,
    data: PresenceData = {
      largeImageKey: "lc-logo",
      startTimestamp: Math.floor(Date.now() / 1000)
    };

  if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
    data.details = "Viewing a page:";
    data.state = pages[page] || pages[page.slice(0, -1)];
  } else if (page.includes("/training/")) {
    data.details = "Viewing a page:";
    data.state = "Training";
  } else if (page.includes("/@/")) {
    data.details = "Searching for:";
    data.state = document.title.replace(" • lichess.org", "");
    data.smallImageKey = "search";
  } else if (
    status &&
    status.textContent !== "" &&
    game &&
    game.textContent !== ""
  ) {
    data.details = game.textContent.trim();
    data.state = status.textContent.trim();
  } else if (!status && game && game.textContent !== "") {
    data.details = "Playing a game:";
    data.state = game.textContent.trim();
  }

  if (data.details && data.state) presence.setActivity(data);
});
