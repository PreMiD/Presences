const presence = new Presence({
		clientId: "1167822908526170153",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/V/Vizjer/assets/logo.png",
}

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: Assets.Logo,
			startTimestamp: browsingTimestamp,
		},
		{ pathname, search, href } = document.location,
		series = pathname.startsWith("/series/index/") ? pathname : null,
		movies = pathname.startsWith("/filmy-online/") ? pathname : null;
	switch (pathname) {
		case "/wyszukiwanie":
			if (search) {
				presenceData.details = "Wyszukuje po frazie:";
				presenceData.state = search.split("=")[1];
				presenceData.smallImageKey = Assets.Search;
			}
			break;
		case "/logowanie":
			presenceData.details = "Przegląda stronę logowania...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case "/rejestracja":
			presenceData.details = "Przegląda stronę rejestracji...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case "/regulamin":
			presenceData.details = "Przegląda regulamin...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case "/profil":
			presenceData.details = "Przegląda swój profil...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case "/twoje-materialy":
			presenceData.details = "Przegląda swoje materiały...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case movies:
			presenceData.details = "Przegląda filmy online...";
			if (movies.includes("sort:date")) {
				presenceData.details =
					"Przegląda ostatnio zaaktualizowane filmy online...";
			}
			if (movies.includes("sort:newlink"))
				presenceData.details = "Przegląda ostatnio dodane filmy...";
			if (movies.includes("sort:vote"))
				presenceData.details = "Przegląda filmy z największą liczbą głosów...";
			if (movies.includes("sort:premiere"))
				presenceData.details = "Przegląda ostatnie premiery filmów...";
			if (movies.includes("sort:view"))
				presenceData.details = "Przegląda filmy z największą liczbą odsłon...";
			if (movies.includes("sort:rate"))
				presenceData.details = "Przegląda filmy z największą liczbą ocen...";
			presenceData.smallImageKey = Assets.Search;
			presenceData.state = search
				? `Strona ${search.split("=")[1]}`
				: "Strona 1";
			break;
		case series:
			presenceData.details = "Przegląda seriale online...";
			if (series.includes("sort:newest") || series.includes("sort:date"))
				presenceData.details = "Przegląda najnowsze seriale online...";
			if (series.includes("sort:year"))
				presenceData.details = "Przegląda ostatnie premiery seriali...";
			if (series.includes("sort:vote")) {
				presenceData.details =
					"Przegląda seriale z największą liczbą głosów...";
			}
			if (series.includes("sort:view")) {
				presenceData.details =
					"Przegląda seriale z największą liczbą odsłon...";
			}
			if (series.includes("sort:rate"))
				presenceData.details = "Przegląda seriale z największą liczbą ocen...";
			presenceData.smallImageKey = Assets.Search;
			presenceData.state = search
				? `Strona ${search.split("=")[1]}`
				: "Strona 1";
			break;
		case "/dla-dzieci/":
			presenceData.details = "Przegląda filmy i seriale dla dzieci...";
			presenceData.state = search
				? `Strona ${search.split("=")[1]}`
				: "Strona 1";
			presenceData.smallImageKey = Assets.Search;
			break;
		case "/premium":
			presenceData.details = "Przegląda zakładkę premium...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case "/ranking":
			presenceData.details = "Przegląda ranking...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
		case pathname.startsWith("/film/") ? pathname : null:
			for (const info of document.querySelectorAll("div.info>ul")) {
				if (info.children[0].textContent === "Rok: ") {
					presenceData.details = `${
						document.querySelector("h2>span").textContent.split("/")[0]
					} (${info.children[1].textContent})`;
				}
			}
			presenceData.buttons = [{ label: "Oglądaj", url: href }];
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.current, video.duration);
			presenceData.smallImageKey = Assets.Play;
			presenceData.smallImageText = "Ogląda";
			if (video.paused) {
				presenceData.smallImageKey = Assets.Pause;
				presenceData.smallImageText = "Wstrzymano";
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
			break;
		case pathname.startsWith("/serial-online/") ? pathname : null: {
			if (document.querySelector("div.btn-group")) {
				presenceData.details = document
					.querySelectorAll("h2")[1]
					.textContent.split("/")[0];
				const seasonepisode = document
						.querySelector("h3")
						.textContent.split(" ")[0],
					regex = /\[s(\d+)e(\d+)\]/;
				presenceData.state = `Sezon: ${
					seasonepisode.match(regex)[1]
				} | Odcinek: ${seasonepisode.match(regex)[2]}`;
				presenceData.buttons = [
					{ label: "Oglądaj", url: href },
					{
						label: "Cały serial",
						url: document
							.querySelector("div#single-poster>a")
							.getAttribute("href"),
					},
				];
				[presenceData.startTimestamp, presenceData.endTimestamp] =
					presence.getTimestamps(video.current, video.duration);
				presenceData.smallImageKey = Assets.Play;
				presenceData.smallImageText = "Ogląda";
				if (video.paused) {
					presenceData.smallImageKey = Assets.Pause;
					presenceData.smallImageText = "Wstrzymano";
					delete presenceData.startTimestamp;
					delete presenceData.endTimestamp;
				}
			} else {
				const infos = document.querySelector("div.info>ul").children;
				presenceData.details = `${
					document.querySelectorAll("h2")[1].textContent.split("/")[0]
				} (${infos[infos.length - 1].textContent})`;
				presenceData.buttons = [{ label: "Zobacz serial", url: href }];
			}
			break;
		}
		default:
			presenceData.details = "Przegląda stronę główną...";
			presenceData.smallImageKey = Assets.Viewing;
			break;
	}

	if (!presenceData.details) presence.setActivity();
	else presence.setActivity(presenceData);
});
