const presence = new Presence({
  clientId: "683626678492332069",
});
let tag = "",
  nickname = "";
presence.on("UpdateData", () => {
  let presenceData = {
    largeImageKey: "astriologo",
    smallImageKey: "transparent",
  };

  if (window.location.pathname === "/") {
    let size = document.getElementById("stats-hud").innerHTML.split("|").length,
      hstats = document.getElementById("stats-hud").innerHTML.split(" | ");
    (mass = document
      .getElementById("stats-hud")
      .innerHTML.split("|")[0]
      .replace("Score: ", "")),
      (modepr = document.getElementsByClassName("is-active")[2].id),
      (mode = modepr.charAt(0).toUpperCase() + modepr.substring(1)),
      (region = document
        .getElementsByClassName("is-active")[1]
        .id.replace("europe", "EU")
        .replace("america", "NA")
        .replace("asia", "AS")),
      (tagpr = document.getElementById("tag").value);

    if (document.getElementById("nick").value === "") {
      nickname = "Unnamed";
    } else {
      console.log(1);
      nickname = document.getElementById("nick").value;
    }
    if (document.getElementById("tag").value === "") {
      tag = "";
    } else {
      tag = `[${document.getElementById("tag").value}]`;
    }
    if (size === 2) {
      presenceData.details = `${region} - Main Menu`;
      presenceData.state = "Gamemode: " + mode;
      presenceData.smallImageText = document
        .getElementById("stats-hud")
        .innerHTML.replace("|", "•");
    } else if (size === 3) {
      presenceData.details = `${region} ${mode} • Mass:  ${mass}`;
      presenceData.state = `Nickname: ${tag} ${nickname}`;

      presenceData.smallImageText = document
        .getElementById("stats-hud")
        .innerHTML.replace(hstats[0] + " |", "")
        .replace("|", "•");
    }
  }
  presence.setActivity(presenceData);
});
