const presence = new Presence({
		clientId: "691080074006495303",
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

async function getStrings() {
	return presence.getStrings(
		{
			browse: "general.browsing",
			search: "general.searchFor",
			viewHome: "general.viewHome",
			buttonReadArticle: "general.buttonReadArticle",
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
function imgPath(path: string, hostname: string) {
	if (!path) return Assets.Logo;
	if (path.includes(hostname)) return `https://${path.replace("//", "")}`;
	else return `https://${hostname}${path}`;
}
enum Assets {
	Logo = "https://i.imgur.com/6A7Q1dP.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}

let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	let presenceData: PresenceData = {
		startTimestamp: browsingTimestamp,
		largeImageKey: Assets.Logo,
	};
	const [newLang, privacy, buttons, covers] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		search = document.querySelector<HTMLInputElement>(
			'input[id="docsearch-input"]'
		),
		ogTitle = document
			.querySelector('meta[property="og:title"]')
			?.getAttribute("content")
			?.toLowerCase(),
		docTitle = document.querySelector('[class="d-heading-title"]'),
		subActive = document.querySelector('[class*="-text-active"]'),
		docusContent = !document.querySelector('[class*="docus-content"]'),
		{ pathname, hostname, href } = document.location;

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}
	if (search?.value) {
		presenceData.details = strings.search;
		presenceData.state = search.value;
		presenceData.smallImageKey = Assets.Search;
		presence.setActivity(presenceData);
		return;
	}
	switch (pathname.split("/")[1].replace(/-/gm, "")) {
		case "casestudies": {
			if (!docusContent) {
				presenceData.smallImageKey = Assets.Reading;
				presenceData.details = "Reading a case studie about";
				presenceData.state = ogTitle;
				presenceData.buttons = [
					{
						label: "Read Case Studie",
						url: href,
					},
				];
			} else presenceData.details = "Viewing all case studies";
			break;
		}
		case "deployments": {
			if (!docusContent) {
				presenceData.smallImageKey = Assets.Reading;
				presenceData.details = `Reading about ${ogTitle} nuxt deployment`;
				if (subActive?.textContent) presenceData.state = subActive.textContent;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else presenceData.details = "Viewing all deployment options";

			break;
		}
		case "announcements": {
			if (!docusContent) {
				presenceData.smallImageKey = Assets.Reading;
				presenceData.details = "Reading announcement about";
				if (subActive?.textContent)
					presenceData.state = `${ogTitle} - ${subActive.textContent}`;
				else presenceData.state = ogTitle;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
				presenceData.largeImageKey = imgPath(
					document.querySelector('[class="object-cover"]')?.getAttribute("src"),
					hostname
				);
			} else presenceData.details = "Viewing all announcements";

			break;
		}
		case "docs": {
			if (!docusContent && docTitle) {
				presenceData.details = "Reading documentation about";
				presenceData.state = `${document
					.querySelector('li[class="active"] > h5')
					?.textContent?.trim()} - ${docTitle.textContent}`;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else presenceData.details = "Browsing the docs";
			break;
		}
		case "examples": {
			if (!docusContent && docTitle) {
				presenceData.details = "Viewing an example about";
				presenceData.state = `${document
					.querySelector('li[class="active"] > h5')
					?.textContent?.trim()} - ${docTitle.textContent}`;
				presenceData.buttons = [
					{
						label: strings.buttonReadArticle,
						url: href,
					},
				];
			} else presenceData.details = "Browsing examples";
			break;
		}
		case "tutorials": {
			if (!docusContent) {
				presenceData.details = "Reading a tutorial about";
				presenceData.state = capitalizeFirstLetter(ogTitle);
				presenceData.buttons = [
					{
						label: "View Tutorial",
						url: href,
					},
				];
			} else presenceData.details = "Viewing all tutorials";
			break;
		}
		default: {
			const pages: Record<string, PresenceData> = {
				"": {
					details: strings.viewHome,
				},
				design: {
					details: "Viewing design options",
				},
				faq: {
					details: "Viewing FAQs",
				},
				partners: {
					details: "Viewing partners",
				},
				support: {
					details: "Viewing the support page",
				},
				teams: {
					details: "Viewing the Nuxt.js team",
				},
				videocourses: {
					details: "Viewing all video coruses",
				},
				sponsors: {
					details: "Viewing all sponsors",
				},
				releases: {
					details: "Viewing all releases",
				},
				themes: {
					details: "Viewing all themes",
				},
				testimonials: {
					smallImageKey: Assets.Reading,
					details: "Reading all testimonials",
					buttons: [
						{
							label: "Read Testimonials",
							url: href,
						},
					],
				},
				showcase: {
					details: `Viewing ${document
						.querySelector('button[class*="rounded-md"]')
						?.textContent?.toLowerCase()} showcases`,
				},
			};
			for (const [path, data] of Object.entries(pages)) {
				if (pathname.replace(/-/gm, "").includes(path))
					presenceData = { ...presenceData, ...data };
			}
		}
	}
	if (buttons && !presenceData.buttons && pathname !== "/") {
		presenceData.buttons = [
			{
				label: strings.buttonViewPage,
				url: href,
			},
		];
	}

	if (!buttons && presenceData.buttons) delete presenceData.buttons;
	if (!covers && presenceData.largeImageKey !== Assets.Logo)
		presenceData.largeImageKey = Assets.Logo;
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
