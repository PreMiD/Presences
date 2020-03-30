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