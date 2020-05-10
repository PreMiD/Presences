const presence = new Presence({
    clientId: "701922288488022046"
});
const browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "mad"
    };
    if (document.location.pathname == "/") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Choosing station";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Choosing the best station";
    }
    else if (document.location.pathname == "/home.php" ||
        document.location.pathname == "/home") {
        presenceData.details = "Viewing the home page";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Checking out the cool new advertisments!";
        presenceData.startTimestamp = browsingStamp;
    }
    else if (document.location.pathname == "/team") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Team";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Viewing the best DJs, Jack and Bobby!";
    }
    else if (document.location.pathname == "/schedule") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Schedule";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Seeing when GlobalHits is!";
    }
    else if (document.location.pathname == "/community") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing the Community";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Looking at the community!";
    }
    else if (document.location.pathname == "/getinvolved") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing how to get involved";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Checking how I can become a DJ!";
    }
    else if (document.location.pathname == "/contactus") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Contact MadnessFM";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "I need to contact Madness!";
    }
    else if (document.location.pathname == "/popoutplayer.php") {
        const play = document.querySelector("#stream1 > div > div > div.ppBtn.play-btn");
        const pause = document.querySelector("#stream1 > div > div > div.ppBtn.playing.stop-btn");
        const songTitle = document.querySelector("#stream1 > div > div > div.player-ctr > div.track-info.animated > div.track-title.animated").textContent;
        const songArtist = document.querySelector("#stream1 > div > div > div.player-ctr > div.track-info.animated > div.artist-name.animated").textContent;
        const dj = document.querySelector("body > div.container > div > div.card-header.col-md-12.centertext.bg-danger > h5 > small").textContent;
        if (play != null) {
            presenceData.details = songTitle + " by " + songArtist;
            presenceData.state = "DJ: " + dj;
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = "Paused";
            presenceData.startTimestamp = browsingStamp;
        }
        else if (pause != null) {
            presenceData.details = songTitle + " by " + songArtist;
            presenceData.state = "DJ: " + dj;
            presenceData.smallImageKey = "play";
            presenceData.smallImageText = "Listening...";
            presenceData.startTimestamp = browsingStamp;
        }
        else {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Viewing:" + songTitle + " by " + songArtist;
            presenceData.state = "DJ: " + dj;
            presenceData.smallImageKey = "search";
            presenceData.smallImageText = "Who's on air?";
        }
    }
    else if (document.location.pathname == "/privacy") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing privacy";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Checking my privacy!";
    }
    else if (document.location.pathname == "/tandcs") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing T&CS";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Making sure I am following the rules";
    }
    else if (document.location.pathname == "/public") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing About Page";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Whats MadnessFM about?";
    }
    else if (document.location.pathname == "/advertise") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Viewing Advertisements";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Why not advertise?";
    }
    else if (document.location.pathname == "/keepusonair") {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Keep Us On Air";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText =
            "Please keep us on air! Our DJs need this station!";
    }
    else {
        presenceData.startTimestamp = browsingStamp;
        presenceData.details = "Error 1:";
        presenceData.state = "Unable to read the page.";
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Error 1";
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXBELFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sWUFBWSxHQUFpQjtRQUNqQyxhQUFhLEVBQUUsS0FBSztLQUNyQixDQUFDO0lBRUYsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxHQUFHLEVBQUU7UUFDckMsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFDNUMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUN0QyxZQUFZLENBQUMsY0FBYyxHQUFHLDJCQUEyQixDQUFDO0tBQzNEO1NBQU0sSUFDTCxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSxXQUFXO1FBQ3pDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFDckM7UUFDQSxZQUFZLENBQUMsT0FBTyxHQUFHLHVCQUF1QixDQUFDO1FBQy9DLFlBQVksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO1FBQ3RDLFlBQVksQ0FBQyxjQUFjLEdBQUcsMENBQTBDLENBQUM7UUFDekUsWUFBWSxDQUFDLGNBQWMsR0FBRyxhQUFhLENBQUM7S0FDN0M7U0FBTSxJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxJQUFJLE9BQU8sRUFBRTtRQUNoRCxZQUFZLENBQUMsY0FBYyxHQUFHLGFBQWEsQ0FBQztRQUM1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