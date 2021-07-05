const presence = new Presence({
  clientId: "701788656695902258"
}),

 browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "dcbotlist.xyz") {
    presenceData.details = "Viewing Page";
    presenceData.state = "Home Page";
    presenceData.startTimestamp = browsingStamp;
    if (document.location.pathname.includes("/bots")) {
      presenceData.details = "Viewing Page";
      presenceData.state = "Home - All Bots";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/certification")) {
      presenceData.details = "Viewing Page";
      presenceData.state = "Home - Certification Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/login")) {
      presenceData.details = "Viewing Page";
      presenceData.state = "Login DCBotlist.xyz";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/logout")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Logout DCBotlist.xyz";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/addbot")) {
      presenceData.details = "Submit Bot";
      presenceData.state = "Adding to Bot";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/servers")) {
      presenceData.details = "Viewing Page";
      presenceData.state = "Home - All Servers";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Home - Partners Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/codes")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Home - Codes Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/uptime/links")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Home - Uptime Page";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/unapproved")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Unapproved Bots";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/approved")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Approved Bots";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/certificate-apps")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel- Certificate Apps";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/certified-bots")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Certifitied Bots";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/uptimes")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Uptime";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/addcode")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Add Code";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/admin/codes")) {
      presenceData.details = "Viewing Page:";
      presenceData.state = "Admin Panel - Codes";
      presenceData.startTimestamp = browsingStamp;
    } else if (document.location.pathname.includes("/bot/")) {
      const priceEls = document.getElementsByClassName("ubot");
      for (let i = 0; i < priceEls.length; i++) {
        const botname = priceEls[i].textContent;
        presenceData.details = "Bir Bota bakıyor:";
        presenceData.state = botname;
        presenceData.startTimestamp = browsingStamp;
      }
    }
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else 
    presence.setActivity(presenceData);
  
});
