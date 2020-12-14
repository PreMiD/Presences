const presence = new Presence({
    clientId: "787992308448100412"
  });
  
  const browsingStamp = Math.floor(Date.now() / 1000);
  
  presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
      largeImageKey: "logo"
    };
  
    if (document.location.hostname == "bestrp.pl") {
    if (document.location.pathname.startsWith("/index.php")) {
      presenceData.details = "Strona Główna";
    } else if (document.location.pathname.startsWith("/")) {
      presenceData.details = "Strona Główna";
    } else if (document.location.pathname.startsWith("/forumdisplay.php")) {
      presenceData.details = "Sprawdza Temat:";
      presenceData.state = document.querySelector("#content > div > table > tbody > tr:nth-child(1) > td > strong").textContent
    } else if (document.location.pathname.startsWith("/showthread.php")) {
      presenceData.details = "Sprawdza Post:";
      presenceData.state = document.querySelector("#content > div > table > tbody > tr:nth-child(1) > td > div:nth-child(2) > strong").textContent
    } else if (document.location.pathname.startsWith("/online.php")) {
      presenceData.details = "Sprawdza Kto Jest Online";
    } else if (document.location.pathname.startsWith("/stats.php")) {
      presenceData.details = "Sprawdza Statystyki:";
    } else if(document.querySelector("#quick_login > a")) {
      presenceData.details = "Loguje Się Na Forum";
    } else if(document.location.pathname.startsWith("/portal.php")) {
      presenceData.details = "Sprawdza Portal";
    } else if(document.location.pathname.startsWith("/member.php")) {
      presenceData.details = "Sprawdza Profil:";
      presenceData.state = `${document.querySelector("#content > div > div.profcontainer > div.profheading > div:nth-child(2) > span.fw-fn > span > strong > em").textContent} (${document.querySelector("#content > div > div.profcontainer > div.profheading > div:nth-child(2) > span.smalltext").textContent})`
    } else if(document.location.pathname.startsWith("/calendar.php")) {
      presenceData.details = "Sprawdza Kalendarz";
    } else if(document.location.pathname.startsWith("/misc.php")) {
      presenceData.details = "Pomoc";
    } else if(document.location.pathname.startsWith("/memberlist.php")) {
      presenceData.details = "Sprawdza Profile";
    }
  }

    if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
    } else {
      presence.setActivity(presenceData);
    }
  });
  