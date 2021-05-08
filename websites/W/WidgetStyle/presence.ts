const presence = new Presence({
  clientId: "828789217793409054"
}), browsingStamp = Math.floor(Date.now() / 1000); ;

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "logo"
  };

  if (document.location.hostname == "widgetstyle.xyz") {
    if (document.location.pathname == "/") {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 🏠 home page";
    } else if (document.location.pathname.includes("/widgets")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing ⚙ widgets page";
    } else if (document.location.pathname.includes("/partners")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 🤝 partners page";
    } else if (document.location.pathname.includes("/team")) {
      presenceData.startTimestamp = browsingStamp;
      presenceData.details = "Viewing 😎 team page";
    }  else if (document.location.pathname.includes("/user/")) {
      presenceData.startTimestamp = browsingStamp;
      const user = document.getElementById("username");
      presenceData.details = `Viewing 👤 user: ${user.innerText}`;
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
