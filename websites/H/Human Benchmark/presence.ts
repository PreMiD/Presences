const presence = new Presence({
    clientId: "799635921522655262"
  }),
  browsingTimestamp: number = Math.floor(Date.now() / 1000);

let details: string,
  state: string,
  lives: string,
  level: string,
  strikes = "0 of 3",
  numbers = "4";

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "hb"
    },
    showTime: boolean = await presence.getSetting("stamp");

  if (showTime) presenceData.startTimestamp = browsingTimestamp;

  if (document.location.pathname === "/") {
    details = "Browsing...";
    state = "On the homepage";
  } else if (document.location.pathname === "/tests/reactiontime") {
    if (!document.querySelector(".css-0")) {
      details = "Testing...";
      state = "Reaction Speed";
    } else {
      details = "Viewing Results (Reaction Speed)";
      state = `Time: ${document.querySelector(".css-0").textContent}`;
    }
  } else if (document.location.pathname === "/tests/sequence") {
    if (!document.querySelector(".css-0")) {
      details = "Testing...";
      state = "Sequence Memory";
    } else {
      details = "Viewing Results (Sequence Memory)";
      state = `${document.querySelector(".css-0").textContent}`;
    }
  } else if (document.location.pathname === "/tests/aim") {
    if (!document.querySelector(".css-0")) {
      details = "Playing...";
      state = "Aim Trainer";
    } else {
      details = "Viewing Results (Aim Trainer)";
      state = `Average Time: ${document.querySelector(".css-0").textContent}`;
    }
  } else if (document.location.pathname === "/tests/number-memory") {
    if (!document.querySelector(".level")) {
      details = "Testing...";
      state = "Number Memory";
    } else {
      details = "Viewing Results (Number Memory)";
      state = `${document.querySelector(".level > span").textContent} ${
        document.querySelector(".level > .number").textContent
      }`;
    }
  } else if (document.location.pathname === "/tests/chimp") {
    if (
      !document.querySelector(".css-0") &&
      !document.querySelector(".css-1tl77r2")
    ) {
      details = "Testing...";
      state = `Chimp Test (${numbers} numbers, ${strikes} strikes)`;
    } else if (document.querySelector(".css-1tl77r2")) {
      numbers = document.querySelector(".css-0").textContent;
      strikes = document.querySelector(".css-1tl77r2").textContent;
      details = "Testing...";
      state = `Chimp Test (${numbers} numbers, ${strikes} strikes)`;
    } else if (
      !document.querySelector(".css-1tl77r2") &&
      document.querySelector(".css-0")
    ) {
      details = "Viewing Results (Chimp Test)";
      state = `Score: ${document.querySelector(".css-0").textContent}`;
    }
  } else if (document.location.pathname === "/tests/memory") {
    if (
      !document.querySelector(".css-0") &&
      !document.querySelector(".big-score")
    ) {
      details = "Testing...";
      state = "Visual Memory";
    } else if (document.querySelector(".big-score")) {
      lives = document
        .querySelector(".big-score")
        .getElementsByClassName("score")
        .item(1)
        .textContent.split("  ")
        .join(" ");
      level = document
        .querySelector(".big-score")
        .getElementsByClassName("score")
        .item(0)
        .textContent.split("  ")
        .join(" ");
      details = "Testing...";
      state = `Visual Memory (${level}, ${lives})`;
    } else {
      details = "Viewing Results (Visual Memory)";
      state = `${document.querySelector(".css-0").textContent}`;
    }
  } else if (document.location.pathname === "/tests/hearing") {
    if (!document.querySelector(".css-0")) {
      details = "Testing...";
      state = "Hearing";
    } else {
      details = "Viewing Results (Hearing)";
      state = `Heard the frequency at: ${
        document.querySelector(".css-0").textContent
      }`;
    }
  } else if (document.location.pathname === "/tests/typing") {
    if (!document.querySelector(".css-0")) {
      details = "Testing...";
      state = "Typing";
    } else {
      details = "Viewing Results (Typing)";
      state = `WPM: ${
        document.querySelector(".css-0").textContent.split("wpm")[0]
      }`;
    }
  } else if (document.location.pathname === "/dashboard") {
    details = "Browsing...";
    state = "User's Dashboard";
  } else {
    details = "Browsing...";
    state = "An Unsupported Page";
  }

  presenceData.details = details;
  presenceData.state = state;

  presence.setActivity(presenceData);
});
