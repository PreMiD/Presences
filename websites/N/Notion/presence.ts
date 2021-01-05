const presence = new Presence({
    clientId: "795902670647984159"
  }),
  strings = presence.getStrings({
    viewing: "general.viewing",
    editing: "general.editing"
  });

presence.on("UpdateData", async () => {
  const viewingString = (await strings).viewing;
  //const editingString = (await strings).editing;
  
  //i'm not too sure how to check if the page is currently being viewed or edited, so it just says "viewing" for every page right now
  
  const presenceData: PresenceData = {
    largeImageKey: "icon",
  };
  
  if (document.location.hostname.includes("notion.so")) {
    const pageName = document.title; //page title seems like a safe way to get the page name
    presenceData.details = viewingString //this would need to be replaced with an if-else for "editing" to show up
    presenceData.state = pageName;
  }
  
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});