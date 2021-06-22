const presence = new Presence({
  clientId: "644079842312192020"
});

let username: HTMLElement, guildName: HTMLElement, usernameString: string;

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
      largeImageKey: "logo"
    },
    page = window.location.pathname;

  presenceData.startTimestamp = Math.floor(Date.now() / 1000);

  if (page === "/") {
    presenceData.details = "Home Page";

    presenceData.state = "reckless.life";
  } else if (page.includes("guilds")) {
    guildName = document.querySelector("div.container > form.border > p.h4");
    presenceData.details = "Guild Settings: ";
    presenceData.state = guildName.innerText;
  } else if (page.includes("admin")) {
    username = document.querySelector("div.container-fluid > center > h3");
    (usernameString = username.innerText),
      (usernameString = usernameString.replace("Welcome Back, ", ""));

    presenceData.details = "Admin";
    presenceData.state = "Viewing Guilds";

    presenceData.smallImageKey = "admin";
    presenceData.smallImageText = usernameString;
  } else presenceData.details = "Unknown Page";

  if (!presenceData.details) {
    presence.setTrayTitle();
    presence.setActivity();
  } else presence.setActivity(presenceData);
});
