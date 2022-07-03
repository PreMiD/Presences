const presence = new Presence({
		clientId: "991729654757064774",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/MixQOh3.png",
		startTimestamp: browsingTimestamp,
	};

	switch (document.location.hostname) {
		case "bookwalker.jp": {
			if (document.location.pathname.includes("/category")) {
				presenceData.details = "Browsing category:";
				presenceData.state = `${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.location.pathname.includes("/series")) {
				presenceData.details = "Viewing series:";
				presenceData.state = `${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.location.pathname.includes("/search")) {
				presenceData.details = "Browsing search results for:";
				presenceData.state = `${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.querySelector(".p-main__title")) {
				presenceData.details = "Viewing:";
				presenceData.state = `${
					document.querySelector(".p-main__title").textContent
				}`;
			} else if (document.location.pathname.includes("/new"))
				presenceData.details = "Browsing newly added";
			else if (document.location.pathname.includes("/schedule"))
				presenceData.details = "Viewing release schedule";
			else if (document.location.pathname.includes("/holdBooks"))
				presenceData.details = "Viewing library";
			else presenceData.details = "Browsing";
			break;
		}
		case "global.bookwalker.jp": {
			if (document.location.pathname.includes("/categories")) {
				presenceData.details = "Browsing category:";
				presenceData.state = `${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.location.pathname.includes("/series")) {
				presenceData.details = "Viewing series:";
				presenceData.state = `${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.location.pathname.includes("/search")) {
				presenceData.details = "Browsing search results for:";
				presenceData.state = `${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.querySelector("h1[itemProp='name']")) {
				presenceData.details = "Viewing:";
				presenceData.state = `${
					document.querySelector("h1[itemProp='name']").textContent
				}`;
			} else if (document.location.pathname.includes("/holdBooks"))
				presenceData.details = "Viewing library";
			else if (document.location.pathname.includes("/release-schedule"))
				presenceData.details = "Viewing release schedule";
			else if (document.location.pathname.includes("/new"))
				presenceData.details = "Browsing newly added";
			else if (document.location.pathname.includes("/pre-order"))
				presenceData.details = "Browsing pre-orders";
			else presenceData.details = "Browsing";
			break;
		}
		case "viewer.bookwalker.jp": {
			presenceData.details = "Reading:";
			presenceData.state = `${document.title}`;
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
