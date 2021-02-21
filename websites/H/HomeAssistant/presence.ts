const presence = new Presence({
    clientId: "812627990382772224"
}), browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "home_assistant_logo" //banner
  }; 
  presenceData.startTimestamp = browsingStamp;

  function homeassistant(nome: string, imagetext: string, details: string) {
    presenceData.smallImageKey = nome;   // SmallImageKey Function
    presenceData.smallImageText = imagetext;   // smallImageText Function
    presenceData.details = details;    // Details Function
  }

  //#region Main
  if (document.location.pathname.includes("/lovelace")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Home")
  }
  else if (document.location.pathname.startsWith("/auth")){
    homeassistant("home_assistant_logo,", "Home Assistant", "Login")
  }   
  else if (document.location.pathname.includes("/map")){
    homeassistant("home_assistant_logo,", "Home Assistant", "Map")
  }
  else if (document.location.pathname.includes("/logbook")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Logbook")
  }   
  else if (document.location.pathname.includes("/history")){
    homeassistant("home_assistant_logo,", "Home Assistant", "History")
  }
  else if (document.location.pathname.includes("/media-browser")){
    homeassistant("home_assistant_logo,", "Home Assistant", "Media browser")
  }
  else if (document.location.pathname.includes("/developer-tools")){
    homeassistant("home_assistant_logo,", "Home Assistant", "Developer-tools")
  }
  //#endregion

  //#region Supervisor   
  else if (document.location.pathname.endsWith("/store")){
    homeassistant("home_assistant_logo,", "Home Assistant", "Add-on store")
  }
  else if (document.location.pathname.endsWith("hassio/dashboard")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Add-on dashboard")
  }

  //#region add-on
  else if (document.location.pathname.includes("hassio/addon/core_samba")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Samba share add-on")
  }
  else if (document.location.pathname.includes("/hassio/addon/core_letsencrypt")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Let's encrypt add-on")
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_aircast")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "AirCast add-on")
  }
  else if (document.location.pathname.includes("/hassio/addon/core_duckdns")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "DuckDNS add-on")
  }
  else if (document.location.pathname.includes("/hassio/addon/core_nginx_proxy")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Nginx proxy add-on")
  }
  else if (document.location.pathname.endsWith("core_configurator")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "File editor")
  }
  else if (document.location.pathname.startsWith("/hassio/addon")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Add-on")
  }
  //#endregion

  else if (document.location.pathname.endsWith("hassio/system")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "System Info")
  }
  else if (document.location.pathname.endsWith("hassio/snapshots")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Snapshots")
  }
  //#endregion

  //#region settings
  else if (document.location.pathname.startsWith("/config/")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Settings")
  }
  //#endregion

  else if (document.location.pathname.includes("/profile")) {
    homeassistant("home_assistant_logo,", "Home Assistant", "Profile")
  }
  else{
    homeassistant("home_assistant_logo,", "Home Assistant", "Navigating...")
  }   

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});