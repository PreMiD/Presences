const presence = new Presence({
    clientId: "939236497985536070",
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let title: HTMLElement;

let rankinginfo: HTMLElement;

let teamicon: HTMLImageElement;
let eventicon: HTMLImageElement;

let playername: HTMLElement;

presence.on("UpdateData", async () => {
  title = document.querySelector("head > title");
  rankinginfo = document.querySelector(".wf-tmp-h .normal");
  teamicon = document.querySelector(".wf-avatar.team-header-logo img");
  eventicon = document.querySelector(".wf-avatar.event-header-thumb img");
  playername = document.querySelector(".player-real-name.ge-text-light");

  const presenceData: PresenceData = {
    largeImageKey: "vlr",
    details: "Browsing page",
    startTimestamp: browsingTimestamp,
    state: title.textContent.replace(" | VLR.gg", ""),
  };
  /*Clear title in important pages*/
  if (title.textContent.includes("Valorant esports coverage | VLR.gg")) {
    presenceData.details = "On home";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/threads")) {

  /*Main pages*/
    presenceData.details = "Browsing threads";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/matches")) {
    presenceData.details = "Browsing matches";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/events")) {
    presenceData.details = "Browsing events";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/rankings")) {
    presenceData.details = "Viewing rankings";
    presenceData.state = rankinginfo.textContent.replace(
      "Valorant Team Rankings:",
      ""
    );
  } else if (document.location.pathname.includes("/stats")) {
    presenceData.details = "Viewing statistics";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/user")) {
    presenceData.details =
      "Viewing" + title.textContent.replace("Profile | VLR.gg", "") + "profile";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/settings")) {
    presenceData.details = "Viewing settings";
    presenceData.state = "";
  } else if (document.location.pathname.includes("/event")) {

  /*Show event name and logo*/
    presenceData.details = "Viewing event";
    presenceData.state = title.textContent;
    presenceData.state = title.textContent.replace(
      ": Brackets, Groups, and Standings | Valorant Event | VLR.gg",
      ""
    );
    presenceData.largeImageKey = eventicon.src;
  } else if (document.location.pathname.includes("/team")) {

  /*Show team logo*/
    presenceData.details = "Viewing team page";
    presenceData.state = title.textContent.replace(
      ": Valorant Team Profile | VLR.gg",
      ""
    );
    presenceData.largeImageKey = teamicon.src;
  } else if (document.location.pathname.includes("/player")) {

  /*Viewing player's page*/
    presenceData.details = "Viewing player's page";
    presenceData.state =
      title.textContent.replace(": Valorant Player Profile | VLR.gg", "") +
      "(" +
      playername.textContent +
      ")";
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
