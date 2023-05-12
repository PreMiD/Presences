const presence = new Presence({
		clientId: "632293282847784973",
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

async function getStrings() {
	return presence.getStrings(
		{
			home: "general.viewHome",
			calendar: "google classroom.calendar",
			todo: "google classroom.todo",
			assignmentPrivate: "google classroom.assignmentPrivate",
			assignment: "google classroom.assignment",
			class: "google classroom.class",
			classworkPrivate: "google classroom.classworkPrivate",
			classwork: "google classroom.classwork",
			classmembersPrivate: "google classroom.classmembersPrivate",
			classmembers: "google classroom.classmembers",
			settings: "google classroom.settings",
		},
		await presence.getSetting<string>("lang").catch(() => "en")
	);
}

let strings: Awaited<ReturnType<typeof getStrings>> = null,
	oldLang: string = null;

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/cZ0dXeF.png",
			startTimestamp: browsingTimestamp,
		},
		path = document.location.pathname.split("/"),
		[newLang, privacy] = await Promise.all([
			presence.getSetting<string>("lang").catch(() => "en"),
			presence.getSetting<boolean>("privacy"),
		]);

	if (oldLang !== newLang) {
		oldLang = newLang;
		strings = await getStrings();
	}

	path.shift();
	if (path[0] === "u") path.splice(0, 2);

	switch (path[0]) {
		case "h": {
			presenceData.details = strings.home;
			break;
		}
		case "calendar": {
			presenceData.details = strings.calendar;
			break;
		}
		case "a": {
			presenceData.details = strings.todo;
			break;
		}
		case "c": {
			const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
				? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
						document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
				  }`
				: document.querySelector('span[id="UGb2Qe"]').textContent;
			if (path[2] && path[2] === "a") {
				presenceData.details = privacy
					? strings.assignmentPrivate
					: strings.assignment;
			} else presenceData.details = strings.class;

			if (!privacy) presenceData.state = classroom;

			break;
		}
		case "w": {
			const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
				? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
						document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
				  }`
				: document.querySelector('span[id="UGb2Qe"]').textContent;
			presenceData.details = privacy
				? strings.classworkPrivate
				: strings.classwork;
			if (!privacy) presenceData.state = classroom;

			break;
		}
		case "r": {
			const classroom = document.querySelector('span[class="YVvGBb dDKhVc"]')
				? `${document.querySelector('span[id="UGb2Qe"]').textContent} - ${
						document.querySelector('span[class="YVvGBb dDKhVc"]').textContent
				  }`
				: document.querySelector('span[id="UGb2Qe"]').textContent;
			presenceData.details = privacy
				? strings.classmembersPrivate
				: strings.classmembers;

			if (!privacy) presenceData.state = classroom;

			break;
		}
		case "s":
			{
				presenceData.details = strings.settings;
				// No default
			}
			break;
	}

	presence.setActivity(presenceData);
});
