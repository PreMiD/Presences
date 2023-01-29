const presence = new Presence({
	clientId: "663151599924936714",
});

presence.on("UpdateData", async () => {
	const path = document.location.pathname,
		presenceData: PresenceData = {
			largeImageKey: "https://i.imgur.com/Ly3FWW9.png",
			startTimestamp: Math.floor(Date.now() / 1000),
		};

	switch (path) {
		case "/": {
			presenceData.details = "Ana sayfada geziniyor..";
			break;
		}
		case "/dashboard": {
			presenceData.details = "Hesabını kontrol ediyor.";
			break;
		}
		case "/orders": {
			presenceData.details = "Siparişlerine bakıyor..";
			break;
		}
		case "/collections": {
			presenceData.details = "Tahsilatlarına bakıyor..";
			break;
		}
		case "/user/edit": {
			presenceData.details = "Bilgilerini düzenliyor..";
			break;
		}
		case "/auth/login": {
			presenceData.details = "Panele giriş yapıyor..";
			break;
		}
		case "/auth/register": {
			presenceData.details = "Kayıt oluyor..";
			break;
		}
		case "/wallet": {
			presenceData.details = "Cündanını görüntülüyor..";
			break;
		}
		case "/docs": {
			presenceData.details = "Dökümanlara bakıyor..";
			break;
		}
		default:
			if (path.includes("/support/get/")) {
				presenceData.details = "Destek talebine bakıyor:";
				presenceData.state = document.querySelector(
					"body > div > div > div > div > div > div > div > div > div > h2 "
				).textContent;
			} else if (path === "/support")
				presenceData.details = "Destek taleplerine bakıyor..";
			else if (path === "/support/newTicket")
				presenceData.details = "Destek talebi oluşturuyor..";
			else if (
				path.includes("/products/new-product") &&
				path.startsWith("/project/")
			) {
				presenceData.details = "Bir ürün oluşturuyor..";

				presenceData.smallImageKey = "project";
				presenceData.smallImageText = (
					document.forms[2][0] as HTMLInputElement
				).value;
			} else if (path.startsWith("/project/") && path.includes("/products/")) {
				presenceData.details = "Bir ürünü düzenliyor:";
				const form = document.forms[2];

				presenceData.smallImageKey = "project";
				presenceData.smallImageText = (form[0] as HTMLInputElement).value;
				presenceData.state = `${(form[1] as HTMLInputElement).value}`;
			} else if (path.startsWith("/project/new-project"))
				presenceData.details = "Bir proje oluşturuyor..";
			else if (path.startsWith("/project/")) {
				presenceData.details = "Bir projeyi düzenliyor:";
				[presenceData.state] = document
					.querySelector("body > div > div > div > div > div > div > div > h1 ")
					.textContent.split("|");
			} else if (path.includes("/verify"))
				presenceData.details = "E-postasını doğruluyor..";
			else presenceData.details = "Bir sayfayı görüntülüyor..";
	}

	presence.setActivity(presenceData);
});
