const presence = new Presence({
		clientId: "911546577485725706",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
	

const enum Assets {
	Logo = "https://cdn.solo.to/user/a/63654eae75b1e7_99721437.gif",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: Assets.Logo,
		startTimestamp: browsingTimestamp,
	};
	const privacy = await presence.getSetting<boolean>("privacy");

	if (document.location.pathname.includes("/earn/summary")) {
		presenceData.details = "In Summary";
		presenceData.state = "Balance: " + document.querySelector(".c0116").textContent;
		if (privacy) {
			presenceData.state = "";
		}
	}
	else if (document.location.pathname.includes("/account/")) {
		presenceData.details = "In Summary";
		if (document.location.pathname.endsWith("/summary")) {
			presenceData.state = "Managing Account";
		}
		else if (document.location.pathname.endsWith("/referrals")) {
			presenceData.state = "Referrals";
		}
		else if (document.location.pathname.endsWith("/bonuses")) {
			presenceData.state = "Bonuses";
		}
	}
	else if (document.location.pathname.includes("/rewards/")) {
		presenceData.details = "In Store";
		presenceData.state = "Viewing " + document.title.split("|")[0].trim();
		presenceData.smallImageKey = Assets.Viewing;
	}
	else if (document.location.pathname.endsWith("/store")) {
		presenceData.details = "In Store";
		presenceData.state = "Browisng...";
		presenceData.smallImageKey = Assets.Search;
	}
	else if (document.location.pathname.endsWith("/download")) {
		presenceData.details = "Downloading Salad";
	}
	else if (document.location.pathname.includes("/search")) {
		presenceData.details = "In Store";
		presenceData.state = "Searching for " + (document.documentURI.split("?q=")[1]).split("&")[0].trim();
		presenceData.smallImageKey = Assets.Search;
	}
	else if (document.location.pathname.endsWith("/vault")) {
		presenceData.details = "In Vault";
	}
	else if (document.location.hostname.startsWith("support")) {
		presenceData.details = "In Support";
		presenceData.state = "Home";
		if (document.location.pathname.includes("troubleshooting")) {
			presenceData.details = "In Support";
			presenceData.state = "Troubleshooting";
		}
		else if (document.location.pathname.includes("app-guides")) {
			presenceData.details = "In Support";
			presenceData.state = "App Guides";
		}
		else if (document.location.pathname.includes("faq")) {
			presenceData.details = "In Support";
			presenceData.state = "FAQ";
		}
		else if (document.location.pathname.includes("company")) {
			presenceData.details = "In Support";
			presenceData.state = "Company";
		}

		if (document.location.pathname.includes("article")) {
			presenceData.details = "In Articles";
			presenceData.state = document.title.split("- Salad Support")[0].trim();
			presenceData.smallImageKey = Assets.Reading;
		}
		else if (document.location.pathname.includes("category")) {
			presenceData.details = "In Article Categories";
			presenceData.state = document.title.split("- Salad Support")[0].trim();
			presenceData.smallImageKey = Assets.Search;
		}
	}
	else if (document.location.hostname.startsWith("community")) {
		presenceData.details = "In Community";
		presenceData.state = "Browsing...";
		presenceData.smallImageKey = Assets.Search;
		if (document.location.pathname.includes("-")) {
			presenceData.details = "In Community";
			presenceData.state = document.title.split("- Salad Chef Community")[0].trim();
			presenceData.smallImageKey = Assets.Reading;
		}
	}
	presence.setActivity(presenceData);
});
