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
		{ pathname, href, search } = document.location,
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
			presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
				"meta[property='og:image']"
			).content;
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
				case "credits": {
					presenceData.details = `Viewing credits for '${gameHeaderText}'`;
					break;
				}
				case "expansions": {
					const expansions = document.querySelectorAll<HTMLDivElement>(
						"linked-items-module .summary-item"
					);
					presenceData.details = `Viewing expansions for '${gameHeaderText}'`;

					for (const expansion of expansions) {
						const expansionLink = expansion.querySelector<HTMLAnchorElement>(
								".summary-item-title > a"
							),
							ratingContainer = expansion.querySelector<HTMLDivElement>(
								".rating-media-overlay"
							),
							slide: PresenceData = {
								...presenceData,
								largeImageKey:
									expansion.querySelector<HTMLImageElement>(".media img"),
								state: expansionLink,
								smallImageKey: Assets.RatingIcon,
								smallImageText: `Rating: ${ratingContainer.childNodes[2].textContent.trim()} (${ratingContainer.getAttribute(
									"uib-tooltip"
								)})`,
							};
						slide.buttons.push({ label: "View Expansion", url: expansionLink });
						slideshow.addSlide(expansionLink.href, slide, 5000);
					}

					if (expansions.length) useSlideshow = true;
					break;
				}
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
				case "geeklists": {
					presenceData.details = `Viewing GeekLists for '${gameHeaderText}'`;
					const geeklists = document.querySelectorAll<HTMLLIElement>(
						"geeklists-module .summary-item"
					);

					for (const geeklist of geeklists) {
						const geeklistLink = geeklist.querySelector<HTMLAnchorElement>(
								".summary-item-title > a"
							),
							slide: PresenceData = {
								...presenceData,
								state: geeklistLink,
							};
						slide.buttons.push({ label: "View GeekList", url: geeklistLink });
						slideshow.addSlide(geeklistLink.href, slide, 5000);
					}

					if (geeklists.length) useSlideshow = true;
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
							};
						slide.buttons.push({ label: "View Image", url: imageLink });
						slideshow.addSlide(imageLink.href, slide, 5000);
					}
					if (imageContainers.length) useSlideshow = true;
					break;
				}
				case "marketplace": {
					presenceData.details = `Viewing stores for '${gameHeaderText}'`;
					break;
				}
				case "mentions": {
					presenceData.details = `Viewing mentions for '${gameHeaderText}'`;
					break;
				}
				case "mygames": {
					presenceData.details = `Viewing their collections for '${gameHeaderText}'`;
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
					if (reviewElements.length) useSlideshow = true;
					break;
				}
				case "recommendations": {
					presenceData.details = `Viewing recommendations for '${gameHeaderText}'`;
					break;
				}
				case "sleeves": {
					presenceData.details = `Viewing sleeves for '${gameHeaderText}'`;
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
				case "tags": {
					presenceData.details = `Viewing tags for '${gameHeaderText}'`;
					break;
				}
				case "trading": {
					presenceData.details = `Viewing trades for '${gameHeaderText}'`;
					break;
				}
				case "versions": {
					presenceData.details = `Viewing versions for '${gameHeaderText}'`;
					const versions = document.querySelectorAll<HTMLAnchorElement>(
						"linked-items-module .summary-item-title > a"
					);
					for (const version of versions) {
						const slide: PresenceData = {
							...presenceData,
							state: version,
						};
						slide.buttons.push({ label: "View Version", url: version });
						slideshow.addSlide(version.href, slide, 5000);
					}
					if (versions.length) useSlideshow = true;
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
							};
						slide.buttons.push({ label: "View Video", url: videoLink });
						slideshow.addSlide(videoLink.href, slide, 5000);
					}
					if (videoElements.length) useSlideshow = true;
					break;
				}
				case "wiki": {
					presenceData.details = `Viewing the wiki for '${gameHeaderText}'`;
					presenceData.buttons.push({ label: "View Wiki", url: href });
					break;
				}
				default: {
					presenceData.details = "Viewing a game";
					presenceData.state = `${gameHeaderText} - ${gameHeader
						.closest("div")
						.querySelector("p")
						.textContent.trim()}`;
					presenceData.smallImageKey = Assets.RatingIcon;
					presenceData.smallImageText = `Rating: ${document
						.querySelector("overall-rating [ng-show=showRating]")
						.textContent.trim()}`;
				}
			}
			break;
		}
		case "geeklists": {
			if (pathList[1]) {
				presenceData.details = "Viewing a GeekList";
				presenceData.state = document.querySelector("header h2");
				presenceData.buttons = [{ label: "View GeekList", url: href }];

				const items = document.querySelectorAll<HTMLDivElement>(
					"gg-geeklist-items-by-geeklist gg-geeklist-item .geeklist-item"
				);
				for (const item of items) {
					const itemLink = item.querySelector<HTMLAnchorElement>("h2 a"),
						slide: PresenceData = {
							...presenceData,
							smallImageKey:
								item.querySelector<HTMLImageElement>("gg-image img"),
							smallImageText: itemLink,
						};
					slide.buttons.push({ label: "View Item", url: itemLink });
					slideshow.addSlide(itemLink.href, slide, 5000);
				}

				useSlideshow = true;
			} else {
				presenceData.details = "Browsing GeekLists";
			}
			break;
		}
		case "geeksearch.php": {
			const searchParams = new URLSearchParams(search);
			presenceData.details = "Searching for a game";
			presenceData.state = searchParams.get("q");
			break;
		}
	}

	if (useSlideshow) presence.setActivity(slideshow);
	else if (presenceData.details) presence.setActivity(presenceData);
	else presence.clearActivity();
});
