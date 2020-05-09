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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDakMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDckMsSUFDRSxRQUFRLEtBQUssaUJBQWlCO1FBQzlCLFFBQVEsS0FBSyxhQUFhO1FBQzFCLFFBQVEsS0FBSyxhQUFhLEVBQzFCO1FBQ0EsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUM7WUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQztnQkFDVixPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7Z0JBQzFCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtnQkFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO2dCQUNwQixNQUFNO2FBQ1AsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDIn0=