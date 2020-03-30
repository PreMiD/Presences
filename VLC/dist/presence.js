var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "654399399316684802",
    
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
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.querySelector(".footer") && document.querySelector(".footer").textContent.includes("VLC")) {
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
                if (media.title && media.album && (media.title == media.album)) {
                    media.album = null;
                }
                data.details = (media.title ? media.title : media.track_number ? "Track N°" + media.track_number : "A song") +
                    (media.album ? " on " + media.album : "");
                media.artist ? data.state = "by " + media.artist :
                    data.state = media.filename;
            }
            else if (isShow) {
                media.showName ? data.details = media.showName :
                    media.title ? data.details = media.title :
                        media.filename ? data.details = media.filename : "some TV";
                data.state = "S" + media.seasonNumber + "E" + media.episodeNumber;
            }
            else {
                media.showName ? data.details = media.showName :
                    media.title ? data.details = media.title :
                        media.filename ? data.details = media.filename : "something";
                media.seasonNumber ? data.state = ("season " + media.seasonNumber) :
                    media.episodeNumber ? data.state = ("episode " + media.episodeNumber) : delete data.state;
            }
            if (data.details && data.details.length > 100)
                data.details = data.details.substring(0, 127);
            if (data.state && data.state.length > 100)
                data.state = data.state.substring(0, 127);
            data.smallImageKey = media.state === "paused" ? "pause" :
                (media.loop === "true" && media.repeat === "false") ? "repeat" :
                    (media.repeat === "true" && media.loop === "false") ? "repeat-one" :
                        media.state === "playing" ? "play" : "pause";
            data.smallImageText = media.state === "paused" ? (yield strings).pause :
                (media.loop === "true" && media.repeat === "false") ? "All on loop" :
                    (media.repeat === "true" && media.loop === "false") ? "On loop" :
                        media.state === "playing" ? (yield strings).play : (yield strings).pause;
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
}));
function getTimestamps(mediaTime, mediaDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - mediaTime + mediaDuration;
    return [Math.floor(startTime / 1000), endTime];
}
var getStatus = setLoop(function () {
    if (document.querySelector(".footer") && document.querySelector(".footer").textContent.includes("VLC")) {
        const req = new XMLHttpRequest();
        req.onload = function () {
            if (req.readyState === req.DONE) {
                if (req.status === 200) {
                    if (i > 0)
                        i = 0;
                    req.responseXML.getElementsByTagName("state")[0].textContent.length > 0 ?
                        media.state = req.responseXML.getElementsByTagName("state")[0].textContent : media.state = "stopped";
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
                    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                        const collection = req.responseXML.getElementsByTagName("info");
                        getTag(collection, "filename") ?
                            media.filename = decodeReq(getTag(collection, "filename")) : media.filename = null;
                        getTag(collection, "title") ?
                            media.title = decodeReq(getTag(collection, "title")) : media.title = null;
                        getTag(collection, "showName") ?
                            media.showName = decodeReq(getTag(collection, "showName")) : media.showName = null;
                        if (getTag(collection, "artist") || getTag(collection, "album")) {
                            isSong = true;
                            getTag(collection, "artist") ? media.artist = decodeReq(getTag(collection, "artist")) : media.artist = null;
                            getTag(collection, "album") ? media.album = decodeReq(getTag(collection, "album")) : media.album = null;
                        }
                        else {
                            isSong = false;
                            media.artist = null;
                            media.album = null;
                        }
                        getTag(collection, "track_number") ?
                            media.track_number = decodeReq(getTag(collection, "track_number")) : media.track_number = null;
                        if (getTag(collection, "seasonNumber") && getTag(collection, "episodeNumber")) {
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
                        req.responseXML.getElementsByName("filename")[0] ?
                            media.filename = decodeReq(req.responseXML.getElementsByName("filename")[0]) : media.filename = null;
                        req.responseXML.getElementsByName("title")[0] ?
                            media.title = decodeReq(req.responseXML.getElementsByName("title")[0]) : media.title = null;
                        req.responseXML.getElementsByName("showName")[0] ?
                            media.showName = decodeReq(req.responseXML.getElementsByName("showName")[0]) : media.showName = null;
                        if (req.responseXML.getElementsByName("artist")[0] || req.responseXML.getElementsByName("album")[0]) {
                            isSong = true;
                            req.responseXML.getElementsByName("artist")[0] ? media.artist = decodeReq(req.responseXML.getElementsByName("artist")[0]) : media.artist = null;
                            req.responseXML.getElementsByName("album")[0] ? media.album = decodeReq(req.responseXML.getElementsByName("album")[0]) : media.album = null;
                        }
                        else {
                            isSong = false;
                            media.artist = null;
                            media.album = null;
                        }
                        req.responseXML.getElementsByName("track_number")[0] ?
                            media.track_number = decodeReq(req.responseXML.getElementsByName("track_number")[0]) : media.track_number = null;
                        if (req.responseXML.getElementsByName("seasonNumber")[0] && req.responseXML.getElementsByName("episodeNumber")[0]) {
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
                        alert("Something went wrong with the request, please contact DooMLorD#2792 at https://discord.premid.app with the following infos (RES: " + req.status + " / S: " + req.readyState + ")");
                    }
                }
            }
        };
        req.onerror = function (e) {
            media.state = "stopped";
            console.log(e);
        };
        req.open("GET", document.location.protocol + "//" + document.location.hostname + ":" +
            (document.location.port ? document.location.port : '') + "/requests/status.xml", true);
        req.send();
    }
}, ((navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? 5 : 2) * 1000));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN6QyxDQUFDLEVBQ0YsTUFBTSxHQUFZLEtBQUssRUFDdkIsTUFBTSxHQUFZLEtBQUssRUFDdkIsSUFBWSxFQUFFLE9BQWUsRUFBRSxDQUFTLEVBQ3hDLEtBQUssR0FBRztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLElBQUk7SUFDWixLQUFLLEVBQUUsU0FBUztJQUNoQixJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxJQUFJO0lBQ1osUUFBUSxFQUFFLElBQUk7SUFDZCxLQUFLLEVBQUUsSUFBSTtJQUNYLEtBQUssRUFBRSxJQUFJO0lBQ1gsTUFBTSxFQUFFLElBQUk7SUFDWixZQUFZLEVBQUUsSUFBSTtJQUNsQixRQUFRLEVBQUUsSUFBSTtJQUNkLFlBQVksRUFBRSxJQUFJO0lBQ2xCLGFBQWEsRUFBRSxJQUFJO0NBQ3RCLENBQUM7QUFHTixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFFakMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUVwRyxJQUFJLElBQUksR0FBaUI7WUFDckIsYUFBYSxFQUFFLEtBQUs7U0FDdkIsQ0FBQztRQUVGLElB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