const iframe = new iFrame();
iframe.on("UpdateData", async () => {
    const { hostname } = window.location;
    if (hostname === `animeproxy.info` ||
        hostname === `rapidvid.to` ||
        hostname === `openload.co`) {
        const video = document.querySelector(`video`);
        if (video != null) {
            const played = video.duration != 0;
            iframe.send({
                current: video.currentTime,
                duration: video.duration,
                paused: video.paused,
                played
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDbEMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFDQyxRQUFRLEtBQUssaUJBQWlCO1FBQzlCLFFBQVEsS0FBSyxhQUFhO1FBQzFCLFFBQVEsS0FBSyxhQUFhLEVBQ3pCO1FBQ0QsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDbEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDWCxPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzFCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNwQixNQUFNO2FBQ04sQ0FBQyxDQUFDO1NBQ0g7S0FDRDtBQUNGLENBQUMsQ0FBQyxDQUFDIn0=