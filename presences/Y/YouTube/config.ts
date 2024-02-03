import { definePresence, type PresenceConfig, type WebsitePresenceCallback } from "premid";

import { main } from "./src/index.js";
import { watch } from "./src/watch.js";

const config = {
	category: "video",
	color: "#ff0000",
	description: "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
	id: "af0cdeb1-1416-457a-b0c8-cba3e62ca7c0",
	logo: "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/logo.png",
	name: [
		"YouTube",
		"Ютюб",
		"Եություպ",
		"ՅուԹյուբ",
		"יוטוב",
		"יוטיוב",
		"يوتوب",
		"يوتىيۇب",
		"يوتيوب",
		"يوټيوب",
		"يوٽيوب",
		"یو ٹیوب",
		"یوتیوب",
		"یووتیووب",
		"یوٹیوب",
		"युट्युब",
		"यूट्यूब",
		"ইউটিউব",
		"ਯੂਟਿਊਬ",
		"યુટ્યુબ",
		"ୟୁ ଟ୍ୟୁବ",
		"யூடியூப்",
		"యూట్యూబ్",
		"ಯೂಟ್ಯೂಬ್‌",
		"യൂട്യൂബ്",
		"යූ ටියුබ්",
		"ยูทูบ",
		"ຢູທູບ",
		"ယူကျု(ဘ်)",
		"ယူႇၵျုပ်ႉ",
		"ዩ ቱብ",
		"ᱤᱭᱩᱴᱩᱵᱽ",
		"優管",
		"유튜브",
	],
	thumbnail: "https://cdn.rcd.gg/PreMiD/websites/Y/YouTube/assets/thumbnail.jpg",
	website: {
		displayUrl: ["youtube.com", "studio.youtube.com"],
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
