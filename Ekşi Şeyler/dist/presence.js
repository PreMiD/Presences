const presence = new Presence({
    clientId: "643771565951025153"
});
presence.on("UpdateData", () => async () => {
    const page = document.location.pathname, postTitle = document.querySelector("#content-body-area > div > div > div.content-heading > h1");
    if (page.includes("/kategori/")) {
        const category = document.title[0].toUpperCase() +
            document.title
                .replace(" - Ekşi Şeyler", "")
                .slice(1, document.title.length)
                .toLowerCase();
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir kategoriye göz atıyor:",
            state: category && category != "" ? category : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/kanal/")) {
        const channel = document.title[0].toUpperCase() +
            document.title
                .replace(" - Ekşi Şeyler", "")
                .slice(1, document.title.length)
                .toLowerCase();
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir kanala göz atıyor:",
            state: channel && channel != "" ? channel : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (page.includes("/derleme/arama/")) {
        const searchingFor = document.querySelector("#main-content > div > div > div.search-result-info > span");
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir şey arıyor:",
            state: searchingFor && searchingFor.textContent != ""
                ? searchingFor.textContent
                : "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else if (postTitle && postTitle.textContent != "") {
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir gönderiyi okuyor:",
            state: postTitle.textContent || "Belirsiz",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
    else {
        presence.setActivity({
            largeImageKey: "es-logo",
            details: "Bir sayfaya göz atıyor:",
            state: "Ana Sayfa",
            startTimestamp: Math.floor(Date.now() / 1000)
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBQzFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsMkRBQTJELENBQzNELENBQUM7SUFFSCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDaEMsTUFBTSxRQUFRLEdBQ2IsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUs7aUJBQ1osT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztpQkFDN0IsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsV0FBVyxFQUFFLENBQUM7UUFFakIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLEtBQUssRUFBRSxRQUFRLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3pELGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0g7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDcEMsTUFBTSxPQUFPLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUs7aUJBQ1osT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztpQkFDN0IsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsV0FBVyxFQUFFLENBQUM7UUFFakIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNwQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSxPQUFPLElBQUksT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3RELGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0g7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUM1QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMxQywyREFBMkQsQ0FDM0QsQ0FBQztRQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDcEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixLQUFLLEVBQ0osWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLElBQUksRUFBRTtnQkFDN0MsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXO2dCQUMxQixDQUFDLENBQUMsVUFBVTtZQUNkLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDN0MsQ0FBQyxDQUFDO0tBQ0g7U0FBTSxJQUFJLFNBQVMsSUFBSSxTQUFTLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFBRTtRQUNwRCxRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSx1QkFBdUI7WUFDaEMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxXQUFXLElBQUksVUFBVTtZQUMxQyxjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQzdDLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTixRQUFRLENBQUMsV0FBVyxDQUFDO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLE9BQU8sRUFBRSx5QkFBeUI7WUFDbEMsS0FBSyxFQUFFLFdBQVc7WUFDbEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM3QyxDQUFDLENBQUM7S0FDSDtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=