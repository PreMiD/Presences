const presence = new Presence({
    clientId: "903957474489548813"
  });
  
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo"
      },
      searchURL = new URL(document.location.href),
      searchResult = searchURL.searchParams.get("q"),
      searchCategory = searchURL.searchParams.get("k");
    if (window.location.pathname.startsWith("/")) {
      presenceData.details = "Bir sayfa görüntülüyor:";
      presenceData.state = "Teknofest";
    } 
    if (!presenceData.details) {
      presence.setTrayTitle();
      presence.setActivity();
    } else presence.setActivity(presenceData);
  });
