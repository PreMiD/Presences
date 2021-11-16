const presence = new Presence({
  clientId: "631199223735517185"
});

function setTime(a: number): number {
  const time = new Date(Date.now());
  time.setSeconds(time.getSeconds() + a);
  return Math.floor(time.getTime() / 1000);
}

function findParents(b: (string | [string, number, string])[], a: string) {
  let r;
  for (let i = 0; i < b.length; i++) if (b[i][0] === a) r = b[i];

  return r;
}

const messages: {
  [name: string]: ([string, number, string] | string)[];
} = {
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

let gomsgs: string, stopmsgs: string, finishmsgs: string, elapsed;

for (let i = 0; i < messages.go.length; i++) gomsgs += messages.go[i][0];

for (let i = 0; i < messages.stop.length; i++) stopmsgs += messages.stop[i][0];

for (let i = 0; i < messages.finish.length; i++)
  finishmsgs += messages.finish[i][0];

presence.on("UpdateData", async () => {
  if (document.location.pathname === "/") {
    const choosen = document.getElementById("choose").style.display !== "none";

    if (choosen) {
      elapsed = Math.floor(Date.now() / 1000);
      const presenceData = {
        details: "Preparing to Edge",
        state: "choosing settings ",
        //largeImageKey: "banner",
        largeImageKey: "logo",
        startTimestamp: elapsed
      };

      presence.setActivity(presenceData);
    } else {
      let presenceData;
      const msg = document.getElementById("message").innerText;
      if (gomsgs.includes(msg)) {
        const cr = findParents(messages.go, msg) as [string, number, string];
        presenceData = {
          details: cr[2],
          //largeImageKey: "banner",
          largeImageKey: "logo",
          endTimestamp: setTime(cr[1])
        };
        presence.setActivity(presenceData);
      } else if (finishmsgs.includes(msg)) {
        const cr = findParents(messages.finish, msg) as [
          string,
          number,
          string
        ];
        presenceData = {
          details: cr[2],
          //largeImageKey: "banner",
          largeImageKey: "logo",
          endTimestamp: setTime(cr[1])
        };
        presence.setActivity(presenceData);
      } else if (stopmsgs.includes(msg)) {
        const cr = findParents(messages.stop, msg) as [string, number, string];
        presenceData = {
          details: cr[2],
          //largeImageKey: "banner",
          largeImageKey: "logo",
          endTimestamp: setTime(cr[1])
        };

        presence.setActivity(presenceData);
      } else if (
        messages.first[0] ===
        document.getElementById("message").children[0].innerHTML
      ) {
        elapsed = Math.floor(Date.now() / 1000);
        const presenceData = {
          details: "jerking of slowly for edging",
          //largeImageKey: "banner",
          largeImageKey: "logo",
          startTimestamp: elapsed
        };
        presence.setActivity(presenceData);
      }
    }
  }
});
