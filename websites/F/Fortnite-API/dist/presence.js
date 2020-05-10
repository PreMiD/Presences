const presence = new Presence({
    clientId: "622163652207706122"
});
const presenceData = {
    largeImageKey: "logo",
    startTimestamp: new Date().getTime()
};
presence.on("UpdateData", () => {
    const path = document.location.pathname;
    if (path === "/") {
        presenceData.details = "Home page";
    }
    else if (path === "/documentation") {
        presenceData.details = "Documentation page";
    }
    else if (path === "/about") {
        presenceData.details = "About page";
    }
    else if (path === "/profile") {
        presenceData.details = "Profile page";
    }
    else if (path === "/privacy") {
        presenceData.details = "Privacy page";
    }
    else {
        presenceData.details = "Browsing";
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxHQUFpQjtJQUNqQyxhQUFhLEVBQUUsTUFBTTtJQUNyQixjQUFjLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUU7Q0FDckMsQ0FBQztBQUVGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV4QyxJQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7UUFDaEIsWUFBWSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUM7S0FDcEM7U0FBTSxJQUFJLElBQUksS0FBSyxnQkFBZ0IsRUFBRTtRQUNwQyxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO1NBQU0sSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLFlBQVksQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDO0tBQ3JDO1NBQU0sSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQzlCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFO1FBQzlCLFlBQVksQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDO0tBQ3ZDO1NBQU07UUFDTCxZQUFZLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztLQUNuQztJQUVELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDckMsQ0FBQyxDQUFDLENBQUMifQ==