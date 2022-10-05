const presence = new Presence({
		clientId: "580032576434077707",
	}),
	browsingTimestamp = Math.floor(Date.now() / 1000);

let video = {
	current: 0,
	duration: 0,
	paused: true,
};

presence.on(
	"iFrameData",
	(data: { current: number; duration: number; paused: boolean }) => {
		video = data;
	}
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/KEkxfKO.png",
			startTimestamp: browsingTimestamp,
		},
		pth = document.location.pathname;
	if (document.location.host === "desu-online.pl") {
		presenceData.smallImageKey =
			"https://cdn-icons-png.flaticon.com/512/5611/5611971.png";
		if (document.location.search !== "") {
			presenceData.details = "Używa zaawansowanej wyszukiwarki...";
			const searchvalues = document.location.search.split("&");
			for (const searchvalue of searchvalues) {
				if (searchvalue.startsWith("s=")) {
					presenceData.details = "Wyszukuje po frazie:";
					presenceData.state = searchvalue
						.substring(2, searchvalue.length)
						.replaceAll("+", " ")
						.replaceAll("%20", " ");
				} else if (searchvalue.startsWith("?s=")) {
					presenceData.details = "Wyszukuje po frazie:";
					presenceData.state = searchvalue
						.substring(3, searchvalue.length)
						.replaceAll("+", " ")
						.replaceAll("%20", " ");
				}
			}
		} else if (pth === "/") {
			presenceData.details = "Przegląda stronę główną...";
			presenceData.smallImageKey =
				"https://cdn-icons-png.flaticon.com/512/5974/5974636.png";
		} else if (pth.startsWith("/anime/")) {
			if (pth === "/anime/") presenceData.details = "Przegląda serie...";
			else if (pth === "/anime/list-mode/")
				presenceData.details = "Przegląda listę serii...";
			else {
				presenceData.details = "Przegląda serię:";
				presenceData.state = document.querySelectorAll("h1")[0].textContent;
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
		} else if (pth === "/harmonogram/")
			presenceData.details = "Przegląda harmonogram...";
		else if (pth === "/zakladki/")
			presenceData.details = "Przegląda swoje zakładki...";
		else if (pth.startsWith("/blog/")) {
			if (pth === "/blog/") {
				presenceData.details = "Przegląda bloga:";
				presenceData.state = "Strona 1";
			} else if (pth.startsWith("/blog/page/")) {
				presenceData.details = "Przegląda bloga:";
				presenceData.state = `Strona ${
					document.location.pathname.split("/")[3]
				}`;
			} else {
				presenceData.details = "Czyta bloga:";
				presenceData.state = document
					.querySelectorAll("h1")[0]
					.textContent.replace("\n", "");
				presenceData.buttons = [{ label: "Czytaj", url: document.URL }];
			}
		} else if (pth === "/gatunki/")
			presenceData.details = "Przegląda gatunki...";
		else if (pth.startsWith("/season/")) {
			presenceData.details = "Przegląda sezon:";
			presenceData.state = document.querySelectorAll("h1")[0].textContent;
		} else if (pth === "/sezony/") presenceData.details = "Przegląda sezony...";
		else if (pth.startsWith("/label/")) {
			if (pth === "/label/news/") presenceData.details = "Przegląda newsy...";
			else if (pth === "/label/recenzja/")
				presenceData.details = "Przegląda recenzje...";
		} else if (pth === "/ekipa-portalu/")
			presenceData.details = "Przegląda ekipę portalu...";
		else if (pth === "/polityka-prywatnosci/")
			presenceData.details = "Przegląda politykę prywatności...";
		else if (pth.startsWith("/genres/")) {
			presenceData.details = "Przegląda gatunek:";
			presenceData.state = `${document.querySelectorAll("h1")[0].textContent}`;
			if (pth.includes("page")) {
				presenceData.state = `${
					document.querySelectorAll("h1")[0].textContent
				} (Strona ${document.location.pathname.split("/")[4]})`;
			}
		} else if (pth.startsWith("/studio/")) {
			presenceData.details = "Przegląda studio:";
			presenceData.state = `${document.querySelectorAll("h1")[0].textContent}`;
			if (pth.includes("page")) {
				presenceData.state = `${
					document.querySelectorAll("h1")[0].textContent
				} (Strona ${document.location.pathname.split("/")[4]})`;
			}
		} else if (
			document.querySelectorAll("span.year")[0].textContent &&
			document
				.querySelectorAll("span.year")[0]
				.textContent.includes("Dodane przez")
		) {
			presenceData.details = `Ogląda: ${
				document.querySelector(
					"body > div > div > div > div > div > div > div > h3"
				).textContent
			}`;
			presenceData.state = `Odcinek:${
				document
					.querySelector(
						"body > div > div > div > div > div > div > div > span"
					)
					.textContent.split("-")[1]
					.split("/")[0]
			}`;
			presenceData.buttons = [
				{ label: "Oglądaj", url: document.URL },
				{
					label: "Cała seria",
					url: document
						.querySelector(
							"body > div > div > div > div > div > div > div > h3 > a"
						)
						.getAttribute("href"),
				},
			];
			presenceData.largeImageKey = document
				.querySelector("img.ts-post-image")
				.getAttribute("src");
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(video.current, video.duration);

			presenceData.smallImageKey = "play";
			presenceData.smallImageText = "Odtwarzanie";
			if (video.paused) {
				presenceData.smallImageKey = "pause";
				presenceData.smallImageText = "Wstrzymano";
				delete presenceData.startTimestamp;
				delete presenceData.endTimestamp;
			}
		}
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
