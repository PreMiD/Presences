let presence = new Presence({
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
            var msg = document.getElementById("message").innerText;
            if (gomsgs.includes(msg)) {
                var cr = findParents(messages["go"], msg);
                let presenceData = {
                    details: cr[2],
                    largeImageKey: "logo",
                    endTimestamp: setTime(cr[1])
                };
                presence.setActivity(presenceData);
            }
            else if (finishmsgs.includes(msg)) {
                var cr = findParents(messages["finish"], msg);
                let presenceData = {
                    details: cr[2],
                    largeImageKey: "logo",
                    endTimestamp: setTime(cr[1])
                };
                presence.setActivity(presenceData);
            }
            else if (stopmsgs.includes(msg)) {
                var cr = findParents(messages["stop"], msg);
                let presenceData = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2VuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9wcmVzZW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFJLFFBQVEsR0FBRyxJQUFJLFFBQVEsQ0FBQztJQUMxQixRQUFRLEVBQUUsb0JBQW9CO0NBQy9CLENBQUMsQ0FBQztBQUVILFNBQVMsT0FBTyxDQUFDLENBQUM7SUFDaEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDdkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFNLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDdkIsSUFBSSxDQUFDLENBQUM7SUFDTixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNWO0tBQ0Y7SUFDRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRCxJQUFJLFFBQVEsR0FBRztJQUNiLE1BQU0sRUFBRTtRQUNOO1lBQ0UsOElBQThJO1lBQzlJLEVBQUU7WUFDRixlQUFlO1NBQ2hCO1FBQ0QsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDO1FBQ2pDLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxFQUFFLGdCQUFnQixDQUFDO1FBQ3pELENBQUMsbURBQW1ELEVBQUUsRUFBRSxFQUFFLGFBQWEsQ0FBQztRQUN4RSxDQUFDLE1B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