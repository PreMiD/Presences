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
    set_showButtons = await presence.getSetting("showButtons"),
    urlpath = window.location.pathname.split("/");
  function showUsername() {
    return set_showUsername
      ? ` | User: ${document.querySelector("#RPC_Username").textContent}`
      : "";
  }
  if (
    document.location.hostname === "reallifegtav.de" ||
    document.location.hostname === "rlv.link"
  ) {
    if (set_timeElapsed) {
      presenceData.startTimestamp = browsingStamp;
    }
    if (
      (urlpath[1] === "" || document.location.pathname.includes("/home")) &&
      urlpath[2] != ""
    ) {
      presenceData.details = "Startseite" + showUsername();
    } else if (document.location.pathname.includes("/login")) {
      presenceData.details = "Meldet sich an" + showUsername();
    } else if (document.location.pathname.includes("/register")) {
      presenceData.details = "Registriert sich" + showUsername();
    } else if (document.location.pathname.includes("/dashboard")) {
      presenceData.details = "Dashboard" + showUsername();
    } else if (document.location.pathname.includes("/faq")) {
      presenceData.details = "FAQ" + showUsername();
    } else if (document.location.pathname.includes("/jobs")) {
      presenceData.details = "Jobs" + showUsername();
    } else if (document.location.pathname.includes("/ingame-jobs")) {
      presenceData.details = "Ingame Jobs" + showUsername();
    } else if (document.location.pathname.includes("/partner")) {
      presenceData.details = "Partner Panel" + showUsername();
    } else if (document.location.pathname.includes("/luxurycars")) {
      presenceData.details = "LuxuryAutos Shop" + showUsername();
    } else if (document.location.pathname.includes("/rules")) {
      presenceData.details = "Regelwerk" + showUsername();
    } else if (
      document.location.pathname.includes("/transactions") &&
      !window.location.search.substr(1)
    ) {
      presenceData.details = "Transaktionen" + showUsername();
    } else if (
      document.location.pathname.includes("/transactions") &&
      window.location.search.substr(1)
    ) {
      let inputfield = document.querySelector(
        'input[name="transfer_to"]'
      ).value;
      if (!inputfield) {
        inputfield = "...";
      }
      presenceData.details = "Überweisung an " + inputfield;
    } else if (document.location.pathname.includes("/pages")) {
      if (document.location.pathname.includes("/impressum")) {
        presenceData.details = "Impressum" + showUsername();
      } else if (document.location.pathname.includes("/datenschutz")) {
        presenceData.details = "Datenschutzerklärung" + showUsername();
      } else if (document.location.pathname.includes("/tos")) {
        presenceData.details = "Terms Of Service" + showUsername();
      }
    }
  } else if (
    document.location.hostname === "forum.reallifegtav.de" ||
    document.location.hostname === "forum.rlv.link"
  ) {
    if (set_timeElapsed) {
      presenceData.startTimestamp = browsingStamp;
    }
    if (
      urlpath[1] === "" ||
      document.location.pathname.includes("/categories")
    ) {
      presenceData.details = "Schaut sich im Forum um";
    } else if (urlpath[1] === "admin") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Admin Page";
    } else if (urlpath[1] === "team-build") {
      const tb_type = urlpath[2] || "High-Scores";
      let tb_user = "";
      if (urlpath[3] != undefined)
        tb_user = " von " + capitalizeFirstLetter(urlpath[3]) + ":";
      presenceData.details = "Team-Building";
      presenceData.state = capitalizeFirstLetter(tb_type) + tb_user;
    } else if (urlpath[1] === "map") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Karte";
    } else if (urlpath[1] === "latest") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Aktuelle Beiträge";
    } else if (urlpath[1] === "top") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Beliebte Beiträge";
    } else if (urlpath[1] === "about") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Über uns";
    } else if (urlpath[1] === "faq") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "FAQ";
    } else if (urlpath[1] === "tos") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Nutzungsbedienungen";
    } else if (urlpath[1] === "privacy") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Datenschutzerklärung";
    } else if (urlpath[1] === "review") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Reports";
    } else if (urlpath[1] === "g") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Gruppen";
    } else if (urlpath[1] === "unread") {
      presenceData.details = "Betrachtet:";
      presenceData.state = "Ungelesene Beiträge";
    } else if (urlpath[1] === "c") {
      if (urlpath[2] != undefined) {
        presenceData.details = "Betrachtet Kategorie:";
        presenceData.state =
          document.querySelector(".category-name").textContent;
        if (set_showButtons) {
          presenceData.buttons = [
            {
              label: "Kategorie anschauen",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "u") {
      if (urlpath[2] === "" || urlpath[2] == undefined) {
        presenceData.details = "Schaut alle User an";
      } else if (urlpath[2] != "" && urlpath[1] != "t") {
        presenceData.details = "Betrachtet Profil:";
        presenceData.state = capitalizeFirstLetter(urlpath[2]);
        if (set_showButtons) {
          presenceData.buttons = [
            {
              label: "Profil anschauen",
              url: window.location.href
            }
          ];
        }
      }
    } else if (urlpath[1] === "t") {
      presenceData.details = "Liest Beitrag:";
      presenceData.state = document.querySelector(".fancy-title").textContent;
      if (set_showButtons) {
        presenceData.buttons = [
          {
            label: "Beitrag anschauen",
            url: window.location.href
          }
        ];
      }
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
