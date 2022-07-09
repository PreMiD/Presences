const presence = new Presence({
		clientId: "994556598414479370",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let user: HTMLElement,
	title: HTMLElement,
	replace: HTMLElement,
	search: HTMLElement;

presence.on("UpdateData", async () => {
	const sections = [
			"bras",
			"panties",
			"lingerie",
			"sleep",
			"sport",
			"tag",
			"search",
			"account",
			"orders",
			"favourites",
			"offers",
			"secure",
			"login",
		],
		presenceData: PresenceData = {
			largeImageKey: "vs",
			startTimestamp: browsingTimestamp,
		};

	switch (document.location.hostname) {
		case "www.victoriassecret.co.uk":
		case "www.victoriassecret.ie": {
			if (document.location.pathname.includes("/account")) {
				presenceData.details = "Settings:";
				presenceData.state = `${
					document.querySelector("h2").textContent.split("vs")[0]
				}`;
			} else if (document.location.pathname === "/")
				presenceData.details = "Viewing Home Page";
			else if (!sections.includes(document.location.pathname.split("/")[1])) {
				presenceData.details = `Viewing: ${
					document.querySelector("h1").textContent
				}`;
			} else if (document.location.pathname.includes("/offers")) {
				presenceData.details = 'Viewing Offers'
					document.querySelector("h2").textContent

			} else if (document.location.pathname.includes("/favourites")) {
				presenceData.details = 'Viewing Favourites'
					document.querySelector("h2").textContent

			} if (document.location.pathname.includes("/Login")) {
				presenceData.details = 'Logging In'
					document.querySelector("h2").textContent

			} else if (document.location.pathname.includes("/search")) {
				presenceData.details = 'Searching:'
				presenceData.state = `${
					document.querySelector("h1").textContent.split("vs")[0]
				}`;
			} else if (document.location.pathname.includes("/bras")) {
				presenceData.details = 'Viewing: Selection of Bras'
				document.querySelector("h2").textContent
			}
			break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
