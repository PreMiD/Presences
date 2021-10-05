const presence = new Presence({
    clientId: "635213174144237601"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);
let title;
const viewString = "Viewing ",
  torrentString = "'s torrents";

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (new URLSearchParams(window.location.search).has("q")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching for:";
    presenceData.state = document.querySelector("input").value;
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing home page";
  } else if (document.location.pathname.includes("/rules")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Reading the rules";
  } else if (document.location.pathname.includes("/help")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "reading";
    presenceData.details = "Reading the help section";
  } else if (document.location.pathname.includes("/upload")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.smallImageKey = "upload";
    presenceData.details = "Uploading a torrent";
  } else if (document.location.pathname.includes("/view/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing torrent:";
    title = document.querySelector("h3.panel-title").textContent.trim();
    presenceData.state = title;
  } else if (document.location.pathname.includes("/user/")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details =
      viewString +
      document.querySelector("body > div > div > h3 > span").textContent +
      torrentString;
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
