interface LangStrings {
    play: string
    pause: string
    episode: string
    browse: string
    searchFor: string	
}

const presence = new Presence({
    clientId: "809748404963770398"
}),
    getStrings = async (): Promise<LangStrings> => presence.getStrings({
        play: "general.playing",
        pause: "general.paused",
        browse: "general.browsing",
        episode: "general.episode",
	searchFor: "general.searchFor",
    }, await presence.getSetting('lang'))

let browsingStamp = Math.floor(Date.now() / 1000),
    prevUrl = document.location.href,
    strings: Promise<LangStrings> = getStrings(),
    oldLang: string = null 

presence.on("UpdateData", async () => {

    if (document.location.href !== prevUrl){
        prevUrl = document.location.href;
        browsingStamp = Math.floor(Date.now() / 1000);
    }

    const presenceData: PresenceData = {  
          largeImageKey: "iqiyi_logo",
          details: (await strings).browse,
          smallImageKey: "search",
          smallImageText: (await strings).browse,
          startTimestamp: browsingStamp
      },

    newLang = await presence.getSetting('lang'),
    showButtons: boolean = await presence.getSetting('buttons'),
    searchQuery: boolean = await presence.getSetting('searchQuery');

    if (!oldLang){
        oldLang = newLang;
    } else if (oldLang !== newLang){
        oldLang = newLang;
        strings = getStrings();
    }

    if (document.location.pathname.includes('/play')){

        const data = {
            title: document.querySelector('h1 a').textContent,
            ep: document.querySelector('h1').textContent.replace(document.querySelector('h1 a').textContent, '')
        },

        video: HTMLVideoElement = document.querySelector('video'),
        timestamps: number[] = presence.getTimestampsfromMedia(video),
	isMovie = document.location.href.includes('movie'),
	isVShow = document.location.href.includes('variety-show');
    
        if (document.querySelector('.iqp-player-g.iqp-player .iqp-tip-stream .iqp-txt-vip')?.textContent) data.ep = "Trial Watching";
        
        if (!data.ep && !isVShow) data.ep = "Movie";
        if (isVShow) data.ep = "Variety Show";
        if (!data.ep.includes('/') && !["Variety Show", "Movie", "Trial Watching"].includes(data.ep)) data.ep = `${(await strings).episode} ${data.ep.match(/[1-9]?[0-9]?[0-9]/g)[0]}`;

        if (video && !isNaN(video.duration)){

            if (video.duration < 70 && !isVShow && !isMovie) data.ep = `${data.ep} preview`;
            if (video.duration > 70 && video.duration < 200 && !document.location.href.includes('variety-show')) data.ep = "Highlight";

                presenceData.details = data.title;
                presenceData.state = data.ep;

                presenceData.smallImageKey = video.paused ? "pause" : "play";
		presenceData.smallImageText = video.paused ? (await strings).pause : (await strings).play;

            	presenceData.startTimestamp = timestamps[0];
            	presenceData.endTimestamp = timestamps[1];

                if (showButtons){
                    presenceData.buttons = [{
                    label: "Watch",
                    url: document.URL.split("&")[0]
                }]
            } else delete presenceData.buttons;

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

        let searchQuery_ = decodeURI(document.location.search.replace('?query=', ''));

        presenceData.details = `${(await strings).searchFor} ${searchQuery ? searchQuery_  : "( Hidden )"}`;
        presenceData.startTimestamp = browsingStamp;
        presenceData.smallImageKey = "search";

        let result = document.querySelector('div.has-result')?.textContent.match(/[0-9]?[0-9]?[0-9]?[0-9]/)[0];
        presenceData.state = result ? `${result} matching ${parseInt(result) > 1 ? "results" : "result"}` : "No matching result";
    };

    presence.setActivity(presenceData);
});
