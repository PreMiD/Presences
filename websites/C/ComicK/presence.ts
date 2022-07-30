const presence = new Presence({
		clientId: "866604211248824371",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: "large",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location,
		[image, buttons] = await Promise.all([
			presence.getSetting<boolean>("image"),
			presence.getSetting<boolean>("buttons"),
		]);

	if (pathname === "/") presenceData.details = "Browsing Homepage";
	else if (pathname === "/list") presenceData.details = "Viewing Followed List";
	else if (pathname.startsWith("/comic")) {
		if (document.querySelector(".images-reader-container")) {
			const infoReader = document.querySelector(".info-reader-container"),
				imageReader = document.querySelector(".images-reader-container");
			if (infoReader) {
				const title = infoReader.querySelector<HTMLAnchorElement>("a"),
					chapter = infoReader.querySelector<HTMLHeadingElement>("h1");
				if (title) presenceData.details = `Reading ${title.textContent}`;
				if (chapter) presenceData.state = chapter.textContent;
			} else if (imageReader) {
				const img = imageReader.querySelectorAll<HTMLImageElement>("img")[1],
					chapter = document.querySelector<HTMLHeadingElement>("h1");
				if (img) {
					presenceData.details = `Reading ${img.alt.substring(
						0,
						img.alt.indexOf("chapter")
					)}`;
				}
				if (chapter) presenceData.state = chapter.textContent;
			}
			if (image) {
				presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
					"meta[property='og:image']"
				).content;
			} else presenceData.smallImageKey = "small";
			presenceData.buttons = [
				{
					label: "Read Chapter",
					url: href,
				},
				{
					label: "Read Description",
					url: href.split(/(.+)[\\/]/)[1],
				},
			];
		} else {
			const title = document.querySelector<HTMLHeadingElement>("h1");
			if (title) {
				presenceData.details = "Reading Description";
				presenceData.state = title.textContent;
				if (image) {
					presenceData.largeImageKey = document.querySelector<HTMLMetaElement>(
						"meta[property='og:image']"
					).content;
				}
				presenceData.buttons = [
					{
						label: "Read Description",
						url: href,
					},
				];
			}
		}
	} else if (pathname.startsWith("/group")) {
		presenceData.details = "Looking at group";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("h1").textContent;
	} else if (pathname.startsWith("/search")) {
		presenceData.details = "Searching";
		for (const t of document.querySelectorAll("h1.mb-3 > div")) {
			if (t.textContent) {
				presenceData.state = t.textContent;
				break;
			}
		}
	} else if (pathname.startsWith("/user") && pathname !== "/user") {
		presenceData.details = `Viewing ${
			document.querySelector<HTMLHeadingElement>("h1").textContent
		}`;
		if (image) {
			presenceData.largeImageKey = document
				.querySelector<HTMLImageElement>("#__next div > div > img")
				.src.replace("size=200", "size=640");
		}
	} else {
		switch (pathname) {
			case "/ranking": {
				presenceData.details = "Looking at rankings";
				break;
			}
			case "/comment_list": {
				presenceData.details = "Looking at comment list";
				break;
			}
			case "/settings": {
				presenceData.details = "Settings";
				break;
			}
			case "/languages": {
				presenceData.details = "Languages";
				break;
			}
			case "/privacy": {
				presenceData.details = "Privacy POlicy";
				break;
			}
			case "/install_app": {
				presenceData.details = "ComicK App";
				break;
			}
			case "/user": {
				presenceData.details = "Viewing their profile";
				break;
			}
		}
	}
	if (!buttons) delete presenceData.buttons;
	presence.setActivity(presenceData);
});
