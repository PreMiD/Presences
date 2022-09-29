const presence = new Presence({
		clientId: "1003589140241186918",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/f3zxOuL.png",
			startTimestamp: browsingTimestamp,
		},
		{ pathname } = document.location,
		title =
			document.querySelector('[class="b-b-title center"]') ??
			document.querySelector('[itemprop="name"]'),
		search = document.querySelector<HTMLInputElement>('[name="ystext"]'),
		mangaTitle = document
			.querySelector("#the_manga_title")
			?.textContent.split(":"),
		video = document.querySelector<HTMLVideoElement>(
			'[id="my-player_html5_api"]'
		),
		name = document.querySelector("#dle-content > div > h1 > span");
	if (search?.value) {
		presenceData.details = "Ищет по запросу";
		presenceData.state = `«${search.value}»`;
	} else if (pathname === "/")
		presenceData.details = "Смотрит домашнюю страницу";
	else if (pathname === "/pm/")
		presenceData.details = "Просматривает сообщения";
	else if (pathname.match(/read-[0-9]*/gm))
		presenceData.details = "Учавствует в переписке";
	else if (pathname.match(/\/user\//))
		presenceData.details = `Смотрит профиль ${pathname.split("/")[2]}`;
	else if (mangaTitle) {
		presenceData.details = mangaTitle[0];
		presenceData.state = mangaTitle[1];
	} else if (video) {
		delete presenceData.startTimestamp;

		if (!video.paused && !isNaN(Number(video.duration))) {
			presenceData.endTimestamp = presence.getTimestampsfromMedia(video)[1];
			presenceData.smallImageKey = "play";
			presenceData.smallImageText = "Воспроизводится";
		} else {
			delete presenceData.endTimestamp;
			presenceData.smallImageKey = "pause";
			presenceData.smallImageText = "Приостановлено";
		}
		const titles = name.textContent.replace(/[0-9]* сезон [0-9]* серия/g, "");
		presenceData.details = titles;
		presenceData.state = name.textContent.replace(titles, "");
	} else if (title) {
		presenceData.details = `Смотрит «${
			title.attributes.getNamedItem("content").value
		}»`;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
