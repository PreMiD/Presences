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

const multiUploader = document.querySelector("div.membersinfo-normal");

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey:
			"https://cdn.rcd.gg/PreMiD/websites/B/bilibili/assets/logo.png",
	};

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

	switch (document.location.hostname) {
		case "www.bilibili.com": {
			switch (urlpath[1]) {
				case "video": {
					getTimestamps();

					if (multiUploader) {
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
