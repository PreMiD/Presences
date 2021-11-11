const presence = new Presence({
  clientId: "747683982279180359"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      details: "Rustlabs",
      largeImageKey: "logo_big"
    },
    browsingTimestamp = Math.floor(Date.now() / 1000);

  switch (window.location.hostname.replace("www.", "")) {
    //Homepage
    case "rustlabs.com":
      switch (window.location.pathname.split("/").slice(1)[0]) {
        //Weapons
        case "group=weapons":
          presenceData.details = "Browsing Weapons";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Construction
        case "group=build":
          presenceData.details = "Browsing Construction";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Items
        case "group=items":
          presenceData.details = "Browsing Items";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Resources
        case "group=resources":
          presenceData.details = "Browsing Resources";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Attire
        case "group=clothing":
          presenceData.details = "Browsing Attire";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Tools
        case "group=tools":
          presenceData.details = "Browsing Tools";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Medical
        case "group=medical":
          presenceData.details = "Browsing Medical";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Food
        case "group=food":
          presenceData.details = "Browsing Food";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Ammo
        case "group=ammo":
          presenceData.details = "Browsing Ammo";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Traps
        case "group=traps":
          presenceData.details = "Browsing Traps";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Misc
        case "group=misc":
          presenceData.details = "Browsing Misc";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Components
        case "group=components":
          presenceData.details = "Browsing Components";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Electrical
        case "group=electrical":
          presenceData.details = "Browsing Electrical";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Fun
        case "group=fun":
          presenceData.details = "Browsing Fun";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Skins
        case "skins":
          presenceData.details = "Looking at Skins ";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //About
        case "about":
          presenceData.details = "Browsing About";
          presenceData.startTimestamp = browsingTimestamp;
          break;
        //Unknown
        default:
          presence.setActivity();
          return;
      }
      break;
  }

  presence.setActivity(presenceData);
});
