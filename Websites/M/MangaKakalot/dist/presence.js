const presence = new Presence({
    clientId: "698217762660548799"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "mangakakalot"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.host == "mangakakalot.com") {
        if (document.location.pathname.includes("/chapter")) {
            presenceData.details = document
                .querySelector("body > div.info-top-chapter > h2")
                .textContent.split("Chapter")[0];
            presenceData.state =
                "Chapter" +
                    document
                        .querySelector("body > div.info-top-chapter > h2")
                        .textContent.split("Chapter")[1];
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/manga_list")) {
            presenceData.details = "Viewing genre:";
            presenceData.state = document
                .querySelector("body > div.container > div.main-wrapper > div.leftCol.listCol > div > div.breadcrumb.breadcrumbs > p > span:nth-child(3) > a")
                .textContent.split(":")[1];
        }
        else if (document.location.pathname.includes("/manga")) {
            presenceData.details = "Viewing manga:";
            presenceData.state = document.querySelector("body > div.container > div.main-wrapper > div.leftCol > div.manga-info-top > ul > li:nth-child(1) > h1").textContent;
        }
        else if (document.location.pathname.includes("/latest")) {
            presenceData.details = "Viewing the latest mangas";
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching for:";
            presenceData.state = document.querySelector("body > div.container > div.main-wrapper > div.leftCol > div.daily-update > h3").textContent;
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Browsing...";
        }
    }
    else {
        if (document.location.pathname.includes("/chapter")) {
            presenceData.details = document
                .querySelector("body > div.body-site > div:nth-child(1) > div.panel-chapter-info-top > h1")
                .textContent.split("CHAPTER")[0];
            presenceData.state =
                "CHAPTER" +
                    document
                        .querySelector("body > div.body-site > div:nth-child(1) > div.panel-chapter-info-top > h1")
                        .textContent.split("CHAPTER")[1];
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/manga")) {
            presenceData.details = "Viewing manga:";
            presenceData.state = document.querySelector("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-story-info > div.story-info-right > h1").textContent;
        }
        else if (document.location.pathname.includes("/genre")) {
            presenceData.details = "Viewing genre:";
            presenceData.state = document
                .querySelector("body > div.body-site > div.container.container-main > div.panel-breadcrumb > a:nth-child(3)")
                .textContent.split(":")[1];
        }
        else if (document.location.pathname.includes("/search")) {
            presenceData.details = "Searching for:";
            presenceData.state =
                "Keyword: " +
                    document
                        .querySelector("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-breadcrumb")
                        .textContent.split("Keyword :")[1]
                        .split(document.querySelector("body > div.body-site > div.container.container-main > div.container-main-left > div.panel-breadcrumb > span:nth-child(3)").textContent)[0]
                        .trim();
            presenceData.smallImageKey = "search";
        }
        else if (document.location.pathname == "/") {
            presenceData.details = "Browsing...";
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsY0FBYztLQUM5QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxrQkFBa0IsRUFBRTtRQUNoRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuRCxZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVE7aUJBQzVCLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQztpQkFDakQsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxZQUFZLENBQUMsS0FBSztnQkFDaEIsU0FBUztvQkFDVCxRQUFRO3lCQUNMLGFBQWEsQ0FBQyxrQ0FBa0MsQ0FBQzt5QkFDakQsV0FBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztTQUN4QzthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQzdELFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0JBQWdC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