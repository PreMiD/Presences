const presence = new Presence({
		clientId: "1136991710291955752",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	"Logo0" = "https://i.imgur.com/PhkhX1t.png",
	"Logo1" = "https://i.imgur.com/RMZE8N8.png",
}
let video = {
	exists: false,
	duration: 0,
	currentTime: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: {
		exists: boolean;
		duration: number;
		currentTime: number;
		paused: boolean;
	}) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const [privacy, buttons, logo] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<number>("logo"),
		]),
		presenceData: PresenceData = {
			largeImageKey: logo === 0 ? Assets.Logo0 : Assets.Logo1,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href } = document.location;

	switch (true) {
		case pathname === "/": {
			presenceData.details = "Viewing the homepage";
			presenceData.state =
				document.querySelector('[class*="current-menu-item current_page_item"]')
					?.textContent !== "Strona główna"
					? document.querySelector(
							'[class*="current-menu-item current_page_item"]'
					  )?.textContent
					: "";
			break;
		}
		case pathname.includes("/me/anime/"): {
			presenceData.details = "Viewing their anime list";
			break;
		}
		case pathname.includes("/anime/"): {
			presenceData.details = !privacy
				? JSON.parse(
						document.querySelector('[type="application/ld+json"]')?.innerHTML
				  )?.["@graph"]?.[2]?.itemListElement?.[1]?.name ??
				  document.querySelector(".page-header")?.textContent
				: "Watching an anime";
			presenceData.state = pathname.split("/")?.[3]
				? `Episode ${pathname.split("/")?.[3]}`
				: "";
			if (video?.exists) {
				delete presenceData.startTimestamp;
				presenceData.buttons = [
					{
						label: "Watch Video",
						url: href,
					},
				];
				presenceData.smallImageKey = video.paused ? Assets.Pause : Assets.Play;
				presenceData.smallImageText = video.paused ? "Paused" : "Playing";
				if (!video.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						video.currentTime,
						video.duration
					);
				}
			} else {
				presenceData.buttons = [
					{
						label: "View Anime",
						url: href,
					},
				];
			}
			break;
		}
		default: {
			presenceData.details = "Browsing";
			break;
		}
	}

	if (privacy && presenceData.state) delete presenceData.state;
	if ((!buttons || privacy) && presenceData.buttons)
		delete presenceData.buttons;

	presence.setActivity(presenceData);
});
