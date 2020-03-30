var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.location.hostname.match("player.hanime.tv")) {
        var video = document.querySelector("#primary_video_html5_api");
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
        else {
            iframe.send({
                iframe_video: {
                    iFrameVideo: null,
                    currTime: null,
                    dur: null,
                    paused: null
                }
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFBSSxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFBRTtRQUN6RCxJQUFJLEtBQUssR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FDbkQsMEJBQTBCLENBQzFCLENBQUM7UUFDRixJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsWUFBWSxFQUFFO29CQUNiLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNwQjthQUNELENBQUMsQ0FBQztTQUNIO2FBQU07WUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFlBQVksRUFBRTtvQkFDYixXQUFXLEVBQUUsSUFBSTtvQkFDakIsUUFBUSxFQUFFLElBQUk7b0JBQ2QsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ1o7YUFDRCxDQUFDLENBQUM7U0FDSDtLQUNEO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==