let presence = new Presence({
    clientId: "631122124630654979" 
});


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        elapsed =  Math.floor(Date.now() / 1000)
        let presenceData = {
            details: "Browing Homepage",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "logo",
            smallImageKey:"search",
            smallImageText:"browsing",
            startTimestamp: elapsed
        };

        presence.setActivity(presenceData);
    }

        else if(["/flavors",'/recipes','/users',"/contests","/vendors","/top100"].includes(document.location.pathname)){
            elapsed =  Math.floor(Date.now() / 1000)
            if(document.location.search!=''){
                 var urlParams = new URLSearchParams(document.location.search) 
                var  dstate = `searching for ${urlParams.get("name_like")}`
            }
            else {
                var dstate = "browsing list"
            }
            let presenceData = {
                details: `Browing ${document.location.pathname.replace("/",'')} `,
                state:dstate,
                //largeImageKey: "banner",
                largeImageKey: "logo",
                smallImageKey:"search",
                smallImageText:"browsing",
                startTimestamp: elapsed

            };
    
            presence.setActivity(presenceData);
        
        }

        else if(["/getting_started","/help/how_to_mix","/go_pro",'/help/report_recipe'].includes(document.location.pathname)){
            elapsed =  Math.floor(Date.now() / 1000)
            let presenceData = {
                details: `Browing help `,
                state: `on ${document.location.pathname.replace("/help",'').split("_").join(" ").replace("/",'')}`,
                //largeImageKey: "banner",
                largeImageKey: "logo",
                smallImageKey:"search",
                smallImageText:"browsing",
                startTimestamp: elapsed

            };
    
            presence.setActivity(presenceData);
        }

        else if(document.location.pathname.startsWith("/flavors/")){
            elapsed =  Math.floor(Date.now() / 1000)
            let presenceData = {
                details: `Browing Flavors `,
                state: `flavor: ${document.location.pathname.replace(/\d/,'').replace(/\d/,'').split("_").join(' ').replace("/flavors/",'').split("-").join(" ").replace("/",'')}`,
                //largeImageKey: "banner",
                largeImageKey: "logo",
                smallImageKey:"search",
                smallImageText:"browsing",
                startTimestamp: elapsed

            };
    
            presence.setActivity(presenceData);
        }

        else if(document.location.pathname.startsWith("/recipes/")){
            elapsed =  Math.floor(Date.now() / 1000)
            var data = document.location.hash.replace(/\d/,'').replace("#",'').split("_by_")
            let presenceData = {
                details: `Recipe : ${data[0].split("_").join(" ")} `,
                state: `Creator: ${data[1].split("_").join(" ")}`,
                //largeImageKey: "banner",
                largeImageKey: "logo",
                smallImageKey:"search",
                smallImageText:"browsing",
                startTimestamp: elapsed

            };
    
            presence.setActivity(presenceData)
        }

    



}));
