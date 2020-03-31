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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNwRCxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN0RSxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNyQjthQUNGLENBQUMsQ0FBQztTQUNKO0tBQ0Y7SUFDRCxJQUNFLFFBQVEsQ0FBQyxhQUFhLENBQ3BCLGlFQUFpRSxDQUNsRSxLQUFLLElBQUksRUFDVjtRQUNBLElBQUksS0FBSyxHQUFxQixDQUM1QixRQUFRLENBQUMsYUFBYSxDQUNwQixpRUFBaUUsQ0FDbEUsQ0FDRixDQUFDO1FBQ0YsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLFlBQVksRUFBRTtvQkFDWixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ3hCLE1B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