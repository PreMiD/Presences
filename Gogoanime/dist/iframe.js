let iframe = new iFrame();
var pattern = "video[id$='_html5_api']";
var sPattern = "div.jw-media.jw-reset > video";
iframe.on("UpdateData", async () => {
    if (document.querySelector(pattern) === null && document.querySelector(sPattern) === null) {
        return;
    }
    var videoInfos = document.querySelector(pattern) != null ?
        document.querySelector(pattern) :
        document.querySelector(sPattern);
    if (videoInfos != null && !isNaN(videoInfos.duration)) {
        iframe.send({
            duration: videoInfos.duration,
            currentTime: videoInfos.currentTime,
            paused: videoInfos.paused
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFDMUIsSUFBSSxPQUFPLEdBQUcseUJBQXlCLENBQUM7QUFDeEMsSUFBSSxRQUFRLEdBQUcsK0JBQStCLENBQUM7QUFDL0MsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDL0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBQztRQUN0RixPQUFPO0tBQ1Y7SUFFRyxJQUFJLFVBQVUsR0FBc0IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUN6RSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUVyQyxJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDUixRQUFRLEVBQUUsVUFBVSxDQUFDLFFBQVE7WUFDN0IsV0FBVyxFQUFFLFVBQVUsQ0FBQyxXQUFXO1lBQ25DLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTTtTQUM1QixDQUFDLENBQUM7S0FDTjtBQUNMLENBQUMsQ0FBQyxDQUFDIn0=