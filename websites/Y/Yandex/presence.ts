const presence = new Presence({
		clientId: "1035433850593095740",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000),
	homepageInput =
		document.querySelector<HTMLInputElement>('input[name="text"]'),
	{ host, pathname } = document.location;

let strings: Awaited<ReturnType<typeof getStrings>>;

enum Assets {
	search = "https://i.imgur.com/wYVlwJX.png",
	view = "https://i.imgur.com/hxvvGUi.png",
}

async function getStrings() {
	return presence.getStrings({
		search: "general.search",
		view: "general.viewing",
	});
}

function textContent(tags: string) {
	return document.querySelector(tags)?.textContent;
}

presence.on("UpdateData", async () => {
	if (!strings) strings = await getStrings();

	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/SFXKtLF.png",
			startTimestamp: browsingTimestamp,
		},
		[privacy, logo, time] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("logo"),
			presence.getSetting<boolean>("time"),
		]);

	switch (host) {
		case "ya.ru":
			presenceData.details = "На главной странице";
			if (homepageInput?.value !== "") {
				presenceData.state = `Будет искать: ${homepageInput?.value}`;
				presenceData.smallImageKey = Assets.search;
				presenceData.smallImageText = strings.search;
			}
			break;

		case "yandex.ru":
			presenceData.smallImageKey = Assets.search;
			presenceData.smallImageText = strings.search;
			switch (pathname.split("/")[1]) {
				case "search":
					presenceData.details = `В поиске: ${
						!privacy ? homepageInput?.value : ""
					}`;
					presenceData.state = textContent(".serp-adv__found");
					break;

				case "images":
					presenceData.details = "Яндекс Картинки";
					presenceData.state = `В поиске: ${homepageInput?.value}`;
					if (document.querySelector(".CbirPreview-Preview")) {
						presenceData.state = "В поиске по картинке";
						if (logo && !privacy) {
							presenceData.largeImageKey =
								document.querySelector<HTMLImageElement>(
									"img.CbirPreview-Image"
								)?.src;
						}
					}
					break;

				case "video":
					presenceData.details = "Яндекс Видео";
					presenceData.state = `В поиске: ${homepageInput?.value}`;
					break;

				case "maps":
					presenceData.details = "Яндекс Карты";
					presenceData.state = `В поиске: ${
						document.querySelector<HTMLInputElement>("input")?.value
					}`;
					break;

				case "products":
					presenceData.details = "Яндекс Маркет";
					presenceData.state = `В поиске: ${homepageInput?.value}`;
					break;

				case "blogs":
					presenceData.details = "Яндекс Блоги";
					presenceData.state = `В поиске: ${homepageInput?.value}`;
					break;

				case "pogoda":
					presenceData.details = "Смотрит погоду";
					presenceData.state = document
						.querySelector<HTMLTitleElement>("title")
						.textContent.replace(" — Яндекс.Погода", "");
					presenceData.smallImageKey = Assets.view;
					presenceData.smallImageText = strings.view;
					break;

				case "collections":
					presenceData.details = "Смотрит избранное";
					presenceData.state = document.querySelector(
						".cl-cards-type-filter__button_active"
					)?.firstChild?.textContent;
					if (document.querySelector(".cl-board-header-title__name")) {
						presenceData.details = "Смотрит папку в избранном";
						presenceData.state = document.querySelector(
							".cl-board-header-title__name"
						)?.textContent;
					}
					break;
			}
			break;
	}

	if (!time) delete presenceData.startTimestamp;
	if (privacy) delete presenceData.state;
	presence.setActivity(presenceData);
});
