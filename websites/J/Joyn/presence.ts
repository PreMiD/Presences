const presence = new Presence({
    clientId: "799629862620758046"
  }), browsingStamp = Math.floor(Date.now() / 1000);
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  presence.on("UpdateData", async function () {
    const presenceData = {
        largeImageKey: "logo"
    },
    set_timeRemaining = await presence.getSetting("timeRemaining"),
    urlpath = window.location.pathname.split("/"),
    video = document.querySelector('div video');
    function ifSettingEnabled(setting, string) {
        if(setting) {
            return string;
        } else {
            return "";
        }
    }
    if (document.location.hostname == "www.joyn.de" || document.location.hostname == "joyn.de") {
        if ((urlpath[1] == '' || document.location.pathname.includes("/#home")) && urlpath[2] != '') {
            presenceData.details = "Durchstöbert";
        }
        if (urlpath[1] != 'play' && (document.location.pathname.includes("/serien") || document.location.pathname.includes("/filme"))) {
            presenceData.details = "Durchstöbert";
        }
        else if (urlpath[1] == 'play' && urlpath[2] == 'filme') {
            const video_startTime = Date.now(),
            video_endTime = Math.floor(video_startTime / 1000) - video.currentTime + video.duration;
            presenceData.details = document.title.replace('streamen | Joyn','');
            presenceData.state = 'Film';
            if(!video.paused) {
                presenceData.startTimestamp = video_startTime;
                presenceData.endTimestamp = video_endTime;
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = 'Wiedergabe';
            } else {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = 'Pausiert';
            }
        }
        else if (urlpath[1] == 'play' && urlpath[2] == 'serien') {
            const video_startTime = Date.now(),
            video_endTime = Math.floor(video_startTime / 1000) - video.currentTime + video.duration;
            presenceData.details = document.title.replace('streamen','');
            presenceData.state = 'Serie';
            if(!video.paused) {
                presenceData.startTimestamp = video_startTime;
                presenceData.endTimestamp = video_endTime;
                presenceData.smallImageKey = "play";
                presenceData.smallImageText = 'Wiedergabe';
            } else {
                presenceData.smallImageKey = "pause";
                presenceData.smallImageText = 'Pausiert';
            }
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