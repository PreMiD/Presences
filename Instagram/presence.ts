var presence = new Presence({
  clientId: "547436289960574977",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname == ("/")) {
    let homepagePresence: presenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if(document.location.pathname.startsWith("/stories")) {
    let presenceData: presenceData = {
      details: "Viewing a story",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/accounts")) {
    let presenceData: presenceData = {
      details: "Settings",
      state: "Changing their Settings",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/p")) {
    let presenceData: presenceData = {
      details: "Viewing a post",
      state: "NAME-HERE",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/explore")) {
    let presenceData: presenceData = {
      details: "Exploring...",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if(document.location.pathname.startsWith("/nametag")) {
    let presenceData: presenceData = {
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    // TODO: Check if the page is really a profile
    let presenceData: presenceData = {
      details: "Viewing a profile",
      state: document.location.pathname.split("/")[1],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});

presence.on('iFrameData', function(data) {
  console.log(data);
});

/**
 * Get Timestamps
 * @param {Number} videoTime Current video time seconds
 * @param {Number} videoDuration Video duration seconds
 */
function getTimestamps(videoTime: number, videoDuration: number) {
  var startTime = Date.now();
  var endTime = Math.floor(startTime / 1000) - videoTime + videoDuration;
  return [Math.floor(startTime / 1000), endTime];
}
