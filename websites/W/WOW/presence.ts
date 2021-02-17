const presence = new Presence({
    clientId: "810648304232038400"
    }),

    strings = presence.getStrings({
        play: "presence.playback.playing",
        pause: "presence.playback.paused",
        search: "presence.activity.searching",
        read: "presence.activity.reading",
        write: "Pisanie"
    });
    
    const browsingStamp = Math.floor(Date.now() / 1000);

    presence.on("UpdateData", async () => {
    const data: PresenceData = {
        largeImageKey: "icon",
        startTimestamp: browsingStamp,
        details: "Przegląda:"
    };
    const pathname: string = document.location.pathname;

    if (pathname === "/") 
    {
        data.state = "Stronę Główną";
    }
    else if (pathname.includes("/search")) 
    {
        const searchData = document.location.search.split("=")[1];
        data.details = "Szuka:";
        data.state = searchData;
        data.smallImageKey = "search";
        data.smallImageText = (await strings).search;
    }
    else if (pathname.includes("/watch"))
    {
        const video: HTMLVideoElement = document.querySelector("video");

        if (video !== null && !isNaN(video.duration)) 
        {
            const timestamps = presence.getTimestamps(
                video.currentTime,
                video.duration
            );

            data.details = document.title;
            data.smallImageKey = "search";
            data.smallImageText = (await strings).search;
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
            if (video.paused) 
            {
                data.smallImageKey = "pause";
                data.smallImageText = (await strings).pause;
                delete data.startTimestamp;
                delete data.endTimestamp;
            }
            else
            {
                if(document.title.includes("Stand Up") || document.title.includes("Pacześ Show"))
                {
                    data.smallImageKey = "mic";
                    data.smallImageText = (await strings).play+" Stand-up";
                }
                else
                {
                    data.smallImageKey = "play";
                    data.smallImageText = (await strings).play;
                }
            }
        }
    }
    else if (pathname.includes("/programmes"))
    {
        data.state = "Programy";
        data.smallImageKey = "search";
        data.smallImageText = (await strings).search;
    } 
    else if (pathname.includes("/movies")) 
    {
        if(pathname.includes("/catalog/44"))
        {
            data.state = "Filmy Komediowe";
            data.smallImageKey = "search";
        }
        else if(pathname.includes("/catalog/200"))
        {
            data.state = "Filmy Dokumentalne";
            data.smallImageKey = "search";
        }
        else if(pathname.includes("/catalog/203"))
        {
            data.state = "Filmy Sensacyjne";
            data.smallImageKey = "search";
        }
        else if(pathname.includes("/catalog/206"))
        {
            data.state = "Filmy Kryminalne";
            data.smallImageKey = "search";
        }
        else
        {
            data.state = "Filmy";
            data.smallImageKey = "search";
        }
        data.smallImageText = (await strings).search;
    }
    else if (pathname.includes("/page/terms"))
    {
        data.state = "REGULAMIN KORZYSTANIA Z SERWISU WOW";
        data.smallImageKey = "question";
        data.smallImageText = (await strings).read;
    } 
    else if (pathname.includes("/page/policy"))
    {
        data.state = "POLITYKA PRYWATNOŚCI WORLDWIDE OTT PLATFORM SP. Z O.O.";
        data.smallImageKey = "question";
        data.smallImageText = (await strings).read;
    } 
    else if (pathname.includes("/page/cookie"))
    {
        data.state = "POLITYKA COOKIES";
        data.smallImageKey = "question";
        data.smallImageText = (await strings).read;
    } 
    else if (pathname.includes("/login") || pathname.includes("/subscriber/password/reset"))
    {
        data.details = "Loguje się!";
        data.smallImageKey = "pen";
        data.smallImageText = (await strings).write;
    } 
    else if (pathname.includes("/register"))
    {
        data.details = "Tworzy konto!";
        data.smallImageKey = "pen";
        data.smallImageText = (await strings).write;
    }
    else if (pathname.includes("/contact"))
    {
        data.details = "Zgłasza problem!";
        data.smallImageKey = "pen";
        data.smallImageText = (await strings).write;
    } 

    if (!data.details) 
    {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else
    {
        presence.setActivity(data);
    }
});