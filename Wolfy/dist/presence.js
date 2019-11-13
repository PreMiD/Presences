var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "644235680012042261",
    mediaKeys: false
}), path, prev, elapsed, prevState, cp, currTime, strings = presence.getStrings({
    play: "presence.playback.playing",
    browsing: "presence.activity.browsing"
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
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
    data.details = (yield strings).browsing;
    data.smallImageKey = "search";
    data.smallImageText = (yield strings).browsing;
    data.startTimestamp = elapsed;
    if (path.includes("/articles/") && (path.split("/")[2] != null && path.split("/")[2].length > 1)) {
        data.state = document.querySelector("body h1").textContent;
    }
    else if (path.includes("/game/") && (path.split("/")[2] != null && path.split("/")[2].length > 1)) {
        data.state = document.querySelector("#chat p.phase").textContent.toUpperCase();
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
        data.smallImageText = (yield strings).play;
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
}));
function getTimestamps(audioTime, audioDuration) {
    var splitAudioDuration = audioDuration.split(':').reverse();
    var parsedAudioTime = getTime(audioTime);
    var parsedAudioDuration = getTime(splitAudioDuration);
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - parsedAudioTime + parsedAudioDuration;
    return [Math.floor(startTime / 1000), endTime];
}
function getTime(list) {
    var ret = 0;
    for (let index = list.length - 1; index >= 0; index--) {
        ret += parseInt(list[index]) * Math.pow(60, index);
    }
    return ret;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUN4QixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ25CLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBTyxFQUFFLFFBQWEsRUFDdEQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUM7SUFDOUIsSUFBSSxFQUFFLDJCQUEyQjtJQUNqQyxRQUFRLEVBQUUsNEJBQTRCO0NBQ3pDLENBQUMsQ0FBQztBQUVILFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEdBQVMsRUFBRTtJQUNqQyxJQUFJLElBQUksR0FBaUI7UUFDckIsYUFBYSxFQUFFLElBQUk7S0FDdEIsQ0FBQztJQUVGLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUVyQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDOUQsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQ3hCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM1QixJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDNUIsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sT0FBTyxDQUFDLENBQUMsUUFBUSxDQUFDO0lBQ3hDLElBQUksQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDO0lBQzlCLElBQUksQ0FBQyxjQUFj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