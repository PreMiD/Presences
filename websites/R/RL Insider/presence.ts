const presence = new Presence({
    clientId: "636654506607771680"
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rlinsider"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing the home page";
  } else if (document.location.pathname.includes("/search")) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Searching an item";
  } else if (document.location.pathname.includes("/rocketpass")) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing the rocket pass";
  } else if (document.location.pathname.includes("/about")) {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing the about page";
  } else if (document.querySelector("#itemNameSpan") !== null) {
    presenceData.startTimestamp = browsingTimestamp;
    title = document.querySelector("#itemNameSpan");
    presenceData.details = "Viewing item:";
    presenceData.state = title.textContent;
  } else {
    presenceData.startTimestamp = browsingTimestamp;
    presenceData.details = "Viewing the price changes";
  }

  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
