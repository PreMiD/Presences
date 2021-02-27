const presence = new Presence({
  clientId: "815006153066151998"
}),
  SelectorMap = {
  header: "div#header_text.ns",
  username: "h1#me_username",
  social_status: "div#social_status",
  game: "div#social_status > b",
    roomid: "div#roomid"
},
  menuPrincipal = ["SOLO","MULTIPLAYER","TETRA CHANNEL"],
  soloModes:{ [key: string]: string } = {zen:"ZEN",
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
    header = getText(SelectorMap["header"]),
    status = getText(SelectorMap["social_status"]),
    game = getText(SelectorMap["game"]),
    roomID = getText(SelectorMap["roomid"]);
  let buttons:Array<{ label: string; url: string; }> = [];
  if (menuPrincipal.includes(header)){
    browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = header;
    presenceData.state = "Browsing game modes";
  } else if (Object.values(soloModes).includes(header)){
    browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = header;
    presenceData.state = "Setting up game";
    presenceData.smallImageKey = Object.keys(soloModes).find(key => soloModes[key] === header);
    presenceData.smallImageText = header;
  } else if (header.includes("LISTING")){
    browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "ROOM LISTING";
    presenceData.state = "Browsing public rooms";
  } else if (header.includes("LEAGUE")){
    browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "TETRA LEAGUE";
    presenceData.state = "In Matchmaking";
  } else if (status.includes("custom room")){
    if(status.includes("game"))
      presenceData.startTimestamp = browsingStamp;
    else
     browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "CUSTOM GAME";
    presenceData.state = status.replace(" custom room","");
    presenceData.smallImageKey = "ct";
    presenceData.smallImageText = "Custom Room";
    if(status.includes("public"))
      buttons.push({
        label: "Enter Room",
        url: "https://tetr.io/" + roomID
      });
    else
      if(showPrivButton)
        buttons.push({
          label: "Enter Room",
          url: "https://tetr.io/" + roomID
        });
  } else if (status.includes("QUICK")){
    if(status.includes("game"))
      presenceData.startTimestamp = browsingStamp;
    else
      browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "QUICK PLAY";
    presenceData.state = status.replace("a QUICK PLAY","");
    presenceData.smallImageKey = "qp";
    presenceData.smallImageText = "Quick Play";
  } else if (status.includes("LEAGUE")){
    if(status.includes("game"))
      presenceData.startTimestamp = browsingStamp;
    else
      browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "TETRA LEAGUE";
    presenceData.state = "In game";
  } else if (status.includes("Playing")){
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = game;
    presenceData.state = "In game";
    presenceData.smallImageKey = Object.keys(soloModes).find(key => soloModes[key] === game);
    presenceData.smallImageText = header;
  }  else {
    browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.details = "In Menus";
  }
  if (getText(SelectorMap["username"]) !== "" && !getText(SelectorMap["username"]).includes("guest-")) {
    buttons.push({
      label: "Check Profile",
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
