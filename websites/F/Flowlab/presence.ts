/* eslint-disable unicorn/prefer-query-selector */
const presence = new Presence({ clientId: "991160367629750372" }),
	flowlabTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "icon",
		startTimestamp: flowlabTimestamp,
      		{ pathname } = document.location
	};

	switch (document.location.hostname) {
		case "flowlab.io": {
			switch (pathname) {
				case "/": {
					presenceData.details = "Viewing home page";
					break;
				}
				case "/game/list": {
					presenceData.details = "Viewing their games";
					break;
				}
				case "/game/browse": {
					presenceData.details = "Viewing games page";
					break;
				}
			}
		}
	}
	if (pathname.includes("/profile")) {
		presenceData.details = `Viewing ${document
			.getElementsByClassName("username")
			.item(0)
			.textContent.trim()}'s profile`;
	} else if (pathname.includes("/view/")) {
		presenceData.details = `Editing "${
			document.getElementById("game_title").textContent
		}"`;
		presenceData.state = document.getElementById("game_author").textContent;
	} else if (pathname.includes("/play/")) {
		(presenceData.details = `Playing "${
			document.getElementById("game_title").textContent
		}"`),
			(presenceData.state = `${
				document.getElementById("game_author").textContent
			}`);
	} else if (document.location.pathname === "/resources")
		presenceData.details = "Viewing Flowlab examples";
	else if (document.location.pathname === "/lab/blog/")
		presenceData.details = "Viewing Flowlab blog";
	else if (document.location.pathname.includes("/blog/")) {
		presenceData.state = "Reading blog entry";
		presenceData.details = document
			.getElementsByClassName("display-2 text-white")
			.item(0).textContent;
	} else presenceData.details = "Viewing Flowlab";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
