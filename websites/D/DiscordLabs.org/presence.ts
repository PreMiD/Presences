const presence = new Presence({
		clientId: "660894911331172372",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let priceEls;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/D/DiscordLabs.org/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.hostname === "bots.discordlabs.org") {
		presenceData.details = "Viewing Page:";
		presenceData.state = "DiscordLabs Bot List";

		if (document.location.pathname.includes("/partners")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Partners";
		} else if (document.location.pathname.includes("/profile/")) {
			priceEls = document.querySelectorAll(".uname");
			for (const priceEl of priceEls) {
				presenceData.details = "Viewing a profile:";
				presenceData.state = (priceEl as HTMLElement).textContent;
			}
		} else if (document.location.pathname.includes("/submit/")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Bot Sumbit";
		} else if (document.location.pathname.includes("/submit")) {
			presenceData.details = "Viewing Page:";
			presenceData.state = "DiscordLabs Bot Sumbit";
		} else if (document.location.pathname.includes("/search/")) {
			presenceData.details = "Search for:";
			presenceData.state = window.location.href
				.slice(39)
				.replaceAll("+|%20", " ");
		} else if (document.location.pathname.includes("/bot/")) {
			priceEls = document.querySelectorAll(".botname");
			for (const priceEl of priceEls) {
				presenceData.details = "Viewing a Discord bot:";
				presenceData.state = (priceEl as HTMLElement).textContent;
			}
		}
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
