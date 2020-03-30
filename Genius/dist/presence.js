var presence = new Presence({
    clientId: "630480419598499840"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "genius-logo"
    };
    var lyricCheck = document.querySelector(".song_body-lyrics") ? true : false;
    var profileCheck = document.querySelector(".profile_identity-name_iq_and_role_icon")
        ? true
        : false;
    var path = document.location.pathname;
    if (path == "/") {
        data.details = "Viewing Homepage";
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/a/")) {
        var article = document.querySelector("h1.article_title").textContent;
        if (article.length > 128) {
            article.substring(0, 125) + "...";
        }
        data.details = "Viewing an Article";
        data.state = article;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/artists/")) {
        var artist = document
            .querySelector("h1.profile_identity-name_iq_and_role_icon")
            .innerHTML.split("<")[0];
        data.details = "Viewing Artist Profile";
        data.state = artist;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/albums/")) {
        var album = document.querySelector("h1.header_with_cover_art-primary_info-title").textContent;
        data.details = "Viewing an Album";
        data.state = album;
        data.startTimestamp = elapsed;
    }
    else if (lyricCheck) {
        var song = document.querySelector("h1.header_with_cover_art-primary_info-title").textContent;
        var artist = document.querySelector("a.header_with_cover_art-primary_info-primary_artist").textContent;
        data.details = "Viewing Lyrics";
        data.state = artist + " - " + song;
        data.startTimestamp = elapsed;
    }
    else if (profileCheck) {
        var user = document
            .querySelector("h1.profile_identity-name_iq_and_role_icon")
            .innerHTML.split("<")[0];
        data.details = "Viewing a Profile";
        data.state = user;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/videos/")) {
        var video = document.querySelector("video.vjs-tech");
        var title = document.querySelector("h1.article_title").textContent;
        if (title.length > 128) {
            title.substring(0, 125) + "...";
        }
        data.details = "Playing a Video";
        data.state = title;
        if (video && !isNaN(video.duration)) {
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
        }
        data.smallImageKey = video.paused ? "pause" : "play";
        data.smallImageText = video.paused
            ? (await strings).pause
            : (await strings).play;
        (data.startTimestamp = timestamps[0]), (data.endTimestamp = timestamps[1]);
        if (video.paused) {
            delete data.startTimestamp;
            delete data.endTimestamp;
        }
    }
    else if (path.startsWith("/search")) {
        var search = document.querySelector("h2.search_results_page-header")
            .textContent;
        data.details = "Searching for:";
        data.state = search;
        data.smallImageKey = "search";
        data.smallImageText = "Searching";
        data.startTimestamp = elapsed;
    }
    else {
        data.details = "Somewhere on-site";
        data.startTimestamp = elapsed;
    }
    presence.setActivity(data);
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFFNUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxhQUFhO0tBQzVCLENBQUM7SUFFRixJQUFJLFVBQVUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQzVFLElBQUksWUFBWSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQ3hDLHlDQUF5QyxDQUN6QztRQUNBLENBQUMsQ0FBQyxJQUFJO1FBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUNULElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3RDLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNoQixJQUFJLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ2xDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JB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