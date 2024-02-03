import { defineEntryPoint, type WebsitePresenceCallback } from "premid";

import type { YouTubeConfig } from "../config.js";

const main: WebsitePresenceCallback<YouTubeConfig> = async ({ fetchStrings }) => {
	const { t } = await fetchStrings("string1", "string3", "string5");
};

export default defineEntryPoint<YouTubeConfig>({
	mode: "modern",
	setup: context => {
		void main(context);
	},
	teardown: () => {
		// Do nothing
	},
});
