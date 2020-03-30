var presence = new Presence({
    clientId: "655247212728811530"
});
var browsingStamp = Math.floor(Date.now() / 1000), href = new URL(document.location.href), presenceData = {
    details: "In construction",
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
                let gameStatusLabel = document.querySelector(".gameStatusLabel")
                    .textContent;
                if (gameStatusLabel === "Waiting for more people...") {
                    presenceData.state = "Waiting for more people...";
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race is about to start!") {
                    let timeString = document.querySelector(".countdownPopup .time")
                        .textContent;
                    presenceData.state = "Counting down...";
                    presenceData.endTimestamp =
                        Math.floor(Date.now() / 1000) +
                            Number(document
                                .querySelector(".countdownPopup .time")
                                .textContent.slice(1));
                    raceStamp = null;
                }
                else if (gameStatusLabel === "The race is on! Type the text below:" ||
                    gameStatusLabel === "Go!") {
                    const textBox = document.querySelector("table.gameView > tbody > tr:nth-child(2) > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr:nth-child(1) > td > div > div");
                    const lettersTotal = textBox.textContent.length;
                    let lettersTyped = 0;
                    for (var i in textBox.children) {
                        if (typeof textBox.children[i] !== "number" &&
                            typeof textBox.children[i] !== "function") {
                            if (getComputedStyle(textBox.children[i]).color ===
                                "rgb(153, 204, 0)") {
                                lettersTyped += textBox.children[i].textContent.length;
                            }
                        }
                    }
                    let percentage = Math.round((lettersTyped / lettersTotal) * 10000) / 100;
                    let wpm = document
                        .querySelector(".rankPanelWpm-self")
                        .textContent.toUpperCase();
                    presenceData.state = `${percentage}%, ${wpm}`;
                    if (raceStamp === null)
                        raceStamp = Math.floor(Date.now() / 1000);
                    presenceData.startTimestamp = raceStamp;
                }
                else if (gameStatusLabel === "The race has ended." ||
                    gameStatusLabel.startsWith("You finished")) {
                    presenceData.details = "Just finished with a race";
                    let wpm = document
                        .querySelector(".rankPanelWpm-self")
                        .textContent.toUpperCase();
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
                presenceData.state =
                    document.querySelector("#profileUsername").textContent || null;
            }
            else if (path[1] === "text_info") {
                presenceData.details = "Viewing a text";
                presenceData.state = href.searchParams.get("id");
            }
            else if (path[1] === "result") {
                presenceData.details = "Viewing a race result";
                presenceData.state = `Race ${href.searchParams.get("id").split("|")[2]} of ${href.searchParams
                    .get("id")
                    .split("|")[1]
                    .slice(3)}`;
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
                let option = document
                    .querySelector("option[selected]")
                    .textContent.trim();
                let strong = document
                    .querySelector("div.themeContent > div:nth-child(5) > strong")
                    .textContent.trim()
                    .slice(0, -1)
                    .split(" ");
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
                    upgrade_account: "Upgrade your account",
                    tos: "Terms of Service",
                    privacy_poicy: "Privacy Policy"
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
    presence.on("UpdateData", async () => {
        resetData();
        updateCallback.function();
        cleanData();
        presence.setActivity(presenceData);
    });
}
else {
    cleanData();
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
function resetData() {
    presenceData = {
        details: "In construction",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUNoRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2QsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMxQixFQUNELGNBQWMsR0FBRztJQUNoQixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNoQyxDQUFDO0NBQ0QsRUFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBRWxCLENBQUMsR0FBRyxFQUFFO0lBQ0wsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBUTNDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFO1lBQzlCLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDeEMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsSUFBSSxlQUFl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