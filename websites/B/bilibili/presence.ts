const presence = new Presence({ clientId: "639591760791732224" }),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	urlpath = document.location.pathname.split("/");

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

let uploader: HTMLElement,
	uploaderName: string,
	uploaderLink: string,
	title: HTMLElement,
	video: HTMLVideoElement,
	videoPaused: boolean,
	currentTime: number,
	duration: number,
	timestamps: number[];

const multiUploader = document.querySelector("div.members-info");

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/w7q6IS0.png",
	};

	async function getTimestamps() {
		video = document.querySelector("bwp-video");
		if (!video) {
			video = document.querySelector("video");
			videoPaused = video.paused;
			timestamps = presence.getTimestampsfromMedia(video);
		} else {
			videoPaused =
				document
					.querySelector(".bilibili-player-video-btn-start")
					.classList.contains("video-state-pause") === true;
			(currentTime = presence.timestampFromFormat(
				document.querySelector(".bilibili-player-video-time-now").textContent
			)),
				(duration = presence.timestampFromFormat(
					document.querySelector(".bilibili-player-video-time-total")
						.textContent
				)),
				(timestamps = presence.getTimestamps(currentTime, duration));
		}

		[presenceData.startTimestamp, presenceData.endTimestamp] = timestamps;

		presenceData.smallImageKey = videoPaused ? "pause" : "play";

		if (videoPaused) {
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	switch (document.location.hostname) {
		case "www.bilibili.com": {
			switch (urlpath[1]) {
				case "video": {
					getTimestamps();

					if (multiUploader) {
						uploader = document.querySelector(
							"#member-container > div:nth-child(1) > div > a"
						);
						uploaderName = `${uploader.textContent} + ${
							document.querySelectorAll(".up-card").length
						} more`;
					} else {
						uploader = document.querySelector("a.username");
						uploaderName = uploader.textContent;
					}

					uploaderLink = uploader.getAttribute("href");
					title = document.querySelector("#viewbox_report > h1");

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
					break;
				}
				default: {
					presenceData.startTimestamp = browsingTimestamp;
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
					label: "View Space", // getString() later
					url: `https://space.bilibili.com/${urlpath[1]}`,
				},
			];
			break;
		}
	}

	presence.setActivity(presenceData);
});
