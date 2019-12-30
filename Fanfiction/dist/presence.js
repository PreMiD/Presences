let presence = new Presence({
    clientId: "630790482804473857" 
});


var tags = ["/anime/" ,"/book/","/cartoon/","/comic/","/game/","/misc/","/movie/","/play/","tv" ]
var crossover = []
for (i=0 ;i< tags.length; i++){
    crossover+= ["/crossovers"+tags[i]]
}

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        
        let presenceData = {
            details: "Browing fanfics",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: "browsing"
        };

        presence.setActivity(presenceData);
    }

    else if (tags.includes(document.location.pathname) ){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Exploring Fanfics",
            state: `Catagory: ${document.location.pathname.replace('/',' ')} `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }
    else if (document.location.pathname.startsWith("/s/")){
        var current = document.location.pathname.replace("/s/",'').split("/").join('').replace(/\d+/,'').replace("crossovers",'').split("-").join(' ')
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Reading Fanfiction..",
            state: `title: ${current} `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);
    }

    else if (crossover.includes(document.location.pathname)){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Exploring Fanfics",
            state: `Catagory: ${document.location.pathname.replace("crossovers",'').replace('/',' ')} (Crossover) `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }
    else if (/\d/.test(document.location.pathname)){
        var anime = document.location.pathname.split("/").join('').replace(/\d+/,'').replace("crossovers",'')
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Exploring Fanfics",
            state: `Looking for ${anime} `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }

    

    else if (/\d/.test(document.location.pathname)){
        var anime = document.location.pathname.split("/").join('').replace(/\d+/,'').replace("crossovers",'')
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Exploring Fanfics",
            state: `Looking for ${anime} `,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "logo",
            smallImageText: document.location.href,
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);

    }



}));