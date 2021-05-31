const presence = new Presence({
    clientId: "840126038205923369"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: Element, title2: Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo",
      startTimestamp: browsingStamp
    },
    page = window.location.pathname,
    pageh = document.location.href;

  if (page === "/") {
    presenceData.details = "Bekijkt:";
    presenceData.state = "De Home Pagina";
  } else if (pageh.includes("plaatjes")) {
    const element = document.querySelector('meta[property~="og:title"]');
    if (!element) {
      presenceData.details = "Bekijkt:";
      presenceData.state = "Plaatjes";
    } else {
      const content = element && element.getAttribute("content");
      presenceData.details = content;
    }
  } else if (pageh.includes("filmpjes")) {
    const element = document.querySelector('meta[property~="og:title"]');
    if (!element) {
      presenceData.details = "Bekijkt:";
      presenceData.state = "Filmpjes";
    } else {
      const content = element && element.getAttribute("content");
      presenceData.details = content;
    }
  } else if (pageh.includes("selectedId=") || pageh.includes("/item/")) {
    delete presenceData.startTimestamp;
    title2 = document.querySelector("[id*='vjs_video_']");
    if (title2.className.includes("paused")) {
      delete presenceData.endTimestamp;
      presenceData.smallImageKey = "pause";
    } else if (title2.className.includes("playing")) {
      const currentTime = presence.timestampFromFormat(
          document.querySelector(
            `#vjs_video_${title2.className
              .slice(40, 55)
              .replace(
                /[^0-9.]/g,
                ""
              )} > div.vjs-control-bar.progress-in-menu > div.vjs-current-time.vjs-time-control.vjs-control > span.vjs-current-time-display`
          ).textContent
        ),
        durationss = presence.timestampFromFormat(
          document.querySelector(
            `#vjs_video_${title2.className
              .slice(40, 55)
              .replace(
                /[^0-9.]/g,
                ""
              )} > div.vjs-control-bar.progress-in-menu > div.vjs-duration.vjs-time-control.vjs-control > span.vjs-duration-display`
          ).textContent
        ),
        timestamps = presence.getTimestamps(currentTime, durationss);
      presenceData.endTimestamp = timestamps[1];
      presenceData.smallImageKey = "play";
    }

    const element = document.querySelector('meta[property~="og:title"]'),
      content = element && element.getAttribute("content");
    presenceData.details = content;
  } else if (page.includes("toppers")) {
    presenceData.details = "Bekijkt:";
    presenceData.state = "De Toppers";
  } else if (page.includes("/zoek/")) {
    title = document.querySelector(
      "#app > div > div:nth-child(6) > div > div.grid > main > div > div > div > h1"
    );
    if (!title) {
      presenceData.details = "Zoekt Voor:";
      presenceData.state = page
        .replace("/zoek/", "")
        .replace("-", " ")
        .replace(/%20/g, " ");
    } else {
      presenceData.details = "Zoekt Voor:";
      presenceData.state = title.textContent.replace(
        "Geen resultaten voor",
        ""
      );
    }
  } else if (page.includes("latest")) {
    presenceData.details = "Bekijkt:";
    presenceData.state = "The Latest";
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
