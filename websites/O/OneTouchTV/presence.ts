const presence = new Presence({
		clientId: "1160179473044476017",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

class iframeData {
	paused: boolean;
	duration: number;
	currentTime: number;
}
let video: iframeData = null;

presence.on("iFrameData", (data: iframeData) => {
	video = data;
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/v04o7nQ.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location;

	switch (true) {
		case pathname === "/": {
			presenceData.details = "Viewing the homepage";
			break;
		}
		case pathname === "/movie": {
			presenceData.details = "Viewing all movies";
			break;
		}
		case pathname === "/tvshow": {
			presenceData.details = "Viewing all tv shows";
			break;
		}
		case pathname === "/live": {
			presenceData.details = "Viewing all live content";
			break;
		}
		case pathname.includes("/search"): {
			const inputEl = document
				.querySelector("body > flt-glass-pane")
				.shadowRoot.querySelectorAll("input")[1]?.value;
			presenceData.smallImageKey = Assets.Search;
			if (inputEl?.length !== 0) {
				presenceData.details = "Searching for";
				presenceData.state = inputEl;
			} else presenceData.details = "Looking something up";

			break;
		}
		case pathname.includes("/actor/"): {
			presenceData.details = "Viewing actor";
			presenceData.state =
				document
					.querySelector("title")
					?.textContent.replace(/ - OneTouch TV/gm, "") ?? "";
			presenceData.buttons = [{ label: "View Actor", url: href }];
			break;
		}
		case pathname.includes("/detail/"): {
			const title =
				document
					.querySelector("title")
					.textContent.replace(/ - OneTouch TV/gm, "")
					.trim() === ""
					? document
							.querySelector("body > flt-glass-pane")
							.shadowRoot.querySelector(
								"flt-scene-host > flt-scene > flt-transform > flt-offset > flt-offset > flt-clip > flt-clip-interior > flt-offset > flt-clip > flt-clip-interior > flt-clip > flt-clip-interior > flt-offset > flt-offset > flt-clip > flt-clip-interior > flt-offset:nth-child(2) > flt-picture:nth-child(3) > flt-canvas > flt-paragraph:nth-child(3) > flt-span:nth-child(1)"
							)?.textContent
					: document
							.querySelector("title")
							?.textContent.replace(/ - OneTouch TV/gm, "");
			if (title?.includes("Episode")) {
				presenceData.details = title.split("- Episode")[0];
				presenceData.state = `Episode${title.split("- Episode")[1]}`;
			} else presenceData.details = title;

			if (video) {
				delete presenceData.startTimestamp;
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						video.currentTime,
						video.duration
					);
				}
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.buttons = [{ label: "Watch Video", url: href }];
			} else presenceData.buttons = [{ label: "View Content", url: href }];
			break;
		}
	}
	presence.setActivity(presenceData);
});
