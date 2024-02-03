import { definePresence, type PresenceConfig, type WebsitePresenceCallback } from "premid";

import { main } from "./src/index.js";
import { watch } from "./src/watch.js";

const config = {
	category: "video",
	color: "#ff0000",
	description: "Shows the video you're watching on YouTube.",
	id: "af0cdeb1-1416-457a-b0c8-cba3e62ca7c0",
	logo: "https://raw.githubusercontent.com/PreMiD/Presences/master/src/services/youtube/assets/logo.png",
	name: "YouTube",
	thumbnail: "https://raw.githubusercontent.com/PreMiD/Presences/master/src/services/youtube/assets/thumbnail.png",
	website: {
		displayUrl: "youtube.com",
		settings: [
			{
				id: "language",
				languageFiles: true,
				type: "language",
			},
			{
				default: true,
				description: "Show the timestamp in the presence.",
				icon: "fas fa-clock",
				id: "showTimestamp",
				title: "Show Timestamp",
				type: "boolean",
			},
		],
		url: [
			{
				callback: watch,
				match: /^https?:\/\/(?:www\.)?youtube\.com\/watch\?v=/,
			},
			{
				callback: main,
				match: /^https?:\/\/(?:www\.)?youtube\.com/,
			},
		],
	},
} as const satisfies PresenceConfig;

export default definePresence(config);

export type YouTubeConfig = typeof config;
export type YouTubeCallback = WebsitePresenceCallback<YouTubeConfig>;
