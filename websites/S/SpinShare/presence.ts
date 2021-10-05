const presence = new Presence({
    clientId: "752151960743837817"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bigdefault"
  };

  if (document.location.hostname === "spinsha.re") {
    const { pathname } = document.location;
    switch (pathname) {
      case "/":
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Frontpage";
        break;
      case "/new":
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing New Charts";
        break;
      case "/hot":
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Hot Charts";
        break;
      case "/popular":
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Popular Charts";
        break;
      default:
        //Idle
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Idling";
        break;
    }
    if (pathname.startsWith("/song")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = document.querySelector(".song-title").innerHTML;
      presenceData.state = document.querySelector(".song-artist").innerHTML;
      if (document.querySelector(".player-active"))
        presenceData.smallImageKey = "play";
    } else if (pathname.startsWith("/user")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing User Profile:";
      presenceData.state = (<HTMLElement>(
        document.querySelector(".user-name")
      )).innerText;
    } else if (pathname.startsWith("/search")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Searching";
      presenceData.state = "🔍";
    } else if (pathname.startsWith("/report")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reporting Something...";
      presenceData.state = "🔨";
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
