const presence = new Presence({
    clientId: "860159948234817536"
  }),
  timestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "app",
    startTimestamp: timestamp
  };

  if (document.location.href.includes("/game-pass")) {
    //Game Pass
    presenceData.largeImageKey = "gamepass";
    presenceData.details = "Reading about Xbox Game Pass";
    if (document.location.href.includes("games"))
      presenceData.details = "Browsing Xbox Game Pass games";
  } else if (document.location.href.includes("/live/gold")) {
    //Live Gold
    presenceData.details = "Reading about Xbox Live Gold";
    if (document.location.href.includes("withgold"))
      presenceData.details = "Viewing Xbox Live Gold benefits";
  } else if (document.location.href.includes("/games")) {
    //Games
    presenceData.details = "Browsing Xbox game catalog";
    if (document.location.href.includes("optimized"))
      presenceData.details = "Reading about Series X|S optimized games";
    else if (document.location.href.includes("backward-compatibility"))
      presenceData.details = "Reading about backward compatible games";
  } else if (document.location.href.includes("/consoles")) {
    //Consoles
    presenceData.details = "Viewing Xbox consoles";
    if (document.location.href.includes("consoles/all-consoles"))
      presenceData.details = "Browsing all Xbox consoles";
    else if (document.location.href.includes("consoles/help-me-choose"))
      presenceData.details = "Determining their recommended Xbox console";
    else if (document.location.href.includes("consoles/")) {
      presenceData.details = "Viewing an Xbox console";
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
      presenceData.buttons = [
        { label: "View this console", url: document.location.href }
      ];
    } else if (document.location.href.includes("backward-compatibility"))
      presenceData.details = "Reading about backward compatible games";
  } else if (document.location.href.includes("/accessories")) {
    //Accessories
    presenceData.details = "Browsing Xbox accessories";
    if (document.location.href.includes("consoles/all-consoles"))
      presenceData.details = "Browsing all Xbox consoles";
    else if (document.location.href.includes("consoles/help-me-choose"))
      presenceData.details = "Determining their recommended Xbox console";
    else if (document.location.href.includes("accessories/")) {
      presenceData.details = "Viewing an Xbox accessory";
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
      presenceData.buttons = [
        { label: "View this accessory", url: document.location.href }
      ];
    } else if (document.location.href.includes("backward-compatibility"))
      presenceData.details = "Reading about backward compatible games";
  } else if (document.location.href.includes("/play")) {
    //Play
    presenceData.largeImageKey = "gamepass";
    if (document.location.href.includes("play/games")) {
      presenceData.details = "Viewing an Xbox Cloud Gaming game";
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
    } else if (document.location.href.includes("play/launch")) {
      presenceData.details = "Playing an Xbox Cloud Gaming game";
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
      presenceData.buttons = [
        { label: "Play this game (Game Pass)", url: document.location.href }
      ];
      if (document.querySelector(`[class^="Provisioning"`))
        presenceData.details += " (setting up)";
      else if (document.querySelector(`[class^="NotFocused"`))
        presenceData.details += " (unfocused)";
    } else {
      presenceData.details = "Browsing Xbox Cloud Gaming games";
      if (document.location.href.includes("gallery/")) {
        const [splitString] = document.title.split("|");
        presenceData.state = `Category: ${splitString}`;
      }
    }
  } else if (document.location.href.includes("/community")) {
    //Community
    presenceData.details = "Viewing the Xbox Community";
    if (document.location.href.includes("esports"))
      presenceData.details = "Reading about Xbox Esports";
  } else if (document.location.hostname === "account.xbox.com") {
    //My Xbox
    presenceData.details = "Viewing their profile";
    if (document.location.href.includes("gamertag=")) {
      const [splitString] = document.title.split("|");
      presenceData.details = `Viewing profile: ${splitString}`;
    }
  } else if (document.location.hostname === "support.xbox.com") {
    //Support
    presenceData.details = "Viewing Xbox Support";
    if (document.location.href.includes("help")) {
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
    }
  } else if (document.location.hostname === "news.xbox.com") {
    //Xbox Wire
    presenceData.details = "Viewing news from Xbox Wire";
    if (document.title.includes("-")) {
      const [splitString] = document.title.split("|");
      presenceData.state = splitString;
    }
  } else {
    //Other
    presenceData.details = "Browsing the website";
    presenceData.state = `Page: ${document.title}`;
    if (document.location.pathname.length < 8) presenceData.state = "Homepage";
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
