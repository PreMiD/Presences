const presence = new Presence({
		clientId: "945791824147128341",
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
			largeImageKey: "https://i.imgur.com/Xm4bmE5.png",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location,
		pathArr = pathname.split("/");

	switch (pathArr[1]) {
		case "":
			presenceData.details = "Viewing the home page";
			break;

		case "vasterror":
			switch (pathArr[2]) {
				case "adventuremap":
					presenceData.details = "Viewing the adventure map";
					break;

				case "credits":
					presenceData.details = "Viewing the credits";
					break;

				case "log":
					presenceData.details = "Viewing the Vast Error log";
					break;

				default:
					presenceData.details = "Reading Vast Error";
					presenceData.smallImageKey = "https://i.imgur.com/9mrXPWm.png";
					presenceData.state = `Page ${pathArr[2]} of ${vePages}`;
					presenceData.smallImageText =
						document.querySelector("#command").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: href,
						},
					];
					break;
			}
			break;

		case "thaumatrope":
			switch (pathArr[2]) {
				case "syzygy":
					presenceData.details = "Reading Thaumatrope: Syzygy";
					presenceData.smallImageKey = "https://i.imgur.com/blViB66.png";
					presenceData.state = `Page ${pathArr[3]} of 162`;
					presenceData.smallImageText =
						document.querySelector("#command").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: href,
						},
					];
					break;

				case "haustoria":
					presenceData.details = "Reading Thaumatrope: Haustoria";
					presenceData.smallImageKey = "https://i.imgur.com/blViB66.png";
					presenceData.state = `Page ${pathArr[3]} of ${htPages}`;
					presenceData.smallImageText =
						document.querySelector("#command").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: href,
						},
					];
					break;

				case "log":
					presenceData.details = "Viewing the Thaumatrope log";
					break;

				default:
					presenceData.details = "Viewing an unsupported page";
					break;
			}
			break;

		case "bonus":
			switch (pathArr[2]) {
				case "april-fools-day-2017":
					presenceData.details = "Reading April Fools 2017";
					presenceData.smallImageKey = "https://i.imgur.com/4L374ii.png";
					presenceData.state = `Page ${pathArr[3]} of 4`;
					presenceData.smallImageText =
						document.querySelector("#command").textContent;
					presenceData.buttons = [
						{
							label: "Read Along",
							url: href,
						},
					];
					break;

				case "recap":
					presenceData.details = "Viewing the Act 1 recap";
					break;

				case "revised":
					presenceData.details = "Viewing revised pages";
					break;

				default:
					presenceData.details = "Viewing bonus content";
					break;
			}
			break;

		default:
			presenceData.details = "Viewing an unsupported page";
			break;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});

let vePages: string, htPages: string;
(function () {
	function getPages() {
		if (document.location.pathname.match(/^\/vasterror\/\d+$/)) {
			fetch(
				"https://api.deconreconstruction.com/pages/count?story.name=vast-error&published_at_null=false"
			).then(async res => {
				vePages = await res.json();
			});
		}

		if (document.location.pathname.match(/^\/thaumatrope\/haustoria\/\d+$/)) {
			fetch(
				"https://api.deconreconstruction.com/pages/count?story.name=thaumatrope/haustoria&published_at_null=false"
			).then(async res => {
				htPages = await res.json();
			});
		}
	}
	getPages();
	setInterval(getPages, 60000);
})();
