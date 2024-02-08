const presence = new Presence({
		clientId: "918337184929546322",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/0.png",
	Employees = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/1.png",
	Gearbuilder = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/2.png",
	Guide = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/3.png",
	Tierlist = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/4.png",
	Operators = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/5.png",
	Ships = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/6.png",
	Upcoming = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/7.png",
	Skins = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/8.png",
	Stats = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/9.png",
	Blogs = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/10.png",
	Shipbg = "https://cdn.rcd.gg/PreMiD/websites/P/Prydwen%20Institute/assets/11.png",
}

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
		},
		[shortTitle] = document.title.split(/[|/]/, 1);

	if (document.location.pathname === "/employees") {
		presenceData.details = "Viewing employees";
		presenceData.largeImageKey = Assets.Ships;
		presenceData.smallImageKey = Assets.Employees;
		presenceData.smallImageText = "Viewing employees";
	} else if (document.location.pathname.startsWith("/employees")) {
		presenceData.details = "Looking into an employee's profile";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = Assets.Ships;
		presenceData.smallImageText = "Prydwen Institute";
		presenceData.buttons = [{ label: "View Employee", url: document.URL }];
	} else if (document.location.pathname === "/operators") {
		presenceData.details = "Viewing operators";
		presenceData.largeImageKey = Assets.Ships;
		presenceData.smallImageKey = Assets.Operators;
		presenceData.smallImageText = "Viewing operators";
	} else if (document.location.pathname.startsWith("/operators")) {
		presenceData.details = "Looking into an operator's profile";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div.unit-page.operator > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = Assets.Ships;
		presenceData.smallImageText = "Prydwen Institute";
		presenceData.buttons = [{ label: "View Operator", url: document.URL }];
	} else if (document.location.pathname === "/ships") {
		presenceData.details = "Viewing ships";
		presenceData.largeImageKey = Assets.Ships;
		presenceData.smallImageKey = Assets.Ships;
		presenceData.smallImageText = "Viewing ships";
	} else if (document.location.pathname.startsWith("/ships")) {
		presenceData.details = "Viewing a ship";
		presenceData.state = shortTitle;
		presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
			"#gatsby-focus-wrapper > div > main > div > div > div.unit-page.ship > div.unit-header.align-items-center.d-flex.flex-wrap > div:nth-child(1) > span > a > div > div > picture > img"
		).src;
		presenceData.smallImageKey = Assets.Ships;
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
		presenceData.largeImageKey = Assets.Ships;
		presenceData.smallImageKey = Assets.Skins;
		presenceData.smallImageText = "Viewing skins";
	} else {
		switch (document.location.pathname) {
			case "/skins": {
				presenceData.details = "Viewing skins";
				presenceData.largeImageKey = Assets.Ships;
				presenceData.smallImageKey = Assets.Skins;
				presenceData.smallImageText = "Viewing skins";

				break;
			}
			case "/stats": {
				presenceData.details = "Viewing stats";
				presenceData.largeImageKey = Assets.Ships;
				presenceData.smallImageKey = Assets.Stats;
				presenceData.smallImageText = "Viewing stats";

				break;
			}
			case "/tier-list": {
				presenceData.details = "Viewing the tier list";
				presenceData.largeImageKey = Assets.Ships;
				presenceData.smallImageKey = Assets.Tierlist;
				presenceData.smallImageText = "Viewing tier list";

				break;
			}
			case "/guides": {
				presenceData.details = "Finding guides";
				presenceData.largeImageKey = Assets.Ships;
				presenceData.smallImageKey = Assets.Guide;
				presenceData.smallImageText = "Viewing guides";

				break;
			}
			default:
				if (document.location.pathname.startsWith("/guides")) {
					presenceData.details = "Reading a guide:";
					presenceData.state = shortTitle;
					presenceData.largeImageKey = Assets.Guide;
					presenceData.smallImageKey = Assets.Ships;
					presenceData.smallImageText = "Prydwen Institute";
					presenceData.buttons = [{ label: "Read Guide", url: document.URL }];
				} else if (document.location.pathname === "/blog") {
					presenceData.details = "Finding blogs";
					presenceData.largeImageKey = Assets.Ships;
					presenceData.smallImageKey = Assets.Blogs;
					presenceData.smallImageText = "Viewing blogs";
				} else if (document.location.pathname.startsWith("/blog")) {
					presenceData.details = "Reading a blog:";
					presenceData.state = shortTitle;
					presenceData.largeImageKey = Assets.Blogs;
					presenceData.smallImageKey = Assets.Ships;
					presenceData.smallImageText = "Prydwen Institute";
					presenceData.buttons = [{ label: "Read Blog", url: document.URL }];
				} else if (document.location.href.includes("gear-builder")) {
					presenceData.details = "Making a Gear Builder template";
					presenceData.largeImageKey = Assets.Ships;
					presenceData.smallImageKey = Assets.Gearbuilder;
					presenceData.smallImageText = "Gear building";
				} else if (document.location.href === "https://www.prydwen.co/") {
					presenceData.details = "Viewing home page";
					presenceData.largeImageKey = Assets.Ships;
				} else {
					presenceData.details = "Browsing the wiki";
					presenceData.largeImageKey = Assets.Ships;
				}
		}
	}
	presence.setActivity(presenceData);
});
