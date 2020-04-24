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
function upperCaseFirstChar(word) {
    return word[0].toUpperCase() + word.slice(1, word.length);
}
function formatAnime(anime) {
    let format = "";
    for (var i = 0; i < anime.length; i++) {
        const part = anime[i];
        format += upperCaseFirstChar(part) + " ";
    }
    return format.replace("Dub", "(Dub)");
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
        if (videoInfos.paused ||
            (dataUpdated && videoInfos.currentTime === oldTime)) {
            presenceData.smallImageKey = "pause";
            presenceData.smallImageText =
                getTimestampAsString(videoInfos.duration, videoInfos.currentTime) +
                    " left";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHO0lBQ2YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLE1BQU0sRUFBRSxJQUFJO0NBQ2IsQ0FBQztBQUVGLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztBQUV4QixRQUFRLENBQUMsRUFBRSxDQUNULFlBQVksRUFDWixDQUFDLFNBQXFFLEVBQUUsRUFBRTtJQUN4RSxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBQ3ZCLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDckIsQ0FBQyxDQUNGLENBQUM7QUFFRixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFFaEIsU0FBUyxrQkFBa0IsQ0FBQyxJQUFZO0lBQ3RDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBZTtJQUNsQyxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDckMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE1BQU0sSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7S0FDMUM7SUFDRCxPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FB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