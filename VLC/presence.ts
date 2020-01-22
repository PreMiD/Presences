var presence = new Presence({
        clientId: "654399399316684802",
        mediaKeys: false
    }),
    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        browsing: "presence.activity.browsing"
    }),
    isShow: boolean = false,
    isSong: boolean = false,
    prev: any, elapsed: any, i: any,
    media = { // anyone is welcome to suggest more metadata via GH issues
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

    if (document.querySelector(".footer") && document.querySelector(".footer").textContent.includes("VLC")) {

        var data: presenceData = {
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
            } else if (isShow) {
                media.showName ? data.details = media.showName :
                    media.title ? data.details = media.title :
                    media.filename ? data.details = media.filename : "some TV";
                data.state = "S" + media.seasonNumber + "E" + media.episodeNumber;
            } else {
                media.showName ? data.details = media.showName :
                    media.title ? data.details = media.title :
                    media.filename ? data.details = media.filename : "something";
                media.seasonNumber ? data.state = ("season " + media.seasonNumber) :
                    media.episodeNumber ? data.state = ("episode " + media.episodeNumber) : delete data.state;
            }

            if (data.details && data.details.length > 100) data.details = data.details.substring(0, 127);
            if (data.state && data.state.length > 100) data.state = data.state.substring(0, 127);

            data.smallImageKey = (media.loop === "true" && media.repeat === "false") ? "repeat" :
                (media.repeat === "true" && media.loop === "false") ? "repeat-one" :
                (media.state === "playing") ? "play" : "pause";
            data.smallImageText = (media.loop === "true" && media.repeat === "false") ? "All on loop" :
                (media.repeat === "true" && media.loop === "false") ? "On loop" :
                (media.state === "playing") ? (await strings).play : (await strings).pause;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];

            if (media.state == "playing") {

                presence.setActivity(data, true);

            } else {

                delete data.startTimestamp;
                delete data.endTimestamp;
                presence.setActivity(data, false);

            }

        } else if (media.state == "stopped") {

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

function getTimestamps(mediaTime: any, mediaDuration: any) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - mediaTime + mediaDuration;
    return [Math.floor(startTime / 1000), endTime];
}

var getStatus = setLoop(function() {

    if (document.querySelector(".footer") && document.querySelector(".footer").textContent.includes("VLC")) {

        const req = new XMLHttpRequest();
        // jquery sucks!!!

        req.onload = function() {
            if (req.readyState === req.DONE) {

                if (req.status === 200) {

                    if (i > 0) i = 0;

                    req.responseXML.getElementsByTagName("state")[0].textContent.length > 0 ?
                        media.state = req.responseXML.getElementsByTagName("state")[0].textContent : media.state = "stopped";

                    if (media.state !== "stopped") {
                        media.time = req.responseXML.getElementsByTagName("time")[0].textContent;
                        media.length = req.responseXML.getElementsByTagName("length")[0].textContent;
                        media.loop = req.responseXML.getElementsByTagName("loop")[0].textContent;
                        media.repeat = req.responseXML.getElementsByTagName("repeat")[0].textContent;
                    } else {
                        media.time = null;
                        media.length = null;
                        media.loop = null;
                        media.repeat = null;
                    }

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
                    } else {
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
                    } else {
                        isShow = false;
                        media.seasonNumber = null;
                        media.episodeNumber = null;
                    }

                } else {

                    i++;
                    if (i > 4) {
                        i = 0;

                        clearInterval(getStatus);
                        media.state = "stopped";
                        alert("Something went wrong with the request, please contact DooMLorD#2792 at https://discord.premid.app with the following infos (RES: " + req.status + " / S: " + req.readyState + ")");
                    }
                }
            }
        }

        req.onerror = function(e) {
            media.state = "stopped";
        };

        req.open("GET", document.location.protocol + "//" + document.location.hostname + ":" +
            (document.location.port ? document.location.port : '') + "/requests/status.xml", true);
        req.send();

    }

}, 2000); // if you lower it, you may as well microwave the CPU

function setLoop(f, ms) {
    f();
    return setInterval(f, ms);
}

function decodeReq(entity) {
    // decoding HTML entities the stackoverflow way 
    var txt = document.createElement("textarea");
    txt.innerHTML = entity.textContent;
    return txt.value;
}