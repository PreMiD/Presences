const presence = new Presence({
  clientId: "666412985513672715"
});

presence.on("UpdateData", () => {
  let logo = "logo_onlyhit";
  if (document.querySelector(".stream-name").textContent == "OnlyHit Gold") {
    logo = "logo_gold";
  }
  if (document.querySelector(".stream-name").textContent == "OnlyHit Japan") {
    logo = "logo_japan";
  }
  if (document.querySelector(".stream-name").textContent == "OnlyHit K-Pop") {
    logo = "logo_k-pop";
  }
  const pageName = document.title.slice(13),
    presenceData: PresenceData = {
      largeImageKey: `${logo}`,
      smallImageKey: `${status}`,
      smallImageText: `Viewing: ${pageName}`
    },
    title = `${document.querySelector(".artist").textContent} - ${
      document.querySelector(".title").textContent
    } `,
    radio = document.querySelector(".stream-name").textContent;

  presenceData.details = `${title}`;
  presenceData.state = `${radio} on OnlyHit.us`;

  let lastTimeStart = Math.floor(Date.now() / 1000);
  lastTimeStart = Math.floor(Date.now() / 1000);
  presenceData.startTimestamp = lastTimeStart;

  presence.setActivity(presenceData);
});
