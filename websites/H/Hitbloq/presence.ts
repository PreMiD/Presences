const presence = new Presence({
		clientId: "939893060672827402",
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
	const [time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/BtSGm7r.png",
			startTimestamp: browsingTimestamp,
		};
	presenceData.details = document.location.pathname.split("/")[1];
	switch (document.location.pathname.split("/")[1]) {
		case "map_pool": {
			presenceData.details = "Viewing map pool";
			presenceData.state = document
				.querySelector<HTMLMetaElement>("[property='og:title']")
				.content.replace(" Map Pool", "");
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
			if (cover) {
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"[property='og:image']"
				).content;
			}
			break;
		}
		case "ladder": {
			presenceData.details = "Viewing ladder";
			presenceData.state = document
				.querySelector<HTMLMetaElement>("[property='og:title']")
				.content.replace(" Ladder", "");
			break;
		}
		case "ranked_list": {
			presenceData.details = "Viewing ranked list";
			presenceData.state = document
				.querySelector<HTMLMetaElement>("[property='og:title']")
				.content.replace(" Ranked List", "");
			break;
		}
		case "user": {
			presenceData.details = `User: ${
				document.querySelector(".player-profile-username > b").textContent
			}`;
			presenceData.state = `Pool: ${
				document.querySelector("title").textContent.split("'s Profile - ")[1]
			}`;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".player-profile-image"
			).src;
			presenceData.buttons = [
				{
					label: "View Profile",
					url: document.location.href,
				},
			];
			break;
		}
		case "leaderboard": {
			presenceData.details =
				document.querySelector(".leaderboard-title").textContent;
			presenceData.state =
				document.querySelector(".leaderboard-data").childNodes[2].textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".leaderboard-cover").src;
			presenceData.buttons = [
				{
					label: "View Page",
					url: document.location.href,
				},
			];
			presenceData.smallImageKey = `${
				document.location.pathname.split("_")[2]
			}${document.location.pathname.split("_")[1]}`;
			let characteristic;
			switch (document.location.pathname.split("_")[2]) {
				case "s": {
					characteristic = "Standard";
					break;
				}
				case "sll": {
					characteristic = "Lawless";
					break;
				}
				case "s90": {
					characteristic = "90 Degree";
					break;
				}
				case "s360": {
					characteristic = "360 Degree";
					break;
				}
				case "s1s": {
					characteristic = "One Saber";
					break;
				}
				case "sna": {
					characteristic = "No Arrows";
					break;
				}
			}
			let difficulty;
			switch (document.location.pathname.split("_")[1]) {
				case "e": {
					difficulty = "Easy";
					break;
				}
				case "n": {
					difficulty = "Normal";
					break;
				}
				case "h": {
					difficulty = "Hard";
					break;
				}
				case "ex": {
					difficulty = "Expert";
					break;
				}
				case "ep": {
					difficulty = "Expert+";
					break;
				}
			}
			presenceData.smallImageText = `${characteristic} ${difficulty}`;
			break;
		}
		case "map_pools": {
			presenceData.details = "Browsing map pools";
			break;
		}
		case "about": {
			presenceData.details = "Viewing the about page";
			break;
		}
		case "contact": {
			presenceData.details = "Viewing the contact page";
			break;
		}
		case "actions": {
			presenceData.details = "Viewing the action queue";
			break;
		}
		case "add_user": {
			presenceData.details = "Adding user";
			break;
		}
		case "": {
			presenceData.details = "Viewing the home page";
			break;
		}
	}

	if (!time) delete presenceData.startTimestamp;

	if (!buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
