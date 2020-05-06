const presence = new Presence({
    clientId: "707431547715977218"
}), pages = {
    "/turbobit-premium-alma-hizli-indirme": "Turbobit Premium Alma Hızlı indirme !",
    "/redbunker-premium-alma-hizli-indirme": "Redbunker Premium Alma Hızlı indirme !",
    "/windows-nasil-lisanslanir": "Windows Nasıl lisanslanır !",
    "/kirik-link-bildirimi-yapin": "Kırık Link Bildirimi Yapın!",
    "/winrar-crc-hatasi-cozumu-0": "Winrar CRC Hatası Çözümü %100",
    "/windows-dvd-usb-ile-format-atma": "Windows DVD USB İle Format Atma !",
    "/yardim-istek-bolumu": "Yardım & İstek Bölümü !"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, searchingFor = document.querySelector("#icerik > h1"), category = document.querySelector("#icerik > h1");
    if (page.includes("/kategori/") && (category && category.textContent != "")) {
        if (page.includes("/page/")) {
            var location = document.location.pathname.indexOf('page');
            var pgnum = "Sayfa: " + document.location.pathname.slice(location + 5, document.location.pathname.length);
        }
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir kategoriyi inceliyor:",
            state: pgnum != ""
                ? (category.textContent.slice(0, category.textContent.length - 27).trim() + "(" + pgnum + ")") || "Belirsiz"
                : category.textContent.slice(0, category.textContent.length - 27).trim() || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (document.location.href.includes("?s=") && searchingFor) {
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir şey arıyor:",
            state: searchingFor.textContent
                ? searchingFor.textContent.slice(17, searchingFor.textContent.length)
                : "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/page/")) {
        const pgnum = "Ana Sayfa: " + document.location.pathname.slice(6, document.location.pathname.length);
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Sayfalar arasında geziniyor:",
            state: pgnum
                ? pgnum
                : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes(".html")) {
        const topic = document.querySelector("#icerik-yazi > div.icerik-baslik > h1 > a");
        const published = document.querySelector("#icerik > div > div.yazi-alt > ul > li.tarih > span");
        const publisher = document.querySelector("#icerik > div > div.yazi-alt > ul > li.yazar > a");
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: topic.textContent.trim() || "Belirsiz",
            state: publisher && publisher.textContent != ""
                ? `${publisher.textContent.trim()} ${published && published.textContent != ""
                    ? "(" + published.textContent.trim() + ")"
                    : ""}`
                : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFBRSxLQUFLLEdBQUc7SUFDUixzQ0FBc0MsRUFBRSx1Q0FBdUM7SUFDL0UsdUNBQXVDLEVBQUUsd0NBQXdDO0lBQ2pGLDRCQUE0QixFQUFFLDZCQUE2QjtJQUMzRCw2QkFBNkIsRUFBRSw2QkFBNkI7SUFDNUQsNkJBQTZCLEVBQUUsK0JBQStCO0lBQzlELGtDQUFrQyxFQUFFLG1DQUFtQztJQUN2RSxzQkFBc0IsRUFBRSx5QkFBeUI7Q0FDcEQsQ0FBQztBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3pFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxLQUFLLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFD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