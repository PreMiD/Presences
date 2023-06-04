const presence = new Presence({
		clientId: "820023496934817804",
	}),
	pBrowsing = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/F/Font%20Awesome/assets/logo.png",
			startTimestamp: pBrowsing,
		},
		pPage = window.location.pathname;

	if (pPage === "/") {
		presenceData.details = "Browsing Page:";
		presenceData.state = "Main";
	} else if (pPage.includes("/icons")) {
		const myParam: string = new URLSearchParams(window.location.search).get(
			"q"
		);

		if (myParam === null) {
			const icon: HTMLElement = document.querySelector(
				"#page-top > div.view.flex.flex-column.min-vh-100.db-pr > div.flex-grow-1.flex-shrink-0.flex-basis-auto > div > div.ph6-l > div > section > header > div.flex.flex-column.flex-row-xl.items-center-xl.justify-between-xl.mb2.mb4-l > h1 > span"
			);
			if (icon === null) {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Icons";
			} else {
				presenceData.details = "Viewing Icon:";
				presenceData.state = icon.textContent;
				presenceData.buttons = [
					{
						label: "View Icon",
						url: document.URL,
					},
				];
			}
		} else {
			presenceData.details = "Searching:";
			presenceData.state = myParam;
		}
	} else {
		switch (pPage) {
			case "/start": {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Start";

				break;
			}
			case "/support": {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Support";

				break;
			}
			case "/plans": {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Plans";

				break;
			}
			case "/plans/standard": {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Plan Standard";

				break;
			}
			case "/sessions/sign-in": {
				presenceData.details = "Browsing Page:";
				presenceData.state = "Sign In";

				break;
			}
			// No default
		}
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
