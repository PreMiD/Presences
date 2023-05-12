const presence = new Presence({
		clientId: "836662139926216724",
	}),
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

presence.on("UpdateData", async () => {
	const entries = await presence.getSetting<boolean>("entries"),
		buttons = await presence.getSetting<boolean>("buttons"),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/E8zTeX8.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search } = document.location;
	if (pathname === "/") presenceData.details = "Viewing the Homepage";
	else if (
		pathname === "/search/" &&
		window.location.search.substr(0, 1) === "?"
	) {
		presenceData.details = "Searching: ";
		presenceData.state = new URLSearchParams(search).get("name");
		presenceData.smallImageKey = Assets.Search;
	} else if (pathname === "/directory/" || pathname === "/search/")
		presenceData.details = "Browsing all manga";
	else if (pathname === "/discussion/")
		presenceData.details = "Viewing discussion page";
	else if (pathname.endsWith("post.php")) {
		presenceData.details = `Discussion: ${
			document.querySelector(".BoxBody > h1").textContent
		}`;
		presenceData.state = `by ${
			document.querySelector(".Description > span").textContent
		}`;
		presenceData.buttons = [
			{ label: "View discussion", url: window.location.href },
		];
	} else if (pathname.endsWith("/subscription.php")) {
		presenceData.details = "Viewing subscriptions";
		if (entries) {
			presenceData.state = `${document
				.querySelector(".BoxHeader > span")
				.textContent.replace("(", "")
				.replace(")", "")} entries`;
		}
	} else if (pathname.endsWith("/bookmark.php")) {
		presenceData.details = "Viewing bookmark";
		if (entries) {
			presenceData.state = `${document
				.querySelector(".BoxHeader > span")
				.textContent.replace("(", "")
				.replace(")", "")} entries`;
		}
	} else if (pathname.endsWith("/settings.php"))
		presenceData.details = "Viewing settings";
	else if (pathname.startsWith("/manga/")) {
		presenceData.details = "Viewing manga:";
		presenceData.state = document.querySelector(
			".list-group-item > h1"
		).textContent;
		presenceData.smallImageKey = "view";
		if (buttons) {
			presenceData.buttons = [
				{ label: "View manga", url: window.location.href },
			];
		}
	} else if (pathname.startsWith("/read-online/")) {
		const page = document.querySelector('button[data-target="#PageModal"]');

		presenceData.details = document
			.querySelector(".col-lg-4 > a")
			.textContent.trim();
		presenceData.state = `📖 Ch. ${document
			.querySelector('button[data-target="#ChapterModal"]')
			.textContent.trim()
			.split(" ")
			.pop()}${page ? ` 📄 ${page.textContent.trim().split(" ").pop()}` : ""}`;
		presenceData.smallImageKey = Assets.Reading;
		if (buttons) {
			presenceData.buttons = [
				{ label: "View manga", url: window.location.href },
			];
		}
	}
	presence.setActivity(presenceData);
});
