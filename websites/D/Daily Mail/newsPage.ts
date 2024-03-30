import { findPage } from "./findPage";
import { Assets } from "./presence";

function handleArticle(presenceData: PresenceData): void {
	const aBody = document.querySelector("#js-article-text"),
		titleEl = aBody.querySelector("h1");
	presenceData.buttons = [{ label: "Read Article", url: window.location.href }];

	if (titleEl.querySelector(".is-exclusive")) {
		presenceData.details = "Reading Article";
		presenceData.state = titleEl.textContent.replace("EXCLUSIVE", "");
		presenceData.smallImageKey = Assets.ExclIco;
		presenceData.smallImageText = "Exclusive!";
	} else {
		presenceData.details = "Reading Article";
		presenceData.state = titleEl.textContent;
		presenceData.smallImageKey = "";
	}

	// authors
	const authors = Array.from(
		aBody.querySelector(".author-section").querySelectorAll("a")
	).map(el => el.textContent);
	presenceData.state = `By ${authors.join(", ") || "unknown"}`;
}

export function handleNewsPage(presenceData: PresenceData): void {
	const newsPaths = window.location.pathname
		.split("/")
		.find(e => e && e !== "news");

	if (newsPaths.includes("article-")) handleArticle(presenceData);
	else findPage(window.location.pathname.substring(1), presenceData);
}
