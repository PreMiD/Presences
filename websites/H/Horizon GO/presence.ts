const presence = new Presence({
  clientId: "647443051819565076"
});

presence.on("UpdateData", async () => {
  const path = window.location.hash.substr(1);
  if (path === "action=watch") {
    presence.setActivity({
      state: `Channel: ${document
        .querySelector(
          "div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
        )
        .getAttribute("title")}`,
      details: `Watching: ${
        document.querySelector(
          "div.player-linear-bottom-bar__channelstrip:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(4) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
        ).textContent
      }`,
      largeImageKey: "icon"
    });
  } else if (path.includes("offset")) {
    presence.setActivity({
      state: `Video: ${document.title}`,
      details: `Watching: ${
        document.querySelector(".player-ui-bottom-bar-controls__main-info")
          .textContent
      }`,
      largeImageKey: "icon"
    });
  } else {
    presence.setActivity({
      details: "Browsing homepage.",
      largeImageKey: "icon"
    });
  }
});
