const presence = new Presence({
    clientId: "795125406264066099"
  }),
  presenceData: PresenceData = {
    largeImageKey: "anichart",
    startTimestamp: Math.floor(Date.now() / 1000)
  };

presence.on("UpdateData", async () => {
  switch (
    document.location.pathname.endsWith("/") &&
    document.location.pathname.length > 1
      ? document.location.pathname.slice(
          0,
          document.location.pathname.length - 1
        )
      : document.location.pathname
  ) {
    case "/airing":
      presenceData.details = "Viewing currently airing anime";
      break;
    case "/archive":
      presenceData.details = "Viewing anime archive";
      break;
    case "/tba":
      presenceData.details = "Viewing TBA anime";
      break;
    case "/settings":
      presenceData.details = "Customizing settings";
      break;
    default: {
      if ((document.querySelector(".input") as HTMLInputElement)?.value) {
        presenceData.details = `Searching anime`;
        presenceData.smallImageKey = "search";
        presenceData.state = (document.querySelector(
          ".input"
        ) as HTMLInputElement).value;
      } else
        presenceData.details = `Viewing ${document.location.pathname
          .substring(1)
          .split("-")
          .join(" ")} anime`;
      break;
    }
  }
  presence.setActivity(presenceData);
});
