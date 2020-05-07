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
    if (page.includes("/c/") && category && category.textContent != "") {
        presence.setActivity({
            largeImageKey: "letgo-logob",
            details: "Bir kategoriyi inceliyor:",
            state: category.textContent.trim() || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("?searchTerm") ||
        (searchingFor && searchingFor.textContent != "")) {
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
        const stuff = document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzplWN.kgWKKg > h1") ||
            document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzplWN.kgWKKg > h1"), price = document.querySelector("#app > main > div.Productstyles__ProductPageContent-sc-1qzhqka-52.jsQDxm > div.Productstyles__TopWrapper-sc-1qzhqka-36.eHTCol > div.sc-pbIaG.gtBEDe.Productstyles__TopContainer-sc-1qzhqka-1.ivkLwB > div.sc-fzoyAV.givzfL > div:nth-child(2) > div > div.sc-fzoyAV.givzfL > div.sc-fzqNJr.ProductDetailsstyle__PriceCol-sc-1id69g1-0.dgwOkY > div > span");
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
        const user = document.querySelector("#app > main > div.sc-fzoyAV.Profilestyles__Wrapper-sc-17oc9jl-1.iGTcta > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.hEPffI.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.bICSaT.ProfileInfostyles__UserInfoWrapper-is6738-4.kWwlKm > div:nth-child(1) > div.sc-fzplWN.gKVHhl > h2") ||
            document.querySelector("#app > main > div.sc-pbIaG.gtBEDe > div > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.kUkghz.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.cpfWDL > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.eTDXj.ProfileInfostyles__UserDataWrapper-is6738-2.jeNnEm > div.sc-fzplWN.dMbFMh > h1") ||
            document.querySelector("#app > main > div.sc-qPlga.fsImDA > div > div > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.kUkghz.ProfileInfostyles__ContainerBox-is6738-1.cYAoIp > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.cpfWDL > div.sc-fzqARJ.kWvyBH.sc-fzoYkl.eTDXj.ProfileInfostyles__UserDataWrapper-is6738-2.jeNnEm > div.sc-fzplWN.dMbFMh > h1");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixPQUFPLEVBQUUsVUFBVTtJQUNuQixjQUFjLEVBQUUsZ0JBQWdCO0lBQ2hDLFVBQVUsRUFBRSxrQkFBa0I7SUFDOUIsZUFBZSxFQUFFLGtCQUFrQjtJQUNuQyxPQUFPLEVBQUUsUUFBUTtJQUNqQixTQUFTLEVBQUUsb0JBQW9CO0lBQy9CLHVCQUF1QixFQUFFLHFCQUFxQjtJQUM5QyxVQUFVLEVBQUUscUJBQXFCO0NBQ2xDLENBQUM7QUFDSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFDckMsWUFBWSxHQUNWLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDZGQUE2RixDQUM5RjtRQUNELFFBQVEsQ0FBQyxhQUFhLENBQ3BCLG9OQUFvTixDQUNyTixFQUNILFFBQVEsR0FDTixRQUFRLENBQUMsYUFBYSxDQUNwQix5TEFBeUwsQ0FDMUw7UUFDRCxRQUFRLENBQUMsYUFBYSxDQUNwQixnSkFBZ0osQ0FDakosQ0FBQztJQUNOLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDbEUsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsYUFBYTtZQUM1QixPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDLEtBQUssRUFBRSxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLFVBQVU7WUFDaEQsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENB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