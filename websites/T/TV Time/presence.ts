const presence = new Presence({
    clientId: "844109006679179265"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const data: PresenceData = {
    largeImageKey: "logo"
  };

  if (
    document.location.pathname === "/en" ||
    document.location.pathname === "/fr" ||
    document.location.pathname === "/es" ||
    document.location.pathname === "/it" ||
    document.location.pathname === "/pt_PT" ||
    document.location.pathname === "/pt_BR" ||
    document.location.pathname === "/de"
  ) {
    (presenceData.details = "Viewing Watchlist"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/calendar")) {
    (presenceData.details = "Viewing Calendar"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/upcoming")) {
    (presenceData.details = "Viewing Upcoming Episodes"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/profile")) {
    const [user] = document
      .querySelector(".profile-infos h1.name")
      .textContent.split("Follow");
    (presenceData.details = "Viewing a User Profile"),
      (data.state = user),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/account")) {
    (presenceData.details = "Viewing Account Details"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.includes("/show")) {
    if (document.location.pathname.includes("/episode/")) {
      (presenceData.details = "Viewing an Episode"),
        (data.state = `${
          document.querySelector("div.info-box h3 a").textContent
        } - ${
          document.querySelector("div.info-box h1 .episode-label").textContent
        }`);
      data.startTimestamp = browsingTimestamp;
      presence.setActivity(data);
    } else if (document.location.pathname.endsWith("/explore")) {
      (presenceData.details = "Browsing TV Shows"),
        (data.startTimestamp = browsingTimestamp);
      presence.setActivity(data);
    } else {
      (presenceData.details = "Viewing a TV Show"),
        (data.state = document.querySelector(
          "div.info-box.heading-info h1"
        ).textContent);
      data.startTimestamp = browsingTimestamp;
      presence.setActivity(data);
    }
  } else if (document.location.pathname.includes("/actor/")) {
    (presenceData.details = "Viewing an Actor Profile"),
      (data.state = document.querySelector(
        "div#actor-details div.infos h1"
      ).textContent);
    data.startTimestamp = browsingTimestamp;
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/about")) {
    (presenceData.details = "Viewing the About Page"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/privacy")) {
    (presenceData.details = "Viewing the Privacy Policy"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/terms")) {
    (presenceData.details = "Viewing the Terms of Service"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/special-thanks")) {
    (presenceData.details = "Viewing the Credits"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.endsWith("/podcasts")) {
    (presenceData.details = "Viewing the Podcasts Page"),
      (data.startTimestamp = browsingTimestamp);
    presence.setActivity(data);
  } else if (document.location.pathname.includes("/article")) {
    if (document.location.pathname.endsWith("/articles")) {
      (presenceData.details = "Browsing Articles"),
        (data.startTimestamp = browsingTimestamp);
      presence.setActivity(data);
    } else {
      (presenceData.details = "Viewing an Article"),
        (data.state = document.querySelector(
          "div.article h1.page-header"
        ).textContent);
      data.startTimestamp = browsingTimestamp;
      presence.setActivity(data);
    }
  }
});
