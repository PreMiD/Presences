const presence = new Presence({
		clientId: "978186598669758504",
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
let title: string;
enum Assets {
	Logo = "https://i.imgur.com/4YN40As.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			search: "general.searchFor",
			viewHome: "general.viewHome",
			buttonViewPage: "general.buttonViewPage",
			buttonViewProfile: "general.buttonViewProfile",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

function capitalizeFirstLetter(string: string) {
	if (!string) return "Undefined";
	return (
		string.trim().charAt(0).toUpperCase() + string.trim().slice(1).toLowerCase()
	);
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, hostname, href } = document.location,
		[newLang, privacy, buttons] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
		]),
		main =
			document
				.querySelector('[id="ca-nstab-main"]')
				?.textContent?.toLowerCase() ?? "";
	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}
	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (hostname === "wiki.gg") {
		if (pathname === "/") presenceData.details = strings.viewHome;
		else {
			presenceData.details = document
				.querySelector("head > title")
				.textContent.slice(0, -10);
		}
	} else {
		title = capitalizeFirstLetter(
			document
				.querySelector('[property="og:site_name"]')
				?.getAttribute("content")
				?.toLowerCase() ??
				document
					.querySelector('[property="og:title"]')
					?.getAttribute("content")
					?.toLowerCase() ??
				document
					.querySelector('[id="footer-places-about"]')
					?.textContent?.replace(/About /gm, "")
					?.toLowerCase()
		);
		let search: HTMLInputElement | NodeListOf<HTMLInputElement> =
			document.querySelectorAll<HTMLInputElement>("input[id='searchInput']") ??
			document.querySelectorAll<HTMLInputElement>("input[name='search']");
		if (search.length === 1) search = search[0];
		else search = search[1];
		presenceData.largeImageKey = `https://${hostname}/images/e/e6/Site-logo.png`;
		if (search?.value) {
			presenceData.state = search.value;
			title = `${title} | ${strings.search?.toLowerCase()}`;
			presenceData.details = title;
			presenceData.smallImageKey = Assets.Search;
		} else if (pathname.includes("wiki") && main !== "main page") {
			presenceData.smallImageKey = Assets.Reading;
			const firstHeading = document
				.querySelector("#firstHeading")
				.textContent?.toLowerCase();
			presenceData.details = title;
			if (firstHeading?.includes(":")) {
				presenceData.state = `${capitalizeFirstLetter(
					document
						.querySelector("#firstHeading")
						.textContent?.toLowerCase()
						.split(":")[0]
				)} | ${
					document
						.querySelector("#firstHeading")
						.textContent?.toLowerCase()
						.split(":")[1]
				}`;
			} else presenceData.state = capitalizeFirstLetter(firstHeading);
			presenceData.buttons = [
				{
					label: strings.buttonViewPage,
					url: href,
				},
			];
		} else if (pathname === "/" || main === "main" || main === "main page") {
			presenceData.state = strings.viewHome;
			presenceData.details = title;
		}
	}
	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
