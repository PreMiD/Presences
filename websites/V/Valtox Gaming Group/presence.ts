const presence = new Presence({
    clientId: "640146822257573928"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let user: HTMLElement, title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "valtox"
  };

  if (document.location.hostname === "valtoxgaminggroup.com") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing home page";
    } else if (
      document.location.pathname.includes("/profile/") ||
      document.location.pathname.includes("/user/")
    ) {
      presenceData.startTimestamp = browsingStamp;
      user = document.querySelector(".title.m-0");
      presenceData.details = "🌐 Viewing user:";
      presenceData.state = `📰 ${user.textContent}`;
    } else if (document.location.pathname.includes("/logistics")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "📰 Reading about the logistics";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/about")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "📰 Reading about Valtox";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/fivem")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Reading about";
      presenceData.state = "📰 Valtox FiveM";
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/minecraft")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Reading about";
      presenceData.state = "📰 Valtox Minecraft";
      presenceData.smallImageKey = "reading";
    }
  } else if (document.location.hostname === "vtc.valtoxgaminggroup.com") {
    if (document.location.pathname.includes("/truckinglive")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing Live Tracker";
      presenceData.state = "🌍 Tracking Info";
    }
  } else if (document.location.hostname === "hub.valtoxgaminggroup.com") {
    if (document.location.pathname.includes("/logbook")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing their logbook";
      presenceData.state = `📰 ${
        document.querySelector("#jobskm").textContent
      } ${
        document.querySelector(
          "#page-content-wrapper > div > div.row > div:nth-child(1) > div > span.count-name.white"
        ).textContent
      } | ${document.querySelector("#jobscount").textContent} ${
        document.querySelector(
          "#page-content-wrapper > div > div.row > div:nth-child(2) > div > span.count-name"
        ).textContent
      }`;
    } else if (document.location.pathname.includes("/downloads")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing the";
      presenceData.state = "📰 downloads page";
    } else if (document.location.pathname.includes("/events")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing the";
      presenceData.state = "📰 upcoming events";
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing the";
      presenceData.state = "📰 VTC rules";
    } else if (document.location.pathname.includes("/login")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Logging in...";
    } else {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Viewing their";
      presenceData.state = "📰 VTC dashboard";
    }
  } else if (document.location.hostname === "panel.valtoxgaminggroup.com") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Staff Panel";
      presenceData.state = "📰 Viewing panel home";
    } else if (document.location.pathname.includes("/account")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Staff Panel";
      presenceData.state = "📰 Viewing their account";
    } else if (document.location.pathname.includes("/server/")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "🌐 Staff Panel - Editing";
      title =
        document.querySelector(".card-title") ||
        document.querySelector(
          "body > div > div.content-wrapper > section.content-header > ol > li:nth-child(2) > a"
        );
      presenceData.state = `📰 Server: ${title.textContent}`;
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
