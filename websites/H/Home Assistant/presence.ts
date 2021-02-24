const presence = new Presence({
    clientId: "812627990382772224"
}), browsingStamp = Math.floor(Date.now() / 1000);
  
presence.on("UpdateData", async () => {
  const presenceData: PresenceData = {
    largeImageKey: "home_assistant_logo", //banner
    startTimestamp: browsingStamp,
    details : "Viewing"
  }; 

  //#region Main
  if (document.location.pathname.includes("/lovelace")) {
    presenceData.state = "Homepage";
  }
  else if (document.location.pathname.startsWith("/auth")){
    presenceData.state = "Login";
  }   
  else if (document.location.pathname.includes("/map")){
    presenceData.state = "Map";
  }
  else if (document.location.pathname.includes("/logbook")) {
    presenceData.state = "Logbook";
  }   
  else if (document.location.pathname.includes("/history")){
    presenceData.state = "History";
  }
  else if (document.location.pathname.includes("/media-browser")){
    presenceData.state = "Media browser";
  }
  else if (document.location.pathname.includes("/developer-tools")){
    presenceData.state = "Developer-tools";
  }
  //#endregion

  //#region Supervisor   
  else if (document.location.pathname.startsWith("/hassio/store")){
    presenceData.state = "Add-on store";
  }
  else if (document.location.pathname.startsWith("/hassio/dashboard")) {
    presenceData.state = "Add-on dashboard";
  }

  //#region add-on
  else if (document.location.pathname.includes("hassio/addon/core_samba")) {
    presenceData.state = "Samba share add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_letsencrypt")) {
    presenceData.state = "Let's encrypt add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_aircast")) {
    presenceData.state = "AirCast add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_duckdns")) {
    presenceData.state = "DuckDNS add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_nginx_proxy")) {
    presenceData.state = "Nginx proxy add-on";
  }
  else if (document.location.pathname.endsWith("core_configurator")) {
    presenceData.state = "File editor";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_git_pull")) {
    presenceData.state = "Git pull add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_cec_scan/")) {
    presenceData.state = "CEC scan add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_google_assistant")) {
    presenceData.state = "Google assistant SDK add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_mosquitto")) {
    presenceData.state = "MQTT add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_ssh")) {
    presenceData.state = "SSH add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/core_rpc_shutdown")) {
    presenceData.state = "RPC shutdown add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_airsonos")) {
    presenceData.state = "Air sonos add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_bitwarden")) {
    presenceData.state = "Bitwarden add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_phpmyadmin")) {
    presenceData.state = "PHP my admin add-on";
  }
  else if (document.location.pathname.includes("/hassio/addon/a0d7b954_unifi")) {
    presenceData.state = "UniFI controller add-on";
  }
  else if (document.location.pathname.includes("addon")) {
    presenceData.state = "Add-on";
  }
  //#endregion

  else if (document.location.pathname.endsWith("hassio/system")) {
    presenceData.state = "System Info";
  }
  else if (document.location.pathname.endsWith("hassio/snapshots")) {
    presenceData.state = "Snapshots";
  }
  //#endregion

  //#region settings
  else if (document.location.pathname.startsWith("/config/")) {
    presenceData.state = "Settings";
  }
  //#endregion

  else if (document.location.pathname.includes("/profile")) {
    presenceData.state = "Profile";
  }
  else{
    presenceData.state = "Navigating...";
    presenceData.details = "";
  }   

  if (presenceData.details == null) {
    presence.setTrayTitle();
    presence.setActivity();
  } else {
    presence.setActivity(presenceData);
  }
});
