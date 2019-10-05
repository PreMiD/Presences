var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new(P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var presence = new Presence({
    clientId: "629819064642043925",
    mediaKeys: false
});
var play, artist, track, title;
var browsingStamp = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
    let presenceData = {
        largeImageKey: "bouncelogo"
    };
    if (document.URL.includes("#Bounce.News")) {
        title = document.querySelector("body > div.web > div > div > div > div > div.pageajax > div.leftnews1 > center > b:nth-child(1)");
        presenceData.details = "Reading article:";
        if (title.innerText.length > 128) {
            presenceData.state = title.innerText.substring(0, 125) + "...";
        } else {
            presenceData.state = title.innerText;
        }
        presenceData.smallImageKey = "reading";
        presence.setActivity(presenceData);
    } else if (document.URL.includes("#Bounce.Timetable")) {
        presenceData.details = "Viewing the timetable";
        presence.setActivity(presenceData);
    } else if (document.URL.includes("#Bounce.Home")) {
        play = document.querySelector("body > div.web > div > div > div > div > div.player > div.stats-p > div > div.buttons > center > div > i");
        play = play.className;
        switch (play) {
            case "togl fa fa-play":
                presenceData.details = "Viewing the home page";
                presence.setActivity(presenceData);
                break;
            case "togl fa fa-pause":
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function () {
                    presence.setActivity(presenceData);
                    if (this.readyState == 4 && this.status == 200) {
                        var data = JSON.parse(this.responseText);
                        presenceData.details = data.track + " (Artist: " + data.artist + ")";
                        presenceData.state = (data.dj + " - " + data.listeners + " listeners");
                        presence.setActivity();
                    }
                }
        }
    } else {
        presence.setActivity();
        presence.setTrayTitle();
    }
}));
