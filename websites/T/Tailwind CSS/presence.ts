const presence = new Presence({
  clientId: "808370339344023563" //The client ID of the Application created at https://discordapp.com/developers/applications
});

var variable: any;
var browsingStamp = Math.floor(Date.now() / 1000);

presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "tailwindcss"
  };
  presenceData.startTimestamp = browsingStamp;
  if (document.location.hostname == "tailwindcss.com") {
    variable = document.querySelector("h1");
    presenceData.state = variable.innerText;
    presenceData.details = "Docs | Viewing:";
  } else if (document.location.hostname == "play.tailwindcss.com") {
    presenceData.state = "Play - Tailwind CSS";
    presenceData.details = "Editing on:";
  } else if (document.location.hostname == "tailwindui.com") {
    variable = document.querySelector("h2");
    presenceData.state = variable.innerText;
    presenceData.details = "Tailwind UI | Viewing:";
  }
  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setTrayTitle();
    presence.setActivity(presenceData);
  }
});
