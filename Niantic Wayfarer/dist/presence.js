var presence = new Presence({
    clientId: "684174415415476240"
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "nwbig"
    };
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/review")) {
        let title = document.querySelector("#descriptionDiv > div.card__body > div > a > h1");
        let description = document.querySelector("#descriptionDiv > div.card__body > div > h4");
        let location = document.querySelector(".flex-map-row > span:nth-child(2)");
        if (title !== null && description !== null && location !== null) {
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
        let article = document.querySelector("#help-section-breadcrumbs > span.ng-binding").textContent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWxELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsT0FBTztLQUN0QixDQUFDO0lBRUYsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7SUFFNUMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDbkQsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDakMsaURBQWlELENBQ2pELENBQUM7UUFDRixJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN2Qyw2Q0FBNkMsQ0FDN0MsQ0FBQztRQUNGLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUMzRSxJQUFJLEtBQUssS0FBSyxJQUFJLElBQUksV0FBVyxLQUFLLElBQUksSUFBSSxRQUFRLEtBQUssSUFBSSxFQUFFO1lBQ2hFLFlBQVksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ2xDLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7WUFDekQsWUFBWSxDQUFDLEtBQUssR0FBRyxlQUFlLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQztZQUMvRCxZQUFZLENBQUMsY0FBYztnQkFDMUIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3pEO2FBQU07WUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1lBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsc0JBQXNCLENBQUM7U0FDNUM7S0FDRDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQzVELFlBQVksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7S0FDbkQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4RCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUNuQyw2Q0FBNkMsQ0FDN0MsQ0FBQyxXQUFXLENBQUM7UUFDZCxZQUFZLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUN2QyxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7WUFDbkIsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQztTQUM3QjthQUFNO1lBQ04sWUFBWSxDQUFDLE9BQU8sR0FBRyw2QkFBNkIsQ0FBQztTQUNyRDtLQUNEO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDekQsWUFBWSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7S0FDdkM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLDhCQUE4QixDQUFDO0tBQ3REO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDL0QsWUFBWSxDQUFDLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztLQUN0RDtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUM7S0FDM0Q7SUFFRCxJQUFJLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ2pDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QixRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdkI7U0FBTTtRQUNOLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQyJ9