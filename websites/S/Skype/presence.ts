const presence = new Presence({
		clientId: "617500416887881748",
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
			readDm: "general.readingDM",
			typeDm: "general.typeDM",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

enum Assets {
	Logo = "https://i.imgur.com/Q4myT8y.png",
	Search = "https://i.imgur.com/B7FxcD4.png",
	Reading = "https://i.imgur.com/5m10TTT.png",
}
let strings: Awaited<ReturnType<typeof getStrings>>,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		[newLang, privacy] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
		]),
		typing = document.querySelector(
			'[class="public-DraftStyleDefault-block public-DraftStyleDefault-ltr"]'
		),
		user =
			document.querySelectorAll('button[aria-label*=":"]')[1] ??
			document.querySelectorAll('button[aria-label*=","]')[6],
		search = document.querySelector<HTMLInputElement>('input[type="text"]');

	if (oldLang !== newLang || !strings) {
		oldLang = newLang;
		strings = await getStrings();
	}

	if (privacy) {
		presenceData.details = strings.browse;
		presence.setActivity(presenceData);
		return;
	}

	switch (document.location.hostname) {
		case "preview.web.skype.com":
		case "web.skype.com": {
			if (search?.value) {
				presenceData.details = strings.search;
				presenceData.state = search.value;
				presenceData.smallImageKey = Assets.Search;
			} else if (user) {
				if (typing?.textContent) presenceData.details = strings.typeDm;
				else {
					presenceData.details = strings.readDm;
					presenceData.smallImageKey = Assets.Reading;
				}
				presenceData.state = user.textContent;
			} else presenceData.details = strings.browse;
			break;
		}
		case "www.skype.com": {
			presenceData.details = "Skype";
			presenceData.state = "Browsing...";

			break;
		}
		default:
			presenceData.details = strings.browse;
	}
	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
