const presence = new Presence({
    clientId: "777954584013963265"
  }),
  browsingTimestamp = Date.now(),
  webSocket = new WebSocket("wss://api.atomicradio.eu/websocket"),
  presenceData: PresenceData = {
    largeImageKey: "atr-logo",
    smallImageKey: "play-button"
  },
  channelInfos = {
    one: {
      name: "",
      listeners: 0,
      artist: "LISTEN TO THE DIFFERENCE!",
      title: "ATOMICRADIO",
      start_at: 0,
      end_at: 0
    },
    dance: {
      name: "",
      listeners: 0,
      artist: "LISTEN TO THE DIFFERENCE!",
      title: "ATOMICRADIO",
      start_at: 0,
      end_at: 0
    },
    trap: {
      name: "",
      listeners: 0,
      artist: "LISTEN TO THE DIFFERENCE!",
      title: "ATOMICRADIO",
      start_at: 0,
      end_at: 0
    }
  };

webSocket.onmessage = (message) => {
  const data = JSON.parse(message.data);
  switch (data.name) {
    case "atr.one":
      channelInfos.one = {
        name: data.name,
        listeners: data.listeners,
        artist: data.song.artist,
        title: data.song.title,
        start_at: data.song.start_at,
        end_at: data.song.end_at
      };
      break;
    case "atr.dance":
      channelInfos.dance = {
        name: data.name,
        listeners: data.listeners,
        artist: data.song.artist,
        title: data.song.title,
        start_at: data.song.start_at,
        end_at: data.song.end_at
      };
      break;
    case "atr.trap":
      channelInfos.trap = {
        name: data.name,
        listeners: data.listeners,
        artist: data.song.artist,
        title: data.song.title,
        start_at: data.song.start_at,
        end_at: data.song.end_at
      };
      break;
  }
};

async function getStationData(channel: string) {
  let channelInfo = {
    name: "",
    listeners: 0,
    artist: "LISTEN TO THE DIFFERENCE!",
    title: "ATOMICRADIO",
    start_at: 0,
    end_at: 0
  };
  switch (channel) {
    case "ONE":
      channelInfo = channelInfos.one;
      break;
    case "DANCE":
      channelInfo = channelInfos.dance;
      break;
    case "TRAP":
      channelInfo = channelInfos.trap;
      break;
  }

  presenceData.state = channelInfo.artist;
  presenceData.details = channelInfo.title;
  presenceData.startTimestamp = channelInfo.start_at;
  presenceData.endTimestamp = channelInfo.end_at;
  presenceData.smallImageText = `ATR.${channel} • ${channelInfo.listeners} listeners`;
  presenceData.smallImageKey = "play-button";
  presence.setActivity(presenceData, true);
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
    channel = String(
      document.getElementById("Player_Station_Name").innerText
    ).split(".")[1];
  let playerOpen = false;
  if (playBar.style.display == "block") {
    playerOpen = true;
    if (playerButtonState.className.includes("fa-play")) {
      playerOpen = false;
    }
  }

  if (playerOpen) {
    getStationData(channel);
  } else {
    clearPresenceData();
    if (
      window.location.pathname == "/" ||
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
