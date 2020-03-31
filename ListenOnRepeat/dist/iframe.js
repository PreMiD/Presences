var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector(".video") !== null) {
        var video = document.querySelector(".video");
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
    else if (document.querySelector("body > div > div > div > video") !== null) {
        var video = document.querySelector("body > div > div > div > video");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUM3QyxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvRCxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1YsWUFBWSxFQUFFO29CQUNaLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNyQjthQUNGLENBQUMsQ0FBQztTQUNKO0tBQ0Y7U0FBTSxJQUNMLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsS0FBSyxJQUFJLEVBQ2pFO1FBQ0EsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQ2xELGdDQUFnQyxDQUNqQyxDQUFDO1FBQ0YsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLFlBQVksRUFBRTtvQkFDWixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ25CLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDckI7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGO0FBQ0gsQ0FBQyxDQUFDLENBQUMifQ==