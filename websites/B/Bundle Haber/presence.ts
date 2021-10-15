const presence = new Presence({
  clientId: "651771207385088031"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "bundle"
    },
    page = window.location.pathname,
    browsingStamp = Math.floor(Date.now() / 1000);

  if (page.startsWith("/detay/")) {
    presenceData.details = "Bir haber okuyor";
    presenceData.state = document.querySelector(
      "body > div.site > div.detailpage > div > h2"
    ).textContent;
    presenceData.startTimestamp = browsingStamp;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
