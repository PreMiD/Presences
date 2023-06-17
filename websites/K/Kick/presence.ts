const presence1 = new Presence({ clientId: "1112901248421732462" });
const browsingStamp1 = Math.floor(Date.now() / 1000);

presence1.on("UpdateData", () => {
const presenceData: PresenceData = {
	largeImageKey: "app_icon",
	startTimestamp: browsingStamp1
	};

	const pathParts = document.location.pathname.split("/");
	const username = pathParts.pop();
  
  if (document.location.pathname === "/") {
    presenceData.details = "Viewing:";
    presenceData.state = "Startpage";
  } else if (document.location.pathname.includes("/terms-of-service")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Terms of Service";
  } else if (document.location.pathname.includes("/privacy-policy")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Privacy Policy";
  } else if (document.location.pathname.includes("/dmca-policy")) {
    presenceData.details = "Viewing:";
    presenceData.state = "DMCA Policy";
  } else if (document.location.pathname.includes("/community-guidelines")) {
    presenceData.details = "Viewing:";
    presenceData.state = "Community Guidelines";
  } else if (username) {
	  presenceData.details = `Watching: ${username}`;
	  //presenceData.state = "On Kick";
	  presenceData.largeImageKey = "app_icon";
	  presenceData.buttons = [{ label: "Watch Stream", url: `https://kick.com/${username}` }];
  } else {
    presenceData.details = "Viewing:";
    presenceData.state = "Unknown";
  }

  presence1.setActivity(presenceData);
});
