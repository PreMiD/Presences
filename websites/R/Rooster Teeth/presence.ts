const presence = new Presence({
  clientId: "703697546794631209"
});

const elapsed = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const path = window.location.pathname;
  var video;
  var live;
  const presenceData: PresenceData = {
    largeImageKey: "roosterteeth",
    details: "Browsing Rooster Teeth",
    startTimestamp: elapsed
  };
  if (window.location.hash.includes("#search?term=")) {
    presenceData.details = "Searching For:";
    presenceData.state = (
      document.querySelector(".search__input") as HTMLInputElement
    ).value;
  } else if (path.includes("/live/rt-tv")) {
    video = document.querySelector(".vjs-tech");
    presenceData.details = document
      .querySelector(
        ".livestream-card.livestream-schedule-item-fade-enter-done"
      )
      .querySelector(".livestream-show").textContent;
    presenceData.details +=
      " " +
      document
        .querySelector(
          ".livestream-card.livestream-schedule-item-fade-enter-done"
        )
        .querySelector(".livestream-title").textContent;
    presenceData.state = "RT-TV";
    live = true;
  } else if (document.querySelector(".vjs-tech")) {
    live = false;
    video = document.querySelector(".vjs-tech");
    if (document.querySelector(".video-details__heading")) {
      presenceData.details = document.querySelector(
        ".video-details__title"
      ).textContent;
      presenceData.state = document.querySelector(
        ".video-details__show"
      ).textContent;
    } else {
      presenceData.details =
        document.querySelector(".player-title").textContent;
      presenceData.state = "Miniplayer";
    }
  } else if (path.includes("/watch")) {
    if (document.querySelector(".video-details__heading")) {
      presenceData.details = document.querySelector(
        ".video-details__title"
      ).textContent;
      presenceData.state = document.querySelector(
        ".video-details__show"
      ).textContent;
    } else {
      presenceData.details =
        document.querySelector(".player-title").textContent;
      presenceData.state = "Miniplayer";
    }
  } else if (path.includes("/schedule")) {
    presenceData.details = "Viewing Schedule";
    for (const x in document.getElementsByClassName("schedule-day")) {
      const position = document
        .getElementsByClassName("schedule-day")
        [x].getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        presenceData.state = document
          .getElementsByClassName("schedule-day")
          [x].querySelector(".schedule-day__heading")
          .textContent.toLowerCase();
        presenceData.state =
          presenceData.state.substr(0, 1).toUpperCase() +
          presenceData.state.substr(1);
        break;
      }
    }
  } else if (path.includes("/series/")) {
    presenceData.details = "Browsing Through Videos Of:";
    presenceData.state = document.querySelector(".featured-title").textContent;
  } else if (path.includes("/channel/")) {
    presenceData.details = "Viewing Channel:";
    presenceData.state = document
      .querySelector(".carousel-container")
      .querySelector(".carousel-title")
      .textContent.split("RECENT EPISODES FROM ")[1];
  } else if (path.includes("/series")) {
    presenceData.details = "Browsing Series";
  } else if (path.includes("/episodes")) {
    if (urlParams.get("channel_id")) {
      presenceData.details = "Browsing Episodes Of:";
      presenceData.state = document
        .querySelector(".dropdown-label")
        .textContent.split("FILTER (")[1]
        .replace(")", "");
    } else {
      presenceData.details = "Browsing Episodes";
    }
  } else if (path.includes("/g/") && !path.includes("/g/all")) {
    presenceData.details = "Browsing Group:";
    if (path.includes("explore")) {
      presenceData.state = "Explore";
    } else {
      presenceData.state = document
        .querySelector(".content-sidebar")
        .querySelector(".banner-title").textContent;
    }
  } else if (path.includes("/g")) {
    presenceData.details =
      "Browsing " + (path.includes("/g/all") ? "All " : "") + "Groups";
  }
  if (video != undefined) {
    if (live) {
      presenceData.smallImageKey = video.paused ? "livepause" : "live";
      presenceData.smallImageText = video.paused
        ? "Live Playback paused"
        : "Live";
    } else {
      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused
        ? "Playback paused"
        : "Playing back";
      if (!video.paused) {
        presenceData.endTimestamp =
          Math.floor(Date.now() / 1000) -
          Math.floor(video.currentTime) +
          Math.floor(video.duration);
      } else {
        presenceData.startTimestamp = undefined;
      }
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
