const presence = new Presence({
    clientId: "632924426131996702"
}), pages = {
    "/": "Home",
    "/learn": "Learn to Play Chess",
    "/practice": "Practice",
    "/training/coordinate": "Coordinate",
    "/study": "Study",
    "/coach": "Coaches",
    "/tv": "Lichess TV",
    "/games": "Current Games",
    "/streamer": "Streamers",
    "/broadcast": "Broadcasts",
    "/video": "Video Library",
    "/player": "Players",
    "/team/all": "Teams",
    "/forum": "Forums",
    "/analysis": "Analysis Board",
    "/editor": "Board Editor",
    "/paste": "Import Game",
    "/games/search": "Advanced Search"
};
presence.on("UpdateData", async () => {
    const page = document.location.pathname, game = document.querySelector("#main-wrap > main > aside > div > section > div.game__meta__infos > div > div > div"), status = document.querySelector("#main-wrap > main > aside > div > section.status");
    let data = {
        largeImageKey: "lc-logo",
        startTimestamp: Math.floor(Date.now() / 1000)
    };
    if ((page && pages[page]) || (page && pages[page.slice(0, -1)])) {
        data.details = "Viewing a page:";
        data.state = pages[page] || pages[page.slice(0, -1)];
    }
    else if (page.includes("/training/")) {
        data.details = "Viewing a page:";
        data.state = "Training";
    }
    else if (page.includes("/@/")) {
        data.details = "Searching for:";
        data.state = document.title.replace(" • lichess.org", "");
        data.smallImageKey = "search";
    }
    else if (status &&
        status.textContent != "" &&
        game &&
        game.textContent != "") {
        data.details = game.textContent.trim();
        data.state = status.textContent.trim();
    }
    else if (!status && game && game.textContent != "") {
        data.details = "Playing a game:";
        data.state = game.textContent.trim();
    }
    if (data.details && data.state && data.details != "" && data.state != "")
        presence.setActivity(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDTixHQUFHLEVBQUUsTUFBTTtJQUNYLFFBQVEsRUFBRSxxQkFBcUI7SUFDL0IsV0FBVyxFQUFFLFVBQVU7SUFDdkIsc0JBQXNCLEVBQUUsWUFBWTtJQUNwQyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsU0FBUztJQUNuQixLQUFLLEVBQUUsWUFBWTtJQUNuQixRQUFRLEVBQUUsZUFBZTtJQUN6QixXQUFXLEVBQUUsV0FBVztJQUN4QixZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUUsZUFBZTtJQUN6QixTQUFTLEVBQUUsU0FBUztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixRQUFRLEVBQUUsUUFBUTtJQUNsQixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLFNBQVMsRUFBRSxjQUFjO0lBQ3pCLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLGVBQWUsRUFBRSxpQkFBaUI7Q0FDbkMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDM0IscUZBQXFGLENBQ3ZFLEVBQ2hCLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM3QixrREFBa0QsQ0FDcEMsQ0FBQztJQUVuQixJQUFJLElBQUksR0FBeUI7UUFDL0IsYUFBYSxFQUFFLFNBQVM7UUFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM5QyxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDL0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3REO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDekI7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDL0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQy9CO1NBQU0sSUFDTCxNQUFNO1FBQ04sTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFO1FBQ3hCLElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFDdEI7UUFDQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3hDO1NBQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDdEM7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdEUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixDQUFDLENBQUMsQ0FBQyJ9