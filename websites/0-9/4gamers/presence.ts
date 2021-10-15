const presence = new Presence({
    clientId: "648494004870184981"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: string;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "4gamers"
  };

  if (document.location.hostname === "www.4gamers.com.tw") {
    if (document.location.pathname === "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing home page";
    } else if (document.location.pathname.includes("/new")) {
      title = document.getElementsByClassName("news-header-title")[0].innerHTML;
      const category = document.getElementsByClassName(
        "news-header-category "
      )[0].innerHTML;
      presenceData.details = title;
      presenceData.state = `Category: ${category}`;
    } else if (document.location.pathname.includes("magazine")) {
      title = document.getElementsByClassName("magazine-content-title")[0]
        .innerHTML;
      const time = document.getElementsByClassName("magazine-content-time")[0]
        .innerHTML;
      presenceData.details = title;
      presenceData.state = `Publish Date: ${time}`;
    } else if (document.location.pathname.includes("tournament"))
      presenceData.details = "賽事專欄";
  }
  if (!presenceData.details) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing site:";
    presenceData.state = "4gamers";
    presence.setActivity(presenceData);
  } else presence.setActivity(presenceData);
});
