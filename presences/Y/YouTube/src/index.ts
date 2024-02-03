import { type AnyCallback, PresenceType } from "premid";

import type { YouTubeCallback } from "../config.js";

export const main: AnyCallback = (async ({ presence, useSettings, useStrings }) => {
	const { t } = await useStrings("string1", "string3", "string5");

	presence.on("updateData", () => {
		const { showTimestamp } = useSettings();

		presence.setActivity({
			details: t("string1"),
			largeImageKey: "logo",
			name: "Netflix",
			smallImageKey: "thumbnail",
			smallImageText: "string5",
			startTimestamp: showTimestamp ? Date.now() : undefined,
			//* {0} will be replaced with "foo", {1} will be replaced with "bar", etc.
			state: t("string1", "foo", "bar"),
			type: PresenceType.Watching,
		});
	});
}) satisfies YouTubeCallback as AnyCallback;
