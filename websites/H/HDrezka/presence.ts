const presence = new Presence({
	clientId: "1191450515670843533",
});

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		details: "Где-то на сайте",
		largeImageKey: "https://cdn.discordapp.com/app-assets/1191450515670843533/1247862870276833292.png"
	},

		contentType = document
			.querySelector("meta[property='og:url']")
			.getAttribute("content")
			.split("/")[3],

		currentType = contentType === "films" ? "фильм"
			: contentType === "series" ? "сериал"
				: contentType === "cartoons" ? "мультфильм" : "чего-то";

	if (document.location.pathname === "/")
		presenceData.details = "На главной странице";

	if (
		document.location.pathname === "/films" ||
		document.location.pathname === "/series" ||
		document.location.pathname === "/cartoons" ||
		document.location.pathname.match(/\/(films|series|cartoons)\//)
	) {
		if (document.location.pathname.match(/\/(films|series|cartoons)\/.+/)) {
			presenceData.details = `Смотрит ${currentType}`;
			presenceData.state = `${document.querySelector(".b-post__title h1").textContent}`;
			presenceData.largeImageKey = document.querySelector<HTMLImageElement>(".b-sidecover a img").src
			presenceData.smallImageKey = "https://cdn.discordapp.com/app-assets/1191450515670843533/1247862870276833292.png";
			presenceData.buttons = [{
				label: "Открыть страницу",
				url: document.querySelector("meta[property='og:url']").getAttribute("content")
			}];
		} else {
			presenceData.details = `В поиске ${currentType}a`;
			presenceData.smallImageKey = "https://cdn.discordapp.com/app-assets/1191450515670843533/1191452075100479498.png";
		}
	}
	presence.setActivity(presenceData);
});