const presence = new Presence({
	clientId: "620294187878711313",
});

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/G/Gelbooru/assets/logo.png",
		},
		urlParams = new URLSearchParams(window.location.search);
	if (document.location.pathname === "/")
		presenceData.details = "Viewing the homepage...";
	else if (
		urlParams.get("page") &&
		urlParams.get("s") &&
		urlParams.get("page") === "post"
	) {
		if (urlParams.get("s") === "list") {
			if (urlParams.get("tags")) {
				presenceData.details = "Searching...";
				presenceData.state = urlParams.get("tags").replace(" ", ", ");
			} else presenceData.details = "Viewing Posts List...";
		} else if (urlParams.get("s") === "view" && urlParams.get("id")) {
			presenceData.details = "Viewing a Post...";
			presenceData.state = `Post ${urlParams.get("id")}`;
		} else presenceData.details = "Viewing the homepage...";
	} else presenceData.details = "Viewing the homepage...";
	presence.setActivity(presenceData);
});
