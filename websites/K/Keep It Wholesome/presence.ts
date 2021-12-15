const presence = new Presence({
    clientId: "748255086286733442"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    details: "Keep It Wholesome",
    largeImageKey: "lg"
  };

  if (document.location.pathname === "/" || !document.location.pathname) {
    presenceData.state = "Home | Shop";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/blogs/our-impact")) {
    presenceData.state = "Our Impact";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/pages/about-us")) {
    presenceData.state = "About";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/pages/podcast")) {
    presenceData.state = "Checking the Podcast";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname === "/cart") {
    presenceData.state = "In cart";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  } else if (document.location.pathname.startsWith("/collections")) {
    presenceData.state = "Collections";

    presenceData.startTimestamp = browsingStamp;

    delete presenceData.details;
  }

  presence.setActivity(presenceData);
});
