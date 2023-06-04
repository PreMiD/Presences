const presence = new Presence({
		clientId: "939893060672827402",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [time, buttons, cover] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
		]),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/H/Hitbloq/assets/logo.png",
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
