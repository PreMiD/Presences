var iframe = new iFrame();
setInterval(function () {
    if (document.location.hostname == "static.crunchyroll.com") {
        var video = document.querySelector("#player0") !== null
            ? document.querySelector("#player0")
            : document.querySelector("#player_html5_api");
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
}, 100);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsV0FBVyxDQUFDO0lBQ1YsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsSUFBSSx3QkFBd0IsRUFBRTtRQUMxRCxJQUFJLEtBQUssR0FDUCxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLElBQUk7WUFDekMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFbEQsSUFBSSxLQUFLLElBQUksU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNWLFlBQVksRUFBRTtvQkFDWixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLEtBQUssQ0FBQyxXQUFXO29CQUMzQixHQUFHLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQ25CLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtpQkFDckI7YUFDRixDQUFDLENBQUM7U0FDSjtLQUNGO0FBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDIn0=