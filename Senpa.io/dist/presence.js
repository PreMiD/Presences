const presence = new Presence({
    clientId: "691669470057594940"
});
var user;
var title;
var replace;
var search;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname === "/") {
        presenceData.details = "Home";
    }
    else if (document.location.pathname.includes("/web/")) {
        presenceData.details = `Playing on server : ${document.querySelector("#room-stats-hud").textContent}`;
        presenceData.state =
            `Player :${!document.querySelector("#tag").nodeValue
                ? ""
                : ` [${document.querySelector("#tag").nodeValue}]`} ${!document.querySelector("#name").nodeValue
                ? "no nick"
                : document.querySelector("#name").nodeValue}` + ` | ${document.querySelector("#stats-hud").textContent}`;
        presenceData.startTimestamp = Date.now();
    }
    else {
        presenceData.details = document.querySelector(".alt-page h1").textContent;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        if (presenceData.state == null)
            presenceData.state = "Navigating...";
        presence.setActivity(presenceData);
    }
});
function parseQueryString(queryString) {
    if (!queryString) {
        queryString = window.location.search.substring(1);
    }
    const params = {};
    const queries = queryString.split("&");
    queries.forEach((indexQuery) => {
        const indexPair = indexQuery.split("=");
        const queryKey = decodeURIComponent(indexPair[0]);
        const queryValue = decodeURIComponent(indexPair.length > 1 ? indexPair[1] : "");
        params[queryKey] = queryValue;
    });
    return params;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM3QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxLQUFVLENBQUM7QUFDZixJQUFJLE9BQVksQ0FBQztBQUNqQixJQUFJLE1BQVcsQ0FBQztBQUVoQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVsRCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNwQyxJQUFJLFlBQVksR0FBaUI7UUFDaEMsYUFBYSxFQUFFLE1BQU07S0FDckIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO1FBQ3ZDLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQzlCO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDeEQsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFDdEIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLFdBQzNDLEVBQUUsQ0FBQztRQUNILFlBQVksQ0FBQyxLQUFLO1lBQ2pCLFdBQ0MsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFNBQVM7Z0JBQ3hDLENBQUMsQ0FBQyxFQUFFO2dCQUNKLENBQUMsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsU0FBUyxHQUNqRCxJQUNDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTO2dCQUN6QyxDQUFDLENBQUMsU0FBUztnQkFDWCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUNwQyxFQUFFLEdBQUcsTUFBTSxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQy9ELFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0tBQ3pDO1NBQU07UUFDTixZQUFZLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDLENBQUMsV0FBVyxDQUFDO0tBQzFFO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNqQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3ZCO1NBQU07UUFDTixJQUFJLFlBQVksQ0FBQyxLQUFLLElBQUksSUFBSTtZQUFFLFlBQVksQ0FBQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1FBQ3JFLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDbkM7QUFDRixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsZ0JBQWdCLENBQUMsV0FBb0I7SUFDN0MsSUFBSSxDQUFDLFdBQVcsRUFBRTtRQUNqQixXQUFXLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ2xEO0lBQ0QsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdkMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQWtCLEVBQUUsRUFBRTtRQUN0QyxNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sVUFBVSxHQUFHLGtCQUFrQixDQUNwQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3hDLENBQUM7UUFDRixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDZixDQUFDIn0=