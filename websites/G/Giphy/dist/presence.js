const presence = new Presence({
    clientId: "630507230852022273"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "giphy_big"
    };
    if (document.location.pathname == "/") {
        presenceData.details = "Browsing Gifs...";
        presenceData.state = "at Homepage";
        presenceData.smallImageKey = "browsing";
        presenceData.smallImageText = "browsing";
    }
    else if (document.location.pathname.includes("create/gifmaker")) {
        presenceData.details = "Creating a Gif";
        presenceData.state = "at Creation page";
        presenceData.smallImageKey = "creating";
        presenceData.smallImageText = "creating";
    }
    else {
        var at = document.location.pathname;
        var doing;
        if (at.includes("entertainment")) {
            doing = "Entertainment";
        }
        else if (at.includes("sports")) {
            doing = "Sports";
        }
        else if (at.includes("stickers")) {
            doing = "Stickers";
        }
        else if (at.includes("artist")) {
            doing = "Artists";
        }
        else if (at.includes("reaction")) {
            doing = "Reactions";
        }
        presenceData.details = "Browsing Gifs...";
        presenceData.state = `at ${doing} page`;
        presenceData.smallImageKey = "browsing";
        presenceData.smallImageText = "browsing";
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsV0FBVztLQUMzQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQztRQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztLQUMxQztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7UUFDakUsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUN4QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFDO1FBQ3hDLFlBQVksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDO1FBQ3hDLFlBQVksQ0FBQyxjQUFjLEdBQUcsVUFBVSxDQUFDO0tBQzFDO1NBQU07UUFDTCxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUNwQyxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsRUFBRTtZQUNoQyxLQUFLLEdBQUcsZUFBZSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hDLEtBQUssR0FBRyxRQUFRLENBQUM7U0FDbEI7YUFBTSxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDbEMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUNwQjthQUFNLElBQUksRUFBRSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1NBQ25CO2FBQU0sSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xDLEtBQUssR0FBRyxXQUFXLENBQUM7U0FDckI7UUFDRCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQzFDLFlBQVksQ0FBQyxLQUFLLEdBQUcsTUFBTSxLQUFLLE9BQU8sQ0FBQztRQUN4QyxZQUFZLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQztRQUN4QyxZQUFZLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztLQUMxQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=