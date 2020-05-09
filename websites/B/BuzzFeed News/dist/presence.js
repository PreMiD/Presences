const presence = new Presence({
    clientId: "651445584955310100"
});
presence.on("UpdateData", async () => {
    const page = document.location.pathname, article = document.querySelector("#js-post-container > div > div.grid-layout-main.xs-mb2.lg-mb0 > header > h1"), sections = document.querySelector("#news-content > div.content-column.xs-mt2.lg-mt0.md-mb4 > h1 > span");
    const presenceData = {
        largeImageKey: "bfnews-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if (page.includes("/section")) {
        presenceData.details = "Viewing To Section:";
        presenceData.state = sections.textContent;
    }
    else if (page.includes("/article")) {
        presenceData.details = "Reads a Article:";
        presenceData.state = article.textContent;
    }
    else {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Homepage";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDOUIsNkVBQTZFLENBQzlFLEVBQ0QsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQy9CLHFFQUFxRSxDQUN0RSxDQUFDO0lBRUosTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxhQUFhO1FBQzVCLGNBQWMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7S0FDOUMsQ0FBQztJQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3QixZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBQzdDLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUMzQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQztLQUMxQztTQUFNO1FBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7UUFDdkMsWUFBWSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDakM7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9