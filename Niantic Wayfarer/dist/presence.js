var presence = new Presence({
    clientId: "684174415415476240"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "nwbig"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/review")) {
        const title = document.querySelector("#descriptionDiv > div.card__body > div > a > h1");
        const description = document.querySelector("#descriptionDiv > div.card__body > div > h4");
        const location = document.querySelector(".flex-map-row > span:nth-child(2)");
        if (title !== null && description !== null && location !== null) {
            presenceData.largeImageKey = "wayfarer";
            presenceData.smallImageKey = "nw";
            presenceData.details = "Reviewing: " + title.textContent;
            presenceData.state = "Description: " + description.textContent;
            presenceData.smallImageText =
                "Address: " + location.textContent.split(":")[1].trim();
        }
        else {
            presenceData.details = "Getting ready to";
            presenceData.state = "review a location...";
        }
    }
    else if (document.location.pathname.includes("/settings")) {
        presenceData.details = "Changing some settings...";
    }
    else if (document.location.pathname.includes("/help")) {
        const article = document.querySelector("#help-section-breadcrumbs > span.ng-binding").textContent;
        presenceData.smallImageKey = "reading";
        if (article !== "") {
            presenceData.details = "Reading article:";
            presenceData.state = article;
        }
        else {
            presenceData.details = "Browsing the Help Center...";
        }
    }
    else if (document.location.pathname.includes("/login")) {
        presenceData.details = "Logging in...";
    }
    else if (document.location.pathname.includes("/profile")) {
        presenceData.details = "Viewing their own profile...";
    }
    else if (document.location.pathname.includes("/nominations")) {
        presenceData.details = "Viewing their nominations...";
    }
    else if (document.location.pathname == "/") {
        presenceData.details = "Viewing the showcased wayspots...";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsT0FBTztLQUN2QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbEQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDbEMsaURBQWlELENBQ2xELENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN4Qyw2Q0FBNkMsQ0FDOUMsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3JDLG1DQUFtQyxDQUNwQyxDQUFDO1FBQ0YsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLFdBQVcsS0FBSyxJQUFJLElBQUksUUFBUSxLQUFLLElBQUksRUFBRTtZQUMvRCxZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztZQUN4QyxZQUFZLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUNsQyxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDO1lBQ3pELFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUM7WUFDL0QsWUFBWSxDQUFDLGNBQWM7Z0JBQ3pCLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMzRDthQUFNO1lBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLHNCQUFzQixDQUFDO1NBQzdDO0tBQ0Y7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0tBQ3BEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDdkQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDcEMsNkNBQTZDLENBQzlDLENBQUMsV0FBVyxDQUFDO1FBQ2QsWUFBWSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7UUFDdkMsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO1lBQ2xCLFlBQVksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7WUFDMUMsWUFBWSxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7U0FDOUI7YUFBTTtZQUNMLFlBQVksQ0FBQyxPQUFPLEdBQUcsNkJBQTZCLENBQUM7U0FDdEQ7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztLQUN2RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsOEJBQThCLENBQUM7S0FDdkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsRUFBRTtRQUM1QyxZQUFZLENBQUMsT0FBTyxHQUFHLG1DQUFtQyxDQUFDO0tBQzVEO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==