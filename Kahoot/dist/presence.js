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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMzQixRQUFRLEVBQUUsb0JBQW9CO0NBQzlCLENBQUMsQ0FBQztBQUVILElBQUksTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsYUFBYSxDQUFDO0FBRTFFLFFBQVEsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLEtBQUssSUFBSSxFQUFFO0lBQ3BDLElBQUksS0FBSyxFQUFFLElBQUksQ0FBQztJQUVoQixNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQztJQUNsQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUV0QyxJQUFJLE1BQU0sS0FBSyxJQUFJLEVBQUU7UUFDcEIsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNkLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztLQUN4QztJQUVELElBQUksQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBRXhFLFFBQVEsS0FBSyxFQUFFO1FBQ2QsS0FBSyxRQUFRO1lBQ1osS0FBSyxHQUFHLFNBQVMsQ0FBQztZQUNsQixJQUFJLEdBQUcsUUFBUSxDQUFDO1lBRWhCLE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FDM0IsUUFBUSxDQUFDLGFBQWEsQ0FBQywwQ0FBMEMsQ0FBQyxFQUNsRSxhQUFhLEVBQ2IsS0FBSyxDQUNMLENBQUM7WUFFRixNQUFNLFdBQVcsR0FB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