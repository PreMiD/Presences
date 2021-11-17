const presence = new Presence({
    clientId: "640561280800915456"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let min: number,
  sec: number,
  time: number,
  min2: number,
  sec2: number,
  time2: number;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "bc"
  };

  if (document.location.hostname === "bandcamp.com") {
    if (
      document.querySelector(
        "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ) === null
    ) {
      presenceData.details = "Viewing:";
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname.endsWith("wishlist")) {
        presenceData.state = `${
          document.querySelector(
            "#fan-bio-vm > div.fan-bio.owner.no-photo > div.fan-bio-inner > div.name > h1 > span"
          ).textContent
        }'s wishlist`;
      } else if (document.location.pathname.endsWith("genres")) {
        presenceData.state = `${
          document.querySelector(
            "#fan-bio-vm > div.fan-bio.owner.no-photo > div.fan-bio-inner > div.name > h1 > span"
          ).textContent
        }'s following genres`;
      } else {
        presenceData.state = `${
          document.querySelector(
            "#fan-bio-vm > div.fan-bio.owner.no-photo > div.fan-bio-inner > div.name > h1 > span"
          ).textContent
        }'s profile`;
      }
    } else if (
      document.querySelector(
        "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ).className === "playbutton playing"
    ) {
      min = parseInt(
        document
          .querySelector(
            "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[0]
      );
      sec = parseInt(
        document
          .querySelector(
            "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[1]
      );
      min = min * 60;
      time = min + sec;

      min2 = parseInt(
        document
          .querySelector(
            "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[0]
      );
      sec2 = parseInt(
        document
          .querySelector(
            "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[1]
      );
      min2 = min2 * 60;
      time2 = min2 + sec2;

      const [startTimestamp, endTimestamp] = presence.getTimestamps(
        time,
        time2
      );
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";

      presenceData.details = document.querySelector(
        "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-player > div > table > tbody > tr:nth-child(1) > td.track_cell > div > span.title-section > span"
      ).textContent;
      presenceData.state = `Album: ${
        document.querySelector(
          "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-body > div:nth-child(2) > span.detail-album > a"
        ).textContent
      } by: ${
        document.querySelector(
          "#discover > div:nth-child(9) > div:nth-child(2) > div > div.detail-body > p.detail-artist > a"
        ).textContent
      }`;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector("head > title").textContent;
    }
  } else if (document.location.hostname === "daily.bandcamp.com") {
    if (
      document.querySelector("#content > div:nth-child(2) > h2") !== null &&
      document.location.pathname !== "/"
    ) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Reading article:";
      presenceData.state = document.querySelector(
        "#content > div:nth-child(2) > h2"
      ).textContent;
      presenceData.smallImageKey = "reading";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Bandcamp Daily";
      presenceData.state = "Browsing...";
    }
  } else {
    if (
      document.querySelector(
        "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ) !== null &&
      document.querySelector(
        "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ).className === "playbutton playing" &&
      document.location.pathname.includes("/album/")
    ) {
      min = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[0]
      );
      sec = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[1]
      );
      min = min * 60;
      time = min + sec;

      min2 = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[0]
      );
      sec2 = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[1]
      );
      min2 = min2 * 60;
      time2 = min2 + sec2;

      const [startTimestamp, endTimestamp] = presence.getTimestamps(
        time,
        time2
      );
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";

      presenceData.details = document.querySelector(
        "#trackInfoInner > div.inline_player > table > tbody > tr:nth-child(1) > td.track_cell > div > span.title-section > a > span"
      ).textContent;
      presenceData.state = `Album: ${document
        .querySelector("#name-section > h2")
        .textContent.trim()} by: ${
        document.querySelector("#name-section > h3 > span > a").textContent
      }`;
    } else if (document.location.pathname.includes("/album/")) {
      presenceData.details = "Viewing album:";
      presenceData.state = `${document
        .querySelector("#name-section > h2")
        .textContent.trim()} by: ${
        document.querySelector("#name-section > h3 > span > a").textContent
      }`;
      presenceData.startTimestamp = browsingStamp;
    } else if (
      document.querySelector(
        "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ) !== null &&
      document.querySelector(
        "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.play_cell > a > div"
      ).className === "playbutton playing" &&
      document.location.pathname.includes("/track/")
    ) {
      min = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[0]
      );
      sec = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_elapsed"
          )
          .textContent.split(":")[1]
      );
      min = min * 60;
      time = min + sec;

      min2 = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[0]
      );
      sec2 = parseInt(
        document
          .querySelector(
            "#trackInfoInner > div.inline_player.one-track > table > tbody > tr:nth-child(1) > td.track_cell > div > span.time.secondaryText > span.time_total"
          )
          .textContent.split(":")[1]
      );
      min2 = min2 * 60;
      time2 = min2 + sec2;

      const [startTimestamp, endTimestamp] = presence.getTimestamps(
        time,
        time2
      );
      presenceData.startTimestamp = startTimestamp;
      presenceData.endTimestamp = endTimestamp;
      presenceData.smallImageKey = "play";
      presenceData.smallImageText = "Playing";

      presenceData.details = document
        .querySelector("#name-section > h2")
        .textContent.trim();
      presenceData.state = `By: ${
        document.querySelector("#name-section > h3 > span > a").textContent
      }`;
    } else if (document.location.pathname.includes("/track/")) {
      presenceData.details = "Viewing track:";
      presenceData.state = `${document
        .querySelector("#name-section > h2")
        .textContent.trim()} by: ${
        document.querySelector("#name-section > h3 > span > a").textContent
      }`;
      presenceData.startTimestamp = browsingStamp;
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing:";
      presenceData.state = document.querySelector("head > title").textContent;
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
