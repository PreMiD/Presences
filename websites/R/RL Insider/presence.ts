const presence = new Presence({
    clientId: "636654506607771680"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rlinsider"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the home page";
  } else if (document.location.pathname.includes("/search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching an item";
  } else if (document.location.pathname.includes("/rocketpass")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the rocket pass";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the about page";
  } else if (document.querySelector("#itemNameSpan") !== null) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector("#itemNameSpan");
    presenceData.details = "Viewing item:";
    presenceData.state = title.innerText;
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the price changes";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
