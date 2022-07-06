const presence = new Presence({ clientId: "937015924425367643" }),
	startTimestamp = Math.floor(Date.now() / 1000);
let languages = [];
setInterval(
	async () =>
		(languages = await fetch("https://premid.ravencode.live").then(res =>
			res.json()
		)),
	15000
);
presence.on("UpdateData", async () => {
	const presenceData = {
			largeImageKey: "logo",
			details: "Geziniyor",
			startTimestamp
		},
		{ pathname, search } = document.location,
		searchParams = new URLSearchParams(search);
	switch (pathname) {
		case "/":
			presenceData.details = "Anasayfayı görüntülüyor";
			if (searchParams.has("user_id")) {
				const image = document.querySelector("[data-premid-useravatar]")?.src,
					userTag = document.querySelector("[data-premid-usertag]")?.innerText;
				if (image && userTag) {
					presenceData.details = "Kullanıcıyı görüntülüyor:";
					presenceData.state = userTag;
					presenceData.largeImageKey = image;
				}
			} else if (searchParams.has("invite_code")) {
				const image = document.querySelector("[data-premid-guildicon]")?.src,
					guildName = document.querySelector(
						"[data-premid-guildname]"
					)?.innerText;
				if (image && guildName) {
					presenceData.details = "Daveti görüntülüyor:";
					presenceData.state = guildName;
					presenceData.largeImageKey = image;
				}
			}
			break;
		case "/share":
			presenceData.details = "Kod paylaşıyor";
			break;
		case "/profile":
			presenceData.details = "Profil görüntüleniyor:";
			presenceData.state = document.title.split("— ")[1];
			presenceData.largeImageKey = document.querySelector(
				"[data-premid-avatar]"
			).src;
			break;
		case "/codes":
			presenceData.details = "Kodlar sayfasını görüntülüyor";
			if (searchParams.get("search") !== null)
				presenceData.state = `Arama: ${searchParams.get("search")}`;
			break;
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
			document.activeElement === document.querySelector('input[id="comment"]')
		)
			presenceData.details = "Yorum yapılıyor:";
	}
	return presence.setActivity(presenceData);
});
