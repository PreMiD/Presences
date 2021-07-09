const presence = new Presence({
    clientId: "813518808634621952"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let details: string,
  state: string,
  smallImageKey: string,
  activityName: HTMLDivElement,
  userCount: number;

const noGames: string[] = [
  "Video Chat",
  "Web view",
  "Paint",
  "Table",
  "Virtual room",
  "Watch Party"
];

presence.on("UpdateData", async () => {
  if (location.pathname === "/") {
    details = "Viewing the Home Page...";
    location.hash === "#contactScreen"
      ? (state = "Viewing Contact Information")
      : (state = null);
    smallImageKey = "reading";
  } else if (location.pathname === "/lobby") {
    details = "Browsing public rooms...";
    state = null;
    smallImageKey = "search";
  } else if (location.pathname.includes("room")) {
    /*Try to get Metadata: Viewers, Game Name, if the elements don't exist, assume the user is on the indexpage */
    try {
      activityName = document.querySelector(
        `div[class="appTitle-WJ3"]`
      ) as HTMLDivElement;
      userCount =
        parseInt(
          (
            document.querySelectorAll(
              `div[class="ui tabular swipableMenu-xjk menu"] > a`
            )[1] as HTMLDivElement
          ).textContent.trim(),
          10
        ) - 1;
    } catch {
      return "element does not exist";
    }
    /* Re-set the index status, as user is likely on the index page again and the Metadata objects exist now */
    details = "Choosing an activity";
    smallImageKey = "reading";
    /* Show the usercount in the lower text */
    state = userCount === 0 ? "Alone" : `With ${userCount} others`;

    /* This is executed if the user plays a game that is not in the "Special Activities" Array */
    if (activityName !== null && !noGames.includes(activityName.textContent)) {
      details = "Playing " + activityName.textContent;
      smallImageKey = "gamepad";
    } else if (
      activityName !== null &&
      noGames.includes(activityName.textContent)
    ) {
      switch (
        activityName.textContent /* Proper Grammar for the Activities */
      ) {
        case "Watch Party":
          details = "In a " + activityName.textContent;
          smallImageKey = "live";
          break;
        case "Paint":
          details = "Painting";
          smallImageKey = "paintbrush";
          break;
        case "Table":
          details = "At the Table";
          break;
        default:
          details = "In a " + activityName.textContent;
          smallImageKey = "vcam";
          break;
      }
    }
  }

  const presenceData: PresenceData = {
    largeImageKey: "kosmimain",
    smallImageKey,
    details,
    state,
    startTimestamp: browsingStamp
  };

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
