const presence = new Presence({
    clientId: "876239113307709493"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

async function getStrings() {
  return presence.getStrings(
    {
      home: "general.viewHome",
      user: "general.viewUser",
      call: "general.inCall",
      reading: "general.readingAbout",
      browsing: "general.browsing"
    },
    await presence.getSetting("lang").catch(() => "en")
  );
}

let strings = getStrings(),
  oldLang: string = null;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "lg"
    },
    privacy = await presence.getSetting("privacy"),
    newLang = await presence.getSetting("lang").catch(() => "en"),
    timestamps = await presence.getSetting("time");

  oldLang ??= newLang;
  if (oldLang !== newLang) {
    oldLang = newLang;
    strings = getStrings();
  }

  if (document.location.hostname === "giggl.app") {
    switch (document.location.pathname) {
      case "/":
        presenceData.details = (await strings).home;
        break;
      case "/jobs":
        presenceData.details = `${(await strings).reading} Jobs`;
        break;
      case "/isp":
        presenceData.details = `${(await strings).reading} Giggl Networking`;
        break;
    }
  } else if (document.location.hostname === "canary.giggl.app") {
    presenceData.details = (await strings).browsing;

    if (document.location.pathname.startsWith("/portal")) {
      presenceData.details = "In a Portal";
      [presenceData.state] = document
        .querySelector("title")
        .innerText.split(" • ");
    } else if (document.querySelector("svg.feather.feather-phone-missed")) {
      presenceData.smallImageKey = "call";
      presenceData.smallImageText = (await strings).call;
    } else if (document.querySelector(".feather.feather-map-pin")) {
      presenceData.details = (await strings).user;
      presenceData.state = document.querySelector("p").textContent;
    }
  } else if (document.location.hostname === "status.giggl.app")
    presenceData.details = "Viewing the status page";

  if (privacy) delete presenceData.state;
  if (timestamps) presenceData.startTimestamp = browsingTimestamp;

  presence.setActivity(presenceData);
});
