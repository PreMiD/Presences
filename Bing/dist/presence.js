const presence = new Presence({
  clientId: "691575527190036480"
});

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "logo"
  };

  if (
    document.URL === "https://www.bing.com/" ||
    document.URL === "https://www.bing.com" ||
    document.location.href.includes("/?cc=") ||
    document.location.href.includes("/?FORM=Z9FD1")
  ) {
    presenceData.details = "Chilling on the homepage";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.href.includes("/account/general")) {
    presenceData.details = "Changing my settings!";
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  } else if (document.location.href.includes("?q=")) {
    presenceData.state = document.getElementById("sb_form_q").value;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);

    if (
      document.location.href.includes("FORM=HDRSC2") ||
      document.location.href.includes("&form=QBIR")
    ) {
      presenceData.details = "Exploring images in search for...";
    } else if (
      document.location.href.includes("FORM=HDRSC3") ||
      document.location.href.includes("&form=QBVR")
    ) {
      presenceData.details = "Probing videos for...";
    } else if (
      document.location.href.includes("FORM=HDRSC4") ||
      document.location.href.includes("&form=QBNT")
    ) {
      presenceData.details = "Inquiring the news about...";
    } else {
      presenceData.details = "Searching the interwebz for...";
    }
  }

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
