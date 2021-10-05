const presence = new Presence({
    clientId: "640538683392655370"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title: HTMLElement,
  player: HTMLAudioElement,
  dj: HTMLElement,
  listeners: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tsfm"
  };
  //presenceData.startTimestamp = browsingStamp;
  player = document.querySelector("#player");
  if (!player.paused) {
    title = document.querySelector("#song");
    dj = document.querySelector("#djname");
    listeners = document.querySelector("#listeners");
    presenceData.details = title.textContent;
    presenceData.state = `DJ: ${
      dj.textContent
    } Listeners: ${listeners.textContent.replace(" Listeners", "")}`;
    presenceData.smallImageKey = "play";
  } else if (document.location.pathname.includes("/recent")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the recently";
    presenceData.state = "played songs";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/team")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the staff team";
  } else if (document.location.pathname.includes("/request")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Requesting a song";
  } else if (document.location.pathname.includes("/applications")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Applying for staff";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Reading about TSFM";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/schedule")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the schedule";
  } else if (document.location.pathname.includes("/convoys")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the convoys";
  } else if (document.location.pathname.includes("/streamers")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the streamers";
  } else if (document.location.pathname.includes("/partner")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the partners";
  } else if (document.location.pathname.includes("/vtc")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the VTC";
  } else if (document.location.pathname.includes("/weekly")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the weekly";
    presenceData.state = "shows on TSFM";
  } else if (document.location.pathname.includes("/tuneoftheweek")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the tune";
    presenceData.state = "of the week";
  } else if (document.location.pathname.includes("/contact")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Contacting TSR";
    presenceData.smallImageKey = "writing";
  } else if (document.location.pathname.includes("/modifications")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the offical";
    presenceData.state = "modifications list";
  } else if (document.location.pathname.includes("/advertisements")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the";
    presenceData.state = "advertisements packages";
  } else if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Browsing...";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
