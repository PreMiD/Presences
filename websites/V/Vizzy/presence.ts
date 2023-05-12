const presence = new Presence({
		clientId: "968353669491871754",
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
	Call = "https://i.imgur.com/PFdbnIf.png",
	Vcall = "https://i.imgur.com/6wG9ZvM.png",
	Downloading = "https://i.imgur.com/ryrDrz4.png",
	Uploading = "https://i.imgur.com/SwNDR5U.png",
	Repeat = "https://i.imgur.com/Ikh95KU.png",
	RepeatOne = "https://i.imgur.com/wh885z3.png",
	Premiere = "https://i.imgur.com/Zf8FSUR.png",
	PremiereLive = "https://i.imgur.com/yC4j9Lg.png",
	Viewing = "https://i.imgur.com/fpZutq6.png",
}
function getElementByXpath(path: string) {
	return document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}
presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Ai6JKDy.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href } = window.location,
		tabParams = new URLSearchParams(search).get("tab");
	switch (pathname) {
		case "/": {
			presenceData.details = "Viewing the homepage";
			presenceData.smallImageKey = "home";
			break;
		}
		case "/creations":
		case "/community": {
			presenceData.details = "Viewing community creations";
			presenceData.smallImageKey = "discover";
			break;
		}
		case "/project": {
			presenceData.smallImageKey = "discover";
			presenceData.details = "Viewing a project";
			presenceData.state = getElementByXpath(
				"/html/body/div[1]/div/main/div/div/div[2]/div/div[2]/div[1]/h4"
			).textContent;
			presenceData.buttons = [
				{
					label: "View Project",
					url: href,
				},
			];
			break;
		}
		case "/user": {
			presenceData.smallImageKey = "discover";
			presenceData.details = "Viewing a user's page";
			presenceData.state = `@${
				getElementByXpath("/html/body/div[1]/div/h5").textContent
			}`;
			presenceData.buttons = [
				{
					label: "View User",
					url: href,
				},
			];
			break;
		}
		case "/profile": {
			presenceData.details = "Viewing their profile";
			presenceData.smallImageKey = "profile";
			if (tabParams) presenceData.state = `Tab: ${tabParams}`;

			break;
		}
		case "/editor": {
			if (
				getElementByXpath(
					"/html/body/div[1]/div[2]/header/div[4]/div[3]/span[1]"
				).textContent === "Community project"
			)
				presenceData.details = "Editing a community project";
			else presenceData.details = "Editing a project";
			presenceData.state = `Project: ${
				getElementByXpath(
					"/html/body/div[1]/div[2]/header/div[4]/div[1]/span/span"
				).textContent
			}`;
			presenceData.smallImageKey = "editor";
			break;
		}
		case "/export": {
			presenceData.smallImageKey = "export";
			presenceData.details = "Exporting a video";
			break;
		}
		case "/discover": {
			switch (tabParams) {
				case "faq": {
					presenceData.details = "Reading frequently asked questions";
					presenceData.smallImageKey = "faq";
					break;
				}
				case "creator": {
					presenceData.smallImageKey = "discover";
					presenceData.details = "Reading about creator mode";
					break;
				}
				case "lyrics": {
					presenceData.smallImageKey = "faq";
					presenceData.details = "Viewing an unsupported page";
					break;
				}
				default:
					if (!tabParams || !search) presenceData.details = "Browsing features";
			}
			break;
		}
		case "/privacy": {
			presenceData.smallImageKey = "discover";
			presenceData.details = "Reading the privacy policy";
			break;
		}
		case "/terms-of-service": {
			presenceData.smallImageKey = "discover";
			presenceData.details = "Reading the terms of use";
			break;
		}
		default: {
			presenceData.smallImageKey = "faq";
			presenceData.details = "Viewing an unsupported page";
		}
	}
	presence.setActivity(presenceData);
});
