const presence = new Presence({ clientId: "1125405319594512404" }),
	browsingTimestamp = Math.floor(Date.now() / 1000);

const enum Assets {
	Logo = "https://i.imgur.com/7pAQJgm.png",
}

presence.on("UpdateData", async () => {
	const { pathname } = document.location,
		pathArr = pathname.split("/"),
		{ details, largeImageKey, state } = getPageData(
			pathArr[1],
			pathArr[2],
			pathArr[3]
		),
		presenceData: PresenceData = {
			largeImageKey: largeImageKey || Assets.Logo,
			startTimestamp: browsingTimestamp,
			details,
		};

	if (state) presenceData.state = state;

	if (details) presence.setActivity(presenceData);
});

function getPageData(page: string, pageDetail: string, title: string) {
	switch (page) {
		case "":
			return { details: "Viewing home..." };
		case "categories": {
			const activeMainCategory = document.querySelector(
				"a.category-tile-active"
			)?.textContent;
			let state = "",
				largeImageKey = "";

			if (activeMainCategory) {
				state = activeMainCategory;
				// Replace .gif with .png on main category image
				const imageElement = document.querySelector(
						'a.category-tile-active [src$=".gif"]'
					),
					newSrc = imageElement.getAttribute("src").replace(".gif", ".png");
				imageElement.setAttribute("src", newSrc);
				largeImageKey = newSrc;
			}
			if (pageDetail && title) {
				state += ` > ${pageDetail
					.replace(/-/g, " ")
					.replace(/\b\w/g, match => match.toUpperCase())} > ${title
					.replace(/-/g, " ")
					.replace(/\b\w/g, match => match.toUpperCase())}`;
				largeImageKey =
					document.querySelector<HTMLImageElement>("div.h-full > img")?.src;
			}
			return {
				details: "Viewing categories...",
				state,
				largeImageKey,
			};
		}
	}
}
