import { defineEntryPoint, getContext, useDom } from "premid";

import type { YouTubeConfig } from "../config.js";

const context = getContext<YouTubeConfig>(),
	onReadyStateChange = () => {
		if (document.readyState === "complete") void updateActivity();
	},
	runUpdateActivity = () => {
		void updateActivity();
	},
	updateActivity = async () => {
		const { fetchStrings } = context,
			{ t } = await fetchStrings("string1", "string3", "string5");
	};

export default defineEntryPoint({
	mode: "modern",
	setup: () => {
		const { on } = useDom(),
			{ presence } = context;

		on("document.readystatechange", onReadyStateChange);
		on("window.popstate", runUpdateActivity);
		presence.on("settingUpdate", runUpdateActivity);
	},
	teardown: () => {
		const { off } = useDom(),
			{ presence } = context;

		off("document.readystatechange", onReadyStateChange);
		off("window.popstate", runUpdateActivity);
		presence.off("settingUpdate", runUpdateActivity);
	},
});
