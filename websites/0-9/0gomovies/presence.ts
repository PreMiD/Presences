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
		{ pathname, href } = document.location;
	switch (pathname.split("/")[1]) {
		case "movie":
		// fall through
		case "tv": {
			const title = document
				.querySelectorAll("div.mvic-desc")[0]
				.querySelector("h3");

			if (title) presenceData.details = title.textContent.trim();
			if (!document.querySelectorAll("div.page-cover")[0] && iFrameData) {
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
			presenceData.details = "Browsing Home";
			break;
		case "genre":
			presenceData.details = `Browsing Genre: ${pathname
				.split("/genre/")[1]
				.slice(0, -1)}`;
			break;
		case "search-query":
			presenceData.details = `Searching for ${pathname
				.split("/search-query/")[1]
				.slice(0, -1)}`;
			presenceData.smallImageKey = "search";
			break;
		default:
			presenceData.details = "Browsing";
			break;
	}
	presence.setActivity(presenceData);
});
