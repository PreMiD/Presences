const presence = new Presence({
  clientId: "841246633105948672"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/login")) {
      const homepagePresence = {
          details: "Logging in..",
          state: "On Login Screen",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.includes("signup")) {
      const homepagePresence = {
          details: "Creating A",
          state: "New Account",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/product/lite")) {
      const homepagePresence = {
          details: "Viewing a Product:",
          state: "Lite",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/product/pro")) {
      const homepagePresence = {
          details: "Viewing a Product:",
          state: "Pro",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/product/premium")) {
      const homepagePresence = {
          details: "Viewing a Product:",
          state: "Premium",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/c/")) {
      const homepagePresence = {
          details: "Reading a place:",
          state: "For Creators",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/pricing")) {
      const homepagePresence = {
          details: "Looking for",
          state: "Pricing Plans",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/themes/browse")) {
      const homepagePresence = {
          details: "Looking for",
          state: "Starter kit",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/home")) {
      const homepagePresence = {
          details: "Looking the",
          state: "Homepage",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/dashboard/")) {
    const homepagePresence = {
        details: "Dashboard",
        state: document.location.pathname.split("/dashboard/").join(" ").toUpperCase(),
        largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
}
  else if (document.location.pathname.includes("posts")) {
      const homepagePresence = {
          details: "Looking..",
          state: "Posts page",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/manage/benefits")) {
      const homepagePresence = {
          details: "Looking..",
          state: "Benefits",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.startsWith("/members")) {
      const homepagePresence = {
          details: "Looking Members",
          state: "In settings",
          largeImageKey: "logo"
      };
      presence.setActivity(homepagePresence);
  }
  else if (document.location.pathname.includes("members")) {
    const homepagePresence = {
        details: "Looking Members..",
        state: "Benefits",
        largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
}
  else if (document.location.pathname.startsWith("/creator-home")) {
    const homepagePresence = {
        details: "On Homepage..",
        state: "Creator Home",
        largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
}
  else if (document.location.pathname.startsWith("/")) { //2 view any page
      const homepagePresence = {
          details: "Viewing a page:",
          state: document.location.pathname.split("www.patreon.com/").join(" "),
          largeImageKey: "logo"
      }
      presence.setActivity(homepagePresence);
  }
});