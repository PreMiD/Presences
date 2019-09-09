var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const presence = new Presence({
    clientId: "470178791428325376",
    mediaKeys: false
});
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    const { pathname } = window.location;
    const presenceData = {
        largeImageKey: "logo"
    };
    if (pathname.startsWith("/show")) {
        presenceData.details = document
            .getElementsByClassName("titel")[0]
            .getElementsByTagName("h3")[0].innerText;
    }
    else if (pathname.startsWith("/speedsuche") ||
        pathname.startsWith("/suche")) {
        presenceData.details = "Sucht...";
        presenceData.state = "Sucht nach einem Anime";
    }
    else if (pathname == "/") {
        presenceData.details = "Inaktiv...";
        presenceData.state = "Hängt auf der Startseite ab";
    }
    else if (pathname.startsWith("/animes")) {
        presenceData.details = "Schaut sich um...";
        presenceData.state = "Sucht nach Animes";
    }
    else if (pathname.startsWith("/kalender")) {
        presenceData.details = "Schaut in den Kalender";
    }
    else {
        presenceData.details = "Inaktiv...";
    }
    presence.setActivity(presenceData);
}));
presence.on("MediaKeys", key => {
    switch (key) {
        case "pause":
            break;
    }
});
function getTimestamps(videoTime, videoDuration) {
    var startTime = Date.now();
    var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
    return [Math.floor(startTime / 1000), endTime];
}
