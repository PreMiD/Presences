const presence = new Presence({ clientId: "890757020393816064" });

presence.on("UpdateData", async () => {
	const presenceData = {
			largeImageKey: "1024dctr",
			details: "Geziniyor",
			state: "",
			startTimestamp: Math.floor(Date.now() / 1000),
			smallImageText: "",
			smallImageKey: ""
		},
		page = document.location.pathname,
		privacyMode = await presence.getSetting("privacy_mode").catch(() => {
			false;
		});

	if (document.querySelector('[href="/login/"]') != null) {
		presenceData.smallImageText = "Misafir Modu";
		presenceData.smallImageKey = "https://i.hizliresim.com/385dt7x.png";
	} else if (document.querySelector("span.avatar.avatar--xxs > img")) {
		presenceData.smallImageText = document
			.querySelector("span.avatar.avatar--xxs > img")
			.getAttribute("alt");
		presenceData.smallImageKey = "https://i.hizliresim.com/385dt7x.png";
	}

	if (page == "/") presenceData.details = "Anasayfayı görüntülüyor";
	if (page.includes("/hesabim")) {
		presenceData.details = "Kişisel detaylarını görüntülüyor";
	}
	if (page.includes("/konular/")) {
		presenceData.details = "Konuyu görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
		if (
			(<HTMLElement>document.querySelector("div.fr-element.fr-view > p"))
				?.innerText != undefined &&
			(<HTMLElement>document.querySelector("div.fr-element.fr-view > p"))
				?.innerText != "\n"
		) {
			presenceData.details = "Konuya yorum yazıyor:";
			presenceData.state = document.title.split(" | ")[0];
		}
	}
	if (page.includes("/kullanicilar/")) {
		presenceData.details = "Kullanıcıları görüntülüyor";
	}
	if (document.querySelector("span.username > span")) {
		presenceData.details = "Kullanıcıyı görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
	}
	if (page == "/araclar/") {
		presenceData.details = "Araçları görüntülüyor";
		delete presenceData.smallImageKey;
	}

	if (page == "/araclar/davet/") {
		delete presenceData.smallImageKey;
		if (privacyMode) {
			presenceData.details = "Davet görüntülüyor";
		} else if (
			(<HTMLElement>document.querySelector("div.tag > div.name")).innerText
		) {
			presenceData.details = "Daveti görüntülüyor:";
			presenceData.state = (<HTMLElement>(
				document.querySelector("div.tag > div.name")
			)).innerText;
			presenceData.largeImageKey = (<HTMLElement>(
				document.querySelector("div.icon")
			)).style.backgroundImage
				.split('url("')[1]
				.split('");')[0];
		}
	}

	if (page == "/araclar/kullanici/") {
		delete presenceData.smallImageKey;
		if (privacyMode) {
			presenceData.details = "Kullanıcı görüntülüyor";
		} else if ((<HTMLElement>document.querySelector("div.tag")).innerText) {
			presenceData.details = "Kullanıcı görüntülüyor:";
			presenceData.state =
				(<HTMLElement>document.querySelector("div.tag > div.username"))
					.innerText +
				"" +
				(<HTMLElement>document.querySelector("div.tag > div.discriminator"))
					.innerText;
			presenceData.largeImageKey = (<HTMLElement>(
				document.querySelector("div.avatar")
			)).style.backgroundImage
				.split('url("')[1]
				.split('");')[0];
		}
	}

	if (page == "/konusmalar/") {
		presenceData.details = "Konuşmalarını görüntülüyor";
	}

	if (page.includes("/tags/")) {
		presenceData.details = "Etiketi görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
	}

	if (page == "/tags") presenceData.details == "Etiketleri görüntülüyor";

	if (page.includes("/post-thread")) {
		presenceData.details = "Kategoride konu açıyor:";
		presenceData.state = document.querySelector(
			'[itemprop="itemListElement"]:last-child span[itemprop="name"]'
		).textContent;
	}

	if (presenceData.details) presence.setActivity(presenceData);
	else presence.setActivity();
});
