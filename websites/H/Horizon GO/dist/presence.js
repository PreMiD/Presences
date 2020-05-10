const presence = new Presence({
    clientId: "647443051819565076"
}), presenceData = {
    largeImageKey: "icon"
};
presence.on("UpdateData", async () => {
    const path = window.location.hash.substr(1);
    if (path == "action=watch") {
        const channelstate = document
            .querySelector("div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)")
            .getAttribute("title");
        const titledetailes = document.querySelector("div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)");
        const pageData = {
            state: "Channel: " + channelstate,
            details: "Watching: " + titledetailes.textContent,
            largeImageKey: "icon"
        };
        presence.setActivity(pageData);
    }
    else if (path.includes("offset")) {
        const statedetails = document.querySelector(".player-ui-bottom-bar-controls__main-info");
        const movieVideo = {
            state: "Video: " + document.title,
            details: "Watching: " + statedetails.textContent,
            largeImageKey: "icon"
        };
        presence.setActivity(movieVideo);
    }
    else {
        const homepage = {
            details: "Browsing homepage.",
            largeImageKey: "icon"
        };
        presence.setActivity(homepage);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixZQUFZLEdBQWlCO0lBQzNCLGFBQWEsRUFBRSxNQUFNO0NBQ3RCLENBQUM7QUFFSixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBSSxJQUFJLElBQUksY0FBYyxFQUFFO1FBQzFCLE1BQU0sWUFBWSxHQUFHLFFBQVE7YUFDMUIsYUFBYSxDQUNaLDJLQUEySyxDQUM1SzthQUNBLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixNQUFNLGFBQWEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUMxQywwUUFBMFEsQ0FDM1EsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFpQjtZQUM3QixLQUFLLEVBQUUsV0FBVyxHQUFHLFlBQVk7WUFDakMsT0FBTyxFQUFFLFlBQVksR0FBRyxhQUFhLENBQUMsV0FBVztZQUNqRCxhQUFhLEVBQUUsTUFBTTtTQUN0QixDQUFDO1FBQ0YsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUNoQztTQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUN6QywyQ0FBMkMsQ0FDNUMsQ0FBQztRQUNGLE1BQU0sVUFBVSxHQUFpQjtZQUMvQixLQUFLLEVBQUUsU0FBUyxHQUFHLFFBQVEsQ0FBQyxLQUFLO1lBQ2pDLE9BQU8sRUFBRSxZQUFZLEdBQUcsWUFBWSxDQUFDLFdBQVc7WUFDaEQsYUFBYSxFQUFFLE1BQU07U0FDdEIsQ0FBQztRQUNGLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbEM7U0FBTTtRQUNMLE1BQU0sUUFBUSxHQUFpQjtZQUM3QixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLGFBQWEsRUFBRSxNQUFNO1NBQ3RCLENBQUM7UUFDRixRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ2hDO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==