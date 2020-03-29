let iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("video[id$='_html5_api']") != null ||
        document.querySelector("div.jw-media.jw-reset > video") != null) {
        var video = document.querySelector("video[id$='_html5_api']") != null
            ? document.querySelector("video[id$='_html5_api']")
            : document.querySelector("div.jw-media.jw-reset > video");
        if (video != null && !isNaN(video.duration)) {
            iframe.send({
                duration: video.duration,
                currentTime: video.currentTime,
                paused: video.paused
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFMUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsSUFDQyxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksSUFBSTtRQUN6RCxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLElBQUksSUFBSSxFQUM5RDtRQUNELElBQUksS0FBSyxHQUNSLFFBQVEsQ0FBQyxhQUFhLENBQUMseUJBQXlCLENBQUMsSUFBSSxJQUFJO1lBQ3hELENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDO1lBQ25ELENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDNUQsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUNYLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXO2dCQUM5QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07YUFDcEIsQ0FBQyxDQUFDO1NBQ0g7S0FDRDtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=