import { defineEntryPoint, useDom, WebsitePresenceContext } from "premid";

import type { YouTubeConfig } from "../config.js";

const teardown = new AbortController(),
	{ signal } = teardown;

export default defineEntryPoint<YouTubeConfig>({
	mode: "modern",
	setup: (context) => {
		const { on } = useDom(),
			{ presence } = context;

		on(
			"document.readystatechange",
			() => {
				if (document.readyState === "complete") void updateActivity(context);
			},
			{ signal }
		);
		on("window.popstate", () => void updateActivity(context), { signal });
		presence.on("settingUpdate", () => void updateActivity(context), { signal });
	},
	teardown,
});

const updateActivity = async ({ fetchStrings, presence, config: { name } }: WebsitePresenceContext<YouTubeConfig>) => {
	const { $ } = useDom(),
		{ t } = await fetchStrings("string1", "string3", "string5");

	presence.setActivity({
		details: t("string5", $("meta[name='description']")?.getAttribute("content") ?? ""),
		largeImageKey: "https://www.youtube.com/favicon.ico",
		name: name[0],
		startTimestamp: presence.browsingTimestamp,
		state: t("string3", document.title),
	});
};
