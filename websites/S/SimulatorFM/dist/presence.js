const presence = new Presence({
    clientId: "704767276590694400"
});
let dSong, dArtist, dListeners, dStart, dFinish, dDJ;
function getSongData() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            dSong = data.now_playing.name;
            dArtist = data.now_playing.artist;
            dListeners = data.listeners;
            dStart = data.time.start;
            dFinish = data.time.finish;
            dDJ = data.dj.name;
        }
    };
    xhttp.open("GET", "https://panel.simulator.fm/api/v4/current-song", true);
    xhttp.withCredentials = true;
    xhttp.send();
}
setInterval(getSongData, 10000);
getSongData();
const currentTime = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
    const presenceData = {
        largeImageKey: "sfmlogo"
    };
    if (document.location.hostname == "simulator.fm") {
        if (document.location.pathname.includes("/home")) {
            presenceData.details = dSong + " - " + dArtist;
            presenceData.state = "DJ: " + dDJ;
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "play";
            presenceData.startTimestamp = dStart;
            presenceData.endTimestamp = dFinish;
        }
        else if (document.location.pathname.includes("/team")) {
            presenceData.details = "Viewing the Staff Team";
            if (document.querySelector("ng-component > div > div > h2") !== null) {
                presenceData.state =
                    "User: " +
                        document.querySelector("ng-component > div > div > h2").textContent;
            }
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "search";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/request")) {
            presenceData.details = "Making a Request";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "writing";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/timetable")) {
            presenceData.details = "Viewing the Timetable";
            presenceData.state =
                "Date: " +
                    document.querySelector("div.p-timetable__day.p-timetable__day--selected").textContent;
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/apply")) {
            presenceData.details = "Applying for the Team";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/contact")) {
            presenceData.details = "Viewing the Contact Page";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else {
            presenceData.details = "Unknown Page";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
    }
    else if (document.location.hostname == "panel.simulator.fm") {
        if (document.location.pathname.includes("/dashboard")) {
            presenceData.details = "Staff Panel";
            presenceData.state = "Viewing Dashboard";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/timetable")) {
            presenceData.details = "Staff Panel";
            presenceData.state = "Viewing Timetable";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/requests")) {
            presenceData.details = "Staff Panel";
            presenceData.state = "Viewing Requests";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/admin/applications")) {
            presenceData.details = "Staff Panel";
            presenceData.state = "Viewing Applications";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else if (document.location.pathname.includes("/song-history")) {
            presenceData.details = "Staff Panel";
            presenceData.state = "Viewing Song History";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
        }
        else {
            presenceData.details = "Staff Panel";
            presenceData.smallImageText = dListeners + " Listeners";
            presenceData.smallImageKey = "reading";
            presenceData.startTimestamp = currentTime;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUM7QUFFckQsU0FBUyxXQUFXO0lBQ2xCLE1BQU0sS0FBSyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7SUFDbkMsS0FBSyxDQUFDLGtCQUFrQixHQUFHO1FBQ3pCLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7WUFDOUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDM0MsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQzlCLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUNsQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM1QixNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekIsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1lBQzNCLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQztTQUNwQjtJQUNILENBQUMsQ0FBQztJQUNGLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLGdEQUFnRCxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFFLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzdCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNmLENBQUM7QUFFRCxX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