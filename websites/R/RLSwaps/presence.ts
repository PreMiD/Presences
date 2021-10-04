const presence = new Presence({
    clientId: "636614830698004480"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let user: HTMLElement | Element, title: HTMLElement | Element;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rlswaps"
  };

  title = document.querySelector("#offer-balance");
  user = document.querySelector("#receive-balance");

  if (document.location.pathname.includes("/history")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing their history";
  } else if (
    (title as HTMLElement).innerText !== "0.00" ||
    (user as HTMLElement).innerText !== "0.00"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Trading...";
    presenceData.state = `${(title as HTMLElement).innerText} keys worth for ${
      (user as HTMLElement).innerText
    }worth of items`;
  } else {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Going to trade...";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
