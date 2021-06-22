const presence = new Presence({
    clientId: "854743353824641066"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
  

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "gta5mods_logo",
    startTimestamp: browsingStamp
  },
  pathname = document.location.pathname;

  if(pathname == "/"){
    presenceData.details = "Browsing Main Page...";
  }

  if(pathname.includes("/login")) {
    presenceData.details = "Logging in...";
  }

  if(pathname.includes("/register")) {
    presenceData.details = "Registering...";
  }

  if(pathname.includes("/upload")) {
    presenceData.details = "Uploading a mod...";
  }

  if(pathname.includes("/search/")) {
    const searchedmod = pathname.split("/")[2];
    presenceData.details = `Searching for ${searchedmod}`;
  }

  if(pathname.includes("/tools")) {
    if(pathname != "/tools") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Tools Mod :";
      presenceData.state = modName;
    } 
    else
    {
      presenceData.details = "Searching Tools Mods...";
    }
  }
  

  if(pathname.includes("/vehicles")) {
    if(pathname != "/vehicles") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Vehicules Mod :";
      presenceData.state = modName;
    } 
    else 
    {
      presenceData.state = "Searching Vehicules Mods...";
    }
  }

  if(pathname.includes("/paintjobs")) {
    if(pathname != "/paintjobs") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Paintjobs Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Paintjobs Mods...";
    }
  }

  if(pathname.includes("/weapons")) {
    if(pathname != "/weapons") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Weapon Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Weapons Mods...";
    }
  }

  if(pathname.includes("/scripts")) {
    if(pathname != "/scripts") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Script Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Scripts Mods...";
    }
  }

  if(pathname.includes("/player")) {
    if(pathname != "/player") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Player Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Player Mods...";
    }
  }

  if(pathname.includes("/maps")) {
    if(pathname != "/maps") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Maps Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Maps Mods...";
    }
  }

  if(pathname.includes("/misc")) {
    if(pathname != "/misc") 
    {
      const modName = document.querySelector(".clearfix h1").textContent;
      presenceData.details = "Viewing Misc Mod :";
      presenceData.state = modName;
    } 
    else {
      presenceData.details = "Searching Misc Mods...";
    }
  }

  if (presenceData.details == null) 
  {
    presence.setTrayTitle();
    presence.setActivity();
  } 
  else {
    presence.setActivity(presenceData);
  }
});