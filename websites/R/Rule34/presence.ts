const presence = new Presence({
	clientId: "619967690056007699",
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

presence.on("UpdateData", async () => {
	const urlParams = new URLSearchParams(window.location.search),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/3jHxZJW.png",
		};
	if (document.location.href.includes("rule34.xxx")) {
		if (document.location.pathname === "/")
			presenceData.details = "Viewing the homepage...";
		else if (
			urlParams.get("page") &&
			urlParams.get("s") &&
			urlParams.get("page") === "post"
		) {
			if (urlParams.get("s") === "list") {
				if (urlParams.get("tags")) {
					presenceData.details = "Searching...";
					presenceData.state = urlParams.get("tags").replace(" ", ", ");
				} else presenceData.details = "Viewing Posts List...";
			} else if (urlParams.get("s") === "view" && urlParams.get("id")) {
				presenceData.details = "Viewing a Post...";
				presenceData.state = `Post ${urlParams.get("id")}`;
			}
		}
	} else if (document.location.href.includes("rule34.paheal.net")) {
		const path = document.location.pathname.split("/");
		if (document.location.pathname === "/")
			presenceData.details = "Viewing the homepage...";
		else if (path[1] === "post") {
			if (path[2] === "list" && path.length === 3)
				presenceData.details = "Viewing Posts List...";
			else if (path[2] === "list" && path.length > 3) {
				presenceData.details = "Searching...";
				presenceData.state = path[3].replace("%20", ", ").replace("%21", "!");
			} else if (path[2] === "view") {
				presenceData.details = "Viewing a post...";
				presenceData.state = `Post ${path[3]}`;
			}
		}
	}
	presence.setActivity(presenceData);
});
