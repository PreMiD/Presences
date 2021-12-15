const presence = new Presence({
    clientId: "640997739689279498"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const playing = document
      .getElementsByClassName("btn playbutton")[0]
      .getAttributeNode("data-trackingaction").value,
    presenceData: PresenceData = {
      largeImageKey: "logo"
    };

  switch (playing) {
    case "stop": {
      const playingnow = document.querySelector(
        "#app > div.fixed.fixed--top > div > a > div > div > span > b"
      ).textContent;
      presenceData.details = `Playing ${playingnow}`;
      const music = document.querySelector(
        "#app > div.fixed.fixed--top > div > a > div > div > div"
      ).textContent;
      presenceData.state = music;
      break;
    }
    case "play": {
      presenceData.startTimestamp = browsingStamp;
      if (document.location.pathname === "/genres")
        presenceData.state = "Schaut nach Genres";
      else if (document.location.pathname.includes("/stations/genre/"))
        presenceData.state = "Sucht Stationen";
      else if (document.location.pathname.includes("/stations/location"))
        presenceData.state = "Sucht lokale Stationen";
      else if (document.location.pathname === "/stations/all")
        presenceData.state = "Sucht nach Top-Sender";
      else {
        const station = document.querySelector(
          "#app > section > header > div.fm-station-header__col.fm-station-header__col--name > h1"
        ).textContent;
        presenceData.details = "Befindet sich bei Station";
        presenceData.state = station;
      }
    }
    //presenceData.state = "Lurking on LautFM"; break;
    //default : presenceData.state = "ZZzzzZZ";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
