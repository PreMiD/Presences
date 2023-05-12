const presence = new Presence({
		clientId: "970659747021877318",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/VD9G5DE.png",
			startTimestamp: browsingTimestamp,
		},
		page = window.location.pathname,
		[privacy, buttons] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]);
	if (privacy) presenceData.details = "Browsing...";
	else if (document.location.hostname.includes("store")) {
		if (document.querySelector("#decus-modal").className.includes("is-open")) {
			presenceData.details = document.querySelector(
				"#decus-modal > div > div > div.modal__header > h4"
			).textContent;
		} else if (page === "/") presenceData.details = "Homepage";
		else if (page.includes("/category/")) {
			const title = document.querySelector(
				"body > div.decus-wrapper > div.body > div.content > div > div.panel-heading"
			)?.textContent;
			if (buttons) {
				presenceData.buttons = [
					{
						label: "View Category",
						url: document.location.href,
					},
				];
			}
			presenceData.details = document
				.querySelector("[class='dropdown active']")
				.textContent.replace(title, "");
			presenceData.state = `${title} Category`;
		}
	} else if (document.location.hostname.includes("install")) {
		presenceData.details = "Reading:";
		presenceData.state = "Pixelmon Download & Installation Guide";
		presenceData.smallImageKey = Assets.Reading;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
