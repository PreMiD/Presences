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
    mediaKeys: false
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
                data.details = (media.title ? media.title : media.track_number ? "Track N°" + media.track_number : "A song")
                    + (media.album ? " on " + media.album : "");
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
            data.smallImageKey = (media.loop === "true" && media.repeat === "false") ? "repeat"
                : (media.repeat === "true" && media.loop === "false") ? "repeat-one"
                    : (media.state === "playing") ? "play" : "pause";
            data.smallImageText = (media.loop === "true" && media.repeat === "false") ? "All on loop"
                : (media.repeat === "true" && media.loop === "false") ? "On loop"
                    : (media.state === "playing") ? (yield strings).play : (yield strings).pause;
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
                    req.responseXML.getElementsByName("filename")[0] ?
                        media.filename = req.responseXML.getElementsByName("filename")[0].textContent : media.filename = null;
                    req.responseXML.getElementsByName("title")[0] ?
                        media.title = req.responseXML.getElementsByName("title")[0].textContent : media.title = null;
                    req.responseXML.getElementsByName("showName")[0] ?
                        media.showName = req.responseXML.getElementsByName("showName")[0].textContent : media.showName = null;
                    if (req.responseXML.getElementsByName("artist")[0] || req.responseXML.getElementsByName("album")[0]) {
                        isSong = true;
                        req.responseXML.getElementsByName("artist")[0] ? media.artist = req.responseXML.getElementsByName("artist")[0].textContent : media.artist = null;
                        req.responseXML.getElementsByName("album")[0] ? media.album = req.responseXML.getElementsByName("album")[0].textContent : media.album = null;
                    }
                    else {
                        isSong = false;
                        media.artist = null;
                        media.album = null;
                    }
                    req.responseXML.getElementsByName("track_number")[0] ?
                        media.track_number = req.responseXML.getElementsByName("track_number")[0].textContent : media.track_number = null;
                    if (req.responseXML.getElementsByName("seasonNumber")[0] && req.responseXML.getElementsByName("episodeNumber")[0]) {
                        isShow = true;
                        media.seasonNumber = req.responseXML.getElementsByName("seasonNumber")[0].textContent;
                        media.episodeNumber = req.responseXML.getElementsByName("episodeNumber")[0].textContent;
                    }
                    else {
                        isShow = false;
                        media.seasonNumber = null;
                        media.episodeNumber = null;
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
        };
        req.open("GET", document.location.protocol + "//" + document.location.hostname + ":"
            + (document.location.port ? document.location.port : '') + "/requests/status.xml", true);
        req.send();
    }
}, 2000);
function setLoop(f, ms) {
    f();
    return setInterval(f, ms);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM5QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7SUFDakMsUUFBUSxFQUFFLDRCQUE0QjtDQUN6QyxDQUFDLEVBQ0UsTUFBTSxHQUFZLEtBQUssRUFDdkIsTUFBTSxHQUFZLEtBQUssRUFDdkIsSUFBUyxFQUFFLE9BQVksRUFBRSxDQUFNLEVBQy9CLEtBQUssR0FBRztJQUNKLElBQUksRUFBRSxJQUFJO0lBQ1YsTUFBTSxFQUFFLElBQUk7SUFDbEIsS0FBSyxFQUFFLFNBQVM7SUFDaEIsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsSUFBSTtJQUNOLFFBQVEsRUFBRSxJQUFJO0lBQ3BCLEtBQUssRUFBRSxJQUFJO0lBQ1gsS0FBSyxFQUFFLElBQUk7SUFDUixNQUFNLEVBQUUsSUFBSTtJQUNaLFlBQVksRUFBRSxJQUFJO0lBQ2xCLFFBQVEsRUFBRSxJQUFJO0lBQ2QsWUFBWSxFQUFFLElBQUk7SUFDbEIsYUFBYSxFQUFFLElBQUk7Q0FDdkIsQ0FBQztBQUdGLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUVwQyxJQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBRW5HLElBQUksSUFBSSxHQUFpQjtZQUNyQixhQUFhLEVBQUUsS0FBSztTQUN2QixDQUFDO1FBRUYs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