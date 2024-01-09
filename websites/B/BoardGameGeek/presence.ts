const presence = new Presence({
		clientId: "1194078283919274004",
	}),
	slideshow = presence.createSlideshow();

let oldPath = document.location.pathname,
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/KxdUXPF.png",
	RatingIcon = "https://i.imgur.com/hxfFQ0h.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
		},
		{ pathname, href } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	if (oldPath !== pathname) {
		oldPath = pathname;
		browsingTimestamp = Math.floor(Date.now() / 1000);
		slideshow.deleteAllSlides();
	}

	let useSlideshow = false;

	switch (pathList[0] ?? "/") {
		case "/": {
			presenceData.details = "Browsing the homepage";
			break;
		}
		case "blogpost": {
			const postHeader =
				document.querySelector<HTMLAnchorElement>(".post_title > a");
			presenceData.details = "Reading a blog post";
			presenceData.state = postHeader;
			presenceData.buttons = [{ label: "Read Post", url: postHeader }];
			break;
		}
		case "boardgame": {
			const gameHeader = document.querySelector<HTMLAnchorElement>("h1 > a");
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".game-header-image img"
			);
			presenceData.buttons = [{ label: "View Game", url: gameHeader }];
			switch (pathList[3]) {
				case "forums": {
					presenceData.details = `Viewing forums for '${gameHeader.textContent.trim()}'`;
					presenceData.state = document.querySelector(
						"forums-module h3 span"
					).childNodes[2];
					break;
				}
				case "ratings": {
					const reviewElements = [
						...document.querySelectorAll<HTMLLIElement>(
							"ratings-module ul > li"
						),
					].filter(reviewElement => {
						return !!reviewElement.querySelector<HTMLSpanElement>(
							".comment-body span"
						).textContent;
					});
					presenceData.details = `Viewing ratings for '${gameHeader.textContent.trim()}'`;
					for (const reviewElement of reviewElements) {
						let text = reviewElement
							.querySelector<HTMLDivElement>(".summary-item-callout")
							.textContent.trim();
						if (
							reviewElement.querySelector<HTMLSpanElement>(".comment-body span")
								.textContent
						) {
							text += ` - ${reviewElement
								.querySelector<HTMLSpanElement>(".comment-body span")
								.textContent.trim()}`;
						}
						const avatar =
								reviewElement.querySelector<HTMLImageElement>(".avatar"),
							username = reviewElement
								.querySelector<HTMLAnchorElement>(".comment-header-user")
								.textContent.trim(),
							slide: PresenceData = {
								...presenceData,
								state: text,
								smallImageKey: avatar ? avatar : Assets.Question,
								smallImageText: username,
							};
						slideshow.addSlide(username, slide, 5000);
					}
					useSlideshow = true;
					break;
				}
				default: {
					presenceData.details = "Viewing a game";
					presenceData.state = gameHeader;
					presenceData.smallImageKey = Assets.RatingIcon;
					presenceData.smallImageText = `Rating: ${document
						.querySelector("overall-rating [ng-show=showRating]")
						.textContent.trim()}`;
				}
			}
		}
	}

	if (useSlideshow) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.clearActivity();
});
