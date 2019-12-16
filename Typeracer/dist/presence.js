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
    clientId: "655247212728811530",
    mediaKeys: false
});
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: 'In construction',
    state: null,
    largeImageKey: "lg",
    startTimestamp: browsingStamp,
    endTimestamp: null
}, updateCallback = {
    _function: null,
    get function() {
        return this._function;
    },
    set function(parameter) {
        this._function = parameter;
    },
    get present() {
        return this._function !== null;
    }
}, raceStamp = null;
(() => {
    if (href.hostname === "play.typeracer.com") {
        updateCallback.function = () => {
            if (document.querySelector(".gameView")) {
                presenceData.details = "Playing a race";
                let gameStatusLabel = document.querySelector(".gameStatusLabel").textContent;
                if (gameStatusLabel === "Waiting for more people...") {
                    presenceData.state = "Waiting for more people...";
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race is about to start!") {
                    let timeString = document.querySelector(".countdownPopup .time").textContent;
                    presenceData.state = "Counting down...";
                    presenceData.endTimestamp = Math.floor(Date.now() / 1000) + Number(document.querySelector(".countdownPopup .time").textContent.slice(1));
                    raceStamp = null;
                }
                else if (gameStatusLabel === "The race is on! Type the text below:" || gameStatusLabel === "Go!") {
                    const textBox = document.querySelector("table.gameView > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div");
                    const lettersTotal = textBox.textContent.length;
                    let lettersTyped = 0;
                    for (var i in textBox.children) {
                        if (typeof textBox.children[i] !== "number" && typeof textBox.children[i] !== "function") {
                            if (getComputedStyle(textBox.children[i]).color === "rgb(153, 204, 0)") {
                                lettersTyped += textBox.children[i].textContent.length;
                            }
                        }
                    }
                    let percentage = Math.round((lettersTyped / lettersTotal) * 10000) / 100;
                    let wpm = document.querySelector(".rankPanelWpm-self").textContent.toUpperCase();
                    presenceData.state = `${percentage}%, ${wpm}`;
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race has ended." || gameStatusLabel.startsWith("You finished")) {
                    presenceData.details = "Just finished with a race";
                    let wpm = document.querySelector(".rankPanelWpm-self").textContent.toUpperCase();
                    let accuracy = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)").textContent;
                    let time = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)").textContent;
                    presenceData.state = `${wpm}, ${accuracy} acc., ${time}`;
                    presenceData.startTimestamp = browsingStamp;
                }
            }
            else {
                presenceData.details = "Viewing the home page";
            }
        };
    }
    else if (href.hostname === "data.typeracer.com") {
        let path = href.pathname.slice(1).split("/");
        if (path[0] === "pit") {
            if (path[1] === "profile") {
                presenceData.details = "Viewing a racer profile";
                presenceData.state = document.querySelector("#profileUsername").textContent || null;
            }
            else if (path[1] === "text_info") {
                presenceData.details = "Viewing a text";
                presenceData.state = href.searchParams.get("id");
            }
            else if (path[1] === "result") {
                presenceData.details = "Viewing a race result";
                presenceData.state = `Race ${href.searchParams.get("id").split("|")[2]} of ${href.searchParams.get("id").split("|")[1].slice(3)}`;
            }
            else if (path[1] === "race_history") {
                presenceData.details = "Viewing someone's race history";
                presenceData.state = href.searchParams.get("user") || null;
            }
            else if (path[1] === "home") {
                presenceData.details = "Viewing the pit stop";
            }
            else if (path[1] === "competitions") {
                presenceData.details = "Viewing the competition result";
                let option = document.querySelector("option[selected]").textContent.trim();
                let strong = document.querySelector("div.themeContent > div:nth-child(5) > strong").textContent.trim().slice(0, -1).split(" ");
                if (option === "day")
                    presenceData.state = strong.join(" ");
                else if (option === "week")
                    presenceData.state = `${strong[1]} ${strong[2]}, ${strong[4]}`;
                else if (option === "month")
                    presenceData.state = `${strong[3]} ${strong[4]}`;
                else if (option === "year")
                    presenceData.state = strong[2];
            }
            else if (path[1] === "login") {
                presenceData.details = "Logging in";
            }
            else {
                let pageNames = {
                    "upgrade_account": "Upgrade your account",
                    "tos": "Terms of Service",
                    "privacy_poicy": "Privacy Policy"
                };
                presenceData.details = "Viewing a page";
                presenceData.state = pageNames[path[1]];
            }
        }
        else if (path[0] === "misc") {
            if (path[1] === "about") {
                presenceData.details = "Viewing a page";
                presenceData.state = "About";
            }
        }
        else if (path[0] === "admin") {
            presenceData.details = "Viewing school admin pages";
        }
    }
})();
if (updateCallback.present) {
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        resetData();
        updateCallback.function();
        cleanData();
        presence.setActivity(presenceData);
    }));
}
else {
    cleanData();
    presence.on("UpdateData", () => __awaiter(this, void 0, void 0, function* () {
        presence.setActivity(presenceData);
    }));
}
function resetData() {
    presenceData = {
        details: 'In construction',
        state: null,
        largeImageKey: "lg",
        startTimestamp: browsingStamp,
        endTimestamp: null
    };
}
function cleanData() {
    if (presenceData.details === null)
        delete presenceData.details;
    if (presenceData.state === null)
        delete presenceData.state;
    if (presenceData.startTimestamp === null)
        delete presenceData.startTimestamp;
    if (presenceData.endTimestamp === null)
        delete presenceData.endTimestamp;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0lBQzlCLFNBQVMsRUFBRSxLQUFLO0NBQ2hCLENBQUMsQ0FBQTtBQUVGLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFXLGlCQUFpQjtJQUNuQyxLQUFLLEVBQVcsSUFBSTtJQUNwQixhQUFhLEVBQVcsSUFBSTtJQUM1QixjQUFjLEVBQVcsYUFBYTtJQUN0QyxZQUFZLEVBQVcsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtJQUMzQixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQTtJQUMvQixDQUFDO0NBQ0QsRUFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBRWxCLENBQUMsR0FBRyxFQUFFO0lBRUwsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBUzNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBRTlCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFFeEMsWUFBWSxDQUFDLE9BQU8sR0FB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