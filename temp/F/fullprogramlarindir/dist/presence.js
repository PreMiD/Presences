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
    if (page.includes("/kategori/") && category && category.textContent != "") {
        if (page.includes("/page/")) {
            var location = document.location.pathname.indexOf("page");
            var pgn = "Sayfa: " +
                document.location.pathname.slice(location + 5, document.location.pathname.length);
        }
        var category2 = category.textContent
            .slice(0, category.textContent.length - 27)
            .trim();
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
            state: pgnum ? `Ana Sayfa: ${pgnum}` : "Belirsiz",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixzQ0FBc0MsRUFDcEMsdUNBQXVDO0lBQ3pDLHVDQUF1QyxFQUNyQyx3Q0FBd0M7SUFDMUMsNEJBQTRCLEVBQUUsNkJBQTZCO0lBQzNELDZCQUE2QixFQUFFLDZCQUE2QjtJQUM1RCw2QkFBNkIsRUFBRSwrQkFBK0I7SUFDOUQsa0NBQWtDLEVBQUUsbUNBQW1DO0lBQ3ZFLHNCQUFzQixFQUFFLHlCQUF5QjtDQUNsRCxDQUFDO0FBQ0osUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQ3JDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxFQUNyRCxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNwRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksUUFBUSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksRUFBRSxFQUFFO1FBQ3pFLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzQixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUQsSUFBSSxHQUFHLEdBQ0wsU0FBUztnQkFDVCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQzlCLFFBQVEsR0FBRyxDQUFDLEVBQ1osUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFB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