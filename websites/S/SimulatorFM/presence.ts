const presence = new Presence({
    clientId: "790721299126943744"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const dj = document.querySelector("#dj_name") as HTMLElement,
    player = document.querySelector(".fa-pause") as HTMLElement,
    title = document.querySelector("#songName") as HTMLElement,
    artist = document.querySelector("#songArtist") as HTMLElement,
    presenceData: PresenceData = {
      largeImageKey: "largelogo"
    };

  if (player) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details =
      "Listening to " + title.textContent + " by " + artist.textContent;
    presenceData.state = "Presented by " + dj.innerText;
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Recently Played";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname == "/request") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Typing";
    presenceData.state = "A Request";
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
  } else if (document.location.pathname == "/contact-us") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing";
    presenceData.state = "Contact Page";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  }
});
