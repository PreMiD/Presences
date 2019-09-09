/*
  Currently no further information like time left and pause status, as the iframes get added after the page is loaded, which doesn't work with the iframe.ts at the moment.
*/

const presence = new Presence({
  clientId: "470178791428325376",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  const { pathname } = window.location;
  const presenceData: presenceData = {
    largeImageKey: "logo"
  };

  if (pathname.startsWith("/show")) {
    presenceData.details = document
      .getElementsByClassName("titel")[0]
      .getElementsByTagName("h3")[0].innerText;
  } else if (
    pathname.startsWith("/speedsuche") ||
    pathname.startsWith("/suche")
  ) {
    presenceData.details = "Sucht...";
    presenceData.state = "Sucht nach einem Anime";
  } else if (pathname == "/") {
    presenceData.details = "Inaktiv...";
    presenceData.state = "Hängt auf der Startseite ab";
  } else if (pathname.startsWith("/animes")) {
    presenceData.details = "Schaut sich um...";
    presenceData.state = "Sucht nach Animes";
  } else if (pathname.startsWith("/kalender")) {
    presenceData.details = "Schaut in den Kalender";
  } else {
    presenceData.details = "Inaktiv...";
  }

  presence.setActivity(presenceData);
});

presence.on("MediaKeys", key => {
  switch (key) {
    case "pause":
      // TODO
      break;
  }
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