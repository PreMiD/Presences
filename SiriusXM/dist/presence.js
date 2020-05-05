var presence = new Presence({
    clientId: "704186478410072065"
});
let channelName, channelNumber, songName, songArtist, searchTerm, categoryTerm;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.location.pathname == "/home/foryou") {
        presenceData.details = "Viewing SiriusXM Home";
    }
    else if (document.location.pathname == "/home/music") {
        presenceData.details = "Viewing Music Home";
    }
    else if (document.location.pathname == "/home/sports") {
        presenceData.details = "Viewing Sports Home";
    }
    else if (document.location.pathname == "/home/news") {
        presenceData.details = "Viewing News Home";
    }
    else if (document.location.pathname == "/home/entertainment") {
        presenceData.details = "Viewing Talk Home";
    }
    else if (document.location.pathname == "/home/howard") {
        presenceData.details = "Viewing Howard Stern Home";
    }
    else if (document.location.pathname == "/now-playing") {
        channelName = document.querySelector("p.channel-name");
        channelNumber = document.querySelector("p.channel-number");
        songName = document.querySelector("span.track-name");
        songArtist = document.querySelector("span.artist-name");
        presenceData.details = songName.innerText + " - " + songArtist.innerText;
        presenceData.state =
            channelName.innerText + " - " + channelNumber.innerText;
    }
    else if (document.location.pathname == "/favorites/channels") {
        presenceData.details = "Viewing Favorite Channels";
    }
    else if (document.location.pathname == "/favorites/shows") {
        presenceData.details = "Viewing Favorite Shows";
    }
    else if (document.location.pathname == "/favorites/episodes") {
        presenceData.details = "Viewing Favorite Episodes";
    }
    else if (document.location.pathname == "/recently-played") {
        presenceData.details = "Viewing Recently Played Stations";
    }
    else if (document.location.pathname == "/query") {
        presenceData.details = "Searching SiriusXM";
    }
    else if (document.location.pathname.includes("/query")) {
        searchTerm = document.querySelector("h2.search-page-header");
        presenceData.details = "Viewing: ";
        presenceData.state = searchTerm.innerText;
    }
    else if (document.location.pathname.includes("/category-listing")) {
        categoryTerm = document.querySelector("span.sxm-breadcrumb__text");
        presenceData.details = "Viewing Category: ";
        presenceData.state = categoryTerm.innerText;
    }
    else {
        presenceData.details = "Can't read page";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksV0FBZ0IsRUFDbEIsYUFBa0IsRUFDbEIsUUFBYSxFQUNiLFVBQWUsRUFDZixVQUFlLEVBQ2YsWUFBaUIsQ0FBQztBQUVwQixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxNQUFNLFlBQVksR0FBaUI7UUFDakMsYUFBYSxFQUFFLE1BQU07S0FDdEIsQ0FBQztJQUVGLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksY0FBYyxFQUFFO1FBQ2hELFlBQVksQ0FBQyxPQUFPLEdBQUcsdUJBQXVCLENBQUM7S0FDaEQ7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRTtRQUN0RCxZQUFZLENBQUMsT0FBTyxHQUFHLG9CQUFvQixDQUFDO0tBQzdDO1NBQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxjQUFjLEVBQUU7UUFDdkQsWUFBWSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQztLQUM5QztTQUFNLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQ3JELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLHFCQUFxQixFQUFFO1FBQzlELFlBQVksQ0FBQyxPQUFPLEdBQUcsbUJBQW1CLENBQUM7S0FDNUM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLGNBQWMsRUFBRTtRQUN2RCxZQUFZLENBQUMsT0FBTyxH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