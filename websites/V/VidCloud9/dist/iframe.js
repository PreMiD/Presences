var iframe = new iFrame();
iframe.on("UpdateData", async () => {
    var video;
    if (document.querySelector("#myVideo > div.jw-wrapper.jw-reset > div.jw-media.jw-reset > video") !== null) {
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
    else if (document.querySelector("#myVideo") !== null) {
        video = document.querySelector("#myVideo");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDL0IsSUFBSSxLQUFLLENBQUM7SUFDVixJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0VBQW9FLENBQUMsS0FBSyxJQUFJLEVBQUM7UUFDdEcsS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsb0VBQW9FLENBQUMsQ0FBQztRQUNyRyxJQUFJLEtBQUssSUFBSSxTQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1IsWUFBWSxFQUFFO29CQUNWLFdBQVcsRUFBRSxJQUFJO29CQUNqQixRQUFRLEVBQUUsS0FBSyxDQUFDLFdBQVc7b0JBQzNCLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDbkIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUN2QjthQUNKLENBQUMsQ0FBQztTQUNOO0tBQ0o7U0FDSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2xELEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzNDLElBQUksS0FBSyxJQUFJLFNBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDUixZQUFZLEVBQUU7b0JBQ1YsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLFFBQVEsRUFBRSxLQUFLLENBQUMsV0FBVztvQkFDM0IsR0FBRyxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUNuQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07aUJBQ3ZCO2FBQ0osQ0FBQyxDQUFDO1NBQ047S0FDSjtBQUNMLENBQUMsQ0FBQyxDQUFDIn0=