const presence = new Presence({
	clientId: "635876670146084880",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/pEYBPbO.png",
		},
		q = new URLSearchParams(window.location.search);

	if (window.location.href.includes("gdbrowser.com")) {
		if (
			(window.location.pathname.toLowerCase() !== "/" &&
				window.location.pathname.toLowerCase() === "/daily") ||
			window.location.pathname.toLowerCase() === "/weekly"
		) {
			presenceData.state = `🔽 ${
				document.querySelectorAll(".inline.smaller.spaced")[0].textContent
			} | 👍 ${document.querySelectorAll(".inline.smaller.spaced")[1]} | 🔵 ${
				document.querySelectorAll(".orbs")[1].textContent
			}`;
			presenceData.details = `${
				document.querySelectorAll("h1")[0].textContent
			} ${document.querySelector("#authorLink").textContent}`;
			presenceData.smallImageKey = `diff_${document
				.querySelector("#difficultytext")
				.textContent.toLowerCase()
				.replace("<br>", "_")}`;
			presenceData.smallImageText = `${document
				.querySelector("#difficultytext")
				.textContent.replace("<br>", " ")}`;
		}

		// Homepage
		if (window.location.pathname.toLowerCase() === "/") {
			if (
				document.querySelector<HTMLElement>("#credits").style.display ===
				"block"
			) {
				presenceData.details = "Viewing the credits";
				presenceData.state = "❤";
			} else presenceData.details = "Viewing the homepage";
		}

		// other stuff
		if (window.location.pathname.toLowerCase() === "/iconkit")
			presenceData.details = "In the iconkit";

		if (window.location.pathname.toLowerCase().includes("/search")) {
			if (window.location.pathname.toLowerCase() === "/search")
				presenceData.details = "Searching for levels";
			else {
				presenceData.details = "Searching for levels";

				if (parseInt(q.get("mappack")) === 1)
					presenceData.state = "Viewing a map pack";

				switch (q.get("type")) {
					case "recent":
						presenceData.state = "🕒 Viewing recent levels";
						break;
					case "mostdownloaded":
						presenceData.state = "🔽 Viewing top downloaded levels";
						break;
					case "mostliked":
						presenceData.state = "👍 Viewing top liked levels";
						break;
					case "trending":
						presenceData.state = "📈 Viewing trending levels";
						break;
					case "magic":
						presenceData.state = "✨ Viewing magic levels";
						break;
					case "awarded":
						presenceData.state = "⭐ Viewing awarded levels";
						break;
					case "featured":
						presenceData.state = "⭐ Viewing featured levels";
						break;
					case "followed":
						presenceData.state = "💙 Viewing followed levels";
						break;
					default:
						switch (q.get("diff")) {
							case "1":
								presenceData.state = "😄 Viewing Easy levels";
								break;
							case "2":
								presenceData.state = "😃 Viewing Normal levels";
								break;
							case "3":
								presenceData.state = "😅 Viewing Hard levels";
								break;
							case "4":
								presenceData.state = "😐 Viewing Harder levels";
								break;
							case "5":
								presenceData.state = "🙁 Viewing Insane levels";
								break;
							case "-1":
								presenceData.state = "😶 Viewing Unrated levels";
								break;
							case "-2":
								switch (q.get("demonFilter")) {
									case "1":
										presenceData.state = "😠 Viewing Easy Demons";
										break;
									case "2":
										presenceData.state = "😡 Viewing Medium Demons";
										break;
									case "3":
										presenceData.state = "🤬 Viewing Hard Demons";
										break;
									case "4":
										presenceData.state = "😈 Viewing Insane Demons";
										break;
									case "5":
										presenceData.state = "👿 Viewing Extreme Demons";
										break;
								}
								break;
							default:
								presenceData.state = `Searching for ${
									document.querySelector("#header").textContent
								}`;
								break;
						}
				}
			}
		}

		if (window.location.pathname.toLowerCase().includes("/mappacks"))
			presenceData.details = "Viewing the Map Packs";

		if (window.location.pathname.toLowerCase().includes("/gauntlets"))
			presenceData.details = "Viewing the Gauntlets";

		if (window.location.pathname.toLowerCase().includes("/leaderboards"))
			presenceData.details = "Viewing the leaderboards";

		if (window.location.pathname.toLowerCase() === "/messages")
			presenceData.details = "Checking messages";

		if (window.location.pathname.toLowerCase().includes("/profile")) {
			presenceData.details = `Looking at ${
				window.location.href.split("/")[4]
			}'s profile`;
		}

		presence.setActivity(presenceData);
	}
});
