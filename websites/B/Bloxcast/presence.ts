const presence = new Presence({
    clientId: "729241422179467315"
})

const startTime = Math.floor(Date.now() / 1000);

let title: string;
let author: string;
let playbackStatus: string;

function getStatus(): string {
    const playPauseBtn = document.querySelector("#play-button");
    if(playPauseBtn.className === "fas fa-play"){
        return "Paused";
    }
    if(playPauseBtn.className === "fas fa-pause"){
        return "Playing";
    }
    return "Playing";
}

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "main",
        startTimestamp: startTime
    };

    title = document.querySelector("#title").innerHTML;
    author = document.querySelector("#artist").innerHTML;
    playbackStatus = getStatus();
    if(playbackStatus === "Paused"){
        presenceData.smallImageKey = "stop";
    }
    if(playbackStatus === "Playing"){
        presenceData.smallImageKey = "play";
    }
    presenceData.state = title;
    presenceData.details = author;
    presenceData.smallImageText = playbackStatus;

    if(presenceData.details == null){
        presence.setTrayTitle();
        presence.setActivity();
    }else{
        presence.setActivity(presenceData);
    }
});