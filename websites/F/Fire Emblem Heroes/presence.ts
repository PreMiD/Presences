const presence = new Presence({
		clientId: "1133602327476047873",
	}),
	slideshow = presence.createSlideshow(),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.discordapp.com/attachments/459040398527037441/1133604869589180436/feh.png",
}

function applyMainHostDetails(
	presenceData: PresenceData,
	pathList: string[]
): void {
	switch (pathList[0] ?? "") {
		case "": {
			activateMainIntersectionObservers(pathList);
			switch (section) {
				case "": {
					presenceData.details = "Browsing the home page";
					break;
				}
				case "cont2": {
					presenceData.details = "Reading FEH Lore";
					presenceData.state =
						document.querySelector<HTMLImageElement>("#storySlide .on").alt;
					break;
				}
				case "cont4": {
					const heroName = document.querySelector<HTMLHeadingElement>(
						".characterSlide-summery-item.active h3"
					).textContent;
					presenceData.details = "Meeting the Heroes";
					presenceData.state = heroName;
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
						"#characterSlide .flex-active-slide img"
					).src;
					presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
						".characterSlide-thumb-item.flex-active"
					).src;
					presenceData.smallImageText = heroName;
				}
			}
			break;
		}
		case "countries": {
			presenceData.details = "Viewing game availability";
			break;
		}
		case "illustrations": {
			const images = [
				...document.querySelectorAll<HTMLImageElement>(
					"#topics-detail-content img"
				),
			];
			for (const image of images) {
				const tmpData: PresenceData = Object.assign({}, presenceData);
				tmpData.details = "Browsing illustrations";
				tmpData.largeImageKey = image.src;
				slideshow.addSlide(image.getAttribute("src"), tmpData, 5e3);
			}
			break;
		}
		case "manga": {
			if (pathList[1]) {
				presenceData.details = "Reading A Day in the Life";
				presenceData.buttons = [
					{ label: "Read Manga", url: document.location.href },
				];
			} else {
				presenceData.details = "Browsing manga";
			}
			break;
		}
		case "system": {
			presenceData.details = "Reading about the gameplay";
			break;
		}
		case "topics": {
			activateMainIntersectionObservers(pathList);
			presenceData.details = "Browsing articles";
			if (section) {
				const articleContainer = document.querySelector<HTMLDivElement>(
						`${section}`
					),
					articleDate =
						articleContainer.querySelector<HTMLSpanElement>(
							".date"
						).textContent,
					articleTitle =
						articleContainer.querySelector<HTMLParagraphElement>(
							".heading"
						).textContent,
					articleImage =
						articleContainer.querySelector<HTMLImageElement>(".img > img").src;
				presenceData.state = `${articleTitle} - ${articleDate}`;
				presenceData.largeImageKey = articleImage;
				presenceData.buttons = [
					{
						label: "Read Article",
						url: `${document.location.href}#${section}`,
					},
				];
			}
			break;
		}
	}
}

let section = "",
	intersectionObserversActivated = false,
	oldPath = "";
const observer = new IntersectionObserver(
	entries => {
		let visibleSection = "";
		for (const entry of entries) {
			if (entry.intersectionRatio > 0) {
				visibleSection = entry.target.id;
				break;
			}
		}
		if (visibleSection !== section) section = visibleSection;
	},
	{
		threshold: [0.0, 0.05],
	}
);
function activateMainIntersectionObservers(pathList: string[]): void {
	if (intersectionObserversActivated) return;
	switch (pathList[0] ?? "") {
		case "":
			observer.observe(document.querySelector("#cont2"));
			observer.observe(document.querySelector("#cont4"));
			break;
		case "topics":
			const articles = [...document.querySelectorAll(".article")];
			for (const article of articles) observer.observe(article);
			break;
	}
	intersectionObserversActivated = true;
}

function applyCYLDetails(presenceData: PresenceData, pathList: string[]): void {
	const campaignTitle =
			document.querySelector<HTMLDivElement>(".campaigns-title").textContent,
		search = new URLSearchParams(document.location.search);

	presenceData.buttons = [
		{ label: "View Campaign", url: document.location.href },
	];
	switch (pathList[0] ?? "") {
		case "": {
			presenceData.details = `Viewing ${campaignTitle}`;
			break;
		}
		case "about": {
			presenceData.details = `Reading about ${campaignTitle}`;
			break;
		}
		case "mypage": {
			presenceData.details = `Viewing ${campaignTitle}`;
			presenceData.state = "Viewing their votes";
			break;
		}
		case "random": {
			presenceData.details = `Voting for ${campaignTitle}`;
			presenceData.state = "Choosing a random character";
			break;
		}
		case "result":
		case "result-detail":
		case "result_detail":
		case "results": {
			if (
				search.get("overall") ||
				pathList[0] !== "result" ||
				(pathList[0] === "result" && pathList[1])
			) {
				presenceData.details = `Viewing ${campaignTitle} results`;
			} else {
				// Note to future maintainers: The pages for each event look the same, but seem to keep changing
				// the class names for the elements between events.
				// I've tried to make this as future-proof as possible, but if it breaks, this is probably why.
				const winners = [
						...document.querySelectorAll<HTMLDivElement>(
							".result-special-character [class*=result-special-character-wrap], .HeroItem.-golden"
						),
					],
					winnerData = winners.map<PresenceData>(winner => {
						let mainImage = winner.querySelector<HTMLImageElement>(
							".result-stand > img, .hero-image, .HeroItem__Image"
						)?.src;
						if (!mainImage)
							mainImage = getComputedStyle(
								winner.querySelector<HTMLParagraphElement>(
									"[class*=result-stand]"
								)
							)?.backgroundImage.match(/url\((.+)\)/)[1];
						let rankImage = winner.querySelector<HTMLImageElement>(
							".star > img, .icon-rank, .HeroItem__Rank"
						).src;
						if (!rankImage)
							rankImage = getComputedStyle(
								winner,
								"::after"
							).backgroundImage.match(/url\((.+)\)/)[1];
						return {
							...presenceData,
							details: `Viewing winners of ${campaignTitle}`,
							state: `${
								winner.querySelector(
									".hero-result-hero-name, .hero-name, .HeroItem__Name"
								).textContent
							} - ${
								winner.querySelector(
									".hero-result-series-name, .series-name, .HeroItem__SeriesName"
								).textContent
							}`,
							largeImageKey: mainImage,
							smallImageKey: rankImage,
							smallImageText: `${
								winner.querySelector(
									".hero-result-vote-count, .HeroItem__VoteCount, .vote-count"
								).textContent
							} votes}`,
							buttons: [{ label: "View Results", url: document.location.href }],
						};
					});
				for (const winner of winnerData) {
					slideshow.addSlide(winner.largeImageKey, winner, 5e3);
				}
			}
			break;
		}
		case "series": {
			presenceData.details = `Voting for ${campaignTitle}`;
			if (pathList[1]) {
				if (pathList[pathList.length - 1] === "heroes") {
					const seriesTitle = document.title.split(":")[1]?.trim();
					presenceData.state = seriesTitle
						? `Selecting a character from ${seriesTitle}`
						: "Selecting a character from a series";
					presenceData.buttons = [
						{ label: "View Series", url: document.location.href },
					];
				} else {
					const characterName =
						document.querySelector<HTMLParagraphElement>(
							".hero-vote-name"
						)?.textContent;
					presenceData.state = characterName
						? `Voting for ${characterName}`
						: "Voting for a character";
					presenceData.buttons = [
						{ label: "Vote Character", url: document.location.href },
					];
				}
			} else {
				presenceData.state = "Selecting a series";
			}
			break;
		}
	}
}

function applySupportDetails(
	presenceData: PresenceData,
	pathList: string[]
): void {}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname
			.split("/")
			.filter(path => path)
			.slice(1);

	if (oldPath !== pathname) {
		oldPath = pathname;
		section = "";
		intersectionObserversActivated = false;
		slideshow.deleteAllSlides();
		observer.disconnect();
	}

	switch (true) {
		case hostname === "fire-emblem-heroes.com":
			applyMainHostDetails(presenceData, pathList);
			break;
		case hostname === "events.fire-emblem-heroes.com":
		case /vote\d+[.]campaigns[.]fire-emblem-heroes[.]com/.test(hostname):
		case hostname === "support.fire-emblem-heroes.com": {
			if (hostname.startsWith("support")) {
				if (pathList[0] === "vote" || pathList[0] === "vote2") {
					applyCYLDetails(presenceData, pathList.slice(1));
				} else {
					applySupportDetails(presenceData, pathList);
				}
			} else if (hostname.startsWith("vote3")) {
				applyCYLDetails(presenceData, pathList);
			} else {
				applyCYLDetails(presenceData, pathList.slice(1));
			}
			break;
		}
	}

	if (slideshow.getSlides().length) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
