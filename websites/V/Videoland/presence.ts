const presence = new Presence({
		clientId: "941627291304329226",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);
let cached: Record<string, unknown>;

async function fetchShowTitle() {
	if (
		!cached ||
		Number(window.location.href.split("/")[4]) !== Number(cached.id)
	) {
		const fetched = await fetch(
			`https://www.videoland.com/api/v3/titles/${
				window.location.href.split("/")[4]
			}/details`
		).then(x => x.json());
		cached = fetched;
		return fetched;
	} else return cached;
}

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/DbrnNCZ.gif",
			startTimestamp: browsingTimestamp,
		},
		{ href, pathname } = document.location,
		[privacy, buttons, covers] = await Promise.all([
			presence.getSetting<boolean>("privacy"),
			presence.getSetting<boolean>("buttons"),
			presence.getSetting<boolean>("covers"),
		]),
		meta = document.querySelector<HTMLMetaElement>(
			"meta[property='og:title']"
		)?.content;

	if (!privacy) {
		switch (pathname.split("/")[1]) {
			case "": {
				presenceData.details = "Bekijkt de homepagina";
				break;
			}
			case "zoeken": {
				const search = document.querySelector<HTMLInputElement>("#search");
				presenceData.smallImageKey = "search";
				if (search.value) {
					presenceData.details = "Zoekt voor:";
					presenceData.state = search.textContent;
				} else presenceData.details = "Aan het zoeken...";
				break;
			}
			case "films": {
				if (meta !== "Videoland") presenceData.details = `Bekijkt ${meta}`;
				else presenceData.details = "Bekijkt alle films";
				presenceData.largeImageKey =
					document
						.querySelector('[class="detail-meta-cover__image"]')
						?.getAttribute("src") ?? "https://i.imgur.com/DbrnNCZ.gif";
				presenceData.buttons = [
					{
						label: "Bekijk Film",
						url: href,
					},
				];
				break;
			}
			case "series": {
				if (meta !== "Videoland") presenceData.details = `Bekijkt ${meta}`;
				else presenceData.details = "Bekijkt alle series";
				presenceData.largeImageKey =
					document
						.querySelector('[class="detail-meta-cover__image"]')
						?.getAttribute("src") ?? "https://i.imgur.com/DbrnNCZ.gif";
				presenceData.buttons = [
					{
						label: "Bekijk Serie",
						url: href,
					},
				];
				break;
			}
			case "kids": {
				presenceData.details = "Bekijkt alle kids series";
				presenceData.buttons = [
					{
						label: "Bekijk Series",
						url: href,
					},
				];
				break;
			}
			case "tv-programmas": {
				presenceData.details = "Bekijkt Tv Programma's";
				presenceData.buttons = [
					{
						label: "Bekijk Tv Programma's",
						url: href,
					},
				];
				break;
			}
			case "player": {
				delete presenceData.startTimestamp;
				const fetched = await fetchShowTitle(),
					video = document.querySelector("video");
				presenceData.details = (await fetched?.showTitle) ?? fetched?.name;
				if (fetched?.name.includes("-")) {
					presenceData.state =
						fetched.name
							.split("-")[0]
							.replace(fetched.showTitle, "S")
							.replace(".", ":E")
							.replace(" ", "") + fetched.name.split("-")[1];
				} else if (fetched?.showTitle) {
					presenceData.state = fetched.name
						.toLowerCase()
						.replace(fetched.showTitle.toLowerCase(), "S")
						.replace(".", ":E")
						.replace(" ", "");
				}
				presenceData.smallImageKey = video.paused ? "pause" : "play";
				presenceData.smallImageText = video.paused
					? "Gepauzeerd"
					: "Aan het afspelen";
				if (!video.paused) {
					presenceData.endTimestamp = presence.getTimestampsfromMedia(
						document.querySelector("video")
					)[1];
				}
				presenceData.buttons = [
					{
						label: "Bekijk Video",
						url: href,
					},
				];
				break;
			}
		}
	} else presenceData.details = "Aan het browsen";

	if (!buttons) delete presenceData.buttons;
	if (!covers) presenceData.largeImageKey = "https://i.imgur.com/DbrnNCZ.gif";

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
