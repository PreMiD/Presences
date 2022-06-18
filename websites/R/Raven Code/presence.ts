const presence = new Presence({ clientId: "937015924425367643" }),
	startTimestamp = Math.floor(Date.now() / 1000);

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
		const languages = [
			{
				page: "discord.js",
				key: "https://ravencode.live/assets/d403fd74-017c-cf35-e2c6-5fc1f93ae1d6.jpg",
				text: "Discord.js",
			},
			{
				page: "eris",
				key: "https://ravencode.live/assets/13df8b96-37db-627c-9052-f29df2391d17.jpg",
				text: "Eris",
			},
			{
				page: "javascript",
				key: "https://ravencode.live/assets/f8d448e8-abc5-1562-bfdc-35b5b84346e7.jpg",
				text: "JavaScript",
			},
			{
				page: "html",
				key: "https://ravencode.live/assets/724c385b-a123-701a-427d-f8a9660cbbcd.jpg",
				text: "HTML",
			},
			{
				page: "python",
				key: "https://ravencode.live/assets/b86f1bd7-7066-ee31-290a-4bccfc2b7e65.jpg",
				text: "Python",
			},
			{
				page: "css",
				key: "https://ravencode.live/assets/ea0fa51a-960c-c68f-6315-f7ae20fa39f4.jpg",
				text: "CSS",
			},
		];

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
