import { defineEntryPoint, getContext } from "premid";

import type { YouTubeConfig } from "../config.js";

const context = getContext<YouTubeConfig>(),
	onReadyStateChange = () => {
		if (document.readyState === "complete") void main();
	},
	runUpdate = () => {
		void main();
	},
	main = async () => {
		const { fetchStrings } = context,
			{ t } = await fetchStrings("string1", "string3", "string5");
	};

export default defineEntryPoint({
	mode: "modern",
	setup: () => {
		document.addEventListener("readystatechange", onReadyStateChange);
		context.presence.on("settingUpdate", runUpdate);
	},
	teardown: () => {
		document.removeEventListener("readystatechange", onReadyStateChange);
		context.presence.off("settingUpdate", runUpdate);
	},
});
