const presence = new Presence({
  clientId: "746803054841430066"
});

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    details: 'Give your Station an Identity'
  };
  
  if (document.location.pathname.includes("/index.php/submit-ticket/")) {
    presenceData.state = "Creating Ticket";
    presenceData.smallImageKey = "writing";
  } else if(document.location.pathname.includes("/index.php/my-tickets/")) {
    presenceData.state = "Viewing My Ticket";
    presenceData.smallImageKey = "reading";
  } else if(document.location.pathname.includes("/index.php/frequentlyasked/")) {
    presenceData.state = "Reading FAQ";
    presenceData.smallImageKey = "reading";
  } else {
    presenceData.state = "Browsing the homepage";
    presenceData.smallImageKey = "reading";

  }
    

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
