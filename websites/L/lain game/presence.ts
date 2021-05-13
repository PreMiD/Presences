const presence = new Presence({
  clientId: "672143036767272961"
});

const browsingStamp = Math.floor(Date.now() / 1000);
const url = new URLSearchParams(window.location.search).get("site");

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (url == "0") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "viewing site A";
  } else if (url == "1") {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "viewing site B";
  } else if (new URLSearchParams(window.location.search).has("id")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "viewing an file:";
    presenceData.state = document.querySelector(
      "body > center > table > tbody > tr:nth-child(1) > td.ta4d01 > table > tbody > tr:nth-child(1) > td.ta4d2 > a:nth-child(2)"
    ).textContent;
  } else if (new URLSearchParams(window.location.search).has("tag")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "viewing an tag:";
    presenceData.state =
      document.querySelector("body > center > h1").textContent;
  } else if (
    document.location.pathname == "/" ||
    document.location.pathname == "/index.html"
  ) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "index";
  } else if (document.location.pathname.includes("/about.html")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "reading the about page";
    presenceData.smallImageKey = "reading";
  } else if (document.location.pathname.includes("/feedback.php")) {
    presenceData.startTimestamp = browsingStamp;
    presenceData.details = "giving feedback";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
