const presence = new Presence({
		clientId: "580032576434077707",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

const enum Assets {
	Logo = "https://cdn.rcd.gg/PreMiD/websites/D/Desu-Online/assets/logo.png",
	Home = "https://cdn.rcd.gg/PreMiD/websites/D/Desu-Online/assets/0.png",
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
		{ pathname, search } = document.location;
	presenceData.smallImageKey = Assets.Search;
	if (search) {
		presenceData.details = "Używa zaawansowanej wyszukiwarki...";
		const searchvalues = search.split("&");
		for (const searchvalue of searchvalues) {
			if (searchvalue.startsWith("s=")) {
				presenceData.details = "Wyszukuje po frazie:";
				presenceData.state = searchvalue
					.substring(2, searchvalue.length)
					.replace(/(%20)(\+)/gm, " ");
			} else if (searchvalue.startsWith("?s=")) {
				presenceData.details = "Wyszukuje po frazie:";
				presenceData.state = searchvalue
					.substring(3, searchvalue.length)
					.replace(/(%20)(\+)/gm, " ");
			}
		}
	} else if (pathname === "/") {
		presenceData.details = "Przegląda stronę główną...";
		presenceData.smallImageKey = Assets.Home;
	} else if (pathname.startsWith("/anime/")) {
		if (pathname === "/anime/") presenceData.details = "Przegląda serie...";
		else if (pathname === "/anime/list-mode/")
			presenceData.details = "Przegląda listę serii...";
		else {
			presenceData.details = "Przegląda serię:";
			presenceData.state = document.querySelector("h1.entry-title").textContent;
			presenceData.largeImageKey = document
				.querySelector("img.ts-post-image")
				.getAttribute("src");
			presenceData.buttons = [
				{
					label: "Odwiedź",
					url: document.URL,
				},
			];
		}
	} else if (pathname === "/harmonogram/")
		presenceData.details = "Przegląda harmonogram...";
	else if (pathname === "/zakladki/")
		presenceData.details = "Przegląda swoje zakładki...";
	else if (pathname.startsWith("/blog/")) {
		if (pathname === "/blog/") {
			presenceData.details = "Przegląda bloga:";
			presenceData.state = "Strona 1";
		} else if (pathname.startsWith("/blog/page/")) {
			presenceData.details = "Przegląda bloga:";
			presenceData.state = `Strona ${pathname.split("/")[3]}`;
		} else {
			presenceData.details = "Czyta bloga:";
			presenceData.state = document
				.querySelectorAll("h1")[0]
				.textContent.replace("\n", "");
			presenceData.buttons = [{ label: "Czytaj", url: document.URL }];
		}
	} else if (pathname === "/gatunki/")
		presenceData.details = "Przegląda gatunki...";
	else if (pathname.startsWith("/season/")) {
		presenceData.details = "Przegląda sezon:";
		presenceData.state =
			document.querySelector("div.newseason > h1").textContent;
	} else if (pathname === "/sezony/")
		presenceData.details = "Przegląda sezony...";
	else if (pathname.startsWith("/label/")) {
		if (pathname === "/label/news/")
			presenceData.details = "Przegląda newsy...";
		else if (pathname === "/label/recenzja/")
			presenceData.details = "Przegląda recenzje...";
	} else if (pathname === "/ekipa-portalu/")
		presenceData.details = "Przegląda ekipę portalu...";
	else if (pathname === "/polityka-prywatnosci/")
		presenceData.details = "Przegląda politykę prywatności...";
	else if (pathname.startsWith("/genres/")) {
		presenceData.details = "Przegląda gatunek:";
		presenceData.state = `${
			document.querySelector("div.releases > h1 > span").textContent
		}`;
		if (pathname.includes("page"))
			presenceData.state += ` (Strona ${pathname.split("/")[4]})`;
	} else if (pathname.startsWith("/studio/")) {
		presenceData.details = "Przegląda studio:";
		presenceData.state = `${
			document.querySelector("div.releases > h1 > span").textContent
		}`;
		if (pathname.includes("page"))
			presenceData.state += ` (Strona ${pathname.split("/")[4]})`;
	} else if (
		document.querySelector("span.year").textContent &&
		document.querySelector("span.year").textContent.includes("Dodane przez")
	) {
		presenceData.details = `Ogląda: ${
			document.querySelector("div.det > h3").textContent
		}`;
		const playinfo = document
			.querySelector("li.selected > a > div.playinfo > span")
			.textContent.split("-");
		presenceData.state = `Odcinek:${playinfo[0].replace("Odc", "")}`;
		if (playinfo.length > 2) {
			presenceData.state += ` - "${document
				.querySelector("li.selected > a > div.playinfo > span")
				.textContent.match(/-.*-/gm)
				.toString()
				.slice(2, -2)}"`;
		}
		presenceData.buttons = [
			{ label: "Oglądaj", url: document.URL },
			{
				label: "Cała seria",
				url: document.querySelector("div.det > h3 > a").getAttribute("href"),
			},
		];
		presenceData.largeImageKey = document
			.querySelector("img.ts-post-image")
			.getAttribute("src");
		[presenceData.startTimestamp, presenceData.endTimestamp] =
			presence.getTimestamps(video.current, video.duration);

		presenceData.smallImageKey = Assets.Play;
		presenceData.smallImageText = "Odtwarzanie";
		if (video.paused) {
			presenceData.smallImageKey = Assets.Pause;
			presenceData.smallImageText = "Wstrzymano";
			delete presenceData.startTimestamp;
			delete presenceData.endTimestamp;
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
