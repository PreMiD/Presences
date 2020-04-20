var presence = new Presence({
    clientId: "696341580096733185"
});
var videoInfos = {
    duration: 0,
    currentTime: 0,
    paused: true
};
var dataUpdated = false;
presence.on("iFrameData", (videoData) => {
    videoInfos = videoData;
    dataUpdated = true;
});
var oldTime = 0;
function formatAnime(anime) {
    let format = "";
    for (var i = 0; i < anime.length; i++) {
        const part = anime[i];
        format += upperCaseFirstChar(part) + " ";
    }
    return format.replace("Dub", "(Dub)");
}
function upperCaseFirstChar(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}
function getEndTime(current, duration) {
    const startTime = Date.now();
    const endTime = Math.floor(startTime / 1000) - current + duration;
    return endTime;
}
function getTimestampAsString(duration, current) {
    return new Date((duration - current) * 1000).toISOString().substr(11, 8);
}
presence.on("UpdateData", () => {
    const url = document.location.pathname;
    var detail = "Browsing . . .";
    var state;
    const is404 = document.querySelector("#wrapper_bg > section > section.content_left > h1");
    if (is404 != null && is404.textContent === "404") {
        detail = "404";
        state = "Non-existent page";
    }
    else if (url === "/") {
        state = "Recent animes release";
    }
    else if (url === "/login.html") {
        detail = "Logging in . . .";
    }
    else if (url === "/register.html") {
        detail = "Signing up . . .";
    }
    else if (url === "/user/bookmark") {
        detail = "Managing bookmarks";
    }
    else if (url === "/anime-list.html") {
        state = "Animes list";
    }
    else if (url === "//search.html") {
        detail = "Searching . . .";
        const anime = decodeURI(document.location.href).split("=")[1].split(" ");
        state = "Anime: " + formatAnime(anime);
    }
    else if (url === "/new-season.html") {
        state = "Newest animes";
    }
    else if (url === "/anime-movies.html") {
        state = "Animes' movies";
    }
    else if (url === "/popular.html") {
        state = "Popular animes";
    }
    else if (url.includes("/genre/")) {
        const genre = url.split("/").pop();
        state = "Anime genre: " + upperCaseFirstChar(genre);
    }
    else if (url.includes("/category/")) {
        const anime = url.split("/").pop().split("-");
        state = "Anime: " + formatAnime(anime);
    }
    else {
        detail = "Watching . . .";
        let anime = url.split("/").pop().split("-");
        const episode = anime[anime.length - 2] + " " + anime[anime.length - 1];
        anime = anime.slice(0, anime.length - 2);
        state = formatAnime(anime) + ": " + upperCaseFirstChar(episode);
    }
    var presenceData = {
        largeImageKey: "logo",
        details: detail,
        state: state
    };
    if (detail === "Watching . . ." && videoInfos != null) {
        if (videoInfos.paused || (dataUpdated && videoInfos.currentTime === oldTime)) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText = getTimestampAsString(videoInfos.duration, videoInfos.currentTime) + " left";
            delete presenceData.endTimestamp;
        }
        else {
            presenceData.smallImageKey = "play";
            presenceData.endTimestamp = getEndTime(Math.floor(videoInfos.currentTime), Math.floor(videoInfos.duration));
            oldTime = videoInfos.currentTime;
            dataUpdated = false;
        }
        presence.setActivity(presenceData, !videoInfos.paused);
    }
    else {
        presenceData.smallImageKey = "browsing";
        presenceData.startTimestamp = new Date().getTime();
        presence.setActivity(presenceData);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQXNFLEVBQUUsRUFBRTtJQUNuRyxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEIsU0FBUyxXQUFXLENBQUMsS0FBZTtJQUNoQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDbkMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDNUM7SUFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFFRCxTQUFTLGtCQUFrQixDQUFDLElBQVk7SUFDdEMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FB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