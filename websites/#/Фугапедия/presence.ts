const presence = new Presence({
		clientId: "917868456232230932"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const [privacyMode, showTime, showButtons] = await Promise.all([
			presence.getSetting<boolean>("privacyMode"),
			presence.getSetting<boolean>("showTime"),
			presence.getSetting<boolean>("showButtons")
		]),
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: showTime ? browsingTimestamp : null
		},
		searchText = document.querySelector("#search-text").textContent;

	if (
		document.querySelector<HTMLDivElement>("#search-input-area").style
			.display === "block" &&
		searchText
	) {
		presenceData.details = "В поисках статьи";
		if (!privacyMode) {
			presenceData.details = "В поисках статьи по запросу";
			presenceData.state = `«${searchText}»`;
		}
		presence.setActivity(presenceData);
		return;
	}

	switch (document.location.pathname) {
		case "/": {
			presenceData.details = "На главной странице";
			break;
		}
		case "/view": {
			presenceData.details = "Читает статью";
			if (!privacyMode) {
				// An article title
				presenceData.state = `«${
					document.querySelector("p.text-4xl.font-bold.font-3").textContent
				}»`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Перейти к статье",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/view_c": {
			presenceData.details = "Смотрит правку";
			if (!privacyMode) {
				// An edit title
				presenceData.state = document.querySelector(
					"p.text-4xl.font-bold.font-3"
				).textContent;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Перейти к правке",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/category": {
			presenceData.details = "Смотрит категорию";
			if (!privacyMode) {
				// A category name
				presenceData.state = `«${
					document.querySelector("p.text-4xl.font-bold.font-3").textContent
				}»`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Перейти в категорию",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/search": {
			presenceData.details = "В поисках статьи";
			if (!privacyMode) {
				const searchRequest = new URLSearchParams(document.location.search).get(
					"q"
				);
				if (searchRequest) {
					presenceData.details = "В поисках статьи по запросу";
					presenceData.state = `«${searchRequest}»`;
				}
			}

			break;
		}
		case "/create": {
			presenceData.details = "Создаёт статью";
			break;
		}
		case "/edit": {
			presenceData.details = "Редактирует статью";
			if (!privacyMode) {
				const pageTitle = document.querySelector("title").textContent;
				// An article title
				presenceData.state = `«${pageTitle.slice(2, pageTitle.length - 12)}»`;
			}

			break;
		}
		case "/edits": {
			presenceData.details = "Смотрит список правок";
			presenceData.state = "на всей вики";

			break;
		}
		case "/history": {
			presenceData.details = "Смотрит историю статьи";
			if (!privacyMode) {
				const pageTitle = document.querySelector("title").textContent;
				// An article title
				presenceData.state = `«${pageTitle.slice(2, pageTitle.length - 12)}»`;
			}

			break;
		}
		case "/portal": {
			presenceData.details = "В портале";
			if (!privacyMode) {
				// A portal name
				presenceData.state = `«${
					document.querySelector("p.text-4xl.font-semibold.text-white")
						.textContent
				}»`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Войти в портал",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/books": {
			presenceData.details = "В поисках книги";
			break;
		}
		case "/book": {
			presenceData.details = "Читает книгу";
			if (!privacyMode) {
				// A book name
				presenceData.state = `«${
					document.querySelector("p.text-4xl.font-bold.font-3").textContent
				}»`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Перейти к книге",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/book-create": {
			presenceData.details = "Создаёт книгу";
			break;
		}
		case "/user": {
			presenceData.details = "Смотрит профиль";
			if (!privacyMode) {
				presenceData.state = `${
					// A user nickname
					document.querySelector(
						"p.text-2xl.text-black.font-medium.ml-4.place-self-center"
					).firstChild.textContent
				} (${
					// A user name
					document.querySelector(
						"p.text-lg.text-gray-600.ml-4.place-self-center"
					).textContent
				})`;
				if (showButtons) {
					presenceData.buttons = [
						{
							label: "Перейти к пользователю",
							url: document.URL
						}
					];
				}
			}

			break;
		}
		case "/privacypolicy": {
			presenceData.details = "Читает политику";
			presenceData.state = "конфиденциальности";

			break;
		}
		case "/termsofuse": {
			presenceData.details = "Читает условия";
			presenceData.state = "использования";

			break;
		}
		case "/ad": {
			presenceData.details = "Читает условия";
			presenceData.state = "размещения рекламы";

			break;
		}
		case "/account": {
			if (document.location.hash === "#admintools")
				presenceData.details = "Что-то делает в админ-панели";
			else presenceData.details = "Редактирует свой аккаунт";

			break;
		}
		case "/sub": {
			presenceData.details = "Собирается купить подписку";
			break;
		}
		case "/upload": {
			presenceData.details = "Загружает изображение";
			break;
		}
		case "/api.php": {
			presenceData.details = "Читает документацию API";
			break;
		}
		default:
			presenceData.details = "Что-то делает на Фугапедии";
	}

	presence.setActivity(presenceData);
});
