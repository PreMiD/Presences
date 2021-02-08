const presence = new Presence({
    clientId: "807988025073729556"
})

var startTime = Math.round((new Date()).getTime() / 1000);

let title: string, 
artist: string, 
dj: string,
state: string,
icon: string;

function getData(): void {
    icon = "hrlogo"
    title = document.querySelector("#title").textContent || "undefined"
    artist = document.querySelector("#artist").textContent || "undefined"
    dj = document.querySelector("#dj").textContent || "undefined"
    if (document.querySelector("#toggle").className.includes("fa-play")) {
        state = "Paused"
    } else if (document.querySelector("#toggle").className.includes("fa-pause")) {
       state = "Listening..."
    } else {
        state = "ERR"
        title = "PlayBack Error"
        artist = "PlayBack Error"
        dj = "Playback Error"
    }
    if (document.querySelector("#modal").className.includes("hide")) {
        icon = "hrlogo"
    }   else {
        state = "Request"
        icon = "request"
        dj = "Harmony Radio"
        artist = "Submitting A Song Request"
    }
    if (document.querySelector("#modala").className.includes("hide")) {
        icon = "hrlogo"
    }   else {
        state = "Applying..."
        icon = "apply"
        artist = "Submitting An Application"
    }
}
getData();
setInterval(getData, 5000)

presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
        largeImageKey: "hrlogo",
        smallImageKey: icon,
        startTimestamp: startTime,
        smallImageText: state
    };

    if (document.location.hostname === "weareharmony.net") {
       if (dj == "AutoDJ") {
            presenceData.details = "No DJ Active (AutoDJ)";
        } else {
            presenceData.details = `Presenter: ${dj}`;
        }
        presenceData.state = `${title} - ${artist}`;
    }

    if (artist == "Submitting An Application") {
        presenceData.details = "Submitting an application";
        presenceData.state = "Harmony Radio";
    };

    if (artist == "Submitting A Song Request") {
        presenceData.details = "Submitting A Song Request";
        presenceData.state = "Harmony Radio";
    };

    if (presenceData.details == null) {
        presence.setTrayTitle();
        presence.setActivity();
    } else {
        presence.setActivity(presenceData)
    }
})
