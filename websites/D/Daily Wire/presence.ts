const presence = new Presence({
    clientId: "843781235494486046"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async function () {
  const setting = {
      timeElapsed: await presence.getSetting("timeElapsed"),
      showButtons: await presence.getSetting("showButtons")
    },
    urlpath = window.location.pathname.split("/"),
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  if (setting.timeElapsed) presenceData.startTimestamp = browsingStamp;

  if (!urlpath[1]) presenceData.details = "Home";
  else if (urlpath[1] === "news" && urlpath[2]) {
    presenceData.details = "Viewing Article";
    presenceData.state =
      document.querySelector("h1.css-cmdiie.e172hw750")?.textContent ||
      "Unknown";

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "Read Article",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "episode") {
    presenceData.details =
      document.querySelector("h2.css-n0lwas.e172hw750")?.textContent ||
      "Unknown";
    presenceData.state =
      document.querySelectorAll("span.css-e6rih1.ew91t7w0")[1]?.textContent ||
      "Unknown";

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "Watch Episode",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "show") {
    presenceData.details = "Viewing Show";
    presenceData.state =
      document.querySelector("h3.css-1qqpwph")?.textContent || "Unknown";

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "Watch Show",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "discussion") {
    presenceData.details = "Viewing Discussion";
    presenceData.state =
      document.querySelector("h2.css-n0lwas.e172hw750")?.textContent ||
      "Unknown";

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "View Discussion",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "author") {
    presenceData.details = "Viewing Author";
    presenceData.state =
      document.querySelector("h2.css-cmdiie.e172hw750")?.textContent ||
      "Unknown";

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "View Author",
          url: window.location.href
        }
      ];
    }
  } else if (urlpath[1] === "subscribe")
    presenceData.details = "Viewing Membership";
  else if (
    urlpath[1] === "read" ||
    urlpath[1] === "dicuss" ||
    urlpath[1] === "watch"
  )
    presenceData.details = "Browsing";
  else if (urlpath[1] === "search") {
    presenceData.details = "Searching";
    presenceData.state = document.querySelector(
      "input.ais-SearchBox-input"
    )?.value;
  } else presenceData.details = "Other";

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
