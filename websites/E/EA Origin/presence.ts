const presence = new Presence({
		clientId: "897489206199324713",
	}),
	browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [time, buttons, cover, welcome] = await Promise.all([
			presence.getSetting<boolean>("time"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("cover"),
			presence.getSetting<boolean>("welcome"),
		]),
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingStamp,
		};

	switch (document.location.pathname.split("/")[3]) {
		case "my-home":
			presenceData.details = "Viewing Home Page";
			if (welcome) {
				presenceData.state = document.querySelector(
					".otktitle-page.origin-welcome-message"
				).textContent;
			}
			break;
		case "game-library":
			presenceData.details = "Viewing Game Library";
			if (
				document.querySelector(
					"[class^='otktitle-2 otktitle-2-caps origin-ogd-gametitle']"
				)
			) {
				presenceData.state = document.querySelector(
					"[class^='otktitle-2 otktitle-2-caps origin-ogd-gametitle']"
				).textContent;
				if (cover) {
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						`img[alt="${
							document.querySelector(
								'[class^="otktitle-2 otktitle-2-caps origin-ogd-gametitle"]'
							).textContent
						}"]`
					).src;
				}
			}
			break;
		case "profile":
			if (document.location.pathname.includes("/user/")) {
				presenceData.details = `Viewing ${
					document.querySelector(
						".otktitle-page.origin-profile-header-username"
					).textContent
				}'s Profile`;
				presenceData.state = `Viewing Their ${
					document.querySelector(".otkpill.otkpill-active").firstElementChild
						.textContent
				}`;
			} else {
				presenceData.details = "Viewing Profile";
				presenceData.state = `Viewing Their ${
					document.querySelector(".otkpill.otkpill-active").firstElementChild
						.textContent
				}`;
			}
			break;
		case "store":
			presenceData.details = "Browsing Store";
			if (
				document.querySelector("h1.otktitle-2.origin-store-browse-pagetitle")
			) {
				presenceData.state = document
					.querySelector("h1.otktitle-2.origin-store-browse-pagetitle")
					.textContent.replace("Browse", "")
					.replace(" - ", "");
			}
			if (document.querySelector(".otkex-product-hero-logo")) {
				presenceData.state = document.querySelector<HTMLImageElement>(
					".otkex-product-hero-logo"
				).alt;
				presenceData.buttons = [
					{
						label: "View Page",
						url: document.location.href,
					},
				];
				if (cover) {
					presenceData.largeImageKey = (
						document.querySelector("div[class='store-pdp-nav-mini-poster']")
							.firstChild as HTMLImageElement
					).src;
				}
			}
			break;
		case "search":
			presenceData.details = "Searching";
			presenceData.state =
				document.querySelector<HTMLInputElement>(".ng-not-empty").value;
			break;
		default:
			presenceData.details = "Unsupported Page";
			presenceData.state = document.location.pathname.split("/")[3];
	}

	if (!time) delete presenceData.startTimestamp;
	if (!buttons && presenceData.buttons) delete presenceData.buttons;

	presence.setActivity(presenceData);
});
