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
			const gameHeader = document.querySelector<HTMLAnchorElement>("h1 > a"),
				gameHeaderText = gameHeader.textContent.trim();
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
				".game-header-image img"
			);
			presenceData.buttons = [{ label: "View Game", url: gameHeader }];
			switch (pathList[3]) {
				case "files": {
					presenceData.details = `Viewing files for '${gameHeaderText}'`;
					presenceData.buttons.push({ label: "View Files", url: href });
					break;
				}
				case "forums": {
					presenceData.details = `Viewing forums for '${gameHeaderText}'`;
					presenceData.state = document.querySelector(
						"forums-module h3 span"
					).childNodes[2];
					break;
				}
				case "images": {
					const imageContainers = document.querySelectorAll<HTMLDivElement>(
						"images-module .summary-image-item"
					);
					presenceData.details = `Viewing images for '${gameHeaderText}'`;
					for (let i = 0; i < imageContainers.length; i++) {
						const imageContainer = imageContainers[i],
							imageLink = imageContainer.querySelector<HTMLAnchorElement>(
								".summary-image-thumbnail"
							),
							imageTitle = imageContainer.querySelector<HTMLDivElement>(
								".summary-item-title"
							),
							slide: PresenceData = {
								...presenceData,
								largeImageKey: imageLink.querySelector<HTMLImageElement>("img"),
								smallImageKey: Assets.Question,
								smallImageText: imageTitle,
								buttons: [{ label: "View Image", url: imageLink }],
							};
						slideshow.addSlide(imageLink.href, slide, 5000);
					}
					useSlideshow = true;
					break;
				}
				case "ratings": {
					const reviewElements = document.querySelectorAll<HTMLLIElement>(
						"ratings-module ul > li"
					);
					presenceData.details = `Viewing ratings for '${gameHeaderText}'`;
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
				case "stats": {
					presenceData.details = `Viewing stats for '${gameHeaderText}'`;

					const gamePanels =
						document.querySelectorAll<HTMLDivElement>(".game-stats .panel");
					for (const gamePanel of gamePanels) {
						const gamePanelTitle = gamePanel
								.querySelector("h3")
								.textContent.trim(),
							gamePanelItems =
								gamePanel.querySelectorAll<HTMLLIElement>(".outline-item");

						for (const gamePanelItem of gamePanelItems) {
							const gamePanelItemTitle = gamePanelItem
									.querySelector(".outline-item-title")
									.textContent.trim(),
								gamePanelItemValue = gamePanelItem
									.querySelector(".outline-item-description")
									.textContent.trim(),
								slide: PresenceData = {
									...presenceData,
									state: `${gamePanelTitle}: ${gamePanelItemTitle} - ${gamePanelItemValue}`,
								};
							slideshow.addSlide(gamePanelItemTitle, slide, 5000);
						}
					}

					useSlideshow = true;
					break;
				}
				case "videos": {
					const videoElements = document.querySelectorAll<HTMLDivElement>(
						"videos-module .summary-video-item"
					);
					presenceData.details = `Viewing videos for '${gameHeaderText}'`;
					for (const videoElement of videoElements) {
						const videoLink = videoElement.querySelector<HTMLAnchorElement>(
								".summary-video-thumbnail"
							),
							videoTitle = videoElement.querySelector<HTMLDivElement>(
								".summary-item-title"
							),
							slide: PresenceData = {
								...presenceData,
								largeImageKey: videoLink.querySelector<HTMLImageElement>("img"),
								smallImageKey: Assets.Question,
								smallImageText: videoTitle,
								buttons: [{ label: "View Video", url: videoLink }],
							};
						slideshow.addSlide(videoLink.href, slide, 5000);
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
