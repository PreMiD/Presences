const presence = new Presence({
    clientId: "812627990382772224"
}), browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "home_assistant_logo", //banner
    startTimestamp: browsingStamp
  }; 

  function homeassistant(state: string) {
    presenceData.details = "Viewing";
    presenceData.state = state;
  }

  //#region Main
  if (document.location.pathname.includes("/lovelace")) {
    homeassistant("Homepage");
  }
  else if (document.location.pathname.startsWith("/auth")){
    homeassistant("Login");
  }   
  else if (document.location.pathname.includes("/map")){
    homeassistant("Map");
  }
  else if (document.location.pathname.includes("/logbook")) {
    homeassistant("Logbook");
  }   
  else if (document.location.pathname.includes("/history")){
    homeassistant("History");
  }
  else if (document.location.pathname.includes("/media-browser")){
    homeassistant("Media browser");
  }
  else if (document.location.pathname.includes("/developer-tools")){
    homeassistant("Developer-tools");
  }
  //#endregion

  //#region Supervisor   
  else if (document.location.pathname.startsWith("/hassio/store")){
    homeassistant("Add-on store");
  }
  else if (document.location.pathname.startsWith("/hassio/dashboard")) {
    homeassistant("Add-on dashboard");
  }

  //#region add-on
  else if (document.location.pathname.includes("hassio/addon/core_samba")) {
    homeassistant("Samba share add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_letsencrypt")) {
    homeassistant("Let's encrypt add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_aircast")) {
    homeassistant("AirCast add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_duckdns")) {
    homeassistant("DuckDNS add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_nginx_proxy")) {
    homeassistant("Nginx proxy add-on");
  }
  else if (document.location.pathname.endsWith("core_configurator")) {
    homeassistant("File editor");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_git_pull")) {
    homeassistant("Git pull add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_cec_scan/")) {
    homeassistant("CEC scan add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_google_assistant")) {
    homeassistant("Google assistant SDK add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_mosquitto")) {
    homeassistant("MQTT add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_ssh")) {
    homeassistant("SSH add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/core_rpc_shutdown")) {
    homeassistant("RPC shutdown add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_airsonos")) {
    homeassistant("Air sonos add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_bitwarden")) {
    homeassistant("Bitwarden add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_phpmyadmin")) {
    homeassistant("PHP my admin add-on");
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_unifi")) {
    homeassistant("UniFI controller add-on");
  }
  else if (document.location.pathname.includes("addon")) {
    homeassistant("Add-on");
  }
  //#endregion

  else if (document.location.pathname.endsWith("hassio/system")) {
    homeassistant("System Info");
  }
  else if (document.location.pathname.endsWith("hassio/snapshots")) {
    homeassistant("Snapshots");
  }
  //#endregion

  //#region settings
  else if (document.location.pathname.startsWith("/config/")) {
    homeassistant("Settings");
  }
  //#endregion

  else if (document.location.pathname.includes("/profile")) {
    homeassistant("Profile");
  }
  else{
    homeassistant("Navigating...");
    presenceData.details = "";
  }   

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
