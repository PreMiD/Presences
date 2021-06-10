const presence = new Presence({
    clientId: "777954584013963265"
  }),
  browsingTimestamp = Date.now(),
  presenceData: PresenceData = {
    largeImageKey: "atr-logo",
    smallImageKey: "play-button"
  },
  channelInfos: Map<string, Channel> = new Map();

interface Channel {
  name: string;
  listeners: number;
  artist: string;
  title: string;
  endAt: Date | number;
}

function startWebSocket() {
  const webSocket = new WebSocket("wss://api.atomicradio.eu/websocket");

  webSocket.onmessage = (message) => {
    const data = JSON.parse(message.data),
      [, name] = String(data.name).split(".");
    channelInfos.set(name, {
      name: data.name,
      listeners: data.listeners,
      artist: data.song.artist,
      title: data.song.title,
      endAt: data.song.end_at
    });
  };
  webSocket.onclose = () => {
    setTimeout(() => {
      startWebSocket();
    }, 10000);
  };
}
startWebSocket();

async function getStationData(channel: string) {
  let channelInfo: Channel = {
    name: channel,
    listeners: 0,
    artist: "LISTEN TO THE DIFFERENCE!",
    title: "ATOMICRADIO",
    endAt: null
  };
  const channelData = channelInfos.get(channel.toLowerCase());
  if (channelData !== undefined) {
    channelInfo = channelData;
    presenceData.state = channelInfo.artist;
    presenceData.details = channelInfo.title;

    if (channelInfo.endAt instanceof Date)
      presenceData.endTimestamp = new Date(channelInfo.endAt).getTime() / 1000;
    else presenceData.endTimestamp = channelInfo.endAt;

    presenceData.smallImageText = `ATR.${channel} • ${channelInfo.listeners} listeners`;
    presenceData.smallImageKey = "play-button";
    presence.setActivity(presenceData, true);
  } else {
    presenceData.state = channelInfo.artist;
    presenceData.details = channelInfo.title;
    presenceData.smallImageText = `ATR.${channel} • 0 listeners`;
    presenceData.smallImageKey = "play-button";
    delete presenceData.startTimestamp;
    presence.setActivity(presenceData, true);
  }
}

function clearPresenceData() {
  delete presenceData.smallImageKey;
  delete presenceData.state;
  delete presenceData.details;
  delete presenceData.startTimestamp;
  delete presenceData.endTimestamp;
  delete presenceData.smallImageText;
}

presence.on("UpdateData", async () => {
  switch (window.location.host.split(".")[0]) {
    case "status":
      clearPresenceData();
      presenceData.details = "Viewing the current status";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
      return;
    case "docs":
      clearPresenceData();
      presenceData.details = "Viewing the documentation";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
      return;
  }

  const playBar = document.getElementById("PlayBar"),
    playerButtonState = document.getElementById("Player_Play_Button_State"),
    [, channel] = String(
      document.getElementById("Player_Station_Name").innerText
    ).split(".");
  let playerOpen = false;
  if (playBar.style.display === "block") {
    playerOpen = true;
    if (playerButtonState.className.includes("fa-play")) playerOpen = false;
  }

  if (playerOpen) getStationData(channel);
  else {
    clearPresenceData();
    if (
      window.location.pathname === "/" ||
      window.location.pathname.startsWith("/home")
    ) {
      presenceData.details = "Browsing...";
      delete presenceData.startTimestamp;
      presence.setActivity(presenceData, true);
    } else if (window.location.pathname.startsWith("/partner")) {
      presenceData.details = "Viewing the partner information";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
    } else if (window.location.pathname.startsWith("/history")) {
      presenceData.details = "Viewing the song history";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
    } else if (window.location.pathname.startsWith("/streams")) {
      presenceData.details = "Viewing the streamurls";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
    } else if (window.location.pathname.startsWith("/imprint")) {
      presenceData.details = "Viewing the imprint";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
    } else if (window.location.pathname.startsWith("/privacy")) {
      presenceData.details = "Viewing the privacy";
      presenceData.startTimestamp = browsingTimestamp;
      presence.setActivity(presenceData, true);
    } else {
      presenceData.details = "Browsing...";
      delete presenceData.startTimestamp;
      presence.setActivity(presenceData, true);
    }
  }
});
