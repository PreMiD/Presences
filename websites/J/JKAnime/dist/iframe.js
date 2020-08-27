const iframe = new iFrame();
iframe.on("UpdateData", async () => {
    if (document.querySelector("video[id$='jkvideo_html5_api']") != null || document.querySelector("div.jw-media.jw-reset > video") != null) {
        const video = document.querySelector("video[id$='jkvideo_html5_api']") != null
            ? document.querySelector("video[id$='jkvideo_html5_api']") : document.querySelector("div.jw-media.jw-reset > video");
        if (video != null && !isNaN(video.duration)) {
            iframe.send({
                duration: video.duration,
                currentTime: video.currentTime,
                paused: video.paused
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFFbEMsSUFBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUMsSUFBSSxJQUFJLEVBQUU7UUFDdkksTUFBTSxLQUFLLEdBQXFCLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0NBQWdDLENBQUMsSUFBSSxJQUFJO1lBQ2hHLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGdDQUFnQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNySCxJQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQ1gsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO2dCQUN4QixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzlCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTthQUNwQixDQUFDLENBQUM7U0FDSDtLQUNEO0FBQ0YsQ0FBQyxDQUFDLENBQUMifQ==