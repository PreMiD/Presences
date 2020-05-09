var presence = new Presence({
    clientId: "656574682916585473"
  }),
  strings = presence.getStrings({
    play: "presence.playback.playing",
    pause: "presence.playback.paused"
  });
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo"
  };
  if (document.location.host == "downdetector.com") {
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.startsWith("/search/")) {
      presenceData.details = "Searching for:";
      item = document.location.href.split("?q=")[1];
      presenceData.state = item;
      presenceData.smallImageKey = "search";
    } else if (document.location.pathname.includes("/archive/")) {
      presenceData.details = "Viewing an archive for:";
      title = document.querySelector(
        "body > div.container.px-3.px-md-0 > nav > ol > li.breadcrumb-item.active > a"
      );
      presenceData.state = decodeReq(title);
    } else if (document.location.pathname.includes("/news/")) {
      presenceData.details = "Viewing a status overview for:";
      title = document.querySelector(
        "body > div.container.px-3.px-md-0 > nav > ol > li:nth-child(2) > a"
      );
      presenceData.state = decodeReq(title);
    } else if (document.location.pathname.includes("/map/")) {
      presenceData.details = "Viewing outage map for:";
      title = document.title.split("outage")[0];
      presenceData.state = title;
    } else if (document.location.pathname.includes("/status/")) {
      presenceData.details = "Viewing a status for:";
      title = document.querySelector(
        "body > div.container.px-3.px-md-0 > div.mx-auto > nav > ol > li.breadcrumb-item.active"
      );
      presenceData.state = decodeReq(title);
    } else if (document.location.pathname.includes("/companies/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Companies";
    } else if (document.location.pathname.includes("/privacy")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Privacy Policy";
    } else if (document.location.pathname.includes("/terms-of-use")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Terms of Use";
    } else if (document.location.pathname.includes("/accessibility")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Accessibility Statement";
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

function getTimestamps(videoTime, videoDuration) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}

function decodeReq(entity) {
  var txt = document.createElement("textarea");
  txt.innerHTML = entity.textContent;
  return txt.value;
}
