const presence = new Presence({
    clientId: "629473655218241557"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });

function getTime(timegone: string[], timetotal: string[]): Array<number> {
  const timegoneN = parseInt(timegone[0]) + parseInt(timegone[1]) * 60,
    timetotalN = parseInt(timetotal[0]) + parseInt(timetotal[1]) * 60,
    back = [timegoneN, timetotalN];
  return back;
}

function getTimeLeft(Time: string[]): Array<number> {
  const TimeGone = Time[0].split(":").reverse(),
    TimeTotal = Time[1].split(":").reverse(),
    parsedAudioDuration = getTime(TimeGone, TimeTotal);
  return [parsedAudioDuration[0], parsedAudioDuration[1]];
}

presence.on("UpdateData", async () => {
  const Data: PresenceData = {
    largeImageKey: "musescore"
  };

  // ALL ON THE .ORG website
  if (document.location.pathname.endsWith("/forum")) {
    Data.details = "Looking at";
    Data.state = "the forums.";
  }
  if (document.location.pathname.endsWith("/download")) {
    Data.details = "Looking how to";
    Data.state = "download Musescore.";
  }
  if (document.location.pathname.includes("/handbook")) {
    Data.details = "Looking at";
    Data.state = "the handbook.";
  }
  if (document.location.pathname.endsWith("/plugins")) {
    Data.details = "Looking at";
    Data.state = "plugins.";
  }
  if (document.location.pathname.endsWith("/services")) {
    Data.details = "Looking at";
    Data.state = "services.";
  }
  if (
    document.location.pathname.includes("/tutorials") ||
    document.location.pathname.includes("/howto")
  ) {
    Data.details = "Looking at";
    Data.state = "tutorials.";
  }
  if (document.location.pathname.endsWith("/faq")) {
    Data.details = "Looking at";
    Data.state = "the FAQ.";
  }
  if (document.location.pathname.endsWith("/tracker")) {
    Data.details = "Looking at";
    Data.state = "recent content.";
  }
  // Main stuff
  if (document.location.pathname.includes("/dashboard")) {
    Data.details = "Looking at";
    Data.state = "their dashboard.";
  }
  if (document.location.pathname.startsWith("/piano-tutorial")) {
    Data.details = "Looking at";
    Data.state = "piano tutorials.";
  }
  if (document.location.pathname.startsWith("/community")) {
    Data.details = "Looking at";
    Data.state = "communities.";
  }
  if (document.location.pathname.includes("/sheetmusic")) {
    Data.details = "Looking at";
    Data.state = "sheetmusic.";
  }
  if (document.location.pathname.startsWith("/upload")) {
    Data.details = "Uploading";
    Data.state = "their music.";
  }
  if (document.location.pathname.startsWith("/hub")) {
    Data.details = "Looking at";
    Data.state = `${document.location.pathname.split("/")[2]} sheetmusic.`;
  }
  if (document.location.pathname.endsWith("/my-scores")) {
    Data.details = "Looking at";
    Data.state = "their sheetmusic.";
  }
  if (document.location.pathname.startsWith("/upgrade")) {
    Data.details = "Considering";
    Data.state = "upgrading to pro.";
  }
  if (document.location.pathname.startsWith("/checkout")) {
    Data.details = "Checking something";
    Data.state = "out.";
  }
  if (document.location.pathname.endsWith("/group/create")) {
    Data.details = "Creating a";
    Data.state = "new group.";
  }
  if (document.location.pathname.endsWith("/community-guidelines")) {
    Data.details = "Browsing the";
    Data.state = "community guidelines.";
  }
  if (
    document.location.pathname.endsWith("/press") ||
    document.location.pathname.endsWith("/news")
  ) {
    Data.details = "Browsing the";
    Data.state = "press.";
  }
  if (document.location.pathname.endsWith("/jobs")) {
    Data.details = "Looking at";
    Data.state = "job opportunities.";
  }
  if (document.location.pathname.endsWith("/about")) {
    Data.details = "Looking at";
    Data.state = "the about section.";
  }
  if (document.location.pathname.startsWith("/hc")) {
    Data.details = "Looking at";
    Data.state = "the help center.";
  }
  if (document.location.pathname.startsWith("/contact")) {
    Data.details = "Contacting";
    Data.state = "Musescore.";
  }
  // This is here since some profiles dont have user.
  if (
    document.querySelector(
      "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
    )
  ) {
    Data.details = "Browing";
    Data.state = `${
      document.querySelector(
        "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
      ).textContent
    }'s profile`;
  }

  // MUSIC PLAYING / PAUSING
  if (
    document.querySelector(
      "#jmuse-container > div.viewer > div.viewerWrapper > div"
    )
  ) {
    if (
      `${document
        .querySelector(
          "#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button"
        )
        .getAttribute("state")}` === "default"
    ) {
      Data.smallImageKey = "pause";
      Data.details = "Looking at";
      Data.state = document.querySelector(
        "body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1"
      ).textContent;
      Data.smallImageText = (await strings).pause;
    } else if (
      `${document
        .querySelector(
          "#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div.oY3Aa > button"
        )
        .getAttribute("state")}` === "primary"
    ) {
      const time = getTimeLeft([
        document
          .querySelector(
            "#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span"
          )
          .textContent.split("/")[0],
        document
          .querySelector(
            "#jmuse-container > div:nth-child(1) > div > div > div > div._1DDmo.undefined > div:nth-child(1) > div > div > div._3vWaq > span"
          )
          .textContent.split("/")[1]
      ]);
      [Data.startTimestamp, Data.endTimestamp] = presence.getTimestamps(
        time[0],
        time[1]
      );
      Data.smallImageKey = "play";
      Data.details = "Listening to";
      Data.state = document.querySelector(
        "body > div.page.page-score > div.container > div.row > main > article > div > div.score-right > h1"
      ).textContent;
      Data.smallImageText = (await strings).play;
    }
  }

  if (document.location.pathname.includes("/user")) {
    if (document.location.pathname.includes("/edit")) {
      Data.details = "Editing";
      Data.state = "their account.";
    }
    if (document.location.pathname.includes("settings/profile")) {
      Data.details = "Editing";
      Data.state = "their profile.";
    }
    if (document.location.pathname.includes("subscription")) {
      Data.details = "Viewing a";
      Data.state = "subscription.";
    }
    if (document.location.pathname.includes("billing")) {
      Data.details = "Viewing their";
      Data.state = "billing history.";
    }
    if (document.location.pathname.includes("gifts")) {
      Data.details = "Viewing their";
      Data.state = "gifts.";
    }
    if (document.location.pathname.includes("notifications")) {
      Data.details = "Viewing their";
      Data.state = "notifications.";
    }
    if (document.location.pathname.includes("/message")) {
      Data.details = "Looking at";
      Data.state = "messages.";
    }
    if (document.location.pathname.includes("/followers")) {
      Data.details = "Looking at";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      }'s followers.`;
    }
    if (document.location.pathname.includes("/following")) {
      Data.details = "Looking who";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      } is following.`;
    }
    if (document.location.pathname.includes("/invite")) {
      Data.details = "Inviting";
      Data.state = "some friends.";
    }
    if (
      document.querySelector(
        "body > div.page.js-user-profile-page > div.content-header.collapsed > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
      )
    ) {
      Data.details = "Browing";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header.collapsed > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      }'s profile`;
    }
  } else if (
    document.querySelector(
      "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
    )
  ) {
    if (document.location.pathname.includes("/sheetmusic")) {
      Data.details = "Looking at";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      }'s sheetmusic.`;
    }
    if (document.location.pathname.includes("/favorites")) {
      Data.details = "Looking at";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      }'s favorites.`;
    }
    if (document.location.pathname.includes("/sets")) {
      Data.details = "Looking at";
      Data.state = `${
        document.querySelector(
          "body > div.page.js-user-profile-page > div.content-header > div.banner-header.group-header > div > div.info-wrapper.group-info-wrapper.user-info-wrapper > div > h1 > a"
        ).textContent
      }'s sets.`;
    }
  }
  presence.setActivity(Data);
});
