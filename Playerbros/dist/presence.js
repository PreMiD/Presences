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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixHQUFHLEVBQUUsV0FBVztJQUNoQixRQUFRLEVBQUUsaUJBQWlCO0lBQzNCLGVBQWUsRUFBRSxnQkFBZ0I7SUFDakMsV0FBVyxFQUFFLGFBQWE7SUFDMUIsVUFBVSxFQUFFLFNBQVM7SUFDckIsTUFBTSxFQUFFLGVBQWU7SUFDdkIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsb0JBQW9CO0lBQ2pDLE9BQU8sRUFBRSxnQkFBZ0I7SUFDekIsT0FBTyxFQUFFLGdCQUFnQjtJQUN6QixPQUFPLEVBQUUsZ0JBQWdCO0lBQ3pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLFdBQVcsRUFBRSxZQUFZO0lBQ3pCLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFdBQVcsRUFBRSxVQUFVO0lBQ3ZCLHVCQUF1QixFQUFFLFFBQVE7Q0FDbEMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM1RCxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IscURBQXFELENBQ3RELEVBQ0QsTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUNBQWlDLENBQUMsRUFDbEUsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUVqRSxJQUNFLFNBQVM7UUFDVCxNQUFNO1FBQ04sSUFBSTtRQUNKLFNBQVMsQ0FBQyxXQUFXLElBQUksRUFBRTtRQUMzQixNQUFNLENBQUMsV0FBVyxJQUFJLEVBQUU7UUFDeEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQ3RCO1FBQ0EsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsU0FBUyxDQUFDLFdBQVcsSUFBSSxVQUFVO1lBQzVDLEtBQUssRUFBRSxVQUFVLE1BQU0sQ0FBQyxXQUFXLEtBQUssSUFBSSxDQUFDLFdBQVcsR0FBRztZQUMzRCxhQUFhLEVBQUUsU0FBUztZQUN4QixjQUFjLEVBQUUsdUJBQXVCO1lBQ3ZDLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTSxJQUNMLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3pCLE9BQU87UUFDUCxPQUFPLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFDekI7UUFDQSxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXO1lBQzFCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDcEMsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUIsNEVBQTRFLENBQzdFLEVBQ0QsUUFBUSxHQUNOLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxJQUFJLEVBQUU7WUFDMUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxXQUFXO2lCQUNaLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDVixHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7WUFDN0QsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUViLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDbkIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsT0FBTyxFQUFFLHlCQUF5QjtZQUNsQyxLQUFLLEVBQUUsUUFBUSxJQUFJLFVBQVU7WUFDN0IsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM5QyxDQUFDLENBQUM7S0FDSjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25ELE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3ZDLDRFQUE0RSxDQUM3RSxFQUNELFdBQVcsR0FDVCxZQUFZLElBQUksWUFBWSxDQUFDLFdBQVcsSUFBSSxFQUFFO1lBQzVDLENBQUMsQ0FBQyxZQUFZLENBQUMsV0FBVztpQkFDckIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNWLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQztZQUN0RSxDQUFDLENBQUMsSUFBSSxDQUFDO1FBRWIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsaUJBQWlCO1lBQzFCLEtBQUssRUFBRSxXQUFXLElBQUksVUFBVTtZQUNoQyxhQUFhLEVBQUUsUUFBUTtZQUN2QixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQzlDLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNsRCxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5QyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQzlDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ25CLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsS0FBSyxFQUFFLFdBQVc7WUFDbEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM5QyxDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=