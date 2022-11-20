const presence: Presence = new Presence({
		clientId: "833430731816173669",
	}),
	levelImages: Record<string, string> = {
		"10": "https://i.imgur.com/nQvo9Wo.png",
		"20": "https://i.imgur.com/ag1vZVv.png",
		"30": "https://i.imgur.com/FvJN63W.png",
		"40": "https://i.imgur.com/pN5cZxs.png",
		"50": "https://i.imgur.com/ETRB7TM.png",
		"60": "https://i.imgur.com/WGCbykC.png",
		"70": "https://i.imgur.com/7J4mGPp.png",
		"80": "https://i.imgur.com/JOek4w6.png",
		"90": "https://i.imgur.com/4s0tT5G.png",
		"100": "https://i.imgur.com/VQHYuGy.png",
	},
	browsingTimestamp = Math.floor(Date.now() / 1000);

function getLevelIcon(level: number) {
	let iconKey = levelImages["10"];
	if (level >= 10 && level < 100)
		iconKey = levelImages[`${Math.floor(level / 10) * 10}`];
	if (level < 10) iconKey = levelImages["10"];
	if (level >= 100) iconKey = levelImages["100"];
	return iconKey;
}

presence.on("UpdateData", () => {
	const { pathname, hostname, href } = window.location,
		pathSplit = pathname.split("/").slice(1),
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/NkfEDwV.png",
			startTimestamp: browsingTimestamp,
		};

	if (hostname === "community.bunpro.jp") {
	} else {
		const level = +document
			.querySelector<HTMLParagraphElement>(".header-user-level")
			?.textContent.match(/\d+/)[0];
		if (level) {
			presenceData.smallImageKey = getLevelIcon(level);
			presenceData.smallImageText = `Level ${level}`;
		}
		switch (pathSplit[0]) {
			case "": {
				break;
			}
			case "dashboard": {
				presenceData.details = "Viewing dashboard";
				presenceData.state = `${
					document
						.querySelector<HTMLAnchorElement>(".reviews-link")
						.textContent.match(/\d+/)[0]
				} reviews`;
				break;
			}
			case "grammar_points": {
				if (pathSplit[1]) {
					presenceData.details = "Viewing a grammar point";
					presenceData.state = document
						.querySelector<HTMLDivElement>(
							"h1 > .grammar-point__text--main-kanji-new"
						)
						.textContent.trim();
					presenceData.buttons = [{ label: "View Grammar Point", url: href }];
				} else {
					presenceData.details = "Browsing grammar points";
				}
				break;
			}
			case "study": {
				const hintText = document.querySelector<HTMLDivElement>(
						".study-question-english-hint"
					).textContent,
					SRSLevel = document.querySelector<HTMLDivElement>(
						".review__stats.srs-tracker"
					).textContent,
					percent = document
						.querySelector<HTMLDivElement>(".review__stats.review-percent")
						.textContent.trim(),
					[reviewsRemaining] = document
						.querySelector<HTMLDivElement>("#reviews")
						.textContent.match(/\d+/);
				presenceData.details = "Doing reviews";
				presenceData.state = hintText
					? `${hintText} (${SRSLevel}) - ${percent} correct, ${reviewsRemaining} remaining`
					: `${SRSLevel} - ${percent} correct, ${reviewsRemaining} remaining`;
				break;
			}
			case "summary": {
				presenceData.details = "Viewing review summary";
				presenceData.state = `${
					document
						.querySelector<HTMLDivElement>(".tab-highlight")
						.textContent.match(/\w+(?=:)/)[0]
				} - ${document.querySelector("h1").textContent}`;
				break;
			}
		}
	}

	presence.setActivity(presenceData);
});
