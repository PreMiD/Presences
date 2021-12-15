const presence = new Presence({
  clientId: "647443051819565076"
});

presence.on("UpdateData", async () => {
  const path = window.location.hash.substr(1);
  if (path === "action=watch") {
    const channelstate = document
        .querySelector(
          "div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
        )
        .getAttribute("title"),
      titledetailes = document.querySelector(
        "div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
      ),
      pageData: PresenceData = {
        state: `Channel: ${channelstate}`,
        details: `Watching: ${titledetailes.textContent}`,
        largeImageKey: "icon"
      };
    presence.setActivity(pageData);
  } else if (path.includes("offset")) {
    const statedetails = document.querySelector(
        ".player-ui-bottom-bar-controls__main-info"
      ),
      movieVideo: PresenceData = {
        state: `Video: ${document.title}`,
        details: `Watching: ${statedetails.textContent}`,
        largeImageKey: "icon"
      };
    presence.setActivity(movieVideo);
  } else {
    const homepage: PresenceData = {
      details: "Browsing homepage.",
      largeImageKey: "icon"
    };
    presence.setActivity(homepage);
  }
});
