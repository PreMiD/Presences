const presence = new Presence({
    clientId: "765735268421468190"
  }),
  browsingStamp = Math.floor(Date.now() / 1000),
  dj = document.querySelector("#presenter-name") as HTMLElement;

let title: HTMLElement, artist: HTMLElement, player: HTMLAudioElement;

presence.on("UpdateData", async () => {
  player = document.querySelector(".uil-pause");
  title = document.querySelector("#song-title");
  artist = document.querySelector("#song-artist");

  const presenceData: PresenceData = {
    largeImageKey: "largelogo"
  };

  if (player) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details =
      "Listening to " + title.textContent + " by " + artist.textContent;
    presenceData.state = "Presented by " + dj.innerText;
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/home") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Recently Played";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/timetable") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Timetable";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/team") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Team Page";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/apply") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Apply to become a presenter";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/contact") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Contact Page";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  }
});
