const presence = new Presence({
    clientId: "615652705565933581"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
}), presenceData = {
    largeImageKey: "listen_moe_lg"
}, audio = document.querySelector("audio");
let path, startTimestamp, playback, elemt, artists = [], user, track, artist;
function resetTimestamp() {
    startTimestamp = Math.floor(Date.now() / 1000);
}
function getArtists() {
    artists = [];
    elemt = document.querySelector("span.ja.player-song-artist-container")
        ? document.querySelector("span.ja.player-song-artist-container").childNodes
        : undefined;
    if (elemt != undefined) {
        for (let i = 0; i < elemt.length; i++) {
            artists.push(elemt[i].textContent.replace(/\s+/g, " ").trim());
        }
        artist = artists.join(" ");
    }
    return artist;
}
function getTrack() {
    track = document.querySelector("span.ja.player-song-title")
        ? document
            .querySelector("span.ja.player-song-title")
            .textContent.replace(/\s+/g, " ")
            .trim()
            .split("[")[0]
            .trim()
        : "Loading...";
    return track;
}
audio.onplay = function () {
    resetTimestamp();
};
audio.onpause = function () {
    resetTimestamp();
};
presence.on("UpdateData", async () => {
    path = window.location.pathname;
    playback = !audio.paused;
    if (playback) {
        presenceData.details = getTrack();
        presenceData.state = getArtists();
        presenceData.smallImageKey = "live";
        presenceData.smallImageText = (await strings).live;
        presenceData.startTimestamp = startTimestamp;
    }
    else if (path.includes("music")) {
        track = document.querySelectorAll("input.search")[1]
            .value;
        track = track == "" ? undefined : track;
        presenceData.details = "Searching for a music";
        presenceData.state = track;
        presenceData.smallImageKey = "search";
        presenceData.smallImageText = "Searching";
        presenceData.startTimestamp = startTimestamp;
    }
    else if (path.includes("u")) {
        user = document.querySelector("div.profileName > span").textContent;
        presenceData.details = "Viewing " + user + "'s profile";
        if (path.includes("favorites")) {
            presenceData.state = "Favorites";
        }
        else if (path.includes("uploads")) {
            presenceData.state = "Uploads";
        }
        else {
            delete presenceData.state;
        }
        presenceData.startTimestamp;
    }
    else {
        presenceData.details = "Not playing";
        presenceData.state = "Home";
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNwQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUMzQixhQUFhLEVBQUUsZUFBZTtDQUMvQixFQUNELEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM1RCxJQUFJLElBQVksRUFDZCxjQUFzQixFQUN0QixRQUFpQixFQUNqQixLQUFLLEVBQ0wsT0FBTyxHQUFHLEVBQUUsRUFDWixJQUFZLEVBQ1osS0FBYSxFQUNiLE1BQWMsQ0FBQztBQUVqQixTQUFTLGNBQWM7SUFDckIsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRCxTQUFTLFVBQVU7SUFDakIsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLHNDQUFzQyxDQUFDLENBQUMsVUFBVTtRQUMzRSxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2QsSUFBSSxLQUFLLElBQUksU0FBUyxFQUFFO1FBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FB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