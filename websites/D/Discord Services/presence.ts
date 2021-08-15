const presence = new Presence({
  clientId: "876203287530057839"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "dslogo",
    smallImageKey: "fplogo",
    smallImageText: "fluxpoint",

  };
  presenceData.details = "Viewing Page:";

  //Discord Bot List
  if (window.location.pathname.startsWith("/staff")) {
    presenceData.details = "Viewing Staff section:";
    

  
    if (window.location.pathname == "/staff/stats") {
      presenceData.state = "looking at leader board";
    }
  } else if (window.location.pathname.startsWith("/bots")){
    if (window.location.pathname.endsWith("/submit")) {
      presenceData.state = "Add a bot";
    }else{
    presenceData.details = "Looking for a Discord bot";
    }
  }
  else if (window.location.pathname.startsWith("/bot/")) {
    if (window.location.pathname.endsWith("/edit")) {
      presenceData.details = "Editing a Discord bot:";
      presenceData.state = document.querySelectorAll(`h3`).item(1).textContent.slice(4)
   
    } else {
      presenceData.details = "Viewing a Discord bot:";
      presenceData.state = document.querySelectorAll(`h3`).item(1).textContent
    }
  } else if (window.location.pathname.startsWith("/tag")) {
    presenceData.details = "Viewing Discord bots with tag:";
    presenceData.state = document.querySelectorAll(`h3`).item(1).textContent;
  } else if (
    window.location.pathname.startsWith("/user/")
  ) {
    presenceData.details = "Viewing a profile:";
    presenceData.state = document.querySelectorAll(`h3`).item(1).textContent;
  } else if (window.location.pathname.startsWith("/docs")) {
    if (window.location.pathname.endsWith("/api")){
      presenceData.state = "Looking at API Documentation";
    } else if (window.location.pathname.endsWith("/markdown/example")) {
      presenceData.state = "Looking at Markdown example";
    } else if (window.location.pathname.endsWith("/markdown")) {
      presenceData.state = "Looking at Markdown Editor";
    }
    else{
    presenceData.state = "Looking at Documentation";
    }
  }

  //Discord Server List
  else if (window.location.pathname.startsWith("/servers")) {
      presenceData.state = "Looking for Discord Servers";
    
  }

  //If it doesn't fit to anything
  else if (document.querySelectorAll(`h3`).item(1)) {
    presenceData.state = document.querySelectorAll(`h3`).item(1).textContent;
  }

  //If it really finds nothing
  else {
    presenceData.details = "Viewing something...";
  }

  presence.setActivity(presenceData);
});
