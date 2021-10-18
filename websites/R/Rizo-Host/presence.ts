const presence = new Presence({
    clientId: "690593200473243759"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };

  if (document.location.hostname === "rizo-host.com") {
    if (document.location.pathname.endsWith("/web")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Web Hosting";
    } else if (document.location.pathname.endsWith("/reseller")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Reseller Hosting";
    } else if (document.location.pathname.endsWith("/billing/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Billing";
    } else if (document.location.pathname.endsWith("/discord/")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Discord Bot Hosting";
    } else if (document.location.href.includes("?action=")) {
      switch (document.location.href.split("?action=")[1]) {
        case "details":
          presenceData.details = "Updating profile";
          break;
        case "addcontact":
          presenceData.details = "Managing the contacts";
          break;
        case "changepw":
          presenceData.details = "Changing the password";
          break;
        case "security":
          presenceData.details = "Managing the settings for:";
          presenceData.state = "Security";
          break;
        case "emails":
          presenceData.details = "Viewing an email history";
          break;
        case "domains":
          presenceData.details = "Viewing the domains";
          break;
        case "services":
          presenceData.details = "Viewing a page:";
          presenceData.state = "My Products & Services";
          break;
        case "invoices":
          presenceData.details = "Viewing the invoices";
          break;
        case "quotes":
          presenceData.details = "Viewing the quotes";
          break;
      }
    } else if (document.location.href.includes("?a=")) {
      switch (document.location.href.split("?a=")[1]) {
        case "add&domain=register":
          presenceData.details = "Registering a new domain";
          break;
        case "add&domain=transfer":
          presenceData.details = "Transferring a domain";
          break;
        case "view":
          presenceData.details = "Viewing a page:";
          presenceData.state = "Cart review & checkout";
          break;
      }
    } else if (document.location.pathname.endsWith("supporttickets.php"))
      presenceData.details = "Viewing the tickets";
    else if (document.location.pathname.endsWith("/announcements"))
      presenceData.details = "Viewing the announcements";
    else if (document.location.pathname.endsWith("/knowledgebase"))
      presenceData.details = "Viewing the knowledgebase";
    else if (document.location.pathname.endsWith("/download"))
      presenceData.details = "Viewing the downloads";
    else if (document.location.pathname.endsWith("/serverstatus.php"))
      presenceData.details = "Viewing the server status";
    else if (document.location.pathname.endsWith("/submitticket.php"))
      presenceData.details = "Opening a new ticket";
    else if (document.location.pathname.endsWith("/clientarea.php")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Client Area";
    }
  }
  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
