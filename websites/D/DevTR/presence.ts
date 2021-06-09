const presence = new Presence({
    clientId: "749319733807153162"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo"
    }, page = window.location.pathname, browsingStamp = Math.floor(Date.now() / 1000);
    presenceData.startTimestamp = browsingStamp;
    if (page.startsWith("/kullanici/")) {
        presenceData.details = "Bir kullanıcının profilini görüntülüyor:";
        presenceData.state = document.querySelector("body > div:nth-child(6) > div > h3").textContent;
    }
    else if (page.startsWith("/yardim")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Sıkça Sorulan Sorular";
    }
    else if (page.startsWith("/ben")) {
        presenceData.details = "Kendi profilini görüntülüyor... 😳";
    }
    else if (page.startsWith("/kategori=js")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "JS Kodları";
        presenceData.smallImageKey = "js";
    }
    if (page.startsWith("/kategori=jsplus")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "JS+ Kodları";
        presenceData.smallImageKey = "js";
    }
    if (page.startsWith("/kategori=ek")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Ek Kodlar";
    }
    if (page.startsWith("/kategori=diger")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Diğer Kodlar";
    }
    if (page.startsWith("/kategori=booster")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "Booster Kodlar";
        presenceData.smallImageKey = "booster";
    }
    else if (page.startsWith("/kod")) {
        presenceData.details = "Bir kodu görüntülüyor:";
        presenceData.state = document.querySelector("body > section:nth-child(34) > div > div > div.mb-4.is-flex-desktop > div.title-container.mr-6 > h1").textContent || document.querySelector("body > section:nth-child(34) > div > div > div.mb-4.is-flex-desktop > div.title-container.mr-6 > h1").textContent;
    }
    else if (page.startsWith("/tag")) {
        presenceData.details = "Bir etiketi görüntülüyor:";
        presenceData.state = document.querySelector("body > section:nth-child(45) > div > div > h1").textContent;
    }
    else if (page.startsWith("/kategori=html")) {
        presenceData.details = "Bir sayfayı görüntülüyor:";
        presenceData.state = "HTML kodları";
        presenceData.smallImageKey = "html";
    }
    else if (page.endsWith("/rapor")) {
        presenceData.details = "Bir şeyi bildiriyor...";
    }
    else if (page.startsWith("/hata")) {
        presenceData.details = "Bir hata aldı 👀";
        presenceData.smallImageKey = "x";
    }
    else if (page.startsWith("/kategori=altyapi")) {
        presenceData.details = "Altyapıları görüntülüyor...";
        presenceData.smallImageKey = "alt";
    }
    else if (page.startsWith("/bekleyenler")) {
        presenceData.details = " Onay bekleyen kodlara göz atıyor.";
    }
    else if (page.startsWith("/sikayetler")) {
        presenceData.details = "Şikayetlere göz atıyor.";
    }
    else if (page.startsWith("/kodekle")) {
        presenceData.details = "Yeni bir kod ekliyor.";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
