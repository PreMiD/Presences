let iframe = new iFrame();
let anime;
iframe.on("UpdateData", async () => {
    if (document.querySelector("#video-player") !== null) {
        anime = document.querySelector("#video-player");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
        anime = document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#video_1_html5_api") !== null) {
        anime = document.querySelector("#video_1_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#player > div.jw-media.jw-reset > video") !== null) {
        anime = document.querySelector("#player > div.jw-media.jw-reset > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#hola_html5_api") !== null) {
        anime = document.querySelector("#hola_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("div.html5-video-container > video") !== null) {
        anime = document.querySelector("div.html5-video-container > video");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#videojs_html5_api") !== null) {
        anime = document.querySelector("#videojs_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#olvideo_html5_api") !== null) {
        anime = document.querySelector("#olvideo_html5_api");
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
    if (document.querySelector("#vplayer").getElementsByTagName("video")[0] !== null) {
        anime = document.querySelector("#vplayer").getElementsByTagName("video")[0];
        if (anime != undefined && !isNaN(anime.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: anime.currentTime,
                    duration: anime.duration,
                    paused: anime.paused
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxLQUFLLENBQUM7QUFDVixNQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxLQUFLLElBQUksRUFBRTtJQUNsQyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JELEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNsRSxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNkLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNuQjthQUNELENBQUMsQ0FBQztTQUNIO0tBQ0Q7SUFDRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUVBQWlFLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkcsS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLGlFQUFpRSxDQUFDLENBQUM7UUFDcEgsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFlBQVksRUFBRTtvQkFDZCxXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ3hCLE1BQU0s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