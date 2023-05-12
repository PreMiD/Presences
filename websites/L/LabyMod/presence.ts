const presence = new Presence({
		clientId: "729035228324298852", // CLIENT ID FOR YOUR PRESENCE
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

let item: HTMLElement, user: HTMLElement, title: HTMLElement | string | Element;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/PHdC5bf.png",
		startTimestamp: browsingTimestamp,
	};
	switch (document.location.hostname) {
		case "www.labymod.net": {
			if (document.location.pathname.includes("/download")) {
				presenceData.details = "Viewing downloads";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/ideas")) {
				presenceData.details = "Ideas, Browsing...";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/idea")) {
				item = document.querySelector(
					"#content > div > div:nth-child(1) > div > div:nth-child(2) > h3 > label"
				);
				title = document.querySelector<HTMLElement>(
					"#content > div > div:nth-child(1) > div > div:nth-child(2) > h3"
				);
				if (item) title = title.textContent.replace(item.textContent, "");
				else title = title.textContent;

				presenceData.details = "Ideas, Viewing:";
				presenceData.state = title;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/shop")) {
				title = document.querySelector(
					"#variSection > div.contentWrapper > article.selectedProduct > table > tbody > tr > td:nth-child(2) > h3"
				);
				user = document.querySelector("#renderoverlay");
				if ((user as HTMLImageElement).width === 1) {
					presenceData.details = "Shop, Ordering...";
					delete presenceData.state;

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				} else {
					presenceData.details = "Shop, Viewing:";
					presenceData.state = (title as HTMLElement).textContent.replace(
						"LABYMOD",
						""
					);

					delete presenceData.smallImageKey;

					presence.setActivity(presenceData);
				}
			} else if (document.location.pathname.includes("/dashboard")) {
				presenceData.details = "Viewing their dashboard";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/coins")) {
				presenceData.details = "Viewing their coins";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/impressum")) {
				presenceData.details = "Viewing impressum";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/datenschutz")) {
				presenceData.details = "Viewing datenschutz";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else if (document.location.pathname.includes("/tsverify")) {
				presenceData.details = "Verify-ing their TeamSpeak";
				delete presenceData.state;

				delete presenceData.smallImageKey;

				presence.setActivity(presenceData);
			} else presence.setActivity();

			break;
		}
		case "faq.labymod.net": {
			presenceData.details = "Viewing frequently";
			presenceData.state = "asked questions";

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		case "apply.labymod.net": {
			presenceData.details = "Viewing Jobs";
			delete presenceData.state;

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		case "docs.labymod.net": {
			title = document.querySelector(
				"body > div > main > div > div.md-content > article > h1"
			);
			user = document.querySelector(
				"body > div > main > div > div.md-sidebar.md-sidebar--primary > div > div > nav > ul > li.md-nav__item.md-nav__item--active.md-nav__item--nested > label"
			);
			title = `${user.textContent} - ${(title as HTMLElement).textContent}`;
			presenceData.details = "Docs viewing:";
			presenceData.state = title;

			delete presenceData.smallImageKey;

			presence.setActivity(presenceData);

			break;
		}
		case "translate.labymod.net": {
			presenceData.details = "Translate site";
			if (document.location.pathname.includes("/users.php")) {
				presenceData.state = "Watching Users";
				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/log.php")) {
				presenceData.state = "Watching Log";
				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/errors.php")) {
				presenceData.state = "Watching Errors";
				delete presenceData.smallImageKey;
			} else if (document.location.pathname.includes("/translate/")) {
				let lang = null;
				if (document.URL.includes("?project=website")) {
					lang = document.URL.replace(
						"https://translate.labymod.net/translate/?project=website&lang=",
						""
					);
					if (document.URL.includes("#")) [lang] = lang.split("#");

					presenceData.smallImageKey = lang.toLowerCase();
					presenceData.state = "Translating Website";
				} else if (document.URL.includes("?project=notification")) {
					lang = document.URL.replace(
						"https://translate.labymod.net/translate/?project=website&lang=",
						""
					);
					if (document.URL.includes("#")) [lang] = lang.split("#");

					presenceData.smallImageKey = lang.toLowerCase();
					presenceData.state = "Translating Notification";
				} else if (document.URL.includes("?project=client")) {
					lang = document.URL.replace(
						"https://translate.labymod.net/translate/?project=website&lang=",
						""
					);
					if (document.URL.includes("#")) [lang] = lang.split("#");

					presenceData.smallImageKey = lang.toLowerCase();
					presenceData.state = "Translating Client";
				}
			} else {
				presenceData.state = "On the Main page";
				delete presenceData.smallImageKey;
			}
			presence.setActivity(presenceData);

			break;
		}
		default:
			presence.setActivity();
	}
});
