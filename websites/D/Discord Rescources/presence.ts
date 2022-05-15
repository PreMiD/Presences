const presence = new Presence({
	clientId: "973710731549745152"
}),
browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
const presenceData: PresenceData = {
		largeImageKey: "drw",
		startTimestamp: browsingTimestamp
	},
	{ pathname, search } = window.location;
switch (true) {
	case pathname.includes("/wiki"): {  
		presenceData.smallImageKey = "wiki";
		presenceData.smallImageText = "Wiki";
		if (pathname === "/wiki" || "/wiki/")
			presenceData.details = "Viewing the main page";
		else {
			presenceData.details = "Reading a wiki page";
			presenceData.state = document.title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Read Page",
					url: location.href
				}
			];
		}
		break;
	}
	case pathname.includes("/blog"): {
		presenceData.smallImageKey = "blog";
		presenceData.smallImageText = "Blog";
		if (document.title === "Blog | Discord Resources")
			presenceData.details = "Viewing the main page";
		else if (pathname.includes("/tags/")) {
			presenceData.details = "Looking for posts tagged with:";
			presenceData.state =
				pathname.split("/")[pathname.split("/").length - 1];
		} else {
			presenceData.details = "Reading a Post";
			presenceData.state = document.title.split("|")[0];
			presenceData.buttons = [
				{
					label: "Read Post",
					url: location.href
				}
			];
		}
		break;
	}
	case pathname === "/search": {
		presenceData.smallImageKey = "searching";
		presenceData.smallImageText = "Searching...";
		if (search) {
			presenceData.details = "Searching for:";
			presenceData.state = search.split("?q=")[1];
		} else presenceData.details = "Searching for something...";
		break;
	}
	default: {
		presenceData.smallImageKey = "unsupported";
		presenceData.smallImageText = "Unknown";
		presenceData.details = "Viewing an unsupported page";
	}
}
if (presenceData.details) presence.setActivity(presenceData);
else presence.setActivity();
});
