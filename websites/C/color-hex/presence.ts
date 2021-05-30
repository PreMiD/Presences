var presence = new Presence({
  clientId: "848520351352619018"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname == "/") {
    const homepagePresence: PresenceData = {
      details: "Viewing the homepage",
      largeImageKey: "logo"
    };
    presence.setActivity(homepagePresence);
  } else if (document.location.pathname.startsWith("/color/")) {
    const presenceData: PresenceData = {
      details: "Viewing a color",
      state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/blog/")) {
    const presenceData: PresenceData = {
      details: "Viewing the blog",
      state: document.title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/color-palettes/top-contributors")) {
    const presenceData: PresenceData = {
	  details: "Viewing top contributors",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/color-palettes/")) {
    const presenceData: PresenceData = {
      details: "Viewing color palettes",
	  state: document.title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/color-palette/")) {
    const presenceData: PresenceData = {
      details: "Viewing a color palette",
	  state: document.title,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/member/")) {
    const presenceData: PresenceData = {
      details: "Viewing a member's profile",
	  state: document.location.pathname.split("/")[2],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/popular-colors")) {
    const presenceData: PresenceData = {
      details: "Viewing popular colors",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/color-names")) {
    const presenceData: PresenceData = {
      details: "Viewing list of color names",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/216-web-safe-colors/")) {
    const presenceData: PresenceData = {
      details: "Viewing list of web safe colors",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/random")) {
    const presenceData: PresenceData = {
      details: "Generating random colors",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/color-wheel")) {
    const presenceData: PresenceData = {
      details: "Using color wheel",
	  state: (document.getElementById("color1") as HTMLInputElement).value + ", " + (document.getElementById("color2") as HTMLInputElement).value + ", " + (document.getElementById("color3") as HTMLInputElement).value,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/login")) {
    const presenceData: PresenceData = {
      details: "Logging in",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/register")) {
    const presenceData: PresenceData = {
      details: "Registering",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/activate")) {
    const presenceData: PresenceData = {
      details: "Activating account",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/profile")) {
    const presenceData: PresenceData = {
      details: "Viewing own profile",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/my-color-palettes")) {
    const presenceData: PresenceData = {
      details: "Viewing own color palettes",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/my-fav-colors")) {
    const presenceData: PresenceData = {
      details: "Viewing favorite colors",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/my-fav-palettes")) {
    const presenceData: PresenceData = {
      details: "Viewing favorite palettes",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (location.search.startsWith("?id") &&
			document.location.pathname.startsWith("/user/add-palette")
			) {
    const presenceData: PresenceData = {
      details: "Editing color palette",
	  state: (document.getElementById("adi") as HTMLInputElement).value,
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/add-palette")) {
    const presenceData: PresenceData = {
      details: "Creating color palette",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/change-password")) {
    const presenceData: PresenceData = {
      details: "Changing password",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/user/user-picture")) {
    const presenceData: PresenceData = {
      details: "Editing own profile picture",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/help")) {
    const presenceData: PresenceData = {
      details: "Searching for help",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/credits")) {
    const presenceData: PresenceData = {
      details: "Viewing credits",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/privacy")) {
    const presenceData: PresenceData = {
      details: "Viewing Privacy Policy",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else if (document.location.pathname.startsWith("/contact")) {
    const presenceData: PresenceData = {
      details: "Viewing contact page",
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  } else {
    // TODO: Check if the page is really a profile
    const presenceData: PresenceData = {
      details: "Viewing color-hex",
      state: document.location.pathname.split("/")[1],
      largeImageKey: "logo"
    };
    presence.setActivity(presenceData);
  }
});