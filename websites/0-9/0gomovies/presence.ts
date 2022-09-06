const presence = new Presence({
		clientId: "1016086539861753937",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let iFrameData: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

presence.on(
	"iFrameData",
	(data: { currTime: number; duration: number; paused: boolean }) => {
		iFrameData = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			startTimestamp: browsingTimestamp,
			largeImageKey: "https://i.imgur.com/qldgMDR.png",
		},
		{ href } = document.location,
		pathname = document.location.pathname.split("/");
	switch (pathname[1]) {
		case "movie":
		case "tv": {
			const title = document.querySelector("div.mvic-desc h3");
			if (!title) {
				presenceData.details = "Browsing";
				break;
			}
			presenceData.details = title.textContent.trim();
			if (iFrameData) {
				if (!iFrameData.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						iFrameData.currTime,
						iFrameData.duration
					);
					presenceData.smallImageKey = "play";
				} else presenceData.smallImageKey = "pause";
			}
			presenceData.buttons = [
				{
					label: "Watch Video",
					url: href,
				},
			];
			break;
		}
		case "":
		case "home":
			presenceData.details = "Browsing Home";
			break;
		case "genre":
			presenceData.details = `Browsing Genre: ${pathname[2]}`;
			break;
		case "search-query":
			presenceData.details = `Searching for ${pathname[2]}`;
			presenceData.smallImageKey = "search";
			break;
		default:
			presenceData.details = "Browsing";
			break;
	}
	presence.setActivity(presenceData);
});
