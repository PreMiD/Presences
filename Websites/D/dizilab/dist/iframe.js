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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFNUIsV0FBVyxDQUFDO0lBQ1YsTUFBTSxLQUFLLEdBQ1IsUUFBUSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBc0I7UUFDN0QsUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQXNCLENBQUM7SUFFeEQsSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztLQUNKO1NBQU0sSUFBSSxLQUFLLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksWUFBWSxFQUFFO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDVixLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVztZQUM5QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDeEIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNO1NBQ3JCLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ1YsS0FBSyxFQUFFLElBQUk7U0FDWixDQUFDLENBQUM7S0FDSjtBQUNILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyJ9