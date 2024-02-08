const presence = new Presence({
		clientId: "939893060672827402",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

	const assets = {
		"s90e": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867125006379.png?size=512",
		"s360h": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867141787648.png?size=512",
		"s360e": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867221463140.png?size=512",
		"s90n": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867271794728.png?size=512",
		"s90ex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867288567808.png?size=512",
		"s1sh": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867351498773.png?size=512",
		"s1sn": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867426992208.png?size=512",
		"s1se": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867452162110.png?size=512",
		"snan": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867510886531.png?size=512",
		"sn": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867527663617.png?size=512",
		"s1sex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867573800980.png?size=512",
		"snaex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867607335083.png?size=512",
		"snae": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867615735839.png?size=512",
		"s360ex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867624124427.png?size=512",
		"sllex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867666055271.png?size=512",
		"sep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867666071581.png?size=512",
		"s1sep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867703804005.png?size=512",
		"sllep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867741556807.png?size=512",
		"s360ep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867749945485.png?size=512",
		"sllh": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867758338140.png?size=512",
		"se": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867783503952.png?size=512",
		"snaep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867787690155.png?size=512",
		"sex": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867787698257.png?size=512",
		"slle": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867821248532.png?size=512",
		"snah": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867842224148.png?size=512",
		"sh": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867955466240.png?size=512",
		"s90h": "https://cdn.discordapp.com/app-assets/939893060672827402/998651867984838686.png?size=512",
		"slln": "https://cdn.discordapp.com/app-assets/939893060672827402/998651868114845766.png?size=512",
		"s360n": "https://cdn.discordapp.com/app-assets/939893060672827402/998651868215513209.png?size=512",
		"s90ep": "https://cdn.discordapp.com/app-assets/939893060672827402/998651869478015037.png?size=512",
	}

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
			presenceData.smallImageKey = assets[`${
				document.location.pathname.split("_")[2]
			}${document.location.pathname.split("_")[1]}` as keyof typeof assets];
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
