const presence = new Presence({
    clientId: "636659890927960064"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

let title: HTMLElement;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "rlt"
  };

  if (document.location.pathname === "/") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the home page";
  } else if (document.location.pathname.includes("/profiles/search")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Searching a profile";
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname.includes("/profiles/")) {
    presenceData.startTimestamp = browsingStamp;
    title = document.querySelector(
      "#rip_col > div.fav_no_category.main_box.main_stats_box > h4"
    );
    presenceData.details = "Viewing stats of:";
    [presenceData.state] = title.innerText.split("Last update");
  } else if (document.location.pathname.includes("/trades")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing trades";
  } else if (document.location.pathname.includes("live_tracker")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the live tracker";
  } else if (document.location.pathname.includes("/prices")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "Viewing the price changes";
  }

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
