const presence = new Presence({
  clientId: "768028596035649536"
});

let roomName: string,
  inCall: boolean,
  userCount: number,
  userState: string,
  joinedRoomName: string,
  joinedRoomTimestamp: number;

function getData() {
  if (document.location.pathname.search("client/guest-wait.html") >= 0) {
    roomName = "Guest Lobby";
    userCount = 0;
    inCall = false;
    userState = "Waiting in the Guest Lobby...";
    return;
  }

  if (document.querySelectorAll("h1")[0]) {
    roomName = document.querySelectorAll("h1")[0].textContent;

    userCount = null;

    document.querySelectorAll("div").forEach((el) => {
      if (el.className.startsWith("userListColumn")) {
        const txt = el.querySelector("h2").textContent,
          [count] = txt.split("(")[1].split(")");

        userCount = parseInt(count);
      }
    });

    inCall = userCount !== null;

    if (roomName && joinedRoomName !== roomName) {
      joinedRoomName = roomName;
      joinedRoomTimestamp = new Date().getTime();
    }
  } else {
    roomName = null;
    userCount = 0;
    inCall = false;
  }

  if (inCall) {
    if (presence.getSetting("readNotificationBar")) {
      document.querySelectorAll("div").forEach((el) => {
        if (el.className.startsWith("notificationsBar")) {
          userState = el.textContent;
          inCall = false;
          return;
        }
      });
    }

    document.querySelectorAll("section").forEach((el) => {
      if (el.className.startsWith("actionsbar")) {
        userState = el.querySelector("i.icon-bbb-desktop")
          ? "screen"
          : el.querySelector("i.icon-bbb-video")
          ? "video"
          : el.querySelector("i.icon-bbb-desktop_off")
          ? "presentation"
          : el.querySelector("i.icon-bbb-unmute")
          ? "microphone"
          : el.querySelector("i.icon-bbb-mute")
          ? "muted"
          : el.querySelector("i.icon-bbb-audio_on")
          ? "headphones"
          : el.querySelector("i.icon-bbb-listen")
          ? "headphones"
          : "disconnected";
      }
    });
  } else {
    document.querySelectorAll("div").forEach((el) => {
      if (el.className.startsWith("spinner")) {
        userState = "Joining session...";
        return;
      }
    });
    if (document.querySelector("#room_access_code"))
      userState = "Entering the room passcode";
    else if (document.querySelector(".form-control.join-form"))
      userState = "Entering the name";
    else if (document.querySelector(".col-3 .loader"))
      userState = "Waiting for the session to start...";
  }
}

setInterval(getData, 1000);

presence.on("UpdateData", async () => {
  const userStateText =
      userState === "screen"
        ? "Sharing screen..."
        : userState === "presentation"
        ? "Presenting..."
        : userState === "video"
        ? "Video call"
        : userState === "microphone"
        ? "Speaking..."
        : userState === "muted"
        ? "Muted"
        : userState === "headphones"
        ? "Listening..."
        : "Disconnected",
    presenceData = {
      largeImageKey: "logo",
      smallImageKey: inCall ? userState : "logo",
      smallImageText: inCall ? userStateText : userState,
      details: roomName ? roomName : userState,
      state: inCall ? `${userCount} users` : roomName ? userState : null,
      startTimestamp: joinedRoomTimestamp
        ? joinedRoomTimestamp
        : new Date().getTime()
    };

  if (!presenceData.details) delete presenceData.details;
  if (!presenceData.state) delete presenceData.state;

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
