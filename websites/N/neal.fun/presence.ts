const presence = new Presence({
		clientId: "1210285775099269162",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets { // Other default assets can be found at index.d.ts
	Logo = "https://i.imgur.com/sWGQF3D.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		path = pathname.split("/"),
		[showButtons, showLocation] = await Promise.all([
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("location"),
		]);
	path.shift();
	if (pathname.endsWith("/")) path.pop();
	switch (true) {
		case path[0] === "infinite-craft": {
			presenceData.details = "Playing: Infinite Craft";
			presenceData.state = `Discovered ${
				document.querySelectorAll(".items .item").length || 0
			} items`;
			break;
		}
		case path[0] === "internet-artifacts": {
			presenceData.details = "Playing: Internet Artifacts";
			if (document.querySelector(".enter.enter-hide")) {
				presenceData.state = `Reading "${
					document.querySelector(".title.artifact-title")?.textContent || "?"
				}" from year ${
					document.querySelector(".year.year-selected")?.textContent.trim() ||
					"?"
				}`;
			} else presenceData.state = "Entering";
			break;
		}
		case path[0] === "password-game": {
			presenceData.details = "Playing: Password Game";
			presenceData.state = `${
				document.querySelector(".password-length.show-password-length")
					?.textContent || 0
			} characters`;
			break;
		}
		case path[0] === "space-elevator": {
			const altitude = Number(
				Array.from(document.querySelectorAll(".altitude-digit"))
					.map(v => Number(v.textContent.trim()))
					.filter(v => v || !isNaN(v))
					.join("")
			);
			presenceData.details = "Playing: Space Elevator";
			if (altitude) presenceData.state = `${altitude}m high`;
			else presenceData.state = "Starting";
			if (altitude === 100000)
				presenceData.state = `Reached highest point (${altitude}m)`;
			break;
		}
		case path[0] === "asteroid-launcher": {
			presenceData.details = "Playing: Asteroid Launcher";
			if (
				document.querySelector(".cta")?.textContent?.trim() ===
				"Launch Asteroid"
			)
				presenceData.state = "Launching an asteroid";
			if (
				Array.from(document.querySelectorAll(".section-headline")).map(
					v => v.textContent
				).length === 5
			) {
				presenceData.state = `Launching another asteroid | ${Array.from(
					document.querySelectorAll("b")
				)
					.filter(v => v.textContent.endsWith(" people"))
					.map(v => v.textContent.replace(" people", "").replaceAll(",", ""))
					.reduce((a, b) => a + Number(b), 0)
					.toLocaleString()} people injured or died`;
			}
			break;
		}
		case path[0] === "perfect-circle": {
			presenceData.details = "Playing: Perfect Circle";
			break;
		}
		case path[0] === "wonders-of-street-view": {
			presenceData.details = "Playing: Wonders of Street View";
			if (showLocation) {
				presenceData.state = `At ${
					document.querySelector(".info-title")?.textContent || "?"
				} in ${document.querySelector(".info-location")?.textContent || "?"}`;
			} else presenceData.state = "Location hidden";
			break;
		}
		case path[0] === "earth-reviews": {
			presenceData.details = "Playing: Earth Reviews";
			presenceData.state = "";
			if (!path[1]) {
				presenceData.state = "Viewing reviews";
				break;
			}
			const title = document.querySelector("div.title")?.textContent || "?";
			presenceData.state = `Viewing reviews for ${title} - ${
				document.querySelector(".rating-info").textContent.trim() || "?"
			}`;
			if (document.querySelector(".wrapper div .title"))
				presenceData.state = `Writing a review for ${title}`;
			break;
		}
		case path[0] === "lets-settle-this": {
			presenceData.details = "Playing: Let's Settle This";
			const answered =
				document.querySelectorAll(".result").length -
				document.querySelectorAll(".result[style='display: none;']").length;
			presenceData.state = `Answered ${answered} questions`;
			break;
		}
		case path[0] === "ambient-chaos": {
			presenceData.details = "Playing: Ambient Chaos";
			const totalVolume = Array.from(document.querySelectorAll(".volume"))
				.filter(v => Number(v.textContent))
				.map(v => Number(v.textContent))
				.reduce((v, a) => v + a, 0);
			presenceData.state = `Total volume: ${totalVolume || 0}`;
			break;
		}
		case path[0] === "absurd-trolley-problems": {
			presenceData.details = "Playing: Absurd Trolley Problems";
			presenceData.state = document.querySelector(".level")?.textContent;
			break;
		}
		case path[0] === "auction-game": {
			presenceData.details = "Playing: The Auction Game";
			if (document.querySelector(".screen-play")) {
				presenceData.state = "Starting";
				break;
			}
			const round = document.querySelector(".round-points")?.textContent;
			if (round) presenceData.state = round;
			else presenceData.state = "Round ?/?";

			const artTitle = document.querySelector(".art-title")?.textContent;
			if (artTitle) presenceData.state += ` - ${artTitle}`;
			break;
		}
		case path[0] === "deep-sea": {
			presenceData.details = "Playing: The Deep Sea";
			const depth = document
				.querySelector(".depth-line")
				?.textContent?.trim()
				?.toLocaleLowerCase();
			if (depth?.startsWith("10924 ")) {
				presenceData.state = `Finished (${depth})`;
				break;
			}
			if (depth && !depth.startsWith("0")) presenceData.state = depth;
			else presenceData.state = "Starting";
			break;
		}
		case path[0] === "size-of-space": {
			presenceData.details = "Playing: The Size of Space";
			const type = document.querySelector(".item-type")?.textContent;
			presenceData.state = `${
				document.querySelector(".item-title")?.textContent || "?"
			}${type && type.trim() ? ` (${type.trim()})` : ""}`;
			break;
		}
		case path[0] === "life-stats": {
			presenceData.details = "Playing: Life Stats";
			if (document.querySelector(".go-button")) presenceData.state = "Starting";
			else presenceData.state = "Reading";
			break;
		}
		case path[0] === "who-was-alive": {
			presenceData.details = "Playing: Who Was Alive?";
			presenceData.state = `In year ${
				document.querySelector("input")?.value || 1800
			}`;
			break;
		}
		case path[0] === "life-checklist": {
			presenceData.details = "Playing: Life Checklist";
			const totalChecklist =
				document.querySelectorAll(".goal-check-img").length;
			presenceData.state = `Checked ${
				totalChecklist -
				document.querySelectorAll(".goal-check-img[style='display: none;']")
					.length
			}/${totalChecklist}`;
			break;
		}
		case path[0] === "speed": {
			presenceData.details = "Playing: How Fast Are You Moving?";
			presenceData.state = document.querySelector(".since")?.textContent;
			break;
		}
		case path[0] === "paper": {
			presenceData.details = "Playing: Paper";
			const split = document
				.querySelector(".fold-tall")
				.textContent.trim()
				.split("now\n")[1]
				.trim()
				.split(".");
			presenceData.state = `${
				document.querySelector(".fold-count")?.textContent || "0 folds"
			} (${
				split
					.slice(0, split.length - 1)
					.map(v => v.trim())
					.join(".") || "0.1mm tall"
			})`;
			break;
		}
		case path[0] === "spend": {
			presenceData.details = "Playing: Spend Bill Gates' Money";
			presenceData.state = `${
				document.querySelector(".money-bar").textContent || "$100,000,000,000"
			} left`;
			break;
		}
		case path[0] === "baby-map": {
			presenceData.details = "Playing: Baby Map";
			presenceData.state = document
				.querySelector(".total-babies")
				.textContent.trim();
			break;
		}
		case path[0] === "progress": {
			presenceData.details = "Playing: Progress";
			break;
		}
		case path[0] === "logos-from-memory": {
			presenceData.details = "Playing: Draw Logos From Memory";
			break;
		}
		case path[0] === "where-does-the-day-go": {
			presenceData.details = "Playing: Where does the day go?";
			break;
		}
		case path[0] === "dark-patterns": {
			presenceData.details = "Playing: Dark Patterns";
			break;
		}
		case path[0] === "share-this-page": {
			presenceData.details = "Playing: Share This Page";
			break;
		}
		case path[0] === "printing-money": {
			presenceData.details = "Playing: Printing Money";
			break;
		}
		case path[0] === "rocks": {
			presenceData.details = "Playing: Rocks";
			break;
		}
		case path[0] === "sell-sell-sell": {
			presenceData.details = "Playing: Sell Sell Sell";
			break;
		}
		case path[0] === "universe-forecast": {
			presenceData.details = "Playing: Universe Forecast";
			break;
		}
		case path[0] === "days-since-incident": {
			presenceData.details = "Playing: Days Since Incident";
			break;
		}
		case path[0] === "design-the-next-iphone": {
			presenceData.details = "Playing: Design the Next iPhone";
			break;
		}
		case !path[0]:
		default: {
			presenceData.details = "Browsing";
			if (document.querySelectorAll(".posts .link") && !path[0]) {
				presenceData.state = `${
					document.querySelectorAll(".posts .link").length
				} total games`;
			}
			break;
		}
	}
	if (showButtons) {
		presenceData.buttons = [
			{
				label: "View",
				url: href,
			},
		];
	}

	presence.setActivity(presenceData);
});
