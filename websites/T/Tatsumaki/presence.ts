const presence = new Presence({
  clientId: "652773935829614592"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname,
    browsingStamp = Math.floor(Date.now() / 1000);

  presenceData.startTimestamp = browsingStamp;

  if (page.endsWith("/editcard"))
    presenceData.details = "Editing their profile card";
  else if (page.endsWith("/inventory"))
    presenceData.details = "Viewing their inventory";
  else if (page.endsWith("/settings"))
    presenceData.details = "Editing their settings";
  else if (page.startsWith("/blog")) presenceData.details = "Viewing all blogs";
  else if (page.startsWith("/article")) {
    presenceData.details = "Reading an article:";
    presenceData.state = document.querySelector(
      "#__next > main > div.css-vxgrp0 > main > div > div.css-17cwizr > div > h1"
    ).textContent;
  } else if (page.endsWith("/servers")) presenceData.details = "On dashboard";
  else if (page.startsWith("/server"))
    presenceData.details = "Managing/Viewing a server";
  else if (page.startsWith("/shops")) presenceData.details = "On shop menu";
  else if (page.startsWith("/profile"))
    presenceData.details = "Viewing their profile";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
