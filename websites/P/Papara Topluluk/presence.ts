const presence = new Presence({
		clientId: "1092957554365182033",
	}),
	strings = presence.getStrings({
		reading: "general.readingThread",
		viewingUser: "general.viewUser",
	}),
	pages: { [k: string]: string } = {
		"/": "Ana Sayfa",
		"/categories": "Kategoriler",
		"/g": "Gruplar",
		"/about": "Hakkında",
		"/guidelines": "Kılavuz",
		"/tos": "Hizmet Şartları",
		"/privacy": "Gizlilik",
		"/tags": "Etiketler",
		"/cakeday/anniversaries/today": "Yıl Dönümleri",
		"/cakeday/birthdays/today": "Doğum Günleri",
		"/latest": "Son Konular",
		"/new": "Yeni Konular",
		"/top": "Popüler Konular",
		"/activity": "Aktivite",
		"/notifications": "Bildirimler",
		"/messages": "Mesajlar",
		"/invited": "Davetler",
		"/badges": "Rozetler",
	},
	dateNow = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "logo",
			startTimestamp: dateNow,
		},
		page = document.location.pathname,
		privacyMode = await presence.getSetting("privacyMode"),
		{ reading, viewingUser } = await strings;

	if (page.includes("/t/")) {
		presenceData.details = reading;
		presenceData.state = document.querySelector(
			".title-wrapper .fancy-title"
		).textContent;

		presenceData.smallImageKey = "reading";
	} else if (page.includes("/c/")) {
		presenceData.details = "Bir kategoriye göz atıyor:";
		presenceData.state = document.querySelector(".category-name").textContent;
	} else if (page.includes("/tag/")) {
		presenceData.details = "Bir etikete göz atıyor:";
		presenceData.state = `#${decodeURIComponent(page.split("/")[2])}`;
		presenceData.smallImageKey = "search";
	} else if (!privacyMode && page.includes("/u/")) {
		const username = document.querySelector(
			".details .user-profile-names .username"
		).textContent;

		if (Object.keys(pages).includes(`/${page.split("/")[3]}`)) {
			presenceData.details = "Bir kullanıcı sayfasında:";
			presenceData.state = pages[`/${page.split("/")[3]}`];
			presenceData.smallImageText = username;
		} else {
			presenceData.details = viewingUser;
			presenceData.state = username;
		}

		presenceData.buttons = [
			{
				label: "Kullanıcıyı Görüntüle",
				url: document.location.href,
			},
		];

		presenceData.smallImageKey = document.querySelector<HTMLImageElement>(
			".details .user-profile-avatar img"
		).src;
	} else if (pages[page] || pages[page.slice(0, -1)]) {
		presenceData.details = "Bir sayfaya göz atıyor:";
		presenceData.state = pages[page] || pages[page.slice(0, -1)];
	}

	presence.setActivity(presenceData);
});
