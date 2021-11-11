const presence = new Presence({
    clientId: "790721299126943744"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "largelogo"
  };

  if (document.querySelector(".fa-pause") as HTMLElement) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = `Listening to ${
      document.querySelector("#songName") as HTMLElement.textContent
    } by ${document.querySelector("#songArtist") as HTMLElement.textContent}`;
    presenceData.state = `Presented by ${
      document.querySelector("#dj_name") as HTMLElement.textContent
    }`;
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing";
    presenceData.state = "Recently Played";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/request") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Typing";
    presenceData.state = "A Request";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/timetable") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing";
    presenceData.state = "Timetable";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/team") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing";
    presenceData.state = "Team Page";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/apply") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing";
    presenceData.state = "Apply to become a presenter";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  } else if (document.location.pathname === "/contact-us") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing";
    presenceData.state = "Contact Page";
    presenceData.smallImageKey = "reading";
    presence.setActivity(presenceData);
  }
});
