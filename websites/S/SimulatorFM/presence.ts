const presence = new Presence({
    clientId: "790721299126943744"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "largelogo"
  };

  if (document.querySelector<HTMLElement>(".fa-pause")) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = `Listening to ${
      document.querySelector<HTMLElement>("#songName").textContent
    } by ${document.querySelector<HTMLElement>("#songArtist").textContent}`;
    presenceData.state = `Presented by ${
      document.querySelector<HTMLElement>("#dj_name").textContent
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
