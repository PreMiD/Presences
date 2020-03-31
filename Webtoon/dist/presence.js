let presence = new Presence({
    clientId: "612415911877672971"
}), startedBrowsing = Math.floor(Date.now() / 1000), presenceData = {
    largeImageKey: "webtoon_lg",
    startTimestamp: startedBrowsing
}, strings = presence.getStrings({
    browsing: "presence.activity.browsing"
}), webtoon, chapter, seriesPage, path = window.location.pathname;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixlQUFlLEdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQ3ZELFlBQVksR0FBaUI7SUFDM0IsYUFBYSxFQUFFLFlBQVk7SUFDM0IsY0FBYyxFQUFFLGVBQWU7Q0FDaEMsRUFDRCxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsRUFDRixPQUFlLEVBQ2YsT0FBZSxFQUNmLFVBQWtCLEVBQ2xCLElBQUksR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUUxQyxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekIsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3RELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7UUFDM0MsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDN0IsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHdCQUF3QixDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3ZFLE9BQU87WUFDTCxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUMsV0FBVztnQkFDbkUsS0FBSztnQkFDTCxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsR0FBRyxPQUFPLENBQUM7UUFDNUMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7UUFDN0IsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFO1FBQ3pDLFVBQVUsR0FBRyxRQUFRO2FBQ2xCLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQzthQUNsQyxZQUFZLENBQUMsT0FBTyxDQUFDO2FBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUM7WUFDZixDQUFDLENBQUMsV0FBVztZQUNiLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDZCxZQUFZLENBQUMsT0FBTyxHQUFHLHNCQUFzQixHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFDdkUsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQy9CLFlBQVksQ0FBQyxPQUFPLEdBQUcsZ0NBQWdDLENBQUM7S0FDekQ7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7S0FDbkM7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUM7UUFDdEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7S0FDdkM7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDakMsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7S0FDbkM7U0FBTTtRQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNoRCxPQUFPLFlBQVksQ0FBQyxhQUFhLENBQUM7S0FDbkM7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUMsQ0FBQyJ9