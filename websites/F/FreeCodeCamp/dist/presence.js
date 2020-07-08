const presence = new Presence({
    clientId: "729995077111250966"
});
const timeStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "logo",
        startTimestamp: timeStamp
    };
    const page = document.location.pathname;
    if (page.startsWith("/learn/")) {
        presenceData.details = "Learning:";
        presenceData.state = "Writing Code!";
    }
    else if (page.startsWith("/login")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Signing In";
    }
    else if (page.startsWith("/news/")) {
        presenceData.details = "Viewing Page:";
        presenceData.state = "Reading the news";
    }
    else if (page.startsWith("/learn")) {
        presenceData.details = "Deciding:";
        presenceData.state = "Choosing what to learn today 🤔";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQTtBQUVGLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRWhELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07UUFDckIsY0FBYyxFQUFFLFNBQVM7S0FDMUIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBQztRQUM3QixZQUFZLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxZQUFZLENBQUMsS0FBSyxHQUFHLGVBQWUsQ0FBQztLQUN0QztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBQztRQUNqQyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQztLQUNuQztTQUNJLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBQztRQUNqQyxZQUFZLENBQUMsT0FBTyxHQUFHLGVBQWUsQ0FBQztRQUN2QyxZQUFZLENBQUMsS0FBSyxHQUFHLGtCQUFrQixDQUFBO0tBQ3hDO1NBQ0ksSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFDO1FBQ2pDLFlBQVksQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ25DLFlBQVksQ0FBQyxLQUFLLEdBQUcsaUNBQWlDLENBQUM7S0FDeEQ7SUFDRCxRQUFRLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3JDLENBQUMsQ0FBQyxDQUFDIn0=