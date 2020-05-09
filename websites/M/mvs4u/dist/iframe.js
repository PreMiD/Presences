const iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("video[id$='_html5_api']") != null ||
        document.querySelector("div.jw-media.jw-reset > video") != null ||
        document.querySelector("video") != null) {
        var video = document.querySelector("video[id$='_html5_api']") != null
            ? document.querySelector("video[id$='_html5_api']")
            : document.querySelector("div.jw-media.jw-reset > video")
                ? document.querySelector("div.jw-media.jw-reset > video")
                : document.querySelector("video");
        if (video != null && !isNaN(video.duration)) {
            iframe.send({
                duration: video.duration,
                currentTime: video.currentTime,
                paused: video.paused
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsSUFDRSxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksSUFBSTtRQUN6RCxRQUFRLENBQUMsYUFBYSxDQUFDLCtCQUErQixDQUFDLElBQUksSUFBSTtRQUMvRCxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLElBQUksRUFDdkM7UUFDQSxJQUFJLEtBQUssR0FDUCxRQUFRLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLElBQUksSUFBSTtZQUN2RCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQztZQUNuRCxDQUFDLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsQ0FBQztnQkFDekQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUM7Z0JBQ3pELENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ3hCLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztnQkFDOUIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2FBQ3JCLENBQUMsQ0FBQztTQUNKO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyJ9