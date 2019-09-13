var presence = new Presence({
    clientId: "621894190883668010",
    mediaKeys: false
});

var elapsed = Math.floor(Date.now()/1000);

presence.on("UpdateData", async () => {

    let data: presenceData = {
        largeImageKey: "gartic-logo"
    };

    var path = document.location.pathname;
    var gameLink = document.location.pathname.split("/")[1].match(/^\d/) ? true : false;
    if (gameLink) {
        var user = document.querySelector("div.user.proprio .dados span").textContent;
        var points = document.querySelector("div.user.proprio .dados pre").textContent;
        data.details = "User: " + user.split("~")[1]
        data.state = "Points: " + points.split("pontos")[0].trim();
        data.startTimestamp = elapsed
    } else {
        data.details = "Not in-game"
    }
    presence.setActivity(data);
});