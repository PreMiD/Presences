const iframe = new iFrame();
const pattern = "video[id$='_html5_api']";
const secondPattern = "div.jw-media.jw-reset > video";
iframe.on("UpdateData", async () => {
    if (document.querySelector(pattern) === null && document.querySelector(secondPattern) === null) {
        return;
    }
    const videoInfos = document.querySelector(pattern) != null ?
        document.querySelector(pattern) :
        document.querySelector(secondPattern);
    if (videoInfos != null && !isNaN(videoInfos.duration)) {
        iframe.send({
            duration: videoInfos.duration,
            currentTime: videoInfos.currentTime,
            paused: videoInfos.paused
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDNUIsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUM7QUFDMUMsTUFBTSxhQUFhLEdBQUcsK0JBQStCLENBQUM7QUFDdEQsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDL0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUM1RixPQUFPO0tBQ1Y7SUFFRCxNQUFNLFVBQVUsR0FBcUIsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMxRSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUUxQyxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ25ELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7WUFDN0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXO1lBQ25DLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtTQUM1QixDQUFDLENBQUM7S0FDTjtBQUNMLENBQUMsQ0FBQyxDQUFDIn0=