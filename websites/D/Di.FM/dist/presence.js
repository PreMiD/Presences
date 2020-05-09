const presence = new Presence({
    clientId: "630542731701387276"
});
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "dilogo"
    };
    if (document.getElementById("webplayer-region").getAttribute("data-state") ===
        "playing") {
        const tracka = document
            .getElementsByClassName("artist-name")[0]
            .innerHTML.replace("-", "");
        const trackt = document.getElementsByClassName("track-name")[0].innerHTML;
        presenceData.details = tracka;
        presenceData.state = trackt;
        presenceData.smallImageKey = "play";
    }
    else {
        presenceData.state = "Browsing...";
        presenceData.smallImageKey = "pause";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLFFBQVE7S0FDeEIsQ0FBQztJQUNGLElBQ0UsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUM7UUFDdEUsU0FBUyxFQUNUO1FBQ0EsTUFBTSxNQUFNLEdBQUcsUUFBUTthQUNwQixzQkFBc0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUMxRSxZQUFZLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUM5QixZQUFZLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQztRQUM1QixZQUFZLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQztLQUNyQztTQUFNO1FBQ0wsWUFBWSxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7UUFDbkMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7S0FDdEM7SUFFRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=