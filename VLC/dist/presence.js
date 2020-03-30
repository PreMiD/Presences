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
                            : "some TV";
                data.state = "S" + media.seasonNumber + "E" + media.episodeNumber;
            }
            else {
                media.showName
                    ? (data.details = media.showName)
                    : media.title
                        ? (data.details = media.title)
                        : media.filename
                            ? (data.details = media.filename)
                            : "something";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN0QyxDQUFDLEVBQ0YsTUFBTSxHQUFZLEtBQUssRUFDdkIsTUFBTSxHQUFZLEtBQUssRUFDdkIsSUFBWSxFQUNaLE9BQWUsRUFDZixDQUFTLEVBQ1QsS0FBSyxHQUFHO0lBRVAsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsSUFBSTtJQUNaLEtBQUssRUFBRSxTQUFTO0lBQ2hCLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLElBQUk7SUFDWixRQUFRLEVBQUUsSUFBSTtJQUNkLEtBQUssRUFBRSxJQUFJO0lBQ1gsS0FBSyxFQUFFLElBQUk7SUFDWCxNQUFNLEVBQUUsSUFBSTtJQUNaLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7Q0FDbkIsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQ0MsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7UUFDakMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUM1RDtRQUNELElBQUksSUFBSSxHQUFpQjtZQUN4QixhQUFhLEVBQUUsS0FBSztTQUNwQixDQUFDO1FBRUYsSUFBSSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1B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