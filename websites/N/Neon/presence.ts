const presence = new Presence({
  clientId: "837985880408457217"
}),
  timestamp = Math.floor(Date.now() / 1000);

function findElement(tagName: string, className: string): Element {
  return Array.from(
    document.querySelectorAll(tagName)
  ).find((x) => x.className.includes(className));
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "key",
    details: "Browsing...",
    startTimestamp: timestamp
  },
  pathname = document.location.pathname;

  switch(true) {
    case pathname.includes("/series/"):
      presenceData.details = "Viewing series:";
      presenceData.state = document.querySelector("h1.s5")?.textContent;

      presenceData.buttons = [
        {
          label: "View Series",
          url: document.URL
        }
      ];
      break;

    case pathname.includes("/movie/"):
      presenceData.details = "Viewing movie:";
      presenceData.state = document.querySelector("h1.tk")?.textContent;
  
      presenceData.buttons = [
        {
          label: "View Movie",
          url: document.URL
        }
      ];
      break;
  
    case pathname.includes("/trailer/"):
      {
        const video = document.querySelector("video"),
        timestamps = presence.getTimestampsfromMedia(video);
  
        presenceData.details = findElement("span", "Tr-title")?.textContent;
        presenceData.state = "Trailer";
  
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused ? "Paused" : "Playing";
  
        presenceData.endTimestamp = timestamps[1];
  
        presenceData.buttons = [
          {
            label: "Watch Trailer",
            url: document.URL
          }
        ];
  
        if (video.paused){
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
      break;
    
    case pathname.includes("/my-list"):
      presenceData.details = "Viewing their list";
      break;

    case pathname.includes("/my-account"):
      presenceData.details = "Viewing their account";
      break;

    case pathname.includes("/watch/"):
      {
        const video = document.querySelector("video"),
        isSeries = !!findElement("span", "Mr-text"),
        timestamps = presence.getTimestampsfromMedia(video);
      
        presenceData.details = findElement("span", "Tr-title")?.textContent;
  
        presenceData.smallImageKey = video.paused ? "pause" : "play";
        presenceData.smallImageText = video.paused ? "Paused" : "Playing";
  
        presenceData.endTimestamp = timestamps[1];
  
        if (isSeries)
          presenceData.state = `${findElement("span", "Mr-text")?.textContent.replace(".", ":")} ${findElement("h3", "so-name")?.textContent.trim().replace(/([0-9]+)[.]/, "")}`;
        else presenceData.state = "Movie"; 
  
        presenceData.buttons = [
          {
            label: isSeries ? "Watch Episode" : "Watch Movie",
            url: document.URL
          }
        ];
  
        if (video.paused){
          delete presenceData.startTimestamp;
          delete presenceData.endTimestamp;
        }
      }
      break;

    case document.location.search.startsWith("?"):
      presenceData.details = "Searching for:";
      presenceData.state = (new URLSearchParams(document.location.search)).get("search");
      break;
  }

  if (!(await presence.getSetting("buttons")))
    delete presenceData.buttons;
  if (!(await presence.getSetting("timestamp"))){
    delete presenceData.startTimestamp;
    delete presenceData.endTimestamp;
  }

  presence.setActivity(presenceData);
});