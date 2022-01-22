const presence = new Presence({
	clientId: "930231661986197554"
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			smallImageKey: "voxiom",
			smallImageText: "Playing Voxiom"
		},
		{ pathname } = window.location,
		gameCode = window.location.hash.substring(1);

	if (pathname === "/" && gameCode) {
		presenceData.details = "In a Game";

		// this is done because classNames are randomized
		const possibleScoreDiv = [...document.querySelectorAll("div div")] // score display is in two divs
			.filter(d => d.innerHTML.match(/<div/g)?.length === 3) // score display has 3 divs inside it
			.find(d =>
				d?.firstElementChild?.nextElementSibling?.innerHTML.includes(":")
			); // find the time display

		if (possibleScoreDiv) {
			const timeLeft = possibleScoreDiv.children[1]?.textContent || "";
			if (timeLeft.includes(":")) {
				// time is in format 'mm:ss'
				let secondsLeft = Number(timeLeft.split(":")[1]);
				secondsLeft += Number(timeLeft.split(":")[0]) * 60;
				presenceData.state = `Score: ${
					Number(possibleScoreDiv.children[0]?.textContent) || 0
				}-${Number(possibleScoreDiv.children[2]?.textContent) || 0}`;
				presenceData.endTimestamp = Date.now() + secondsLeft * 1000;
				if (await presence.getSetting("showGame")) {
					presenceData.buttons = [
						{
							label: "Join Game",
							url: `${window.location.protocol}//${window.location.hostname}/#${gameCode}`
						}
					];
				}
			}
		}
	} else if (pathname === "/" || pathname === "/experimental")
		presenceData.details = "In Main Menu";
	else if (pathname.startsWith("/loadouts")) {
		presenceData.details = "Managing Loadouts";
		switch (pathname) {
			case "/loadouts":
			case "/loadouts/inventory":
				presenceData.state = "Viewing Inventory";
				break;
			case "/loadouts/market":
				presenceData.state = "Viewing Market";
				break;
			case "/loadouts/sales":
				presenceData.state = "Viewing Listed Items";
				break;
			case "/loadouts/history":
				presenceData.state = "Viewing Market History";
				break;
		}
	} else if (pathname.startsWith("/shop")) presenceData.details = "In Shop";
	else if (pathname.startsWith("/leaderboard"))
		presenceData.details = "Viewing Leaderboard";
	else if (pathname === "/changelog")
		presenceData.details = "Reading Changelog";
	else if (pathname === "/settings") presenceData.details = "Changing Settings";
	else if (pathname === "/match")
		presenceData.details = "Reviewing Match Stats";
	else if (pathname.startsWith("/account"))
		presenceData.details = "Viewing Account";
	else if (pathname.startsWith("/friends"))
		presenceData.details = "Managing Friends";
	else if (pathname.startsWith("/player")) {
		const viewName = pathname.substring("/player/".length);
		presenceData.details = "Viewing Player";
		presenceData.state = `Player: ${viewName}`;
	} else if (pathname.startsWith("/clans/view")) {
		const viewName = pathname.substring("/clans/view/".length);
		presenceData.details = "Viewing Clan";
		presenceData.state = `Clan: ${viewName}`;
	} else if (pathname.startsWith("/clans")) {
		presenceData.details = "Managing Clan";
		switch (pathname) {
			case "/clans":
			case "/clans/join":
				presenceData.state = "Viewing Clan List";
				break;
			case "/clans/create":
				presenceData.state = "Creating a Clan";
				break;
			case "/clans/invites":
				presenceData.state = "Viewing Clan Invites";
				break;
			case "/clans/requests":
				presenceData.state = "Viewing Clan Requests";
				break;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
