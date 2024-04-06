const presence = new Presence({
		clientId: "1222296154058916013",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/YpdxIWv.png",
}

let data: {
	currTime: number;
	duration: number;
	paused: boolean;
} = null;

presence.on(
	"iFrameData",
	async (recievedData: {
		currTime: number;
		duration: number;
		paused: boolean;
	}) => {
		data = recievedData;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			details: "Browsing",
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, href, search } = document.location,
		pathArr = pathname.split("/"),
		buttons = await presence.getSetting<boolean>("buttons");

	switch (pathArr[1]) {
		default: {
			const description = document.querySelector<HTMLHeadingElement>(
				".s-content > .label > .upper > h2"
			);
			if (description) {
				presenceData.details = `Viewing ${description.textContent}`;
				presenceData.smallImageKey = Assets.Viewing;
				if (buttons) {
					presenceData.buttons = [
						{
							label: `View ${description.textContent}`,
							url: href,
						},
					];
				}
			}
			break;
		}
		case "filter":
			presenceData.details = `Searching for ${search.substring(
				search.indexOf("=") + 1
			)}`;
			presenceData.smallImageKey = Assets.Search;
			break;
		case "anime":
			{
				const poster = document.querySelector<HTMLImageElement>(
					".poster > span > img"
				);

				presenceData.largeImageKey = poster.src;
				presenceData.largeImageText = poster.alt;
				presenceData.details = `Watching ${poster.alt}`;

				presenceData.state = `Episode ${pathArr[pathArr.length - 1].substring(
					3
				)}`;

				if (buttons) {
					presenceData.buttons = [
						{
							label: "Watch",
							url: href,
						},
					];
				}
				if (data && !data.paused) {
					[, presenceData.endTimestamp] = presence.getTimestamps(
						data.currTime,
						data.duration
					);
					presenceData.smallImageKey = Assets.Play;
				} else if (data) presenceData.smallImageKey = Assets.Pause;
			}
			break;
		case "user":
			presenceData.details = document
				.querySelector(".sidebar-set > .wrap > a.active")
				.textContent.trim();

			if (presenceData.details === "Watch List") {
				presenceData.state = document.querySelector(
					".user-folder.active"
				).textContent;
			}
			break;
	}

	presence.setActivity(presenceData);
});
