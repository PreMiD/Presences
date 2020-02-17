var presence = new Presence({
    clientId: "630542731701387276",
    mediaKeys: false
});
let oo;
let songt;
let songa;

presence.on("UpdateData", () => {
    let presenceData = {
        largeImageKey: "dilogo"
    };
    if(document.getElementById("webplayer-region").getAttribute("data-state") === "playing") {
        let tracka = document.getElementsByClassName("artist-name")[0].innerHTML.replace("-", "");
        let trackt = document.getElementsByClassName("track-name")[0].innerHTML;
        presenceData.details = tracka;
        presenceData.state = trackt
        presenceData.smallImageKey = "play";
    } else {
        presenceData.state = "Browsing..."
        presenceData.smallImageKey = "pause";
    }


    presence.setActivity(presenceData)

});
