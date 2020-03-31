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
function getTimestamps(mediaTime, mediaDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - mediaTime + mediaDuration;
    return [Math.floor(startTime / 1000), endTime];
}
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
    for (let tag of collection) {
        if (tag.getAttribute("name") === tagName)
            return tag;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN2QyxDQUFDLEVBQ0YsTUFBTSxHQUFZLEtBQUssRUFDdkIsTUFBTSxHQUFZLEtBQUssRUFDdkIsSUFBWSxFQUNaLE9BQWUsRUFDZixDQUFTLEVBQ1QsS0FBSyxHQUFHO0lBRU4sSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsSUFBSTtJQUNaLEtBQUssRUFBRSxTQUFTO0lBQ2hCLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLElBQUk7SUFDWixRQUFRLEVBQUUsSUFBSTtJQUNkLEtBQUssRUFBRSxJQUFJO0lBQ1gsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtJQUNaLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQztBQUVKLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQ0UsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDakMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUM3RDtRQUNBLElBQUksSUFBSSxHQUFpQjtZQUN2QixhQUFhLEVBQUUsS0FBSztTQUNyQixDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1B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QyxDQUFDLENBQUM7NEJBQzlELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzVCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDOzRCQUN6QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7NEJBQ3hELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDOzRCQUM1QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQzlELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBRTVCLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUFFOzRCQUMvRCxNQUFNLEdBQUcsSUFBSSxDQUFDOzRCQUNkLE1BQU0sQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO2dDQUMxQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0NBQzFELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUM7NEJBQzFCLE1BQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDO2dDQUN6QixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0NBQ3hELENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFL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