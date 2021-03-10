const presence = new Presence({
    clientId: "817385570912174121"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
      largeImageKey: "image"
    },
    showISP = await presence.getSetting("showISP");

  if (window.location.hostname.includes("speedtest")) {
    if (window.location.pathname.includes("/run")) {
      const server =
          document.querySelector(
            ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
          ).textContent +
          " - " +
          document.querySelector(
            ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
          ).textContent,
        ping =
          document.querySelector(".result-item-ping .result-data").textContent +
          document.querySelector(".result-item-ping .result-data-unit")
            .textContent,
        download =
          document.querySelector(".result-item-download .result-data")
            .textContent +
          document.querySelector(".result-item-download .result-data-unit")
            .textContent,
        upload =
          document.querySelector(".result-item-upload .result-data")
            .textContent +
          document.querySelector(".result-item-upload .result-data-unit")
            .textContent;
      let isp = document.querySelector(
        ".result-item-icon.result-item-isp .result-label"
      ).textContent;
      if (!showISP) isp = "Hidden";
      // 27 & 29 = nothing + unit
      if (upload.length == 29) {
        presenceData.details = `Live results - Ping ${
          ping.length == 27 ? "Testing" : ping
        } | Download ${download.length == 29 ? "Testing" : download} | Upload ${
          upload.length == 29 ? "Testing" : upload
        }`;
        presenceData.state = `ISP: ${isp} | Server: ${server}`;
      } else presenceData.details = `Browsing the homepage`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/result")) {
      const server =
        document.querySelector(
          ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
        ).textContent +
        " - " +
        document.querySelector(
          ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
        ).textContent;
      let isp = document.querySelector(
        ".result-item-icon.result-item-isp .result-label"
      ).textContent;
      if (!showISP) isp = "Hidden";
      try {
        presenceData.details = `Viewing results - Ping ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-share > div.result-container.clearfix > div.result-container-speed > div > div.result-item-container.result-item-container-align-right > div > div.result-data.u-align-left > span"
          ).textContent
        } ms | Download ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-share > div.result-container.clearfix > div.result-container-speed > div > div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span"
          ).textContent
        } Mbps | Upload ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-share > div.result-container.clearfix > div.result-container-speed > div > div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span"
          ).textContent
        } Mbps`;
      } catch {
        presenceData.details = `Viewing results - Ping ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-right > div > div.result-data.u-align-left > span"
          ).textContent
        } ms | Download ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-center > div > div.result-data.u-align-left > span"
          ).textContent
        } Mbps | Upload ${
          document.querySelector(
            "#container > div > div.main-content > div > div > div > div.pure-u-custom-speedtest > div.speedtest-container.main-row > div.main-view > div > div.result-area.result-area-test > div > div > div.result-container-speed.result-container-speed-active > div.result-container-data > div.result-item-container.result-item-container-align-left > div > div.result-data.u-align-left > span"
          ).textContent
        } Mbps`;
      }
      presenceData.state = `ISP: ${isp} | Server: ${server}`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/ookla-5g-map")) {
      presenceData.details = `Navigate on the 5G map`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/apps")) {
      presenceData.details = `Watching apps`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.endsWith("/insights")) {
      presenceData.details = `Browsing insights`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/insights/blog")) {
      presenceData.details = `Browsing blog`;
      if (window.location.pathname !== "/insights/blog/")
        presenceData.state = document.querySelector(
          "#speedtest .header .header-wrap h1"
        ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/global-index")) {
      presenceData.details = `Browsing Speedtest Global Index`;
      presenceData.state = document.querySelector(
        ".section .page-header"
      ).textContent;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/speedtest-servers")) {
      presenceData.details = `Look how to host a server`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/enterprise")) {
      presenceData.details = `Look entreprise solutions`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/about")) {
      presenceData.details = `About Ookla`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/login")) {
      presenceData.details = `Log in`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/register")) {
      presenceData.details = `Creating an account`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/settings")) {
      presenceData.details = `Browsing settings`;
      presenceData.startTimestamp = browsingStamp;
    } else if (window.location.pathname.includes("/help")) {
      presenceData.details = `Browsing help QA`;
      presenceData.startTimestamp = browsingStamp;
    } else {
      const server =
          document.querySelector(
            ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label"
          ).textContent +
          " - " +
          document.querySelector(
            ".result-item-icon.result-item-host .result-data, .result-item-icon.result-item-host .result-label .result-name"
          ).textContent,
        ping =
          document.querySelector(".result-item-ping .result-data").textContent +
          document.querySelector(".result-item-ping .result-data-unit")
            .textContent,
        download =
          document.querySelector(".result-item-download .result-data")
            .textContent +
          document.querySelector(".result-item-download .result-data-unit")
            .textContent,
        upload =
          document.querySelector(".result-item-upload .result-data")
            .textContent +
          document.querySelector(".result-item-upload .result-data-unit")
            .textContent;
      let isp = document.querySelector(
        ".result-item-icon.result-item-isp .result-label"
      ).textContent;
      if (!showISP) isp = "Hidden";
      if (upload.length == 29) {
        presenceData.details = `Live results - Ping ${
          ping.length == 27 ? "Testing" : ping
        } | Download ${download.length == 29 ? "Testing" : download} | Upload ${
          upload.length == 29 ? "Testing" : upload
        }`;
        presenceData.state = `ISP: ${isp} | Server: ${server}`;
      } else presenceData.details = `Browsing the homepage`;
      presenceData.startTimestamp = browsingStamp;
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
