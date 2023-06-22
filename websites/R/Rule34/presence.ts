const presence = new Presence({
	clientId: "619967690056007699",
});

presence.on("UpdateData", async () => {
	const urlParams = new URLSearchParams(window.location.search),
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/R/Rule34/assets/logo.png",
		};
	if (document.location.href.includes("rule34.xxx")) {
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
			}
		}
	} else if (document.location.href.includes("rule34.paheal.net")) {
		const path = document.location.pathname.split("/");
		if (document.location.pathname === "/")
			presenceData.details = "Viewing the homepage...";
		else if (path[1] === "post") {
			if (path[2] === "list" && path.length === 3)
				presenceData.details = "Viewing Posts List...";
			else if (path[2] === "list" && path.length > 3) {
				presenceData.details = "Searching...";
				presenceData.state = path[3].replace("%20", ", ").replace("%21", "!");
			} else if (path[2] === "view") {
				presenceData.details = "Viewing a post...";
				presenceData.state = `Post ${path[3]}`;
			}
		}
	}
	presence.setActivity(presenceData);
});
