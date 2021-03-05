const presence = new Presence({
    clientId: "623863060410400779"
});
presence.on("UpdateData", async () => {
    const presenceData = {
        largeImageKey: "light",
        smallImageKey: "dark",
        startTimestamp: new Date().getTime()
    };
    if (document.location.hostname == "pad.genoweb.xyz") {
        presenceData.details = getMeta('premid:details');
        presenceData.state = getMeta('premid:state');
        presenceData.smallImageText = `GenoPad v${getMeta('app:version')}`;
    }
    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    }
    else {
        presence.setActivity(presenceData);
    }
});
function getMeta(metaName) {
    const metas = document.getElementsByTagName('meta');
    for (let i = 0; i < metas.length; i++) {
        if (metas[i].getAttribute('property') === metaName) {
            return metas[i].getAttribute('content');
        }
    }
    return '';
}
