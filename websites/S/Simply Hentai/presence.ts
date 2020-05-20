var presence = new Presence({
  clientId: "608043966285348944"
});

var lastPlaybackState = null;
var reading;
var browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != reading) {
  lastPlaybackState = reading;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  reading =
    document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

  var something: any, a: any, b: any;

  if (reading) {
    something = document.querySelectorAll(".margin-bottom-12 h1 a");
    a = something[0];
    b = something[1];

    var page = document
      .querySelector(".page-jump.text-center")
      .getAttribute("value");

    const presenceData: PresenceData = {
      details: a.innerText,
      state: b.innerText + " [Page: " + page + "]",
      largeImageKey: "lg"
    };

    presenceData.startTimestamp = browsingStamp;

    presence.setActivity(presenceData, true);
  } else {
    const presenceData: PresenceData = {
      largeImageKey: "lg"
    };

    presenceData.details = "Browsing...";
    presenceData.startTimestamp = browsingStamp;

    delete presenceData.state;
    delete presenceData.smallImageKey;

    presence.setActivity(presenceData, true);
  }
});
