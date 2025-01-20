const presence = new Presence({ clientId: "639591760791732224" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	urlpath = document.location.pathname.split("/");

let uploader: HTMLElement,
	uploaderName: string,
	uploaderLink: string,
	title: HTMLElement,
	video: HTMLVideoElement,
	videoPaused: boolean,
	currentTime: number,
	duration: number,
	timestamps: number[];

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/B/bilibili/assets/logo.png",
		},
		privacy = await presence.getSetting<boolean>("privacy");

	async function getTimestamps() {
		video = document.querySelector("bpx-player-container");
		if (!video) {
			video = document.querySelector("video");
			videoPaused = video.paused;
			timestamps = presence.getTimestampsfromMedia(video);
		} else {
			videoPaused = document.querySelector(".bpx-state-paused") === null;
			(currentTime = presence.timestampFromFormat(
				document.querySelector(".bpx-player-ctrl-time-current").textContent
			)),
				(duration = presence.timestampFromFormat(
					document.querySelector(".bpx-player-ctrl-time-duration").textContent
				)),
				(timestamps = presence.getTimestamps(currentTime, duration));
		}

		[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

		presenceData.smallImageKey = videoPaused ? Assets.Pause : Assets.Play;

		if (videoPaused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	async function setVideoStatus() {
		if (privacy) {
			presenceData.details = "Watching a video";
			return;
		}

		getTimestamps();

		if (document.querySelector("div.membersinfo-normal")) {
			uploader = document.querySelector(".staff-name");

			uploaderName = `${uploader.textContent.trim()} + ${
				parseInt(
					document
						.querySelector(".staff-amt")
						.textContent.trim()
						.replaceAll("人", "")
				) - 1
			} more`;
		} else {
			uploader = document.querySelector(".up-name");
			// "\n      <USERNAME>\n      " -> "<USERNAME>"
			uploaderName = uploader.textContent.trim();
		}

		uploaderLink = uploader.getAttribute("href");
		title = document.querySelector(".video-title");

		presenceData.details = title.getAttribute("title");
		presenceData.state = uploaderName;
		presenceData.buttons = [
			{
				label: "Watch Video", // getString() later
				url: `https://www.bilibili.com/video/${urlpath[2]}`,
			},
			{
				label: "View Space", // getString() later
				url: `https:${uploaderLink}`,
			},
		];
	}

	switch (document.location.hostname) {
		case "www.bilibili.com": {
			switch (urlpath[1]) {
				case "video": {
					setVideoStatus();
					break;
				}
				case "opus": {
					if (privacy) {
						presenceData.details = "Viewing a tweet";
						break;
					}
					presenceData.details = `Viewing ${document
						.querySelector(".opus-module-author__name")
						.textContent.trim()}'s tweet`;
					presenceData.buttons = [
						{
							label: "View Tweet",
							url: `https://www.bilibili.com/opus/${urlpath[2]}`,
						},
					];
					presenceData.startTimestamp = browsingTimestamp;
					break;
				}
				case "read": {
					if (privacy) {
						presenceData.details = "Reading an article";
						break;
					}
					presenceData.details = document
						.querySelector(".title")
						.textContent.trim();
					presenceData.state = document
						.querySelector(".up-name")
						.textContent.trim();
					presenceData.buttons = [
						{
							label: "Read Article",
							url: `https://www.bilibili.com/read/${urlpath[2]}`,
						},
					];
					break;
				}
				case "list": {
					if (privacy) {
						presenceData.details = "Watching a playlist";
						break;
					}
					if (urlpath[2] === "watchlater") {
						setVideoStatus();
						break;
					}
					getTimestamps();
					presenceData.details = document
						.querySelector(".list-title")
						.textContent.trim();
					presenceData.state = document
						.querySelector(".video-title")
						.textContent.trim();
					presenceData.buttons = [
						{
							label: "View Playlist",
							url: `https://www.bilibili.com/list/${urlpath[2]}`,
						},
						{
							label: "Watch Video",
							url: `https:${document
								.querySelector(".video-title-href")
								.getAttribute("href")}`,
						},
					];
					break;
				}
				default: {
					presenceData.startTimestamp = browsingTimestamp;
					presenceData.details = "Viewing the homepage";
					break;
				}
			}
			break;
		}
		case "space.bilibili.com": {
			uploader = document.querySelector("#h-name");

			presenceData.details = "User's space";
			presenceData.state = `${uploader.textContent} | UID:${urlpath[1]}`;
			presenceData.buttons = [
				{
					label: "View Space",
					url: `https://space.bilibili.com/${urlpath[1]}`,
				},
			];
			break;
		}
		case "t.bilibili.com": {
			presenceData.details = "Viewing tweets";
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "message.bilibili.com": {
			presenceData.details = "Viewing messages";
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
		case "live.bilibili.com": {
			if (document.querySelector(".small-title") === null) {
				presenceData.details = document
					.querySelector(".smaller-title")
					.textContent.trim();
			} else if (document.querySelector(".smaller-title") === null) {
				presenceData.details = document
					.querySelector(".small-title")
					.textContent.trim();
			}
			presenceData.state = document
				.querySelector(".room-owner-username")
				.textContent.trim();
			presenceData.buttons = [
				{
					label: "Watch Stream",
					url: `https://live.bilibili.com/${urlpath[1]}`,
				},
			];
			break;
		}
		case "search.bilibili.com": {
			if (privacy) {
				presenceData.details = "Searching for something";
				break;
			}
			presenceData.details = `Searching for ${document
				.querySelector(".search-input-el")
				.getAttribute("value")}`;
			presenceData.state = `Browsing ${
				document.querySelector(".vui_tabs--nav-item-active").textContent
			} Category`;
			presenceData.startTimestamp = browsingTimestamp;
			break;
		}
	}

	presence.setActivity(presenceData);
});
