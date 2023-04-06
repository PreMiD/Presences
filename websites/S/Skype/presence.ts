const presence = new Presence({
		clientId: "617500416887881748",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

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
	SearchImage = "https://i.imgur.com/oGQtnIY.png",
	ReadingImage = "https://i.imgur.com/nese1O7.png",
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
				presenceData.smallImageKey = Assets.SearchImage;
			} else if (user) {
				if (typing?.textContent) presenceData.details = strings.typeDm;
				else {
					presenceData.details = strings.readDm;
					presenceData.smallImageKey = Assets.ReadingImage;
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
