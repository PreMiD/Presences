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
            var pgn = "Sayfa: " + document.location.pathname.slice(location + 5, document.location.pathname.length);
        }
        var category2 = category.textContent.slice(0, category.textContent.length - 27).trim();
        if (pgn) {
            category2 = category2 + "(" + pgn + ")";
        }
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir kategoriyi inceliyor:",
            state: category2 || "Belirsiz",
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
        var pgnum = document.location.pathname.slice(6, document.location.pathname.length);
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Sayfalar arasında geziniyor:",
            state: pgnum
                ? `Ana Sayfa: ${pgnum}`
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFBRSxLQUFLLEdBQUc7SUFDUixzQ0FBc0MsRUFBRSx1Q0FBdUM7SUFDL0UsdUNBQXVDLEVBQUUsd0NBQXdDO0lBQ2pGLDRCQUE0QixFQUFFLDZCQUE2QjtJQUMzRCw2QkFBNkIsRUFBRSw2QkFBNkI7SUFDNUQsNkJBQTZCLEVBQUUsK0JBQStCO0lBQzlELGtDQUFrQyxFQUFFLG1DQUFtQztJQUN2RSxzQkFBc0IsRUFBRSx5QkFBeUI7Q0FDcEQsQ0FBQztBQUNGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ2pDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xKLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1FBQ3pFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN6QixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxHQUFHLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFD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