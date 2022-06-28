/* eslint-disable unicorn/prefer-query-selector */
const presence = new Presence({ clientId: "991160367629750372" }),
	flowlabTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "icon",
		startTimestamp: flowlabTimestamp,
	};

	switch (document.location.hostname) {
		case "flowlab.io": {
			switch (document.location.pathname) {
				case "/": {
					presenceData.details = "Viewing Home Page";
					break;
				}
				case "/game/list": {
					presenceData.details = "Viewing Their Games";
					break;
				}
				case "/game/browse": {
					presenceData.details = "Viewing Games Page";
					break;
				}
			}
		}
	}
	if (document.location.pathname.includes("/profile")) {
		presenceData.details = `Viewing ${document
			.getElementsByClassName("username")
			.item(0)
			.textContent.trim()}'s Profile`;
	} else if (document.location.pathname.includes("/view/")) {
		presenceData.details = `Editing "${
			document.getElementById("game_title").textContent
		}"`;
		presenceData.state = document.getElementById("game_author").textContent;
	} else if (document.location.pathname.includes("/play/")) {
		(presenceData.details = `Playing "${
			document.getElementById("game_title").textContent
		}"`),
			(presenceData.state = `${
				document.getElementById("game_author").textContent
			}`);
	} else if (document.location.pathname === "/resources")
		presenceData.details = "Viewing Flowlab Examples";
	else if (document.location.pathname === "/lab/blog/")
		presenceData.details = "Viewing Flowlab Blog";
	else if (document.location.pathname.includes("/blog/")) {
		presenceData.state = "Reading Blog Entry";
		presenceData.details = document
			.getElementsByClassName("display-2 text-white")
			.item(0).textContent;
	} else presenceData.state = "Viewing Flowlab";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
