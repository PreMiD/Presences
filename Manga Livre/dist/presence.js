var presence = new Presence({
    clientId: "641409342566039558"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "ml"
    };
    if (document.location.hostname == "mangalivre.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Browsing...";
        }
        else if (document.querySelector(".page-navigation > span > em:nth-child(1)") !==
            null) {
            presenceData.details =
                "Reading '" + document.querySelector(".title").textContent + "'";
            presenceData.state =
                "Chapter " +
                    document
                        .querySelector(".current-chapter")
                        .textContent.replace("Chap ", "") +
                    " - Page " +
                    document.querySelector(".page-navigation > span > em:nth-child(1)")
                        .textContent;
            presenceData.startTimestamp = browsingStamp;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/manga/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing the manga:";
            presenceData.state = document.querySelector(".series-title > h1").textContent;
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/lista-de-mangas")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing manga list";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/lista-de-categorias")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing category list";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/grupos")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing group list";
            presenceData.smallImageKey = "reading";
        }
        else if (document.location.pathname.includes("/scanlator/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing group:";
            presenceData.state = document.querySelector(".series-title").textContent;
        }
        else if (document.location.pathname.includes("/mangas/")) {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing category:";
            presenceData.state = document
                .querySelector("#wraper > div > a > div > h2")
                .textContent.replace(document.querySelector("#wraper > div > a > div > h2 > div > span")
                .textContent, "")
                .trim();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsSUFBSTtLQUNwQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsRUFBRTtRQUNsRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtZQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztZQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztTQUN0QzthQUFNLElBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsQ0FBQztZQUNuRSxJQUFJLEVBQ0o7WUFDQSxZQUFZLENBQUMsT0FBTztnQkFDbEIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztZQUNuRSxZQUFZLENBQUMsS0FBSztnQkFDaEIsVUFBVTtvQkFDVixRQUFRO3lCQUNMLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQzt5QkFDakMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO29CQUNuQyxVQUFVO29CQUNWLFFBQVEsQ0FBQyxhQUFhLENBQUMsMkNBQTJDLENBQUM7eUJBQ2hFLFdBQVcsQ0FBQztZQUNqQixZQUFZLENBQUMsY0FBYyxH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