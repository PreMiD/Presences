/*
  Currently no further information like time left and pause status, as the iframes get added after the page is loaded, which doesn't work with the iframe.ts at the moment.
*/

var presence = new Presence({
  clientId: "470178791428325376",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname.startsWith("/show")) {
    let homepagePresence: presenceData = {
      details: document.getElementsByClassName("titel")[0].getElementsByTagName("h3")[0].innerText,
      // state: "Schaut gerade nicht",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if(document.location.pathname.startsWith("/speedsuche") || document.location.pathname.startsWith("/suche")) {
    let searchingPresence: presenceData = {
      details: "Sucht...",
      state: "Sucht nach einem Anime",
      largeImageKey: "logo"
    };
    presence.setActivity(searchingPresence);
  } else if(document.location.pathname == "/") {
    let homepagePresence: presenceData = {
      details: "Inaktiv...",
      state: "Hängt auf der Startseite ab",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if(document.location.pathname.startsWith("/animes")) {
    let overviewPresence: presenceData = {
      details: "Schaut sich um...",
      state: "Sucht nach Animes",
      largeImageKey: "logo"
    };
    presence.setActivity(overviewPresence);
  } else if(document.location.pathname.startsWith("/kalender")) {
    let calenderPresence: presenceData = {
      details: "Schaut in den Kalender",
      largeImageKey: "logo"
    };
    presence.setActivity(calenderPresence);
  } else {
    let inactivePresence: presenceData = {
      details: "Inaktiv...",
      largeImageKey: "logo"
    };
    presence.setActivity(inactivePresence);
  }
});

presence.on("MediaKeys", (key: string) => {
  switch (key) {
    case "pause":
      // TODO
      break;
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
