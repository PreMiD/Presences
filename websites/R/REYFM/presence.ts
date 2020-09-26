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
  browsingStamp = Math.floor(Date.now() / 1000),
  channels: Channel[] = [
    {
      id: "1",
      name: "original",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "2",
      name: "nightlife",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "3",
      name: "raproyal",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "4",
      name: "usrap",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "5",
      name: "hitsonly",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "6",
      name: "gaming",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "7",
      name: "houseparty",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "8",
      name: "chillout",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "9",
      name: "exclusive",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "12",
      name: "oldschool",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "13",
      name: "mashup",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "14",
      name: "charts",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "16",
      name: "lo-fi",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "17",
      name: "partyhard",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    },
    {
      id: "18",
      name: "bass",
      track: "",
      artist: "",
      listeners: 0,
      timeStart: "",
      timeEnd: ""
    }
  ];
let totalListeners: number;

function newStats(channels: Channel[]): void {
  for (let i = 0; i < channels.length; i++) {
    const channel = channels[i],
      xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (): void {
      if (this.readyState == 4 && this.status == 200) {
        const data = JSON.parse(this.responseText);
        totalListeners = data.all_listeners;
        channel.listeners = data.channel.listeners;
        channel.track = data.channel.now.title;
        channel.artist = data.channel.now.artist;
        channel.timeStart = data.channel.now.time.start;
        channel.timeEnd = data.channel.now.time.end;
      }
    };
    xhttp.open(
      "GET",
      "https://api.reyfm.de/v4/channel?chn=" + channel.id,
      true
    );
    xhttp.withCredentials = true;
    xhttp.send();
  }
}

function findChannel(): string {
  try {
    for (const rows of document.querySelector("#container > div.channels")
      .children) {
      for (const channel of rows.children) {
        if (
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

newStats(channels);
setInterval(() => {
  newStats(channels);
}, 10000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "rey",
      smallImageKey: "reading"
    },
    info = await presence.getSetting("sInfo"),
    elapsed = await presence.getSetting("tElapsed"),
    format1 = await presence.getSetting("sFormat1"),
    format2 = await presence.getSetting("sFormat2"),
    format3 = await presence.getSetting("sListeners");

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
