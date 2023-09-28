const presence = new Presence({
		clientId: "806926545771167774",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/B/Bots%20For%20Discord/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};
	if (window.location.hostname === "botsfordiscord.com") {
		presenceData.details = "Viewing page:";
		if (
			document
				.querySelector("head > title")
				.textContent.split("|")[0]
				.trim()
				.startsWith("Error")
		) {
			presenceData.state = `${document
				.querySelector("#errortitle")
				.textContent.trim()} (${document
				.querySelector("#errorsubtitle")
				.textContent.trim()})`;
		} else if (window.location.pathname.toLowerCase() === "/")
			presenceData.state = "Homepage";
		else if (window.location.pathname.toLowerCase() === "/bots")
			presenceData.state = "Discord bots";
		else if (window.location.pathname.toLowerCase() === "/bot/add")
			presenceData.state = "Add a new bot";
		else if (window.location.pathname.toLowerCase() === "/verification")
			presenceData.state = "Verification program";
		else if (window.location.pathname.startsWith("/house"))
			presenceData.state = "House program";
		else if (
			window.location.pathname.toLowerCase() === "/me" ||
			window.location.pathname.startsWith("/user/")
		) {
			presenceData.details = "Viewing a profile:";
			presenceData.state = document
				.querySelectorAll("div.container #highlight")[1]
				.textContent.trim();
		} else if (window.location.pathname.toLowerCase() === "/me/favorites") {
			presenceData.state = `${document
				.querySelectorAll("div.navbar-item a")[8]
				.textContent.split("#")[0]
				.trim()} favorite bots`;
		} else if (window.location.pathname.toLowerCase() === "/me/history")
			presenceData.state = "Voting history";
		else if (window.location.pathname.startsWith("/privacy"))
			presenceData.state = "Privacy policy";
		else if (window.location.pathname.toLowerCase() === "/license")
			presenceData.state = "Website license";
		else if (window.location.pathname.toLowerCase() === "/tos")
			presenceData.state = "Terms of Service (ToS)";
		else if (window.location.pathname.toLowerCase() === "/partners")
			presenceData.state = "Partners";
		else if (window.location.pathname.toLowerCase() === "/contributors")
			presenceData.state = "Contributors";
		else if (window.location.pathname.startsWith("/tag/")) {
			presenceData.details = "Viewing bots with tag:";
			presenceData.state = document
				.querySelector("div.container h1")
				.textContent.split("</i>")[1]
				.trim();
		} else if (window.location.pathname.toLowerCase() === "/login")
			presenceData.state = "Login";
		else if (window.location.pathname.startsWith("/bot/")) {
			presenceData.details = "Viewing a bot:";
			presenceData.state = document
				.querySelectorAll("div.container #highlight")[0]
				.textContent.split("<a")[0]
				.trim();
		} else if (window.location.pathname.startsWith("/bots/search/")) {
			presenceData.state =
				`Search results (${window.location.pathname
					.split("/search/")[1]
					.trim()}` + ")";
		}
	} else if (
		window.location.hostname === "docs.botsfordiscord.com" &&
		window.location.pathname.startsWith("/")
	) {
		presenceData.details = "API Docs | Viewing page:";
		presenceData.state = document.querySelector("h1 span").textContent.trim();
	}
	if (!presenceData.state) presence.setActivity();
	else presence.setActivity(presenceData);
});
