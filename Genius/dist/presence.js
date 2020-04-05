var presence = new Presence({
    clientId: "630480419598499840"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
var elapsed = Math.floor(Date.now() / 1000);
var artist;
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
            article = article.substring(0, 125) + "...";
        }
        data.details = "Viewing an Article";
        data.state = article;
        data.startTimestamp = elapsed;
    }
    else if (path.startsWith("/artists/")) {
        artist = document
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
        artist = document.querySelector("a.header_with_cover_art-primary_info-primary_artist").textContent;
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
            title = title.substring(0, 125) + "...";
        }
        data.details = "Playing a Video";
        data.state = title;
        if (video && !isNaN(video.duration)) {
            var timestamps = getTimestamps(Math.floor(video.currentTime), Math.floor(video.duration));
            data.smallImageKey = video.paused ? "pause" : "play";
            data.smallImageText = video.paused
                ? (await strings).pause
                : (await strings).play;
            (data.startTimestamp = timestamps[0]),
                (data.endTimestamp = timestamps[1]);
            if (video.paused) {
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDNUMsSUFBSSxNQUFNLENBQUM7QUFFWCxRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNuQyxJQUFJLElBQUksR0FBaUI7UUFDdkIsYUFBYSxFQUFFLGFBQWE7S0FDN0IsQ0FBQztJQUVGLElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDNUUsSUFBSSxZQUFZLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FDdkMseUNBQXlDLENBQzFDO1FBQ0MsQ0FBQyxDQUFDLElBQUk7UUFDTixDQUFDLENBQUMsS0FBSyxDQUFDO0lBQ1YsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDdEMsSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUNsQyxJQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQztLQUMvQjtTQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNqQyxJQUFJLE9BQU8sR0FBRyxRQUFR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