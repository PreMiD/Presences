const presence = new Presence({
		clientId: "1090817608154108046",
	}),
	strings = presence.getStrings({
		play: "presence.playback.playing",
		pause: "presence.playback.paused",
	}),

 Assets = {
	Rumble: "https://i.imgur.com/97X6RHQ.png",
	Live: "https://i.imgur.com/LOh4SHJ.png",
};
presence.on("UpdateData", async () => {
	// setup presence data
	const presenceData: PresenceData = {
		largeImageKey: Assets.Rumble,
	};

	// if page is a video
	if (
		document
			.querySelectorAll("meta")[5]
			.content.startsWith("https://rumble.com/v")
	) {
		// if video is live
		if (document.querySelector(".chat--header")) {
			(presenceData.smallImageKey = Assets.Live),
				(presenceData.smallImageText = "Live");
		}

		// if in privacy mode
		if (await presence.getSetting<string>("privacy")) {
			// if video is live
			if (presenceData.smallImageKey) 
				presenceData.details = "Watching a livestream";
			 else 
				presenceData.details = "Watching a video";
			

			presence.setActivity(presenceData);
			return;
		}

		// if show buttons is enabled
		if (await presence.getSetting<string>("buttons")) {
			presenceData.buttons = [
				{
					label: "Watch",
					url: document.querySelectorAll("meta")[5].content,
				},
			];
			// if video is live
			if (presenceData.smallImageKey) 
				presenceData.buttons[0].label += " Live";
			 else 
				presenceData.buttons[0].label += " Video";
			
		}

		// if show channel picture is enabled
		if (
			document.querySelector("style").outerHTML.search("https://sp.rmbl.ws") &&
			(await presence.getSetting<string>("channelPic"))
		) {
			// find pfp url in the stylesheet
			presenceData.largeImageKey = document
				.querySelector("style")
				.outerHTML.substring(
					document
						.querySelector("style")
						.outerHTML.search("https://sp.rmbl.ws/"),
					document
						.querySelector("style")
						.outerHTML.substring(
							document
								.querySelector("style")
								.outerHTML.search("https://sp.rmbl.ws/")
						)
						.search(";") +
						document
							.querySelector("style")
							.outerHTML.search("https://sp.rmbl.ws/") -
						1
				);
		}

		presenceData.details =
			document.querySelectorAll<HTMLVideoElement>(".h1")[0].innerText;
		presenceData.state = document.querySelectorAll<HTMLVideoElement>(
			".media-heading-name"
		)[0].innerText;

		presence.setActivity(presenceData);

		// if page is a channel
	} else if (
		document.querySelectorAll("meta")[4] &&
		document
			.querySelectorAll("meta")[4]
			.content.startsWith("https://rumble.com/c/")
	) {
		presenceData.details = "Viewing channel";

		// if in privacy mode
		if (await presence.getSetting<string>("privacy")) {
			presence.setActivity(presenceData);
			return;
		}

		presenceData.state = document.querySelector("h1").innerText;

		// if show buttons is enabled
		if (await presence.getSetting<string>("buttons")) {
			// add button
			presenceData.buttons = [
				{
					label: "View Channel",
					url: document.querySelectorAll("meta")[4].content,
				},
			];
		}
		// if show channel picture is enabled
		if (await presence.getSetting<string>("channelPic")) {
			// extract src url from '.listing-header--thumb' element
			presenceData.largeImageKey = document
				.querySelector(".listing-header--thumb")
				.outerHTML.substring(
					40,
					document
						.querySelector(".listing-header--thumb")
						.outerHTML.substring(40)
						.search('"') + 40
				);
		}

		// if page is a user
	} else if (
		document.querySelectorAll("meta")[8] &&
		document
			.querySelectorAll("meta")[8]
			.content.startsWith("https://rumble.com/user/")
	) {
		presenceData.details = "Viewing user";

		// if in privacy mode
		if (await presence.getSetting<string>("privacy")) {
			presence.setActivity(presenceData);
			return;
		}

		presenceData.state = document.querySelector("h1").innerText;

		// if show buttons is enabled
		if (await presence.getSetting<string>("buttons")) {
			// add button
			presenceData.buttons = [
				{
					label: "View User",
					url: document.querySelectorAll("meta")[8].content,
				},
			];
		}
		// if show channel picture is enabled
		if (await presence.getSetting<string>("channelPic")) 
			presenceData.largeImageKey = document.querySelector("img").src;
		

		// if page is home
	} else if (document.location.pathname == "/") {
		presenceData.details = "Browsing";
		presenceData.state = "Home";

		// if page is a browsing page
	} else if (
		document.location.pathname.startsWith("/editor-picks") ||
		document.location.pathname.startsWith("/subscriptions") ||
		document.location.pathname.startsWith("/videos") ||
		document.location.pathname.startsWith("/watch-history") ||
		document.location.pathname.startsWith("/category/")
	) {
		presenceData.details = "Browsing";
		presenceData.state = document.querySelector("h1").innerText;

		// if page is upload
	} else if (document.location.pathname.startsWith("/upload")) 
		presenceData.details = "Uploading a video";

		// if page is account
	 else if (document.location.pathname.startsWith("/account")) 
		presenceData.details = "Managing their account";
	
	presence.setActivity(presenceData);
});
