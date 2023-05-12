const presence = new Presence({
		clientId: "812176837748457483",
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

let user;
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/T2WTLEM.jpeg",
		startTimestamp: browsingTimestamp,
	};

	if (
		document.location.pathname === "/" ||
		document.location.pathname === "/index.php" ||
		document.location.pathname === "/fr.php" ||
		document.location.pathname === "/en.php"
	)
		presenceData.details = "Viewing home page";
	else if (document.location.pathname === "/forum.php") {
		presenceData.details = "Viewing the Forum's menu";
		presenceData.smallImageKey = Assets.Search;
		presenceData.buttons = [
			{ label: "View Forum", url: document.location.href },
		];
	}
	const elt = document.querySelector("#compteur0 > div") as HTMLElement;
	if (elt) {
		presenceData.details = `Lap ${elt.textContent.replace(/.+? /g, "")}`;
		presenceData.buttons = [
			{ label: "Play Game", url: "https://mkpc.malahieude.net/mariokart.php" },
		];
		presenceData.smallImageKey = "wheel";
	} else {
		switch (document.location.pathname) {
			case "/mariokart.php": {
				presenceData.details = "browsing map's";
				presenceData.smallImageKey = Assets.Search;

				break;
			}
			case "/category.php": {
				user = document.querySelector("html > body > main > h1");
				presenceData.details = `Viewing the following category: ${user.textContent}`;
				presenceData.smallImageKey = Assets.Search;
				presenceData.buttons = [
					{ label: "View category", url: document.location.href },
				];

				break;
			}
			case "/topic.php": {
				user = document.querySelector("html > body > main > h1");
				presenceData.details = `Viewing: ${user.textContent}`;
				presenceData.smallImageKey = Assets.Search;
				presenceData.buttons = [
					{ label: "View topic", url: document.location.href },
				];

				break;
			}
			case "/ban-player.php":
			case "/admin.php":
			case "doublecomptes.php": {
				presenceData.details = "Viewing staff backend";
				break;
			}
			case "/profil.php": {
				user = document.querySelector(
					"body > main > div > div.profile-summary > h1"
				);
				presenceData.details = `Viewing: ${user.textContent}`;
				presenceData.smallImageKey = Assets.Search;
				presenceData.buttons = [
					{ label: "View profile", url: document.location.href },
				];

				break;
			}
			// No default
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
