const presence = new Presence({
		clientId: "723474173208297532",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/lbVBBIz.png",
			startTimestamp: browsingTimestamp,
		},
		privacy = await presence.getSetting<boolean>("privacy"),
		button = await presence.getSetting<boolean>("button");

	if (privacy) presenceData.details = "Browsing";
	else if (document.location.hostname === "gunivers.net") {
		if (window.location.pathname.startsWith("/articles")) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Activities";
		} else if (window.location.pathname.startsWith("/category/")) {
			presenceData.details = "Searching an article:";
			presenceData.state = `in category ${document.title.replace(
				" | Gunivers",
				""
			)}`;
			if (window.location.pathname.endsWith("category/chronique/")) {
				presenceData.details = "Viewing a page:";
				presenceData.state = "Chronicles";
			}
		} else if (window.location.pathname.startsWith("/chronique-mensuelle-")) {
			presenceData.details = "Reading a chronicle";
			presenceData.state = document.title
				.replace(" | Gunivers", "")
				.replace("Chronique Mensuelle - ", "");
			if (button) {
				presenceData.buttons = [
					{
						label: "View chronicle",
						url: document.URL,
					},
				];
			}
		} else if (
			window.location.pathname.endsWith("/a-propos/") ||
			window.location.pathname.endsWith("/about-us/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "About us";
		} else if (
			window.location.pathname.endsWith("/contact-us/") ||
			window.location.pathname.endsWith("/contactez-nous/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Contact us";
		} else if (
			window.location.pathname.endsWith("/histoire/") ||
			window.location.pathname.endsWith("/history/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Contact us";
		} else if (
			window.location.pathname.endsWith("/affiliation-program/") ||
			window.location.pathname.endsWith("/programme-daffiliation/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Affiliation program";
		} else if (
			window.location.pathname.endsWith("/equipes/") ||
			window.location.pathname.endsWith("/teams/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Affiliated teams";
		} else if (
			window.location.pathname.endsWith("/partners/") ||
			window.location.pathname.endsWith("/partenaires/")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Our partners";
		} else if (
			window.location.pathname.startsWith("/") &&
			window.location.pathname.length !== 1 &&
			!window.location.pathname.startsWith("/home")
		) {
			presenceData.details = "Reading an article:";
			presenceData.state = document.title.replace(" | Gunivers", "");
			if (button) {
				presenceData.buttons = [
					{
						label: "View article",
						url: document.URL,
					},
				];
			}
			if (window.location.pathname.includes("/author/")) {
				presenceData.details = "Looking for an user:";
				presenceData.state = document.title.replace(" | Gunivers", "");
				if (button) {
					presenceData.buttons = [
						{
							label: "View user",
							url: document.URL,
						},
					];
				}
			}
		} else if (
			window.location.pathname.length === 1 ||
			window.location.pathname.startsWith("/home")
		) {
			presenceData.details = "Viewing a page:";
			presenceData.state = "Home";
		}
	} else if (document.location.hostname === "project.gunivers.net") {
		presenceData.smallImageKey = "workspace";
		presenceData.details = "Viewing a page:";
		presenceData.state = "Gunivers Workspace";
		if (window.location.pathname.endsWith("/projects")) {
			presenceData.details = "Searching a project:";
			presenceData.state = "on Gunivers Workspace";
		} else if (window.location.pathname.startsWith("/projects/")) {
			presenceData.details = "Reading a project:";
			[, presenceData.state] = document.title.split(" - ");
			if (button) {
				presenceData.buttons = [
					{
						label: "View project",
						url: document.URL,
					},
				];
			}
		} else if (window.location.pathname.startsWith("/users/")) {
			presenceData.details = "Looking for an user:";
			presenceData.state = document.querySelector("#content > h2").textContent;
			if (button) {
				presenceData.buttons = [
					{
						label: "View user",
						url: document.URL,
					},
				];
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
