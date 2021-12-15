const presence = new Presence({
  clientId: "747683982279180359"
});

presence.on("UpdateData", async () => {
  const host = window.location.hostname.replace("www.", ""),
    path = window.location.pathname.split("/").slice(1),
    presenceData: PresenceData = {
      details: "Rustlabs",
      largeImageKey: "logo_big"
    },
    browsingStamp = Math.floor(Date.now() / 1000);

  switch (host) {
    //Homepage
    case "rustlabs.com":
      switch (path[0]) {
        //Weapons
        case "group=weapons":
          presenceData.details = "Browsing Weapons";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Construction
        case "group=build":
          presenceData.details = "Browsing Construction";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Items
        case "group=items":
          presenceData.details = "Browsing Items";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Resources
        case "group=resources":
          presenceData.details = "Browsing Resources";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Attire
        case "group=clothing":
          presenceData.details = "Browsing Attire";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Tools
        case "group=tools":
          presenceData.details = "Browsing Tools";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Medical
        case "group=medical":
          presenceData.details = "Browsing Medical";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Food
        case "group=food":
          presenceData.details = "Browsing Food";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Ammo
        case "group=ammo":
          presenceData.details = "Browsing Ammo";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Traps
        case "group=traps":
          presenceData.details = "Browsing Traps";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Misc
        case "group=misc":
          presenceData.details = "Browsing Misc";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Components
        case "group=components":
          presenceData.details = "Browsing Components";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Electrical
        case "group=electrical":
          presenceData.details = "Browsing Electrical";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Fun
        case "group=fun":
          presenceData.details = "Browsing Fun";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Skins
        case "skins":
          presenceData.details = "Looking at Skins ";
          presenceData.startTimestamp = browsingStamp;
          break;
        //About
        case "about":
          presenceData.details = "Browsing About";
          presenceData.startTimestamp = browsingStamp;
          break;
        //Unknown
        default:
          presence.setTrayTitle();
          presence.setActivity();
          return;
      }
      break;
  }

  presence.setActivity(presenceData);
});
