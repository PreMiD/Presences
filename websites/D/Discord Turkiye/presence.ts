const presence = new Presence({ clientId: "890757020393816064" }),
	startTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
	const presenceData: PresenceData = {
			largeImageKey: "1024dctr",
			details: "Geziniyor",
			startTimestamp,
		},
		{ pathname } = document.location,
		privacyMode = await presence.getSetting("privacy_mode").catch(() => false);

	if (document.querySelector('[href="/login/"]')) {
		presenceData.smallImageText = "Misafir Modu";
		presenceData.smallImageKey = "https://i.hizliresim.com/385dt7x.png";
	} else if (document.querySelector("span.avatar.avatar--xxs > img")) {
		presenceData.smallImageText = document
			.querySelector("span.avatar.avatar--xxs > img")
			.getAttribute("alt");
		presenceData.smallImageKey = "https://i.hizliresim.com/385dt7x.png";
	}

	if (pathname === "/") presenceData.details = "Anasayfayı görüntülüyor";
	else if (pathname.includes("/hesabim"))
		presenceData.details = "Kişisel detaylarını görüntülüyor";
	if (pathname.includes("/konular/")) {
		presenceData.details = "Konuyu görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
		if (
			document.querySelector<HTMLElement>("div.fr-element.fr-view > p")
				?.textContent &&
			document.querySelector<HTMLElement>("div.fr-element.fr-view > p")
				?.textContent != "\n"
		) {
			presenceData.details = "Konuya yorum yazıyor:";
			presenceData.state = document.title.split(" | ")[0];
		}
	}
	if (pathname.includes("/kullanicilar/"))
		presenceData.details = "Kullanıcıları görüntülüyor";
	if (document.querySelector("span.username > span")) {
		presenceData.details = "Kullanıcıyı görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
	}
	if (pathname === "/araclar/") {
		presenceData.details = "Araçları görüntülüyor";
		delete presenceData.smallImageKey;
	}

	if (pathname === "/araclar/davet/") {
		delete presenceData.smallImageKey;
		if (privacyMode) presenceData.details = "Davet görüntülüyor";
		else if (
			(<HTMLElement>document.querySelector("div.tag > div.name")).textContent
		) {
			presenceData.details = "Daveti görüntülüyor:";
			presenceData.state = (<HTMLElement>(
				document.querySelector("div.tag > div.name")
			)).textContent;
			presenceData.largeImageKey = (<HTMLElement>(
				document.querySelector("div.icon")
			)).style.backgroundImage
				.split('url("')[1]
				.split('");')[0];
		}
	}

	if (pathname === "/araclar/kullanici/") {
		delete presenceData.smallImageKey;
		if (privacyMode) presenceData.details = "Kullanıcı görüntülüyor";
	} else if ((<HTMLElement>document.querySelector("div.tag")).textContent) {
		presenceData.details = "Kullanıcı görüntülüyor:";
		presenceData.state = `${
			(<HTMLElement>document.querySelector("div.tag > div.username"))
				.textContent
		}${
			(<HTMLElement>document.querySelector("div.tag > div.discriminator"))
				.textContent
		}`;
		presenceData.largeImageKey = (<HTMLElement>(
			document.querySelector("div.avatar")
		)).style.backgroundImage
			.split('url("')[1]
			.split('");')[0];
	}

	if (pathname === "/konusmalar/")
		presenceData.details = "Konuşmalarını görüntülüyor";

	if (pathname.includes("/tags/")) {
		presenceData.details = "Etiketi görüntülüyor:";
		presenceData.state = document.title.split(" | ")[0];
	}

	if (pathname === "/tags") presenceData.details = "Etiketleri görüntülüyor";

	if (pathname.includes("/post-thread")) {
		presenceData.details = "Kategoride konu açıyor:";
		presenceData.state = document.querySelector(
			'[itemprop="itemListElement"]:last-child span[itemprop="name"]'
		).textContent;
	}

	return presence.setActivity(presenceData);
});
