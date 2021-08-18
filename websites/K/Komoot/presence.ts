const presence = new Presence({
    clientId: "860131264034897951"
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
  else if (
    urlpath[1] === "discover" ||
    urlpath[1] === "community" ||
    urlpath[1] === "discover-topics"
  )
    presenceData.details = "Discovering";
  else if (urlpath[1] === "plan") presenceData.details = "Route Planner";
  else if (urlpath[1] === "shop") presenceData.details = "Shop";
  else if (urlpath[1] === "upload")
    presenceData.details = "Importing a GPS File";
  else if (urlpath[1] === "highlight-create")
    presenceData.details = "Creating Highlight";
  else if (urlpath[1] === "notifications")
    presenceData.details = "Notifications";
  else if (urlpath[1] === "pioneers") presenceData.details = "Pioneers";
  else if (urlpath[1] === "help") presenceData.details = "Help Guides";
  else if (urlpath[1] === "tour") {
    presenceData.details = "Tour";
    presenceData.state = document.querySelector(
      "h1 span.tw-mr-1.tw-font-bold"
    )?.textContent;

    if (
      setting.showButtons &&
      checkPublic(
        "span.tw-inline-flex.tw-absolute.tw-right-0.tw-top-0 svg",
        "data-original-title"
      )
    ) {
      presenceData.buttons = [
        {
          label: "View Tour",
          url: document.location.href
        }
      ];
    }
  } else if (urlpath[1] === "collection" && urlpath[2]) {
    presenceData.details = "Collection";
    presenceData.state = document.querySelector(
      "div.css-q63yry h1.css-16evvg"
    )?.textContent;

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "View Collection",
          url: document.location.href
        }
      ];
    }
  } else if (urlpath[1] === "topic" && urlpath[2]) {
    presenceData.details = "Topic";
    presenceData.state = document.querySelector(
      "h1.c-topic-header__headline"
    )?.textContent;

    if (setting.showButtons) {
      presenceData.buttons = [
        {
          label: "View Collection",
          url: document.location.href
        }
      ];
    }
  } else if (urlpath[1] === "user" && urlpath[2]) {
    presenceData.details = "User";
    presenceData.state = document.querySelector(
      "h1.css-1nujfd4 a.c-link.c-link--inherit"
    )?.textContent;
  }

  function checkPublic(q, a) {
    const url = window.location.hostname,
      wl = (() => {
        if (url === "www.komoot.com") return "visible to: anyone";
        else if (url === "www.komoot.de") return "sichtbar: für alle";
        else if (url === "www.komoot.fr") return "visible par : tout le monde";
        else if (url === "www.komoot.it") return "visibile a: tutti";
        else if (url === "www.komoot.es") return "visible para todo el mundo";
        else if (url === "www.komoot.nl") return "zichtbaar voor: iedereen";
      })();

    return document.querySelector(q).getAttribute(a).toLowerCase() === wl;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
