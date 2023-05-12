const presence = new Presence({
	clientId: "761617743593209869",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

function getTime() {
	const time = document
		.querySelectorAll(".vjs-current-time-display")[0]
		.textContent.split(":")
		.map(n => Number(n));
	if (time.length === 3)
		return Date.now() - (time[0] * 3600 + time[1] * 60 + time[2]) * 1000;
	else return Date.now() - (time[0] * 60 + time[1]) * 1000;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/Cfm6lRV.png",
		smallImageKey: "more",
	};
	let clear = false;

	switch (document.location.pathname.replace("/feed", "").split("/")[1]) {
		case "":
		case "popular":
			presenceData.details = "Browsing popular videos";
			break;

		case "trending":
			presenceData.details = "Browsing trending videos";
			break;

		case "subscriptions":
		case "subscription_manager":
			presenceData.details = "Browsing subscriptions";
			break;

		case "view_all_playlists":
			presenceData.details = "Browsing playlists";
			break;

		case "history":
			presenceData.details = "Browsing watch history";
			break;

		case "change_password":
		case "clear_watch_history":
		case "data_control":
		case "delete_account":
		case "licenses":
		case "preferences":
		case "privacy":
		case "token_manager":
			presenceData.details = "Managing preferences";
			break;

		case "watch":
			presenceData.smallImageKey = document.querySelectorAll(".vjs-playing")[0]
				? "play"
				: "pause";
			presenceData.details = document
				.querySelectorAll("h1")[0]
				.textContent.trim();
			presenceData.state = document.querySelector("#channel-name").textContent;
			if (document.querySelectorAll(".vjs-playing")[0])
				presenceData.startTimestamp = getTime();

			break;

		case "playlist":
			presenceData.details = "Viewing playlist";
			presenceData.state = document.querySelectorAll("h3")[0].textContent;
			break;

		case "channel":
			presenceData.details = "Viewing channel";
			presenceData.state = document
				.querySelectorAll(".channel-profile")[0]
				.textContent.trim();
			break;

		default:
			clear = true;
			break;
	}

	if (clear) presence.setActivity();
	else presence.setActivity(presenceData);
});
