const presence = new Presence({
		clientId: "968353669491871754",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

function getElementByXpath(path: string) {
	return document.evaluate(
		path,
		document,
		null,
		XPathResult.FIRST_ORDERED_NODE_TYPE,
		null
	).singleNodeValue;
}

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/logo.png",
	Home = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/0.png",
	Profile = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/1.png",
	Editor = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/2.png",
	Export = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/3.png",
	Discover = "https://cdn.rcd.gg/PreMiD/websites/V/Vizzy/assets/4.png",
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href } = document.location,
		tabParams = new URLSearchParams(search).get("tab");
	switch (pathname) {
		case "/": {
			presenceData.details = "Viewing the homepage";
			presenceData.smallImageKey = Assets.Home;
			break;
		}
		case "/creations":
		case "/community": {
			presenceData.details = "Viewing community creations";
			presenceData.smallImageKey = Assets.Discover;
			break;
		}
		case "/project": {
			presenceData.smallImageKey = Assets.Discover;
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
			presenceData.smallImageKey = Assets.Discover;
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
			presenceData.smallImageKey = Assets.Profile;
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
			presenceData.smallImageKey = Assets.Editor;
			break;
		}
		case "/export": {
			presenceData.smallImageKey = Assets.Export;
			presenceData.details = "Exporting a video";
			break;
		}
		case "/discover": {
			switch (tabParams) {
				case "faq": {
					presenceData.details = "Reading frequently asked questions";
					presenceData.smallImageKey = Assets.Question;
					break;
				}
				case "creator": {
					presenceData.smallImageKey = Assets.Discover;
					presenceData.details = "Reading about creator mode";
					break;
				}
				case "lyrics": {
					presenceData.smallImageKey = Assets.Question;
					presenceData.details = "Viewing an unsupported page";
					break;
				}
				default:
					if (!tabParams || !search) presenceData.details = "Browsing features";
			}
			break;
		}
		case "/privacy": {
			presenceData.smallImageKey = Assets.Discover;
			presenceData.details = "Reading the privacy policy";
			break;
		}
		case "/terms-of-service": {
			presenceData.smallImageKey = Assets.Discover;
			presenceData.details = "Reading the terms of use";
			break;
		}
		default: {
			presenceData.smallImageKey = Assets.Question;
			presenceData.details = "Viewing an unsupported page";
		}
	}
	presence.setActivity(presenceData);
});
