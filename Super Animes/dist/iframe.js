setInterval(function () {
    if (document.location.hostname == "www.mega.nz/embed#") {
        var video = document.querySelector("#video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: video,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
    else {
        var video = document.querySelector("video");
        if (video != undefined && !isNaN(video.duration)) {
            iframe.send({
                iframe_video: {
                    iFrameVideo: video,
                    currTime: video.currentTime,
                    dur: video.duration,
                    paused: video.paused
                }
            });
        }
    }
}, 100);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFdBQVcsQ0FBQztJQUNYLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksb0JBQW9CLEVBQUU7UUFDdkQsSUFBSSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFL0QsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFlBQVksRUFBRTtvQkFDYixXQUFXLEVBQUUsS0FBSztvQkFDbEIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ25CLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDcEI7YUFDRCxDQUFDLENBQUM7U0FDSDtLQUNEO1NBQU07UUFDTixJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU5RCxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNiLFdBQVcsRUFBRSxLQUFLO29CQUNsQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNwQjthQUNELENBQUMsQ0FBQztTQUNIO0tBQ0Q7QUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==