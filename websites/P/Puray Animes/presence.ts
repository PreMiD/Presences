const presence = new Presence({
		clientId: "972246349917610054"
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
	const { pathname } = window.location,
		presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: browsingTimestamp
		};
	if (document.querySelector("input[id^=headlessui]"))
		presenceData.details = "Pesquisando Animes";
	else if (pathname.startsWith("/home"))
		presenceData.details = "Na página principal";
	else if (pathname.startsWith("/profile/")) {
		presenceData.details = "Visualizando perfil:";
		presenceData.state = `${
			document.querySelector("h3").childNodes[0]?.textContent
		} - ${document.querySelector("button[class*=blue] span")?.textContent}`;
		presenceData.buttons = [{ label: "Ver perfil", url: location.href }];
	} else if (pathname.startsWith("/anime/")) {
		presenceData.details = "Visualizando anime:";
		presenceData.state = document.querySelector(
			"section div[class^=text-3xl]"
		)?.textContent;
		presenceData.buttons = [{ label: "Assistir anime", url: location.href }];
	} else if (pathname.startsWith("/watch/")) {
		presenceData.details = document.querySelector(
			"span.text-sm.font-bold.underline"
		)?.textContent;
		presenceData.state = document.querySelector(
			"span.text-lg.font-bold"
		)?.textContent;
		presenceData.buttons = [
			{
				label: "Assistir episódio",
				url: location.href
			}
		];
		const video = document.querySelector("video");
		if (!video.paused && video.readyState >= 1) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.currentTime, video.duration);
		}
	}
	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
