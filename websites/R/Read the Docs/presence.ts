const presence = new Presence({
	clientId: "808404067344318494",
});

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

presence.on("UpdateData", async () => {
	async function getStringFromSettings(
		pres: Presence,
		id: string,
		values: Record<string, string>
	): Promise<string> {
		let str = await pres.getSetting<string>(id);

		for (const [key, value] of Object.entries(values))
			str = str.replace(RegExp(`%${key}%`, "g"), value);

		return str;
	}
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/imTvu2G.png",
		startTimestamp: Date.now(),
	};
	let loc = window.location.href;
	if (loc.endsWith("/")) loc = loc.slice(0, -1); // remove trailing slash

	// if on a subdomain (reading a doc)
	if (loc.match(/([a-z0-9-]+)[.]readthedocs[.](io|org).*/g)) {
		const name = loc.replace(
			/https:\/\/([a-z0-9-]+)[.]readthedocs[.](io|org).*/g,
			"$1"
		); // get subdomain

		if (name === "docs") {
			presenceData.details = await getStringFromSettings(
				presence,
				"viewing_main_docs",
				{}
			);
		} else {
			presenceData.details = await getStringFromSettings(
				presence,
				"viewing_docs",
				{ name }
			);
		}

		if (loc.match(/search/g)) {
			// if searching on docs
			let term = loc.replace(
				/([a-z0-9-/:]+)[.]readthedocs[.](io|org)\/.+\/.+\/search.*\?q=([^&]+).*/g,
				"$3"
			); // get search term

			if (term.endsWith("#")) term = term.slice(0, -1); // remove trailing hashtag
			if (!loc.endsWith("/search") && !loc.endsWith("/search.html")) {
				presenceData.state = await getStringFromSettings(
					presence,
					"searching_for",
					{ term }
				);
			}
		}
	} else if (loc.endsWith(".io") || loc.endsWith(".org"))
		presenceData.details = await getStringFromSettings(presence, "main", {});
	else if (loc.endsWith("signup"))
		presenceData.details = await getStringFromSettings(presence, "signup", {});
	else if (loc.endsWith("login"))
		presenceData.details = await getStringFromSettings(presence, "login", {});
	else if (loc.match(/accounts/))
		presenceData.details = await getStringFromSettings(presence, "manage", {});
	else if (loc.match(/profiles/)) {
		presenceData.details = await getStringFromSettings(presence, "profile", {
			name: loc.split("/")[loc.split("/").length - 1],
		});
	} else if (loc.endsWith("dashboard")) {
		presenceData.details = await getStringFromSettings(
			presence,
			"dashboard",
			{}
		);
		// if searching for docs with the search term in the url
	} else if (loc.match(/search/)) {
		if (!loc.endsWith("/search")) {
			presenceData.state = await getStringFromSettings(
				presence,
				"searching_for",
				{
					term: loc.replace(
						/https?:\/\/readthedocs[.](io|org)\/search\/\?q=([^&]+).*/g,
						"$2"
					),
				}
			);
		}

		presenceData.details = await getStringFromSettings(
			presence,
			"searching",
			{}
		);
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
