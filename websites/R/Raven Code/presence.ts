const presence = new Presence({ clientId: "937015924425367643" }),
	startTimestamp = Math.floor(Date.now() / 1000);
let languages: { key: string; page: string; text: string }[] = [];

setInterval(
	async () =>
		(languages = await fetch("https://premid.ravencode.live").then(res =>
			res.json()
		)),
	15_000
);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			details: "Geziniyor",
			startTimestamp,
		},
		{ pathname, search } = document.location,
		searchParams = new URLSearchParams(search);

	switch (pathname) {
		case "/":
			presenceData.details = "Anasayfayı görüntülüyor";
			break;
		case "/yetkililer":
			presenceData.details = "Yetkililer sayfasını görüntülüyor";
			break;
		case "/share":
			presenceData.details = "Kod paylaşıyor";
			break;
		case "/tools":
			presenceData.details = "Araçlar sayfasını görüntülüyor";
			break;

		case "/profile":
			presenceData.details = "Profil görüntüleniyor:";
			presenceData.state = document.querySelector(".user-info").textContent;
			presenceData.largeImageKey =
				document.querySelector<HTMLImageElement>("img.avatar").src;
			break;

		case "/codes":
			presenceData.details = "Kodlar sayfasını görüntülüyor";
			if (searchParams.get("filter") !== "all") {
				presenceData.state = `Arama: ${decodeURIComponent(
					searchParams.get("filter")
				)} — Sayfa ${searchParams.get("page")}`;
			} else presenceData.state = `Sayfa ${searchParams.get("page")}`;
	}

	if (pathname.startsWith("/code/")) {
		presenceData.details = "Kod görüntüleniyor:";
		presenceData.state = document.title.split("— ")[1];

		for (const language of languages) {
			if (pathname.includes(language.page)) {
				presenceData.smallImageKey = language.key;
				presenceData.smallImageText = `Kategori — ${language.text}`;
			}
		}

		if (
			document.activeElement === document.querySelector('input[name="comment"]')
		)
			presenceData.details = "Yorum yapılıyor:";
		if (
			document.querySelector(
				'.comment-text-wrapper > .text[contenteditable="true"]'
			)
		)
			presenceData.details = "Yorum düzenleniyor:";
		if (document.querySelector('code[contenteditable="true"]'))
			presenceData.details = "Kod bloğu düzenliyor:";
		if (
			document.querySelector(".swal2-title > div > div:nth-child(2)")
				?.textContent === "Kod Raporlama"
		)
			presenceData.details = "Hata bildiriyor:";
	}

	return presence.setActivity(presenceData);
});
