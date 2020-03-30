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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDakMsQ0FBQyxDQUFDO0FBRUosTUFBTSxVQUFVO0lBQWhCO1FBQ0MsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUN2QixXQUFNLEdBQVksSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixpQkFBWSxHQUFHLENBQUMsQ0FBQztRQUNqQixTQUFJLEdBQUcsU0FBUyxDQUFDO0lBQ2xCLENBQUM7Q0FBQTtBQUVELElBQUksZUFBZSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7QUFFdkMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEVBQUU7SUFDaEMsZUFBZSxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksWUFBWSxHQUFpQjtRQUNoQyxhQUFhLEVBQUUsYUFBYTtRQUM1QixPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsUUFBUTtLQUNmLENBQUM7SUFFRixJQUFJLFNBQVMsR0FBRztRQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztRQUM1QixJQUFJLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7S0FDMUIsQ0FBQztJQUVGLEtBQUss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