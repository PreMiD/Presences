var presence = new Presence({
  clientId: "703447484025798717"
});
var elapsed = Math.floor(Date.now() / 1000);
presence.on("UpdateData", () => {
  var path = window.location.pathname;
  var presenceData = {
    largeImageKey: "honeygain",
    details: "Browsing Honeygain",
    startTimestamp: elapsed
  };
  if (path == "/") {
    presenceData.details = "Looking at Dashboard";
    try {
      presenceData.state =
        "Balance: " +
        document
          .getElementsByClassName("sc-dnqmqq kpUaxq")[0]
          .innerText.split("Equals to ")[1];
      presenceData.state +=
        ", Gathered Today: " +
        document
          .getElementsByClassName("sc-dnqmqq kpUaxq")[1]
          .innerText.split("Equals to ")[1];
    } catch (e) {}
  } else if (path.includes("/transactions")) {
    presenceData.details = "Viewing Transaction History";
    try {
      presenceData.state =
        "Balance: " +
        document
          .getElementsByClassName("sc-dnqmqq kpUaxq")[1]
          .innerText.split("Equals to ")[1];
    } catch (e) {}
  } else if (path.includes("/referrals")) {
    presenceData.details = "Viewing Referrals";
    try {
      presenceData.state =
        "Referral Code: " +
        document
          .getElementsByClassName("sc-RefOD izklIM sc-bwCtUz gqfLZQ")[0]
          .value.split("https://r.honeygain.money/")[1];
    } catch (e) {}
  } else if (path.includes("/faq")) {
    presenceData.details = "Viewing FAQ";
  } else if (path.includes("/profile")) {
    presenceData.details = "Viewing Profile settings";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
