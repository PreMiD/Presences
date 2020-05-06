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
            state: pgnum
                ? category.textContent.slice(0, category.textContent.length - 27).trim() + "(" + pgnum + ")" || "Belirsiz"
                : category.textContent.slice(0, category.textContent.length - 27).trim() || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (document.location.href.includes("?s=") && searchingFor) {
        presence.setActivity({
            largeImageKey: "fp-logo",
            details: "Bir şey arıyor:",
            state: searchingFor && searchingFor.textContent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFBRSxLQUFLLEdBQUc7SUFDWCxzQ0FBc0MsRUFBRSx1Q0FBdUM7SUFDL0UsdUNBQXVDLEVBQUUsd0NBQXdDO0lBQ2pGLDRCQUE0QixFQUFFLDZCQUE2QjtJQUMzRCw2QkFBNkIsRUFBRSw2QkFBNkI7SUFDNUQsNkJBQTZCLEVBQUUsK0JBQStCO0lBQzlELGtDQUFrQyxFQUFFLG1DQUFtQztJQUN2RSxzQkFBc0IsRUFBRSx5QkFBeUI7Q0FDbEQsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsRUFDckQsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUE7SUFFbkQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUU7UUFDNUUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzVCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6RCxJQUFJLEtBQUssR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENB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