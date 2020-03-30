const presence = new Presence({
    clientId: "643848955586805770"
}), pages = {
    "/": "Ana Sayfa",
    "/espor": "Espor Haberleri",
    "/video-konusu": "Video Konuları",
    "/roportaj": "Röportajlar",
    "/testler": "Testler",
    "/lol": "LoL Haberleri",
    "/csgo": "CS:GO Haberleri",
    "/fortnite": "Fortnite Haberleri",
    "/pubg": "PUBG Haberleri",
    "/fifa": "FIFA Haberleri",
    "/zula": "Zula Haberleri",
    "/register": "Kayıt Ol",
    "/login": "Giriş Yap",
    "/hakkinda": "Hakkımızda",
    "/kunye": "Künye",
    "/iletisim": "İletişim",
    "/wp-admin/profile.php": "Profil"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, postTitle = document.querySelector("#mvp-article-head > h1"), date = document.querySelector("#mvp-article-head > div > ul > li > span > p > time"), author = document.querySelector("#mvp-author-box-head > span > a"), _author = document.querySelector("#mvp-author-top-right > h1");
    if (postTitle &&
        author &&
        date &&
        postTitle.textContent != "" &&
        author.textContent != "" &&
        date.textContent != "") {
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: postTitle.textContent || "Belirsiz",
            state: `Yazar: ${author.textContent} (${date.textContent})`,
            smallImageKey: "reading",
            smallImageText: "Bir gönderi okuyor...",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/author/") &&
        _author &&
        _author.textContent != "") {
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: "Bir yazara göz atıyor:",
            state: _author.textContent,
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/etiket/")) {
        const tag = document.querySelector("#mvp-main-body > div > div > div > div.mvp-main-body-in2 > div > h1 > span"), fixedTag = tag && tag.textContent != ""
            ? tag.textContent
                .split(" ")[tag.textContent.split(" ").length - 1].replace(/"/g, "")
            : null;
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: "Bir etikete göz atıyor:",
            state: fixedTag || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (document.location.search.includes("?s=")) {
        const searchingFor = document.querySelector("#mvp-main-body > div > div > div > div.mvp-main-body-in2 > div > h1 > span"), fixedSearch = searchingFor && searchingFor.textContent != ""
            ? searchingFor.textContent
                .split(" ")[searchingFor.textContent.split(" ").length - 1].replace(/"/g, "")
            : null;
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: "Bir şey arıyor:",
            state: fixedSearch || "Belirsiz",
            smallImageKey: "search",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "pb-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxHQUFHLEVBQUUsV0FBVztJQUNoQixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLGVBQWUsRUFBRSxnQkFBZ0I7SUFDakMsV0FBVyxFQUFFLGFBQWE7SUFDMUIsVUFBVSxFQUFFLFNBQVM7SUFDckIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFdBQVcsRUFBRSxZQUFZO0lBQ3pCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLHVCQUF1QixFQUFFLFFBQVE7Q0FDakMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM1RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIscURBQXFELENBQ3JELEVBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsRUFDbEUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUVoRSxJQUNDLFNBQVM7UUFDVCxNQUFNO1FBQ04sSUFBSTtR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