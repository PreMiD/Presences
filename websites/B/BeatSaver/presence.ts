const presence = new Presence({
    clientId: "837997079208525835"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const [time, buttons, cover] = await Promise.all([
      presence.getSetting<boolean>("time"),
      presence.getSetting<boolean>("buttons"),
      presence.getSetting<boolean>("cover")
    ]),
    presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingTimestamp
    };

  if (document.location.href.includes("/?q=")) {
    presenceData.details = "Searching Beatmaps";
    presenceData.state = (
      document.querySelector("input.form-control") as HTMLInputElement
    ).value;
  } else if (document.location.pathname.includes("/maps/")) {
    if (document.querySelector("a[class~='active']")) {
      presenceData.smallImageKey = `${(
        document
          .querySelector("a[class~='active']")
          .childNodes.item(0) as HTMLImageElement
      ).alt.toLowerCase()}${document
        .querySelector("a[class~='active']")
        .childNodes.item(1)
        .textContent.replace("+", "_")
        .toLowerCase()}`;
      presenceData.smallImageText = `${
        (
          document
            .querySelector("a[class~='active']")
            .childNodes.item(0) as HTMLImageElement
        ).alt
      } ${
        document.querySelector("a[class~='active']").childNodes.item(1)
          .textContent
      }`;
      if (cover) {
        presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
          "[alt='Cover Image']"
        ).src;
      }
    }
    if (
      document
        .getElementsByClassName("badge badge-pill badge-danger mr-2")
        .item(0)
    ) {
      presenceData.smallImageKey = "showauto";
      presenceData.smallImageText = "Made by a bot";
    }
    presenceData.details = document
      .getElementsByClassName("card-header d-flex")
      .item(0)
      .childNodes.item(0).textContent;
    if (presenceData.details === "") presenceData.details = "<NO NAME>";

    presenceData.state = `Uploaded by ${
      document
        .getElementsByClassName(
          "list-group-item d-flex justify-content-between"
        )
        .item(0)
        .children.item(0).textContent
    }`;
    presenceData.buttons = [
      {
        label: "View Page",
        url: document.location.href
      },
      {
        label: "View Uploader's Profile",
        url: `https://beatsaver.com${document
          .getElementsByClassName(
            "list-group-item d-flex justify-content-between"
          )
          .item(0)
          .getAttribute("href")}`
      }
    ];
  } else if (document.location.pathname.includes("/profile")) {
    presenceData.details = "Viewing Profile";
    presenceData.state = document.querySelector("h4").textContent;
    presenceData.buttons = [
      {
        label: "View Profile",
        url: document.location.href
      }
    ];
  } else if (document.location.pathname === "/") {
    presenceData.details = "Browsing Beatmaps";
    if (document.location.href !== "https://beatsaver.com/") {
      let filters = "";
      if (document.location.href.includes("auto=true")) filters += " AI,";
      if (document.location.href.includes("ranked=true")) filters += " Ranked,";
      if (document.location.href.includes("fullSpread=true"))
        filters += " Full Spread,";
      if (document.location.href.includes("chroma=true")) filters += " Chroma,";
      if (document.location.href.includes("noodle=true")) filters += " Noodle,";
      if (document.location.href.includes("me=true"))
        filters += " Mapping Extensions,";
      if (document.location.href.includes("cinema=true")) filters += " Cinema,";
      presenceData.state = `Filters:${filters.slice(0, -1)}`;
    }
  }

  switch (document.location.pathname) {
    case "/mappers":
      presenceData.details = "Browsing Mappers";
      break;
    case "/alerts":
      presenceData.details = "Viewing Alerts";
      break;
    case "/policy/dmca":
      presenceData.details = "Viewing DMCA Policy";
      break;
    case "/upload":
      presenceData.details = "Uploading...";
      break;
  }

  if (!time) delete presenceData.startTimestamp;

  if (!buttons && presenceData.buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});
