const presence = new Presence({
    clientId: "799635921522655262"
  }),
  browsingStamp: number = Math.floor(Date.now() / 1000);

let details: string,
  state: string,
  lives: string,
  level: string,
  strikes: string = "0 of 3",
  numbers: string = "4";

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "hb"
    },
    showTime: boolean = await presence.getSetting("stamp");

  presenceData.startTimestamp = showTime ? browsingStamp : null;
  if (presenceData.startTimestamp == null) delete presenceData.startTimestamp;

  if (document.location.pathname == "/") {
    details = "Browsing...";
    state = "On the homepage";
  } else if (document.location.pathname == "/tests/reactiontime") {
    if (document.querySelector(".css-0") == null) {
      details = "Testing...";
      state = "Reaction Speed";
    } else {
      details = "Viewing Results (Reaction Speed)";
      state = `Time: ${document.querySelector(".css-0").innerHTML}`;
    }
  } else if (document.location.pathname == "/tests/sequence") {
    if (document.querySelector(".css-0") == null) {
      details = "Testing...";
      state = "Sequence Memory";
    } else {
      details = "Viewing Results (Sequence Memory)";
      state = `${document.querySelector(".css-0").innerHTML}`;
    }
  } else if (document.location.pathname == "/tests/aim") {
    if (document.querySelector(".css-0") == null) {
      details = "Playing...";
      state = "Aim Trainer";
    } else {
      details = "Viewing Results (Aim Trainer)";
      state = `Average Time: ${document.querySelector(".css-0").innerHTML}`;
    }
  } else if (document.location.pathname == "/tests/number-memory") {
    if (document.querySelector(".level") == null) {
      details = "Testing...";
      state = "Number Memory";
    } else {
      details = "Viewing Results (Number Memory)";
      state = `${document.querySelector(".level > span").innerHTML} ${
        document.querySelector(".level > .number").innerHTML
      }`;
    }
  } else if (document.location.pathname == "/tests/chimp") {
    if (
      document.querySelector(".css-0") == null &&
      document.querySelector(".css-1tl77r2") == null
    ) {
      details = "Testing...";
      state = `Chimp Test (${numbers} numbers, ${strikes} strikes)`;
    } else if (document.querySelector(".css-1tl77r2") != null) {
      numbers = document.querySelector(".css-0").innerHTML;
      strikes = document.querySelector(".css-1tl77r2").innerHTML;
      details = "Testing...";
      state = `Chimp Test (${numbers} numbers, ${strikes} strikes)`;
    } else if (
      document.querySelector(".css-1tl77r2") == null &&
      document.querySelector(".css-0") != null
    ) {
      details = "Viewing Results (Chimp Test)";
      state = `Score: ${document.querySelector(".css-0").innerHTML}`;
    }
  } else if (document.location.pathname == "/tests/memory") {
    if (
      document.querySelector(".css-0") == null &&
      document.querySelector(".big-score") == null
    ) {
      details = "Testing...";
      state = `Visual Memory`;
    } else if (document.querySelector(".big-score") != null) {
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
      state = `${document.querySelector(".css-0").innerHTML}`;
    }
  } else if (document.location.pathname == "/tests/hearing") {
    if (document.querySelector(".css-0") == null) {
      details = "Testing...";
      state = "Hearing";
    } else {
      details = "Viewing Results (Hearing)";
      state = `Heard the frequency at: ${
        document.querySelector(".css-0").innerHTML
      }`;
    }
  } else if (document.location.pathname == "/tests/typing") {
    if (document.querySelector(".css-0") == null) {
      details = "Testing...";
      state = "Typing";
    } else {
      details = "Viewing Results (Typing)";
      state = `WPM: ${
        document.querySelector(".css-0").innerHTML.split("wpm")[0]
      }`;
    }
  } else if (document.location.pathname == "/dashboard") {
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
