var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    var video;
    if (document.querySelector("#dogevideo_html5_api") !== null) {
        video = document.querySelector("#dogevideo_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#video-player") !== null) {
        video = document.querySelector("#video-player");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#vplayer > div > div.container.pointer-enabled > video") !== null) {
        video = document.querySelector("#vplayer > div > div.container.pointer-enabled > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#player > div > div.container.pointer-enabled > video") !== null) {
        video = document.querySelector("#player > div > div.container.pointer-enabled > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
        video = document.querySelector("#mediaplayer > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#vid_html5_api") !== null) {
        video = document.querySelector("#vid_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#myElement > div.jw-media.jw-reset > video") !==
        null) {
        video = document.querySelector("#myElement > div.jw-media.jw-reset > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#mgvideo > div.vjs-poster") !== null) {
        video = document.querySelector("#mgvideo > div.vjs-poster");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#olvideo_html5_api") !== null) {
        video = document.querySelector("#olvideo_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#vid_html5_api") !== null) {
        video = document.querySelector("#vid_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#videojs_html5_api") !== null) {
        video = document.querySelector("#videojs_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
        video = document.querySelector("#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#mgvideo_html5_api") !== null) {
        video = document.querySelector("#mgvideo_html5_api");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#player > div.jw-media.jw-reset > video") !== null) {
        video = document.querySelector("#player > div.jw-media.jw-reset > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
        video = document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else if (document.querySelector("video") !== null) {
        video = document.querySelector("video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFBSSxLQUF1QixDQUFDO0lBQzVCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUMzRCxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXZELElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixZQUFZLEVBQUU7b0JBQ1osV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFFBQVEsRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDM0IsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUNuQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07aUJBQ3JCO2FBQ0YsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtTQUFNLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDM0QsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7UUFFaEQsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLFlBQVksRUFBRTtvQkFDWixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ25CLE1BQU0s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