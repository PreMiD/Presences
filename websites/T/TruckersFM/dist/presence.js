const presence = new Presence({
    clientId: "640914619082211338"
});
presence.on("UpdateData", () => {
    const title = `${document.querySelector(".player-artist-text").textContent} - ${document.querySelector(".player-title-text").textContent} `;
    const dj = document.querySelector(".live-name").textContent;
    const liveTill = document.querySelector(".live-time").textContent;
    const pageName = document.title.slice(13);
    const liveTime = liveTill.slice(6);
    const presenceData = {
        largeImageKey: "tfmlogo",
        smallImageKey: "smalltfmlogo",
        smallImageText: `Viewing: ${pageName}`
    };
    presenceData.details = `${title}`;
    presenceData.state = `${dj} till ${liveTime}`;
    presence.setActivity(presenceData);
    presence.setTrayTitle();
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRTtJQUM3QixNQUFNLEtBQUssR0FBRyxHQUNaLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQyxXQUNoRCxNQUFNLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQztJQUNsRSxNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUM1RCxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFdBQVcsQ0FBQztJQUNsRSxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsU0FBUztRQUN4QixhQUFhLEVBQUUsY0FBYztRQUM3QixjQUFjLEVBQUUsWUFBWSxRQUFRLEVBQUU7S0FDdkMsQ0FBQztJQUVGLFlBQVksQ0FBQyxPQUFPLEdBQUcsR0FBRyxLQUFLLEVBQUUsQ0FBQztJQUNsQyxZQUFZLENBQUMsS0FBSyxHQUFHLEdBQUcsRUFBRSxTQUFTLFFBQVEsRUFBRSxDQUFDO0lBRTlDLFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDbkMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQzFCLENBQUMsQ0FBQyxDQUFDIn0=