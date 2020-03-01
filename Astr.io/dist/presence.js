const presence = new Presence({
    clientId: "683626678492332069"
  });

presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "astriologo"
  }

  if(window.location.pathname === "/") {
    let size   = document.getElementById("stats-hud").innerHTML.split("|").length;
    let mass   = document.getElementById("stats-hud").innerHTML.split("|")[0].replace("Score: ", "");
    let modepr = document.getElementsByClassName("is-active")[2].id;
    let mode   = modepr.charAt(0).toUpperCase() + modepr.substring(1);
    let region = document.getElementsByClassName("is-active")[1].id.replace("europe", "EU").replace("america", "NA").replace("asia", "AS");
    let nickname;
    if(document.getElementById("nick").value === "") {
      nickname = "Unnamed";
    } else {
      nickname = document.getElementById("nick").value;
    }
    if(size === 2) {
      presenceData.details = "Main Menu"
      presenceData.state   = "Gamemode: " + mode;
    } 
    else if(size === 3) {
      presenceData.details = `${region} ${mode} • Mass:  ${mass}`;
      presenceData.state   = `Nickname: ${nickname}`;
    }
  };
  presence.setActivity(presenceData);
});
