const presence = new Presence({
    clientId: "702978839722197012"
}), strings = presence.getStrings({
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "instantgaming"
    };
    try {
        const product_title = document.querySelector("div.product > div.infos > div.shadow.mainshadow > div.title > h1").textContent;
        const product_price = document.querySelector("div.price").textContent;
        var product_platform = document.querySelector("div.subinfos > a.platform")
            .textContent;
        if (product_platform.startsWith("Other")) {
            product_platform = "N/A";
        }
        presenceData.details = "Viewing a product:";
        presenceData.state = `[${product_platform}] ${product_title} (${product_price})`;
    }
    catch {
        if (window.location.pathname.includes("/user/")) {
            const profile_name = document.querySelector("div.ig-profile-info-nick > span").textContent;
            presenceData.details = "Viewing a profile:";
            presenceData.state = profile_name;
        }
        else {
            presenceData.details = (await strings).browsing;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixRQUFRLEVBQUUsNEJBQTRCO0NBQ3ZDLENBQUMsQ0FBQztBQUVMLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsZUFBZTtLQUMvQixDQUFDO0lBQ0YsSUFBSTtRQUNGLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQzFDLGtFQUFrRSxDQUNuRSxDQUFDLFdBQVcsQ0FBQztRQUNkLE1BQU0sYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDO1FBQ3RFLElBQUksZ0JBQWdCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQzthQUN2RSxXQUFXLENBQUM7UUFDZixJQUFJLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUN4QyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLFlBQVksQ0FBQyxLQUFLLEdBQUcsSUFBSSxnQkFBZ0IsS0FBSyxhQUFhLEtBQUssYUFBYSxHQUFHLENBQUM7S0FDbEY7SUFBQyxNQUFNO1FBQ04sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDL0MsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDekMsaUNBQWlDLENBQ2xDLENBQUMsV0FBVyxDQUFDO1lBQ2QsWUFBWSxDQUFDLE9BQU8sR0FBRyxvQkFBb0IsQ0FBQztZQUM1QyxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztTQUNuQzthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO1NBQ2pEO0tBQ0Y7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2hDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDeEI7U0FBTTtRQUNMLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9