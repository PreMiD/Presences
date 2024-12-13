const presence = new Presence({
		clientId: "1315433043590250526",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	gameIcon = Array.from(document.styleSheets)
		.flatMap(sheet => Array.from(sheet.cssRules || []))
		.filter(
			rule =>
				rule instanceof CSSStyleRule &&
				rule.selectorText === ".playbutton::before"
		)
		.map((rule: CSSStyleRule) => rule.style.backgroundImage)
		.join("")
		.replace(/^url\(["']?|["']?\)$/g, "");

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/c61Rzcw.png",
		startTimestamp: browsingTimestamp,
	};

	if (window.location.hostname.includes("kbhgames")) {
		if (document.location.pathname.startsWith("/new"))
			presenceData.details = "Viewing new games";
		else if (document.location.pathname.startsWith("/best-new-games"))
			presenceData.details = "Viewing Best of New Games";
		else if (document.location.pathname.startsWith("/best-games"))
			presenceData.details = "Viewing Top Games";
		else if (document.location.pathname.startsWith("/about"))
			presenceData.details = "Viewing about KBHGames";
		else if (document.location.pathname.startsWith("/terms-of-use"))
			presenceData.details = "Viewing the Terms of Use";
		else if (document.location.pathname.startsWith("/privacy"))
			presenceData.details = "Viewing the Privacy Policy";
		else if (document.location.pathname.startsWith("/favorite"))
			presenceData.details = "Viewing favorited games";
		else if (document.location.search.startsWith("?s=")) {
			presenceData.details = "Searching";
			presenceData.state = document.querySelector("#taginfo h1").textContent;
		} else if (document.location.pathname.startsWith("/tag/")) {
			presenceData.details = "Viewing category:";
			presenceData.state = document.querySelector("#taginfo h1").textContent;
		} else if (document.location.pathname.startsWith("/engine/")) {
			presenceData.details = "Viewing engine:";
			presenceData.state = document.querySelector("#taginfo h1").textContent;
		} else if (document.location.pathname.startsWith("/game/")) {
			presenceData.details = "Playing game:";
			presenceData.state = document.querySelector("#info-box h1").textContent;
			presenceData.largeImageKey = gameIcon;
			presenceData.buttons = [
				{
					label: "View Game",
					url: window.location.href,
				},
			];
		} else presenceData.details = "Viewing KBHGames";
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
