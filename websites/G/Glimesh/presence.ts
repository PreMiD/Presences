const presence = new Presence({
	clientId: "825888886285795329",
});

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
let elapsedTime: number = null;

presence.on("UpdateData", async () => {
	const locationHref = document.location.href,
		locationPath = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/YqIpqg4.png",
		};

	switch (document.location.host) {
		case "glimesh.tv": {
			presenceData.details = "Browsing...";
			if (locationPath === "/") presenceData.details = "Viewing Home Page";
			else if (locationPath.match("/streams/")) {
				presenceData.details = "Viewing Category";
				presenceData.state = document.title.replace(" - Glimesh", "");
			} else if (locationPath === "/users" || locationPath === "/users/")
				presenceData.details = "Viewing All Users";
			else if (locationPath.match("users/settings"))
				presenceData.details = "Viewing Settings";
			else if (locationPath.match("/about")) {
				presenceData.details = "Reading about Glimesh";
				if (locationPath.match("alpha")) {
					presenceData.details = "Reading About";
					presenceData.state = "Alpha Features";
				} else if (locationPath.match("streaming")) {
					presenceData.details = "Reading About";
					presenceData.state = "Streaming";
				} else if (locationPath.match("team"))
					presenceData.details = "Viewing the Team";
				else if (locationPath.match("mission"))
					presenceData.details = "Reading the Mission";
				else if (locationPath.match("credits"))
					presenceData.details = "Reading the Credits";
				else if (locationPath.match("dmca")) {
					presenceData.details = "Reading About";
					presenceData.state = "DMCA Policy";
				} else if (locationPath.match("faq")) {
					presenceData.details = "Reading";
					presenceData.state = "Frequently asked Questions";
				} else if (locationPath.match("terms")) {
					presenceData.details = "Reading the";
					presenceData.state = "Terms of Service";
				} else if (locationPath.match("condut")) {
					presenceData.details = "Reading the";
					presenceData.state = "Rules of Conduct";
				} else if (locationPath.match("privacy")) {
					presenceData.details = "Reading the";
					presenceData.state = "Privacy Policy";
				} else if (locationPath.match("open-data")) {
					presenceData.details = "Viewing Open Data";
					presenceData.state = "Platform User Growth";

					if (locationPath.match("subscriptions"))
						presenceData.state = "Recurring Subscriptions";
					else if (locationPath.match("streams"))
						presenceData.state = "Live Streams";
				}
			} else if (locationPath.match("/profile")) {
				presenceData.details = `Viewing${
					!(await presence.getSetting<boolean>("show_details")) ? " a " : " "
				}Profile`;

				if (await presence.getSetting<boolean>("show_details")) {
					presenceData.state = document.title.replace(
						"'s Profile - Glimesh",
						""
					);
				}

				if (
					(await presence.getSetting<boolean>("show_buttons")) &&
					(await presence.getSetting<boolean>("show_details"))
				) {
					presenceData.buttons = [
						{
							label: "View Profile",
							url: locationHref,
						},
					];
				}
			} else if (document.querySelector("#video-column")) {
				presenceData.details = (await presence.getSetting<boolean>(
					"show_details"
				))
					? document.title.replace(" - Glimesh", "")
					: "Watching a Stream";
				if (await presence.getSetting<boolean>("show_details"))
					presenceData.state = document.querySelector("h3").textContent;

				const video = document.querySelector("video");

				if (
					(await presence.getSetting<boolean>("show_buttons")) &&
					(await presence.getSetting<boolean>("show_details"))
				) {
					presenceData.buttons = [
						{
							label: "View Profile",
							url: (
								document.querySelector(
									"#video-column > div > div.card-footer.p-1.d-none.d-sm-block > div > div.col-8.d-inline-flex.align-items-center > a"
								) as HTMLAnchorElement
							).href,
						},
					];
				}

				if (video && !isNaN(video.duration)) {
					if (
						(await presence.getSetting<boolean>("show_buttons")) &&
						(await presence.getSetting<boolean>("show_details"))
					) {
						presenceData.buttons.unshift({
							label: "Watch Stream",
							url: locationHref,
						});
					}

					if (!video.paused) {
						if (elapsedTime === null)
							elapsedTime = Math.floor(Date.now() / 1000);

						presenceData.smallImageKey = Assets.Play;
						presenceData.smallImageText = "Live!";

						if (await presence.getSetting<boolean>("show_timestamps"))
							presenceData.startTimestamp = elapsedTime;
					} else {
						presenceData.smallImageKey = Assets.Pause;
						presenceData.smallImageText = "Paused";

						if (await presence.getSetting<boolean>("show_timestamps"))
							presenceData.startTimestamp = 0;
					}
				}
			}

			break;
		}
		case "glim.shop": {
			presenceData.details = "Viewing Merch Store";
			break;
		}
		case "support.glimesh.tv": {
			presenceData.details = "Viewing Support";
			break;
		}
		case "blog.glimesh.tv": {
			presenceData.details = "Viewing Blogs";

			if (locationPath.match("/posts")) {
				presenceData.details = `Reading${
					!(await presence.getSetting<boolean>("show_details")) ? " a " : " "
				}Blog`;
				if (await presence.getSetting<boolean>("show_details")) {
					presenceData.state = document.querySelector(
						"body > div > div > div > h1 > a"
					).textContent;
				}

				if (
					(await presence.getSetting<boolean>("show_buttons")) &&
					(await presence.getSetting<boolean>("show_details"))
				) {
					presenceData.buttons = [
						{
							label: "View Blog Post",
							url: locationHref,
						},
					];
				}
			}

			break;
		}
		// No default
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
