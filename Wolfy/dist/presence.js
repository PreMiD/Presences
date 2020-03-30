var presence = new Presence({
    clientId: "644235680012042261"
}), path, prev, elapsed, prevState, cp, currTime, strings = presence.getStrings({
    play: "presence.playback.playing",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", async () => {
    let data = {
        largeImageKey: "wf"
    };
    path = document.location.pathname;
    if (window.location.href !== prev && !path.includes("/game/")) {
        delete data.startTimestamp;
        delete data.endTimestamp;
        prev = window.location.href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    data.details = (await strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (await strings).browsing;
    data.startTimestamp = elapsed;
    if (path.includes("/articles/") &&
        path.split("/")[2] != null &&
        path.split("/")[2].length > 1) {
        data.state = document.querySelector("body h1").textContent;
    }
    else if (path.includes("/game/") &&
        path.split("/")[2] != null &&
        path.split("/")[2].length > 1) {
        data.state = document
            .querySelector("#chat p.phase")
            .textContent.toUpperCase();
        if (data.state !== prevState) {
            delete data.startTimestamp;
            delete data.endTimestamp;
            prevState = data.state;
            cp = Date.now();
            currTime = document.querySelector("#chat p.time").textContent;
        }
        var timestamps = getTimestamps(cp, currTime);
        data.details = "En jeu";
        data.smallImageKey = "live";
        data.smallImageText = (await strings).play;
        if (currTime && currTime.includes(":")) {
            data.startTimestamp = timestamps[0];
            data.endTimestamp = timestamps[1];
        }
        else {
            data.startTimestamp = cp;
        }
    }
    else {
        switch (path) {
            case "/settings":
                data.state = "Paramètres";
                break;
            case "/shop":
                data.state = "Boutique";
                break;
            case "/articles":
                data.state = "Actualités";
                data.smallImageKey = "reading";
                data.smallImageText = "En train de lire";
                break;
            case "/play":
            case "/":
            default:
                data.state = "Page d'accueil";
        }
    }
    presence.setActivity(data);
});
function getTimestamps(audioTime, audioDuration) {
    var splitAudioDuration = audioDuration.split(":").reverse();
    var parsedAudioTime = getTime(audioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * 60 ** index;
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsRUFDRixJQUFJLEVBQ0osSUFBSSxFQUNKLE9BQU8sRUFDUCxTQUFTLEVBQ1QsRUFBTyxFQUNQLFFBQWEsRUFDYixPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQztJQUM3QixJQUFJLEVBQUUsMkJBQTJCO0lBQ2pDLFFBQVEsRUFBRSw0QkFBNEI7Q0FDdEMsQ0FBQyxDQUFDO0FBRUosUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxJQUFJLEVBQUU7SUFDcEMsSUFBSSxJQUFJLEdBQWlCO1FBQ3hCLGFBQWEsRUFBRSxJQUFJO0tBQ25CLENBQUM7SUFFRixJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFFbEMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQzlELE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUMzQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDekIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4QztJQUVELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUN4QyxJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztJQUM5QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsTUFBTSxPQUFPLENBQUMs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