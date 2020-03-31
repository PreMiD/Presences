let presence = new Presence({
    clientId: "653639828826750976"
}), strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
});
class video_data {
    constructor() {
        this.audio = false;
        this.paused = true;
        this.duration = 0;
        this.current_time = 0;
        this.site = undefined;
    }
}
let iframe_response = new video_data();
presence.on("iFrameData", data => {
    iframe_response = data;
});
presence.on("UpdateData", async () => {
    const path = document.location.pathname;
    let presenceData = {
        largeImageKey: "cytube_logo",
        details: "loading",
        state: "CyTube"
    };
    let translate = {
        pause: (await strings).pause,
        play: (await strings).play
    };
    async function set_video(data) {
        let current_service = service(data.site);
        presenceData.details = `Watching ${document
            .getElementById("currenttitle")
            .textContent.replace("Currently Playing:", "")}
            - ${current_service.display}`;
        presenceData.largeImageKey = current_service.image_key;
        let timestamps = getTimestamps(Math.floor(data.current_time), Math.floor(data.duration));
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
        let container = !(document.body.className.includes("chatOnly") ||
            !document.getElementById("videowrap"));
        let active_content = iframe_response.site;
        let room = path.split("r/")[1];
        let motd = document.getElementById("motd").textContent;
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
                let video = document.getElementById("videowrap").querySelector("video");
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
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTimestamp(time) {
    let { sec, min, hrs } = getTimesFromMs(time);
    return hrs > 0 ? hrs + ":" + min + ":" + sec : min + ":" + sec;
}
function getTimesFromMs(ms) {
    const p60 = x => Math.floor(x % 60);
    let sec = p60(ms) < 10 ? "0" + p60(ms) : p60(ms), min = p60(ms / 60) <= 0 ? 0 : p60(ms / 60), hrs = p60(ms / 60 / 60);
    return {
        hrs: hrs,
        sec: sec,
        min: min
    };
}
function service(service) {
    let return_match = {
        display: "Unknown Service",
        image_key: "cytube_service_uk"
    };
    Object.keys(matches).forEach(key => {
        if (service.includes(key))
            return_match = matches[key];
    });
    return return_match;
}
let matches = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM1QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDbEMsQ0FBQyxDQUFDO0FBRUwsTUFBTSxVQUFVO0lBQWhCO1FBQ0UsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixTQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ25CLENBQUM7Q0FBQTtBQUVELElBQUksZUFBZSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFdkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDL0IsZUFBZSxHQUFHLElBQUksQ0FBQztBQUN6QixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksWUFBWSxHQUFpQjtRQUMvQixhQUFhLEVBQUUsYUFBYTtRQUM1QixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNoQixDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUc7UUFDZCxLQUFLLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLEtBQUs7UUFDNUIsSUFBSSxFQUFFLENBQUMsTUFBTSxPQUFPLENBQUMsQ0FBQyxJQUFJO0tBQzNCLENBQUM7SUFFRixLQUFL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