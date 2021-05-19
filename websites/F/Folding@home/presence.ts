const presence = new Presence({
  clientId: "812025934617509949"
});
let points: string,
  progress: string;
presence.on("iFrameData", (data: IFrameData) => {
  points = data.iframe_d.points
  progress = data.iframe_d.progress

});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "127.0.0.1") {
    presenceData.details = document.querySelector("#box-points-team > a").textContent;
    presenceData.state = document.querySelector("#slot-0 > div.pu > div.pu-bar.ui-progressbar.ui-widget.ui-widget-content.ui-corner-all > div").textContent;
  } else {

  console.log(`Points: ${points}, Progress: ${progress},`)
    presenceData.details = points;
    presenceData.state = progress;
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});

interface IFrameData {
  iframe_d: {
    points: string;
    progress: string;
  };
}
