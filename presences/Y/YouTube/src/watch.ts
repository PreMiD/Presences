import { AnyCallback, PresenceType, useDom } from "premid";

import { YouTubeCallback } from "../config.js";

export const watch: AnyCallback = (({ presence }) => {
	//* Set default presence data
	presence.set("name", "YouTube").set("type", PresenceType.Watching);

	presence.on("updateData", () => {
		const { $, search } = useDom(),
			video = $("video"),
			videoId = search.get("v");
	});
}) satisfies YouTubeCallback as AnyCallback;
