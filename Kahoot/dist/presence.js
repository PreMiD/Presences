var presence = new Presence({
    clientId: "612793327510749210"
});
var oldUrl, elapsed, state, gameName, gameScore, gamePlace, gameQuestions;
presence.on("UpdateData", async () => {
    var title, info;
    const href = window.location.href;
    const path = window.location.pathname;
    if (oldUrl !== href) {
        oldUrl = href;
        elapsed = Math.floor(Date.now() / 1000);
    }
    href.match("https://kahoot.it") ? (state = "player") : (state = "host");
    switch (state) {
        case "player":
            title = "Playing";
            info = "Idling";
            const playerName = stripText(document.querySelector(".question-top-bar__Username-sc-1pwisow-1"), "Player Name", false);
            const playerScore = stripText(document.querySelector(".question-top-bar__Score-sc-1pwisow-4"), "Player Score", false);
            const playerPlace = stripText(document.querySelector(".rank-text__Rank-sc-1smelag-0 > span"), "Player Place", false);
            if (playerName) {
                gameName = playerName;
            }
            if (playerScore) {
                gameScore = playerScore;
            }
            if (playerPlace) {
                gamePlace = playerPlace.slice(10);
            }
            const join = path.match("/join");
            if (join) {
                info = "Joining Game";
            }
            const instructions = path.match("/instructions");
            if (instructions) {
                info = "In Lobby";
            }
            else {
                if (gameName && gamePlace && gameScore) {
                    title = `Playing | ${gameName} - ${gameScore} - ${gamePlace}`;
                }
            }
            const playerStart = path.match("/start");
            if (playerStart) {
                info = "Game Starting";
            }
            const playerGetReady = path.match("/getready");
            if (playerGetReady) {
                info = "Waiting For Question";
            }
            const playerGameBlock = path.match("/gameblock");
            if (playerGameBlock) {
                info = "Viewing Question";
            }
            const answerSent = path.match("/answer/sent");
            if (answerSent) {
                info = "Waiting For Results";
            }
            const answerResult = path.match("/answer/result");
            if (answerResult) {
                info = "Viewing Results";
            }
            const ranking = path.match("ranking");
            if (ranking) {
                info = "Viewing Rankings";
            }
            const playerFeedback = path.match("/feedback");
            if (playerFeedback) {
                info = "Giving Feedback";
            }
            break;
        case "host":
            title = "Hosting";
            info = "Idling";
            const hostQuestions = stripText(document.querySelector(".status-bar__TopBar-ivth8h-1 > header > span"), "Host Questions", false);
            if (hostQuestions && hostQuestions.match("Question")) {
                gameQuestions = hostQuestions.slice(9);
            }
            const intro = path.match("/intro");
            if (intro) {
                info = "Loading Game";
            }
            const lobby = path.match("/lobby");
            if (lobby) {
                info = "In Lobby";
            }
            else {
                if (gameQuestions) {
                    title = `Hosting | ${gameQuestions}`;
                }
            }
            const hostStart = path.match("/start");
            if (hostStart) {
                info = "Game Starting";
            }
            const hostGetReady = path.match("/getready");
            if (hostGetReady) {
                info = "Preparing Question";
            }
            const hostGameBlock = path.match("/gameblock");
            if (hostGameBlock) {
                info = "Showing Question";
            }
            const scoreboard = path.match("/scoreboard");
            if (scoreboard) {
                info = "Viewing Scoreboard";
            }
            const gameover = path.match("/gameover");
            if (gameover) {
                info = "Game Over";
            }
            const hostFeedback = path.match("/feedback");
            if (hostFeedback) {
                info = "Giving Feedback";
            }
            break;
        default:
            break;
    }
    var data = {
        details: title,
        state: info,
        largeImageKey: "kahoot",
        startTimestamp: elapsed
    };
    presence.setActivity(data, true);
});
var genericStyle = "font-weight: 800; padding: 2px 5px; color: white;";
function logInfo(name, message) {
    console.log(`%c${name}%cINFO%c ${message}`, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #5050ff;", "color: unset;");
}
function logError(name, message) {
    console.log(`%c${name}%cINFO%c ${message}`, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle + "border-radius: 0 25px 25px 0; background: #ff5050;", "color: unset;");
}
function logSuccess(name, message) {
    console.log(`%c${name}%cINFO%c ${message}`, genericStyle + "border-radius: 25px 0 0 25px; background: #596cae;", genericStyle +
        "border-radius: 0 25px 25px 0; background: #50ff50; color: black;", "color: unset;");
}
function stripText(element, id = "None", log = true) {
    if (element && element.firstChild) {
        return element.firstChild.textContent;
    }
    else {
        if (log) {
            logError("Kahoot", "An error occurred while stripping data off the page. Please contact Alanexei on the PreMiD Discord server, and send him a screenshot of this error. ID: " +
                id);
        }
        return null;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDO0FBRTFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ25DLElBQUksS0FBSyxFQUFFLElBQUksQ0FBQztJQUVoQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV0QyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDbkIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN6QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRXhFLFFBQVEsS0FBSyxFQUFFO1FBQ2IsS0FBSyxRQUFRO1lBQ1gsS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsQixJQUFJLEdBQUcsUUFBUSxDQUFDO1lBRWhCLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FDMUIsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQ0FBMEMsQ0FBQyxFQUNsRSxhQUFhLEVBQ2IsS0FBSyxDQUNOLENBQUM7WUFFRixNQUFNLFdBQVcsR0FB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