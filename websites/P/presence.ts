const presence = new Presence({
  clientId: "841246633105948672"
});

presence.on("UpdateData", async () => {
  if (document.location.pathname.startsWith("/login")) {
      const login = {
          details: "Logging in..",
          state: "On Login Screen",
          largeImageKey: "logo"
      };
      presence.setActivity(login);
  }
  else if (document.location.pathname.includes("signup")) {
      const signup = {
          details: "Creating A",
          state: "New Account",
          largeImageKey: "logo"
      };
      presence.setActivity(signup);
  }
  else if (document.location.pathname.startsWith("/product/lite")) {
      const product1 = {
          details: "Viewing a Product:",
          state: "Lite",
          largeImageKey: "logo"
      };
      presence.setActivity(product1);
  }
  else if (document.location.pathname.startsWith("/product/pro")) {
      const product2 = {
          details: "Viewing a Product:",
          state: "Pro",
          largeImageKey: "logo"
      };
      presence.setActivity(product2);
  }
  else if (document.location.pathname.startsWith("/product/premium")) {
      const product3 = {
          details: "Viewing a Product:",
          state: "Premium",
          largeImageKey: "logo"
      };
      presence.setActivity(product3);
  }
  else if (document.location.pathname.startsWith("/c/")) {
      const forcreators = {
          details: "Reading a place:",
          state: "For Creators",
          largeImageKey: "logo"
      };
      presence.setActivity(forcreators);
  }
  else if (document.location.pathname.startsWith("/pricing")) {
      const pricing = {
          details: "Looking for",
          state: "Pricing Plans",
          largeImageKey: "logo"
      };
      presence.setActivity(pricing);
  }
  else if (document.location.pathname.startsWith("/themes/browse")) {
      const starterkit = {
          details: "Looking for",
          state: "Starter kit",
          largeImageKey: "logo"
      };
      presence.setActivity(starterkit);
  }
  else if (document.location.pathname.startsWith("/home")) {
      const homepage = {
          details: "Looking the",
          state: "Homepage",
          largeImageKey: "logo"
      };
      presence.setActivity(homepage);
  }
  else if (document.location.pathname.startsWith("/dashboard/")) {
    const dashboard = {
        details: "Dashboard",
        state: document.location.pathname.split("/dashboard/").join(" ").toUpperCase(),
        largeImageKey: "logo"
    };
    presence.setActivity(dashboard);
}
  else if (document.location.pathname.includes("posts")) {
      const posts = {
          details: "Looking..",
          state: "Posts page",
          largeImageKey: "logo"
      };
      presence.setActivity(posts);
  }
  else if (document.location.pathname.startsWith("/manage/benefits")) {
      const benefits = {
          details: "Looking..",
          state: "Benefits",
          largeImageKey: "logo"
      };
      presence.setActivity(benefits);
  }
  else if (document.location.pathname.startsWith("/members")) {
      const members = {
          details: "Looking Members",
          state: "In settings",
          largeImageKey: "logo"
      };
      presence.setActivity(members);
  }
  else if (document.location.pathname.includes("members")) {
    const membersData = {
        details: "Looking Members..",
        state: "Benefits",
        largeImageKey: "logo"
    };
    presence.setActivity(membersData);
}
  else if (document.location.pathname.startsWith("/creator-home")) {
    const crhome = {
        details: "On Homepage..",
        state: "Creator Home",
        largeImageKey: "logo"
    };
    presence.setActivity(crhome);
}
  else if (document.location.pathname.includes("checkout")) {
    const checkout = {
      details: "On Checkout..",
      state: document.querySelector(".gGokLh")?.textContent,
      largeImageKey: "logo"
    };
    presence.setActivity(checkout);
}
  else if (document.querySelector(".sc-eCssSg.jjArWB")?.textContent) { //2 view any page
      const creatorPage = {
          details: "Viewing a page:",
          state: document.querySelector(".sc-eCssSg.jjArWB")?.textContent,
          largeImageKey: "logo"
    };
    presence.setActivity(creatorPage);
}
else if (document.querySelector(".bHwEqN")?.textContent) { //2 view any page
  const creatorPage = {
      details: "Viewing a page:",
      state: document.querySelector(".bHwEqN")?.textContent,
      largeImageKey: "logo"
  };
  presence.setActivity(creatorPage);
}
  else if (document.querySelector(".jAFvqi")?.textContent) { //2 view any page
  const pagenotfound = {
      details: "Viewing 404 Error",
      state: "Page.",
      largeImageKey: "logo"
  };
  presence.setActivity(pagenotfound);
}
  else if (document.location.pathname.startsWith("/")) { //
    const unsupportedPage = {
        details: "Viewing a",
        state: "Unsupported page",
        largeImageKey: "logo"
  };
    presence.setActivity(unsupportedPage);
  }
});