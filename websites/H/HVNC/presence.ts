const presence = new Presence({
    clientId: "941317056589086730",
  }),
  browsingTimestamp = Math.floor(Date.now() / 1000);
let title;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingTimestamp,
  };

  if (new URLSearchParams(window.location.search).has("q")) {
    presenceData.details = "Searching For:";
    presenceData.state = document.querySelector("input").value;
    presenceData.smallImageKey = "search";
  } else if (document.location.pathname === "/")
    presenceData.details = "Viewing home page";
  else if (document.location.pathname.includes("/reader")) {
    presenceData.smallImageKey = "read";
    title = document.querySelector("title").textContent.trim();
    presenceData.details = "Reading:";
    presenceData.state = title;
    presenceData.buttons = [
      {
        label: "Read along",
        url: document.URL,
      },
    ];
  } else if (document.location.pathname.includes("/stats")) {
    presenceData.smallImageKey = "read";
    presenceData.details = "Viewing Statistics";
  } else if (document.location.pathname.includes("/login")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Logging In...";
  } else if (document.location.pathname.includes("/logs")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Viewing Logs";
  } else if (document.location.pathname.includes("/upload")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Adding Archives...";
  } else if (document.location.pathname.startsWith("/config/categories/")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Editing Category...";
  } else if (document.location.pathname.includes("/config")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Configuring...";
  } else if (document.location.pathname.includes("/batch")) {
    presenceData.smallImageKey = "sett";
    presenceData.details = "Running Batch Operations...";
  }
  if (presenceData.details) presence.setActivity(presenceData);
  else presence.setActivity();
});
