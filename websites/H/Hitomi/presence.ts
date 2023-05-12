const presence = new Presence({
	clientId: "738809940696629270",
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

interface interfaceMapping {
	[key: string]: string;
}

const hitomiTypeMapping: interfaceMapping = {
		manga: "manga",
		doujinshi: "dj",
		cg: "acg",
		gamecg: "cg",
		anime: "anime",
	},
	pathMapping: interfaceMapping = {
		"/index-indonesian.html": "indonesian",
		"/index-catalan.html": "catalan",
		"/index-cebuano.html": "cebuano",
		"/index-czech.html": "czech",
		"/index-danish.html": "danish",
		"/index-german.html": "german",
		"/index-estonian.html": "estonian",
		"/index-english.html": "english",
		"/index-spanish.html": "spanish",
		"/index-esperanto.html": "esperanto",
		"/index-french.html": "french",
		"/index-italian.html": "italian",
		"/index-javanese.html": "javanese",
		"/index-latin.html": "latin",
		"/index-hungarian.html": "hungarian",
		"/index-dutch.html": "dutch",
		"/index-norwegian.html": "norwegian",
		"/index-polish.html": "polish",
		"/index-portuguese.html": "portuguese",
		"/index-romanian.html": "romanian",
		"/index-serbian.html": "serbian",
		"/index-albanian.html": "albanian",
		"/index-slovak.html": "slovak",
		"/index-finnish.html": "finnish",
		"/index-swedish.html": "swedish",
		"/index-tagalog.html": "tagalog",
		"/index-vietnamese.html": "vietnamese",
		"/index-turkish.html": "turkish",
		"/index-greek.html": "greek",
		"/index-bulgarian.html": "bulgarian",
		"/index-mongolian.html": "mongolian",
		"/index-russian.html": "russian",
		"/index-ukrainian.html": "ukrainian",
		"/index-hebrew.html": "hebrew",
		"/index-arabic.html": "arabic",
		"/index-persian.html": "persian",
		"/index-thai.html": "thai",
		"/index-korean.html": "korean",
		"/index-chinese.html": "chinese",
		"/index-japanese.html": "japanese",
	},
	// /(type)/(title)-(lang)-(number).html
	validateInfoUrl = /\/(.+)\/(.+)-(.+)-(\d+).html/,
	// (number)
	validateReaderUrl = /\/reader\/(\d+).html/;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/sQZ65FE.png",
	};

	presenceData.details = "Viewing recently added list";
	presenceData.state = "Home";

	if (document.location.pathname in pathMapping) {
		presenceData.details = "Viewing recently added list";
		presenceData.state = pathMapping[document.location.pathname];
	}

	if (validateInfoUrl.exec(document.location.pathname)) {
		const parsedUrl = validateInfoUrl.exec(document.location.pathname),
			type = hitomiTypeMapping[parsedUrl[1]];
		let title = document.querySelector(
			`body > div > div.content > div.gallery.${type}-gallery > h1 > a`
		).textContent;

		if (title.length > 128) title = `${title.slice(0, 120)}...`;

		presenceData.details = title;
		presenceData.state = `${
			document.querySelector(
				`body > div > div.content > div.gallery.${type}-gallery > h2 > ul > li > a`
			).textContent
		} (${parsedUrl[4]})`;
		presenceData.buttons = [
			{ label: "View Page", url: document.location.href },
		];
	}

	if (validateReaderUrl.exec(document.location.pathname)) {
		let title = document.title.replace(" | Hitomi.la", "");

		if (title.length > 128) title = `${title.slice(0, 120)}...`;

		const selectValue = document.querySelector(
			"#single-page-select"
		) as HTMLSelectElement;
		presenceData.details = title;
		presenceData.state = `Reading page ${document.location.hash.replace(
			"#",
			""
		)} of ${selectValue.options[selectValue.options.length - 1].textContent} (${
			validateReaderUrl.exec(document.location.pathname)[1]
		})`;
		presenceData.buttons = [
			{ label: "View Page", url: document.location.href },
		];
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
