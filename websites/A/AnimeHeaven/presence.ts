const presence = new Presence({
    clientId: "816042675626442783"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
    let iFrameVideo: boolean,
    currentTime: number,
    duration: number,
    paused: boolean,
    video: {
        iframe_video: {
        duration: number;
        iFrameVideo: boolean;
        currTime: number;
        dur: number;
        paused: boolean; 
        }
        }, playback: boolean, search: string;

    presence.on(
            "iFrameData",
            (data: {
            iframe_video: {
                duration: number;
                iFrameVideo: boolean;
                currTime: number;
                dur: number;
                paused: boolean;
            };
            }) => {
            playback = data.iframe_video.duration !== null ? true : false;
            if (playback) {
                iFrameVideo = data.iframe_video.iFrameVideo;
                currentTime = data.iframe_video.currTime;
                duration = data.iframe_video.dur;
                paused = data.iframe_video.paused;
                video = data;
            }
            }
        );

    const browsingStamp = Math.floor(Date.now() / 1000), path = document.location.pathname
    let title, link;
    presence.on("UpdateData", async () => {
        const buttons = await presence.getSetting("buttons"),
        timestamps = presence.getTimestamps(
            Math.floor(currentTime),
            Math.floor(duration)
        ),
        data: PresenceData = {
            largeImageKey: "logo",
            startTimestamp: browsingStamp
        }; 
        if(path == "/animeheaven.eu" || path == "/"){
            data.details = "Viewing Homepage";
            }
        else if (path == "/anime-list"){
            data.details = "Viewing Anime List";
        }
        else if(path == "/dubbed-anime"){
            data.details = "Viewing Dubbed Anime";
        }
        else if(path == "/anime-series"){
            data.details = "Viewing Anime Series";
        }
        else if(path == "/anime-movies"){
            data.details = "Viewing Anime Movies";
        }
        else if(path == "/ongoing"){
            data.details = "Viewing Ongoing Series";
        }
        else if(path == "/popular"){
            data.details = "Viewing Popular";
        }
        else if(path == "/schedule"){
            data.details = "Viewing Schedule";
        }
        else if(path.includes("/detail/")){
            title = document.querySelector("body > div.notmain > div.maindark > div.infobox > div.infoboxc > div.infodesbox > div.infodes").textContent;
            data.details = "Viewing:";
            data.state = title;
        }
        else if (path.includes("/watch/")) {
            title = (document.querySelector("#main > div.now2 > div") as HTMLTextAreaElement);
            link = (document.querySelector("#main > div.now2 > div > a") as HTMLLinkElement).href;
            if (title !== null) {
                data.state = title.innerText;
                if(buttons){
                    data.buttons = [
                    {
                    label: "Current Episode",
                    url: document.location.href
                    },
                    {
                    label: "Episode List",
                    url: link
                    }
                    ];
                }
                if (
                    iFrameVideo == true &&
                    !isNaN(duration) &&
                    title !== null &&
                    video !== null
                ) {
                    if (!paused) {
                    data.details = "Watching:";
                    data.smallImageKey = paused ? "pause" : "play";
                    data.smallImageText = paused
                        ? (await strings).pause
                        : (await strings).play;
                    data.startTimestamp = timestamps[0];
                    data.endTimestamp = timestamps[1];
                    } else if (paused) {
                    delete data.startTimestamp;
                    delete data.endTimestamp;
                    data.details = "Paused:";
                    data.smallImageKey = "pause";
                    data.smallImageText = "paused";
                    }
                }
            }
        }
        else if(path == "/search"){
            search = (document.querySelector("body > div.header > div > div.searchbox > form > input.searchinput") as HTMLInputElement).value;
            if(document.querySelector("#error")  !== null){
                data.details = "Error:";
                data.state = "Unable to search item.";
                data.smallImageKey = "search";
                data.smallImageText = "Error";
            }
            else{
                data.details = "Searching:";
                data.state = search;
                data.startTimestamp = browsingStamp;
                data.smallImageKey = "search";
                data.smallImageText = "Searching";
            }
            
        }
        if (data.details == null) {
            presence.setTrayTitle();
            presence.setActivity();
        } else {
            presence.setActivity(data);
        }
    });