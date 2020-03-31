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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsV0FBVyxDQUFDO0lBQ1YsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXFCLENBQUM7SUFFbEUsSUFDRSxLQUFLO1FBQ0wsS0FBSyxDQUFDLFdBQVc7UUFDakIsS0FBSyxDQUFDLFFBQVE7UUFDZCxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFDMUI7UUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVc7WUFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtTQUNyQixDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNWLEtBQUssRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMifQ==