const presence = new Presence({
		clientId: "1042567470738837534",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	slideshow = presence.createSlideshow();

const shortenedURLs: Record<string, string> = {};
async function getShortURL(url: string) {
	if (url.length < 256) return url;
	if (shortenedURLs[url]) return shortenedURLs[url];
	try {
		const pdURL = await (
			await fetch(`https://pd.premid.app/create/${url}`)
		).text();
		shortenedURLs[url] = pdURL;
		return pdURL;
	} catch (err) {
		presence.error(err);
		return url;
	}
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/2LZSDR9.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname, hash } = window.location,
		pathSplit = pathname.split("/").filter(Boolean),
		lastPath = pathSplit[pathSplit.length - 1];

	switch (pathSplit[0] ?? "") {
		case "": {
			presenceData.details = "Browsing home page";
			break;
		}
		case "artist": {
			presenceData.details = "Viewing an artist";
			presenceData.state = document.querySelector("h1").textContent;
			presenceData.largeImageKey = await getShortURL(
				document.querySelector<HTMLImageElement>(".thumbnail_link img").src
			);
			presenceData.buttons = [{ label: "View Artist", url: href }];
			break;
		}
		case "developer": {
			const [, currentPage, currentHeader] =
				hash.match(/page:([^,]+).*?header:([^,]+)/) ?? [];
			let state = "";
			presenceData.details = "Viewing API documentation";
			if (currentPage) {
				state += document.querySelector<HTMLHeadingElement>(
					`#${currentPage}`
				).textContent;
				if (currentHeader) {
					state += ` - ${
						document.querySelector<HTMLHeadingElement>(`#${currentHeader}`)
							.textContent
					}`;
				}
			}
			if (state) presenceData.state = state;
			break;
		}
		case "digs": {
			if (pathSplit[2]) {
				presenceData.details = "Viewing a dig";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.buttons = [{ label: "View Dig", url: href }];
			} else if (pathSplit[1]) {
				presenceData.details = "Browsing digs";
				presenceData.state = document.querySelector("h1").textContent;
			} else {
				presenceData.details = "Browsing digs";
			}
			break;
		}
		case "hc": {
			switch (pathSplit[2] ?? "") {
				case "": {
					presenceData.details = "Browsing the help center";
					break;
				}
				case "articles": {
					presenceData.details = "Reading a help article";
					presenceData.state = document.querySelector("h1").textContent;
					presenceData.buttons = [{ label: "Read Article", url: href }];
					break;
				}
				case "categories":
				case "sections": {
					presenceData.details = "Browsing a help center category";
					presenceData.state = document.querySelector("h1").textContent;
					break;
				}
				case "search": {
					presenceData.details = "Searching the help center";
					presenceData.state =
						document.querySelector<HTMLInputElement>("#query").value;
					break;
				}
			}
			break;
		}
		case "label": {
			if (lastPath === "images") {
				const images =
					document.querySelectorAll<HTMLImageElement>("#view_images img");
				for (let i = 0; i < images.length; i++) {
					slideshow.addSlide(
						i.toString(),
						{
							details: "Viewing label images",
							state: document.querySelector("h2 > a").textContent,
							largeImageKey: await getShortURL(images[i].src),
						},
						5000
					);
				}
			} else {
				presenceData.details = "Viewing a label";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.largeImageKey = await getShortURL(
					document.querySelector<HTMLImageElement>(".thumbnail_link img").src
				);
				presenceData.buttons = [{ label: "View Label", url: href }];
			}
			break;
		}
		case "master": {
			if (pathSplit[1] === "stats") {
				presenceData.details = "Viewing stats for a master release";
				presenceData.state = document.querySelector("h1 > a").textContent;
			} else if (pathSplit[1] === "create") {
				presenceData.details = "Creating a master release";
			} else {
				presenceData.details = "Viewing a master release";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.largeImageKey = await getShortURL(
					document.querySelector<HTMLImageElement>("picture > img").src
				);
				presenceData.buttons = [{ label: "View Release", url: href }];
			}
			break;
		}
		case "release": {
			if (pathSplit[1] === "stats") {
				presenceData.details = "Viewing stats for release";
				presenceData.state = document.querySelector("h1 > a").textContent;
			} else if (pathSplit[2] === "videos") {
				presenceData.details = "Editing videos for release";
				presenceData.state = [...document.querySelector("h1").children]
					.slice(1)
					.map(e => e.textContent)
					.join(" ");
			} else {
				presenceData.details = "Viewing a release";
				presenceData.state = document.querySelector("h1").textContent;
				presenceData.largeImageKey = await getShortURL(
					document.querySelector<HTMLImageElement>("picture > img").src
				);
				presenceData.buttons = [{ label: "View Release", url: href }];
			}
			break;
		}
		case "user": {
			if (lastPath === "reviews") {
				presenceData.details = "Viewing reviews by user";
			} else {
				presenceData.details = "Viewing a user";
			}
			presenceData.state = document.querySelector("h1").textContent.trim();
			presenceData.smallImageKey = await getShortURL(
				document.querySelector<HTMLImageElement>(".user_avatar > img").src
			);
			presenceData.buttons = [{ label: "View User", url: href }];
			break;
		}
		default: {
			presenceData.details = "Browsing";
			presenceData.state = document.title.match(/^(.*?)( \| Discogs)?$/)[1];
		}
	}

	if (presenceData.details) {
		slideshow.deleteAllSlides();
		presence.setActivity(presenceData);
	} else if (slideshow.getSlides().length) {
		presence.setActivity(slideshow);
	} else {
		slideshow.deleteAllSlides();
		presence.setActivity();
	}
});
