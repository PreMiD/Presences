const presence = new Presence({
  clientId: "848520351352619018"
});

presence.on("UpdateData", () => {
    const presenceData: PresenceData = {
        largeImageKey: "logo"
    };
    
    if (document.location.pathname === "/") {
        presenceData.details = "Viewing the homepage";
  } else if (document.location.pathname.startsWith("/color/")) {
      presenceData.details = "Viewing a color";
      presenceData.state = document.location.pathname.split("/")[2];
  } else if (document.location.pathname.startsWith("/blog/")) {
     presenceData.details = "Viewing the blog";
     presenceData.state = document.title;
  } else if (document.location.pathname.startsWith("/color-palettes/top-contributors")) {
     presenceData.details = "Viewing top contributors";
  } else if (document.location.pathname.startsWith("/color-palettes/")) {
     presenceData.details = "Viewing color palettes";
     presenceData.state = document.title;
  } else if (document.location.pathname.startsWith("/color-palette/")) {
     presenceData.details = "Viewing a color palette";
     presenceData.state = document.title;
  } else if (document.location.pathname.startsWith("/member/")) {
     presenceData.details = "Viewing a member's profile";
     presenceData.state = document.location.pathname.split("/")[2];
  } else if (document.location.pathname.startsWith("/popular-colors")) {
     presenceData.details = "Viewing popular colors";
  } else if (document.location.pathname.startsWith("/color-names")) {
     presenceData.details = "Viewing list of color names";
  } else if (document.location.pathname.startsWith("/216-web-safe-colors/")) {
     presenceData.details = "Viewing list of web safe colors";
  } else if (document.location.pathname.startsWith("/random")) {
     presenceData.details = "Generating random colors";
  } else if (document.location.pathname.startsWith("/color-wheel")) {
     presenceData.details = "Using color wheel";
     //presenceData.state = (document.getElementById("color1") as HTMLInputElement).value + ", " + (document.getElementById("color2") as HTMLInputElement).value + ", " + (document.getElementById("color3") as HTMLInputElement).value;
     presenceData.state = `${(document.getElementById("color1") as HTMLInputElement).value}, ${(document.getElementById("color2") as HTMLInputElement).value}, ${(document.getElementById("color3") as HTMLInputElement).value}`;
  } else if (document.location.pathname.startsWith("/user/login")) {
     presenceData.details = "Logging in";
  } else if (document.location.pathname.startsWith("/user/register")) {
     presenceData.details = "Registering";
  } else if (document.location.pathname.startsWith("/user/activate")) {
     presenceData.details = "Activating account";
  } else if (document.location.pathname.startsWith("/user/profile")) {
     presenceData.details = "Viewing own profile";
  } else if (document.location.pathname.startsWith("/user/my-color-palettes")) {
     presenceData.details = "Viewing own color palettes";
  } else if (document.location.pathname.startsWith("/user/my-fav-colors")) {
     presenceData.details = "Viewing favorite colors";
  } else if (document.location.pathname.startsWith("/user/my-fav-palettes")) {
     presenceData.details = "Viewing favorite palettes";
  } else if (location.search.startsWith("?id") && document.location.pathname.startsWith("/user/add-palette")) {
     presenceData.details = "Editing color palette";
     presenceData.state = (document.getElementById("adi") as HTMLInputElement).value;
  } else if (document.location.pathname.startsWith("/user/add-palette")) {
     presenceData.details = "Creating color palette";
  } else if (document.location.pathname.startsWith("/user/change-password")) {
     presenceData.details = "Changing password";
  } else if (document.location.pathname.startsWith("/user/user-picture")) {
     presenceData.details = "Editing own profile picture";
  } else if (document.location.pathname.startsWith("/help")) {
     presenceData.details = "Searching for help";
  } else if (document.location.pathname.startsWith("/credits")) {
     presenceData.details = "Viewing credits";
  } else if (document.location.pathname.startsWith("/privacy")) {
     presenceData.details = "Viewing Privacy Policy";
  } else if (document.location.pathname.startsWith("/contact")) {
     presenceData.details = "Viewing contact page";
  } else {
     presenceData.details = "Viewing color-hex";
     presenceData.state = document.location.pathname.split("/")[1];
    }
    
    if (presenceData.details === null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});