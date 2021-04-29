const presence = new Presence({
  clientId: "837429681975459850"
});

const path = window.location.pathname;
presence.on("UpdateData", () => {
   const presenceData: PresenceData = {
     largeImageKey: "logo",
     startTimestamp: Math.floor(Date.now() / 1000),
     details = "View a Page:"
   };

  switch(path.toLowerCase()){
    case '/': presenceData.state = "Home Page"; break;
    case '/premium': presenceData.state = "Premium"; break;
    case '/create': presenceData.state = "Creating Profile"; break;
    case '/legal': presenceData.state = "Legal Page"; break;
    case '/partners': presenceData.state = "Partners Page"; break;
    case '/partners': presenceData.state = "Partners Page"; break;
    case '/supporters': presenceData.state = "Supporters Page"; break;
    case '/supporters': presenceData.state = "Supporters Page"; break;
    case '/settings': presenceData.state = "Modifying Resume"; break;
    case '/profile': 
       var name = document.querySelector("body > div.profile_header > div > div > h1").textContent;
       presenceD.details = "Viewing Profile";
       presenceD.state = name;
       presenceD.buttons = [
         {
           url: document.URL,
           label: "Visit Profile"
         }
       ];
    break;
    case: 'cv':
       var name = document.querySelector("body > div:nth-child(8) > div.user_box > div.container.left > div > h2").getAttribute("data-title")
       presenceD.details = "Viewing CV Page";
       presenceD.state = name;
       presenceD.buttons = [
         {
           url: document.URL,
           label: "Visit Resume"
         }
       ];
     break;
     default: presenceData.state = "Unknown Page"; break;
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
