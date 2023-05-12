const presence = new Presence({
		clientId: "945791515169521694",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

enum Assets {
	Play = "https://i.imgur.com/q57RJjs.png",
	Pause = "https://i.imgur.com/mcEXiZk.png",
	Stop = "https://i.imgur.com/aLYu3Af.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Question = "https://i.imgur.com/pIIJniP.png",
	Live = "https://i.imgur.com/0HVm46z.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
	Writing = "https://i.imgur.com/Pa00qZh.png",
	Call = "https://i.imgur.com/y4YKRZG.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/qkODaWg.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/wYCAFtE.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		pathArr = pathname.split("/");

	switch (pathArr[1]) {
		case "":
			presenceData.details = "Viewing the home page";
			break;

		case "story":
			presenceData.details = "Reading Homestuck^2";
			presenceData.smallImageKey = "heart";
			if (!pathArr[2]) presenceData.state = `Page 1 of ${await getPages()}`;
			else presenceData.state = `Page ${pathArr[2]} of ${await getPages()}`;

			if (document.querySelector("h2"))
				presenceData.smallImageText = document.querySelector("h2").textContent;
			else {
				presenceData.smallImageText =
					document.querySelector("title").textContent;
			}
			presenceData.buttons = [
				{
					label: "Read Along",
					url: `https://www.homestuck2.com${pathname}`,
				},
			];
			break;

		case "bonus":
			presenceData.details = "Viewing bonus content";
			switch (pathArr[2]) {
				case "catnapped":
					presenceData.details = "Reading Catnapped";
					presenceData.smallImageKey = "heart";
					presenceData.state = `Page ${pathArr[3]} of 28`;
					presenceData.smallImageText =
						document.querySelector("h2").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: `https://www.homestuck2.com${pathname}`,
						},
					];
					break;

				case "a-treatise-on-representational-democracy":
					presenceData.details =
						"Reading A Treatise on Representational Democracy";
					presenceData.smallImageKey = "heart";
					presenceData.state = `Page ${pathArr[3]} of 13`;
					presenceData.smallImageText =
						document.querySelector("h2").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: `https://www.homestuck2.com${pathname}`,
						},
					];
					break;

				case "diamonds-dames-and-dads":
					presenceData.details = "Reading Diamonds, Dames, and Dads";
					presenceData.smallImageKey = "heart";
					presenceData.state = `Page ${pathArr[3]} of 46`;
					presenceData.smallImageText =
						document.querySelector("h2").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: `https://www.homestuck2.com${pathname}`,
						},
					];
					break;

				case "a-threat-sensed":
					presenceData.details = "Reading A Threat, Sensed";
					presenceData.smallImageKey = "heart";
					presenceData.state = `Page ${pathArr[3]} of 13`;
					presenceData.smallImageText =
						document.querySelector("h2").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: `https://www.homestuck2.com${pathname}`,
						},
					];
					break;

				case "the-influencers":
					presenceData.details = "Reading The Influencers";
					presenceData.smallImageKey = "heart";
					presenceData.state = `Page ${pathArr[3]} of 34`;
					presenceData.smallImageText =
						document.querySelector("h2").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: `https://www.homestuck2.com${pathname}`,
						},
					];
					break;

				default:
					break;
			}
			break;

		case "about":
			presenceData.details = "Viewing the about page";
			break;

		case "contacts":
			presenceData.details = "Viewing the contact information";
			break;

		case "credits":
			presenceData.details = "Viewing the credits";
			break;

		case "log":
			presenceData.details = "Viewing the adventure log";
			break;

		case "privacy-policy":
			presenceData.details = "Viewing the privacy policy";
			break;

		case "recap":
			presenceData.details = "Viewing recap";
			break;

		default:
			presenceData.details = "Viewing an unsupported page";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

async function getPages() {
	const response = await fetch(
			`https://api.rss2json.com/v1/api.json?rss_url=${"https://homestuck2.com/story/rss"}`
		),
		data = await response.json();
	return data.items[0].title;
}
