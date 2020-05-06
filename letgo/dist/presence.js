const presence = new Presence({
    clientId: "707123244397887548"
}), pages = {
    "/chat": "Mesjalar",
    "/about-letgo": "Letgo Hakkında",
    "/careers": "Insan Kaynakları",
    "/download-app": "Uygulamayı Indir",
    "/help": "Yardım",
    "/safety": "Güvenlik Önerileri",
    "/terms-and-conditions": "Şartlar ve Gizlilik",
    "/privacy": "Gizlilik Politikası"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, searchingFor = document.querySelector("#app > main > div.sc-fzqARJ.ezHzMZ > div > div.sc-fzqARJ.eYJPYt > div.sc-fzqARJ.jzDIJt > h1") ||
        document.querySelector("#app > main > div:nth-child(2) > header > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.fucrvt > div.sc-fzqARJ.fSfVHK.sc-fzoYkl.fucrvt > div > div.sc-fzqNJr.dxscoE > form > div > div > div.sc-fzqKxP.ifYmcU > div > input"), category = document.querySelector("#app > main > div.sc-fzqARJ.ezHzMZ > div > div.sc-fzqARJ.eYJPYt > div.sc-fzqARJ.crtzxj.sc-fzoYkl.jCSvNr > div > div.sc-fzoLag.euRBHm > div > div:nth-child(1) > div > div > span > span") ||
        document.querySelector("#app > main > div:nth-child(2) > header > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.fucrvt > div.sc-fzqNJr.dxscoE > div > button > div > div > span");
    if (page.includes("/c/") && (category && category.textContent != "")) {
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir kategoriyi inceliyor:",
            state: category.textContent.trim() || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("?searchTerm") || (searchingFor && searchingFor.textContent != "")) {
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir şey arıyor:",
            state: searchingFor && searchingFor.textContent
                ? searchingFor.textContent
                : "Belirsiz",
            smallImageKey: "letgo-ara",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/i/")) {
        const stuff = document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzplWN.kgWKKg > h1") || document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzplWN.kgWKKg > h1"), price = document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzoyAV.givzfL > div.sc-fzqNJr.ProductDetailsstyle__PriceCol-sc-1id69g1-0.dgwOkY > div > span");
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir ilanı inceliyor:",
            state: stuff && stuff.textContent != ""
                ? `${stuff.textContent.trim()} ${price && price.textContent != ""
                    ? "(" + price.textContent.trim().split(" ")[0] + " TL)"
                    : ""}`
                : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/u/")) {
        const user = document.querySelector("#app > main > div.sc-fzoyAV.Profilestyles__Wrapper-sc-17oc9jl-1.iGTcta > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.hEPffI.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.bICSaT.ProfileInfostyles__UserInfoWrapper-is6738-4.kWwlKm > div:nth-child(1) > div.sc-fzplWN.gKVHhl > h2") || document.querySelector("#app > main > div.sc-pbIaG.gtBEDe > div > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.kUkghz.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.cpfWDL > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.eTDXj.ProfileInfostyles__UserDataWrapper-is6738-2.jeNnEm > div.sc-fzplWN.dMbFMh > h1") || document.querySelector("#app > main > div.sc-qPlga.fsImDA > div > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.kUkghz.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.cpfWDL > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.eTDXj.ProfileInfostyles__UserDataWrapper-is6738-2.jeNnEm > div.sc-fzplWN.dMbFMh > h1");
        if (user && user.textContent != "")
            var username = user.textContent.trim();
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir kullanıcı profili inceliyor:",
            state: username || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (pages[page] || pages[page.slice(0, -1)]) {
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir sayfaya göz atıyor:",
            state: pages[page] || pages[page.slice(0, -1)],
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQ2pDLENBQUMsRUFBRSxLQUFLLEdBQUc7SUFDWCxPQUFPLEVBQUUsVUFBVTtJQUNuQixjQUFjLEVBQUUsZ0JBQWdCO0lBQ2hDLFVBQVUsRUFBRSxrQkFBa0I7SUFDOUIsZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLHVCQUF1QixFQUFFLHFCQUFxQjtJQUM5QyxVQUFVLEVBQUUscUJBQXFCO0NBQ2pDLENBQUM7QUFDRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDdEMsWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsNkZBQTZGLENBQUM7UUFDaEksUUFBUSxDQUFDLGFBQWEsQ0FBQyxvTkFBb04sQ0FBQyxFQUFFLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlMQUF5TCxDQUFDO1FBQzFjLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0pBQWdKLENBQUMsQ0FBQztJQUM5SyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsRUFBRTtRQUNyRSxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGFBQWEsRUFBRSxhQUFhO1lBQzVCLE9BQU8sRUFBRSwyQkFBMkI7WUFDcEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksVUFBVTtZQUNoRCxjQUFjLEVBQUUsSUFBSSxDQUFDLEtB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