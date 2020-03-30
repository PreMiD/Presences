var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let presence = new Presence({
    clientId: "653639828826750976",
    
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
let iframe_response = new video_data;
presence.on("iFrameData", data => {
    iframe_response = data;
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const path = document.location.pathname;
    let presenceData = {
        largeImageKey: "cytube_logo",
        details: "loading",
        state: "CyTube"
    };
    let translate = {
        pause: (yield strings).pause,
        play: (yield strings).play
    };
    function set_video(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let current_service = service(data.site);
            presenceData.details = `Watching ${document.getElementById('currenttitle').textContent.replace('Currently Playing:', '')}
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
        });
    }
    if (path.includes('/r/')) {
        let container = !(document.body.className.includes('chatOnly') || !document.getElementById('videowrap'));
        let active_content = iframe_response.site;
        let room = path.split('r/')[1];
        let motd = document.getElementById('motd').textContent;
        presenceData.state = `${motd} - /r/${room}`;
        if (!container) {
            presenceData.details = "Chatting";
            presenceData.startTimestamp = Math.floor(Date.now() / 1000);
        }
        else {
            if (!document.getElementById('videowrap').querySelector("video")) {
                presenceData.details = 'Waiting to Start';
                presenceData.smallImageKey = 'presence_playback_waiting';
                presenceData.smallImageText = 'Waiting';
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
                if (active_content)
                    set_video(iframe_response);
            }
            else {
                let video = document.getElementById('videowrap').querySelector("video");
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
    else if (path == '/') {
        presenceData.details = "On Homepage";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (path.includes('/account/')) {
        presenceData.details = "Managing Account";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    else if (path == '/contact') {
        presenceData.details = "Contacting Support";
        presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    }
    presence.setActivity(presenceData, true);
}));
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
    Object.keys(matches).forEach((key) => {
        if (service.includes(key))
            return_match = matches[key];
    });
    return return_match;
}
let matches = {
    "youtube": {
        display: "YouTube",
        image_key: "cytube_service_yt"
    },
    "googlevideo": {
        display: "YouTube",
        image_key: "cytube_service_yt"
    },
    "docs.google": {
        display: "Google Drive",
        image_key: "cytube_service_gd"
    },
    "googleusercontent": {
        display: "Google Drive",
        image_key: "cytube_service_gd"
    },
    "appspot": {
        display: "Google Cloud",
        image_key: "cytube_service_gc"
    },
    "blogspot": {
        display: "Google Cloud",
        image_key: "cytube_service_gc"
    },
    "dropbox": {
        display: "Dropbox",
        image_key: "cytube_service_dbx"
    },
    "amazonaws": {
        display: "Amazon AWS",
        image_key: "cytube_service_aws"
    },
    "soundcloud": {
        display: "Soundcloud",
        image_key: "cytube_service_sc"
    },
    "discordapp": {
        display: "Discord",
        image_key: "cytube_service_dc"
    },
    "vimeo-prod-": {
        display: "Vimeo",
        image_key: "cytube_service_ve"
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFDRSxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUMxQixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLEtBQUssRUFBRSwwQkFBMEI7Q0FDeEMsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVO0lBQWhCO1FBQ0ksVUFBSyxHQUFZLEtBQUssQ0FBQTtRQUN0QixXQUFNLEdBQVksSUFBSSxDQUFBO1FBQ3RCLGFBQVEsR0FBRyxDQUFDLENBQUE7UUFDWixpQkFBWSxHQUFHLENBQUMsQ0FBQTtRQUNoQixTQUFJLEdBQUcsU0FBUyxDQUFBO0lBQ3BCLENBQUM7Q0FBQTtBQUVELElBQUksZUFBZSxHQUFHLElBQUksVUFBVSxDQUFBO0FBRXBDLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO0lBQzdCLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxHQUFTLEVBQUU7SUFDakMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEMsSUFBSSxZQUFZLEdBQWlCO1FBQzdCLGFBQWEsRUFBRSxhQUFhO1FBQzVCLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxRQUFRO0tBQ2xCLENBQUE7SUFFRCxJQUFJLFNBQVMsR0FBRztRQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsS0FBSztRQUM1QixJQUFJLEVBQUUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLElBQUk7S0FDN0IsQ0FBQTtJQUVELFNBQWUsU0FBUyxDQUFDLElBQWdCOztZQUNyQyxJQUFJLElBQUksR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksSUFBSSxHQUFXLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQy9ELElBQUksZUFBZSxHQUFVLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7WUFFL0MsWUFBWSxDQUFDLE9BQU8sR0FBRyxZQUNuQixRQUFRLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUMsRUFBRSxDQUFDO2dCQUNoRixlQUFlLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFbEMsWUFBWSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDO1lBRXZELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQzdCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUM1QixDQUFDO1lBRUYsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNiLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUNuQyxZQUFZLENBQUMsYUFBYSxHQUFHLDBCQUEwQixDQUFBO2dCQUN2RCxZQUFZLENBQUMsY0FBYyxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssTUFBTSxZQUFZLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUE7YUFDMUY7aUJBQU07Z0JBQ0gsWUFBWSxDQUFDLGNBQWMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzNDLFlBQVksQ0FBQyxZQUFZLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUN6QyxZQUFZLENBQUMsYUFBYSxHQUFHLDJCQUEyQixDQUFBO2dCQUN4RCxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUE7YUFDL0M7UUFDTCxDQUFDO0tBQUE7SUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxTQUFTLEdBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNsSCxJQUFJLGNBQWMsR0FBWSxlQUFlLENBQUMsSUFBSSxDQUFDO1FBQ25ELElBQUksSUFBSSxHQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxJQUFJLEdBQVcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUM7UUFFL0QsWUFBWSxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksU0FBUyxJQUFJLEVBQUUsQ0FBQztRQUM1QyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ1osWUFBWSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7WUFDbEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUMvRDthQUFNO1lBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM5RCxZQUFZLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDO2dCQUMxQyxZQUFZLENBQUMsYUFBYSxHQUFHLDJCQUEyQixDQUFDO2dCQUN6RCxZQUFZLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQztnQkFDeEMsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFFNUQsSUFBSSxjQUFjO29CQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQTthQUNqRDtpQkFBTTtnQkFDSCxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDeEUsU0FBUyxDQUFDO29CQUNOLEtBQUssRUFBRSxLQUFLO29CQUNaLFlBQVksRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDL0IsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07b0JBQ3BCLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRztpQkFDbEIsQ0FBQyxDQUFBO2FBQ0w7U0FFSjtLQUNKO1NBQU0sSUFBSSxJQUFJLElBQUksR0FBRyxFQUFFO1FBQ3BCLFlBQVksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDO1FBQ3JDLFlBQVksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDL0Q7U0FBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDbkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQztRQUMxQyxZQUFZLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxJQUFJLElBQUksVUFBVSxFQUFFO1FBQzNCLFlBQVksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUE7UUFDM0MsWUFBWSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUMvRDtJQUNELFFBQVEsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFPSCxTQUFTLGFBQWEsQ0FBQyxTQUFpQixFQUFFLGFBQXFCO0lBQzNELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMzQixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxTQUFTLEdBQUcsYUFBYSxDQUFDO0lBQ3ZFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBR0QsU0FBUyxZQUFZLENBQUMsSUFBSTtJQUN0QixJQUFJLEVBQ0EsR0FBRyxFQUNILEdBQUcsRUFDSCxHQUFHLEVBQ04sR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuRSxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsRUFBRTtJQUN0QixNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFDNUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQzFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM1QixPQUFPO1FBQ0gsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsR0FBRztRQUNSLEdBQUcsRUFBRSxHQUFHO0tBQ1gsQ0FBQztBQUNOLENBQUM7QUFFRCxTQUFTLE9BQU8sQ0FBRSxPQUFlO0lBQzdCLElBQUksWUFBWSxHQUFVO1FBQ3RCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsU0FBUyxFQUFFLG1CQUFtQjtLQUNqQyxDQUFBO0lBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUVqQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMzRCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sWUFBWSxDQUFDO0FBQ3hCLENBQUM7QUFXRCxJQUFJLE9BQU8sR0FBYztJQUNyQixTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsU0FBUztRQUNsQixTQUFTLEVBQUUsbUJBQW1CO0tBQ2pDO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsT0FBTyxFQUFFLFNBQVM7UUFDbEIsU0FBUyxFQUFFLG1CQUFtQjtLQUNqQztJQUNELGFBQWEsRUFBRTtRQUNYLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFNBQVMsRUFBRSxtQkFBbUI7S0FDakM7SUFDRCxtQkFBbUIsRUFBRTtRQUNqQixPQUFPLEVBQUUsY0FBYztRQUN2QixTQUFTLEVBQUUsbUJBQW1CO0tBQ2pDO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsT0FBTyxFQUFFLGNBQWM7UUFDdkIsU0FBUyxFQUFFLG1CQUFtQjtLQUNqQztJQUNELFVBQVUsRUFBRTtRQUNSLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFNBQVMsRUFBRSxtQkFBbUI7S0FDakM7SUFDRCxTQUFTLEVBQUU7UUFDUCxPQUFPLEVBQUUsU0FBUztRQUNsQixTQUFTLEVBQUUsb0JBQW9CO0tBQ2xDO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsT0FBTyxFQUFFLFlBQVk7UUFDckIsU0FBUyxFQUFFLG9CQUFvQjtLQUNsQztJQUNELFlBQVksRUFBRTtRQUNWLE9BQU8sRUFBRSxZQUFZO1FBQ3JCLFNBQVMsRUFBRSxtQkFBbUI7S0FDakM7SUFDRCxZQUFZLEVBQUU7UUFDVixPQUFPLEVBQUUsU0FBUztRQUNsQixTQUFTLEVBQUUsbUJBQW1CO0tBQ2pDO0lBQ0QsYUFBYSxFQUFFO1FBQ1gsT0FBTyxFQUFFLE9BQU87UUFDaEIsU0FBUyxFQUFFLG1CQUFtQjtLQUNqQztDQUNKLENBQUEifQ==
