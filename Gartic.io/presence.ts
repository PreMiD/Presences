var presence = new Presence({
    clientId: "620839311629221889",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "gartic-logo"
    };

    var path = document.location.pathname;
    var gameLink = document.location.pathname.split("/")[1].match(/^\d/) ? true : false;
    if(path == ("/")) {
        data.details = "Viewing the Homepage"
        data.startTimestamp = elapsed
    } else if (path == ("/rooms")) {
        data.details = "Viewing Rooms"
        data.startTimestamp = elapsed
    } else if (gameLink) {
        var inSetup = document.querySelector(".infosUsers") ? true : false;
        if (inSetup) {
            var players = document.querySelector(".infosRoom li:last-child span strong").textContent;
            data.details = "Setting up Info to Join"
            data.state = "Players: " + players
            data.startTimestamp = elapsed
        } else {
            var user = document.querySelector(".you .nick").textContent;
            var points = document.querySelector(".you .points").textContent;
            data.details = "User: " + user
            data.state = "Points: " + points.split("pts")[0].trim();
            data.startTimestamp = elapsed
        }
    } else {
        data.details = "Somewhere on-site"
        data.startTimestamp = elapsed
    }
    presence.setActivity(data);
});