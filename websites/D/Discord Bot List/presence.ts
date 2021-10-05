const presence = new Presence({
  clientId: "653644508507930645"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo-dbl"
    },
    browsingStamp = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = browsingStamp;

  if (window.location.pathname.endsWith("top")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Top Voted Bots";
  } else if (window.location.pathname.endsWith("add"))
    presenceData.details = "Adding a new bot";
  else if (window.location.pathname.endsWith("mine"))
    presenceData.details = "Viewing their bot(s)";
  else if (window.location.pathname.startsWith("/bots/")) {
    presenceData.details = "Viewing a bot:";
    const ad = document.querySelector(
        "#__layout > div > div.main-content > div > div > div.row > div.col-12.col-md-6 > h1"
      ).textContent,
      oy = document.querySelector(
        "#__layout > div > div.main-content > div > div > div.row > div.col-12.col-md-6 > h1 > a"
      ).textContent;
    presenceData.state = ad.replace(oy, "");
  } else if (window.location.pathname.startsWith("/tags/")) {
    presenceData.details = "Viewing a tag:";
    presenceData.state = document.querySelector(
      "#__layout > div > div.main-content > div > div > div:nth-child(1) > div.col-12.col-md-4 > h2"
    ).textContent;
  } else if (window.location.pathname.includes("/users/")) {
    presenceData.details = "Viewing a user:";
    presenceData.state = document.querySelector(
      "#__layout > div > div.main-content > div > div > div.user-bar.text-center > h2"
    ).textContent;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
