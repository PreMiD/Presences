const presence = new Presence({
		clientId: "656826806061498368", //The client ID of the Application created at https://discordapp.com/developers/applications
		//Enable use and detection of media key presses
	}),
	presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/gqL7pDD.png",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let customData = false;

presence.on("UpdateData", async () => {
	customData = false;
	presenceData.startTimestamp = browsingTimestamp;

	if (document.location.pathname === "/dashboard")
		presenceData.details = "Viewing the Dashboard!";
	else if (document.location.pathname === "/profile")
		presenceData.details = "Viewing their profile!";
	else if (document.location.pathname.startsWith("/room")) {
		const title = document.querySelector<HTMLElement>("#title");

		if (title) {
			customData = true;

			presence.setActivity({
				details: "Completing room:",
				state: title.textContent,
				largeImageKey: "https://i.imgur.com/gqL7pDD.png",
				startTimestamp: browsingTimestamp,
			});
		} else presenceData.details = "Looking at rooms!";
	} else if (
		document.location.pathname === "/upload" ||
		document.location.pathname === "/manage-rooms" ||
		document.location.pathname.startsWith("/room/manage") ||
		document.location.pathname === "/assign-tasks" ||
		document.location.pathname === "/your-material"
	) {
		presenceData.details = "Managing a room!";
		presenceData.state = `Page: ${document.location.pathname}`;
		//presenceData.startTimestamp = browsingTimestamp;
	} else if (document.location.pathname === "/leaderboards")
		presenceData.details = "Checking the leaderboards!";
	else presenceData.details = "Breaking stuff!";

	if (!customData) presence.setActivity(presenceData);
});
