var presence = new Presence({
  clientId: "701201789365518337"
});

presence.on("UpdateData", () => {
  let presenceData = {
      largeImageKey: "overbuff"
  };

  if (window.location.pathname.includes("/players/")) {
      var nickname = presenceData.state = document.querySelector("div.layout-header-primary-bio > h1").firstChild.textContent
      if (window.location.pathname.includes("pc")) {
          presenceData.smallImageKey = "windows";
          presenceData.smallImageText = "Playing on Windows";
      } else if (window.location.pathname.includes("xbl")) {
          presenceData.smallImageKey = "xbox";
          presenceData.smallImageText = "Playing on Xbox";
      } else if (window.location.pathname.includes("psn")) {
          presenceData.smallImageKey = "ps4";
          presenceData.smallImageText = "Playing on Playstation";
      }
      presenceData.details = "Viewing a profile:";
      presenceData.state = nickname +
          " | Level: " + document.querySelector("div.image-with-corner > div.corner.corner-text").textContent;
  } else if (window.location.pathname.includes("/heroes")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Heroes";
      try{
        var hero_name = document.querySelector("div.layout-header-primary-bio > div > h1").firstChild.textContent;
        var hero_role = document.querySelector("div.layout-header-primary-bio > div > h1 > small").textContent;
        presenceData.details = "Viewing a Hero:";
        presenceData.state = hero_name + " (" + hero_role + ")";
      }
      catch{
        console.log("That's not a Hero profile.")
      }
  } else if (window.location.pathname.includes("/roles")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Roles";
  } else if (window.location.pathname.includes("/verified")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Verified Players";
  } else if (window.location.pathname.includes("/rankings")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Player Rankings";
  } else if (window.location.pathname.includes("/esports")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Esports";
  } else if (window.location.pathname.includes("/live")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Live Streams";
  } else if (window.location.pathname.includes("/blog")) {
    presenceData.details = "Viewing a page:";
    presenceData.state = "Overbuff Blog";
    try{
      var blog_title = document.querySelector("div.post-title > h1.title").textContent;
      presenceData.details = "Reading a blog:";
      presenceData.state = blog_title;
    }
    catch{
      console.log("That's not a blog post.")
    }
      
  } else if (window.location.pathname.includes("/about")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "About Overbuff";
  } else if (window.location.pathname.includes("/favorites")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Favorites";
  } else if (window.location.pathname.includes("/search")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Search Players";
  } else if (window.location.pathname.includes("/settings")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Settings";
  } else if (window.location.pathname.endsWith("/privacy")) {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Privacy Policy";
  } else {
      presenceData.details = "Viewing a page:";
      presenceData.state = "Front page";

  }
  if (presenceData.details == null) {
      presence.setTrayTitle();
      presence.setActivity();
  } else {
      presence.setActivity(presenceData);
  }
});