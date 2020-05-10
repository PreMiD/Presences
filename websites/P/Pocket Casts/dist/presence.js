const presence = new Presence({
    clientId: "661889916635971616"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "icon"
    };
    if (document.getElementsByClassName("player-controls").length == 0) {
        presenceData.smallImageKey = "more";
        if (document.location.pathname == "/podcasts") {
            presenceData.details = "Viewing subscriptions";
        }
        else if (document.location.pathname.startsWith("/podcasts/") ||
            document.location.pathname.startsWith("/discover/podcast/")) {
            presenceData.details = "Viewing podcast";
            presenceData.state = document.getElementsByClassName("title-and-actions")[0].children[0].textContent;
        }
        else if (document.location.pathname == "/discover") {
            presenceData.details = "Viewing discover page";
        }
        else if (document.location.pathname.startsWith("/discover/list/")) {
            presenceData.details = "Viewing discover page";
            presenceData.state = document.getElementsByTagName("h1")[0].textContent;
        }
        else if (document.location.pathname == "/new-releases") {
            presenceData.details = "Viewing new releases";
        }
        else if (document.location.pathname == "/in-progress") {
            presenceData.details = "Viewing in-progress episodes";
        }
        else if (document.location.pathname == "/starred") {
            presenceData.details = "Viewing starred episodes";
        }
        else if (document.location.pathname == "/profile") {
            presenceData.details = "Viewing profile";
        }
        else if (document.location.pathname == "/uploaded-files") {
            presenceData.details = "Viewing uploaded files";
        }
        else if (document.location.pathname == "/history") {
            presenceData.details = "Viewing listening history";
        }
        else if (document.location.pathname == "/stats") {
            presenceData.details = "Viewing listening stats";
            presenceData.state =
                "Listened for " +
                    document.getElementsByClassName("styled__TimeListened-sc-1nd51k4-2")[0]
                        .textContent;
        }
        else if (document.location.pathname.startsWith("/settings/")) {
            presenceData.details = "Changing settings";
        }
    }
    else {
        presenceData.details = document.getElementsByClassName("episode-title player_episode")[0].textContent;
        presenceData.state = document.getElementsByClassName("podcast-title player_podcast_title")[0].textContent;
        const time = document
            .getElementsByClassName("time-text current-time")[0]
            .textContent.split(":")
            .map((n) => Number(n));
        if (time.length == 3) {
            presenceData.startTimestamp =
                Date.now() - (time[0] * 3600 + time[1] * 60 + time[2]) * 1000;
        }
        else {
            presenceData.startTimestamp =
                Date.now() - (time[0] * 60 + time[1]) * 1000;
        }
        if (document.getElementsByClassName("pause_button").length == 0) {
            presenceData.smallImageKey = "pause";
            delete presenceData.startTimestamp;
        }
        else {
            presenceData.smallImageKey = "play";
        }
    }
    presence.setActivity(presenceData);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsTUFBTTtLQUN0QixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsc0JBQXNCLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1FBQ2xFLFlBQVksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDO1FBRXBDLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1lBQzdDLFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDaEQ7YUFBTSxJQUNMLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUM7WUFDbkQsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQzNEO1lBQ0EsWUFBWSxDQUFDLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztZQUN6QyxZQUFZLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxzQkFBc0IsQ0FDbEQsbUJBQW1CLENBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQztTQUM5QjthQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksV0FBVyxFQUFFO1lBQ3BELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7U0FDaEQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFVB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