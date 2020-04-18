var presence = new Presence({
    clientId: "654399399316684802"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused",
    browsing: "presence.activity.browsing"
}), isShow = false, isSong = false, prev, elapsed, i, media = {
    time: null,
    length: null,
    state: "stopped",
    loop: null,
    repeat: null,
    filename: null,
    title: null,
    album: null,
    artist: null,
    track_number: null,
    showName: null,
    seasonNumber: null,
    episodeNumber: null
};
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function setLoop(f, ms) {
    f();
    return setInterval(f, ms);
}
function decodeReq(entity) {
    var txt = document.createElement("textarea");
    txt.innerHTML = entity.textContent;
    return txt.value;
}
function getTag(collection, tagName) {
    for (const tag of collection) {
        if (tag.getAttribute("name") === tagName)
            return tag;
    }
}
presence.on("UpdateData", async () => {
    if (document.querySelector(".footer") &&
        document.querySelector(".footer").textContent.includes("VLC")) {
        var data = {
            largeImageKey: "vlc"
        };
        var timestamps = getTimestamps(Number(media.time), Number(media.length));
        if (media.state !== prev) {
            prev = media.state;
            elapsed = Math.floor(Date.now() / 1000);
        }
        if (media.state == "playing" || media.state == "paused") {
            if (isSong) {
                if (media.title && media.album && media.title == media.album) {
                    media.album = null;
                }
                data.details =
                    (media.title
                        ? media.title
                        : media.track_number
                            ? "Track N°" + media.track_number
                            : "A song") + (media.album ? " on " + media.album : "");
                media.artist
                    ? (data.state = "by " + media.artist)
                    : (data.state = media.filename);
            }
            else if (isShow) {
                media.showName
                    ? (data.details = media.showName)
                    : media.title
                        ? (data.details = media.title)
                        : media.filename
                            ? (data.details = media.filename)
                            : (data.details = "some TV");
                data.state = "S" + media.seasonNumber + "E" + media.episodeNumber;
            }
            else {
                media.showName
                    ? (data.details = media.showName)
                    : media.title
                        ? (data.details = media.title)
                        : media.filename
                            ? (data.details = media.filename)
                            : (data.details = "something");
                media.seasonNumber
                    ? (data.state = "season " + media.seasonNumber)
                    : media.episodeNumber
                        ? (data.state = "episode " + media.episodeNumber)
                        : delete data.state;
            }
            if (data.details && data.details.length > 100)
                data.details = data.details.substring(0, 127);
            if (data.state && data.state.length > 100)
                data.state = data.state.substring(0, 127);
            data.smallImageKey =
                media.state === "paused"
                    ? "pause"
                    : media.loop === "true" && media.repeat === "false"
                        ? "repeat"
                        : media.repeat === "true" && media.loop === "false"
                            ? "repeat-one"
                            : media.state === "playing"
                                ? "play"
                                : "pause";
            data.smallImageText =
                media.state === "paused"
                    ? (await strings).pause
                    : media.loop === "true" && media.repeat === "false"
                        ? "All on loop"
                        : media.repeat === "true" && media.loop === "false"
                            ? "On loop"
                            : media.state === "playing"
                                ? (await strings).play
                                : (await strings).pause;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (media.state == "playing") {
                presence.setActivity(data, true);
            }
            else {
                delete data.startTimestamp;
                delete data.endTimestamp;
                presence.setActivity(data, false);
            }
        }
        else if (media.state == "stopped") {
            data.details = "standby";
            delete data.state;
            delete data.smallImageKey;
            delete data.smallImageText;
            data.startTimestamp = elapsed;
            delete data.endTimestamp;
            presence.setActivity(data, false);
        }
    }
});
var getStatus = setLoop(function () {
    if (document.querySelector(".footer") &&
        document.querySelector(".footer").textContent.includes("VLC")) {
        const req = new XMLHttpRequest();
        req.onload = function () {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    if (i > 0)
                        i = 0;
                    req.responseXML.getElementsByTagName("state")[0].textContent.length >
                        0
                        ? (media.state = req.responseXML.getElementsByTagName("state")[0].textContent)
                        : (media.state = "stopped");
                    if (media.state !== "stopped") {
                        media.time = req.responseXML.getElementsByTagName("time")[0].textContent;
                        media.length = req.responseXML.getElementsByTagName("length")[0].textContent;
                        media.loop = req.responseXML.getElementsByTagName("loop")[0].textContent;
                        media.repeat = req.responseXML.getElementsByTagName("repeat")[0].textContent;
                    }
                    else {
                        media.time = null;
                        media.length = null;
                        media.loop = null;
                        media.repeat = null;
                    }
                    if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
                        const collection = req.responseXML.getElementsByTagName("info");
                        getTag(collection, "filename")
                            ? (media.filename = decodeReq(getTag(collection, "filename")))
                            : (media.filename = null);
                        getTag(collection, "title")
                            ? (media.title = decodeReq(getTag(collection, "title")))
                            : (media.title = null);
                        getTag(collection, "showName")
                            ? (media.showName = decodeReq(getTag(collection, "showName")))
                            : (media.showName = null);
                        if (getTag(collection, "artist") || getTag(collection, "album")) {
                            isSong = true;
                            getTag(collection, "artist")
                                ? (media.artist = decodeReq(getTag(collection, "artist")))
                                : (media.artist = null);
                            getTag(collection, "album")
                                ? (media.album = decodeReq(getTag(collection, "album")))
                                : (media.album = null);
                        }
                        else {
                            isSong = false;
                            media.artist = null;
                            media.album = null;
                        }
                        getTag(collection, "track_number")
                            ? (media.track_number = decodeReq(getTag(collection, "track_number")))
                            : (media.track_number = null);
                        if (getTag(collection, "seasonNumber") &&
                            getTag(collection, "episodeNumber")) {
                            isShow = true;
                            media.seasonNumber = decodeReq(getTag(collection, "seasonNumber"));
                            media.episodeNumber = decodeReq(getTag(collection, "episodeNumber"));
                        }
                        else {
                            isShow = false;
                            media.seasonNumber = null;
                            media.episodeNumber = null;
                        }
                    }
                    else {
                        req.responseXML.getElementsByName("filename")[0]
                            ? (media.filename = decodeReq(req.responseXML.getElementsByName("filename")[0]))
                            : (media.filename = null);
                        req.responseXML.getElementsByName("title")[0]
                            ? (media.title = decodeReq(req.responseXML.getElementsByName("title")[0]))
                            : (media.title = null);
                        req.responseXML.getElementsByName("showName")[0]
                            ? (media.showName = decodeReq(req.responseXML.getElementsByName("showName")[0]))
                            : (media.showName = null);
                        if (req.responseXML.getElementsByName("artist")[0] ||
                            req.responseXML.getElementsByName("album")[0]) {
                            isSong = true;
                            req.responseXML.getElementsByName("artist")[0]
                                ? (media.artist = decodeReq(req.responseXML.getElementsByName("artist")[0]))
                                : (media.artist = null);
                            req.responseXML.getElementsByName("album")[0]
                                ? (media.album = decodeReq(req.responseXML.getElementsByName("album")[0]))
                                : (media.album = null);
                        }
                        else {
                            isSong = false;
                            media.artist = null;
                            media.album = null;
                        }
                        req.responseXML.getElementsByName("track_number")[0]
                            ? (media.track_number = decodeReq(req.responseXML.getElementsByName("track_number")[0]))
                            : (media.track_number = null);
                        if (req.responseXML.getElementsByName("seasonNumber")[0] &&
                            req.responseXML.getElementsByName("episodeNumber")[0]) {
                            isShow = true;
                            media.seasonNumber = decodeReq(req.responseXML.getElementsByName("seasonNumber")[0]);
                            media.episodeNumber = decodeReq(req.responseXML.getElementsByName("episodeNumber")[0]);
                        }
                        else {
                            isShow = false;
                            media.seasonNumber = null;
                            media.episodeNumber = null;
                        }
                    }
                }
                else {
                    i++;
                    if (i > 4) {
                        i = 0;
                        clearInterval(getStatus);
                        media.state = "stopped";
                        alert("Something went wrong with the request, please contact DooMLorD#2792 at https://discord.premid.app with the following infos (RES: " +
                            req.status +
                            " / S: " +
                            req.readyState +
                            ")");
                    }
                }
            }
        };
        req.onerror = function (e) {
            media.state = "stopped";
            console.log(e);
        };
        req.open("GET", document.location.protocol +
            "//" +
            document.location.hostname +
            ":" +
            (document.location.port ? document.location.port : "") +
            "/requests/status.xml", true);
        req.send();
    }
}, (navigator.userAgent.toLowerCase().indexOf("firefox") > -1 ? 5 : 2) * 1000);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLEVBQ0YsTUFBTSxHQUFHLEtBQUssRUFDZCxNQUFNLEdBQUcsS0FBSyxFQUNkLElBQVksRUFDWixPQUFlLEVBQ2YsQ0FBUyxFQUNULEtBQUssR0FBRztJQUVOLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLElBQUk7SUFDWixLQUFLLEVBQUUsU0FBUztJQUNoQixJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxJQUFJO0lBQ1osUUFBUSxFQUFFLElBQUk7SUFDZCxLQUFLLEVBQUUsSUFBSTtJQUNYLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLElBQUk7SUFDWixZQUFZLEVBQUUsSUFBSTtJQUNsQixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFPSixTQUFTLGFBQWEsQ0FDcEIsU0FBaUIsRUFDakIsYUFBcUI7SUFFckIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzNCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxhQUFhLENBQUM7SUFDdkUsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0FBQ2pELENB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