var presence = new Presence({
    clientId: "670325644319522816",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000);
let sartist, strack, slisteners, sdj;

function newStats() {
    let data = JSON.parse(document.querySelector("#premid_data").innerHTML);
    strack = data.response.objects[0].metadata;
    slisteners = data.response.objects[0].n_listeners;
    sdj = data.response.objects[0].dj_name;
}

presence.on("UpdateData", () => {
    newStats();
    let presenceData = {
        largeImageKey: "logo"
    };
    presenceData.smallImageKey = "play";
    presenceData.details = (strack || "Loading...");
    presenceData.state = "DJ: " + (sdj || "Loading...");
    presenceData.smallImageText = (slisteners || "Loading...") + " Listeners";
    presenceData.startTimestamp = browsingStamp;
    presence.setActivity(presenceData);
});