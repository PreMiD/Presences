var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("#video-player") !== null) {
        var anime = document.querySelector("#video-player");
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
        var anime = (document.querySelector("#vstr > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video"));
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
        var anime = document.querySelector("#video_1_html5_api");
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
        var anime = (document.querySelector("#player > div.jw-media.jw-reset > video"));
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
        var anime = document.querySelector("#hola_html5_api");
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
        var anime = (document.querySelector("div.html5-video-container > video"));
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
        var anime = document.querySelector("#videojs_html5_api");
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
        var anime = document.querySelector("#olvideo_html5_api");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNyRCxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RSxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNwQjthQUNELENBQUMsQ0FBQztTQUNIO0tBQ0Q7SUFDRCxJQUNDLFFBQVEsQ0FBQyxhQUFhLENBQ3JCLGlFQUFpRSxDQUNqRSxLQUFLLElBQUksRUFDVDtRQUNELElBQUksS0FBSyxHQUFxQixDQUM3QixRQUFRLENBQUMsYUFBYSxDQUNyQixpRUFBaUUsQ0FDakUsQ0FDRCxDQUFDO1FBQ0YsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFlBQVksRUFBRTtvQkFDYixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ3hCLE1B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