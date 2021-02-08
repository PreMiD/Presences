const presence = new Presence({
  clientId: "797749214175035412"
});

const timeStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: timeStamp
  };
  const page = document.location.pathname;
  if (page.startsWith("/learn/")) {
    presenceData.details = "Learning:";
    presenceData.state = "Writing Code!";
  } else if (page.startsWith("/login")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Signing In";
  } else if (page.startsWith("/news/")) {
    presenceData.details = "Viewing Page:";
    presenceData.state = "Reading the news";
  } else if (page.startsWith("/learn")) {
    presenceData.details = "Deciding:";
    presenceData.state = "Choosing what to learn today 🤔";
  }
  presence.setActivity(presenceData);
});
