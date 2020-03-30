var presence = new Presence({
    clientId: "670325644319522816",
    
});
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {

    let presenceData = {
        largeImageKey: "azurlogo"
    };
    presenceData.startTimestamp = browsingStamp;

    if (document.location.pathname == "/Azur_Lane_Wiki") {
        presenceData.details = "Viewing Wiki home page";
    } 
    else if (document.querySelector('.firstHeading') !== null) {
        presenceData.details = "Viewing page:";
        presenceData.state = document.querySelector('.firstHeading').innerText;
    }

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
    
});