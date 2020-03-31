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
audio.onplay = resetTimestamp();
audio.onpause = resetTimestamp();
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
        delete presenceData.smallImageKey, presenceData.smallImageText;
    }
    else {
        presenceData.details = "Not playing";
        presenceData.state = "Home";
        delete presenceData.smallImageKey, presenceData.smallImageText;
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBYSxJQUFJLFFBQVEsQ0FBQztJQUNsQyxRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixJQUFZLEVBQ1osY0FBc0IsRUFDdEIsS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUN6RCxRQUFpQixFQUNqQixLQUFLLEVBQ0wsT0FBTyxHQUFHLEVBQUUsRUFDWixJQUFZLEVBQ1osS0FBYSxFQUNiLE1BQWMsRUFDZCxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsSUFBSSxFQUFFLHdCQUF3QjtDQUMvQixDQUFDLEVBQ0YsWUFBWSxHQUFpQjtJQUMzQixhQUFhLEVBQUUsZUFBZTtDQUMvQixDQUFDO0FBRUosU0FBUyxjQUFjO0lBQ3JCLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxVQUFVO0lBQ2pCLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDYixLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQztRQUNwRSxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLFVBQVU7UUFDM0UsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNkLElBQUksS0FBSyxJQUFJLFNBQVMsRUFBRTtRQUN0QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFD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