var presence = new Presence({
    clientId: "708314580304003124"
});
var strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browse: "presence.activity.browsing",
    search: "presence.activity.searching"
});
const getElement = (query) => {
    const element = document.querySelector(query);
    if (element) {
        return element.textContent.replace(/^\s+|\s+$/g, "");
    }
    else
        return "Loading...";
};
const videoStatus = (video) => {
    return video.paused ? "pause" : "play";
};
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var oldUrl, elapsed, searchText = "", searchElapsed = 0;
presence.on("UpdateData", async () => {
    const path = location.pathname.replace(/\/?$/, "/");
    const video = document.querySelector("video");
    const search = document.querySelector("input");
    const showSearchInfo = await presence.getSetting("search");
    const showBrowseInfo = await presence.getSetting("browse");
    const showVideoInfo = await presence.getSetting("video");
    var data = {
        details: undefined,
        state: undefined,
        largeImageKey: "anontpp",
        smallImageKey: undefined,
        smallImageText: undefined,
        startTimestamp: undefined,
        endTimestamp: undefined
    };
    if (oldUrl !== path) {
        oldUrl = path;
        elapsed = Math.floor(Date.now() / 1000);
    }
    if (elapsed) {
        data.startTimestamp = elapsed;
    }
    const parseVideo = async () => {
        const status = videoStatus(video);
        data.smallImageKey = status;
        data.smallImageText = (await strings)[status];
        if (status === "play") {
            const timestamps = getTimestamps(video.currentTime, video.duration);
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
    };
    if (showBrowseInfo) {
        if (path === '/') {
            data.details = 'Browsing';
        }
    }
    if (showVideoInfo) {
        if (video) {
            const show = getElement('#episodetitle') !== 'Feature Film';
            const state = document.querySelector('#infotitle').innerText.split('\n');
            if (show) {
                data.details = 'Watching Show';
                try {
                    data.state = `${state[0]} (${state[1]})`;
                    await parseVideo();
                }
                catch { }
            }
            else {
                data.details = 'Watching Movie';
                try {
                    data.state = state[0];
                    await parseVideo();
                }
                catch { }
            }
        }
    }
    if (showSearchInfo) {
        if (getElement('#indextitle').split('\n')[0] === 'Search Results') {
            data.details = 'Searching for';
            data.state = search.value;
        }
    }
    if (data.details !== undefined) {
        if (data.details.match("(Browsing|Viewing)")) {
            data.smallImageKey = "reading";
            data.smallImageText = (await strings).browse;
        }
        if (data.details.includes("Searching")) {
            data.smallImageKey = "search";
            data.smallImageText = (await strings).search;
        }
        presence.setActivity(data);
    }
    else {
        presence.setTrayTitle();
        presence.setActivity();
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUNILElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDaEMsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxLQUFLLEVBQUUsMEJBQTBCO0lBQ2pDLE1BQU0sRUFBRSw0QkFBNEI7SUFDcEMsTUFBTSxFQUFFLDZCQUE2QjtDQUN0QyxDQUFDLENBQUM7QUFFSCxNQUFNLFVBQVUsR0FBRyxDQUFDLEtBQWEsRUFBVSxFQUFFO0lBQzNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUMsSUFBSSxPQUFPLEVBQUU7UUFDWCxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztLQUN0RDs7UUFBTSxPQUFPLFlBQVksQ0FBQztBQUM3QixDQUFDLENBQUM7QUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLEtBQXVCLEVBQVUsRUFBRTtJQUN0RCxPQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQ3pDLENBQUMsQ0FBQztBQUVGLFNBQVMsYUFBYSxDQUNwQixTQUFpQixFQUNqQixhQUFxQjtJQUVyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGFBQWEsQ0FBQztJQUN2RSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxD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