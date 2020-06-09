var presence = new Presence({
  clientId: "624006279769227265" // CLIENT ID FOR YOUR PRESENCE
});

var item: any,
  user: any,
  item2: any,
  item3: any,
  server: any,
  players: any,
  output: any;

var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "truckersmp"
  };

  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "truckersmp.com") {
    if (document.location.pathname.includes("/team")) {
      presenceData.details = "Viewing the staff team";
      presenceData.state = user.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/status")) {
      presenceData.details = "Viewing server status";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/knowledge-base")) {
      presenceData.details = "Viewing Knowledge Base";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/support")) {
      presenceData.details = "Viewing Support Center";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.details = "Viewing the rules";
      delete presenceData.state;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/download")) {
      presenceData.details = "Viewing the";
      presenceData.state = "download page";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/user/")) {
      item = document.querySelector(
        "body > div.wrapper > div.container.content.profile > div.row > div.col-md-9 > div > div.row > div.col-sm-8.sm-margin-bottom-30 > div > div.profile-bio > div > div > h1"
      );
      presenceData.details = "Viewing user:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/vtc")) {
      item = document.querySelector(
        "body > div.wrapper > div.breadcrumbs-v1.text-center.hidden-sm.hidden-xs > div > div > div.col-lg-10.col-md-9 > div > h2"
      );
      item2 = document.querySelector(
        "body > div.wrapper > div.container > div > div.col-md-9 > h1"
      );
      if (document.location.pathname.includes("/news")) {
        presenceData.details = "VTC, reading post:";
        if (item2 == null) {
          if (item.innerText.length > 128) {
            presenceData.state = item.innerText.substring(0, 125) + "...";
          } else {
            presenceData.state = item.innerText;
          }
        } else {
          if (item2.innerText.length > 128) {
            presenceData.state = item2.innerText.substring(0, 125) + "...";
          } else {
            presenceData.state = item2.innerText;
          }
        }

        presenceData.smallImageKey = "reading";

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/search")) {
        presenceData.details = "Searching a VTC";
        delete presenceData.state;
        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (item !== null) {
        presenceData.details = "Viewing VTC:";
        if (item.innerText.length > 128) {
          presenceData.state = item.innerText.substring(0, 125) + "...";
        } else {
          presenceData.state = item.innerText;
        }

        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else if (document.location.pathname.includes("/create")) {
        presenceData.details = "Creating a VTC";
        delete presenceData.state;
        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      } else {
        presenceData.details = "VTC, Browsing...";
        delete presenceData.state;
        delete presenceData.smallImageKey;

        presence.setActivity(presenceData);
      }
    } else if (document.location.pathname.includes("/blog/")) {
      item = document.querySelector(
        "body > div.wrapper > div.breadcrumbs-v1.text-center.hidden-sm.hidden-xs > div > h1"
      );
      presenceData.details = "Blog, Viewing post:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/blog")) {
      presenceData.details = "Viewing blog posts";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presence.setActivity();
      presence.setTrayTitle();
    }
  } else if (document.location.hostname == "forum.truckersmp.com") {
    item = document.querySelector(
      "#ipsLayout_mainArea > div.ipsColumns > div.ipsColumn.ipsColumn_fluid > div > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span > span"
    );
    item2 = document.querySelector(
      "#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span > span"
    );
    item3 = document.querySelector(
      "#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > div.ipsPhotoPanel.ipsPhotoPanel_small.ipsPhotoPanel_notPhone.ipsClearfix > div > h1 > span.ipsType_break.ipsContained > span"
    );
    if (document.URL.includes("/forum/")) {
      item = document.querySelector(
        "#ipsLayout_mainArea > div.ipsPageHeader.ipsClearfix > header > h1"
      );
      presenceData.details = "Forums, viewing category:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/staff/")) {
      presenceData.details = "Forums, viewing:";
      presenceData.state = "staff list";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/online/")) {
      presenceData.details = "Forums, viewing:";
      presenceData.state = "online users";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/messenger/")) {
      presenceData.details = "Forums, viewing their";
      presenceData.state = "direct messages";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/profile/")) {
      item = document.querySelector(
        "#elProfileHeader > div.ipsColumns.ipsColumns_collapsePhone > div.ipsColumn.ipsColumn_fluid > div > h1"
      );
      presenceData.details = "Forums, viewing user:";
      presenceData.state = item.innerText;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (item !== null) {
      presenceData.details = "Forums, reading post:";
      if (item.innerText.length > 128) {
        presenceData.state = item.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item.innerText;
      }

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (item2 !== null) {
      presenceData.details = "Forums, reading post:";
      if (item2.innerText.length > 128) {
        presenceData.state = item2.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item2.innerText;
      }

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (item3 !== null) {
      presenceData.details = "Forums, reading post:";
      if (item3.innerText.length > 128) {
        presenceData.state = item3.innerText.substring(0, 125) + "...";
      } else {
        presenceData.state = item3.innerText;
      }

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.URL.includes("/search/")) {
      item = document.querySelector("#elMainSearchInput");
      presenceData.details = "Forums, searching for:";
      presenceData.state = item.value;

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Forums, Browsing...";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "ets2map.com") {
    user = document.querySelector("#playerView");
    for (var i = 0; i < 999; i++) {
      item = "#server_";
      item = item + i;
      if (document.querySelector(item) !== null) {
        if (document.querySelector(item).className.includes("active")) {
          server = item + " > a";
          server = document.querySelector(server).innerText;
          players = item + " > span";
          players = document.querySelector(players).innerText;
          if (players == "-") {
            players = "None";
          }
        }
      }
    }

    if (!user.style.cssText.includes("display: none")) {
      user = document.querySelector("#playerClicked > div.player-name");
      item = document.querySelector("#game-time");
      output =
        user.innerText +
        " (Server: " +
        server +
        ", In-game time: " +
        item.innerText +
        ", " +
        players +
        " online)";
      presenceData.details = "ETS2Map, tracking player:";
      if (output.length > 128) {
        presenceData.state = output.substring(0, 125) + "...";
      } else {
        presenceData.state = output;
      }
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      item = document.querySelector("#game-time");
      output =
        "Server: " +
        server +
        ", In-game time: " +
        item.innerText +
        ", " +
        players +
        " online";
      presenceData.details = "ETS2Map, viewing:";
      if (output.length > 128) {
        presenceData.state = output.substring(0, 125) + "...";
      } else {
        presenceData.state = output;
      }
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "traffic.krashnz.com") {
    if (document.location.pathname.split("/")[3] !== undefined) {
      item = document.querySelector(
        "body > div.container > div > div:nth-child(1) > ol > li:nth-child(2) > a"
      );
      item2 = document.querySelector(
        "body > div.container > div > div:nth-child(1) > ol > li.breadcrumb-item.active"
      );
      presenceData.details = "Traffic Stats, viewing city:";
      presenceData.state =
        item2.innerText.replace(" (City)", "") +
        " (Server: " +
        item.innerText +
        ")";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.split("/")[2] !== undefined) {
      item = document.querySelector(
        "body > div.container > div > div > ol > li.breadcrumb-item.active"
      );
      item2 = document.querySelector("#stats-players");
      output = document.querySelector("#stats-time");
      presenceData.details = "Traffic Stats, viewing server:";
      presenceData.state =
        item.innerText + " (Online: " + item2.innerText + ")";
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Viewing Traffic Stats";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else if (document.location.hostname == "stats.truckersmp.com") {
    if (document.location.pathname.includes("/history")) {
      presenceData.details = "TMP Stats, viewing:";
      presenceData.state = "version history";

      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/api")) {
      presenceData.details = "Reading the API Docs";
      delete presenceData.state;

      presenceData.smallImageKey = "reading";

      presence.setActivity(presenceData);
    } else if (document.location.pathname.includes("/live")) {
      presenceData.details = "Viewing TMP Live Stats";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    } else {
      presenceData.details = "Viewing TMP Stats";
      delete presenceData.state;
      delete presenceData.smallImageKey;

      presence.setActivity(presenceData);
    }
  } else {
    presence.setActivity();
    presence.setTrayTitle();
  }
});
