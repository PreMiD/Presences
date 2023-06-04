const presence = new Presence({
		clientId: "656152542429839380",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/A/Altdentifier/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "altdentifier.com") {
		if (document.location.pathname.includes("/dashboard")) {
			presenceData.details = "Viewing a servers";
			if (document.location.pathname.includes("/dashboard/")) {
				presenceData.details = "Managing the settings of";
				presenceData.state = `server: ${document
					.querySelector("#body > h1")
					.textContent.replace("Managing ", "")}`;
			}
		} else if (document.location.pathname.includes("/blog")) {
			presenceData.details = "Reading a blog";
			presenceData.smallImageKey = Assets.Reading;
			if (document.location.pathname.includes("/blog/")) {
				presenceData.details = "Reading a blog article:";
				presenceData.state = document
					.querySelector("body > h1")
					.textContent.toUpperCase();
				presenceData.smallImageKey = Assets.Reading;
			}
		} else if (document.location.pathname.includes("/faq")) {
			presenceData.details = "Reading a FAQ";
			presenceData.smallImageKey = Assets.Reading;
		} else if (document.location.pathname.includes("/commands")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Commands";
		} else if (document.location.pathname.includes("/status")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Status";
		} else if (document.location.pathname.includes("/about")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "About";
		} else if (document.location.pathname.includes("/premium")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Premium";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
