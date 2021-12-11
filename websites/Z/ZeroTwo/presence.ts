const presence = new Presence({
    clientId: "752067809214857298"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  
    if ((await presence.getSetting("incognito")) === false) {
      presenceData.details = document.getElementById("premid").innerText;
      if ((await presence.getSetting("showTimestamp")) === true)
        presenceData.startTimestamp = browsingTimestamp;
    }
    if ((await presence.getSetting("buttons")) === true) {
      presenceData.buttons = [
        {
          label: "Invite ZeroTwo",
          url: "https://zerotwo.wtf/invite"
        }
      ];
    }
    if (!presenceData.details) presence.setActivity();
      else presence.setActivity(presenceData);
    
  });