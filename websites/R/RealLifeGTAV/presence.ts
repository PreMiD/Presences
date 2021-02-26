const presence = new Presence({
    clientId: "760863245224640555"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
presence.on("UpdateData", async function () {
  const presenceData = {
      largeImageKey: "logo-sommer"
    },
    set_showUsername = await presence.getSetting("showUsername"),
    set_timeElapsed = await presence.getSetting("timeElapsed"),
    urlpath = window.location.pathname.split("/");
  function ifSettingEnabled(setting, string) {
    if (setting) {
      return string;
    } else {
      return "";
    }
  }
  if (
    document.location.hostname == "reallifegtav.de" ||
    document.location.hostname == "rlv.link"
  ) {
    if (set_timeElapsed) {
      presenceData.startTimestamp = browsingStamp;
    }
    if (
      (urlpath[1] == "" || document.location.pathname.includes("/home")) &&
      urlpath[2] != ""
    ) {
      presenceData.smallImageKey = "downloading";
      presenceData.details =
        "Startseite" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
    } else if (document.location.pathname.includes("/login")) {
      presenceData.details =
        "Meldet sich an" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/register")) {
      presenceData.details =
        "Registriert sich" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/dashboard")) {
      presenceData.details =
        "Dashboard" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/faq")) {
      presenceData.details =
        "FAQ" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/jobs")) {
      presenceData.details =
        "Jobs" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/ingame-jobs")) {
      presenceData.details =
        "Ingame Jobs" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/partner")) {
      presenceData.details =
        "Partner Panel" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/luxurycars")) {
      presenceData.details =
        "LuxuryAutos Shop" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.details =
        "Regelwerk" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (
      document.location.pathname.includes("/transactions") &&
      !window.location.search.substr(1)
    ) {
      presenceData.details =
        "Transaktionen" +
        ifSettingEnabled(
          set_showUsername,
          " | User: " + document.querySelector("#RPC_Username").textContent
        );
      presenceData.smallImageKey = "reading";
    } else if (
      document.location.pathname.includes("/transactions") &&
      window.location.search.substr(1)
    ) {
      let inputfield = document.querySelector('input[name="transfer_to"]')
        .value;
      if (!inputfield) {
        inputfield = "...";
      }
      presenceData.details = "Überweisung an " + inputfield;
      presenceData.smallImageKey = "writing";
    } else if (document.location.pathname.includes("/pages")) {
      if (document.location.pathname.includes("/impressum")) {
        presenceData.details =
          "Impressum" +
          ifSettingEnabled(
            set_showUsername,
            " | User: " + document.querySelector("#RPC_Username").textContent
          );
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/datenschutz")) {
        presenceData.details =
          "Datenschutzerklärung" +
          ifSettingEnabled(
            set_showUsername,
            " | User: " + document.querySelector("#RPC_Username").textContent
          );
        presenceData.smallImageKey = "reading";
      } else if (document.location.pathname.includes("/tos")) {
        presenceData.details =
          "Terms Of Service" +
          ifSettingEnabled(
            set_showUsername,
            " | User: " + document.querySelector("#RPC_Username").textContent
          );
        presenceData.smallImageKey = "reading";
      }
    }
  } else if (
    document.location.hostname == "forum.reallifegtav.de" ||
    document.location.hostname == "forum.rlv.link"
  ) {
    if (set_timeElapsed) {
      presenceData.startTimestamp = browsingStamp;
    }
    if (
      urlpath[1] == "" ||
      document.location.pathname.includes("/categories")
    ) {
      presenceData.smallImageKey = "reading";
      presenceData.details = "Schaut sich im Forum um";
    } else if (
      document.location.pathname.includes("/latest") &&
      !document.location.pathname.includes("/c") &&
      !document.location.pathname.includes("/u")
    ) {
      presenceData.smallImageKey = "reading";
      presenceData.details = "Schaut aktuelle Beiträge an";
    } else if (
      document.location.pathname.includes("/top") &&
      !document.location.pathname.includes("/c") &&
      !document.location.pathname.includes("/u")
    ) {
      presenceData.smallImageKey = "reading";
      presenceData.details = "Schaut beliebte Beiträge an";
    } else if (document.location.pathname.includes("/c")) {
      if (urlpath[2] != undefined) {
        presenceData.details =
          "Schaut " +
          document.querySelector(".category-name").textContent +
          " an";
        presenceData.smallImageKey = "reading";
      }
    } else if (document.location.pathname.includes("/u")) {
      if (urlpath[2] == "" || urlpath[2] == undefined) {
        presenceData.details = "Schaut alle User an";
        presenceData.smallImageKey = "reading";
      } else if (urlpath[2] != "" && urlpath[1] != "t") {
        presenceData.details =
          "Profil von " + capitalizeFirstLetter(urlpath[2]);
        presenceData.smallImageKey = "reading";
      }
    } else if (document.location.pathname.includes("/t")) {
      presenceData.details =
        "Liest:" +
        document.querySelector(".fancy-title").textContent +
        "Beitrag";
      presenceData.smallImageKey = "reading";
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
