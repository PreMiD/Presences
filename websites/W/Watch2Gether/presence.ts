const presence = new Presence({
    clientId: "863345026498428968"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    { hostname, pathname } = document.location;

  if (hostname === "w2g.tv") {
    if (pathname === "/") presenceData.details = "At Homepage";
    else if (pathname.startsWith("/rooms/")) {
      const paused = !!document.querySelector(
          "div.w2g-player-menu.w2g-player > div.ui.inverted.tiny.menu > a > i.play"
        ),
        playerTime: NodeListOf<HTMLSpanElement> = document.querySelectorAll(
          "#player-time > span"
        ),
        users = document.querySelectorAll("div.w2g-user-name").length,
        invite: HTMLInputElement = document.querySelector(
          "#w2g-top-inviteurl > input"
        ),
        chatMessages = [
          ...document.querySelectorAll<HTMLDivElement>(
            "body > div.w2g-main-container.w2g-bind-layout > div.w2g-main-lower > div.w2g-main-right > div.w2g-content-right > div.w2g-menu-tab.w2g-chat.w2g-messages.w2g-panel-bottom > div.w2g-chat-messages.w2g-messages-container.w2g-scroll-vertical > div"
          )
        ].reverse();

      let title: string;

      for (const msg of chatMessages) {
        if (msg.querySelector(".w2g-chat-item-actions")) {
          const chatBubble: HTMLDivElement =
            msg.querySelector(".w2g-chat-bubble");
          title = chatBubble.innerText.substring(
            0,
            chatBubble.innerText.indexOf("\n")
          );
          break;
        }
      }

      presenceData.details = `Watching ${title}`;
      presenceData.state = `${users} users in the room`;
      if (playerTime.length === 2 && !paused) {
        [, presenceData.endTimestamp] = presence.getTimestamps(
          presence.timestampFromFormat(playerTime[0].innerText),
          presence.timestampFromFormat(playerTime[1].innerText)
        );
      }
      if (invite) {
        presenceData.buttons = [
          {
            label: "Join Room",
            url: invite.value
          }
        ];
      }
    } else if (pathname.startsWith("/users/")) {
      if (pathname.includes("edit"))
        presenceData.details = "Editing user profile";
      else presenceData.details = "Viewing user rooms";
    } else if (pathname === "/auth/sign_in")
      presenceData.details = "Signing In";
    else if (pathname === "/auth/sign_up") presenceData.details = "Signing Up";
    else if (pathname === "/pages/plus")
      presenceData.details = "Checking w2g+ plans";
    else if (pathname === "/pages/leave") presenceData.details = "Left room";
  } else if (hostname === "community.w2g.tv") {
    if (pathname === "/") presenceData.details = "At Community homepage";
    else if (pathname.startsWith("/t/")) {
      const title: HTMLAnchorElement = document.querySelector("a.fancy-title");
      if (title) {
        presenceData.details = "Looking at thread";
        presenceData.state = title.innerText;
      }
    } else if (pathname.startsWith("/u/")) {
      const username: HTMLHeadingElement =
        document.querySelector("h1.full-name");
      if (username)
        presenceData.details = `Looking at user ${username.innerText}`;
    } else {
      presenceData.details = `Looking at ${document.title.substring(
        0,
        document.title.indexOf("-")
      )}`;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
