const presence = new Presence({
  clientId: "630561466872889344"
});

enum PageType {
  Game = 0,
  Category = 1
}

const capitalize = (text: Array<string>): string => {
    return text
      .map((str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      })
      .join(" ");
  },
  parse = (path: string): Array<string> => {
    path = path.replace("/", "");
    const split: Array<string> = path.split("-");

    return [split[0], capitalize(split.slice(1))];
  };

let elapsed: number, oldUrl: string;

presence.on("UpdateData", async () => {
  if (window.location.href !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  let details = undefined,
    state = undefined;

  const startTimestamp = elapsed,
    path = window.location.pathname;

  if (path === "/") {
    details = "Browsing...";
  } else if (path.match("/user") || path.match("/signup")) {
    if (path.match("signup")) {
      details = "Signing up...";
    } else {
      details = "Logging in...";
    }
  } else if (path.match("/terms-use")) {
    details = "Viewing Terms of Use";
  } else if (path.match("/trivia")) {
    details = "Viewing Trivia";

    const title = document.querySelector("#start-the-quiz-title");
    if (title) {
      state = title.textContent;
    }
  } else {
    const playlists = document.querySelector(".playlists-queue-wrapper"),
      breadcrumb = document.querySelector(".pane-content > .breadcrumb > ol"),
      breadcrumb_last = document.querySelector(
        ".pane-content > .breadcrumb > ol > li:last-child > span"
      ),
      difficulty = document.querySelector("a.active");
    if (breadcrumb && breadcrumb_last && difficulty) {
      details = "Viewing Jigsaw Puzzle";
      state = `${breadcrumb_last.textContent} (${difficulty.textContent})`;
    } else if (breadcrumb && breadcrumb_last) {
      details = "Viewing Jigsaw Puzzles";
      state = breadcrumb_last.textContent;
    } else if (playlists) {
      details = "Viewing Category";
      state = "Jigsaw Puzzles";
    } else {
      const parsedData = parse(path),
        type = parseInt(parsedData[0]),
        name = parsedData[1];

      switch (type) {
        case PageType.Category:
          details = "Viewing Category";
          break;

        case PageType.Game:
          details = "Viewing Game";
          break;

        default:
          break;
      }
      state = name;
    }
  }

  const data: PresenceData = {
    details: details,
    state: state,
    largeImageKey: "coolmathgames",
    startTimestamp: startTimestamp
  };

  presence.setActivity(data);
});
