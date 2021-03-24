interface Channel {
  id: string;
  name: string;
  track: string;
  artist: string;
  listeners: number;
  timeStart: string;
  timeEnd: string;
}

const presence = new Presence({
    clientId: "748660637021896835"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let totalListeners: number,
  channels: Channel[] = [];

function newStats(): void {
  fetch("https://api.reyfm.de/v4?voting=true")
    .then((response) => response.json())
    .then((data) => {
      totalListeners = data.all_listeners;
      const channelList: Array<string> = data.sequence,
        channelArray: Channel[] = [];
      channelList.forEach((channel) => {
        channelArray.push({
          id: channel,
          name: "",
          track: "",
          artist: "",
          listeners: 0,
          timeStart: "",
          timeEnd: ""
        });
      });
      channelArray.forEach((channel) => {
        const channelData = data.channels[`${channel.id}`];
        channel.name = channelData.name;
        channel.listeners = channelData.listeners;
        channel.track = channelData.now.title;
        channel.artist = channelData.now.artist;
        channel.timeStart = channelData.now.time.start;
        channel.timeEnd = channelData.now.time.end;
      });
      channels = channelArray;
    });
}

function findChannel(): string {
  try {
    for (const rows of document.querySelector("#container > div.channels")
      .children) {
      for (const channel of rows.children) {
        if (
          !channel.className.includes("desktop") &&
          (channel.firstElementChild.children[2]
            .firstElementChild as HTMLImageElement).src.includes("stop.png")
        ) {
          return channel.firstElementChild.id.replace("channel-", "");
        }
      }
    }
    return "YOU FAILED";
  } catch (e) {
    return "YOU FAILED";
  }
}

newStats();
setInterval(() => {
  newStats();
}, 10000);

presence.on("UpdateData", async () => {
  const info = await presence.getSetting("sInfo"),
    elapsed = await presence.getSetting("tElapsed"),
    format1 = await presence.getSetting("sFormat1"),
    format2 = await presence.getSetting("sFormat2"),
    format3 = await presence.getSetting("sListeners"),
    logo: number = await presence.getSetting("logo"),
    logoArr = [
      "reywhitebacksmall",
      "reyblackbacksmall",
      "reycolorbacksmall",
      "reywhiteback",
      "reyblackback",
      "reycolorback",
      "reywhite",
      "reyblack",
      "rey"
    ],
    presenceData: PresenceData = {
      largeImageKey: logoArr[logo] || "reywhitebacksmall",
      smallImageKey: "reading"
    };

  let showFormat3 = false;

  if (info) {
    if (document.location.hostname == "status.reyfm.de") {
      presenceData.details = "Viewing status page";
    } else if (document.location.hostname == "www.reyfm.de") {
      if (document.location.pathname.includes("/bots")) {
        presenceData.details = "Viewing bots";
      } else if (document.location.pathname.includes("/discord-bot")) {
        presenceData.details = "Viewing the Discord bot";
      } else if (document.location.pathname.includes("/partner")) {
        presenceData.details = "Viewing partners";
      } else if (document.location.pathname.includes("/stream-urls")) {
        presenceData.details = "Viewing streams";
      } else if (document.location.pathname.includes("/apply")) {
        presenceData.details = "Viewing job postings";
      } else if (document.location.pathname.includes("/datenschutz")) {
        presenceData.details = "Reading the datenschutz";
      } else if (document.location.pathname.includes("/impressum")) {
        presenceData.details = "Reading the impressum";
      } else if (document.location.pathname.includes("/stats")) {
        presenceData.details = "Viewing the statistics";
      } else if (document.location.pathname == "/") {
        presenceData.details = "Browsing...";
      }
    }
  }

  if (elapsed) {
    presenceData.startTimestamp = browsingStamp;
  }

  if (
    document.location.hostname == "www.reyfm.de" &&
    document.location.pathname == "/"
  ) {
    if (
      (document.querySelector("#player") as HTMLElement).style.cssText !==
      "display: none;"
    ) {
      const paused = (document.querySelector(
        "#miniplayer-play"
      ) as HTMLImageElement).src.includes("play.png");

      let track: string, artist: string;

      if (!paused) {
        const channelID = findChannel();
        if (channelID !== "YOU FAILED") {
          const channel = channels.find((channel) => channel.id === channelID);
          track = channel.track;
          artist = channel.artist;

          presenceData.smallImageKey = "play";
          presenceData.smallImageText = format3
            .replace("%listeners%", channel.listeners)
            .replace("%totalListeners%", totalListeners);
          presenceData.startTimestamp = Date.parse(channel.timeStart);
          presenceData.endTimestamp = Date.parse(channel.timeEnd);
          showFormat3 = true;
        } else {
          artist = document.querySelector(
            "#player > div.wrapper > div.current > span.artist"
          ).textContent;
          track = document.querySelector(
            "#player > div.wrapper > div.current > span.title"
          ).textContent;
          presenceData.smallImageKey = "play";
          presenceData.smallImageText = "Loading statistics...";
        }
      } else {
        artist = document.querySelector(
          "#player > div.wrapper > div.current > span.artist"
        ).textContent;
        track = document.querySelector(
          "#player > div.wrapper > div.current > span.title"
        ).textContent;
        presenceData.smallImageKey = "pause";
        presenceData.smallImageText = "Total Listeners: " + totalListeners;
        delete presenceData.startTimestamp;
      }

      presenceData.details = format1
        .replace("%title%", track)
        .replace("%artist%", artist);
      presenceData.state = format2
        .replace("%title%", track)
        .replace("%artist%", artist);
    }
  } else if (
    document.location.hostname == "www.reyfm.de" &&
    document.querySelector("#channel-player") !== null
  ) {
    const channelID = document
        .querySelector("#channel-player")
        .className.replace("shadow channel-color-", ""),
      channel = channels.find((channel) => channel.id === channelID),
      paused = (document.querySelector(
        "#play"
      ) as HTMLImageElement).src.includes("play.png");

    paused
      ? (presenceData.smallImageKey = "pause")
      : (presenceData.smallImageKey = "play");

    presenceData.details = format1
      .replace("%title%", channel.track)
      .replace("%artist%", channel.artist);
    presenceData.state = format2
      .replace("%title%", channel.track)
      .replace("%artist%", channel.artist);

    presenceData.smallImageText = format3
      .replace("%listeners%", channel.listeners)
      .replace("%totalListeners%", totalListeners);

    showFormat3 = true;

    if (!paused) {
      presenceData.startTimestamp = Date.parse(channel.timeStart);
      presenceData.endTimestamp = Date.parse(channel.timeEnd);
    } else {
      delete presenceData.startTimestamp;
      delete presenceData.endTimestamp;
    }
  }

  showFormat3
    ? presence.showSetting("sListeners")
    : presence.hideSetting("sListeners");

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
