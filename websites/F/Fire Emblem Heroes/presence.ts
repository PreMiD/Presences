const presence = new Presence({
		clientId: "1133602327476047873",
	}),
	slideshow = presence.createSlideshow(),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/Wrd78TA.png",
}

function truncateText(text: string): string {
	if (text.length > 127) return `${text.slice(0, 124)}...`;
	return text;
}

function loadImage(image: HTMLImageElement, url: string): Promise<void> {
	return new Promise(resolve => {
		image.addEventListener("load", () => resolve());
		image.src = url;
	});
}

function getCanvasBlob(): Promise<Blob> {
	return new Promise((resolve, reject) => {
		canvas.toBlob(blob => {
			if (!blob) reject();
			resolve(blob);
		}, "image/png");
	});
}

const canvas = document.createElement("canvas"),
	ctx = canvas.getContext("2d");

canvas.height = 512;
canvas.width = 512;

const squareImageCache: Record<string, string> = {};
let isUploading = false;

async function squareImage(url: string) {
	if (squareImageCache[url]) return squareImageCache[url];
	if (isUploading) return Assets.Logo;
	isUploading = true;
	const image = document.createElement("img");
	image.crossOrigin = "anonymous";
	presence.info(`Loading ${url}`);
	await loadImage(image, url);
	presence.info(`Done loading ${url}`);
	const canvasWidth = canvas.width,
		canvasHeight = canvas.height,
		imageWidth = image.naturalWidth,
		imageHeight = image.naturalHeight,
		scale = Math.min(canvasWidth / imageWidth, canvasHeight / imageHeight),
		scaledWidth = imageWidth * scale,
		scaledHeight = imageHeight * scale;

	ctx.clearRect(0, 0, 512, 512);
	ctx.drawImage(
		image,
		(canvasWidth - scaledWidth) / 2,
		(canvasHeight - scaledHeight) / 2,
		scaledWidth,
		scaledHeight
	);

	const file = await getCanvasBlob(),
		formData = new FormData();
	formData.append("file", file, "file");

	const resultURL = await fetch("https://pd.premid.app/create/image", {
		method: "POST",
		body: formData,
	}).then(r => r.text());
	isUploading = false;
	squareImageCache[url] = resultURL;
	return resultURL;
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
					presenceData.state = document.querySelector<HTMLImageElement>(
						"#storySlide .flex-active .on"
					).alt;
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
			} else presenceData.details = "Browsing manga";

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
					`#${section}`
				);

				presenceData.state = `${
					articleContainer.querySelector<HTMLParagraphElement>(".heading")
						.textContent
				} - ${
					articleContainer.querySelector<HTMLSpanElement>(".date").textContent
				}`;
				presenceData.largeImageKey =
					articleContainer.querySelector<HTMLImageElement>(".img > img").src;
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
		let visibleSection = section;
		for (const entry of entries) {
			const id = entry.target.id,
				ratio = entry.intersectionRatio;
			if (ratio > 0.05) {
				visibleSection = id;
				break;
			}
			if (visibleSection === id && ratio < 0.05) {
				visibleSection = "";
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
		case "": {
			observer.observe(document.querySelector("#cont2"));
			observer.observe(document.querySelector("#cont4"));
			break;
		}
		case "topics": {
			const articles = [...document.querySelectorAll(".article")];
			for (const article of articles) observer.observe(article);
			break;
		}
	}
	intersectionObserversActivated = true;
}

async function applyCYLDetails(
	presenceData: PresenceData,
	pathList: string[]
): Promise<void> {
	const campaignTitle =
		document.querySelector<HTMLDivElement>(".campaigns-title")?.textContent ??
		document.title.match(/(?<=-\s).+?(?=$|\s-)/)?.[0] ??
		document.title;
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
				new URLSearchParams(document.location.search).get("overall") ||
				pathList[0].indexOf("detail") !== -1 ||
				(pathList[0] === "result" && pathList[1])
			)
				presenceData.details = `Viewing ${campaignTitle} results`;
			else {
				// Note to future maintainers: The pages for each event look the same, but seem to keep changing
				// the class names for the elements between events.
				// I've tried to make this as future-proof as possible, but if it breaks, this is probably why.
				const winnerData = await Promise.all(
					[
						...document.querySelectorAll<HTMLDivElement>(
							".result-special-character [class*=result-special-character-wrap]"
						),
						...document.querySelectorAll<HTMLDivElement>(".HeroItem.-golden"),
						...document.querySelectorAll<HTMLDivElement>(
							".result-stand-heroes .hero"
						),
					].map<Promise<PresenceData>>(async winner => {
						let mainImage = (
							winner.querySelector<HTMLImageElement>(".result-stand > img") ??
							winner.querySelector<HTMLImageElement>(".hero-image") ??
							winner.querySelector<HTMLImageElement>(".HeroItem__Image") ??
							winner.querySelector<HTMLImageElement>("p > img")
						)?.src;
						if (!mainImage) {
							mainImage = getComputedStyle(
								winner.querySelector<HTMLParagraphElement>(
									"[class*=result-stand]"
								)
							)?.backgroundImage.match(/url\(["']?(.+?)["']?\)/)[1];
						}
						let rankImage = (
							winner.querySelector<HTMLImageElement>(".star > img") ??
							winner.querySelector<HTMLImageElement>(".icon-rank") ??
							winner.querySelector<HTMLImageElement>(".HeroItem__Rank")
						)?.src;
						if (!rankImage) {
							rankImage = getComputedStyle(
								winner,
								"::after"
							).backgroundImage.match(/url\(['"]?(.+?)['"]?\)/)[1];
						}
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
							largeImageKey: await squareImage(mainImage),
							smallImageKey: rankImage,
							smallImageText: `${
								winner.querySelector(
									".hero-result-vote-count, .HeroItem__VoteCount, .vote-count"
								).textContent
							} votes`,
							buttons: [{ label: "View Results", url: document.location.href }],
						};
					})
				);
				for (let i = 0; i < winnerData.length; i++) {
					slideshow.addSlide(`${i}`, winnerData[i], 5e3);
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
			} else presenceData.state = "Selecting a series";
			break;
		}
	}
}

function applySupportDetails(
	presenceData: PresenceData,
	pathList: string[]
): void {
	switch (pathList[0]) {
		case "mjolnir": {
			switch (pathList[1] ?? "") {
				case "": {
					presenceData.details = "Reading about Mjölnir's Strike";
					break;
				}
				case "archives": {
					presenceData.details = "Viewing Mjölnir's Strike archives";
					break;
				}
				case "terms": {
					presenceData.details = `Viewing Mjölnir's Strike: ${
						document.querySelector<HTMLDivElement>(".subtitle-section-white")
							.textContent
					}`;
					presenceData.state = `Askr: ${
						document.querySelector(".battle-left .battle-score").textContent
					} vs. Strike: ${
						document.querySelector(".battle-right .battle-score").textContent
					}`;
					presenceData.buttons = [
						{ label: "View Situation", url: document.location.href },
					];
					break;
				}
			}
			break;
		}
		case "voting_gauntlet": {
			switch (pathList[1]) {
				case "howtoplay": {
					presenceData.details = "Reading about Voting Gauntlet";
					break;
				}
				case "archives": {
					presenceData.details = "Viewing Voting Gauntlet archives";
					break;
				}
				case "tournaments": {
					presenceData.details = `Viewing Gauntlet: ${
						document.querySelector<HTMLSpanElement>("h4 > span").textContent
					}`;
					presenceData.buttons = [
						{ label: "View Gauntlet", url: document.location.href },
					];
					const roundSections = [
						...document.querySelectorAll(".body-section-tournament"),
					].filter(section => !!section.querySelector("h2"));
					for (let i = roundSections.length - 1; i >= 0; i--) {
						const section = roundSections[i];

						for (const [j, battle] of [
							...section.querySelectorAll<HTMLDivElement>(
								".tournaments-battle"
							),
						].entries()) {
							const nameElements = [
									...battle.querySelectorAll<HTMLParagraphElement>(".name"),
								],
								names = nameElements.map(name => name.textContent),
								scores = nameElements.map(
									name => name.nextElementSibling.textContent
								),
								winningImage = getComputedStyle(
									battle.querySelector<HTMLDivElement>(".tournaments-art-win")
										.parentElement
								).backgroundImage.match(/url\(['"]?(.+?)["']?\)/)[1],
								tmpData: PresenceData = Object.assign({}, presenceData);
							tmpData.state = `Round ${roundSections.length - i}: ${
								names[0]
							} vs. ${names[1]}`;
							tmpData.smallImageKey = winningImage;
							tmpData.smallImageText = `${scores[0]} vs. ${scores[1]}`;
							slideshow.addSlide(`round${i}battle${j}`, tmpData, 5e3);
						}
					}
					break;
				}
			}
			break;
		}
	}
}

function applyFehPassDetails(
	presenceData: PresenceData,
	pathList: string[]
): void {
	switch (pathList[0] ?? "") {
		case "": {
			presenceData.details = "Browsing FEH Pass";
			break;
		}
		case "faq": {
			presenceData.details = "Reading FEH Pass FAQ";
			break;
		}
		case "talk": {
			if (pathList[1]) {
				const activeText =
					document.querySelector<HTMLLIElement>(".text.active");
				presenceData.details = "Reading FEH Pass Talk";
				presenceData.state = `${
					document.querySelector<HTMLLIElement>(".chara_name.anime").textContent
				}: ${
					[...activeText.classList].find(c => /\d$/.test(c)).match(/\d+/)[0]
				} / ${
					[
						...document.querySelector<HTMLLIElement>(".text:last-of-type")
							.classList,
					]
						.find(c => /\d$/.test(c))
						.match(/\d+/)[0]
				}`;
				presenceData.smallImageKey = Assets.Question;
				presenceData.smallImageText = truncateText(activeText.textContent);
				presenceData.buttons = [
					{ label: "View Talk", url: document.location.href },
				];
			} else presenceData.details = "Browsing FEH Pass Talk";
			break;
		}
		default: {
			presenceData.details = "Viewing a Resplendent Hero";
			presenceData.state = `${
				document.querySelector<HTMLParagraphElement>(".chara_name").textContent
			}: ${
				document.querySelector<HTMLParagraphElement>(".chara_catch").textContent
			}`;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>(".chara_icon > img").src;
			presenceData.smallImageKey =
				document.querySelector<HTMLImageElement>(".mini_img > img").src;
			presenceData.smallImageText = truncateText(
				document.querySelector(".chara_wrap > p:last-child").textContent
			);
			presenceData.buttons = [
				{ label: "View Hero", url: document.location.href },
			];
		}
	}
}

function applyGuideDetails(
	presenceData: PresenceData,
	pathList: string[]
): void {
	switch (pathList[0] ?? "") {
		case "": {
			presenceData.details = "Browsing the Guide";
			break;
		}
		case "category": {
			if (pathList[1] === "character") {
				presenceData.details = "Browsing the Guide: Character List";
				presenceData.state =
					document.querySelector<HTMLSelectElement>(
						".select_character"
					).selectedOptions[0].textContent;
			} else if (pathList[1] === "comeback") {
				switch (pathList[2] ?? "") {
					case "": {
						presenceData.details = "Browsing the Guide: Returner Tips";
						break;
					}
					case "elementary":
					case "intermediate":
					case "advanced": {
						presenceData.details = "Browsing the Guide: Advanced Training Tips";
						presenceData.details = `Browsing the Guide: ${pathList[2][0].toUpperCase()}${pathList[2].slice(
							1
						)} Training Tips`;
						break;
					}
					case "weapon": {
						presenceData.details = "Browsing the Guide: List of Weapons";
						presenceData.state =
							document.querySelector<HTMLSelectElement>(
								".select_weapon"
							).selectedOptions[0].textContent;
						break;
					}
				}
			}
			break;
		}
		default: {
			const characterImage =
					document.querySelector<HTMLImageElement>(".sec_gif > img").src,
				characterDescriptions = [...document.querySelectorAll("dl dt")].map(
					dt => ({
						text: dt.textContent,
						image: dt.nextElementSibling.querySelector("img").src,
					})
				);
			presenceData.details = `Reading about ${
				document.querySelector<HTMLHeadingElement>(".sec_charaname").textContent
			}: ${
				document.querySelector<HTMLParagraphElement>(".sec_charanick")
					.textContent
			}`;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".slick-slide.slick-current img"
			).src;
			presenceData.smallImageKey = characterImage;
			presenceData.buttons = [
				{ label: "View Character", url: document.location.href },
			];
			slideshow.addSlide(characterImage, presenceData, 5e3);
			for (const description of characterDescriptions) {
				const tmpData: PresenceData = Object.assign({}, presenceData);
				tmpData.smallImageText = truncateText(description.text);
				tmpData.smallImageKey = description.image;
				slideshow.addSlide(description.image, tmpData, 5e3);
			}
		}
	}
}

function applyNewGuideDetails(presenceData: PresenceData): void {
	presenceData.details = "Browsing the Guide";
	presenceData.state = document.querySelector("h1").textContent;
	presenceData.buttons = [{ label: "Read Guide", url: document.location.href }];
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname.split("/").filter(path => path);

	if (oldPath !== pathname) {
		oldPath = pathname;
		section = "";
		intersectionObserversActivated = false;
		slideshow.deleteAllSlides();
		observer.disconnect();
	}

	switch (true) {
		case hostname === "fire-emblem-heroes.com":
			applyMainHostDetails(presenceData, pathList.slice(1));
			break;
		case hostname === "events.fire-emblem-heroes.com":
		case /vote\d+[.]campaigns[.]fire-emblem-heroes[.]com/.test(hostname):
		case hostname === "support.fire-emblem-heroes.com": {
			if (hostname.startsWith("support")) {
				if (pathList[0] === "vote" || pathList[0] === "vote2")
					await applyCYLDetails(presenceData, pathList.slice(1));
				else applySupportDetails(presenceData, pathList);
			} else if (hostname.startsWith("vote3"))
				await applyCYLDetails(presenceData, pathList);
			else await applyCYLDetails(presenceData, pathList.slice(1));
			break;
		}
		case hostname === "fehpass.fire-emblem-heroes.com": {
			applyFehPassDetails(presenceData, pathList.slice(1));
			break;
		}
		case hostname === "guide.fire-emblem-heroes.com": {
			applyGuideDetails(presenceData, pathList.slice(1));
			break;
		}
		case hostname === "new-guide.fire-emblem-heroes.com": {
			applyNewGuideDetails(presenceData);
			break;
		}
	}

	debugData = presenceData;
	debugCount++;

	if (slideshow.getSlides().length) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

let debugData: PresenceData = {};
let debugCount = 0;

setInterval(() => {
	console.log(debugData, debugCount);
	console.log(slideshow.currentSlide);
}, 2500);
