const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
	const { pathname } = window.location,
		data: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		};
	if (document.querySelector("input[id^=headlessui]"))
		data.details = "Pesquisando Animes";
	else if (pathname.startsWith("/home")) data.details = "Na página principal";
	else if (pathname.startsWith("/profile/")) {
		data.details = "Visualizando perfil:";
		data.state = `${
			document.querySelector("h3").childNodes[0]?.textContent
		} - ${document.querySelector("button[class*=blue] span")?.textContent}`;
		data.buttons = [{ label: "Ver perfil", url: location.href }];
	} else if (pathname.startsWith("/anime/")) {
		const genres: string[] = [];
		for (const item of document.querySelectorAll(
			"div[class^=sm]>div[class^=mb]"
		))
			genres.push(item.textContent);
		data.details = document.querySelector(
			"section div[class^=text-3xl]"
		)?.textContent;
		if (genres.length) data.state = genres.join(", ");
		data.buttons = [{ label: "Assistir anime", url: location.href }];
	} else if (pathname.startsWith("/watch/")) {
		data.details = document.querySelector(
			"span.text-sm.font-bold.underline"
		)?.textContent;
		data.state = document.querySelector("span.text-lg.font-bold")?.textContent;
		data.buttons = [
			{
				label: "Assistir episódio",
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
	if (!data.details) presence.setActivity();
	else presence.setActivity(data);
});
