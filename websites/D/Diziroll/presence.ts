const presence = new Presence({ clientId: "818550584994168934" });

let stream: { duration: number; currentTime: number; paused: boolean };
presence.on(
	"iFrameData",
	(data: { duration: number; currentTime: number; paused: boolean }) => {
		stream = data;
	}
);

presence.on("UpdateData", async () => {
	const path: string = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey:
				"https://cdn.rcd.gg/PreMiD/websites/D/Diziroll/assets/logo.png",
		};
	presenceData.startTimestamp = Date.now();
	if (path.startsWith("/arsiv")) {
		presenceData.details = "Bir sayfaya bakıyor:";
		presenceData.state = "Arşiv";
	} else if (path.startsWith("/listeler")) {
		presenceData.details = "Bir sayfaya bakıyor:";
		presenceData.state = "Listeler";
	} else if (path.startsWith("/hesabim")) {
		presenceData.details = "Bir sayfaya bakıyor:";
		presenceData.state = "Hesabım";
	} else if (path === "/") {
		presenceData.details = "Bir sayfaya bakıyor:";
		presenceData.state = "Ana Sayfa";
	} else if (document.querySelector("#archive-page")) {
		presenceData.details = "Bir dizi türünü inceliyor: ";
		presenceData.state = document.querySelector("div.title").textContent;
	} else if (document.querySelector("#series-page")) {
		presenceData.details = "Bir diziyi inceliyor:";
		presenceData.state = document.querySelector("div.top > h1").textContent;
	} else if (document.querySelectorAll(".episode-detail").length > 0) {
		presenceData.details =
			document.querySelectorAll<HTMLElement>(".series-name")[0].title ||
			"Bulunamadı";
		presenceData.state = `${
			document.querySelector("div.select-season > a").textContent ??
			"Bulunamadı"
		}- ${
			document.querySelector("div.select-episode > a").textContent ??
			"Bulunamadı"
		}`;
		presenceData.buttons = [
			{ label: "İzle", url: document.location.href },
			{
				label: "Diziyi Görüntüle",
				url: `${document.location.origin}/${
					document.location.pathname.split("/")[1]
				}`,
			},
		];
		presenceData.smallImageKey = stream.paused ? Assets.Pause : Assets.Play;
		presenceData.smallImageText = stream.paused ? "Durduruldu" : "Oynatılıyor";
		if (!stream.paused) {
			[presenceData.startTimestamp, presenceData.endTimestamp] =
				presence.getTimestamps(
					stream.currentTime ? Math.floor(stream.currentTime) : null,
					stream.duration ? Math.floor(stream.duration) : null
				);
		}
	} else {
		presenceData.details = "Bir sayfayı inceliyor:";
		presenceData.state = "Bilinmeyen Sayfa";
	}
	presence.setActivity(presenceData);
});
