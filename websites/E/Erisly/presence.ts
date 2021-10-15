const presence = new Presence({
    clientId: "732586216272429126"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "erisly"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname === "erisly.com") {
    if (document.location.pathname.includes("/partners"))
      presenceData.details = "Viewing Erisly's Partners";
    else if (document.location.pathname.includes("/commands")) {
      presenceData.details = `Viewing ${document
        .querySelector(".category-item.active")
        .textContent.replace("- ", "")}`;
    } else if (document.location.pathname.includes("/changelog")) {
      presenceData.details = "Reading the latest changelog";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/premium"))
      presenceData.details = "Viewing Premium perks";
    else if (document.location.pathname.includes("/about")) {
      presenceData.details = "Reading about Erisly";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/fanart"))
      presenceData.details = "Viewing Erisly's Fan Art Collection";
    else if (document.location.pathname.includes("/team"))
      presenceData.details = "Meeting Erisly's Team";
    else if (document.location.pathname === "/")
      presenceData.details = "Viewing the home page";
  } else if (document.location.hostname === "giveaways.erisly.com")
    presenceData.details = "Entering a Giveaway";
  else if (document.location.hostname === "translate.erisly.com") {
    presenceData.details = "Helping Erisly";
    presenceData.state = "learn a language";
  } else if (document.location.hostname === "wiki.erisly.com") {
    let firstHeading =
      document.querySelector("#firstHeading") !== null
        ? document.querySelector("#firstHeading").textContent
        : document.querySelector(".page-heading").textContent;
    const firstHeadingSplit = firstHeading.split(" "),
      firstHeadingVerb = firstHeadingSplit.shift();

    if (
      document.location.pathname === "/w/index.php" &&
      firstHeadingVerb.endsWith("ing")
    ) {
      firstHeading = firstHeadingSplit.join(" ");
      presenceData.details = `Wiki - ${firstHeadingVerb}:`;
    } else presenceData.details = "Wiki - Viewing page:";

    presenceData.state = firstHeading;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
