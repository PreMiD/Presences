var presence = new Presence({
    clientId: "706585201479909476"
});
let Name, Artist, timeDuration, timeElapsed;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "logo"
    };
    if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Playing");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Playing");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat-one"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-audio.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat-one"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-not-playing")) {
        Name = document.querySelector("div.playing-title");
        (presenceData.smallImageKey = "stop"),
            (presenceData.smallImageText = "Stopped");
        presenceData.details = Name.innerText;
        presenceData.state = "Stopped";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-audio.kodi-not-playing")) {
        Name = document.querySelector("div.playing-title");
        (presenceData.smallImageKey = "stop"),
            (presenceData.smallImageText = "Stopped");
        presenceData.details = Name.innerText;
        presenceData.state = "Stopped";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Playing");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat-one"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-off.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-off.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Playing");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-playing")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "repeat-one"),
            (presenceData.smallImageText = "Repeating");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-all.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if (document.querySelector("body.section-home.page-.active-player-kodi.kodi-shuffled-on.kodi-partymode-off.kodi-mute-off.kodi-repeat-one.kodi-media-video.kodi-paused")) {
        Name = document.querySelector("div.playing-title");
        timeElapsed = document.querySelector("div.playing-time-current");
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "pause"),
            (presenceData.smallImageText = "Paused");
        presenceData.details = "Watching: " + Name.innerText;
        presenceData.state = "Paused";
    }
    else if ((document.location.hostname = "localhost")) {
        Name = document.querySelector("div.playing-title");
        (Artist = document.querySelector("div.playing-subtitle")),
            (timeElapsed = document.querySelector("div.playing-time-current"));
        timeDuration = document.querySelector("div.playing-time-duration");
        (presenceData.smallImageKey = "play"),
            (presenceData.smallImageText = "Playing");
        presenceData.details = Name.innerText + " - " + Artist.innerText;
        presenceData.state = timeElapsed.innerText + "/" + timeDuration.innerText;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksSUFBUyxFQUFFLE1BQVcsRUFBRSxZQUFpQixFQUFFLFdBQWdCLENBQUM7QUFFaEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbkMsTUFBTSxZQUFZLEdBQWlCO1FBQ2pDLGFBQWEsRUFBRSxNQUFNO0tBQ3RCLENBQUM7SUFFRixJQUNFLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLDRJQUE0SSxDQUM3SSxFQUNEO1FBQ0EsSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNuRCxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDdkQsQ0FBQyxZQUFZLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztZQUN0QyxDQUFDLFlBQVksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFFM0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO1FBQ2pFLFlBQVksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDO0tBQy9CO1NBQU0sSUFDTCxRQUFRLENBQUMsYUFBYSxDQUNwQiw0SUFBNEksQ0FDN0ksRUFDRDtRQUNBLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkQsQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsWUFBWSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUM7WUFD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