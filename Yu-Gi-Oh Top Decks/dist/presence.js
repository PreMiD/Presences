let presence = new Presence({
    clientId: "630550023133724692" 
});


presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    if (document.location.pathname == "/") {
        
        let presenceData = {
            details: "Browsing Decks..",
            state: "at Homepage",
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "browsing"
        };

        presence.setActivity(presenceData);
    }

    else if (document.location.pathname == "/decklists" ){
        var pagenumber = document.getElementsByClassName("current")[0].firstElementChild.innerText
        var no1 = document.getElementById("deck_lists").lastElementChild.firstElementChild.children[2].innerText 
        var auth = document.getElementById("deck_lists").lastElementChild.firstElementChild.children[1].innerText
        var deckurl = document.getElementById("deck_lists").lastElementChild.firstElementChild.children[2].firstElementChild.href
        let presenceData = {
            details: "Looking at Decklists",
            state:`Page: ${pagenumber} top: ${no1} by ${auth}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: deckurl
        };

        presence.setActivity(presenceData);
    }

    else if (document.location.pathname=="/top_decks"){
        var top = document.getElementsByClassName("sortable")[0].children[1].firstElementChild.children[1].innerText.replace("Most Used Cards","")
        let presenceData = {
            details: "Looking at Top decks",
            state:`Current Meta: ${top}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "looking"
        };
        presence.setActivity(presenceData);
    }
    
    else if (document.location.pathname=="/top_cards"){
        var top = document.getElementsByClassName("sortable")[0].children[1].firstElementChild.children[2].innerText
        var price = document.getElementsByClassName("sortable")[0].children[1].firstElementChild.children[4].innerText
        let presenceData = {
            details: "Looking at Top Cards",
            state:`Top Card: ${top} Price: ${price}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "looking"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname=="/new_deck"){
        var deck = document.getElementsByName("deck_name")[0].value
        let presenceData = {
            details: "Building Deck",
            state:`Editing: ${deck}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: "creating deck"
        };
        presence.setActivity(presenceData);
    }
    else if (document.location.pathname.includes("/deck")){
        if (/\d/.test("/deck/8205")){
            var deck = document.getElementsByClassName("large-12 columns panel")[0].firstElementChild.innerText
            var by = document.getElementsByClassName("large-12 columns panel")[0].children[1].children[1].innerText
            var archetype = document.getElementsByClassName("large-12 columns panel")[0].children[1].children[10].innerText
            var value = document.getElementsByClassName("large-12 columns panel")[1].children[1].innerText.replace("\n",':').split(":")[1]

        let presenceData = {
            details: `Viewing deck: ${deck} (archetype: ${archetype})`,
            state:`by: ${by}, price: ${value}`,
            //largeImageKey: "banner",
            largeImageKey: "banner",
            smallImageKey: "icon",
            smallImageText: document.location.href
        };
        presence.setActivity(presenceData);}
    }


    
}));