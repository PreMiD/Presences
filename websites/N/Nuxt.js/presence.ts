const presence = new Presence({
	clientId: "691080074006495303",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {},
		theme = getCookie("nuxt-theme");

	if (!theme) presenceData.largeImageKey = "https://i.imgur.com/6A7Q1dP.png";
	else presenceData.largeImageKey = `${theme}`;

	presenceData.smallImageKey = "reading";

	switch (document.location.hostname.split(".")[0]) {
		case "fr":
			presenceData.smallImageText = "Language: Français";
			break;
		case "zh":
			presenceData.smallImageText = "Language: 简体中文";
			break;
		case "ja":
			presenceData.smallImageText = "Language: 日本語";
			break;
		case "ko":
			presenceData.smallImageText = "Language: 한국어";
			break;
		case "ru":
			presenceData.smallImageText = "Language: Русский";
			break;
		case "id":
			presenceData.smallImageText = "Language: Indonesian";
			break;
		default:
			presenceData.smallImageText = "Language: English";
	}

	if (document.location.pathname === "/") presenceData.details = "Home";
	else if (document.location.pathname.includes("/guide")) {
		presenceData.details = "Guide";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("article h1").textContent;
	} else if (document.location.pathname.includes("/api")) {
		presenceData.details = "API";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("article h1").textContent;
	} else if (document.location.pathname.includes("/examples")) {
		presenceData.details = "Examples";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("article h1").textContent;
	} else if (document.location.pathname.includes("/faq")) {
		presenceData.details = "FAQ";
		presenceData.state =
			document.querySelector<HTMLHeadingElement>("article h1").textContent;
	} else
		presenceData.details =
			document.querySelector<HTMLTitleElement>("title").textContent;

	if (!presenceData.details) presence.setActivity();
	else {
		if (!presenceData.state) presenceData.state = "Navigate...";
		presence.setActivity(presenceData);
	}
});

function getCookie(name?: string) {
	const parts = `; ${document.cookie}`.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(";").shift();
}
