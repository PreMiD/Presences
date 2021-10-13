const presence = new Presence({
    clientId: "655050505726197781"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "probot",
    startTimestamp: browsingStamp
  };

  if (document.location.pathname.includes("/dashboard")) {
    presenceData.details = "Managing Server";
    const title = (
      document.querySelector("div.user-profile > div > div") as HTMLElement
    ).innerText;
    presenceData.state = title;
  } else if (document.location.pathname.includes("/commands")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Commands";
  } else if (document.location.pathname.includes("/premium"))
    presenceData.details = "Viewing Premium";
  else if (document.location.pathname.includes("/bgs")) {
    presenceData.details = "Managing the";
    presenceData.state = "profile backgrounds";
  } else if (document.location.pathname.includes("/id")) {
    presenceData.details = "Managing the";
    presenceData.state = "ID backgrounds";
  } else if (document.location.pathname.includes("/badges")) {
    presenceData.details = "Managing the";
    presenceData.state = "profile badges";
  } else if (document.location.pathname.includes("/xp")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Top 100 by XP";
  } else if (document.location.pathname.includes("/credits")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Richest 100 Billionaires";
  } else if (document.location.pathname.includes("/transactions")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Credits Transactions";
  }

  presence.setActivity(presenceData);
});
