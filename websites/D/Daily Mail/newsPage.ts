import { findPage } from "./findPage";
import { Assets } from "./presence";

function handleArticle(presenceData: PresenceData): void {
	const aBody = document.querySelector("#js-article-text"),
		titleEl = aBody.querySelector("h1");
	presenceData.buttons = [{ label: "Read Article", url: document.location.href }];

	if (titleEl.querySelector(".is-exclusive")) {
		presenceData.details = "Reading Article";
		presenceData.state = titleEl.textContent.replace("EXCLUSIVE", "");
		presenceData.smallImageKey = Assets.exclIco;
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
	const newsPaths = document.location.pathname
		.split("/")
		.find(e => e && e !== "news");

	if (newsPaths.includes("article-")) handleArticle(presenceData);
	else findPage(document.location.pathname.substring(1), presenceData);
}
