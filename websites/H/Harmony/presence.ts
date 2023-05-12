const presence = new Presence({
		clientId: "882003722270572574",
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

let npTitle: string, npArtist: string, npOnAir: string, npListeners: number;

function fetchStats(): void {
	fetch("https://staff.weareharmony.net/api/nowplaying")
		.then(result => result.json())
		.then(result => {
			npTitle = result.song.title;
			npArtist = result.song.artist;
			npOnAir = result.onAir.name;
			npListeners = result.listeners;
		});
}

fetchStats();
setInterval(fetchStats, 10000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
		largeImageKey: "https://i.imgur.com/lI0bLxr.png",
		smallImageKey: "live",
	};

	if (document.location.hash.startsWith("#/")) {
		presenceData.startTimestamp = browsingTimestamp;
		presenceData.smallImageText = `Listeners: ${npListeners} | Live DJ: ${npOnAir}`;
		if (document.location.hash === "#/Home") {
			presenceData.details = `🎶 ➜ ${npTitle}`;
			presenceData.state = `🎤 ➜ ${npArtist}`;
		} else if (document.location.hash.startsWith("#/User")) {
			presenceData.details = `📰 ➜ Viewing user: ${
				document.querySelector(
					"body > div.page-container > div > div.p-container > p"
				).textContent
			}`;
			presenceData.state = `💿 ➜ ${npOnAir}`;
		} else if (document.location.hash.startsWith("#/Song")) {
			presenceData.details = `📰 ➜ Viewing song: ${
				document.querySelector(".sp-title").textContent
			}`;
			presenceData.state = `🎤 ➜ ${
				document.querySelector(".sp-artist").textContent
			}`;
		} else if (document.location.hash.startsWith("#/Library")) {
			presenceData.details = `📰 ➜ Viewing page: ${
				(document.querySelector(".mlib") || document.querySelector(".olib"))
					.textContent
			}`;
			presenceData.state = `💿 ➜ ${npOnAir}`;
		} else if (document.location.hash.startsWith("#/Special.Blank")) {
			presenceData.details = `📰 ➜ ${
				document.querySelector("#navbar > ul.dropdown.ubox > div > h1")
					.textContent
			} got FUNKY TOWNED!`;
			presenceData.state = `💿 ➜ ${npOnAir}`;
		} else {
			presenceData.details = `📰 ➜ Viewing page: ${
				document.location.hash.slice(2).split("?")[0]
			}`;
			presenceData.state = `💿 ➜ ${npOnAir}`;
		}
	}
	presence.setActivity(presenceData);
});
