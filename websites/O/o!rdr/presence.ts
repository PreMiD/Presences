const presence = new Presence({
    clientId: "868524215664513084"
  }),
  browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo",
    startTimestamp: browsingStamp
  };
  if (window.location.href.endsWith("/#/")) 
    presenceData.details = "Viewing the homepage";
   else if (window.location.href.includes("/renders")) 
    presenceData.details = "Viewing the renders list";
   else if (window.location.href.includes("/status")) 
    presenceData.details = "Viewing the servers list";
   else if (window.location.href.includes("/skins")) {
    const search: string = document.querySelector("[id='mat-input-0']").value;
    if (!search) 
      presenceData.details = "Viewing the skins list";
     else {
      presenceData.details = "Searching a skin:";
      presenceData.state = search;
    }
  } else if (window.location.href.includes("/donate")) 
    presenceData.details = "Viewing the donate page";
   else if (window.location.href.includes("docs/")) {
    presenceData.details = "Viewing the documentation";
    presenceData.state = document.title;
  } else if (window.location.href.includes("/about")) 
    presenceData.details = "Viewing the about page";
  

  if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
});