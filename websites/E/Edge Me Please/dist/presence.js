const presence = new Presence({
    clientId: "631199223735517185"
});
function setTime(a) {
    var time = new Date(Date.now());
    time.setSeconds(time.getSeconds() + a);
    return Math.floor(time / 1000);
}
function findParents(b, a) {
    var r;
    for (let i = 0; i < b.length; i++) {
        if (b[i][0] == a) {
            r = b[i];
        }
    }
    return r;
}
var messages = {
    finish: [
        [
            "STOP! Sorry, no cumshot for you. <br />Try again, maybe you will get lucky next time... Now get your hands off your dick until this is over.",
            30,
            "Unable to Cum"
        ],
        ["CUM! DO IT NOW", 15, "Cumming"],
        ["CUM! Take your time, no rush ;)", 60, "Cumming Slowly"],
        ["CUM NOW! Make it the biggest orgasm you ever had.", 25, "Cumming Big"],
        ["CUM!", 25, "Cumming"],
        [
            "You have 5 seconds to start cumming, otherwise it's game over!",
            6,
            "Cumming Faster than flash"
        ],
        ["You can cum now. GO!", 25, "Cumming"]
    ],
    stop: [
        [
            "STOP TOUCHING! Calm down, be ready for the next one...",
            25,
            "being ready for next instruction"
        ],
        ["No touching!", 20, "isn't touching his dick"],
        ["STOP! Quick break ;-)", 10, "taking a quick break"],
        ["Stop! and....", 3, "is Stopped.."],
        ["Hands off your cock NOW", 25, "can't touch his dick"],
        ["Hands behind your head", 25, "his hand is behind his head"],
        ["Raise your hands upwards", 20, "is raising hands"],
        ["Fingers on your nipples.", 25, "playing with his nipples"],
        ["Flex your biceps", 25, "flexing biceps"],
        ["STOP NOW", 15, "is Stopped"],
        ["STOP", 25, "is Stopped"],
        ["DON'T CUM! Stop touching.", 25, "can't Cum yet"]
    ],
    go: [
        ["You can jerk off now!", 30, "jerking off slowly"],
        ["Jerk off as fast as you can NOW!", 15, "jerking off super fast"],
        ["Go HARD and FAST", 10, "jerking off hard and fast"],
        ["Jerk off", 30, "Jerking off"],
        ["Do you want to cum?", 20, "wants to cum"],
        ["Getting close?", 20, "getting close to cum"],
        ["Wank it", 30, "wanking dick"],
        ["Wank", 25, "wanking"],
        ["Stroke", 25, "stroking dick"],
        ["Go SLOW and steady...", 30, "stroking slow and steady"],
        ["Use your other hand!", 20, "using wrong hand to wank"],
        [
            "Jerk off ONLY the tip, use only TWO FINGERS.",
            25,
            "Playing with penis tip with 2 fingers"
        ],
        ["Jerk off NOW", 30, "Jerking off close to cum"],
        ["Squeeze your balls", 10, "Squeezing balls"],
        ["Gently slap your balls", 10, "slapping his balls"]
    ],
    first: [
        "This is the warm-up round. Start jerking off and try to get to the edge when the bar gets to 100% of the EDGE zone.<br>You should be ready to cum when the bar reaches the CUM zone.<br>Try to get as close as possible, it will make the rest of the game even more fun!"
    ],
    speed: [
        "The game will go faster now, remember NOT to cum yet!",
        "This is the final phase, you may be allowed to cum any moment now!"
    ]
};
var gomsgs = [];
var stopmsgs = [];
var finishmsgs = [];
var elapsed;
for (let i = 0; i < messages["go"].length; i++) {
    gomsgs += messages["go"][i][0];
}
for (let i = 0; i < messages["stop"].length; i++) {
    stopmsgs += messages["stop"][i][0];
}
for (let i = 0; i < messages["finish"].length; i++) {
    finishmsgs += messages["finish"][i][0];
}
presence.on("UpdateData", async () => {
    if (document.location.pathname == "/") {
        var choosen = document.getElementById("choose").style.display != "none";
        if (choosen) {
            elapsed = Math.floor(Date.now / 1000);
            let presenceData = {
                details: "Preparing to Edge",
                state: `choosing settings `,
                largeImageKey: "logo",
                startTimestamp: elapsed
            };
            presence.setActivity(presenceData);
        }
        else {
            let presenceData;
            var msg = document.getElementById("message").innerText;
            if (gomsgs.includes(msg)) {
                var cr = findParents(messages["go"], msg);
                presenceData = {
                    details: cr[2],
                    largeImageKey: "logo",
                    endTimestamp: setTime(cr[1])
                };
                presence.setActivity(presenceData);
            }
            else if (finishmsgs.includes(msg)) {
                var cr = findParents(messages["finish"], msg);
                presenceData = {
                    details: cr[2],
                    largeImageKey: "logo",
                    endTimestamp: setTime(cr[1])
                };
                presence.setActivity(presenceData);
            }
            else if (stopmsgs.includes(msg)) {
                var cr = findParents(messages["stop"], msg);
                presenceData = {
                    details: cr[2],
                    largeImageKey: "logo",
                    endTimestamp: setTime(cr[1])
                };
                presence.setActivity(presenceData);
            }
            else if (messages["first"][0] ==
                document.getElementById("message").children[0].innerHTML) {
                elapsed = Math.floor(Date.now / 1000);
                let presenceData = {
                    details: "jerking of slowly for edging",
                    largeImageKey: "logo",
                    startTimestamp: elapsed
                };
                presence.setActivity(presenceData);
            }
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUM1QixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsT0FBTyxDQUFDLENBQVM7SUFDeEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFFLElBQVksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUMxQyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsQ0FBaUIsRUFBRSxDQUFTO0lBQy9DLElBQUksQ0FBTSxDQUFDO0lBQ1gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDVjtLQUNGO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsSUFBSSxRQUFRLEdBQUc7SUFDYixNQUFNLEVBQUU7UUFDTjtZQUNFLDhJQUE4STtZQUM5SSxFQUFFO1lBQ0YsZUFBZTtTQUNoQjtRQUNELENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQztRQUNqQyxDQUFDLGlDQUFpQyxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsQ0FBQztRQUN6RCxDQUFDLG1EQUFtRCxFQUFFLEVBQUUsRUFBRSxhQUFhLENBQUM7UUFDeEUsQ0FBQyxN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