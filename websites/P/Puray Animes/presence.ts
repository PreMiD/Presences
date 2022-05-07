const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
	const defaultData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		},
		{ pathname } = window.location,
		data: PresenceData = defaultData;
	if (document.querySelector("input[id^=headlessui]"))
		data.details = "🔍・Pesquisando Animes";
	else if (pathname.startsWith("/home")) {
		data.details = "Início:";
		data.state = "Visualizando animes.";
		data.buttons = [{ label: "💻・Puray Animes", url: location.href }];
	} else if (pathname.startsWith("/profile/")) {
		const username = document.querySelector("h3").childNodes[0]?.textContent;
		data.details = "Visualizando Perfil:";
		data.state = `${username} - ${
			document.querySelector("button[class*=blue] span")?.textContent
		}`;
		data.startTimestamp = browsingTimestamp;
		data.buttons = [{ label: `🐒・Perfil de ${username}`, url: location.href }];
	} else if (pathname.startsWith("/anime/")) {
		const genders: string[] = [];
		for (const _ of document.querySelectorAll("div[class^=sm]>div[class^=mb]"))
			genders.push(_.textContent);

		data.details = document.querySelector(
			"section div[class^=text-3xl]"
		)?.textContent;
		if (genders.length) data.state = genders.join(", ");
		data.startTimestamp = browsingTimestamp;
		data.buttons = [{ label: "📺・Assistir Anime", url: location.href }];
	} else if (pathname.startsWith("/watch/")) {
		const episode = document.querySelector(
			"span.text-lg.font-bold"
		)?.textContent;
		data.details = document.querySelector(
			"span.text-sm.font-bold.underline"
		)?.textContent;
		data.state = episode;
		data.buttons = [
			{
				label: `📺・Assistir EP ${episode?.match(/^\d+/g)[0]}`,
				url: location.href
			}
		];
		const video = document.querySelector("video");
		if (!video.paused && video.readyState >= 1) {
			[data.startTimestamp, data.endTimestamp] = presence.getTimestamps(
				video.currentTime,
				video.duration
			);
		}
	}
	if (!data.details) presence.setActivity(defaultData);
	else presence.setActivity(data);
});
