var presence = new Presence({
  clientId: "503557087041683458"
});

var oldState = null;
var presenceName : any, profileName : any;
presence.on("UpdateData", async () => {
  let presenceData: presenceData = {
    largeImageKey: "lg"
  };

  presenceName = document.querySelector("div.header__title > h1.presence-name");
  profileName = document.querySelector("div.userpage__header > div.user-data > p");

  if (document.location.pathname.startsWith("/store") && presenceName == null)
    presenceData.state = "Store";
  else if (document.location.pathname.startsWith("/downloads"))
    presenceData.state = "Downloads";
  else if (document.location.pathname.startsWith("/contributors"))
    presenceData.state = "Contributors";
  else if (document.location.pathname.startsWith("/cookies"))
    presenceData.state = "Cookie Policy";
  else if (document.location.pathname.startsWith("/privacy"))
    presenceData.state = "Privacy Policy";
  else if (document.location.pathname.startsWith("/tos"))
    presenceData.state = "Terms of Service";
  else if (document.location.hostname.startsWith("wiki"))
    presenceData.state = "Wiki";
  else if (document.location.hostname.startsWith("docs"))
    presenceData.state = "Docs";
  else if (document.location.pathname.includes("/store/presences/")){
    presenceData.details = "Presence Page";
    presenceData.state = presenceName.innerText;
  } else if (document.location.pathname.startsWith("/users")){
    presenceData.details = "User Profile";
    presenceData.state = profileName.innerText;
  }
  else presenceData = null;

  if (oldState !== presenceData && presenceData !== null) {
    oldState = presenceData;
    presenceData.startTimestamp = Math.floor(Date.now() / 1000);
  }

  presenceData === null
    ? presence.setActivity()
    : presence.setActivity(presenceData);
});
