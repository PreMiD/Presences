var iframe = new iFrame();
iframe.on("UpdateData", () => {
    if (document.querySelector("#myvideo") !== null) {
    var anime = document.querySelector("#myvideo").textContent;
        if (anime !== isNaN) {
            if (anime.includes("PauseDuration")) {
            var currentTime1 = anime.split("VideoCurrent Time ")[1].split("PauseDuration")[0];
            var pause1 = anime.includes("PlayDuration");
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: currentTime1,
                    paused: pause1,
            }});
            } else if (anime.includes("PlayDuration")) {
            var currentTime2 = anime.split("VideoCurrent Time ")[1].split("PlayDuration")[0];
            var pause2 = anime.includes("PlayDuration");
            iframe.send({
                iframe_video: {
                    iFrameVideo: true,
                    currTime: currentTime2,
                    paused: pause2,
            }});
        }
    }
}});
