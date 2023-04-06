const presence = new Presence({ clientId: "714389082939064381" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement,
	user: HTMLElement,
	pp: HTMLElement,
	rank: HTMLElement,
	country: HTMLElement,
	tag: HTMLElement,
	url: URL,
	mode: number;

presence.on("UpdateData", () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/99lEgeG.png",
		startTimestamp: browsingTimestamp,
	};

	if (document.location.pathname === "/") presenceData.details = "Home Page";
	else if (document.location.pathname.includes("/login"))
		presenceData.details = "Logging in";
	else if (document.location.pathname.includes("/register"))
		presenceData.details = "Regitstering account";
	else if (document.location.pathname.includes("/u/")) {
		user = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.sixteen.wide.column.kpw--zero > div > div > div.kpw--profile--flex > div.kpw--info--block > h1 > p > span.bgf"
		);
		presenceData.details = user.textContent;

		url = new URL(document.location.href);
		mode = parseInt(url.searchParams.get("mode"));
		country = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(1) > b:nth-child(2)"
		);
		if (country === null) {
			country = document.querySelector(
				"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(1) > b:nth-child(4)"
			);
		}
		switch (mode) {
			case 1:
				rank = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.sixteen.wide.column.kpw--zero > div > div > div.kpw--profile--flex > div.kpw--info--block > h1 > p > span:nth-child(4)"
				);
				pp = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(2) > table > tbody > tr:nth-child(4) > td.right.aligned"
				);
				presenceData.state = `${pp.textContent}pp ${rank.textContent} | ${country.textContent} `;
				if (rank.textContent === "Unknown") pp.textContent = "-";

				presenceData.smallImageKey = "taiko";
				presenceData.smallImageText = "osu!taiko";
				break;
			case 2:
				rank = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.sixteen.wide.column.kpw--zero > div > div > div.kpw--profile--flex > div.kpw--info--block > h1 > p > span:nth-child(5)"
				);
				pp = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(3) > table > tbody > tr:nth-child(2) > td.right.aligned"
				);
				if (rank.textContent === "Unknown") pp.textContent = "-";

				presenceData.state = `${pp.textContent}pp ${rank.textContent} | ${country.textContent} `;
				presenceData.smallImageKey = "ctb";
				presenceData.smallImageText = "Catch the Beat";
				break;
			case 3:
				rank = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.sixteen.wide.column.kpw--zero > div > div > div.kpw--profile--flex > div.kpw--info--block > h1 > p > span:nth-child(6)"
				);
				pp = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(4) > table > tbody > tr:nth-child(4) > td.right.aligned"
				);
				if (rank.textContent === "Unknown") pp.textContent = "-";

				presenceData.state = `${pp.textContent}pp ${rank.textContent} | ${country.textContent} `;
				presenceData.smallImageKey = "mania";
				presenceData.smallImageText = "osu!mania";
				break;
			default:
				rank = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.sixteen.wide.column.kpw--zero > div > div > div.kpw--profile--flex > div.kpw--info--block > h1 > p > span:nth-child(3)"
				);
				pp = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div.five.wide.column > div:nth-child(1) > div > div:nth-child(2) > div:nth-child(1) > table > tbody > tr:nth-child(4) > td.right.aligned"
				);
				if (rank.textContent === "Unknown") pp.textContent = "-";

				presenceData.state = `${pp.textContent}pp ${rank.textContent} | ${country.textContent} `;
				presenceData.smallImageKey = "std";
				presenceData.smallImageText = "osu!";
				break;
		}
	} else if (document.location.pathname.includes("/leaderboard")) {
		presenceData.details = "Browsing Leaderboard";

		url = new URL(document.location.href);
		mode = parseInt(url.searchParams.get("mode"));
		switch (mode) {
			case 1:
				presenceData.state = "osu!taiko";
				break;
			case 2:
				presenceData.state = "osu!catch";
				break;
			case 3:
				presenceData.state = "osu!mania";
				break;
			default:
				presenceData.state = "osu!standard";
				break;
		}
	} else if (document.location.pathname.includes("/clans")) {
		presenceData.details = "Browsing Clans";

		url = new URL(document.location.href);
		mode = parseInt(url.searchParams.get("mode"));
		switch (mode) {
			case 1:
				presenceData.state = "osu!taiko";
				break;
			case 2:
				presenceData.state = "osu!catch";
				break;
			case 3:
				presenceData.state = "osu!mania";
				break;
			default:
				presenceData.state = "osu!standard";
				break;
		}
	} else if (document.location.pathname.includes("/c/")) {
		title = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div.ui.top.attached.segment > div > div:nth-child(1) > div:nth-child(2) > h1"
		);
		tag = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div.ui.top.attached.segment > div > div:nth-child(1) > div:nth-child(2) > div"
		);
		pp = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned"
		);
		rank = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div:nth-child(3) > div > div > div:nth-child(1) > table > tbody > tr:nth-child(2) > td.right.aligned"
		);
		presenceData.details = `${title.textContent} ${tag.textContent}`;
		presenceData.state = `${pp.textContent}pp ${rank.textContent}`;
	} else if (document.location.pathname.includes("/b/")) {
		title = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.ui.container > div > div > h1"
		);
		presenceData.details = "Looking at the beatmap:";
		presenceData.state = title.textContent;
	} else if (document.location.pathname.includes("/beatmaps"))
		presenceData.details = "Searching for new beatmaps";
	else if (document.location.pathname.includes("/beatmaps/rank_request"))
		presenceData.details = "Request beatmap ranking";
	else if (document.location.pathname.includes("/donate")) {
		presenceData.details = "Donate";
		presenceData.state = "What are you waiting for?";
	} else if (document.location.pathname.includes("/shop"))
		presenceData.details = "Shop";
	else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Browsing their settings";
	else if (document.location.pathname.includes("/friends"))
		presenceData.details = "Browsing their friends";
	else if (document.location.pathname.includes("/changelog"))
		presenceData.details = "Checking changelog";
	else if (document.location.pathname.includes("/team"))
		presenceData.details = "Viewing Kurikku team";
	else if (document.location.pathname.includes("/help"))
		presenceData.details = "Contact support";
	else if (document.location.pathname.includes("/streamers"))
		presenceData.details = "Streamers";
	else if (document.location.pathname.includes("/tournament/live")) {
		presenceData.details = "Viewing Tournament";
		presenceData.state = "Live";
	} else if (document.location.pathname.includes("/doc")) {
		presenceData.details = "View document";
		presenceData.state = "Home Page";

		title = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.container-pd > div:nth-child(2) > div > div:nth-child(1) > h1"
		);
		if (title) {
			presenceData.details = " View document";
			presenceData.state = title.textContent;
		}
	}

	if (document.location.hostname === "status.kurikku.pw") {
		presenceData.details = "Checking server status";
		presenceData.state = "Is kurikku down?";
	}

	if (document.location.hostname === "sig.kurikku.pw")
		presenceData.details = "Signature Generator";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
