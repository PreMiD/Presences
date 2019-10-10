let presence = new Presence({
    clientId: "631523770988888074" 
});

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Browsing Anime News",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }

    else if(((document.location.pathname.startsWith("/news/") || document.location.pathname.startsWith("/interest/"))||(document.location.pathname.startsWith("/convention/")||document.location.pathname.startsWith("/press-release/")))||(document.location.pathname.startsWith("/feature/")||document.location.pathname.startsWith("/interview/"))){
        var data = document.location.pathname.split("/") 

        elapsed =  Math.floor(Date.now() / 1000)
        var title = data[3].split("-").join(" ")
        let presenceData = {
            details: `Browsing ${data[1]}`,
            state: `Title: ${data[3].split("-").join(" ").capitalize()} (${data[2]})`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);

    }

    else if(((document.location.pathname.startsWith("/this-week-in-anime/")||document.location.pathname.startsWith("/the-list/"))|| (document.location.pathname.startsWith("/anncast/")||document.location.pathname.startsWith("/the-x-button/")))||(document.location.pathname.startsWith("/preview-guide/")||document.location.pathname.startsWith("/episode-review/"))){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Browsing Animes`,
            state: `in ${document.location.pathname.split("/")[1].split("-").join(" ").capitalize()}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }

    else if(document.location.pathname.startsWith("/review/")){
        var data = document.location.pathname.split("/")
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Browsing Reviews`,
            state: `for ${data[2].split('-').join(" ").capitalize()} (${data[3].split('-').join(" ")})`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);


    }
    else if(document.location.pathname.startsWith("/encyclopedia/")){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Browsing Encyclopedia`,
            state: `for ${document.getElementById("page_header").innerText}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }
    else if(document.location.pathname.startsWith("/MyAnime/")){
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: `Browsing Animes`,
            state: `for ${document.getElementById("page_header").innerText}`,
            //largeImageKey: "banner",
            largeImageKey: "logo",
            startTimestamp: elapsed
        };
 
        presence.setActivity(presenceData);
    }


}));