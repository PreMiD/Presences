const presence = new Presence({
  clientId: "746268475718238328"
});

let elapsed: number, oldUrl: string;

// main loop
presence.on("UpdateData", () => {
  const Location: string = window.location.href,
    Path: string = window.location.pathname;
  let details: string, state: string, smallImageKey: string;

  // detect url changes
  if (Location !== oldUrl) {
    oldUrl = window.location.href;
    elapsed = Math.floor(Date.now() / 1000);
  }

  // Searching for URL / Domain
  if (
    (document.querySelector("#search_query") &&
      Array.from(document.querySelectorAll("#search_query")).some(
        (elem: HTMLInputElement) => elem.value.length > 0
      )) ||
    (["input", "textarea"].indexOf(
      document.activeElement.tagName.toLowerCase()
    ) !== -1 &&
      (document.activeElement as HTMLInputElement).value.length > 0)
  ) {
    details = "Searching for accounts";
    state = `at ${(document.activeElement as HTMLInputElement).value}`;
    smallImageKey = "search";
  }
  if (Path.startsWith("/view/")) {
    details = "Viewing login details";
    state = `for ${Path.split("/").pop()}`;
    smallImageKey = "eye";
  }
  if (Path.startsWith("/submit.php")) {
    details = "Adding login details";
    state = `for ${location.search.split("seed=").pop()}`;
    smallImageKey = "pencil";
  }
  if (!details) {
    switch (Path) {
      case "/":
        details = "On the main page";
        smallImageKey = "home";
        break;
      case "/terms.php":
        details = "Reading TOS";
        smallImageKey = "tos";
        break;
      case "/removal.php":
        details = "Requesting a removal";
        smallImageKey = "remove";
        break;
      default:
        details = "Surfing on BugMeNot";
        smallImageKey = "surface";
        break;
    }
  }

  const data: PresenceData = {
    details,
    state,
    largeImageKey: "bugmenot",
    smallImageKey,
    startTimestamp: elapsed,
    smallImageText: location.host + location.pathname
  };

  presence.setActivity(data);
});
