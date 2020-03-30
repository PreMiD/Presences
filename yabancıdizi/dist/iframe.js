const iframe = new iFrame();
setInterval(function () {
    const video = document.querySelector("video");
    if (video &&
        video.currentTime &&
        video.duration &&
        video.paused !== undefined) {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    }
    else {
        iframe.send({
            error: true
        });
    }
}, 100);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsV0FBVyxDQUFDO0lBQ1gsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXFCLENBQUM7SUFFbEUsSUFDQyxLQUFLO1FBQ0wsS0FBSyxDQUFDLFdBQVc7UUFDakIsS0FBSyxDQUFDLFFBQVE7UUFDZCxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFDekI7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1gsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtTQUNwQixDQUFDLENBQUM7S0FDSDtTQUFNO1FBQ04sTUFBTSxDQUFDLElBQUksQ0FBQztZQUNYLEtBQUssRUFBRSxJQUFJO1NBQ1gsQ0FBQyxDQUFDO0tBQ0g7QUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==