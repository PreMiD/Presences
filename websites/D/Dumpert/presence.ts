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
    pageh = document.location.href,
    buttons = await presence.getSetting("buttons"),
    privacy = await presence.getSetting("privacy");

  if (page === "/" && !location.search) {
    presenceData.details = "Bekijkt:";
    presenceData.state = "De Home Pagina";
  } else if (pageh.includes("plaatjes")) {
    const element = document.querySelector('meta[property~="og:title"]');
    if (!element || privacy) {
      presenceData.details = "Bekijkt:";
      presenceData.state = "Plaatjes";
    } else {
      const content = element && element.getAttribute("content");
      presenceData.details = content;
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Bekijk Plaatje",
            url: pageh
          }
        ];
      }
    }
  } else if (pageh.includes("filmpjes")) {
    const element = document.querySelector('meta[property~="og:title"]');
    if (!element || privacy) {
      presenceData.details = "Bekijkt:";
      presenceData.state = "Filmpjes";
    } else {
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Bekijk Filmpje",
            url: pageh
          }
        ];
      }
      const content = element && element.getAttribute("content");
      presenceData.details = content;
    }
  } else if (pageh.includes("selectedId=") || pageh.includes("/item/")) {
    if (!privacy) {
      title2 = document.querySelector("[id*='vjs_video_']");
      if (title2) {
        if (buttons) {
          presenceData.buttons = [
            {
              label: "Bekijk Video",
              url: pageh
            }
          ];
        }
        delete presenceData.startTimestamp;
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
          [, presenceData.endTimestamp] = timestamps;
          presenceData.smallImageKey = "play";
        }
      } else {
        if (buttons) {
          presenceData.buttons = [
            {
              label: "Bekijk Foto",
              url: pageh
            }
          ];
        }
      }

      const element = document.querySelector('meta[property~="og:title"]'),
        content = element && element.getAttribute("content");
      presenceData.details = content;
    } else {
      title2 = document.querySelector("[id*='vjs_video_']");
      if (!title2) presenceData.details = "Bekijkt een foto";
      else if (title2.className.includes("paused"))
        presenceData.details = "Bekijkt een video";
    }
  } else if (page.includes("toppers")) {
    presenceData.details = "Bekijkt:";
    presenceData.state = "De Toppers";
  } else if (page.includes("/zoek/")) {
    if (privacy) presenceData.details = "Is aan het zoeken";
    else {
      if (buttons) {
        presenceData.buttons = [
          {
            label: "Zoek",
            url: pageh
          }
        ];
      }
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
    }
  } else if (page.includes("latest")) {
    presenceData.details = "Bekijkt:";
    presenceData.state = "The Latest";
    if (!privacy && buttons) {
      presenceData.buttons = [
        {
          label: "Bekijk Latest",
          url: pageh
        }
      ];
    }
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
