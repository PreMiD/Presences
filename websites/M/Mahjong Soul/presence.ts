import { browsingTimestamp, presence } from "./util";

const enum Assets {
	Logo = "https://i.imgur.com/X0BvMqW.jpeg",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
			name: "Mahjong Soul",
			type: ActivityType.Competing,
		},
		{ hostname, pathname } = document.location,
		pathList = pathname.split("/").filter(Boolean);

	if (hostname === "mahjongsoul.yo-star.com") {
		// TODO: Add presence for the main website
	} else {
	}

	presence.setActivity(presenceData);
});
