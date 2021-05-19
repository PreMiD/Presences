const presence = new Presence({
  clientId: "812025934617509949"
});
let points: string,
  progress: string;
presence.on("iFrameData", (data: IFrameData) => {
  points = data.iframe_d.points,
  progress = data.iframe_d.progress;

});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

    presenceData.details = points;
    presenceData.state = progress;
    
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
