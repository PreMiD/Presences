let presence = new Presence({
    clientId: "631595418085490689" 
});
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Browsing novels",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp:elapsed
    
        };

        presence.setActivity(presenceData);
    }

    else if(document.location.pathname=="//"){
        var stext = document.location.search.split("=")
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Searching novels",
            state: `Keyword: ${stext[1].split("+").join(" ").capitalize()}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp:elapsed
    
        };

        presence.setActivity(presenceData);
    }

    else if(document.location.pathname.startsWith("/category/")){
        var stext = document.location.pathname.split("/")
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Searching novels `,
            state: `${stext[1].capitalize()}: ${stext[2].split("-").join(" ").capitalize()}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp:elapsed
    
        };

        presence.setActivity(presenceData);
    }

    else if(["/reviews/","/ln-fest-series/"].includes(document.location.pathname)){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Browsing site`,
            state: `looking at ${document.location.pathname.split("/").join("").split("-").join(" ").capitalize()}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp:elapsed
    
        };

        presence.setActivity(presenceData);
    }

    else {
        var d = document.location.pathname.split("/")
        if(d.length!=5){}
        else{
            elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Reading ${d[3].split("-").join(" ").capitalize()}(${d[1]})`,
            state: `Looking at ${(document.location.hash.length==0)?"Novel":document.location.hash.replace("#",'').capitalize()}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp:elapsed
    
        };

        presence.setActivity(presenceData);
        }


    }





}));
