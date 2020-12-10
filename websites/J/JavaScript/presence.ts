const presence = new Presence({
    clientId: "786389332042711040"
}), Stamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const data: PresenceData = {
        largeImageKey: "jslogo",
        startTimestamp: Stamp
    }, paths = document.location.pathname.split('/');
    paths.splice(0, 1);

    if(paths[3] !== 'JavaScript')return;

    if(!paths[4]){
        data.details = `Looking the main page...`;
    } else {
        data.details = `Looking at ${paths[4]}`;
        paths.splice(0, 4);
        if(paths[0]){
            data.state = `Topic: ${paths.join(', ')}`;
        }
        }

    presence.setActivity(data);
});