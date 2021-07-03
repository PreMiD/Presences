const presence = new Presence({ clientId: "791911792019898388" }),
  strings = presence.getStrings({
	browsing: "presence.activity.browsing"
  });

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "last",
	  details: null
    }
    if (window.location.pathname.startsWith("/my/home")) {
	 presenceData.details = (await strings).browsing;
     presenceData.buttons = [
      {
        label: "Dashboard",
        url: "https://dashboard.last-shot.rf.gd/"
      },
	  {
		label: "Bot",
		url: "https://top.gg/bot/791911792019898388"
	  }
    ];
	} else if (window.location.pathname.startsWith("/my/manage/")) {
	 var server = document.querySelector("body > nav > a")?.textContent.trim() || "Server";
	 presenceData.details = server;
     presenceData.buttons = [
      {
        label: "Dashboard",
        url: "https://dashboard.last-shot.rf.gd/"
      },
	  {
		label: "Bot",
		url: "https://top.gg/bot/791911792019898388"
	  }
    ];
	} else {
	 presenceData.details = (await strings).browsing;
     presenceData.buttons = [
      {
        label: "Dashboard",
        url: "https://dashboard.last-shot.rf.gd/"
      },
	  {
		label: "Bot",
		url: "https://top.gg/bot/791911792019898388"
	  }
    ];
	}
  presence.setActivity(presenceData);
});
