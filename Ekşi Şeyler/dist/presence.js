const presence = new Presence({
    clientId: "643771565951025153"
});
presence.on("UpdateData", async () => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDaEMsMkRBQTJELENBQzVELENBQUM7SUFFSixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDL0IsTUFBTSxRQUFRLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUs7aUJBQ1gsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztpQkFDN0IsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsV0FBVyxFQUFFLENBQUM7UUFFbkIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsNEJBQTRCO1lBQ3JDLEtBQUssRUFBRSxRQUFRLElBQUksUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3pELGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkMsTUFBTSxPQUFPLEdBQ1gsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUU7WUFDL0IsUUFBUSxDQUFDLEtBQUs7aUJBQ1gsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQztpQkFDN0IsS0FBSyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztpQkFDL0IsV0FBVyxFQUFFLENBQUM7UUFFbkIsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsd0JBQXdCO1lBQ2pDLEtBQUssRUFBRSxPQUFPLElBQUksT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxVQUFVO1lBQ3RELGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLENBQUMsRUFBRTtRQUMzQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QywyREFBMkQsQ0FDNUQsQ0FBQztRQUVGLFFBQVEsQ0FBQyxXQUFXLENBQUM7WUFDbkIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixLQUFLLEVBQ0gsWUFBWSxJQUFJLFlBQVksQ0FBQyxXQUFXLElBQUksRUFBRTtnQkFDNUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxXQUFXO2dCQUMxQixDQUFDLENBQUMsVUFBVTtZQUNoQixjQUFjLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1NBQzlDLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDbkQsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUsdUJBQXVCO1lBQ2hDLEtBQUssRUFBRSxTQUFTLENBQUMsV0FBVyxJQUFJLFVBQVU7WUFDMUMsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztTQUM5QyxDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsUUFBUSxDQUFDLFdBQVcsQ0FBQztZQUNuQixhQUFhLEVBQUUsU0FBUztZQUN4QixPQUFPLEVBQUUseUJBQXlCO1lBQ2xDLEtBQUssRUFBRSxXQUFXO1lBQ2xCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7U0FDOUMsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9