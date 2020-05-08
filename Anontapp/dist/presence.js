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
var oldUrl, elapsed;
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
                catch {
                }
            }
            else {
                data.details = 'Watching Movie';
                try {
                    data.state = state[0];
                    await parseVideo();
                }
                catch {
                }
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