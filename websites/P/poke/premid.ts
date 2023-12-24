const presence = new Presence({
  clientId: "1188371319776100463",
});

function getTime() {
const timeElement = document.querySelector("video");
const currentTime = timeElement.currentTime;

// Convert currentTime to minutes and seconds
const seconds = Math.floor(currentTime % 60);
const minutes = Math.floor((currentTime / 60) % 60);
const hours = Math.floor(currentTime / 3600);

// Format the currentTime
let formattedCurrentTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

// Add hours if they exist
if (hours > 0) {
  formattedCurrentTime = `${hours.toString().padStart(2, '0')}:${formattedCurrentTime}`;
}
  
return formattedCurrentTime;
}

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "https://cdn.glitch.global/d68d17bb-f2c0-4bc3-993f-50902734f652/yt-ukraine.png?v=1703399674868",
    smallImageKey: "more",
  };
  let clear = false;

  switch (document.location.pathname.replace("/feed", "").split("/")[1]) {
    case "":

    case "app":
      presenceData.details = "Browsing trending videos";
      break;

    case "my-acc":
      presenceData.details = "Browsing subscriptions";
      break;
 
    case "license":
    case "privacy":
      presenceData.details = "Managing preferences";
      break;

    case "watch":
      presenceData.smallImageKey =
        document.querySelector("video") &&
        !document.querySelector("video").paused
          ? "play"
          : "pause";
      const videoTitleElement = document.querySelector(".video-title.t");
      presenceData.details = videoTitleElement
        ? videoTitleElement.textContent.trim()
        : "No Title Available";

      const channelNameElement = document.querySelector(
        ".video-info-pill-channelname"
      );
      presenceData.state = channelNameElement
        ? channelNameElement.textContent.trim()
        : "No Channel Name Available";
      const videoPlayer = document.querySelector("video");

      if (videoPlayer && !videoPlayer.paused) {
        presenceData.startTimestamp = getTime();
      } 

    case "channel":
      const nameElement = document.querySelector(".name p");
      presenceData.details = "Viewing channel";
      presenceData.state = nameElement ? nameElement.textContent.trim() : "No Name Available";
      break;

    default:
      clear = true;
      break;
  }

  if (clear) presence.setActivity();
  else presence.setActivity(presenceData);
});
