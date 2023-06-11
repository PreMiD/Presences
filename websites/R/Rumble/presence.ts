const presence = new Presence({
	clientId: "1090817608154108046",
});

const enum Assets {
	Rumble = "https://i.imgur.com/97X6RHQ.png",
	LiveDot = "https://i.imgur.com/LOh4SHJ.png",
}

presence.on("UpdateData", async () => {
	const [privacy, buttons, channelPic] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("channelPic"),
		]),
		{ pathname } = document.location,
		presenceData: PresenceData = {
			largeImageKey: Assets.Rumble,
		};

	if (
		document
			.querySelector<HTMLMetaElement>("meta[property='og:url']")
			.content.startsWith("https://rumble.com/v") &&
		!pathname.startsWith("/videos")
	) {
		if (document.querySelector(".chat--header")) {
			(presenceData.smallImageKey = Assets.LiveDot),
				(presenceData.smallImageText = "Live");
		}

		if (privacy) {
			if (presenceData.smallImageKey)
				presenceData.details = "Watching a livestream";
			else presenceData.details = "Watching a video";

			presence.setActivity(presenceData);
			return;
		}

		if (buttons) {
			presenceData.buttons = [
				{
					label: "Watch",
					url: document.querySelectorAll("meta")[5].content,
				},
			];
			if (presenceData.smallImageKey) presenceData.buttons[0].label += " Live";
			else presenceData.buttons[0].label += " Video";
		}

		if (
			channelPic &&
			window.getComputedStyle(document.querySelector("i")).backgroundImage !==
				"none"
		) {
			presenceData.largeImageKey = window
				.getComputedStyle(document.querySelector("i"))
				.backgroundImage.slice(
					5,
					window.getComputedStyle(document.querySelector("i")).backgroundImage
						.length - 2
				);
		}

		presenceData.details =
			document.querySelector<HTMLVideoElement>(".h1").textContent;
		presenceData.state = document.querySelector<HTMLVideoElement>(
			".media-heading-name"
		).textContent;

		presence.setActivity(presenceData);
	} else if (
		document
			.querySelector<HTMLMetaElement>("meta[property='og:url']")
			.content.startsWith("https://rumble.com/c/")
	) {
		presenceData.details = "Viewing channel";

		if (privacy) {
			presence.setActivity(presenceData);
			return;
		}

		presenceData.state = document.querySelector("h1").textContent;

		if (buttons) {
			presenceData.buttons = [
				{
					label: "View Channel",
					url: document.querySelectorAll("meta")[4].content,
				},
			];
		}
		if (channelPic && document.querySelectorAll("img")[1].currentSrc) {
			// extract src url from '.listing-header--thumb' element
			presenceData.largeImageKey =
				document.querySelectorAll("img")[1].currentSrc;
		}
	} else if (
		document
			.querySelector<HTMLMetaElement>("meta[property='og:url']")
			.content.startsWith("https://rumble.com/user/")
	) {
		presenceData.details = "Viewing user";

		if (privacy) {
			presence.setActivity(presenceData);
			return;
		}

		presenceData.state = document.querySelector("h1").textContent;

		if (buttons) {
			presenceData.buttons = [
				{
					label: "View User",
					url: document.querySelectorAll("meta")[8].content,
				},
			];
		}
		if (channelPic)
			presenceData.largeImageKey = document.querySelector("img").src;
	} else if (pathname === "/") {
		presenceData.details = "Browsing";
		presenceData.state = "Home";
	} else if (
		(pathname.startsWith("/editor-picks") &&
			pathname.startsWith("/subscriptions")) ||
		pathname.startsWith("/videos") ||
		pathname.startsWith("/watch-history") ||
		pathname.startsWith("/category/")
	) {
		presenceData.details = "Browsing";
		presenceData.state = document.querySelector("h1").textContent;
	} else if (pathname.startsWith("/upload"))
		presenceData.details = "Uploading a video";
	else if (pathname.startsWith("/account"))
		presenceData.details = "Managing their account";

	presence.setActivity(presenceData);
});
