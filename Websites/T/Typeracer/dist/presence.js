var presence = new Presence({
    clientId: "655247212728811530"
});
var currentURL = new URL(document.location.href), currentPath = currentURL.pathname.slice(1).split("/"), browsingStamp = Math.floor(Date.now() / 1000), presenceData = {
    details: "Viewing an unsupported page",
    largeImageKey: "lg",
    startTimestamp: browsingStamp
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
};
function resetData() {
    currentURL = new URL(document.location.href);
    currentPath = currentURL.pathname.slice(1).split("/");
    presenceData = {
        details: "Viewing an unsupported page",
        largeImageKey: "lg",
        startTimestamp: browsingStamp
    };
}
(() => {
    var raceStamp = null;
    if (currentURL.hostname === "play.typeracer.com") {
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
                    for (const i in textBox.children) {
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
    else if (currentURL.hostname === "data.typeracer.com") {
        if (currentPath[0] === "pit") {
            if (currentPath[1] === "profile") {
                presenceData.details = "Viewing a racer profile";
                presenceData.state =
                    document.querySelector("#profileUsername").textContent || null;
            }
            else if (currentPath[1] === "text_info") {
                presenceData.details = "Viewing a text";
                presenceData.state = currentURL.searchParams.get("id");
            }
            else if (currentPath[1] === "result") {
                presenceData.details = "Viewing a race result";
                presenceData.state = `Race ${currentURL.searchParams.get("id").split("|")[2]} of ${currentURL.searchParams.get("id").split("|")[1].slice(3)}`;
            }
            else if (currentPath[1] === "race_history") {
                presenceData.details = "Viewing someone's race history";
                presenceData.state = currentURL.searchParams.get("user") || null;
            }
            else if (currentPath[1] === "home") {
                presenceData.details = "Viewing the pit stop";
            }
            else if (currentPath[1] === "competitions") {
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
            else if (currentPath[1] === "login") {
                presenceData.details = "Logging in";
            }
            else {
                const pageNames = {
                    upgrade_account: "Upgrade your account",
                    tos: "Terms of Service",
                    privacy_poicy: "Privacy Policy"
                };
                presenceData.details = "Viewing a page";
                presenceData.state = pageNames[currentPath[1]];
            }
        }
        else if (currentPath[0] === "misc") {
            if (currentPath[1] === "about") {
                presenceData.details = "Viewing a page";
                presenceData.state = "About";
            }
        }
        else if (currentPath[0] === "admin") {
            presenceData.details = "Viewing school admin pages";
        }
    }
})();
if (updateCallback.present) {
    presence.on("UpdateData", async () => {
        resetData();
        updateCallback.function();
        presence.setActivity(presenceData);
    });
}
else {
    presence.on("UpdateData", async () => {
        presence.setActivity(presenceData);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQzlDLFdBQVcsR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFDN0MsWUFBWSxHQUFpQjtJQUMzQixPQUFPLEVBQUUsNkJBQTZCO0lBQ3RDLGFBQWEsRUFBRSxJQUFJO0lBQ25CLGNBQWMsRUFBRSxhQUFhO0NBQzlCLEVBQ0QsY0FBYyxHQUFHO0lBQ2YsU0FBUyxFQUFFLElBQWdCO0lBQzNCLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsU0FBUztRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO0lBQ0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQztBQUtKLFNBQVMsU0FBUztJQUNoQixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxXQUFXLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RELFlBQVks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