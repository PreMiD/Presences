const presence = new Presence({
		clientId: "1212664221788274698",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/OzDunh4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	},
	{ pathname } = document.location,
	path = pathname.split("/");
	path.shift(); 
	if (pathname.endsWith("/")) path.pop();

	presenceData.details = getPageDetails(path); 

	presence.setActivity(presenceData);
});

function getPageDetails(path: string[]): string {
	let val = "";
	if(path.length === 0)
		val = "Viewing home page";

	switch(path[0].toLowerCase()) {
		case "library":
			val = "Viewing library page";
			break;
		case "explore":
			val = "Viewing explore page";
			break;
		case "classes":
			val = "Viewing classes page";
			break;

		case "settings":
			val = "Viewing account settings";
			break;

		case "faq":
			val = "Frequently Asked Questions";
			break;

		case "terms":
			val = "Viewing Terms of Service";
			break;

		case "privacy":
			val = "Viewing Privacy Policy";
			break;

		case "beta":
			val = "Viewing beta apps page";
			break;

		case "videos":
			val = "Viewing a video"; //todo
			break;

		default:
			val = "Listening to a podcast"; // i think?
	}

	console.log("val: ", val);
	return val;
}
