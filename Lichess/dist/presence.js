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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixLQUFLLEdBQUc7SUFDUCxHQUFHLEVBQUUsTUFBTTtJQUNYLFFBQVEsRUFBRSxxQkFBcUI7SUFDL0IsV0FBVyxFQUFFLFVBQVU7SUFDdkIsc0JBQXNCLEVBQUUsWUFBWTtJQUNwQyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsU0FBUztJQUNuQixLQUFLLEVBQUUsWUFBWTtJQUNuQixRQUFRLEVBQUUsZUFBZTtJQUN6QixXQUFXLEVBQUUsV0FBVztJQUN4QixZQUFZLEVBQUUsWUFBWTtJQUMxQixRQUFRLEVBQUUsZUFBZTtJQUN6QixTQUFTLEVBQUUsU0FBUztJQUNwQixXQUFXLEVBQUUsT0FBTztJQUNwQixRQUFRLEVBQUUsUUFBUTtJQUNsQixXQUFXLEVBQUUsZ0JBQWdCO0lBQzdCLFNBQVMsRUFBRSxjQUFjO0lBQ3pCLFFBQVEsRUFBRSxhQUFhO0lBQ3ZCLGVBQWUsRUFBRSxpQkFBaUI7Q0FDbEMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUN0QyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDNUIscUZBQXFGLENBQ3RFLEVBQ2hCLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUM5QixrREFBa0QsQ0FDbkMsQ0FBQztJQUVsQixJQUFJLElBQUksR0FBeUI7UUFDaEMsYUFBYSxFQUFFLFNBQVM7UUFDeEIsY0FBYyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztLQUM3QyxDQUFDO0lBRUYsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDaEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JEO1NBQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7S0FDeEI7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztRQUNoQyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0tBQzlCO1NBQU0sSUFDTixNQUFNO1FBQ04sTUFBTSxDQUFDLFdBQVcsSUFBSSxFQUFFO1FBQ3hCLElBQUk7UUFDSixJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUUsRUFDckI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3ZDO1NBQU0sSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUU7UUFDckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDckM7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkUsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDLENBQUMsQ0FBQyJ9