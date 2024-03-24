import { findNearestAboveElement } from "../util/util";

// Wiki-specific groups of pages
const strategies = new Set([
	"Sakigiri",
	"Suji",
	"Kabe",
	"Betaori",
	"Kawa",
	"Sashikomi",
	"Defense",
	"Tile_efficiency",
	"Atozuke",
	"Yaku_compatibility",
	"Damaten",
	"Kan",
	"Machi",
	"Riichi_strategy",
	"Shanten",
	"Tenpai",
	"Ukeire",
	"What_would_you_discard",
]);

/**
 * Applies page details based on the current location.
 *
 * @param presenceData
 * @returns Whether the page uses slideshows.
 */
export function specialPageHandler(
	presenceData: PresenceData,
	slideshow: Slideshow
): boolean {
	const { pathname, href, search } = document.location,
		searchParams = new URLSearchParams(search),
		pageTitle = document.querySelector<HTMLSpanElement>(".mw-page-title-main");
	let firstPath = pathname.split("/").find(Boolean),
		usesSlideshows = false;
	if (firstPath === "index.php") firstPath = searchParams.get("title");

	if (searchParams.has("search")) {
		presenceData.details = "Searching for a page";
		presenceData.state = document.querySelector<HTMLInputElement>(
			"#searchText > input"
		)?.value;
	} else if (searchParams.has("action")) {
		const action = searchParams.get("action");
		switch (action) {
			case "edit": {
				presenceData.details = "Editing a page";
				presenceData.state =
					document.querySelector<HTMLSpanElement>("#firstHeadingTitle") ??
					pageTitle;
				break;
			}
			case "history": {
				presenceData.details = "Viewing the revision history of a page";
				presenceData.state = pageTitle;
				break;
			}
		}
	} else {
		// Common WikiMedia pages
		switch (true) {
			case firstPath.startsWith("Talk:"): {
				presenceData.details = `Viewing the talk page for '${pageTitle}'`;
				break;
			}
			case firstPath.startsWith("User:"): {
				presenceData.details = "Viewing a user page";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View User Page", url: href }];
				break;
			}
			case firstPath.startsWith("User_talk:"): {
				presenceData.details = "Viewing a user's talk page";
				presenceData.state = pageTitle;
				break;
			}
			case firstPath.startsWith("File:"): {
				presenceData.details = "Viewing a file";
				presenceData.state = pageTitle;
				presenceData.smallImageKey =
					document.querySelector<HTMLImageElement>("#file img");
				break;
			}
			case firstPath.startsWith("Category:"): {
				presenceData.details = "Viewing a category";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View Category", url: href }];
				break;
			}
			case firstPath === "Special:Upload": {
				presenceData.details = "Uploading a file";
				break;
			}
			case firstPath === "Special:Contributions": {
				presenceData.details = "Viewing a user's contributions";
				presenceData.state = document.querySelector<HTMLAnchorElement>(
					".mw-contributions-user-tools > a"
				);
				break;
			}
		}
		// Wiki-specific pages
		switch (firstPath) {
			case "Jikaze": {
				presenceData.details = "Reading about seat winds";
				break;
			}
			case "List_of_yaku": {
				const tables = document.querySelectorAll<HTMLDivElement>(
					".content-table-wrapper"
				);
				presenceData.details = "Viewing list of yaku";
				usesSlideshows = true;
				for (const table of tables) {
					const tmpPresenceData: PresenceData = { ...presenceData },
						mainName = table.querySelector("a"),
						englishName = table.querySelector("dd dl"),
						closed = table.querySelector("dd + dd"),
						description =
							table.querySelector<HTMLTableCellElement>("td:last-child"),
						sectionHeader = findNearestAboveElement(table, "h2");
					tmpPresenceData.state = `${mainName.textContent} (${englishName.textContent}) - ${sectionHeader.textContent}`;
					tmpPresenceData.smallImageKey = Assets.Question;
					tmpPresenceData.smallImageText = `${closed.textContent} - ${description.textContent}`;
					tmpPresenceData.buttons = [{ label: "View Yaku", url: mainName }];
					slideshow.addSlide(mainName.textContent, tmpPresenceData, 5e3);
				}
				break;
			}
			case "Mahjong_equipment": {
				const tables = document.querySelectorAll<HTMLDivElement>(
					".content-table-wrapper"
				);
				presenceData.details = "Reading about the mahjong equipment";
				usesSlideshows = true;
				for (const table of tables) {
					const sectionTitle =
							table.previousElementSibling.querySelector<HTMLSpanElement>(
								".mw-headline"
							),
						images = table
							.querySelector<HTMLTableRowElement>("tbody > tr")
							.querySelectorAll<HTMLImageElement>("td img"),
						descriptions = table
							.querySelector<HTMLTableRowElement>("tbody > tr + tr")
							.querySelectorAll<HTMLTableCellElement>("td");
					for (let i = 0; i < images.length; i++) {
						const tmpPresenceData: PresenceData = { ...presenceData };
						tmpPresenceData.smallImageKey = images[i];
						tmpPresenceData.smallImageText = descriptions[i];
						tmpPresenceData.state = sectionTitle;
						slideshow.addSlide(
							descriptions[i].textContent,
							tmpPresenceData,
							5e3
						);
					}
				}
				break;
			}
			case "Mentsu": {
				presenceData.details = "Reading about tile groups";
				break;
			}
			case "Rules_overview": {
				presenceData.details = "Reading the rules";
				break;
			}
		}
		// Wiki-specific groups of pages
		for (const strategy of strategies) {
			if (firstPath === strategy) {
				presenceData.details = "Reading about a strategy";
				presenceData.state = pageTitle;
				presenceData.buttons = [{ label: "View Strategy", url: href }];
				break;
			}
		}

		if (!presenceData.details) {
			presenceData.details = "Viewing a page";
			presenceData.state = pageTitle;
		}
	}
	return usesSlideshows;
}
