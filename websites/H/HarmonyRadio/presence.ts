const presence = new Presence({
    clientId: "877119819328131093"
})

const timeofbrowsing = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey:
            "default",
    };
    console.log(window.location.pathname.toLowerCase())
    presenceData.startTimestamp = timeofbrowsing
    if (window.location.pathname.toLowerCase() === "/maintenance") {
        presenceData.largeImageKey = "default"
        presenceData.details = "Harmony - Maintenance"
        presenceData.state = "We will be back soon!"
    }
    if (window.location.pathname.toLowerCase() === "/") {
        presenceData.largeImageKey = "default"
        let title = document.getElementById("titlemarquee").innerText
        let artist = document.getElementById("artistmarquee").innerText
        if (artist === "") {
            artist = document.getElementsByClassName("player-artist")[0].innerHTML
        }
        if (title === "") {
            title = document.getElementsByClassName("player-title")[0].innerHTML
        }
        /*if (title >= "24") {
            let amountToRemove = title.length - 27
            console.log(amountToRemove)
            let newtitle = title.slice(0, amountToRemove)
            title = newtitle + "..."
        }
        if (artist >= "24") {
            let amountToRemove2 = artist.length - 27
            console.log(amountToRemove2)
            let newart = artist.slice(0, amountToRemove2);
            artist = newart + "..."
        }*/
        let onair = document.getElementsByClassName("player-presenter")
        presenceData.details = artist + " - " + title
        presenceData.state = "Presenter: " + onair[0].innerHTML
    }
    presence.setActivity(presenceData);
});