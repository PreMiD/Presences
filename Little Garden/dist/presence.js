const presence = new Presence({
    clientId: "800773457129635852"
});
var browsingStamp = Math.floor(Date.now() / 1000);
var user;
var title;
var replace;
var search;
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "lxg"
    };
    if (document.location.hostname == "littlexgarden.com") {
        if (document.location.pathname == "/") {
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "Visite la page d'accueil";
        }
        else {
            title = document.querySelector("title");
            presenceData.startTimestamp = browsingStamp;
            presenceData.details = "En train de lire :";
            presenceData.state = title.innerText;
        }
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});