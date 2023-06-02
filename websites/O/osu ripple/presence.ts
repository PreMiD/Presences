const presence = new Presence({ clientId: "688752009079160852" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let customData = false,
	title: HTMLElement,
	user: HTMLElement,
	pp: HTMLElement,
	rank: HTMLElement,
	url: URL,
	mode: number;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/O/osu%20ripple/assets/logo.png",
		startTimestamp: browsingTimestamp,
	};
	customData = false;

	// You code here
	if (document.location.pathname === "/") presenceData.details = "Home Page";
	else if (document.location.pathname.includes("/login"))
		presenceData.details = "Logging in";
	else if (document.location.pathname.includes("/register"))
		presenceData.details = "Regitstering account";
	else if (document.location.pathname.includes("/u")) {
		user = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div:nth-child(1) > div:nth-child(2) > h1"
		);
		url = new URL(document.location.href);
		mode = parseInt(url.searchParams.get("mode"));
		switch (mode) {
			case 1:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(6)"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(6) > table > tbody > tr:nth-child(3) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Taiko profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp(Relax)`;
						break;
					default:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(2)"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(2) > table > tbody > tr:nth-child(1) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Taiko profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp`;
						break;
				}
				break;
			case 2:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(7)"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(7) > table > tbody > tr:nth-child(1) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Catch profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp(Relax)`;
						break;
					default:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(3)"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(3) > table > tbody > tr:nth-child(1) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Catch profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp`;
						break;
				}
				break;
			case 3:
				rank = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(4)"
				);
				pp = document.querySelector(
					"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(4) > table > tbody > tr:nth-child(1) > td.right.aligned"
				);
				presenceData.details = `${user.textContent}'s Mania profile`;
				presenceData.state = `${rank.textContent} | ${pp.textContent}pp`;
				break;
			default:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div.ui.top.attached.segment.overflow.auto > div.magic.table.floating.right > div > h1:nth-child(5)"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(5) > table > tbody > tr:nth-child(3) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Standard profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp(Relax)`;
						break;
					default:
						rank = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(1) > td.right.aligned"
						);
						pp = document.querySelector(
							"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div:nth-child(5) > div > div > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(3) > td.right.aligned"
						);
						presenceData.details = `${user.textContent}'s Standard profile`;
						presenceData.state = `${rank.textContent} | ${pp.textContent}pp`;
						break;
				}
				break;
		}
	} else if (document.location.pathname.includes("/leaderboard")) {
		presenceData.details = "Browsing Leaderboard";

		url = new URL(document.location.href);
		mode = parseInt(url.searchParams.get("mode"));
		switch (mode) {
			case 1:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						presenceData.state = "osu!taiko | Relax";
						break;
					default:
						presenceData.state = "osu!taiko";
						break;
				}
				break;
			case 2:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						presenceData.state = "osu!catch | Relax";
						break;
					default:
						presenceData.state = "osu!catch";
						break;
				}
				break;
			case 3:
				presenceData.state = "osu!mania";
				break;
			default:
				url = new URL(document.location.href);
				mode = parseInt(url.searchParams.get("relax"));
				switch (mode) {
					case 1:
						presenceData.state = "osu!standard | Relax";
						break;
					default:
						presenceData.state = "osu!standard";
						break;
				}
				break;
		}
	} else if (document.location.pathname.includes("/b/")) {
		title = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.huge.heading.dropped > div > h1"
		);

		presenceData.details = "Looking at the beatmap:";
		presenceData.state = title.textContent;
	} else if (document.location.pathname.includes("/beatmaps/rank_request"))
		presenceData.details = "Request beatmap ranking";
	else if (document.location.pathname.includes("/donate")) {
		presenceData.details = "Donate";
		presenceData.state = "What are you waiting for?";
	} else if (document.location.pathname.includes("/settings"))
		presenceData.details = "Browsing their settings";
	else if (document.location.pathname.includes("/friends"))
		presenceData.details = "Browsing their friends";
	else if (document.location.pathname.includes("/changelog"))
		presenceData.details = "Checking changelog";
	else if (document.location.pathname.includes("/team"))
		presenceData.details = "Viewing osu!ripple team";
	else if (document.location.pathname.includes("/about")) {
		presenceData.details = "Viewing about";
		presenceData.state = "Welcome to Ripple.";
	} else if (document.location.pathname.includes("/doc")) {
		presenceData.details = "Viewing Documentation";
		presenceData.state = "Home Page";
		title = document.querySelector(
			"body > div.ui.full.height.main.wrapper > div.h-container > div:nth-child(2) > div > div:nth-child(1) > h1"
		);

		if (title) presenceData.details = "Viewing Documentation";
		presenceData.state = title.textContent;
	}

	if (document.location.hostname === "vinse.ripple.moe")
		presenceData.details = "Browsing Multiplayer history";

	if (document.location.hostname === "fokabot.ripple.moe") {
		presenceData.details = "Viewing Documentation";
		presenceData.state = "FokaBot Commands";
	}

	if (document.location.hostname === "support.ripple.moe")
		presenceData.details = "Ripple Support";

	if (document.location.hostname === "status.ripple.moe")
		presenceData.details = "Checking server status";

	if (document.location.hostname === "blog.ripple.moe") {
		title = document.querySelector("head > title");
		presenceData.details = "Reading Blog";
		presenceData.state = title.textContent;
	}

	if (!customData) presence.setActivity(presenceData);
});
