import { byHref } from "./data";
import { handleSport } from "./handleSport";
import { Assets } from "./presence";

function noTemplate(ext: string, presenceData: PresenceData): void {
	switch (ext.split("/")[0]) {
		case "for-you":
			presenceData.details = "browsing personalized feed";
			break;

		case "games":
			presenceData.details = "playing games!";
			break;

		default:
			presenceData.details = "Browsing the news";
	}
}

const formatTitle = (presenceData: PresenceData): void => {
	presenceData.details = "Browsing Section";
	presenceData.state = document.title.split("|")[0].trim();
};

// I'm leaving this well-commented because I hate regex
function extractNameFromString(formattedString: string, formatPattern: string) {
	let result = "",
		match: RegExpExecArray;

	// Use a loop to find all matches
	while ((match = /(?:{[^}]*})|([^{}]+)/g.exec(formatPattern)) !== null) {
		// Only add the non-undefined (captured group) matches to the result
		if (match[1]) result += match[1];
	}

	// Replace occurrences of any strings from the list with nothing
	return formattedString.replace(
		new RegExp(
			result
				.split(" ")
				.filter(o => o)
				.map(s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
				.join("|"),
			"g"
		),
		""
	);
}

export function findPage(ext: string, presenceData: PresenceData): void {
	// find by template
	const template = byHref[ext];
	if (ext.startsWith("sport")) handleSport(ext, presenceData);
	else if (template && template.customMsg)
		presenceData.details = template.customMsg;
	else if (!template || !template.template) noTemplate(ext, presenceData);
	else if (template.template === "OTHER") {
		presenceData.details = "Browsing Section";
		presenceData.state = template.subsectionTitle;
	} else if (template.template === "USETITLE") formatTitle(presenceData);
	else {
		let el: HTMLElement = document.body;
		for (const CSSsel of template.template.split(" > "))
			el = el?.querySelector(CSSsel);

		// format the title
		const strToAdd =
			template.format && el?.textContent
				? extractNameFromString(el.textContent, template.format)
				: el?.textContent;
		presenceData.details = strToAdd || "the news";
	}

	if (ext === "video/index.html") {
		presenceData.details = `Watching ${presenceData.details}`;
		presenceData.buttons = [
			{ label: "Watch Along", url: document.location.href },
		];

		const vid = document.querySelector("video");
		if (!vid.paused && !vid.ended) presenceData.smallImageKey = Assets.PlayIco;
		else presenceData.smallImageKey = Assets.PauseIco;
	} else {
		presenceData.buttons = [
			{ label: "Browse Along", url: document.location.href },
		];
	}
}
