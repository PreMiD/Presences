const presence = new Presence({
		clientId: "1133602327476047873",
	}),
	slideshow = presence.createSlideshow(),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://cdn.discordapp.com/attachments/459040398527037441/1133604869589180436/feh.png",
}

function applyMainHostDetails(presenceData: PresenceData, pathList: string[]): void {
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
					presenceData.state = document.querySelector<HTMLImageElement>("#storySlide .on").alt;
					break;
				}
				case "cont4": {
					const heroName = document.querySelector<HTMLHeadingElement>(".characterSlide-summery-item.active h3").textContent;
					presenceData.details = "Meeting the Heroes";
					presenceData.state = heroName;
					presenceData.largeImageKey = document.querySelector<HTMLImageElement>("#characterSlide .flex-active-slide img").src;
					presenceData.smallImageKey = document.querySelector<HTMLImageElement>(".characterSlide-thumb-item.flex-active").src;
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
			const images = [...document.querySelectorAll<HTMLImageElement>("#topics-detail-content img")];
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
				presenceData.buttons = [{label: "Read Manga", url: document.location.href}];
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
				const articleContainer = document.querySelector<HTMLDivElement>(`${section}`),
					articleDate = articleContainer.querySelector<HTMLSpanElement>(".date").textContent,
					articleTitle = articleContainer.querySelector<HTMLParagraphElement>(".heading").textContent,
					articleImage = articleContainer.querySelector<HTMLImageElement>(".img > img").src;
				presenceData.state = `${articleTitle} - ${articleDate}`;
				presenceData.largeImageKey = articleImage;
				presenceData.buttons = [{label: "Read Article", url: `${document.location.href}#${section}`}];
			}
			break;
		}
	}
}

let section = "",
	intersectionObserversActivated = false;
const observer = new IntersectionObserver((entries) => {
	let visibleSection = "";
	for (const entry of entries) {
		if (entry.intersectionRatio > 0) {
			visibleSection = entry.target.id;
			break;
		}
	}
	if (visibleSection !== section) section = visibleSection;
}, {
	threshold: [0.0, 0.05],
});
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname } = document.location,
		pathList = pathname.split("/").filter((path) => path).slice(1);

	switch (hostname) {
		case "fire-emblem-heroes.com":
			applyMainHostDetails(presenceData, pathList);
			break;
	}

	if (slideshow.getSlides().length) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
