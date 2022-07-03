const presence = new Presence({ clientId: "991729654757064774" });

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://pool.img.aptoide.com/split-store/85a754bbbfb92ee17701c03ad287ea68_icon.png",
		startTimestamp: Math.floor(Date.now() / 1000),
	};

	switch (document.location.hostname) {
		case "bookwalker.jp": {
			if (document.location.pathname.includes("/category")) {
				presenceData.details = `Browsing category: ${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.location.pathname.includes("/series")) {
				presenceData.details = `Viewing series: ${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.location.pathname.includes("/search")) {
				presenceData.details = `Browsing search results for: ${
					document.querySelector(".o-contents-section__title").textContent
				}`;
			} else if (document.location.pathname.includes("/new"))
				presenceData.details = "Browsing newly added";
			else if (document.location.pathname.includes("/schedule"))
				presenceData.details = "Viewing release schedule";
			else if (document.location.pathname.includes("/holdBooks"))
				presenceData.details = "Viewing library";
			else if (document.querySelector(".p-main__title")) {
				presenceData.details = `Viewing: ${
					document.querySelector(".p-main__title").textContent
				}`;
			} else presenceData.details = "Browsing";

			break;
		}
		case "global.bookwalker.jp": {
			if (document.location.pathname.includes("/categories")) {
				presenceData.details = `Browsing category: ${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.location.pathname.includes("/series")) {
				presenceData.details = `Viewing series: ${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.location.pathname.includes("/search")) {
				presenceData.details = `Browsing search results for: ${
					document.querySelector(".title-main-inner").textContent
				}`;
			} else if (document.location.pathname.includes("/holdBooks"))
				presenceData.details = "Viewing library";
			else if (document.location.pathname.includes("/release-schedule"))
				presenceData.details = "Viewing release schedule";
			else if (document.location.pathname.includes("/new"))
				presenceData.details = "Browsing newly added";
			else if (document.location.pathname.includes("/pre-order"))
				presenceData.details = "Browsing pre-orders";
			else if (document.querySelector("h1[itemProp='name']")) {
				presenceData.details = `Viewing: ${
					document.querySelector("h1[itemProp='name']").textContent
				}`;
			} else presenceData.details = "Browsing";

			break;
		}
		case "viewer.bookwalker.jp": {
			presenceData.details = `Reading: ${document.title}`;
			break;
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
