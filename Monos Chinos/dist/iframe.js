const iframe = new iFrame();
iframe.on('UpdateData', () => {
    const video = document.querySelector('video.jw-video')
        || document.querySelector('video');
    if (!video) {
        return;
    }
    iframe.send({
        elapsed: video.currentTime,
        duration: video.duration,
        ended: video.ended,
        paused: video.paused
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFO0lBQzNCLE1BQU0sS0FBSyxHQUFxQixRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDO1dBQ25FLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFckMsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE9BQU87S0FDUjtJQUVELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDVixPQUFPLEVBQUUsS0FBSyxDQUFDLFdBQVc7UUFDMUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1FBQ3hCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztRQUNsQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07S0FDckIsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==