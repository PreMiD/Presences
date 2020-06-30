const presence = new Presence({
    clientId: "717462304505069589"
});

// just makes the below code cleaner and less long
function fromClass(cls: string){
    return document.getElementsByClassName(cls);
}

presence.on("iFrameData", (data) => {
    playback = data.iframe_video.duration !== null ? true : false;
    if (playback) {
      iFrameVideo = data.iframe_video.iFrameVideo;
      currentTime = data.iframe_video.currTime;
      duration = data.iframe_video.dur;
      paused = data.iframe_video.paused;
      video = data;
    }
});

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "nt-logo"
    };

    // presenceData.endTimestamp = ts[1];
    presenceData.details = `Channel: ${fromClass("Channel--selected")[0].children[2].children[0].innerHTML}`;
    presenceData.state = `${fromClass("PlayerControls-title")[0].innerHTML} by ${fromClass("PlayerControls-source")[0].innerHTML}`;

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData);
    }

});