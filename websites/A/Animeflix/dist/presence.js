const presence = new Presence({
    clientId: "1039178085922250873",
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "https://i.imgur.com/4hiyxuW.png"
    }, { pathname } = document.location;
    console.log(pathname);
    if (pathname === "/")
        presenceData.details = "Exploring Main Page";
    else if (pathname === "/genres")
        presenceData.details = "Exploring Genres";
    else if (pathname === "/series")
        presenceData.details = "Exploring Series";
    else if (pathname === "/movies")
        presenceData.details = "Exploring Movies";
    else if (pathname === "/mylist")
        presenceData.details = "Going through My List";
    else if (pathname.startsWith("/watch")) {
        const showName = document.querySelector('meta[name="anime-skip.show.name"]');
        const episodeName = document.querySelector('meta[name="anime-skip.episode.name"]');
        const epNum = document.querySelector('meta[name="anime-skip.episode.number"]');
        presenceData.details = `Watching ${showName.content}`;
        presenceData.state = episodeName.content.includes("Episode") ? episodeName.content : `${epNum.content}. ${episodeName.content}`;
    }
    else
        presenceData.details = "Exploring Animeflix";
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUscUJBQXFCO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsTUFBTSxZQUFZLEdBQWlCO1FBQ2hDLGFBQWEsRUFBRSxpQ0FBaUM7S0FDakQsRUFBRSxFQUFFLFFBQVEsRUFBRSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyQixJQUFJLFFBQVEsS0FBSyxHQUFHO1FBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztTQUM5RCxJQUFHLFFBQVEsS0FBSyxTQUFTO1FBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNyRSxJQUFHLFFBQVEsS0FBSyxTQUFTO1FBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNyRSxJQUFHLFFBQVEsS0FBSyxTQUFTO1FBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztTQUNyRSxJQUFHLFFBQVEsS0FBSyxTQUFTO1FBQUUsWUFBWSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQztTQUMxRSxJQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDbkMsTUFBTSxRQUFRLEdBQW9CLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUM5RixNQUFNLFdBQVcsR0FBb0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1FBQ3BHLE1BQU0sS0FBSyxHQUFvQixRQUFRLENBQUMsYUFBYSxDQUFDLHdDQUF3QyxDQUFDLENBQUM7UUFDaEcsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUFZLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNyRCxZQUFZLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ2hJOztRQUNJLFlBQVksQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUM7SUFDbkQsUUFBUSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxDQUFDLENBQUMsQ0FBQyJ9