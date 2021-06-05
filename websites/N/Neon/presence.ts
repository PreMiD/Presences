const presence = new Presence({
    clientId: "837985880408457217"
  }),
  timestamp = Math.floor(Date.now() / 1000);

function findElement(tagName: string, className: string): Element {
  return Array.from(document.querySelectorAll(tagName)).find((x) =>
    x.className.includes(className)
  );
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "key",
      details: "Browsing...",
      startTimestamp: timestamp
    },
    pathname = document.location.pathname;

  if (pathname.includes("/series/")) {
    presenceData.details = "Viewing series:";
    presenceData.state = document.querySelector(
      '[data-lbx-e2e="show-title"]'
    )?.textContent;

    presenceData.buttons = [
      {
        label: "View Series",
        url: document.URL
      }
    ];
  } else if (pathname.includes("/movie/")) {
    presenceData.details = "Viewing movie:";
    presenceData.state = document.querySelector(
      '[data-lbx-e2e="movie-title"]'
    )?.textContent;
    presenceData.buttons = [
      {
        label: "View Movie",
        url: document.URL
      }
    ];
  } else if (pathname.includes("/trailer/")) {
    const video = document.querySelector("video"),
      timestamps = presence.getTimestampsfromMedia(video);

    presenceData.details = findElement("span", "Tr-title")?.textContent;
    presenceData.state = "Trailer";

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused ? "Paused" : "Playing";

    presenceData.endTimestamp = timestamps[1];

    presenceData.buttons = [
      {
        label: "Watch Trailer",
        url: document.URL
      }
    ];

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (pathname.includes("/my-list")) {
    presenceData.details = "Viewing their list";
  } else if (pathname.includes("/my-account")) {
    presenceData.details = "Viewing their account";
  } else if (pathname.includes("/watch/")) {
    const video = document.querySelector("video"),
      isSeries = !!findElement("span", "Mr-text"),
      timestamps = presence.getTimestampsfromMedia(video);

    presenceData.details = findElement("span", "Tr-title")?.textContent;

    presenceData.smallImageKey = video.paused ? "pause" : "play";
    presenceData.smallImageText = video.paused ? "Paused" : "Playing";

    presenceData.endTimestamp = timestamps[1];

    if (isSeries)
      presenceData.state = `${findElement(
        "span",
        "Mr-text"
      )?.textContent.replace(".", ":")} ${findElement("h3", "so-name")
        ?.textContent.trim()
        .replace(/([0-9]+)[.]/, "")}`;
    else presenceData.state = "Movie";

    presenceData.buttons = [
      {
        label: isSeries ? "Watch Episode" : "Watch Movie",
        url: document.URL
      }
    ];

    if (video.paused) {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  } else if (document.location.search.startsWith("?")) {
    presenceData.details = "Searching for:";
    presenceData.state = new URLSearchParams(document.location.search).get(
      "search"
    );
  }

  if (!(await presence.getSetting("buttons")) && presenceData.buttons)
    delete presenceData.buttons;
  if (!(await presence.getSetting("timestamp"))) {
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});
