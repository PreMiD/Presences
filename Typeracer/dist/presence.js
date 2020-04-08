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
                const gameStatusLabel = document.querySelector(".gameStatusLabel")
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
                    const percentage = Math.round((lettersTyped / lettersTotal) * 10000) / 100;
                    const wpm = document
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
                    const wpm = document
                        .querySelector(".rankPanelWpm-self")
                        .textContent.toUpperCase();
                    const accuracy = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(3) > td:nth-child(2)").textContent;
                    const time = document.querySelector(".tblOwnStats > tbody:nth-child(2) > tr:nth-child(2) > td:nth-child(2)").textContent;
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
        const path = href.pathname.slice(1).split("/");
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
                const option = document
                    .querySelector("option[selected]")
                    .textContent.trim();
                const strong = document
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
                const pageNames = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFFLGlCQUEyQjtJQUNwQyxLQUFLLEVBQUUsSUFBYztJQUNyQixhQUFhLEVBQUUsSUFBYztJQUM3QixjQUFjLEVBQUUsYUFBdUI7SUFDdkMsWUFBWSxFQUFFLElBQWM7Q0FDN0IsRUFDRCxjQUFjLEdBQUc7SUFDZixTQUFTLEVBQUUsSUFBSTtJQUNmLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsRUFDRCxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBRW5CLENBQUMsR0FBUyxFQUFFO0lBQ1YsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLG9CQUFvQixFQUFFO1FBUTFDLGNBQWMsQ0FBQyxRQUFRLEdBQUcsR0FBUyxFQUFFO1lBQ25DLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDdkMsWUFBWSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQztnQkFDeEMsTUFBTSxlQUFl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