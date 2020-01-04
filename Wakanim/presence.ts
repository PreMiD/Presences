var presence, strings, browsingStamp;

presence = new Presence({
    clientId: "662841394171346955",
    mediaKeys: false,
});
strings = presence.getStrings({
    playing: "presence.playback.playing",
    paused: "presence.playback.paused",
    browsing: "presence.activity.browsing"
});
browsingStamp = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {
    var presenceData: presenceData = {largeImageKey: "wakanim"};
    var path = document.location.pathname;
    var video = document.querySelector("video");

    if (path.includes("/v2/catalogue/episode/") && video != null) {
        browsingStamp = Math.floor(Date.now()/1000);
        presenceData.details = document.querySelector(".episode_title").innerHTML;
        presenceData.state = capitalize(document.querySelector(".episode_subtitle").innerText);

        if (video.paused) {
            presenceData.smallImageKey = "paused";
            presenceData.smallImageText = (await strings).paused;
        } else {
            var timestamps = getTimestamps(video.currentTime, video.duration);
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "playing";
            presenceData.smallImageText = (await strings).playing;
        }
    } else {
        presenceData.details = (await strings).browsing;
        presenceData.startTimestamp = browsingStamp;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }
});

function getTimestamps(videoTime: number, videoDuration: number) {
    var startTime = Math.floor(Date.now()/1000);
    var endTime = Math.floor(startTime + (videoDuration - videoTime));

    return [startTime, endTime];
}

function capitalize(text) {
    text = text.toLowerCase().split(" ");
    for (var i = 0, x = text.length; i < x; i++) {
        text[i] = text[i][0].toUpperCase() + text[i].substr(1);
    }

    return text.join(" ");
}