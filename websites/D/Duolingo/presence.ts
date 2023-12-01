const presence = new Presence({
		clientId: "1177802176140156998",
	}),
	timeStamp = newTimeStamp(),
	IMAGE = {
		duoTool: "https://cdn.verycrunchy.dev/premid/duolingo/duo_tool.png",
		profileDuo: "https://cdn.verycrunchy.dev/premid/duolingo/profile_duo.png",
		duoGlobe: "https://cdn.verycrunchy.dev/premid/duolingo/duo_globe.png",
	},
	LANGUAGE_NAMES: Record<string, string> = {
		ar: "Arabic",
		ca: "Catalan",
		cs: "Czech",
		cy: "Welsh",
		da: "Danish",
		de: "German",
		el: "Greek",
		en: "English",
		eo: "Esperanto",
		es: "Spanish",
		fi: "Finnish",
		fr: "French",
		gd: "Scottish Gaelic",
		gn: "Guarani",
		he: "Hebrew",
		hi: "Hindi",
		ht: "Haitian Creole",
		hu: "Hungarian",
		hv: "High Valyrian",
		hw: "Hawaiian",
		id: "Indonesian",
		it: "Italian",
		ja: "Japanese",
		ko: "Korean",
		la: "Latin",
		"nl-nl": "Dutch",
		"no-bo": "Norwegian (Bokmål)",
		nv: "Navajo",
		pl: "Polish",
		pt: "Portuguese",
		qc: "K'iche'",
		ro: "Romanian",
		ru: "Russian",
		sw: "Swahili",
		ga: "Irish",
		sv: "Swedish",
		tlh: "Klingon",
		tr: "Turkish",
		uk: "Ukrainian",
		vi: "Vietnamese",
		yi: "Yiddish",
		yu: "Yucatec",
		zh: "Chinese",
		"zh-hk": "Chinese (Cantonese)",
		zu: "Zulu",
	},
	presenceData: PresenceData = {
		largeImageKey: "https://cdn.verycrunchy.dev/premid/duolingo/logo.png",
	},
	settings = {
		showTime: true,
		lastPath: null as string,
	},
	language = {
		code: null as string,
		name: null as string,
	},
	user = {
		currentCourseId: null as string,
		streak: null as number,
		xp: null as number,
		freezes: null as number,
		lessonTimeStamp: null as number,
		inLesson: false,
	},
	users: { username: string; displayName: string; img: string }[] = [];

let timeoutId: number;

function newTimeStamp() {
	return Math.floor(Date.now() / 1000);
}

function makePossessive(name: string) {
	return name.endsWith("s") ? `${name}'` : `${name}'s`;
}

function deEsser(word: string) {
	return word.endsWith("s") ? word.slice(0, -1) : word;
}

function giveArticle(word: string) {
	return `${
		["a", "e", "i", "o", "u"].some(vowel =>
			word.toLowerCase().startsWith(vowel)
		)
			? "an"
			: "a"
	} ${word}`;
}

function makeProgressBar(value: number, maxValue: number, size: number) {
	const percentage = value / maxValue,
		progress = Math.round(size * percentage);

	return `${"🟩".repeat(progress)}${"⬛".repeat(
		size - progress
	)} ${`${Math.round(percentage * 100)}%`}`;
}

function handleLesson() {
	user.inLesson = true;
	if (
		document.querySelector('[data-test="daily-quest-progress-slide"]') ||
		document.querySelector('[data-test="session-complete-slide"]')
	) {
		const path = decodeURI(document.location.pathname).split("/");
		switch (true) {
			case path.includes("legendary"):
				presenceData.details = `Finished ${giveArticle(
					language.name
				)} legendary challenge`;
				break;

			case path.includes("test"):
				presenceData.details = `Passed ${giveArticle(
					language.name
				)} jump ahead test`;
				break;

			default:
				presenceData.details = `Finished ${giveArticle(language.name)} lesson`;
		}
	} else {
		const progressBarElement = document
			.querySelector('div[style*="--web-ui_internal_progress-bar-value"]')
			?.getAttribute("style");
		if (progressBarElement) {
			presenceData.state = `${makeProgressBar(
				Number(
					/--web-ui_internal_progress-bar-value: ([^;]+)%/.exec(
						progressBarElement
					)?.[1]
				),
				100,
				presenceData.details.length / 3
			)}`;
		}
	}
	if (!user.lessonTimeStamp) user.lessonTimeStamp = newTimeStamp();
}

async function updateData() {
	const state = JSON.parse(window.localStorage.getItem("duo.state")).state
		.redux;
	if (!state) return;

	user.currentCourseId = state.user.currentCourseId ?? null;
	if (user.currentCourseId) setLang(/_(.*?)_/.exec(user.currentCourseId)?.[1]);

	const showTime = await presence.getSetting<boolean>("timestamps");
	settings.showTime = showTime;
}

function setLang(code: string) {
	language.code = code?.toLowerCase();
	language.name = LANGUAGE_NAMES[language.code] || null;
	if (!language.name && language.code) {
		setLang(
			{
				dn: "nl-nl",
				nb: "no-bo",
				zc: "zh-hk",
			}[language.code]
		);
	} else if (language.name && language.code) {
		presenceData.smallImageKey = `lang_${language.code.split("-")[0]}`;
		presenceData.smallImageText = `${language.name}`;
	} else presenceData.smallImageKey = IMAGE.duoGlobe;
}

presence.on("UpdateData", async () => {
	if (settings.lastPath === document.location.pathname) return;
	const path = decodeURI(document.location.pathname).split("/");

	delete presenceData.details;
	delete presenceData.smallImageKey;
	delete presenceData.smallImageText;
	delete presenceData.state;
	delete presenceData.startTimestamp;

	user.inLesson = false;

	switch (path[1]) {
		case "learn":
			updateData();
			presenceData.details = `Choosing ${giveArticle(language.name)} lesson`;
			break;

		case "lesson":
		case "practice":
			updateData();
			switch (true) {
				case path.includes("legendary"):
					presenceData.details = `Doing ${giveArticle(
						language.name
					)} legendary challenge`;
					break;

				case path.includes("test"):
					presenceData.details = `Taking ${giveArticle(
						language.name
					)} jump ahead test`;
					break;

				default:
					presenceData.details = `Working on ${giveArticle(
						language.name
					)} lesson`;
			}
			handleLesson();
			break;

		case "placement":
			setLang(path[2]);
			presenceData.details = `Taking ${language.name} placement test`;
			handleLesson();
			break;

		case "leaderboard":
			presenceData.details = "Viewing leaderboard";
			break;

		case "quests":
			presenceData.state = "Viewing quests";
			break;

		case "shop":
			presenceData.state = "Viewing shop";
			break;

		case "courses":
			presenceData.details = "Viewing available courses";
			presenceData.smallImageKey = IMAGE.duoGlobe;
			presenceData.smallImageText = "viewing courses";
			break;
		case "enroll":
			setLang(path[2]);
			presenceData.details = `Viewing ${language.name} course`;
			break;

		case "profile":
		case "u": {
			const username = path[2],
				displayName = document.querySelector(
					'h1[data-test="profile-username"] span'
				)?.textContent,
				img =
					document.querySelector<HTMLImageElement>(`img[alt="${displayName}"]`)
						?.src ?? IMAGE.profileDuo,
				existingUser = users.find(user => user.username === username);
			if (!displayName) {
				settings.lastPath = "~";
				return;
			}

			if (!existingUser) {
				users.push({ username, displayName, img });
				if (users.length > 4) users.pop();
			}
			presenceData.details = `Viewing ${makePossessive(
				existingUser?.displayName ?? displayName
			)} ${path[3] ?? "profile"}`;
			presenceData.smallImageKey = existingUser?.img ?? img;
			presenceData.smallImageText = path[1] === "u" ? displayName : username;
			break;
		}
		case "settings":
			presenceData.details = `Changing ${deEsser(path[2])} settings`;
			presenceData.smallImageKey = IMAGE.duoTool;
			break;
	}

	if (!user.inLesson) user.lessonTimeStamp = null;
	if (settings.showTime)
		presenceData.startTimestamp = user.lessonTimeStamp ?? timeStamp;

	presence.setActivity(presenceData);

	settings.lastPath = document.location.pathname;

	timeoutId = setTimeout(() => {
		settings.lastPath = "~";
		clearTimeout(timeoutId);
	}, 2000);
});
