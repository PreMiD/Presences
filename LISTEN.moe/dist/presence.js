let presence = new Presence({
    clientId: "615652705565933581"
}), path, startTimestamp, audio = document.querySelector("audio"), playback, elemt, artists = [], user, track, artist, strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    live: "presence.activity.live"
}), presenceData = {
    largeImageKey: "listen_moe_lg"
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixJQUFZLEVBQ1osY0FBc0IsRUFDdEIsS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUN6RCxRQUFpQixFQUNqQixLQUFLLEVBQ0wsT0FBTyxHQUFHLEVBQUUsRUFDWixJQUFZLEVBQ1osS0FBYSxFQUNiLE1BQWMsRUFDZCxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUMzQixhQUFhLEVBQUUsZUFBZTtDQUMvQixDQUFDO0FBRUosU0FBUyxjQUFjO0lBQ3JCLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxVQUFVO0lBQ2pCLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztRQUNwRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLFVBQVU7UUFDM0UsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNkLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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