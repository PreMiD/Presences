const presence = new Presence({
  clientId: "661889916635971616"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "icon"
  };

  if (document.getElementsByClassName("player-controls").length == 0) {
    presenceData.smallImageKey = "more";

    if (document.location.pathname == "/podcasts") {
      presenceData.details = "Viewing subscriptions";
    } else if (
      document.location.pathname.startsWith("/podcasts/") ||
      document.location.pathname.startsWith("/discover/podcast/")
    ) {
      presenceData.details = "Viewing podcast";
      presenceData.state =
        document.getElementsByClassName(
          "title-and-actions"
        )[0].children[0].textContent;
    } else if (document.location.pathname == "/discover") {
      presenceData.details = "Viewing discover page";
    } else if (document.location.pathname.startsWith("/discover/list/")) {
      presenceData.details = "Viewing discover page";
      presenceData.state = document.getElementsByTagName("h1")[0].textContent;
    } else if (document.location.pathname == "/new-releases") {
      presenceData.details = "Viewing new releases";
    } else if (document.location.pathname == "/in-progress") {
      presenceData.details = "Viewing in-progress episodes";
    } else if (document.location.pathname == "/starred") {
      presenceData.details = "Viewing starred episodes";
    } else if (document.location.pathname == "/profile") {
      presenceData.details = "Viewing profile";
    } else if (document.location.pathname == "/uploaded-files") {
      presenceData.details = "Viewing uploaded files";
    } else if (document.location.pathname == "/history") {
      presenceData.details = "Viewing listening history";
    } else if (document.location.pathname == "/stats") {
      presenceData.details = "Viewing listening stats";
      presenceData.state =
        "Listened for " +
        document.getElementsByClassName("styled__TimeListened-sc-1nd51k4-2")[0]
          .textContent;
    } else if (document.location.pathname.startsWith("/settings/")) {
      presenceData.details = "Changing settings";
    }
  } else {
    presenceData.details = document.getElementsByClassName(
      "episode-title player_episode"
    )[0].textContent;
    presenceData.state = document.getElementsByClassName(
      "podcast-title player_podcast_title"
    )[0].textContent;

    const time = document
      .getElementsByClassName("time-text current-time")[0]
      .textContent.split(":")
      .map((n) => Number(n));
    if (time.length == 3) {
      presenceData.startTimestamp =
        Date.now() - (time[0] * 3600 + time[1] * 60 + time[2]) * 1000;
    } else {
      presenceData.startTimestamp =
        Date.now() - (time[0] * 60 + time[1]) * 1000;
    }

    if (document.getElementsByClassName("pause_button").length == 0) {
      presenceData.smallImageKey = "pause";
      delete presenceData.startTimestamp;
    } else {
      presenceData.smallImageKey = "play";
    }
  }

  presence.setActivity(presenceData);
});
