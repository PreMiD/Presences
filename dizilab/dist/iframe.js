const iframe = new iFrame();
setInterval(function () {
    const video = document.querySelector("#vplayer video") ||
        document.querySelector("video");
    if (video && document.location.hostname == "vidmoly.to") {
        iframe.send({
            error: false,
            currentTime: video.currentTime,
            duration: video.duration,
            paused: video.paused
        });
    }
    else if (video && document.location.hostname != "vidmoly.to") {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsV0FBVyxDQUFDO0lBQ1gsTUFBTSxLQUFLLEdBQ1QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBc0I7UUFDN0QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXNCLENBQUM7SUFFdkQsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztLQUNIO1NBQU0sSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDWCxLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztLQUNIO1NBQU07UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1gsS0FBSyxFQUFFLElBQUk7U0FDWCxDQUFDLENBQUM7S0FDSDtBQUNGLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyJ9