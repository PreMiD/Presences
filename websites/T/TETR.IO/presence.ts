const presence = new Presence({
    clientId: "815006153066151998"
  }),
  SelectorMap = {
    header: "div#header_text.ns",
    username: "h1#me_username",
    status: "div#social_status",
    game: "div#social_status > b",
    roomid: "div#roomid",
    replay: "div#data_replay"
  },
  menuPrincipal = ["SOLO","MULTIPLAYER"],
  soloModes:{ [key: string]: string } = {
    zen:"ZEN",
    bl:"BLITZ",
    lines40:"40 LINES",
    ct:"CUSTOM",
    ctgame:"custom game"
  };
let browsingStamp = Math.floor(Date.now() / 1000);

function getText(selector:string): string {
  if (document.querySelector(selector) !== null &&
    document.querySelector(selector) !== undefined)
    return document.querySelector(selector).textContent;
  else
    return null;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    }, showPrivButton = await presence.getSetting("privateRoom"),
    showButtons = await presence.getSetting("showButtons"),
    header = getText(SelectorMap["header"]),
    status = getText(SelectorMap["status"]),
    game = getText(SelectorMap["game"]),
    roomID = getText(SelectorMap["roomid"]),
    replay = getText(SelectorMap["replay"]);
  let buttons:Array<{ label: string; url: string; }> = [];
  if (status.includes("Idle") || status.includes("Busy") || status.includes("Offline")) {
    presenceData.details = status;
  }
  else {
    if (menuPrincipal.includes(header)) {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = header;
      presenceData.state = "In Menus";
    } else if (Object.values(soloModes).includes(header)) {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = header;
      presenceData.state = "Setting up game";
      presenceData.smallImageKey = Object.keys(soloModes).find(key => soloModes[key] === header);
      presenceData.smallImageText = header;
    } else if (header.includes("LISTING")) {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = "ROOM LISTING";
      presenceData.state = "Browsing public rooms";
      presenceData.smallImageKey = "ct";
      presenceData.smallImageText = "ROOM LISTING";
    } else if (status.includes("custom room")) {
      if (status.includes("game"))
        presenceData.startTimestamp = browsingStamp;
      else
        browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = "CUSTOM GAME";
      presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
      presenceData.smallImageKey = "ct";
      presenceData.smallImageText = game;
      if (status.includes("public"))
        buttons.push({
          label: "Enter Public Room",
          url: "https://tetr.io/" + roomID
        });
      else if (showPrivButton)
        buttons.push({
          label: "Enter Private Room",
          url: "https://tetr.io/" + roomID
        });
    } else if (status.includes("QUICK")) {
      if (status.includes("game"))
        presenceData.startTimestamp = browsingStamp;
      else
        browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = game;
      presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
      presenceData.smallImageKey = "qp";
      presenceData.smallImageText = game;
    } else if (status.includes("LEAGUE")) {
      if (status.includes("game"))
        presenceData.startTimestamp = browsingStamp;
      else
        browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = game;
      presenceData.state = status.replace(/([a-z]+) .* ([a-z]+)/i, "$1 $2");
      presenceData.smallImageKey = "tl";
      presenceData.smallImageText = game;
    } else if (header.includes("LEAGUE")) {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = header;
      presenceData.smallImageKey = "tl";
      presenceData.smallImageText = header;
    } else if (Object.values(soloModes).includes(game)) {
      if (!header.includes("RESULTS"))
        presenceData.startTimestamp = browsingStamp;
      else {
        browsingStamp = Math.floor(Date.now() / 1000);
        presenceData.state = "Checking Results";
      }
      presenceData.details = game;
      presenceData.smallImageKey = Object.keys(soloModes).find(key => soloModes[key] === game);
      presenceData.smallImageText = game;
    } else if (!document.querySelector("#replay").classList.contains('hidden')) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "REPLAY";
      presenceData.state = replay;
    } else {
      browsingStamp = Math.floor(Date.now() / 1000);
      presenceData.details = status;
    }
  }
  if (getText(SelectorMap["username"]) !== "" && !getText(SelectorMap["username"]).includes("guest-") && showButtons) {
    buttons.push({
      label: "View Profile",
      url: "https://ch.tetr.io/u/" + getText(SelectorMap["username"])
    });
    presenceData.buttons = buttons;
  } else {
    buttons = [];
    delete presenceData.buttons;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  }
  else {
    presence.setActivity(presenceData);
  }
});
