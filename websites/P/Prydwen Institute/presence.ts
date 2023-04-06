const presence = new Presence({
		clientId: "918337184929546322",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		[shortTitle] = document.title.split(/[|/]/, 1);

	if (document.location.pathname === "/employees") {
		presenceData.details = "Viewing employees";
		presenceData.largeImageKey = "ships";
		presenceData.smallImageKey = "employees";
		presenceData.smallImageText = "Viewing employees";
	} else if (document.location.pathname.startsWith("/employees")) {
		presenceData.details = "Looking into an employee's profile";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = "ships";
		presenceData.smallImageText = "Prydwen Institute";
		presenceData.buttons = [{ label: "View Employee", url: document.URL }];
	} else if (document.location.pathname === "/operators") {
		presenceData.details = "Viewing operators";
		presenceData.largeImageKey = "ships";
		presenceData.smallImageKey = "operators";
		presenceData.smallImageText = "Viewing operators";
	} else if (document.location.pathname.startsWith("/operators")) {
		presenceData.details = "Looking into an operator's profile";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div.unit-page.operator > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = "ships";
		presenceData.smallImageText = "Prydwen Institute";
		presenceData.buttons = [{ label: "View Operator", url: document.URL }];
	} else if (document.location.pathname === "/ships") {
		presenceData.details = "Viewing ships";
		presenceData.largeImageKey = "ships";
		presenceData.smallImageKey = "ships";
		presenceData.smallImageText = "Viewing ships";
	} else if (document.location.pathname.startsWith("/ships")) {
		presenceData.details = "Viewing a ship";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div.unit-page.ship > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = "ships";
		presenceData.smallImageText = "Viewing ships";
		presenceData.buttons = [{ label: "View Ship", url: document.URL }];
	} else if (
		document.querySelector("body > div.fade.modal-backdrop.show") &&
		document.location.href.includes("skins")
	) {
		presenceData.details = "Viewing skin";
		presenceData.state = document
			.querySelector(
				"body > div.fade.skin-viewer.modal.show > div > div > div.modal-body > div.details > div.name"
			)
			.textContent.substring(
				0,
				document
					.querySelector(
						"body > div.fade.skin-viewer.modal.show > div > div > div.modal-body > div.details > div.name"
					)
					.textContent.lastIndexOf("-") - 1
			);
		presenceData.largeImageKey = "ships";
		presenceData.smallImageKey = "skins";
		presenceData.smallImageText = "Viewing skins";
	} else {
		switch (document.location.pathname) {
			case "/skins": {
				presenceData.details = "Viewing skins";
				presenceData.largeImageKey = "ships";
				presenceData.smallImageKey = "skins";
				presenceData.smallImageText = "Viewing skins";

				break;
			}
			case "/stats": {
				presenceData.details = "Viewing stats";
				presenceData.largeImageKey = "ships";
				presenceData.smallImageKey = "stats";
				presenceData.smallImageText = "Viewing stats";

				break;
			}
			case "/tier-list": {
				presenceData.details = "Viewing the tier list";
				presenceData.largeImageKey = "ships";
				presenceData.smallImageKey = "tierlist";
				presenceData.smallImageText = "Viewing tier list";

				break;
			}
			case "/guides": {
				presenceData.details = "Finding guides";
				presenceData.largeImageKey = "ships";
				presenceData.smallImageKey = "guide";
				presenceData.smallImageText = "Viewing guides";

				break;
			}
			default:
				if (document.location.pathname.startsWith("/guides")) {
					presenceData.details = "Reading a guide:";
					presenceData.state = shortTitle;
					presenceData.largeImageKey = "guide";
					presenceData.smallImageKey = "ships";
					presenceData.smallImageText = "Prydwen Institute";
					presenceData.buttons = [{ label: "Read Guide", url: document.URL }];
				} else if (document.location.pathname === "/blog") {
					presenceData.details = "Finding blogs";
					presenceData.largeImageKey = "ships";
					presenceData.smallImageKey = "blogs";
					presenceData.smallImageText = "Viewing blogs";
				} else if (document.location.pathname.startsWith("/blog")) {
					presenceData.details = "Reading a blog:";
					presenceData.state = shortTitle;
					presenceData.largeImageKey = "blogs";
					presenceData.smallImageKey = "ships";
					presenceData.smallImageText = "Prydwen Institute";
					presenceData.buttons = [{ label: "Read Blog", url: document.URL }];
				} else if (document.location.href.includes("gear-builder")) {
					presenceData.details = "Making a Gear Builder template";
					presenceData.largeImageKey = "ships";
					presenceData.smallImageKey = "gearbuilder";
					presenceData.smallImageText = "Gear building";
				} else if (document.location.href === "https://www.prydwen.co/") {
					presenceData.details = "Viewing home page";
					presenceData.largeImageKey = "ships";
				} else {
					presenceData.details = "Browsing the wiki";
					presenceData.largeImageKey = "ships";
				}
		}
	}
	presence.setActivity(presenceData);
});
