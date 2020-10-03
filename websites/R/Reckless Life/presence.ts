const presence = new Presence({
    clientId: "644079842312192020"
  });
  
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo"
    }, page = window.location.pathname;
  
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
    
    if(page == "/") {
      presenceData.details = "Home Page";
  
      presenceData.state = "reckless.life";
    }
    else if (page.includes("guilds")) {
      const guildName: any = document.querySelector(
        "div.container > form.border > p.h4"
      );
      presenceData.details = "Guild Settings: ";
      presenceData.state = guildName.innerText;
    } 
    else if (page.includes("admin")) {
      const username: any = document.querySelector(
        "div.container-fluid > center > h3"
      );
      var usernameString = username.innerText, usernameString = usernameString.replace("Welcome Back, ", "");

      presenceData.details = "Admin";
      presenceData.state = "Viewing Guilds";

      presenceData.smallImageKey = "admin";
      presenceData.smallImageText = usernameString;
    }
  
    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });