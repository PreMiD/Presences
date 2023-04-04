const presence = new Presence({
		clientId: "917868456232230932",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [privacyMode, showTime] = await Promise.all([
			presence.getSetting<boolean>("privacyMode"),
			presence.getSetting<boolean>("showTime"),
		]),
		presenceData: PresenceData = {
			details: "Делает что-то на Фугапедии",
			largeImageKey: "https://i.imgur.com/L6kpaCb.jpg",
			startTimestamp: showTime ? browsingTimestamp : null,
		},
		generalSearch = document.querySelector<HTMLInputElement>("#general_search"),
		splitPathname = document.location.pathname.split("/");

	if (generalSearch?.ariaExpanded === "true") {
		presenceData.details = "Собирается что-то найти";
		const { value } = generalSearch;
		if (!privacyMode && value) presenceData.state = `по запросу «${value}»`;
		presence.setActivity(presenceData);
		return;
	}

	switch (splitPathname[1]) {
		case "": {
			presenceData.details = "На главной странице";
			break;
		}
		case "account": {
			presenceData.details = "Настраивает аккаунт";
			break;
		}
		case "ad": {
			presenceData.details = "Собирается заказать рекламу";
			break;
		}
		case "b": {
			presenceData.details = "Читает книгу";
			if (!privacyMode) presenceData.state = `«${parseName("book_id")}»`;
			break;
		}
		case "changelog": {
			presenceData.details = "Читает список изменений";
			break;
		}
		case "create": {
			presenceData.details = "Собирается что-то создать";
			break;
		}
		case "d": {
			presenceData.details = "Смотрит правку статьи";
			if (!privacyMode)
				presenceData.state = `«${document.title.slice(3, -12)}»`;
			break;
		}
		case "docs": {
			presenceData.details = "Читает документацию";
			break;
		}
		case "e": {
			presenceData.details = "Редактирует статью";
			if (!privacyMode) presenceData.state = `«${parseName("article_id")}»`;
			break;
		}
		case "edits": {
			presenceData.details = "Смотрит правки на всей вики";
			break;
		}
		case "favourite": {
			presenceData.details = "Смотрит избранное";
			break;
		}
		case "feedback": {
			presenceData.details = "Собирается оставить отзыв";
			break;
		}
		case "h": {
			presenceData.details = "Смотрит историю статьи";
			if (!privacyMode) presenceData.state = `«${parseName("article_id")}»`;
			break;
		}
		case "notifications": {
			presenceData.details = "Читает уведомления";
			break;
		}
		case "offer": {
			presenceData.details = "Читает публичную оферту";
			break;
		}
		case "privacy": {
			presenceData.details = "Читает политику";
			presenceData.state = "конфиденциальности";
			break;
		}
		case "s": {
			const query = parseName(3);
			if (!privacyMode && query) {
				presenceData.details = "Ищет что-то по запросу";
				presenceData.state = `«${query}»`;
			} else presenceData.details = "Ищет что-то";
			break;
		}
		case "subscribe": {
			presenceData.details = "Собирается купить подписку";
			break;
		}
		case "t": {
			presenceData.details = "Смотрит категорию";
			if (!privacyMode) presenceData.state = `«${parseName(3)}»`;
			break;
		}
		case "tags": {
			presenceData.details = "Смотрит все категории";
			break;
		}
		case "termsofuse": {
			presenceData.details = "Читает условия использования";
			break;
		}
		case "u": {
			presenceData.details = "Смотрит профиль пользователя";
			if (!privacyMode) {
				if (splitPathname[2] === "me") {
					presenceData.details = "Смотрит свой профиль";
					presenceData.state = document.querySelector(
						"body > div > div > main > div > div > div > div > div > h2.font-serif-text"
					).textContent;
				} else presenceData.state = parseName("profile_user_id");
				presenceData.largeImageKey = document.querySelector<HTMLImageElement>(
					"body > div > div > main > div > div > div > div > div > img"
				).src;
				presenceData.smallImageKey = "logo";
			}
			break;
		}
		default: {
			if (document.querySelector<HTMLInputElement>("#article_id")) {
				presenceData.details = "Читает статью";
				if (!privacyMode) {
					presenceData.state = `«${parseName(2, "article_id")}»`;
					const image = document.querySelector<HTMLImageElement>(
						"body > div > div > div > div > img"
					);
					if (image) {
						presenceData.largeImageKey = image.src;
						presenceData.smallImageKey = "logo";
					}
				}
			}
		}
	}

	presence.setActivity(presenceData);
});

function parseName(start: number | string, id?: string): string {
	if (typeof start === "string") {
		id = start;
		start = 4;
	}
	return decodeURIComponent(
		document.location.pathname.slice(
			start +
				(id
					? document.querySelector<HTMLInputElement>(`#${id}`).value.length
					: 0)
		)
	);
}
