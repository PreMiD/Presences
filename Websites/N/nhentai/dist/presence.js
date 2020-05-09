var presence = new Presence({
    clientId: "612653415419609088"
});
var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);
var title, title2, currentPage, pageNumber, tabTitle, homeCurrentPage;
var pattern = "- Page";
var character, parody;
var searchURL = new URL(document.location.href);
var searchResult = searchURL.searchParams.get("q");
var truncateAfter = function (str, pattern) {
    return str.slice(0, str.indexOf(pattern));
};
if (lastPlaybackState != reading) {
    lastPlaybackState = reading;
    browsingStamp = Math.floor(Date.now() / 1000);
}
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "lg"
    };
    tabTitle = document.title;
    title = document.querySelector("#info > h1");
    if (document.location.pathname == "/" || !document.location.pathname) {
        homeCurrentPage = document.querySelector("#content > section.pagination > a.page.current");
        presenceData.details = "Home";
        presenceData.state = "Page: " + homeCurrentPage.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/g/")) {
        if (tabTitle.includes("Page")) {
            currentPage = document.querySelector("#pagination-page-top > button > span.current");
            pageNumber = document.querySelector("#pagination-page-top > button > span.num-pages");
            title2 = truncateAfter(tabTitle, pattern);
            presenceData.details = "Reading: " + title2;
            presenceData.state =
                "Current page: " + currentPage.innerText + "/" + pageNumber.innerText;
            presenceData.startTimestamp = browsingStamp;
        }
        else if (title.innerText.length > 0) {
            if (title.innerText.length > 128) {
                presenceData.state = "Title longer than 128 characters.";
            }
            else {
                presenceData.state = title.innerText;
            }
            presenceData.details = "Viewing a page: ";
            presenceData.startTimestamp = browsingStamp;
        }
    }
    else if (document.location.pathname.includes("/tags/")) {
        presenceData.details = "Browsing tags...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/artists/")) {
        presenceData.details = "Browsing artists...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/characters/")) {
        presenceData.details = "Browsing characters...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/parodies/")) {
        presenceData.details = "Browsing parodies...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/groups/")) {
        presenceData.details = "Browsing groups...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/info/")) {
        presenceData.details = "Reading informations...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
    }
    else if (document.location.pathname.includes("/search/")) {
        presenceData.details = "Searching for: ";
        presenceData.state = searchResult;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/character/")) {
        character = document.querySelector("#content > h1 > span:nth-child(2)");
        presenceData.details = "Searching by character: ";
        presenceData.state = character.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname.includes("/parody/")) {
        parody = document.querySelector("#content > h1 > span:nth-child(2)");
        presenceData.details = "Searching by parody: ";
        presenceData.state = parody.innerText;
        presenceData.startTimestamp = browsingStamp;
    }
    else {
        presenceData.details = "Browsing...";
        presenceData.startTimestamp = browsingStamp;
        delete presenceData.state;
        delete presenceData.smallImageKey;
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksaUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQzdCLElBQUksT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFbEQsSUFBSSxLQUFVLEVBQ1osTUFBVyxFQUNYLFdBQWdCLEVBQ2hCLFVBQWUsRUFDZixRQUFhLEVBQ2IsZUFBb0IsQ0FBQztBQUV2QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUM7QUFFdkIsSUFBSSxTQUFjLEVBQUUsTUFBVyxDQUFDO0FBRWhDLElBQUksU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEQsSUFBSSxZQUFZLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFbkQsSUFBSSxhQUFhLEdBQUcsVUFBVSxHQUFHLEVBQUUsT0FBTztJQUN4QyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1QyxDQUFDLENBQUM7QUFFRixJQUFJLGlCQUFpQixJQUFJLE9BQU8sRUFBRTtJQUNoQyxpQkFBaUIsR0FBRyxPQUFPLENBQUM7SUFDNUIsYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQy9DO0FBRUQsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxJQUFJO0tBQ3BCLENBQUM7SUFFRixRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUUxQixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUU3QyxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQ3BFLGVBQWUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN0QyxnREFBZ0QsQ0FDakQsQ0FBQztRQUVGLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBRTlCLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUM7UUFFMUQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNyRCxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDN0IsV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2xDLDhDQUE4QyxDQUMvQyxDQUFDO1lBRUYsVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ2pDLGdEQUFnRCxDQUNqRCxDQUFDO1lBRUYsTUFBTSxHQUFHLGFBQWEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFFMUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLEdBQUcsTUFBTSxDQUFDO1lBRTVDLFlBQVksQ0FBQyxLQUFLO2dCQUNoQixnQkFBZ0IsR0FBRyxXQUFXLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBRXhFLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1NBQzdDO2FBQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDckMsSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUU7Z0JBQ2hDLFlBQVksQ0FBQyxLQUFLLEdBQUcsbUNBQW1DLENBQUM7YUFDMUQ7aUJBQU07Z0JBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3RDO1lBRUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztZQUUxQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztTQUM3QztLQUNGO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUUxQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDM0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUMzRCxZQUFZLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDO1FBRTdDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUMzQjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsd0JBQXdCLENBQUM7UUFFaEQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO0tBQzNCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDNUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQztRQUU5QyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7S0FDM0I7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO1FBRTVDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBRTVDLE9BQU8sWUFBWSxDQUFDLEtBQUssQ0FBQztLQUMzQjtTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3hELFlBQVksQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUM7UUFFakQsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFNUMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDO0tBQzNCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDMUQsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUV6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztRQUVsQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztLQUM3QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO1FBQzdELFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFFeEUsWUFBWSxDQUFDLE9BQU8sR0FBRywwQkFBMEIsQ0FBQztRQUVsRCxZQUFZLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUM7UUFFekMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxRCxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBRXJFLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7UUFFL0MsWUFBWSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBRXRDLFlBQVksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO0tBQzdDO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztRQUNyQyxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUU1QyxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDMUIsT0FBTyxZQUFZLENBQUMsYUFBYSxDQUFDO0tBQ25DO0lBRUQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQWdCckMsQ0FBQyxDQUFDLENBQUMifQ==