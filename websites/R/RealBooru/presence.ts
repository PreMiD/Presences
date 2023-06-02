const presence = new Presence({
	clientId: "620304668710535207",
});

presence.on("UpdateData", () => {
	const urlParams = new URLSearchParams(window.location.search);
	let presenceData: PresenceData = {
		largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
	};
	if (document.location.pathname === "/") presence.setActivity(presenceData);
	else if (
		urlParams.get("page") &&
		urlParams.get("s") &&
		urlParams.get("page") === "post"
	) {
		if (urlParams.get("s") === "list") {
			if (urlParams.get("tags")) {
				presenceData = {
					details: "Searching...",
					state: urlParams.get("tags").replace(" ", ", "),
					largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
				};
				presence.setActivity(presenceData);
			} else {
				presenceData = {
					details: "Viewing Posts List...",
					largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
				};
				presence.setActivity(presenceData);
			}
		} else if (urlParams.get("s") === "view" && urlParams.get("id")) {
			presenceData = {
				details: "Viewing a Post...",
				state: `Post ${urlParams.get("id")}`,
				largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
			};
			presence.setActivity(presenceData);
		} else {
			presenceData = {
				largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
			};
			presence.setActivity(presenceData);
		}
	} else {
		presenceData = {
			largeImageKey: "https://cdn.rcd.gg/PreMiD/websites/R/RealBooru/assets/logo.png",
		};
		presence.setActivity(presenceData);
	}
});
