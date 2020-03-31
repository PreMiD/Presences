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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUMvQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFDdEMsWUFBWSxHQUFHO0lBQ2IsT0FBTyxFQUFVLGlCQUFpQjtJQUNsQyxLQUFLLEVBQVUsSUFBSTtJQUNuQixhQUFhLEVBQVUsSUFBSTtJQUMzQixjQUFjLEVBQVUsYUFBYTtJQUNyQyxZQUFZLEVBQVUsSUFBSTtDQUMzQixFQUNELGNBQWMsR0FBRztJQUNmLFNBQVMsRUFBRSxJQUFJO0lBQ2YsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxJQUFJLFFBQVEsQ0FBQyxTQUFTO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFDRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDO0lBQ2pDLENBQUM7Q0FDRixFQUNELFNBQVMsR0FBRyxJQUFJLENBQUM7QUFFbkIsQ0FBQyxHQUFHLEVBQUU7SUFDSixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssb0JBQW9CLEVBQUU7UUFRMUMsY0FBYyxDQUFDLFFBQVEsR0FBRyxHQUFHLEVBQUU7WUFDN0IsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUN2QyxZQUFZLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO2dCQUN4QyxJQUFJLGVBQWUs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