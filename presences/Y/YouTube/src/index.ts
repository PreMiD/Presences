import { type AnyCallback, PresenceType } from "premid";

import type { YouTubeCallback } from "../config.js";

export const main: AnyCallback = (async ({ presence, useSettings, useStrings }) => {
	const { t } = await useStrings("string1", "string3", "string5");
	presence.set("name", "YouTube").set("type", PresenceType.Watching).set("startTimestamp", presence.browsingTimestamp);

	presence.on("updateData", () => {
		const { showTimestamp } = useSettings();

		presence.set("state", t("string1"));
		//* {0} will be replaced with the first argument, {1} with the second, and so on
		presence.set("details", t("string3", "foo", "bar"));
		presence.set("smallImageText", t("string5"));

		if (!showTimestamp) presence.unset("startTimestamp");
		presence.setActivity();
	});
}) satisfies YouTubeCallback as AnyCallback;
