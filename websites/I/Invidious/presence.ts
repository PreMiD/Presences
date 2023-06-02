const presence = new Presence({
	clientId: "761617743593209869",
});

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
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/I/Invidious/assets/logo.png",
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
