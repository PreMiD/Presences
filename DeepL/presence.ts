/*
  Currently no further information like time left and pause status, as the iframes get added after the page is loaded, which doesn't work with the iframe.ts at the moment.
*/

var presence = new Presence({
  clientId: "614903529240395782",
  mediaKeys: false
});

presence.on("UpdateData", async () => {
  if(document.location.pathname == "/translator") {
    let presenceData: presenceData = {
      details: document.getElementsByClassName("translate_from")[0].parentNode.textContent,
      state: document.getElementsByClassName("translate_to")[0].parentNode.textContent,
      largeImageKey: "lg-deepl"
    };
    presence.setActivity(presenceData);
  } else {
    let presenceData: presenceData = {
      largeImageKey: "lg-deepl"
    };
    presence.setActivity(presenceData);
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
