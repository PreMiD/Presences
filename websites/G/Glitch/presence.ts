const presence = new Presence({
  clientId: "630101652380188692"
});

presence.on("UpdateData", () => {
  const presenceData: PresenceData = {
    largeImageKey: "glitchlogo"
  };

  if (window.location.href.includes(".glitch.me")) {
    presenceData.details = "Viewing a webpage";
    presenceData.state = window.location.hostname;
  } else if (window.location.href.includes("status.glitch.com")) {
    presenceData.details = "https://status.glitch.com";
  } else if (window.location.href.includes("support.glitch.com")) {
    if (window.location.pathname.toLowerCase() === "/") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "Latest topics";
    }
    if (window.location.pathname.toLowerCase() === "/latest") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "Latest topics";
    }
    if (window.location.pathname.toLowerCase() === "/new") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "New topics";
    }
    if (window.location.pathname.toLowerCase() === "/unread") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "Unread topics";
    }
    if (window.location.pathname.toLowerCase() === "/top") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "Top topics";
    }
    if (window.location.pathname.toLowerCase() === "/categories") {
      presenceData.details = "Viewing support topics";
      presenceData.state = "Categories";
    }
    if (window.location.href.toLowerCase().includes("support.glitch.com/t/")) {
      presenceData.details = "Viewing a topic:";
      presenceData.state = document.title;
    }
    if (window.location.href.toLowerCase().includes("support.glitch.com/u/")) {
      presenceData.details = "Viewing a user profile:";
      presenceData.state = document.querySelector(
        "body > section > div > div > div > section > section > div > div > div > div > h2 "
      ).innerHTML;
    }
  } else {
    if (window.location.pathname.toLowerCase() === "/") {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Homepage";
    }
    if (window.location.pathname.toLowerCase().includes("/questions")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Questions";
    }
    if (window.location.pathname.toLowerCase().includes("/create")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Create";
    }
    if (window.location.pathname.toLowerCase().includes("/about")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "About";
    }
    if (window.location.pathname.toLowerCase().includes("/culture")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Blog & Culture";
    }
    if (window.location.pathname.toLowerCase().includes("/help")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Help & FAQ";
    }
    if (window.location.pathname.toLowerCase().includes("/legal")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Legal";
    }
    if (window.location.pathname.toLowerCase().includes("edit")) {
      const projectName = document.querySelector(
        "body > div > div > header > nav > button > div > span"
      );
      presenceData.details = "Editing a project:";
      presenceData.state = projectName.innerHTML;
    }
    if (window.location.pathname.toLowerCase().includes("~")) {
      presenceData.details = "Viewing a project:";
      presenceData.state = window.location.pathname.replace("/", "");
    }
    if (window.location.pathname.toLowerCase().includes("@")) {
      presenceData.details = "Viewing a team or user:";
      presenceData.state = window.location.pathname.replace("/", "");
    }
  }

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
