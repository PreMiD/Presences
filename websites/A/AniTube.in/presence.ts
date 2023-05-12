const presence = new Presence({
		clientId: "853327058054545438",
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

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/pL1fgAo.png",
			startTimestamp: browsingTimestamp,
		},
		search: HTMLInputElement = document.querySelector(
			".searchContainer > form > input"
		),
		{ pathname, href } = document.location;

	if (
		document.querySelector<HTMLDivElement>(".searchContainer").style.display ===
		"block"
	)
		presenceData.details = `Searching for ${search ? search.value : null}`;
	else {
		switch (pathname) {
			case "/": {
				presenceData.details = "Browsing Home Page";
				break;
			}
			case "/busca.php": {
				presenceData.details = "Looking at search results for";
				presenceData.state = (
					document.querySelector(
						".mContainer_title_small_content"
					) as HTMLDivElement
				).textContent.substring(17);

				break;
			}
			case "/anime":
			case "/animes-dublado":
			case "/doramas":
			case "/tokusatsu":
			case "/donghua": {
				presenceData.details = "Looking at all Animes";
				break;
			}
			default:
				if (
					pathname.startsWith("/anime/letra/") ||
					pathname.startsWith("/animes-dublado/letra/") ||
					pathname.startsWith("/doramas/letra/") ||
					pathname.startsWith("/tokusatsu/letra/") ||
					pathname.startsWith("/donghua/letra/")
				) {
					const query: string = pathname.substring(
						pathname.length - pathname.split("").reverse().join("").indexOf("/")
					);
					if (query !== "todos") {
						presenceData.details = "Looking for Animes";
						presenceData.state = `starting with ${query}`;
					} else presenceData.details = "Looking at all Animes";
				} else if (
					pathname.startsWith("/anime/") ||
					pathname.startsWith("/animes-dublado/") ||
					pathname.startsWith("/doramas/") ||
					pathname.startsWith("/tokusatsu/") ||
					pathname.startsWith("/donghua/")
				) {
					presenceData.details = "Checking synopsis";
					presenceData.state = document.querySelector<HTMLDivElement>(
						".anime_container_titulo"
					).textContent;
				} else if (pathname.startsWith("/video/")) {
					const title: string = (
							document.querySelector(
								".mContainer_title_small_content"
							) as HTMLDivElement
						).textContent,
						videoElement: HTMLVideoElement = document.querySelector("video");

					presenceData.details = `Watching ${title.substring(
						9,
						title.substring(9).indexOf("ep")
					)}`;
					presenceData.state = `Episode ${parseInt(
						title.substring(title.indexOf("ep") + 2)
					)}`;
					presenceData.buttons = [
						{
							label: "Watch Along",
							url: href,
						},
					];
					if (!videoElement.paused) {
						[, presenceData.endTimestamp] =
							presence.getTimestampsfromMedia(videoElement);
					}
				} else if (pathname === "/contato.php")
					presenceData.details = "At contact us page";
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
