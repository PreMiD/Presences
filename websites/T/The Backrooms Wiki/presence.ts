const presence = new Presence({
  clientId: "861070252301746206"
}), browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
  const button = await presence.getSetting("button"),
    presenceData: PresenceData = {
      largeImageKey: "mainlogo"
    },
    pageTitle = document.querySelector("div#page-title").innerHTML,
    LevelRegex = new RegExp(/level-[0-9]{1,3}(?!-[0-9])/g);
  if (document.location.hostname === "backrooms-wiki.wikidot.com") {
    if (document.location.pathname === "/start" ||
      document.location.pathname === "/" ||
      !document.location.pathname) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Homepage";
    } else if (document.location.pathname.includes("/normal-levels-i")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Normal Levels";
    } else if (document.location.pathname.match(LevelRegex)) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Level";
      presenceData.state = pageTitle;
    } else if (document.location.pathname.includes("/enigmatic-levels")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Enigmatic Levels";
    } else if (document.location.pathname === "/entities") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Entities";
    } else if (document.location.pathname.includes("entity-")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading about Entity";
      presenceData.state = pageTitle;
    } else if (document.location.pathname === "/sub-layers") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Sub-Layers";
    } else if (document.location.pathname.includes("level-")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Sub-Level";
      presenceData.state = pageTitle;
    } else if (document.location.pathname === "/tales") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Tales";
    } else if (document.location.pathname === "/groups-list") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Groups";
    } else if (document.location.pathname === "/canons") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Canons";
    } else if (document.location.pathname === "/poi-s") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing People of Interest";
    } else if (document.location.pathname === "/objects") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Objects";
    } else if (document.location.pathname.includes("object-")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Object";
      presenceData.state = pageTitle;
    } else if (document.location.pathname === "/joke-entries") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Joke Entries";
    } else if (document.location.pathname.includes("joke-level") ||
      document.location.pathname.includes("joke-entity")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading Joke Entry";
      presenceData.state = pageTitle;
    } else if (document.location.pathname === "/faq") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing FAQ";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Browsing Other Pages";
      if (pageTitle) 
        presenceData.state = pageTitle;
      
    }
  }

  if (button) {
    presenceData.buttons = [
      { label: "Read Along", url: document.location.href }
    ];
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
