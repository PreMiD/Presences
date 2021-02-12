const presence = new Presence({
    clientId: "809748404963770398"
});

let browsingStamp = Math.floor(Date.now() / 1000),
    prevUrl = document.location.href;

presence.on("UpdateData", async () => {

    if (document.location.href !== prevUrl){
        prevUrl = document.location.href;
        browsingStamp = Math.floor(Date.now() / 1000);
    }

    const presenceData: PresenceData = {  
          largeImageKey: "iqiyi_logo",
          details: "Browsing...",
          smallImageKey: "search",
          startTimestamp: browsingStamp
      };

    if (document.location.pathname.includes('/play') || document.location.pathname.includes('/v_')){

        const data = {
            title: document.querySelector('h1 a').textContent,
            ep: document.querySelector('h1').textContent.replace(document.querySelector('h1 a').textContent, '')
        },
        
        video: HTMLVideoElement = document.querySelector('video'),
        timestamps: number[] = presence.getTimestampsfromMedia(video);
    
        if (video && !isNaN(video.duration)){
            presenceData.details = data.title;
            presenceData.state = data.ep;

            presenceData.smallImageKey = video.paused ? "pause" : "play";
            presenceData.smallImageText = video.paused ? "Paused" : "Playing";

            presenceData.startTimestamp = timestamps[0];
            presenceData.endTimestamp = timestamps[1];

            if (video.paused){
                delete presenceData.startTimestamp;
                delete presenceData.endTimestamp;
            };
        };

        if (isNaN(video.duration)){
            presenceData.details = "Looking at:";
            presenceData.state = data.title;
            presenceData.startTimestamp = browsingStamp;
        };

    };

    if (document.location.pathname.includes('/search')){
        presenceData.details = "Searching for something";
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";
    };

    presence.setActivity(presenceData);
});
