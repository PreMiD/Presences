const presence = new Presence({
    clientId: "865963561889169408" 
  })
  presence.on("UpdateData", async () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo",
      details: "Idle"
    };

    let time = Math.floor(Date.now() / 1000);
    let test = document.location.pathname.split("/")

    if(test.length === 4) {
        presenceData.startTimestamp = time;
        presenceData.details = "Idle";
        presence.setActivity(presenceData);
    } else if (test[2] === "about") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the About Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "contact") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the Contact Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "terms") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the Terms Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "privacy") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the Privacy Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "faq") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the Faq Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "copyright") {
        presenceData.startTimestamp = time;
        presenceData.details = "View the Copyright Page";
        presence.setActivity(presenceData);
    }  else if (test[2] === "download") {
        let title = document.getElementsByClassName("display-5")
        presenceData.startTimestamp = time;
        presenceData.details = `Downloading.. ${title[0].textContent}`;
        presence.setActivity(presenceData);
    } else {
    presence.setActivity(presenceData);
  }
});