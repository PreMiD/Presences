const presence = new Presence({
    clientId: "819942708604174376"
  }),
  startsTime = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const video = document.querySelector("video"),
    path = document.location.pathname,
    SouthParkData: __DATA__ = await presence.getPageletiable("__DATA__"),
    buttons = await presence.getSetting("buttons");

  let presenceData: PresenceData = {
    largeImageKey: "south_park_logo",
    details: "Browsing...",
    smallImageKey: "reading",
    startTimestamp: startsTime
  };

  if (path.includes("/episodes/")) {
    const EpAndSeason = SouthParkData.children[0].props.title.text
        .split(" - ")[1]
        .match(/([1-9]?[0-9]?[0-9])/g),
      EpTitle = SouthParkData.children[0].props.title.text.split(" - ")[2],
      title = SouthParkData.children[0].props.title.text.split(" - ")[0],
      timestamps = presence.getTimestamps(
        presence.timestampFromFormat(
          document.querySelector("div.edge-gui-current-time")?.textContent
        ),
        presence.timestampFromFormat(
          document.querySelector("div.edge-gui-duration")?.textContent
        )
      );

    if (video) {
      presenceData.details = title;
      presenceData.state = `S${EpAndSeason[0]}:E${EpAndSeason[1]} ${EpTitle}`;

      presenceData.smallImageKey =
        video.paused || isNaN(video.duration) ? "pause" : "play";
      presenceData.smallImageText =
        video.paused || isNaN(video.duration) ? "Paused" : "Playing";

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.buttons = [
        {
          label: "Watch Episode",
          url: `https://www.southparkstudios.com/episodes/${
            document.location.pathname.split("/")[2]
          }`
        }
      ];

      if (video.paused || isNaN(video.duration)) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = "Viewing Episode:";
      presenceData.state = `S${EpAndSeason[0]}:E${EpAndSeason[1]} ${EpTitle}`;
    }
  } else if (path.includes("/seasons/")) {
    const season = document.URL.match(/(season-[1-9]?[0-9])/)[0].replace(
      "season-",
      ""
    );

    presenceData.details = "Viewing Episodes of:";
    presenceData.state = `Season ${season}`;
  } else if (path.includes("/collections/")) {
    const title = SouthParkData.children[0].props.title.text.split(" - ")[0],
      EpTilte = document.querySelector("div.header > span").textContent,
      EpAndSeason = document
        .querySelector("div > div.sub-header > span")
        .textContent.match(/([1-9]?[0-9]?[0-9])/g),
      timestamps = presence.getTimestampsfromMedia(video);

    if (video) {
      presenceData.details = title;
      presenceData.state = `S${EpAndSeason[0]}:E${EpAndSeason[1]} ${EpTilte}`;

      presenceData.smallImageKey = video.paused ? "pause" : "play";
      presenceData.smallImageText = video.paused ? "Paused" : "Playing";

      presenceData.startTimestamp = timestamps[0];
      presenceData.endTimestamp = timestamps[1];

      presenceData.buttons = [
        {
          label: "Watch Episode",
          url: `https://www.southparkstudios.com/collections/${
            document.location.pathname.split("/")[2]
          }`
        }
      ];

      if (video.paused) {
        delete presenceData.startTimestamp;
        delete presenceData.endTimestamp;
      }
    } else {
      presenceData.details = "Viewing Collection:";
      presenceData.state = title;
    }
  }

  const headline = document.querySelector("h1")?.textContent,
    forum = document.querySelector("h2")?.textContent,
    pages: {
      [key: string]: PresenceData;
    } = {
      "/create-account/step-1": {
        details: "Creating an account",
        state: "Step 1 of 2",
        smallImageKey: "writing"
      },
      "/create-account/step-2": {
        details: "Creating an account",
        state: "Step 2 of 2",
        smallImageKey: "writing"
      },
      "/settings": {
        details: "Viewing their:",
        state: "Account details"
      },
      "/email-verification": {
        details: "Viewing page:",
        state: "Email verification"
      },
      "/news": {
        details: "Viewing page:",
        state: "The news page"
      },
      "/news/": {
        details: "Reading article:",
        state: headline,
        buttons: [
          {
            label: "Read article",
            url: `https://www.southparkstudios.com/news/${
              document.location.pathname.split("/")[2]
            }`
          }
        ]
      },
      "/avatar": {
        details: "Viewing page:",
        state: "Avatar creator"
      },
      "/forum/v": {
        details: "Reading forum:",
        state: forum
      },
      "/wiki": {
        details: "Viewing page:",
        state: "Wiki"
      }
    };

  for (const [key, value] of Object.entries(pages)) {
    if (path.match(key)) {
      presenceData = { ...presenceData, ...value };
    }
  }

  if (!buttons) delete presenceData.buttons;

  presence.setActivity(presenceData);
});

interface __DATA__ {
  children: {
    type: string;
    props: {
      title: {
        text: string;
      };
    };
  }[];
}
