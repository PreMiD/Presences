let presence = new Presence({
  clientId: "608043966285348944"
}),

 lastPlaybackState = null,
 reading,
 browsingStamp = Math.floor(Date.now() / 1000);

if (lastPlaybackState != reading) {
  lastPlaybackState = reading;
  browsingStamp = Math.floor(Date.now() / 1000);
}

presence.on("UpdateData", async () => {
  reading =
    document.querySelector(".margin-bottom-12 h1 a") !== null ? true : false;

  let something: any, a: any, b: any;

  if (reading) {
    something = document.querySelectorAll(".margin-bottom-12 h1 a");
    a = something[0];
    b = something[1];

    const page = document
      .querySelector(".page-jump.text-center")
      .getAttribute("value"),

     presenceData: PresenceData = {
      details: a.innerText,
      state: `${b.innerText} [Page: ${page}]`,
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
