const presence = new Presence({
  clientId: "848826520863768596"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "logo"
	};

  if (document.location.pathname === "/") {
      presenceData.details = "Viewing the homepage";
  } else if (document.location.pathname.startsWith("/anime/")) {
      presenceData.details = `Watching ${document.title.substring(0,document.title.length - 23)}`;
      presenceData.state = `${(document.getElementById("player_fluid_control_duration") as HTMLElement).textContent}`;
  } else if (document.location.pathname.startsWith("/content-rating/")) {
     presenceData.details = "Viewing Content Rating Index:";
     presenceData.state = `${document.title.substring(0,document.title.length - 23)}`;
  } else if (document.location.pathname.startsWith("/resolution/") || document.location.pathname.startsWith("/source/") || document.location.pathname.startsWith("/censorship/") || document.location.pathname.startsWith("/status/") || document.location.pathname.startsWith("/type/") || document.location.pathname.startsWith("/production/") || document.location.pathname.startsWith("/group/") || document.location.pathname.startsWith("/genre/") || document.location.pathname.startsWith("/playlist/") || document.location.pathname.startsWith("/episode/")) {
     presenceData.details = `Viewing ${(document.location.pathname.split("/")[1])} index`;
     presenceData.state = `${document.title.substring(0,document.title.length - 23)}`;
  } else if (document.location.pathname.startsWith("/resolution") || document.location.pathname.startsWith("/source") || document.location.pathname.startsWith("/censorship") || document.location.pathname.startsWith("/status") || document.location.pathname.startsWith("/type") || document.location.pathname.startsWith("/production") || document.location.pathname.startsWith("/group") || document.location.pathname.startsWith("/genre") || document.location.pathname.startsWith("/playlist") || document.location.pathname.startsWith("/episode")) {
     presenceData.details = `Viewing ${(document.location.pathname.split("/")[1])} index`;
  } else {
      presenceData.details = `Viewing ${document.title.substring(0,document.title.length - 23)}`;
    }
	
	if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
