const presence = new Presence({
    clientId: '862337383605338176'
}),
 nowInfo:
{
    name: string,
    timestamp: number
} = {
    name: null,
    timestamp: 0
};

function getJsonFromUrl() {
    const url = document.location.href;
    if (!url) return {};
    const question = url.indexOf("?");
    let hash = url.indexOf("#");
    if (hash == -1 && question == -1) return {};
    if (hash == -1) hash = url.length;
    const query = question == -1 || hash == question + 1 ? url.substring(hash) :
        url.substring(question + 1, hash),
     result: any = {};
    query.split("&").forEach(function (part) {
        if (!part) return;
        part = part.split("+").join(" ");
        const eq = part.indexOf("=");
        let key = eq > -1 ? part.substr(0, eq) : part,
         val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "",
         from = key.indexOf("[");
        if (from == -1) result[decodeURIComponent(key)] = val;
        else {
            const to = key.indexOf("]", from),
             index = decodeURIComponent(key.substring(from + 1, to));
            key = decodeURIComponent(key.substring(0, from));
            if (!result[key]) result[key] = [];
            if (!index) result[key].push(val);
            else result[key][index] = val;
        }
    });
    return result;
}

presence.on('UpdateData', async () => {
    const presenceData: PresenceData = {
        largeImageKey: 'main'
    },
     query = getJsonFromUrl();

    if (document.location.pathname === '/') {
        if (query.s) 
            presenceData.details = `Searching for ${query.s}`;
         else 
            presenceData.details = 'Viewing the home page';
        
    } if (document.location.pathname.startsWith('/category')) {
        const category: string = document.location.pathname.split('/')[2];
        if (category)
            presenceData.details = `Viewing category ${category}`;
    } else {
        const text = document.querySelector('div#page > div#content > div#primary > main#main > article > header.entry-header > div.title-block > h1.entry-title');
        if (text) {
            presenceData.details = `Watching ${text.textContent}`;
            if (nowInfo.name === text.textContent && nowInfo.timestamp > 0) 
                presenceData.startTimestamp = Math.floor(nowInfo.timestamp / 1000);
             else {
                nowInfo.name = text.textContent;
                nowInfo.timestamp = Date.now();
                presenceData.startTimestamp = Math.floor(Date.now() / 1000);
            }
        }

        // const watchedTime = document.querySelector('div#page > div#content > div#primary > main#main > article > header.entry-header > div.video-player > div.responsive-player > div#videocontainer > div.responsive-player > iframe > #document > html > body > div > div.plyr__controls > div.plyr__time--current');
    }

    if (presenceData.details === null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else 
        presence.setActivity(presenceData);
    
});
