const presence = new Presence({
    clientId: "653639828826750976"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTimesFromMs(ms) {
    const floor = Math.floor(ms % 60);
    const sec = floor < 10 ? 0 + floor : floor, min = floor / 60 <= 0 ? 0 : floor / 60, hrs = floor / 60 / 60;
    return {
        hrs: hrs,
        sec: sec,
        min: min
    };
}
function getTimestamp(time) {
    const { sec, min, hrs } = getTimesFromMs(time);
    return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}
const matches = {
    youtube: {
        display: "YouTube",
        image_key: "cytube_service_yt"
    },
    googlevideo: {
        display: "YouTube",
        image_key: "cytube_service_yt"
    },
    "docs.google": {
        display: "Google Drive",
        image_key: "cytube_service_gd"
    },
    googleusercontent: {
        display: "Google Drive",
        image_key: "cytube_service_gd"
    },
    appspot: {
        display: "Google Cloud",
        image_key: "cytube_service_gc"
    },
    blogspot: {
        display: "Google Cloud",
        image_key: "cytube_service_gc"
    },
    dropbox: {
        display: "Dropbox",
        image_key: "cytube_service_dbx"
    },
    amazonaws: {
        display: "Amazon AWS",
        image_key: "cytube_service_aws"
    },
    soundcloud: {
        display: "Soundcloud",
        image_key: "cytube_service_sc"
    },
    discordapp: {
        display: "Discord",
        image_key: "cytube_service_dc"
    },
    "vimeo-prod-": {
        display: "Vimeo",
        image_key: "cytube_service_ve"
    }
};
function service(service) {
    let return_match = {
        display: "Unknown Service",
        image_key: "cytube_service_uk"
    };
    Object.keys(matches).forEach((key) => {
        if (service.includes(key))
            return_match = matches[key];
    });
    return return_match;
}
class VideoData {
    constructor() {
        this.audio = false;
        this.paused = true;
        this.duration = 0;
        this.current_time = 0;
        this.site = undefined;
    }
}
let iframe_response = new VideoData();
presence.on("iFrameData", (data) => {
    iframe_response = data;
});
presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    const presenceData = {
        largeImageKey: "cytube_logo",
        details: "loading",
        state: "CyTube"
    };
    const translate = {
        pause: (await strings).pause,
        play: (await strings).play
    };
    async function set_video(data) {
        const current_service = service(data.site);
        presenceData.details = `Watching ${document
            .getElementById("currenttitle")
            .textContent.replace("Currently Playing:", "")}
            - ${current_service.display}`;
        presenceData.largeImageKey = current_service.image_key;
        const timestamps = getTimestamps(Math.floor(data.current_time), Math.floor(data.duration));
        if (data.paused) {
            presenceData.startTimestamp = null;
            presenceData.smallImageKey = "presence_playback_paused";
            presenceData.smallImageText = `${translate.pause} - ${getTimestamp(data.current_time)}`;
        }
        else {
            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];
            presenceData.smallImageKey = "presence_playback_playing";
            presenceData.smallImageText = translate.play;
        }
    }
    if (path.includes("/r/")) {
        const container = !(document.body.className.includes("chatOnly") ||
            !document.getElementById("videowrap"));
        const active_content = iframe_response.site;
        const room = path.split("r/")[1];
        const motd = document.getElementById("motd").textContent;
        presenceData.state = `${motd} - /r/${room}`;
        if (!container) {
            presenceData.details = "Chatting";
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        }
        else {
            if (!document.getElementById("videowrap").querySelector("video")) {
                presenceData.details = "Waiting to Start";
                presenceData.smallImageKey = "presence_playback_waiting";
                presenceData.smallImageText = "Waiting";
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                if (active_content)
                    set_video(iframe_response);
            }
            else {
                const video = document
                    .getElementById("videowrap")
                    .querySelector("video");
                set_video({
                    audio: false,
                    current_time: video.currentTime,
                    duration: video.duration,
                    paused: video.paused,
                    site: video.src
                });
            }
        }
    }
    else if (path == "/") {
        presenceData.details = "On Homepage";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (path.includes("/account/")) {
        presenceData.details = "Managing Account";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (path == "/contact") {
        presenceData.details = "Contacting Support";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    presence.setActivity(presenceData, true);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBT0wsU0FBUyxhQUFhLENBQ3BCLFNBQWlCLEVBQ2pCLGFBQXFCO0lBRXJCLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsRUFBRTtJQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNsQyxNQUFNLEdBQUcsR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ3hDLEdBQUcsR0FBRyxLQUFLLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxFQUN0QyxHQUFHLEdBQUcsS0FBSyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDeEIsT0FBTztRQUNMLEdBQUcsRUFBRSxHQUFHO1FBQ1IsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFH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