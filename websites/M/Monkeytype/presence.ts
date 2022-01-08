const presence = new Presence({
    clientId: "798272335035498557"
  }),
  time = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    path = document.location.pathname.toLowerCase();
  presenceData.startTimestamp = time;
  if (path === "/") {
    presenceData.details = "Idling";
    if (
      !document.querySelector(".pageTest #result").classList.contains("hidden")
    ) {
      const statsElem = document.querySelector(".pageTest #result .stats"),
        moreStatsElem = document.querySelector(".pageTest #result .morestats"),
        stats = {
          wpm: statsElem.querySelector(".wpm .bottom").textContent,
          acc: statsElem.querySelector(".acc .bottom").textContent,
          raw: moreStatsElem.querySelector(".raw .bottom").textContent,
          char: moreStatsElem.querySelector(".key .bottom").textContent,
          con: moreStatsElem.querySelector(".consistency .bottom").textContent,
          time: moreStatsElem.querySelector(".time .bottom").textContent
        };
      presenceData.details = `Finished ${document
        .querySelector(".testType .bottom")
        .textContent.replace(/<br>/g, " ")}`;
      presenceData.state = `${stats.wpm} wpm ${stats.acc} acc ${stats.raw} raw ${stats.char} ${stats.con} consistency ${stats.time}`;
    } else if (
      document.querySelector("#words letter.correct") ||
      document.querySelector("#words letter.incorrect")
    ) {
      presenceData.details = `Typing ${
        document.querySelector(".pageTest #premidTestMode").textContent
      }`;
      presenceData.state = `${
        document.querySelector(".pageTest #largeLiveWpmAndAcc #liveWpm")
          .textContent
      } wpm ${
        document.querySelector(".pageTest #largeLiveWpmAndAcc #liveAcc")
          .textContent
      } acc`;

      if (
        document
          .querySelector("#top .config .mode .text-button.active")
          .textContent.replace(/[\t\r\n]/g, "") === "time"
      ) {
        presenceData.endTimestamp =
          Math.floor(Date.now() / 1000) +
          (parseInt(
            document.querySelector(".pageTest #premidSecondsLeft").textContent
          ) +
            1);
      }
    } else if (
      !document
        .querySelector("#leaderboardsWrapper")
        .classList.contains("hidden")
    )
      presenceData.details = "Checking leaderboards";
  } else if (path === "/about") presenceData.details = "Reading about page";
  else if (path === "/settings") presenceData.details = "Changing settings";
  else if (path === "/login") presenceData.details = "Logging in";
  else if (path === "/account") presenceData.details = "Checking stats";

  presence.setActivity(presenceData);
});
