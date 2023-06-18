const presence1 = new Presence({ clientId: "1112901248421732462" });

presence1.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "app_icon",
    startTimestamp: Math.floor(Date.now() / 1000)
    };

  const username = document.location.pathname.split("/").pop();
  const pagePath = document.location.pathname;

  switch (pagePath) {
    case "/":
      presenceData.details = "Viewing";
      presenceData.state = "Startpage";
      break;
    case "/terms-of-service":
      presenceData.details = "Viewing";
      presenceData.state = "Terms of Service";
      break;
    case "/privacy-policy":
      presenceData.details = "Viewing";
      presenceData.state = "Privacy Policy";
      break;
    case "/dmca-policy":
      presenceData.details = "Viewing";
      presenceData.state = "DMCA Policy";
      break;
    case "/community-guidelines":
      presenceData.details = "Viewing";
      presenceData.state = "Community Guidelines";
      break;
    default:
      if (username) {
        presenceData.details = "Watching";
        presenceData.state = username;
        presenceData.buttons = [
          { label: "Watch Stream", url: `https://kick.com/${username}` }
        ];
      } else {
        presenceData.details = "Viewing";
        presenceData.state = "Unknown";
      }
      break;
  }

  presence1.setActivity(presenceData);
});
