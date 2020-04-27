const presence = new Presence({
    clientId: "612415911877672971"
}), startedBrowsing = Math.floor(Date.now() / 1000), presenceData = {
    largeImageKey: "webtoon_lg",
    startTimestamp: startedBrowsing
}, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
}), path = window.location.pathname;
let webtoon, chapter, seriesPage;
presence.on("UpdateData", async () => {
    if (path.includes("list")) {
        webtoon = document.querySelector(".subj").textContent;
        presenceData.details = "Looking a webtoon";
        presenceData.state = webtoon;
        delete presenceData.smallImageKey;
    }
    else if (path.includes("viewer")) {
        webtoon = document.querySelector("div.subj_info > a.subj").textContent;
        chapter =
            document.querySelector("div.subj_info > .subj_episode").textContent +
                " - " +
                document.querySelector(".tx").textContent;
        presenceData.details = "Reading " + webtoon;
        presenceData.state = chapter;
        delete presenceData.smallImageKey;
    }
    else if (path.includes("dailySchedule")) {
        seriesPage = document
            .querySelector("ul > li.completed")
            .getAttribute("class")
            .includes("on")
            ? "completed"
            : "ongoing";
        presenceData.details = "Looking through the " + seriesPage + " series";
        delete presenceData.smallImageKey;
    }
    else if (path.includes("top")) {
        presenceData.details = "Looking through popular series";
    }
    else if (path.includes("genre")) {
        presenceData.details = "Looking through genres";
        delete presenceData.smallImageKey;
    }
    else if (path.includes("search")) {
        presenceData.details = "Searching...";
        presenceData.smallImageKey = "search";
    }
    else if (path.includes("about")) {
        presenceData.details = "Reading the about page";
        delete presenceData.smallImageKey;
    }
    else {
        presenceData.details = (await strings).browsing;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixlQUFlLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3ZELFlBQVksR0FBaUI7SUFDM0IsYUFBYSxFQUFFLFlBQVk7SUFDM0IsY0FBYyxFQUFFLGVBQWU7Q0FDaEMsRUFDRCxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsRUFDRixJQUFJLEdBQVcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDMUMsSUFBSSxPQUFlLEVBQUUsT0FBZSxFQUFFLFVBQWtCLENBQUM7QUFFekQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3pCLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLG1CQUFtQixDQUFDO1FBQzNDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQzdCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUN2RSxPQUFPO1lBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLFdBQVc7Z0JBQ25FLEtBQUs7Z0JBQ0wsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLEdBQUcsT0FBTyxDQUFDO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO1FBQzdCLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtRQUN6QyxVQUFVLEdBQUcsUUFBUTthQUNsQixhQUFhLENBQUMsbUJBQW1CLENBQUM7YUFDbEMsWUFBWSxDQUFDLE9BQU8sQ0FBQzthQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLFdBQVc7WUFDYixDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQ3ZFLE9BQU8sWUFBWSxDQUFDLGFBQWEsQ0FBQztLQUNuQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMvQixZQUFZLENBQUMsT0FBTyxHQUFHLGdDQUFnQyxDQUFDO0tBQ3pEO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFDaEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEQsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO0lBQ0QsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFDLENBQUMifQ==