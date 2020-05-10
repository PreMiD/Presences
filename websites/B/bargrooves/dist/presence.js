const presence = new Presence({
    clientId: "641955799869947914"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "default",
        smallImageKey: "logo-square",
        smallImageText: "bargrooves.live",
        details: "Bargrooves.live",
        state: "Luxury House Music",
        startTimestamp: 0,
        endTimestamp: 0
    };
    if (window.location.pathname == "/") {
        if (document
            .getElementById("play-pause-i")
            .classList.value.includes("fa-pause")) {
            presenceData.details = "Listening to the radio";
            presenceData.state =
                document.getElementById("song").innerHTML +
                    " - " +
                    document.getElementById("artist").innerHTML;
            presenceData.smallImageKey = "play";
        }
        else {
            presenceData.details = "On website,";
            presenceData.state =
                "Browsing " + document.title.replace("Bargrooves FM - ", "");
            presenceData.smallImageKey = "pause";
        }
    }
    else if (window.location.pathname == "/player/") {
        if (document
            .getElementsByClassName("play-toggle")[0]
            .classList.value.includes("fa-play")) {
            presenceData.details = "Browsing the player";
            presenceData.state =
                "Looking at " + document.title.replace("Bargrooves FM - ", "");
            presenceData.smallImageKey = "pause";
        }
        else {
            presenceData.details =
                "Listening to " +
                    document.getElementById("current-album").innerHTML.split("<")[0];
            presenceData.state =
                document.getElementById("csong").innerHTML +
                    " - " +
                    document.getElementById("cartist").innerHTML;
            presenceData.smallImageKey = "play";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFNBQVM7UUFDeEIsYUFBYSxFQUFFLGFBQWE7UUFDNUIsY0FBYyxFQUFFLGlCQUFpQjtRQUNqQyxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLEtBQUssRUFBRSxvQkFBb0I7UUFDM0IsY0FBYyxFQUFFLENBQUM7UUFDakIsWUFBWSxFQUFFLENBQUM7S0FDaEIsQ0FBQztJQUVGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksR0FBRyxFQUFFO1FBQ25DLElBQ0UsUUFBUTthQUNMLGNBQWMsQ0FBQyxjQUFjLENBQUM7YUFDOUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQ3ZDO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyx3QkFBd0IsQ0FBQztZQUNoRCxZQUFZLENBQUMsS0FBSztnQkFDaEIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTO29CQUN6QyxLQUFLO29CQUNMLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzlDLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1NBQ3JDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQztZQUNyQyxZQUFZLENBQUMsS0FBSztnQkFDaEIsV0FBVyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQ3RDO0tBQ0Y7U0FBTSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLFVBQVUsRUFBRTtRQUNqRCxJQUNFLFFBQVE7YUFDTCxzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3RDO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztZQUM3QyxZQUFZLENBQUMsS0FBSztnQkFDaEIsYUFBYSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pFLFlBQVksQ0FBQyxhQUFhLEdBQUcsT0FBTyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxZQUFZLENBQUMsT0FBTztnQkFDbEIsZUFBZTtvQkFDZixRQUFRLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkUsWUFBWSxDQUFDLEtBQUs7Z0JBQ2hCLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUztvQkFDMUMsS0FBSztvQkFDTCxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUMvQyxZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztTQUNyQztLQUNGO0lBRUQsSUFBSSxZQUFZLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtRQUNoQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEIsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3hCO1NBQU07UUFDTCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==