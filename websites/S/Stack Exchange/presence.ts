const presence = new Presence({
    clientId: "919817726195814431"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "stackexchange",
      startTimestamp: browsingTimestamp
    },
    { pathname, hostname } = window.location;

  if (hostname === "stackexchange.com") presenceData.details = "Browsing";
  else if (hostname === "serverfault.com") {
    presenceData.largeImageKey = "serverfault";
    presenceData.details = "Server Fault";
  } else if (hostname === "meta.serverfault.com") {
    presenceData.largeImageKey = "serverfault";
    presenceData.details = "Server Fault Meta";
  } else if (hostname === "superuser.com") {
    presenceData.largeImageKey = "superuser";
    presenceData.details = "Super User";
  } else if (hostname === "meta.superuser.com") {
    presenceData.largeImageKey = "superuser";
    presenceData.details = "Super User Meta";
  } else {
    const imageKey = hostname.replace(".stackexchange.com", "");
    if (imageKey === "meta") presenceData.smallImageKey = imageKey;
    else presenceData.smallImageKey = imageKey.replace(".meta", "");

    presenceData.smallImageText = document
      .querySelector("meta[property='og:site_name']")
      .getAttribute("content")
      .replace("Stack Exchange", "");
    if (pathname.includes("/questions"))
      presenceData.details = "Reading a question";
  }

  if (pathname === "/") {
    if (
      [
        "serverfault.com",
        "meta.serverfault.com",
        "superuser.com",
        "meta.superuser.com"
      ].includes(hostname)
    )
      presenceData.state = "Main Page";
    else presenceData.details = "Main Page";
  } else if (pathname.includes("/questions")) {
    presenceData.state = document.querySelector(
      ".question-hyperlink"
    ).textContent;
  } else if (
    [
      "serverfault.com",
      "meta.serverfault.com",
      "superuser.com",
      "meta.superuser.com"
    ].includes(hostname)
  )
    presenceData.state = "Browsing";
  else presenceData.details = "Browsing";

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
